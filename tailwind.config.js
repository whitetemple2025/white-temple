// tailwind.config.js
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-agrandir-wide)"], // 標題/大型字（Agrandir Wide）
        body: ["var(--font-agrandir-wide)"],    // 全站預設（可改）
        alt: ["var(--font-agrandir)"],          // 次要顯示（Agrandir）
        arimo: ["var(--font-arimo)"],           // 高可讀內文字（Arimo）
      },
    },
  },
  plugins: [],
};
