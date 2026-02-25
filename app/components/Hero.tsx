"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";

const words = ["obvious.", "land.", "sell."];

export default function Hero() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  const pillsRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const ledeRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  // ── ROTATING WORD ── START ──
  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % words.length);
        setVisible(true);
      }, 300);
    }, 2400);
    return () => clearInterval(interval);
  }, []);
  // ── ROTATING WORD ── END ──

  // ── GSAP ENTRANCE ── START ──
  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.fromTo(pillsRef.current, { opacity: 0, y: -16 }, { opacity: 1, y: 0, duration: 0.6 })
      .fromTo(headlineRef.current ? Array.from(headlineRef.current.children) : [], { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.7, stagger: 0.12 }, "-=0.3")
      .fromTo(ledeRef.current, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.6 }, "-=0.4")
      .fromTo(ctaRef.current, { opacity: 0, y: 16, scale: 0.97 }, { opacity: 1, y: 0, scale: 1, duration: 0.5 }, "-=0.3");
  }, []);
  // ── GSAP ENTRANCE ── END ──

  return (
    <section style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "112px 24px 80px", textAlign: "center", position: "relative", overflow: "hidden" }}>

      {/* ── BACKGROUND GLOW ── START ── */}
      <div style={{ position: "absolute", top: "33%", left: "50%", transform: "translate(-50%, -50%)", width: "600px", height: "400px", borderRadius: "50%", background: "rgba(255,255,255,0.025)", filter: "blur(100px)", pointerEvents: "none" }} />
      {/* ── BACKGROUND GLOW ── END ── */}

      {/* ── STATUS PILLS ── START ── */}
      <div ref={pillsRef} style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap", justifyContent: "center", marginBottom: "40px", opacity: 0 }}>
        {[
          { text: "2 client spots open", dot: true },
          { text: "14-day delivery", dot: false },
          { text: "Kathmandu · Global", dot: false },
        ].map((pill, i) => (
          <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "6px 14px", borderRadius: "999px", border: "1px solid rgba(255,255,255,0.09)", background: "rgba(255,255,255,0.025)", fontSize: "11.5px", color: "rgba(255,255,255,0.45)" }}>
            {pill.dot && <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "rgba(255,255,255,0.75)", display: "inline-block", animation: "pulse 2s infinite" }} />}
            {pill.text}
          </span>
        ))}
      </div>
      {/* ── STATUS PILLS ── END ── */}

      {/* ── HEADLINE ── START ── */}
      <h1 ref={headlineRef} style={{ fontFamily: "var(--font-dm)", fontWeight: 300, fontSize: "clamp(44px, 8vw, 88px)", lineHeight: 1.05, letterSpacing: "-0.035em", margin: 0, padding: 0 }}>
        <span style={{ fontWeight: 300, opacity: 0 }}>Make complex</span>{" "}
        <span style={{ fontWeight: 800, opacity: 0 }}>products</span>{" "}
        <span style={{ fontWeight: 800, display: "inline-block", transition: "opacity 0.3s, transform 0.3s", opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(-12px)" }}>
          {words[index]}
        </span>
      </h1>
      {/* ── HEADLINE ── END ── */}

      {/* ── LEDE ── START ── */}
      <p ref={ledeRef} style={{ marginTop: "32px", fontSize: "17px", color: "rgba(255,255,255,0.45)", maxWidth: "500px", lineHeight: 1.7, fontWeight: 300, opacity: 0 }}>
        We work alongside your marketing team to shape the narrative and ship the visuals —{" "}
        <strong style={{ color: "rgba(255,255,255,0.75)", fontWeight: 500 }}>fast, consistent, no handholding.</strong>
      </p>
      {/* ── LEDE ── END ── */}

      {/* ── CTA BUTTONS ── START ── */}
      
    
      <div ref={ctaRef} style={{ marginTop: "40px", display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap", justifyContent: "center", opacity: 0 }}>
    <a href="https://cal.com/tanoseihito/30min" target="_blank" rel="noopener noreferrer" className="premiumBtn">
        {/* The spinning light */}
        <div className="rimGlow" /> 
        {/* The solid dark center that hides the middle of the light */}
        <div className="btnInnerCover" /> 
        
        <span className="btnText">Book a Clarity Call</span>
        
        {/* Restoring your arrow icon button */}
        <span className="iconBubble">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </span>
</a>

 <a href="#walkthroughs" className="ghostBtn">
    See How It Works
  </a>

</div>


      {/* ── CTA BUTTONS ── END ── */}

      {/* ── SCROLL HINT ── START ── */}
      <div style={{ marginTop: "56px", display: "flex", alignItems: "center", gap: "12px", fontSize: "10.5px", color: "rgba(255,255,255,0.18)", letterSpacing: "0.12em", textTransform: "uppercase" }}>
        <div style={{ width: "28px", height: "1px", background: "linear-gradient(to right, rgba(255,255,255,0.25), transparent)" }} />
        Scroll to explore
      </div>
      {/* ── SCROLL HINT ── END ── */}

      <style>{`@keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }`}</style>
    </section>
  );
}