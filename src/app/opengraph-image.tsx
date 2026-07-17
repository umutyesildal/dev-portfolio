import { ImageResponse } from "next/og";
import { getPortfolioData } from "@/data/portfolio";
import { readFileSync } from "node:fs";
import path from "node:path";

export const runtime = "nodejs";

const data = getPortfolioData();

export const alt = data.site.name;
export const size = {
    width: 1200,
    height: 630,
};
export const contentType = "image/png";

const styles = {
    outerWrapper: {
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#ffffff",
        position: "relative",
    },
    middleWrapper: {
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#ffffff",
        position: "relative",
        padding: "40px",
    },
    wrapper: {
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#fafafa",
        position: "relative",
        padding: "40px",
        border: "1px solid #e5e5e5",
        borderRadius: "12px",
    },
    imageSection: {
        position: "absolute",
        top: "40px",
        left: "40px",
        display: "flex",
        alignItems: "center",
    },
    mainContainer: {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "flex-end",
        height: "100%",
        width: "100%",
        position: "relative",
    },
    image: {
        width: "140px",
        height: "140px",
        borderRadius: "24px",
        border: "4px solid #e5e5e5",
        objectFit: "cover",
    },
    title: {
        fontFamily: "Arial, sans-serif",
        fontSize: "48px",
        fontWeight: "600",
        lineHeight: "1.1",
        textAlign: "left",
        color: "#000000",
        marginBottom: "16px",
        letterSpacing: "-0.02em",
        maxWidth: "900px",
    },
    description: {
        fontSize: "20px",
        fontWeight: "400",
        lineHeight: "1.5",
        textAlign: "left",
        maxWidth: "800px",
        color: "#404040",
        marginBottom: "32px",
        textWrap: "balance",
    },
} as const;

export default async function Image() {
    try {
        const avatarPath = path.join(
            process.cwd(),
            "public",
            data.site.avatar.replace(/^\//, "")
        );
        const avatarMimeTypes: Record<string, string> = {
            ".jpg": "image/jpeg",
            ".jpeg": "image/jpeg",
            ".png": "image/png",
            ".svg": "image/svg+xml",
            ".webp": "image/webp",
        };
        const avatarMime = avatarMimeTypes[path.extname(avatarPath).toLowerCase()] ?? "image/jpeg";
        const imageUrl = `data:${avatarMime};base64,${readFileSync(avatarPath).toString("base64")}`;

        return new ImageResponse(
            (
                <div style={styles.outerWrapper}>
                    <div style={styles.middleWrapper}>
                        <div style={styles.wrapper}>
                            {imageUrl && (
                                <div style={styles.imageSection}>
                                    <img src={imageUrl} alt={data.site.name} style={styles.image} />
                                </div>
                            )}
                            <div style={styles.mainContainer}>
                                <div style={styles.title}>{data.site.name}</div>
                                {data.site.description && (
                                    <div style={styles.description}>{data.site.description}</div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            ),
            {
                ...size,
            }
        );
    } catch (error) {
        console.error("Error generating OpenGraph image:", error);
        return new Response(
            `Failed to generate image: ${error instanceof Error ? error.message : "Unknown error"}`,
            {
                status: 500,
            }
        );
    }
}
