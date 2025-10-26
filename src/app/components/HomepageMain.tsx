"use client";
import { VIDEO } from "@/lib/media";

function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function HomepageMain() {
  return (
    // ① 避免 fixed nav 蓋內容，含瀏海安全區
   <main className="w-full">
      {/* Sticky Top Bar */}
<nav
  className="fixed top-0 left-0 w-full z-50 bg-[var(--brand-blue)] text-white shadow-none border-none"
  style={{ marginBottom: "-1px" }}
>        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-end gap-6">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="font-semibold hover:text-[var(--neon-green)] transition"
          >
            Home
          </button>
          {/* 仍保留但隱藏 */}
          <a
            href="/view"
            className="font-semibold hover:text-[var(--neon-green)] transition hidden"
          >
            View
          </a>
        </div>
      </nav>

      {/* ===================== Section 1: Hero ===================== */}
<section
  className="relative min-h-[70svh] md:min-h-[760px] overflow-hidden bg-[var(--brand-blue,#004a98)]"
  style={{ marginTop: "-2px" }}
>
  {/* 背景影片 */}
  <video
    autoPlay
    muted
    loop
    playsInline
    preload="metadata"
    poster="/_assets/media/temple-poster.jpg"
    aria-hidden
    className="pointer-events-none absolute inset-0 h-full w-full object-cover"
    src={VIDEO.TEMPLE}
    style={{ filter: "brightness(0.92) contrast(1.08) saturate(1.18)" }}
  />

  {/* 標題（手機置中、桌機左對齊） */}
  <div className="relative z-10 mx-auto w-full max-w-[1366px] px-6 pt-[75px] md:pt-[95px]">
    <h1
      className="font-extrabold tracking-tight text-center md:text-left drop-shadow-[0_3px_14px_rgba(0,0,0,0.35)]"
      style={{
        color: "var(--neon-green, #b3fd71)",
        lineHeight: 0.95,
        fontSize: "clamp(36px, 7vw, 104px)",
        letterSpacing: "-0.01em",
      }}
    >
      White Temple
    </h1>
  </div>

  {/* 副標＋按鈕（貼底區） */}
  <div className="absolute left-1/2 -translate-x-1/2 bottom-6 md:bottom-10 w-full max-w-[1366px] px-6 z-10">
    <div className="grid items-end gap-6 md:gap-10 md:grid-cols-[minmax(0,1fr)_420px]">
      <p
        className="max-w-[700px] font-semibold drop-shadow-[0_3px_14px_rgba(0,0,0,0.35)]"
        style={{
          color: "var(--neon-green, #b3fd71)",
          fontSize: "clamp(18px, 2.1vw, 28px)",
          lineHeight: 1.22,
        }}
      >
        A Digital Temple<br />
        constructed between<br />
        the internet and a physical site.
      </p>

      <div className="flex flex-col items-stretch md:items-end gap-4">
        <button
          onClick={() => scrollToSection("doctrines")}
          className="w-full md:w-[420px] rounded-xl px-7 py-4 text-center font-extrabold uppercase shadow hover:scale-[1.015] active:scale-[0.995] transition tracking-[0.08em] md:tracking-[0.22em]"
          style={{
            backgroundColor: "var(--neon-green, #b3fd71)",
            color: "var(--brand-blue, #004a98)",
          }}
        >
          ENTER TEMPLE
        </button>

        <a
          href="/confess"
          className="w-full md:w-[420px] rounded-xl px-7 py-4 text-center font-extrabold uppercase shadow hover:scale-[1.015] active:scale-[0.995] transition tracking-[0.08em] md:tracking-[0.22em]"
          style={{
            backgroundColor: "var(--neon-green, #b3fd71)",
            color: "var(--brand-blue, #004a98)",
          }}
        >
          PURIFICATION
        </a>
      </div>
    </div>
  </div>
</section>

      {/* ===================== Section 2: The Doctrines ===================== */}
      <section id="doctrines" className="relative overflow-hidden min-h-[60svh] pt-6 md:pt-10">
  {/* 背景影片 */}
  <video
    autoPlay
    muted
    loop
    playsInline
    preload="metadata"
    poster="/_assets/media/tele-poster.jpg"
    aria-hidden
    className="absolute inset-0 h-full w-full object-cover z-0"
    src={VIDEO.TELE}
    style={{ filter: "saturate(1.08) contrast(1.06) brightness(0.98)" }}
  />

{/* 加一層半透明黑遮罩 */}
<div className="absolute inset-0 bg-black/30 z-[1]" aria-hidden />
  <div className="soft-vignette" aria-hidden />
  <div className="section2-wash" aria-hidden />

  {/* 內容容器：上留空間、底部留白距 */}
  <div className="relative z-10 max-w-5xl mx-auto px-6 pt-28 pb-20 md:pt-36 md:pb-32 text-center">
    {/* 主標 */}
    <h3
      className="font-extrabold tracking-tight"
      style={{
        color: "var(--neon-green)",
        fontSize: "clamp(32px, 5vw, 52px)",
        lineHeight: 1.05,
      }}
    >
      White Temple
    </h3>

    {/* 副標 */}
    <p
      className="mt-4 font-semibold opacity-95"
      style={{
        color: "var(--neon-green)",
        fontSize: "clamp(15px, 2.2vw, 22px)",
        lineHeight: 1.4,
        letterSpacing: ".01em",
      }}
    >
      Sacred teachings that guide the path<br className="hidden md:inline" />
      through the digital temple
    </p>

    {/* 宣言文字 */}
<div className="mt-9 md:mt-11 space-y-3 md:space-y-3.5 tracking-wide font-medium" style={{ color: "#f4efe5", fontSize: "clamp(14px, 1.6vw, 19px)", lineHeight: 2.0, fontWeight: 500, }} >
  <p>
    White Temple is a digital temple constructed between the internet and a physical site.
    In this experimental theatre, which merges religious ritual with technological participation,
    the audience is invited to anonymously submit their own "sins" and take part in a collective
    ritual of confession and atonement.
  </p>
</div>

    {/* 結尾標語：下方留更多空間 */}
    <p
      className="mt-10 md:mt-14 font-extrabold uppercase tracking-[0.12em] md:tracking-[0.16em]"
      style={{
        color: "var(--neon-green)",
        fontSize: "clamp(13px, 1.6vw, 18px)",
      }}
    >
      Enter with understanding, leave with wisdom
    </p>
  </div>
</section>


      {/* ===================== Section 3: Ceremony ===================== */}
      <section
        id="ceremony"
        className="relative overflow-hidden scroll-mt-[80px] min-h-[70svh] md:min-h-[820px] py-20 md:py-36"
      >
        {/* 背景影片（加 poster） */}
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/_assets/media/ceremony-poster.jpg"
          aria-hidden
          className="pointer-events-none absolute inset-0 w-full h-full object-cover z-0"
          src={VIDEO.CEREMONY}
          style={{ filter: "brightness(1.08) contrast(1.05) saturate(1.12)" }}
        />

        {/* 光暈 */}
        <div className="pointer-events-none absolute -inset-16 blur-3xl opacity-50 z-0" aria-hidden>
          <div
            className="absolute left-[-10%] top-[-10%] w-[60vw] h-[60vw] rounded-full"
            style={{ background: "radial-gradient(circle, #ffd16655, transparent 60%)" }}
          />
          <div
            className="absolute right-[-10%] bottom-[-10%] w-[55vw] h-[55vw] rounded-full"
            style={{ background: "radial-gradient(circle, #0097b255, transparent 55%)" }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 text-[#f4efe5]">
          {/* 四欄資訊 */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 md:gap-x-16 gap-y-8 mb-0">
            <div>
              <p className="text-xs md:text-sm font-bold uppercase tracking-wide opacity-90">Save the date</p>
              <p className="mt-2 text-[20px] md:text-[28px] font-bold -tracking-tight">Nov 13 &amp; 14</p>
            </div>
            <div>
              <p className="text-xs md:text-sm font-bold uppercase tracking-wide opacity-90">Check-in starts</p>
              <p className="mt-2 text-[20px] md:text-[28px] font-bold -tracking-tight">6:00 PM</p>
            </div>
            <div>
              <p className="text-xs md:text-sm font-bold uppercase tracking-wide opacity-90">Show begins at</p>
              <p className="mt-2 text-[20px] md:text-[28px] font-bold -tracking-tight">6:30 PM</p>
            </div>
            <div className="md:text-right">
              <p className="text-xs md:text-sm font-bold uppercase tracking-wide opacity-90">See you there</p>
              <p className="mt-2 text-[20px] md:text-[28px] font-bold -tracking-tight leading-snug">
                Jim Thompson Art Center<br />Event Space
              </p>
            </div>
          </div>

          <div className="mt-16 md:mt-28 grid grid-cols-1 md:grid-cols-[1.25fr_0.75fr] gap-10 md:gap-14 items-end"></div>

          {/* 其他內容 */}
          <div className="mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-[1.25fr_0.75fr] gap-10 md:gap-14 items-end">
            <div>
              <p className="text-base md:text-lg font-bold opacity-95">To Unify Belief Networks</p>
              <h3 className="mt-4 text-[44px] md:text-[112px] leading-[0.9] font-extrabold italic">Ceremony</h3>
              <p className="mt-6 md:mt-8 text-lg md:text-2xl leading-relaxed max-w-2xl">
                Join us for a ritual of confession and purification.
                <br className="hidden md:block" />
                Experience the space between data and divinity.
              </p>
              {/* Post-show Talk */}
              <p className="mt-6 text-sm md:text-base font-semibold text-white/90">
                **Post-show Talk · November 14 · After the performance
              </p>
            </div>

            <div className="flex flex-col gap-4 md:gap-5 md:items-end self-end">
              <a
                href="https://www.ticketmelon.com/whitetempleproject/whitetempleproject2025/"
                className="w-full md:w-[360px] text-center px-6 py-4 rounded-xl font-extrabold tracking-[0.1em] md:tracking-[0.14em] uppercase ring-1 ring-white/15 hover:scale-[1.02] transition"
                style={{ background: "linear-gradient(90deg, var(--gradient-start,#0097b2), var(--gradient-end,#7ed957))", color: "#ffffff" }}
              >
                Buy Tickets
              </a>
              <a
                href="https://www.youtube.com/channel/UCWnj0KbClR3BJC7XXe3BEbQ"
                target="_blank" rel="noreferrer"
                className="w-full md:w-[360px] text-center px-6 py-4 rounded-xl font-extrabold tracking-[0.1em] md:tracking-[0.14em] uppercase ring-1 ring-white/15 hover:scale-[1.02] transition"
                style={{ background: "linear-gradient(90deg, #0097b2, #7ed957)", color: "#ffffff" }}
              >
                Watch Live Ceremony
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== Section 4: Artist – Dujdao ===================== */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        {/* 背景漸層 */}
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(90deg, #b3fd71 0%, #d7ff61 100%)" }}
          aria-hidden
        />

        {/* 光暈 */}
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <img
            src="/_assets/media/3efe4bfa7b5d0b56c92cd680de54948b.png"
            alt=""
            className="absolute left-[-10%] top-[40%] w-[46vw] h-auto opacity-70 blur-[40px] glow-a"
            loading="lazy" decoding="async" sizes="100vw"
          />
          <img
            src="/_assets/media/1105ee09c1da855ad563002877522c36.png"
            alt=""
            className="absolute right-[5%] top-[5%] w-[42vw] h-auto opacity-70 blur-[40px] glow-b"
            loading="lazy" decoding="async" sizes="100vw"
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <h3
            className="text-[44px] md:text-[72px] font-extrabold tracking-tight mb-16 uppercase"
            style={{ color: "var(--brand-blue,#004a98)" }}
          >
            THE ARTISTS
          </h3>

          {/* ③ 手機單欄、桌機雙欄 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-end">
            <div>
              <h4
                className="text-[32px] md:text-[56px] font-extrabold mb-6"
                style={{ color: "var(--brand-blue,#004a98)" }}
              >
                Dujdao Vadhanapakorn
              </h4>
              <p
                className="text-[15px] md:text-[16px] leading-[1.9] md:leading-[1.7] font-bold tracking-wide text-justify"
                style={{ color: "var(--brand-blue,#004a98)" }}
              >
                Dujdao Vadhanapakorn is a performing artist with a background in psychotherapy
                and a strong foundation in the performing arts, including theatre, site-specific work,
                and experiential performance. Her signature artistic approach involves creating spaces
                for mental and emotional experiences, reflecting her expertise in human psychology.
                Since 2002, her involvement with B-Floor Theatre, one of Thailand’s leading contemporary
                theatre companies, has shaped her into a multifaceted artist skilled in performance,
                direction, design, and production management.
              </p>
            </div>

            <div className="w-full md:justify-self-end relative z-10">
              <div className="aspect-[4/3] w-full overflow-hidden">
                <img
                  src="/_assets/media/dujdao.jpg"
                  alt="Dujdao Vadhanapakorn"
                  className="w-full h-full object-cover"
                  loading="lazy" decoding="async" sizes="(min-width: 768px) 50vw, 100vw"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== Section 5: Artist – Chen ===================== */}
      <section
        className="relative py-24 md:py-32 overflow-hidden"
        style={{ backgroundColor: "var(--brand-blue,#004a98)" }}
      >
        {/* 綠色光暈 */}
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <img
            src="/_assets/media/966922498435423caf13b0f6f9b0593a.png"
            alt=""
            className="absolute left-[8%] top-[18%] w-[44vw] h-auto opacity-65 blur-[40px] glow-c"
            loading="lazy" decoding="async" sizes="100vw"
          />
          <img
            src="/_assets/media/966922498435423caf13b0f6f9b0593a.png"
            alt=""
            className="absolute right-[10%] bottom-[8%] w-[38vw] h-auto opacity-55 blur-[36px] glow-d"
            loading="lazy" decoding="async" sizes="100vw"
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <h3
            className="text-[44px] md:text-[72px] font-extrabold tracking-tight mb-16 uppercase"
            style={{ color: "var(--neon-green,#b3fd71)" }}
          >
            THE ARTISTS
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-end">
            <div className="w-full md:justify-self-start relative z-10 md:max-w-none">
              <div className="aspect-[4/3] w-full overflow-hidden">
                <img
                  src="/_assets/media/chen.jpg"
                  alt="Chen Jun-yu"
                  className="w-full h-full object-cover"
                  style={{ objectPosition: "center 40%" }}
                  loading="lazy" decoding="async" sizes="(min-width: 768px) 50vw, 100vw"
                />
              </div>
            </div>

            <div>
              <h4
                className="text-[32px] md:text-[56px] font-extrabold mb-6"
                style={{ color: "var(--neon-green,#b3fd71)" }}
              >
                Chen Jun-yu
              </h4>
              <p
                className="text-[15px] md:text-[16px] leading-[1.9] md:leading-[1.7] font-bold tracking-wide text-justify"
                style={{ color: "var(--neon-green,#b3fd71)" }}
              >
                Chen Jun-Yu is a Taiwanese artist specializing in live performance and video art. He uses his body
                as an organic vehicle for the extension of cognitive power, creating visual metaphors that explore
                the collision between self, society, and environment. Through soft, slow mental and physical
                exhaustion, his performances reveal dilemmas of cultural identity and social mechanisms. By
                integrating everyday elements, he humorously deconstructs rigid cultural symbols, transforming art
                into a fluid, evolving process that questions the persistence of the embodied self.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== Section 6: Contact Us ===================== */}
      <section
        className="relative py-24 md:py-32 text-white"
        style={{
          backgroundImage: "url('/_assets/media/54ed41b7de44dacc0982bf2860f507d2.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="relative max-w-7xl mx-auto px-6 z-10">
          {/* Title */}
          <h3 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-12">
            CONTACT US
          </h3>

          {/* Email */}
          <div className="mb-8">
            <p className="uppercase font-bold text-sm tracking-widest">Email</p>
            <p className="text-lg">whitetemple2025@gmail.com</p>
          </div>

          {/* Social */}
          <div className="mb-12">
            <p className="uppercase font-bold text-sm tracking-widest">Social</p>
            <div className="flex gap-6 mt-3">
              {/* Instagram */}
              <a
                href="https://www.instagram.com/whitetemple2025/"
                aria-label="Instagram"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 -m-2 rounded-lg hover:opacity-80 transition"
              >
                <img
                  src="/_assets/media/instagram-icon.png"
                  alt="Instagram"
                  className="w-8 h-8"
                  loading="lazy" decoding="async"
                />
              </a>

              {/* Facebook */}
              <a
                href="https://www.facebook.com/profile.php?id=61581079364429"
                aria-label="Facebook"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 -m-2 rounded-lg hover:opacity-80 transition"
              >
                <img
                  src="/_assets/media/facebook-icon.png"
                  alt="Facebook"
                  className="w-6 h-8"
                  loading="lazy" decoding="async"
                />
              </a>

              {/* YouTube */}
              <a
                href="https://www.youtube.com/channel/UCWnj0KbClR3BJC7XXe3BEbQ"
                aria-label="YouTube"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 -m-2 rounded-lg hover:opacity-80 transition"
              >
                <img
                  src="/_assets/media/youtube-icon.png"
                  alt="YouTube"
                  className="w-10 h-10"
                  loading="lazy" decoding="async"
                />
              </a>
            </div>
          </div>

          {/* Project Support */}
          <div className="mb-12">
            <p className="uppercase font-bold text-sm tracking-widest">Project Support By</p>
            <div className="flex flex-wrap gap-4 sm:gap-8 items-center mt-4">
              <img src="/_assets/media/chula-logo.png" alt="Logo 1" className="h-8 sm:h-10" loading="lazy" decoding="async" />
              <img src="/_assets/media/soul-logo.png" alt="Logo 2" className="h-8 sm:h-10" loading="lazy" decoding="async" />
              <img src="/_assets/media/bfloor-logo.png" alt="Logo 3" className="h-8 sm:h-10" loading="lazy" decoding="async" />
              <img src="/_assets/media/mct-logo.png" alt="Logo 4" className="h-8 sm:h-10" loading="lazy" decoding="async" />
              <img src="/_assets/media/taco-logo.png" alt="Logo 5" className="h-7 sm:h-8" loading="lazy" decoding="async" />
              <img src="/_assets/media/JTAC_Logo.png" alt="JTAC Logo" className="h-9 sm:h-8" loading="lazy" decoding="async" />
              <img src="/_assets/media/ALL LOGOS_white.png" alt="All Logos White" className="h-16 sm:h-20" loading="lazy" decoding="async" />
              <img src="/_assets/media/BTF_text logo-white.png" alt="BTF Logo White" className="h-9 sm:h-10" loading="lazy" decoding="async" />
            </div>
          </div>

          {/* 底部資訊 Bar */}
          <div className="mt-14 border-t border-white/20 pt-6">
            <div className="max-w-7xl mx-auto px-0 md:px-0 text-sm text-white/75 flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
              <span>© {new Date().getFullYear()} White Temple. All rights reserved.</span>
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="self-start md:self-auto underline underline-offset-4 hover:opacity-85"
              >
                Back to top
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
