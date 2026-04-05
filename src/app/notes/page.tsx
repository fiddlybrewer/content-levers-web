import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Notes",
  description: "Short thought essays on growth, marketing, and building things.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotesPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold mb-4">Notes</h1>
      <p className="text-[var(--color-muted)] mb-12">
        Short thought essays. Unpolished.
      </p>

      <div className="space-y-12">
        <p className="text-[var(--color-muted)] text-center py-12">
          Notes coming soon.
        </p>
      </div>
    </div>
  );
}
