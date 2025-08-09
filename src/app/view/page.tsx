// src/app/view/page.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabaseClient";
import { VIDEO } from "@/lib/media"; // ← 新增：集中管理影片網址

interface Message {
  id: number;
  english: string | null;
  chinese: string | null;
  thai: string | null;
  name: string | null;
}

const quoteify = (s?: string | null) =>
  s ? (s.startsWith('"') || s.startsWith("“") ? s : `“${s}”`) : "";

type FetchState = "idle" | "loading" | "ok" | "empty" | "error";

export default function ViewPage() {
  const [current, setCurrent] = useState<Message | null>(null);
  const [state, setState] = useState<FetchState>("idle");
  const [errMsg, setErrMsg] = useState<string>("");
  const lastIdRef = useRef<number | null>(null);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    let mounted = true;
    let timer: ReturnType<typeof setInterval> | null = null;

    const fetchLatest = async () => {
      if (!mounted) return;
      setState((s) => (s === "idle" ? "loading" : s));
      setErrMsg("");

      const { data, error } = await supabase
        .from("messages")
        .select("id, english, chinese, thai, name")
        .eq("approved", true)
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();

      if (!mounted) return;

      if (error) {
        console.error("fetch latest message error:", error);
        setState("error");
        setErrMsg(error.message || "Unknown error");
        return;
      }

      if (!data) {
        setCurrent(null);
        setState("empty");
        return;
      }

      if (data.id !== lastIdRef.current) {
        lastIdRef.current = data.id;
        setCurrent(data);
      }
      setState("ok");
    };

    fetchLatest();
    timer = setInterval(fetchLatest, 3000);

    return () => {
      mounted = false;
      if (timer) clearInterval(timer);
    };
  }, []);

  return (
    <div
      className="relative min-h-dvh overflow-hidden"
      style={{ fontFamily: "var(--font-agrandir-wide)" }}
    >
      {/* 固定右上角返回按鈕 */}
      <a
        href="/"
        className="fixed top-6 right-6 z-20 text-sm font-medium underline underline-offset-4 hover:opacity-80 transition-opacity"
        style={{ color: "#004a98" }}
      >
        &lt; Return to Temple
      </a>

      {/* 背景影片與備援圖片 */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full object-cover"
        src={VIDEO.WATER}  // ← 改用 Supabase 公開網址（含 ?v= 版本）
        onError={() => {
          if (videoRef.current) videoRef.current.style.display = "none";
          if (imgRef.current) imgRef.current.style.display = "block";
        }}
      />

      {/* 內容 */}
      <main className="relative z-10 w-full px-6 py-8 md:px-10 md:py-10">
        {/* 標題 */}
        <h1
          className="text-left uppercase tracking-tight leading-none mb-10 md:mb-14 ml-2 mt-2"
          style={{
            color: "var(--brand-blue, #004a98)",
            fontWeight: 900,
            fontSize: "clamp(40px, 8vw, 96px)",
            letterSpacing: "0.01em",
          }}
        >
          THE CONFESSION
        </h1>

        {/* 三語區塊 */}
        <div className="mx-auto w-full max-w-3xl lg:max-w-4xl">
          {state === "loading" && (
            <div style={{ color: "var(--brand-blue, #004a98)" }}>
              <div className="mb-3 h-5 w-24 rounded bg-[color:var(--brand-blue,#004a98)]/10" />
              <div className="h-28 w-full rounded bg-[color:var(--brand-blue,#004a98)]/10" />
            </div>
          )}

          {state === "empty" && (
            <p
              className="text-left"
              style={{ color: "var(--brand-blue, #004a98)" }}
            >
              No approved confessions yet.
            </p>
          )}

          {state === "error" && (
            <div className="rounded-md border border-red-300 bg-red-50 px-4 py-3 text-red-800">
              Failed to load latest confession. <span>{errMsg}</span>
            </div>
          )}

          {state === "ok" && current && (
            <AnimatePresence mode="wait">
              <motion.section
                key={current.id}
                initial={{ opacity: 0, y: 28, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -28, filter: "blur(6px)" }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="grid gap-12 text-left"
              >
                {current.english && (
                  <LangBlock label="English">{quoteify(current.english)}</LangBlock>
                )}
                {current.chinese && (
                  <LangBlock label="中文">{quoteify(current.chinese)}</LangBlock>
                )}
                {current.thai && (
                  <LangBlock label="ไทย">{quoteify(current.thai)}</LangBlock>
                )}

                {(current.english || current.chinese || current.thai) && (
                  <p
                    className="pt-2 text-right"
                    style={{
                      color: "var(--brand-blue, #004a98)",
                      fontSize: "clamp(16px, 2.2vw, 22px)",
                      fontWeight: 600,
                    }}
                  >
                    — {current.name?.trim() || "Digital Pilgrim"}
                  </p>
                )}
              </motion.section>
            </AnimatePresence>
          )}
        </div>
      </main>
    </div>
  );
}

function LangBlock({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p
        className="mb-4"
        style={{
          color: "var(--brand-blue, #004a98)",
          fontFamily: "var(--font-agrandir-wide)",
          fontWeight: 800,
          fontSize: "clamp(18px, 2.2vw, 24px)",
          letterSpacing: "0.02em",
        }}
      >
        {label}
      </p>
      <p
        className="whitespace-pre-wrap"
        style={{
          color: "var(--brand-blue, #004a98)",
          fontFamily: "var(--font-arimo)",
          fontWeight: 500,
          fontSize: "clamp(20px, 2.8vw, 28px)",
          lineHeight: 1.6,
        }}
      >
        {children}
      </p>
    </div>
  );
}
