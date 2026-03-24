import Link from "next/link";
import CrawlerGame from "@/components/CrawlerGame";

export default function NotFound() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-16 text-center">
      <CrawlerGame />

      <div className="mt-10">
        <Link
          href="/"
          className="text-[13px] font-medium text-[var(--color-foreground)] hover:opacity-60 transition-opacity underline"
        >
          ← Back to homepage
        </Link>
      </div>
    </div>
  );
}
