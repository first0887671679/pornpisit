const { PrismaClient } = require('@prisma/client');
const p = new PrismaClient();

const PREVIOUSLY_DELETED = [
  'alternator-failure-symptoms',
  'car-polishing-paint-correction-guide',
  'car-parked-too-long-battery-dead-guide',
];

async function main() {
  console.log('=== Checking previously deleted posts ===\n');
  for (const slug of PREVIOUSLY_DELETED) {
    const post = await p.post.findUnique({ where: { slug }, select: { slug: true, title: true } });
    if (post) {
      console.log('FOUND (should be deleted): ' + slug + ' => ' + post.title);
    } else {
      console.log('OK (not in DB): ' + slug);
    }
  }
  await p.$disconnect();
}

main().catch(console.error);
