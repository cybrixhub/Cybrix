import { ImageResponse } from "next/og";

export const size = { width: 512, height: 512 };
export const contentType = "image/png";

/** Brand mark: the full stop — a cream period on oxblood. */
export default function Icon() {
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
          padding: "96px",
        }}
      >
        <div
          style={{
            width: "150px",
            height: "150px",
            borderRadius: "50%",
            background: "#f7efe4",
          }}
        />
      </div>
    ),
    { ...size },
  );
}
