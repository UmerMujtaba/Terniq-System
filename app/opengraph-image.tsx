import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site-config";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#F5F6FB",
          color: "#131737",
        }}
      >
        <div style={{ display: "flex", fontSize: 26, color: "#2F3FE0", fontFamily: "sans-serif" }}>
          {siteConfig.name}
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 22,
            fontSize: 56,
            fontWeight: 700,
            maxWidth: 950,
            lineHeight: 1.2,
          }}
        >
          {siteConfig.tagline}
        </div>
        <div style={{ display: "flex", marginTop: 26, fontSize: 26, color: "#5A5F82", maxWidth: 850 }}>
          React Native, Flutter, Next.js, Shopify, Firebase, Supabase
        </div>
      </div>
    ),
    { ...size }
  );
}
