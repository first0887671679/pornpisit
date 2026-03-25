import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const posts = await prisma.post.findMany({
    where: { published: true },
    select: { slug: true, title: true },
    orderBy: { createdAt: 'desc' },
  });
  
  console.log('All published post slugs:');
  posts.forEach(p => console.log(`  /posts/${p.slug}  →  ${p.title}`));
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
