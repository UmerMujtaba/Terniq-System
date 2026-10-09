import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: siteConfig.name,
    description: siteConfig.description,
    start_url: "/",
    display: "standalone",
    background_color: "#F5F6FB",
    theme_color: "#F5F6FB",
    icons: [{ src: "/icon", sizes: "any", type: "image/png" }],
  };
}
