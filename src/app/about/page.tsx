import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "Hey, I'm Kamila. I write about SEO, content strategy, and growth marketing. Data over opinions. Frameworks over fluff.",
  alternates: {
    canonical: "https://contentlevers.xyz/about",
  },
};

export default function About() {
  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Kamila Olexa",
    "url": "https://contentlevers.xyz/about",
    "jobTitle": "Growth Marketing Lead",
    "sameAs": [
      "https://www.linkedin.com/in/kamila-olexa-190074112/",
      "https://x.com/consistentlytop",
      "https://zkami.substack.com",
    ],
  };

  return (
    <div className="max-w-3xl mx-auto px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <section className="pt-14 pb-20">
        <div className="prose">

          <div className="not-prose mb-10">
            <h1 className="text-3xl font-bold mb-4">Hey, I&apos;m Kamila</h1>
            <img
              src="/posts/kamila-olexa.webp"
              alt="Kamila Olexa"
              className="rounded-2xl w-32 h-32 object-cover mb-4"
            />
            <p className="text-lg text-[var(--color-muted)]">
              I write about what works in SEO, growth, and content. Data over opinions. Frameworks over fluff.
            </p>
          </div>

          <p>
            I&apos;m a growth marketer based in Europe. I&apos;ve done SEO, PPC, content, branding, and distribution across early-stage companies and scaleups. Loved my time at Better Stack where I scaled their PPC campaigns, and helped to grow the newsletter to 5,000 subscribers in the first 3 months. Right now I lead organic and paid growth at Morgen, where the blog became a larger revenue driver than paid acquisition, and ranks as #2 brand mentioned as well as #1 domain cited for tracked AI prompts. I also consult startups on the side.
          </p>

          <p>
            My focus is the acquisition side of growth: getting eyeballs on things. SEO, paid, campaigns, copies, positioning, distribution. So people have easier time to find you.
          </p>

          <h2>It all started with a LinkedIn experiment</h2>

          <p>
            I kept hitting super annoying bottlenecks at work, and I figured others must be feeling the same. So I started posting some solutions on LinkedIn.
          </p>

          <p>
            One of the posts the second week hit a little viral moment.
          </p>

          <div className="my-8">
            <img
              src="/posts/linkedin_viral.gif"
              alt="LinkedIn post going viral"
              className="rounded-lg border border-[var(--color-border)] w-full max-w-md"
            />
          </div>

          <p>
            I got incredible feedback for the article, people were sharing it with their teams, got thumbs up from the Ahrefs marketing team. It was everything a girl can wish for really.
          </p>

          <div className="my-8">
            <img
              src="/posts/linkedin_dm.webp"
              alt="LinkedIn DM sharing the newsletter with their content marketing team"
              className="rounded-lg border border-[var(--color-border)] w-full max-w-md"
            />
          </div>

          <h2>What Content Levers covers</h2>

          <p>
            This will never become a generic &quot;10 SEO tips&quot; content. There&apos;s enough of that on the internet. Instead, every piece has original data or analysis behind it.
          </p>

          <p>Here&apos;s what you&apos;ll find:</p>

          <ul>
            <li><strong>SEO teardowns with real data.</strong> I pull the numbers, compare strategies across companies, and show you what&apos;s working and why.</li>
            <li><strong>Growth experiments.</strong> I test things (like <a href="/blog/ai-search-optimization-5-platforms">running the same query across 5 AI platforms to see what gets cited</a>) and share the raw results.</li>
            <li><strong>Tools and systems I build.</strong> From brand monitoring radars to content automation workflows. Full walkthroughs with code so you can build your own.</li>
          </ul>

          <p>
            If you care about SEO, paid acquisition, content strategy, positioning, or distribution, and you want real analysis instead of recycled advice, you&apos;ll like it here.
          </p>

          <h2>Let&apos;s stay in touch</h2>

          <p>
            I publish weekly. You can find me on{" "}
            <a href="https://www.linkedin.com/in/kamila-olexa-190074112/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            {" "}or{" "}
            <a href="https://x.com/consistentlytop" target="_blank" rel="noopener noreferrer">X</a>.
            Or subscribe below and get new posts delivered to your inbox.
          </p>

          <div className="not-prose mt-8 flex items-center gap-0 w-full sm:w-auto">
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
                className="flex-1 sm:w-64 bg-white text-[var(--color-foreground)] text-sm placeholder-[#aaa] px-4 py-2.5 rounded-l-lg border border-[var(--color-border)] outline-none focus:border-[#999] transition-colors"
              />
              <button
                type="submit"
                className="bg-[var(--color-foreground)] text-white text-sm font-semibold px-5 py-2.5 rounded-r-lg hover:opacity-80 transition-opacity whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          </div>
          <p className="not-prose text-sm text-[var(--color-muted)] mt-3">📬 Join growth marketers who read Content Levers every week.</p>

        </div>
      </section>
    </div>
  );
}
