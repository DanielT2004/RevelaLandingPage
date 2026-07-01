import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt =
  "Segma — your raw clips in, a ready-to-post TikTok out. Edit food videos in ~10 minutes.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Warm, abstract, editor-themed. No food imagery, no AI clichés.
export default function OpengraphImage() {
  const segments = [
    { w: 150, hook: true },
    { w: 210, hook: false },
    { w: 70, hook: false, cut: true },
    { w: 180, hook: false },
    { w: 80, hook: false, cut: true },
    { w: 170, hook: false },
  ];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#1B1815",
          padding: 72,
          position: "relative",
          fontFamily: "Georgia, serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(900px 500px at 78% 8%, rgba(181,101,74,0.28), transparent 60%)",
            display: "flex",
          }}
        />

        {/* Brand */}
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 52,
              height: 52,
              borderRadius: 14,
              background: "#B5654A",
              color: "#F7F3EC",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 30,
              fontWeight: 700,
            }}
          >
            S
          </div>
          <div style={{ display: "flex", color: "#F7F3EC", fontSize: 30, fontWeight: 600 }}>
            Segma
          </div>
        </div>

        {/* Headline */}
        <div style={{ display: "flex", flexDirection: "column", maxWidth: 940 }}>
          <div
            style={{
              display: "flex",
              color: "#C98368",
              fontSize: 22,
              letterSpacing: 4,
              textTransform: "uppercase",
              fontFamily: "monospace",
              marginBottom: 22,
            }}
          >
            iOS · Launching soon
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", fontSize: 66, lineHeight: 1.08, color: "#F7F3EC", fontWeight: 600 }}>
            Your raw clips in. A{" "}
            <span style={{ color: "#C98368", marginLeft: 14 }}>
              ready-to-post
            </span>
            <span style={{ marginLeft: 14 }}>TikTok out.</span>
          </div>
          <div
            style={{
              display: "flex",
              color: "rgba(247,243,236,0.62)",
              fontSize: 27,
              marginTop: 26,
              fontFamily: "system-ui, sans-serif",
            }}
          >
            2–3 hours of editing, down to about 10 minutes.
          </div>
        </div>

        {/* Timeline motif + chip */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: 8,
              padding: 10,
              borderRadius: 14,
              background: "rgba(0,0,0,0.35)",
            }}
          >
            {segments.map((s, i) => (
              <div
                key={i}
                style={{
                  width: s.w,
                  height: 34,
                  borderRadius: 7,
                  background: s.hook
                    ? "#B5654A"
                    : s.cut
                      ? "rgba(247,243,236,0.08)"
                      : "rgba(247,243,236,0.22)",
                  display: "flex",
                }}
              />
            ))}
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "16px 28px",
              borderRadius: 999,
              background: "#B5654A",
              color: "#F7F3EC",
              fontSize: 26,
              fontWeight: 600,
              fontFamily: "system-ui, sans-serif",
            }}
          >
            Join the waitlist
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
