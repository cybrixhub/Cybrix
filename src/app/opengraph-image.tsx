import { ImageResponse } from "next/og";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { SITE } from "@/lib/site";

export const alt = `${SITE.name} — ${SITE.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const wordmark = `data:image/png;base64,${readFileSync(
  join(process.cwd(), "public/brand/cybrix-wordmark.png"),
).toString("base64")}`;

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#8f2d2d",
          padding: "72px",
          fontFamily: "serif",
        }}
      >
        {/* Masthead row */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: "1px solid rgba(247,239,228,0.35)",
            paddingBottom: "26px",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={wordmark}
            alt={SITE.name}
            width={220}
            height={132}
            style={{ objectFit: "contain" }}
          />
          <div
            style={{
              fontSize: "20px",
              letterSpacing: "4px",
              textTransform: "uppercase",
              color: "#e8c9b4",
            }}
          >
            Social &amp; Content Studio
          </div>
        </div>

        {/* Headline */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: "92px",
            fontWeight: 500,
            lineHeight: 1.04,
            letterSpacing: "-0.01em",
            color: "#f7efe4",
          }}
        >
          <span>Make your startup</span>
          <span style={{ fontStyle: "italic" }}>impossible to ignore.</span>
        </div>

        {/* Footer row */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid rgba(247,239,228,0.35)",
            paddingTop: "26px",
            fontSize: "24px",
            color: "#e8c9b4",
          }}
        >
          <span>Attention → pipeline. Not vanity metrics.</span>
          <span style={{ color: "#e0a458" }}>cybrix.uk</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
