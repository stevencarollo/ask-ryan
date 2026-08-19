/* The Roundtable — access control.
 * Codes are validated SERVER-SIDE against the member registry (create, extend,
 * revoke from /admin.html — no code changes needed). The legacy hash below is
 * only an offline fallback for the general member code.
 */
(function () {
    const API = 'https://ask-ryan-nb3w.onrender.com';
    const CODE_HASH = '3b0708577e23db56a440e7212e0fbfdebe8912bc6e2469c90ec6b70ffaa95edb';
    const FALLBACK_DAYS = 7;
    const KEY = 'rt_access';

    async function sha256(str) {
        const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(str));
        return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('');
    }

    function sessionDays(s) {
        // days === null -> membership never expires; undefined (old sessions) -> default
        return s.days === null ? null : (s.days || FALLBACK_DAYS);
    }

    function readSession() {
        try {
            const s = JSON.parse(localStorage.getItem(KEY));
            if (!s || !s.activatedAt) return null;
            const days = sessionDays(s);
            if (days !== null && Date.now() - s.activatedAt > days * 24 * 60 * 60 * 1000) {
                return { expired: true };
            }
            return s;
        } catch (e) {
            return null;
        }
    }

    window.RTAuth = {
        session() {
            const s = readSession();
            return (s && !s.expired) ? s : null;
        },
        expired() {
            const s = readSession();
            return !!(s && s.expired);
        },
        isAdmin() {
            const s = this.session();
            return !!(s && s.admin);
        },
        daysLeft() {
            const s = this.session();
            if (!s) return 0;
            const days = sessionDays(s);
            if (days === null) return Infinity;
            return Math.max(0, Math.ceil((s.activatedAt + days * 864e5 - Date.now()) / 864e5));
        },
        /* Sign in. Returns false, or {ok:true, admin:bool, firstTime:bool-ish}.
           Server-side first (real code registry, login logging); falls back to
           the legacy hash if the server can't be reached. */
        async redeem(code, profile) {
            const email = (profile && profile.email) || '';
            const device = /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent) ? 'mobile' : 'desktop';
            try {
                const ctl = new AbortController();
                const t = setTimeout(() => ctl.abort(), 9000);
                const r = await fetch(API + '/api/auth/signin', {
                    method: 'POST', signal: ctl.signal,
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, code, device })
                });
                clearTimeout(t);
                const d = await r.json();
                if (d.ok === false) return false;               // definitive: bad/revoked code
                if (d.ok) {
                    localStorage.setItem(KEY, JSON.stringify(Object.assign({}, profile || {}, {
                        activatedAt: Date.now(), days: d.days === undefined ? FALLBACK_DAYS : d.days,
                        admin: !!d.admin
                    })));
                    localStorage.setItem('rt_code', String(code).trim().toUpperCase());
                    if (d.admin) localStorage.setItem('rt_admin', '1'); else localStorage.removeItem('rt_admin');
                    this.saveProfile(profile);
                    if (d.profile && d.profile.name) this.saveProfile(d.profile);
                    return { ok: true, admin: !!d.admin, serverProfile: d.profile || null };
                }
            } catch (e) { /* server unreachable — offline fallback below */ }
            const hash = await sha256(String(code || '').trim().toUpperCase());
            if (hash !== CODE_HASH) return false;
            localStorage.setItem(KEY, JSON.stringify(Object.assign({}, profile || {}, { activatedAt: Date.now(), days: FALLBACK_DAYS })));
            localStorage.setItem('rt_code', String(code).trim().toUpperCase());
            this.saveProfile(profile);
            return { ok: true, admin: false, serverProfile: null };
        },
        /* Agent profile (name/brokerage/etc) — survives session expiry so
           returning members keep their personalized scripts. */
        profile() {
            try { return JSON.parse(localStorage.getItem('rt_profile')) || {}; }
            catch (e) { return {}; }
        },
        saveProfile(p) {
            if (!p) return;
            const cur = this.profile();
            const merged = Object.assign({}, cur);
            for (const k of ['name', 'email', 'phone', 'brokerage', 'title', 'dre', 'website']) {
                if (p[k]) merged[k] = p[k];
            }
            localStorage.setItem('rt_profile', JSON.stringify(merged));
        },
        /* mercy path: start a 7-day session without a code (extension challenge) */
        grant(profile) {
            localStorage.setItem(KEY, JSON.stringify(Object.assign({}, profile || {}, { activatedAt: Date.now(), days: FALLBACK_DAYS, ext: true })));
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
