/* The Roundtable Script Vault - data. Generated/curated; loaded by scripts.html */
/* ============ TOPICS ============ */
const TOPICS = [
 ["expired","Expired Listings","They already raised their hand once. Lead with a diagnosis, not a pitch."],
 ["fsbo","For Sale By Owner","Respect the attempt. Become the backup plan they call first."],
 ["circle","Circle Prospecting & Just Listed / Just Sold","Turn one transaction into a neighborhood conversation."],
 ["soi","Sphere & Referrals","The cheapest lead you'll ever get is one you already know."],
 ["openhouse","Open House & Sign Calls","Every visitor is either a buyer, a seller, or knows one."],
 ["online","Online Leads & Follow-Up","Speed wins the lead; cadence wins the client."],
 ["social","Social & Video DMs","Content starts the conversation — these scripts finish it."],
 ["luxury","Luxury & Design-Led Listings","Sell the life, stage the story, price with confidence."],
 ["absentee","Absentee & Investor Owners","Talk numbers, not feelings — these owners think in returns."],
 ["nod","Pre-Foreclosure & NOD","Options first, dignity always. Urgency without pressure."],
 ["tax","Tax-Defaulted Property","A deadline is coming whether anyone calls or not. Be the one who called."],
 ["probate","Probate & Inherited Property","Family first. The house is the last thing on their list — make it the easiest."],
 ["divorce","Divorce Listings","Stay neutral, serve both sides, let the process protect everyone."],
 ["nego","Negotiation & Saving Deals","Tactical empathy for price cuts, low appraisals, and cold feet."],
 ["cre","Commercial & Multifamily","Cap rates, NOI, and 1031 clocks — speak owner."],
 ["invest","Flips, Wholesale & Creative Finance","Certainty and speed are the product. Terms are the secret weapon."],
 ["espanol","Español & Bilingual","Confianza primero. Scripts that respect the familia and win the trust."],
 ["senior","Senior Moves & Downsizing","The last home they'll ever sell. No clock, no pressure — sometimes the answer is stay."],
 ["adultchild","Aging Parents & the Adult Child","The son or daughter usually calls first. Plan it before it becomes a crisis."],
];

