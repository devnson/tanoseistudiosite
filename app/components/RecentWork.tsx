"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ── GRADIENT THEMES ── START ──
const gradients: Record<string, string> = {
  "gt-1": "linear-gradient(135deg,#050010,#120828,#05000f)",
  "gt-2": "linear-gradient(135deg,#000c1a,#001428,#000810)",
  "gt-3": "linear-gradient(135deg,#0a0a00,#1a1800,#080800)",
  "gt-4": "linear-gradient(135deg,#120000,#200404,#0e0000)",
  "gt-5": "linear-gradient(135deg,#000808,#001414,#000606)",
};
// ── GRADIENT THEMES ── END ──

type Stat = { n: string; l: string };
type CardData = {
  tag: string; name: string; where: string;
  gif: string; emoji: string; gt: string;
  modal: {
    title: string; desc: string; stats: Stat[];
    videoId: string;  // YouTube video ID — leave "" until ready
    caseUrl: string;  // Direct URL for "View full case study" button
  };
};
type ModalData = CardData["modal"] & { gt: string; emoji: string };

// ── CARD DATA ── START ──
// videoId: extract from YouTube URL — e.g. https://youtu.be/0WjL6oWzHUg → "0WjL6oWzHUg"
// caseUrl: internal route or external link for each project
const cards: CardData[] = [
  {
    tag: "AI Infra · SaaS", name: "DocUnlock — Feature Launch Walkthrough",
    where: "Explainer → landing + sales enablement",
    gif: "https://framerusercontent.com/images/yNs8rP2D4soCiX7eNIR9FJp3zI.gif",
    emoji: "🎬", gt: "gt-1",
    modal: {
      title: "DocUnlock — Feature Launch Walkthrough",
      desc: "A clean, buyer-legible walkthrough designed for landing pages and sales reuse. Built around the moment of insight — the instant the feature becomes obvious.",
      stats: [{ n: "14 days", l: "Delivery" }, { n: "Hero + cutdowns", l: "Package" }, { n: "Landing + sales", l: "Used in" }],
      videoId: "0WjL6oWzHUg",
      caseUrl: "/case-studies/docunlock-case",
    },
  },
  {
    tag: "Series B · Announcement", name: "Aleph — Funding Film",
    where: "Launch film → Series B announcement",
    gif: "https://framerusercontent.com/images/rujxHVABWC22aK7J1Bt87Hkz5k.gif",
    emoji: "🚀", gt: "gt-4",
    modal: {
      title: "Aleph — Funding Announcement Film",
      desc: "Authority-first announcement video delivered on a fast track. Built to land with investors, press, and future hires.",
      stats: [{ n: "7 days", l: "Fast-track" }, { n: "Hero + cutdowns", l: "Package" }, { n: "Press + hiring", l: "Used in" }],
      videoId: "7sbP3rOhPec",
      caseUrl: "/case-studies/aleph-case",
    },
  },
  {
    tag: "Productivity · Social", name: "Sunsama — Motion Series",
    where: "Series → weekly distribution clips",
    gif: "https://framerusercontent.com/images/ncaXWYv5fXVfX9wvB6AWJycHjog.gif",
    emoji: "⚡", gt: "gt-2",
    modal: {
      title: "Sunsama — Social Motion Series",
      desc: "A platform-native series designed for repeatable distribution — not a one-off post. Built for clarity + recall.",
      stats: [{ n: "Series", l: "Format" }, { n: "Weekly cadence", l: "System" }, { n: "Social", l: "Used in" }],
      videoId: "",
      caseUrl: "/case-studies/sunsama-case",
    },
  },
  {
    tag: "B2B · Lead Gen", name: "Openmart — Brand Video",
    where: "Brand clarity → landing + outbound",
    gif: "https://framerusercontent.com/images/BmmRR8wJ0tVQ7S2C55bfSfSRNQ.gif",
    emoji: "🛒", gt: "gt-5",
    modal: {
      title: "Openmart — Brand Video",
      desc: "A hard-to-explain value prop turned into an instantly legible story for buyers. Built to reduce explanation load in outbound + sales.",
      stats: [{ n: "B2B", l: "Audience" }, { n: "Brand clarity", l: "Type" }, { n: "Landing + outbound", l: "Used in" }],
      videoId: "",
      caseUrl: "/case-studies/openmart-case",
    },
  },
  {
    tag: "AI · Real Estate", name: "reAlpha — Product Demo",
    where: "Demo → investor + outbound",
    gif: "https://framerusercontent.com/images/MUc9I5El4kfxCqYc27XFGeOFqUo.gif",
    emoji: "🏠", gt: "gt-3",
    modal: {
      title: "reAlpha — Product Demo",
      desc: "A product demo built to make the AI feel tangible and trustworthy — not abstract. Used as a sales + investor clarity asset.",
      stats: [{ n: "Demo", l: "Type" }, { n: "Investor + outbound", l: "Used in" }, { n: "Clarity asset", l: "Outcome" }],
      videoId: "",
      caseUrl: "/case-studies/realpha-case",
    },
  },
];
// ── CARD DATA ── END ──

