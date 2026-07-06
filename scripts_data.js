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
];

/* ============ SCRIPT LIBRARY ============ */
/* ch: call | vm | text | email */
const SCRIPTS = [

/* ---------- EXPIRED ---------- */
{t:"expired",ch:"call",adv:"Brandon Mulrenin",title:"The Diagnosis Call",body:
`YOU: Hi, is this {{Owner}}? ... Hey {{Owner}}, my name's {{Agent}} — I'm a local agent here in {{Neighborhood}}. I noticed your home came off the market without selling... and I'm sure I'm probably the tenth agent to call, so I'll be brief.

Would you be opposed to me asking you one question about the listing?

(wait — let them grant permission)

When you look back at the whole process... what do YOU think stopped it from selling?

(listen — do not interrupt. Label what you hear:)
"It sounds like the marketing never really showed the house at its best."
"Seems like the price got set before anyone looked at the real comps."

Last question and I'll let you go: if you could sell it without going through what you just went through... would that even be worth a 15-minute conversation?`},
{t:"expired",ch:"call",adv:"Tim & Julie Harris",title:"The Re-List Appointment Setter",body:
`YOU: Hi {{Owner}}, this is {{Agent}} with {{Brokerage}}. Your home at {{Address}} showed up as off the market this morning — did you end up selling it, or did it just expire?

(if expired:)
I'm sorry — that's frustrating, especially after keeping it show-ready for months. Here's why I'm calling: the buyers who looked and didn't offer weren't rejecting your home, they were rejecting how it was positioned. Positioning is fixable.

I have a 12-point plan I use specifically for homes that didn't sell the first time — it covers pricing strategy, presentation, and where the marketing actually goes. There's no obligation and I won't ask you to sign anything on the spot.

When would be the best time for me to walk you through it — today at 4, or tomorrow morning?`},
{t:"expired",ch:"vm",adv:"Tom Ferry",title:"Expired Voicemail — The Stat Hook",body:
`Hi {{Owner}}, this is {{Agent}} with {{Brokerage}}. I saw your home came off the market — you should know the average home that re-lists with a new strategy sells within the first 30 days, and usually closer to asking than the first attempt. I put together a short analysis of what I'd do differently at {{Address}}. No pressure — I'll email it either way. If you want the 10-minute version by phone, call me at {{Phone}}. Again, {{Agent}}, {{Phone}}.`},
{t:"expired",ch:"text",adv:"Jimmy Burgess",title:"Expired Value-First Text",body:
`Hi {{Owner}}, {{Agent}} here — local agent in {{Neighborhood}}. Your home came off the market and I actually put together a fresh market snapshot for your street before calling anyone. Want me to send it over? No strings — it's yours either way.`},
{t:"expired",ch:"email",adv:"Tim & Julie Harris",title:"Expired Follow-Up Email",body:
`Subject: What I'd do differently at {{Address}}

{{Owner}},

Your home didn't sell — but it's not because buyers don't want it. In almost every expired listing I review, one of three things was off: the price story, the presentation, or where the marketing actually ran.

I put together a one-page plan showing exactly which of the three worked against {{Address}}, and what I'd change in the first 14 days of a re-list.

May I drop it off, or would you rather I email it? Either way it's yours — no listing agreement required to see it.

{{Agent}} · {{Brokerage}} · {{Phone}}`},

/* ---------- FSBO ---------- */
{t:"fsbo",ch:"call",adv:"Brandon Mulrenin",title:"FSBO Backup-Plan Call",body:
`YOU: Hi, I'm calling about the home for sale — is this the owner? ... Great. {{Owner}}, my name's {{Agent}}, I'm a local agent — and before you hang up, I'm NOT calling to ask for the listing.

Would it be ridiculous if I asked you just two questions?

One: if you sell it yourself and it goes perfectly — where are you moving to? (listen; people talk about the dream, not the house)

Two: most owners I talk to sell on their own to protect their equity — is that fair for you too? (yes) Totally get it. So here's my only ask: if at some point the calls slow down and the showings turn into strangers wandering through... would you be opposed to having a backup plan already in place? No cost to have one.

I'll check in in two weeks. If it's sold by then, I'll be the first to congratulate you.`},
{t:"fsbo",ch:"vm",adv:"Tim & Julie Harris",title:"FSBO Voicemail — The Ally",body:
`Hi, this is {{Agent}} with {{Brokerage}} — I saw your home for sale on {{Address}}. I'm not calling to talk you out of selling it yourself. I work with buyers in {{Neighborhood}} every week, and if one of them fits your home I'd love to bring them — you'd only pay the buyer's side. Call me back at {{Phone}} and I'll tell you exactly what they're pre-approved for. {{Agent}}, {{Phone}}.`},
{t:"fsbo",ch:"text",adv:"Ricky Carruth",title:"FSBO Zero-Pressure Text",body:
`Hey {{Owner}}, this is {{Agent}}, local agent in {{Neighborhood}}. Saw the house is for sale by owner — good for you honestly. No pitch here: if you ever want a free second opinion on pricing or an offer review, I'm around. How's the traffic been so far?`},
{t:"fsbo",ch:"email",adv:"Jimmy Burgess",title:"FSBO Toolkit Email",body:
`Subject: Free FSBO toolkit for {{Address}} (no catch)

Hi {{Owner}},

Selling on your own is completely doable — most owners just get stuck on the same three things: pricing to the newest comps, qualifying buyers before they walk in, and the disclosure paperwork.

I put together a FSBO toolkit that covers all three: a live comp report for {{Neighborhood}}, a buyer pre-qualification checklist, and the state disclosure list. It's free. I send it because some owners eventually want help, and I'd rather be the agent who was useful than the one who pestered you.

Want me to send it over?

{{Agent}} · {{Brokerage}} · {{Phone}}`},

/* ---------- CIRCLE ---------- */
{t:"circle",ch:"call",adv:"Ricky Carruth",title:"Just Sold Circle Call",body:
`YOU: Hey, is this {{Owner}}? This is {{Agent}} with {{Brokerage}} — I'm a local agent, and no, you're not in trouble! (smile — they can hear it)

I just sold a home around the corner from you on {{Street}}, and every time that happens the neighbors' home values move. I'm calling everyone on the block to share the number — do you want to know what it went for?

(tell them — be generous, no gatekeeping)

That's the market talking. Quick question and I'll let you go: do you have any plans to make a move in the next year or two, or are you staying put?

(staying:) Love it. I'll keep you posted when the numbers change on your street — you'll always know what your home is worth on my watch.`},
{t:"circle",ch:"vm",adv:"Tom Ferry",title:"Just Listed Voicemail",body:
`Hi {{Owner}}, {{Agent}} with {{Brokerage}}. We just listed a home near you at {{Address}}, and showings start this weekend. Two reasons for the call: one, if you know anyone who's been waiting to get into {{Neighborhood}}, this is their shot. Two, the listing sets a fresh comp for your own value — I'm happy to tell you what it means for your home, free, no strings. {{Phone}}. Talk soon.`},
{t:"circle",ch:"text",adv:"Glennda Baker",title:"Neighborhood Story Text",body:
`{{Owner}}, quick story: the house on {{Street}} got 6 offers in 5 days. The one that won wasn't the highest — it was the cleanest. That's what's happening in {{Neighborhood}} right now. If you ever wonder what YOUR house would do in this market, I'll tell you the real number — not the Zillow one. — {{Agent}}`},
{t:"circle",ch:"email",adv:"Gary Keller",title:"Neighborhood Market Update Email",body:
`Subject: {{Neighborhood}}: what sold, for what, and why it matters

Hi {{Owner}},

Once a month I send neighbors a two-minute read on the {{Neighborhood}} market — the homes that sold, what they went for, and what it means for your equity. No fluff, just the numbers I'd want if I lived on your street.

This month's highlight: {{Street}} closed above list after one weekend — inventory is thin enough that prepared sellers are naming their terms.

If you'd like a private annual equity review (most homeowners have no idea how much theirs has grown), just reply "equity" and I'll put one together — takes me an hour, costs you nothing.

{{Agent}} · {{Brokerage}}`},

/* ---------- SOI ---------- */
{t:"soi",ch:"call",adv:"Brian Buffini",title:"The Relationship Call",body:
`YOU: {{Name}}! It's {{Agent}} — how ARE you? (genuine catch-up first — kids, work, the thing you know about their life. This is 80% of the call. Mean it.)

(then, naturally:)
Hey, while I've got you — the market's been doing some interesting things in {{Neighborhood}} and a couple of your neighbors have asked me what their homes are worth. If YOU ever want that number, you know it's a phone call, right?

And listen — you know how I build my business: I work by referral. So if a friend, a coworker, anyone mentions moving... I'm never too busy for the people you care about. You have my word they'll be looked after.

(close with THEM:) Great catching up. Give my best to {{Family Member}}.`},
{t:"soi",ch:"vm",adv:"Gary Keller",title:"Annual Equity Review Voicemail",body:
`Hi {{Name}}, it's {{Agent}}. Every year I do a quick equity review for the people in my circle — what your home's worth now, what you owe, and what that gap could do for you. Most people are sitting on more than they think. Takes me an hour to build, takes you five minutes to read. Want yours? Call or text me at {{Phone}} and I'll have it to you this week.`},
{t:"soi",ch:"text",adv:"Sharran Srivatsaa",title:"The Value Ping",body:
`{{Name}} — saw something today that made me think of you: homes like yours in {{Neighborhood}} are quietly up again this quarter. No action needed, just keeping your biggest asset on your radar. Coffee soon? — {{Agent}}`},
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
`Hey, this is {{Agent}} — you called on my sign at {{Address}} earlier. Sorry I missed you! Quick answers: it's {{Price}}, {{Beds}} bed {{Baths}} bath, and yes, it's still available. I'm around all evening if you want the full story — or if that one's not the fit, tell me what you're looking for and I'll send you the two or three in {{Neighborhood}} that actually match. {{Phone}}. Talk soon.`},
{t:"openhouse",ch:"text",adv:"Jason Pantana",title:"Post-Open-House Text",body:
`Hi {{Name}} — {{Agent}} from today's open house at {{Address}}. Just sent you the full photo tour + disclosures link. One thing I didn't mention: the sellers review offers Tuesday. Want me to flag your interest so you're in the loop either way?`},
{t:"openhouse",ch:"email",adv:"Glennda Baker",title:"Open House Recap Email",body:
`Subject: The story behind {{Address}} (since you asked)

Hi {{Name}},

Great meeting you today. You asked why the sellers are moving — here's the story I can share: they bought this house eleven years ago, raised two kids in it, and just accepted a job out of state. They love this house. They're not running from it — they're being pulled away.

Why does that matter to you? Because sellers who love their home price it fairly and keep it beautifully. That's exactly what the inspection reports show.

The photo tour and disclosures are attached. If you want to see it again quietly — no open-house crowd — I can make that happen this week.

{{Agent}} · {{Brokerage}} · {{Phone}}`},

/* ---------- ONLINE LEADS ---------- */
{t:"online",ch:"call",adv:"Sharran Srivatsaa",title:"Speed-to-Lead First Call",body:
`(call within 5 minutes of the inquiry — the odds of connecting drop 10x after that)

YOU: Hi {{Name}}, this is {{Agent}} — you were just looking at {{Address}} online, so I wanted to reach out while it's fresh on your screen. Do you have 90 seconds?

Three quick questions so I only send you things worth your time:
One — is {{Address}} the exact kind of home, or just in the ballpark?
Two — when would moving actually make sense for you: months or years?
Three — has anyone gotten you a real pre-approval number yet, or is that still on the list?

(then deliver ONE piece of value:) Based on that, here's what I'll do: I'll send you the three best matches in {{Neighborhood}} tonight — including one that isn't on the portals yet. If I'm useful, keep me. If I'm not, fire me. Fair?`},
{t:"online",ch:"vm",adv:"Tom Ferry",title:"Online Lead Voicemail #1",body:
`Hi {{Name}}, it's {{Agent}} with {{Brokerage}} — you inquired about {{Address}} a few minutes ago. I have the answers to the three things everyone asks about that one: the real status, the seller's timeline, and what it'll actually take to win it. Call or text me at {{Phone}} — and either way I'm sending you two similar homes tonight that most buyers haven't seen yet.`},
{t:"online",ch:"text",adv:"Chelsea Peitz",title:"The Human First Text",body:
`Hi {{Name}}, it's {{Agent}} 👋 — a real human, not a drip campaign, promise. You looked at {{Address}} — want the honest scoop on it? (There's one thing about it the photos don't show.) Happy to text it over, no phone call required.`},
{t:"online",ch:"email",adv:"Byron Lazine",title:"The Market-Reality Email",body:
`Subject: {{Address}} — what the data actually says

{{Name}},

You looked at {{Address}}, so here's the context most portals won't give you.

Homes in {{Neighborhood}} are averaging {{DOM}} days on market right now, and the gap between list price and sold price tells you exactly how much negotiating room exists. That gap is the single most useful number in your search — and it changes monthly.

I send a two-minute data brief to my buyers every week: what listed, what sold, what cut, and what it means for your offer strategy. Want in? Just reply "brief."

No spam, no fifteen-email drip. Just the numbers.

{{Agent}} · {{Brokerage}}`},

/* ---------- SOCIAL ---------- */
{t:"social",ch:"text",adv:"Glennda Baker",title:"DM Reply — Story Hook",body:
`(when someone comments or DMs on a listing video)

Hey {{Name}}! You found the house with the story 👀 — what I didn't put in the video: the sellers already found their next place, which means they're motivated on timeline, not just price. Are you asking for you, or scouting for someone?`},
{t:"social",ch:"text",adv:"Chelsea Peitz",title:"DM Conversation Starter",body:
`(replying to a story reaction / new follower who engages)

Hey {{Name}}, thanks for the follow! I post the real side of {{Neighborhood}} real estate — the wins AND the weird stuff. Quick question so I post things you actually care about: are you more curious about home values, or thinking about a move at some point? (No pitch — I genuinely tailor content to who's here.)`},
{t:"social",ch:"email",adv:"Jason Pantana",title:"Video-to-Inbox Email",body:
`Subject: The 90-second video everyone's asking about

Hi {{Name}},

You watched my breakdown of the {{Neighborhood}} market on Instagram — this is the follow-up with the actual numbers on screen.

Attached: the full chart of what's sold in the last 60 days, which price band is moving fastest, and the one stat that surprised everyone (hint: it's the price-cut percentage).

If you want this monthly — real data, 90 seconds, zero jargon — reply "subscribe" and you're in.

{{Agent}} · {{Brokerage}}`},
{t:"social",ch:"call",adv:"Byron Lazine",title:"The Content-to-Call Bridge",body:
`(calling a lead who's engaged with your content for weeks)

YOU: {{Name}}? It's {{Agent}} — the one whose market videos you keep watching instead of doing whatever you're supposed to be doing. (laugh — earn the pattern interrupt)

I'm calling because you commented on the video about {{Topic}}, and honestly the comment section wasn't the place for the full answer.

Here's the real version: (give the actual insight, with numbers — one full minute of pure value, nothing asked)

That's it — that's the call. But since I've got you: is any of this research for a real move, or are you a market nerd like me? Either answer's a good answer.`},

/* ---------- LUXURY ---------- */
{t:"luxury",ch:"call",adv:"Ryan Serhant",title:"Luxury Listing Pitch Call",body:
`YOU: {{Owner}}, {{Agent}}. I'll be direct because your time is expensive: I want to sell {{Address}}, and I want to tell you the one thing most agents won't.

Your home isn't going to sell because of its square footage. Nobody buys 6,000 feet — they buy the morning they wake up to that view, the dinner party in that kitchen, the life your home lets them tell people they have. That's what I sell.

Here's what that looks like in practice: cinematic film, not photos. A launch, not a listing. The right eyeballs in {{City}} AND out of state — because your buyer probably doesn't live here yet.

I'd like 45 minutes to show you the full playbook, including exactly what I'd spend on your launch and where. When works — Thursday, or the weekend?`},
{t:"luxury",ch:"vm",adv:"Sharran Srivatsaa",title:"Luxury Seller Voicemail",body:
`{{Owner}}, this is {{Agent}} with {{Brokerage}}. Homes in your bracket in {{Neighborhood}} are quietly changing hands off-market — and owners who don't know their number are leaving money on the table when the knock comes. I put together a private valuation for {{Address}} — the real number, not an algorithm's guess. It's yours whether or not we ever work together. {{Phone}}.`},
{t:"luxury",ch:"email",adv:"Cheryl Eisen",title:"The Staging ROI Email",body:
`Subject: {{Address}}: what staging is worth in actual dollars

{{Owner}},

The difference between a beautiful empty house and a styled home isn't taste — it's the sale price. Buyers at this level don't purchase property; they purchase an identity. Our job is to hand it to them the moment the door opens.

For {{Address}}, I'd focus on three moments: the entry (five seconds that set the price), the primary suite (where luxury buyers decide), and the outdoor room (California's second living room).

A tailored staging plan for your home, with projected return, is one walkthrough away. When may I see it?

{{Agent}} · {{Brokerage}}`},
{t:"luxury",ch:"text",adv:"Shea McGee",title:"Pre-List Design Text",body:
`{{Owner}}, before your home hits the market: the highest-ROI hour we can spend is a design walk-through. Small moves — lighting, paint, what leaves the room — routinely add more than they cost. I'll bring the checklist; you keep the list price. Thursday or Friday?`},
{t:"luxury",ch:"email",adv:"Joanna Gaines",title:"The Lifestyle Listing Email",body:
`Subject: The story {{Address}} should tell

{{Owner}},

Every home has a story, and buyers pay for the ones they can feel. When someone walks into {{Address}}, they shouldn't see a listing — they should see slow Saturday mornings, dinner that runs long, a porch that makes the day end better.

That's how I'd present your home: warm, honest, and styled so its best life is visible in every photo and every showing.

I'd love to walk it with you and show you the handful of touches that make buyers linger. Lingering buyers become offers.

Warmly,
{{Agent}} · {{Brokerage}}`},

