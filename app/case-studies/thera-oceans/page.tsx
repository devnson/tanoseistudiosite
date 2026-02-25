"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ── CASE STUDY DATA ── START ──
// Duplicate this file as app/case-studies/[slug]/page.tsx
// Replace all fields below for each case study
const cs = {
  client:      "Thera",
  subject:     "Oceans",
  industry:    "Fintech",
  type:        "Case Study",
  year:        "2024",
  headline:    "How Oceans uses Thera to pay a global team without the ops overhead.",
  subhead:     "A customer case study built for sales cycles and website trust.",
  // ── SITUATION ──
  situation:   "Oceans runs a fully distributed team across multiple countries. As they scaled, managing contractor payments across jurisdictions became a recurring distraction — finance overhead that pulled attention away from growth.",
  // ── CHALLENGE ──
  challenge:   "The challenge wasn't explaining what Thera does. The challenge was making a finance operations product feel immediate and personal — not abstract. Buyers needed to see themselves in the story before they'd believe the outcome.",
  // ── WHAT WE BUILT ──
  deliverables: [
    "90-second case study video (primary)",
    "30-second cut for outbound and LinkedIn",
    "Static quote card assets for sales decks",
  ],
  // ── VIDEO EMBED — main case study video ──
  // Paste Vimeo embed URL: https://player.vimeo.com/video/YOUR_ID
  // Or YouTube: https://www.youtube.com/embed/YOUR_ID
  videoUrl:    "", // e.g. "https://player.vimeo.com/video/123456789"
  videoCaption: "Oceans — Thera Customer Story · 01:32",
  // ── OUTCOME ──
  outcomes: [
    { label: "Used in",         value: "Active sales cycle" },
    { label: "Distribution",    value: "Website + outbound" },
    { label: "Cut for",         value: "LinkedIn + email" },
    { label: "Format",          value: "90s + 30s versions" },
  ],
  // ── TESTIMONIAL VIDEO — from the client contact ──
  testimonialVideoUrl: "", // e.g. "https://player.vimeo.com/video/987654321"
  testimonialPerson:   "Head of Finance, Oceans",
  testimonialQuote:    "Working with Tanosei felt different from other video vendors. They understood our product before asking for a brief. The final video explained our situation better than we could ourselves.",
  // ── NEXT CASE STUDY ──
  next: {
    slug:    "thera-coldiq",
    client:  "Thera",
    subject: "ColdIQ",
    headline: "How ColdIQ scaled international contractor payments without finance complexity.",
  },
};
// ── CASE STUDY DATA ── END ──

