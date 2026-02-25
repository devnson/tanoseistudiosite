"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const good = [
  "Your product requires explanation before a demo converts",
  "Your ACV is $10k or above",
  "Sales calls run longer than they should",
  "You launch features quarterly or more",
  "You need assets that work across channels, not just one",
];

const notFor = [
  "One-off edits or quick promo content",
  "You need something delivered by Friday",
  "You're pre-product or pre-revenue",
];

export default function Filter() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const els = ref.current?.querySelectorAll(".filter-block");
    if (!els) return;
    els.forEach((el, i) => {
      gsap.fromTo(el,
        { opacity: 0, y: 28 },
        { opacity: 1, y: 0, duration: 0.7, delay: i * 0.15, ease: "power3.out",
          scrollTrigger: { trigger: ref.current, start: "top 82%" } }
      );
    });
  }, []);

  return (
    <section
      ref={ref}
      style={{ padding: "120px 28px" }}
    >
      <div style={{ maxWidth: "1160px", margin: "0 auto" }}>

        {/* ── HEADER ── START ── */}
        <div className="filter-block" style={{ marginBottom: "64px", opacity: 0 }}>
          <h2
            style={{
              fontFamily: "var(--font-dm)",
              fontWeight: 800,
              fontSize: "clamp(32px, 5vw, 56px)",
              letterSpacing: "-0.035em",
              lineHeight: 1.05,
              margin: "0 0 16px 0",
            }}
          >
            <span style={{ fontWeight: 300 }}>Built for teams where</span>{" "}
            clarity impacts revenue.
          </h2>
          <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.35)", maxWidth: "520px", lineHeight: 1.7, margin: 0 }}>
            We work with a small number of B2B SaaS teams at a time. This is who we're set up to serve.
          </p>
        </div>
        {/* ── HEADER ── END ── */}

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2px" }}>

          {/* ── GOOD FIT ── START ── */}
          <div
            className="filter-block"
            style={{
              padding: "40px",
              borderRadius: "14px 0 0 14px",
              border: "1px solid rgba(255,255,255,0.07)",
              background: "rgba(255,255,255,0.02)",
              opacity: 0,
            }}
          >
            <p style={{ fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: "28px", fontWeight: 500 }}>
              Good fit
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {good.map((item, i) => (
                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "14px" }}>
                  <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "13px", marginTop: "2px", flexShrink: 0 }}>✓</span>
                  <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.65)", lineHeight: 1.6, margin: 0 }}>{item}</p>
                </div>
              ))}
            </div>
          </div>
          {/* ── GOOD FIT ── END ── */}

          {/* ── NOT FOR ── START ── */}
          <div
            className="filter-block"
            style={{
              padding: "40px",
              borderRadius: "0 14px 14px 0",
              border: "1px solid rgba(255,255,255,0.07)",
              borderLeft: "none",
              background: "rgba(255,255,255,0.01)",
              opacity: 0,
            }}
          >
            <p style={{ fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.18)", marginBottom: "28px", fontWeight: 500 }}>
              Not the right fit
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {notFor.map((item, i) => (
                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "14px" }}>
                  <span style={{ color: "rgba(255,255,255,0.18)", fontSize: "13px", marginTop: "2px", flexShrink: 0 }}>✕</span>
                  <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.3)", lineHeight: 1.6, margin: 0 }}>{item}</p>
                </div>
              ))}
            </div>

            {/* ── PRICING ANCHOR ── START ── */}
            <div style={{ marginTop: "48px", paddingTop: "28px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
              <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.2)", lineHeight: 1.7, margin: 0 }}>
                Engagements typically start at <span style={{ color: "rgba(255,255,255,0.45)", fontWeight: 500 }}>$3,000 per sprint.</span> Retainers available for ongoing teams.
              </p>
            </div>
            {/* ── PRICING ANCHOR ── END ── */}

          </div>
          {/* ── NOT FOR ── END ── */}

        </div>
      </div>
    </section>
  );
}