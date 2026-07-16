import type { BlogPost } from './blogService';
import { batch1 } from './blogBatch1';
import { batch2 } from './blogBatch2';
import { batch3 } from './blogBatch3';
import { batch4 } from './blogBatch4';
import { batch5 } from './blogBatch5';

// Evergreen guides added July 2026 — one per app topic, dated across 2025–2026.
export const extraPosts: BlogPost[] = [
  ...batch1,
  ...batch2,
  ...batch3,
  ...batch4,
  ...batch5,
];
