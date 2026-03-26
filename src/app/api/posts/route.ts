import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

// GET /api/posts — list all posts (optionally filter by published)
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const publishedOnly = searchParams.get("published") === "true";

  const posts = await (prisma as any).post.findMany({
    where: publishedOnly ? { published: true } : undefined,
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(posts);
}

// POST /api/posts — create a new post
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const body = await req.json();
    const { title, slug, excerpt, content, coverImage, category, tags, published, author, seoTitle, seoDescription, seoKeywords, ogTitle, ogDescription } = body;

    if (!title || !slug) {
      return NextResponse.json({ error: "title and slug are required" }, { status: 400 });
    }

    // Check slug uniqueness
    const existing = await (prisma as any).post.findUnique({ where: { slug } });
    if (existing) {
      return NextResponse.json({ error: "slug already exists" }, { status: 409 });
    }

    const post = await (prisma as any).post.create({
      data: {
        title,
        slug,
        excerpt: excerpt || null,
        content: content || "",
        coverImage: coverImage || null,
        category: category || null,
        tags: tags || null,
        published: published ?? false,
        author: author || null,
        seoTitle: seoTitle || null,
        seoDescription: seoDescription || null,
        seoKeywords: seoKeywords || null,
        ogTitle: ogTitle || null,
        ogDescription: ogDescription || null,
      },
    });

    revalidatePath("/", "layout");
    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    console.error("Failed to create post:", error);
    return NextResponse.json({ error: "Failed to create post" }, { status: 500 });
  }
}
