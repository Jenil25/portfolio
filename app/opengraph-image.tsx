import { ImageResponse } from "next/og";

export const alt = "Jenil Mahyavanshi — Software Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Inline styles only, and every element needs an explicit display — ImageResponse
// runs Satori, not a browser, so Tailwind classes and default block layout don't apply.
export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: "#0a0a0b",
        borderTop: "8px solid #22d3ee",
        padding: "72px 80px",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", fontSize: 88, color: "#f4f4f0", letterSpacing: "-0.03em" }}>
          Jenil Mahyavanshi
        </div>
        <div style={{ display: "flex", fontSize: 36, color: "#9ca3af", marginTop: 20 }}>
          Software Engineer · production AI systems
        </div>
      </div>
      <div style={{ display: "flex", fontSize: 26, color: "#22d3ee" }}>
        projects · failures · about
      </div>
    </div>,
    size,
  );
}
