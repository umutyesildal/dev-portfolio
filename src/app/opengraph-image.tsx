import { readFileSync } from "node:fs";
import path from "node:path";
import { ImageResponse } from "next/og";
import { getPortfolioData } from "@/data/portfolio";

export const runtime = "nodejs";

const data = getPortfolioData();
const preview = data.socialPreview;

export const alt = preview.imageAlt;
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

function getAvatarDataUrl() {
  const avatarPath = path.join(
    process.cwd(),
    "public",
    preview.avatar.replace(/^\//, "")
  );
  const mimeTypes: Record<string, string> = {
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".png": "image/png",
    ".svg": "image/svg+xml",
    ".webp": "image/webp",
  };
  const mimeType =
    mimeTypes[path.extname(avatarPath).toLowerCase()] ?? "image/jpeg";

  return `data:${mimeType};base64,${readFileSync(avatarPath).toString("base64")}`;
}

export default function Image() {
  const avatarDataUrl = getAvatarDataUrl();
  const colors = preview.colors;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          padding: 42,
          position: "relative",
          overflow: "hidden",
          backgroundColor: colors.background,
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            width: 470,
            height: 470,
            borderRadius: 999,
            top: -250,
            left: -130,
            backgroundColor: colors.accent,
            opacity: 0.38,
          }}
        />
        <div
          style={{
            position: "absolute",
            width: 420,
            height: 420,
            borderRadius: 999,
            right: -170,
            bottom: -240,
            backgroundColor: colors.secondaryAccent,
            opacity: 0.42,
          }}
        />

        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "stretch",
            position: "relative",
            padding: 52,
            border: `1px solid ${colors.border}`,
            borderRadius: 28,
            backgroundColor: colors.card,
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              flex: 1,
              justifyContent: "space-between",
              paddingRight: 48,
            }}
          >
            <div
              style={{
                display: "flex",
                fontSize: 20,
                fontWeight: 700,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: colors.mutedText,
              }}
            >
              {preview.eyebrow}
            </div>

            <div style={{ display: "flex", flexDirection: "column" }}>
              <div
                style={{
                  display: "flex",
                  maxWidth: 730,
                  marginBottom: 22,
                  fontSize: 68,
                  fontWeight: 700,
                  lineHeight: 1.02,
                  letterSpacing: "-0.045em",
                  color: colors.text,
                }}
              >
                {preview.title}
              </div>
              <div
                style={{
                  display: "flex",
                  maxWidth: 720,
                  fontSize: 25,
                  lineHeight: 1.38,
                  color: colors.mutedText,
                }}
              >
                {preview.description}
              </div>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                fontSize: 20,
                fontWeight: 600,
                color: colors.text,
              }}
            >
              <span
                style={{
                  width: 11,
                  height: 11,
                  marginRight: 12,
                  borderRadius: 999,
                  backgroundColor: colors.accent,
                }}
              />
              {preview.footer}
            </div>
          </div>

          <div
            style={{
              width: 272,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                padding: 12,
                border: `1px solid ${colors.border}`,
                borderRadius: 42,
                backgroundColor: colors.background,
              }}
            >
              <img
                src={avatarDataUrl}
                alt={preview.imageAlt}
                width={232}
                height={232}
                style={{
                  width: 232,
                  height: 232,
                  borderRadius: 32,
                  objectFit: "cover",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    ),
    size
  );
}
