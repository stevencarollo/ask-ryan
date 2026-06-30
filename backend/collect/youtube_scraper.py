"""YouTube transcript collector for Ryan Serhant content."""
import json
from typing import List, Dict, Optional
from youtube_transcript_api import YouTubeTranscriptApi
from youtube_transcript_api._errors import TranscriptsDisabled, NoTranscriptFound

RYAN_CHANNELS = {
    "UCG98giOsUxIlXV0rNUhxLew": "Ryan Serhant Personal",
    "serhant": "SERHANT. Official",
}

# Curated list of popular Ryan Serhant videos (fallback if API unavailable)
POPULAR_VIDEO_IDS = [
    "9xBTlCfhyg4",    # SERHANT. Closing A Million Dollar Deal
    "mW3VzRsBg64",    # How To Close More Deals
    "fPfKb9Y2LJ0",    # The 7 Stages Of Selling
    "4cTtheoGdQk",    # Negotiation Strategies
    "sT4nKD3FHdE",    # Real Estate Sales Scripts
    "dJ2c8xdN-0M",    # Client Objection Handling
    "2K9QMhCMVmg",    # Building Your Personal Brand
    "kj3QR6UzKzA",    # Luxury Real Estate Sales
    "bE8xvPvqErc",    # First Time Agent Tips
    "7CWVL3XJ_W0",    # Sales Psychology
    "M-KqvPCcwcA",    # Time Management for Agents
    "7Qz2Vb3e7W0",    # Creating Buzz for Listings
]

def fetch_transcript(video_id: str) -> Optional[Dict]:
    """
    Fetch transcript for a single YouTube video.

    Args:
        video_id: YouTube video ID

    Returns:
        Dict with video metadata and transcript text, or None if unavailable
    """
    try:
        # Fetch transcript
        transcript_list = YouTubeTranscriptApi.get_transcript(video_id)
        text = " ".join([item["text"] for item in transcript_list])

        return {
            "video_id": video_id,
            "title": f"Ryan Serhant - {video_id}",
            "text": text,
            "source": "youtube",
            "source_id": f"yt_{video_id}",
            "url": f"https://youtube.com/watch?v={video_id}",
            "transcript_length": len(text),
            "segment_count": len(transcript_list)
        }
    except (TranscriptsDisabled, NoTranscriptFound, Exception) as e:
        print(f"  ⚠ Skipped {video_id}: {type(e).__name__}")
        return None

def scrape_ryan_channels(max_videos: int = 100) -> List[Dict]:
    """
    Fetch transcripts from Ryan's YouTube videos.

    Falls back to curated list if API unavailable.

    Args:
        max_videos: Maximum videos to collect

    Returns:
        List of transcript dictionaries
    """
    all_videos = []

    # Use curated list as primary source (more reliable than channel scraping)
    video_ids = POPULAR_VIDEO_IDS[:max_videos]

    print(f"Collecting {len(video_ids)} YouTube videos...")
    for i, vid_id in enumerate(video_ids, 1):
        transcript = fetch_transcript(vid_id)
        if transcript:
            all_videos.append(transcript)
            print(f"  ✓ [{i}/{len(video_ids)}] {transcript['title']} ({transcript['transcript_length']} chars)")

        if len(all_videos) >= max_videos:
            break

    print(f"\nCollected {len(all_videos)}/{len(video_ids)} videos")
    return all_videos

def get_sample_transcripts() -> List[Dict]:
    """
    Return sample/fallback transcripts for testing without API.
    Used when YouTube API is rate-limited or unavailable.
    """
    return [
        {
            "video_id": "sample_1",
            "title": "Ryan Serhant - The 7 Stages of Selling",
            "text": """The Seven Stages of Selling are the foundation of all successful real estate transactions.
            Stage 1 is Prospecting - find your market and identify potential buyers and sellers.
            Stage 2 is Qualifying - understand their needs, motivations, and constraints.
            Stage 3 is Presenting - showcase the property and its value proposition.
            Stage 4 is Overcoming Objections - address concerns professionally and confidently.
            Stage 5 is Closing - seal the deal with clear next steps.
            Stage 6 is Following Up - maintain relationships and gather referrals.
            Stage 7 is Referrals - leverage satisfied clients for new business.
            Each stage requires preparation, authenticity, and persistence.""",
            "source": "youtube",
            "source_id": "yt_sample_1",
            "url": "https://youtube.com/watch?v=sample_1",
            "transcript_length": 450,
            "segment_count": 1
        },
        {
            "video_id": "sample_2",
            "title": "Ryan Serhant - How to Close More Real Estate Deals",
            "text": """Closing more deals is about consistency and systems. First, you need a lead pipeline.
            Don't wait for deals to come to you - go out and find them. Build relationships with buyers and sellers constantly.
            Second, qualify aggressively. Not every lead is a good fit. Spend time with serious buyers and sellers only.
            Third, present professionally. Show the property's value, not just the features. Use storytelling.
            Fourth, handle objections with empathy. Listen more than you talk. Address the real concern, not the stated one.
            Fifth, close confidently. Ask for the commitment. Don't be afraid of the ask.
            Finally, follow up relentlessly. Most deals are made after multiple touch points. Stay top of mind.""",
            "source": "youtube",
            "source_id": "yt_sample_2",
            "url": "https://youtube.com/watch?v=sample_2",
            "transcript_length": 420,
            "segment_count": 1
        }
    ]
