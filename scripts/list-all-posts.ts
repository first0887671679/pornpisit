const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const posts = await prisma.post.findMany({
    select: { id: true, slug: true, title: true, published: true, createdAt: true },
    orderBy: { createdAt: 'desc' },
  });

  console.log('=== All Posts in Database ===');
  posts.forEach((p: any) => {
    const status = p.published ? 'PUB' : 'DRF';
    const date = new Date(p.createdAt).toLocaleDateString('th-TH');
    console.log(status + ' | ' + date + ' | ' + p.slug);
  });
  console.log('Total: ' + posts.length);
  await prisma.$disconnect();
}

main().catch(console.error);
