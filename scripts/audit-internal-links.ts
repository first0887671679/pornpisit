import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Get all published posts
  const allPosts = await prisma.post.findMany({
    where: { published: true },
    select: { slug: true },
  });
  const validPostSlugs = new Set(allPosts.map((p) => p.slug));

  // Known valid static routes
  const validStaticRoutes = new Set([
    '/',
    '/services',
    '/posts',
    '/contact',
    '/about',
    '/faq',
  ]);

  // Get all posts to audit
  const posts = await prisma.post.findMany({
    select: { id: true, slug: true, title: true, content: true },
  });

  let totalFixed = 0;

  for (const post of posts) {
    const content = post.content;
    const hrefRegex = /href="(\/[^"#?]*)"/g;
    let match;
    const brokenLinks: { original: string; suggestion: string }[] = [];

    while ((match = hrefRegex.exec(content)) !== null) {
      const link = match[1];

      // Check if it's a valid static route
      if (validStaticRoutes.has(link)) continue;

      // Check if it's a valid post route
      if (link.startsWith('/posts/')) {
        const slug = link.replace('/posts/', '');
        if (validPostSlugs.has(slug)) continue;
        // Try to find a close match
        const closest = findClosest(slug, [...validPostSlugs]);
        brokenLinks.push({
          original: link,
          suggestion: closest ? `/posts/${closest}` : '/posts',
        });
      } else {
        // Unknown route - check if it could be a service or post
        brokenLinks.push({
          original: link,
          suggestion: '/services',
        });
      }
    }

    if (brokenLinks.length > 0) {
      console.log(`\n📄 Post: ${post.slug}`);
      let updatedContent = content;
      for (const bl of brokenLinks) {
        console.log(`  ❌ Broken: ${bl.original} → ✅ Fix: ${bl.suggestion}`);
        updatedContent = updatedContent.replace(
          new RegExp(`href="${escapeRegex(bl.original)}"`, 'g'),
          `href="${bl.suggestion}"`
        );
      }
      await prisma.post.update({
        where: { id: post.id },
        data: { content: updatedContent },
      });
      totalFixed += brokenLinks.length;
      console.log(`  ✅ Fixed ${brokenLinks.length} link(s)`);
    }
  }

  if (totalFixed === 0) {
    console.log('\n✅ All internal links are valid! No fixes needed.');
  } else {
    console.log(`\n🔧 Total links fixed: ${totalFixed}`);
  }

  // Also print summary of all internal links
  console.log('\n📊 Internal Link Summary:');
  for (const post of posts) {
    const freshPost = await prisma.post.findUnique({
      where: { id: post.id },
      select: { slug: true, content: true },
    });
    if (!freshPost) continue;
    const hrefRegex2 = /href="(\/[^"#?]*)"/g;
    let m;
    const links: string[] = [];
    while ((m = hrefRegex2.exec(freshPost.content)) !== null) {
      links.push(m[1]);
    }
    if (links.length > 0) {
      console.log(`  ${freshPost.slug}: ${links.join(', ')}`);
    }
  }
}

function escapeRegex(str: string) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function findClosest(target: string, candidates: string[]): string | null {
  let best: string | null = null;
  let bestScore = 0;
  for (const c of candidates) {
    const score = similarity(target, c);
    if (score > bestScore) {
      bestScore = score;
      best = c;
    }
  }
  return bestScore > 0.3 ? best : null;
}

function similarity(a: string, b: string): number {
  const wordsA = a.split('-');
  const wordsB = b.split('-');
  let common = 0;
  for (const w of wordsA) {
    if (wordsB.includes(w)) common++;
  }
  return common / Math.max(wordsA.length, wordsB.length);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
