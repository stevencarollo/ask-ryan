
# DOMAIN NAME OPTIONS & SETUP

## 🎯 RECOMMENDED DOMAIN NAMES

1. **askryan.com** (BEST - Short & Memorable)
   Cost: $12/year (Namecheap)
   Status: Likely available
   Perfect for: Easy sharing, brand recognition

2. **askaryan.ai** (Premium Suffix)
   Cost: $50/year
   Modern & trendy
   Tech-forward appeal

3. **ryancoach.app** (Action-Oriented)
   Cost: $15/year (Google Domains)
   Clear purpose
   Good for SEO

4. **askyoucoach.com** (Generic)
   Cost: $12/year
   More memorable to type
   Less specific to Ryan

## STEP-BY-STEP DOMAIN SETUP

### 1. PURCHASE DOMAIN

**Option A: Namecheap (Recommended)**
- Go to namecheap.com
- Search: 'askryan.com'
- Add to cart
- Checkout
- Cost: ~$12/year

**Option B: Google Domains**
- Go to google.com/domains
- Search for domain
- Checkout
- Cost: ~$12/year

**Option C: Vercel Domains**
- Buy directly from Vercel dashboard
- Auto-connected to your project
- Cost: $12.99/year

### 2. CONNECT TO VERCEL (Landing Page)

1. Vercel Dashboard
2. Select your 'ask-ryan' project
3. Settings → Domains
4. Add your domain (askryan.com)
5. Vercel gives you DNS records to add

### 3. CONNECT TO RAILWAY (Backend API)

1. Railway Dashboard
2. Select your project
3. Settings → Domains
4. Add domain: api.askryan.com
5. Copy CNAME record

### 4. UPDATE DNS RECORDS

Go to your domain registrar (Namecheap/Google):

**Record 1 - Main Domain**
Type: A or CNAME (follow Vercel's instructions)
Name: @ (or askryan.com)
Value: (Vercel provides this)

**Record 2 - API Subdomain**
Type: CNAME
Name: api
Value: (Railway provides this)

**Record 3 - WWW**
Type: CNAME
Name: www
Value: askryan.com

### 5. WAIT FOR DNS PROPAGATION

- DNS usually updates in 15 minutes
- Can take up to 2 hours
- Check progress: mxtoolbox.com

### 6. TEST YOUR DOMAIN

- Visit: https://askryan.com (landing page)
- Visit: https://api.askryan.com/api/health (should show JSON)
- Click 'Start Coaching' on landing page
- Should redirect to chat interface

## DOMAINS TO AVOID

❌ Too Long: 'askryantherealatecoachnow.com'
❌ Hard to Spell: 'askryanaicouching.com'
❌ No Hyphens: 'ask-ryan.com' (confusing)
❌ Tricky Spelling: 'askryan.co' (people type .com)

## MARKETING YOUR DOMAIN

Once live, share:

SHORT LINK:
bit.ly/askryan → https://askryan.com

EMAIL SIGNATURE:
Ask Ryan - Free AI Coaching
https://askryan.com

LINKEDIN:
Check out Ask Ryan - Free AI coaching from Ryan Serhant
https://askryan.com

BUSINESS CARD:
Ask Ryan
https://askryan.com

## DOMAIN EMAIL (BONUS)

Add professional email:

1. Use Vercel's email forwarding
2. Or set up Zoho Mail (FREE)
   - Create: info@askryan.com
   - Forwards to your Gmail

## FAQ

Q: Should I buy the domain before launching?
A: No - launch on Vercel/Railway first, domain is optional

Q: Can I change domain later?
A: Yes - just update Vercel/Railway settings

Q: What if askryan.com is taken?
A: Try: askaryan.ai, ryancoach.app, coachfinances.com

Q: Do I need domain for MVP?
A: No - vercel.app URL works fine for testing

## QUICK COST SUMMARY

| Cost Item | Price | When |
|-----------|-------|------|
| Groq API | $0 | Always free |
| Vercel | $0 | Always free |
| Railway | $0 | Always free |
| Domain | $12/year | Optional |
| Email | $0 | With Zoho |
| **TOTAL** | **$0-12/year** | Minimal |

## DOMAIN REGISTRATION COUPON CODES

Namecheap: 'HAPPYNEWYEAR' (10% off)
Google: First .com usually $10 (not $12)

## NEXT STEPS

1. Decide on domain name
2. Check availability at namecheap.com
3. Purchase domain
4. Deploy Vercel + Railway
5. Connect domain in both platforms
6. Wait for DNS propagation
7. Test: https://askryan.com
8. Launch! 🎉

