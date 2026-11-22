import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { SITE_URL } from "@/lib/site";

export const OG_SIZE = { width: 1200, height: 630 };

// The dark theme's tokens, as hex: Satori has no CSS variables or oklch().
const BG = "#0f0e0c";
const FG = "#f1f0ed";
const MUTED = "#aeaaa5";
const SUBTLE = "#898581";
const ACCENT = "#f98e46";

/**
 * Satori needs TTF/OTF/WOFF, not the woff2 next/font serves. The TTFs are checked in
 * (lib/fonts, OFL-licensed) rather than fetched from Google at build time: with 60 cards,
 * dropped connections to Google failed or stalled the whole build.
 */
const fonts = Promise.all(
  [400, 600].map((weight) =>
    readFile(join(process.cwd(), "lib/fonts", `Inter-${weight}.ttf`)).then((data) => ({
      name: "Inter",
      data,
      weight: weight as 400 | 600,
      style: "normal" as const,
    })),
  ),
);

function clip(text: string, max: number) {
  return text.length <= max ? text : `${text.slice(0, max - 1).trimEnd()}…`;
}

interface OgCard {
  title: string;
  subtitle?: string;
  /** Top-right label, e.g. "Project". Defaults to the site's host. */
  label?: string;
}

/**
 * The shared share-card. Inline styles only, and every element needs an explicit display:
 * ImageResponse runs Satori, not a browser.
 */
export async function ogImage({ title, subtitle, label }: OgCard) {
  const name = "Jenil Mahyavanshi";
  const right = label ?? new URL(SITE_URL).host;
  const sub = subtitle ? clip(subtitle, 150) : undefined;

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: BG,
        padding: "72px 80px",
        fontFamily: "Inter",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 26 }}>
        <div style={{ display: "flex", alignItems: "center", color: MUTED }}>
          <div
            style={{
              display: "flex",
              width: 12,
              height: 12,
              borderRadius: 6,
              backgroundColor: ACCENT,
              marginRight: 16,
            }}
          />
          {name}
        </div>
        <div style={{ display: "flex", color: SUBTLE }}>{right}</div>
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div
          style={{
            display: "flex",
            fontSize: 68,
            fontWeight: 600,
            lineHeight: 1.08,
            letterSpacing: -1.5,
            color: FG,
          }}
        >
          {clip(title, 90)}
        </div>
        {sub && (
          <div
            style={{ display: "flex", fontSize: 30, lineHeight: 1.4, color: MUTED, marginTop: 28 }}
          >
            {sub}
          </div>
        )}
      </div>
    </div>,
    {
      ...OG_SIZE,
      fonts: await fonts,
    },
  );
}