/* ---------- ABSENTEE ---------- */
{t:"absentee",ch:"call",adv:"David Greene",title:"Out-of-State Owner Call",body:
`YOU: {{Owner}}? {{Agent}} here — I'm a local agent in {{Neighborhood}}, and I'm calling because you own {{Address}} but live out of the area. I work with a lot of long-distance owners, so I'll get right to the numbers.

Three things owners like you usually want to know:
One — what the property would rent for today versus what you're getting.
Two — what it would sell for, as-is, this month.
Three — what the equity would do if you moved it into something with better returns and less brain damage.

I can run all three for you this week — takes me an hour, costs you nothing, and you'll know exactly where you stand. Worst case, you keep the property and sleep better knowing the numbers. What's your email?`},
{t:"absentee",ch:"vm",adv:"Ken McElroy",title:"Tired Landlord Voicemail",body:
`{{Owner}}, this is {{Agent}} in {{City}}. You've owned {{Address}} a long time, and if you're like most landlords I talk to, the property's been good to you — but the calls, the turnover, the maintenance... that math changes. I ran your numbers: what it rents for, what it'd sell for, and what a 1031 into something truly passive could look like. Ten minutes and they're yours. {{Phone}}.`},
{t:"absentee",ch:"text",adv:"Jerry Norton",title:"Absentee As-Is Text",body:
`Hi {{Owner}}, {{Agent}} here in {{City}} — you own the property on {{Street}}. Quick one: if you could sell it AS-IS — no repairs, no cleanout, no flying back — would a cash number even interest you? If not, no worries at all. If maybe, I'll send it over today.`},
{t:"absentee",ch:"email",adv:"Bob Knakal",title:"The Ownership-Duration Email",body:
`Subject: {{Address}} — 14 years of ownership, one question

{{Owner}},

You've owned {{Address}} since {{Year}} — long enough that your basis, your depreciation schedule, and today's values have quietly turned it into a very different investment than the one you bought.

Owners at your stage typically weigh three moves: hold and refinance, sell and pay the tax, or exchange into something larger or more passive. Each has a number attached, and most owners have never seen all three side by side.

I prepare that comparison for {{Neighborhood}} owners at no cost. May I send you yours?

{{Agent}} · {{Brokerage}} · {{Phone}}`},

/* ---------- NOD ---------- */
{t:"nod",ch:"call",adv:"Nicole Espinosa",title:"The Options Call (NOD)",body:
`YOU: Hi {{Owner}}, my name is {{Agent}} — I'm a local agent, and I'm calling because a notice was filed on {{Address}}. I know I'm not the first call, and I know most of them have been vultures. I'm not calling to buy your house for fifty cents on the dollar.

Here's the truth most callers won't tell you: you have MORE options right now than you'll have in 60 days, and every week that passes closes one of them.

Depending on your numbers, you may be able to: reinstate and stay. Modify the loan. Sell with your equity protected — you might have more than you think. Or, worst case, a short sale that saves your credit from the full hit.

I don't charge you anything to map those out. One conversation, all your options on one page, and YOU pick. Even if you never call me again — can we do that this week?`},
{t:"nod",ch:"vm",adv:"Nicole Espinosa",title:"NOD Voicemail — No Shame",body:
`{{Owner}}, this is {{Agent}}, a local agent — not a bank, not an investor. A notice was filed on your home, and I help homeowners in exactly this spot figure out ALL their options: keeping the home, selling with equity protected, or stopping the clock. The one thing that makes it worse is waiting. Ten minutes, no judgment, no cost: {{Phone}}. Even if you don't call me, call someone this week.`},
{t:"nod",ch:"text",adv:"Chris Voss",title:"NOD First Text",body:
`{{Owner}}, this is {{Agent}}, a local agent. It seems like everyone calling about your home lately wants something FROM you. Is it a bad idea to send you a one-page list of the options that protect YOUR equity — no call needed, just the list?`},
{t:"nod",ch:"email",adv:"Nicole Espinosa",title:"NOD Options Email",body:
`Subject: {{Address}} — your options, on one page

{{Owner}},

You've probably gotten thirty letters since the notice was filed. Here's what's different about this one: I'm not asking to buy your house.

Attached is a one-page breakdown of every path from where you stand: reinstatement, loan modification, forbearance, selling with your equity intact, and — only if the numbers demand it — a short sale. Each option shows the deadline that kills it.

The banks count on homeowners freezing. Don't freeze. Pick the option that protects your family and your money — I'll help you execute whichever one you choose, even the ones that don't involve me.

{{Agent}} · {{Brokerage}} · {{Phone}}`},

/* ---------- TAX ---------- */
{t:"tax",ch:"call",adv:"Ted Thomas",title:"Tax-Default Redemption Call",body:
`YOU: {{Owner}}? My name is {{Agent}} — I'm a local agent here in {{City}}. I'm calling about the property taxes on {{Address}}. The county has it on the defaulted list, and I don't think most owners realize what that clock actually does.

Here's the plain version: right now you're in the redemption window — you can bring it current and nothing happens. But if it runs the full five years, the county can auction the property, and here's the part that hurts: any equity above the taxes owed can get wiped out at auction for pennies.

You have real options while the window's open: bring it current, set up a county payment plan, or — if the property's become a burden — sell it, pay the taxes at closing, and KEEP your equity.

I map those out free. Can I show you the numbers this week, before another penalty date hits?`},
{t:"tax",ch:"vm",adv:"Ted Thomas",title:"Tax-Default Voicemail",body:
`{{Owner}}, this is {{Agent}}, a local agent in {{City}}. The county lists {{Address}} as tax-defaulted, and I work with owners in the redemption window — the period where you still control the outcome. Payment plan, bring it current, or sell and keep your equity: all three beat what happens at auction. The deadlines don't move, so let's look at your options this week. {{Phone}}.`},
{t:"tax",ch:"text",adv:"Ted Thomas",title:"Tax Deadline Text",body:
`{{Owner}}, {{Agent}} here (local agent). The tax default on {{Address}} has a redemption deadline, and owners who act inside it keep their equity — owners who don't can lose it at auction. Want the one-pager on your three options? Takes 30 seconds to read.`},
{t:"tax",ch:"email",adv:"Ted Thomas",title:"Tax-Default Options Email",body:
`Subject: {{Address}}: the redemption window is your leverage

{{Owner}},

County records show {{Address}} on the tax-defaulted roll. That's fixable — but only inside the redemption window.

Your three options, in order of what most owners prefer:
1. Bring the taxes current (I can get you the exact payoff figure).
2. County installment plan — spreads it out, stops the auction clock.
3. Sell the property: taxes get paid at closing and every remaining dollar of equity goes to YOU — not to an auction bidder.

The only losing move is letting the window close. I'll run your equity number for free so you can decide with real figures. Reply or call {{Phone}}.

{{Agent}} · {{Brokerage}}`},

