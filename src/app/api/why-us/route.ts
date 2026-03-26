import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET() {
  try {
    const items = await prisma.whyUsItem.findMany({ orderBy: { order: "asc" } });
    return NextResponse.json(items);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const body = await req.json();
    const item = await prisma.whyUsItem.create({
      data: {
        icon: body.icon || "Star",
        title: body.title,
        description: body.description,
        order: body.order || 0,
        isActive: body.isActive !== undefined ? body.isActive : true,
      },
    });
    revalidatePath("/", "layout");
    return NextResponse.json(item);
  } catch (error) {
    return NextResponse.json({ error: "Failed to create" }, { status: 500 });
  }
}
