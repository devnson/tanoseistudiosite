"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const links = {
  Work: ["SecurityPal", "Thera", "Niural AI", "Julius"],
  Services: ["Sales Enablement", "Category Narrative", "Motion System", "Retainer"],
  Company: ["How We Work", "Team", "FAQ", "Contact"],
};

export default function Footer() {
  const ctaRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.fromTo(
      ctaRef.current,
      { opacity: 0, y: 40 },
      {
        opacity: 1, y: 0, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: ctaRef.current, start: "top 85%" },
      }
    );
    gsap.fromTo(
      footerRef.current,
      { opacity: 0 },
      {
        opacity: 1, duration: 0.6, ease: "power2.out",
        scrollTrigger: { trigger: footerRef.current, start: "top 95%" },
      }
    );
  }, []);

  return (
    <footer style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>

      {/* ── CTA BLOCK ── START ── */}
      <div
        ref={ctaRef}
        style={{
          padding: "120px 24px",
          textAlign: "center",
          opacity: 0,
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background glow */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "600px",
            height: "300px",
            borderRadius: "50%",
            background: "rgba(255,255,255,0.02)",
            filter: "blur(80px)",
            pointerEvents: "none",
          }}
        />

        <p
          style={{
            fontSize: "11px",
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.3)",
            marginBottom: "24px",
            fontWeight: 500,
          }}
        >
          Ready to start
        </p>

        <h2
          style={{
            fontFamily: "var(--font-syne)",
            fontWeight: 800,
            fontSize: "clamp(36px, 7vw, 80px)",
            letterSpacing: "-0.04em",
            lineHeight: 1.0,
            margin: "0 0 40px 0",
          }}
        >
          <span style={{ fontWeight: 300 }}>Let's make your</span>
          <br />
          product obvious.
        </h2>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "12px",
            flexWrap: "wrap",
          }}
        >

          
          <a
              href="https://cal.com/tanoseihito/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="premiumBtn"
            >
              <span className="rimGlow" />
              <span className="btnInnerCover" />

              <span className="btnText">Book a Clarity Call</span>

              <span className="iconBubble" aria-hidden="true">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </span>
            </a>

      

          <a
            href="mailto:sushan@tanosei.studio"
            style={{
              padding: "12px 24px",
              borderRadius: "11px",
              fontSize: "13.5px",
              fontWeight: 500,
              textDecoration: "none",
              color: "rgba(255,255,255,0.45)",
              border: "1px solid rgba(255,255,255,0.09)",
              background: "rgba(255,255,255,0.02)",
              transition: "all 0.2s",
            }}
          >
            sushan@tanosei.studio
          </a>
        </div>
      </div>
      {/* ── CTA BLOCK ── END ── */}

      {/* ── FOOTER LINKS ── START ── */}
      <div
        ref={footerRef}
        style={{
          borderTop: "1px solid rgba(255,255,255,0.06)",
          padding: "48px 24px",
          maxWidth: "1160px",
          margin: "0 auto",
          opacity: 0,
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr 1fr 1fr",
            gap: "40px",
            marginBottom: "48px",
          }}
        >
          {/* Brand column */}
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                fontFamily: "var(--font-syne)",
                fontWeight: 700,
                fontSize: "15px",
                marginBottom: "16px",
              }}
            >
              <span
                style={{
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.8)",
                  display: "inline-block",
                }}
              />
              Tanosei{" "}
              <span style={{ color: "rgba(255,255,255,0.35)", fontWeight: 400 }}>
                Studio
              </span>
            </div>
            <p
              style={{
                fontSize: "13px",
                color: "rgba(255,255,255,0.3)",
                lineHeight: 1.7,
                maxWidth: "240px",
              }}
            >
              B2B video and motion design for SaaS companies that want to be understood.
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(links).map(([heading, items]) => (
            <div key={heading}>
              <p
                style={{
                  fontSize: "11px",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.25)",
                  marginBottom: "16px",
                  fontWeight: 600,
                }}
              >
                {heading}
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {items.map((item) => (
                  <a
                    key={item}
                    href="#"
                    style={{
                      fontSize: "13px",
                      color: "rgba(255,255,255,0.35)",
                      textDecoration: "none",
                      transition: "color 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.7)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.35)";
                    }}
                  >
                    {item}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          style={{
            paddingTop: "24px",
            borderTop: "1px solid rgba(255,255,255,0.06)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "12px",
          }}
        >
          <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.2)", margin: 0 }}>
            © 2025 Tanosei Studio. Kathmandu, Nepal.
          </p>
          <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.15)", margin: 0 }}>
            Make complex products obvious.
          </p>
        </div>
      </div>
      {/* ── FOOTER LINKS ── END ── */}

    </footer>
  );
}