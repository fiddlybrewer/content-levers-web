---
title: "How ClickUp's Blog Lost 97.6% of Its Traffic in 15 Months"
description: "Everyone reported ClickUp's traffic decline as a 50% drop. The real number is 97.6%, from 1.19M monthly visits to 29K, and it is still falling."
date: "2026-04-11"
tags: ["Breakdown", "SEO"]
keywords: ["clickup blog traffic", "clickup seo decline", "clickup traffic drop", "helpful content update", "saas blog seo", "content strategy teardown", "google core update 2025", "topical authority", "clickup blog crash", "seo case study"]
author: "Kamila Olexa"
authorRole: "Growth Marketing Lead"
authorBio: "Kamila writes about SEO, content strategy, and growth marketing. Consulting and leading organic and paid growth at multiple startups from 0 to 100k monthly visitors and counting."
authorImage: "/posts/kamila-olexa.webp"
authorLinkedin: "https://www.linkedin.com/in/kamila-olexa-190074112/"
---

![ClickUp blog performance: referring domains vs organic traffic](/posts/clickup_breakdown/clickup_blog.webp)

In January 2025, ClickUp's blog was bringing 1.19 million organic visitors per month.

Today, in April 2026, that number is **28,790**.

That is a 97.6% decline in fifteen months. Not the "50% drop" that has been widely reported. 

And it is still falling.

