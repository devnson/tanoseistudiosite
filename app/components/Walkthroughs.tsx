"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ─────────────────────────────────────────────────────────────
//  WALKTHROUGH DATA
//  videoId  — YouTube ID. Leave "" until you have the real ID.
//  thumb    — Override thumbnail URL. Leave "" to use YouTube default.
// ─────────────────────────────────────────────────────────────

// ── WALKTHROUGH DATA ── START ──
const walkthroughs = [
  {
    client: "SecurityPal",
    type: "Enterprise Narrative System",
    slug: "securitypal-case",
    videoId: "azDJfHvwpEY",
    problem: "Sales required 20+ minutes to explain the core process. Demo calls carried too much weight.",
    built: "90-second narrative video structured for decks, homepage, and enterprise outreach.",
    result: "Deployed across enterprise pipeline. Reduced pre-demo explanation load.",
    tags: ["Sales deck", "Homepage asset", "Enterprise pipeline"],
  },
  {
    client: "DocUnlock",
    type: "Feature Launch Walkthrough",
    slug: "docunlock-case",
    videoId: "0WjL6oWzHUg",
    thumb: "",
    context: "AI-powered document tool with a feature set that requires more than a screenshot to understand.",
    problem: "Landing page visitors weren't converting because they had to be told what the product did — not shown.",
    built: "90-second buyer-legible walkthrough built around the moment of insight. Structured for landing page hero placement.",
    result: "Deployed on landing page and used in sales outreach. Reduced explanation load in early-stage conversations.",
    tags: ["Landing page asset", "Sales enablement", "Feature walkthrough"],
  },
  {
    client: "Aleph",
    type: "Funding Announcement Film",
    slug: "aleph-case",
    videoId: "7sbP3rOhPec",
    thumb: "",
    context: "Series B announcement requiring fast turnaround to align with press cycle.",
    problem: "Needed investor-grade authority signal. Standard agency timelines wouldn't hold.",
    built: "Single hero video delivered in 7 days. Structured for press, hiring, and investor audiences.",
    result: "Used in announcement deck and hiring pipeline.",
    tags: ["Investor announcement", "Press asset", "Hiring signal"],
  },
];
// ── WALKTHROUGH DATA ── END ──

