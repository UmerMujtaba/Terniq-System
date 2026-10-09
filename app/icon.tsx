import { ImageResponse } from "next/og";
import { COMPANY_NAME } from "@/lib/site-config";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  const initial = COMPANY_NAME.trim().charAt(0).toUpperCase() || "C";
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#2F3FE0",
          color: "#FFFFFF",
          fontSize: 18,
          fontWeight: 700,
          fontFamily: "sans-serif",
          borderRadius: 9,
        }}
      >
        {initial}
      </div>
    ),
    { ...size }
  );
}
