"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Step = { num: string; label: "CLIENT" | "TANOSEI"; title: string; desc: string };
type Col  = { top: Step | null; bottom: Step | null };

const columns: Col[] = [
  {
    top:    { num: "01", label: "CLIENT",  title: "Clarity Call",           desc: "One 30-min session with CEO/Founder/CMO only — we lock buyer objections, narrative, and revenue outcome." },
    bottom: { num: "01", label: "TANOSEI", title: "Strategy Return",        desc: "48h locked plan — buyer map, narrative beats, visual angle from your single call." },
  },
  {
    top:    { num: "02", label: "CLIENT",  title: "Marketing Alignment",    desc: "Quick yes/no from marketing lead on script, positioning, tone — strategic control stays yours." },
    bottom: { num: "02", label: "TANOSEI", title: "Storyboard & Direction", desc: "Full scene direction + stills — motion language defined once, reusable forever." },
  },
  {
    top:    { num: "03", label: "CLIENT",  title: "Design Collaboration",   desc: "One focused pass with design team on frames + pacing — early alignment, no late rework." },
    bottom: { num: "03", label: "TANOSEI", title: "Design Frames",          desc: "Static frames reviewed scene-by-scene — tone, UI, brand fidelity locked before animation." },
  },
  {
    top:    null,
    bottom: { num: "04", label: "TANOSEI", title: "Motion Build",           desc: "Premium animation — timing & emphasis tuned for instant buyer comprehension." },
  },
  {
    top:    null,
    bottom: { num: "05", label: "TANOSEI", title: "Sound & SFX",            desc: "Authority-grade audio layer + polish — credible, category-leading feel." },
  },
  {
    top:    { num: "05", label: "CLIENT",  title: "QC with You",            desc: "One clean final review — your team green-lights, assets drop same day." },
    bottom: { num: "06", label: "TANOSEI", title: "QA Pass",                desc: "Full internal check — pacing, clarity, brand, technical perfection." },
  },
  {
    top:    null,
    bottom: { num: "07", label: "TANOSEI", title: "Final Handoff",          desc: "Hero + cutdowns + sources — optimized for web, sales, launch, social." },
  },
];

const COL            = columns.length;
const CONN_H         = 56;
const CLIENT_ACCENT  = "#60a5fa";
const TANOSEI_ACCENT = "rgba(255,255,255,0.7)";
const ORB_COLORS     = ["#60a5fa","#60a5fa","#60a5fa","#60a5fa","#f87171","rgba(255,255,255,0.8)","#ffffff"];

const STEP_LABELS = [
  "01 — Clarity Call","02 — Marketing Alignment","03 — Design Collaboration",
  "04 — Motion Build","05 — Sound & SFX","06 — QC with You","07 — Final Handoff",
];

// ── STEP CARD (shared) ──────────────────────────────────────────────────────
function StepCard({ step, glowRef, compact = false }: {
  step: Step;
  glowRef?: (el: HTMLDivElement | null) => void;
  compact?: boolean;
}) {
  const isClient   = step.label === "CLIENT";
  const accent     = isClient ? CLIENT_ACCENT : TANOSEI_ACCENT;
  const baseBg     = isClient ? "rgba(96,165,250,0.06)"  : "rgba(255,255,255,0.03)";
  const baseBorder = isClient ? "rgba(96,165,250,0.16)"  : "rgba(255,255,255,0.08)";
  const pillBg     = isClient ? "rgba(96,165,250,0.14)"  : "rgba(255,255,255,0.07)";
  const pillBorder = isClient ? "rgba(96,165,250,0.22)"  : "rgba(255,255,255,0.12)";
  const pillText   = isClient ? "rgba(220,235,255,0.9)"  : "rgba(255,255,255,0.55)";
  const descCol    = isClient ? "rgba(225,235,255,0.55)" : "rgba(255,255,255,0.38)";

  return (
    <div ref={glowRef} className="step-card-ui" style={{
      height: compact ? "auto" : "210px",
      display: "flex", flexDirection: "column", justifyContent: "space-between",
      background: baseBg, border: `1px solid ${baseBorder}`,
      borderRadius: compact ? "12px" : "14px",
      padding: compact ? "14px" : "18px 16px",
      transition: "all 0.35s ease", width: "100%",
      boxSizing: "border-box", backdropFilter: "blur(10px)",
    }}>
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: compact ? "8px" : "10px" }}>
          <span style={{
            fontSize: compact ? "8px" : "8.5px", fontWeight: 800,
            letterSpacing: "0.12em", textTransform: "uppercase",
            padding: "2px 7px", borderRadius: "5px",
            background: pillBg, color: pillText, border: `1px solid ${pillBorder}`,
          }}>{step.label}</span>
          <span style={{ fontSize: compact ? "9px" : "9.5px", color: "rgba(255,255,255,0.25)", letterSpacing: "0.06em" }}>{step.num}</span>
          <span style={{ marginLeft: "auto", width: compact ? "5px" : "6px", height: compact ? "5px" : "6px", borderRadius: "50%", background: accent, opacity: 0.9 }} />
        </div>
        <h3 style={{
          fontFamily: "var(--font-dm)", fontWeight: 750,
          fontSize: compact ? "13px" : "13.5px",
          letterSpacing: "-0.02em", margin: "0 0 8px",
          color: "rgba(255,255,255,0.92)", lineHeight: 1.2,
        }}>{step.title}</h3>
        <p style={{ fontSize: compact ? "11px" : "11.5px", color: descCol, lineHeight: 1.65, margin: 0 }}>{step.desc}</p>
      </div>
      {!compact && (
        <div style={{
          height: "1px", width: "100%",
          background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent)", opacity: 0.7,
        }} />
      )}
    </div>
  );
}

