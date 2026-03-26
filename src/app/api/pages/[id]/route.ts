import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const page = await (prisma as any).page.findUnique({
      where: { id },
      include: { sections: { orderBy: { order: "asc" } } },
    });
    if (!page) {
      return NextResponse.json({ error: "Page not found" }, { status: 404 });
    }
    return NextResponse.json(page);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch page" }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const { id } = await params;
    const body = await req.json();
    const page = await (prisma as any).page.update({
      where: { id },
      data: {
        slug: body.slug,
        title: body.title,
        isActive: body.isActive,
        order: body.order,
        seoTitle: body.seoTitle ?? null,
        seoDescription: body.seoDescription ?? null,
        seoKeywords: body.seoKeywords ?? null,
        ogTitle: body.ogTitle ?? null,
        ogDescription: body.ogDescription ?? null,
      },
    });
    revalidatePath("/", "layout");
    return NextResponse.json(page);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update page" }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const { id } = await params;
    await (prisma as any).page.delete({ where: { id } });
    revalidatePath("/", "layout");
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete page" }, { status: 500 });
  }
}
