import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Kauã Santos — Desenvolvedor Full-Stack & IA";

async function loadGoogleFont(family: string, weight: number): Promise<ArrayBuffer | null> {
  try {
    const url = `https://fonts.googleapis.com/css2?family=${family.replace(/ /g, "+")}:wght@${weight}`;
    const css = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" } }).then((res) =>
      res.text(),
    );
    const match = css.match(/src: url\((.+?)\) format/);
    if (!match) return null;
    return await fetch(match[1]).then((res) => res.arrayBuffer());
  } catch {
    return null;
  }
}

export default async function OpenGraphImage() {
  const [bold, medium] = await Promise.all([
    loadGoogleFont("Geist", 700),
    loadGoogleFont("Geist", 500),
  ]);

  const fonts = [
    bold && { name: "Geist", data: bold, style: "normal" as const, weight: 700 as const },
    medium && { name: "Geist", data: medium, style: "normal" as const, weight: 500 as const },
  ].filter((f): f is NonNullable<typeof f> => f !== null);

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
          fontFamily: fonts.length > 0 ? "Geist" : "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 144,
            fontWeight: 700,
            letterSpacing: -3,
            lineHeight: 1,
            marginBottom: 36,
          }}
        >
          Kauã Santos
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 60,
            fontWeight: 500,
            color: "#a1a1aa",
            letterSpacing: -0.5,
          }}
        >
          Desenvolvedor Full-Stack & IA
        </div>
        <div
          style={{
            display: "flex",
            width: 160,
            height: 8,
            background: "linear-gradient(90deg, #a78bfa, #06b6d4)",
            borderRadius: 4,
            marginTop: 64,
          }}
        />
      </div>
    ),
    {
      ...size,
      fonts: fonts.length > 0 ? fonts : undefined,
    },
  );
}
