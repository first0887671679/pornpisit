import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET() {
  try {
    const items = await prisma.seoMeta.findMany({ orderBy: { pagePath: "asc" } });
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
    const item = await prisma.seoMeta.upsert({
      where: { pagePath: body.pagePath },
      update: {
        pageLabel: body.pageLabel,
        title: body.title,
        description: body.description,
        keywords: body.keywords,
        ogTitle: body.ogTitle,
        ogDescription: body.ogDescription,
      },
      create: {
        pagePath: body.pagePath,
        pageLabel: body.pageLabel,
        title: body.title,
        description: body.description,
        keywords: body.keywords,
        ogTitle: body.ogTitle,
        ogDescription: body.ogDescription,
      },
    });
    revalidatePath("/", "layout");
    return NextResponse.json(item);
  } catch (error) {
    return NextResponse.json({ error: "Failed to save" }, { status: 500 });
  }
}
