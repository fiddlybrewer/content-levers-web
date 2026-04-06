# Content Levers

Actionable SEO strategies, content frameworks, and growth insights for modern marketers.

**Live site:** [contentlevers.xyz](https://contentlevers.xyz)

---

## About

Content Levers is a personal blog + free tool suite for growth marketers. It covers practical SEO experiments, content automation, LLM visibility, and the workflows behind shipping content that actually ranks.

All posts are backed by real experiments — not opinions.

## Free tools

A growing collection of free SEO tools. No signup, no API keys.

- **[Topic Cluster Generator](https://contentlevers.xyz/free-tools/topic-cluster-generator)** — Paste your sitemap and get a visual treemap of your site's topic clusters. Measure topical authority and find content that's hurting your SEO.

More on the way. Got an idea? [DM on LinkedIn](https://www.linkedin.com/in/kamila-olexa-190074112/).

## Tech stack

- **[Next.js 16](https://nextjs.org)** (App Router)
- **[React 19](https://react.dev)**
- **[Tailwind CSS v4](https://tailwindcss.com)**
- **Markdown** content with gray-matter + remark/rehype
- **Inline SVG** for all custom graphics (zero viz dependencies)
- Deployed on **[Vercel](https://vercel.com)**

## Project structure

```
src/
├── app/                              # Next.js App Router
│   ├── api/topic-cluster/            # Topic cluster analysis endpoint
│   ├── blog/                         # Blog listing + post pages
│   ├── free-tools/                   # Free tools index + individual tools
│   ├── notes/
│   ├── about/
│   ├── layout.tsx                    # Root layout + Clarity tracking
│   └── page.tsx                      # Home
├── components/                       # Shared UI
├── lib/                              # Logic (posts loader, topic clustering)
content/posts/                        # Published blog posts (markdown)
```

## Running locally

```bash
# Install
npm install

# Dev server (uses webpack — Turbopack has issues on some setups)
npm run dev

# Production build
npm run build && npm run start
```

Then visit [http://localhost:3000](http://localhost:3000).

## Writing a post

1. Add a markdown file to `content/posts/your-slug.md`
2. Include frontmatter:
   ```markdown
   ---
   title: "Your post title"
   description: "One-line hook for SEO"
   date: "2026-04-06"
   tags: ["SEO", "Experiments"]
   ---
   ```
3. The post automatically appears on `/blog` and at `/blog/your-slug`.

## License

Code is open source (MIT). Content (blog posts, articles) is © Kamila Olexa.

---

Built by [Kamila Olexa](https://www.linkedin.com/in/kamila-olexa-190074112/) · [contentlevers.xyz](https://contentlevers.xyz)
