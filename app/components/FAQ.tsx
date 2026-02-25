"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const faqs = [
  {
    q: "How long does a typical project take?",
    a: "Most projects go from brief to delivery in 14 days. Larger retainer engagements run on monthly sprints with a consistent output cadence.",
  },
  {
    q: "Do you work with early-stage startups?",
    a: "Yes — some of our best work has been with seed and Series A companies where the narrative is still being shaped. If you're pre-PMF, we can help you find the story worth telling.",
  },
  {
    q: "What does 'reusable visual library' mean in practice?",
    a: "It means every asset we build is designed to be repurposed. A case study video becomes social cuts, sales deck slides, and website sections. One production sprint, multiple channels.",
  },
  {
    q: "Do we need to provide a script or brief?",
    a: "No. We run a 30-minute call, write the narrative brief ourselves, and get your approval before a single frame is touched. Most clients are surprised how little they need to do.",
  },
  {
    q: "What's included in the retainer?",
    a: "A dedicated creative pod — typically 4–8 deliverables per month depending on scope — plus async creative direction, a shared production calendar, and priority turnaround on urgent requests.",
  },
  {
    q: "Where are you based?",
    a: "Kathmandu, Nepal. We work with clients globally across US, EU, and APAC time zones. Async-first with weekly syncs when needed.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.fromTo(
      headerRef.current,
      { opacity: 0, y: 32 },
      {
        opacity: 1, y: 0, duration: 0.7, ease: "power3.out",
        scrollTrigger: { trigger: headerRef.current, start: "top 85%" },
      }
    );

    gsap.fromTo(
      listRef.current,
      { opacity: 0, y: 24 },
      {
        opacity: 1, y: 0, duration: 0.7, ease: "power3.out",
        scrollTrigger: { trigger: listRef.current, start: "top 85%" },
      }
    );
  }, []);

  return (
    <section
      style={{
        padding: "120px 24px",
        background: "rgba(255,255,255,0.012)",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <div
        style={{
          maxWidth: "1160px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1fr 2fr",
          gap: "80px",
          alignItems: "start",
        }}
      >

        {/* ── SECTION HEADER ── START ── */}
        <div ref={headerRef} style={{ opacity: 0, position: "sticky", top: "100px" }}>
          <p
            style={{
              fontSize: "11px",
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.3)",
              marginBottom: "16px",
              fontWeight: 500,
            }}
          >
            FAQ
          </p>
          <h2
            style={{
              fontFamily: "var(--font-syne)",
              fontWeight: 800,
              fontSize: "clamp(28px, 4vw, 44px)",
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
              margin: "0 0 20px 0",
            }}
          >
            <span style={{ fontWeight: 300 }}>Common</span>{" "}
            questions.
          </h2>
          <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.35)", lineHeight: 1.7 }}>
            Anything else? Book a call and ask directly.
          </p>
        </div>
        {/* ── SECTION HEADER ── END ── */}

        {/* ── FAQ ACCORDION ── START ── */}
        <div ref={listRef} style={{ opacity: 0 }}>
          {faqs.map((faq, i) => (
            <div
              key={i}
              style={{
                borderBottom: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "24px 0",
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  textAlign: "left",
                  gap: "16px",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-syne)",
                    fontWeight: 600,
                    fontSize: "16px",
                    color: open === i ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.7)",
                    transition: "color 0.2s",
                  }}
                >
                  {faq.q}
                </span>
                <span
                  style={{
                    flexShrink: 0,
                    width: "24px",
                    height: "24px",
                    borderRadius: "50%",
                    border: "1px solid rgba(255,255,255,0.12)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "16px",
                    color: "rgba(255,255,255,0.4)",
                    transition: "all 0.3s",
                    transform: open === i ? "rotate(45deg)" : "rotate(0deg)",
                  }}
                >
                  +
                </span>
              </button>

              <div
                style={{
                  maxHeight: open === i ? "300px" : "0",
                  overflow: "hidden",
                  transition: "max-height 0.4s cubic-bezier(0.2, 1, 0.2, 1)",
                }}
              >
                <p
                  style={{
                    fontSize: "14px",
                    color: "rgba(255,255,255,0.45)",
                    lineHeight: 1.75,
                    paddingBottom: "24px",
                    margin: 0,
                  }}
                >
                  {faq.a}
                </p>
              </div>
            </div>
          ))}
        </div>
        {/* ── FAQ ACCORDION ── END ── */}

      </div>
    </section>
  );
}