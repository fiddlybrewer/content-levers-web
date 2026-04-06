import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-20 bg-[var(--color-surface)]">
      {/* Main footer */}
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Brand column */}
          <div className="col-span-2">
            <Link href="/" className="text-[var(--color-foreground)] text-lg font-bold hover:opacity-70 transition-opacity">
              Content Levers
            </Link>
            <p className="text-[var(--color-muted)] text-sm mt-2 max-w-xs leading-relaxed">
              Actionable tips for marketers who care about data over opinions.
            </p>
            <div className="flex items-center gap-4 mt-4">
              <a
                href="https://www.linkedin.com/in/kamila-olexa-190074112/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--color-muted)] hover:text-[var(--color-foreground)] transition-colors"
                aria-label="LinkedIn"
              >
                <svg className="w-4.5 h-4.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a
                href="https://x.com/consistentlytop"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--color-muted)] hover:text-[var(--color-foreground)] transition-colors"
                aria-label="X"
              >
                <svg className="w-4.5 h-4.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Free tools */}
          <div>
            <Link
              href="/free-tools"
              className="text-[var(--color-foreground)] text-xs font-semibold uppercase tracking-wider mb-3 inline-block hover:opacity-70 transition-opacity"
            >
              Free tools
            </Link>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link
                  href="/free-tools/topic-cluster-generator"
                  className="text-[var(--color-muted)] hover:text-[var(--color-foreground)] transition-colors"
                >
                  Topic cluster generator
                </Link>
              </li>
            </ul>
          </div>

          {/* Notes */}
          <div>
            <h4 className="text-[var(--color-foreground)] text-xs font-semibold uppercase tracking-wider mb-3">
              Notes
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/notes" className="text-[var(--color-muted)] hover:text-[var(--color-foreground)] transition-colors">
                  Thought essays
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-[var(--color-foreground)] text-xs font-semibold uppercase tracking-wider mb-3">
              Resources
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li className="text-[#ccc]">Coming soon</li>
            </ul>
          </div>
        </div>

        {/* Subscribe bar */}
        <div className="mt-10 pt-8 border-t border-[var(--color-border)] flex flex-col sm:flex-row items-center justify-between gap-5">
          <p className="text-[var(--color-foreground)] text-sm font-medium">
            Data-backed SEO and growth. No fluff. Delivered weekly.
          </p>
          <form
            action="https://zkami.substack.com/api/v1/free?nojs=true"
            method="post"
            className="flex items-center gap-0 w-full sm:w-auto"
          >
            <input
              type="email"
              name="email"
              placeholder="your@email.com"
              required
              className="flex-1 sm:w-56 bg-white text-[var(--color-foreground)] text-sm placeholder-[#aaa] px-4 py-2.5 rounded-l-lg border border-[var(--color-border)] outline-none focus:border-[#999] transition-colors"
            />
            <button
              type="submit"
              className="bg-[var(--color-foreground)] text-white text-sm font-semibold px-5 py-2.5 rounded-r-lg hover:opacity-80 transition-opacity whitespace-nowrap"
            >
              Subscribe
            </button>
          </form>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 pt-6 border-t border-[var(--color-border)] flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-5">
            <p className="text-[var(--color-muted)] text-xs">
              &copy; {new Date().getFullYear()} Content Levers
            </p>
            <a
              href="https://contentlevers.betteruptime.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs text-[var(--color-muted)] hover:text-[var(--color-foreground)] transition-colors"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              Available
            </a>
          </div>
          <p className="text-[var(--color-muted)] text-xs">
            Built with ☕ and 🫶
          </p>
        </div>
      </div>
    </footer>
  );
}
