// scripts/upload-videos.ts
import 'dotenv/config';                       // 讀 .env；執行時會指定 .env.local
import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';

const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? '';
const serviceRole = process.env.SUPABASE_SERVICE_KEY ?? '';
const bucket = 'videos';                      // 影片放這個 public bucket

if (!url || !serviceRole) {
  console.error('❌ 缺少環境變數: NEXT_PUBLIC_SUPABASE_URL 或 SUPABASE_SERVICE_KEY');
  process.exit(1);
}

const supabase = createClient(url, serviceRole);

// 你要上傳的檔案清單（左：本機路徑；右：上傳到 bucket 的檔名）
const files: Array<{ local: string; remote: string }> = [
  { local: 'public/ceremony.mp4',  remote: 'ceremony.mp4' },
  { local: 'public/confess.mp4',   remote: 'confess.mp4' },
  { local: 'public/doctrines.mp4', remote: 'doctrines.mp4' },
  { local: 'public/jellyfish.mp4', remote: 'jellyfish.mp4' },
  { local: 'public/water.mp4',     remote: 'water.mp4' },
];

async function main() {
  // 建 bucket（已存在會報錯，忽略即可）
  await supabase.storage.createBucket(bucket, { public: true }).catch(() => {});

  let uploaded = 0;
  for (const f of files) {
    if (!fs.existsSync(f.local)) {
      console.warn('⚠️  找不到檔案，跳過：', f.local);
      continue;
    }

    const data = fs.readFileSync(f.local);
    const { error } = await supabase.storage.from(bucket).upload(f.remote, data, {
      upsert: true,                 // 同名覆蓋
      contentType: 'video/mp4',
      cacheControl: '0',
    });

    if (error) {
      console.error('❌ 上傳失敗：', f.remote, '-', error.message);
      continue;
    }

    const { data: urlData } = supabase.storage.from(bucket).getPublicUrl(f.remote);
    console.log('✅ uploaded:', f.remote, '=>', urlData.publicUrl);
    uploaded++;
  }

  console.log(`\nDone. Uploaded ${uploaded}/${files.length} files.`);
}

main().catch((e) => {
  console.error('❌ Unexpected error:', e);
  process.exit(1);
});