// ── VIDEO PLACEHOLDER ── START ──
function VideoBlock({
  url,
  caption,
  label,
  aspectRatio = "16 / 9",
}: {
  url: string;
  caption?: string;
  label?: string;
  aspectRatio?: string;
}) {
  return (
    <div>
      {label && (
        <p style={{ fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)", fontWeight: 500, marginBottom: "14px" }}>
          {label}
        </p>
      )}
      <div style={{
        width: "100%",
        aspectRatio,
        borderRadius: "12px",
        overflow: "hidden",
        border: "1px solid rgba(255,255,255,0.08)",
        background: "#0a0a0a",
        position: "relative",
      }}>
        {url ? (
          <iframe
            src={url}
            style={{ width: "100%", height: "100%", border: "none" }}
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
          />
        ) : (
          // ── PLACEHOLDER when no URL yet ──
          <div style={{
            position: "absolute", inset: 0,
            display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "16px",
            backgroundImage: "radial-gradient(rgba(255,255,255,0.02) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}>
            <div style={{
              width: "56px", height: "56px", borderRadius: "50%",
              border: "1px solid rgba(255,255,255,0.12)",
              background: "rgba(255,255,255,0.04)",
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
// ── VIDEO PLACEHOLDER ── END ──

export default function CaseStudyPage() {
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Hero fires immediately
    pageRef.current?.querySelectorAll(".hero-el").forEach((el, i) => {
      gsap.fromTo(el, { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.7, delay: i * 0.1, ease: "power3.out" });
    });
    // Everything else on scroll
    pageRef.current?.querySelectorAll(".fade-el").forEach((el) => {
      gsap.fromTo(el, { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 90%", once: true } });
    });
  }, []);

  const Divider = () => (
    <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", margin: "72px 0 64px" }} />
  );

  return (
    <div style={{ background: "#000", minHeight: "100vh", color: "#f2f2f2", fontFamily: "var(--font-dm), system-ui, sans-serif" }}>
      <div className="noise-overlay" aria-hidden="true" />
      <div className="cursor-light" id="cursorLightCase" aria-hidden="true" />

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
            <Link key={label} href={href} style={{ fontSize: "13px", color: "rgba(255,255,255,0.38)", textDecoration: "none", transition: "color 0.2s" }}
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

      <div ref={pageRef} style={{ padding: "140px 28px 140px", maxWidth: "860px", margin: "0 auto" }}>

        {/* ── BREADCRUMB ── START ── */}
        <div className="hero-el" style={{ opacity: 0, display: "flex", alignItems: "center", gap: "8px", marginBottom: "32px" }}>
          <Link href="/case-studies" style={{ fontSize: "12px", color: "rgba(255,255,255,0.25)", textDecoration: "none", transition: "color 0.2s" }}
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
              <span key={tag} style={{ fontSize: "10px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", padding: "3px 10px", borderRadius: "4px" }}>
                {tag}
              </span>
            ))}
          </div>
          <h1 className="hero-el" style={{ opacity: 0, fontFamily: "var(--font-dm)", fontWeight: 800, fontSize: "clamp(28px, 5vw, 56px)", letterSpacing: "-0.04em", lineHeight: 1.05, margin: "0 0 20px" }}>
            {cs.headline}
          </h1>
          <p className="hero-el" style={{ opacity: 0, fontSize: "16px", color: "rgba(255,255,255,0.35)", lineHeight: 1.75, margin: 0 }}>
            {cs.subhead}
          </p>
        </div>
        {/* ── HERO ── END ── */}

        <Divider />

        {/* ── MAIN VIDEO ── START ── */}
        <div className="fade-el" style={{ opacity: 0 }}>
          <VideoBlock
            url={cs.videoUrl}
            caption={cs.videoCaption}
            label="The Film"
          />
        </div>
        {/* ── MAIN VIDEO ── END ── */}

        <Divider />

        {/* ── SITUATION ── START ── */}
        <div style={{ display: "grid", gridTemplateColumns: "160px 1fr", gap: "40px", alignItems: "start" }}>
          <p className="fade-el" style={{ opacity: 0, fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.22)", fontWeight: 500, paddingTop: "4px" }}>
            The Situation
          </p>
          <p className="fade-el" style={{ opacity: 0, fontSize: "16px", color: "rgba(255,255,255,0.52)", lineHeight: 1.85, margin: 0 }}>
            {cs.situation}
          </p>
        </div>
        {/* ── SITUATION ── END ── */}

        <Divider />

        {/* ── CHALLENGE ── START ── */}
        <div style={{ display: "grid", gridTemplateColumns: "160px 1fr", gap: "40px", alignItems: "start" }}>
          <p className="fade-el" style={{ opacity: 0, fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.22)", fontWeight: 500, paddingTop: "4px" }}>
            The Challenge
          </p>
          <p className="fade-el" style={{ opacity: 0, fontSize: "16px", color: "rgba(255,255,255,0.52)", lineHeight: 1.85, margin: 0 }}>
            {cs.challenge}
          </p>
        </div>
        {/* ── CHALLENGE ── END ── */}

        <Divider />

        {/* ── WHAT WE BUILT ── START ── */}
        <div style={{ display: "grid", gridTemplateColumns: "160px 1fr", gap: "40px", alignItems: "start" }}>
          <p className="fade-el" style={{ opacity: 0, fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.22)", fontWeight: 500, paddingTop: "4px" }}>
            What We Built
          </p>
          <div className="fade-el" style={{ opacity: 0, display: "flex", flexDirection: "column", gap: "0" }}>
            {cs.deliverables.map((d, i) => (
              <div key={i} style={{
                display: "flex", alignItems: "center", gap: "12px",
                padding: "14px 0",
                borderBottom: i < cs.deliverables.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none",
              }}>
                <div style={{ width: "5px", height: "5px", borderRadius: "50%", background: "rgba(255,255,255,0.22)", flexShrink: 0 }} />
                <span style={{ fontSize: "14.5px", color: "rgba(255,255,255,0.55)", lineHeight: 1.6 }}>{d}</span>
              </div>
            ))}
          </div>
        </div>
        {/* ── WHAT WE BUILT ── END ── */}

        <Divider />

        {/* ── OUTCOME STATS ── START ── */}
        <div className="fade-el" style={{ opacity: 0 }}>
          <p style={{ fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.22)", fontWeight: 500, marginBottom: "28px" }}>
            The Outcome
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "2px" }}>
            {cs.outcomes.map((o, i) => (
              <div key={o.label} style={{
                padding: "24px 20px",
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: i === 0 ? "10px 0 0 10px" : i === cs.outcomes.length - 1 ? "0 10px 10px 0" : "0",
                borderRight: i < cs.outcomes.length - 1 ? "none" : "1px solid rgba(255,255,255,0.07)",
                background: "rgba(255,255,255,0.01)",
              }}>
                <p style={{ fontSize: "10px", color: "rgba(255,255,255,0.22)", fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase", margin: "0 0 8px" }}>{o.label}</p>
                <p style={{ fontSize: "14px", fontWeight: 600, color: "rgba(255,255,255,0.65)", margin: 0, lineHeight: 1.4, letterSpacing: "-0.01em" }}>{o.value}</p>
              </div>
            ))}
          </div>
        </div>
        {/* ── OUTCOME STATS ── END ── */}

        <Divider />

        {/* ── TESTIMONIAL VIDEO ── START ── */}
        <div className="fade-el" style={{ opacity: 0 }}>
          <VideoBlock
            url={cs.testimonialVideoUrl}
            label="Client Testimonial"
            aspectRatio="16 / 7"
          />
          {/* Quote overlay when no video yet */}
          {!cs.testimonialVideoUrl && cs.testimonialQuote && (
            <div style={{
              marginTop: "24px",
              padding: "28px 32px",
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: "12px",
              background: "rgba(255,255,255,0.015)",
            }}>
              <p style={{ fontSize: "16px", color: "rgba(255,255,255,0.55)", lineHeight: 1.8, margin: "0 0 16px", fontStyle: "italic" }}>
                "{cs.testimonialQuote}"
              </p>
              <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.28)", margin: 0, fontWeight: 500, letterSpacing: "0.04em" }}>
                — {cs.testimonialPerson}
              </p>
            </div>
          )}
          {/* Person attribution when video exists */}
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
          <p style={{ fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.22)", fontWeight: 500, marginBottom: "20px" }}>
            Next Case Study
          </p>
          <Link href={`/case-studies/${cs.next.slug}`} style={{ textDecoration: "none", color: "inherit", display: "block" }}>
            <div style={{
              padding: "28px 32px",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "12px",
              background: "rgba(255,255,255,0.01)",
              display: "flex", alignItems: "center", justifyContent: "space-between", gap: "24px",
              transition: "background 0.2s, border-color 0.2s",
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.background = "rgba(255,255,255,0.03)"; (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.14)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.background = "rgba(255,255,255,0.01)"; (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.08)"; }}>
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
          <div style={{ position: "relative", display: "inline-block" }}>
            <div className="rimGlow" />
            <a href="https://cal.com/tanoseihito/30min" target="_blank" rel="noopener noreferrer" className="premiumBtn">
              <span className="btnText">Book a Clarity Call</span>
              <span className="iconBubble">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
              </span>
            </a>
          </div>
        </div>
        {/* ── BOTTOM CTA ── END ── */}

      </div>

      <script dangerouslySetInnerHTML={{ __html: `
        (function(){ var el=document.getElementById('cursorLightCase'); if(!el)return;
        window.addEventListener('mousemove',function(e){ el.style.left=e.clientX+'px'; el.style.top=e.clientY+'px'; },{passive:true}); })();
      `}} />
    </div>
  );
}