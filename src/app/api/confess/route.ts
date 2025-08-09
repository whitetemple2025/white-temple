// src/app/api/confess/route.ts
import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';
import * as deepl from 'deepl-node';
import * as OpenCC from 'opencc-js';

export const runtime = 'nodejs'; // 確保在 Node 環境執行（deepl-node 需要）

// ----- DeepL -----
const authKey = process.env.DEEPL_AUTH_KEY!;
const translator = new deepl.Translator(authKey);

// ----- OpenCC：簡體 → 繁體（台灣用字）-----
// tw：繁體（台灣）；twp：台灣慣用詞彙版
const s2t = OpenCC.Converter({ from: 'cn', to: 'twp' });

// ----- 伺服器端限制（與前端一致）-----
const LIMITS = { enWords: 50, cjkChars: 80, thaiChars: 120 } as const;

function detectScript(s: string): 'en' | 'cjk' | 'thai' {
  const hasThai = /[\u0E00-\u0E7F]/.test(s);
  const hasHan = /[\u3400-\u9FFF\uF900-\uFAFF]/.test(s);
  if (hasThai) return 'thai';
  if (hasHan) return 'cjk';
  return 'en';
}

function countWordsEN(s: string) {
  return s.trim().match(/\b[A-Za-z']+\b/g)?.length ?? 0;
}

function countGraphemes(s: string, locale: string) {
  try {
    // @ts-ignore
    if (Intl && (Intl as any).Segmenter) {
      // @ts-ignore
      const seg = new (Intl as any).Segmenter(locale, { granularity: 'grapheme' });
      let n = 0;
      for (const _ of seg.segment(s)) n++;
      return n;
    }
  } catch {}
  return [...s].length; // 後備：以 code point 計
}

function withinServerLimit(text: string) {
  const script = detectScript(text);
  if (script === 'en') return countWordsEN(text) <= LIMITS.enWords;
  if (script === 'thai') return countGraphemes(text, 'th') <= LIMITS.thaiChars;
  return countGraphemes(text, 'zh') <= LIMITS.cjkChars;
}

// 帶 retry 的翻譯（可指定來源語言）
async function safeTranslate(
  text: string,
  target: deepl.TargetLanguageCode,
  source: deepl.SourceLanguageCode | null = null,
  tries = 3
): Promise<string> {
  let lastErr: any;
  for (let i = 0; i < tries; i++) {
    try {
      const res = await translator.translateText(text, source, target);
      const out = res?.text?.trim() ?? '';
      if (out) return out;
    } catch (e: any) {
      lastErr = e;
      // 指數退避：200ms, 400ms, 800ms
      await new Promise((r) => setTimeout(r, 200 * Math.pow(2, i)));
    }
  }
  console.error('DeepL failed', { target, source, err: lastErr?.message || lastErr });
  return '';
}

export async function POST(request: Request) {
  const traceId = Math.random().toString(36).slice(2, 10);
  try {
    const { name = '', original = '' } = await request.json();
    const clean = original?.toString().trim();

    if (!clean) {
      return NextResponse.json({ error: 'Original content is required.' }, { status: 400 });
    }

    // 伺服器端長度限制（防止繞過前端）
    if (!withinServerLimit(clean)) {
      const script = detectScript(clean);
      const msg =
        script === 'en'
          ? 'Please keep your confession within 50 English words.'
          : script === 'thai'
          ? 'Please keep your confession within 120 Thai characters.'
          : 'Please keep your confession within 80 characters.';
      return NextResponse.json({ error: msg }, { status: 400 });
    }

    const hasHan = /[\u3400-\u9FFF\uF900-\uFAFF]/.test(clean);

    // 並行翻譯：英文、中文（來源顯式 ZH）、泰文
    const [en, zh, th] = await Promise.all([
      safeTranslate(clean, 'EN-US', null),
      safeTranslate(clean, 'ZH-HANT', hasHan ? 'ZH' : null),
      safeTranslate(clean, 'TH', null),
    ]);

    // 保底：DeepL 失敗或未轉成功 → 用原文；中文再用 opencc-js 強制簡轉繁
    let english = en || clean;
    let chinese = zh || clean;
    let thai = th || clean;

    if (hasHan && (zh === '' || zh === clean)) {
      try {
        chinese = s2t(clean); // 確保寫入繁體
      } catch (e) {
        console.error('opencc-js fallback failed:', (e as any)?.message || e);
      }
    }

    const { data, error } = await supabase
      .from('messages')
      .insert([{ name, original: clean, english, chinese, thai, approved: false }])
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({
      message: 'Success',
      data,
      usedTargets: ['EN-US', 'ZH-HANT', 'TH'],
      traceId,
    });
  } catch (error: any) {
    console.error(`[confess:${traceId}]`, error?.message || error);
    return NextResponse.json(
      { error: error?.message || 'Internal error', traceId },
      { status: 500 }
    );
  }
}
