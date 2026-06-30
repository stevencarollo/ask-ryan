import sys
from config import CLAUDE_API_KEY, SUPABASE_URL
from collect.youtube_scraper import scrape_ryan_channels
from process.loader import upload_to_supabase

def main():
    command = sys.argv[1] if len(sys.argv) > 1 else "help"

    if command == "collect":
        print("Starting content collection...")
        youtube_content = scrape_ryan_channels()
        print(f"Collected {len(youtube_content)} YouTube items")
    elif command == "process":
        print("Starting processing pipeline...")
        # To be implemented
    elif command == "query":
        query_text = " ".join(sys.argv[2:])
        # To be implemented
    else:
        print("Usage: python main.py {collect|process|query}")

if __name__ == "__main__":
    main()
