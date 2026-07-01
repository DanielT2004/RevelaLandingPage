import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

// Warm charcoal tile, cream "S", terracotta crop-mark corner — reads as an editor, not a food app.
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#2E2A26",
          color: "#F7F3EC",
          fontSize: 22,
          fontWeight: 700,
          fontFamily: "Georgia, serif",
          borderRadius: 7,
          position: "relative",
        }}
      >
        S
        <div
          style={{
            position: "absolute",
            right: 4,
            bottom: 4,
            width: 6,
            height: 6,
            background: "#B5654A",
            borderRadius: 1,
          }}
        />
      </div>
    ),
    { ...size }
  );
}
