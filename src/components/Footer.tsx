export default function Footer() {
  return (
    <footer id="subscribe" className="bg-[var(--color-footer-bg)] mt-20">
      <div className="max-w-6xl mx-auto px-6 py-14 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        <div>
          <h3 className="text-[var(--color-footer-text)] text-xl font-bold mb-2">
            Content Levers
          </h3>
          <p className="text-[var(--color-footer-muted)] text-sm max-w-sm">
            Stop scrolling — you&apos;ve gone too far!
            <br />
            No easter eggs down here. Promise.
          </p>
        </div>

        <div className="flex items-center gap-0 w-full md:w-auto">
          <div className="flex items-center flex-1 md:flex-none bg-[#2a2a2a] rounded-l-lg border border-[#333] px-4 py-2.5">
            <svg
              className="w-4 h-4 text-[var(--color-footer-muted)] mr-3 shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
              />
            </svg>
            <input
              type="email"
              placeholder="Enter your email"
              className="bg-transparent text-white text-sm placeholder-[var(--color-footer-muted)] outline-none w-48"
            />
          </div>
          <button className="bg-white text-[var(--color-foreground)] text-sm font-semibold px-5 py-2.5 rounded-r-lg hover:bg-gray-100 transition-colors whitespace-nowrap">
            Subscribe
          </button>
        </div>
      </div>
    </footer>
  );
}
