import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/** Apple touch icon: the full stop — a cream period on oxblood. */
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#8f2d2d",
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "flex-end",
          padding: "34px",
        }}
      >
        <div
          style={{
            width: "52px",
            height: "52px",
            borderRadius: "50%",
            background: "#f7efe4",
          }}
        />
      </div>
    ),
    { ...size },
  );
}
