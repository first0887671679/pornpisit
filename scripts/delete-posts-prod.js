/**
 * Delete specific posts from production DB via API
 */
const fs = require('fs');
const path = require('path');

// Load .env
const envPath = path.join(__dirname, '..', '.env');
if (fs.existsSync(envPath)) {
  fs.readFileSync(envPath, 'utf-8').split('\n').forEach(line => {
    const t = line.trim();
    if (!t || t.startsWith('#')) return;
    const eq = t.indexOf('=');
    if (eq === -1) return;
    const k = t.slice(0, eq).trim();
    let v = t.slice(eq + 1).trim();
    if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) v = v.slice(1, -1);
    if (!process.env[k]) process.env[k] = v;
  });
}

const PROD_URL = process.env.PROD_URL || 'https://firstcarcenterthailand.com';
const SYNC_SECRET = process.env.SYNC_SECRET || '';

const slugsToDelete = [
  'battery-care-tips',
  'บริการรถยนต์-24-ชม',
];

async function main() {
  if (!SYNC_SECRET) {
    console.log('❌ SYNC_SECRET not set');
    process.exit(1);
  }

  // First get all posts to find IDs
  console.log('🔍 Fetching posts from production...');
  const res = await fetch(`${PROD_URL}/api/posts`);
  const posts = await res.json();

  for (const slug of slugsToDelete) {
    const post = posts.find(p => p.slug === slug);
    if (!post) {
      console.log(`⚠️ ${slug} — not found on production (already deleted?)`);
      continue;
    }

    console.log(`🗑️ Deleting ${slug} (id: ${post.id})...`);
    const delRes = await fetch(`${PROD_URL}/api/posts/${post.id}`, {
      method: 'DELETE',
      headers: { 'x-sync-secret': SYNC_SECRET },
    });

    if (delRes.ok) {
      console.log(`  ✅ Deleted ${slug}`);
    } else {
      const text = await delRes.text();
      console.log(`  ❌ Failed: ${delRes.status} ${text}`);
    }
  }

  console.log('\n✅ Done!');
}

main();
