import { ImageResponse } from "next/og";
import { OG_MARK_DATA_URI } from "@/lib/og-mark";

export const runtime = "edge";
export const alt =
  "Revela — you film yourself talking, it cuts like you would. Reviews, Shop promos, food and more in ~10 minutes.";
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
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt="" width={52} height={52} src={OG_MARK_DATA_URI} />
          <div style={{ display: "flex", color: "#F7F3EC", fontSize: 30, fontWeight: 600 }}>
            Revela
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
          <div style={{ display: "flex", flexWrap: "wrap", fontSize: 58, lineHeight: 1.12, color: "#F7F3EC", fontWeight: 600 }}>
            You film yourself talking.{" "}
            <span style={{ color: "#C98368", marginLeft: 14 }}>
              Revela cuts it
            </span>
            <span style={{ marginLeft: 14 }}>like you would.</span>
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
            Reviews · Shop promos · food · vlogs — about 10 minutes, not 3 hours.
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