/* ---------- PROBATE ---------- */
{t:"probate",ch:"call",adv:"Chad Corbett",title:"Family-First Probate Call",body:
`YOU: Hi, is this {{Name}}? My name is {{Agent}} — first, I'm sorry for your loss. I know this call is out of the blue, so I'll tell you exactly why I'm calling and you can decide if it's useful.

I help families who are settling an estate — and my job, honestly, is to take things OFF your plate. Not just the house: the cleanout, the utilities, the yard nobody's mowing, the insurance company that wants to cancel the vacant-home policy — all of it.

Can I ask — of everything on your list right now, what's the part that's weighing on you the most?

(listen. Whatever they name, offer to handle a piece of it with NO strings:)
Let me take that one off your plate this week. No cost, no obligation, truly. And when the family gets to the point of deciding what to do with the property — keep it, rent it, sell it — I'll lay out all three with real numbers, and whatever you choose, I'll help you do it.`},
{t:"probate",ch:"vm",adv:"Bill Gross",title:"Probate Process Voicemail",body:
`Hi {{Name}}, my name is {{Agent}} — I'm a local agent who works with families going through probate in {{County}} County. Court process here has its own timeline and its own rules — and the difference between a smooth estate sale and a stalled one is usually just knowing the sequence. I help with all of it, including the parts that have nothing to do with selling. If it'd help to have someone who's done this a hundred times, I'm at {{Phone}}. No rush — whenever you're ready.`},
{t:"probate",ch:"text",adv:"Chad Corbett",title:"Probate Gentle Text",body:
`Hi {{Name}}, this is {{Agent}} — I help families settling estates here in {{City}}. No agenda today: if the property on {{Street}} ever becomes one thing too many to manage, I handle everything from cleanouts to closings. Is it okay if I check in next month?`},
{t:"probate",ch:"email",adv:"Al Nicoletti",title:"Probate Timeline Email",body:
`Subject: The {{County}} probate timeline, in plain English

{{Name}},

Probate has a reputation for being slow — but most delays are avoidable, and the ones that aren't are at least predictable. Attached is a plain-English timeline of the {{County}} County process: what happens when, which documents unlock the next step, and where families most often lose months.

Two things worth knowing early:
1. The property can often be listed before the process fully closes — the sale just closes in sequence with the court.
2. If there's no will, the path is different but very manageable with the right order of operations.

I work alongside probate attorneys, not instead of them. If your attorney has this handled, wonderful — keep the timeline anyway. If you don't have one yet, I can introduce you to two or three who are excellent.

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
`YOU: {{Owner}}, {{Agent}} with {{Brokerage}}. I track ownership in {{Submarket}}, and you've held {{Address}} for {{Years}} years — which puts you in the window when most owners at least want to know their number.

So here it is, no charge and no pitch: based on current cap rates for your asset class in this submarket, your building would trade somewhere in the range of {{Range}}. That's off today's comps, not a guess.

Three things owners in your position do with that number: nothing — perfectly valid. Refinance and pull equity while keeping the asset. Or trade up via 1031 into something bigger or more passive before the exchange math changes.

I'm not calling to list your building. I'm calling to be the broker who already knows it when you're ready. Can I send you the full valuation in writing?`},
{t:"cre",ch:"vm",adv:"Tyler Cauble",title:"Small CRE Owner Voicemail",body:
`{{Owner}}, this is {{Agent}} — I work small commercial in {{City}}. Your building on {{Street}} caught my attention: with what NNN leases are doing in this corridor, your rents may be under market by enough to change the building's value meaningfully. I ran the quick math — takes five minutes to share. Whether you'd ever sell or just want to raise rents at renewal, the number's worth knowing. {{Phone}}.`},
{t:"cre",ch:"text",adv:"Tyler Cauble",title:"CRE Rent-Gap Text",body:
`{{Owner}} — {{Agent}}, commercial agent in {{City}}. Rents on your corridor just reset ~{{Pct}}% higher at two recent signings. If your leases renew in the next 18 months, that gap is worth real money. Want the two comps? Free, no strings.`},
{t:"cre",ch:"email",adv:"Ken McElroy",title:"Multifamily NOI Email",body:
`Subject: {{Address}}: the NOI gap nobody's showing you

{{Owner}},

Every multifamily owner knows their rent roll. Fewer know their NOI gap — the spread between what the property nets today and what it would net with market rents, right-sized expenses, and modern management.

For a building like {{Address}}, that gap is usually 15-25% of NOI. At today's cap rates, every recovered dollar of NOI adds roughly {{Multiple}} dollars of value.

I put together gap analyses for {{City}} owners — what to fix, what it costs, what it returns, and what the building's worth on the other side. Yours is free. Interested?

{{Agent}} · {{Brokerage}} · {{Phone}}`},

/* ---------- INVEST ---------- */
{t:"invest",ch:"call",adv:"Tarek El Moussa",title:"The As-Is Seller Call",body:
`YOU: {{Owner}}? Hey, it's {{Agent}} — local agent and investor here in {{City}}. I'll be straight with you: I'm calling about {{Address}} because homes like it are exactly what my buyers and I renovate.

Look — you've got two ways to sell a house that needs work, and they're BOTH legit:

Route one: fix it up, list it, top dollar. I can tell you exactly which repairs return money and which ones burn it — most sellers waste ten grand on the wrong stuff.

Route two: sell as-is. No repairs, no cleanouts, no strangers walking through for months. Less money, way less hassle — and you close on YOUR timeline.

Most agents only pitch route one because it's a bigger check for them. I'll run you both numbers side by side so you pick with your eyes open. Takes me a day. Want them?`},
{t:"invest",ch:"vm",adv:"Jerry Norton",title:"The Certainty Voicemail",body:
`{{Owner}}, this is {{Agent}} in {{City}}. If you've thought about selling {{Address}} but the condition's been holding you back — that's literally my specialty. I'll bring you a real number, backed by a real deposit, with no repair requests and no six-month escrow. You pick the closing date. If the number doesn't work, we shake hands and you keep my card. {{Phone}}.`},
{t:"invest",ch:"text",adv:"Pace Morby",title:"The Creative-Terms Text",body:
`Hi {{Owner}}, {{Agent}} here. Different kind of question about {{Street}}: if you could sell for FULL price — but get paid over time instead of all at once (often better for taxes too) — is that something you'd at least want explained? 10-min call, zero pressure. Some sellers love it, some don't — both are fine.`},
{t:"invest",ch:"email",adv:"David Greene",title:"The Investor Exit Email",body:
`Subject: {{Address}}: three exits, three very different checks

{{Owner}},

Investment properties have more than one exit, and the spread between them is bigger than most owners think. For {{Address}}:

1. Retail sale, fixed up: highest gross, but repairs + months of carrying costs eat the spread.
2. As-is sale to an investor: fastest and cleanest — the discount is the price of certainty.
3. Keep it and refinance: pull the equity tax-free, let a tenant keep paying it down.

I run all three side by side — actual numbers, including the repair budget and the tax picture — so the decision makes itself. Want yours this week?

{{Agent}} · {{Brokerage}} · {{Phone}}`},

/* ---------- ESPANOL ---------- */
{t:"espanol",ch:"call",adv:"Loida Velasquez",title:"Llamada de Prospección (ES/EN)",body:
`YOU: Buenas tardes, ¿hablo con {{Owner}}? Le habla {{Agent}}, agente de bienes raíces aquí en {{Neighborhood}}. ¿Cómo está?

Le llamo porque acabamos de vender una casa en su calle, y los valores de la zona cambiaron. Muchos vecinos no saben cuánto vale su casa hoy — y ese número es SU dinero, le pertenece saberlo.

¿Le gustaría que le prepare un análisis gratis del valor de su casa? Sin compromiso — es información, nada más.

(if they switch to English, flow with them:)
Of course! Like I was saying — a home just sold on your street and it moved everyone's value. I'd love to send you the real number, free. Would email or text be better?

(cierre:) Perfecto. Y si algún familiar o amigo está pensando en comprar o vender, con mucho gusto los atiendo — en español o inglés, como se sientan más cómodos.`},
{t:"espanol",ch:"vm",adv:"Rene Rodriguez",title:"Buzón de Voz — Confianza Primero",body:
`{{Owner}}, le habla {{Agent}}, agente local en {{City}}. Le dejo este mensaje porque los valores en {{Neighborhood}} subieron, y su casa probablemente vale más de lo que usted cree. Ese dato cambia decisiones — refinanciar, vender, o simplemente dormir tranquilo. Yo se lo preparo gratis, por escrito, sin ningún compromiso. Cuando guste: {{Phone}}. Que tenga excelente día.`},
{t:"espanol",ch:"text",adv:"Carlos Reyes",title:"Texto Directo (ES)",body:
`Hola {{Owner}}, soy {{Agent}}, agente aquí en {{City}}. Compramos y vendemos casas en {{Neighborhood}} — si algún día le interesa saber cuánto le darían por su propiedad TAL COMO ESTÁ (sin arreglar nada), se lo averiguo gratis. ¿Le mando el número?`},
{t:"espanol",ch:"email",adv:"Veronica Figueroa",title:"Email Bilingüe — La Primera Casa",body:
`Subject: Su casa propia: más cerca de lo que cree / Homeownership: closer than you think

Hola {{Name}},

Muchas familias creen que comprar casa requiere papeles perfectos, crédito perfecto y 20% de enganche. La verdad: existen programas con enganche desde 3%, ayudas para el pago inicial aquí en {{County}}, y opciones para compradores con ITIN.

Nuestro equipo ha ayudado a cientos de familias — en español, paso a paso, sin apuros y sin letra chiquita.

(English: Many families think buying a home takes perfect credit and 20% down. There are programs with as little as 3% down, local down-payment assistance, and ITIN options. We'll walk you through it, in whichever language feels like home.)

¿Le gustaría una consulta gratis de 15 minutos? Responda este correo y la agendamos.

{{Agent}} · {{Brokerage}} · {{Phone}}`},
];
/* ===== EXPANSION A: expired, fsbo, circle, soi ===== */
SCRIPTS.push(
/* -- EXPIRED: +3 calls, +3 vm, +3 text, +3 email -- */
{t:"expired",ch:"call",adv:"Ricky Carruth",title:"The No-Pitch Expired Call",body:
`YOU: Hey {{Owner}}, {{Agent}} here — local agent. Your home came off the market and I'm NOT calling to pitch you. Honestly, after months of showings you've earned a break from agents.

One thing, then I'm gone: I keep a private list of buyers who missed out on {{Neighborhood}} homes this year. If one of them fits your house, would you want to know — even if you never re-list publicly?

(whatever they say, accept it warmly)

That's all I've got. I'll check on you next month either way — no agenda, I just stay in touch with everyone on this street. Take care of yourself.`},
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

That's the diagnosis right there. The first two weeks are 80% of a listing's energy. After that, buyers assume something's wrong — even when nothing is.

A re-launch resets that clock completely: new photos, new price story, new first-two-weeks. Homes that re-launch properly get their second first-impression, and second first-impressions sell.

I do a 20-minute re-launch audit — what went wrong, hour by hour, and the calendar for doing it right. Thursday at 5 or Saturday morning?`},
{t:"expired",ch:"vm",adv:"Brandon Mulrenin",title:"Expired VM — Permission First",body:
`Hi {{Owner}}, {{Agent}} here, local agent in {{Neighborhood}}. I know you've heard from a dozen agents since the listing ended, so I'll be different: I'm not asking for an appointment. I wrote up the three most likely reasons homes like yours stall — one page, specific to {{Address}}. Would you be opposed to me mailing it? If so, no reply needed and you'll never hear from me again. Otherwise it's in your mailbox Friday. {{Phone}}.`},
{t:"expired",ch:"vm",adv:"Ricky Carruth",title:"Expired VM — The Long Game",body:
`Hey {{Owner}}, {{Agent}} — local agent, calling everyone whose listing ended this month. No pitch: whether you re-list, rent it, or stay put ten more years, somebody should keep you posted on what your home's worth without asking anything back. That's what I do for this neighborhood. You'll get my market note monthly — if you ever want off the list, one text does it. And if you ever need anything real estate, you've got a guy. {{Phone}}.`},
{t:"expired",ch:"vm",adv:"Jimmy Burgess",title:"Expired VM — The Gift",body:
`{{Owner}}, {{Agent}} with {{Brokerage}}. Instead of telling you what I'd do differently, I already did it: I re-shot your home's market position — fresh comps, what buyers paid this quarter, and the price band where {{Address}} would get multiple offers today. It's done, it's yours, no meeting required. Text me the word SEND to {{Phone}} and it's in your inbox tonight.`},
{t:"expired",ch:"text",adv:"Brandon Mulrenin",title:"Expired Text — The Soft Diagnostic",body:
`Hi {{Owner}}, {{Agent}} here (local agent). Would you be opposed to me sending over a one-page look at why {{Address}} likely didn't sell? No call, no appointment — just the analysis. If it's useful, keep it. If not, delete it.`},
{t:"expired",ch:"text",adv:"Tom Ferry",title:"Expired Text — The 30-Day Stat",body:
`{{Owner}} — {{Agent}}, {{Brokerage}}. One stat before you decide anything: homes that re-list with a NEW strategy (not just a new sign) typically sell in the first 30 days. Happy to show you what "new strategy" actually means for {{Address}}. Worth 15 minutes?`},
{t:"expired",ch:"text",adv:"Chris Voss",title:"Expired Text — No-Oriented",body:
`{{Owner}}, {{Agent}} here. Have you completely given up on selling {{Address}}? (Serious question — if yes, I'll stop here. If no, I have one idea the last listing never tried.)`},
{t:"expired",ch:"email",adv:"Brandon Mulrenin",title:"Expired Email — The Autopsy",body:
`Subject: {{Address}}: the listing autopsy (one page)

{{Owner}},

When a home doesn't sell, the market left clues. I pulled the data on your listing and the answer is almost always one of these three:

1. THE PRICE STORY — not the price itself, but where it sat against the homes buyers compared you to that week.
2. THE FIRST 14 DAYS — how many showings happened before the listing went stale in the algorithm.
3. THE MARKETING FOOTPRINT — where the home actually appeared, versus where your buyer actually looks.

I wrote up which one hurt {{Address}} — with the receipts. Reply "send it" and it's yours. Reading it costs you nothing and commits you to nothing.

{{Agent}} · {{Brokerage}} · {{Phone}}`},
{t:"expired",ch:"email",adv:"Ricky Carruth",title:"Expired Email — Zero Pressure",body:
`Subject: No pitch — just staying in touch

{{Owner}},

Your listing ended and I imagine the agent calls started before the sign was down. This email isn't one of those.

I work {{Neighborhood}} for the long haul — which means I'd rather be useful to you for the next five years than pushy for the next five days. Once a month I send neighbors a short note: what sold, for how much, and what it means for your value. You're on it as of today; one reply takes you off.

Sell, stay, rent it out — whatever you decide, you'll decide it with current numbers. That's the whole offer.

{{Agent}} · {{Phone}}`},
{t:"expired",ch:"email",adv:"Tim & Julie Harris",title:"Expired Email — The Second Opinion",body:
`Subject: Before you re-list {{Address}} with anyone

{{Owner}},

Whoever you interview next — me or anyone else — make them answer these five questions before you sign:

1. What EXACTLY failed last time? (If they only say "price," keep interviewing.)
2. What will the first 14 days look like, day by day?
3. Where will the marketing run, and what does each channel cost THEM?
4. What's the showing-to-offer ratio they expect, and what happens if we miss it?
5. What's their average days-on-market versus the area's?

I'll happily answer all five in writing before you ever meet with me. That's how confident I am in the plan for your home.

{{Agent}} · {{Brokerage}} · {{Phone}}`},

/* -- FSBO: +3 each -- */
{t:"fsbo",ch:"call",adv:"Tim & Julie Harris",title:"FSBO — The Buyer-in-Hand Call",body:
`YOU: Hi {{Owner}}, {{Agent}} with {{Brokerage}} — calling about the home you're selling yourself. Quick and honest: I work buyers in {{Neighborhood}} every week. If one of them matches your home, I'd bring them and you'd pay only the buyer's side — nothing for listing, because you're not listing.

Two questions so I don't waste your time:
What's your price? ... And what's the one feature buyers keep reacting to at showings?

Great. If I've got a match I'll call you before I bring anyone. And listen — you're doing the hard part yourself; the least the industry can do is send you real buyers. Good luck with it, seriously.`},
{t:"fsbo",ch:"call",adv:"Ricky Carruth",title:"FSBO — The Friend-in-the-Business Call",body:
`YOU: Hey {{Owner}}, {{Agent}} — local agent. Saw the FSBO sign. Not calling to list it — calling because most owners selling themselves have nobody in the business to sanity-check things with. Free of charge, no catch: I'll be that person.

Pricing question? Call me. Weird buyer behavior? Call me. Contract lands and something smells off? DEFINITELY call me.

Only thing I ask: if you ever DO decide it's not worth the headache — three months from now, a year from now — give me one conversation before you pick an agent. Deal?`},
{t:"fsbo",ch:"call",adv:"Chris Voss",title:"FSBO — The Calibrated Call",body:
`YOU: {{Owner}}, {{Agent}} here, local agent. It sounds like you've decided agents aren't worth the commission — and honestly, for some homes, you're right.

(pause — agreeing disarms)

Can I ask a calibrated question? How will you know — what's the sign — that doing it yourself has stopped saving you money and started costing you money?

(listen. They rarely have an answer — don't pounce on that)

That's worth thinking about. Most owners set a deadline or a showing count. Whatever yours is, write it down today while you're objective. And if that day ever comes, is it a bad idea for me to be the first call?`},
{t:"fsbo",ch:"vm",adv:"Brandon Mulrenin",title:"FSBO VM — The Two Stats",body:
`Hi {{Owner}}, {{Agent}}, local agent — not calling for the listing. Two numbers worth having as you sell on your own: the average FSBO in our area sells for meaningfully less than agent-listed homes — but the ones that DON'T are the ones priced with real comps from day one. I'll send you the comp set I'd use for {{Address}}, free, because an informed seller is good for the whole street. Text COMPS to {{Phone}}.`},
{t:"fsbo",ch:"vm",adv:"Jimmy Burgess",title:"FSBO VM — The Open-House Offer",body:
`{{Owner}}, {{Agent}} with {{Brokerage}}. Different kind of offer: I hold open houses in {{Neighborhood}} most weekends, and buyers constantly ask about other homes nearby. With your permission, I'll mention yours — free. Why? Because if they buy your house through me, I earn the buyer's side, and you sell without listing. Everybody wins. Call me and I'll add it to this weekend's sheet: {{Phone}}.`},
{t:"fsbo",ch:"vm",adv:"Ricky Carruth",title:"FSBO VM — The Check-In",body:
`Hey {{Owner}}, {{Agent}} again — the local agent with no pitch. Week three of the FSBO, just checking in like I said I would. If traffic's strong, ignore this and keep rolling. If the calls slowed down — that's normal, and there are two free fixes I can tell you in five minutes. Either way I'm rooting for you. {{Phone}}.`},
{t:"fsbo",ch:"text",adv:"Tim & Julie Harris",title:"FSBO Text — The Qualifier Gift",body:
`Hi {{Owner}}, {{Agent}} ({{Brokerage}}). Free thing every FSBO needs: a 60-second buyer-qualification checklist — so nobody unqualified walks through your home. Want it? It's saved my sellers hundreds of wasted showings.`},
{t:"fsbo",ch:"text",adv:"Pace Morby",title:"FSBO Text — The Backup Offer",body:
`{{Owner}} — {{Agent}} here. While you sell on your own: want a standing backup offer in your pocket? Costs nothing, expires never, and makes every buyer negotiation stronger ("I have another offer" hits different when it's true). One walkthrough and you'll have it in writing.`},
{t:"fsbo",ch:"text",adv:"Jimmy Burgess",title:"FSBO Text — The Exposure Boost",body:
`Hi {{Owner}}, {{Agent}} here. Your FSBO isn't on the MLS, which hides it from ~90% of active buyers' searches. There are two legit free workarounds most owners never hear about. Want them? (Still no listing pitch — promise.)`},
{t:"fsbo",ch:"email",adv:"Brandon Mulrenin",title:"FSBO Email — The Honest Math",body:
`Subject: The FSBO math nobody shows you

{{Owner}},

You're selling yourself to save the commission — smart, IF the sale price holds. Here's the honest math to watch:

- Agent-listed homes in {{Neighborhood}} have been closing at roughly {{Pct}}% of list. FSBOs typically negotiate from a weaker position because buyers know you're saving commission — and they want that savings for themselves.
- Break-even: if going it alone costs you more than about 5% in final price, the savings inverted.

Attached: the comp set I'd price {{Address}} against, so your number is bulletproof from day one. Use it with my compliments — a well-priced FSBO is better for this street than an overpriced listing.

{{Agent}} · {{Brokerage}} · {{Phone}}`},
{t:"fsbo",ch:"email",adv:"Chris Voss",title:"FSBO Email — The Negotiation Edge",body:
`Subject: The question every buyer will ask you

{{Owner}},

Selling on your own means negotiating alone against buyers (and their agents) who do this weekly. One heads-up worth more than a commission:

Every buyer will eventually ask some version of: "Since you're not paying an agent, you can come down, right?" The worst answer is a discount. The best answer is a calm, calibrated question back: "How am I supposed to discount a price the comps already support?"

Attached is a one-pager of the five questions buyers use on FSBOs, and the responses that hold your price. It's free — a seller who negotiates well keeps values strong for everyone here.

{{Agent}} · {{Phone}}`},
{t:"fsbo",ch:"email",adv:"Ricky Carruth",title:"FSBO Email — The 90-Day Friend",body:
`Subject: Rooting for you (and here if it changes)

{{Owner}},

Most agents email FSBOs waiting for them to fail. Not this one — plenty of owners sell fine on their own, especially with a sharp price and good photos.

So here's my only move: for the next 90 days I'll send you what I send my clients — the weekly buyer-activity note for {{Neighborhood}} (what listed, what went pending, how fast). It'll make your pricing and timing decisions sharper.

If you sell it yourself: congratulations, keep the reports as a housewarming-in-reverse gift. If you ever want backup: you'll already know I do what I say.

{{Agent}} · {{Phone}}`},

/* -- CIRCLE: +3 each -- */
{t:"circle",ch:"call",adv:"Tom Ferry",title:"The Equity-Update Circle Call",body:
`YOU: Hi {{Owner}}, {{Agent}} with {{Brokerage}}. I'm doing annual equity updates for {{Neighborhood}} homeowners this month — takes 90 seconds and it's free.

Here's yours in headline form: homes on your street are trading around {{Price}}, which likely puts your equity meaningfully above where it was two years ago.

Most owners do one of three things with that: nothing — great option; tap it for improvements or investments; or trade up while their buying power is strong.

Want the full one-pager with your specific numbers? And while I have you — any real estate plans in the next 12 months I should factor in?`},
{t:"circle",ch:"call",adv:"Loida Velasquez",title:"Circle Call — Bilingual Neighborhood Update",body:
`YOU: Hi, {{Owner}}? This is {{Agent}}, a local agent here in {{Neighborhood}} — ¿prefiere que hablemos en español o inglés?

(continue in their choice)

I'm calling neighbors because a home nearby just sold, and it changed values on the street. Most owners have no idea what that did to THEIR number — and it's your equity, you should know it.

I'll prepare it free, in writing, in whichever language is easier for your family to review together. And if a hermano, prima, or coworker is thinking about buying or selling — I take care of referrals like family. ¿Le mando el análisis?`},
{t:"circle",ch:"call",adv:"Gary Keller",title:"The Farm-Anchor Call",body:
`YOU: {{Owner}}, {{Agent}} with {{Brokerage}} — I'm the agent who's adopted {{Neighborhood}} as my home base, which means you're one of the people I keep informed, whether or not we ever do business.

This quarter's headline: {{Stat}} — and what it means for your home specifically is worth two minutes.

But the reason for the call: I run my business on a simple model — know the neighborhood better than anyone, and be the first call when anyone here needs anything real estate. Repairs, refi questions, contractor referrals, value checks. What's on your house list this year — anything I can point you to a good person for?`},
{t:"circle",ch:"vm",adv:"Ricky Carruth",title:"Circle VM — The Standing Offer",body:
`Hey {{Owner}}, {{Agent}} — your neighborhood agent here in {{Neighborhood}}. No pitch: a home on {{Street}} just sold and it moved your value. I keep every neighbor posted on their number, free, forever — that's just how I run my business. If you ever want yours, it's one text away: {{Phone}}. Talk soon.`},
{t:"circle",ch:"vm",adv:"Glennda Baker",title:"Circle VM — The Story Number",body:
`{{Owner}}, {{Agent}} here. Let me tell you what just happened on {{Street}}: listed Thursday, 40 groups through Saturday, offers Monday, closed above asking. THAT'S the market on your street right now — and it won't last forever, markets never do. If you've even day-dreamed about selling, this is the chapter to do it in. I'll tell you your number free: {{Phone}}.`},
{t:"circle",ch:"vm",adv:"Sharran Srivatsaa",title:"Circle VM — The Quiet Wealth Check",body:
`{{Owner}}, {{Agent}} with {{Brokerage}}. Your home is likely your largest asset, and most owners review it less often than their phone bill. Once a year I prepare a private wealth snapshot for {{Neighborhood}} owners: value, equity, and the two or three moves that number makes possible. Yours takes me an hour; reviewing it takes you five minutes. {{Phone}} — I'll have it to you this week.`},
{t:"circle",ch:"text",adv:"Ricky Carruth",title:"Circle Text — Just Sold, No Agenda",body:
`Hi {{Owner}} — {{Agent}}, your {{Neighborhood}} agent. The home on {{Street}} just closed and it nudged your value up. No action needed — I just believe owners should always know their number. Want it?`},
{t:"circle",ch:"text",adv:"Tom Ferry",title:"Circle Text — The Buyer Waitlist",body:
`{{Owner}}, {{Agent}} here ({{Brokerage}}). After the sale on {{Street}}, I have {{N}} buyer families who missed out and asked me to watch this block. Zero pressure — but if a no-showings, no-sign, quiet sale ever appealed to you, this is what it looks like. Interested in hearing their range?`},
{t:"circle",ch:"text",adv:"Jimmy Burgess",title:"Circle Text — The Free CMA Drop",body:
`Hi {{Owner}}, {{Agent}} here. I ran updated values for every home on {{Street}} after the recent sale (it's what I do instead of cold-calling 😄). Yours is ready — want me to text the number or email the full report?`},
{t:"circle",ch:"email",adv:"Glennda Baker",title:"Circle Email — The Street Story",body:
`Subject: What really happened with the house on {{Street}}

{{Owner}},

You saw the sign go up and come down. Here's the story behind it:

The sellers almost didn't list — they were sure the market had cooled. Then their agent (hi 👋) showed them what buyers were actually doing in {{Neighborhood}}: showing up prepared, competing fast, and paying for move-in-ready.

Listed {{Day}}. {{N}} showings the first weekend. Multiple offers. Closed at {{Price}}.

Why am I telling you? Because "I didn't know the market was like that" is the most expensive sentence in real estate. Now you know. If you ever want YOUR home's version of this story, I write those for a living.

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
`Subject: {{Neighborhood}} by the numbers — {{Month}}

{{Owner}},

No fluff, just your street's market in four numbers:

- MEDIAN LIST: {{Price}} — where sellers are starting
- DAYS ON MARKET: {{DOM}} — how fast buyers are moving
- PRICE CUTS: {{Pct}}% — who overpriced and paid for it
- SALE-TO-LIST: {{Ratio}} — the negotiation gap, i.e., your leverage

The one that matters most for you: sale-to-list. When it's this tight, prepared sellers keep almost every dollar of asking. When it widens, buyers take the wheel.

I send this monthly to {{Neighborhood}} owners. Want your home's specific position added to next month's? Reply "position me."

{{Agent}} · {{Brokerage}}`},

/* -- SOI: +3 each -- */
{t:"soi",ch:"call",adv:"Sharran Srivatsaa",title:"SOI — The Annual Wealth Call",body:
`YOU: {{Name}}! {{Agent}}. I'm doing something for the people in my corner this month and you're on the list.

Once a year, I build what I call a Home Wealth Review — one page: what your home's worth now, what you owe, your equity, and what that equity could be doing. It's the review every financial advisor skips because it's not their asset class.

No meeting needed — I build it, you read it. But while I've got you: anything changing this year I should know about? Job, family, space needs? ...

(then:) One more thing — you know how I work: my whole business is people my people send me. Who do you know that's talking about moving this year?`},
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
`{{Name}}, {{Agent}} here — your one-minute market update, then I'm gone: values in {{Neighborhood}} moved again this quarter, rates did something interesting, and there's a window open for anyone thinking about trading up. If any of that touches a decision in your house this year, call me first — I'd rather save you money early than sympathize later. {{Phone}}.`},
{t:"soi",ch:"vm",adv:"Tom Ferry",title:"SOI VM — The Referral Seed",body:
`Hey {{Name}}, {{Agent}}. Two things, twenty seconds: first, if you get my market email this week, the {{Neighborhood}} numbers are actually remarkable — worth the two-minute read. Second: I'm growing my business by referral this year, and I'd love to be the name you drop when anyone mentions moving. That's it! Give my best to the family. {{Phone}}.`},
{t:"soi",ch:"text",adv:"Brian Buffini",title:"SOI Text — The Anniversary",body:
`{{Name}} — {{Agent}} here. {{N}} years ago this week you got the keys to your home! 🎉 Happy home-iversary. Fun fact: it's likely worth quite a bit more than that day. Want this year's number? (Free, always, for you.)`},
{t:"soi",ch:"text",adv:"Gary Keller",title:"SOI Text — The One Question",body:
`{{Name}}, {{Agent}} here — doing my quarterly check-in with the people who matter. One question: anything real-estate-shaped on your family's radar this year? (Move, refi, rental, helping a kid buy?) If yes, coffee's on me and the numbers are free.`},
{t:"soi",ch:"text",adv:"Chelsea Peitz",title:"SOI Text — The Personal Touch",body:
`{{Name}}!! Saw {{Personal Thing}} — amazing 👏 Also being your friendly neighborhood agent for one second: if anyone at {{Their Work/Group}} ever mentions moving, you know who loves you. Okay back to being a normal friend. How ARE you?`},
{t:"soi",ch:"email",adv:"Gary Keller",title:"SOI Email — The Equity Statement",body:
`Subject: Your annual home equity statement

{{Name}},

Banks send statements. Brokerages send statements. Your biggest asset? Silence. So once a year, I fix that for my people.

YOUR HOME — {{Year}} SNAPSHOT:
- Estimated market value: {{Price}}
- Change vs. last year: {{Change}}
- Estimated equity: {{Equity}}

What owners do with this: most do nothing (fine!). Some refinance or renovate. A few realize they're one move away from the home they actually want, funded by equity they forgot they had.

Want the detailed version with the comps behind it? One reply. And as always — if someone you care about needs a straight-shooting agent, that introduction means everything to me.

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
`Subject: 3 things worth knowing this month (2-min read)

{{Name}},

No pitch, just three useful things:

1. HOME VALUES: {{Neighborhood}} moved {{Change}} this quarter. If you want your specific number, it's a free reply away.
2. THE TRADES: My clients' favorite {{Trade}} just opened their schedule — if your house list has been waiting on a good one, reply and I'll connect you.
3. THE OPPORTUNITY: Rates did something quietly useful for move-up buyers this month. If a bigger/smaller/different home has crossed your mind, this window is worth a look.

That's it. I send these so that when real estate matters in your life, you already have a guy.

{{Agent}} · {{Brokerage}} · {{Phone}}`}
);
/* ===== EXPANSION B: openhouse, online, social, luxury ===== */
SCRIPTS.push(
/* -- OPEN HOUSE: +3 each -- */
{t:"openhouse",ch:"call",adv:"Ricky Carruth",title:"Open House — The Neighbor Invite Call",body:
`YOU: Hey {{Owner}}, {{Agent}} — local agent. I'm hosting an open house at {{Address}} this Saturday and I always invite the neighbors first. Two reasons:

One — you get the sneak peek before the crowd (come see what your neighbor's equity looks like!).

Two — neighbors are the best matchmakers. Everyone knows someone who's been dying to get onto this street. Bring them, text them the address, whatever's easy.

Saturday, {{Time}}. Cold drinks, no sign-in pressure for neighbors — you're my guests. And hey, while you're there, ask me what the sale means for YOUR value. That answer's free.`},
{t:"openhouse",ch:"call",adv:"Tim & Julie Harris",title:"Open House — The Buyer Conversion Call",body:
`YOU: {{Name}}, {{Agent}} — we met Saturday at {{Address}}. You mentioned you've been looking for {{Timeframe}} — that's longer than most, and it's usually not a buyer problem, it's a process problem.

Here's what I mean: buyers who tour open houses without representation see maybe 4 homes a month. My buyers see everything that fits within 48 hours of it listing — including off-markets.

You clearly know what you want. What's missing is first-look access. I have room for two more buyer clients this month. When can we spend 20 minutes building your exact search profile — tonight or tomorrow?`},
{t:"openhouse",ch:"call",adv:"Jason Pantana",title:"Open House — The Database Activation Call",body:
`YOU: {{Name}}! {{Agent}} — you came through my open house at {{Address}} a while back. It didn't work out (someone snagged it fast), but I kept your wishlist: {{Criteria}}.

Reason for the call: two homes hitting the market this week match it almost exactly — and one hasn't published photos yet, which means most buyers won't notice it for days.

That first-72-hours window is where deals happen. Want me to send both addresses right now? And should I keep you on the early-alert list going forward — takes you off the portal treadmill entirely.`},
{t:"openhouse",ch:"vm",adv:"Ryan Serhant",title:"Open House VM — Same-Night Energy",body:
`{{Name}}! {{Agent}} — you walked through {{Address}} today and I could tell it landed different for you. Quick update you'll want: two groups requested disclosures tonight. If that house is IT, tomorrow morning matters. If it's not, tell me what was missing and I'll hunt down the version that has it — that's literally what I do. Either way: {{Phone}}, tonight or first thing. Follow up, follow through — that's the whole job.`},
{t:"openhouse",ch:"vm",adv:"Tom Ferry",title:"Open House VM — The Second Home Tease",body:
`Hi {{Name}}, {{Agent}} here — great meeting you at the open house. You said {{Address}} was close but not quite. Good news: "close but not quite" is a search profile, not a rejection. I found three homes that fix exactly what was off — one's not even publicly listed yet. Call me back and I'll send all three: {{Phone}}. Buyers who move on day one get first pick — everyone else gets the bidding war.`},
{t:"openhouse",ch:"vm",adv:"Glennda Baker",title:"Open House VM — The Seller Watcher",body:
`{{Owner}}, {{Agent}} here. You stopped by my open house on {{Street}} Saturday — and half the neighbors who do that are quietly wondering about their own home's number. No shame in it, it's the smartest reason to attend! So here's my offer: I'll tell you what YOUR home would list for in this exact market — the real story, front porch to final offer. Free, private, no sign in the yard required. {{Phone}}.`},
{t:"openhouse",ch:"text",adv:"Ryan Serhant",title:"Open House Text — The 24-Hour Follow-Up",body:
`{{Name}} — {{Agent}} from yesterday's open house at {{Address}}. Promised update: offers are being called for {{Day}}. If you want in, I need 10 minutes today. If it wasn't the one — what was the miss? I'll fix it in the next search.`},
{t:"openhouse",ch:"text",adv:"Chelsea Peitz",title:"Open House Text — The Warm Memory",body:
`Hi {{Name}}! {{Agent}} from the {{Address}} open house — you were the one with {{Personal Detail}} 😊 Following up like I promised: want me to set up that custom search we talked about? Takes 5 min and you'll never miss a {{Neighborhood}} listing again.`},
{t:"openhouse",ch:"text",adv:"Jimmy Burgess",title:"Open House Text — The Neighbor Value Drop",body:
`Hi {{Owner}}, {{Agent}} here — thanks for stopping by the open house on {{Street}}! Since you're a neighbor: when this one closes, it resets your home's value. Want me to send you the before/after once it's final? Most neighbors are surprised.`},
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
`Subject: How my buyers keep winning homes like {{Address}}

{{Name}},

You've been searching {{Timeframe}} — so you've probably lost a home or two to buyers who "moved faster." Here's what faster actually means:

1. PRE-APPROVAL, not pre-qualification — sellers can tell the difference.
2. FIRST-DAY SHOWINGS — my clients tour within 48 hours of listing, before the weekend crowd exists.
3. CLEAN OFFERS — fewer contingencies, smarter timelines, personal terms sellers care about.

None of this requires more money. It requires a process. I install it in one 20-minute meeting, and my last {{N}} buyers all closed within {{X}} weeks of starting it.

This week or next?

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
`(the cadence: 5 minutes after inquiry, 5 pieces of value, 5-day follow-up plan)

YOU: {{Name}}? {{Agent}} — you just asked about {{Address}} online. I literally saw it come in and called, because the good ones don't wait.

Real quick — the answers everyone wants: it IS still available, the sellers are motivated by {{Reason}}, and homes on that street have been going in about {{DOM}} days.

Now the useful part: tell me what pulled you to THAT home, and I'll send you tonight — no obligation — the two or three others that match it, including anything coming soon that the portals haven't caught. What was the hook: the location, the layout, or the price?`},
{t:"online",ch:"call",adv:"Chris Voss",title:"Online Lead — The Mirror Call",body:
`YOU: {{Name}}, {{Agent}} here — you inquired about {{Address}}. Most agents would start pitching. I'd rather understand.

You picked that home out of hundreds. Something specific stopped your scroll... what was it?

(whatever they say, MIRROR the last few words:)
"The big backyard?" ... (let them expand — they always do)

(then label:) It sounds like you're not just browsing — you're picturing a specific life, and you're checking whether it's affordable yet.

(pause)

Would it be a bad idea for me to put together what that life actually costs right now — the real monthly number, not the portal estimate? No commitment; numbers first, decisions whenever.`},
{t:"online",ch:"call",adv:"Veronica Figueroa",title:"Online Lead — The Team Warm Transfer",body:
`YOU: Hi {{Name}}! This is {{Agent}} — you were looking at {{Address}} online. First: real person, local office, and I actually know that house. (¿Y si prefiere español, con gusto!)

Before anything else — are you working with anyone yet? ... Perfect. Then here's how we take care of people: one point of contact (me), a lender who answers on weekends, and a search set up so YOU see homes before the crowd does.

The house you clicked — want the honest scoop on it? And more importantly: tell me about the home you're actually trying to find. Beds, area, budget, dream feature — give me the wishlist and let my whole team hunt for you.`},
{t:"online",ch:"vm",adv:"Sharran Srivatsaa",title:"Online Lead VM — The Concierge Open",body:
`{{Name}}, {{Agent}} with {{Brokerage}} — you inquired about {{Address}}. Here's my promise, which you won't get from the portal: within one hour of us talking, you'll have the real status of that home, the seller's actual timeline, and the two best alternatives if it's already spoken for. That's the concierge version of house hunting, and the first conversation is free. {{Phone}} — or just text "INFO" and I'll start there.`},
{t:"online",ch:"vm",adv:"Chelsea Peitz",title:"Online Lead VM — The Anti-Drip",body:
`Hi {{Name}}! {{Agent}} here — you looked at {{Address}} online. I know what happens next usually: twelve robo-emails and three agents reading the same script. I'm going to do the opposite — one voicemail (this one), one text with the honest answer about that house, and then silence unless YOU want more. Check your texts in two minutes. If it's useful, I'm {{Phone}}. If not, no hard feelings and no drip campaign, promise.`},
{t:"online",ch:"vm",adv:"Byron Lazine",title:"Online Lead VM — The Analyst",body:
`{{Name}}, {{Agent}}. You inquired on {{Address}} — before you fall in love, three data points you deserve: it's priced {{Position}} against its comps, it's been sitting {{DOM}} days versus the area's {{AvgDOM}}, and the seller's already cut once. Translation: there's a negotiation here, and most buyers won't see it. Want the full breakdown? {{Phone}}. I do this analysis for every home my buyers consider — it's the difference between paying the price and setting it.`},
{t:"online",ch:"text",adv:"Ryan Serhant",title:"Online Lead Text — Speed Wins",body:
`{{Name}} — {{Agent}}. You asked about {{Address}} 4 minutes ago; here's the real story: {{Status}}. Two more like it (one unlisted) if this one's not perfect. Want both addresses? Speed wins in this market — that goes for agents too. 😄`},
{t:"online",ch:"text",adv:"Byron Lazine",title:"Online Lead Text — The Data Hook",body:
`Hi {{Name}}, {{Agent}} here re: {{Address}}. One thing the portal won't tell you — it's priced {{Diff}} vs. the last 3 comparable sales. That's either a deal or a trap depending on one detail. Want the 60-second version?`},
{t:"online",ch:"text",adv:"Veronica Figueroa",title:"Online Lead Text — Bilingual Welcome",body:
`Hi {{Name}}! {{Agent}} here 🏡 — you were viewing {{Address}}. Happy to help in English o en español, whichever's comfortable. Quick honest answer about that home + 2 better matches if you want them. What's your ideal move-in timing?`},
{t:"online",ch:"email",adv:"Sharran Srivatsaa",title:"Online Lead Email — The VIP Setup",body:
`Subject: Your {{Neighborhood}} search, upgraded

{{Name}},

You inquired about {{Address}} — here's the honest status: {{Status}}.

More useful: let me upgrade how you search. Portal browsing shows you what everyone sees, when everyone sees it. My clients get:

- COMING-SOON ACCESS — homes 3-10 days before public
- THE REAL NUMBERS — monthly cost per home, not just price
- ONE-HOUR ANSWERS — status, seller motivation, negotiation room, on request

It costs nothing; it's how I earn trust before I earn business. Reply with your wishlist (beds, areas, budget) and I'll have your first private list to you tonight.

{{Agent}} · {{Brokerage}} · {{Phone}}`},
{t:"online",ch:"email",adv:"Tom Ferry",title:"Online Lead Email — The 5-Day Plan",body:
`Subject: {{Address}} + a smarter 5 days

{{Name}},

The home you clicked: {{Status}}. Now the plan most buyers never get.

For the next 5 days, here's what I'll do free while you decide if I'm your agent:

DAY 1 (today): honest breakdown of {{Address}} — price position, seller situation, what winning takes.
DAY 2: your custom search goes live — everything that fits, including coming-soons.
DAY 3: lender intro (only if you want) — 15 minutes to a REAL number.
DAY 4: the shortlist — top 3 with my notes on each.
DAY 5: we tour, or you tell me to stop. Either answer is fine.

Five days, zero pressure, full effort. Reply "start" and Day 1 lands tonight.

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
`(they've been engaging with your content; the DM thread earned a call)

YOU: {{Name}}! It's {{Agent}} — from Instagram! (let it land — this is fun, not formal)

I know, calls are ancient. But you asked something in the DMs that deserves better than my thumbs: {{Their Question}}.

(answer it fully, generously — 2 minutes of real value)

Okay, that's the real answer. Can I ask you something back? You've been watching my stuff for a while — what's going on in YOUR housing world? Renting and curious? Own and wondering? I ask because my favorite clients all started exactly where you are: lurking, then one good conversation.`},
{t:"social",ch:"call",adv:"Glennda Baker",title:"Social — The Story Collector Call",body:
`YOU: {{Owner}}, {{Agent}} here! Okay, unusual request, hear me out.

I tell {{Neighborhood}} stories on video — real ones: the house with the offers, the sellers who almost waited, the buyer who wrote the letter. Half a million people watched last month, and buyers move here BECAUSE of those stories.

Your street is next on my list, and I'd love 10 minutes of neighborhood lore from someone who's lived it. What's the story of this block — who's been here longest, what's changed, what do people not know?

(listen — this builds the deepest rapport there is)

This was gold. And listen — when your home's chapter is ready to be written, you know exactly who tells it best.`},
{t:"social",ch:"call",adv:"Jason Pantana",title:"Social — The Retargeting Call",body:
`YOU: {{Name}}, {{Agent}} — you registered for my {{Lead Magnet}} download last week. Calling to make sure it landed, and because the download only tells half the story.

Quick check: did the numbers surprise you? Most people fixate on {{Common Fixation}} — but the finding that actually changes decisions is {{Real Insight}}.

Here's the other half the PDF can't do: YOUR situation, plugged into those numbers. Ten minutes, screen share or coffee, and you'll know exactly where you stand in this market. When's good this week?`},
{t:"social",ch:"vm",adv:"Glennda Baker",title:"Social VM — The Cliffhanger",body:
`{{Name}}, {{Agent}} here! You commented on my video about {{Topic}} — and girl/friend, the part I COULDN'T say on camera is better than the part I could. It involves {{Neighborhood}}, a number that made my jaw drop, and why the next 60 days matter. Call me back and I'll tell you the whole story: {{Phone}}. Some things you just can't put on the internet!`},
{t:"social",ch:"vm",adv:"Jason Pantana",title:"Social VM — The Webinar Follow-Up",body:
`Hi {{Name}}, {{Agent}} — thanks for joining the {{Topic}} session (or catching the replay). The #1 question afterward was "okay but what about MY situation?" — which is exactly what the 15-minute one-on-one version is for. I'm holding {{N}} slots this week for attendees. Grab one: {{Phone}} or just reply to the follow-up email. The generic version was free; the specific version is too.`},
{t:"social",ch:"vm",adv:"Byron Lazine",title:"Social VM — The Hot Take Follow-Up",body:
`{{Name}}, {{Agent}}. You pushed back on my take about {{Topic}} in the comments — and honestly? Half your point was right. That's why I'm calling: the data's more interesting than either of our comments had room for. Ten minutes and I'll show you what the numbers actually say — and if you're still not convinced, you win the comment section. {{Phone}}. Good sparring partners make better clients than yes-people anyway.`},
{t:"social",ch:"text",adv:"Jason Pantana",title:"Social Text — The Lead Magnet Delivery",body:
`{{Name}} — {{Agent}} here! Your {{Lead Magnet}} is attached/linked 📊 The page most people skip is page {{N}} — it's where the actual money is. Want the 5-min walkthrough of what it means for your block specifically?`},
{t:"social",ch:"text",adv:"Byron Lazine",title:"Social Text — The Comment Continuation",body:
`Hey {{Name}}, {{Agent}} from IG — your comment on the {{Topic}} video deserved a real answer, not a 🔥 emoji. Short version: {{One-Line Answer}}. Long version has numbers. Want it?`},
{t:"social",ch:"text",adv:"Glennda Baker",title:"Social Text — The Behind-The-Scenes",body:
`{{Name}}! {{Agent}} 👋 You always watch my {{Neighborhood}} stories, so you get the news first: something's happening on {{Street}} that isn't public yet. If you (or anyone in your circle) has been waiting for a sign — this is the sign. Call me before Friday.`},
{t:"social",ch:"email",adv:"Chelsea Peitz",title:"Social Email — The Follower-to-Friend",body:
`Subject: You've been here a while — thank you

{{Name}},

I noticed you've been part of my little corner of the internet for a bit — the likes, the story views, that one comment that made me laugh. Thank you. Genuinely.

I wanted to say something human: behind the content is a real practice, and the people I serve best are the ones who watched for months before ever needing me. No algorithm involved — just trust built slowly, which is the only kind that matters.

So, no pitch. Just an open door: whenever a housing question crosses your mind — even a hypothetical, even for a friend — you can just ask me. DM, email, text: {{Phone}}. That's what all the content is actually for.

{{Agent}}`},
{t:"social",ch:"email",adv:"Glennda Baker",title:"Social Email — The Story Newsletter",body:
`Subject: The house that taught {{Neighborhood}} a lesson

{{Name}},

Story time. A couple on {{Street}} spent two years "waiting for the right time." They watched three neighbors sell. They tracked rates like day traders. They knew everything — except that waiting was costing them {{Cost}} a year in the home they actually wanted.

Last month they finally moved. Their words at closing: "We could have done this two years ago."

I tell these stories because data doesn't change decisions — recognition does. If you saw yourself in that couple, that's worth noticing.

Your chapter, whenever you're ready. I'll bring the pen.

{{Agent}} · {{Brokerage}}`},
{t:"social",ch:"email",adv:"Jason Pantana",title:"Social Email — The Value Sequence",body:
`Subject: The 3 tools my followers use most (all free)

{{Name}},

You grabbed my {{Lead Magnet}} — here's the rest of the toolkit, no forms required:

1. HOME VALUE TRACKER — your address's real number, updated monthly, straight to your inbox. Reply "track" + your address.
2. THE MONTHLY MARKET MINUTE — 90-second video, actual data, zero jargon. You're subscribed as of now (unsubscribe anytime).
3. THE DEAL ALERT — when something under-priced hits {{Neighborhood}}, my list hears first. Reply "alerts" to join.

Free forever, because informed people make confident moves — and confident movers eventually need an agent they already trust.

{{Agent}} · {{Brokerage}}`},

/* -- LUXURY: +3 each (has 5 already: call, vm, 2 email, text → add 2 call, 2 vm, 2 text, 2 email) -- */
{t:"luxury",ch:"call",adv:"Sharran Srivatsaa",title:"Luxury — The Private Market Call",body:
`YOU: {{Owner}}, {{Agent}} with {{Brokerage}}. I'll respect your time with directness: a family I represent is looking for a home like {{Address}} — specifically in your enclave — and they've asked me to make discreet inquiries before anything touches the open market.

I'm not asking you to sell your home. I'm asking whether — at the right number, with zero signs, zero strangers, and a closing built around YOUR calendar — a conversation would even be worth having.

Most owners say no, and that's a perfectly good answer. The few who say "what's the number?" tend to be glad they asked. Which are you?`},
{t:"luxury",ch:"call",adv:"Cheryl Eisen",title:"Luxury — The Presentation Audit Call",body:
`YOU: {{Owner}}, {{Agent}}. Your home has been on the market {{DOM}} days, and I'm going to say what your current agent may not: at this price point, the issue is almost never the home — it's the presentation of the identity buyers are purchasing.

Affluent buyers don't buy square footage; they buy the version of themselves your home promises. If the photography, staging, and story don't deliver that promise in the first five seconds, the price gets blamed for a presentation problem.

I'd like to walk {{Address}} and give you a presentation audit — the five-second test, room by room. If your current setup passes, I'll tell you that too. When can I see it?`},
{t:"luxury",ch:"vm",adv:"Ryan Serhant",title:"Luxury VM — The Out-of-Market Buyer",body:
`{{Owner}}, {{Agent}}. Your buyer probably doesn't live in {{City}} — that's the single most important fact about selling a home like yours. My last {{N}} closings at this level: buyers from out of state or overseas, found through film-quality marketing that travels, not yard signs that don't. I put together a two-minute concept of how {{Address}} launches to that audience. It'll be the best two minutes of marketing you've seen this year — {{Phone}}.`},
{t:"luxury",ch:"vm",adv:"Shea McGee",title:"Luxury VM — The Design Equity Note",body:
`{{Owner}}, this is {{Agent}}. I drove past {{Address}} this week and here's what struck me: homes with your bones are exactly the ones where design choices return five-to-one at sale. A few deliberate moves — lighting, texture, how each room announces itself — and buyers stop calculating price per square foot and start imagining dinner parties. If a sale is anywhere on your horizon, the smartest hour is a design walk-through BEFORE anything else. I'd love to give you that hour: {{Phone}}.`},
{t:"luxury",ch:"text",adv:"Ryan Serhant",title:"Luxury Text — The Discreet Probe",body:
`{{Owner}} — {{Agent}}, {{Brokerage}}. A serious buyer has asked me about homes in your enclave (nothing public, no listings involved). If a quiet, on-your-terms conversation about {{Address}} ever made sense, this is the low-pressure version of it. Worth a coffee?`},
{t:"luxury",ch:"text",adv:"Cheryl Eisen",title:"Luxury Text — The Staging Stat",body:
`{{Owner}}, {{Agent}} here. One number worth knowing before you list: professionally staged luxury homes in this market are averaging {{Pct}}% higher sale prices and half the market time. The walk-through that unlocks that is complimentary. This week or next?`},
{t:"luxury",ch:"email",adv:"Sharran Srivatsaa",title:"Luxury Email — The Wealth Architecture",body:
`Subject: {{Address}} as a balance-sheet decision

{{Owner}},

Homes at your level aren't just residences — they're the largest line on a balance sheet, and they deserve balance-sheet thinking.

Three numbers I prepare for owners in {{Enclave}}:
1. TODAY'S PRIVATE-MARKET VALUE — what discreet buyers would pay, off-market.
2. THE CARRY — what keeping it costs annually against alternatives.
3. THE ARBITRAGE — what the equity does redeployed, versus staying put.

Most owners review these once a decade, at a moment chosen by circumstance. The better ones review annually, at a moment chosen by them.

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
One — is the rent within $200 of market? (Most long-held rentals aren't.)
Two — when did you last raise it? (If you winced, that's the answer.)
Three — who takes the 2am call: you, or a manager taking 8%?

Here's why it matters: an under-rented, self-managed property is usually netting HALF what the equity could earn elsewhere. I run that comparison for {{City}} owners — current net versus market-rent net versus sold-and-redeployed net. Twenty minutes of my time, zero of yours. Where do I send it?`},
{t:"absentee",ch:"call",adv:"Pace Morby",title:"Absentee — The Terms Conversation",body:
`YOU: {{Owner}}, {{Agent}} here. You own {{Address}} free and clear (or close to it), and that puts you in a position most sellers don't know they have.

Everyone offers you two doors: keep dealing with tenants, or sell and hand a chunk to the IRS. There's a third door: sell on TERMS.

You become the bank. Full price — often above market. Monthly income continues, but no tenants, no toilets, no property tax. The tax hit spreads over years instead of landing at once.

It's not for everyone — you need to NOT need the lump sum. But for owners tired of managing who still want the income? It's the best-kept secret in real estate. Want the one-pager with real numbers for your property?`},
{t:"absentee",ch:"call",adv:"Bob Knakal",title:"Absentee — The Portfolio Review Call",body:
`YOU: {{Owner}}, {{Agent}} with {{Brokerage}}. I track ownership across {{Submarket}} and you hold {{N}} properties here — which makes you exactly who I build market intelligence for.

I'm not calling about selling anything. I'm calling because owners at your scale make three predictable mistakes: holding past peak rent growth, missing the refi window, and 1031-ing too late in the cycle.

Twice a year I prepare portfolio owners a one-page brief: where the cycle sits, what each holding would trade at, and which of the three mistakes is currently in season. No charge — the owners who read it tend to become clients eventually, and I play long games.

What's the best email for it?`},
{t:"absentee",ch:"vm",adv:"David Greene",title:"Absentee VM — The Remote Owner",body:
`{{Owner}}, {{Agent}} in {{City}}. Managing {{Address}} from {{TheirState}} means every small problem costs you double — the repair AND the coordination. I work with out-of-state owners weekly, so here's a standing offer: I'll be your local eyes, free. Rent check against market, condition drive-bys, and a real number if you ever want to trade the headache for equity. No commitment — out-of-state owners just deserve someone local who answers. {{Phone}}.`},
{t:"absentee",ch:"vm",adv:"Jerry Norton",title:"Absentee VM — The Simple Exit",body:
`{{Owner}}, this is {{Agent}} in {{City}}, about your property on {{Street}}. If it's performing and you're happy — delete this, sincerely. But if any part of it has become a chore: the tenant, the repairs, the taxes, the distance — I make clean exits happen. As-is, no showings parade, close when you want. One number, in writing, this week. {{Phone}}. Worst case, you know what walking away is worth.`},
{t:"absentee",ch:"vm",adv:"Ken McElroy",title:"Absentee VM — The Rent Gap",body:
`{{Owner}}, {{Agent}} — quick math on your rental at {{Address}}: units like it are renting for {{MarketRent}} right now. If you're below that, the gap times twelve is what politeness costs annually. Raise it, or sell while low rents make the LISTING look like opportunity to investors ("upside!"). Either way you win — but only if you know the number. It's free: {{Phone}}.`},
{t:"absentee",ch:"text",adv:"David Greene",title:"Absentee Text — The Eyes-On Offer",body:
`Hi {{Owner}}, {{Agent}} — local agent in {{City}}. You own {{Street}} from out of the area; I drive past it weekly. Standing offer: free rent-vs-market check + condition report whenever you want one. No strings — remote owners deserve local eyes. Want this quarter's?`},
{t:"absentee",ch:"text",adv:"Ken McElroy",title:"Absentee Text — The NOI Nudge",body:
`{{Owner}} — {{Agent}}, {{City}}. Rents near your {{Street}} property just printed {{MarketRent}}. If yours is under that, you're donating the difference. Want the 3-line math (current vs market vs sold-and-redeployed)? Free.`},
{t:"absentee",ch:"text",adv:"Pace Morby",title:"Absentee Text — The Third Door",body:
`Hi {{Owner}}, {{Agent}} here. Odd question about {{Street}}: if you could keep the monthly income but lose the tenants forever (selling on terms — you become the bank), would that be worth 10 minutes? Most owners have never heard the real version of this.`},
{t:"absentee",ch:"email",adv:"David Greene",title:"Absentee Email — The Long-Distance Playbook",body:
`Subject: Managing {{Street}} from {{TheirState}} — the honest math

{{Owner}},

Long-distance ownership works — I wrote the playbook on it — but only when three systems are in place. A quick self-audit:

1. PRICING: Is rent within 3% of market? (Local comps attached — you're currently {{Gap}}.)
2. PEOPLE: Do you have a manager, handyman, and agent who answer texts? (You're reading one of the three.)
3. EXIT CLARITY: Do you know TODAY'S sale number, so holding is a choice, not a default?

Most remote owners fail #3 — they hold by inertia. Your current numbers: rent {{Rent}}, market rent {{MarketRent}}, as-is sale value ~{{Value}}, equity ~{{Equity}}.

Whether you optimize or exit, do it on purpose. I'm happy to help with either — or just re-run these numbers for you each quarter, free.

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
`Subject: {{Address}} and the exchange window

{{Owner}},

A pattern I see with long-held income property: owners think about selling for two years, finally do it, and THEN discover the 1031 exchange timeline — 45 days to identify, 180 to close — is brutally short for finding quality replacement property.

The owners who win do it backwards: they identify what they'd exchange INTO first, then sell with the destination already scoped.

If {{Address}} is ever going to become something bigger, more passive, or out of state, the preparation should start a quarter before the listing. I run that process end to end — valuation, exchange strategy, replacement pipeline — and the first conversation is free.

Worth 20 minutes this month?

{{Agent}} · {{Brokerage}} · {{Phone}}`},

/* -- NOD: +3 each -- */
{t:"nod",ch:"call",adv:"Nicole Espinosa",title:"NOD — The Equity Defense Call",body:
`YOU: {{Owner}}, {{Agent}} — local agent, not an investor, and I'll prove it in one sentence: you likely have equity worth protecting, and everyone else calling wants it.

Here's the math nobody explains: if your home's worth {{Value}} and you owe {{Debt}}, that gap is YOUR money — but only while YOU control the sale. At auction, that same gap becomes some bidder's discount.

Every option on your table — reinstate, modify, sell, even a graceful exit with cash for your next deposit — works better with more time. The notice started a clock, not a verdict.

I'll map every option with real numbers, free, this week. The only thing I ask: don't sign ANYTHING from the door-knockers until you've seen the map. Fair?`},
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
`{{Owner}}, {{Agent}}, local agent in {{City}}. One thing about the notice on {{Address}} that the letters bury: the timeline has SPECIFIC dates where options expire — reinstatement has one deadline, sale-with-equity has another, and they're months apart. Most owners treat it as one big countdown and panic. It's actually a sequence, and knowing the sequence is power. I'll walk you through your exact dates, free, ten minutes: {{Phone}}.`},
{t:"nod",ch:"vm",adv:"Brandon Mulrenin",title:"NOD VM — The Permission Ask",body:
`Hi {{Owner}}, {{Agent}} — local agent. I'm sure every message this week has told you what to do, so I won't. One question instead: would you be opposed to knowing what your home would actually sell for today — not to decide anything, just so every choice you make this month is made knowing that number? It changes more decisions than any advice does. Free, in writing, no meeting: {{Phone}}.`},
{t:"nod",ch:"text",adv:"Nicole Espinosa",title:"NOD Text — The Deadline Decoder",body:
`{{Owner}}, {{Agent}} here (local agent, not an investor). The notice on {{Address}} has 3 different deadlines buried in it — most owners miss the one that matters most. Want me to decode your exact dates? Free, takes me 10 min, no meeting.`},
{t:"nod",ch:"text",adv:"Laurel Starks",title:"NOD Text — The Two-Owner Note",body:
`Hi {{Owner}}, {{Agent}} — local agent. When a notice involves two owners, BOTH have to act for most options to work — and time splits nobody's way. I send both parties identical info, always. Want the option map sent to you both?`},
{t:"nod",ch:"text",adv:"Pace Morby",title:"NOD Text — The Keep-The-House Angle",body:
`{{Owner}} — {{Agent}} here. Before you assume selling is the only way out: there are structures where an investor brings the loan current and you STAY (lease-back, equity share, subject-to payoff plans). Not always possible, but worth 10 min before any bigger decision. Want the honest version?`},
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
`Subject: The options between "catch up" and "give up"

{{Owner}},

The letters give you two choices: pay everything you're behind, or lose the house. There's a whole menu between those that nobody mails you:

- SUBJECT-TO PAYOFF: an investor brings the loan current and takes over payments; you walk away clean with cash, credit intact.
- LEASE-BACK: sell, stay as a tenant, keep the kids in their school. Sometimes with a buy-back option.
- EQUITY PARTNERSHIP: someone cures the default for a share of the equity; you keep the home.
- SELLER-FINANCED EXIT: you sell on terms and turn the crisis into monthly income.

Every one has real trade-offs and real scams that imitate it — the difference is in the paperwork, and I'll show you what to look for even if you never work with me.

The menu is free. {{Phone}}, or reply here.

{{Agent}}`},

/* -- TAX: +3 each -- */
{t:"tax",ch:"call",adv:"Nicole Espinosa",title:"Tax Default — The Stacked Problems Call",body:
`YOU: {{Owner}}, {{Agent}}, local agent. I work with owners on the county's tax-default list, and here's what I've learned: the taxes are almost never the whole story. Usually something upstream caused them — a job change, a health thing, an inherited house that's more burden than blessing.

So instead of lecturing you about deadlines, let me ask: what's the real situation with {{Address}}?

(listen — the answer determines everything)

Okay. Whatever the story, the good news is the same: while you're in the redemption window, YOU hold the cards. Payment plan, bring it current, or sell and walk away with your equity minus the taxes. All three beat the auction, where your equity becomes someone's win at your expense. Which one should we price out first?`},
{t:"tax",ch:"call",adv:"Pace Morby",title:"Tax Default — The Equity Rescue Call",body:
`YOU: {{Owner}}? {{Agent}} here. Straight to it: the county lists {{Address}} as tax-defaulted, and if the number's grown past what's easy to write a check for, I have options most callers don't.

The usual pitch is "sell to me cheap before the auction." Mine is different: there are investors — I'm one, I know others — who will PAY THE TAXES today in exchange for a piece of the deal, not the whole thing. You keep the house, or you sell on your schedule instead of the county's.

Costs you nothing to see the structure in writing. If the taxes are handled some other way already — even better, tear it up. Can I send it?`},
{t:"tax",ch:"call",adv:"Bill Gross",title:"Tax Default — The Inherited-House Call",body:
`YOU: {{Owner}}, my name's {{Agent}} — local agent. County records show the taxes on {{Address}} have gone unpaid a while, and when I see that pattern with a long-held family home, it usually means one thing: the person who always handled it... isn't handling things anymore.

If I'm close: first, I'm sorry. Second — this exact situation is my specialty. Inherited homes with tax arrears usually ALSO have title tangles: a probate that never happened, siblings who don't agree, a trust nobody funded.

The tax clock doesn't wait for family consensus, but there are legal moves that pause the bleeding while the family sorts things out. Fifteen minutes and I'll tell you which apply. No cost, and I work alongside your attorney if you have one.`},
{t:"tax",ch:"vm",adv:"Nicole Espinosa",title:"Tax VM — The No-Shame Message",body:
`{{Owner}}, {{Agent}} — local agent, and before anything else: tax trouble happens to good people constantly. Medical year, job gap, inherited house nobody planned for. No shame, just math. The county gives you a redemption window and inside it you have three clean outs — payment plan, catch-up, or sell keeping your equity. Outside it, the auction takes the choice away. I map the three for free: {{Phone}}. The map is worth more than the lecture, I promise.`},
{t:"tax",ch:"vm",adv:"Bill Gross",title:"Tax VM — The Title Check",body:
`{{Owner}}, {{Agent}}, local agent in {{County}}. Beyond the taxes on {{Address}} — one thing owners in your spot discover too late: if the title has any tangle (an old probate, a deceased co-owner, a trust issue), fixing it takes MONTHS, and the redemption deadline doesn't extend for paperwork. I check title condition free before it's urgent. Ten minutes now saves ninety days later: {{Phone}}.`},
{t:"tax",ch:"vm",adv:"Jerry Norton",title:"Tax VM — The Clean Number",body:
`{{Owner}}, {{Agent}} in {{City}} — about {{Address}} on the county tax roll. Simplest voicemail you'll get this week: I'll bring you ONE written number for the house as-is — taxes paid at closing out of proceeds, rest is yours, close on your calendar. If the number's wrong, no hard feelings. But walking into any county deadline without knowing your cash-out number is negotiating blind. {{Phone}}.`},
{t:"tax",ch:"text",adv:"Nicole Espinosa",title:"Tax Text — The Three Outs",body:
`{{Owner}}, {{Agent}} here (local agent). The tax default on {{Address}} has 3 clean exits while the redemption window's open: payment plan, catch-up, or sell keeping your equity. I'll price all 3 for you free — takes one text back: which one do you WANT to work?`},
{t:"tax",ch:"text",adv:"Bill Gross",title:"Tax Text — The Family Home Question",body:
`Hi {{Owner}}, {{Agent}} — local agent. Is {{Address}} an inherited/family property? Tax arrears + inherited homes usually means a title issue is hiding too — and those take months to fix while the county clock runs. Free title check if you want it.`},
{t:"tax",ch:"text",adv:"Pace Morby",title:"Tax Text — The Taxes-Paid Play",body:
`{{Owner}} — {{Agent}}. Different angle on the {{Address}} taxes: there are structures where an investor PAYS the tax bill today and you keep the house (equity share / payoff plans). Not a gimmick, real paperwork. Want the honest one-pager?`},
{t:"tax",ch:"email",adv:"Bill Gross",title:"Tax Email — The Sequence Letter",body:
`Subject: {{Address}}: the order to fix things in

{{Owner}},

When a property has tax arrears, owners usually attack the tax bill first. That's backwards about half the time. The right order:

1. TITLE FIRST — if there's any tangle (unprobated estate, deceased co-owner, unrecorded deed), start the legal fix NOW. It's the slowest piece and everything else waits on it.
2. COUNTY SECOND — installment plans stop the auction clock with a surprisingly small first payment.
3. DECISION THIRD — keep (now that it's stabilized) or sell (now that it's sellable). A tangled title can't close; a stabilized one can.

I've walked {{County}} owners through this sequence for years, alongside their attorneys when needed. The 15-minute version of where YOUR situation sits: free.

{{Agent}} · {{Brokerage}} · {{Phone}}`},
{t:"tax",ch:"email",adv:"Nicole Espinosa",title:"Tax Email — The Real Numbers Letter",body:
`Subject: {{Address}} — your three numbers

{{Owner}},

Every choice about the tax default comes down to three numbers most owners never see side by side:

1. THE CURE: taxes + penalties to bring it current = {{Cure}}
2. THE PLAN: county installment first payment ≈ {{Plan}} (stops the auction clock)
3. THE EXIT: what you'd walk away with selling as-is, taxes paid from proceeds ≈ {{Net}}

Look at those three and the decision usually makes itself — keep and cure, keep and plan, or take the equity and be done.

I'll fill in your actual figures this week, free. The only losing move is deciding without them.

{{Agent}} · {{Brokerage}} · {{Phone}}`},
{t:"tax",ch:"email",adv:"Ken McElroy",title:"Tax Email — The Investor-Owner Letter",body:
`Subject: The {{Street}} property: burden math

{{Owner}},

Investors fall behind on property taxes for one honest reason: the property stopped earning its keep, and every bill for it feels like throwing good money after bad.

If that's {{Address}}, run the burden math with me:
- Annual carry (taxes + insurance + maintenance): {{Carry}}
- Actual income: {{Income}}
- The gap, funded from your pocket: {{Gap}}/year

An asset with a negative gap and rising tax penalties isn't an investment — it's a subscription you forgot to cancel. Selling as-is (arrears paid at closing) converts it back into capital that can actually work.

I'll run your specific numbers free. If the property still pencils, I'll tell you that too — I have no interest in talking anyone out of a performing asset.

{{Agent}} · {{Brokerage}} · {{Phone}}`},

/* -- PROBATE: +3 each -- */
{t:"probate",ch:"call",adv:"Bill Gross",title:"Probate — The Court-Process Call",body:
`YOU: Hi {{Name}}, my name is {{Agent}} — I'm a local agent who specializes in {{County}} probate sales, and I'll keep this short out of respect for what your family's going through.

One thing I tell every executor early, because nobody else does: in California, HOW the sale happens depends on the authority the court gave you. Full authority under IAEA means you can sell almost like a normal listing. Limited authority means court confirmation, overbid hearings, different timelines — a completely different playbook.

Do you know yet which one your Letters granted? ... That single answer changes your price strategy, your buyer pool, and your timeline. I map it all out for families at no charge — the attorney handles the law, I handle the property. Would that map help this week?`},
{t:"probate",ch:"call",adv:"Al Nicoletti",title:"Probate — The Attorney-Partner Call",body:
`YOU: {{Name}}, {{Agent}} here — I work alongside probate attorneys on the real-estate side of estates. Quick but important question: does the estate have counsel yet?

(if yes:) Perfect — then my role is simple. Your attorney moves the case; I make sure the PROPERTY never becomes the bottleneck: valuation for the inventory, securing and insuring a vacant house, and when the time comes, a sale that matches the court's requirements. All coordinated THROUGH your attorney, never around them.

(if no:) Then let's fix that first — I'll introduce you to two or three excellent {{County}} probate attorneys and you pick. The right attorney saves months. THEN we talk about the house.

Either way — what's the property situation today: occupied, vacant, or "we're not sure what's in there yet"?`},
{t:"probate",ch:"call",adv:"Chad Corbett",title:"Probate — The Vacant House Call",body:
`YOU: {{Name}}, {{Agent}} — local agent, and I'll get right to the concern: county records suggest the home on {{Street}} may be sitting vacant since {{Deceased Name}} passed. I'm sorry for your loss — and I want to flag three quiet risks nobody warns families about:

One — most homeowner's insurance quietly voids after 30-60 days of vacancy. A pipe burst next month might not be covered.

Two — vacant homes get noticed: by squatters, by thieves who target copper and appliances, and by the county.

Three — deferred small stuff (a roof leak, a dead lawn) eats sale value fast.

I check on estate properties for families as a free service: photos, utilities check, insurance-safe status. Total honesty: someday, if the family sells, I hope you remember me. Until then — can I put eyes on the house this week?`},
{t:"probate",ch:"vm",adv:"Chad Corbett",title:"Probate VM — The One Less Thing",body:
`Hi {{Name}}, {{Agent}} — local agent. I know settling {{Deceased Name}}'s affairs is a long list, and the house is somewhere on it. My whole practice is making that item lighter: the cleanout, the utilities, the insurance, the eventual keep-rent-or-sell decision — with numbers for all three, whenever the family's ready. No timeline, no pressure. When the house becomes the thing you're dealing with, I'm {{Phone}}. Until then, take care of each other.`},
{t:"probate",ch:"vm",adv:"Bill Gross",title:"Probate VM — The Authority Question",body:
`{{Name}}, {{Agent}} — local agent specializing in {{County}} probate. One question that saves families months: has the court granted full or limited authority? The answer changes everything about selling — timeline, pricing, even which buyers can bid. Most families don't know theirs, and most agents never ask. I'll explain what yours means in plain English, free: {{Phone}}. The right process is the difference between a clean sale and a stalled one.`},
{t:"probate",ch:"vm",adv:"Al Nicoletti",title:"Probate VM — The No-Attorney Flag",body:
`{{Name}}, this is {{Agent}}, local agent. If the estate already has a probate attorney — great, ignore everything except this: I work WITH counsel, handling the property side. But if there's NO attorney yet, please hear this: the filing order and the forms matter enormously, and DIY probate mistakes cost families months and real money. I'll introduce you to excellent {{County}} probate attorneys, free, no strings — choosing well is the single highest-leverage move you'll make. {{Phone}}.`},
{t:"probate",ch:"text",adv:"Chad Corbett",title:"Probate Text — The Property Check",body:
`Hi {{Name}}, {{Agent}} — local agent. If the home on {{Street}} is sitting vacant during the estate process: quick heads-up that insurance usually lapses after 30-60 vacant days. I do free property checks for families (photos, utilities, insurance status). Want one this week?`},
{t:"probate",ch:"text",adv:"Bill Gross",title:"Probate Text — Full or Limited",body:
`{{Name}}, {{Agent}} here (probate-specialized local agent). One question that changes your whole sale plan: did the court grant FULL or LIMITED authority? If you're not sure, I'll explain both in 5 min — the difference is months of timeline. Free.`},
{t:"probate",ch:"text",adv:"Al Nicoletti",title:"Probate Text — The Timeline Ask",body:
`Hi {{Name}}, {{Agent}} — I handle the property side of {{County}} estates. Quick one: has the estate's inventory & appraisal been filed yet? That milestone unlocks the property options. If the sequence feels foggy, I'll send the plain-English timeline — free.`},
{t:"probate",ch:"email",adv:"Chad Corbett",title:"Probate Email — The Family Meeting Agenda",body:
`Subject: When the family talks about the house — an agenda that keeps the peace

{{Name}},

At some point the family will sit down and talk about {{Street}}. Those conversations go one of two ways: everyone leaves aligned, or the house becomes the thing that divides people who just lost someone.

The difference is usually structure. Attached is the agenda I give families — three questions, in order:

1. WHAT DOES IT COST TO KEEP? (taxes, insurance, upkeep — real annual number)
2. WHAT WOULD IT RENT FOR? (income minus management headaches, honestly stated)
3. WHAT WOULD IT NET IF SOLD? (after everything — the number that ends speculation)

Families who see all three numbers argue less, because opinion turns into arithmetic. I prepare all three at no charge, before the meeting — so the meeting is about the FAMILY's wishes, not competing guesses.

Whenever you're ready.

{{Agent}} · {{Brokerage}} · {{Phone}}`},
{t:"probate",ch:"email",adv:"Bill Gross",title:"Probate Email — The Court Sale Playbook",body:
`Subject: Selling estate property in {{County}} — the plain-English version

{{Name}},

When you're ready (no rush), here's the plain-English version of how estate sales actually work here:

WITH FULL AUTHORITY (IAEA): you can list, accept an offer, and close much like a normal sale — with a Notice of Proposed Action to heirs instead of court confirmation. Fastest, cleanest, most buyer-friendly.

WITH LIMITED AUTHORITY: the sale goes through court confirmation — a hearing, a possible overbid auction in the courtroom, and specific deposit rules. Slower, but very manageable when the agent has done it before. (I have, many times.)

EITHER WAY: pricing must respect the probate referee's appraisal, and the buyer pool should be told what kind of sale this is UP FRONT — surprised buyers cancel; prepared ones close.

That's 80% of what families need to know. The other 20% is specific to your case — free conversation, whenever it helps.

{{Agent}} · {{Brokerage}} · {{Phone}}`},
{t:"probate",ch:"email",adv:"Al Nicoletti",title:"Probate Email — The Heir Alignment Letter",body:
`Subject: When heirs disagree about the property

{{Name}},

A hard truth from years around estates: the house is where sibling disagreements go to become permanent. One heir wants to keep it, one needs money now, one lives out of state and just wants it over.

What actually works:

1. NUMBERS BEFORE OPINIONS. Keep/rent/sell — three written numbers, from a neutral party, before anyone stakes out a position.
2. ONE POINT OF CONTACT. Every heir gets identical information simultaneously. (This is non-negotiable in how I work — favoritism, even accidental, poisons estates.)
3. THE ATTORNEY SETS THE LANES. What requires unanimity, what the executor can decide alone — knowing this early prevents the fight, because everyone knows what's actually decidable.

If your family is anywhere near this crossroads, I can provide #1 and #2 within a week, and work inside whatever lanes your attorney draws.

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
`YOU: {{Name}}, {{Agent}} — local agent who works with families in transition. You mentioned the divorce is in progress, so before anything else, one piece of timing insight that saves people real money:

WHEN you sell relative to the judgment changes the tax picture. Sell while married-filing-jointly and you may exclude up to $500K of gain; wait until after, and each ex-spouse's exclusion, basis, and buyout math shifts. Your CPA and attorney own that decision — my job is making sure you're ASKING it before the choice gets made by default.

So: has anyone put the sell-now versus sell-after numbers side by side for you two? ... That's the analysis I prepare, both parties copied, attorneys welcome to review. Want it in both inboxes this week?`},
{t:"divorce",ch:"vm",adv:"Chris Voss",title:"Divorce VM — The Reluctant Party",body:
`{{Name}}... {{Agent}}, local agent. (unhurried) It sounds like everyone in this process wants something from you — a signature, a date, a decision. I'm not calling to add to the pile. When a house has to be sold in circumstances nobody chose... the person who feels steamrolled usually has the power to slow everything down — and usually should, until the process respects them. If you want the version of this where YOU set the terms of engagement... I'm at {{Phone}}. No signature required to talk.`},
{t:"divorce",ch:"vm",adv:"Laurel Starks",title:"Divorce VM — The Court-Ordered Sale",body:
`{{Name}}, {{Agent}} — I understand the court has ordered the residence sold. That order feels like losing control; the process doesn't have to. My role in court-ordered sales: both parties get identical information at identical times, every decision is documented for counsel, and the house sells for full market value — not the fire-sale number people fear. I've done this many times under every level of cooperation, including none. Your attorney can verify my process before we speak: {{Phone}}.`},
{t:"divorce",ch:"vm",adv:"Sharran Srivatsaa",title:"Divorce VM — The Fresh Start Number",body:
`{{Name}}, {{Agent}} with {{Brokerage}}. In every divorce there's a number that makes the next chapter real: what the house nets, split per the agreement, and what that buys each of you going forward. Most people negotiate for months without ever seeing that number precisely — arguing over a fog. I prepare it neutrally, both parties copied: net sheet, division scenarios, and each person's realistic next-home budget. Clarity first; decisions after. {{Phone}}.`},
{t:"divorce",ch:"text",adv:"Laurel Starks",title:"Divorce Text — The Neutral Offer",body:
`Hi {{Name}}, {{Agent}} — local agent who works divorce sales as a strict neutral (both parties get identical info, attorneys copied on everything). If the {{Street}} house needs a valuation both sides can trust, I can deliver it to both inboxes this week. OK to send my one-page process?`},
{t:"divorce",ch:"text",adv:"Chris Voss",title:"Divorce Text — The Slow-Down Text",body:
`{{Name}} — {{Agent}} here. It seems like the house decision is being rushed at you. For what it's worth: the party who insists on a clean process usually ends up with a better outcome than the one who just pushes. If you want the checklist of what a fair sale process looks like — no strings — say the word.`},
{t:"divorce",ch:"text",adv:"Al Nicoletti",title:"Divorce Text — The Tax Timing Flag",body:
`Hi {{Name}}, {{Agent}}. One flag worth raising with your attorney early: selling the house BEFORE vs AFTER the judgment can change the capital-gains exclusion by up to six figures. Want the one-page explainer to bring to your next meeting? Free.`},
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
`Subject: The number that ends the argument

{{Name}},

Most divorcing couples argue about the house in adjectives — "it's worth more," "we can't afford to keep it." The argument ends when adjectives become arithmetic:

SCENARIO A — SELL NOW: market value, minus loan, minus costs = net to divide. Each party's share, and what that share buys/rents in today's market.
SCENARIO B — ONE KEEPS IT: buyout number, refinance reality check (can one income qualify?), and what the keeping spouse gives up elsewhere in the settlement.
SCENARIO C — HOLD AND SELL LATER: carrying cost split, market risk, and the tax exclusion you may forfeit by waiting.

I prepare all three, neutrally, both parties and counsel copied. Decisions come easier when everyone's arguing about the same numbers.

One week to prepare. Shall I?

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
`(seller-side: the inspection response just came in heavy)

YOU: {{Owner}}, inspection response is in. Before you read it and get angry, let me reframe it: this is not a repair list, it's an OPENING POSITION. Buyers' agents pad these because sometimes sellers just... pay.

Our move is math, not emotion. I've sorted their asks three ways:

SAFETY/LENDER ITEMS — the {{Item}} — we address these; any buyer's lender would demand them anyway.
REAL-BUT-NEGOTIABLE — worth a credit at 50-70 cents on the dollar; credits close cleaner than contractors.
WISH-LIST PADDING — cosmetic asks that die the moment we say no politely.

My proposed response protects your net at {{Number}} while giving them a win to take back to their clients. Every negotiation needs both sides to bring home a story. Want me to send it tonight?`},
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
`Subject: {{Address}} appraisal — the formal rebuttal, attached

Team,

The appraisal came in {{Gap}} under contract. Before anyone renegotiates against themselves, the rebuttal package is attached:

1. TWO SUPERIOR COMPS the appraiser missed — {{Comp1}} and {{Comp2}} — both closed inside the window, both more similar than two he used.
2. ADJUSTMENT ERRORS: his {{Feature}} adjustment is against the market data (documented, page 3).
3. PENDING SALE at {{Address2}} that will close above our contract price within two weeks — the market is literally proving our number as we argue about it.

Reconsideration of value goes to the lender today. Historical odds of ROVs succeeding with comp-level evidence are meaningful — and even a partial correction changes the renegotiation math entirely.

Nobody moves numbers until the ROV answers. That's the discipline that protects everyone's deal.

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
`YOU: {{Owner}}, {{Agent}} — commercial agent in {{City}}. Your space at {{Address}} has been sitting empty about {{Months}} months, and every month is roughly {{Rent}} you never get back.

Straight diagnosis from the outside: at this rent and this condition, you're priced for a tenant that this corridor isn't producing. Three fixes, cheapest first:

One — REPACKAGE: better photos, a floor plan, and listing where {{Use Type}} tenants actually search. Costs almost nothing; fixes more vacancies than people admit.
Two — RESLICE: that footprint divides into two smaller suites — smaller spaces are what's moving here.
Three — REPRICE with escalations: start lower, bake in bumps, protect the pro forma.

I fill spaces on this corridor — it's my niche. Want the 15-minute walk-through version with actual comps?`},
{t:"cre",ch:"call",adv:"Ken McElroy",title:"CRE — The Value-Add Reposition Call",body:
`YOU: {{Owner}}, {{Agent}}. Your building on {{Street}} is what I'd call a sleeping asset — solid bones, below-market rents, tired operations. That's not an insult; it's a purchase order. Value-add buyers pay premiums for exactly that upside right now.

Which puts you at a fork:

CAPTURE IT YOURSELF: renovate units on turnover, push rents to market over 18-24 months, refinance at the new NOI. I'll model the budget and the payoff.

SELL THE UPSIDE: let a buyer pay you today for tomorrow's rents. In this cap-rate environment, upside sells at a premium — sometimes more than the renovation math nets you, with none of the work.

The deciding factor is honest: do you have the appetite for two more years of operating? If yes, capture. If the appetite left years ago — and for most owners at your hold length it has — sell the story. I'll price both paths this week.`},
{t:"cre",ch:"call",adv:"Sharran Srivatsaa",title:"CRE — The Professional-Owner Call",body:
`YOU: {{Owner}}, {{Agent}} with {{Brokerage}}. You own commercial property AND run a business — which means the building is the investment you have the least time to manage professionally.

Here's what my commercial-owner clients get quarterly, and what I'd like to send you free this quarter to earn the relationship:

- MARK-TO-MARKET: what the building would trade at TODAY, not what it appraised at last refi.
- LEASE AUDIT: which tenants are under market, when the bumps hit, where the rollover risk sits.
- THE MOVE: the one action this quarter — a renewal to lock early, a refi window, a tax angle worth asking your CPA about.

One page. Real numbers. If it's not the most useful thing in your inbox that week, unsubscribe me from your business forever. Email?`},
{t:"cre",ch:"vm",adv:"Bob Knakal",title:"CRE VM — The Off-Market Bid",body:
`{{Owner}}, {{Agent}} with {{Brokerage}}. Not a listing call: I have an exchange buyer with a closing deadline — a 1031 clock running — who needs {{Asset Type}} in {{Submarket}} and has authorized me to approach owners directly. Deadline buyers pay for certainty; it's the best seller's position that exists. If a quiet, no-listing conversation about {{Address}} interests you at the right number, call me this week — after their 45-day window, this call is worthless to both of us. {{Phone}}.`},
{t:"cre",ch:"vm",adv:"Tyler Cauble",title:"CRE VM — The Lease Expiry Heads-Up",body:
`{{Owner}}, {{Agent}} — commercial agent in {{City}}. Public record + a little legwork says your lease with {{Tenant}} at {{Address}} likely rolls in the next 12-18 months. That window is where owners either capture the {{Pct}}% rent growth this corridor just printed — or sign another five years at yesterday's number because the tenant asked nicely. Renewal strategy is a 20-minute conversation and it's free: {{Phone}}. The rent bump pays for a lot of 20-minute conversations.`},
{t:"cre",ch:"vm",adv:"Ken McElroy",title:"CRE VM — The Expense Leak",body:
`{{Owner}}, {{Agent}}. Quick one on {{Address}}: buildings your vintage in {{City}} are running expense ratios around {{Pct}}% — and when I see a long-held property with original systems and one owner, it's usually running well above that. Every point of expense ratio is real money off your NOI, and at today's cap rates, every NOI dollar is {{Multiple}} dollars of value. Free expense benchmark against your building's peers: {{Phone}}. Plug the leaks before you refi or sell — or just keep the cash flow.`},
{t:"cre",ch:"text",adv:"Bob Knakal",title:"CRE Text — The Deadline Buyer",body:
`{{Owner}} — {{Agent}}, {{Brokerage}}. I represent a 1031 buyer on a 45-day identification clock who needs {{Asset Type}} in your submarket. Deadline buyers overpay for certainty. If {{Address}} has a number, this is the week it's worth the most. Coffee?`},
{t:"cre",ch:"text",adv:"Tyler Cauble",title:"CRE Text — The Corridor Comp",body:
`{{Owner}}, {{Agent}} here (commercial, {{City}}). Two spaces near {{Address}} just leased at {{Rate}}/sf — meaningfully above where your corridor was last year. If any of your leases roll in the next 18 months, that number changes your math. Want both comps? Free.`},
{t:"cre",ch:"text",adv:"Ken McElroy",title:"CRE Text — The Cash-Flow Check",body:
`{{Owner}} — {{Agent}}. One-question audit for {{Address}}: is the building making you money, or are you making the building money? If you have to think about it, the free NOI benchmark I run for {{City}} owners is worth 10 minutes. Want it?`},
{t:"cre",ch:"email",adv:"Bob Knakal",title:"CRE Email — The Market Cycle Letter",body:
`Subject: Where {{Submarket}} sits in the cycle — owner's brief

{{Owner}},

The quarterly brief I send building owners, condensed to one screen:

PRICING: {{Asset Type}} in {{Submarket}} is trading at {{CapRange}} caps — {{Direction}} from last year. Every 25bps of cap movement swings your building's value roughly {{Swing}}.
VELOCITY: {{N}} closed sales this quarter; {{Days}} average marketing time. Buyers exist; they're just slower and pickier.
THE 1031 FLOW: exchange money is {{Flow}} — deadline buyers remain the best bid in the market for sellers who can move quickly.
BOTTOM LINE FOR YOU: owners at your basis and hold length are {{Position}}. The move worth pricing this quarter: {{Move}}.

The full version with your building's specific mark-to-market is a 20-minute meeting. Standing offer.

{{Agent}} · {{Brokerage}} · {{Phone}}`},
{t:"cre",ch:"email",adv:"Tyler Cauble",title:"CRE Email — The NNN Upgrade Path",body:
`Subject: {{Address}}: from hands-on to mailbox money

{{Owner}},

You've owned {{Address}} long enough to have done every landlord job twice. Here's the upgrade path owners at your stage take:

STEP 1 — MAXIMIZE: get the current leases to market with escalations. (Your corridor just printed {{Rate}}/sf — comps attached.)
STEP 2 — STABILIZE: a property with fresh, market-rate leases and 3+ years of term sells at a premium cap.
STEP 3 — TRADE: 1031 the proceeds into true NNN — single tenant, corporate guarantee, tenant pays taxes/insurance/maintenance. Your involvement becomes depositing checks.

Owners skip step 1 and 2 constantly and leave six figures on the table by selling messy. The whole sequence takes 12-18 months and I quarterback all of it.

Want the version with your actual numbers?

{{Agent}} · {{Brokerage}} · {{Phone}}`},
{t:"cre",ch:"email",adv:"Sharran Srivatsaa",title:"CRE Email — The Family Balance Sheet",body:
`Subject: The building, the family, and the next 10 years

{{Owner}},

A pattern with family-held commercial property: the building outlives the plan for it. It was Dad's investment, then it was steady income, and now it's an asset nobody actively manages, held by default, waiting for a family meeting that never quite happens.

If any of that rings true for {{Address}}, three questions worth answering while every option is open:

1. Does anyone in the next generation WANT to operate it? (Honest answers only — inheriting a job isn't a gift.)
2. What's the step-up-in-basis math? Sometimes holding until transfer beats selling — your CPA and I can model both.
3. If it were cash today, would the family buy THIS building with it? If no, the market is offering you an exit at premium pricing.

I facilitate these conversations for property families — numbers first, neutrally presented. It's the most valuable meeting most families never schedule.

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
`YOU: {{Owner}}, {{Agent}}. You said the payoff quote killed the last deal — low balance, low rate, and after fees there's nothing left at your price. Perfect setup for the tool most agents never mention: selling SUBJECT-TO.

Plain English: the buyer takes over your payments — your loan stays in place, they pay it every month, with paperwork that protects you: deed transfers, servicing agreement, catch-up of any arrears at closing.

Why would you do that? Because a buyer who inherits your {{Rate}}% rate can afford to pay you MORE for the house — often full price — since their monthly cost stays sane.

Real risks exist — the due-on-sale clause, servicing discipline — and I'll walk you through every one with the actual documents, plus how the escrow protects you. It's not exotic; it's just unfamiliar. Twenty minutes, everything on the table?`},
{t:"invest",ch:"call",adv:"David Greene",title:"Invest — The Keep-vs-Sell Portfolio Call",body:
`YOU: {{Owner}}, {{Agent}}. Before you sell {{Address}}, let me argue against my own commission for a minute — because you might be holding a keeper.

The BRRRR math on your place: it's worth {{Value}}, you owe {{Debt}}. A cash-out refi at 75% pulls roughly {{CashOut}} TAX-FREE — versus selling, where the IRS takes its bite of the gain.

Rent covers the new payment at {{Rent}}, so the tenant services the debt while you redeploy the cash into the next property. That's how portfolios compound: never sell the golden goose, borrow the eggs.

Selling is still right if: you're done being a landlord, the property's a management headache, or the equity has a better home. So which are you — building, or simplifying? Both have a right answer, and I work both sides of it.`},
{t:"invest",ch:"vm",adv:"Tarek El Moussa",title:"Invest VM — The Contractor Reality",body:
`{{Owner}}, {{Agent}} — about {{Address}}. You mentioned fixing it up first, so real talk from someone who's renovated hundreds: the {{Reno}} you're planning runs {{Cost}} at today's contractor prices — if your contractor shows up, finishes on time, and doesn't find surprises, which is a lot of ifs. The market pays back barely more than that cost right now for that scope. Before you write checks: I'll tell you which two repairs actually return money and which to skip entirely. Free, 10 minutes, could save you {{Savings}}: {{Phone}}.`},
{t:"invest",ch:"vm",adv:"Pace Morby",title:"Invest VM — The Full-Price Terms Offer",body:
`{{Owner}}, {{Agent}} here about {{Street}}. You want {{Price}} and the cash buyers keep offering less — what if the problem is the STRUCTURE, not the number? On terms — payments over time, you as the bank — I can often meet a full asking price, because time is worth money and I'm buying with time. Better for taxes too, usually (ask your CPA about installment sales). Ten minutes, real paperwork samples, no pressure: {{Phone}}.`},
{t:"invest",ch:"vm",adv:"David Greene",title:"Invest VM — The Out-of-Area Investor",body:
`{{Name}}, {{Agent}} in {{City}}. You invest from out of the area, so one local heads-up: {{Neighborhood}} just {{Change}} — the kind of shift that changes buy-box math before the data sites catch it. My out-of-state investors get this stuff in real time, plus boots-on-ground for walkthroughs and rehab bids. If your buy-box includes {{City}}, let's sync it: {{Phone}}. Long-distance investing works — with the right eyes local.`},
{t:"invest",ch:"text",adv:"Tarek El Moussa",title:"Invest Text — The Two-Numbers Text",body:
`{{Owner}} — {{Agent}}. Two numbers for {{Address}}, both free: (1) as-is cash number, close in 2 weeks, zero repairs. (2) fixed-up retail number minus realistic reno costs + 4 months of carrying. Most owners guess wrong about which nets more. Want both by Friday?`},
{t:"invest",ch:"text",adv:"Jerry Norton",title:"Invest Text — The Proof-of-Funds Text",body:
`Hi {{Owner}}, {{Agent}} here re: {{Street}}. Fair warning about cash buyers: half the "offers" out there are wholesalers with no money hoping to flip the contract. Any offer I bring comes with proof of funds attached, or it doesn't come. Want a real one this week?`},
{t:"invest",ch:"text",adv:"David Greene",title:"Invest Text — The Rental Analysis",body:
`{{Owner}} — {{Agent}}. Before you sell {{Address}}: it rents for ~{{Rent}}, which at your likely loan balance might cash-flow better than the sale nets you. I'll run sell-vs-rent side by side, free. 80% choose differently after seeing both. Want it?`},
{t:"invest",ch:"email",adv:"Tarek El Moussa",title:"Invest Email — The Renovation ROI Letter",body:
`Subject: {{Address}}: the repairs that pay and the ones that don't

{{Owner}},

Everyone tells sellers to "fix it up first." Nobody shows them the receipts. From hundreds of renovations, here's what actually returns money in this market:

PAYS BACK 2-4X: paint (whole interior), landscaping the first impression, lighting fixtures, deep clean + staging.
BREAKS EVEN-ISH: flooring, kitchen refresh (counters/hardware — NOT full remodel), bathroom vanities.
LOSES MONEY AT SALE: full kitchen gut, room additions, high-end finishes in a mid-range neighborhood, anything structural you could disclose-and-credit instead.

For {{Address}} specifically: I'd do {{ShortList}} and nothing else — about {{Cost}} for roughly {{Return}} in added price.

Or skip all of it and take the as-is number: {{AsIs}}. Sometimes the best renovation is none.

Both paths priced honestly, one walkthrough: {{Phone}}.

{{Agent}} · {{Brokerage}}`},
{t:"invest",ch:"email",adv:"Pace Morby",title:"Invest Email — The Creative Toolbox",body:
`Subject: 5 ways to sell {{Address}} (4 of them nobody's shown you)

{{Owner}},

Every agent shows you door #1. Here's the full toolbox:

1. RETAIL LISTING — top price, but repairs, showings, and 60-90 days.
2. AS-IS CASH — fast and certain; the discount is the fee for certainty.
3. SELLER FINANCE — you're the bank: full price or better, monthly income, big tax spreading (installment sale). Best when you don't need the lump sum.
4. SUBJECT-TO — buyer takes over your payments; strongest when your rate is low and equity is thin. Paperwork protects you or the deal doesn't happen.
5. HYBRID (wrap/partial) — some cash now, income after. The Swiss Army option.

Which fits depends on three things: your equity, your rate, and what the money is FOR. Tell me those three and I'll rank the five for your exact situation — no charge, no pressure, and I'll show real contracts so nothing is hand-wavy.

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
`YOU: Buenas tardes {{Owner}}, le habla {{Agent}} de {{Brokerage}}. ¿Tiene un minutito? Le prometo que vale la pena.

Muchas familias aquí en {{Neighborhood}} compraron hace años y no se han dado cuenta de cuánto ha subido su casa. Su propiedad probablemente vale mucho más de lo que pagó — y ese dinero, esa plusvalía, es SUYA.

No le llamo para presionarla a vender. Le llamo porque conocer su número le abre puertas: comprar algo más grande, ayudar a los hijos, invertir, o simplemente dormir tranquila sabiendo lo que tiene.

Le preparo el análisis gratis, por escrito, y se lo explico con calma — sin tecnicismos, sin letra chiquita. ¿Se lo mando esta semana? Y si prefiere que hablemos con toda la familia presente, mejor todavía — así se hacen bien estas decisiones.`},
{t:"espanol",ch:"call",adv:"Carlos Reyes",title:"Llamada — Casa Heredada (ES)",body:
`YOU: {{Name}}? Habla {{Agent}}, agente local aquí en {{City}}. Primero — mi más sentido pésame por {{Deceased Name}}. Sé que esta llamada llega en un momento difícil, así que voy directo y con respeto:

Cuando una familia hereda una casa, aparecen tres caminos: quedársela, rentarla, o venderla. Y casi siempre aparece también el problema: los papeles. Sucesión, testamento, título — cosas que toman meses si no se empiezan bien.

Yo ayudo a familias con TODO eso, en español, paso a paso: los números de los tres caminos, los abogados correctos (conozco buenos que hablan español), y si al final deciden vender, me encargo de todo — hasta de la limpieza de la casa.

Sin prisa y sin compromiso. ¿Qué es lo que más les preocupa ahorita — los papeles, o qué hacer con la propiedad?`},
{t:"espanol",ch:"call",adv:"Rene Rodriguez",title:"Llamada — El Que Espera (ES/EN)",body:
`YOU: {{Owner}}, habla {{Agent}}. Le llamo porque la última vez me dijo algo que escucho mucho: "estamos esperando a ver qué pasa con el mercado."

Lo entiendo perfectamente. Pero déjeme contarle lo que le pasó a una familia igualita: esperaron dos años "a ver qué pasaba." En esos dos años, la casa que querían comprar subió {{Amount}} — más de lo que "ahorraron" esperando.

Esperar también es una decisión, y también tiene precio. La diferencia es que nadie se lo enseña por escrito.

Eso es lo que ofrezco: los números de moverse HOY versus esperar un año — lado a lado, en una página, gratis. Si los números dicen "espérese," se lo digo con gusto. Pero que la decisión sea con números, no con miedo. ¿Se los preparo?`},
{t:"espanol",ch:"vm",adv:"Loida Velasquez",title:"Buzón — Vecina de Confianza (ES)",body:
`{{Owner}}, le habla {{Agent}}, agente aquí en {{Neighborhood}}. Le dejo este mensajito porque acabamos de vender una casa en su calle y los valores subieron otra vez. Muchos vecinos me preguntan "¿y la mía cuánto vale?" — y esa respuesta siempre es gratis conmigo, sin ningún compromiso. En español o inglés, como guste. Cuando quiera su número: {{Phone}}. Que Dios la bendiga y buen día.`},
{t:"espanol",ch:"vm",adv:"Veronica Figueroa",title:"Buzón — Programas de Compra (ES)",body:
`Hola {{Name}}, le habla {{Agent}} de {{Brokerage}}. Le llamo porque preguntó sobre comprar casa — y quiero que sepa algo antes de que se desanime: hay programas de ayuda aquí en {{County}} con enganches desde 3%, ayuda para el pago inicial, y sí — opciones para compradores con ITIN. Cientos de familias como la suya ya lo lograron con nuestro equipo. La consulta es gratis, en español, y sin compromiso: {{Phone}}. Su casa propia está más cerca de lo que cree.`},
{t:"espanol",ch:"vm",adv:"Carlos Reyes",title:"Buzón — Compra Directa (ES)",body:
`{{Owner}}, habla {{Agent}}, inversionista y agente local en {{City}}. Mensaje corto: si algún día quiere vender su propiedad en {{Street}} TAL COMO ESTÁ — sin arreglar nada, sin enseñarla a extraños, sin esperar meses — yo le doy un número real, por escrito, y cerramos cuando usted diga. Sin trucos y sin presión: si el número no le sirve, quedamos como amigos. {{Phone}}. Buen día.`},
{t:"espanol",ch:"text",adv:"Loida Velasquez",title:"Texto — El Valor de Su Casa (ES)",body:
`Hola {{Owner}}, soy {{Agent}}, agente aquí en {{Neighborhood}} 🏡 Se vendió una casa en su calle y su valor cambió. ¿Le mando su número actualizado? Es gratis y sin compromiso — en español o inglés, como prefiera.`},
{t:"espanol",ch:"text",adv:"Veronica Figueroa",title:"Texto — Primera Casa (ES)",body:
`Hola {{Name}}, soy {{Agent}} de {{Brokerage}} 😊 ¿Sabía que hay programas con enganche desde 3% y ayudas aquí en {{County}} — incluso con ITIN? La consulta es gratis y en español. ¿Le mando la información o prefiere una llamadita de 10 minutos?`},
{t:"espanol",ch:"text",adv:"Rene Rodriguez",title:"Texto — La Pregunta Correcta (ES)",body:
`{{Owner}}, soy {{Agent}}. Una pregunta nada más: si supiera EXACTAMENTE cuánto vale su casa hoy y cuánto le quedaría limpio si vendiera — ¿cambiaría algún plan de este año? Si la respuesta es "tal vez," le preparo los números gratis. Un texto y listo.`},
{t:"espanol",ch:"email",adv:"Loida Velasquez",title:"Email — Reporte del Barrio (ES/EN)",body:
`Subject: Su calle: lo que se vendió y lo que significa / Your street: what sold & what it means

Estimada familia {{Owner}},

Cada mes les mando a mis vecinos de {{Neighborhood}} un resumen corto del mercado — porque su casa es su patrimonio, y ustedes merecen saber lo que tienen.

ESTE MES:
- Se vendió: {{Address}} en {{Price}}
- Su valor estimado subió a: {{Value}}
- Qué significa: los compradores siguen pagando bien por casas cuidadas en nuestra zona.

(English summary: A home on your street sold for {{Price}}, which moves your estimated value to {{Value}}. Buyers are still paying strong prices for well-kept homes here.)

Si quiere el análisis completo de SU casa — gratis, por escrito, sin compromiso — responda este correo o mándeme un texto: {{Phone}}.

Con cariño y respeto,
{{Agent}} · {{Brokerage}}`},
{t:"espanol",ch:"email",adv:"Carlos Reyes",title:"Email — Vender Sin Arreglar (ES)",body:
`Subject: Vender su casa tal como está — sin gastar un peso

Estimado {{Owner}},

Muchos dueños no venden porque creen que primero hay que gastar: pintura, techo, cocina... miles de dólares que no tienen a la mano. La verdad es que existe otro camino:

VENTA TAL-COMO-ESTÁ:
- Cero reparaciones — yo compro (o traigo al comprador) con la casa como esté
- Cero limpieza — llévese lo que quiera, lo demás lo resolvemos nosotros
- Usted escoge la fecha de cierre — 2 semanas o 3 meses
- Número real por escrito, con fondos comprobados — no promesas

¿El precio es menor que arreglando todo? Sí, un poco. Pero cuando suma lo que costarían las reparaciones, los meses de espera y el estrés, muchas veces el número limpio gana.

Le doy ambos números — arreglada y tal-como-está — gratis, para que decida con todo sobre la mesa.

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
`{{Name}}! It's {{Agent}} — yes, the one from your feed, with an actual human voice! You sent that DM about {{Their Question}} and it deserved more than typing. Short version: {{One-Line Answer}} — and the longer version comes with a story that didn't make it into the post. No agenda here, I just believe DMs that matter deserve voices. Call or text back whenever: {{Phone}}. And thanks for being part of my little corner of the internet — it means more than the algorithm knows.`},
{t:"luxury",ch:"call",adv:"Joanna Gaines",title:"Luxury — The Story-of-the-Home Call",body:
`YOU: {{Owner}}, this is {{Agent}} — I'll tell you exactly why I'm calling, because it's a little different.

Before I ever list a home like {{Address}}, I ask the owner for its story. Not the square footage — the story. The room where every holiday happened. The reading spot that gets the morning light. What you fixed, what you saved, what you'd never change.

Here's why it matters commercially: buyers at this level aren't comparing spec sheets — they're auditioning lives. The home whose story is told beautifully — in the photography, the staging, the listing itself — is the one they fall for. And people pay full price for what they've fallen for.

So: if you ever decide to pass this home to its next chapter, give me one walk-through and one hour of stories. The marketing writes itself from there. Would sometime this month work, even just for the conversation?`},
{t:"luxury",ch:"vm",adv:"Cheryl Eisen",title:"Luxury VM — The Five-Second Test",body:
`{{Owner}}, {{Agent}} here. A truth from the top of the market: luxury buyers decide in the first five seconds — the entry, the light, the first sightline. Everything after is justification. {{Address}} has extraordinary bones, and if a sale is ever on your horizon, those five seconds deserve professional design before a single photo is taken. Staged properly, homes at your level are commanding meaningfully more and selling in half the time. The walk-through where I show you exactly what I'd do is complimentary: {{Phone}}.`},
{t:"luxury",ch:"text",adv:"Sharran Srivatsaa",title:"Luxury Text — The Annual Private Valuation",body:
`{{Owner}} — {{Agent}}, {{Brokerage}}. Owners at your level get an annual private valuation from me: the real number ({{Enclave}} moved again this year), off-market interest if any, and zero obligation. Yours is ready whenever you want it. Shall I send it over?`}
);

/* ============ ADVISOR ROSTER (voice selector) ============ */
const ADVISORS = [
 {id:"serhant",n:"Ryan Serhant",g:"Sales & Prospecting"},
 {id:"harris",n:"Tim & Julie Harris",g:"Sales & Prospecting"},
 {id:"mulrenin",n:"Brandon Mulrenin",g:"Sales & Prospecting"},
 {id:"carruthers",n:"Ricky Carruth",g:"Sales & Prospecting"},
 {id:"ferry",n:"Tom Ferry",g:"Coaching & Business"},
 {id:"buffini",n:"Brian Buffini",g:"Coaching & Business"},
 {id:"keller",n:"Gary Keller",g:"Coaching & Business"},
 {id:"sharran",n:"Sharran Srivatsaa",g:"Coaching & Business"},
 {id:"glennda",n:"Glennda Baker",g:"Marketing & Media"},
 {id:"lazine",n:"Byron Lazine",g:"Marketing & Media"},
 {id:"burgess",n:"Jimmy Burgess",g:"Marketing & Media"},
 {id:"pantana",n:"Jason Pantana",g:"Marketing & Media"},
 {id:"peitz",n:"Chelsea Peitz",g:"Marketing & Media"},
 {id:"voss",n:"Chris Voss",g:"Negotiation"},
 {id:"gaines",n:"Joanna Gaines",g:"Design & Staging"},
 {id:"mcgee",n:"Shea McGee",g:"Design & Staging"},
 {id:"eisen",n:"Cheryl Eisen",g:"Design & Staging"},
 {id:"knakal",n:"Bob Knakal",g:"Commercial"},
 {id:"cauble",n:"Tyler Cauble",g:"Commercial"},
 {id:"mcelroy",n:"Ken McElroy",g:"Commercial"},
 {id:"tarek",n:"Tarek El Moussa",g:"Flipping & Investing"},
 {id:"norton",n:"Jerry Norton",g:"Flipping & Investing"},
 {id:"morby",n:"Pace Morby",g:"Flipping & Investing"},
 {id:"greene",n:"David Greene",g:"Flipping & Investing"},
 {id:"corbett",n:"Chad Corbett",g:"Probate, Divorce & Distressed"},
 {id:"nicoletti",n:"Al Nicoletti",g:"Probate, Divorce & Distressed"},
 {id:"gross",n:"Bill Gross",g:"Probate, Divorce & Distressed"},
 {id:"starks",n:"Laurel Starks",g:"Probate, Divorce & Distressed"},
 {id:"espinosa",n:"Nicole Espinosa",g:"Probate, Divorce & Distressed"},
 {id:"ted",n:"Ted Thomas",g:"Probate, Divorce & Distressed"},
 {id:"loida",n:"Loida Velasquez",g:"Español & Bilingual"},
 {id:"figueroa",n:"Veronica Figueroa",g:"Español & Bilingual"},
 {id:"creyes",n:"Carlos Reyes",g:"Español & Bilingual"},
 {id:"rene",n:"Rene Rodriguez",g:"Español & Bilingual"},
];
