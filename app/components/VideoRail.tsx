"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const gradients: Record<string, string> = {
  "gt-1": "linear-gradient(135deg,#050010,#120828,#05000f)",
  "gt-2": "linear-gradient(135deg,#000c1a,#001428,#000810)",
  "gt-3": "linear-gradient(135deg,#0a0a00,#1a1800,#080800)",
  "gt-4": "linear-gradient(135deg,#120000,#200404,#0e0000)",
  "gt-5": "linear-gradient(135deg,#000808,#001414,#000606)",
};

type Stat = { n: string; l: string };
type CardData = {
  tag: string;
  name: string;
  where: string;
  gif: string;
  emoji: string;
  gt: string;
  modal: { title: string; desc: string; stats: Stat[]; url: string };
};
type ModalData = CardData["modal"] & { gt: string; emoji: string };

// ── CARD DATA ── START ──
const cards: CardData[] = [
  {
    tag: "Fintech · SaaS",
    name: "Ramp — Feature Launch Walkthrough",
    where: "Explainer → landing + sales enablement",
    gif: "https://framerusercontent.com/images/yNs8rP2D4soCiX7eNIR9FJp3zI.gif",
    emoji: "🎬",
    gt: "gt-1",
    modal: {
      title: "Ramp — Feature Launch Walkthrough",
      desc: "A clean, buyer-legible walkthrough designed for landing pages and sales reuse. Built around the moment of insight — the instant the feature becomes obvious.",
      stats: [{ n: "14 days", l: "Delivery" }, { n: "Hero + cutdowns", l: "Package" }, { n: "Landing + sales", l: "Used in" }],
      url: "https://tanoseistudio.notion.site/Case-Study-Gallery-1d39e475cefe80aab220dbe873e8acbd",
    },
  },
  {
    tag: "Series B · Announcement",
    name: "Aleph — Funding Film",
    where: "Launch film → Series B announcement",
    gif: "https://framerusercontent.com/images/rujxHVABWC22aK7J1Bt87Hkz5k.gif",
    emoji: "🚀",
    gt: "gt-4",
    modal: {
      title: "Aleph — Funding Announcement Film",
      desc: "Authority-first announcement video delivered on a fast track. Built to land with investors, press, and future hires.",
      stats: [{ n: "7 days", l: "Fast-track" }, { n: "Hero + cutdowns", l: "Package" }, { n: "Press + hiring", l: "Used in" }],
      url: "https://tanoseistudio.notion.site/Case-Study-Gallery-1d39e475cefe80aab220dbe873e8acbd",
    },
  },
  {
    tag: "Productivity · Social",
    name: "Sunsama — Motion Series",
    where: "Series → weekly distribution clips",
    gif: "https://framerusercontent.com/images/ncaXWYv5fXVfX9wvB6AWJycHjog.gif",
    emoji: "⚡",
    gt: "gt-2",
    modal: {
      title: "Sunsama — Social Motion Series",
      desc: "A platform-native series designed for repeatable distribution — not a one-off post. Built for clarity + recall.",
      stats: [{ n: "Series", l: "Format" }, { n: "Weekly cadence", l: "System" }, { n: "Social", l: "Used in" }],
      url: "https://tanoseistudio.notion.site/Case-Study-Gallery-1d39e475cefe80aab220dbe873e8acbd",
    },
  },
  {
    tag: "B2B · Lead Gen",
    name: "Openmart — Brand Video",
    where: "Brand clarity → landing + outbound",
    gif: "https://framerusercontent.com/images/BmmRR8wJ0tVQ7S2C55bfSfSRNQ.gif",
    emoji: "🛒",
    gt: "gt-5",
    modal: {
      title: "Openmart — Brand Video",
      desc: "A hard-to-explain value prop turned into an instantly legible story for buyers. Built to reduce explanation load in outbound + sales.",
      stats: [{ n: "B2B", l: "Audience" }, { n: "Brand clarity", l: "Type" }, { n: "Landing + outbound", l: "Used in" }],
      url: "https://tanoseistudio.notion.site/Case-Study-Gallery-1d39e475cefe80aab220dbe873e8acbd",
    },
  },
  {
    tag: "AI · Real Estate",
    name: "reAlpha — Product Demo",
    where: "Demo → investor + outbound",
    gif: "https://framerusercontent.com/images/MUc9I5El4kfxCqYc27XFGeOFqUo.gif",
    emoji: "🏠",
    gt: "gt-3",
    modal: {
      title: "reAlpha — Product Demo",
      desc: "A product demo built to make the AI feel tangible and trustworthy — not abstract. Used as a sales + investor clarity asset.",
      stats: [{ n: "Demo", l: "Type" }, { n: "Investor + outbound", l: "Used in" }, { n: "Clarity asset", l: "Outcome" }],
      url: "https://tanoseistudio.notion.site/Case-Study-Gallery-1d39e475cefe80aab220dbe873e8acbd",
    },
  },
];
// ── CARD DATA ── END ──

