import type { MetadataRoute } from "next";
import { createAdminClient } from "@/utils/supabase/admin";
import { SITE } from "@/lib/config/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = SITE.url.startsWith("http")
    ? SITE.url
    : "https://nenfaitpastoutunfromage.fr";

  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, changeFrequency: "weekly", priority: 1 },
    { url: `${baseUrl}/boutique`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/marches`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/actu`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${baseUrl}/artisan`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/contact`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${baseUrl}/mentions-legales`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${baseUrl}/cgv`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${baseUrl}/confidentialite`, changeFrequency: "yearly", priority: 0.2 },
  ];

  const supabase = createAdminClient();
  const { data: produits } = await supabase
    .from("produits")
    .select("slug, updated_at")
    .eq("disponible", true);

  const productPages: MetadataRoute.Sitemap = (produits ?? []).map((p) => ({
    url: `${baseUrl}/boutique/${p.slug}`,
    lastModified: p.updated_at ? new Date(p.updated_at) : undefined,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [...staticPages, ...productPages];
}
