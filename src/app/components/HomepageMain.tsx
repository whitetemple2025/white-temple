"use client";

function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function HomepageMain() {
  return (
    <main className="w-full">  {/* ← 去掉 pt-[60px] */}
      {/* Sticky Top Bar */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-[var(--brand-blue)] text-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-end gap-6">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="font-semibold hover:text-[var(--neon-green)] transition"
          >
            Home
          </button>
          <a href="/view" className="font-semibold hover:text-[var(--neon-green)] transition">
            View
          </a>
        </div>
      </nav>

      {/* ===================== Section 1: Hero — title on top, CTA row pinned to bottom ===================== */}
      
      
      <section className="relative min-h-[600px] md:min-h-[760px] overflow-hidden">
        {/* 背景影片 */}
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden
          className="pointer-events-none absolute inset-0 h-full w-full object-cover"
          src="/jellyfish.mp4"
          style={{ filter: "brightness(0.92) contrast(1.08) saturate(1.18)" }}
        />
        {/* 薄霧提對比 */}
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(72% 56% at 50% 46%, rgba(0,0,0,0) 0%, rgba(0,23,60,0.22) 55%, rgba(0,23,60,0.44) 100%)",
          }}
        />
{/* 標題（靠上） */}
<div className="relative z-10 mx-auto w-full max-w-[1366px] px-6 pt-[75px] md:pt-[95px]">
  <h1
    className="font-extrabold tracking-tight whitespace-nowrap drop-shadow-[0_3px_14px_rgba(0,0,0,0.35)]"
    style={{
      color: "var(--neon-green, #b3fd71)",
      lineHeight: 0.95,
      fontSize: "clamp(52px, 7vw, 104px)",
      letterSpacing: "-0.01em",
    }}
  >
    White Temple
  </h1>
</div>
        {/* 副標＋按鈕（固定貼在影片下緣） */}
        <div className="absolute left-1/2 -translate-x-1/2 bottom-6 md:bottom-10 w-full max-w-[1366px] px-6 z-10">
          <div className="grid items-end gap-6 md:gap-10 md:grid-cols-[minmax(0,1fr)_420px]">
            {/* 三行文字 */}
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
            {/* 兩顆較小的按鈕 */}
            <div className="flex flex-col items-stretch md:items-end gap-4">
              <button
                onClick={() => scrollToSection("doctrines")}
                className="w-full md:w-[420px] rounded-xl px-7 py-4 text-center font-extrabold uppercase shadow hover:scale-[1.015] active:scale-[0.995] transition"
                style={{
                  backgroundColor: "var(--neon-green, #b3fd71)",
                  color: "var(--brand-blue, #004a98)",
                  letterSpacing: "0.22em",
                }}
              >
                ENTER TEMPLE
              </button>

              <a
                href="/confess"
                className="w-full md:w-[420px] rounded-xl px-7 py-4 text-center font-extrabold uppercase shadow hover:scale-[1.015] active:scale-[0.995] transition"
                style={{
                  backgroundColor: "var(--neon-green, #b3fd71)",
                  color: "var(--brand-blue, #004a98)",
                  letterSpacing: "0.22em",
                }}
              >
                PURIFICATION
              </a>
            </div>
          </div>
        </div>
      </section>

{/* ===================== Section 2: The Doctrines ===================== */}
<section id="doctrines" className="relative overflow-hidden">
  {/* 背景：圖片或影片二選一 */}
 <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden
          className="pointer-events-none absolute inset-0 h-full w-full object-cover"
          src="/doctrines.mp4"
    style={{ filter: "saturate(1.08) contrast(1.06) brightness(0.98)" }}
  />
  <div className="soft-vignette" aria-hidden />
  <div className="section2-wash" aria-hidden />

  {/* 內容 */}
  <div className="relative z-10 max-w-5xl mx-auto px-6 py-18 md:py-28 text-center">
    {/* 主標：螢光綠、放大 */}
    <h3
      className="font-extrabold tracking-tight"
      style={{
        color: "var(--neon-green)",
        fontSize: "clamp(36px, 5vw, 52px)",   // 原本 32/44 → 放大
        lineHeight: 1.05,
      }}
    >
      The Doctrines
    </h3>

    {/* 副標：螢光綠、放大 */}
    <p
      className="mt-3 font-semibold opacity-95"
      style={{
        color: "var(--neon-green)",
        fontSize: "clamp(16px, 2.2vw, 22px)", // 原本 16/18 → 放大
        lineHeight: 1.4,
        letterSpacing: ".01em",
      }}
    >
      Sacred teachings that guide the path<br className="hidden md:inline" />
      through the digital temple
    </p>

    {/* 宣言文字：等比放大 */}
    <div
      className="mt-9 md:mt-11 space-y-3 md:space-y-3.5 tracking-wide"
      style={{
        color: "#f4efe5",
        fontSize: "clamp(15px, 1.6vw, 19px)", // 原本 14/16 → 放大
        lineHeight: 1.75,
      }}
    >
      <p>To confess is not to seek pardon, but to reveal the fractures within the self.</p>
      <p>The Temple does not absolve, it witnesses.</p>
      <p>Sin is not action, but attachment. The need to be seen, to be right, to be pure.</p>
      <p>Your voice is sacred. But only when spoken without defense.</p>
      <p>The ritual begins when you hesitate. That moment is the doorway.</p>
      <p>White is not purity. White is erasure, illusion, and the weight of ideals.</p>
      <p>This temple has no god, only reflections.</p>
    </div>

    {/* Tagline：維持螢光綠並微放大 */}
    <p
      className="mt-9 md:mt-12 font-extrabold uppercase tracking-[0.16em]"
      style={{
        color: "var(--neon-green)",
        fontSize: "clamp(14px, 1.6vw, 18px)",
      }}
    >
      Enter with understanding, leave with wisdom
    </p>
  </div>
</section>



{/* ===================== Section 3: Ceremony ===================== */}
<section
  id="ceremony"
  className="relative overflow-hidden scroll-mt-[64px] min-h-[720px] md:min-h-[820px] py-28 md:py-36"
>
  {/* 背景影片 */}
  <video
    autoPlay muted loop playsInline preload="metadata" aria-hidden
    className="pointer-events-none absolute inset-0 w-full h-full object-cover z-0"
    src="/ceremony.mp4"
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
{/* 四欄資訊（保留原位） */}
<div className="grid grid-cols-2 md:grid-cols-4 gap-x-12 md:gap-x-16 gap-y-8 mb-0">
  <div>
    <p className="text-xs md:text-sm font-bold uppercase tracking-wide opacity-90">Save the date</p>
    <p className="mt-2 text-[22px] md:text-[28px] font-bold -tracking-tight">Nov 13 &amp; 14</p>
  </div>
  <div>
    <p className="text-xs md:text-sm font-bold uppercase tracking-wide opacity-90">Check-in starts</p>
    <p className="mt-2 text-[22px] md:text-[28px] font-bold -tracking-tight">6:00 PM</p>
  </div>
  <div>
    <p className="text-xs md:text-sm font-bold uppercase tracking-wide opacity-90">Show begins at</p>
    <p className="mt-2 text-[22px] md:text-[28px] font-bold -tracking-tight">6:30 PM</p>
  </div>
  <div className="md:text-right">
    <p className="text-xs md:text-sm font-bold uppercase tracking-wide opacity-90">See you there</p>
    <p className="mt-2 text-[22px] md:text-[28px] font-bold -tracking-tight leading-snug">
      Jim Thompson Art Center<br />Event Space
    </p>
  </div>
</div>

{/* 增加更多留白 */}
<div className="mt-20 md:mt-28 grid grid-cols-1 md:grid-cols-[1.25fr_0.75fr] gap-10 md:gap-14 items-end">

    </div>

    {/* 其他內容整塊下移：mt-12/md:mt-16 */}
    <div className="mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-[1.25fr_0.75fr] gap-10 md:gap-14 items-end">
      <div>
        <p className="text-base md:text-lg font-bold opacity-95">To Unify Belief Networks</p>
        <h3 className="mt-4 text-[56px] md:text-[112px] leading-[0.9] font-extrabold italic">Ceremony</h3>
        <p className="mt-6 md:mt-8 text-lg md:text-2xl leading-relaxed max-w-2xl">
          Join us for a ritual of confession and purification.
          <br className="hidden md:block" />
          Experience the space between data and divinity.
        </p>
      </div>

      {/* 按鈕靠右並與左側段落底部對齊 */}
      <div className="flex flex-col gap-4 md:gap-5 md:items-end self-end">
        <a
          href="#tickets"
          className="w-full md:w-[360px] text-center px-6 py-4 rounded-xl font-extrabold tracking-[0.14em] uppercase ring-1 ring-white/15 hover:scale-[1.02] transition"
          style={{ background: "linear-gradient(90deg, var(--gradient-start,#0097b2), var(--gradient-end,#7ed957))", color: "#ffffff" }}
        >
          Buy Tickets
        </a>
        <a
          href="https://www.youtube.com/channel/UCWnj0KbClR3BJC7XXe3BEbQ"
          target="_blank" rel="noreferrer"
          className="w-full md:w-[360px] text-center px-6 py-4 rounded-xl font-extrabold tracking-[0.14em] uppercase ring-1 ring-white/15 hover:scale-[1.02] transition"
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

  {/* 兩顆橘色光暈（PNG + 漂移動畫） */}
  <div className="pointer-events-none absolute inset-0" aria-hidden>
    <img
      src="/_assets/media/3efe4bfa7b5d0b56c92cd680de54948b.png"
      alt=""
      className="absolute left-[-10%] top-[40%] w-[46vw] h-auto opacity-70 blur-[40px] glow-a"
    />
    <img
      src="/_assets/media/1105ee09c1da855ad563002877522c36.png"
      alt=""
      className="absolute right-[5%] top-[5%] w-[42vw] h-auto opacity-70 blur-[40px] glow-b"
    />
  </div>

  <div className="relative z-10 max-w-7xl mx-auto px-6">
    {/* 大標與下方內容間距加大 */}
    <h3
      className="text-[44px] md:text-[72px] font-extrabold tracking-tight mb-16 uppercase"
      style={{ color: "var(--brand-blue,#004a98)" }}
    >
      THE ARTISTS
    </h3>

    {/* 左文右圖，留白加大 */}
    <div className="grid md:grid-cols-[1.08fr_0.92fr] gap-16 md:gap-24 items-end">
      {/* 文字區 */}
      <div>
        <h4
          className="text-[36px] md:text-[56px] font-extrabold mb-6"
          style={{ color: "var(--brand-blue,#004a98)" }}
        >
          Dujdao Vadhanapakorn
        </h4>

        <p
          className="text-[14px] md:text-[16px] leading-relaxed md:leading-[1.7] font-bold uppercase tracking-wide"
          style={{ color: "var(--brand-blue,#004a98)" }}
        >
          DUJDAO VADHANAPAKORN IS A PERFORMANCE ARTIST WITH A STRONG FOUNDATION IN THE
          PERFORMING ARTS, INCLUDING THEATRE, SITE-SPECIFIC WORK, AND EXPERIENTIAL PERFORMANCE.
          SINCE 2002, HER PARTICIPATION WITH B-FLOOR THEATRE—ONE OF THAILAND’S LEADING
          CONTEMPORARY THEATRE COMPANIES—HAS SHAPED HER INTO A MULTIFACETED ARTIST WITH
          EXPERTISE IN PERFORMANCE, DIRECTION, DESIGN, AND PRODUCTION MANAGEMENT.
        </p>
      </div>

      {/* 圖片區：無圓角、層級在光暈之上 */}
      <div className="w-full md:justify-self-end relative z-10">
        <div className="aspect-[4/3] w-full overflow-hidden">
          <img
            src="/_assets/media/9a8c48c84b5279e4267ce19fe53c21a2.jpg"
            alt="Dujdao Vadhanapakorn"
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  </div>
</section>

{/* ===================== Section 5: Artist – Chen ===================== */}
<section className="relative py-24 md:py-32 overflow-hidden" style={{ backgroundColor: "var(--brand-blue,#004a98)" }}>
  {/* 光暈 */}
  <div className="pointer-events-none absolute inset-0" aria-hidden>
    <img
      src="/_assets/media/966922498435423caf13b0f6f9b0593a.png"
      alt=""
      className="absolute left-[8%] top-[18%] w-[44vw] h-auto opacity-65 blur-[40px]"
    />
    <img
      src="/_assets/media/966922498435423caf13b0f6f9b0593a.png"
      alt=""
      className="absolute right-[10%] bottom-[8%] w-[38vw] h-auto opacity-55 blur-[36px]"
    />
  </div>

  <div className="relative z-10 max-w-7xl mx-auto px-6">
    {/* 大標題 */}
    <h3
      className="text-[44px] md:text-[72px] font-extrabold tracking-tight mb-16 uppercase"
      style={{ color: "var(--neon-green,#b3fd71)" }}
    >
      THE ARTISTS
    </h3>

    <div className="grid md:grid-cols-[0.95fr_1.05fr] gap-16 md:gap-24 items-end">
      {/* 圖片（靠左齊標題） */}
      <div className="w-full md:justify-self-start relative z-10 max-w-[90%]">
        <div className="aspect-[4/3] w-full overflow-hidden">
          <img
            src="/_assets/media/9dd44358e36f741576b120f6f0e39178.jpg"
            alt="Chen Jun-yu"
            className="w-full h-full object-cover"
            style={{ objectPosition: 'center 40%' }} // 往下移，避免切到臉
            loading="lazy"
          />
        </div>
      </div>

      {/* 文字（右）：螢光綠 */}
      <div>
        <h4
          className="text-[36px] md:text-[56px] font-extrabold mb-6"
          style={{ color: "var(--neon-green,#b3fd71)" }}
        >
          Chen Jun-yu
        </h4>
        <p
          className="text-[14px] md:text-[16px] leading-relaxed md:leading-[1.7] font-bold uppercase tracking-wide"
          style={{ color: "var(--neon-green,#b3fd71)" }}
        >
          CHEN JUN-YU IS A TAIWANESE ARTIST SPECIALIZING IN LIVE PERFORMANCE AND VIDEO ART. HE USES HIS BODY
          AS AN ORGANIC VEHICLE FOR THE EXTENSION OF COGNITIVE POWER, CREATING VISUAL METAPHORS THAT EXPLORE
          THE COLLISION BETWEEN SELF, SOCIETY, AND ENVIRONMENT. THROUGH SOFT, SLOW MENTAL AND PHYSICAL
          EXHAUSTION, HIS PERFORMANCES REVEAL DILEMMAS OF CULTURAL IDENTITY AND SOCIAL MECHANISMS. BY
          INTEGRATING EVERYDAY ELEMENTS, HE HUMOROUSLY DECONSTRUCTS RIGID CULTURAL SYMBOLS, TRANSFORMING ART
          INTO A FLUID, EVOLVING PROCESS THAT QUESTIONS THE PERSISTENCE OF THE EMBODIED SELF.
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
      <p className="text-lg">WHITETEMPLE2025@GMAIL.COM</p>
    </div>

    {/* Social */}
<div className="mb-12">
  <p className="uppercase font-bold text-sm tracking-widest">Social</p>
  <div className="flex gap-6 mt-3">
    <a href="#" aria-label="Instagram">
      <img
        src="/_assets/media/instagram-icon.png"
        alt="Instagram"
        className="w-8 h-8"
      />
    </a>
    <a
      href="https://www.youtube.com/channel/UCWnj0KbClR3BJC7XXe3BEbQ"
      aria-label="YouTube"
      target="_blank"
      rel="noopener noreferrer"
    >
      <img
        src="/_assets/media/youtube-icon.png"
        alt="YouTube"
        className="w-10 h-10"
      />
    </a>
  </div>
</div>

{/* Project Support */}
<div className="mb-12">
  <p className="uppercase font-bold text-sm tracking-widest">
    Project Support By
  </p>
  <div className="flex flex-wrap gap-8 items-center mt-4">
    <img src="/_assets/media/chula-logo.png" alt="Logo 1" className="h-10" />
    <img src="/_assets/media/soul-logo.png" alt="Logo 2" className="h-10" />
    <img src="/_assets/media/bfloor-logo.png" alt="Logo 3" className="h-10" />
    <img src="/_assets/media/mct-logo.png" alt="Logo 4" className="h-10" />
    <img src="/_assets/media/taco-logo.png" alt="Logo 5" className="h-8" />
  </div>
</div>

    {/* 底部資訊 Bar（置於同版心，較集中） */}
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