const colSpans = [8, 4, 4, 4, 4];
const aspects = ["16/7", "16/13", "16/9", "16/9", "16/9"];

export default function VideoMosaic() {
  const sectionRef = useRef<HTMLElement>(null);
  const mosaicRef = useRef<HTMLDivElement>(null);
  const [modal, setModal] = useState<ModalData | null>(null);

  useEffect(() => {
    gsap.fromTo(
      mosaicRef.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: mosaicRef.current, start: "top 85%" } }
    );
  }, []);

  return (
    <>
      <section
        ref={sectionRef}
        style={{ padding: "0 28px 100px", borderTop: "1px solid rgba(255,255,255,0.06)" }}
      >
        <div style={{ maxWidth: "1160px", margin: "0 auto" }}>

          {/* ── LABEL ROW ── START ── */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "40px 0 20px", flexWrap: "wrap", gap: "12px" }}>
            <p style={{ fontSize: "11px", letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", fontWeight: 500, margin: 0 }}>
              Proof, not promises
            </p>
            <a
              href="https://tanoseistudio.notion.site/Case-Study-Gallery-1d39e475cefe80aab220dbe873e8acbd"
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontSize: "13px", color: "rgba(255,255,255,0.4)", display: "flex", alignItems: "center", gap: "6px", borderBottom: "1px solid rgba(255,255,255,0.08)", paddingBottom: "2px", transition: "all 0.2s", whiteSpace: "nowrap", textDecoration: "none" }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = "#f2f2f2"; (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.3)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.4)"; (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.08)"; }}
            >
              View full library →
            </a>
          </div>
          {/* ── LABEL ROW ── END ── */}

          {/* ── MOSAIC GRID ── START ── */}
          <div
            ref={mosaicRef}
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(12, 1fr)",
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: "14px",
              overflow: "hidden",
              opacity: 0,
            }}
          >
            {cards.map((card, i) => (
              <div
                key={card.name}
                onClick={() => setModal({ ...card.modal, gt: card.gt, emoji: card.emoji })}
                style={{
                  gridColumn: `span ${colSpans[i]}`,
                  aspectRatio: aspects[i],
                  position: "relative",
                  cursor: "pointer",
                  overflow: "hidden",
                  background: "#080808",
                  borderRight: (i === 1 || i === 3 || i === 4) ? "none" : "1px solid rgba(255,255,255,0.07)",
                  borderBottom: (i === 4) ? "none" : "1px solid rgba(255,255,255,0.07)",
                  transition: "box-shadow 0.3s ease",
                }}
                onMouseEnter={e => {
                  const bg = (e.currentTarget as HTMLDivElement).querySelector(".mc-bg") as HTMLElement;
                  const pill = (e.currentTarget as HTMLDivElement).querySelector(".mc-pill") as HTMLElement;
                  const img = (e.currentTarget as HTMLDivElement).querySelector("img") as HTMLElement;
                  if (bg) bg.style.transform = "scale(1.07)";
                  if (pill) { pill.style.opacity = "1"; pill.style.transform = "translate(-50%, -50%) scale(1)"; }
                  if (img) img.style.opacity = "0.75";
                  (e.currentTarget as HTMLDivElement).style.boxShadow = "0 26px 70px rgba(0,0,0,0.78), 0 0 70px rgba(255,255,255,0.06)";
                }}
                onMouseLeave={e => {
                  const bg = (e.currentTarget as HTMLDivElement).querySelector(".mc-bg") as HTMLElement;
                  const pill = (e.currentTarget as HTMLDivElement).querySelector(".mc-pill") as HTMLElement;
                  const img = (e.currentTarget as HTMLDivElement).querySelector("img") as HTMLElement;
                  if (bg) bg.style.transform = "scale(1)";
                  if (pill) { pill.style.opacity = "0"; pill.style.transform = "translate(-50%, -50%) scale(0.82)"; }
                  if (img) img.style.opacity = "0.55";
                  (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
                }}
              >
                {/* GIF bg */}
                <div
                  className="mc-bg"
                  style={{
                    position: "absolute", inset: 0,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    background: gradients[card.gt],
                    transition: "transform 0.6s cubic-bezier(0.2, 0.8, 0.3, 1)",
                  }}
                >
                  <img
                    src={card.gif}
                    alt=""
                    style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.55, transition: "opacity 0.4s" }}
                    onError={e => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
                  />
                  <div style={{ position: "absolute", fontSize: i === 0 ? "72px" : "44px", zIndex: 1 }}>{card.emoji}</div>
                </div>

                {/* Hover pill */}
                <div
                  className="mc-pill"
                  style={{
                    position: "absolute", top: "50%", left: "50%",
                    transform: "translate(-50%, -50%) scale(0.82)",
                    background: "rgba(255,255,255,0.1)", backdropFilter: "blur(12px)",
                    border: "1px solid rgba(255,255,255,0.2)", color: "#fff",
                    padding: "9px 20px", borderRadius: "999px",
                    fontSize: "12.5px", fontWeight: 600,
                    display: "flex", alignItems: "center", gap: "8px",
                    opacity: 0, transition: "all 0.28s",
                    whiteSpace: "nowrap", zIndex: 2, pointerEvents: "none",
                  }}
                >
                  <svg width="8" height="10" viewBox="0 0 8 10" fill="#fff"><path d="M0 0L8 5 0 10z" /></svg>
                  {i === 0 ? "View case study" : "View"}
                </div>

                {/* Bottom text overlay */}
                <div
                  style={{
                    position: "absolute", inset: 0,
                    background: "linear-gradient(180deg, transparent 25%, rgba(0,0,0,0.88) 100%)",
                    padding: "24px",
                    display: "flex", flexDirection: "column", justifyContent: "flex-end",
                  }}
                >
                  <div style={{ fontSize: "10.5px", fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.45)", marginBottom: "5px" }}>{card.tag}</div>
                  <div style={{ fontFamily: "var(--font-dm)", fontSize: "clamp(14px, 1.8vw, 20px)", fontWeight: 400, color: "#f2f2f2", letterSpacing: "-0.02em", lineHeight: 1.2 }}>{card.name}</div>
                  <div style={{ marginTop: "8px", fontSize: "12.5px", color: "rgba(255,255,255,0.55)", fontWeight: 300 }}>{card.where}</div>
                </div>
              </div>
            ))}
          </div>
          {/* ── MOSAIC GRID ── END ── */}

        </div>
      </section>

      {/* ── MODAL ── START ── */}
      {modal && (
        <div
          onClick={() => setModal(null)}
          style={{ position: "fixed", inset: 0, zIndex: 9999, background: "rgba(0,0,0,0.85)", backdropFilter: "blur(8px)", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px" }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{ width: "min(640px, 96vw)", borderRadius: "16px", border: "1px solid rgba(255,255,255,0.12)", background: "#0a0a0a", overflow: "hidden", boxShadow: "0 40px 120px rgba(0,0,0,0.9)" }}
          >
            <div style={{ aspectRatio: "16/7", position: "relative", overflow: "hidden", background: gradients[modal.gt], display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ fontSize: "72px", position: "relative", zIndex: 1 }}>{modal.emoji}</div>
            </div>
            <div style={{ padding: "32px" }}>
              <div style={{ fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginBottom: "12px", fontWeight: 500 }}>Case Study</div>
              <h3 style={{ fontFamily: "var(--font-dm)", fontWeight: 700, fontSize: "22px", letterSpacing: "-0.025em", lineHeight: 1.2, marginBottom: "16px" }}>{modal.title}</h3>
              <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.55)", lineHeight: 1.75, marginBottom: "28px" }}>{modal.desc}</p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1px", background: "rgba(255,255,255,0.07)", borderRadius: "10px", overflow: "hidden", marginBottom: "28px" }}>
                {modal.stats.map(s => (
                  <div key={s.l} style={{ background: "#0a0a0a", padding: "20px 16px", textAlign: "center" }}>
                    <div style={{ fontFamily: "var(--font-dm)", fontWeight: 700, fontSize: "18px", letterSpacing: "-0.02em", marginBottom: "4px" }}>{s.n}</div>
                    <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.35)", textTransform: "uppercase", letterSpacing: "0.08em" }}>{s.l}</div>
                  </div>
                ))}
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "12px" }}>
                <a href={modal.url} target="_blank" rel="noopener noreferrer" style={{ padding: "10px 22px", borderRadius: "10px", background: "white", color: "black", fontSize: "13px", fontWeight: 700, textDecoration: "none" }}>View full case study →</a>
                <button onClick={() => setModal(null)} style={{ padding: "10px 18px", borderRadius: "10px", border: "1px solid rgba(255,255,255,0.1)", background: "transparent", color: "rgba(255,255,255,0.5)", fontSize: "13px", cursor: "pointer" }}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* ── MODAL ── END ── */}
    </>
  );
}