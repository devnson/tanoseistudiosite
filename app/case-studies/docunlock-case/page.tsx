"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ─────────────────────────────────────────────────────────────
//  CASE STUDY DATA
//  To create a new case study: duplicate this file into a new
//  folder (e.g. app/case-studies/securitypal-case/page.tsx)
//  and update every field in this object. Nothing else changes.
// ─────────────────────────────────────────────────────────────
const cs = {
  client:   "DocUnlock",
  subject:  "Feature Launch",
  industry: "AI Infra · SaaS",
  type:     "Walkthrough Video",
  year:     "2024",

  // ── HERO ──
  headline: "How DocUnlock made a complex AI feature instantly obvious to every buyer.",
  subhead:  "A feature walkthrough built for landing page placement and sales reuse — engineered around the moment of insight.",

  // ── EXECUTIVE OVERVIEW ──
  // Short punchy summary. 2–3 sentences. Think: what would a CFO read first?
  overview:
    "DocUnlock built a genuinely powerful AI feature — but buyers couldn't see it. We built a 90-second walkthrough video that turned a complex workflow into an instant moment of clarity, deployed on their landing page within 14 days.",

  // ── SITUATION ──
  situation:
    "DocUnlock helps teams extract structured value from dense documents using AI. Their core feature is powerful — but it requires more than a screenshot to understand. The landing page described the product. It needed to show it.",

  // ── CHALLENGE: pain points listed clearly ──
  challengeIntro:
    "The challenge wasn't making a nice video. It was identifying the exact moment a buyer gets it — and building everything around that beat.",
  challengePoints: [
    "Landing page visitors weren't converting because they had to be told what the product did, not shown.",
    "Sales calls carried too much explanation load before the product could speak for itself.",
    "Screen recordings alone felt flat — the feature needed motion and narrative to feel real.",
    "Tight timeline: the feature was already live and the team needed an asset fast.",
  ],

  // ── INLINE PULL QUOTE (scattered through the narrative, like SecurityPal) ──
  pullQuote: {
    text:   "We didn't want another explainer video. We wanted a video that made the feature feel like something you've been waiting for.",
    person: "Founder, DocUnlock",
  },

  // ── WHAT WE BUILT ──
  deliverables: [
    "90-second feature walkthrough video (primary landing page hero)",
    "30-second cutdown for outbound email and LinkedIn",
    "Motion-designed screen recordings with annotated callouts",
  ],

  // ── MAIN VIDEO ──
  // YouTube: https://www.youtube.com/embed/VIDEO_ID
  // Vimeo:   https://player.vimeo.com/video/VIDEO_ID
  videoUrl:     "https://www.youtube.com/embed/0WjL6oWzHUg?modestbranding=1&rel=0&showinfo=0&color=white",
  videoCaption: "DocUnlock — Feature Launch Walkthrough · 01:28",

  // ── WHY IT WORKED ──
  whyItWorked: [
    { heading: "Insight-first structure",    body: "We identified the single moment the feature becomes obvious and built the entire narrative around that beat — not a feature list." },
    { heading: "Built for placement",        body: "Designed for landing page hero placement from day one. Aspect ratio, pacing, and subtitle density all optimised for above-the-fold." },
    { heading: "Sales-ready from delivery",  body: "The 30-second cutdown was structured for direct send — usable in outbound without any editing on the client's side." },
    { heading: "14-day turnaround",          body: "Scoped, scripted, produced, and delivered within a single sprint. No back-and-forth cycles or drawn-out approvals." },
  ],

  // ── OUTCOME STATS ──
  outcomes: [
    { label: "Deployed on",  value: "Landing page"    },
    { label: "Also used in", value: "Sales outreach"  },
    { label: "Package",      value: "Hero + cutdowns" },
    { label: "Turnaround",   value: "14-day sprint"   },
  ],

  // ── TESTIMONIAL VIDEO — paste embed URL when you have it ──
  testimonialVideoUrl: "",
  testimonialPerson:   "Founder, DocUnlock",
  testimonialQuote:
    "Tanosei understood the product before we even sent the brief. The final video explained the feature better than anything we had written — and it was live on the landing page within two weeks.",

  // ── RELATED CASE STUDIES ──
  related: [
    {
      slug:     "securitypal-case",
      client:   "SecurityPal",
      tag:      "Enterprise Narrative",
      headline: "How SecurityPal reduced 20-minute sales explanations to a 90-second video.",
      thumb:    "", // paste thumbnail URL
    },
    {
      slug:     "thera-oceans",
      client:   "Thera × Oceans",
      tag:      "Case Study Series",
      headline: "How Thera turned written customer stories into a 3-part outbound video series.",
      thumb:    "",
    },
    {
      slug:     "aleph-case",
      client:   "Aleph",
      tag:      "Funding Announcement",
      headline: "How Aleph delivered an investor-grade announcement film in 7 days.",
      thumb:    "",
    },
  ],

  // ── NEXT CASE STUDY (bottom sequential link) ──
  next: {
    slug:     "securitypal-case",
    client:   "SecurityPal",
    subject:  "Enterprise Narrative",
    headline: "How SecurityPal reduced 20-minute sales explanations to a 90-second video.",
  },
};
// ── CASE STUDY DATA ── END ──


