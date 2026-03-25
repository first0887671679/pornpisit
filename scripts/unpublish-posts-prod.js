/**
 * Unpublish (hide) specific posts on production via the sync API
 * This sets published=false so they won't appear anywhere
 */
const fs = require('fs');
const path = require('path');

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

async function main() {
  if (!SYNC_SECRET) { console.log('❌ SYNC_SECRET not set'); process.exit(1); }

  // Use sync API to set published=false — this API accepts x-sync-secret
  const posts = [
    { title: 'battery-care-tips', slug: 'battery-care-tips', published: false, content: '' },
    { title: 'บริการรถยนต์-24-ชม', slug: 'บริการรถยนต์-24-ชม', published: false, content: '' },
  ];

  console.log('🔄 Unpublishing 2 posts on production...');
  const res = await fetch(`${PROD_URL}/api/posts/sync`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-sync-secret': SYNC_SECRET },
    body: JSON.stringify({ posts }),
  });

  const data = await res.json();
  if (res.ok) {
    console.log(`✅ Done! ${data.synced} posts updated`);
    data.results?.forEach(r => console.log(`  ✓ ${r.slug} → unpublished`));
  } else {
    console.log(`❌ Failed: ${data.error || res.statusText}`);
  }
}

main();
