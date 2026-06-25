import type { MetadataRoute } from "next";
import { SITE } from "@/lib/config/site";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = SITE.url.startsWith("http")
    ? SITE.url
    : "https://nenfaitpastoutunfromage.fr";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/admin/*", "/api", "/api/*"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
