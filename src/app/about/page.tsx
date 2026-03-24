import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "About Content Levers — who we are and what we write about.",
};

export default function About() {
  return (
    <div className="max-w-3xl mx-auto px-6">
      <section className="pt-14 pb-20">
        <h1 className="text-2xl font-bold mb-6">About</h1>
        <div className="prose">
          <p>
            Content Levers is a blog about SEO strategy, content frameworks, and
            the tactics that actually move organic growth forward.
          </p>
          <p>
            No fluff, no filler — just clear, actionable insights you can apply
            today.
          </p>
        </div>
      </section>
    </div>
  );
}