// ── VIDEO BLOCK COMPONENT ── START ──
function VideoBlock({
  url, caption, label, aspectRatio = "16 / 9",
}: {
  url: string; caption?: string; label?: string; aspectRatio?: string;
}) {
  return (
    <div>
      {label && (
        <p style={{ fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)", fontWeight: 500, marginBottom: "14px" }}>
          {label}
        </p>
      )}
      <div style={{
        width: "100%", aspectRatio,
        borderRadius: "12px", overflow: "hidden",
        border: "1px solid rgba(255,255,255,0.08)",
        background: "#050010", position: "relative",
      }}>
        {url ? (
          <iframe
            src={url}
            style={{ width: "100%", height: "100%", border: "none", display: "block" }}
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <div style={{
            position: "absolute", inset: 0,
            display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "16px",
            backgroundImage: "radial-gradient(rgba(255,255,255,0.02) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}>
            <div style={{
              width: "56px", height: "56px", borderRadius: "50%",
              border: "1px solid rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.04)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M5 3l14 9-14 9V3z" fill="rgba(255,255,255,0.4)" />
              </svg>
            </div>
            <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.22)", margin: 0, textAlign: "center", lineHeight: 1.6 }}>
              Video coming soon<br />
              <span style={{ fontSize: "10.5px", color: "rgba(255,255,255,0.14)" }}>Paste embed URL in videoUrl field</span>
            </p>
          </div>
        )}
      </div>
      {caption && (
        <p style={{ fontSize: "11.5px", color: "rgba(255,255,255,0.22)", margin: "10px 0 0", lineHeight: 1.6 }}>
          {caption}
        </p>
      )}
    </div>
  );
}
// ── VIDEO BLOCK COMPONENT ── END ──


// ── PULL QUOTE COMPONENT ── START ──
function PullQuote({ text, person }: { text: string; person: string }) {
  return (
    <div style={{
      margin: "0",
      padding: "28px 36px",
      borderLeft: "2px solid rgba(255,255,255,0.15)",
      background: "rgba(255,255,255,0.02)",
      borderRadius: "0 12px 12px 0",
    }}>
      <p style={{
        fontSize: "17px", color: "rgba(255,255,255,0.62)",
        lineHeight: 1.8, margin: "0 0 14px",
        fontStyle: "italic", letterSpacing: "-0.01em",
        fontFamily: "var(--font-dm)",
      }}>
        "{text}"
      </p>
      <p style={{ fontSize: "11.5px", color: "rgba(255,255,255,0.28)", margin: 0, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase" }}>
        — {person}
      </p>
    </div>
  );
}
// ── PULL QUOTE COMPONENT ── END ──


export default function DocUnlockCasePage() {
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    pageRef.current?.querySelectorAll(".hero-el").forEach((el, i) => {
      gsap.fromTo(el, { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.7, delay: i * 0.1, ease: "power3.out" });
    });
    pageRef.current?.querySelectorAll(".fade-el").forEach((el) => {
      gsap.fromTo(el, { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 90%", once: true } });
    });
  }, []);

  const Divider = () => (
    <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", margin: "64px 0 56px" }} />
  );

  const SectionLabel = ({ children }: { children: string }) => (
    <p style={{ fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.22)", fontWeight: 500, marginBottom: "28px" }}>
      {children}
    </p>
  );

  return (
    <div style={{ background: "#000", minHeight: "100vh", color: "#f2f2f2", fontFamily: "var(--font-dm), system-ui, sans-serif" }}>
      <div className="noise-overlay" aria-hidden="true" />
      <div className="cursor-light" id="cursorLightCS" aria-hidden="true" />

      {/* ── NAV ── START ── */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        padding: "20px 28px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        background: "rgba(0,0,0,0.82)", backdropFilter: "blur(12px)",
      }}>
        <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "8px" }}>
          <span style={{ fontSize: "13px", fontWeight: 700, color: "rgba(255,255,255,0.55)", letterSpacing: "0.1em", textTransform: "uppercase" }}>Tanosei</span>
          <span style={{ fontSize: "9px", color: "rgba(255,255,255,0.2)", letterSpacing: "0.1em", textTransform: "uppercase", marginTop: "1px" }}>Studio</span>
        </Link>
        <div style={{ display: "flex", alignItems: "center", gap: "28px" }}>
          {[
            { label: "Work",         href: "/work"         },
            { label: "Case Studies", href: "/case-studies" },
            { label: "Studio",       href: "/studio"       },
            { label: "Team",         href: "/team"         },
          ].map(({ label, href }) => (
            <Link key={label} href={href}
              style={{ fontSize: "13px", color: "rgba(255,255,255,0.38)", textDecoration: "none", transition: "color 0.2s" }}
              onMouseEnter={e => (e.currentTarget.style.color = "rgba(255,255,255,0.75)")}
              onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.38)")}>
              {label}
            </Link>
          ))}
          <a href="https://cal.com/tanoseihito/30min" target="_blank" rel="noopener noreferrer"
            style={{ fontSize: "12.5px", color: "#000", background: "#f2f2f2", padding: "8px 18px", borderRadius: "999px", textDecoration: "none", fontWeight: 600, transition: "opacity 0.2s" }}
            onMouseEnter={e => (e.currentTarget.style.opacity = "0.85")}
            onMouseLeave={e => (e.currentTarget.style.opacity = "1")}>
            Book a call
          </a>
        </div>
      </nav>
      {/* ── NAV ── END ── */}

      <div ref={pageRef} style={{ padding: "140px 28px 100px", maxWidth: "860px", margin: "0 auto" }}>

        {/* ── BREADCRUMB ── START ── */}
        <div className="hero-el" style={{ opacity: 0, display: "flex", alignItems: "center", gap: "8px", marginBottom: "32px" }}>
          <Link href="/case-studies"
            style={{ fontSize: "12px", color: "rgba(255,255,255,0.25)", textDecoration: "none", transition: "color 0.2s" }}
            onMouseEnter={e => (e.currentTarget.style.color = "rgba(255,255,255,0.5)")}
            onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.25)")}>
            Case Studies
          </Link>
          <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.15)" }}>›</span>
          <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)" }}>{cs.client} — {cs.subject}</span>
        </div>
        {/* ── BREADCRUMB ── END ── */}

        {/* ── HERO ── START ── */}
        <div style={{ marginBottom: "0" }}>
          <div className="hero-el" style={{ opacity: 0, display: "flex", gap: "8px", marginBottom: "20px", flexWrap: "wrap" }}>
            {[cs.industry, cs.type, cs.year].map(tag => (
              <span key={tag} style={{
                fontSize: "10px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase",
                color: "rgba(255,255,255,0.35)", background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.08)", padding: "3px 10px", borderRadius: "4px",
              }}>
                {tag}
              </span>
            ))}
          </div>
          <h1 className="hero-el" style={{
            opacity: 0, fontFamily: "var(--font-dm)", fontWeight: 800,
            fontSize: "clamp(28px, 5vw, 56px)", letterSpacing: "-0.04em", lineHeight: 1.05, margin: "0 0 20px",
          }}>
            {cs.headline}
          </h1>
          <p className="hero-el" style={{ opacity: 0, fontSize: "16px", color: "rgba(255,255,255,0.35)", lineHeight: 1.75, margin: 0 }}>
            {cs.subhead}
          </p>
        </div>
        {/* ── HERO ── END ── */}

        <Divider />

        {/* ── EXECUTIVE OVERVIEW ── START ── */}
        <div className="fade-el" style={{ opacity: 0 }}>
          <SectionLabel>Executive Overview</SectionLabel>
          <p style={{ fontSize: "18px", color: "rgba(255,255,255,0.6)", lineHeight: 1.8, margin: 0, letterSpacing: "-0.01em" }}>
            {cs.overview}
          </p>
        </div>
        {/* ── EXECUTIVE OVERVIEW ── END ── */}

        <Divider />

        {/* ── MAIN VIDEO ── START ── */}
        <div className="fade-el" style={{ opacity: 0 }}>
          <VideoBlock url={cs.videoUrl} caption={cs.videoCaption} label="The Film" />
        </div>
        {/* ── MAIN VIDEO ── END ── */}

        <Divider />

        {/* ── SITUATION ── START ── */}
        <div className="fade-el" style={{ opacity: 0 }}>
          <SectionLabel>The Situation</SectionLabel>
          <p style={{ fontSize: "16px", color: "rgba(255,255,255,0.52)", lineHeight: 1.85, margin: 0 }}>
            {cs.situation}
          </p>
        </div>
        {/* ── SITUATION ── END ── */}

        <Divider />

        {/* ── CHALLENGE ── START ── */}
        <div className="fade-el" style={{ opacity: 0 }}>
          <SectionLabel>The Challenge</SectionLabel>
          <p style={{ fontSize: "16px", color: "rgba(255,255,255,0.52)", lineHeight: 1.85, margin: "0 0 28px" }}>
            {cs.challengeIntro}
          </p>
          {/* Challenge bullet points — like SecurityPal's "Key Challenges" */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
            {cs.challengePoints.map((point, i) => (
              <div key={i} style={{
                display: "flex", gap: "16px", alignItems: "flex-start",
                padding: "16px 0",
                borderTop: "1px solid rgba(255,255,255,0.05)",
              }}>
                <div style={{
                  width: "20px", height: "20px", borderRadius: "50%", flexShrink: 0,
                  border: "1px solid rgba(255,255,255,0.10)",
                  background: "rgba(255,255,255,0.03)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  marginTop: "2px",
                }}>
                  <div style={{ width: "5px", height: "5px", borderRadius: "50%", background: "rgba(255,255,255,0.28)" }} />
                </div>
                <p style={{ fontSize: "14.5px", color: "rgba(255,255,255,0.52)", lineHeight: 1.7, margin: 0 }}>
                  {point}
                </p>
              </div>
            ))}
          </div>
        </div>
        {/* ── CHALLENGE ── END ── */}

        {/* ── PULL QUOTE ── scattered mid-page like SecurityPal ── START ── */}
        <div className="fade-el" style={{ opacity: 0, margin: "48px 0" }}>
          <PullQuote text={cs.pullQuote.text} person={cs.pullQuote.person} />
        </div>
        {/* ── PULL QUOTE ── END ── */}

        {/* ── WHAT WE BUILT ── START ── */}
        <div className="fade-el" style={{ opacity: 0 }}>
          <SectionLabel>What We Built</SectionLabel>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {cs.deliverables.map((d, i) => (
              <div key={i} style={{
                display: "flex", alignItems: "center", gap: "14px", padding: "16px 0",
                borderBottom: i < cs.deliverables.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none",
              }}>
                <div style={{ width: "5px", height: "5px", borderRadius: "50%", background: "rgba(255,255,255,0.25)", flexShrink: 0 }} />
                <span style={{ fontSize: "15px", color: "rgba(255,255,255,0.58)", lineHeight: 1.6 }}>{d}</span>
              </div>
            ))}
          </div>
        </div>
        {/* ── WHAT WE BUILT ── END ── */}

        <Divider />

        {/* ── WHY IT WORKED ── START ── */}
        {/* Inspired by SecurityPal's "Key Differentiators" section */}
        <div className="fade-el" style={{ opacity: 0 }}>
          <SectionLabel>Why It Worked</SectionLabel>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2px" }}>
            {cs.whyItWorked.map((item, i) => (
              <div key={i} style={{
                padding: "24px 22px",
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius:
                  i === 0 ? "10px 0 0 0" :
                  i === 1 ? "0 10px 0 0" :
                  i === 2 ? "0 0 0 10px" :
                             "0 0 10px 0",
                background: "rgba(255,255,255,0.01)",
                borderRight: i % 2 === 0 ? "none" : "1px solid rgba(255,255,255,0.07)",
                borderBottom: i < 2 ? "none" : "1px solid rgba(255,255,255,0.07)",
              }}>
                <p style={{ fontSize: "13px", fontWeight: 700, color: "rgba(255,255,255,0.7)", margin: "0 0 8px", letterSpacing: "-0.01em" }}>
                  {item.heading}
                </p>
                <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.38)", lineHeight: 1.7, margin: 0 }}>
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
        {/* ── WHY IT WORKED ── END ── */}

        <Divider />

        {/* ── OUTCOME STATS ── START ── */}
        <div className="fade-el" style={{ opacity: 0 }}>
          <SectionLabel>The Outcome</SectionLabel>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "2px" }}>
            {cs.outcomes.map((o, i) => (
              <div key={o.label} style={{
                padding: "24px 20px",
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: i === 0 ? "10px 0 0 10px" : i === cs.outcomes.length - 1 ? "0 10px 10px 0" : "0",
                borderRight: i < cs.outcomes.length - 1 ? "none" : "1px solid rgba(255,255,255,0.07)",
                background: "rgba(255,255,255,0.01)",
              }}>
                <p style={{ fontSize: "10px", color: "rgba(255,255,255,0.22)", fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase", margin: "0 0 8px" }}>
                  {o.label}
                </p>
                <p style={{ fontSize: "14px", fontWeight: 600, color: "rgba(255,255,255,0.65)", margin: 0, lineHeight: 1.4, letterSpacing: "-0.01em" }}>
                  {o.value}
                </p>
              </div>
            ))}
          </div>
        </div>
        {/* ── OUTCOME STATS ── END ── */}

        <Divider />

        {/* ── TESTIMONIAL VIDEO ── START ── */}
        <div className="fade-el" style={{ opacity: 0 }}>
          <VideoBlock url={cs.testimonialVideoUrl} label="Client Testimonial" aspectRatio="16 / 7" />
          {!cs.testimonialVideoUrl && cs.testimonialQuote && (
            <div style={{
              marginTop: "24px", padding: "28px 32px",
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: "12px", background: "rgba(255,255,255,0.015)",
            }}>
              <p style={{ fontSize: "16px", color: "rgba(255,255,255,0.55)", lineHeight: 1.8, margin: "0 0 16px", fontStyle: "italic" }}>
                "{cs.testimonialQuote}"
              </p>
              <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.28)", margin: 0, fontWeight: 500, letterSpacing: "0.04em" }}>
                — {cs.testimonialPerson}
              </p>
            </div>
          )}
          {cs.testimonialVideoUrl && (
            <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.25)", margin: "12px 0 0", fontWeight: 500 }}>
              — {cs.testimonialPerson}
            </p>
          )}
        </div>
        {/* ── TESTIMONIAL VIDEO ── END ── */}

        <Divider />

        {/* ── NEXT CASE STUDY ── START ── */}
        <div className="fade-el" style={{ opacity: 0 }}>
          <SectionLabel>Next Case Study</SectionLabel>
          <Link href={`/case-studies/${cs.next.slug}`} style={{ textDecoration: "none", color: "inherit", display: "block" }}>
            <div
              style={{
                padding: "28px 32px",
                border: "1px solid rgba(255,255,255,0.08)", borderRadius: "12px",
                background: "rgba(255,255,255,0.01)",
                display: "flex", alignItems: "center", justifyContent: "space-between", gap: "24px",
                transition: "background 0.2s, border-color 0.2s",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLDivElement).style.background = "rgba(255,255,255,0.03)";
                (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.14)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLDivElement).style.background = "rgba(255,255,255,0.01)";
                (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.08)";
              }}
            >
              <div>
                <p style={{ fontSize: "10.5px", color: "rgba(255,255,255,0.25)", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", margin: "0 0 8px" }}>
                  {cs.next.client} — {cs.next.subject}
                </p>
                <p style={{ fontSize: "15px", fontWeight: 600, color: "rgba(255,255,255,0.62)", margin: 0, lineHeight: 1.5, letterSpacing: "-0.01em", maxWidth: "520px" }}>
                  {cs.next.headline}
                </p>
              </div>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="2" style={{ flexShrink: 0, transform: "rotate(-45deg)" }}>
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </div>
          </Link>
        </div>
        {/* ── NEXT CASE STUDY ── END ── */}

        <Divider />

        {/* ── RELATED CASE STUDIES GRID ── START ── */}
        {/* Inspired by SecurityPal's "Read More Customer Stories" section */}
        <div className="fade-el" style={{ opacity: 0 }}>
          <SectionLabel>More Case Studies</SectionLabel>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px" }}>
            {cs.related.map((r) => (
              <Link key={r.slug} href={`/case-studies/${r.slug}`} style={{ textDecoration: "none", color: "inherit" }}>
                <div
                  style={{
                    borderRadius: "12px",
                    border: "1px solid rgba(255,255,255,0.07)",
                    background: "rgba(255,255,255,0.01)",
                    overflow: "hidden",
                    transition: "background 0.2s, border-color 0.2s",
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLDivElement).style.background = "rgba(255,255,255,0.03)";
                    (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.12)";
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLDivElement).style.background = "rgba(255,255,255,0.01)";
                    (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.07)";
                  }}
                >
                  {/* Thumbnail */}
                  <div style={{
                    aspectRatio: "16/9",
                    background: "linear-gradient(135deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01))",
                    borderBottom: "1px solid rgba(255,255,255,0.06)",
                    overflow: "hidden", position: "relative",
                  }}>
                    {r.thumb ? (
                      <img src={r.thumb} alt={r.client} style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.7 }} />
                    ) : (
                      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                          <path d="M5 3l14 9-14 9V3z" fill="rgba(255,255,255,0.12)" />
                        </svg>
                      </div>
                    )}
                  </div>
                  {/* Text */}
                  <div style={{ padding: "16px 18px 20px" }}>
                    <p style={{ fontSize: "10px", color: "rgba(255,255,255,0.28)", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", margin: "0 0 8px" }}>
                      {r.client} · {r.tag}
                    </p>
                    <p style={{ fontSize: "13px", fontWeight: 600, color: "rgba(255,255,255,0.55)", margin: 0, lineHeight: 1.55, letterSpacing: "-0.01em" }}>
                      {r.headline}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
        {/* ── RELATED CASE STUDIES GRID ── END ── */}

        <Divider />

        {/* ── BOTTOM CTA ── START ── */}
        <div className="fade-el" style={{ opacity: 0, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "24px" }}>
          <div>
            <p style={{ fontSize: "18px", fontWeight: 700, color: "rgba(255,255,255,0.7)", letterSpacing: "-0.02em", margin: "0 0 6px", fontFamily: "var(--font-dm)" }}>
              Want a case study like this?
            </p>
            <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.28)", margin: 0 }}>
              We'll scope the right format in 30 minutes.
            </p>
          </div>
          <a href="https://cal.com/tanoseihito/30min" target="_blank" rel="noopener noreferrer" className="premiumBtn">
            <div className="rimGlow" />
            <div className="btnInnerCover" />
            <span className="btnText">Book a Clarity Call</span>
            <span className="iconBubble">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </span>
          </a>
        </div>
        {/* ── BOTTOM CTA ── END ── */}

      </div>

      <script dangerouslySetInnerHTML={{ __html: `
        (function(){
          var el = document.getElementById('cursorLightCS');
          if (!el) return;
          window.addEventListener('mousemove', function(e){
            el.style.left = e.clientX + 'px';
            el.style.top  = e.clientY + 'px';
          }, { passive: true });
        })();
      `}} />
    </div>
  );
}