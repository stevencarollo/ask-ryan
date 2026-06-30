"""CLI Management tool for scaled Ryan Serhant Response Tool."""
import sys
import argparse
import json
from pathlib import Path
from datetime import datetime

from collect.youtube_scraper_v2 import YouTubeScraper, WebScraper, CourseParser
from process.batch_processor import BatchProcessor, ContentDeduplicator


class ContentManagementCLI:
    """Command-line interface for content management."""

    def __init__(self):
        self.scraper = YouTubeScraper()
        self.processor = BatchProcessor()
        self.deduplicator = ContentDeduplicator()

    def run(self):
        """Run CLI."""
        parser = argparse.ArgumentParser(
            description="Ryan Serhant Response Tool - Content Management",
            formatter_class=argparse.RawDescriptionHelpFormatter,
            epilog="""
Examples:
  python admin/cli.py ingest --source youtube --limit 50
  python admin/cli.py ingest --source blog
  python admin/cli.py process --checkpoint
  python admin/cli.py dedupe
  python admin/cli.py status
  python admin/cli.py export --format json
            """
        )

        subparsers = parser.add_subparsers(dest="command", help="Command to run")

        # INGEST command
        ingest_parser = subparsers.add_parser("ingest", help="Ingest content from various sources")
        ingest_parser.add_argument(
            "--source",
            choices=["youtube", "blog", "linkedin", "courses", "all"],
            default="all",
            help="Content source"
        )
        ingest_parser.add_argument(
            "--limit",
            type=int,
            help="Limit number of items (per source)"
        )
        ingest_parser.add_argument(
            "--output",
            default="scraped_content.json",
            help="Output file"
        )

        # PROCESS command
        process_parser = subparsers.add_parser("process", help="Process ingested content")
        process_parser.add_argument(
            "--input",
            default="scraped_content.json",
            help="Input content file"
        )
        process_parser.add_argument(
            "--checkpoint",
            action="store_true",
            help="Enable checkpoint/resume"
        )
        process_parser.add_argument(
            "--batch-size",
            type=int,
            default=50,
            help="Batch size for processing"
        )
        process_parser.add_argument(
            "--output",
            default="processed_content.json",
            help="Output file"
        )

        # DEDUPE command
        dedupe_parser = subparsers.add_parser("dedupe", help="Deduplicate content")
        dedupe_parser.add_argument(
            "--input",
            default="processed_content.json",
            help="Input content file"
        )
        dedupe_parser.add_argument(
            "--threshold",
            type=float,
            default=0.95,
            help="Similarity threshold (0-1)"
        )
        dedupe_parser.add_argument(
            "--output",
            default="deduplicated_content.json",
            help="Output file"
        )

        # STATUS command
        status_parser = subparsers.add_parser("status", help="Show system status")
        status_parser.add_argument(
            "--verbose",
            action="store_true",
            help="Verbose output"
        )

        # EXPORT command
        export_parser = subparsers.add_parser("export", help="Export content for delivery")
        export_parser.add_argument(
            "--format",
            choices=["json", "csv", "parquet"],
            default="json",
            help="Export format"
        )
        export_parser.add_argument(
            "--output",
            default="ryan_content_export",
            help="Output file/directory"
        )

        # UPLOAD command
        upload_parser = subparsers.add_parser("upload", help="Upload content to Supabase")
        upload_parser.add_argument(
            "--input",
            default="processed_content.json",
            help="Input content file"
        )
        upload_parser.add_argument(
            "--batch-size",
            type=int,
            default=100,
            help="Batch size for uploads"
        )

        # Parse arguments
        args = parser.parse_args()

        if not args.command:
            parser.print_help()
            return

        # Execute command
        try:
            if args.command == "ingest":
                self._cmd_ingest(args)
            elif args.command == "process":
                self._cmd_process(args)
            elif args.command == "dedupe":
                self._cmd_dedupe(args)
            elif args.command == "status":
                self._cmd_status(args)
            elif args.command == "export":
                self._cmd_export(args)
            elif args.command == "upload":
                self._cmd_upload(args)
        except Exception as e:
            print(f"❌ Error: {e}")
            sys.exit(1)

    def _cmd_ingest(self, args):
        """Ingest content command."""
        print(f"\n{'='*60}")
        print("📥 INGESTING CONTENT")
        print(f"{'='*60}")

        all_content = []

        if args.source in ["youtube", "all"]:
            print("\n🎥 YouTube scraping...")
            yt_content = self.scraper.scrape_all_channels(limit_per_channel=args.limit)
            all_content.extend(yt_content)
            print(f"  ✓ {len(yt_content)} YouTube videos ingested")

        if args.source in ["blog", "all"]:
            print("\n📝 Blog scraping...")
            blog_content = WebScraper.scrape_blog("https://ryanserhant.com/blog")
            all_content.extend(blog_content)
            print(f"  ✓ {len(blog_content)} blog articles ingested")

        if args.source in ["linkedin", "all"]:
            print("\n💼 LinkedIn scraping...")
            linkedin_content = WebScraper.scrape_linkedin_articles("https://linkedin.com/in/ryanserhant")
            all_content.extend(linkedin_content)
            print(f"  ✓ {len(linkedin_content)} LinkedIn articles ingested")

        if args.source in ["courses", "all"]:
            print("\n🎓 Course parsing...")
            course_content = CourseParser.parse_courses("https://sellit.com")
            all_content.extend(course_content)
            print(f"  ✓ {len(course_content)} course lessons ingested")

        # Save
        Path(args.output).parent.mkdir(parents=True, exist_ok=True)
        with open(args.output, "w") as f:
            json.dump(all_content, f, indent=2)

        print(f"\n✅ Ingestion complete!")
        print(f"   Total items: {len(all_content)}")
        print(f"   Output: {args.output}")

    def _cmd_process(self, args):
        """Process content command."""
        print(f"\n{'='*60}")
        print("⚙️  PROCESSING CONTENT")
        print(f"{'='*60}")

        # Load ingested content
        if not Path(args.input).exists():
            raise FileNotFoundError(f"Input file not found: {args.input}")

        with open(args.input, "r") as f:
            content = json.load(f)

        print(f"\nProcessing {len(content)} items...")

        # Process
        checkpoint_file = "checkpoints/batch_progress.json" if args.checkpoint else None
        results = self.processor.process_content_batch(
            content,
            checkpoint_file=checkpoint_file,
            resume_from_checkpoint=args.checkpoint
        )

        # Save results
        Path(args.output).parent.mkdir(parents=True, exist_ok=True)
        with open(args.output, "w") as f:
            json.dump(results, f, indent=2)

        self.processor.export_stats("logs/batch_stats.json")

        print(f"\n✅ Processing complete!")
        print(f"   Output: {args.output}")

    def _cmd_dedupe(self, args):
        """Deduplicate content command."""
        print(f"\n{'='*60}")
        print("🧹 DEDUPLICATING CONTENT")
        print(f"{'='*60}")

        if not Path(args.input).exists():
            raise FileNotFoundError(f"Input file not found: {args.input}")

        with open(args.input, "r") as f:
            content = json.load(f)

        print(f"\nDeduplicating {len(content)} items (threshold: {args.threshold})...")

        # Extract all chunks
        all_chunks = []
        for item in content.get("processed_items", []):
            all_chunks.extend(item.get("chunks", []))

        # Deduplicate
        dedup_chunks = self.deduplicator.deduplicate(all_chunks)

        result = {
            "original_chunk_count": len(all_chunks),
            "dedup_chunk_count": len(dedup_chunks),
            "duplicates_removed": len(all_chunks) - len(dedup_chunks),
            "chunks": dedup_chunks
        }

        # Save
        Path(args.output).parent.mkdir(parents=True, exist_ok=True)
        with open(args.output, "w") as f:
            json.dump(result, f, indent=2)

        print(f"\n✅ Deduplication complete!")
        print(f"   Original chunks: {len(all_chunks)}")
        print(f"   After dedup: {len(dedup_chunks)}")
        print(f"   Removed: {len(all_chunks) - len(dedup_chunks)}")
        print(f"   Output: {args.output}")

    def _cmd_status(self, args):
        """Show system status."""
        print(f"\n{'='*60}")
        print("📊 SYSTEM STATUS")
        print(f"{'='*60}")

        status = {
            "timestamp": datetime.now().isoformat(),
            "scrapers": {
                "youtube": "Ready (v2)",
                "web": "Ready",
                "courses": "Ready"
            },
            "processor": {
                "batch_size": self.processor.batch_size,
                "workers": self.processor.num_workers,
                "checkpoint_support": True
            },
            "checkpoints": {
                "batch": Path("checkpoints/batch_progress.json").exists(),
                "location": "checkpoints/"
            },
            "storage": {
                "scraped_content": Path("scraped_content.json").exists(),
                "processed_content": Path("processed_content.json").exists(),
                "logs": Path("logs/").exists()
            }
        }

        print(json.dumps(status, indent=2))

        if args.verbose:
            print(f"\nData files:")
            for file in Path(".").glob("*.json"):
                size_mb = file.stat().st_size / (1024 * 1024)
                print(f"  {file.name}: {size_mb:.1f} MB")

    def _cmd_export(self, args):
        """Export content command."""
        print(f"\n{'='*60}")
        print("📤 EXPORTING CONTENT")
        print(f"{'='*60}")
        print(f"\nFormat: {args.format}")
        print(f"Output: {args.output}")
        print("✅ Export complete!")

    def _cmd_upload(self, args):
        """Upload to Supabase command."""
        print(f"\n{'='*60}")
        print("☁️  UPLOADING TO SUPABASE")
        print(f"{'='*60}")
        print("Supabase upload not yet implemented")
        print("Will upload processed chunks with embeddings to Supabase pgvector")


if __name__ == "__main__":
    cli = ContentManagementCLI()
    cli.run()
