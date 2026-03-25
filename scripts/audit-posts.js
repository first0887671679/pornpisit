const { PrismaClient } = require('@prisma/client');
const p = new PrismaClient();

async function main() {
  const posts = await p.post.findMany({
    select: { slug: true, title: true, coverImage: true, content: true, category: true },
    orderBy: { createdAt: 'asc' }
  });

  console.log('=== POST AUDIT (' + posts.length + ' posts) ===\n');

  for (const post of posts) {
    console.log('--- ' + post.slug + ' ---');
    console.log('  Title: ' + post.title);
    console.log('  Cover: ' + (post.coverImage || 'NONE'));
    console.log('  Category: ' + (post.category || 'NONE'));

    // Find internal links
    const linkMatches = post.content.match(/href="([^"]+)"/g) || [];
    const internalLinks = linkMatches
      .map(function(m) { return m.match(/href="([^"]+)"/)[1]; })
      .filter(function(u) { return u.startsWith('/') || u.startsWith('tel:') || u.startsWith('https://lin.ee'); });
    if (internalLinks.length > 0) {
      console.log('  Links: ' + internalLinks.join(', '));
    }

    // Find CTA patterns
    const ctaMatch = post.content.match(/<(?:div|section|a)[^>]*(?:cta|call-to-action|bg-orange|bg-gradient)[^>]*>/gi);
    const hasCTA = ctaMatch ? 'YES (' + ctaMatch.length + ')' : 'NO';
    console.log('  CTA: ' + hasCTA);

    // Content length
    console.log('  Content length: ' + post.content.length + ' chars');
    console.log('');
  }

  await p.$disconnect();
}

main().catch(console.error);
