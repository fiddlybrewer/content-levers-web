import { ImageResponse } from "next/og";

export const alt = "ContentLens — Free On-Page SEO Chrome Extension";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "80px",
          width: "100%",
          height: "100%",
          background: "#ffffff",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 22,
            fontWeight: 600,
            color: "#6b6b6b",
            textTransform: "uppercase",
            letterSpacing: "0.12em",
            marginBottom: 16,
          }}
        >
          Free Tool
        </div>
        <div
          style={{
            fontSize: 64,
            fontWeight: 800,
            color: "#1a1a1a",
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
          }}
        >
          ContentLens
        </div>
        <div
          style={{
            fontSize: 28,
            color: "#6b6b6b",
            marginTop: 16,
          }}
        >
          On-page SEO audit in Chrome's side panel. No signup, no tracking.
        </div>
        <div
          style={{
            fontSize: 18,
            color: "#a1a1a1",
            marginTop: 40,
          }}
        >
          contentlevers.xyz
        </div>
      </div>
    ),
    { ...size }
  );
}
