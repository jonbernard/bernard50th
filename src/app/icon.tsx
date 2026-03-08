import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        width: 64,
        height: 64,
        background: "#f5f0e8",
        border: "3px solid #3d2b1f",
        borderRadius: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 1,
      }}
    >
      <div
        style={{
          color: "#c9a26a",
          fontSize: 10,
          lineHeight: 1,
          letterSpacing: "3px",
        }}
      >
        *&nbsp;*
      </div>
      <div
        style={{
          color: "#3d2b1f",
          fontSize: 26,
          fontWeight: 800,
          lineHeight: 1,
          letterSpacing: "-1px",
        }}
      >
        50
      </div>
    </div>,
    { ...size }
  );
}
