import { MetadataRoute } from "next";
import { SITE_CONFIG } from "@/lib/seo";
import { prisma } from "@/lib/prisma";

// AI bot user agents ที่จะบล็อกเมื่อปิด AI crawl
const AI_BOTS = [
  "GPTBot",
  "ChatGPT-User",
  "Google-Extended",
  "CCBot",
  "anthropic-ai",
  "Claude-Web",
  "Bytespider",
  "Diffbot",
  "PerplexityBot",
  "Amazonbot",
];

async function getSettings() {
  try {
    const settings = await (prisma as any).siteSettings.findUnique({
      where: { id: "singleton" },
    });
    return settings || { allowGoogleIndex: true, allowAiCrawl: true };
  } catch {
    return { allowGoogleIndex: true, allowAiCrawl: true };
  }
}

export default async function robots(): Promise<MetadataRoute.Robots> {
  const settings = await getSettings();

  const rules: MetadataRoute.Robots["rules"] = [];

  // อนุญาต Facebook/LINE/Social crawlers เสมอ (ให้แสดง OG preview ได้)
  rules.push({
    userAgent: "facebookexternalhit",
    allow: "/",
  });
  rules.push({
    userAgent: "FacebookBot",
    allow: "/",
  });
  rules.push({
    userAgent: "LinkedInBot",
    allow: "/",
  });
  rules.push({
    userAgent: "Twitterbot",
    allow: "/",
  });
  rules.push({
    userAgent: "Line",
    allow: "/",
  });

  if (settings.allowGoogleIndex) {
    // อนุญาตให้ Google index — บล็อกเฉพาะหน้า admin/api
    rules.push({
      userAgent: "*",
      allow: "/",
      disallow: ["/admin/", "/api/", "/login"],
    });
  } else {
    // ปิด Google index — บล็อกทั้งเว็บ
    rules.push({
      userAgent: "*",
      disallow: ["/"],
    });
  }

  if (!settings.allowAiCrawl) {
    // บล็อก AI bots ทั้งหมด
    for (const bot of AI_BOTS) {
      rules.push({
        userAgent: bot,
        disallow: ["/"],
      });
    }
  }

  return {
    rules,
    sitemap: settings.allowGoogleIndex ? `${SITE_CONFIG.url}/sitemap.xml` : undefined,
  };
}
