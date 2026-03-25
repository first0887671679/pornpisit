const { PrismaClient } = require('@prisma/client');
const p = new PrismaClient();

async function main() {
  // 1. Page SEO
  console.log('=== PAGE SEO DATA ===\n');
  const pages = await p.page.findMany({
    orderBy: { order: 'asc' },
    select: {
      slug: true, title: true, seoTitle: true, seoDescription: true, seoKeywords: true,
      ogTitle: true, ogDescription: true,
    }
  });
  for (const pg of pages) {
    console.log('SLUG: ' + pg.slug);
    console.log('  title:          ' + pg.title);
    console.log('  seoTitle:       ' + (pg.seoTitle || 'NULL'));
    console.log('  seoDescription: ' + (pg.seoDescription || 'NULL'));
    console.log('  seoKeywords:    ' + (pg.seoKeywords || 'NULL'));
    console.log('  ogTitle:        ' + (pg.ogTitle || 'NULL'));
    console.log('  ogDescription:  ' + (pg.ogDescription || 'NULL'));
    console.log('');
  }

  // 2. Post SEO (first 5)
  console.log('\n=== POST SEO DATA (sample 5) ===\n');
  const posts = await p.post.findMany({
    take: 5,
    orderBy: { createdAt: 'desc' },
    select: {
      slug: true, title: true, seoTitle: true, seoDescription: true, seoKeywords: true,
      coverImage: true,
    }
  });
  for (const post of posts) {
    console.log('SLUG: ' + post.slug);
    console.log('  title:          ' + post.title);
    console.log('  seoTitle:       ' + (post.seoTitle || 'NULL'));
    console.log('  seoDescription: ' + (post.seoDescription || 'NULL'));
    console.log('  coverImage:     ' + (post.coverImage ? post.coverImage.substring(0, 80) : 'NULL'));
    console.log('');
  }

  // 3. Header section content (logo info)
  console.log('\n=== HEADER SECTION (logo/brand) ===\n');
  const headers = await p.pageSection.findMany({ where: { type: 'header' } });
  for (const h of headers) {
    const c = JSON.parse(h.content);
    console.log('brandName: ' + (c.brandName || 'NULL'));
    console.log('logoUrl:   ' + (c.logoUrl || 'NONE'));
    console.log('imageUrl:  ' + (h.imageUrl || 'NONE'));
  }

  // 4. Hero section - check for custom images
  console.log('\n=== HERO SLIDES (images) ===\n');
  const heroHome = await p.pageSection.findFirst({
    where: { type: 'hero', title: 'Hero Banner' }
  });
  if (heroHome) {
    const c = JSON.parse(heroHome.content);
    if (c.slides) {
      c.slides.forEach(function(s, i) {
        console.log('Slide ' + i + ': ' + (s.imageUrl || 'NONE'));
      });
    }
  }

  // 5. Check contact-us and posts page SEO
  console.log('\n=== CONTACT-US PAGE SECTIONS ===');
  const contactPage = await p.page.findUnique({ where: { slug: 'contact-us' } });
  if (contactPage) {
    const secs = await p.pageSection.findMany({
      where: { pageId: contactPage.id },
      orderBy: { order: 'asc' },
      select: { type: true, title: true, order: true }
    });
    secs.forEach(function(s) { console.log('  [' + s.order + '] ' + s.type + ' - ' + s.title); });
  }

  await p.$disconnect();
}

main().catch(console.error);
