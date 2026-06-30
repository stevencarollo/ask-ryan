"""Web content scraper for Ryan Serhant blog and social content."""
import requests
from bs4 import BeautifulSoup
from typing import List, Dict, Optional
from datetime import datetime
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


class BlogScraper:
    """Scrape blog articles from ryanserhant.com."""

    def __init__(self, base_url: str = "https://ryanserhant.com"):
        self.base_url = base_url
        self.session = requests.Session()
        self.session.headers.update({
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        })

    def scrape_blog(self, limit: int = 50) -> List[Dict]:
        """
        Scrape blog articles from Ryan's website.

        Args:
            limit: Maximum articles to scrape

        Returns:
            List of article dictionaries
        """
        articles = []

        try:
            # Fetch blog homepage
            blog_url = f"{self.base_url}/blog"
            response = self.session.get(blog_url, timeout=10)
            response.raise_for_status()

            soup = BeautifulSoup(response.content, 'html.parser')

            # Find article links (adjust selectors based on actual site structure)
            article_links = soup.find_all('a', class_=['blog-link', 'post-link', 'article-link'])

            logger.info(f"Found {len(article_links)} potential articles")

            for idx, link in enumerate(article_links[:limit], 1):
                try:
                    article = self._scrape_article(link)
                    if article:
                        articles.append(article)
                        logger.info(f"  [{idx}] ✓ {article['title'][:50]}")
                except Exception as e:
                    logger.warning(f"  Failed to scrape article: {e}")
                    continue

        except Exception as e:
            logger.error(f"Error scraping blog: {e}")

        return articles

    def _scrape_article(self, link_element) -> Optional[Dict]:
        """
        Scrape individual article.

        Args:
            link_element: BeautifulSoup link element

        Returns:
            Article dictionary or None
        """
        try:
            article_url = link_element.get('href', '')
            if not article_url.startswith('http'):
                article_url = f"{self.base_url}{article_url}"

            # Fetch article
            response = self.session.get(article_url, timeout=10)
            response.raise_for_status()

            soup = BeautifulSoup(response.content, 'html.parser')

            # Extract title
            title = soup.find('h1', class_=['post-title', 'article-title', 'entry-title'])
            if not title:
                title = soup.find('title')
            title_text = title.get_text(strip=True) if title else "Untitled"

            # Extract content
            content = soup.find('div', class_=['post-content', 'article-content', 'entry-content'])
            if not content:
                content = soup.find('article')
            content_text = content.get_text(strip=True) if content else ""

            # Extract date
            date_elem = soup.find('time') or soup.find('span', class_=['post-date', 'article-date'])
            date_text = date_elem.get_text(strip=True) if date_elem else datetime.now().isoformat()

            if not content_text or len(content_text) < 100:
                return None

            return {
                "title": title_text,
                "text": content_text,
                "url": article_url,
                "source": "blog",
                "source_id": f"blog_{article_url.split('/')[-1]}",
                "date": date_text,
                "text_length": len(content_text),
                "metadata": {
                    "platform": "Blog",
                    "website": "ryanserhant.com"
                }
            }

        except Exception as e:
            logger.debug(f"Error scraping article: {e}")
            return None


class LinkedInScraper:
    """Scrape LinkedIn articles by Ryan Serhant."""

    def __init__(self):
        self.session = requests.Session()
        self.session.headers.update({
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        })

    def scrape_profile(self, profile_url: str, limit: int = 50) -> List[Dict]:
        """
        Scrape LinkedIn articles from Ryan's profile.

        Note: LinkedIn has robots.txt restrictions.
        For production, use LinkedIn API or manual curation.

        Args:
            profile_url: LinkedIn profile URL
            limit: Max articles

        Returns:
            List of article dictionaries
        """
        articles = []

        # LinkedIn scraping note: Direct scraping is limited by robots.txt
        # In production, use:
        # 1. LinkedIn API (requires approved access)
        # 2. Manual article URLs list
        # 3. LinkedIn Article Import via API

        logger.info("LinkedIn scraping requires API access or manual curation")
        logger.info("To use LinkedIn content:")
        logger.info("1. Export articles manually from LinkedIn")
        logger.info("2. Use LinkedIn API with approved access")
        logger.info("3. Curate list of article URLs manually")

        return articles

    @staticmethod
    def get_known_articles() -> List[Dict]:
        """
        Return manually curated LinkedIn articles by Ryan.
        In production, these would be maintained externally.
        """
        return [
            {
                "title": "The Future of Real Estate",
                "text": "Real estate is evolving rapidly with technology...",
                "url": "https://linkedin.com/feed/update/...",
                "source": "linkedin",
                "source_id": "linkedin_future_real_estate",
                "metadata": {"platform": "LinkedIn"}
            },
            # Add more curated articles
        ]


class SocialMediaAggregator:
    """Aggregate content from social media sources."""

    @staticmethod
    def get_instagram_captions() -> List[Dict]:
        """
        Get captions from Ryan's Instagram.
        Note: Requires manual curation or API access.
        """
        return [
            {
                "title": "Sales Tip of the Day",
                "text": "Remember: clients buy from people they trust...",
                "url": "https://instagram.com/...",
                "source": "instagram",
                "source_id": "ig_sales_tip_001",
                "metadata": {"platform": "Instagram", "type": "caption"}
            }
        ]

    @staticmethod
    def get_twitter_threads() -> List[Dict]:
        """
        Get threads from Ryan's Twitter/X.
        Note: Requires manual curation or API access.
        """
        return [
            {
                "title": "Sales Thread: The 7 Stages",
                "text": "1/ The 7 Stages of Selling is the framework...",
                "url": "https://twitter.com/...",
                "source": "twitter",
                "source_id": "tw_7stages_thread",
                "metadata": {"platform": "Twitter", "type": "thread"}
            }
        ]


# CLI Usage
if __name__ == "__main__":
    import json

    print("\n" + "="*60)
    print("WEB SCRAPER - Content Collection")
    print("="*60)

    # Blog scraping
    print("\n📝 Scraping blog articles...")
    blog_scraper = BlogScraper()
    blog_articles = blog_scraper.scrape_blog(limit=50)
    print(f"Found {len(blog_articles)} blog articles")

    # LinkedIn scraping
    print("\n💼 LinkedIn content...")
    linkedin_scraper = LinkedInScraper()
    linkedin_articles = linkedin_scraper.get_known_articles()
    print(f"Found {len(linkedin_articles)} LinkedIn articles (curated)")

    # Instagram
    print("\n📸 Instagram captions...")
    ig_captions = SocialMediaAggregator.get_instagram_captions()
    print(f"Found {len(ig_captions)} Instagram posts (curated)")

    # Combine all
    all_web_content = blog_articles + linkedin_articles + ig_captions

    # Save
    with open("web_scraped_content.json", "w") as f:
        json.dump(all_web_content, f, indent=2)

    print(f"\n✅ Total web content: {len(all_web_content)} items")
    print(f"   Output: web_scraped_content.json")
