import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../../auth/[...nextauth]/route";

export async function PUT(req: Request, { params }: { params: Promise<{ id: string; sectionId: string }> }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const { sectionId } = await params;
    const body = await req.json();
    const section = await (prisma as any).pageSection.update({
      where: { id: sectionId },
      data: {
        type: body.type,
        title: body.title ?? null,
        content: body.content ?? "{}",
        imageUrl: body.imageUrl ?? null,
        order: body.order,
        isActive: body.isActive,
      },
    });
    // Revalidate all pages that depend on header/footer/sections
    revalidatePath("/", "layout");
    revalidatePath("/", "page");
    revalidatePath("/contact-us", "page");
    revalidatePath("/check-price", "page");
    revalidatePath("/battery-replacement", "page");
    revalidatePath("/posts", "page");
    return NextResponse.json(section);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update section" }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string; sectionId: string }> }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const { sectionId } = await params;
    await (prisma as any).pageSection.delete({ where: { id: sectionId } });
    revalidatePath("/", "layout");
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete section" }, { status: 500 });
  }
}
