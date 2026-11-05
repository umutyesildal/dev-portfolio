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
    ".avif": "image/avif",
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
          padding: 48,
          backgroundColor: colors.background,
          fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "stretch",
            padding: 56,
            border: `1px solid ${colors.border}`,
            borderRadius: 24,
            backgroundColor: colors.card,
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              flex: 1,
              justifyContent: "space-between",
              paddingRight: 52,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                fontSize: 18,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: colors.mutedText,
              }}
            >
              <span
                style={{
                  width: 8,
                  height: 8,
                  marginRight: 12,
                  borderRadius: 999,
                  backgroundColor: colors.accent,
                }}
              />
              {preview.eyebrow}
            </div>

            <div style={{ display: "flex", flexDirection: "column" }}>
              <div
                style={{
                  display: "flex",
                  maxWidth: 700,
                  marginBottom: 20,
                  fontSize: 66,
                  fontWeight: 600,
                  lineHeight: 1,
                  letterSpacing: "-0.04em",
                  color: colors.text,
                }}
              >
                {preview.title}
              </div>
              <div
                style={{
                  display: "flex",
                  maxWidth: 660,
                  fontSize: 24,
                  lineHeight: 1.4,
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
                justifyContent: "space-between",
                paddingTop: 20,
                borderTop: `1px solid ${colors.border}`,
                fontSize: 17,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: colors.text,
              }}
            >
              <span>{preview.footer}</span>
              <span style={{ color: colors.mutedText }}>
                {data.site.location}
              </span>
            </div>
          </div>

          <div
            style={{
              width: 264,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                padding: 10,
                border: `1px solid ${colors.border}`,
                borderRadius: 26,
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
                  borderRadius: 18,
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
