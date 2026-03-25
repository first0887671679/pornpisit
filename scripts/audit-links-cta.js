const { PrismaClient } = require('@prisma/client');
const p = new PrismaClient();

async function main() {
  const posts = await p.post.findMany({
    select: { slug: true, content: true },
    orderBy: { createdAt: 'asc' }
  });

  // Collect all internal links
  const allLinks = {};
  const validPages = [
    '/', '/mobile-tire-repair', '/battery-replacement', '/alternator-starter',
    '/car-polishing', '/check-price', '/contact-us', '/posts',
  ];
  const validPostSlugs = posts.map(function(p) { return p.slug; });

  console.log('=== BROKEN INTERNAL LINKS ===\n');
  for (const post of posts) {
    const linkMatches = post.content.match(/href="([^"]+)"/g) || [];
    const links = linkMatches.map(function(m) { return m.match(/href="([^"]+)"/)[1]; });
    
    for (const link of links) {
      if (link.startsWith('/blog/')) {
        const slug = link.replace('/blog/', '');
        const exists = validPostSlugs.includes(slug);
        console.log('  [' + (exists ? 'FIXABLE' : 'BROKEN') + '] ' + post.slug + ' => ' + link);
        if (!allLinks[link]) allLinks[link] = [];
        allLinks[link].push(post.slug);
      } else if (link.startsWith('/service-area')) {
        console.log('  [BROKEN] ' + post.slug + ' => ' + link + ' (page does not exist)');
      }
    }
  }

  console.log('\n=== UNIQUE BROKEN LINK TARGETS ===\n');
  for (const link of Object.keys(allLinks)) {
    const slug = link.replace('/blog/', '');
    const correctLink = validPostSlugs.includes(slug) ? '/posts/' + slug : 'DELETED';
    console.log('  ' + link + ' => ' + correctLink + ' (used in ' + allLinks[link].length + ' posts)');
  }

  // Check CTA pattern in first post
  console.log('\n=== SAMPLE CTA HTML (first post with CTA) ===\n');
  for (const post of posts) {
    // Find CTA section
    const ctaMatch = post.content.match(/<div[^>]*(?:bg-gradient|bg-orange|rounded-2xl|cta)[^>]*>[\s\S]*?<\/div>\s*<\/div>/i);
    if (ctaMatch) {
      console.log('Post: ' + post.slug);
      console.log(ctaMatch[0].substring(0, 500));
      console.log('...\n');
      break;
    }
  }

  await p.$disconnect();
}

main().catch(console.error);