// ── MAIN COMPONENT ───────────────────────────────────────────────────────────
export default function HowWeWork() {
  // Desktop refs
  const containerRef  = useRef<HTMLElement>(null);
  const headerRef     = useRef<HTMLDivElement>(null);
  const spineWrapRef  = useRef<HTMLDivElement>(null);
  const mainOrbRef    = useRef<HTMLDivElement>(null);
  const topTravRef    = useRef<HTMLDivElement>(null);
  const botTravRef    = useRef<HTMLDivElement>(null);
  const dotRefs       = useRef<(HTMLDivElement | null)[]>([]);
  const connRefs      = useRef<(HTMLDivElement | null)[][]>(columns.map(() => [null, null]));
  const cardRefs      = useRef<(HTMLDivElement | null)[][]>(columns.map(() => [null, null]));

  // Mobile refs
  const mobileContainerRef = useRef<HTMLElement>(null);
  const mobileSpineRef     = useRef<HTMLDivElement>(null);
  const mobileOrbRef       = useRef<HTMLDivElement>(null);
  const mobileTravRef      = useRef<HTMLDivElement>(null);
  const mobileDotRefs      = useRef<(HTMLDivElement | null)[]>([]);
  const mobileCardRefs     = useRef<(HTMLDivElement | null)[]>([]);

  const tlRef          = useRef<gsap.core.Timeline | null>(null);
  const stepTimesRef   = useRef<number[]>([]);

  const [isMobile,  setIsMobile]  = useState(false);
  const [presMode,  setPresMode]  = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [stepIdx,   setStepIdx]   = useState(0);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Shift+P
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.shiftKey && e.key === "P") {
        setPresMode(prev => {
          const next = !prev;
          if (tlRef.current) {
            next ? tlRef.current.pause() : tlRef.current.play();
            setIsPlaying(!next);
          }
          return next;
        });
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  // ── DESKTOP ANIMATION ────────────────────────────────────────────────────
  useLayoutEffect(() => {
    if (isMobile) return;
    if (!containerRef.current) return;
    const ctx = gsap.context(() => {
      const wrap = spineWrapRef.current;
      const getDotX = (i: number) => {
        const dot = dotRefs.current[i];
        if (!dot || !wrap) return 0;
        const d = dot.getBoundingClientRect();
        const w = wrap.getBoundingClientRect();
        return d.left + d.width / 2 - w.left;
      };

      gsap.fromTo(headerRef.current, { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: headerRef.current, start: "top 88%" } });

      gsap.set([mainOrbRef.current, topTravRef.current, botTravRef.current],
        { xPercent: -50, yPercent: -50, opacity: 0, scale: 0 });

      const main    = mainOrbRef.current!;
      const topTrav = topTravRef.current!;
      const botTrav = botTravRef.current!;

      const tl = gsap.timeline({
        repeat: -1, repeatDelay: 1.2, defaults: { ease: "none" },
        scrollTrigger: { trigger: containerRef.current, start: "top 65%", toggleActions: "play pause resume pause" },
        onUpdate: () => {
          const t = tl.time(); const times = stepTimesRef.current;
          if (times.length) {
            let idx = 0;
            for (let i = 0; i < times.length; i++) { if (t >= times[i]) idx = i; }
            setStepIdx(idx);
          }
        },
      });
      tlRef.current = tl;

      const glowCard = (col: number, side: 0 | 1, color: string) => {
        const el = cardRefs.current[col]?.[side];
        if (!el) return;
        tl.to(el, { borderColor: `${color}AA`, boxShadow: `0 0 18px 2px ${color}33, inset 0 0 14px ${color}22`, duration: 0.28, ease: "power2.out" }, ">")
          .to(el, { boxShadow: "none", borderColor: (el as any).dataset.role === "client" ? "rgba(96,165,250,0.16)" : "rgba(255,255,255,0.08)", duration: 0.55, ease: "power2.out" }, ">+=0.35");
      };

      const spawnTraveler = (col: number, side: 0 | 1, color: string) => {
        const traveler = side === 0 ? topTrav : botTrav;
        const conn = connRefs.current[col]?.[side];
        const h = (conn?.offsetHeight ?? CONN_H) + 10;
        const startY = side === 0 ? -h : h;
        tl.set(traveler, { opacity: 1, scale: 0.7, background: color, boxShadow: `0 0 18px 6px ${color}55`, x: () => getDotX(col), y: startY });
        tl.to(traveler, { y: 0, scale: 1, duration: 0.7, ease: "power2.out" });
        tl.to(main, { opacity: 1, scale: 1.35, background: color, boxShadow: `0 0 22px 8px ${color}55`, duration: 0.16, ease: "power2.out" }, "<")
          .to(main, { scale: 1, duration: 0.28, ease: "power2.out" }, ">");
        tl.to(traveler, { opacity: 0, scale: 0.92, duration: 0.18, ease: "power1.out" }, "<+=0.05");
      };

      const moveMainTo = (col: number, dur = 0.95) =>
        tl.to(main, { x: () => getDotX(col), duration: dur, ease: "power2.inOut" });

      tl.set(main, { opacity: 1, scale: 1, background: ORB_COLORS[0], boxShadow: `0 0 18px 7px ${ORB_COLORS[0]}55`, x: () => getDotX(0), y: 0 });

      stepTimesRef.current = [];
      const mark = () => { stepTimesRef.current.push(tl.duration()); };

      mark(); glowCard(0,0,ORB_COLORS[0]); spawnTraveler(0,0,ORB_COLORS[0]); glowCard(0,1,ORB_COLORS[0]); spawnTraveler(0,1,ORB_COLORS[0]); tl.to({},{duration:0.18}); moveMainTo(1);
      mark(); glowCard(1,0,ORB_COLORS[1]); spawnTraveler(1,0,ORB_COLORS[1]); glowCard(1,1,ORB_COLORS[1]); spawnTraveler(1,1,ORB_COLORS[1]); tl.to({},{duration:0.18}); moveMainTo(2);
      mark(); glowCard(2,1,ORB_COLORS[2]); spawnTraveler(2,1,ORB_COLORS[2]); glowCard(2,0,ORB_COLORS[2]); spawnTraveler(2,0,ORB_COLORS[2]); tl.to({},{duration:0.18}); moveMainTo(3);
      mark(); glowCard(3,1,ORB_COLORS[3]); spawnTraveler(3,1,ORB_COLORS[3]); tl.to({},{duration:0.18}); moveMainTo(4);
      mark(); glowCard(4,1,ORB_COLORS[4]); spawnTraveler(4,1,ORB_COLORS[4]); tl.to({},{duration:0.18}); moveMainTo(5);
      mark(); glowCard(5,0,ORB_COLORS[5]); glowCard(5,1,ORB_COLORS[5]); spawnTraveler(5,0,ORB_COLORS[5]); spawnTraveler(5,1,ORB_COLORS[5]); tl.to({},{duration:0.18}); moveMainTo(6);
      mark();
      const finalCard = cardRefs.current[6]?.[1];
      if (finalCard) {
        tl.to(finalCard, { background:"rgba(255,255,255,0.10)", borderColor:"rgba(255,255,255,0.55)", boxShadow:"0 0 40px 8px rgba(255,255,255,0.12), inset 0 0 30px rgba(255,255,255,0.08)", duration:0.5, ease:"power2.out" }, ">")
          .to(main, { scale:0, opacity:0, duration:0.3, ease:"power2.in" }, "<+=0.1")
          .to(finalCard, { background:"rgba(255,255,255,0.03)", borderColor:"rgba(255,255,255,0.08)", boxShadow:"none", duration:1.2, ease:"power2.out" }, ">+=0.4");
      } else {
        tl.to(main, { opacity:0, scale:0.6, duration:0.35, ease:"power2.inOut" }, ">+=0.35");
      }
      tl.set(main, { opacity:0, scale:0, x:()=>getDotX(0), y:0 }, ">");
    }, containerRef);
    return () => ctx.revert();
  }, [isMobile]);

  // ── MOBILE ANIMATION ─────────────────────────────────────────────────────
  // Flatten columns into ordered steps with side info
  const mobileSteps: { step: Step; side: "left" | "right"; colIdx: number }[] = [];
  columns.forEach((col, colIdx) => {
    if (col.top)    mobileSteps.push({ step: col.top,    side: "left",  colIdx });
    if (col.bottom) mobileSteps.push({ step: col.bottom, side: "right", colIdx });
  });

  useLayoutEffect(() => {
    if (!isMobile) return;
    if (!mobileContainerRef.current) return;
    const ctx = gsap.context(() => {
      const spine = mobileSpineRef.current;
      const orb   = mobileOrbRef.current;
      const trav  = mobileTravRef.current;
      if (!spine || !orb || !trav) return;

      const getDotY = (i: number) => {
        const dot = mobileDotRefs.current[i];
        if (!dot || !spine) return 0;
        const d = dot.getBoundingClientRect();
        const s = spine.getBoundingClientRect();
        return d.top + d.height / 2 - s.top;
      };

      gsap.set([orb, trav], { xPercent: -50, yPercent: -50, opacity: 0, scale: 0 });

      const tl = gsap.timeline({
        repeat: -1, repeatDelay: 1.2, defaults: { ease: "none" },
        scrollTrigger: { trigger: mobileContainerRef.current, start: "top 65%", toggleActions: "play pause resume pause" },
      });
      tlRef.current = tl;

      const glowMobileCard = (i: number, color: string) => {
        const el = mobileCardRefs.current[i];
        if (!el) return;
        const isClient = mobileSteps[i].step.label === "CLIENT";
        tl.to(el, { borderColor: `${color}AA`, boxShadow: `0 0 18px 2px ${color}33, inset 0 0 14px ${color}22`, duration: 0.28, ease: "power2.out" }, ">")
          .to(el, { boxShadow: "none", borderColor: isClient ? "rgba(96,165,250,0.16)" : "rgba(255,255,255,0.08)", duration: 0.55, ease: "power2.out" }, ">+=0.35");
      };

      const spawnMobileTrav = (stepI: number, color: string) => {
        const side = mobileSteps[stepI].side;
        const conn = mobileCardRefs.current[stepI];
        const connRect = conn?.getBoundingClientRect();
        const spineRect = spine.getBoundingClientRect();
        const travelDist = connRect ? Math.abs(connRect.left + connRect.width / 2 - (spineRect.left + spineRect.width / 2)) + 20 : 80;
        const startX = side === "left" ? travelDist : -travelDist;

        tl.set(trav, { opacity: 1, scale: 0.7, background: color, boxShadow: `0 0 18px 6px ${color}55`, x: startX, y: () => getDotY(stepI) });
        tl.to(trav, { x: 0, scale: 1, duration: 0.7, ease: "power2.out" });
        tl.to(orb, { opacity: 1, scale: 1.35, background: color, boxShadow: `0 0 22px 8px ${color}55`, duration: 0.16, ease: "power2.out" }, "<")
          .to(orb, { scale: 1, duration: 0.28, ease: "power2.out" }, ">");
        tl.to(trav, { opacity: 0, scale: 0.92, duration: 0.18, ease: "power1.out" }, "<+=0.05");
      };

      const moveOrbTo = (stepI: number, dur = 0.75) =>
        tl.to(orb, { y: () => getDotY(stepI), duration: dur, ease: "power2.inOut" });

      // Initial orb position
      tl.set(orb, { opacity: 1, scale: 1, background: ORB_COLORS[0], boxShadow: `0 0 18px 7px ${ORB_COLORS[0]}55`, x: 0, y: () => getDotY(0) });

      // Animate each step in order
      mobileSteps.forEach((ms, i) => {
        const color = ORB_COLORS[ms.colIdx] ?? CLIENT_ACCENT;
        // Move orb to this dot
        if (i > 0) moveOrbTo(i);
        // Glow card + shoot traveler
        glowMobileCard(i, color);
        spawnMobileTrav(i, color);
        tl.to({}, { duration: 0.18 });

        // Final handoff special
        if (i === mobileSteps.length - 1) {
          const finalEl = mobileCardRefs.current[i];
          if (finalEl) {
            tl.to(finalEl, { background: "rgba(255,255,255,0.10)", borderColor: "rgba(255,255,255,0.55)", boxShadow: "0 0 40px 8px rgba(255,255,255,0.12), inset 0 0 30px rgba(255,255,255,0.08)", duration: 0.5, ease: "power2.out" }, ">")
              .to(orb, { scale: 0, opacity: 0, duration: 0.3, ease: "power2.in" }, "<+=0.1")
              .to(finalEl, { background: "rgba(255,255,255,0.03)", borderColor: "rgba(255,255,255,0.08)", boxShadow: "none", duration: 1.2, ease: "power2.out" }, ">+=0.4");
          }
        }
      });

      tl.set(orb, { opacity: 0, scale: 0, x: 0, y: () => getDotY(0) }, ">");
    }, mobileContainerRef);
    return () => ctx.revert();
  }, [isMobile]);

  // Presentation controls
  const goToStep = (idx: number) => {
    const tl = tlRef.current; const times = stepTimesRef.current;
    if (!tl || !times.length) return;
    const clamped = Math.max(0, Math.min(idx, times.length - 1));
    setStepIdx(clamped); tl.seek(times[clamped]); tl.pause(); setIsPlaying(false);
  };
  const togglePlay = () => {
    const tl = tlRef.current; if (!tl) return;
    if (isPlaying) { tl.pause(); setIsPlaying(false); } else { tl.play(); setIsPlaying(true); }
  };

  // ── MOBILE JSX ───────────────────────────────────────────────────────────
  if (isMobile) {
    return (
      <section id="how-we-work" ref={mobileContainerRef}
        style={{ padding: "80px 0 100px", background: "#000", borderTop: "1px solid rgba(255,255,255,0.06)", overflow: "hidden" }}>

        {/* Header */}
        <div style={{ maxWidth: "520px", margin: "0 auto", padding: "0 24px", marginBottom: "52px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
            <span style={{ width: "18px", height: "1px", background: "rgba(255,255,255,0.25)", display: "inline-block" }} />
            <span style={{ fontSize: "11px", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", fontWeight: 600 }}>How We Work</span>
          </div>
          <h2 style={{ fontFamily: "var(--font-dm)", fontWeight: 850, fontSize: "clamp(26px,7vw,38px)", letterSpacing: "-0.04em", lineHeight: 1.05, margin: "0 0 10px", color: "#fff" }}>
            <span style={{ fontWeight: 300 }}>14 days.</span> Brief to buyer-ready.
          </h2>
          <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.28)", lineHeight: 1.7, margin: 0 }}>Predictable, fast, and built so you never have to chase us.</p>
        </div>

        {/* Timeline */}
        <div style={{ position: "relative", maxWidth: "520px", margin: "0 auto", padding: "0 24px" }}>

          {/* Spine — positioned in center of full width */}
          <div ref={mobileSpineRef} style={{
            position: "absolute", top: 0, bottom: 0,
            left: "50%", transform: "translateX(-50%)",
            width: "2px", background: "rgba(255,255,255,0.07)", zIndex: 0,
          }}>
            {/* Orb on spine */}
            <div ref={mobileOrbRef} style={{
              position: "absolute", left: "50%", top: 0,
              width: "14px", height: "14px", borderRadius: "50%",
              zIndex: 8, pointerEvents: "none",
            }} />
            {/* Traveler */}
            <div ref={mobileTravRef} style={{
              position: "absolute", left: "50%", top: 0,
              width: "10px", height: "10px", borderRadius: "50%",
              zIndex: 7, pointerEvents: "none",
            }} />
          </div>

          {/* Steps */}
          {mobileSteps.map(({ step, side }, i) => {
            const isLeft   = side === "left";
            const isClient = step.label === "CLIENT";
            const accent   = isClient ? CLIENT_ACCENT : "rgba(255,255,255,0.45)";

            return (
              <div key={i} style={{
                display: "flex",
                justifyContent: isLeft ? "flex-start" : "flex-end",
                position: "relative",
                marginBottom: "20px",
              }}>
                {/* White dot on spine */}
                <div ref={el => { mobileDotRefs.current[i] = el; }} style={{
                  position: "absolute",
                  top: "50%", left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: "10px", height: "10px", borderRadius: "50%",
                  background: "#0b0b0b",
                  border: "1px solid rgba(255,255,255,0.28)",
                  boxShadow: "0 0 8px rgba(255,255,255,0.14)",
                  zIndex: 3,
                }} />

                {/* Horizontal connector line — gap from spine to card */}
                <div style={{
                  position: "absolute",
                  top: "50%", transform: "translateY(-50%)",
                  ...(isLeft
                    ? { right: "50%", marginRight: "6px" }
                    : { left: "50%",  marginLeft:  "6px" }),
                  width: "28px", height: "1px",
                  background: "rgba(255,255,255,0.12)",
                  zIndex: 1,
                }} />

                {/* Card — occupies ~44% of width, gap from spine */}
                <div
                  ref={el => { mobileCardRefs.current[i] = el; }}
                  style={{
                    width: "calc(50% - 50px)",
                    ...(isLeft ? { marginRight: "calc(50% + 10px)" } : { marginLeft: "calc(50% + 10px)" }),
                  }}
                >
                  <StepCard step={step} compact />
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div style={{ maxWidth: "520px", margin: "48px auto 0", padding: "22px 24px 0", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <a href="https://cal.com/tanoseihito/30min" target="_blank" rel="noopener noreferrer"
            style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "11px 22px", borderRadius: "999px", border: "1px solid rgba(255,255,255,0.14)", background: "rgba(255,255,255,0.04)", color: "rgba(255,255,255,0.75)", fontSize: "13px", fontWeight: 650, textDecoration: "none", transition: "all 0.25s ease" }}
            onMouseEnter={e => { const el = e.currentTarget; el.style.background = "rgba(255,255,255,0.92)"; el.style.color = "#000"; el.style.borderColor = "transparent"; el.style.boxShadow = "0 0 28px 8px rgba(255,255,255,0.18)"; }}
            onMouseLeave={e => { const el = e.currentTarget; el.style.background = "rgba(255,255,255,0.04)"; el.style.color = "rgba(255,255,255,0.75)"; el.style.borderColor = "rgba(255,255,255,0.14)"; el.style.boxShadow = "none"; }}>
            Book a Clarity Call
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ transform: "rotate(-45deg)" }}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
          </a>
        </div>
      </section>
    );
  }

  // ── DESKTOP JSX ──────────────────────────────────────────────────────────
  return (
    <section id="how-we-work" ref={containerRef}
      style={{ padding: "120px 28px 140px", background: "#000", borderTop: "1px solid rgba(255,255,255,0.06)", overflow: "hidden" }}>
      <div style={{ maxWidth: "1240px", margin: "0 auto" }}>

        <div ref={headerRef} style={{ opacity: 0, marginBottom: "64px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
            <span style={{ width: "18px", height: "1px", background: "rgba(255,255,255,0.25)", display: "inline-block" }} />
            <span style={{ fontSize: "11px", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", fontWeight: 650 }}>How We Work</span>
          </div>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: "18px" }}>
            <h2 style={{ fontFamily: "var(--font-dm)", fontWeight: 850, fontSize: "clamp(30px,4vw,52px)", letterSpacing: "-0.04em", lineHeight: 1.0, margin: 0, color: "#fff" }}>
              <span style={{ fontWeight: 300 }}>14 days.</span> From brief<br />to buyer-ready video.
            </h2>
            <div style={{ textAlign: "right" }}>
              <div style={{ display: "flex", gap: "18px", justifyContent: "flex-end", marginBottom: "10px" }}>
                {([["CLIENT SIDE", CLIENT_ACCENT], ["OUR PROCESS", TANOSEI_ACCENT]] as const).map(([label, col]) => (
                  <div key={label} style={{ display: "flex", alignItems: "center", gap: "7px" }}>
                    <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: col, display: "inline-block" }} />
                    <span style={{ fontSize: "10px", color: "rgba(255,255,255,0.42)", letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 700 }}>{label}</span>
                  </div>
                ))}
              </div>
              <p style={{ fontSize: "13.5px", color: "rgba(255,255,255,0.28)", lineHeight: 1.7, margin: 0, maxWidth: "320px" }}>Predictable, fast, and built so you never have to chase us.</p>
            </div>
          </div>
        </div>

        {/* TOP CARDS */}
        <div style={{ display: "grid", gridTemplateColumns: `repeat(${COL}, 1fr)`, gap: "0 12px", alignItems: "end" }}>
          {columns.map((col, i) => (
            <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "stretch", justifyContent: "flex-end" }}>
              {col.top ? (
                <div data-role="client" style={{ width: "100%" }} ref={el => { cardRefs.current[i][0] = el as any; }}>
                  <StepCard step={col.top} glowRef={el => { if (el) (el as any).dataset.role = "client"; cardRefs.current[i][0] = el; }} />
                </div>
              ) : <div />}
            </div>
          ))}
        </div>

        {/* TOP CONNECTORS */}
        <div style={{ display: "grid", gridTemplateColumns: `repeat(${COL}, 1fr)`, gap: "0 12px", height: `${CONN_H}px` }}>
          {columns.map((col, i) => (
            <div key={i} style={{ display: "flex", justifyContent: "center" }}>
              {col.top && <div ref={el => { connRefs.current[i][0] = el; }} style={{ width: "1px", height: "100%", background: "rgba(255,255,255,0.10)" }} />}
            </div>
          ))}
        </div>

        {/* SPINE */}
        <div ref={spineWrapRef} style={{ position: "relative", height: "2px", zIndex: 1 }}>
          <div style={{ position: "absolute", inset: 0, background: "rgba(255,255,255,0.07)", zIndex: 1 }} />
          <div style={{ position: "absolute", top: "50%", left: 0, right: 0, transform: "translateY(-50%)", display: "grid", gridTemplateColumns: `repeat(${COL}, 1fr)`, gap: "0 12px", zIndex: 5, pointerEvents: "none" }}>
            {columns.map((_, i) => (
              <div key={i} style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <div ref={el => { dotRefs.current[i] = el; }} style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#0b0b0b", border: "1px solid rgba(255,255,255,0.28)", boxShadow: "0 0 10px rgba(255,255,255,0.14)" }} />
              </div>
            ))}
          </div>
          <div ref={mainOrbRef} style={{ position: "absolute", top: "50%", left: 0, width: "14px", height: "14px", borderRadius: "50%", zIndex: 8, pointerEvents: "none" }} />
          <div ref={topTravRef} style={{ position: "absolute", top: "50%", left: 0, width: "10px", height: "10px", borderRadius: "50%", zIndex: 7, pointerEvents: "none" }} />
          <div ref={botTravRef} style={{ position: "absolute", top: "50%", left: 0, width: "10px", height: "10px", borderRadius: "50%", zIndex: 7, pointerEvents: "none" }} />
        </div>

        {/* BOTTOM CONNECTORS */}
        <div style={{ display: "grid", gridTemplateColumns: `repeat(${COL}, 1fr)`, gap: "0 12px", height: `${CONN_H}px` }}>
          {columns.map((col, i) => (
            <div key={i} style={{ display: "flex", justifyContent: "center" }}>
              {col.bottom && <div ref={el => { connRefs.current[i][1] = el; }} style={{ width: "1px", height: "100%", background: "rgba(255,255,255,0.10)" }} />}
            </div>
          ))}
        </div>

        {/* BOTTOM CARDS */}
        <div style={{ display: "grid", gridTemplateColumns: `repeat(${COL}, 1fr)`, gap: "0 12px" }}>
          {columns.map((col, i) => (
            <div key={i} style={{ width: "100%" }}>
              {col.bottom ? (
                <div data-role="tanosei" style={{ width: "100%" }} ref={el => { cardRefs.current[i][1] = el as any; }}>
                  <StepCard step={col.bottom} glowRef={el => { if (el) (el as any).dataset.role = "tanosei"; cardRefs.current[i][1] = el; }} />
                </div>
              ) : <div />}
            </div>
          ))}
        </div>

        {/* FOOTER */}
        <div style={{ marginTop: "62px", paddingTop: "32px", borderTop: "1px solid rgba(255,255,255,0.06)", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "18px" }}>
          <p style={{ fontSize: "13.5px", color: "rgba(255,255,255,0.22)", margin: 0 }}>Every sprint starts with a 30-minute call. No commitment required.</p>
          <a href="https://cal.com/tanoseihito/30min" target="_blank" rel="noopener noreferrer"
            style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "11px 22px", borderRadius: "999px", border: "1px solid rgba(255,255,255,0.14)", background: "rgba(255,255,255,0.04)", color: "rgba(255,255,255,0.75)", fontSize: "13.5px", fontWeight: 650, textDecoration: "none", transition: "all 0.25s ease" }}
            onMouseEnter={e => { const el = e.currentTarget; el.style.background = "rgba(255,255,255,0.92)"; el.style.color = "#000"; el.style.borderColor = "transparent"; el.style.boxShadow = "0 0 28px 8px rgba(255,255,255,0.18)"; }}
            onMouseLeave={e => { const el = e.currentTarget; el.style.background = "rgba(255,255,255,0.04)"; el.style.color = "rgba(255,255,255,0.75)"; el.style.borderColor = "rgba(255,255,255,0.14)"; el.style.boxShadow = "none"; }}>
            Book a Clarity Call
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ transform: "rotate(-45deg)" }}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
          </a>
        </div>
      </div>

      {/* PRESENTATION CONTROLS */}
      {presMode && (
        <div style={{ position: "fixed", bottom: "28px", left: "50%", transform: "translateX(-50%)", display: "flex", alignItems: "center", gap: "8px", background: "rgba(10,10,10,0.92)", border: "1px solid rgba(255,255,255,0.10)", borderRadius: "999px", padding: "8px 14px", backdropFilter: "blur(16px)", boxShadow: "0 8px 32px rgba(0,0,0,0.5)", zIndex: 9999, userSelect: "none" }}>
          <button onClick={() => goToStep(stepIdx - 1)} disabled={stepIdx === 0} style={{ background: "none", border: "none", cursor: stepIdx === 0 ? "default" : "pointer", padding: "4px 8px", borderRadius: "6px", color: stepIdx === 0 ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.7)", fontSize: "14px", lineHeight: 1 }}>‹</button>
          <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            {STEP_LABELS.map((label, i) => (
              <button key={i} onClick={() => goToStep(i)} title={label} style={{ width: i === stepIdx ? "20px" : "6px", height: "6px", borderRadius: "999px", border: "none", cursor: "pointer", padding: 0, background: i === stepIdx ? "#60a5fa" : "rgba(255,255,255,0.2)", transition: "all 0.25s ease" }} />
            ))}
          </div>
          <button onClick={() => goToStep(stepIdx + 1)} disabled={stepIdx === STEP_LABELS.length - 1} style={{ background: "none", border: "none", cursor: stepIdx === STEP_LABELS.length - 1 ? "default" : "pointer", padding: "4px 8px", borderRadius: "6px", color: stepIdx === STEP_LABELS.length - 1 ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.7)", fontSize: "14px", lineHeight: 1 }}>›</button>
          <div style={{ width: "1px", height: "16px", background: "rgba(255,255,255,0.10)", margin: "0 2px" }} />
          <button onClick={togglePlay} style={{ background: "none", border: "none", cursor: "pointer", padding: "4px 8px", color: "rgba(255,255,255,0.6)", fontSize: "12px", lineHeight: 1 }}>{isPlaying ? "⏸" : "▶"}</button>
          <div style={{ marginLeft: "4px", fontSize: "10px", color: "rgba(255,255,255,0.35)", letterSpacing: "0.08em", whiteSpace: "nowrap" }}>{STEP_LABELS[stepIdx]}</div>
          <div style={{ marginLeft: "6px", fontSize: "9px", color: "rgba(255,255,255,0.18)", letterSpacing: "0.06em" }}>Shift+P to exit</div>
        </div>
      )}
    </section>
  );
}