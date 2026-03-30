const { PrismaClient } = require('@prisma/client');
const p = new PrismaClient();

async function main() {
  const post = await p.post.findUnique({
    where: { slug: 'symptoms-of-dead-car-battery' },
    select: { content: true }
  });

  // Find any div that contains tel:0996731296
  const idx = post.content.indexOf('tel:0996731296');
  if (idx > -1) {
    // Go back to find the parent div
    const start = Math.max(0, idx - 800);
    const end = Math.min(post.content.length, idx + 800);
    console.log('=== CTA CONTEXT ===');
    console.log(post.content.substring(start, end));
  }

  await p.$disconnect();
}

main().catch(console.error);
