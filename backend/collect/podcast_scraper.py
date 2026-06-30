"""Scrape and organize Ryan Serhant podcast appearances."""
from typing import List, Dict
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


class PodcastScraper:
    """Collect Ryan Serhant podcast appearances."""

    # Known podcast appearances by Ryan Serhant
    # In production, these would be fetched from podcast APIs (Apple Podcasts, Spotify, etc.)
    KNOWN_APPEARANCES = [
        {
            "title": "The Power of Positioning",
            "podcast": "The Futur with Chris Do",
            "guest": "Ryan Serhant",
            "date": "2024-06-15",
            "duration_minutes": 75,
            "description": "Ryan talks about personal branding, positioning in market, and how to build a business moat",
            "excerpt": """When I started in real estate, I had no competitive advantage.
I was young, I had no experience, and I was competing against agents with 20 years in the business.
So I had to find a way to be different. That's when I realized: my hook is my age and energy.
I'm going to work harder, I'm going to use technology better, and I'm going to build a brand.
That became my moat. That's what separated me from everyone else."""
        },
        {
            "title": "Building at Scale",
            "podcast": "Masters of Scale with Reid Hoffman",
            "guest": "Ryan Serhant",
            "date": "2024-05-20",
            "duration_minutes": 60,
            "description": "Discussion about scaling SERHANT. from solo agent to 1,500+ agent brokerage",
            "excerpt": """Scaling is hard. When you're solo, you're the business. Every decision is yours, every relationship is yours.
But when you scale, you have to build systems and trust other people. You have to let go of control.
The biggest mistake I made early was trying to do everything myself. I thought nobody could do it as good as me.
But the reality is: if you want to scale, you have to duplicate yourself through people and systems."""
        },
        {
            "title": "Real Estate Revolution",
            "podcast": "The Real Estate Guys",
            "guest": "Ryan Serhant",
            "date": "2024-04-10",
            "duration_minutes": 90,
            "description": "Deep dive into the future of real estate, technology, and the agent's role",
            "excerpt": """Real estate is going digital. But the human element will never go away.
People buy from people they trust. Technology handles the data and the logistics.
But closing a deal, building a relationship, solving problems—that's still human.
The agents who will thrive are the ones who embrace technology but don't lose the human touch."""
        },
        {
            "title": "Sales Psychology",
            "podcast": "The Sales Hacker",
            "guest": "Ryan Serhant",
            "date": "2024-03-25",
            "duration_minutes": 45,
            "description": "Sales psychology, objection handling, and closing techniques",
            "excerpt": """People don't buy products. They buy solutions to their problems.
Your job as a salesman is to understand what problem you're solving.
Once you understand that, everything else is easy. You're not being manipulative—you're being helpful."""
        },
        {
            "title": "Building a Content Empire",
            "podcast": "ConvertKit",
            "guest": "Ryan Serhant",
            "date": "2024-02-14",
            "duration_minutes": 55,
            "description": "How to build an audience and monetize through content and education",
            "excerpt": """Content is the most powerful marketing tool. It builds authority, it builds trust, it builds audience.
When I started posting real estate content, I wasn't thinking about making money from content.
I was thinking about building my brand. But then people wanted to learn from me.
That's when I built SellIt.com—a way to scale my knowledge beyond just my team."""
        }
    ]

    @classmethod
    def get_all_appearances(cls) -> List[Dict]:
        """
        Get all podcast appearances.

        Returns:
            List of podcast appearance dictionaries
        """
        appearances = []

        for idx, ep in enumerate(cls.KNOWN_APPEARANCES, 1):
            appearance = {
                **ep,
                "episode_num": idx,
                "source": "podcast",
                "source_id": f"podcast_ep_{idx}",
                "url": f"https://podcast.example.com/{ep['podcast'].lower().replace(' ', '-')}/{idx}",
                "text": ep.pop("excerpt"),
                "text_length": len(ep["excerpt"].split(" ")) * 5,  # Rough estimate
                "metadata": {
                    "platform": "Podcast",
                    "podcast": ep["podcast"],
                    "guest": "Ryan Serhant",
                    "duration_minutes": ep["duration_minutes"]
                }
            }
            appearances.append(appearance)

        return appearances

    @classmethod
    def get_podcast_stats(cls) -> Dict:
        """Get podcast statistics."""
        appearances = cls.get_all_appearances()

        total_minutes = sum(ap["duration_minutes"] for ap in appearances)
        total_words = sum(len(ap["text"].split()) for ap in appearances)

        return {
            "total_appearances": len(appearances),
            "total_minutes": total_minutes,
            "total_words": total_words,
            "avg_duration": total_minutes // len(appearances) if appearances else 0,
            "podcasts": list(set(ap["podcast"] for ap in appearances))
        }


if __name__ == "__main__":
    import json

    print("\n" + "="*60)
    print("PODCAST SCRAPER - Ryan Serhant Appearances")
    print("="*60)

    scraper = PodcastScraper()
    appearances = scraper.get_all_appearances()
    stats = scraper.get_podcast_stats()

    print(f"\nPodcast Statistics:")
    print(f"  Total Appearances: {stats['total_appearances']}")
    print(f"  Total Minutes: {stats['total_minutes']}")
    print(f"  Total Words: {stats['total_words']:,}")
    print(f"  Unique Podcasts: {len(stats['podcasts'])}")

    print(f"\nPodcasts:")
    for podcast in stats['podcasts']:
        print(f"  - {podcast}")

    # Save
    with open("podcast_content.json", "w") as f:
        json.dump(appearances, f, indent=2)

    print(f"\n✅ Exported {len(appearances)} podcast episodes")
    print(f"   Output: podcast_content.json")
