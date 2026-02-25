"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function QuoteBlock() {
  const blockRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.fromTo(
      blockRef.current,
      { opacity: 0, y: 32 },
      {
        opacity: 1, y: 0, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: blockRef.current, start: "top 82%" },
      }
    );
  }, []);

  return (
    <section
      style={{
        padding: "100px 24px",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        background: "rgba(255,255,255,0.012)",
      }}
    >
      <div
        ref={blockRef}
        style={{
          maxWidth: "840px",
          margin: "0 auto",
          textAlign: "center",
          opacity: 0,
        }}
      >
        {/* ── QUOTE ── START ── */}
        <p
          style={{
            fontFamily: "var(--font-dm)",
            fontSize: "clamp(22px, 3.5vw, 36px)",
            fontWeight: 500,
            lineHeight: 1.45,
            letterSpacing: "-0.025em",
            color: "rgba(255,255,255,0.85)",
            margin: "0 0 28px 0",
          }}
        >
          "Most B2B video feels like a PowerPoint with a voiceover.
          <br />
          We think your product deserves better than that —
          <br />
          and so do your buyers."
        </p>
        {/* ── QUOTE ── END ── */}

        {/* ── ATTRIBUTION ── START ── */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "12px",
          }}
        >
          <div
            style={{
              width: "32px",
              height: "1px",
              background: "rgba(255,255,255,0.15)",
            }}
          />
          <span
            style={{
              fontSize: "13px",
              color: "rgba(255,255,255,0.3)",
              fontWeight: 500,
            }}
          >
            Sushan, Co-founder · Tanosei Studio
          </span>
          <div
            style={{
              width: "32px",
              height: "1px",
              background: "rgba(255,255,255,0.15)",
            }}
          />
        </div>
        {/* ── ATTRIBUTION ── END ── */}
      </div>
    </section>
  );
}