/* ============ SCRIPT LIBRARY ============ */
/* ch: call | vm | text | email */
const SCRIPTS = [

/* ---------- EXPIRED ---------- */
{t:"expired",ch:"call",adv:"Brandon Mulrenin",title:"The Diagnosis Call",body:
`YOU: Hi, is this {{Owner}}? ... Hey {{Owner}}, my name's {{Agent}} — I'm a local agent here in {{Neighborhood}}. I noticed your home recently came off the market without selling. And I'm sure I'm probably the tenth agent to reach out, so I'll be quick. (Tonality: slow, downswing ending)

I'm not even sure I could help, but would you possibly be open to just one quick question about the process?

(wait — let them grant permission)

Looking back at everything, what do YOU think ultimately kept it from selling?

(listen — do not interrupt. Label what you hear, using strategic empathy and non-threatening language. Example responses from agent:)
"It sounds like getting the right exposure was a real challenge."
"Seems like the pricing strategy might have been a little off-target."

Just one more quick thing, and I'll let you go: If you could sell it without all the frustration you just went through... would that even be worth a quick conversation to explore?`},
{t:"expired",ch:"call",adv:"Tim & Julie Harris",title:"The Re-List Appointment Setter",body:
`YOU: Hi {{Owner}}, this is {{Agent}} with {{Brokerage}}. I saw your home at {{Address}} went off the market. Did you decide to walk away, or did the listing just expire?\\n\\nIf it expired: I know that's disappointing after all the work you put in. Most of the time the buyers aren't saying the house is bad – they're saying the presentation missed the mark. That's why I always send a Pre‑Listing Package before we even meet. It previews the price, the market data, and the exact steps I'll take to get a Polished, Professional Presentation on the market.\\n\\nBefore we lock in a time, can I ask a quick question? Are you currently working with another agent, and what's your timeline to sell?\\n\\nI have a slot at 4 PM today or tomorrow morning – which works better for a brief call?`},
{t:"expired",ch:"vm",adv:"Tom Ferry",title:"Expired Voicemail — The Stat Hook",body:
`Hi {{Owner}}, this is {{Agent}} with {{Brokerage}}. I saw your home at {{Address}} came off the market. The numbers I track show that homes like yours, when re-listed with a clear plan, often sell in under 30 days and for a stronger price. I've put together a specific plan for what I'd do differently. I'll email that over. If you'd like the 10-minute version by phone, call me at {{Phone}}. Again, {{Agent}}, {{Phone}}.`},
{t:"expired",ch:"text",adv:"Jimmy Burgess",title:"Expired Value-First Text",body:
`Hi {{Owner}}, {{Agent}} here. Noticed your home came off market. I just put together a quick valuation update for your specific address, focusing on current comparables. Want me to send it over? It's yours, no strings.`},
{t:"expired",ch:"email",adv:"Tim & Julie Harris",title:"Expired Follow-Up Email",body:
`Subject: Why {{Address}} didn't sell

{{Owner}},

Your home at {{Address}} didn't sell. In our experience, it's rarely the home itself. It's almost always a breakdown in the crucial steps that lead to a successful sale, like the Pre-Listing Package or a Polished, Professional Presentation.

I've prepared a specific Listing Evaluation for you, showing precisely what we'd change to get it sold. My goal is to get the listing every single time, and this evaluation will show you how. I can drop it off, or email it. No listing agreement is required to see it.

{{Agent}} · {{Brokerage}} · {{Phone}}`},

/* ---------- FSBO ---------- */
{t:"fsbo",ch:"call",adv:"Brandon Mulrenin",title:"FSBO Backup-Plan Call",body:
`YOU: Hi, I'm calling about the home for sale. Is this the owner? ... Great. {{Owner}}, this is {{Agent}}. I'm a local agent, and I'm not actually calling to ask for the listing. I was just wondering if I could ask you a couple of quick questions?

(pause for permission)

YOU: First, if you sell it independently, and it goes exactly as you hope — where are you moving to next? (listen; people talk about the dream, not the house)

YOU: And usually, owners like yourself are looking to protect their equity by selling on their own. Is that a fair assessment for you too? (listen)

YOU: I totally get that. So, here's my only thought: if at some point the calls slow down, or the showings turn into strangers just wandering through... would you possibly be open to having a sensible backup plan already in place? No cost to contemplate one.

I'll check back in a couple of weeks. If it's sold by then, I'll be the first to congratulate you.`},
{t:"fsbo",ch:"vm",adv:"Tim & Julie Harris",title:"FSBO Voicemail — The Ally",body:
`Hi, this is {{Agent}} with {{Brokerage}}. I saw your home for sale on {{Address}}. I'm not calling to talk you out of selling yourself. I work with prequalified buyers in {{Neighborhood}} every week. If I have one who is a perfect fit, I'd like to bring them by — you'd only pay the buyer's side. Call me at {{Phone}} and I'll share what they're approved for and their desire to write an offer. {{Agent}}, {{Phone}}.`},
{t:"fsbo",ch:"text",adv:"Ricky Carruth",title:"FSBO Zero-Pressure Text",body:
`Hey {{Owner}}, this is {{Agent}} from {{Neighborhood}}. Saw your house is for sale. I wanted to reach out and offer to help you for free with anything – pricing, offers, whatever you need. How's traffic been?`},
{t:"fsbo",ch:"email",adv:"Jimmy Burgess",title:"FSBO Toolkit Email",body:
`Subject: Market Insights for {{Address}}

Hi {{Owner}},

Many owners selling on their own find the biggest challenges are pinpointing a precise value, pre-qualifying buyers, and handling the necessary paperwork. 

I've put together a specific resource for {{Neighborhood}} that addresses these: a current comp report, a checklist for buyer qualification, and the state disclosure rundown. It's a quick way to get clarity. 

My goal is to provide useful information upfront. Let me know if you'd like me to send it over.

{{Agent}} · {{Brokerage}} · {{Phone}}`},

/* ---------- CIRCLE ---------- */
{t:"circle",ch:"call",adv:"Ricky Carruth",title:"Just Sold Circle Call",body:
`YOU: Hey, is this {{Owner}}? This is {{Agent}} with {{Brokerage}}. How are you doing today?

(pause for their response)

Great. I'm calling because I just helped a family sell their place right around the corner from you on {{Street}}. When a home sells, it always impacts the values nearby, so I'm just letting the neighbors know what it went for. Do you want to hear the number?

(tell them the price – no gatekeeping, just give the info)

That's the market talking right now. Listen, I'm not calling to push anything. It's not about the deal, it's about the relationship. Quick question, and I'll let you go: any thoughts about making a move in the next year or two, or are you comfortable staying put?

(staying:) Perfect. I'll just keep you updated on your street's activity. You'll always know what your home is worth on my watch.`},
{t:"circle",ch:"vm",adv:"Tom Ferry",title:"Just Listed Voicemail",body:
`Hi {{Owner}}, {{Agent}} with {{Brokerage}}. Just listed a home near you at {{Address}}, showings begin this weekend. Two quick points: First, if you know anyone ready to buy in {{Neighborhood}}, this is their chance. Second, this listing just shifted the market data for your home's value. I can share exactly what that means for your property, no cost. Call me at {{Phone}}. Thanks.`},
{t:"circle",ch:"text",adv:"Glennda Baker",title:"Neighborhood Story Text",body:
`{{Owner}}, quick story, bless your heart: the house on {{Street}} got 6 offers in 5 days. But honey, the one that won wasn't the highest — it was the cleanest. That's the real truth in {{Neighborhood}}. If you're ever curious what your house would truly bring, I'll tell you the honest number, not some internet guess. — {{Agent}}`},
{t:"circle",ch:"email",adv:"Gary Keller",title:"Neighborhood Market Update Email",body:
`Subject: {{Neighborhood}}: What sold, for what, and what it means for you

Hi {{Owner}},

Every month, I share the hard numbers on the {{Neighborhood}} market — the homes that sold, their price, and the impact on your equity. No fluff, just the facts I'd want if I lived on your street.

This month's highlight: {{Street}} closed above list after one weekend. Inventory is thin, so prepared sellers are naming their terms.

Most homeowners don't know their current equity. If you want to know your number, reply "equity." I'll build you a private annual review. It takes me an hour, costs you nothing.

{{Agent}} · {{Brokerage}}`},

/* ---------- SOI ---------- */
{t:"soi",ch:"call",adv:"Brian Buffini",title:"The Relationship Call",body:
`YOU: {{Name}}! It's {{Agent}} — how ARE you? (genuine catch-up first — kids, work, the thing you know about their life. This is 80% of the call. Mean it.)

(then, naturally:)
Hey, while I've got you — the market's been doing some interesting things in {{Neighborhood}} and a couple of your neighbors have asked me what their homes are worth. If YOU ever want that number, you know it's a phone call, right?

And listen — you know how I build my business: I work by referral. So if a friend, a coworker, anyone mentions moving... I'm never too busy for the people you care about. You have my word they'll be looked after.

(close with THEM:) Great catching up. Give my best to {{Family Member}}.`},
{t:"soi",ch:"vm",adv:"Gary Keller",title:"Annual Equity Review Voicemail",body:
`Hi {{Name}}, it's {{Agent}}. Every year, I do a financial snapshot for the people in my world — what your home's worth, what you owe, and the wealth that gap represents. Most homeowners are sitting on more than they think. It's a quick read, gives you the ONE thing you need to know about your biggest asset. Want yours? Call or text me at {{Phone}} and I'll get it to you this week.`},
{t:"soi",ch:"text",adv:"Sharran Srivatsaa",title:"The Value Ping",body:
`{{Name}} — just reviewed the latest numbers: homes in {{Neighborhood}} are tracking up, specifically your asset class. No immediate action required, just an update for your owner P&L. Always here for the data. — {{Agent}}`},
{t:"soi",ch:"email",adv:"Brian Buffini",title:"The Oh-By-The-Way Email",body:
`Subject: Thinking of you (and a quick market note)

Hi {{Name}},

It was great seeing you at {{Event}} — I've been meaning to follow up ever since.

Quick professional note while I have you: the {{Neighborhood}} market has shifted enough this quarter that I'm re-running numbers for everyone I care about. If you'd like to know what your place is worth in today's market, it's a ten-minute conversation and it's always free for you.

Oh, by the way — I'm never too busy for your referrals. If someone you know is thinking about a move, the best compliment you could ever give me is an introduction.

{{Agent}}`},

/* ---------- OPEN HOUSE ---------- */
{t:"openhouse",ch:"call",adv:"Ryan Serhant",title:"Open House Follow-Up — Same Day",body:
`YOU: {{Name}}! {{Agent}} here — we met at the open house on {{Address}} this afternoon. You were the one who loved the {{Feature}} — I remember because you went back to look at it twice.

So, real talk: what did you think once you got in the car?

(listen — then match their energy:)
If they loved it: "Here's what I know — two other groups asked for disclosures today. If this is the one, let's not let the weekend decide for you. I can have us in front of the sellers by tomorrow."
If lukewarm: "Totally fair. Tell me what was missing — because if it exists in {{Neighborhood}}, I'll find it. That's literally my job. What are the three non-negotiables?"

Either way: follow up, follow through, follow back. You'll hear from me Tuesday with what happened to the house — deal?`},
{t:"openhouse",ch:"vm",adv:"Ricky Carruth",title:"Sign Call Voicemail Return",body:
`Hey, it's {{Agent}} – you called my sign at {{Address}} earlier. Sorry I missed you! Quick answers: it's {{Price}}, {{Beds}} bed {{Baths}} bath, and still available. I'm around all evening if you want to swing by, no pressure. Or if that one's not the fit, tell me what you're looking for and I'll send you the two or three in {{Neighborhood}} that actually match. {{Phone}}. Talk soon.`},
{t:"openhouse",ch:"text",adv:"Jason Pantana",title:"Post-Open-House Text",body:
`Hey {{Name}}, {{Agent}} here from the {{Address}} open house. Full tour + disclosures are in your inbox. Quick heads-up: sellers review offers Tuesday. Want me to put you on the list for updates so you don't miss anything?`},
{t:"openhouse",ch:"email",adv:"Glennda Baker",title:"Open House Recap Email",body:
`Subject: The story behind {{Address}} (since you asked)

Hi {{Name}},

Oh, my stars, it was great meeting you today! You asked why these folks are letting go of this house — and honey, here's the real story, what agents won't always tell you: They bought this place eleven years ago, raised two sweet babies here, and just got pulled away by a job out of state. They truly love this home. They aren't running from it; they're being *pulled* away.

Now, why does that matter to you? Because when sellers love their home, they price it right and they take care of it like family. That's exactly what the inspection reports show, darlin'.

The photo tour and disclosures are attached. If you want to see it again quietly — no open-house crowd — I can make that happen this week.

{{Agent}} · {{Brokerage}} · {{Phone}}`},

/* ---------- ONLINE LEADS ---------- */
{t:"online",ch:"call",adv:"Sharran Srivatsaa",title:"Speed-to-Lead First Call",body:
`YOU: Hi {{Name}}, this is {{Agent}} — you were just looking at {{Address}} online. My objective here is to save you time, so I wanted to connect while that property is top of mind. Do you have 90 seconds?

(pause for permission)

Great. To ensure I only send you precise matches, I have three quick questions:
One — is {{Address}} the exact type of home, or just close to your criteria?
Two — what's your timeline for a move: are we talking months or years?
Three — has anyone walked you through a real pre-approval number yet, or is that still a step you're planning?

(then deliver ONE piece of value:)

Based on that, here's the structure: I'll engineer three top matches for you in {{Neighborhood}} tonight — including one that isn't publicly listed yet. If I prove useful, keep me. If not, you fire me. Fair?`},
{t:"online",ch:"vm",adv:"Tom Ferry",title:"Online Lead Voicemail #1",body:
`Hi {{Name}}, it's {{Agent}} with {{Brokerage}}. You inquired about {{Address}} a few minutes ago. I've got the current market intelligence on that one: the real status, the seller's exact plan, and what the winning bid looks like right now. Call or text me at {{Phone}} — and either way I'm sending you two similar homes tonight that most buyers haven't seen yet.`},
{t:"online",ch:"text",adv:"Chelsea Peitz",title:"The Human First Text",body:
`Hey {{Name}}, it's {{Agent}} 👋. You checked out {{Address}} online. I was just there and there's a specific detail the listing photos don't tell you. Happy to share my take via text, no call needed. Just reply if you want the real story.`},
{t:"online",ch:"email",adv:"Byron Lazine",title:"The Market-Reality Email",body:
`Subject: {{Address}} — The Real Numbers

{{Name}},

You checked out {{Address}}, so let's cut through the noise. Most portals just show you headlines, not the actual take.

Right now, homes in {{Neighborhood}} are clocking {{DOM}} days on market. But the real story is the gap between list price and what actually closes. That number tells you everything about leverage for your offer — and it moves fast.

My buyers get a quick Hot Sheet every week: what listed, what sold, what got a price cut, and what it means for your strategy *today*. No fluff, no endless emails. Just the numbers. Want in? Reply "brief."

{{Agent}} · {{Brokerage}}`},

/* ---------- SOCIAL ---------- */
{t:"social",ch:"text",adv:"Glennda Baker",title:"DM Reply — Story Hook",body:
`Well hey there, {{Name}}! You caught the house with the story 👀. What I couldn't squeeze into that video? The sellers already bought their next place, honey. That means they're really pushing on timeline, not just the price. Are you asking for yourself, or are you playing matchmaker for somebody else?`},
{t:"social",ch:"text",adv:"Chelsea Peitz",title:"DM Conversation Starter",body:
`Hey {{Name}}, thanks for connecting! My content shows the real, lived experience of {{Neighborhood}} real estate – the wins, the weird stuff, all of it. Quick question so I can share what matters to you: are you more curious about home values right now, or thinking about a move at some point? No pitch, just genuinely tailoring my perspective to who's here.`},
{t:"social",ch:"email",adv:"Jason Pantana",title:"Video-to-Inbox Email",body:
`Subject: Your {{Neighborhood}} market: What the numbers actually say

Hi {{Name}},

Thanks for watching the {{Neighborhood}} market breakdown on Instagram. This is the follow-up with the tactical numbers on screen.

Attached: the full chart of homes sold in the last 60 days, which price band is moving fastest, and the one stat that surprised everyone (hint: it's the price-cut percentage).

If you want this monthly — real data, 90 seconds, zero jargon — reply "subscribe" and you're in. No fluff, just what works.

{{Agent}} · {{Brokerage}}`},
{t:"social",ch:"call",adv:"Byron Lazine",title:"The Content-to-Call Bridge",body:
`(calling a lead who's engaged with your content for weeks)

YOU: {{Name}}? It's {{Agent}} — the one whose market takes you keep hitting instead of, you know, doing your actual job. (laugh — earn the pattern interrupt)

I'm calling because you dropped a comment on the video about {{Topic}}, and honestly, the comment section wasn't the place for the full argument. You need the 'so what.'

Here's the real version: (give the actual insight, with numbers — one full minute of pure value, nothing asked, maybe the 'marry the house, date the rate' math if it fits)

That's it — that's the call. But since I've got you: is all this market research for a real move, or are you just a fellow market junkie like me? Both answers are good answers.`},

/* ---------- LUXURY ---------- */
{t:"luxury",ch:"call",adv:"Ryan Serhant",title:"Luxury Listing Pitch Call",body:
`YOU: {{Owner}}, {{Agent}}. I'll be direct because your time is expensive: I want to sell {{Address}}, and I want to tell you the one thing most agents won't.

Your home isn't going to sell because of its square footage. Nobody buys 6,000 feet — they buy the morning they wake up to that view, the dinner party in that kitchen, the life your home lets them tell people they have. That's what I sell.

Here's what that looks like in practice: cinematic film, not photos. A launch, not a listing. The right eyeballs in {{City}} AND out of state — because your buyer probably doesn't live here yet.

I'd like 45 minutes to show you the full playbook, including exactly what I'd spend on your launch and where. When works — Thursday, or the weekend?`},
{t:"luxury",ch:"vm",adv:"Sharran Srivatsaa",title:"Luxury Seller Voicemail",body:
`{{Owner}}, this is {{Agent}} with {{Brokerage}}. We track the unlisted assets moving in {{Neighborhood}}. Many owners leave significant capital on the table with an unsolicited offer because they haven't engineered their exit. I've built the market-data architecture for {{Address}} — your definitive number, not an algorithm's guess. It's yours. {{Phone}}.`},
{t:"luxury",ch:"email",adv:"Cheryl Eisen",title:"The Staging ROI Email",body:
`Subject: {{Address}}: The Investment in a Buyer's Fantasy

{{Owner}},

At this level, buyers aren't just shopping for square footage. They're looking for a fantasy, a future. A vacant luxury property reads cold and small; it can't tell that story, can't create that emotional connection.

For {{Address}}, our focus would be merchandising a specific price point, building photographable moments: the champagne terrace, the styled vanity, the breakfast moment. We make every room earn its job, creating magazine-worthy design that makes buyers fall in love.

Considering the cost of a first price cut, the ROI on this approach is clear. When may I see {{Address}}?

{{Agent}} · {{Brokerage}}`},
{t:"luxury",ch:"text",adv:"Shea McGee",title:"Pre-List Design Text",body:
`{{Owner}}, before we list: let's spend an hour making your home feel truly designed. Getting the scale right, layering textures, and styling for a collected look routinely add more than they cost. I'll bring the vision; you keep the list price. Thursday or Friday?`},
{t:"luxury",ch:"email",adv:"Joanna Gaines",title:"The Lifestyle Listing Email",body:
`Subject: The feeling {{Address}} wants to share

{{Owner}},

Every home has a heart, and the ones that truly connect with people tell a story they can feel. When someone steps into {{Address}}, they shouldn't just see walls and rooms – they should imagine slow Saturday mornings, dinners that linger, and a quiet porch where the day unwinds.

That's how I approach a home: creating spaces you never want to leave. It's about intentionality and a few thoughtful touches, so its best life is visible in every photo and every showing.

I'd love to walk through with you and share how we can bring out that warmth. Buyers always find a way back to a place that feels like home.

Warmly,
{{Agent}} · {{Brokerage}}`},

/* ---------- ABSENTEE ---------- */
{t:"absentee",ch:"call",adv:"David Greene",title:"Out-of-State Owner Call",body:
`YOU: {{Owner}}? {{Agent}} here — I'm a local agent in {{Neighborhood}}, and I'm calling because you own {{Address}} but live out of the area. I work with a lot of long-distance owners, so I'll get right to it. 

Most owners like you want to know three things to make a smart move with their equity:

One — what the property would rent for today, compared to what you're getting.
Two — what it would sell for, as-is, right now.
Three — how to move that capital into something that will actually cash flow better, with less work on your part.

I can run those numbers for you this week. It takes about an hour, costs you nothing, and you'll know exactly where you stand. Worst case, you keep the property and sleep better. What's your email?`},
{t:"absentee",ch:"vm",adv:"Ken McElroy",title:"Tired Landlord Voicemail",body:
`{{Owner}}, this is {{Agent}} in {{City}}. You've owned {{Address}} a long time. For many landlords, the property's been good, but the daily operations — the calls, turnover, maintenance — those start eating into your profit. I ran your numbers: what it rents for, what it'd sell for, and a 1031 into something truly cash-flowing, with professional management. Ten minutes and they're yours. {{Phone}}.`},
{t:"absentee",ch:"text",adv:"Jerry Norton",title:"Absentee As-Is Text",body:
`Hi {{Owner}}, {{Agent}} here in {{City}} — you own the property on {{Street}}. Quick one: if you could sell it AS-IS — no repairs, no cleanout, no flying back — would a cash number even interest you? If not, no worries at all. If maybe, I'll send it over today.`},
{t:"absentee",ch:"email",adv:"Bob Knakal",title:"The Ownership-Duration Email",body:
`Subject: {{Address}} — Ownership since {{Year}}

{{Owner}},

You've held {{Address}} since {{Year}}. Over that time, the market has shifted, and your original acquisition has evolved into a very different asset. Many owners in {{Neighborhood}} who bought around that period are now evaluating their options.

Based on our block-by-block data for this territory, there are typically three paths to consider: holding with a strategic refinance, a direct sale, or a tax-efficient exchange. Each decision has specific financial implications, and it's rare to see a detailed, data-driven comparison of all three.

We compile these precise comparisons for owners in {{Neighborhood}} as part of our work. Would it be useful to review yours?

{{Agent}} · {{Brokerage}} · {{Phone}}`},

/* ---------- NOD ---------- */
{t:"nod",ch:"call",adv:"Nicole Espinosa",title:"The Options Call (NOD)",body:
`YOU: Hi {{Owner}}, my name is {{Agent}} — I'm a local agent, and I'm calling because a notice was filed on {{Address}}. I know you've probably heard from a lot of people already, and most of them are just trying to buy your house for pennies. I don't operate that way.

Here's what you need to know: the clock is always ticking once that NOD hits. Every week that passes means fewer real options. My first question is always: are you in foreclosure? Do you have a sale date yet? That timeline decides everything.

Depending on your situation, we can explore how to keep the home, or sell it to protect your equity. If a short sale is the best path, my team handles that entire process – the bank pays our fee, so it costs you nothing. We don't wait for the bank to call us; we drive the process.

I can map out every option for you. One call, no cost, and you pick the best move. Can we talk this week?`},
{t:"nod",ch:"vm",adv:"Nicole Espinosa",title:"NOD Voicemail — No Shame",body:
`{{Owner}}, this is {{Agent}}, a local agent — not a bank, not an investor. A notice was filed on your home, and the timeline is everything now. Waiting only narrows your options. I specialize in helping homeowners in exactly this spot figure out every avenue: keeping the home, selling to protect your equity, or stopping the sale. This isn't about shame. Ten minutes, no cost, no judgment: {{Phone}}. Even if it's not me, call someone this week.`},
{t:"nod",ch:"text",adv:"Chris Voss",title:"NOD First Text",body:
`{{Owner}}, this is {{Agent}}, a local agent. It seems like everyone calling about your home lately wants something FROM you. Is it a bad idea to send you a one-page list of the options that protect YOUR equity — no call needed, just the list?`},
{t:"nod",ch:"email",adv:"Nicole Espinosa",title:"NOD Options Email",body:
`Subject: {{Address}} — Options for your NOD

{{Owner}},

You've likely seen a flood of letters since your Notice of Default. What's different about mine is I'm not here to buy your house. My firm specializes in one thing: helping homeowners facing foreclosure.

Your timeline is everything now. We need to know: do you have a sale date yet? That decides your real options. We'll look at everything from a loan modification (if you still qualify) to selling the property traditionally, or if the numbers demand it, a short sale – where the lender pays our fee.

Banks won't call you. You have to drive the process. Don't wait. Let's figure out your next step.

{{Agent}} · {{Brokerage}} · {{Phone}}`},

/* ---------- TAX ---------- */
{t:"tax",ch:"call",adv:"Ted Thomas",title:"Tax-Default Redemption Call",body:
`YOU: {{Owner}}? My name is {{Agent}} — I help folks here in {{City}} understand their options. I'm calling about the taxes on {{Address}}. The county has it on the delinquent list, and most owners don't grasp what that clock really means.

Here's the plain truth: right now, you're in the redemption period. You can bring it current, and everything's fine. But if it runs the full five years, the county will confiscate and auction the actual title. That's where it hurts: any equity above the back taxes is gone for pennies on the dollar.

This isn't some broker; you're dealing directly with the government, and they don't negotiate once it's at auction. You have real choices while this window is open: bring it current, arrange a county payment plan, or — if the property's become a burden — sell it, pay the taxes at closing, and KEEP your equity.

Education is important. I'll map out your options free. Can I show you the numbers this week, before another penalty hits?`},
{t:"tax",ch:"vm",adv:"Ted Thomas",title:"Tax-Default Voicemail",body:
`{{Owner}}, this is {{Agent}}. The county's property tax code shows {{Address}} is delinquent. You're in the redemption window, the critical time to keep control. The government *will* confiscate that property, and someone *will* buy your mortgage-free equity for cents on the dollar if you don't act. Don't be doomed by not knowing the rules. Let's look at your options. {{Phone}}.`},
{t:"tax",ch:"text",adv:"Ted Thomas",title:"Tax Deadline Text",body:
`{{Owner}}, {{Agent}} here. The tax default on {{Address}} has a critical redemption deadline. Owners who act know their options and keep their equity; those who don't lose it to the government at auction. My one-pager on your choices takes 30 seconds to read.`},
{t:"tax",ch:"email",adv:"Ted Thomas",title:"Tax-Default Options Email",body:
`Subject: {{Address}}: Your Tax-Defaulted Property Options

{{Owner}},

County records indicate {{Address}} is on the tax-defaulted list. This means the clock is ticking, but you still have leverage inside the redemption window.

Most owners in this situation have three paths forward:

1.  Pay the back taxes to keep your property. I can get you the exact figure.
2.  Explore a county installment plan to spread payments and stop the auction.
3.  Sell the property. We pay off the taxes at closing, and you keep every dollar of your remaining equity.

The worst outcome is letting this window close. I'll help you calculate your exact equity for free so you can make an informed decision. Reply or call {{Phone}}.

{{Agent}} · {{Brokerage}}`},

/* ---------- PROBATE ---------- */
{t:"probate",ch:"call",adv:"Chad Corbett",title:"Family-First Probate Call",body:
`YOU: Hi, is this {{Name}}? My name is {{Agent}}. I have a social enterprise here in the community that helps families who are managing a loved one's estate. I know this call is out of the blue, so I'll be direct about why I'm reaching out.

My primary role is to take the non-dollar-productive tasks off your plate. That's everything from managing the cleanout and utilities, to ensuring the property is cared for, to dealing with insurance. We're here to be a solution for everything the estate throws up.

How important is it to you to get some of these logistical burdens resolved efficiently?

(listen. Whatever they name, offer to handle a piece of it with NO strings:)
Let me take that one off your plate this week. No cost, no obligation, truly. And when the family is ready to consider the estate's assets, whether it's keeping, renting, or selling the property, I'll lay out all the options with real numbers. Whatever you choose, I'll help you do it. And if there are any proceeds, we can discuss a plan for investing those, so your loved one's legacy isn't erased.`},
{t:"probate",ch:"vm",adv:"Bill Gross",title:"Probate Process Voicemail",body:
`Hi {{Name}}, this is {{Agent}}. I specialize in helping families settle estates here in {{County}} County. The court process often has its own timeline, and sometimes cases just get stuck. My focus is on helping you understand the path forward, whether that's navigating court requirements like overbids, or just making sure the right experts are involved. I help with all of it, including the steps that have nothing to do with selling. If it would help to get clear on the next steps, I'm at {{Phone}}. No rush — whenever you're ready.`},
{t:"probate",ch:"text",adv:"Chad Corbett",title:"Probate Gentle Text",body:
`Hi {{Name}}, this is {{Agent}}. I specialize in supporting families through the estate settlement process here in {{City}}. If the property on {{Street}} ever feels like a burden, I coordinate everything from property preservation to finding the right solution. No pressure, just a resource. May I follow up?`},
{t:"probate",ch:"email",adv:"Al Nicoletti",title:"Probate Timeline Email",body:
`Subject: Resolving {{County}} Probate: What to Expect

{{Name}},

Probate often feels like a challenge, but most delays are avoidable, and the path forward is always more predictable with a clear strategy. Attached is a straightforward timeline for {{County}} County: what happens, the key documentation, and where families often get stuck.

Two things are worth knowing upfront:
1. A property can often be listed and under contract even while the estate is settling – the sale just needs to close in sequence with the court and title company, ensuring a closeable title.
2. If there's no will, it's a different setup, but very manageable when you understand the exact order of operations and what the underwriters will require.

I work directly with specialist probate attorneys, not in their place. If your attorney has this handled, great – keep the timeline. If you need a referral to someone who truly understands how long and how much, I can connect you.

{{Agent}} · {{Brokerage}} · {{Phone}}`},

/* ---------- DIVORCE ---------- */
{t:"divorce",ch:"call",adv:"Laurel Starks",title:"The Neutral Party Call",body:
`YOU: Hi {{Name}}, this is {{Agent}} — I was given your name by {{Referral Source}}. I specialize in real estate sales during divorce, and before anything else, you should know how I work, because it's different:

I represent the HOUSE, not either spouse. Same information to both of you, same time, in writing. Neither side gets my cell phone at 10pm and the other side a voicemail. That neutrality is why family-law attorneys refer me — it keeps the sale from becoming another battlefield.

What I'd do first: a written valuation both parties can trust, a sale timeline that fits the case timeline, and a communication plan your attorneys sign off on.

The house is often the biggest asset and the biggest fight. My job is to make it neither. Would it help if I sent both attorneys my process one-pager this week?`},
{t:"divorce",ch:"vm",adv:"Laurel Starks",title:"Divorce Listing Voicemail",body:
`Hi {{Name}}, this is {{Agent}}. I understand the home on {{Street}} may need to be sold as part of your case. I specialize in exactly this — court-involved sales where both parties need one neutral professional, equal communication, and a paper trail their attorneys can rely on. I've worked with {{County}} family-law attorneys for years. When you're ready, I'm at {{Phone}} — and everything I send goes to both sides, always.`},
{t:"divorce",ch:"text",adv:"Laurel Starks",title:"Divorce Neutral Text",body:
`Hi {{Name}}, {{Agent}} here — I handle home sales during divorce as a neutral: same info to both spouses, attorneys copied, no side-channels. If the {{Street}} property needs a valuation both parties can trust, I can have it done this week. Okay to send my process sheet?`},
{t:"divorce",ch:"email",adv:"Chris Voss",title:"The De-Escalation Email",body:
`Subject: The house doesn't have to be the fight

{{Name}},

It seems like the property may be the last big thing standing between you and done. That's normal — it's usually the largest asset, and by this point, nobody trusts anybody's numbers.

Here's a path that removes the argument: one neutral valuation, delivered to both parties and both attorneys simultaneously. Not my opinion — a documented analysis either side could take to court. From there, every decision (list price, offers, timeline) goes to both sides in writing, at the same time.

Would it be a bad idea to send both attorneys the one-page version of that process? If either objects, nothing happens and you've lost nothing.

{{Agent}} · {{Brokerage}} · {{Phone}}`},

/* ---------- NEGOTIATION ---------- */
{t:"nego",ch:"call",adv:"Chris Voss",title:"The Price-Reduction Conversation",body:
`(seller needs to cut the price — use the late-night FM DJ voice: slow, low, calm)

YOU: {{Owner}}... before we talk numbers, it sounds like this house means a great deal to you. You raised your family here. Twenty-two showings and no offer probably feels like the market is insulting your home.

(pause — let the label land)

It seems like you're worried that lowering the price means admitting the house is worth less. What if it means the opposite?

Here's what the market is telling us: buyers ARE coming — they're just using our price to sell the house down the street. We're the comp that makes the other homes look good.

How am I supposed to get you top dollar while we're priced where buyers won't even negotiate?

(silence. Let THEM solve it.)

...What would you say to repositioning at {{Price}} — not as a retreat, but as an ambush? Fresh eyes, multiple buyers, and the competition we've been missing.`},
{t:"nego",ch:"vm",adv:"Chris Voss",title:"The Cold-Feet Buyer Voicemail",body:
`{{Name}}... it's {{Agent}}. (slow, warm) It sounds like something about this deal stopped feeling right, and you've gone quiet because you're not sure how to say it. You don't have to have it figured out to call me back. Whatever it is — the money, the house, the timing — we look at it together before any paperwork does anything. No decision required on the call. {{Phone}}.`},
{t:"nego",ch:"text",adv:"Chris Voss",title:"The No-Oriented Text",body:
`{{Name}} — have you given up on {{Address}}? (It's okay if things changed. I'd just rather know than wonder, and I suspect you would too.)`},
{t:"nego",ch:"email",adv:"Chris Voss",title:"The Low-Appraisal Email",body:
`Subject: The appraisal — and the three doors it opens

{{Name}},

The appraisal came in under contract price. It seems like this feels like the deal falling apart. It isn't — it's a fork with three doors, and you control which one we walk through:

1. The seller meets the appraisal (more common than you'd think — I make that case tomorrow).
2. We split the gap (I'll show you exactly what that costs per month — it's usually less than a dinner out).
3. We challenge the appraisal with the two comps the appraiser missed.

Is it a bad idea to try door one first, knowing doors two and three stay open? Call me tonight — before we respond, I want you to feel like you chose the door, not me.

{{Agent}}`},

/* ---------- CRE ---------- */
{t:"cre",ch:"call",adv:"Bob Knakal",title:"The Building Owner Call",body:
`YOU: {{Owner}}, {{Agent}} with {{Brokerage}}. My team focuses exclusively on this specific patch of {{Submarket}}, and our records show you've owned {{Address}} for {{Years}} years. That puts you in a common window where owners often want to understand their position.

We operate on information. So, here's what our data shows, no charge and no pitch: based on our historical transaction comps and current cap rates for your asset class in this specific block, your building would likely trade in the range of {{Range}}. This isn't a guess; it's what the market dictates today.

Owners in your position typically consider three paths: do nothing, which is always valid. Refinance to pull equity while retaining the asset. Or execute a 1031 exchange into something larger or more passive. 

I'm not calling for a listing. I'm calling to be the expert who already knows your property when you're ready. Can I send you our full market analysis in writing?`},
{t:"cre",ch:"vm",adv:"Tyler Cauble",title:"Small CRE Owner Voicemail",body:
`{{Owner}}, this is {{Agent}}. I specialize in small commercial properties in {{City}}. Your building on {{Street}} caught my attention: with NNN conversions and below-market rents, the NOI growth trajectory could significantly impact its value. I've run some numbers — takes five minutes to share. Whether you'd ever sell or just want to roll rents at renewal, understanding that value-add is worth knowing. {{Phone}}.`},
{t:"cre",ch:"text",adv:"Tyler Cauble",title:"CRE Rent-Gap Text",body:
`{{Owner}} — {{Agent}}, Cauble Group in {{City}}. Rents on your block just jumped ~{{Pct}}% on two new deals. That's a value-add lever for your NOI. If your leases are rolling, that's real money. Want the comps? No strings.`},
{t:"cre",ch:"email",adv:"Ken McElroy",title:"Multifamily NOI Email",body:
`Subject: {{Address}}: The hidden cash flow

{{Owner}},

Most multifamily owners know their rent roll. Fewer truly understand the *actual* cash flow versus what the property *could* be producing with professional management. That difference is your real profit potential.

For a property like {{Address}}, that gap often sits at 15-25% of the current NOI. Remember, every dollar of added NOI at today's cap rates creates roughly {{Multiple}} dollars of value. That's forced appreciation through operations.

I analyze these numbers for {{City}} owners — identifying where to increase income and reduce costs. What that means for your bottom line. Yours is free. Interested?

{{Agent}} · {{Brokerage}} · {{Phone}}`},

/* ---------- INVEST ---------- */
{t:"invest",ch:"call",adv:"Tarek El Moussa",title:"The As-Is Seller Call",body:
`YOU: {{Owner}}? Hey, it's {{Agent}} — I'm a local investor and flipper in {{City}}. I'm calling about {{Address}} because houses that need work are exactly the kind my crew and I target.

You've got two real options here. One: we crunch the ARV, pull the comps, and I tell you which kitchen or bath upgrades actually move the needle – anything else just eats your budget. Two: we walk away from the repairs, take a cash offer, skip the clean‑outs and the endless showings, and close on your schedule.

Most agents push the first because it fattens their commission. I'll lay both numbers out, side by side, in a single sheet – no guesswork, just the math. It takes me a day. Want me to send it over?`},
{t:"invest",ch:"vm",adv:"Jerry Norton",title:"The Certainty Voicemail",body:
`{{Owner}}, this is {{Agent}} in {{City}}. If you've thought about selling {{Address}} but the condition's been holding you back — that's literally my specialty. I'll bring you a real number, backed by a real deposit, with no repair requests and no six-month escrow. You pick the closing date. If the number doesn't work, we shake hands and you keep my card. {{Phone}}.`},
{t:"invest",ch:"text",adv:"Pace Morby",title:"The Creative-Terms Text",body:
`Hi {{Owner}}, {{Agent}} here. Quick question about {{Street}}: what if you could sell for FULL price, avoid all the repairs and showings, and get paid over time? It's a creative way to buy. If that structure could solve a problem for you, would a 10-min chat be worth it to see if it fits? No pressure.`},
{t:"invest",ch:"email",adv:"David Greene",title:"The Investor Exit Email",body:
`Subject: {{Address}}: Your options for getting capital out

{{Owner}},

There are multiple ways to exit an investment property, and the actual numbers show a big difference in what you keep. For {{Address}}:

1. Retail sale, fully rehabbed: This means aiming for maximum ARV, but the rehab budget and carrying costs will eat into that return.
2. As-is to an investor: The fastest path. Investors need to make money when they buy, so they'll target a discount, often 75% or less of ARV.
3. Keep it and refinance: The BRRRR approach. Pull your capital out tax-free, then let a tenant pay down the loan while it still cash flows.

I run the real math on all three – including the rehab budget and what you'd net – so the decision makes itself. Want yours this week?

{{Agent}} · {{Brokerage}} · {{Phone}}`},

/* ---------- ESPANOL ---------- */
{t:"espanol",ch:"call",adv:"Loida Velasquez",title:"Llamada de Prospección (ES/EN)",body:
`YOU: Hola, ¿es {{Owner}}? Le habla {{Agent}}, soy agente de bienes raíces aquí en {{Neighborhood}}.

Le llamo porque una propiedad en su calle acaba de venderse, y sé que muchos vecinos no saben qué significa eso para el valor de su casa. Es su dinero, y le pertenece saberlo.

¿Ha pensado en cuánto vale su propiedad hoy? (pause for response) ¿Le gustaría que le prepare un análisis para que sepa el número real, sin compromiso?

(if they switch to English, flow with them:)
Of course! Like I was saying, a home just sold on your street, and it moved everyone's value. I'd love to send you the real number, free. Would email or text be better?

(cierre:)
Perfecto. Y si algún familiar o amigo está pensando en comprar o vender, con mucho gusto los atiendo — en español o inglés, como se sientan más cómodos.`},
{t:"espanol",ch:"vm",adv:"Rene Rodriguez",title:"Buzón de Voz — Confianza Primero",body:
`{{Owner}}, le habla {{Agent}}, agente local en {{City}}. Le dejo este mensaje porque los valores en {{Neighborhood}} subieron, y su casa probablemente vale más de lo que usted cree. Ese dato cambia decisiones — refinanciar, vender, o simplemente dormir tranquilo. Yo se lo preparo gratis, por escrito, sin ningún compromiso. Cuando guste: {{Phone}}. Que tenga excelente día.`},
{t:"espanol",ch:"text",adv:"Carlos Reyes",title:"Texto Directo (ES)",body:
`Hola {{Owner}}, soy {{Agent}}. Compramos casas en {{Neighborhood}}, aquí en {{City}}. Si le interesa una oferta en efectivo por su propiedad TAL COMO ESTÁ (sin arreglar nada), le doy los números. ¿Se la mando?`},
{t:"espanol",ch:"email",adv:"Veronica Figueroa",title:"Email Bilingüe — La Primera Casa",body:
`Subject: Su casa propia: más cerca de lo que cree / Homeownership: closer than you think

Hola {{Name}},

Muchas familias piensan que comprar casa requiere papeles perfectos, crédito perfecto y 20% de enganche. La verdad es que existen programas con enganche desde el 3%, ayudas para el pago inicial aquí en {{County}}, y opciones para compradores con ITIN o incluso préstamos para extranjeros.

En The Fig Team, hemos ayudado a cientos de familias a usar estos programas. Lo hacemos en español, paso a paso, sin apuros y sin letra chiquita. Nuestro compromiso es que su herencia sea una ventaja, no un límite.

(English: Many families think buying a home takes perfect credit and 20% down. There are programs with as little as 3% down, local down-payment assistance, ITIN options, and even foreign-national loans. We'll walk you through it, in whichever language feels like home.)

¿Le gustaría una consulta gratis de 15 minutos? Responda este correo y la agendamos.

{{Agent}} · {{Brokerage}} · {{Phone}}`},
 {t:"senior",ch:"call",adv:"Nikki Buckelew",title:"The Needs Assessment Call",body:"YOU: Hello {{Owner}}, this is {{Agent}} with {{Brokerage}}. I appreciate you taking a moment to talk. I'm not calling to push a sale—I'm here to understand what's most important to you right now. (pause) How are you feeling about your home these days? (listen) What would make everyday life easier or more comfortable for you here? (listen) Are there any changes or support you've been thinking about, like modifications or help with chores? (listen) If you could picture the next few years, what does staying here look like, and what might prompt you to consider a move? (listen) My role is to give you the information you need—whether that means staying put, exploring options, or something else. Does that sound helpful to you?"},
 {t:"senior",ch:"call",adv:"Nikki Buckelew",title:"When Staying Put Is the Right Answer",body:"YOU: Hello, {{Owner}}, this is {{Agent}} with {{Brokerage}}. I'm calling to follow up on our conversation from last week about your options. (pause)\n\nAfter reviewing everything we discussed, and considering your desire to stay in the home you love, I honestly believe that moving right now might not be the best decision for you. (pause)\n\nMany people, with some support and a few home modifications, can live comfortably and independently for many years in their own homes. My role is to make sure you're well-informed and empowered to make the best choice for yourself, even if that means not selling. I'd be happy to connect you with resources for home modifications or in-home support, if that's something you'd like to explore. (pause)\n\nUltimately, the decision is yours, and I want you to feel confident in whatever path you choose."},
 {t:"senior",ch:"call",adv:"Nikki Buckelew",title:"The Family Meeting — Whose Agent Am I",body:"YOU: Hello {{Owner}}, thank you for taking the time to talk today. I want to start by understanding what matters most to you right now. (Listen, pause)\\nYOU: You've mentioned staying in your home, and I hear that clearly. My role is first to make sure you feel fully informed about every option, even those that don't involve a sale. (Pause)\\nYOU: How do you feel about the ideas your children have shared? (Listen)\\nYOU: It's important that your voice remains the guide. I can help you explore modifications, support services, or a gentle transition, whatever feels right for you. (Pause)\\nYOU: If at any point you decide selling is the best step, I'll be here to assist, but there's no pressure or deadline. My goal is simply to support the choice that brings you comfort and peace of mind."},
 {t:"senior",ch:"call",adv:"Nikki Buckelew",title:"Someone Is Pushing Them",body:"YOU: Hello {{Owner}}, this is {{Agent}} with {{Brokerage}}. How are you feeling about the conversations you've been having about your home?\n(Listen, pause for answer)\nYOU: I hear there's a lot of pressure from {{Name}} about selling quickly. Can you tell me what's most important to you right now?\n(Allow response)\nYOU: It sounds like staying comfortable and keeping control are top priorities. Would it help to pause any decisions until you feel fully confident?\n(Wait)\nYOU: I can share some simple steps that let you explore staying put—like a home‑safety review or a modest remodel—without any obligation to list.\n(If they're open, continue)\nYOU: Let's set a time next week to look at those options together, and we'll move only when you decide it's right. Does that feel okay?"},
 {t:"senior",ch:"vm",adv:"Nikki Buckelew",title:"Last-Time Seller Voicemail",body:"Hello {{Owner}}, this is {{Agent}} with {{Brokerage}}. I'm calling because I understand you might be exploring some options for your home. I just wanted to let you know that our primary goal is to make sure you have all the information you need to make the best decision for yourself. Sometimes that means selling, and sometimes, with the right support, staying in your home is actually the best path forward. I'd simply like to offer a conversation to help you understand all your choices, without any pressure at all. My number is..."},
 {t:"senior",ch:"vm",adv:"Nikki Buckelew",title:"After the Seminar Voicemail",body:"Hi {{Owner}}, this is {{Agent}} from {{Brokerage}}. I wanted to thank you for joining our recent session on staying comfortable at home. I'm here to answer any questions you might have about home modifications, budgeting, or just exploring options—no pressure to sell. If you'd like to discuss what could make your home work better for you, give me a call at your convenience. I look forward to helping you feel confident about the next steps. Thank you, and have a wonderful day."},
 {t:"senior",ch:"text",adv:"Nikki Buckelew",title:"No-Pressure Check-In Text",body:"Hi {{Owner}}, {{Agent}} from {{Brokerage}} here. Just checking in - there's absolutely no pressure or timeline on this. Have you had any further thoughts about what might be best for your living situation, including exploring options for aging in place?"},
 {t:"senior",ch:"text",adv:"Nikki Buckelew",title:"The Question They Can Answer Text",body:"Hi {{Owner}}, this is {{Agent}} from {{Brokerage}}. Many homeowners are exploring their options for staying in their home or moving. What information would be most helpful for you to make a good decision?"},
 {t:"senior",ch:"email",adv:"Nikki Buckelew",title:"What Your Options Actually Are",body:"Subject: Your Options for the Home You Love\n\nHi {{Owner}},\n\nI'm reaching out because I know the decision about your home can feel overwhelming. First, let's explore every path—staying where you are with simple modifications, renting a portion, moving to a smaller house, or selling and using the proceeds for a new chapter. There's no deadline, no pressure to choose one over another. I'll listen to what matters most to you—comfort, independence, and peace of mind—then share the facts so you can decide what feels right. Whatever you choose, I'm here to support you, not to push a sale.\n\nWarm regards,\n{{Agent}}\n{{Brokerage}}"},
 {t:"senior",ch:"email",adv:"Nikki Buckelew",title:"For the Family, Not Just the Owner",body:"Subject: Support for {{Owner}}'s Next Steps\n\nHello,\n\nI understand you and {{Owner}} are exploring options for her home. This can be a significant decision, and often, families feel a mix of emotions and questions. My role is to ensure {{Owner}} is fully informed and empowered to make the best choice for herself, whether that means staying comfortably in her home, adapting it, or relocating.\n\nThere's absolutely no pressure or timeline. My first step is always to listen and understand what {{Owner}} truly wants and needs. We can review all possibilities together, ensuring she feels confident and clear about her path forward.\n\nWarmly,\n{{Agent}}\n{{Brokerage}}"},
 {t:"senior",ch:"call",adv:"Bruce Nemovitz",title:"Is It Time — The Question Call",body:"YOU: Hello {{Owner}}, this is {{Agent}} with {{Brokerage}}. Thanks for calling. I understand you're thinking about your next steps with your home, and wondering if now might be the time for a change.\n\n(pause for response)\n\nYOU: It's a big question, especially after living somewhere for so many years. I often hear people asking, 'Is it time?' For what it's worth, I always say: 'There is no perfect time, but if you're asking the question, the time is near.'\n\n(pause for response)\n\nYOU: My job isn't to push you into selling, but to help you understand what's involved, so you can make a decision you feel good about. We can look at your options, whether that's staying put comfortably, or exploring a move. We can even talk about selling as-is, or how to handle the physical work of downsizing and moving. Would it be helpful to simply sit down, no pressure, and just talk through what that might look like for you?"},
 {t:"senior",ch:"call",adv:"Bruce Nemovitz",title:"The Move-In Date Call",body:"YOU: Hello {{Owner}}, this is {{Agent}} with {{Brokerage}}. You mentioned your move-in date for the senior community is in early spring, and you wanted to talk about timing the sale of your house. (pause)\n\nYOU: That's a common question, and a very smart one to ask now. What we've found after helping many families is that the ideal time to list is typically two to three months before your community move-in date. (pause)\n\nYOU: The good news is, buyers are often quite flexible on occupancy. This gives us a comfortable window to prepare your home without feeling rushed. It also means we can line things up so you transition smoothly from one home to the next. Does that timeline make sense to you?"},
 {t:"senior",ch:"call",adv:"Bruce Nemovitz",title:"Sell It As-Is",body:"YOU: Hi {{Owner}}, this is {{Agent}} with {{Brokerage}}. I understand you're thinking about selling {{Address}} and that the big question is the condition of the home. (Pause) If the house is lived in for 30‑plus years, the memories are the biggest part, not the paint or the carpet. We can list it as‑is, price it right, and let the market do the work that a renovation would normally try to do. (Pause) I'll start by looking at the move‑in date for the community you're considering - that date anchors everything else. (Pause) Then we'll do a quick walk‑through, note the strengths - a good roof, updated furnace - and put together a \"strengths inventory\" for buyers. (Pause) From there we set a price that reflects those facts, and buyers who need a home ready to move in will come forward. (Pause) How does that sound to you?"},
 {t:"senior",ch:"call",adv:"Bruce Nemovitz",title:"Four Kids, Four Opinions",body:"YOU: Hello {{Owner}}, this is Bruce Nemovitz with {{Brokerage}}. Thanks for calling. I understand you're facing some different opinions among your family about the home. That's very common; it's a big decision for everyone involved. (pause) What often helps in situations like this is to establish a clear, objective baseline for the home's current market value, exactly as it stands today. This isn't about mediating feelings; it's about giving everyone a shared, factual number to stand on. My team and I can come out, walk through the house, and then prepare a detailed market analysis. We'd look at the home's condition, compare it to similar sales in the area, and give you a realistic picture of what buyers are paying right now. We can also discuss what selling 'as-is' looks like versus any potential updates. There's no pressure or obligation; it just gives everyone the facts to move forward, whatever direction you decide."},
 {t:"senior",ch:"text",adv:"Bruce Nemovitz",title:"The Eyes-Closed Text",body:"Hi {{Owner}}, try this: walk into a room, close your eyes, then open them—if the first thing you notice is a picture or vase rather than the space, that room probably needs to be cleared. Want me to walk you through a quick declutter plan?"},
 {t:"senior",ch:"text",adv:"Bruce Nemovitz",title:"Nothing To Fix Text",body:"Many of our clients worry about repairs. It's good to know that selling your home as-is is a completely valid approach, and we can still ensure it sells at fair market value by setting the right price. Does exploring that option feel less daunting, {{Owner}}?"},
 {t:"senior",ch:"email",adv:"Bruce Nemovitz",title:"The Paperwork Nobody Warns You About",body:"Subject: The paperwork that can stall your sale\n\nHi {{Owner}},\n\nWhen you're ready to move, the biggest surprise most families face isn't the market - it's the paperwork. Titles, trust documents, powers of attorney, and even death certificates often sit in a drawer and then cause a closing delay. I like to gather those items early, so nothing pops up when we're close to the buyer's offer. A quick checklist helps: the deed, any trust paperwork, the current power of attorney, and, if the home was inherited, the death certificate. Once we have those in hand, the sale proceeds smoothly and you can focus on the next chapter without a last‑minute scramble.\n\nWarm regards,\n{{Agent}}\n{{Brokerage}}"},
 {t:"senior",ch:"email",adv:"Bruce Nemovitz",title:"Your Home's Strengths Inventory",body:"Subject: Your Home's Strengths\n\nHi {{Owner}},\n\nI wanted to share a practical step that often helps buyers feel comfortable with an older home: compiling a \"Strengths Inventory.\" This simply means gathering details about your home's history. Buyers frequently ask about renovations, the age of mechanicals like the furnace or water heater, or when the roof was last replaced. Having these facts ready, alongside any trust documents or powers of attorney, provides clear answers and builds confidence. It allows us to present your home's story thoroughly and in the least intimidating way possible. We can discuss this more when we connect."},
 {t:"adultchild",ch:"call",adv:"Chris Spade",title:"Before It's a Crisis",body:"YOU: Hi {{Owner}}, this is {{Agent}} with {{Brokerage}}. Thanks for calling. Usually, by the time someone reaches me, a fall or a diagnosis has already put them in crisis mode.\n(Pause for their response)\nYOU: But you're calling now, which means you're thinking ahead. A family that plans has options - on price, timing, what the house needs, and even the tax implications. If we wait for a crisis, most of those options just disappear.\n(Pause)\nYOU: My job is to give you the tools to make informed decisions. It's not about being morbid, it's about being useful. We can just talk through what a 30-day market-ready checklist looks like, for example, just so you have it. Does that sound like a good next step?"},
 {t:"adultchild",ch:"call",adv:"Chris Spade",title:"Mom Fell — Three Weeks",body:"YOU: Hi {{Owner}}, {{Agent}} here from {{Brokerage}}. I hear Mom fell and you've got three weeks - that's a lot to juggle. First, let's make sure she's safe and has the right care set up; I can connect you with a senior move manager who handles medical clearance and short‑term assistance. (pause) Next, we'll lock down the financial picture - any reverse‑mortgage payoff, outstanding liens, and the capital‑gains step‑up. That tells us if selling now makes sense or if we wait a bit. (pause) Then we move to the house: I'll send you a 30‑day market‑ready checklist, broken into daily tasks so the home stays livable while we prep it for buyers. (pause) Finally, we schedule a quick walkthrough to confirm timing and any needed repairs. How does that sound so far?"},
 {t:"adultchild",ch:"call",adv:"Chris Spade",title:"Dad Won't Discuss It",body:"YOU: Hi {{Owner}}, this is {{Agent}} with {{Brokerage}}. You mentioned your dad isn't keen on discussing future plans. Look, this is common. My job is often to be the neutral third party, so you don't have to be the one pushing. (pause for acknowledgment) YOU: When you talk to him, you can simply say, \"Dad, I spoke with a real estate specialist, {{Agent}}. They actually have a really practical 30-day checklist for what it takes to get a house ready, and I thought it might be useful for us to just look at it together. Not to make any decisions, just to see what's involved.\" (pause) YOU: It gives you a reason to bring it up without it feeling like a threat. We can just review what options might look like, long before any crisis forces a decision. You're not being morbid, you're being useful."},
 {t:"adultchild",ch:"call",adv:"Chris Spade",title:"Sell Now or Wait for the Step-Up",body:"YOU: Hey {{Owner}}, Chris Spade here from {{Brokerage}}. I know you've got a lot on your plate and only a few minutes. (pause) First, let's talk money - the step‑up in basis can save you a big chunk of tax, but it only applies if the home stays in the estate until a death. If you sell now, we lock in today's market and you can use the proceeds to cover care, pay off a reverse mortgage, or give siblings a clean split. (pause) Does that line up with what you're hoping for? (listen) YOU: Got it. Next, the listing side - I'll give you a 30‑day market‑ready checklist that turns the house into a buyer‑magnet in a week. (pause) Once you've seen the numbers and the checklist, we can decide the timing that works for you and your family. (pause) Let's get you off the phone with a plan."},
 {t:"adultchild",ch:"vm",adv:"Chris Spade",title:"Gen X Voicemail",body:"Hi, this is {{Agent}} from {{Brokerage}}. I know you're likely juggling a lot right now with your parents. Most families wait until there's a fall or a diagnosis, and then you're forced to make big decisions in crisis mode. My work is about giving adult children the tools to get ahead of that. I've got a 30-day market-ready checklist that breaks down the entire process, from the house to the finances, into manageable steps. If you're curious about how to plan without pressure, give me a call back."},
 {t:"adultchild",ch:"vm",adv:"Chris Spade",title:"The Checklist Voicemail",body:"Hey, this is {{Agent}} with {{Brokerage}}. I know you've got a lot on your plate, so I'll keep this brief. I've put together a 30‑day market‑ready checklist that turns a lived‑in family home into a buyer‑ready property, step by step. It's the fastest way to reduce stress and keep your options open before anything becomes urgent. Text or call me back and I'll send it over right away. Thanks, and talk soon."},
 {t:"adultchild",ch:"text",adv:"Chris Spade",title:"You're Not Being Morbid Text",body:"I know planning ahead feels odd, but taking ten minutes now to map out your options gives you control and avoids last‑minute scramble—no one wants that. How about we start with a quick look at the 30‑day market‑ready checklist?"},
 {t:"adultchild",ch:"text",adv:"Chris Spade",title:"Ten Minutes Text",body:"Hi {{Owner}}, {{Agent}} from {{Brokerage}} here. Planning for your parents' house gives you options and avoids crisis mode. What's the single biggest concern you have about the house today?"},
 {t:"adultchild",ch:"email",adv:"Chris Spade",title:"The 30-Day Market-Ready Checklist",body:"Subject: Your 30-day plan for a big decision\n\nHi {{Owner}},\n\nI know you're juggling a lot right now. When it comes to helping your parents, the house can feel like the biggest task. That's why I put together a 30-day market-ready checklist. It breaks down everything needed to prepare a lived-in family home into a finite list with dates. It turns an overwhelming project into actionable steps, so you and your parents can explore options without being in crisis mode. This gives you control over timing, price, and the whole process. Let me know when you have ten minutes to discuss it."},
 {t:"adultchild",ch:"email",adv:"Chris Spade",title:"What to Sort Out Before You List Your Parents' House",body:"Subject: What to Sort Out Before Listing\n\nHi {{Owner}},\n\nBefore we talk about putting the house on the market, let's clear a few items that change the answer to \"should we sell?\" First, the step‑up in basis at death can wipe out capital‑gains tax—knowing the expected timeline helps us decide now or later. Next, if there's a reverse mortgage, we'll need the payoff amount and any remaining equity. A power of attorney or durable POA must be in place so we can sign paperwork without delay. Finally, we'll look at any outstanding liens or estate debts that could affect net proceeds. Getting these pieces sorted turns a vague worry into a concrete plan and keeps the process out of crisis mode.\n\n{{Agent}} | {{Brokerage}}"},
 {t:"expired",ch:"call",adv:"Anthony Nucci",title:"The Takeaway Opener",body:"YOU: Hi {{Owner}}, this is {{Agent}} with {{Brokerage}}. (Pause for acknowledgment)\nYOU: I'm calling about your property. I'm not even sure we're a good fit to work together, but I noticed your home was listed for sale recently and didn't close. I'm genuinely curious what happened there.\n(Pause for {{Owner}} to respond)\nYOU: I hear that. When it was on the market, what do you feel was the biggest challenge in getting it sold? Was it the marketing, the price, or something else that came up?"},
 {t:"expired",ch:"call",adv:"Anthony Nucci",title:"Just Send Me Something",body:"YOU: (High energy, standing) Hi {{Owner}}, this is {{Agent}} with {{Brokerage}}. I'm not even sure we're a good fit to work together. I just noticed your property at {{Address}} should have sold, and I'm curious what happened.\n(Pause for response. Assume they say \"Just send me something\" or \"I'm not interested, just send me something.\")\nYOU: I'll absolutely do that, {{Owner}}. (Agree immediately) But before I do — do you want me to get this offer over to you first, or are you completely done with selling?\n(Pause for response. Assume they choose to hear about an offer.)\nYOU: Great. So, if we could sell your home quickly and for the right price, what would that let you do next?"},
 {t:"expired",ch:"vm",adv:"Anthony Nucci",title:"Expired Voicemail — No Throat Clearing",body:"Hi {{Owner}}, this is {{Agent}} with {{Brokerage}}. I'm calling because I noticed your property at {{Address}} came off the market without selling. I'm genuinely curious what happened, because it should have sold. I've had success getting properties like yours sold quickly after they initially expired. Give me a call back when you have a moment. My number is [Your Number]. Again, this is {{Agent}} at {{Brokerage}}. Thanks."},
 {t:"expired",ch:"text",adv:"Anthony Nucci",title:"The Curious Question Text",body:"Hi {{Owner}}, I noticed your home at {{Address}} didn't sell and I'm curious—what do you think held it back?"},
 {t:"senior",ch:"vm",adv:"Bruce Nemovitz",title:"The 38-Year Home Voicemail",body:"Hi {{Owner}}, this is {{Agent}} with {{Brokerage}}. I noticed your home at {{Address}} has been in your family for 38 years, and I'm calling to see if you'd like a quick, no‑pressure look at the market and a simple checklist to help you decide what's next. There's no perfect time, but if you're asking the question, the time is near. Give me a call back at your convenience at {{Phone}}."},
 {t:"senior",ch:"vm",adv:"Bruce Nemovitz",title:"As-Is Voicemail",body:"Hello {{Owner}}, this is Bruce Nemovitz with {{Agent}} at {{Brokerage}}. I'm calling because many homeowners wonder if they need to update their house before selling. The truth is, that's often not necessary. Selling a home \"as-is\" is a completely legitimate strategy, and it continues to attract buyers when priced correctly. If you'd like to discuss how selling as-is could work for you, please call me back. My number is..."},
 {t:"adultchild",ch:"vm",adv:"Nikki Buckelew",title:"For the Son or Daughter Voicemail",body:"Hi, this is {{Agent}} with {{Brokerage}}. I'm reaching out because I work with families navigating housing decisions for parents. I can share a few questions that help clarify what's most important for {{Owner}}—whether staying, modifying, or exploring other options—so you all feel confident moving forward. Give me a call back at your convenience, and we can discuss how to keep the conversation focused on {{Owner}}'s wishes. Thanks."},
 {t:"adultchild",ch:"vm",adv:"Nikki Buckelew",title:"Nobody Has to Decide Today Voicemail",body:"Hi, this is {{Agent}} with {{Brokerage}}. I'm reaching out about {{Owner}}'s home. I understand you're feeling pressure to make a decision quickly. I want you to know there's no rush—our first step is simply to explore what's most comfortable for {{Owner}} right now. If you'd like to discuss options that keep her independent, give me a call back at your convenience. Thank you."},
 {t:"adultchild",ch:"text",adv:"Nikki Buckelew",title:"Your Parent Still Decides Text",body:"I'll always keep {{Owner}}'s wishes first and never discuss options without her. My role is to support her decisions, even if that means staying put. Does that sound okay to you?"},
 {t:"adultchild",ch:"text",adv:"Nikki Buckelew",title:"Come to the Meeting Text",body:"Hi {{Owner}}, this is {{Agent}} with {{Brokerage}}. I'm reaching out about your parent's housing, and I'd love to ensure everyone feels well-informed and supported. Would it be best for us to connect with them together?"},
 {t:"adultchild",ch:"email",adv:"Nikki Buckelew",title:"When You and Your Parent Disagree",body:"Subject: When you and Mom disagree about moving\n\nHi {{Agent}},\n\nI hear you're worried because Mom wants to stay while you feel a move is needed. First, let her know you respect her wishes and that her voice is the final one. Offer to sit with her for a relaxed conversation where you simply ask what would make her home feel safer or more comfortable—like grab‑bars, a walk‑in shower, or a neighbor check‑in. Write down any ideas she mentions and share them with you. Then, together, explore resources that can support those changes without forcing a sale. This gives Mom agency, reduces tension, and gives you concrete steps to help her stay where she feels at home."},
 {t:"adultchild",ch:"email",adv:"Nikki Buckelew",title:"Is Someone Pressuring Your Parent",body:"Subject: Is Someone Pressuring Your Parent?\n\nHi {{Owner}},\n\nI understand you've been hearing suggestions from a buyer, a contractor, or even family about what your parent should do with the house. First, let's pause and make sure you both feel clear on the options—staying, modifying, or moving—without any pressure. Ask your parent what feels right for them right now, and note any concerns they voice. If someone is pushing a particular path, gently point out that you're looking out for what truly serves your parent's comfort and independence, not just a quick sale. I can help you explore all alternatives, including simple home upgrades that let them stay safely. Let's set a time to talk through this calmly.\n\n{{Agent}} - {{Brokerage}}"},
];
/* ===== EXPANSION A: expired, fsbo, circle, soi ===== */
SCRIPTS.push(
/* -- EXPIRED: +3 calls, +3 vm, +3 text, +3 email -- */
{t:"expired",ch:"call",adv:"Ricky Carruth",title:"The No-Pitch Expired Call",body:
`YOU: Hey {{Owner}}, this is {{Agent}}. How are you doing today?

(pause for their answer, listen)

I'm calling because your home just came off the market, and I'm not here to pitch you anything. Honestly, after all that, you've earned a break from agents. I just wanted to offer some help.

I keep up with folks in {{Neighborhood}} and sometimes I know a buyer who missed out on a home here. If I learn of someone who might be a great fit for your place, would you want me to share that information? No pressure to re-list, just a heads-up.

(whatever they say, accept it warmly)

That's all I've got. I'll check in with you next month either way – I just stay in touch with everyone on your street. Take care.`},
{t:"expired",ch:"call",adv:"Chris Voss",title:"The Tactical-Empathy Expired Call",body:
`(slow, low, calm — let every pause breathe)

YOU: {{Owner}}... {{Agent}} here, local agent. It seems like the last six months turned your home into a part-time job that didn't pay.

(pause)

It sounds like you're done with agents promising the same thing and delivering the same nothing.

(let them vent — do not defend agents)

How am I supposed to convince you I'd be any different?

(silence — their answer tells you exactly what the last agent failed at)

That's fair. What if we did this: no listing agreement, no pitch. I'll tell you the one thing I'd change — and if it doesn't instantly make sense, hang up on me. Is that a bad idea?`},
{t:"expired",ch:"call",adv:"Tom Ferry",title:"The Re-Launch Strategy Call",body:
`YOU: {{Owner}}, {{Agent}} with {{Brokerage}}. Quick question — when your home was listed, how many private showings did you get in the first 14 days?

(listen — the number tells the story)

That's the exact diagnosis. The first two weeks are 80% of a listing's impact. After that, buyers assume something's wrong — even when nothing is.

A re-launch resets that clock completely: new photos, a clear price story, and a planned first-two-weeks. Homes that re-launch with a precise strategy get their second first-impression, and second first-impressions sell.

I do a 20-minute re-launch audit — what went wrong, hour by hour, and the calendar for doing it right. Thursday at 5 or Saturday morning?`},
{t:"expired",ch:"vm",adv:"Brandon Mulrenin",title:"Expired VM — Permission First",body:
`YOU: Hi {{Owner}}, {{Agent}} here, a local agent in {{Neighborhood}}. (Tonality: slow, downswing ending, no commission breath) I can only imagine your phone has been ringing nonstop since the listing ended, so I'll be brief. I'm not calling to ask for an appointment. I simply put together the three most common reasons homes like yours sometimes struggle to sell – specific to {{Address}}. Would you be opposed to me dropping it in the mail for you? If not, no reply needed. Otherwise, it'll be in your mailbox Friday. {{Phone}}.`},
{t:"expired",ch:"vm",adv:"Ricky Carruth",title:"Expired VM — The Long Game",body:
`Hey {{Owner}}, {{Agent}} here. Just calling everyone in the neighborhood whose listing came off the market. Look, I'm not calling to pitch you anything. I just believe somebody should keep you updated on what's happening with home values around you, no strings attached. That's what I do for this neighborhood. I'll send you a quick market update monthly. If you ever want off the list, a text takes care of it. And if you ever need anything at all about real estate, you've got a guy to call. {{Phone}}.`},
{t:"expired",ch:"vm",adv:"Jimmy Burgess",title:"Expired VM — The Gift",body:
`YOU: "Hey {{Owner}}, {{Agent}} here with {{Brokerage}}. I saw your home came off the market, and I've already put together a quick valuation update for you. I pulled up {{Address}} in Google Earth and walked through the comparables, showing what buyers are paying right now. No pitch, just value. Text me SEND to {{Phone}} and I'll get that video over to you tonight."`},
{t:"expired",ch:"text",adv:"Brandon Mulrenin",title:"Expired Text — The Soft Diagnostic",body:
`Hi {{Owner}}, {{Agent}} here. Would you possibly be open to a quick diagnostic perspective on why {{Address}} hasn't sold yet? No call, no pressure. If it makes sense, keep it. If not, simply delete it.`},
{t:"expired",ch:"text",adv:"Tom Ferry",title:"Expired Text — The 30-Day Stat",body:
`{{Owner}} — {{Agent}}, {{Brokerage}}. The math is clear: homes re-listed with a *focused* strategy (not just a new sign) sell in 30 days. Your prior plan didn't work. I'll show you the numbers behind a winning strategy for {{Address}}. Worth 15 minutes to review?`},
{t:"expired",ch:"text",adv:"Chris Voss",title:"Expired Text — No-Oriented",body:
`{{Owner}}, {{Agent}} here. Have you completely given up on selling {{Address}}? (Serious question — if yes, I'll stop here. If no, I have one idea the last listing never tried.)`},
{t:"expired",ch:"email",adv:"Brandon Mulrenin",title:"Expired Email — The Autopsy",body:
`Subject: {{Address}}: a few thoughts

{{Owner}},

It can be frustrating when a home doesn't move as expected. Usually, when a property doesn't sell, the market leaves distinct signals. These often boil down to one of three areas:

1.  The way the home was positioned against what buyers were comparing it to.
2.  The momentum created (or not) in those critical first two weeks.
3.  Where the marketing reached, versus where your specific buyer was actually looking.

I've put together some observations on what might have happened with {{Address}}. I'm not sure if it'll be useful, but if you're open to seeing it, just reply 'send it.' No pressure at all.

{{Agent}} · {{Brokerage}} · {{Phone}}`},
{t:"expired",ch:"email",adv:"Ricky Carruth",title:"Expired Email — Zero Pressure",body:
`Subject: No pressure, just real numbers

{{Owner}},

Your listing came off, and I bet your phone's been ringing off the hook. This isn't one of those calls, or one of those emails.

I work {{Neighborhood}} full-time, building relationships, not chasing transactions. My goal is to be helpful for the long haul, not pushy for a quick deal. I send neighbors a simple market update once a month: what's sold, for how much, and what that means for your value here. You're on it now; one reply takes you off.

Sell, stay, or rent it out — whatever you decide, you'll have the current facts. That's the whole offer. Why wouldn't I help you for free?

{{Agent}} · {{Phone}}`},
{t:"expired",ch:"email",adv:"Tim & Julie Harris",title:"Expired Email — The Second Opinion",body:
`Subject: Before you re-list {{Address}} with anyone

{{Owner}},

Before you commit to another agent — me or anyone else — make sure they answer these five questions. It's how you prequalify them for the job:

1. What was the real reason your home didn't sell? (If they only say 'price,' keep interviewing.)
2. What's their precise 7-step plan for the first two weeks?
3. Beyond the MLS, what are the five spokes of lead generation they'll use?
4. What's the expected conversion rate from showings to offers, and what's the backup plan if we don't hit it?
5. What's their average days-on-market versus the area's?

I'll happily provide my Polished, Professional Presentation and answer all five in writing before we ever meet. That's how confident I am in my system.

{{Agent}} · {{Brokerage}} · {{Phone}}`},

/* -- FSBO: +3 each -- */
{t:"fsbo",ch:"call",adv:"Tim & Julie Harris",title:"FSBO — The Buyer-in-Hand Call",body:
`YOU: Hi {{Owner}}, {{Agent}} with {{Brokerage}} here. I'm calling about the home you're selling yourself.

I specialize in working with buyers actively looking in {{Neighborhood}}. If I have a prequalified buyer whose ideal home matches yours, I'd bring them by. You'd only cover their commission, no listing fee, as you're handling that part.

To see if there's a match, what price are you asking? And on a scale of 1 to 10, how motivated are you to get this home sold and move on to your next one?

Great. If I have a match, I'll call you before I bring anyone. You're doing the work; the least I can do is bring you a real buyer.`},
{t:"fsbo",ch:"call",adv:"Ricky Carruth",title:"FSBO — The Friend-in-the-Business Call",body:
`YOU: Hey {{Owner}}, {{Agent}} here. Saw your FSBO sign. Listen, I'm not calling to list your place today. I just want to help you for free. Most folks selling on their own could use a friend in the business to bounce things off of. I can be that person.

Got a question about pricing? Call me. Buyer acting strange? Call me. Contract comes in and it feels off? Definitely call me.

My only ask: if you ever decide it's just not worth the headache — whether that's in three months or a year — just give me one conversation before you pick an agent. Deal?`},
{t:"fsbo",ch:"call",adv:"Chris Voss",title:"FSBO — The Calibrated Call",body:
`YOU: {{Owner}}, {{Agent}} here, local agent. It sounds like you've decided agents aren't worth the commission — and honestly, for some homes, you're right.

(pause — agreeing disarms)

Can I ask a calibrated question? How will you know — what's the sign — that doing it yourself has stopped saving you money and started costing you money?

(listen. They rarely have an answer — don't pounce on that)

That's worth thinking about. Most owners set a deadline or a showing count. Whatever yours is, write it down today while you're objective. And if that day ever comes, is it a bad idea for me to be the first call?`},
{t:"fsbo",ch:"vm",adv:"Brandon Mulrenin",title:"FSBO VM — The Two Stats",body:
`Hi {{Owner}}, this is {{Agent}}. I'm a local broker, and I'm certainly not calling to ask for your listing. You're likely in a good position to sell independently. But sometimes, sellers contemplate the two stats: that FSBOs usually sell for less, unless they're priced with accurate data from day one. I can share the comp set I'd consider for {{Address}}, no strings attached. It's just sensible information. Text COMPS to {{Phone}}.`},
{t:"fsbo",ch:"vm",adv:"Jimmy Burgess",title:"FSBO VM — The Open-House Offer",body:
`YOU: {{Owner}}, this is {{Agent}} from {{Brokerage}}. I'm running an open house play in {{Neighborhood}} this weekend, and buyers always ask about other homes nearby. With your permission, I'll mention your property – no cost, no listing. If a buyer I bring purchases, I earn the buyer's side, and you move your property. Just call me to add it to my sheet: {{Phone}}.`},
{t:"fsbo",ch:"vm",adv:"Ricky Carruth",title:"FSBO VM — The Check-In",body:
`YOU: Hey {{Owner}}, {{Agent}} here. Just checking in on your home, like I promised. Look, I just wanted to remind you I'm here to help you for free if you need anything at all. No pitch, just genuinely want to see you win. If things are moving fast, great! If calls slowed down, that's normal. I've got a couple of quick ideas that might help. Give me a call back if you want to chat. {{Phone}}.`},
{t:"fsbo",ch:"text",adv:"Tim & Julie Harris",title:"FSBO Text — The Qualifier Gift",body:
`Hi {{Owner}}, {{Agent}} ({{Brokerage}}). Every FSBO needs this: a 60-second buyer pre-qualification checklist. It'll stop unqualified buyers from wasting your time and get you to the real ones. Want it?`},
{t:"fsbo",ch:"text",adv:"Pace Morby",title:"FSBO Text — The Backup Offer",body:
`{{Owner}} — {{Agent}} here. Selling on your own? I specialize in buying properties when cash offers fall short. Want a standing offer that could mean full price, no repairs, and no showings? It costs nothing and never expires. One walkthrough, I'll show you how.`},
{t:"fsbo",ch:"text",adv:"Jimmy Burgess",title:"FSBO Text — The Exposure Boost",body:
`Hi {{Owner}}, {{Agent}} here. Your FSBO isn't on the MLS, cutting it off from 90% of active buyers. I have two free plays most owners miss that get homes seen. Want them? No pitch, just value.`},
{t:"fsbo",ch:"email",adv:"Brandon Mulrenin",title:"FSBO Email — The Honest Math",body:
`Subject: Thinking about your sale at {{Address}}

{{Owner}},

I understand you're likely selling independently to save on commission, and that's often a sensible approach. Given today's market, you might very well succeed.

I just wanted to offer a quick thought: sometimes, the savings can invert if the final sale price isn't quite where it could be. Buyers often factor in your commission savings when making their offer, which usually means they want that discount for themselves.

I've seen homes like yours in {{Neighborhood}} close at roughly {{Pct}}% of list when an agent is involved. If going it alone possibly costs more than about 5% in the final price, it's worth contemplating.

No pressure, but if you'd ever be open to a quick chat about what I'm seeing, let me know. Either way, best of luck.

{{Agent}} · {{Brokerage}} · {{Phone}}`},
{t:"fsbo",ch:"email",adv:"Chris Voss",title:"FSBO Email — The Negotiation Edge",body:
`Subject: The question every buyer will ask you

{{Owner}},

Selling on your own means negotiating alone against buyers (and their agents) who do this weekly. One heads-up worth more than a commission:

Every buyer will eventually ask some version of: "Since you're not paying an agent, you can come down, right?" The worst answer is a discount. The best answer is a calm, calibrated question back: "How am I supposed to discount a price the comps already support?"

Attached is a one-pager of the five questions buyers use on FSBOs, and the responses that hold your price. It's free — a seller who negotiates well keeps values strong for everyone here.

{{Agent}} · {{Phone}}`},
{t:"fsbo",ch:"email",adv:"Ricky Carruth",title:"FSBO Email — The 90-Day Friend",body:
`Subject: Helping you out (no strings attached)

{{Owner}},

Most agents are looking for a deal. I'm just looking to help. Plenty of folks sell their own home, especially with a good price and sharp photos.

So here's what I'll do: for the next 90 days, I'll send you the same buyer-activity updates I share with my clients. It's the real pulse of {{Neighborhood}} — what's listed, what's pending, how fast things are moving. It'll make your decisions sharper.

If you sell it yourself: great job. Keep the reports. If you ever want backup: you'll already know I do what I say. Why wouldn't I help?

{{Agent}} · {{Phone}}`},

/* -- CIRCLE: +3 each -- */
{t:"circle",ch:"call",adv:"Tom Ferry",title:"The Equity-Update Circle Call",body:
`YOU: Hi {{Owner}}, {{Agent}} with {{Brokerage}}. I'm calling homeowners in {{Neighborhood}} this week with a quick equity update — it's free and takes about 90 seconds.

Here's the headline: homes on your street are trading around {{Price}}. That math means your equity is likely up significantly from two years ago.

When I share this, most owners see three options: do nothing, which is fine; use that equity for investments or home improvements; or consider a move while buying power is still strong.

Want the full one-page report with your exact numbers? And, thinking ahead, any real estate goals in the next 12 months I should be aware of?`},
{t:"circle",ch:"call",adv:"Loida Velasquez",title:"Circle Call — Bilingual Neighborhood Update",body:
`YOU: Hi, {{Owner}}? This is {{Agent}}, a local real estate agent here in {{Neighborhood}} — ¿prefiere que hablemos en español o inglés?

(continue in their choice)

I'm calling neighbors because a home just sold nearby that directly affected the value of your property. Most owners have no idea what that did to THEIR equity – and it's your money, you should absolutely know it.

I'll prepare a free analysis, in writing, in whichever language is easiest for your family to review. If a hermano, prima, or coworker needs help buying or selling — I take care of referrals like family. ¿Le mando el análisis?`},
{t:"circle",ch:"call",adv:"Gary Keller",title:"The Farm-Anchor Call",body:
`YOU: {{Owner}}, {{Agent}} with {{Brokerage}}. I'm the agent whose ONE Thing is knowing {{Neighborhood}} better than anyone, and you're in my database of homeowners I keep informed.

This quarter, the big number is {{Stat}} — and what that means for your home specifically is worth two minutes.

But the real reason for the call: My business runs on a clear model. I aim to be the first call for anything real estate here. Repairs, refi questions, contractor referrals, value checks. What's on your house list this year? Anything I can leverage my network for?`},
{t:"circle",ch:"vm",adv:"Ricky Carruth",title:"Circle VM — The Standing Offer",body:
`Hey {{Owner}}, it's {{Agent}} in {{Neighborhood}}. Just wanted to let you know a home on {{Street}} recently sold, shifting values. I connect with neighbors to share their numbers, no strings attached. That's just how I run my business. If you ever want yours, it's one text away: {{Phone}}. Talk soon.`},
{t:"circle",ch:"vm",adv:"Glennda Baker",title:"Circle VM — The Story Number",body:
`{{Owner}}, it's {{Agent}} here. Let me tell you what just happened on {{Street}}: listed Thursday, 40 groups through Saturday, multiple offers Monday, closed for more than they asked. That's the real truth of your street right now, and honey, it won't last. If you've even daydreamed about selling, this is the chapter. I'll tell you your number, no charge: {{Phone}}.`},
{t:"circle",ch:"vm",adv:"Sharran Srivatsaa",title:"Circle VM — The Quiet Wealth Check",body:
`YOU: "{{Owner}}, {{Agent}} with {{Brokerage}}. Your home is a capital asset, often reviewed less than a phone bill. I run a private asset review for {{Neighborhood}} owners: current value, equity, and the two or three tactical moves that number makes possible. This structured process takes me an hour; your review takes five minutes. {{Phone}} — I'll have it to you this week."`},
{t:"circle",ch:"text",adv:"Ricky Carruth",title:"Circle Text — Just Sold, No Agenda",body:
`Hi {{Owner}} — {{Agent}}, your {{Neighborhood}} agent. The home on {{Street}} just closed. I always make sure neighbors know their number, no strings attached. Want the update?`},
{t:"circle",ch:"text",adv:"Tom Ferry",title:"Circle Text — The Buyer Waitlist",body:
`{{Owner}}, {{Agent}} here ({{Brokerage}}). Since the {{Street}} sale, I have {{N}} families specifically looking on your block. They missed out. No pressure, but if a quiet, off-market sale interests you, this is the demand. Curious to hear their price range?`},
{t:"circle",ch:"text",adv:"Jimmy Burgess",title:"Circle Text — The Free CMA Drop",body:
`Hi {{Owner}}, {{Agent}} here. I just completed a valuation update for every home on {{Street}} after the recent sale. This consistent play keeps owners informed. Yours is ready – text the number or email the full report?`},
{t:"circle",ch:"email",adv:"Glennda Baker",title:"Circle Email — The Street Story",body:
`Subject: The REAL story behind that house on {{Street}}

Well, hey there, {{Owner}}!

You saw the sign go up and come down on {{Street}}, didn't you? Let me tell you, that was a wild one. The folks living there were convinced the market had just gone flat, thought they'd missed their window. Oh, my stars, they almost didn't even call me!

But I showed them the truth of what was happening right here in {{Neighborhood}}: real buyers, ready to move, coming in hot. We put it on the market {{Day}}, had {{N}} showings that first weekend, and ended up with multiple offers. Sold for {{Price}}!

I'm telling you this because "I didn't know the market was like that" is the single most expensive sentence in real estate. Now you do. If you ever want to write your own story like that, I do this for a living.

{{Agent}} · {{Brokerage}}`},
{t:"circle",ch:"email",adv:"Brian Buffini",title:"Circle Email — The Neighbor Letter",body:
`Subject: A note from your neighborhood agent

Dear {{Owner}},

I've had the privilege of helping several families on and around {{Street}} this year, and every closing reminds me why I love this neighborhood — the tree-lined blocks, the neighbors who wave, the pride people take in their homes.

A quick market note: the recent sale nearby means values on your street have moved again. If you'd like to know what that means for your home, I'll gladly prepare it — my gift, no strings.

And if you know someone — family, friend, coworker — thinking about a move, I'm never too busy for the people you care about. An introduction from a neighbor is the highest compliment I can receive.

Warmly,
{{Agent}} · {{Brokerage}} · {{Phone}}`},
{t:"circle",ch:"email",adv:"Byron Lazine",title:"Circle Email — The Data Drop",body:
`Subject: Your {{Neighborhood}} Hot Sheet — {{Month}}

{{Owner}},

No fluff, just the latest numbers for your street:

- MEDIAN LIST: {{Price}} — where sellers are starting
- DAYS ON MARKET: {{DOM}} — how fast homes are moving
- PRICE CUTS: {{Pct}}% — how many listings missed the mark on price
- SALE-TO-LIST: {{Ratio}} — the negotiation gap, i.e., your leverage

Here's the 'so what': That sale-to-list ratio is the game. When it's tight like this, sellers who price right are holding their ground. When it widens, buyers get the leverage. This isn't cheerleading; it's what's happening TODAY.

I send this market take to {{Neighborhood}} owners monthly. Want your home's specific position added to next month's? Reply "position me."

{{Agent}} · {{Brokerage}}`},

/* -- SOI: +3 each -- */
{t:"soi",ch:"call",adv:"Sharran Srivatsaa",title:"SOI — The Annual Wealth Call",body:
`YOU: {{Name}}! {{Agent}}. I'm running a specific process this month for the people in my network, and you're on the list.

Once a year, I engineer what I call a Home Asset Review. It's a single page: your home's current valuation, what you owe, your equity, and how that capital could be working for you. It's the owner P&L for your primary asset, the one financial advisors miss.

No meeting needed — I build the numbers, you review. But while I've got you: anything changing this year I should track? Job, family structure, space requirements? ...

(then:) One more thing — you know my business is built on engineered referrals. Who do you know who's talking about making a move this year?`},
{t:"soi",ch:"call",adv:"Brian Buffini",title:"SOI — The Pop-By Follow-Up Call",body:
`YOU: {{Name}}! {{Agent}} — did the little {{Item}} make it to your porch okay? (laugh) Good. It's small, but it comes with a real thank-you: people like you are literally why my business exists.

Real reason I'm calling: I set aside time every {{Month}} to catch up with my favorite people, and you're on today's list. What's new — how's {{Family Member}}, how's the {{Thing You Know}}?

(genuine conversation — this IS the work)

Before I let you go — you know the drill: if anyone in your world starts talking about buying or selling, I'm never too busy for the people you care about. Who've you got for me? (smile — earned, not begged)`},
{t:"soi",ch:"call",adv:"Rene Rodriguez",title:"SOI — The Influence Check-In",body:
`YOU: {{Name}}, it's {{Agent}}. Quick story and a question.

This week I watched a family lose $40,000 — not to the market, to hesitation. They "knew a guy" but never made the call, priced on a guess, and left money on the table. It reminded me why I check in with people I care about BEFORE decisions get made.

So: no pitch, just the question — is there anything on your horizon this year where real estate money is in motion? A move, a refi, an inheritance, a rental idea? If yes, let's get you the real numbers early, while every option's still open. That 20-minute call is where the $40,000 gets saved.`},
{t:"soi",ch:"vm",adv:"Brian Buffini",title:"SOI VM — The Gratitude Drop",body:
`{{Name}}, it's {{Agent}}. No agenda — I was doing my morning list of people I'm grateful for and you came up, so you get the call. Hope {{Family Member}} is doing great and the {{Thing}} is going strong. If there's ever anything I can do for you — real estate or just a good contractor's number — you know where I am. Talk soon.`},
{t:"soi",ch:"vm",adv:"Sharran Srivatsaa",title:"SOI VM — The Market Minute",body:
`{{Name}}, {{Agent}} here. One minute, then I'm gone: {{Neighborhood}} asset values have a new trend this quarter, and the financing environment shifted. If this data impacts your wealth stack or any decision in your house this year, call me first. I'd rather engineer a solution early than react later. {{Phone}}.`},
{t:"soi",ch:"vm",adv:"Tom Ferry",title:"SOI VM — The Referral Seed",body:
`YOU: Hey {{Name}}, {{Agent}} here. Just a quick check-in. (Keep it tight, focused.) First, if you saw my market update, the {{Neighborhood}} numbers are moving — I'm the local economist-of-choice, so check it out. (Be the source of data.) Second: I'm building my business on referrals this year, and I'd love to be the agent you think of first. (Clear ask.) That's it! Give my best to the family. {{Phone}}.`},
{t:"soi",ch:"text",adv:"Brian Buffini",title:"SOI Text — The Anniversary",body:
`{{Name}} — {{Agent}} here. {{N}} years ago this week you got the keys to your home! 🎉 Happy home-iversary. Fun fact: it's likely worth quite a bit more than that day. Want this year's number? (Free, always, for you.)`},
{t:"soi",ch:"text",adv:"Gary Keller",title:"SOI Text — The One Question",body:
`{{Name}}, {{Agent}} here. This is my system check-in. One question: Is there any real estate goal on your family's radar this year? (Moving, refinancing, rentals, helping a kid buy?) If so, let's connect. My numbers are always free.`},
{t:"soi",ch:"text",adv:"Chelsea Peitz",title:"SOI Text — The Personal Touch",body:
`{{Name}}!! Saw {{Personal Thing}} — awesome 👏 Quick real estate thought: if anyone at {{Their Work/Group}} ever just *mentions* moving, you know the human who'd love to help. Okay, back to being a normal friend. How ARE you?`},
{t:"soi",ch:"email",adv:"Gary Keller",title:"SOI Email — The Equity Statement",body:
`Subject: Your biggest asset: a statement

{{Name}},

Banks send statements. Brokerages send statements. Your single biggest asset? Too often, silence. Once a year, I fix that for my people. Because until you know your numbers, you can't make decisions.

YOUR HOME — {{Year}} SNAPSHOT:
- Estimated market value: {{Price}}
- Change vs. last year: {{Change}}
- Estimated equity: {{Equity}}

This isn't just data; it's opportunity. Most do nothing. Some refinance or renovate. A few use it to fund the home they actually want. Others realize they're sitting on a listing ready to go.

Want the detailed version with the comps? One reply. And if someone you care about needs a straight-shooting agent, that introduction means everything to me.

{{Agent}} · {{Brokerage}}`},
{t:"soi",ch:"email",adv:"Rene Rodriguez",title:"SOI Email — The Decision Window",body:
`Subject: Before the next big decision in your house

{{Name}},

Every family makes one or two BIG money decisions a year. The research on this is brutal: we decide emotionally, then justify with whatever numbers are lying around.

So consider this email me putting better numbers within reach — before any decision heats up:

- What your home is worth today (real comps, not a portal guess)
- What selling would net after everything
- What staying and borrowing against it would cost
- What trading up actually requires in this market

All five, one page, free — because the cheapest time to get clarity is before you need it. Reply "clarity" and I'll build yours this week.

{{Agent}} · {{Brokerage}} · {{Phone}}`},
{t:"soi",ch:"email",adv:"Jimmy Burgess",title:"SOI Email — The Give-First Newsletter",body:
`Subject: Quick Update: Your {{Neighborhood}} & Local Info

{{Name}},

No pitch, just three useful things for you this month:

1.  HOME VALUES: Your {{Neighborhood}} saw a {{Change}} in value this past quarter. If you'd like me to send over an updated valuation specific to your address — like I do for my clients — just reply.
2.  THE TRADES: My clients' go-to {{Trade}} just opened their schedule. If you've been putting off a project waiting for a good one, reply and I'll connect you.
3.  THE OPPORTUNITY: Rates made a quiet, positive move for move-up buyers. If a different home has crossed your mind, this window is worth a look.

That's it. I send these so that when real estate matters in your life, you already have a guy who gives value first.

{{Agent}} · {{Brokerage}} · {{Phone}}`}
);
/* ===== EXPANSION B: openhouse, online, social, luxury ===== */
SCRIPTS.push(
/* -- OPEN HOUSE: +3 each -- */
{t:"openhouse",ch:"call",adv:"Ricky Carruth",title:"Open House — The Neighbor Invite Call",body:
`YOU: Hey {{Owner}}, how are you doing today? This is {{Agent}}, a local agent here. I'm hosting an open house at {{Address}} this Saturday, and I always like to reach out to the neighbors first.

I just want to help you out a little. You can get a sneak peek before the crowd, see what your neighbor's place looks like. And honestly, neighbors are the best connectors – you might know someone who'd love to live on this street.

It's this Saturday, {{Time}}. No pressure, just good conversation. While you're there, ask me what this sale means for your property's value. That answer's free, no strings attached. Why wouldn't I share that?`},
{t:"openhouse",ch:"call",adv:"Tim & Julie Harris",title:"Open House — The Buyer Conversion Call",body:
`YOU: {{Name}}, {{Agent}} — we met Saturday at {{Address}}. You mentioned you've been looking for {{Timeframe}} — that's longer than most, and it's usually not a buyer problem, it's a process problem.

Here's what I mean: buyers without representation see maybe 4 homes a month. My clients see everything that fits within 48 hours of it listing. By the way, which home in the neighborhood do you plan on selling?

(Pause for answer, then continue)

You clearly know what you want. What's missing is first-look access. I have room for two more buyer clients this month. When can we spend 20 minutes building your exact search profile — tonight or tomorrow?`},
{t:"openhouse",ch:"call",adv:"Jason Pantana",title:"Open House — The Database Activation Call",body:
`YOU: {{Name}}! {{Agent}} – you came through my open house at {{Address}} a while back. It moved fast, but I kept your wishlist: {{Criteria}}.

Reason for the call: two homes hit the market this week that match almost exactly. One hasn't published photos, which means most buyers won't even see it for days.

That first-72-hours window is where you get the edge. Want me to send both addresses right now? And should I keep you on the early-alert list going forward – takes you off the portal treadmill entirely.`},
{t:"openhouse",ch:"vm",adv:"Ryan Serhant",title:"Open House VM — Same-Night Energy",body:
`{{Name}}! {{Agent}} — you walked through {{Address}} today and I could tell it landed different for you. Quick update you'll want: two groups requested disclosures tonight. If that house is IT, tomorrow morning matters. If it's not, tell me what was missing and I'll hunt down the version that has it — that's literally what I do. Either way: {{Phone}}, tonight or first thing. Follow up, follow through — that's the whole job.`},
{t:"openhouse",ch:"vm",adv:"Tom Ferry",title:"Open House VM — The Second Home Tease",body:
`YOU: Hey {{Name}}, {{Agent}} here. Great connecting at the open house. You mentioned {{Address}} wasn't quite it, but it gave us a clear target. I've got three properties that hit your exact criteria – one isn't even public yet. The market moves fast, and the best homes go quickly. Call me back right away at {{Phone}} so you don't miss out. Let's make sure you get first pick.`},
{t:"openhouse",ch:"vm",adv:"Glennda Baker",title:"Open House VM — The Seller Watcher",body:
`Hey {{Owner}}, it's {{Agent}}. You stopped by my open house on {{Street}} Saturday, and honey, let's be real. Most folks who do that are just wonderin' what their own place is worth. And bless your heart, that's smart! So here's the deal: I'll tell you the *real story* on your home's value right now, no fluff. What agents won't tell you. No sign, no pressure. Just the truth. Call me, {{Phone}}.`},
{t:"openhouse",ch:"text",adv:"Ryan Serhant",title:"Open House Text — The 24-Hour Follow-Up",body:
`{{Name}} — {{Agent}} from yesterday's open house at {{Address}}. Promised update: offers are being called for {{Day}}. If you want in, I need 10 minutes today. If it wasn't the one — what was the miss? I'll fix it in the next search.`},
{t:"openhouse",ch:"text",adv:"Chelsea Peitz",title:"Open House Text — The Warm Memory",body:
`Hey {{Name}}! It's {{Agent}} from the {{Address}} open house. You were the one with {{Personal Detail}}! 😊 Just reaching out like I said I would. Want me to get that custom search going for you? Takes just a few minutes, and you won't miss any new listings in {{Neighborhood}}.`},
{t:"openhouse",ch:"text",adv:"Jimmy Burgess",title:"Open House Text — The Neighbor Value Drop",body:
`Hi {{Owner}}, {{Agent}} here. Thanks for stopping by the open house on {{Street}}! Since you're a neighbor, this sale will reset your home's value. I'll send you the before/after numbers once it's final. Most neighbors are surprised.`},
{t:"openhouse",ch:"email",adv:"Ryan Serhant",title:"Open House Email — The Momentum Email",body:
`Subject: {{Address}} — where it stands (and where you stand)

{{Name}},

Great meeting you Saturday. Straight update, because momentum matters more than polish:

- {{N}} groups through this weekend
- {{M}} disclosure requests
- Sellers reviewing offers {{Day}}

If this is your house: call me today and let's build the offer that wins — price is only a third of it; terms and timing are the rest.

If it's not: even better. You've now told me exactly what "the one" needs that this one lacked. Give me a week and first refusal on what I find.

The market rewards decisiveness. So do I.

{{Agent}} · {{Brokerage}} · {{Phone}}`},
{t:"openhouse",ch:"email",adv:"Tim & Julie Harris",title:"Open House Email — The Process Email",body:
`Subject: How my clients secure homes like {{Address}}

{{Name}},

You've been searching {{Timeframe}} — so you've likely seen homes slip away. Winning isn't luck; it's a specific method. Here's how my clients get it done:

1. Proper Prequalification: We know exactly what price your lender has told you NOT to go above, which makes your offer stronger. Sellers can tell the difference.
2. Exclusivity: We identify opportunities before they hit the open market, often securing homes before the weekend crowds. Sometimes, even finding the listing lead in disguise.
3. A Polished Offer: Clean terms, smart timelines, and a commitment sellers value, making your presentation professional.

This isn't about more money. It's about a clear process. We install it in one 20-minute meeting. My last {{N}} buyers all closed within {{X}} weeks of starting.

What would it take to make you a 10 for connecting this week?

{{Agent}} · {{Brokerage}} · {{Phone}}`},
{t:"openhouse",ch:"email",adv:"Brian Buffini",title:"Open House Email — The No-Rush Nurture",body:
`Subject: No rush — just keeping my word

{{Name}},

You mentioned at the open house that you're "maybe a year out." Most agents hear that and either pester you weekly or vanish. I do neither.

Here's what you'll get from me instead: one genuinely useful email a month — what's selling in {{Neighborhood}}, for what, and what it means for someone on your timeline. When your year is up, you'll know the market cold and you'll know exactly who I am.

And if the timeline ever accelerates — a job change, the right house popping up — you'll have someone who never made you feel like a transaction.

That's the whole plan. Talk when it's time.

{{Agent}} · {{Brokerage}} · {{Phone}}`},

/* -- ONLINE: +3 each -- */
{t:"online",ch:"call",adv:"Tom Ferry",title:"Online Lead — The 5-5-5 Call",body:
`YOU: {{Name}}? {{Agent}} here — you just hit us up about {{Address}} online. I saw it pop and called, because the best homes don't wait.

Quick facts: it IS still available, the owners are selling because of {{Reason}}, and properties nearby have been moving in about {{DOM}} days. That's the market reality.

Now, the useful part for you: what specifically caught your eye about that home? Location, layout, or price point? Tell me that, and I'll send you the two or three others that truly match, including anything coming soon that the public sites haven't caught yet. No obligation, just information.`},
{t:"online",ch:"call",adv:"Chris Voss",title:"Online Lead — The Mirror Call",body:
`YOU: {{Name}}, {{Agent}} here — you inquired about {{Address}}. Most agents would start pitching. I'd rather understand.

You picked that home out of hundreds. Something specific stopped your scroll... what was it?

(whatever they say, MIRROR the last few words:)
"The big backyard?" ... (let them expand — they always do)

(then label:) It sounds like you're not just browsing — you're picturing a specific life, and you're checking whether it's affordable yet.

(pause)

Would it be a bad idea for me to put together what that life actually costs right now — the real monthly number, not the portal estimate? No commitment; numbers first, decisions whenever.`},
{t:"online",ch:"call",adv:"Veronica Figueroa",title:"Online Lead — The Team Warm Transfer",body:
`YOU: Hi {{Name}}! This is {{Agent}} with The Fig Team. You just clicked on {{Address}} online. (¿Y si prefiere español, con gusto!)

First, real person, local office, and yes, I actually know that house. Before anything else — are you already working with a professional here in Central Florida? ... Perfect. So here's how we operate, how we take care of our people on The Fig Team: we get our clients into homes before the crowd, connect them with lenders who answer on weekends, and understand programs like down-payment assistance or foreign-national loans.

That house you clicked — want the honest scoop? More importantly: tell me about the home you're truly trying to find. Beds, area, budget, dream feature — give me the wishlist and let my whole team hunt for you.`},
{t:"online",ch:"vm",adv:"Sharran Srivatsaa",title:"Online Lead VM — The Concierge Open",body:
`{{Name}}, {{Agent}} with {{Brokerage}} — regarding your inquiry on {{Address}}. My promise is simple: within one hour of our conversation, you'll have the verified status of that home, the seller's actual operating rhythm, and the two best alternatives if it's already under contract. Portals can't deliver that market intelligence. This is how we engineer your search. Call {{Phone}}, or text "INFO" to start.`},
{t:"online",ch:"vm",adv:"Chelsea Peitz",title:"Online Lead VM — The Anti-Drip",body:
`Hey {{Name}}, it's {{Agent}}. You checked out {{Address}} online. I get it, usually this means a bunch of generic emails and agents reading the same script. I'm doing the opposite. This one quick voicemail, then one text from me with the honest scoop on that house. After that, total silence unless you actually want to talk. Your texts will have it in two minutes. If it's helpful, I'm {{Phone}}. If not, no hard feelings, no drip. My promise.`},
{t:"online",ch:"vm",adv:"Byron Lazine",title:"Online Lead VM — The Analyst",body:
`YOU: {{Name}}, {{Agent}}. You looked at {{Address}}. Before you fall in love, here's the daily Hot Sheet on it: priced {{Position}} against the market, sitting {{DOM}} days versus the area's {{AvgDOM}}, and the seller's already cut the price once. My take? There's a deal to be made here today that most won't spot. Want the full breakdown? {{Phone}}. I give my buyers this analysis on every property — it's how we set the price, not just pay it.`},
{t:"online",ch:"text",adv:"Ryan Serhant",title:"Online Lead Text — Speed Wins",body:
`{{Name}} — {{Agent}}. You asked about {{Address}} 4 minutes ago; here's the real story: {{Status}}. Two more like it (one unlisted) if this one's not perfect. Want both addresses? Speed wins in this market — that goes for agents too. 😄`},
{t:"online",ch:"text",adv:"Byron Lazine",title:"Online Lead Text — The Data Hook",body:
`Hey {{Name}}, {{Agent}} on {{Address}}. The portal shows one price, but the last 3 sales comps put it {{Diff}}. That's a huge swing. Could be a play, could be a problem. Want my take on the numbers in 60 seconds?`},
{t:"online",ch:"text",adv:"Veronica Figueroa",title:"Online Lead Text — Bilingual Welcome",body:
`Hi {{Name}}! {{Agent}} here 🏡 — you were viewing {{Address}}. I'm here for you in English o en español, whichever feels best. Quick honest answer about that home + 2 stronger matches if you want them. What's your ideal move-in timing?`},
{t:"online",ch:"email",adv:"Sharran Srivatsaa",title:"Online Lead Email — The VIP Setup",body:
`Subject: Your {{Neighborhood}} market advantage

{{Name}},

You inquired about {{Address}} — here's the honest status: {{Status}}.

More useful: let's install a system for your search. Portal browsing gives you what everyone sees, when everyone sees it. My clients get:

- PRE-MARKET ACCESS — homes 3-10 days before public
- THE REAL NUMBERS — monthly cost per home, not just price
- ONE-HOUR ANSWERS — status, seller motivation, negotiation room, on request

It costs nothing; it's how I earn trust before I earn business. Reply with your wishlist (beds, areas, budget) and I'll have your first private list to you tonight.

{{Agent}} · {{Brokerage}} · {{Phone}}`},
{t:"online",ch:"email",adv:"Tom Ferry",title:"Online Lead Email — The 5-Day Plan",body:
`Subject: {{Address}} + your 5-day advantage

{{Name}},

The home you clicked: {{Status}}. Most buyers just browse. You need a plan to win. Here's what I'll deliver, no strings attached, while you decide if I'm your agent:

DAY 1 (today): The real numbers for {{Address}} — price position, seller situation, what it takes to get the deal done.
DAY 2: Your custom search goes live — everything that fits, including off-market opportunities.
DAY 3: Lender intro (if you want it) — 15 minutes to a REAL number you can trust.
DAY 4: Your shortlist — the top 3 options with my direct notes on each.
DAY 5: We tour, or you tell me to stop. Either answer is fine. Zero pressure, full effort.

Reply "start" and Day 1 lands tonight. Let's make action obvious.

{{Agent}} · {{Brokerage}} · {{Phone}}`},
{t:"online",ch:"email",adv:"Chris Voss",title:"Online Lead Email — The Have-You-Given-Up",body:
`Subject: Have you given up on finding the right home?

{{Name}},

You inquired about {{Address}} {{Timeframe}} ago, then went quiet. Usually that means one of three things:

- You found something (congratulations — genuinely).
- Life got busy (understood — the search will keep).
- Or the process burned you out — too many losses, too many games — and pausing felt better than another disappointment.

If it's the third one: that's not a you problem. It's a strategy problem, and strategy problems have fixes.

No pitch here. Just one question, and "no" is a perfectly good answer: would it be ridiculous to spend 15 minutes diagnosing why the search stalled — even if you never restart it with me?

{{Agent}} · {{Phone}}`},

/* -- SOCIAL: +3 each -- */
{t:"social",ch:"call",adv:"Chelsea Peitz",title:"Social — The DM-to-Call Bridge",body:
`YOU: {{Name}}! It's {{Agent}} — from Instagram! (let it land — this is fun, not formal)

Look, your question in the DMs, {{Their Question}}, deserved my voice, not just my thumbs. It's about getting you the real context.

(answer it fully, generously — 2 minutes of real value)

Okay, that's the honest answer. Now, can I ask you something? You've been seeing my perspective on social for a bit — what's happening in YOUR world? Renting and just curious? Own and wondering? My best clients always start exactly where you are: lurking, then one good conversation.`},
{t:"social",ch:"call",adv:"Glennda Baker",title:"Social — The Story Collector Call",body:
`YOU: {{Owner}}, {{Agent}} here! Okay, unusual request, but hear me out, honey.

I tell the real stories of {{Neighborhood}} on video — the kind that show folks what they don't know. Like the house that got twenty-seven offers, or the time a buyer wrote the sweetest letter, or even the mistake a seller made that cost 'em. My videos get seen by hundreds of thousands, and people are moving here because of those tales.

Your street is next on my list, and I'd love just ten minutes of neighborhood lore from someone who's truly lived it. What's the real story of this block – who's been here forever, what's changed, what's the truth nobody knows?

(listen — this builds the deepest rapport there is)

Oh, my stars, that was gold. And listen — when your home's chapter is ready to be written, you know exactly who tells it best.`},
{t:"social",ch:"call",adv:"Jason Pantana",title:"Social — The Retargeting Call",body:
`YOU: {{Name}}, {{Agent}} here. I saw you grabbed my {{Lead Magnet}} on retargeting last week. Just wanted to make sure it landed and let you know the guide shows the tactics, not the exact moves for your zip. Most agents chase {{Common Fixation}}—they flood feeds and hope for clicks. The real lever is pairing the right hook with review‑rich posts so your cost per appointment drops. Give me 10 minutes, we'll pull up your profile, run a quick GBP cheat‑code check, and I'll walk you through the exact next steps. What's a good time this week?`},
{t:"social",ch:"vm",adv:"Glennda Baker",title:"Social VM — The Cliffhanger",body:
`Hey {{Name}}, it's {{Agent}}! You commented on my video about {{Topic}} — and honey, the part I couldn't tell you on camera? It's even better. It involves {{Neighborhood}}, a number that's just wild, and why these next 60 days are gonna make all the difference. Call me back and I'll spill the whole tea: {{Phone}}. Some things, you just can't put on the internet!`},
{t:"social",ch:"vm",adv:"Jason Pantana",title:"Social VM — The Webinar Follow-Up",body:
`Hey {{Name}}, {{Agent}} here. Thanks for tuning into the {{Topic}} session. The big question afterward was, 'how do I apply this to *my* property?' That's why I've blocked out {{N}} quick 15-minute calls this week. We'll get specific on your situation and what it takes to get found. Call me at {{Phone}} or just hit reply on the email. No charge for the specific answers.`},
{t:"social",ch:"vm",adv:"Byron Lazine",title:"Social VM — The Hot Take Follow-Up",body:
`{{Name}}, {{Agent}}. You pushed back on my take on {{Topic}} in the comments — and honestly? You weren't entirely wrong. That's why I'm calling: the real market numbers are always more nuanced than a comment section allows. Give me ten minutes and I'll show you what the rates, inventory, and price cuts are *actually* doing. If you're still not convinced, you win the living-room debate. {{Phone}}. I'd rather work with someone who pushes back than a 'yes-person' anyway.`},
{t:"social",ch:"text",adv:"Jason Pantana",title:"Social Text — The Lead Magnet Delivery",body:
`{{Name}} — {{Agent}} here. Your {{Lead Magnet}} is linked. Most skip page {{N}} — that's where the local edge is. Want a quick 5-min walkthrough on what it means for *your* neighborhood?`},
{t:"social",ch:"text",adv:"Byron Lazine",title:"Social Text — The Comment Continuation",body:
`Hey {{Name}}, {{Agent}} from IG. Your comment on the {{Topic}} video deserved my real take, not just an emoji. The short answer: {{One-Line Answer}}. The full story has the numbers and the 'so what.' Want it?`},
{t:"social",ch:"text",adv:"Glennda Baker",title:"Social Text — The Behind-The-Scenes",body:
`{{Name}}! {{Agent}} here. Honey, you know I tell it like it is. Something's stirring on {{Street}} that ain't public yet, and you watch my {{Neighborhood}} stories. If you've been waiting for a real sign, this is it. Call me before Friday.`},
{t:"social",ch:"email",adv:"Chelsea Peitz",title:"Social Email — The Follower-to-Friend",body:
`Subject: You've been here a while — thank you

{{Name}},

I just wanted to reach out, human-to-human. I've seen you here in my little corner of the internet — liking posts, watching stories, even that one comment that made me smile. Thank you for showing up. Genuinely.

Behind all the content, the market updates, and the stories from my day, there's a real person and a real business. My best clients are always the ones who've been watching for months, absorbing the context, before they ever need me. It's how trust is built, slowly and genuinely, and that's the only kind that counts.

So, no sales pitch here. Just an open door. Whenever a question about housing crosses your mind — even a hypothetical, even for a friend — just ask. DM, email, text: {{Phone}}. That's what all this content, all this sharing, is actually for.

{{Agent}}`},
{t:"social",ch:"email",adv:"Glennda Baker",title:"Social Email — The Story Newsletter",body:
`Subject: What waiting cost a family on {{Street}}

{{Name}},

Let me tell you about a couple right there on {{Street}}. They spent two years just waiting for everything to feel 'perfect.' Oh, my stars, they watched three neighbors sell their houses and tracked every little interest rate change like it was their job.

But here's the real truth: all that waiting cost them a whopping {{Cost}} a year in the house they actually wanted. Last month, they finally moved. And at the closing table, their exact words were, "We could have done this two years ago."

I share these stories because the real life of real estate isn't always what you expect. If you heard yourself in that, well, that's worth a conversation.

Whenever you're ready to write your own next chapter, I'm here.

{{Agent}} · {{Brokerage}}`},
{t:"social",ch:"email",adv:"Jason Pantana",title:"Social Email — The Value Sequence",body:
`Subject: The 3 free tools my community is using right now

{{Name}},

You grabbed my {{Lead Magnet}} – so here are the next three plays, no sign-up forms needed:

1.  HOME VALUE TRACKER — your address's actual number, updated monthly, direct to your inbox. Just reply "track" + your address.
2.  THE MONTHLY MARKET MINUTE — my 90-second video, local data, zero jargon. You're in as of now (opt out anytime).
3.  THE DEAL ALERT — when something under-priced hits {{Neighborhood}}, my list hears first. Reply "alerts" to get on it.

Free forever, because informed people make confident moves — and confident movers eventually need an agent they already trust.

{{Agent}} · {{Brokerage}}`},

/* -- LUXURY: +3 each (has 5 already: call, vm, 2 email, text → add 2 call, 2 vm, 2 text, 2 email) -- */
{t:"luxury",ch:"call",adv:"Sharran Srivatsaa",title:"Luxury — The Private Market Call",body:
`YOU: {{Owner}}, {{Agent}} with {{Brokerage}}. I'll be direct to respect your time: a family I represent is looking for a home exactly like {{Address}} — specifically in your enclave. They've asked me to conduct discreet inquiries before anything hits the open market.

I'm not asking you to sell your home today. I'm asking if, given a number that works for you, and a process with zero signs, zero strangers, and a close engineered around YOUR calendar, a brief conversation would be valuable.

Most owners say no, and that's a perfectly good answer. The few who say 'what's the number?' are usually glad for the insight. Which are you?`},
{t:"luxury",ch:"call",adv:"Cheryl Eisen",title:"Luxury — The Presentation Audit Call",body:
`YOU: {{Owner}}, {{Agent}}. Your home has been on the market {{DOM}} days, and at this price point, the issue is rarely the property itself. It's about selling a fantasy, a future, not just square footage.

Luxury buyers fall in love with a story, an aspirational life they see themselves living. If the listing photos, the design, and the overall impression don't create that emotional connection in the first few seconds, the price often takes the blame.

I'd like to walk {{Address}} and assess how well it's merchandising that target buyer's life. We'll look at the 'moments' room by room. If it's doing its job, I'll tell you. When can I see it?`},
{t:"luxury",ch:"vm",adv:"Ryan Serhant",title:"Luxury VM — The Out-of-Market Buyer",body:
`{{Owner}}, {{Agent}}. Your buyer probably doesn't live in {{City}} — that's the single most important fact about selling a home like yours. My last {{N}} closings at this level: buyers from out of state or overseas, found through film-quality marketing that travels, not yard signs that don't. I put together a two-minute concept of how {{Address}} launches to that audience. It'll be the best two minutes of marketing you've seen this year — {{Phone}}.`},
{t:"luxury",ch:"vm",adv:"Shea McGee",title:"Luxury VM — The Design Equity Note",body:
`{{Owner}}, this is {{Agent}}. I drove past {{Address}} this week, and what struck me is how homes with your bones are perfectly poised for transformation. A few intentional shifts – like getting the scale right with lighting, layering textures for a rich, tactile experience, and making each space feel collected – means buyers stop seeing numbers and start imagining a beautiful life unfolding there. If selling is on your horizon, the smartest hour is a design walk-through *before* anything else. I'd love to give you that hour: {{Phone}}.`},
{t:"luxury",ch:"text",adv:"Ryan Serhant",title:"Luxury Text — The Discreet Probe",body:
`{{Owner}} — {{Agent}}, {{Brokerage}}. A serious buyer has asked me about homes in your enclave (nothing public, no listings involved). If a quiet, on-your-terms conversation about {{Address}} ever made sense, this is the low-pressure version of it. Worth a coffee?`},
{t:"luxury",ch:"text",adv:"Cheryl Eisen",title:"Luxury Text — The Staging Stat",body:
`{{Owner}}, {{Agent}} here. Before you list: our design for the target buyer's fantasy consistently sees luxury homes sell for {{Pct}}% more and in half the time. Let's create those moments. My walk-through is complimentary. This week or next?`},
{t:"luxury",ch:"email",adv:"Sharran Srivatsaa",title:"Luxury Email — The Wealth Architecture",body:
`Subject: {{Address}} as a balance-sheet decision

{{Owner}},

Properties at your level aren't just homes — they're a significant asset on your books, and they demand owner-level thinking.

Here are three numbers I engineer for principals in {{Enclave}}:
1. PRIVATE-MARKET VALUE: What discreet buyers would pay, off-market.
2. THE CARRY: Your annual cost of capital against alternatives.
3. THE ARBITRAGE: What your equity does redeployed, versus staying put.

Most owners review these when circumstance dictates. The top operators review them annually, on their own schedule.

Yours would take me a week to build, privately. Shall I?

{{Agent}} · {{Brokerage}}`},
{t:"luxury",ch:"email",adv:"Ryan Serhant",title:"Luxury Email — The Launch Concept",body:
`Subject: How {{Address}} should meet the world

{{Owner}},

Most listings are announcements. At your level, a listing should be a premiere.

Here's the launch I'd build for {{Address}}:
- THE FILM — 90 seconds, cinematic, the life not the layout. This is what travels to LA, New York, overseas.
- THE STORY — every great home has one; buyers pay for provenance.
- THE ROLLOUT — private preview for my buyer network first, then a coordinated public moment with momentum already built.
- THE FOLLOW-THROUGH — every inquiry answered within the hour, every showing followed up same-day. Deals die in the gaps; I don't leave gaps.

I'd love 45 minutes to present the full concept — spend included, timeline included. You'll leave knowing exactly what selling looks like, whether it's this year or someday.

{{Agent}} · {{Brokerage}} · {{Phone}}`}
);
/* ===== EXPANSION C: absentee, nod, tax, probate ===== */
SCRIPTS.push(
/* -- ABSENTEE: +3 each -- */
{t:"absentee",ch:"call",adv:"Ken McElroy",title:"Absentee — The Operations Reality Call",body:
`YOU: {{Owner}}? {{Agent}} in {{City}}. You own the rental on {{Street}} — I'll talk numbers, not feelings.

Three questions that tell me if this call is worth your time:
One — are you capturing market rent? (Most long-held assets aren't getting the right rent.)
Two — when did you last adjust it? (If you winced, that's the answer.)
Three — who takes the 2am call: you, or a manager taking 8%?

Here's why it matters: an under-rented, self-managed property is leaving cash flow on the table. Every dollar of lost NOI is twenty dollars of lost value. I run that comparison for {{City}} owners — what your current cash flow is versus what it could be with professional management, versus what you could redeploy. Twenty minutes of my time, zero of yours. Where do I send it?`},
{t:"absentee",ch:"call",adv:"Pace Morby",title:"Absentee — The Terms Conversation",body:
`YOU: {{Owner}}, {{Agent}} here. You own {{Address}} free and clear, and that puts you in a unique spot most sellers don't even know exists.

Most buyers only offer you one thing: cash. That means you either keep dealing with tenants, or you sell, take a big tax hit, and walk away. But there's another structure.

What if you could sell for full price, sometimes even above what the market says, and still get monthly income — without any tenants, no repairs, and no property tax headaches? You become the bank. The tax benefit spreads out, too.

It's not for everyone, you don't get a lump sum upfront. But for owners done with the grind who still want that income stream? It's a powerful way to move a property. I can show you how it works with real numbers for yours.`},
{t:"absentee",ch:"call",adv:"Bob Knakal",title:"Absentee — The Portfolio Review Call",body:
`YOU: {{Owner}}, {{Agent}} with {{Brokerage}}. My business is knowing every building in {{Submarket}} better than anyone else. You hold {{N}} properties here, which means I build market intelligence exactly for owners like you.

I'm not calling to sell anything. Owners at your scale often make three predictable mistakes: holding past peak rent growth, missing the refi window, or executing a 1031 too late in the cycle.

Twice a year, I prepare a one-page brief for portfolio owners: where the cycle sits, what each holding would trade at based on our data, and which of those three mistakes is currently in season. No charge. I play long games, and the owners who use this information often become clients. What's the best email for it?`},
{t:"absentee",ch:"vm",adv:"David Greene",title:"Absentee VM — The Remote Owner",body:
`{{Owner}}, {{Agent}} in {{City}}. Managing {{Address}} from {{TheirState}} often means property distress, and that burden costs you double. I specialize in systems that make distance irrelevant for owners like you. Here's a standing offer: I'll be your local eyes, free. We can check real cash flow against market, verify condition, and get you a firm number to trade the headache for equity. No commitment — absentee owners deserve someone local who answers. {{Phone}}.`},
{t:"absentee",ch:"vm",adv:"Jerry Norton",title:"Absentee VM — The Simple Exit",body:
`{{Owner}}, this is {{Agent}} in {{City}}, about your property on {{Street}}. If it's performing and you're happy — delete this, sincerely. But if any part of it has become a chore: the tenant, the repairs, the taxes, the distance — I make clean exits happen. As-is, no showings parade, close when you want. One number, in writing, this week. {{Phone}}. Worst case, you know what walking away is worth.`},
{t:"absentee",ch:"vm",adv:"Ken McElroy",title:"Absentee VM — The Rent Gap",body:
`YOU: {{Owner}}, {{Agent}} here. Regarding your rental at {{Address}}. Units like it are commanding {{MarketRent}} today. If you're below that, the annual rent gap subtracts from your cash flow and property value. That's money you're leaving on the table. You can capture it by raising rents, or sell to an investor who'll force that appreciation themselves. Know the numbers. It's free: {{Phone}}.`},
{t:"absentee",ch:"text",adv:"David Greene",title:"Absentee Text — The Eyes-On Offer",body:
`Hi {{Owner}}, {{Agent}} here. I'm a local agent in {{City}}. I pass {{Street}} often and know the area. For absentee owners like you, I offer a free market rent check and condition report. It's about having local eyes and good systems. Want this quarter's numbers?`},
{t:"absentee",ch:"text",adv:"Ken McElroy",title:"Absentee Text — The NOI Nudge",body:
`{{Owner}} — {{Agent}}, {{City}}. Rents near your {{Street}} property just printed {{MarketRent}}. If yours is under that, you're losing cash flow. That impacts your NOI and value. Want the 3-line math? Free.`},
{t:"absentee",ch:"text",adv:"Pace Morby",title:"Absentee Text — The Third Door",body:
`Hi {{Owner}}, {{Agent}} here. Quick thought on {{Street}}: if you could get full price, keep the monthly income, but ditch the tenants forever (you'd essentially be the bank), would that be worth 10 minutes? Most owners haven't heard this structure.`},
{t:"absentee",ch:"email",adv:"David Greene",title:"Absentee Email — The Long-Distance Playbook",body:
`Subject: Managing {{Street}} from {{TheirState}} — the honest math

{{Owner}},

Long-distance investing works — I literally wrote the book on it — but only if you build the right systems. A quick self-audit:

1. CASH FLOW: Does the rent cover PITI, vacancy, repairs, CapEx, and management? (Local comps attached — your current rent is {{Rent}}, market is {{MarketRent}}.)
2. TEAM: Do you have a property manager, agent, and contractor who respond quickly? (You're reading one of the three.)
3. EXIT CLARITY: Do you know the property's *as-is* sale number today? (Current value ~{{Value}}, equity ~{{Equity}}.)

Most remote owners hold by inertia. If you don't know your true numbers, you're not making money when you buy, or when you hold. Whether you hold or sell, do it on purpose. I'm happy to help with either — or just re-run these calculations for you each quarter, free.

{{Agent}} · {{Brokerage}} · {{Phone}}`},
{t:"absentee",ch:"email",adv:"Jerry Norton",title:"Absentee Email — The Clean Break",body:
`Subject: {{Street}}: what a zero-hassle exit looks like

{{Owner}},

You've probably priced out the traditional sale: notify the tenant, hope they cooperate with showings, fix what the inspector finds, wait 45 days, and pray it doesn't fall out of escrow.

Here's the other version, the one I do for tired landlords:

- AS-IS. I've bought houses with tenants mid-lease, deferred maintenance, even mid-eviction.
- NO SHOWINGS. One walkthrough. The tenant meets one person, once.
- YOUR TIMELINE. Close in 14 days or 4 months — whatever your tax year prefers.
- REAL NUMBER. Backed by proof of funds, not a lowball with escape hatches.

The discount versus retail is the price of certainty — and I'll show you both numbers side by side so you choose with eyes open.

One walkthrough gets you the written offer. {{Phone}}.

{{Agent}}`},
{t:"absentee",ch:"email",adv:"Bob Knakal",title:"Absentee Email — The 1031 Clock",body:
`Subject: {{Address}} and the 1031 timeline

{{Owner}},

My four decades in this business show a consistent pattern with long-held income properties: owners sell, then discover the 45-day identification clock for a 1031 exchange. That window is simply too narrow to secure a quality replacement asset without prior intelligence.

We see owners succeed when they reverse the sequence. They use market information to identify their ideal replacement property first. Only then do they sell, with the destination already secured.

If {{Address}} is part of a plan for a larger, more passive, or out-of-state holding, that preparation should begin a quarter before any listing. We provide the valuation, strategy, and replacement options based on deep market knowledge. The first conversation is always about information, not obligation.

Worth 20 minutes to discuss this month?

{{Agent}} · {{Brokerage}} · {{Phone}}`},

/* -- NOD: +3 each -- */
{t:"nod",ch:"call",adv:"Nicole Espinosa",title:"NOD — The Equity Defense Call",body:
`YOU: {{Owner}}, this is {{Agent}}. I specialize in pre-foreclosure. That notice started a clock, not a verdict, and you likely have equity worth protecting. Everyone else calling wants that equity.

Here's the math nobody explains: your true payoff isn't just the principal owed. If your home's worth {{Value}} and the bank's full demand is {{Debt}}, that gap is YOUR money—but only while YOU control the sale. At auction, that same gap becomes a bidder's discount.

We need to confirm your timeline now, because the closer it is to a sale date, the fewer options you have. I'll map out every option—reinstatement, modification, selling—with real numbers. Don't sign anything until you've seen the map. Fair?`},
{t:"nod",ch:"call",adv:"Chris Voss",title:"NOD — The Late-Night-DJ Call",body:
`(slow. warm. zero urgency in your voice — they have enough urgency)

YOU: {{Owner}}... this is {{Agent}}. I'm a local agent... and it sounds like the phone hasn't brought you much good news lately.

(pause — let them respond or not)

It seems like everyone calling has an angle... and you've gotten pretty good at spotting them.

(they'll agree — that's the first yes that matters)

I'm not going to pretend I don't have one. I help homeowners in your exact spot, and sometimes that ends with a sale, which is how I eat. But most of the time it starts with something simpler: one page, all your options, real numbers.

What would have to be true... for looking at that page to feel safe?`},
{t:"nod",ch:"call",adv:"Laurel Starks",title:"NOD — The Both-Names Call",body:
`(when the NOD property has two owners — often mid-divorce or separated)

YOU: Hi {{Owner}} — {{Agent}}, local agent. I work with homeowners facing a filed notice, and I noticed the property has two names on title. I want to be careful and respectful here: are decisions about the house being made together, or is that... complicated right now?

(listen — this changes everything)

If it's complicated: I specialize in exactly this — two parties, one deadline, zero trust. Everything I do goes to both of you identically, in writing. The foreclosure clock doesn't care about the disagreement, but the right process protects BOTH of your equity while you work it out.

May I send you both the same one-page option map, same email, same minute?`},
{t:"nod",ch:"vm",adv:"Chris Voss",title:"NOD VM — The No-Pressure Label",body:
`{{Owner}}... {{Agent}}, local agent. (unhurried) It probably seems like every voicemail this week wants something from you... so I'll keep this one different. You have more options than the letters make it feel like — and the one-page version of them is free, no meeting required. If having it would make this week feel even slightly lighter... I'm at {{Phone}}. If not, throw this voicemail away with the letters. Either way... you're going to get through this.`},
{t:"nod",ch:"vm",adv:"Ted Thomas",title:"NOD VM — The Timeline Truth",body:
`{{Owner}}, {{Agent}}, local agent in {{City}}. That notice on {{Address}} starts a government process, and the rules are specific. It's not one big countdown; it's a sequence of dates, each with its own options. Missing a deadline means losing a choice. My job is to make sure you understand your exact dates and what each step means. Call me, free, ten minutes: {{Phone}}.`},
{t:"nod",ch:"vm",adv:"Brandon Mulrenin",title:"NOD VM — The Permission Ask",body:
`Hi {{Owner}}, {{Agent}} here. I'm sure you're getting a lot of calls, and I'm certainly not calling to tell you what to do. My only question is, would you possibly be open to seeing what your home might realistically sell for right now? Not to decide anything, just so you have that number in hand. It usually helps clarify things. No pressure at all. If that's something you'd contemplate, my number is {{Phone}}.`},
{t:"nod",ch:"text",adv:"Nicole Espinosa",title:"NOD Text — The Deadline Decoder",body:
`{{Owner}}, {{Agent}} here. The notice on {{Address}} has a critical date that changes everything for your options. Most homeowners miss it. I can decode your exact timeline and next steps. Free, 10 min, no meeting.`},
{t:"nod",ch:"text",adv:"Laurel Starks",title:"NOD Text — The Two-Owner Note",body:
`Hi {{Owner}}, {{Agent}} — local agent. When a notice involves two owners, BOTH have to act for most options to work — and time splits nobody's way. I send both parties identical info, always. Want the option map sent to you both?`},
{t:"nod",ch:"text",adv:"Pace Morby",title:"NOD Text — The Keep-The-House Angle",body:
`{{Owner}} — {{Agent}} here. Before you assume selling is the only path: I help homeowners with payment burdens. We can take over your existing loan, bring it current, and sometimes even let you stay. It's a creative way out. Worth 10 min to see if one of my structures fits your situation?`},
{t:"nod",ch:"email",adv:"Chris Voss",title:"NOD Email — The Safe First Step",body:
`Subject: The smallest possible first step

{{Owner}},

It probably feels like every path forward requires trusting a stranger with the biggest problem in your life. That's a lot to ask. So I won't ask it.

Here's the smallest possible step instead: attached is a blank version of the option map I build for homeowners after a notice — reinstatement, modification, forbearance, sale-with-equity, short sale. No numbers filled in, so you can see exactly what I'd be preparing before you share anything.

If seeing your numbers on that page would help, send me just two: roughly what you owe, and your address (which I confess I already have). Ten minutes later the filled version is in your inbox.

Is that a bad place to start?

{{Agent}} · {{Brokerage}} · {{Phone}}`},
{t:"nod",ch:"email",adv:"Laurel Starks",title:"NOD Email — When It's Complicated at Home",body:
`Subject: The notice, when there are two names on title

{{Owner}},

A filed notice is hard. A filed notice when the two people on title aren't exactly a team right now — separation, divorce, estrangement — is a different animal, and it's my specialty.

What you should know:
- Most options (reinstatement, sale, modification) need BOTH signatures. Silence from either person shrinks everyone's choices.
- The foreclosure clock runs during the disagreement and cares nothing for it.
- A neutral third party — same information to both sides, everything in writing — is usually the only structure both parties will accept. That's the entire way I work.

If this describes your situation even a little, I can have identical option maps in both inboxes this week. Nobody has to be in the same room. Nobody even has to be speaking.

{{Agent}} · {{Brokerage}} · {{Phone}}`},
{t:"nod",ch:"email",adv:"Pace Morby",title:"NOD Email — The Creative Rescue",body:
`Subject: Your Notice of Default: Creative Options Beyond the Letters

{{Owner}},

Those letters make it feel like you only have two choices: pay everything you're behind, or lose your house. But that's not the full story. When you can't win on price or credit, you win on structure. There's a whole toolkit of real solutions that nobody tells you about:

- Take over payments (Sub-to): An investor brings the loan current, takes title, and makes your payments. You get debt relief, a clean exit, and your credit stays intact.
- Seller finance: If you have equity, we can structure a sale where you become the bank, turning a crisis into monthly income – often at full price.
- Hybrid: Combine both – we take over the loan, and you carry the equity. 

These structures solve problems. We close through a title company, offer independent counsel, and use third-party loan servicing to protect everyone. I'll walk you through how it works, even if you never work with me. 

Let's talk. {{Phone}}, or reply here.

{{Agent}}`},

/* -- TAX: +3 each -- */
{t:"tax",ch:"call",adv:"Nicole Espinosa",title:"Tax Default — The Stacked Problems Call",body:
`YOU: {{Owner}}, Nicole Espinosa. I work exclusively with owners on the county's tax-default list, and what I've seen is the taxes are rarely the core problem. Usually, it's an income issue, a divorce, or too much debt stacking up. So, instead of lecturing you about deadlines, my first question is: do you have a sale date set for {{Address}}?

(listen — the timeline decides everything)

Okay. Whatever the story, the good news is the same: while you're in the redemption window, you still hold the cards. A payment plan, bringing it current, or selling and walking away with your equity minus the taxes. All three beat the auction, where your equity becomes someone else's win. Which avenue should we price out first?`},
{t:"tax",ch:"call",adv:"Pace Morby",title:"Tax Default — The Equity Rescue Call",body:
`YOU: Hey {{Owner}}, {{Agent}} here. Calling about {{Address}}. The county flagged some tax issues, and if that number's grown past an easy check, I've got a different way to handle it.

Most people just want to buy it cheap, fast. My approach is structured to solve your problem: we can get those taxes paid today. Instead of selling for pennies on the dollar, we partner up. You get the relief, keep your options open, and we work to put more money in your pocket on your timeline, not the county's. 

Costs nothing to look at how it works. If it's already handled, no sweat. Can I send you the details?`},
{t:"tax",ch:"call",adv:"Bill Gross",title:"Tax Default — The Inherited-House Call",body:
`YOU: {{Owner}}, my name's {{Agent}} — I'm a local broker here. County records show the property at {{Address}} has some back taxes, and when I see that with a family home, it often means the person who managed things isn't able to anymore. If I'm right, I'm truly sorry. This is a common situation, and it's where I focus my service. Often, these homes also have a probate case that's either stuck or was never opened, or heirs who can't get on the same page.

The tax situation needs attention, but there are ways to pause the bleeding while your family takes the time to sort out the estate. I can walk you through the options, no cost, and I'm happy to work with your attorney, or connect you with the right expert if you need one. Can we talk for fifteen minutes?`},
{t:"tax",ch:"vm",adv:"Nicole Espinosa",title:"Tax VM — The No-Shame Message",body:
`{{Owner}}, {{Agent}} here. Tax trouble happens to good people all the time — job changes, medical bills, unexpected inheritances. No shame, just numbers. You've got a window to resolve this, and inside it, there are three clear pathways: payment plan, catch-up, or selling to protect your equity. Outside that window, the auction takes away your choices. I can walk you through these options, no cost, no obligation. Call me back at {{Phone}}.`},
{t:"tax",ch:"vm",adv:"Bill Gross",title:"Tax VM — The Title Check",body:
`{{Owner}}, {{Agent}} here. About {{Address}} and the tax situation, many owners discover too late that an old probate or title tangle can stall everything for months, even years. That redemption deadline won't wait for paperwork. My team can check your title condition, free, to see what it takes to un-stick it. Ten minutes now saves you a year of struggle: {{Phone}}.`},
{t:"tax",ch:"vm",adv:"Jerry Norton",title:"Tax VM — The Clean Number",body:
`{{Owner}}, {{Agent}} in {{City}} — about {{Address}} on the county tax roll. Simplest voicemail you'll get this week: I'll bring you ONE written number for the house as-is — taxes paid at closing out of proceeds, rest is yours, close on your calendar. If the number's wrong, no hard feelings. But walking into any county deadline without knowing your cash-out number is negotiating blind. {{Phone}}.`},
{t:"tax",ch:"text",adv:"Nicole Espinosa",title:"Tax Text — The Three Outs",body:
`{{Owner}}, {{Agent}} here. The tax default at {{Address}} has options. While the redemption window is open, we can look at a payment plan, catch-up, or a sale. We only do this, and the lender pays our fee. Which option do you want to explore?`},
{t:"tax",ch:"text",adv:"Bill Gross",title:"Tax Text — The Family Home Question",body:
`Hi {{Owner}}, {{Agent}}. About {{Address}} – is this an inherited family property? Tax arrears often mean a hidden title issue. Those take months to fix, making it tough to sell while the county clock runs. Getting it unstuck is my service. I can check the title for you.`},
{t:"tax",ch:"text",adv:"Pace Morby",title:"Tax Text — The Taxes-Paid Play",body:
`{{Owner}} — {{Agent}}. Regarding {{Address}} taxes: I specialize in creative structures where I can take over the payments, including the taxes, so you keep your equity. Not a gimmick, just a different way to solve a problem. Want to see how it works?`},
{t:"tax",ch:"email",adv:"Bill Gross",title:"Tax Email — The Sequence Letter",body:
`Subject: {{Address}}: the order to fix things in

{{Owner}},

When a property has tax issues, most people jump straight to the county. Often, that's not the first step. Especially if the property is part of an estate, or has a deceased co-owner. That legal tangle — the unprobated estate — is the real problem.

Here's how we tackle it, to un-stick the process:

1. TITLE FIRST — get that estate settled. This is the slowest piece. Everything else waits on it. Many attorneys aren't probate experts, which creates these delays. We sort that out.
2. COUNTY SECOND — once the title is clear, we can stabilize the tax situation. Installment plans stop the clock.
3. DECISION THIRD — now that it's sellable, we can make a clear decision to keep or sell. You can't sell a stuck property.

I've guided {{County}} families through this sequence for years, often alongside their attorneys. A 15-minute chat about your situation is free.

{{Agent}} · {{Brokerage}} · {{Phone}}`},
{t:"tax",ch:"email",adv:"Nicole Espinosa",title:"Tax Email — The Real Numbers Letter",body:
`Subject: {{Address}} — your three numbers

{{Owner}},

When you're facing a tax default, the decision hinges on three clear numbers. Most owners don't see them side-by-side, which is the biggest mistake.

1.  THE CURE: taxes + penalties to bring it current = {{Cure}}
2.  THE PLAN: county installment first payment ≈ {{Plan}} (This stops the auction clock, but you have to drive it.)
3.  THE EXIT: what you'd walk away with selling as-is, taxes paid from proceeds ≈ {{Net}}

Look at these three. The choice usually makes itself — keep and cure, keep and plan, or take the equity and be done. Waiting is not an option. The timeline decides everything.

I'll fill in your actual figures this week, free. The only losing move is deciding without them.

{{Agent}} · {{Brokerage}} · {{Phone}}`},
{t:"tax",ch:"email",adv:"Ken McElroy",title:"Tax Email — The Investor-Owner Letter",body:
`Subject: The {{Street}} property: actual performance

{{Owner}},

Too many investors get stuck with property taxes because the asset isn't generating the cash flow to cover its own costs. It becomes a drain, not a business.

Let's look at the actual numbers for {{Address}}:
- Annual carry (taxes + insurance + maintenance): {{Carry}}
- Actual income it's producing: {{Income}}
- The gap, funded from your pocket: {{Gap}}/year

When the numbers show a negative gap, it's not an investment; it's an expense. A property that isn't cash-flowing turns you into a forced seller, especially with rising tax penalties. Selling as-is (with arrears paid at closing) converts this back into capital that can actually work for you.

I'll run your specific numbers free. If it still pencils, I'll tell you that too — I have no interest in talking anyone out of a performing asset.

{{Agent}} · {{Brokerage}} · {{Phone}}`},

/* -- PROBATE: +3 each -- */
{t:"probate",ch:"call",adv:"Bill Gross",title:"Probate — The Court-Process Call",body:
`YOU: Hi {{Name}}, this is {{Agent}}. I work with families settling estates here in {{County}}, and I'll be brief. (I'm coming from being of service here, not just chasing a lead.)

One thing I always share upfront, because most attorneys aren't probate experts, is that how you sell the house depends entirely on the authority your Letters grant. Full IAEA means you can often sell in 2-6 months like a normal listing. Limited authority means court confirmation, overbids, and a completely different timeline – a process that can easily get stuck for years without the right plan.

Do you know if your Letters granted full or limited authority? That single detail changes everything for your price, buyer pool, and timeline. I map out the court process for families at no charge – the attorney handles the law, I handle the property. Would that map help this week?`},
{t:"probate",ch:"call",adv:"Al Nicoletti",title:"Probate — The Attorney-Partner Call",body:
`YOU: {{Name}}, {{Agent}} here — I specialize in the real estate side of estate challenges. Quick but crucial question: do you have a probate attorney on the case yet?

(if yes:) Excellent. My role is straightforward: your attorney handles the legal filings, and I ensure the property itself doesn't become the roadblock. That means getting the right valuation, securing and insuring the house, and ultimately, a sale that satisfies all court and title requirements. We work directly with your counsel to architect a closeable title.

(if no:) Then that's the first step. I'll connect you with a few specialized {{County}} probate attorneys — the ones who understand how to make a complicated topic simple. Choosing the right one upfront prevents months of delay. Then we'll address the house.

Either way — what's the property situation today: occupied, vacant, or we're not sure what's in there yet?`},
{t:"probate",ch:"call",adv:"Chad Corbett",title:"Probate — The Vacant House Call",body:
`YOU: {{Name}}, this is {{Agent}}. I was just down at the probate court this week, and it looks like the property on {{Street}} connected to {{Deceased Name}}'s estate might be sitting empty. First, I'm genuinely sorry for your family's loss. That's a lot to manage.

My social enterprise here helps families with the non-billable aspects of settling an estate. One thing that often catches families off guard is that most homeowner's insurance becomes void after 30-60 days of vacancy. A burst pipe might not be covered. Also, empty homes attract unwanted attention.

I offer a free service to check on estate properties: photos, utility status, making sure it's secure. How important is it to you that the property stays protected while you're navigating everything else? If you ever consider options for the property, I'd hope you'd think of me. Can I put eyes on it this week?`},
{t:"probate",ch:"vm",adv:"Chad Corbett",title:"Probate VM — The One Less Thing",body:
`Hi {{Name}}, this is {{Agent}}. I noticed the recent filing for {{Deceased Name}}'s estate. I know this period can bring a lot of details to manage, and the property often becomes a significant one. My work is helping families like yours navigate all those moving pieces — from cleanout and utilities to understanding the options for the home. No pressure, just a resource. When it's time to resolve that piece of the estate, I'm at {{Phone}}. Until then, take care of each other.`},
{t:"probate",ch:"vm",adv:"Bill Gross",title:"Probate VM — The Authority Question",body:
`Hello {{Name}}, this is {{Agent}}, focused on {{County}} probate. One question cuts through months of delay for families: does the estate have full or limited authority? That single detail dictates everything about the sale — your timeline, how we price, even who can overbid. Most executors don't realize this, and frankly, most agents don't know to ask. I'll walk you through what your specific authority means, no charge: {{Phone}}. Getting this right is the difference between a smooth close and a case that gets stuck for years.`},
{t:"probate",ch:"vm",adv:"Al Nicoletti",title:"Probate VM — The No-Attorney Flag",body:
`{{Name}}, this is {{Agent}}. If you have a probate attorney already, great; I simply handle the property side. But if there's no counsel yet, please know: getting an expert who understands the whole real estate world, not just court paperwork, is key. It's about architecting a closeable title from day one. I can connect you to specialized {{County}} probate attorneys, no cost, no obligation. Choosing the right one upfront makes all the difference. {{Phone}}.`},
{t:"probate",ch:"text",adv:"Chad Corbett",title:"Probate Text — The Property Check",body:
`Hi {{Name}}, I'm {{Agent}}. Regarding the home on {{Street}} during estate settlement: vacant properties often lose insurance after 30-60 days. I offer families complimentary property checks – photos, utilities, insurance status. Would a check this week bring you peace of mind?`},
{t:"probate",ch:"text",adv:"Bill Gross",title:"Probate Text — Full or Limited",body:
`{{Name}}, {{Agent}} here. The fork in the road for your estate sale: FULL or LIMITED IAEA authority? I can clarify the difference in timelines and court confirmation for you in 5 minutes. No charge.`},
{t:"probate",ch:"text",adv:"Al Nicoletti",title:"Probate Text — The Timeline Ask",body:
`Hi {{Name}}, {{Agent}} here. For {{County}} estates, my focus is always on getting a closeable property title efficiently. What's the plan for that? We can often simplify these challenges. Knowing the timeline and cost upfront is key. I can help.`},
{t:"probate",ch:"email",adv:"Chad Corbett",title:"Probate Email — The Family Meeting Agenda",body:
`Subject: When the family talks about the estate — an agenda that keeps the peace

{{Name}},

Eventually, the family will gather to discuss {{Street}} and settling the estate. In my experience helping families in the community, these conversations typically go one of two ways: everyone finds alignment, or the property becomes a point of division during an already difficult time.

The difference often comes down to structure and data. I've attached the agenda I share with families — three questions, in order, to turn opinion into arithmetic:

1.  WHAT DOES IT COST TO KEEP? (taxes, insurance, upkeep — the real annual number)
2.  WHAT WOULD IT RENT FOR? (income minus management headaches, honestly stated)
3.  WHAT WOULD IT NET IF SOLD? (after everything — the clear number that ends speculation)

Families who see all three numbers argue less. I prepare all three at no charge, before your meeting, so the discussion can focus on the FAMILY's wishes, not competing guesses. This way, you're equipped to make the right decisions in the right order.

Whenever you're ready.

{{Agent}} · {{Brokerage}} · {{Phone}}`},
{t:"probate",ch:"email",adv:"Bill Gross",title:"Probate Email — The Court Sale Playbook",body:
`Subject: Probate Property Sale in {{County}} — What You Need to Know

{{Name}},

When you're ready (no rush), here's the plain-English version of how estate sales actually work here:

When the estate has **FULL Authority (IAEA)**, the Personal Representative can sell much like a standard listing. We just give a Notice of Proposed Action to the heirs, and then it's a cleaner, faster path to close.

With **LIMITED Authority**, the sale goes through court confirmation. This means a hearing, and often an overbid auction in the courtroom. We follow specific rules, like the CA Probate Code §10311 overbid formula. It's slower, but very manageable when the agent knows the process. (I do.)

Either way, pricing must respect the probate referee's appraisal. It's critical to tell the buyer pool upfront what kind of sale this is — prepared buyers close, surprised ones cancel. That's 80% of what families need to know. The other 20% is specific to your case — free conversation, whenever it helps.

{{Agent}} · {{Brokerage}} · {{Phone}}`},
{t:"probate",ch:"email",adv:"Al Nicoletti",title:"Probate Email — The Heir Alignment Letter",body:
`Subject: When heirs disagree about the property

{{Name}},

I've seen it countless times: a family home becomes the focal point for all kinds of challenges among heirs. One wants to hold, another needs the cash now, and someone else just wants the whole process done.

What actually works to get to a closeable title:

1. CLEAR NUMBERS, NOT EMOTIONS. Before anyone digs in, get three solid figures from a neutral party for keeping, renting, or selling the property.
2. ONE VOICE. Every heir receives the exact same information at the same moment. This avoids favoritism, even accidental, which can poison an estate.
3. THE SPECIALIST SETS THE PATH. Understanding early what requires everyone's agreement versus what the executor can decide prevents unnecessary battles. It's about knowing the lanes.

If your family is facing this crossroads, I can help get you those clear numbers and ensure everyone hears the same message, working within whatever path your attorney outlines.

{{Agent}} · {{Brokerage}} · {{Phone}}`}
);
/* ===== EXPANSION D: divorce, nego, cre, invest, espanol ===== */
SCRIPTS.push(
/* -- DIVORCE: +3 each -- */
{t:"divorce",ch:"call",adv:"Chris Voss",title:"Divorce — The One-Spouse-Resists Call",body:
`(one spouse wants to sell; the other won't engage — you're calling the reluctant one)

YOU: {{Name}}... {{Agent}} here. (slow, warm) You probably expected this call to be someone pushing you to sell a house you're not ready to let go of.

(pause)

It seems like this house is the last piece of a life you didn't choose to end... and everyone treating it like a transaction makes it worse.

(let that land — say nothing)

I'm not calling for a signature. I'm calling because decisions made AT you tend to be worse than decisions made WITH you. What would need to be true about this process... for it to feel like yours too, and not just something happening to you?

(their answer is the entire roadmap — take notes)`},
{t:"divorce",ch:"call",adv:"Laurel Starks",title:"Divorce — The Attorney Referral Call",body:
`(calling a family-law attorney to build the referral pipeline)

YOU: {{Attorney Name}}, {{Agent}} — I'm the agent several {{County}} family-law practices use for the house, and I'll take 90 seconds to tell you why, because it's about YOUR caseload, not my listings:

One — I'm neutral, in writing. Identical simultaneous communication to both parties, both counsel. Your file gets a paper trail, not a he-said-she-said.

Two — court-ready documentation: valuation with comps both sides can rely on, no advocacy math.

Three — I've handled sales under every posture: cooperative, contested, court-ordered with an elisor. Nothing about a hostile transaction surprises me anymore.

Next time the marital residence is the sticking point, try me on one case. If I don't make your file easier, there's no second case. Fair?`},
{t:"divorce",ch:"call",adv:"Al Nicoletti",title:"Divorce — The Timing Strategy Call",body:
`YOU: {{Name}}, {{Agent}} — I specialize in helping families facing property challenges, especially when a divorce is in progress. You've got a lot on your plate, so I wanted to share one critical timing insight that can save serious money.

It's about when you close on the property relative to the final divorce judgment. Sell while still married-filing-jointly, and you might exclude up to $500K in gain. Wait until after, and that exclusion, basis, and buyout math shifts for each of you. Your CPA and attorney are the strategists here — my job is to make sure you're asking the right questions before a default decision costs you.

Has anyone laid out the 'sell now' versus 'sell after' numbers for you two? I put together that exact analysis, copying both parties, and your attorneys are always welcome to review it. Want me to send that over this week?`},
{t:"divorce",ch:"vm",adv:"Chris Voss",title:"Divorce VM — The Reluctant Party",body:
`{{Name}}... {{Agent}}, local agent. (unhurried) It sounds like everyone in this process wants something from you — a signature, a date, a decision. I'm not calling to add to the pile. When a house has to be sold in circumstances nobody chose... the person who feels steamrolled usually has the power to slow everything down — and usually should, until the process respects them. If you want the version of this where YOU set the terms of engagement... I'm at {{Phone}}. No signature required to talk.`},
{t:"divorce",ch:"vm",adv:"Laurel Starks",title:"Divorce VM — The Court-Ordered Sale",body:
`{{Name}}, {{Agent}} — I understand the court has ordered the residence sold. That order feels like losing control; the process doesn't have to. My role in court-ordered sales: both parties get identical information at identical times, every decision is documented for counsel, and the house sells for full market value — not the fire-sale number people fear. I've done this many times under every level of cooperation, including none. Your attorney can verify my process before we speak: {{Phone}}.`},
{t:"divorce",ch:"vm",adv:"Sharran Srivatsaa",title:"Divorce VM — The Fresh Start Number",body:
`{{Name}}, {{Agent}} with {{Brokerage}}. In any divorce, the critical number for your next chapter is what the house actually yields. Many negotiate for months, arguing over assumptions, without precise scenarios. I prepare a structured financial analysis: net sheet, division options, and each party's realistic next-home budget. It's data-driven, not a guess. Clarity first; then, decisions. {{Phone}}.`},
{t:"divorce",ch:"text",adv:"Laurel Starks",title:"Divorce Text — The Neutral Offer",body:
`Hi {{Name}}, {{Agent}} — local agent who works divorce sales as a strict neutral (both parties get identical info, attorneys copied on everything). If the {{Street}} house needs a valuation both sides can trust, I can deliver it to both inboxes this week. OK to send my one-page process?`},
{t:"divorce",ch:"text",adv:"Chris Voss",title:"Divorce Text — The Slow-Down Text",body:
`{{Name}} — {{Agent}} here. It seems like the house decision is being rushed at you. For what it's worth: the party who insists on a clean process usually ends up with a better outcome than the one who just pushes. If you want the checklist of what a fair sale process looks like — no strings — say the word.`},
{t:"divorce",ch:"text",adv:"Al Nicoletti",title:"Divorce Text — The Tax Timing Flag",body:
`Hi {{Name}}, {{Agent}}. With divorce, selling the house BEFORE vs AFTER judgment can change your capital-gains by six figures. It's a challenge, but we architect for a closeable deal. Want the one-page explainer for your attorney? Free.`},
{t:"divorce",ch:"email",adv:"Laurel Starks",title:"Divorce Email — The Process One-Pager",body:
`Subject: How the house gets sold without becoming the war

{{Name}},

The marital residence is usually the largest asset and the most emotional one — which is why it deserves the most boring, procedural sale imaginable. Here's my process, in writing, for you and your attorney:

1. NEUTRAL VALUATION — comps-based, no advocacy, delivered to both parties and both counsel simultaneously.
2. WRITTEN COMMUNICATION ONLY for decisions — list price, offers, credits. Same email, same minute, both sides. No side-channels, ever.
3. SHOWINGS PROTOCOL both parties approve in advance (who's notified, occupancy respected).
4. OFFER PRESENTATION in a joint session or parallel written summaries — your attorneys choose.
5. PROCEEDS to escrow per the order or agreement. I never touch the split.

Boring is the goal. Boring closes. I'm happy to walk both counsel through this before anyone commits to anything.

{{Agent}} · {{Brokerage}} · {{Phone}}`},
{t:"divorce",ch:"email",adv:"Sharran Srivatsaa",title:"Divorce Email — The Two-Futures Analysis",body:
`Subject: The numbers that end the argument

{{Name}},

When couples split, the house conversation drifts into feelings – "it's worth more," "we can't afford it." I strip the emotion and hand them three concrete scenarios I call the Two‑Futures Analysis. It's the same disciplined, data‑first approach I use in every listing that gives me a 94.5% success rate in the living room.

Scenario 1 – Sell now: I calculate net proceeds after market price, loan payoff and transaction costs, then show exactly what each party could buy or rent today.

Scenario 2 – One stays: I pin down the buy‑out figure, run a refinance test (can a single income qualify?), and map what the staying spouse trades in the broader settlement.

Scenario 3 – Hold and sell later: I break out the split carrying cost, market risk exposure, and the tax exclusion you might lose by waiting.

I prepare all three, copy both parties and counsel, and let the numbers do the talking. One week to engineer this analysis. Ready to move forward?

{{Agent}} · {{Brokerage}} · {{Phone}}`},
{t:"divorce",ch:"email",adv:"Chris Voss",title:"Divorce Email — To the Party Who Didn't Choose This",body:
`Subject: The house, on your terms too

{{Name}},

It seems like the sale of the house is being presented to you as inevitable — a done decision you're expected to cooperate with.

Maybe it is inevitable. Court orders and settlement math are what they are. But HOW it happens is not decided yet, and the how is where your leverage lives:

- The timeline (school years and leases matter, and courts often listen)
- The list price (you're entitled to input, and to your own comp analysis)
- The showings protocol (your home life doesn't become an open house without rules)
- The communication structure (identical information, in writing — no decisions relayed through your ex)

I work these sales as a strict neutral, which means my job is protecting the PROCESS — including from anyone who'd rather steamroll it.

Would it be a bad idea to know your options before the next deadline lands?

{{Agent}} · {{Phone}}`},

/* -- NEGO: +3 each -- */
{t:"nego",ch:"call",adv:"Ryan Serhant",title:"Nego — The Multiple-Offer Winner Call",body:
`(coaching your buyer before they write in a competitive situation)

YOU: {{Name}}, real talk before we write this: there are {{N}} offers, and the winner won't just be the biggest number. Sellers pick certainty and story. So here's our three-part play:

ONE — THE NUMBER: strong enough to survive round one. I'll show you the comps for where that line is.

TWO — THE CERTAINTY: tightened timelines, deposit that signals commitment, only the contingencies you actually need. Every contingency you keep is a discount the seller mentally applies.

THREE — THE STORY: sellers are humans leaving a home they love. One paragraph about who you are and the life you'll live there — it's won me deals against higher offers, repeatedly.

You bring the number you're comfortable with. I'll bring two and three. Ready to build it?`},
{t:"nego",ch:"call",adv:"Chris Voss",title:"Nego — The Lowball Response Call",body:
`(your seller just got an insulting offer — call the buyer's agent)

YOU: {{Agent Name}}, thanks for the offer on {{Address}}. (calm, almost amused) It seems like your buyers really like the house... they just don't want to pay for it yet.

(let them laugh — you're colleagues, not combatants)

Here's where my sellers are: the offer as written doesn't get a counter, because countering it would negotiate against ourselves. But I don't want to lose your buyers over round one posturing — good buyers are worth keeping in the room.

So, a calibrated question for your side: what would your buyers need to see from us... to get to a number that respects the comps?

(silence — let them work)

Bring me that, and we'll have a real negotiation.`},
{t:"nego",ch:"call",adv:"Bob Knakal",title:"Nego — The Repair-Request Defense Call",body:
`YOU: {{Owner}}, the inspection response just arrived. Before you react, understand this: it's not a repair list, it's an opening position. Buyers' agents often pad these, hoping sellers just… concede. 

We approach this with market intelligence, not emotion. I've analyzed their requests against our transaction history for properties like yours. We'll categorize them:

NON-NEGOTIABLES — the {{Item}} — these are items any lender would demand. We address them.
NEGOTIABLE ITEMS — worth a credit at 50-70 cents on the dollar. Credits close cleaner than contractors, and we know what's customary.
WISH-LIST ITEMS — cosmetic asks that vanish once we politely decline.

My proposed response protects your net at {{Number}} while giving them a win to take back. Information wins these negotiations. Want me to send it tonight?`},
{t:"nego",ch:"vm",adv:"Ryan Serhant",title:"Nego VM — The Deal-Rescue Energy",body:
`{{Name}}, {{Agent}}. The deal hit a bump — the {{Issue}} — and I want you to hear my voice, not read a text, when I tell you: this is fixable, and bumps are where good agents earn their keep. I've already got two paths sketched out, and both keep you moving toward keys. Call me tonight, even late — we'll pick one and execute tomorrow morning. Deals don't die from problems; they die from silence. We don't do silence. {{Phone}}.`},
{t:"nego",ch:"vm",adv:"Chris Voss",title:"Nego VM — The Stalled Counter",body:
`{{Agent Name}}... {{Agent}} here, about {{Address}}. (easy, unhurried) It's been {{N}} days since our counter and... it sounds like your buyers might be stuck between wanting the house and wanting to win the negotiation. Those are different things, and only one of them gets them the keys. No pressure from our side — the house is getting activity — but before anything changes on our end, I wanted your buyers to have the chance to decide which one they're actually after. {{Phone}}.`},
{t:"nego",ch:"vm",adv:"Rene Rodriguez",title:"Nego VM — The Reframe Message",body:
`{{Name}}, {{Agent}}. Quick reframe before our call tomorrow, because I know tonight's the night you talk yourselves out of it: you're not deciding whether to "give up" {{Amount}} in the negotiation — you're deciding whether {{Amount}}, amortized over the years you'll live there, is worth losing the house you've already imagined your furniture in. That's about {{PerMonth}} a month. Sleep on THAT version of the question, not the scary version. Talk tomorrow. {{Phone}}.`},
{t:"nego",ch:"text",adv:"Chris Voss",title:"Nego Text — The Deal-Revival",body:
`{{Agent Name}} — {{Agent}} re: {{Address}}. Have your buyers moved on completely? (No judgment either way — I'd just rather release the tension than let it drift. If they're still in, there may be a version that works that we haven't put on paper yet.)`},
{t:"nego",ch:"text",adv:"Ryan Serhant",title:"Nego Text — The Momentum Keeper",body:
`{{Name}} — update: seller reviewed our response, we're {{Gap}} apart, which in this market is NOTHING. Don't lose a house over {{PerMonth}}/month. I have one move left that usually closes gaps like this — 5-min call tonight?`},
{t:"nego",ch:"text",adv:"Rene Rodriguez",title:"Nego Text — The Loss-Frame Flip",body:
`{{Name}}, one thought before you decide: a year from now, nobody remembers "we paid {{Amount}} more." Everybody remembers "we lost the house on {{Street}}." Choose the regret you can live with — I'll execute either one. Call when ready.`},
{t:"nego",ch:"email",adv:"Chris Voss",title:"Nego Email — The Accusation Audit Counter",body:
`Subject: Our counter on {{Address}} — and everything you're about to think

{{Buyer Agent Name}},

Before you open the counter, let me say what your buyers will think so we can skip that round:

"The sellers are being greedy." "They don't understand the inspection findings." "They think it's still 2021."

None of that is what's happening. Here's what is: the comps ({{Comps}}) support the number, the inspection items that matter carry a credit inside the counter, and the timeline flexes to your buyers' lease — which, as you mentioned, is their real pressure point.

The counter reflects the house's value AND your buyers' constraints. That's as good as negotiations get.

What would your buyers need to feel good saying yes?

{{Agent}} · {{Brokerage}} · {{Phone}}`},
{t:"nego",ch:"email",adv:"Bob Knakal",title:"Nego Email — The Appraisal Rebuttal",body:
`Subject: {{Address}} — Our appraisal rebuttal package

Team,

The appraisal for {{Address}} came in {{Gap}} under contract. Before any discussion of price adjustment, our formal rebuttal package is attached. This isn't about personality; it's about superior information:

1.  **Two overlooked comps:** {{Comp1}} and {{Comp2}} are both more relevant sales, closed within the window, that establish a higher value. We know this specific block.
2.  **Adjustment errors:** The appraiser's {{Feature}} adjustment is inconsistent with current market data (see page 3). We rebuild these numbers ourselves.
3.  **Real-time market validation:** A pending sale at {{Address2}} will close above our contract price within two weeks, proving our valuation right now.

The reconsideration of value goes to the lender today. Our experience shows that deep, comp-level evidence like this significantly improves the odds of success. Even a partial correction changes the negotiation entirely.

We hold the line until the ROV answers. That's the discipline that protects the value of your asset.

{{Agent}} · {{Brokerage}}`},
{t:"nego",ch:"email",adv:"Rene Rodriguez",title:"Nego Email — The Cold-Feet Letter",body:
`Subject: The 3am version vs. the actual numbers

{{Name}},

It's normal — genuinely, neurologically normal — to panic right after going into contract. The brain treats a big commitment like a threat, and at 3am it writes horror stories: overpaid, market crash, money pit.

So here's the daylight version, on paper:

- You're paying {{Price}}. The three most similar closings: {{Comps}}. You're inside the band.
- Your monthly all-in is {{Monthly}} — {{Percent}}% of take-home, under the 33% guideline.
- The inspection found {{N}} items; the two that matter are already credited.

The 3am brain doesn't get a vote it didn't earn with evidence. If there's a REAL concern hiding under the noise — the job, the commute, the school — call me and we deal with the real thing.

Otherwise: you made a good decision. It's still good at 3am.

{{Agent}} · {{Phone}}`},

/* -- CRE: +3 each -- */
{t:"cre",ch:"call",adv:"Tyler Cauble",title:"CRE — The Vacancy Fix Call",body:
`YOU: {{Owner}}, {{Agent}} — commercial agent here in {{City}}. Your space at {{Address}} has been sitting empty about {{Months}} months. Every month that goes by is roughly {{Rent}} in lost NOI, and it changes the economics of that asset.

From the outside, it looks like a classic 'pro forma over actuals' problem. You're priced for a tenant profile that this submarket isn't producing. Three fixes, cheapest first:

One — REPACKAGE: better photos, a floor plan, and listing where actual {{Use Type}} tenants search. It costs almost nothing; fixes more vacancies than people admit.
Two — RESLICE: that footprint divides into two smaller suites. Smaller spaces are what's actually moving here, especially for local businesses.
Three — REPRICE with escalations: start lower, bake in bumps, protect the NOI growth trajectory.

I fill spaces like this in {{City}}— it's my niche. Want the 15-minute walk-through version with actual comps?`},
{t:"cre",ch:"call",adv:"Ken McElroy",title:"CRE — The Value-Add Reposition Call",body:
`YOU: {{Owner}}, {{Agent}} here. I've looked at your property on {{Street}} and see a classic value‑add – solid building, but rents are below market and the operation isn't squeezing every dollar of NOI. That's not a problem; it's an opportunity for forced appreciation. Investors who focus on cash flow love that.

You have two clear routes:

CAPTURE THE NOI: As units turn, bring rents up to market, add income streams like utility bill‑backs or storage, and trim expenses. We'll run the numbers off the actual T‑12, calculate the new cash‑on‑cash return and then refinance to pull equity out of the "golden goose."

SELL THE UPSIDE: Let a buyer pay you today for the higher NOI you'll generate. At today's caps, the future value often exceeds the cost of the work, and you walk away with cash and no ongoing management.

The honest question is: do you want to stay in the trenches for another two years to run the property? If yes, we capture. If not – which is common after a few years of holding – we sell the story. I'll have both scenarios priced for you this week.`},
{t:"cre",ch:"call",adv:"Sharran Srivatsaa",title:"CRE — The Professional-Owner Call",body:
`YOU: {{Owner}}, {{Agent}} with {{Brokerage}}. Your operating company is your primary P&L. Your building is an asset that needs an owner P&L, but not your daily attention.

My commercial-owner clients get a quarterly tactical report. I'd like to send you this quarter's edition, free, to earn the relationship:

- MARKET DATA: what your asset would trade at TODAY, not last refi.
- LEASE AUDIT: which tenants are under market, when bumps hit, where rollover risk sits.
- THE MOVE: the one high-leverage action this quarter—a renewal, a refi window, a tax angle for your CPA.

One page. Real numbers. If it's not the most useful thing in your inbox that week, unsubscribe me from your business forever. Email?`},
{t:"cre",ch:"vm",adv:"Bob Knakal",title:"CRE VM — The Off-Market Bid",body:
`YOU: {{Owner}}, this is {{Agent}}. My firm's focus on the {{Submarket}} territory has identified a specific buyer requirement for an {{Asset Type}}. This isn't a listing call. I have a 1031 exchange principal with a hard closing deadline — a clock running — who has authorized me to approach owners directly. These deadline buyers pay a premium for certainty, which puts you in the strongest seller's position. If a quiet conversation about {{Address}} interests you at a specific number, call me this week. After their 45-day window, this opportunity vanishes. {{Phone}}.`},
{t:"cre",ch:"vm",adv:"Tyler Cauble",title:"CRE VM — The Lease Expiry Heads-Up",body:
`{{Owner}}, {{Agent}} — commercial broker in {{City}}. My research shows your lease with {{Tenant}} at {{Address}} likely rolls in the next 12-18 months. That's a critical window where investors either capture the {{Pct}}% rent growth this submarket just printed, or miss out on NOI growth by renewing at yesterday's numbers. We should discuss how the lease structure impacts your actual returns, not just the asking rent. Let's talk for twenty minutes, no charge: {{Phone}}. A proper lease-up pays for itself.`},
{t:"cre",ch:"vm",adv:"Ken McElroy",title:"CRE VM — The Expense Leak",body:
`{{Owner}}, {{Agent}}. Quick one on {{Address}}: properties like yours in {{City}} are typically seeing expense ratios around {{Pct}}%. With original systems and a long-term owner, I often find they're running higher. Remember, every dollar of NOI you add, at today's cap rates, creates {{Multiple}} dollars of value. That's forced appreciation through better management. Let's benchmark your building's expenses against its peers. My number is {{Phone}}. Let's get those leaks plugged before you refi or sell — or just keep that extra cash flow.`},
{t:"cre",ch:"text",adv:"Bob Knakal",title:"CRE Text — The Deadline Buyer",body:
`{{Owner}} — {{Agent}}, {{Brokerage}}. I represent a 1031 buyer on a 45-day clock seeking {{Asset Type}} in your territory. My data shows these buyers pay a premium for market certainty. If {{Address}} has a price, this is the week for its highest value. Coffee?`},
{t:"cre",ch:"text",adv:"Tyler Cauble",title:"CRE Text — The Rent Comp",body:
`{{Owner}}, {{Agent}} here, commercial in {{City}}. Two spaces near {{Address}} just leased at {{Rate}}/sf — a significant bump. This changes your underwriting for renewals and the NOI growth trajectory. Want the comps to re-evaluate your building? Free.`},
{t:"cre",ch:"text",adv:"Ken McElroy",title:"CRE Text — The Cash-Flow Check",body:
`{{Owner}} — {{Agent}}. Is {{Address}} actually providing cash flow, or are you chasing it? If that question makes you pause, the free NOI audit I run for {{City}} owners shows where the profit is. 10 minutes. Want it?`},
{t:"cre",ch:"email",adv:"Bob Knakal",title:"CRE Email — The Market Cycle Letter",body:
`Subject: {{Submarket}} Territory Intelligence: Your Building's Position

{{Owner}},

This is the granular market intelligence we provide owners, distilled for your {{Asset Type}} in {{Submarket}}.

PRICING: We're tracking {{Asset Type}} in your territory trading at {{CapRange}} caps — a {{Direction}} from our view last year. Every 25bps of cap movement shifts your building's value roughly {{Swing}}.
VELOCITY: {{N}} transactions closed this quarter; {{Days}} average marketing time. Buyers are specific, but they exist.
THE 1031 FLOW: Exchange capital is {{Flow}} — these buyers remain the most motivated for sellers who can move quickly.
BOTTOM LINE FOR YOU: Owners with your basis and hold length are {{Position}}. The move worth pricing this quarter: {{Move}}.

The deeper insights, including your building's specific mark-to-market based on our block-by-block data, are a 20-minute meeting. My standing offer.

{{Agent}} · {{Brokerage}} · {{Phone}}`},
{t:"cre",ch:"email",adv:"Tyler Cauble",title:"CRE Email — The NNN Upgrade Path",body:
`Subject: {{Address}}: from active management to mailbox money

{{Owner}},

You've owned {{Address}} long enough to have done every landlord job twice. Here's the upgrade path for owners at your stage, turning active management into true passive income:

STEP 1 — MAXIMIZE NOI: get your current leases to market with escalations. (Your area just printed {{Rate}}/sf – comps attached.) This is a key value-add lever.
STEP 2 — STABILIZE: a building with fresh, market-rate leases and 3+ years of term sells at a premium cap rate. Cap rate is a snapshot of value, and we want to maximize it.
STEP 3 — TRADE: 1031 the proceeds into a true NNN deal – single tenant, corporate guarantee, where the tenant pays taxes, insurance, and CAM. Your involvement becomes depositing checks.

Owners skip step 1 and 2 constantly and leave six figures of value on the table by selling messy. The whole sequence takes 12-18 months, and I quarterback all of it.

Want the version with your actual numbers?`},
{t:"cre",ch:"email",adv:"Sharran Srivatsaa",title:"CRE Email — The Family Balance Sheet",body:
`Subject: The family's commercial asset: a strategic choice

{{Owner}},

A pattern I've observed with family-held commercial assets: the property often outlives the original plan for it. What began as an investment, then steady income, can become an asset held by default, waiting for a strategic decision that never quite happens.

If that resonates with {{Address}}, there are three tactical questions to answer while every option is open:

1. Does anyone in the next generation genuinely WANT to operate this asset? (An honest assessment: inheriting a job isn't a gift.)
2. What's the step-up-in-basis math? Sometimes holding until transfer is the right play; your CPA and I can model both scenarios.
3. If it were cash today, would the family re-acquire THIS asset with it? If not, the market is offering a premium exit for a strategic reallocation.

I facilitate these conversations for property families — numbers first, neutrally presented. It's a critical owner P&L discussion most families never schedule.

{{Agent}} · {{Brokerage}} · {{Phone}}`},

/* -- INVEST: +3 each -- */
{t:"invest",ch:"call",adv:"Jerry Norton",title:"Invest — The MAO Transparency Call",body:
`YOU: {{Owner}}, {{Agent}} — you asked how I get to my number on {{Address}}, and unlike most buyers, I'll actually show you the math. Pen ready?

Fixed up, your house sells for about {{ARV}} — that's the comps, I'll send them.
The work it needs runs about {{Rehab}} — roof, {{Items}}, the stuff both of us can see.
My formula: 65% of the fixed-up value, minus repairs. That's {{Offer}}.

The 35% gap isn't greed — it's holding costs, selling costs, financing, risk, and yes, profit; nobody renovates houses for free.

Here's what that buys YOU: no repairs, no showings, no appraisal roulette, close on your date, moving help if you need it. Retail minus reality often nets less than my number — want me to show you THAT math too?`},
{t:"invest",ch:"call",adv:"Pace Morby",title:"Invest — The Sub-To Explainer Call",body:
`YOU: {{Owner}}, {{Agent}}. You said the payoff quote killed your last deal — low balance, low rate, and after fees, nothing was left at your price. That's a common problem when you're trying to win on price. We need to get creative.

Here's the structure: a buyer takes over your payments, your loan stays in place, and they pay it every month. We transfer the deed, set up third-party servicing, and catch up any arrears at closing. You get debt relief, skip repairs, and can often get full price.

Why does this work? Because a buyer inheriting your {{Rate}}% rate can afford to pay you MORE for the house, since their monthly cost stays sane. It's how we do 10-12 deals a month.

Yes, real risks exist — the due-on-sale clause, payment discipline — but we close through a title company, offer independent counsel, and I'll walk you through every document. Twenty minutes, everything on the table?`},
{t:"invest",ch:"call",adv:"David Greene",title:"Invest — The Keep-vs-Sell Portfolio Call",body:
`YOU: {{Owner}}, {{Agent}}. Before you sell {{Address}}, let's run the real numbers on this. You might be holding a true keeper, and I'm happy to argue against my own commission if it means you make a smarter move.

Your place is worth around {{Value}}, with {{Debt}} owed. A cash-out refinance at 75% LTV could pull out roughly {{CashOut}} — tax-free. Compare that to selling, where the IRS takes its bite of your gain. This is how you keep your capital working.

At {{Rent}}, the tenant covers the new payment, allowing you to redeploy that equity into the next acquisition. Don't sell the golden goose; borrow the eggs. That's how portfolios compound.

Now, selling is still the right play if you're done being a landlord, the property's a management headache, or that equity has a better home. So, which path aligns with your vision: building your portfolio, or simplifying things? Both have a right answer, and I work both sides of it.`},
{t:"invest",ch:"vm",adv:"Tarek El Moussa",title:"Invest VM — The Contractor Reality",body:
`{{Owner}}, {{Agent}} here about {{Address}}. You're planning a {{Reno}} first. Look, after nearly a thousand flips, I know that {{Reno}} at {{Cost}} risks over-improving past what the comps support. That's donated money, plain and simple. Before you write any checks, let's talk for ten minutes. I'll show you where your rehab dollars actually return value for this neighborhood, and what to skip entirely. No cost, could save you {{Savings}}: {{Phone}}.`},
{t:"invest",ch:"vm",adv:"Pace Morby",title:"Invest VM — The Full-Price Terms Offer",body:
`{{Owner}}, {{Agent}} here about {{Street}}. Cash buyers keep lowballing your {{Price}}, right? What if the problem isn't the number, but the actual structure of the offer? If you're free and clear, I can often pay full asking price through terms — you become the bank, taking payments over time. It's how I buy. Ten minutes, I can show you how the paperwork works, no pressure: {{Phone}}.`},
{t:"invest",ch:"vm",adv:"David Greene",title:"Invest VM — The Out-of-Area Investor",body:
`YOU: (voicemail)
{{Name}}, {{Agent}} in {{City}}. As a long-distance investor, you know making money happens when you buy. {{Neighborhood}} just {{Change}} — a shift that impacts your buy-box for distressed properties. I help investors like you identify properties at 75% ARV or less, with the right Core Four team local for rehab and management. If {{City}} is in your target, let's connect: {{Phone}}. Systems make distance irrelevant.`},
{t:"invest",ch:"text",adv:"Tarek El Moussa",title:"Invest Text — The Two-Numbers Text",body:
`{{Owner}} — {{Agent}}. Two real numbers for {{Address}}, both free: (1) quick cash, zero repairs, close in 2 weeks. (2) the ARV after rehab, minus *all* costs. Most owners guess wrong on what nets more. Want both by Friday?`},
{t:"invest",ch:"text",adv:"Jerry Norton",title:"Invest Text — The Proof-of-Funds Text",body:
`Hi {{Owner}}, {{Agent}} here re: {{Street}}. Fair warning about cash buyers: half the "offers" out there are wholesalers with no money hoping to flip the contract. Any offer I bring comes with proof of funds attached, or it doesn't come. Want a real one this week?`},
{t:"invest",ch:"text",adv:"David Greene",title:"Invest Text — The Rental Analysis",body:
`{{Owner}} — {{Agent}}. Before selling {{Address}}, let's run the real numbers. Your ~{{Rent}} could cash-flow well after all expenses, making a hold more profitable than a sale. I'll show you the full sell-vs-rent math, free. Most owners choose differently after seeing it. Want that analysis?`},
{t:"invest",ch:"email",adv:"Tarek El Moussa",title:"Invest Email — The Renovation ROI Letter",body:
`Subject: {{Address}}: Where your rehab dollars actually go

{{Owner}},

Look, everyone says "fix it up." But after close to 1,000 flips, I've got the numbers. You need to know what actually puts money back in your pocket and what's just donated cash.

**PROFIT-DRIVERS (2-4X return):** Fresh paint (whole interior), curb appeal (first impression), updated lighting, deep clean + staging. These move the needle.

**BREAK-EVEN (mostly):** Flooring, kitchen refresh (counters, hardware – not a full gut), bathroom vanities. You get some value back, but not much margin.

**MONEY PITS (donated cash):** Full kitchen remodels, room additions, high-end finishes that blow past neighborhood comps, or major structural work you could just disclose and credit. Don't over-improve.

For {{Address}} specifically: I'd focus on {{ShortList}} – about {{Cost}} for roughly {{Return}} in added price. That's the smart play.

Or, skip it all and take the as-is number: {{AsIs}}. Sometimes the best renovation is no renovation. Let's evaluate your situation honestly: {{Phone}}.

{{Agent}} · {{Brokerage}}`},
{t:"invest",ch:"email",adv:"Pace Morby",title:"Invest Email — The Creative Toolbox",body:
`Subject: 5 ways to sell {{Address}} (and 4 of them actually solve problems)

{{Owner}},

Most buyers only have one tool in their belt: cash. That's fine if your only problem is needing money fast. But if you have a real problem, you need creative solutions.

Here's how we get deals done, even when cash buyers walk away:

1. RETAIL LISTING — Top dollar, but you do the repairs, the showings, and wait 60-90 days.
2. AS-IS CASH — Quick and certain, but you pay a big discount for that certainty.
3. SELLER FINANCE — You become the bank. You get full price, monthly income, and big tax savings. This is the play if you don't need all the money at once.
4. SUBJECT-TO — We take over your current mortgage payments. Best if your rate is low and you need debt relief or speed. We close through a title company, so everyone's protected.
5. HYBRID — We take over your loan AND you carry a small note for your equity. Some cash now, income later.

Which structure works for you depends on what problem you're trying to solve. Tell me your situation and I'll show you exactly how these work with real contracts. No pressure, no cost.

{{Agent}} · {{Phone}}`},
{t:"invest",ch:"email",adv:"Jerry Norton",title:"Invest Email — The Wholesaler Defense",body:
`Subject: Before you sign ANY cash offer on {{Address}}

{{Owner}},

You're getting cash offers — some real, some from people planning to sell your contract to the actual buyer for a fee. Nothing illegal about it, but you deserve to know who you're dealing with. Five questions that expose the difference:

1. "Show me proof of funds dated this month." (Real buyers carry it.)
2. "Is your earnest deposit non-refundable, and how much?" (Flippers of paper risk nothing.)
3. "Will you close in YOUR name?" ("Or assignee" in the contract = wholesaler.)
4. "What's your inspection period?" (14+ days = they're shopping your contract.)
5. "Can I call the title company you use?" (Real buyers have one on speed dial.)

Ask all five of everyone — including me. I'll answer them in my first email and attach the proof. That's how it should work.

{{Agent}} · {{Brokerage}} · {{Phone}}`},

/* -- ESPANOL: +3 each -- */
{t:"espanol",ch:"call",adv:"Veronica Figueroa",title:"Llamada — Vendedor Primera Vez (ES)",body:
`YOU: Buenas tardes {{Owner}}, le habla Veronica Figueroa de The Fig Team. (Pause) Sé que su tiempo es valioso, ¿me regala un minuto? Esto es importante.

Muchas familias aquí en {{Neighborhood}} compraron hace años y no se han dado cuenta de la fuerza que ha tomado su propiedad. Ese capital, esa plusvalía, es SUYA. Es el verdadero motor de crecimiento para su familia.

No le llamo para presionarla a vender. Le llamo para darle claridad, para que sepa exactamente dónde está parada. Esa información abre caminos: comprar algo más grande, ayudar a los suyos, o simplemente dormir tranquila sabiendo su verdadero número.

Le preparo el análisis sin complicaciones, directo al grano. ¿Le pido permiso para enviárselo esta semana? Y si prefiere que hablemos con toda la familia presente, mejor todavía — así se toman las decisiones grandes.`},
{t:"espanol",ch:"call",adv:"Carlos Reyes",title:"Llamada — Casa Heredada (ES)",body:
`YOU: {{Name}}? Soy {{Agent}}, aquí en {{City}}. Primero, mi más sentido pésame por {{Deceased Name}}. Sé que esta llamada llega en un momento difícil, así que voy directo y con respeto:

Cuando una familia hereda una casa, siempre aparecen tres opciones claras: quedarse con ella, rentarla, o venderla. Y la realidad es que casi siempre el problema son los papeles — sucesión, testamento, título. Esas cosas que, si no se manejan con un sistema, pueden tomar meses y costar dinero.

Mi equipo y yo ayudamos a familias con TODO eso, en español, paso a paso. Les damos claridad sobre los números de cada opción, los conectamos con abogados expertos (conozco buenos que hablan español), y si deciden vender, nos encargamos de todo el proceso. Queremos que tomen la mejor decisión para su patrimonio familiar.

Sin prisa y sin compromiso. ¿Qué es lo que más les pesa ahorita — los papeles, o qué hacer con la propiedad?`},
{t:"espanol",ch:"call",adv:"Rene Rodriguez",title:"Llamada — El Que Espera (ES/EN)",body:
`YOU: {{Owner}}, habla {{Agent}}. Le llamo porque la última vez me dijo algo que escucho mucho: "estamos esperando a ver qué pasa con el mercado."

Lo entiendo perfectamente. Pero déjeme contarle lo que le pasó a una familia igualita: esperaron dos años "a ver qué pasaba." En esos dos años, la casa que querían comprar subió {{Amount}} — más de lo que "ahorraron" esperando.

Esperar también es una decisión, y también tiene precio. La diferencia es que nadie se lo enseña por escrito.

Eso es lo que ofrezco: los números de moverse HOY versus esperar un año — lado a lado, en una página, gratis. Si los números dicen "espérese," se lo digo con gusto. Pero que la decisión sea con números, no con miedo. ¿Se los preparo?`},
{t:"espanol",ch:"vm",adv:"Loida Velasquez",title:"Buzón — Vecina de Confianza (ES)",body:
`Hola {{Owner}}, le habla {{Agent}}, su agente local aquí en {{Neighborhood}}. Le dejo este mensaje porque acabamos de vender una propiedad en su calle y los valores han subido. Muchos vecinos me preguntan: "¿cuánto vale mi casa?" Mi meta es ayudarle. Esa respuesta es siempre gratis conmigo, sin compromiso. En español o inglés, como guste. Cuando quiera saberlo: {{Phone}}. Que Dios la bendiga y buen día.`},
{t:"espanol",ch:"vm",adv:"Veronica Figueroa",title:"Buzón — Programas de Compra (ES)",body:
`Hola {{Name}}, le habla {{Agent}} de {{Brokerage}}. Sé que preguntó sobre comprar casa, y quiero que sepa algo: aquí en {{County}}, nuestro equipo domina los programas de ayuda con enganches bajos, asistencia para el pago inicial, y sí, ¡caminos claros para compradores con ITIN! Es una ventaja que pocos conocen. Hemos ayudado a cientos de familias como la suya a lograrlo. La consulta es gratis, en español, y sin compromiso: {{Phone}}. Su casa propia está más cerca de lo que cree.`},
{t:"espanol",ch:"vm",adv:"Carlos Reyes",title:"Buzón — Compra Directa (ES)",body:
`Hola {{Owner}}, aquí {{Agent}}. Mi equipo y yo compramos propiedades en {{City}}. Mensaje corto: si un día piensa vender su casa en {{Street}} TAL COMO ESTÁ — sin arreglar nada, sin enseñarla a extraños, sin esperar meses — yo le doy un número real, por escrito. Cerramos cuando usted diga. Sin trucos y sin presión: si el número no le sirve, quedamos como amigos. {{Phone}}. Buen día.`},
{t:"espanol",ch:"text",adv:"Loida Velasquez",title:"Texto — El Valor de Su Casa (ES)",body:
`Hola {{Owner}}, soy {{Agent}}, su agente local en {{Neighborhood}}. 🏡 Se vendió una casa cerca y el valor de su propiedad ha cambiado. ¿Le gustaría saberlo? Es gratis, sin compromiso. Lo puedo enviar en español o inglés.`},
{t:"espanol",ch:"text",adv:"Veronica Figueroa",title:"Texto — Primera Casa (ES)",body:
`Hola {{Name}}, soy {{Agent}} de {{Brokerage}}. Mi equipo se especializa en programas de asistencia para comprar casa, incluso con ITIN o para extranjeros. Hay opciones que hacen la compra posible aquí en {{County}}. ¿Le mando un mensaje con más detalles o hablamos 10 minutos?`},
{t:"espanol",ch:"text",adv:"Rene Rodriguez",title:"Texto — La Pregunta Correcta (ES)",body:
`{{Owner}}, soy {{Agent}}. Una pregunta nada más: si supiera EXACTAMENTE cuánto vale su casa hoy y cuánto le quedaría limpio si vendiera — ¿cambiaría algún plan de este año? Si la respuesta es "tal vez," le preparo los números gratis. Un texto y listo.`},
{t:"espanol",ch:"email",adv:"Loida Velasquez",title:"Email — Reporte del Barrio (ES/EN)",body:
`Subject: Su casa: Lo que se vendió y lo que significa / Your home: What sold & what it means

Estimada familia {{Owner}},

Mi nombre es Loida y soy una agente local. Les envío esto porque su casa es una de sus mayores inversiones, y merecen saber lo que pasa en {{Neighborhood}}.

Este mes, la propiedad en {{Address}} se vendió por {{Price}}. Esto significa que el valor estimado de su casa subió a {{Value}}. Los compradores siguen muy activos y buscan casas como la suya.

(English summary: A home on your street sold for {{Price}}, moving your estimated value to {{Value}}. Buyers are still very active for homes like yours.)

Si quieren saber el valor exacto de SU casa, y si les gustaría venderla rápido y por buen precio, respondan este correo o mándenme un texto a {{Phone}}. Quiero ayudarles a entender su situación.

Con cariño y respeto,
{{Agent}} · {{Brokerage}}`},
{t:"espanol",ch:"email",adv:"Carlos Reyes",title:"Email — Vender Sin Arreglar (ES)",body:
`Subject: Su casa, sin arreglos, sin dolores de cabeza

Estimado {{Owner}},

Sé que muchos dueños no venden porque piensan: "primero tengo que gastar miles en arreglos, pintura, la cocina... dinero que no tengo." Créame, entiendo esa situación. Pero hay otra forma, una que usamos para cerrar cientos de propiedades:

VENTA DIRECTA, CERO ARREGLOS:
- No gaste un centavo en reparaciones — compramos su casa como esté.
- No limpie nada — llévese lo que quiera, nosotros nos encargamos del resto.
- Usted elige el día de cierre — podemos cerrar en 2 semanas o 3 meses.
- Le damos un número real, por escrito, con fondos comprobados. No promesas.

¿Es un poco menos que si la arregla usted? Sí. Pero cuando ve el costo de esos arreglos, los meses de espera y el estrés, el número neto muchas veces es mejor. Aquí somos de números claros.

Le doy ambas opciones — arreglada y tal-como-está — sin compromiso, para que tenga la información y decida lo mejor para usted y su patrimonio.

{{Agent}} · {{Brokerage}} · {{Phone}}`},
{t:"espanol",ch:"email",adv:"Rene Rodriguez",title:"Email — La Carta de las Dos Familias (ES)",body:
`Subject: Dos familias, la misma decisión, dos resultados

Estimada familia {{Owner}},

Les cuento una historia real (con nombres cambiados):

La familia García y la familia Mendoza vivían en la misma cuadra. Las dos pensaban vender "algún día." Las dos tenían miedo de equivocarse.

La diferencia: los García pidieron sus números — valor real, ganancia neta, opciones de compra — aunque no estaban seguros de vender. Los Mendoza dijeron "mejor esperamos, para qué molestar."

Dos años después: los García usaron su plusvalía para comprar en {{Area}} cuando los precios lo permitían. Los Mendoza siguen "esperando el momento" — que ya pasó dos veces.

La moraleja no es "vendan." Es: LOS NÚMEROS PRIMERO, la decisión después. Los números son gratis; la decisión es suya y de nadie más.

¿Les preparo los suyos? Un correo o una llamada: {{Phone}}. En español, con calma, y con toda la familia si así lo prefieren.

{{Agent}} · {{Brokerage}}`}
);

