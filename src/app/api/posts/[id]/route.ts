import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

// GET /api/posts/[id]
export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = await (prisma as any).post.findUnique({ where: { id } });
  if (!post) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(post);
}

// PUT /api/posts/[id]
export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await params;
  try {
    const body = await req.json();
    const { title, slug, excerpt, content, coverImage, category, tags, published, author, seoTitle, seoDescription, seoKeywords, ogTitle, ogDescription } = body;

    // Check slug uniqueness (exclude self)
    if (slug) {
      const existing = await (prisma as any).post.findFirst({
        where: { slug, NOT: { id } },
      });
      if (existing) {
        return NextResponse.json({ error: "slug already exists" }, { status: 409 });
      }
    }

    const post = await (prisma as any).post.update({
      where: { id },
      data: {
        ...(title !== undefined && { title }),
        ...(slug !== undefined && { slug }),
        ...(excerpt !== undefined && { excerpt: excerpt || null }),
        ...(content !== undefined && { content }),
        ...(coverImage !== undefined && { coverImage: coverImage || null }),
        ...(category !== undefined && { category: category || null }),
        ...(tags !== undefined && { tags: tags || null }),
        ...(published !== undefined && { published }),
        ...(author !== undefined && { author: author || null }),
        ...(seoTitle !== undefined && { seoTitle: seoTitle || null }),
        ...(seoDescription !== undefined && { seoDescription: seoDescription || null }),
        ...(seoKeywords !== undefined && { seoKeywords: seoKeywords || null }),
        ...(ogTitle !== undefined && { ogTitle: ogTitle || null }),
        ...(ogDescription !== undefined && { ogDescription: ogDescription || null }),
      },
    });

    revalidatePath("/", "layout");
    return NextResponse.json(post);
  } catch (error) {
    console.error("Failed to update post:", error);
    return NextResponse.json({ error: "Failed to update post" }, { status: 500 });
  }
}

// DELETE /api/posts/[id]
export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);
  const authHeader = _req.headers.get("x-sync-secret");
  const syncSecret = process.env.SYNC_SECRET;
  if (!session && !(syncSecret && authHeader === syncSecret)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await params;
  try {
    await (prisma as any).post.delete({ where: { id } });
    revalidatePath("/", "layout");
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to delete post:", error);
    return NextResponse.json({ error: "Failed to delete post" }, { status: 500 });
  }
}
