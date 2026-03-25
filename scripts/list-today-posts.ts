import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const today = new Date("2026-03-18T00:00:00+07:00");
  const posts = await prisma.post.findMany({
    where: { createdAt: { gte: today } },
    select: { id: true, slug: true, title: true, createdAt: true },
    orderBy: { createdAt: "desc" },
  });
  console.log("=== Posts created today (2026-03-18) ===");
  posts.forEach((p, i) => {
    console.log(`${i + 1}. [${p.id}] ${p.slug}`);
    console.log(`   Title: ${p.title}`);
    console.log(`   Created: ${p.createdAt}`);
  });
  console.log(`\nTotal: ${posts.length}`);
  await prisma.$disconnect();
}

main();
