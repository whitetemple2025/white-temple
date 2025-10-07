// src/app/confess/page.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { VIDEO } from '@/lib/media'; // ← 新增：集中管理影片網址

export default function ConfessPage() {
  const [name, setName] = useState('');
  const [original, setOriginal] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const [nameFocused, setNameFocused] = useState(false);
  const [confFocused, setConfFocused] = useState(false);

  /* ================================
     Limits & counters (EN/CJK/TH)
     ================================ */
  const LIMITS = {
    enWords: 50,
    cjkChars: 80,
    thaiChars: 120,
  } as const;

  // Detect scripts
  const hasCJK = /[\u3400-\u9FFF\uF900-\uFAFF]/.test(original); // CJK Unified + Compat
  const hasThai = /[\u0E00-\u0E7F]/.test(original);             // Thai
  const script: 'en' | 'cjk' | 'thai' = hasThai ? 'thai' : hasCJK ? 'cjk' : 'en';

  // Counters
  const countWordsEN = (s: string) => (s.trim().match(/\b[A-Za-z']+\b/g)?.length ?? 0);
  const countGraphemes = (s: string, locale: string) => {
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
    return [...s].length; // fallback
  };

  const currentCount =
    script === 'en'
      ? countWordsEN(original)
      : countGraphemes(original, script === 'thai' ? 'th' : 'zh');

  const limit =
    script === 'en'
      ? LIMITS.enWords
      : script === 'thai'
      ? LIMITS.thaiChars
      : LIMITS.cjkChars;

  const overLimit = currentCount > limit;

  const counterLabel =
    script === 'en'
      ? `${currentCount} / ${limit} words`
      : `${currentCount} / ${limit} characters`;

  const ruleHint =
    script === 'en'
      ? 'Up to 50 English words.'
      : script === 'thai'
      ? 'Up to 120 Thai characters.'
      : 'Up to 80 characters.';

  /* ================================ */

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSuccess(false);

    if (!original.trim()) {
      setMessage('Confession is required.');
      return;
    }

    if (overLimit) {
      setMessage(
        script === 'en'
          ? 'Please keep your confession within 50 English words.'
          : script === 'thai'
          ? 'Please keep your confession within 120 Thai characters.'
          : 'Please keep your confession within 80 characters.'
      );
      return;
    }

    setLoading(true);
    setMessage('Sending and purifying...');

    try {
      const response = await fetch('/api/confess', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, original }),
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Unknown error occurred');

      setLoading(false);
      setMessage('Your confession was sent. Your voice has been heard.');
      setIsSuccess(true);

      // reset
      setName('');
      setOriginal('');
      setNameFocused(false);
      setConfFocused(false);
    } catch (err: any) {
      setLoading(false);
      setMessage(`Error: ${err.message}`);
      setIsSuccess(false);
    }
  };

  const nameOpacity = nameFocused || name.length > 0 ? 'opacity-100' : 'opacity-70';
  const confOpacity = confFocused || original.length > 0 ? 'opacity-100' : 'opacity-70';
  const loadingClass = loading ? 'opacity-80 cursor-wait' : '';

  return (
    <div className="relative min-h-dvh overflow-hidden">
      {/* Background video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full object-cover"
        src={VIDEO.CONFESS2} // ← 改這裡
      />
      <div
        className="absolute inset-0"
        style={{ backgroundColor: 'rgba(0, 74, 152, 0.25)' }}
        aria-hidden
      />

      <main className="relative z-10 mx-auto w-full max-w-6xl px-6 py-8 md:py-12">
        <Link
          href="/"
          className="inline-block mb-8 md:mb-14 font-semibold underline underline-offset-4 hover:opacity-85 transition"
          style={{ color: 'var(--neon-green, #b3fd71)' }}
        >
          &lt; Return to Temple
        </Link>

        <h1
          className="max-w-none whitespace-nowrap text-4xl md:text-6xl lg:text-7xl font-extrabold leading-none tracking-tight mb-20"
          style={{ color: 'var(--neon-green, #b3fd71)' }}
        >
          Your sin shall be purified . . .
        </h1>

        <form onSubmit={handleSubmit} className="max-w-3xl space-y-10">
          {/* Name */}
          <div>
            <label
              htmlFor="name"
              className="block text-base md:text-lg font-semibold mb-3"
              style={{ color: '#f4efe5' }}
            >
              Optional Name
            </label>

            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onFocus={() => setNameFocused(true)}
              onBlur={() => setNameFocused(false)}
              placeholder="Anonymous"
              disabled={loading}
              className={`
                w-full rounded-md px-5 py-4 text-lg md:text-xl outline-none
                ring-1 ring-black/0 focus:ring-2 focus:ring-black/10
                transition duration-300 ease-out transform-gpu
                focus:scale-[1.01] shadow-none
                focus:shadow-[0_0_0.75rem_rgba(179,253,113,0.45)]
                placeholder-[#004a98]/60 focus:placeholder-[#004a98]/40
                ${nameOpacity} ${loadingClass}
              `}
              style={{
                backgroundColor: 'var(--neon-green, #b3fd71)',
                color: 'var(--brand-blue, #004a98)',
              }}
            />
          </div>

          {/* Confession */}
          <div>
            <label
              htmlFor="confession"
              className="block text-base md:text-lg font-semibold mb-3"
              style={{ color: '#f4efe5' }}
            >
              Your Message to Be Purified
            </label>

            <textarea
              id="confession"
              rows={8}
              value={original}
              onChange={(e) => setOriginal(e.target.value)}
              onFocus={() => setConfFocused(true)}
              onBlur={() => setConfFocused(false)}
              placeholder="Enter your confession, thoughts, or burdens here. Let the digital temple receive and transform them..."
              disabled={loading}
              className={`
                w-full rounded-md px-5 py-4 text-lg md:text-xl outline-none
                resize-y min-h-[200px]
                ring-1 ring-black/0 focus:ring-2 focus:ring-black/10
                transition duration-300 ease-out transform-gpu
                focus:scale-[1.01] shadow-none
                focus:shadow-[0_0_0.75rem_rgba(179,253,113,0.45)]
                mb-2
                placeholder-[#004a98]/60 focus:placeholder-[#004a98]/40
                ${confOpacity} ${loadingClass}
              `}
              style={{
                backgroundColor: 'var(--neon-green, #b3fd71)',
                color: 'var(--brand-blue, #004a98)',
              }}
              required
              aria-required="true"
            />

            {/* Rule hint + counter (always English) */}
            <div className="flex items-baseline justify-between mb-4">
              <span className="text-xs md:text-sm" style={{ color: '#f4efe5' }}>
                {ruleHint}
              </span>
              <span
                className={`text-xs md:text-sm ${overLimit ? 'font-extrabold' : ''}`}
                style={{ color: overLimit ? '#ffef9a' : '#f4efe5' }}
                aria-live="polite"
              >
                {counterLabel}
              </span>
            </div>
          </div>

          {message && (
            <p
              className="text-sm md:text-base"
              style={{ color: isSuccess ? '#c7ffd1' : '#fff6a6' }}
            >
              {message}
            </p>
          )}

          
        </form>
      </main>

      {/* Fixed action button at bottom-right of the viewport */}
      <button
        type="button"
        onClick={(e) => {
          // 觸發 form 提交
          const form = document.querySelector('form');
          if (form && !loading) {
            form.requestSubmit();
          }
        }}
        disabled={loading || overLimit || !original.trim()}
        className="
          fixed right-6 bottom-8 md:right-10 md:bottom-12
          rounded px-8 md:px-12 py-4 text-sm md:text-base
          font-extrabold tracking-[0.25em] uppercase
          shadow-md hover:shadow-lg active:scale-[0.99]
          transition disabled:opacity-60 disabled:cursor-not-allowed
          z-20
        "
        style={{
          backgroundColor: 'var(--neon-green, #b3fd71)',
          color: 'var(--brand-blue, #004a98)',
        }}
        aria-label="Send to purification"
      >
        {loading ? 'SENDING…' : overLimit ? 'TOO LONG' : 'SEND TO PURIFICATION'}
      </button>
    </div>
  );
}
