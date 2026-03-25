import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

// POST /api/posts/sync — bulk upsert posts (requires auth or SYNC_SECRET)
export async function POST(req: NextRequest) {
  try {
    // Auth: session OR secret key
    const authHeader = req.headers.get("x-sync-secret");
    const syncSecret = process.env.SYNC_SECRET;
    const session = await getServerSession(authOptions);
    
    if (!session && !(syncSecret && authHeader === syncSecret)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { posts } = await req.json();
    if (!Array.isArray(posts) || posts.length === 0) {
      return NextResponse.json({ error: "posts array is required" }, { status: 400 });
    }

    const results = [];
    for (const p of posts) {
      if (!p.title || !p.slug) continue;
      const post = await (prisma as any).post.upsert({
        where: { slug: p.slug },
        update: {
          title: p.title,
          excerpt: p.excerpt || null,
          content: p.content || "",
          coverImage: p.coverImage || null,
          category: p.category || null,
          tags: p.tags || null,
          published: p.published ?? false,
          author: p.author || null,
          seoTitle: p.seoTitle || null,
          seoDescription: p.seoDescription || null,
          seoKeywords: p.seoKeywords || null,
          ogTitle: p.ogTitle || null,
          ogDescription: p.ogDescription || null,
        },
        create: {
          title: p.title,
          slug: p.slug,
          excerpt: p.excerpt || null,
          content: p.content || "",
          coverImage: p.coverImage || null,
          category: p.category || null,
          tags: p.tags || null,
          published: p.published ?? false,
          author: p.author || null,
          seoTitle: p.seoTitle || null,
          seoDescription: p.seoDescription || null,
          seoKeywords: p.seoKeywords || null,
          ogTitle: p.ogTitle || null,
          ogDescription: p.ogDescription || null,
        },
      });
      results.push({ slug: post.slug, status: "ok" });
    }

    return NextResponse.json({ synced: results.length, results });
  } catch (error) {
    console.error("Sync failed:", error);
    return NextResponse.json({ error: "Sync failed" }, { status: 500 });
  }
}
