-- Update coverImage for 7 March 19, 2026 blog posts
UPDATE Post SET coverImage = '/images/blog/pig-alternator-burnt-cover.svg', updatedAt = datetime('now') WHERE slug = 'alternator-burnt-repair-guide';
UPDATE Post SET coverImage = '/images/blog/pig-alternator-repair-price-cover.svg', updatedAt = datetime('now') WHERE slug = 'alternator-repair-price-guide';
UPDATE Post SET coverImage = '/images/blog/pig-hybrid-battery-dead-cover.svg', updatedAt = datetime('now') WHERE slug = 'hybrid-car-dead-battery-guide';
UPDATE Post SET coverImage = '/images/blog/pig-pickup-battery-cover.svg', updatedAt = datetime('now') WHERE slug = 'pickup-truck-battery-guide';
UPDATE Post SET coverImage = '/images/blog/pig-runflat-tire-repair-cover.svg', updatedAt = datetime('now') WHERE slug = 'runflat-tire-repair-guide';
UPDATE Post SET coverImage = '/images/blog/pig-starter-brush-cover.svg', updatedAt = datetime('now') WHERE slug = 'starter-motor-brush-repair-guide';
UPDATE Post SET coverImage = '/images/blog/pig-woman-flat-tire-cover.svg', updatedAt = datetime('now') WHERE slug = 'woman-flat-tire-survival-guide';

-- Verify
SELECT slug, coverImage FROM Post WHERE slug IN (
  'alternator-burnt-repair-guide',
  'alternator-repair-price-guide',
  'hybrid-car-dead-battery-guide',
  'pickup-truck-battery-guide',
  'runflat-tire-repair-guide',
  'starter-motor-brush-repair-guide',
  'woman-flat-tire-survival-guide'
);
