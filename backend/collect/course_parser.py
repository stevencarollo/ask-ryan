"""Parse SellIt.com course materials and lessons."""
from typing import List, Dict, Optional
import logging
from datetime import datetime

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


class CourseParser:
    """Parse and extract course content from SellIt.com."""

    # Curated SellIt.com course structure
    COURSES = {
        "foundations": {
            "title": "Sales Foundations",
            "description": "Core sales principles and framework",
            "lessons": [
                {
                    "lesson_num": 1,
                    "title": "The 7 Stages of Selling",
                    "text": """The foundation of all sales success is understanding the 7 Stages:

1. PROSPECTING - Find your market. Identify where your buyers and sellers are.
2. QUALIFYING - Ask the right questions. Understand their needs and motivations.
3. PRESENTING - Show the value. Tell the story, not just the features.
4. OVERCOMING OBJECTIONS - Handle concerns with empathy and facts.
5. CLOSING - Ask for the commitment. Don't be wishy-washy.
6. FOLLOWING UP - Maintain relationships. Stay top of mind.
7. REFERRALS - Build your business. Get referrals from satisfied clients.

Master these 7 stages and you master sales.""",
                    "duration_minutes": 45,
                    "difficulty": "beginner"
                },
                {
                    "lesson_num": 2,
                    "title": "Finding Your Hook",
                    "text": """Every successful salesperson has a hook - something that makes them memorable.

Your hook is:
- Your unique skill or experience
- Your personal story
- Your work ethic or personality
- Your market knowledge
- Your unique approach

Examples:
- "I'm the fastest closer in the South Bay"
- "I specialize in luxury properties with views"
- "I focus on first-time buyers"
- "I'm a former contractor who understands renovation value"

Your hook must be AUTHENTIC. People sense fakeness immediately.

Exercise: Write your hook in one sentence. Does it feel true to you?
If not, keep working until you find something genuine that sets you apart.""",
                    "duration_minutes": 30,
                    "difficulty": "beginner"
                },
                {
                    "lesson_num": 3,
                    "title": "Building Personal Brand",
                    "text": """Your personal brand is your competitive advantage.

In real estate, you ARE the product. Your name, face, and reputation drive business.

Building Your Brand:
1. CONSISTENCY - Show up everywhere. Post regularly. Be reliable.
2. VISIBILITY - Use video, photos, stories. Show your personality.
3. VALUE - Share knowledge freely. Teach, don't sell.
4. AUTHENTICITY - Be yourself. People don't trust fake.
5. ENGAGEMENT - Talk to people. Comment, respond, engage.

Platform Strategy:
- Instagram: Visual storytelling (property tours, lifestyle)
- LinkedIn: Thought leadership (market insights, tips)
- TikTok: Short-form energy and personality
- YouTube: Long-form education and listings
- Email: Direct relationship building

The goal: When people think real estate in your market, they think of YOU.""",
                    "duration_minutes": 50,
                    "difficulty": "intermediate"
                }
            ]
        },
        "advanced_selling": {
            "title": "Advanced Selling Techniques",
            "description": "Master negotiation, objection handling, and closing",
            "lessons": [
                {
                    "lesson_num": 1,
                    "title": "Negotiation Like a BOSS",
                    "text": """Negotiation is not about winning. It's about reaching an agreement that works for everyone.

Key Principle: Negotiate on VALUE, not just price.

Understanding Leverage:
- Buyer's leverage: Competition, inventory, rates
- Seller's leverage: Buyer competition, cash, timeline
- Your leverage: Market knowledge, network, skill

Negotiation Strategy:
1. LISTEN first. Understand what they actually want.
2. ASK questions. Why is this important to them?
3. EXPLORE options. What else could work besides lower price?
4. PROPOSE creatively. Give value in multiple forms.
5. AGREE on terms. Be clear and documented.

Example:
Buyer says: "Your price is too high"
Don't just drop price.
Ask: "What's your concern - price or value?"
"Would flexibility on closing date help?"
"Would seller credit for upgrades work?"

Never negotiate on price alone. Always look for multiple variables.""",
                    "duration_minutes": 60,
                    "difficulty": "advanced"
                },
                {
                    "lesson_num": 2,
                    "title": "Overcoming Objections",
                    "text": """Objections are not rejection. They're signals that you haven't given them enough information yet.

The Objection Handling Framework:

1. LISTEN - Let them finish. Don't interrupt.
2. ACKNOWLEDGE - "I understand your concern"
3. CLARIFY - Ask: "Can you tell me more about that?"
4. OVERCOME - Provide facts, stories, or alternatives
5. CONFIRM - "Does that address your concern?"

Common Objections:

"Price is too high"
→ "What's your actual budget?" (not all budgets are carved in stone)
→ "What's the concern - the asking price or the market value?" (understand the real issue)

"I want to wait"
→ "What are you waiting for?" (is it timing, rate changes, inventory?)
→ "What would need to change to move forward now?"

"I'm working with another agent"
→ "That's great. What are they offering that you're looking for?"
→ "Can I earn your trust on this one transaction?"

Remember: Your job is to uncover the REAL objection, not just overcome the stated one.""",
                    "duration_minutes": 55,
                    "difficulty": "advanced"
                },
                {
                    "lesson_num": 3,
                    "title": "Closing the Deal",
                    "text": """Closing is the ask. It's the moment you ask for commitment.

Most salespeople are afraid to ask. Don't be.

The Closing Mindset:
- You've provided value
- They've shown interest
- The deal is good for both sides
- Your job is to finalize it

Types of Closes:

1. ASSUMPTIVE CLOSE
"Let's get this agreement signed"
(Assume they're moving forward)

2. ALTERNATIVE CLOSE
"Would you prefer to close in 30 or 45 days?"
(Give options, not whether)

3. URGENCY CLOSE
"We have another offer coming in today. Want to move forward?"
(Create context for decision)

4. SUMMARY CLOSE
"You want the house, you can afford it, you love the neighborhood. Let's make it happen."
(Recap the logic)

5. DIRECT CLOSE
"Are you ready to make an offer?"
(Simple and clear)

After you ask for the close:
- STOP TALKING
- Let them respond
- Handle any final objections
- Get the signature

The biggest mistake: You ask for the close, they go quiet, and you keep talking and talk yourself OUT of the deal.

Be comfortable with silence after you ask.""",
                    "duration_minutes": 40,
                    "difficulty": "advanced"
                }
            ]
        },
        "productivity": {
            "title": "Productivity & Time Management",
            "description": "Manage your time like a CEO to maximize income",
            "lessons": [
                {
                    "lesson_num": 1,
                    "title": "Time Blocking Strategy",
                    "text": """Your time is your most valuable asset. Protect it like money.

The Problem: Most agents waste time on low-value activities.
- Scrolling social media
- Excessive email checking
- Meetings that could be emails
- Admin work that could be delegated

Solution: TIME BLOCKING

How it works:
1. Identify your highest-value activity (for most agents: talking to prospects)
2. Block 3-4 hours daily for this activity (protect it fiercely)
3. Stack other activities around it
4. Say NO to interruptions during your block

Sample Daily Schedule:
- 7-8am: Personal (gym, coffee, mindset)
- 8-11am: PROSPECTING BLOCK (calls, messages, meetings) - NO INTERRUPTIONS
- 11am-12pm: Admin & emails
- 12-1pm: Lunch
- 1-3pm: PROSPECTING BLOCK (part 2)
- 3-5pm: Client meetings, paperwork, follow-up
- 5-6pm: Planning tomorrow

The 80/20 Rule:
80% of your income comes from 20% of your activities.
Identify your 20% and spend 80% of your time there.""",
                    "duration_minutes": 35,
                    "difficulty": "intermediate"
                },
                {
                    "lesson_num": 2,
                    "title": "Delegation & Scale",
                    "text": """You can't scale by doing everything yourself.

Delegation Principle: If someone else can do it 80% as well as you, delegate it.

What to Delegate:
- Admin work (scheduling, CRM entry, file management)
- Social media posting (create content, they schedule)
- Routine follow-ups (assistants can qualify leads)
- Paperwork organization (agents handle the sales part)
- Photography coordination (someone else book photographers)

What NOT to Delegate:
- Initial sales conversations (you set the relationship)
- Major negotiations (your job)
- Client presentations (these close deals)
- Strategy decisions (your brain)

The Math:
Your time is worth $200/hour (or whatever your target income is)
Your assistant's time is worth $25/hour
When you spend 1 hour on $25 admin work instead of delegating:
You lose $175 of potential income

Delegation costs money upfront but makes money in total income.""",
                    "duration_minutes": 40,
                    "difficulty": "intermediate"
                }
            ]
        },
        "mindset": {
            "title": "Sales Mindset & Psychology",
            "description": "Master the mental game of sales",
            "lessons": [
                {
                    "lesson_num": 1,
                    "title": "Handling Rejection",
                    "text": """In sales, rejection is part of the math.

For every 10 people you contact:
- 3 will be rude or say no immediately
- 4 will say "not interested" or "call back later"
- 2 will have a real conversation
- 1 might become a client

The Math: You need rejection to find sales.

How to Reframe Rejection:
OLD: "They said no to ME" (personal)
NEW: "That's one NO closer to a YES" (process)

OLD: "I'm not good enough" (identity)
NEW: "I haven't found the right approach yet" (learnable)

OLD: "I hate cold calling" (emotion)
NEW: "Every call I make is worth $X in expected value" (math)

Resilience Habit:
Track your nos. For every 10 nos, expect 1-2 yeses.
If you're not getting rejected enough, you're not reaching out enough.

The Best Salespeople: They have the thickest skin and the shortest memory about rejections.""",
                    "duration_minutes": 30,
                    "difficulty": "beginner"
                },
                {
                    "lesson_num": 2,
                    "title": "Consistency Over Motivation",
                    "text": """Motivation is a feeling. Consistency is a habit.

The Problem: Most people wait to feel motivated before taking action.
The Reality: Motivation follows action, not the other way around.

Action → Momentum → Motivation → Better Results → Reinforcement

How to Build Consistency:
1. Make it automatic - same time, same place every day
2. Start small - you can do prospecting for 30 minutes even on bad days
3. Track it - what gets measured gets done
4. Don't miss twice - one missed day is forgetfulness, two is a pattern

The Compound Effect:
Small actions over time = massive results

1% better every day = 37x better in one year
Calling 5 extra leads per day = 1,200 extra contacts per year
If 1 in 100 becomes a client = 12 extra clients per year
At $15,000 commission each = $180,000 extra per year

You don't need to be perfect. You need to be consistent.""",
                    "duration_minutes": 35,
                    "difficulty": "beginner"
                }
            ]
        }
    }

    @classmethod
    def parse_all_courses(cls) -> List[Dict]:
        """
        Parse all courses into flat lesson structure.

        Returns:
            List of lesson dictionaries
        """
        all_lessons = []

        for course_key, course_data in cls.COURSES.items():
            for lesson in course_data["lessons"]:
                lesson_dict = {
                    "course": course_data["title"],
                    "course_id": course_key,
                    "lesson_num": lesson["lesson_num"],
                    "title": lesson["title"],
                    "text": lesson["text"],
                    "duration_minutes": lesson["duration_minutes"],
                    "difficulty": lesson["difficulty"],
                    "source": "course",
                    "source_id": f"course_{course_key}_lesson_{lesson['lesson_num']}",
                    "url": f"https://sellit.com/{course_key}/lesson-{lesson['lesson_num']}",
                    "text_length": len(lesson["text"]),
                    "metadata": {
                        "platform": "SellIt.com",
                        "course": course_data["title"],
                        "difficulty": lesson["difficulty"]
                    }
                }
                all_lessons.append(lesson_dict)

        return all_lessons

    @classmethod
    def get_course_stats(cls) -> Dict:
        """Get course statistics."""
        lessons = cls.parse_all_courses()
        total_words = sum(len(l["text"].split()) for l in lessons)

        return {
            "total_courses": len(cls.COURSES),
            "total_lessons": len(lessons),
            "total_words": total_words,
            "avg_words_per_lesson": total_words // len(lessons) if lessons else 0
        }


# CLI Usage
if __name__ == "__main__":
    import json

    print("\n" + "="*60)
    print("COURSE PARSER - SellIt.com Content")
    print("="*60)

    # Parse all courses
    print("\n📚 Parsing courses...")
    parser = CourseParser()
    all_lessons = parser.parse_all_courses()
    stats = parser.get_course_stats()

    print(f"\nCourse Statistics:")
    print(f"  Courses: {stats['total_courses']}")
    print(f"  Lessons: {stats['total_lessons']}")
    print(f"  Total Words: {stats['total_words']:,}")
    print(f"  Avg Words/Lesson: {stats['avg_words_per_lesson']}")

    # Save
    with open("course_content.json", "w") as f:
        json.dump(all_lessons, f, indent=2)

    print(f"\n✅ Parsed {len(all_lessons)} lessons")
    print(f"   Output: course_content.json")
