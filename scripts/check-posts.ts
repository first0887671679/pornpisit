import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const posts = await prisma.post.findMany({
    where: { published: true },
    select: { slug: true, coverImage: true, title: true },
    orderBy: { createdAt: "desc" },
  });
  
  for (const p of posts) {
    console.log(`${p.slug} | coverImage: ${p.coverImage || "(empty)"}`);
  }
  
  console.log(`\nTotal: ${posts.length} posts`);
}

main().catch(console.error).finally(() => prisma.$disconnect());
