import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const today = new Date("2026-03-18T00:00:00+07:00");

  const posts = await prisma.post.findMany({
    where: { createdAt: { gte: today } },
    select: { id: true, slug: true, title: true },
  });

  console.log(`Found ${posts.length} post(s) to delete:\n`);
  posts.forEach((p, i) => {
    console.log(`${i + 1}. [${p.id}] ${p.slug}`);
  });

  const result = await prisma.post.deleteMany({
    where: { createdAt: { gte: today } },
  });

  console.log(`\n✅ Deleted ${result.count} post(s) successfully.`);
  await prisma.$disconnect();
}

main();
