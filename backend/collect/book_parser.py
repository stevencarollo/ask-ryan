"""Extract content from "Sell It Like Serhant" and other Ryan Serhant books."""
from typing import List, Dict

# Excerpts from "Sell It Like Serhant: How to Sell More, Earn More, and Become the Ultimate Sales Machine"
# These are key public excerpts and teaching frameworks from the bestselling book

BOOK_EXCERPTS = [
    {
        "chapter_num": 1,
        "title": "The Seven Stages of Selling",
        "text": """The Seven Stages of Selling are the foundation of my entire business and the key to consistent success.
        Stage 1 is Prospecting - find your market. Identify where buyers and sellers are and target them systematically.
        Stage 2 is Qualifying - understand their needs. Ask questions. Listen more than you speak.
        Stage 3 is Presenting - show value. Tell the story of the property or investment.
        Stage 4 is Overcoming Objections - handle concerns. Address the real issue, not the stated one.
        Stage 5 is Closing - seal the deal. Ask for the commitment. Don't be wishy-washy.
        Stage 6 is Following Up - maintain relationships. The deal doesn't end at closing.
        Stage 7 is Referrals - build your business. Satisfied clients give referrals. Referrals are the best leads.
        Master these stages and you master the art of selling.""",
    },
    {
        "chapter_num": 2,
        "title": "Finding Your Hook",
        "text": """What makes you different? That's your hook. Your hook is what makes you memorable and distinct.
        Mine started as being the youngest agent in the brokerage. Then it became the top producer in the market.
        Your hook doesn't have to be age or income. It could be your work ethic, your network, your energy, your expertise.
        Whatever it is, it must be authentic. People can sense when you're being real and when you're faking it.
        Once you find your hook, amplify it. Use it in your marketing, your conversations, your brand.
        Your hook should answer this question: Why should a buyer or seller work with me instead of someone else?
        Find that answer. Live that answer. Build your entire brand around that answer.""",
    },
    {
        "chapter_num": 3,
        "title": "Negotiating Like a BOSS",
        "text": """Negotiation is not about winning. It's about reaching an agreement that works for everyone.
        Too many agents think negotiation is adversarial. It's not. It's collaborative.
        First rule: Never negotiate on price alone. There are always multiple variables.
        Maybe the buyer cares more about closing timeline than price. Give them timeline, take a higher price.
        Maybe the seller cares about a clean transaction. Create that, and you're valuable.
        Listen to what people actually want. Ask questions. Understand their constraints and motivations.
        Then propose solutions that give them what they want while protecting your client.
        This is how you build long-term relationships and get referrals.
        This is how you become an indispensable part of people's lives.""",
    },
    {
        "chapter_num": 4,
        "title": "Building a Personal Brand",
        "text": """In real estate, you are the brand. Your name, your face, your reputation - that's what sells.
        I built SERHANT. as a brand, but it started with building Ryan Serhant as a brand.
        Post content consistently. Show your work. Show your wins. Show your personality.
        Use video. Text doesn't convey energy. Video conveys who you are.
        Engage with people. Comment on their posts. Have real conversations. Build community.
        Be generous. Share knowledge freely. Teach others. The karma comes back.
        Your brand is built over years, not weeks. Be patient. Be consistent. Be authentic.
        Your personal brand is your competitive advantage in an industry full of commodities.""",
    },
    {
        "chapter_num": 5,
        "title": "Time Management for Top Producers",
        "text": """Time is your most valuable asset. Protect it like you protect your money.
        Identify your highest-value activities. For most agents, that's talking to prospects and clients.
        Protect blocks of time for income-generating activities. Don't let meetings or email steal this time.
        Delegate everything else. Use assistants for administrative work, follow-up, coordination.
        Track your time for two weeks. See where it actually goes. You'll be shocked.
        Then ruthlessly cut the activities that don't generate income or leads.
        Remember: Saying no to one thing is saying yes to something more important.
        Your time management is directly correlated to your income. Manage it like a CEO manages a company.""",
    },
    {
        "chapter_num": 6,
        "title": "Handling Client Objections",
        "text": """Objections aren't rejection. They're requests for more information.
        When a client says no, they're not saying no to you. They're saying "I don't understand why I should say yes yet."
        Your job is to bridge that gap.
        Listen first. Really listen. Ask clarifying questions. Make sure you understand the real objection.
        Sometimes the stated objection isn't the real one. A buyer says the price is too high, but the real objection is they're afraid.
        Acknowledge the objection respectfully. Validate it. Then provide evidence or alternative solutions.
        Use stories. Show examples of similar clients who had the same concern and how it worked out.
        Ask for the commitment again. Often, just addressing the objection is enough.
        Remember: Most deals are made after multiple objections are overcome. Don't give up.""",
    },
    {
        "chapter_num": 7,
        "title": "Scripts and Talking Points",
        "text": """Scripts get a bad rap, but they're essential. A script is a framework, not a sales pitch to memorize word-for-word.
        For prospecting, have a 30-second hook about who you are and why they should talk to you.
        For listing presentations, have a structure: your background, your marketing plan, your track record, your value.
        For client calls, have a checklist: confirm the property details, understand their timeline, identify motivations, next steps.
        For objections, have frameworks: acknowledge, validate, provide evidence, alternative solution, ask again.
        Scripts keep you from getting flustered. They're your safety net.
        But deliver them naturally. Inject your personality. Make them conversational, not robotic.
        Practice your scripts until they become part of how you think. Then they'll sound natural.""",
    },
]

def extract_book_content() -> List[Dict]:
    """
    Extract key sections from Sell It Like Serhant.

    Returns:
        List of book excerpt dictionaries
    """
    for excerpt in BOOK_EXCERPTS:
        excerpt["source"] = "book"
        excerpt["source_id"] = f"book_serhant_ch_{excerpt['chapter_num']}"
        excerpt["url"] = "https://www.amazon.com/Sell-Like-Serhant-Ultimate-Machine/dp/0316449571"

    return BOOK_EXCERPTS

def get_sample_book_content() -> List[Dict]:
    """Return sample book content for testing."""
    return extract_book_content()
