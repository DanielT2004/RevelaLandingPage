import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
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
          fontSize: 112,
          fontWeight: 700,
          fontFamily: "Georgia, serif",
          position: "relative",
        }}
      >
        S
        <div
          style={{
            position: "absolute",
            right: 30,
            bottom: 30,
            width: 26,
            height: 26,
            background: "#B5654A",
            borderRadius: 5,
          }}
        />
      </div>
    ),
    { ...size }
  );
}
