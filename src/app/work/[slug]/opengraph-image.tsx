import { ImageResponse } from "next/og";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { findWork, SITE } from "@/lib/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const wordmark = `data:image/png;base64,${readFileSync(
  join(process.cwd(), "public/brand/cybrix-wordmark.png"),
).toString("base64")}`;

export default async function WorkOgImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = findWork(slug);
  const client = project?.client ?? "Case Study";
  const result = project?.result ?? "";
  const category = project?.category ?? "";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0f0c08",
          padding: "72px",
          fontFamily: "serif",
        }}
      >
        {/* Top row */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: "1px solid rgba(247,239,228,0.2)",
            paddingBottom: "28px",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={wordmark}
            alt={SITE.name}
            width={180}
            height={108}
            style={{ objectFit: "contain", filter: "brightness(0) invert(1)" }}
          />
          <div
            style={{
              fontSize: "18px",
              letterSpacing: "4px",
              textTransform: "uppercase",
              color: "#e0a458",
            }}
          >
            Case Study
          </div>
        </div>

        {/* Main content */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {category ? (
            <div
              style={{
                fontSize: "20px",
                letterSpacing: "3px",
                textTransform: "uppercase",
                color: "#8a6b46",
              }}
            >
              {category}
            </div>
          ) : null}
          <div
            style={{
              fontSize: "78px",
              fontWeight: 600,
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              color: "#f7efe4",
            }}
          >
            {client}
          </div>
          {result ? (
            <div
              style={{
                fontSize: "36px",
                fontStyle: "italic",
                color: "#e0a458",
                lineHeight: 1.3,
              }}
            >
              {result}
            </div>
          ) : null}
        </div>

        {/* Footer */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid rgba(247,239,228,0.2)",
            paddingTop: "26px",
            fontSize: "22px",
            color: "#8a8074",
          }}
        >
          <span>Social &amp; Content Studio for Startups</span>
          <span style={{ color: "#e0a458" }}>cybrix.uk</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
