const { PrismaClient } = require('@prisma/client');
const p = new PrismaClient();

const SLUGS_TO_DELETE = [
  'tire-blowout-emergency-guide',
  'car-battery-dead-signs-and-solutions',
  'diy-vs-pro-car-polishing',
  'rainy-season-car-checklist',
];

async function main() {
  console.log('=== Deleting 4 posts ===\n');
  for (const slug of SLUGS_TO_DELETE) {
    const post = await p.post.findUnique({ where: { slug } });
    if (post) {
      await p.post.delete({ where: { slug } });
      console.log('DELETED: ' + slug);
    } else {
      console.log('NOT FOUND: ' + slug);
    }
  }
  const remaining = await p.post.count();
  console.log('\nRemaining posts: ' + remaining);
  await p.$disconnect();
}

main().catch(console.error);