When Ryan Robinson published his [ClickUp marketing review](https://rightblogger.com/blog/clickup-marketing-review) in January 2026, the blog was at roughly 127K monthly visits. His analysis was solid, but it captured a snapshot of a problem that has since gotten four times worse. On LinkedIn, SEO consultants pointed to "topical overreach" and said Google was punishing ClickUp for ranking outside their lane.

Both of those explanations seemed incomplete, so I looked at the data.

I pulled ClickUp's search history from Ahrefs, crawled their sitemaps from December 2024 through today, mapped every Google algorithm update against their traffic timeline, pulled archived versions of their top pages from the [Wayback Machine](https://web.archive.org/), and reverse-engineered their response to the crash.

What I found: ClickUp's blog was not collateral damage from a single update. It was hit by multiple consecutive Google updates across two years, and ClickUp's response to each hit made the next one worse.

## The timeline

![ClickUp blog organic traffic timeline with Google updates](/posts/clickup_breakdown/blog-traffic-timeline.svg)

For context: in March 2024, Google introduced new spam policies explicitly targeting "scaled content abuse" (content produced at scale primarily to manipulate rankings) and content that "feels like it was made to attract clicks." That is, quite literally, ClickUp's blog playbook. Two more core updates followed in August and November 2024, each emphasizing E-E-A-T and content quality. By the time ClickUp's blog peaked in January 2025, Google had already been tightening the criteria for over a year.

Here is ClickUp's blog traffic (clickup.com/blog/*) month by month, with every confirmed Google update mapped against it.


| Month    | Blog organic traffic | Change | Google update                                    |
| -------- | -------------------- | ------ | ------------------------------------------------ |
| Apr 2024 | 931,018              |        |                                                  |
| May 2024 | 676,434              | -27.4% | Aftermath of **March 2024 Core + Spam Update**   |
| Jun 2024 | 659,428              | -2.5%  | **June 2024 Spam Update** (Jun 20-27)            |
| Jul 2024 | 655,018              | -0.7%  |                                                  |
| Aug 2024 | 728,377              | +11.2% | **August 2024 Core Update** (completed Sep 3)    |
| Sep 2024 | 799,988              | +9.8%  | Recovery                                         |
| Oct 2024 | 920,593              | +15.1% |                                                  |
| Nov 2024 | 997,762              | +8.4%  | **November 2024 Core Update** (Nov 1 - Dec 5)    |
| Dec 2024 | 1,085,109            | +8.8%  | **December 2024 Core + Spam Update** (Dec 11-26) |
| Jan 2025 | 1,193,114            | +10.0% | **Peak**                                         |
| Feb 2025 | 1,163,137            | -2.5%  |                                                  |
| Mar 2025 | 942,293              | -19.0% | **March 2025 Core Update** (Mar 13-27)           |
| Apr 2025 | 492,450              | -47.7% | Aftermath                                        |
| May 2025 | 443,016              | -10.0% |                                                  |
| Jun 2025 | 364,093              | -17.8% | **June 2025 Core Update** (Jun 30 - Jul 17)      |
| Jul 2025 | 404,029              | +11.0% | Brief recovery                                   |
| Aug 2025 | 272,281              | -32.6% | **August 2025 Spam Update** (Aug 26 - Sep 22)    |
| Sep 2025 | 186,149              | -31.6% | Aftermath                                        |
| Oct 2025 | 134,111              | -28.0% |                                                  |
| Nov 2025 | 130,419              | -2.8%  | Plateau                                          |
| Dec 2025 | 133,621              | +2.5%  | **December 2025 Core Update** (Dec 11-29)        |
| Jan 2026 | 127,325              | -4.7%  |                                                  |
| Feb 2026 | 86,940               | -31.7% |                                                  |
| Mar 2026 | 63,636               | -26.8% | **March 2026 Core + Spam Update** (Mar 24-27)    |
| Apr 2026 | 28,790               | -54.8% | Aftermath                                        |


The full timeline reveals something the 2025-only view hides: ClickUp's blog actually survived the 2024 updates and grew through them, peaking at 1.19M in January 2025. The March 2024 "scaled content abuse" policies, the June 2024 Spam Update, then the August 2024 Core Update all hit, and the blog recovered and grew each time. It was the March 2025 Core Update that finally broke it, and every update since has compounded the damage.

<div class="callout callout-warning">
<div class="callout-title"><span class="callout-icon">⚠️</span>A note on AI cannibalization</div>
<div class="callout-body">Some of this decline is partly explained by AI tools like ChatGPT cannibalizing informational queries. People who once googled "out of office message examples" or "itinerary template" now ask ChatGPT directly. That traffic reduction would have happened regardless of content quality. But the loss of rankings for core commercial keywords like "task management software" and "free project management software" is a different problem. People still search those terms, other sites still rank for them, and ClickUp lost both the traffic and the rankings. It is the ranking loss that this investigation focuses on.</div>
</div>

There was exactly one month of recovery after March 2025: July 2025, when traffic ticked up 11% between the June Core Update completing and the August Spam Update beginning. That window lasted four weeks.

## The brand survived. The blog did not.

![Full domain vs. blog traffic](/posts/clickup_breakdown/blog-vs-domain.svg)

ClickUp's blog did not just decline. Most of its pages were almost **removed from Google's traffic allocation,** while the rest of the domain held relatively steady.

Here is the full domain (clickup.com including all subdomains) over the same period:


| Month    | Full domain traffic | Blog traffic | Blog share of the domain |
| -------- | ------------------- | ------------ | ------------------------ |
| Jan 2025 | 2,731,124           | 1,193,114    | 43.7%                    |
| Apr 2025 | 2,009,739           | 492,450      | 24.5%                    |
| Jul 2025 | 2,022,861           | 404,029      | 20.0%                    |
| Oct 2025 | 1,656,915           | 134,111      | 8.1%                     |
| Jan 2026 | 1,624,570           | 127,325      | 7.8%                     |
| Apr 2026 | 1,151,517           | 28,790       | **2.5%**                 |


The full domain went from 2.73M to 1.15M. That is a 57.8% decline, which is meaningful, but far less severe than the blog's 97.6%.

Non-blog pages went from roughly 1.54M to 1.12M over the same period. A 27% decline.

The blog went from being nearly half of ClickUp's organic traffic to contributing 2.5% of it. Google did not punish the ClickUp brand. It punished the ClickUp blog, specifically.

This pattern is consistent with a Helpful Content classifier being applied at the content-type or section level. Google's Helpful Content system, which was folded into core updates starting March 2024, evaluates whether a significant portion of a site's content is "unhelpful." The signal is site-wide in theory, but in practice, when one section of a domain produces overwhelmingly different content from the rest, the effect concentrates there.

## The domain rating

![ClickUp blog domain overview](/posts/clickup_breakdown/clickup_domain_ranking.webp)

During the exact period that ClickUp's blog lost 97.6% of its traffic, their domain metrics went **up**.


| Metric                                  | Jan 2025 | Apr 2026  | Change             |
| --------------------------------------- | -------- | --------- | ------------------ |
| Domain Rating                           | 87       | 90        | +3 points          |
| Blog referring domains                  | 6,896    | 7,727     | +12%               |
| Blog referring domains (peak, Jan 2026) |          | 8,857     | +28% from Jan 2025 |
| Total blog backlinks (all time)         |          | 1,214,301 |                    |
| Total blog backlinks (live)             |          | 124,689   |                    |


ClickUp's domain got stronger. Their blog got more backlinks. Traffic still cratered.

This eliminates backlinks as a root cause. The blog's referring domains grew by 28% between January 2025 and January 2026, the exact period when traffic fell from 1.19M to 127K. Some of that growth was spam (as the page-level analysis later shows, the same Telegram spam network targets both ClickUp and Zapier's competing article, yet Zapier ranks #2). Backlinks, clean or dirty, do not explain the divergence.

ClickUp also appears to be investing in legitimate backlink outreach as part of their recovery strategy (I was recently contacted by a link builder for a collab). This is a reasonable tactic in general, but for this specific problem, it is treating a symptom that does not exist.

## Relevant content does not explain what happened

![ClickUp lost keyword rankings](/posts/clickup_breakdown/clickup_lost_rankings.webp)

The dominant narrative on LinkedIn and in SEO commentary is that ClickUp ranked for too many off-topic keywords and Google punished them for straying outside their core relevance.

That explanation is partially true. ClickUp absolutely ranked for keywords that have nothing to do with project management, and are on the edge of work-related topics. But it does not explain the full picture, because ClickUp's own core-topic keywords died just as hard.

Here are the biggest traffic losers, comparing January 2025 to April 2026:


| Page                                            | Topic               | Jan 2025 traffic | Apr 2026 traffic | Drop   | Core topic?           |
| ----------------------------------------------- | ------------------- | ---------------- | ---------------- | ------ | --------------------- |
| /blog/chatgpt-alternatives/                     | AI tools            | 107,348          | 434              | -99.6% | Vertical, edge cases  |
| /blog/construction-project-management-software/ | PM software         | 47,635           | 1                | -100%  | **Yes**               |
| /blog/out-of-office-message-examples/           | Office templates    | 30,214           | 234              | -99.2% | edge                  |
| /blog/task-management-software/                 | Task management     | 24,526           | 0                | -100%  | **Yes**               |
| /blog/free-project-management-software/         | PM software         | 17,028           | 1                | -100%  | **Yes**               |
| /blog/how-to-strikethrough-in-google-docs/      | Google Docs tips    | 14,017           | 83               | -99.4% | No                    |
| /blog/meeting-agenda/                           | Meeting planning    | 13,513           | 14               | -99.9% | **Yes**               |
| /blog/sop-templates/                            | SOP templates       | 13,297           | 11               | -99.9% | **Yes**               |
| /blog/content-calendar-templates/               | Content planning    | 13,302           | 23               | -99.8% | **Yes**               |
| /blog/best-project-management-tools/            | PM software         | 11,814           | 1                | -99.9% | **Yes**               |
| /blog/whatsapp-status-quotes/                   | WhatsApp quotes     | 13,386           | 301              | -97.8% | No                    |
| /blog/thursday-motivational-quotes-for-work/    | Motivational quotes | 10,699           | 65               | -99.4% | No, work-related only |
| /blog/how-to-create-a-dashboard-in-excel/       | Excel tutorials     | 10,580           | 86               | -99.2% | Edge, vertical cases  |
| /blog/tuesday-motivational-quotes-for-work/     | Motivational quotes | 10,657           | 191              | -98.2% | No, work-related only |
| /blog/note-taking-apps/                         | Productivity apps   | 9,646            | 412              | -95.7% | Borderline            |
| /blog/goal-tracking-apps/                       | Productivity apps   | 9,090            | 20               | -99.8% | Borderline            |
| /blog/resume-templates-word/                    | Resume templates    | 6,307            | 0                | -100%  | No, work-related only |
| /blog/itinerary-templates/                      | Travel templates    | 7,254            | 7                | -99.9% | Edge, vertical cases  |


"Task management software" is ClickUp's exact product category. It went to zero.

"Free project management software" is the #1 commercial keyword for their market. It went to one visit per month.

"Best project management tools" is their direct competitive comparison query. It went to one visit per month.

"Meeting agenda," "SOP templates," and "content calendar templates" are all legitimate workflow and productivity topics that fall squarely within ClickUp's product scope.

All of them got destroyed. Not reduced. Destroyed.

The off-topic content dying (motivational quotes, WhatsApp status ideas, resume templates, travel itineraries) was expected. But the core-topic content dying alongside it is what matters.

## Anatomy of a page that died: the ChatGPT alternatives article

![ChatGPT alternatives article V6, current](/posts/clickup_breakdown/clickup_chatgpt_alternatives_article.webp)

Their biggest single traffic loss was `/blog/chatgpt-alternatives/`, which went from over 100K monthly visits to 434. I pulled every major version from the Wayback Machine and the full Ahrefs history for this specific URL to understand exactly what happened.

### The page had two crashes, not one

![ChatGPT alternatives page traffic](/posts/clickup_breakdown/chatgpt-alternatives-traffic.svg)

The page's first crash (mid-2024, from 27K down to 3.4K) lines up with the June 2024 Spam Update and August 2024 Core Update. It then fully recovered through the November and December 2024 Core Updates, reaching an all-time high of 112K by February 2025. The March 2025 Core Update killed it permanently. By April 2026 it is at 446 visits. 

The keyword data confirms: the number of keywords this page ranked in the top 3 for went from 431 (April 2024) to 11 (September 2024) then rocketed back to 656 (January 2025) before collapsing to 149 (April 2026).

### The page's own link metrics were fine

During the entire period, this page's URL Rating stayed between 12 and 15. It actually **peaked at 15** right as traffic was collapsing (April-August 2025). The page had 180 live referring domains and 395 live backlinks.

Links did not cause the first crash nor the second one.

### Six versions, one URL: the content evolution

![ChatGPT alternatives article V3, Feb 2024 (Wayback Machine)](/posts/clickup_breakdown/clickup_chatgpt_alternatives_article_wayback.webp)


Here is how the page evolved:


| Version            | Author          | Tools | Words  | ClickUp CTAs | Added                                                                           | Removed                                                     | Traffic                   |
| ------------------ | --------------- | ----- | ------ | ------------ | ------------------------------------------------------------------------------- | ----------------------------------------------------------- | ------------------------- |
| V1 (Sep 2023)      | Alex York       | 10    | ~3,200 | 1-2          | Original version                                                                |                                                             | Built rankings            |
| V2-V3 (early 2024) | Alex York       | 12    | ~3,800 | 2-3          | Perplexity, Claude, ClickUp Brain rewrite (3 to 7 features), security messaging |                                                             | Ranking well              |
| V4 (Jul-Oct 2024)  | Alex York       | 15    | ~4,500 | 2-3          | Vertex AI, Microsoft Copilot, Mutable AI, filler intro paragraph                |                                                             | First crash (27K to 3.4K) |
| V5 (Dec 2024)      | **Manasi Nair** | 20    | ~5,150 | ~4           | Meta AI, Chatsonic, Character.AI, 5 others, comparison table, PwC stat          | Copy.ai, SpinBot, Bard, Otter, Bing AI, Alex York as author | Recovered to 112K peak    |
| V5.5 (Mar 2025)    | Manasi Nair     | 20    | ~5,150 | ~5           | "#1 ChatGPT Alternative" CTA, minor edits                                       |                                                             | Edited during Core Update |
| V6 (Apr 2026)      | Manasi Nair     | 20    | ~5,870 | **14+**      | Brain MAX, Autopilot Agents, video, pricing table, FAQ (3/5 answers are ads)    | Casual tone, equal tool coverage                            | 446 visits. Dead.         |


### What this tells us about causation

The author swap and restructure happened together in December 2024 (V5), when the page went from Alex York's 15-tool version to Manasi Nair's 20-tool version. This version actually worked: traffic recovered from 3.4K to 112K. The new author and expanded list were not the problem.

The problem was what came after. Each subsequent version made the page more promotional, and the page kept falling from 107K to 446 through 2026. 

### The backlink profile is not a factor

I also pulled the referring domains for this URL. A significant portion is spam from a Telegram link-selling network ([BHS_LINKS](https://support.google.com/webmasters/thread/357574962/competitor-ranking-with-paid-link-spam-%E2%80%93-is-google-powerless?hl=en)), sending 100+ links across 10 domains with anchor text advertising the service.

However, when I checked Zapier's ChatGPT alternatives page (which ranks #1), I found the exact same spam network targeting it, with even more variants (18 BHS domains vs. ClickUp's 10). Both pages get backlinks from the same junk. 

## What the pages look like

I fetched and analyzed six of the biggest losers. The patterns are identical across all of them, regardless of whether the topic is on-brand or off-topic.

### Every listicle puts ClickUp at #1

Every single listicle on the blog positions ClickUp as the top recommendation, even when it makes no sense when looking at the positioning or verticals of the tools in question:


| Page                     | Topic        | ClickUp at #1?       | Makes sense?              |
| ------------------------ | ------------ | -------------------- | ------------------------- |
| ChatGPT alternatives     | LLM chatbots | Yes                  | No, ClickUp is not an LLM |
| Task management software | PM tools     | Yes                  | Yes                       |
| Free PM software         | PM tools     | Yes                  | Yes                       |
| SOP templates            | Templates    | 10 of 15 are ClickUp | Promotional catalog       |


The ChatGPT alternatives page even acknowledges that ClickUp uses ChatGPT under the hood: "it also lets you access ChatGPT... without paying extra or opening another tab." Their #1 ChatGPT alternative is a wrapper that runs on ChatGPT.

### The ClickUp section is always 4-7x longer than competitors


| Page                     | ClickUp section | Average competitor section | Ratio |
| ------------------------ | --------------- | -------------------------- | ----- |
| ChatGPT alternatives     | ~1,500 words    | ~350 words                 | 4.3x  |
| Task management software | ~2,000 words    | ~350 words                 | 5.7x  |
| Free PM software         | ~2,500 words    | ~350 words                 | 7.1x  |


This is quite standard now, but the ClickUp section on the free PM software page is 2,500 words. That is longer than many standalone blog posts. It includes multiple subsections, embedded videos, product screenshots, a pricing table, a workflow walkthrough, and links to related ClickUp pages. A competitor gets 300 words and a screenshot.

### 8-15 CTAs per page

Every page averages one promotional element per 250-400 words. "Try ClickUp Brain free," "Get Started," "Download ClickUp Brain MAX," pricing tables, product screenshots, embedded videos, all before the reader gets the information they came for. Even the off-topic pages (WhatsApp quotes, motivational quotes, travel templates) carry 8-15 ClickUp promotional blocks each.

### Identical template across 7,000+ posts

![ClickUp listicle template structure](/posts/clickup_breakdown/listicle-template.svg)

Every tool in every listicle follows this exact skeleton, repeated identically across 7,000+ pages.


This structure is applied identically across 7,000+ pages. ClickUp's limitations are always two vague sentences. Competitors get specific, actionable criticisms without any sources.

### Technical SEO

![ClickUp schema showing [year] template variable](/posts/clickup_breakdown/clickup_schema.webp)

The technical SEO reflects this too. Using a dynamic year variable in titles is common and fine. But ClickUp's implementation is broken: the HTML renders "2026" correctly, while the JSON-LD schema still contains a literal `[year]` in three places (the Article headline, the WebPage name, and the BreadcrumbList). Google's structured data parser reads the schema directly and sees `[year]` as the literal text.

<div class="callout callout-info">
<div class="callout-title"><span class="callout-icon">ℹ️</span>Verify it yourself</div>
<div class="callout-body">You can check this using <a href="https://search.google.com/test/rich-results">Google's Rich Results Test</a>. Paste the ClickUp ChatGPT alternatives URL and look at the Article headline and BreadcrumbList fields.</div>
</div>

Compare this to Zapier's schema for the same keyword: clean headline matching the H1, a relevant static image, no unresolved variables.

## What ClickUp did in response

![ClickUp blog content clusters](/posts/clickup_breakdown/clickup_ai_focus.webp)
<p align="center"><em>To generate topic clusters for your website, try the <a href="https://contentlevers.xyz/free-tools/topic-cluster-generator">Topic Cluster Generator</a> for free 🫶</em></p>

To understand why the decline kept accelerating instead of leveling off, I needed to look at what ClickUp did during the crash.

I compared ClickUp's blog sitemap from three points in time:


| Date          | Blog URLs in sitemap | Net change            |
| ------------- | -------------------- | --------------------- |
| December 2024 | 4,225                |                       |
| April 2025    | 5,141                | +916 in 4 months      |
| April 2026    | 7,040                | +2,815 since Dec 2024 |


While their blog was losing 97.6% of its traffic, ClickUp **added 2,815 new posts**. That is a 67% increase in total blog content in sixteen months.

They removed only 42 URLs (less than 1%). Of those 42, 36 were redirected to consolidated versions and 6 were moved to a new `/resources/software-teams/` section. Only 5 posts were truly deleted.

The content they added falls into predictable categories:


| Content type                  | New posts added |
| ----------------------------- | --------------- |
| AI-related (ai-, /ai in slug) | 608             |
| Template-related              | 551             |
| How-to guides                 | 390             |
| "X alternatives" listicles    | 249             |
| Software/tools posts          | 242             |
| ChatGPT/LLM-specific          | 102             |
| "AI agents for [use case]"    | 77              |
| Prompt-related                | 40              |


The AI content (608 posts) was strategically relevant. ClickUp was pivoting to the AI productivity space so writing about AI tools and AI agents aligned with the product direction. But the execution was the same promotional template used everywhere else. 77 "AI agents for [use case]" pages follow an identical programmatic structure. 249 "[competitor] alternatives" listicles all rank ClickUp #1. 551 template posts all funnel to ClickUp signups.

The strategy was defensible. The execution was not. Publishing 2,815 new posts using the same template that triggered the quality signal in the first place did not dilute the problem.

## The paid traffic

![ClickUp blog paid traffic](/posts/clickup_breakdown/clickup_blog_paid_traffic.webp)

Ahrefs data shows ClickUp ran recurring paid campaigns to blog content throughout 2024 and 2025, with periodic spikes. However, paid activity gradually tapered off through late 2025 and into 2026, declining alongside the organic traffic rather than compensating for it.

## What is left

![ClickUp blog top pages today](/posts/clickup_breakdown/clickup_top_pages.webp)

ClickUp's blog currently ranks for approximately 22,000 keywords, down from what Ahrefs estimates was well over 100,000 at peak.

The blog that once drove 1.19 million organic visits per month now survives on generic software tutorials (how to make an Excel spreadsheet, Google Sheets formulas, Google Docs search), competitor brand terms (monday.com login, notion login, rask ai alternatives), its own brand queries, and work-related content (WhatsApp quotes, zoom memes, HR jokes, motivational quotes). Their top page gets 1,734 visits for "how to create a spreadsheet in excel."

Not a single one of their remaining top keywords is a high-intent product search in their own category. "Task management software," "project management tools," "team collaboration software," all of their core commercial queries, are gone.

## The traffic went to competitors, not to zero

![SERP overview for "task management software"](/posts/clickup_breakdown/ahrefs_task_management_software_rankings.webp)

One objection to this analysis is that the traffic decline could be caused by AI Overviews and ChatGPT cannibalizing informational queries. If nobody searches for "task management software" anymore, ClickUp losing that traffic would not be a quality problem.

But people are still searching, and other sites are getting that traffic.

I pulled the current SERPs for ClickUp's former top keywords. Here is who ranks now:

**"task management software" (ClickUp formerly ranked, now position 33):**


| Position | Site                         | Page type      | Traffic |
| -------- | ---------------------------- | -------------- | ------- |
| 2        | thedigitalprojectmanager.com | Product review | 16,991  |
| 3        | trello.com                   | Product page   | 320,438 |
| 4        | microsoft.com                | Product page   | 6,310   |
| 5        | todoist.com                  | Product page   | 119,362 |
| 8        | reddit.com                   | Forum thread   | 2,068   |


**"chatgpt alternatives" (ClickUp formerly ranked #3, now #20):**


| Position | Site               | Page type          | Traffic |
| -------- | ------------------ | ------------------ | ------- |
| 2        | zapier.com/blog    | Comparison article | 25,847  |
| 3        | deepai.org         | Product page       | 46,284  |
| 5        | reddit.com         | Forum thread       | 7,571   |
| 7        | ai.plainenglish.io | Article (Medium)   | 12,907  |
| 8        | wotnot.io          | Comparison article | 3,645   |
| 10       | saner.ai           | Comparison article | 3,540   |


ClickUp is nowhere in the top 10 for their own product verticals. The traffic was redistributed to competitors, independent review sites, and Reddit, not completely destroyed by AI Overviews.

### The self-promotion gradient

The sites that replaced ClickUp in the "chatgpt alternatives" SERP show a pattern:


| Self-promotion level | Site             | Rank | Tools listed | Self at #1?      | CTAs        |
| -------------------- | ---------------- | ---- | ------------ | ---------------- | ----------- |
| Subtle               | Zapier (DR 91)   | #2   | 8            | Yes, #3 and #7   | 3 (intro)   |
| Subtle               | WotNot (DR 58)   | #8   | 8            | Not in main list | 5 (sidebar) |
| Moderate             | Saner.ai (DR 46) | #10  | 9            | Yes, 1.7x longer | 3           |
| Extreme              | ClickUp (DR 90)  | #20  | 20           | Yes, 4.3x longer | 14+         |


Zapier does include itself in the list (at #3 and #7) and runs CTAs in the intro, but the promotion is woven into genuinely useful editorial content rather than dominating it. The gradient still holds: the more aggressively you self-promote at the expense of editorial quality, the worse you rank. Domain authority does not override this. ClickUp (DR 90) is outranked by a DR 46 site and a DR 58 site.

## The Zapier comparison

![Zapier's ChatGPT alternatives article](/posts/clickup_breakdown/zapier_chatgpt_alternatives.webp)

This is the control group.

Zapier runs the same model as ClickUp: a SaaS company with a massive blog that covers topics well beyond its core product (workflow automation). Their blog writes about AI tools, productivity apps, project management, CRM, and dozens of other categories. They have been doing this for years at scale.

Here is how the three largest SaaS blogs in this space performed from their respective peaks to April 2026:


| Blog                       | Peak traffic         | Apr 2026  | Decline    |
| -------------------------- | -------------------- | --------- | ---------- |
| HubSpot (blog.hubspot.com) | 8,612,188 (Apr 2024) | 385,330   | **-95.5%** |
| ClickUp (clickup.com/blog) | 1,193,114 (Jan 2025) | 28,790    | **-97.6%** |
| Zapier (zapier.com/blog)   | 9,844,966 (Feb 2025) | 4,622,220 | -53.0%     |


HubSpot followed the same playbook (cover letter examples, sales quotes, resume templates, template-heavy self-promotion). Their decline has been widely reported and follows the same trajectory.

Zapier also declined from its peak, but the trajectory is completely different. 9.8M to 4.6M is a real decline, likely driven partly by AI Overviews eating informational queries across the board. But Zapier stabilized at 4.6M, still one of the largest SaaS blogs on the internet. ClickUp's blog gets fewer monthly visits than many personal blogs.

### Zapier's editorial approach

I took a look at their editorial, comparing the two ChatGPT alternatives articles side by side:

**Tool selection**

Zapier lists 8 tools that are all genuine ChatGPT alternatives: actual AI chatbots you would use instead of ChatGPT. ClickUp pads to 20 by including tools that are not ChatGPT alternatives in any real sense: Semrush ContentShake AI (SEO tool), Surfer AI (SEO tool), Socratic (engineering management), Elicit (academic research), Character.AI (role-play), Undetectable.ai (AI detection evasion). If you search "chatgpt alternatives," you are not looking for an SEO content optimizer or an AI detection bypass tool.

**Timeliness**

Zapier includes Grok, one of the most discussed AI chatbots of 2025-2026. ClickUp does not list it. ClickUp still lists Amazon CodeWhisperer, which was rebranded to Amazon Q Developer. It lists OpenAI Playground as a ChatGPT "alternative," which is ChatGPT's own API testing tool.

**Depth per tool**

Zapier gives genuine editorial opinions: "I find it very funny that Grok is on this list," Claude "tends to respond more empathetically," Meta AI is "far short of the other apps on this list." ClickUp gives templated descriptions with no editorial voice.

**Selection criteria**

Zapier's criteria is editorial: "Do something better than ChatGPT," "Be easy to use," "Work reliably." ClickUp's is a generic checklist: "Natural language processing," "Auto-completion," "Plugins."

**Cross-linking**

Zapier links to dedicated comparison articles after each tool (Claude vs. ChatGPT, Gemini vs. ChatGPT), giving readers a natural next step. ClickUp links to more ClickUp listicles ("Check out these Claude AI alternatives!"), which are themselves ClickUp-at-#1 promotional pages.

**How it ends**

Zapier closes with "give a few of them a go and find out" and links to related reading. ClickUp closes with "Sign up for a free ClickUp account here!"

Zapier also runs paid ads on "chatgpt alternatives" despite already ranking #2 organically, likely to defend the position from competitors and maintain visibility above AI Overviews. 

This comparison narrows the cause:

- "All SaaS blogs are declining equally." No. Zapier lost 53%, ClickUp lost 97.6%. The severity is not comparable.
- "Google is punishing blogs that write beyond their core topic." No. Zapier writes about everything from AI chatbots to email marketing and still ranks #2 for "chatgpt alternatives."
- "AI Overviews killed all informational traffic." Partially true for everyone, but it does not explain why ClickUp lost rankings for commercial queries like "task management software" where other sites still get traffic.

The variable is not what topics you cover. It is how you cover them.

## My 5 cent hypothesis of what happened

The root cause was not topical overreach. It was multiple compounding failures across content strategy, execution, and technical SEO.

**The content never matched search intent.** When someone searches "chatgpt alternatives," they want a curated list of genuine alternatives with honest assessments. Zapier understood this: 8 relevant tools, editorial opinions, and self-promotion that serves the reader (their own products appear at #3 and #7 but get the same honest treatment as the rest). ClickUp treated it as a keyword to capture: 20 tools (mixing up use cases), ClickUp at #1, 14+ CTAs. The page was optimized for ClickUp's conversion funnel, not for the searcher's question. This mismatch is quite possibly replicated across 7,000+ pages.

**The technical SEO was neglected.** Broken schema with unresolved `[year]` template variables and unsourced claims about competitors. These are individually small issues, but at scale across thousands of pages they compound into a pattern of low-quality optimization.

**Every response made it worse.** The March 2025 hit took them to 492K. From there, they published 2,815 more templated posts instead of pruning. They made top pages more promotional instead of less. Fifteen months of doubling down took them from 492K to 29K.

---

*All traffic, keyword, backlink, and SERP data sourced from Ahrefs, pulled April 10-11, 2026. Google algorithm update dates sourced from [Google Search Status Dashboard](https://status.search.google.com/), [Search Engine Land](https://searchengineland.com/google-algorithm-updates-2025-in-review-3-core-updates-and-1-spam-update-466450), and [Search Engine Journal](https://www.searchenginejournal.com/google-algorithm-history/). Sitemap comparisons based on archived versions from the Wayback Machine (December 2024, April 2025) and live crawl (April 2026). Page content analysis based on six Wayback Machine snapshots (September 2023, January 2024, February 2024, July 2024, April 2025) and six live page fetches (April 2026).* 
