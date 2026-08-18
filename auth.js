/* The Roundtable — access control.
 * To change the activation code: run
 *   python -c "import hashlib; print(hashlib.sha256('YOURNEWCODE'.upper().encode()).hexdigest())"
 * and paste the result into CODE_HASH below. Codes are case-insensitive.
 */
(function () {
    const CODE_HASH = '3b0708577e23db56a440e7212e0fbfdebe8912bc6e2469c90ec6b70ffaa95edb';
    const ACCESS_DAYS = 7;
    const KEY = 'rt_access';

    async function sha256(str) {
        const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(str));
        return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('');
    }

    function readSession() {
        try {
            const s = JSON.parse(localStorage.getItem(KEY));
            if (!s || !s.activatedAt) return null;
            if (Date.now() - s.activatedAt > ACCESS_DAYS * 24 * 60 * 60 * 1000) {
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
        daysLeft() {
            const s = this.session();
            if (!s) return 0;
            return Math.max(0, Math.ceil((s.activatedAt + ACCESS_DAYS * 864e5 - Date.now()) / 864e5));
        },
        async redeem(code, profile) {
            const hash = await sha256(String(code || '').trim().toUpperCase());
            if (hash !== CODE_HASH) return false;
            localStorage.setItem(KEY, JSON.stringify(Object.assign({}, profile || {}, { activatedAt: Date.now() })));
            this.saveProfile(profile);
            return true;
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
            localStorage.setItem(KEY, JSON.stringify(Object.assign({}, profile || {}, { activatedAt: Date.now(), ext: true })));
            this.saveProfile(profile);
        },
        signOut() {
            localStorage.removeItem(KEY);
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
