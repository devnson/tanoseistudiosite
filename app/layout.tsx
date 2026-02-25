import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import { Bricolage_Grotesque } from "next/font/google";


const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  weight: ["400","500","600","700"],
});


const dm = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-dm",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Tanosei Studio — Make complex products obvious.",
  description:
    "We work alongside your marketing team to shape the narrative and ship the visuals.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={dm.variable}>
      <body className={`${bricolage.variable} ${dm.variable}`}>
        {/* ── FILM GRAIN OVERLAY ── */}
        <div className="noise-overlay" aria-hidden="true" />

        {/* ── CURSOR AMBIENT LIGHT ── */}
        <div className="cursor-light" id="cursorLight" aria-hidden="true" />

        {children}

        {/* ── CURSOR LIGHT SCRIPT ── */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                var el = document.getElementById('cursorLight');
                if (!el) return;
                var mx = window.innerWidth / 2;
                var my = window.innerHeight / 2;
                window.addEventListener('mousemove', function(e) {
                  mx = e.clientX;
                  my = e.clientY;
                  el.style.left = mx + 'px';
                  el.style.top = my + 'px';
                }, { passive: true });
              })();
            `,
          }}
        />
      </body>
    </html>
  );
}


