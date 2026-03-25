const { PrismaClient } = require('@prisma/client');
const p = new PrismaClient();

async function main() {
  const post = await p.post.findUnique({
    where: { slug: 'alternator-failure-symptoms-guide' },
    select: { content: true }
  });

  // Extract all CTA blocks
  const content = post.content;
  // Find all div blocks with bg-gradient
  const regex = /<div class="relative overflow-hidden bg-gradient[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/g;
  const matches = content.match(regex);
  if (matches) {
    console.log('Found ' + matches.length + ' CTA blocks\n');
    console.log('=== FIRST CTA ===');
    console.log(matches[0]);
    console.log('\n=== LAST CTA ===');
    console.log(matches[matches.length - 1]);
  }

  await p.$disconnect();
}

main().catch(console.error);
