import fs from 'fs';
import path from 'path';

const files = [
  "seed-car-polishing-cost-seo-post.ts",
  "seed-bird-poop-stain-seo-post.ts",
  "seed-toothpaste-headlight-seo-post.ts",
  "seed-nail-in-tire-seo-post.ts",
  "seed-sidewall-tear-seo-post.ts",
  "seed-bulging-tire-seo-post.ts",
  "seed-how-to-check-alternator-seo-post.ts",
  "seed-starter-sound-seo-post.ts",
  "seed-alternator-cost-seo-post.ts",
  "seed-battery-lifespan-seo-post.ts",
  "seed-best-battery-seo-post.ts",
  "seed-parked-car-care-seo-post.ts"
];

const imageReplacements = {
  "car-polishing-cost-guide-cover.jpg": "pig-car-polishing-cost-cover.svg",
  "bird-poop-stain-removal-cover.jpg": "pig-bird-poop-cover.svg",
  "toothpaste-headlight-cleaning-cover.jpg": "pig-toothpaste-headlight-cover.svg",
  "nail-in-tire-guide-cover.jpg": "pig-nail-in-tire-cover.svg",
  "sidewall-tire-tear-cover.jpg": "pig-sidewall-tear-cover.svg",
  "bulging-tire-warning-cover.jpg": "pig-bulging-tire-cover.svg",
  "how-to-check-alternator-cover.jpg": "pig-check-alternator-cover.svg",
  "starter-motor-sound-warning-cover.jpg": "pig-starter-sound-cover.svg",
  "alternator-repair-cost-cover.jpg": "pig-alternator-cost-cover.svg",
  "car-battery-lifespan-cover.jpg": "pig-battery-lifespan-cover.svg",
  "best-car-battery-brands-cover.jpg": "pig-best-battery-brands-cover.svg",
  "parked-car-dead-battery-cover.jpg": "pig-parked-car-care-cover.svg"
};

const internalLinkReplacements = {
  "/services/tire": "/mobile-tire-repair",
  "/services/battery": "/battery-replacement",
  "/services/electrical": "/alternator-starter",
  "/services/body-paint": "/car-polishing"
};

const infoGraphicsMap = {
  "seed-car-polishing-cost-seo-post.ts": "pig-car-polishing-cost-info.svg",
  "seed-bird-poop-stain-seo-post.ts": "pig-bird-poop-info.svg",
  "seed-toothpaste-headlight-seo-post.ts": "pig-toothpaste-headlight-info.svg",
  "seed-nail-in-tire-seo-post.ts": "pig-nail-in-tire-info.svg",
  "seed-sidewall-tear-seo-post.ts": "pig-sidewall-tear-info.svg",
  "seed-bulging-tire-seo-post.ts": "pig-bulging-tire-info.svg",
  "seed-how-to-check-alternator-seo-post.ts": "pig-check-alternator-info.svg",
  "seed-starter-sound-seo-post.ts": "pig-starter-sound-info.svg",
  "seed-alternator-cost-seo-post.ts": "pig-alternator-cost-info.svg",
  "seed-battery-lifespan-seo-post.ts": "pig-battery-lifespan-info.svg",
  "seed-best-battery-seo-post.ts": "pig-best-battery-brands-info.svg",
  "seed-parked-car-care-seo-post.ts": "pig-parked-car-care-info.svg"
};

async function main() {
  for (const file of files) {
    const filePath = path.join(process.cwd(), 'scripts', file);
    if (!fs.existsSync(filePath)) {
      console.log(`File not found: ${file}`);
      continue;
    }

    let content = fs.readFileSync(filePath, 'utf8');

    // Replace cover images
    for (const [oldImg, newImg] of Object.entries(imageReplacements)) {
      content = content.replace(new RegExp(oldImg, 'g'), newImg);
    }

    // Replace internal links
    for (const [oldLink, newLink] of Object.entries(internalLinkReplacements)) {
      content = content.replace(new RegExp(`href="${oldLink}"`, 'g'), `href="${newLink}"`);
    }

    // Also replace the real-client image with infographic (as requested: "ภาพให้ความรู้+ใช้เทรมเพลตที่บันทึกไว้")
    // We will replace the second image in the content
    const infoImg = infoGraphicsMap[file as keyof typeof infoGraphicsMap];
    if (infoImg) {
       content = content.replace(/<img src="\/images\/blog\/real-client-[^"]+" alt="[^"]+" class="[^"]+"\s*\/>\s*<p class="[^"]+"><em>[^<]+<\/em><\/p>/, 
         `<img src="/images/blog/${infoImg}" alt="Infographic" class="rounded-xl my-6 w-full object-cover shadow-sm" />`);
    }

    fs.writeFileSync(filePath, content);
    console.log(`Updated ${file}`);
  }
}

main().catch(console.error);