const colSpans = [8, 4, 4, 4, 4];
const aspects  = ["16/7", "16/13", "16/9", "16/9", "16/9"];

export default function RecentWork() {
  const sectionRef = useRef<HTMLElement>(null);
  const mosaicRef  = useRef<HTMLDivElement>(null);
  const headerRef  = useRef<HTMLDivElement>(null);
  const btnRef     = useRef<HTMLAnchorElement>(null);
  const [modal, setModal] = useState<ModalData | null>(null);

  // ── SCROLL LOCK WHEN MODAL OPEN ── START ──
  useEffect(() => {
    document.body.style.overflow = modal ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [modal]);
  // ── SCROLL LOCK WHEN MODAL OPEN ── END ──

  useEffect(() => {
    gsap.fromTo(headerRef.current,
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 0.7, ease: "power3.out",
        scrollTrigger: { trigger: headerRef.current, start: "top 88%" } }
    );
    gsap.fromTo(mosaicRef.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: mosaicRef.current, start: "top 85%" } }
    );
    // ── BOTTOM BUTTON ENTRANCE ── START ──
    gsap.fromTo(btnRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.6, ease: "power3.out",
        scrollTrigger: { trigger: btnRef.current, start: "top 95%" } }
    );
    // ── BOTTOM BUTTON ENTRANCE ── END ──
  }, []);

  return (
    <>
      {/* ── SECTION ── no bottom padding — button flush to grid */}
      <section id="recent-work" ref={sectionRef} style={{ padding: "130px 28px 0", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ maxWidth: "1160px", margin: "0 auto" }}>

          {/* ── HEADER ── START ── */}
          <div ref={headerRef} style={{ marginBottom: "40px", opacity: 0 }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "11px", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: "16px", fontWeight: 500 }}>
              <span style={{ display: "inline-block", width: "18px", height: "1px", background: "rgba(255,255,255,0.25)", flexShrink: 0 }} />
              Recent Work
            </div>
            <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: "20px", flexWrap: "wrap" }}>
              <h2 style={{ fontFamily: "var(--font-dm)", fontWeight: 700, fontSize: "clamp(28px, 3.8vw, 48px)", letterSpacing: "-0.035em", lineHeight: 1.06, margin: 0 }}>
                Every frame built to make{" "}
                <span style={{ color: "rgba(255,255,255,0.45)", fontWeight: 700 }}>buyers confident.</span>
              </h2>
              {/* ── VIEW ALL WORK BUTTON ── START ── */}
              <a
                href="/work"
                style={{
                  display: "inline-flex", alignItems: "center", gap: "8px",
                  padding: "10px 20px",
                  borderRadius: "999px",
                  border: "1px solid rgba(255,255,255,0.14)",
                  background: "rgba(255,255,255,0.03)",
                  color: "rgba(255,255,255,0.6)",
                  fontSize: "13px", fontWeight: 600,
                  textDecoration: "none",
                  fontFamily: "var(--font-dm)",
                  whiteSpace: "nowrap",
                  flexShrink: 0,
                  transition: "border-color 0.2s, background 0.2s, color 0.2s",
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLAnchorElement;
                  el.style.borderColor = "rgba(255,255,255,0.3)";
                  el.style.background = "rgba(255,255,255,0.07)";
                  el.style.color = "#fff";
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLAnchorElement;
                  el.style.borderColor = "rgba(255,255,255,0.14)";
                  el.style.background = "rgba(255,255,255,0.03)";
                  el.style.color = "rgba(255,255,255,0.6)";
                }}
              >
                View all work
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ transform: "rotate(-45deg)" }}>
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
              {/* ── VIEW ALL WORK BUTTON ── END ── */}
            </div>
          </div>
          {/* ── HEADER ── END ── */}

          {/* ── MOSAIC GRID ── START ── */}
          {/* borderRadius flat bottom so the button below connects seamlessly */}
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
                  transition: "box-shadow 0.3s",
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLDivElement;
                  const bg   = el.querySelector(".mc-bg")   as HTMLElement;
                  const pill = el.querySelector(".mc-pill") as HTMLElement;
                  const img  = el.querySelector("img")      as HTMLImageElement;
                  if (bg)   bg.style.transform = "scale(1.07)";
                  if (pill) { pill.style.opacity = "1"; pill.style.transform = "translate(-50%,-50%) scale(1)"; }
                  if (img)  img.style.opacity = "0.75";
                  el.style.boxShadow = "0 26px 70px rgba(0,0,0,0.78), 0 0 70px rgba(255,255,255,0.05)";
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLDivElement;
                  const bg   = el.querySelector(".mc-bg")   as HTMLElement;
                  const pill = el.querySelector(".mc-pill") as HTMLElement;
                  const img  = el.querySelector("img")      as HTMLImageElement;
                  if (bg)   bg.style.transform = "scale(1)";
                  if (pill) { pill.style.opacity = "0"; pill.style.transform = "translate(-50%,-50%) scale(0.82)"; }
                  if (img)  img.style.opacity = "0.55";
                  el.style.boxShadow = "none";
                }}
              >
                {/* GIF background */}
                <div
                  className="mc-bg"
                  style={{
                    position: "absolute", inset: 0,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    background: gradients[card.gt],
                    transition: "transform 0.6s cubic-bezier(0.2,0.8,0.3,1)",
                  }}
                >
                  <img
                    src={card.gif} alt=""
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
                    transform: "translate(-50%,-50%) scale(0.82)",
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

                {/* Bottom overlay */}
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, transparent 25%, rgba(0,0,0,0.88) 100%)", padding: "24px", display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
                  <div style={{ fontSize: "10.5px", fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.45)", marginBottom: "5px" }}>{card.tag}</div>
                  <div style={{ fontFamily: "var(--font-dm)", fontSize: "clamp(13px, 1.6vw, 19px)", fontWeight: 400, color: "#f2f2f2", letterSpacing: "-0.02em", lineHeight: 1.2 }}>{card.name}</div>
                  <div style={{ marginTop: "6px", fontSize: "12px", color: "rgba(255,255,255,0.5)", fontWeight: 300 }}>{card.where}</div>
                </div>
              </div>
            ))}
          </div>
          {/* ── MOSAIC GRID ── END ── */}

          {/* ── VIEW FULL LIBRARY BUTTON ── START ── */}
          <a
            ref={btnRef}
            href="/work"
            style={{
              display: "flex",
              alignItems: "center",
              marginTop: "12px",
              justifyContent: "center",
              gap: "10px",
              width: "100%",
              padding: "20px 0",
              borderRadius: "14px",
              border: "1px solid rgba(255,255,255,0.1)",
              background: "rgba(255,255,255,0.03)",
              color: "rgba(255,255,255,0.6)",
              fontSize: "14px",
              fontWeight: 600,
              fontFamily: "var(--font-dm)",
              textDecoration: "none",
              letterSpacing: "-0.01em",
              transition: "background 0.2s, color 0.2s",
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.07)";
              (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.95)";
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.03)";
              (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.6)";
            }}
          >
            View full library
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
          {/* ── VIEW FULL LIBRARY BUTTON ── END ── */}

        </div>
      </section>

      {/* ── MODAL ── START ── */}
      {modal && (
        <div
          onClick={() => setModal(null)}
          style={{
            position: "fixed", inset: 0, zIndex: 9999,
            background: "rgba(0,0,0,0.88)", backdropFilter: "blur(12px)",
            display: "flex", alignItems: "center", justifyContent: "center",
            padding: "24px",
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              width: "min(680px, 96vw)",
              borderRadius: "16px",
              border: "1px solid rgba(255,255,255,0.1)",
              background: "#0a0a0a",
              overflow: "hidden",
              boxShadow: "0 40px 120px rgba(0,0,0,0.9)",
            }}
          >

            {/* ── VIDEO AT TOP ── START ── */}
            <div style={{ width: "100%", aspectRatio: "16/9", position: "relative", background: gradients[modal.gt], overflow: "hidden" }}>
              {modal.videoId ? (
                <iframe
                  src={`https://www.youtube.com/embed/${modal.videoId}?modestbranding=1&rel=0&showinfo=0&color=white`}
                  allow="autoplay; fullscreen"
                  allowFullScreen
                  style={{ width: "100%", height: "100%", border: "none", display: "block" }}
                />
              ) : (
                /* Placeholder when videoId is empty */
                <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "14px" }}>
                  <div style={{
                    width: "56px", height: "56px", borderRadius: "50%",
                    border: "1px solid rgba(255,255,255,0.1)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <svg width="16" height="18" viewBox="0 0 14 16" fill="rgba(255,255,255,0.25)">
                      <path d="M0 0L14 8 0 16z" />
                    </svg>
                  </div>
                  <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.2)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                    Video coming soon
                  </span>
                </div>
              )}
            </div>
            {/* ── VIDEO AT TOP ── END ── */}

            {/* ── MODAL BODY ── START ── */}
            <div style={{ padding: "28px 32px 32px" }}>
              <p style={{ fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: "8px", fontWeight: 500 }}>Case Study</p>
              <h3 style={{ fontFamily: "var(--font-dm)", fontWeight: 700, fontSize: "20px", letterSpacing: "-0.025em", lineHeight: 1.2, marginBottom: "12px" }}>{modal.title}</h3>
              <p style={{ fontSize: "13.5px", color: "rgba(255,255,255,0.52)", lineHeight: 1.75, marginBottom: "22px" }}>{modal.desc}</p>

              {/* Stats */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1px", background: "rgba(255,255,255,0.07)", borderRadius: "10px", overflow: "hidden", marginBottom: "24px" }}>
                {modal.stats.map(s => (
                  <div key={s.l} style={{ background: "#0a0a0a", padding: "18px 14px", textAlign: "center" }}>
                    <div style={{ fontFamily: "var(--font-dm)", fontWeight: 700, fontSize: "17px", letterSpacing: "-0.02em", marginBottom: "4px" }}>{s.n}</div>
                    <div style={{ fontSize: "10.5px", color: "rgba(255,255,255,0.3)", textTransform: "uppercase", letterSpacing: "0.08em" }}>{s.l}</div>
                  </div>
                ))}
              </div>

              {/* Footer actions */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "12px" }}>
                {/* ── VIEW FULL CASE STUDY — per-card direct link ── START ── */}
                <a
                  href={modal.caseUrl}
                  style={{
                    padding: "11px 24px", borderRadius: "10px",
                    background: "white", color: "black",
                    fontSize: "13.5px", fontWeight: 700,
                    textDecoration: "none",
                    display: "flex", alignItems: "center", gap: "7px",
                    transition: "opacity 0.15s",
                  }}
                  onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.opacity = "0.85"}
                  onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.opacity = "1"}
                >
                  View full case study →
                </a>
                {/* ── VIEW FULL CASE STUDY ── END ── */}
                <button
                  onClick={() => setModal(null)}
                  style={{
                    padding: "11px 18px", borderRadius: "10px",
                    border: "1px solid rgba(255,255,255,0.1)",
                    background: "transparent", color: "rgba(255,255,255,0.45)",
                    fontSize: "13px", cursor: "pointer", fontFamily: "var(--font-dm)",
                  }}
                >
                  Close
                </button>
              </div>
            </div>
            {/* ── MODAL BODY ── END ── */}

          </div>
        </div>
      )}
      {/* ── MODAL ── END ── */}
    </>
  );
}