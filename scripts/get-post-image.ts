import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const post = await prisma.post.findUnique({
    where: { slug: "symptoms-of-dead-car-battery" },
  });
  
  if (post) {
    console.log(`Found post: ${post.title}`);
    console.log(`Cover image: ${post.coverImage}`);
  } else {
    console.log("Post not found.");
  }
}

main().catch(console.error).finally(() => prisma.$disconnect());
