export const topicMeta: Record<string, { symbol: string; bg: string; text: string }> = {
  "LLM":           { symbol: "🤖", bg: "#FCEDFF", text: "#B600DB" },
  "Strategy":      { symbol: "♟️", bg: "#EDE9FE", text: "#6D28D9" },
  "Resources":      { symbol: "📦", bg: "#D1FAE5", text: "#047857" },
  "Building":       { symbol: "🛠️", bg: "#DBEAFE", text: "#1D4ED8" },
  "Experiments":    { symbol: "🧪", bg: "#FEF3C7", text: "#B45309" },
  "Breakdown":     { symbol: "🔍", bg: "#FEE2E2", text: "#DC2626" },
  "SEO":           { symbol: "📈", bg: "#FEF3C7", text: "#B45309" },
  "Technical SEO": { symbol: "⚙️", bg: "#FFEDD5", text: "#C2410C" },
  "Growth":        { symbol: "🚀", bg: "#CFFAFE", text: "#0E7490" },
  "Content":       { symbol: "✍️", bg: "#D1FAE5", text: "#047857" },
  "Meta":          { symbol: "💡", bg: "#F3F4F6", text: "#4B5563" },
};

const defaultTopic = { symbol: "📝", bg: "#F3F4F6", text: "#4B5563" };

export function getTopicMeta(tag: string) {
  return topicMeta[tag] || defaultTopic;
}
