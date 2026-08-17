import { ImageResponse } from "next/og";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { findService, SITE } from "@/lib/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const wordmark = `data:image/png;base64,${readFileSync(
  join(process.cwd(), "public/brand/cybrix-wordmark.png"),
).toString("base64")}`;

export default async function ServiceOgImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = findService(slug);
  const name = service?.name ?? "Our Services";
  const tagline = service?.tagline ?? SITE.tagline;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#14317A",
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
            borderBottom: "1px solid rgba(120,239,235,0.3)",
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
              color: "#78EFEB",
            }}
          >
            Service
          </div>
        </div>

        {/* Service name */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          <div
            style={{
              fontSize: "80px",
              fontWeight: 600,
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              color: "#f7efe4",
            }}
          >
            {name}
          </div>
          <div
            style={{
              fontSize: "28px",
              lineHeight: 1.4,
              color: "#B9CBE4",
              maxWidth: "820px",
            }}
          >
            {tagline}
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid rgba(120,239,235,0.3)",
            paddingTop: "26px",
            fontSize: "22px",
            color: "#B9CBE4",
          }}
        >
          <span>Social &amp; Content Studio for Startups</span>
          <span style={{ color: "#78EFEB" }}>cybrix.uk</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
