import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title") ?? "Vitalii Popov";
  const subtitle = searchParams.get("subtitle") ?? "Full-Stack Engineer · Berlin";
  const metric = searchParams.get("metric") ?? "";

  return new ImageResponse(
    (
      <div
        style={{
          background: "#0a0a0a",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          fontFamily: "sans-serif",
        }}
      >
        {/* Top accent line */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 40, height: 3, background: "#fff", borderRadius: 2 }} />
          <span style={{ color: "#888", fontSize: 18, letterSpacing: 2 }}>
            vitaliipopov.dev
          </span>
        </div>

        {/* Main content */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {metric && (
            <span
              style={{
                color: "#e5e5e5",
                fontSize: 52,
                fontWeight: 800,
                lineHeight: 1,
                marginBottom: 8,
              }}
            >
              {metric}
            </span>
          )}
          <span
            style={{
              color: "#fff",
              fontSize: metric ? 44 : 64,
              fontWeight: 700,
              lineHeight: 1.1,
              maxWidth: 900,
            }}
          >
            {title}
          </span>
          <span style={{ color: "#888", fontSize: 28, lineHeight: 1.4, maxWidth: 800 }}>
            {subtitle}
          </span>
        </div>

        {/* Bottom */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div style={{ display: "flex", gap: 16 }}>
            {["Go", "TypeScript", "React", "Distributed Systems", "AI"].map((tag) => (
              <span
                key={tag}
                style={{
                  background: "#1a1a1a",
                  border: "1px solid #333",
                  color: "#aaa",
                  padding: "6px 14px",
                  borderRadius: 6,
                  fontSize: 16,
                }}
              >
                {tag}
              </span>
            ))}
          </div>
          <span style={{ color: "#555", fontSize: 16 }}>Berlin, Germany</span>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
