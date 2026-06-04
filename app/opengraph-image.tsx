import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Kauã Santos — Desenvolvedor Full-Stack & IA";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 96,
          background: "linear-gradient(135deg, #050505 0%, #0f0a1f 55%, #1a0b2e 100%)",
          color: "white",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 26,
            color: "#a78bfa",
            letterSpacing: 10,
            marginBottom: 28,
            textTransform: "uppercase",
          }}
        >
          Portfolio
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 124,
            fontWeight: 900,
            letterSpacing: -2,
            lineHeight: 1,
            marginBottom: 28,
          }}
        >
          Kauã Santos
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 46,
            color: "#e4e4e7",
            marginBottom: 48,
          }}
        >
          Desenvolvedor Full-Stack & IA
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 26,
            color: "#71717a",
          }}
        >
          TypeScript · Next.js · NestJS · PostgreSQL · RAG
        </div>
      </div>
    ),
    { ...size },
  );
}