export default function Walkthroughs() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  // ── SCROLL LOCK ON MODAL ── START ──
  useEffect(() => {
    if (activeVideo) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [activeVideo]);
  // ── SCROLL LOCK ON MODAL ── END ──

  // ── HEADER ENTRANCE ── START ──
  useEffect(() => {
    gsap.fromTo(headerRef.current,
      { opacity: 0, y: 28 },
      { opacity: 1, y: 0, duration: 0.7, ease: "power3.out",
        scrollTrigger: { trigger: headerRef.current, start: "top 85%" } }
    );

    const rows = sectionRef.current?.querySelectorAll(".wt-row");
    rows?.forEach((row, i) => {
      gsap.fromTo(row,
        { opacity: 0, y: 32 },
        { opacity: 1, y: 0, duration: 0.7, delay: i * 0.1, ease: "power3.out",
          scrollTrigger: { trigger: row, start: "top 88%" } }
      );
    });
  }, []);
  // ── HEADER ENTRANCE ── END ──

  return (
    <>
      <section
        ref={sectionRef}
        style={{
          padding: "120px 28px",
          borderTop: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div style={{ maxWidth: "1160px", margin: "0 auto" }}>

          {/* ── HEADER ── START ── */}
          <div ref={headerRef} style={{ marginBottom: "72px", opacity: 0 }}>

            {/* Before / After framing */}
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "12px",
              marginBottom: "28px",
              padding: "6px 14px",
              borderRadius: "999px",
              border: "1px solid rgba(255,255,255,0.07)",
              background: "rgba(255,255,255,0.02)",
            }}>
              <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.35)", fontWeight: 400 }}>Complex product</span>
              <svg width="32" height="10" viewBox="0 0 32 10" fill="none">
                <path d="M0 5h28M24 1l4 4-4 4" stroke="rgba(255,255,255,0.2)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.55)", fontWeight: 500 }}>Buyer-clear narrative</span>
            </div>

            <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: "24px", flexWrap: "wrap" }}>
              <div>
                <h2 style={{
                  fontFamily: "var(--font-dm)",
                  fontWeight: 800,
                  fontSize: "clamp(32px, 5vw, 52px)",
                  letterSpacing: "-0.035em",
                  lineHeight: 1.05,
                  margin: "0 0 16px 0",
                }}>
                  Selected Work.
                </h2>
                <p style={{
                  fontSize: "15px",
                  color: "rgba(255,255,255,0.38)",
                  margin: 0,
                  lineHeight: 1.6,
                }}>
                  Three systems. Three different business outcomes.
                </p>
              </div>

              {/* ── READ FULL CASE STUDIES button ── START ── */}
              <Link
                href="/case-studies"
                style={{
                  display: "inline-flex", alignItems: "center", gap: "8px",
                  padding: "10px 20px",
                  borderRadius: "999px",
                  border: "1px solid rgba(255,255,255,0.14)",
                  background: "rgba(255,255,255,0.03)",
                  color: "rgba(255,255,255,0.6)",
                  fontSize: "13px",
                  fontWeight: 600,
                  textDecoration: "none",
                  fontFamily: "var(--font-dm)",
                  whiteSpace: "nowrap",
                  transition: "border-color 0.2s, background 0.2s, color 0.2s",
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.3)";
                  (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.06)";
                  (e.currentTarget as HTMLAnchorElement).style.color = "#fff";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.14)";
                  (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.03)";
                  (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.6)";
                }}
              >
                Read full case studies
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ transform: "rotate(-45deg)" }}>
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
              {/* ── READ FULL CASE STUDIES button ── END ── */}
            </div>

          </div>
          {/* ── HEADER ── END ── */}


          {/* ── WALKTHROUGH ROWS ── START ── */}
          <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
            {walkthroughs.map((w, i) => {
              const thumbUrl = w.thumb ||
                (w.videoId ? `https://img.youtube.com/vi/${w.videoId}/hqdefault.jpg` : null);

              return (
                <div
                  key={w.client}
                  className="wt-row"
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "0",
                    border: "1px solid rgba(255,255,255,0.07)",
                    borderRadius: i === 0 ? "14px 14px 0 0" : i === walkthroughs.length - 1 ? "0 0 14px 14px" : "0",
                    overflow: "hidden",
                    opacity: 0,
                    borderBottom: i < walkthroughs.length - 1 ? "none" : "1px solid rgba(255,255,255,0.07)",
                  }}
                >

                  {/* ── LEFT: VIDEO + CTA ── START ── */}
                  <div style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    borderRight: "1px solid rgba(255,255,255,0.07)",
                  }}>
                    {/* Video thumbnail */}
                    <div
                      onClick={() => w.videoId && setActiveVideo(w.videoId)}
                      style={{
                        position: "relative",
                        aspectRatio: "16/9",
                        background: "#080808",
                        cursor: w.videoId ? "pointer" : "default",
                        overflow: "hidden",
                        flexShrink: 0,
                        width: "100%",
                      }}
                    >
                    {thumbUrl ? (
                      <img
                        src={thumbUrl}
                        alt={w.client}
                        style={{
                          position: "absolute", inset: 0,
                          width: "100%", height: "100%",
                          objectFit: "cover",
                          opacity: 0.6,
                          transition: "opacity 0.3s",
                        }}
                        onMouseEnter={e => w.videoId && ((e.currentTarget as HTMLImageElement).style.opacity = "0.85")}
                        onMouseLeave={e => ((e.currentTarget as HTMLImageElement).style.opacity = "0.6")}
                      />
                    ) : (
                      <div style={{
                        position: "absolute", inset: 0,
                        display: "flex", flexDirection: "column",
                        alignItems: "center", justifyContent: "center", gap: "12px",
                        background: "linear-gradient(135deg, #0a0a0a, #111)",
                      }}>
                        <div style={{
                          width: "48px", height: "48px",
                          borderRadius: "50%",
                          border: "1px solid rgba(255,255,255,0.08)",
                          display: "flex", alignItems: "center", justifyContent: "center",
                        }}>
                          <svg width="14" height="16" viewBox="0 0 14 16" fill="rgba(255,255,255,0.2)">
                            <path d="M0 0L14 8 0 16z" />
                          </svg>
                        </div>
                        <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.18)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                          Video coming
                        </span>
                      </div>
                    )}
                    {w.videoId && (
                      <div style={{
                        position: "absolute", inset: 0,
                        display: "flex", alignItems: "center", justifyContent: "center",
                      }}>
                        <div style={{
                          width: "52px", height: "52px",
                          borderRadius: "50%",
                          background: "rgba(0,0,0,0.5)",
                          backdropFilter: "blur(8px)",
                          border: "1px solid rgba(255,255,255,0.15)",
                          display: "flex", alignItems: "center", justifyContent: "center",
                          transition: "transform 0.2s, background 0.2s",
                        }}>
                          <svg width="14" height="16" viewBox="0 0 14 16" fill="white" style={{ marginLeft: "2px" }}>
                            <path d="M0 0L14 8 0 16z" />
                          </svg>
                        </div>
                      </div>
                    )}
                    </div>

                    {/* ── READ FULL CASE STUDY — pill under video ── START ── */}
                    <Link
                      href={`/case-studies/${w.slug}`}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "7px",
                        margin: "16px auto",
                        padding: "7px 18px",
                        borderRadius: "999px",
                        border: "1px solid rgba(255,255,255,0.12)",
                        background: "rgba(255,255,255,0.03)",
                        color: "rgba(255,255,255,0.5)",
                        fontSize: "12px",
                        fontWeight: 600,
                        textDecoration: "none",
                        fontFamily: "var(--font-dm)",
                        letterSpacing: "0.01em",
                        transition: "border-color 0.2s, background 0.2s, color 0.2s",
                        alignSelf: "center",
                      }}
                      onMouseEnter={e => {
                        (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.28)";
                        (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.07)";
                        (e.currentTarget as HTMLAnchorElement).style.color = "#fff";
                      }}
                      onMouseLeave={e => {
                        (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.12)";
                        (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.03)";
                        (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.5)";
                      }}
                    >
                      Read full case study
                      <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ transform: "rotate(-45deg)" }}>
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </Link>
                    {/* ── READ FULL CASE STUDY ── END ── */}

                  </div>
                  {/* ── LEFT ── END ── */}

                  {/* ── RIGHT: BUSINESS SUMMARY ── START ── */}
                  <div style={{
                    padding: "36px 40px",
                    background: "rgba(255,255,255,0.01)",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    gap: "24px",
                  }}>
                    {/* Client + type */}
                    <div>
                      <div style={{ display: "flex", alignItems: "baseline", gap: "12px", marginBottom: "4px" }}>
                        <span style={{
                          fontFamily: "var(--font-dm)",
                          fontWeight: 700,
                          fontSize: "18px",
                          letterSpacing: "-0.02em",
                          color: "rgba(255,255,255,0.9)",
                        }}>{w.client}</span>
                        <span style={{
                          fontSize: "11px",
                          color: "rgba(255,255,255,0.3)",
                          letterSpacing: "0.08em",
                          textTransform: "uppercase",
                          fontWeight: 500,
                        }}>{w.type}</span>
                      </div>
                    </div>

                    {/* Structured breakdown */}
                    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                      {[
                        { label: "The Context", value: w.context },
                        { label: "The Problem", value: w.problem },
                        { label: "What We Built", value: w.built },
                        { label: "Result", value: w.result },
                      ].map(item => (
                        <div key={item.label} style={{ display: "grid", gridTemplateColumns: "120px 1fr", gap: "12px" }}>
                          <span style={{
                            fontSize: "11px",
                            color: "rgba(255,255,255,0.25)",
                            fontWeight: 500,
                            letterSpacing: "0.06em",
                            textTransform: "uppercase",
                            paddingTop: "2px",
                            flexShrink: 0,
                          }}>{item.label}</span>
                          <span style={{
                            fontSize: "13.5px",
                            color: "rgba(255,255,255,0.6)",
                            lineHeight: 1.65,
                          }}>{item.value}</span>
                        </div>
                      ))}
                    </div>

                    {/* ── TAGS — white fill on hover ── START ── */}
                    <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                      {w.tags.map(tag => (
                        <span
                          key={tag}
                          style={{
                            fontSize: "11px",
                            color: "rgba(255,255,255,0.3)",
                            padding: "4px 10px",
                            borderRadius: "999px",
                            border: "1px solid rgba(255,255,255,0.07)",
                            background: "transparent",
                            fontWeight: 500,
                            letterSpacing: "0.04em",
                            cursor: "default",
                            transition: "color 0.15s, border-color 0.15s, background 0.15s",
                          }}
                          onMouseEnter={e => {
                            const el = e.currentTarget as HTMLSpanElement;
                            el.style.color = "#000";
                            el.style.background = "#fff";
                            el.style.borderColor = "#fff";
                          }}
                          onMouseLeave={e => {
                            const el = e.currentTarget as HTMLSpanElement;
                            el.style.color = "rgba(255,255,255,0.3)";
                            el.style.background = "transparent";
                            el.style.borderColor = "rgba(255,255,255,0.07)";
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    {/* ── TAGS ── END ── */}

                  </div>
                  {/* ── RIGHT ── END ── */}

                </div>
              );
            })}
          </div>
          {/* ── WALKTHROUGH ROWS ── END ── */}

          {/* ── FOOTER LINE ── START ── */}
          <div style={{
            marginTop: "40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "16px",
            paddingTop: "28px",
            borderTop: "1px solid rgba(255,255,255,0.06)",
          }}>
            <p style={{
              fontSize: "12px",
              color: "rgba(255,255,255,0.2)",
              letterSpacing: "0.04em",
              margin: 0,
            }}>
              Every walkthrough was built inside a 14-day sprint.
            </p>

            <Link
              href="/case-studies"
              style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                padding: "9px 20px",
                borderRadius: "999px",
                border: "1px solid rgba(255,255,255,0.12)",
                background: "rgba(255,255,255,0.03)",
                color: "rgba(255,255,255,0.55)",
                fontSize: "12.5px", fontWeight: 600,
                textDecoration: "none",
                fontFamily: "var(--font-dm)",
                whiteSpace: "nowrap",
                transition: "border-color 0.2s, background 0.2s, color 0.2s",
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.borderColor = "rgba(255,255,255,0.28)";
                el.style.background = "rgba(255,255,255,0.07)";
                el.style.color = "#fff";
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.borderColor = "rgba(255,255,255,0.12)";
                el.style.background = "rgba(255,255,255,0.03)";
                el.style.color = "rgba(255,255,255,0.55)";
              }}
            >
              View all case studies
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ transform: "rotate(-45deg)" }}>
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
          {/* ── FOOTER LINE ── END ── */}

        </div>
      </section>

      {/* ── VIDEO MODAL ── START ── */}
      {activeVideo && (
        <div
          onClick={() => setActiveVideo(null)}
          style={{
            position: "fixed", inset: 0, zIndex: 9999,
            background: "rgba(0,0,0,0.92)",
            backdropFilter: "blur(16px)",
            display: "flex", alignItems: "center", justifyContent: "center",
            padding: "24px",
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{ width: "min(960px, 96vw)", position: "relative" }}
          >
            <button
              onClick={() => setActiveVideo(null)}
              style={{
                position: "absolute", top: "-44px", right: 0,
                background: "transparent",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "rgba(255,255,255,0.45)",
                borderRadius: "8px",
                padding: "6px 16px",
                fontSize: "12px",
                cursor: "pointer",
                letterSpacing: "0.06em",
                fontFamily: "var(--font-dm)",
              }}
            >
              ESC / CLOSE
            </button>
            <div style={{
              width: "100%", aspectRatio: "16/9",
              borderRadius: "12px",
              overflow: "hidden",
              border: "1px solid rgba(255,255,255,0.1)",
              background: "#000",
            }}>
              <iframe
                src={`https://www.youtube.com/embed/${activeVideo}?autoplay=1&modestbranding=1&rel=0&showinfo=0`}
                allow="autoplay; fullscreen"
                allowFullScreen
                style={{ width: "100%", height: "100%", border: "none" }}
              />
            </div>
          </div>
        </div>
      )}
      {/* ── VIDEO MODAL ── END ── */}
    </>
  );
}