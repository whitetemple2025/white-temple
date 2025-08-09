import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'White Temple',
  description: 'Digital Temple Project',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {/* 這裡不放任何 Bar，讓各頁自己決定 */}
        {children}
      </body>
    </html>
  );
}
