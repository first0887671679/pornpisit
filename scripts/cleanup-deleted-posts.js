const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Slugs to permanently delete from DB
// These are duplicates or posts that were previously deleted by admin
const SLUGS_TO_DELETE = [
  'alternator-failure-symptoms',       // duplicate of alternator-failure-symptoms-guide (full SEO version)
  'car-polishing-paint-correction-guide', // already deleted by admin, seed file removed
  'car-parked-too-long-battery-dead-guide', // already deleted by admin, seed file removed
];

async function main() {
  console.log('=== Cleanup: Permanently deleting posts ===\n');

  for (const slug of SLUGS_TO_DELETE) {
    const post = await prisma.post.findUnique({ where: { slug } });
    if (post) {
      await prisma.post.delete({ where: { slug } });
      console.log('DELETED: ' + slug + ' (' + post.title + ')');
    } else {
      console.log('SKIP (not found): ' + slug);
    }
  }

  // Show remaining count
  const remaining = await prisma.post.count();
  console.log('\nRemaining posts in DB: ' + remaining);

  await prisma.$disconnect();
}

main().catch(console.error);
