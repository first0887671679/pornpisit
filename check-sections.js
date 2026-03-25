const { PrismaClient } = require("@prisma/client");
const p = new PrismaClient();

async function main() {
  const home = await p.page.findUnique({
    where: { slug: "home" },
    include: { sections: { orderBy: { order: "asc" } } },
  });
  const posts = await p.page.findUnique({
    where: { slug: "posts" },
    include: { sections: { orderBy: { order: "asc" } } },
  });

  console.log("HOME sections:");
  home?.sections.forEach((s, i) => console.log(`${i + 1}. ${s.type} - ${s.title || "(no title)"}`));
  console.log("\nPOSTS sections:");
  posts?.sections.forEach((s, i) => console.log(`${i + 1}. ${s.type} - ${s.title || "(no title)"}`));
}

main().finally(() => p.$disconnect());