/* ===== EXPANSION E: top-ups ===== */
SCRIPTS.push(
{t:"social",ch:"vm",adv:"Chelsea Peitz",title:"Social VM — The Voice Behind the Content",body:
`{{Name}}! It's {{Agent}} — yes, the one from your feed, with an actual human voice! You sent that DM about {{Their Question}} and some things just need more than typing. Short version: {{One-Line Answer}}. But the *lived experience* and the full story behind that didn't make it into the post. That's the context, right? The money is in these DMs, and I believe real conversations deserve voices. Call or text back whenever: {{Phone}}. And thanks for being part of my corner of the internet — it means more than the algorithm knows.`},
{t:"luxury",ch:"call",adv:"Joanna Gaines",title:"Luxury — The Story-of-the-Home Call",body:
`YOU: {{Owner}}, this is {{Agent}} — I'm calling about {{Address}}, and I hope you'll find my approach a little different.

Before I ever help a family find the next chapter for a home, I ask for its story. Not the dimensions, but the heart. The space where every holiday happened. The quiet nook that catches the morning light. What you nurtured, what you brought back to life, what you'd never change.

This matters so much: buyers at this level aren't just comparing floor plans — they're imagining a life. The home whose personal journey is felt deeply — in the images, the styling, the way it's presented — that's the one they truly fall for. And people pay full price for a home they've fallen for.

So: if you ever decide to pass this home to its next family, give me one walk-through and one hour of stories. We'll find its perfect match from there. Would sometime this month work, even just for the conversation?`},
{t:"luxury",ch:"vm",adv:"Cheryl Eisen",title:"Luxury VM — The Five-Second Test",body:
`{{Owner}}, {{Agent}} here. In luxury, buyers fall in love in the first five seconds — that initial emotional connection, the story they see. {{Address}} has incredible bones, but vacant luxury reads cold and small. Before a single photo, those first moments need magazine-worthy design. Our projects sell faster and for more money because we stage to the target buyer's aspirational life. I can show you exactly how to create those 'moments' for your property. My walk-through is complimentary: {{Phone}}.`},
{t:"luxury",ch:"text",adv:"Sharran Srivatsaa",title:"Luxury Text — The Annual Private Valuation",body:
`{{Owner}} — {{Agent}}, {{Brokerage}}. I prepare an annual private valuation for owners in {{Enclave}}. It includes market shifts, any off-market interest, and a clear, real number. No obligation, just data. Yours is ready. May I send it?`}
);

