import { PrismaClient } from "@prisma/client";
import * as fs from "fs";
import * as path from "path";

const prisma = new PrismaClient();

// Extract htmlContent from each seed file dynamically
function extractHtmlContent(filePath: string): string {
  const code = fs.readFileSync(filePath, "utf-8");
  // Find the htmlContent between backticks
  const match = code.match(/const htmlContent = `([\s\S]*?)`;/);
  if (!match) throw new Error(`Cannot extract htmlContent from ${filePath}`);
  return match[1];
}

// Extract postData fields from seed file
function extractPostData(filePath: string): Record<string, any> {
  const code = fs.readFileSync(filePath, "utf-8");
  const extract = (key: string): string => {
    const re = new RegExp(`${key}:\\s*"([^"]*)"`, "m");
    const m = code.match(re);
    return m ? m[1] : "";
  };
  return {
    slug: extract("slug"),
    title: extract("title"),
    excerpt: extract("excerpt"),
    coverImage: extract("coverImage"),
    category: extract("category"),
    seoTitle: extract("seoTitle"),
    seoDescription: extract("seoDescription"),
    seoKeywords: extract("seoKeywords"),
    ogTitle: extract("ogTitle"),
    ogDescription: extract("ogDescription"),
  };
}

const seedFiles = [
  "seed-alternator-burnt-post.ts",
  "seed-alternator-repair-price-post.ts",
  "seed-hybrid-car-dead-battery-post.ts",
  "seed-pickup-truck-battery-post.ts",
  "seed-runflat-tire-post.ts",
  "seed-starter-brush-post.ts",
  "seed-woman-flat-tire-post.ts",
];

async function main() {
  console.log("🔄 อัปเดตเนื้อหา HTML สำหรับ 7 โพสต์วันที่ 19 มีนาคม 2026...\n");

  let success = 0;
  let failed = 0;

  for (const file of seedFiles) {
    const filePath = path.join(__dirname, file);
    try {
      const htmlContent = extractHtmlContent(filePath);
      const postData = extractPostData(filePath);

      const result = await prisma.post.update({
        where: { slug: postData.slug },
        data: {
          title: postData.title,
          content: htmlContent,
          excerpt: postData.excerpt,
          coverImage: postData.coverImage,
          category: postData.category,
          published: true,
          seoTitle: postData.seoTitle,
          seoDescription: postData.seoDescription,
          seoKeywords: postData.seoKeywords,
          ogTitle: postData.ogTitle,
          ogDescription: postData.ogDescription,
        },
      });
      success++;
      console.log(`✅ ${result.slug}`);
      console.log(`   title: ${result.title}`);
      console.log(`   coverImage: ${result.coverImage}`);
      console.log(`   content: ${result.content?.substring(0, 60)}...`);
      console.log("");
    } catch (err: any) {
      failed++;
      console.error(`❌ ${file}: ${err.message}\n`);
    }
  }

  console.log(`\n📊 สรุป: สำเร็จ ${success} | ล้มเหลว ${failed} | รวม ${success + failed}/7`);
  console.log("🎉 เสร็จสิ้น!");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
