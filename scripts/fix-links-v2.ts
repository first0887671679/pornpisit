import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Specific targeted fixes for incorrectly auto-fixed or suboptimal links
const fixes: Record<string, Record<string, string>> = {
  'car-polishing-before-sale-guide': {
    // scratch removal -> asphalt stain removal (more relevant for car care)
    '/posts/car-overspray-removal-guide': '/posts/asphalt-stain-removal-guide',
    // headlight restoration was set to /posts, better link to car care related post
    'href="/posts"': 'href="/posts/car-overspray-removal-guide"',
  },
  'hybrid-car-dead-battery-guide': {
    // self-link is useless, point to pickup truck battery guide instead
    '/posts/hybrid-car-dead-battery-guide': '/posts/pickup-truck-battery-guide',
  },
};

async function main() {
  for (const [slug, replacements] of Object.entries(fixes)) {
    const post = await prisma.post.findUnique({
      where: { slug },
      select: { id: true, content: true },
    });
    if (!post) {
      console.log(`⚠️ Post not found: ${slug}`);
      continue;
    }

    let content = post.content;
    let changed = false;

    for (const [from, to] of Object.entries(replacements)) {
      if (from.startsWith('href=')) {
        // Full href replacement
        if (content.includes(from)) {
          content = content.replace(new RegExp(escapeRegex(from), 'g'), to);
          console.log(`  ✅ ${slug}: ${from} → ${to}`);
          changed = true;
        }
      } else {
        // Path replacement
        const fromHref = `href="${from}"`;
        const toHref = `href="${to}"`;
        if (content.includes(fromHref)) {
          content = content.replace(new RegExp(escapeRegex(fromHref), 'g'), toHref);
          console.log(`  ✅ ${slug}: ${from} → ${to}`);
          changed = true;
        }
      }
    }

    if (changed) {
      await prisma.post.update({
        where: { id: post.id },
        data: { content },
      });
    }
  }

  // Final verification - list all internal links
  console.log('\n📊 Final Internal Link Verification:');
  const allPosts = await prisma.post.findMany({
    where: { published: true },
    select: { slug: true },
  });
  const validSlugs = new Set(allPosts.map(p => p.slug));

  const posts = await prisma.post.findMany({
    select: { slug: true, content: true },
  });

  let allValid = true;
  for (const post of posts) {
    const hrefRegex = /href="(\/[^"#?]*)"/g;
    let match;
    while ((match = hrefRegex.exec(post.content)) !== null) {
      const link = match[1];
      let status = '✅';
      if (link.startsWith('/posts/')) {
        const targetSlug = link.replace('/posts/', '');
        if (!validSlugs.has(targetSlug)) {
          status = '❌ BROKEN';
          allValid = false;
        }
      } else if (!['/services', '/posts', '/contact', '/about', '/faq', '/'].includes(link)) {
        status = '⚠️ UNKNOWN';
        allValid = false;
      }
      console.log(`  ${status} [${post.slug}] → ${link}`);
    }
  }

  if (allValid) {
    console.log('\n🎉 All internal links are valid!');
  } else {
    console.log('\n⚠️ Some links still need attention.');
  }
}

function escapeRegex(str: string) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