/* ============ ADVISOR ROSTER (voice selector) ============ */
const ADVISORS = [
 {id:"serhant",b:"luxury sales & personal branding",n:"Ryan Serhant",g:"Sales & Prospecting"},
 {id:"harris",b:"listing appointments & proven scripts",n:"Tim & Julie Harris",g:"Sales & Prospecting"},
 {id:"mulrenin",b:"FSBO, expireds & consultative selling",n:"Brandon Mulrenin",g:"Sales & Prospecting"},
 {id:"carruthers",b:"zero-pressure calls & long-game follow-up",n:"Ricky Carruth",g:"Sales & Prospecting"},
 {id:"ferry",b:"coaching systems & business planning",n:"Tom Ferry",g:"Coaching & Business"},
 {id:"buffini",b:"referrals & relationship selling",n:"Brian Buffini",g:"Coaching & Business"},
 {id:"keller",b:"MREA systems & team building",n:"Gary Keller",g:"Coaching & Business"},
 {id:"sharran",b:"luxury strategy & wealth thinking",n:"Sharran Srivatsaa",g:"Coaching & Business"},
 {id:"glennda",b:"storytelling & social media",n:"Glennda Baker",g:"Marketing & Media"},
 {id:"lazine",b:"market data & sharp industry takes",n:"Byron Lazine",g:"Marketing & Media"},
 {id:"burgess",b:"value-first lead gen & listing attraction",n:"Jimmy Burgess",g:"Marketing & Media"},
 {id:"pantana",b:"marketing tech & video hooks",n:"Jason Pantana",g:"Marketing & Media"},
 {id:"peitz",b:"human-first social & DM conversion",n:"Chelsea Peitz",g:"Marketing & Media"},
 {id:"voss",b:"FBI-style negotiation psychology",n:"Chris Voss",g:"Negotiation"},
 {id:"gaines",b:"warm lifestyle design & the home's story",n:"Joanna Gaines",g:"Design & Staging"},
 {id:"mcgee",b:"design rules & pre-list transformations",n:"Shea McGee",g:"Design & Staging"},
 {id:"eisen",b:"luxury staging that sells the identity",n:"Cheryl Eisen",g:"Design & Staging"},
 {id:"knakal",b:"investment sales & 1031 strategy",n:"Bob Knakal",g:"Commercial"},
 {id:"cauble",b:"small commercial & leasing",n:"Tyler Cauble",g:"Commercial"},
 {id:"mcelroy",b:"multifamily NOI & operations",n:"Ken McElroy",g:"Commercial"},
 {id:"tarek",b:"flip ROI & renovation math",n:"Tarek El Moussa",g:"Flipping & Investing"},
 {id:"norton",b:"wholesaling & the 65% formula",n:"Jerry Norton",g:"Flipping & Investing"},
 {id:"morby",b:"creative finance & subject-to",n:"Pace Morby",g:"Flipping & Investing"},
 {id:"greene",b:"BRRRR & long-distance investing",n:"David Greene",g:"Flipping & Investing"},
 {id:"corbett",b:"family-first probate systems",n:"Chad Corbett",g:"Probate, Divorce & Distressed"},
 {id:"nicoletti",b:"probate legal strategy",n:"Al Nicoletti",g:"Probate, Divorce & Distressed"},
 {id:"gross",b:"California probate court process",n:"Bill Gross",g:"Probate, Divorce & Distressed"},
 {id:"starks",b:"divorce sales as a strict neutral",n:"Laurel Starks",g:"Probate, Divorce & Distressed"},
 {id:"espinosa",b:"short sales, NOD & pre-foreclosure",n:"Nicole Espinosa",g:"Probate, Divorce & Distressed"},
 {id:"ted",b:"tax liens & tax-defaulted property",n:"Ted Thomas",g:"Probate, Divorce & Distressed"},
 {id:"loida",b:"bilingual prospecting (EN/ES)",n:"Loida Velasquez",g:"Español & Bilingual"},
 {id:"figueroa",b:"Latino homebuyers & team leadership",n:"Veronica Figueroa",g:"Español & Bilingual"},
 {id:"creyes",b:"investing & wholesaling en español",n:"Carlos Reyes",g:"Español & Bilingual"},
 {id:"rene",b:"sales psychology & influence",n:"Rene Rodriguez",g:"Español & Bilingual"},
 {id:"buckelew",b:"last-time sellers & aging in place",n:"Nikki Buckelew",g:"Senior & 55+ Transitions"},
 {id:"nemovitz",b:"downsizing, as-is sales & the family home",n:"Bruce Nemovitz",g:"Senior & 55+ Transitions"},
 {id:"spade",b:"aging parents & the adult child",n:"Chris Spade",g:"Senior & 55+ Transitions"},
 {id:"nucci",b:"cold calling into listing appointments",n:"Anthony Nucci",g:"Sales & Prospecting"},
];
