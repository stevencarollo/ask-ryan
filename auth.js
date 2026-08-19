/* The Roundtable - access control.
 *
 * THE DOOR MUST NEVER DEPEND ON A SERVER THAT CAN SLEEP.
 * Member codes are verified against a small hashed list served from always-on
 * public storage (no compute to wake, ~0.5s worldwide). Everything slow -
 * logging the sign-in, restoring the saved profile - happens AFTER the member
 * is already inside, and can fail silently without ever blocking them.
 *
 * Admin codes are deliberately NOT in the public list: they are verified
 * server-side only, so a short owner code cannot be brute-forced offline.
 */
(function () {
    const API = 'https://ask-ryan-nb3w.onrender.com';
    const CODES_URL = 'https://dizwarrajksucshdwmzm.supabase.co/storage/v1/object/public/rt-pub/codes.json';
    const CODE_HASH = '3b0708577e23db56a440e7212e0fbfdebe8912bc6e2469c90ec6b70ffaa95edb';
    const FALLBACK_DAYS = 7;
    const KEY = 'rt_access';

    async function sha256(str) {
        const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(str));
        return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('');
    }
    async function fetchJSON(url, ms, opts) {
        const ctl = new AbortController();
        const t = setTimeout(() => ctl.abort(), ms);
        try {
            const r = await fetch(url, Object.assign({signal: ctl.signal, cache: 'no-store'}, opts || {}));
            return r.ok ? await r.json() : null;
        } finally { clearTimeout(t); }
    }

    function knownCodes() {
        try { return JSON.parse(localStorage.getItem('rt_known_codes')) || []; } catch (e) { return []; }
    }
    function rememberCode(hash, days) {
        const k = knownCodes().filter(x => x.h !== hash);
        k.unshift({h: hash, d: days});
        localStorage.setItem('rt_known_codes', JSON.stringify(k.slice(0, 8)));
    }
    function startSession(profile, days, admin) {
        localStorage.setItem(KEY, JSON.stringify(Object.assign({}, profile || {}, {
            activatedAt: Date.now(), days: days === undefined ? FALLBACK_DAYS : days, admin: !!admin
        })));
        if (admin) localStorage.setItem('rt_admin', '1'); else localStorage.removeItem('rt_admin');
    }
    function sessionDays(s) { return s.days === null ? null : (s.days || FALLBACK_DAYS); }
    function readSession() {
        try {
            const s = JSON.parse(localStorage.getItem(KEY));
            if (!s || !s.activatedAt) return null;
            const days = sessionDays(s);
            if (days !== null && Date.now() - s.activatedAt > days * 864e5) return {expired: true};
            return s;
        } catch (e) { return null; }
    }

    window.RTAuth = {
        session() { const s = readSession(); return (s && !s.expired) ? s : null; },
        expired() { const s = readSession(); return !!(s && s.expired); },
        isAdmin() { const s = this.session(); return !!(s && s.admin); },
        daysLeft() {
            const s = this.session();
            if (!s) return 0;
            const d = sessionDays(s);
            return d === null ? Infinity : Math.max(0, Math.ceil((s.activatedAt + d * 864e5 - Date.now()) / 864e5));
        },
        device() { return /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent) ? 'mobile' : 'desktop'; },

        /* Sign in. Always resolves to an object:
             {ok:true, admin, days, serverProfile, offline?}
             {ok:false, reason:'invalid'|'revoked'|'unverified'}
           'unverified' means WE could not check - never the member's fault. */
        async redeem(code, profile) {
            const clean = String(code || '').trim().toUpperCase();
            const email = (profile && profile.email) || '';
            const hash = await sha256(clean);

            // 1) THE DOOR: always-on public list, nothing to wake up
            let list = null;
            try { list = await fetchJSON(CODES_URL + '?cb=' + Date.now(), 7000); } catch (e) { list = null; }
            if (list) {
                const rec = list[hash];
                if (rec && rec.r) return {ok: false, reason: 'revoked'};
                if (rec) {
                    const days = rec.d === undefined ? FALLBACK_DAYS : rec.d;
                    startSession(profile, days, false);
                    localStorage.setItem('rt_code', clean);
                    rememberCode(hash, days);
                    this.saveProfile(profile);
                    const sp = await this._afterEntry(email, clean);
                    return {ok: true, admin: false, days: days, serverProfile: sp};
                }
                // not a member code - may still be the owner admin code (never published)
            }

            // 2) admin codes, or the door was unreachable: ask the server
            try {
                const d = await fetchJSON(API + '/api/auth/signin', list ? 40000 : 12000, {
                    method: 'POST', headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({email: email, code: clean, device: this.device()})
                });
                if (d && d.ok) {
                    startSession(profile, d.days, d.admin);
                    localStorage.setItem('rt_code', clean);
                    rememberCode(hash, d.days);
                    this.saveProfile(profile);
                    if (d.profile && d.profile.name) this.saveProfile(d.profile);
                    return {ok: true, admin: !!d.admin, days: d.days, serverProfile: d.profile || null};
                }
                if (d && d.ok === false) {
                    return {ok: false, reason: d.reason === 'revoked' ? 'revoked' : 'invalid'};
                }
            } catch (e) { /* fall through to the backstops */ }

            // 3) BACKSTOPS - a member who got in before is never locked out by an outage
            const seen = knownCodes().find(x => x.h === hash);
            if (seen) {
                startSession(profile, seen.d, false);
                localStorage.setItem('rt_code', clean);
                this.saveProfile(profile);
                return {ok: true, admin: false, days: seen.d, serverProfile: null, offline: true};
            }
            if (hash === CODE_HASH) {
                startSession(profile, FALLBACK_DAYS, false);
                localStorage.setItem('rt_code', clean);
                rememberCode(hash, FALLBACK_DAYS);
                this.saveProfile(profile);
                return {ok: true, admin: false, days: FALLBACK_DAYS, serverProfile: null, offline: true};
            }
            // Nothing authoritative ever said "no" - the door list only proves this
            // is not a MEMBER code (it could be the unpublished admin code), and the
            // server never answered. Refusing here would blame the member for our
            // outage, so this is always reported as "we could not check".
            return {ok: false, reason: 'unverified'};
        },

        /* after the member is already inside: log the visit, restore any saved
           profile. Never blocks entry; failure is silent. */
        _afterEntry(email, code) {
            return fetchJSON(API + '/api/auth/signin', 4000, {
                method: 'POST', headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({email: email, code: code, device: this.device()})
            }).then(d => {
                if (d && d.profile && d.profile.name) { this.saveProfile(d.profile); return d.profile; }
                return null;
            }).catch(() => null);
        },

        profile() {
            try { return JSON.parse(localStorage.getItem('rt_profile')) || {}; } catch (e) { return {}; }
        },
        saveProfile(p) {
            if (!p) return;
            const merged = Object.assign({}, this.profile());
            for (const k of ['name', 'email', 'phone', 'brokerage', 'title', 'dre', 'website']) {
                if (p[k]) merged[k] = p[k];
            }
            localStorage.setItem('rt_profile', JSON.stringify(merged));
        },
        grant(profile) {
            startSession(Object.assign({}, profile, {ext: true}), FALLBACK_DAYS, false);
            this.saveProfile(profile);
        },
        signOut() {
            localStorage.removeItem(KEY);
            localStorage.removeItem('rt_admin');
            location.href = '/login.html';
        },
        guard() {
            if (!this.session()) {
                const p = new URLSearchParams();
                if (this.expired()) p.set('expired', '1');
                p.set('next', location.pathname);
                location.replace('/login.html?' + p.toString());
            }
        }
    };
})();
