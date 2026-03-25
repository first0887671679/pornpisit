import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const updates = [
  { slug: "alternator-burnt-repair-guide", coverImage: "/images/blog/pig-alternator-burnt-cover.svg" },
  { slug: "alternator-repair-price-guide", coverImage: "/images/blog/pig-alternator-repair-price-cover.svg" },
  { slug: "hybrid-car-dead-battery-guide", coverImage: "/images/blog/pig-hybrid-battery-dead-cover.svg" },
  { slug: "pickup-truck-battery-guide", coverImage: "/images/blog/pig-pickup-battery-cover.svg" },
  { slug: "runflat-tire-repair-guide", coverImage: "/images/blog/pig-runflat-tire-repair-cover.svg" },
  { slug: "starter-motor-brush-repair-guide", coverImage: "/images/blog/pig-starter-brush-cover.svg" },
  { slug: "woman-flat-tire-survival-guide", coverImage: "/images/blog/pig-woman-flat-tire-cover.svg" },
];

async function main() {
  console.log("🔄 อัปเดต coverImage สำหรับ 7 โพสต์วันที่ 19 มีนาคม 2026...\n");

  for (const u of updates) {
    try {
      const post = await prisma.post.update({
        where: { slug: u.slug },
        data: { coverImage: u.coverImage },
      });
      console.log(`✅ ${post.slug} => ${post.coverImage}`);
    } catch (err: any) {
      console.error(`❌ ${u.slug}: ${err.message}`);
    }
  }

  console.log("\n🎉 อัปเดตเสร็จสิ้น!");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
