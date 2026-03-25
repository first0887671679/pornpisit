const { PrismaClient } = require('@prisma/client');
const p = new PrismaClient();

const CHECK_SLUGS = [
  'symptoms-of-dead-car-battery',
  'car-wont-start-causes-and-fixes',
  'what-to-do-when-car-battery-is-dead',
];

async function main() {
  for (const slug of CHECK_SLUGS) {
    const post = await p.post.findUnique({
      where: { slug },
      select: { slug: true, content: true, coverImage: true }
    });

    console.log('=== ' + slug + ' ===');
    console.log('Cover: ' + post.coverImage);

    // Check for /blog/ links
    const blogLinks = post.content.match(/href="\/blog\/[^"]+"/g);
    console.log('Blog links: ' + (blogLinks ? blogLinks.join(', ') : 'NONE'));

    // Check for old CTA pattern
    const oldCTA = post.content.match(/<div class="relative overflow-hidden bg-gradient-to-br from-slate-50/g);
    console.log('Old CTA: ' + (oldCTA ? oldCTA.length + ' found' : 'NONE'));

    // Check for new CTA pattern
    const newCTA = post.content.match(/<div class="relative overflow-hidden bg-gradient-to-br from-orange-50/g);
    console.log('New CTA: ' + (newCTA ? newCTA.length + ' found' : 'NONE'));

    // Check for any CTA
    const anyCTA = post.content.match(/โทรเรียกช่าง/g);
    console.log('CTA text "โทรเรียกช่าง": ' + (anyCTA ? anyCTA.length + ' found' : 'NONE'));

    // Show first 200 chars of last HTML block
    const lastDiv = post.content.lastIndexOf('<div class="relative');
    if (lastDiv > -1) {
      console.log('Last CTA preview: ' + post.content.substring(lastDiv, lastDiv + 200));
    }
    console.log('');
  }

  await p.$disconnect();
}

main().catch(console.error);
