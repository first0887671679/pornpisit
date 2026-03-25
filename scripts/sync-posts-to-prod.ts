/**
 * Sync all published posts from local SQLite → Production via API
 * Usage: npx tsx scripts/sync-posts-to-prod.ts
 * 
 * Set SYNC_SECRET env var on Vercel + locally in .env
 * Set PROD_URL in .env (default: https://firstcarcenterthailand.com)
 */

import Database from 'better-sqlite3';
import * as fs from 'fs';
import * as path from 'path';

// Load .env manually
const envPath = path.join(__dirname, '..', '.env');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf-8');
  envContent.split('\n').forEach(line => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) return;
    const eqIdx = trimmed.indexOf('=');
    if (eqIdx === -1) return;
    const key = trimmed.slice(0, eqIdx).trim();
    let val = trimmed.slice(eqIdx + 1).trim();
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1);
    }
    if (!process.env[key]) process.env[key] = val;
  });
}

const PROD_URL = process.env.PROD_URL || 'https://firstcarcenterthailand.com';
const SYNC_SECRET = process.env.SYNC_SECRET || '';

const dbPath = path.join(__dirname, '..', 'prisma', 'dev.db');
const db = new Database(dbPath, { readonly: true });

const posts = db.prepare('SELECT * FROM Post WHERE published = 1 ORDER BY createdAt DESC').all() as any[];
console.log(`📦 พบ ${posts.length} โพสต์ใน local DB`);

const payload = posts.map((p: any) => ({
  title: p.title,
  slug: p.slug,
  excerpt: p.excerpt,
  content: p.content,
  coverImage: p.coverImage,
  category: p.category,
  tags: p.tags,
  published: true,
  author: p.author,
  seoTitle: p.seoTitle,
  seoDescription: p.seoDescription,
  seoKeywords: p.seoKeywords,
  ogTitle: p.ogTitle,
  ogDescription: p.ogDescription,
}));

// Export JSON file
const outPath = path.join(__dirname, 'posts-export.json');
fs.writeFileSync(outPath, JSON.stringify(payload, null, 2));
console.log(`✅ Export → scripts/posts-export.json`);

// Sync to production
if (!SYNC_SECRET) {
  console.log(`\n⚠️ SYNC_SECRET ไม่ได้ตั้งค่า — ไม่สามารถ sync ไป production ได้`);
  console.log(`กรุณาเพิ่ม SYNC_SECRET ใน .env แล้วรันใหม่`);
  db.close();
  process.exit(0);
}

async function syncToProd() {
  console.log(`\n🔄 กำลัง sync ${payload.length} โพสต์ไป ${PROD_URL}...`);
  try {
    const res = await fetch(`${PROD_URL}/api/posts/sync`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-sync-secret': SYNC_SECRET,
      },
      body: JSON.stringify({ posts: payload }),
    });
    const data = await res.json();
    if (res.ok) {
      console.log(`✅ Sync สำเร็จ! ${data.synced} โพสต์`);
      data.results?.forEach((r: any) => console.log(`  ✓ ${r.slug}`));
    } else {
      console.log(`❌ Sync ล้มเหลว: ${data.error || res.statusText}`);
    }
  } catch (err: any) {
    console.log(`❌ Error: ${err.message}`);
  }
  db.close();
}

syncToProd();
