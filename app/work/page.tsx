"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ── WORK DATA ── START ──
const projects = [
  {
    id: 1,
    client: "Ramp",
    title: "Feature Launch Walkthrough",
    tags: ["Fintech", "SaaS"],
    type: "Explainer",
    deliverable: "Explainer → landing + sales enablement",
    thumb: "",
    color: "#1a1410",
    gif: "",
    videoId: "",
    caseUrl: "/case-studies/ramp-case",
    modal: {
      label: "Explainer",
      title: "Ramp — Feature Launch Walkthrough",
      desc: "Feature walkthrough for a fintech platform. Built for landing page placement and sales team reuse.",
      stats: [
        { n: "Explainer", l: "Format" },
        { n: "Landing", l: "Placement" },
        { n: "Sales", l: "Also used" },
      ],
    },
  },
  {
    id: 2,
    client: "Aleph",
    title: "Funding Film",
    tags: ["Series B", "Announcement"],
    type: "Launch Film",
    deliverable: "Launch film → Series B announcement",
    thumb: "",
    color: "#0d1018",
    gif: "https://framerusercontent.com/images/rujxHVABWC22aK7J1Bt87Hkz5k.gif",
    videoId: "7sbP3rOhPec",
    caseUrl: "/case-studies/aleph-case",
    modal: {
      label: "Launch Film",
      title: "Aleph — Funding Announcement Film",
      desc: "Authority-first announcement video delivered on a fast track. Built to land with investors, press, and future hires simultaneously.",
      stats: [
        { n: "7 days", l: "Fast-track" },
        { n: "Hero + cutdowns", l: "Package" },
        { n: "Press + hiring", l: "Used in" },
      ],
    },
  },
  {
    id: 3,
    client: "Sunsama",
    title: "Motion Series",
    tags: ["Productivity", "Social"],
    type: "Motion Series",
    deliverable: "Series → weekly distribution clips",
    thumb: "",
    color: "#0f0f12",
    gif: "https://framerusercontent.com/images/ncaXWYv5fXVfX9wvB6AWJycHjog.gif",
    videoId: "",
    caseUrl: "/case-studies/sunsama-case",
    modal: {
      label: "Motion Series",
      title: "Sunsama — Motion Series",
      desc: "A recurring motion series built for weekly distribution. Each clip standalone, all clips part of a consistent visual system.",
      stats: [
        { n: "Series", l: "Format" },
        { n: "Weekly", l: "Cadence" },
        { n: "Social", l: "Distribution" },
      ],
    },
  },
  {
    id: 4,
    client: "Openmart",
    title: "Brand Video",
    tags: ["B2B", "Lead Gen"],
    type: "Brand Video",
    deliverable: "Brand clarity → landing + outbound",
    thumb: "",
    color: "#130d18",
    gif: "https://framerusercontent.com/images/BmmRR8wJ0tVQ7S2C55bfSfSRNQ.gif",
    videoId: "",
    caseUrl: "/case-studies/openmart-case",
    modal: {
      label: "Brand Video",
      title: "Openmart — Brand Video",
      desc: "Brand clarity film for a B2B lead generation platform. Built to make a complex product feel immediately legible to buyers.",
      stats: [
        { n: "Brand", l: "Format" },
        { n: "Landing", l: "Placement" },
        { n: "Outbound", l: "Also used" },
      ],
    },
  },
  {
    id: 5,
    client: "reAlpha",
    title: "Product Demo",
    tags: ["AI", "Real Estate"],
    type: "Product Demo",
    deliverable: "Demo → investor + outbound",
    thumb: "",
    color: "#0d1410",
    gif: "https://framerusercontent.com/images/MUc9I5El4kfxCqYc27XFGeOFqUo.gif",
    videoId: "",
    caseUrl: "/case-studies/realpha-case",
    modal: {
      label: "Product Demo",
      title: "reAlpha — Product Demo",
      desc: "Investor-grade product demo for an AI real estate platform. Structured for pitch decks and outbound sequences.",
      stats: [
        { n: "Demo", l: "Format" },
        { n: "Investor", l: "Primary use" },
        { n: "Outbound", l: "Also used" },
      ],
    },
  },
  {
    id: 6,
    client: "SecurityPal",
    title: "Platform Overview",
    tags: ["Security", "SaaS"],
    type: "Explainer",
    deliverable: "Platform explainer → sales + website",
    thumb: "",
    color: "#101418",
    gif: "",
    videoId: "azDJfHvwpEY",
    caseUrl: "/case-studies/securitypal-case",
    modal: {
      label: "Case Study",
      title: "SecurityPal — Enterprise Narrative System",
      desc: "A 90-second narrative video that collapsed 20 minutes of sales explanation into a single buyer-clear asset. Built for decks, homepage, and enterprise outreach.",
      stats: [
        { n: "14 days", l: "Delivery" },
        { n: "90s", l: "Runtime" },
        { n: "Enterprise", l: "Pipeline" },
      ],
    },
  },
  {
    id: 7,
    client: "Thera",
    title: "Case Study — Oceans",
    tags: ["Fintech", "HR Tech"],
    type: "Case Study",
    deliverable: "Customer case study → sales cycle",
    thumb: "",
    color: "#0f1210",
    gif: "",
    videoId: "",
    caseUrl: "/case-studies/thera-oceans",
    modal: {
      label: "Case Study",
      title: "Thera — Customer Story (Oceans)",
      desc: "Customer case study video built for direct send in outbound. Turned a written success story into a 90-second sales asset.",
      stats: [
        { n: "90s", l: "Runtime" },
        { n: "Outbound", l: "Distribution" },
        { n: "Sales", l: "Used in" },
      ],
    },
  },
  {
    id: 8,
    client: "Niural AI",
    title: "Product Launch",
    tags: ["AI", "HR Tech"],
    type: "Launch Film",
    deliverable: "Product launch → landing + outbound",
    thumb: "",
    color: "#14100d",
    gif: "",
    videoId: "",
    caseUrl: "/case-studies/niural-case",
    modal: {
      label: "Launch Film",
      title: "Niural AI — Product Launch",
      desc: "60-second explainer built around buyer outcomes, not product features. Made an AI-first HR platform legible to skeptical buyers.",
      stats: [
        { n: "60s", l: "Runtime" },
        { n: "Launch", l: "Deployed in" },
        { n: "Onboarding", l: "Also used" },
      ],
    },
  },
  {
    id: 9,
    client: "Julius",
    title: "Analytics Platform",
    tags: ["AI", "SaaS"],
    type: "Explainer",
    deliverable: "Platform clarity → sales + marketing",
    thumb: "",
    color: "#0d0d18",
    gif: "",
    videoId: "",
    caseUrl: "/case-studies/julius-case",
    modal: {
      label: "Explainer",
      title: "Julius — AI Analytics Explainer",
      desc: "Pure 2D/3D motion system for an AI marketing analytics platform. Abstract data visualization animated to feel alive.",
      stats: [
        { n: "2D/3D", l: "Format" },
        { n: "Modular", l: "System" },
        { n: "All channels", l: "Used in" },
      ],
    },
  },
  {
    id: 10,
    client: "DocUnlock",
    title: "Feature Launch Walkthrough",
    tags: ["AI", "SaaS"],
    type: "Explainer",
    deliverable: "Explainer → landing + sales enablement",
    thumb: "",
    color: "#0d1018",
    gif: "https://framerusercontent.com/images/yNs8rP2D4soCiX7eNIR9FJp3zI.gif",
    videoId: "0WjL6oWzHUg",
    caseUrl: "/case-studies/docunlock-case",
    modal: {
      label: "Case Study",
      title: "DocUnlock — Feature Launch Walkthrough",
      desc: "A clean, buyer-legible walkthrough designed for landing pages and sales reuse. Built around the moment of insight — the instant the feature becomes obvious.",
      stats: [
        { n: "14 days", l: "Delivery" },
        { n: "Hero + cutdowns", l: "Package" },
        { n: "Landing + sales", l: "Used in" },
      ],
    },
  },
  {
    id: 11,
    client: "Thera",
    title: "Case Study — WorkWeek",
    tags: ["Fintech", "HR Tech"],
    type: "Case Study",
    deliverable: "Customer case study → sales cycle",
    thumb: "",
    color: "#0f1210",
    gif: "",
    videoId: "",
    caseUrl: "/case-studies/thera-workweek",
    modal: {
      label: "Case Study",
      title: "Thera — Customer Story (WorkWeek)",
      desc: "Customer case study video built for direct send in outbound. Part of a 3-video series turning Thera's written stories into sales collateral.",
      stats: [
        { n: "90s", l: "Runtime" },
        { n: "Series", l: "Format" },
        { n: "Outbound", l: "Distribution" },
      ],
    },
  },
];
// ── WORK DATA ── END ──

const ALL_TYPES = ["All", ...Array.from(new Set(projects.map((p) => p.type)))];
type Project = typeof projects[0];

function PremiumCTAButton() {
  const [hov, setHov] = useState(false);

  return (
    <a
      href="https://cal.com/tanoseihito/30min"
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "14px",
        padding: "12px 12px 12px 22px",
        borderRadius: "999px",
        border: `1px solid ${
          hov ? "rgba(255,255,255,0.22)" : "rgba(255,255,255,0.12)"
        }`,
        background: hov ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.03)",
        textDecoration: "none",
        transition: "all 0.25s ease",
        boxShadow: hov ? "0 0 28px 6px rgba(255,255,255,0.07)" : "none",
        cursor: "pointer",
        position: "relative",
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-dm)",
          fontSize: "13.5px",
          fontWeight: 700,
          letterSpacing: "-0.01em",
          color: hov ? "rgba(255,255,255,0.92)" : "rgba(255,255,255,0.65)",
          transition: "color 0.25s ease",
          whiteSpace: "nowrap",
        }}
      >
        Book a Clarity Call
      </span>
      <span
        style={{
          width: "34px",
          height: "34px",
          borderRadius: "50%",
          background: hov ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.08)",
          border: "1px solid rgba(255,255,255,0.12)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          transition: "background 0.25s ease",
          color: "rgba(255,255,255,0.78)",
        }}
      >
        <svg
          width="13"
          height="13"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </span>
    </a>
  );
}

export default function WorkPage() {
  const [active, setActive] = useState("All");
  const [hovered, setHovered] = useState<number | null>(null);
  const [modal, setModal] = useState<Project | null>(null);

  const gridRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  const filtered = active === "All" ? projects : projects.filter((p) => p.type === active);

  // Header entrance
  useEffect(() => {
    headerRef.current?.querySelectorAll(".h-el").forEach((el, i) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.7, delay: i * 0.1, ease: "power3.out" }
      );
    });
  }, []);

  // Card entrance on filter change
  useEffect(() => {
    const cards = gridRef.current?.querySelectorAll(".work-card");
    cards?.forEach((el, i) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          delay: (i % 3) * 0.07,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 92%", once: true },
        }
      );
    });
  }, [active]);

  // Modal entrance animation
  useEffect(() => {
    if (modal && modalRef.current) {
      gsap.fromTo(
        modalRef.current,
        { y: 32, opacity: 0, scale: 0.97 },
        { y: 0, opacity: 1, scale: 1, duration: 0.38, ease: "power3.out" }
      );
    }
  }, [modal]);

  // Scroll lock when modal open
  useEffect(() => {
    document.body.style.overflow = modal ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [modal]);

  return (
    <div
      style={{
        background: "#000",
        minHeight: "100vh",
        color: "#f2f2f2",
        fontFamily: "var(--font-dm), system-ui, sans-serif",
      }}
    >
      <div className="noise-overlay" aria-hidden="true" />
      <div className="cursor-light" id="cursorLightWork" aria-hidden="true" />

      {/* ── NAV ── START ── */}
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          padding: "20px 28px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          background: "rgba(0,0,0,0.82)",
          backdropFilter: "blur(12px)",
        }}
      >
        <Link
          href="/"
          style={{
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <span
            style={{
              fontSize: "13px",
              fontWeight: 700,
              color: "rgba(255,255,255,0.55)",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            Tanosei
          </span>
          <span
            style={{
              fontSize: "9px",
              color: "rgba(255,255,255,0.2)",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              marginTop: "1px",
            }}
          >
            Studio
          </span>
        </Link>

        <div style={{ display: "flex", alignItems: "center", gap: "28px" }}>
          {[
            { label: "Work", href: "/work" },
            { label: "Studio", href: "/studio" },
            { label: "Team", href: "/team" },
          ].map(({ label, href }) => {
            const isActive = label === "Work";
            return (
              <Link
                key={label}
                href={href}
                style={{
                  fontSize: "13px",
                  color: isActive ? "rgba(255,255,255,0.75)" : "rgba(255,255,255,0.38)",
                  textDecoration: "none",
                  borderBottom: isActive ? "1px solid rgba(255,255,255,0.25)" : "none",
                  paddingBottom: isActive ? "1px" : "0",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => {
                  if (!isActive) (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.75)";
                }}
                onMouseLeave={(e) => {
                  if (!isActive) (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.38)";
                }}
              >
                {label}
              </Link>
            );
          })}

          <a
            href="https://cal.com/tanoseihito/30min"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontSize: "12.5px",
              color: "#000",
              background: "#f2f2f2",
              padding: "8px 18px",
              borderRadius: "999px",
              textDecoration: "none",
              fontWeight: 600,
              transition: "opacity 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            Book a call
          </a>
        </div>
      </nav>
      {/* ── NAV ── END ── */}

      <div style={{ padding: "140px 28px 140px", maxWidth: "1160px", margin: "0 auto" }}>
        {/* ── HEADER ── START ── */}
        <div ref={headerRef} style={{ marginBottom: "64px" }}>
          <p
            className="h-el"
            style={{
              opacity: 0,
              fontSize: "11px",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.28)",
              fontWeight: 500,
              marginBottom: "20px",
            }}
          >
            Recent Work
          </p>

          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "24px",
              marginBottom: "40px",
            }}
          >
            <h1
              className="h-el"
              style={{
                opacity: 0,
                fontFamily: "var(--font-dm)",
                fontWeight: 800,
                fontSize: "clamp(36px, 6vw, 72px)",
                letterSpacing: "-0.04em",
                lineHeight: 1.0,
                margin: 0,
              }}
            >
              <span style={{ fontWeight: 300 }}>Every frame built to</span>
              <br />
              make buyers confident.
            </h1>

            <p
              className="h-el"
              style={{
                opacity: 0,
                fontSize: "14px",
                color: "rgba(255,255,255,0.28)",
                margin: 0,
                textAlign: "right",
                lineHeight: 1.7,
              }}
            >
              {projects.length} projects
              <br />
              across B2B SaaS
            </p>
          </div>

          {/* Filter tabs */}
          <div className="h-el" style={{ opacity: 0, display: "flex", gap: "8px", flexWrap: "wrap" }}>
            {ALL_TYPES.map((type) => (
              <button
                key={type}
                onClick={() => setActive(type)}
                style={{
                  padding: "7px 16px",
                  borderRadius: "999px",
                  border:
                    active === type
                      ? "1px solid rgba(255,255,255,0.3)"
                      : "1px solid rgba(255,255,255,0.08)",
                  background: active === type ? "rgba(255,255,255,0.08)" : "transparent",
                  color: active === type ? "rgba(255,255,255,0.82)" : "rgba(255,255,255,0.32)",
                  fontSize: "12.5px",
                  fontWeight: active === type ? 600 : 400,
                  fontFamily: "var(--font-dm)",
                  cursor: "pointer",
                  transition: "all 0.18s ease",
                  letterSpacing: "0.01em",
                }}
                onMouseEnter={(e) => {
                  if (active !== type) {
                    (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.18)";
                    (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.55)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (active !== type) {
                    (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.08)";
                    (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.32)";
                  }
                }}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
        {/* ── HEADER ── END ── */}

        {/* ── WORK GRID ── START ── */}
        <div ref={gridRef} style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "2px" }}>
          {filtered.map((p, i) => {
            const isHovered = hovered === p.id;
            const col = i % 3;
            const totalRows = Math.ceil(filtered.length / 3);
            const isLastRow = Math.floor(i / 3) === totalRows - 1;

            let radius = "0";
            if (i === 0) radius = "14px 0 0 0";
            else if (i === 2) radius = "0 14px 0 0";
            else if (isLastRow && col === 0) radius = "0 0 0 14px";
            else if (isLastRow && col === 2) radius = "0 0 14px 0";

            return (
              <div
                key={p.id}
                className="work-card"
                onClick={() => setModal(p)}
                style={{
                  opacity: 0,
                  cursor: "pointer",
                  border: "1px solid rgba(255,255,255,0.07)",
                  borderRadius: radius,
                  overflow: "hidden",
                  borderRight: col < 2 ? "none" : "1px solid rgba(255,255,255,0.07)",
                  borderBottom: isLastRow ? "1px solid rgba(255,255,255,0.07)" : "none",
                  background: isHovered ? "rgba(255,255,255,0.025)" : "rgba(255,255,255,0.01)",
                  transition: "background 0.2s",
                }}
                onMouseEnter={() => setHovered(p.id)}
                onMouseLeave={() => setHovered(null)}
              >
                {/* Thumbnail */}
                <div
                  style={{
                    width: "100%",
                    aspectRatio: "16 / 9",
                    background: p.thumb ? "transparent" : p.color,
                    position: "relative",
                    overflow: "hidden",
                    borderBottom: "1px solid rgba(255,255,255,0.05)",
                  }}
                >
                  {p.gif ? (
                    <img
                      src={p.gif}
                      alt={p.title}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        opacity: isHovered ? 0.85 : 0.6,
                        transition: "opacity 0.3s",
                      }}
                    />
                  ) : p.videoId ? (
                    <img
                      src={`https://img.youtube.com/vi/${p.videoId}/hqdefault.jpg`}
                      alt={p.title}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        opacity: isHovered ? 0.75 : 0.55,
                        transition: "opacity 0.3s",
                      }}
                    />
                  ) : p.thumb ? (
                    <img
                      src={p.thumb}
                      alt={p.title}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        transform: isHovered ? "scale(1.03)" : "scale(1)",
                        transition: "transform 0.5s ease",
                      }}
                    />
                  ) : (
                    <>
                      <div
                        style={{
                          position: "absolute",
                          inset: 0,
                          backgroundImage: "radial-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)",
                          backgroundSize: "28px 28px",
                        }}
                      />
                      <div
                        style={{
                          position: "absolute",
                          inset: 0,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <span
                          style={{
                            fontFamily: "var(--font-dm)",
                            fontWeight: 800,
                            fontSize: "clamp(20px, 3vw, 36px)",
                            color: "rgba(255,255,255,0.06)",
                            letterSpacing: "-0.04em",
                          }}
                        >
                          {p.client}
                        </span>
                      </div>
                    </>
                  )}

                  {/* Play circle on hover */}
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      opacity: isHovered ? 1 : 0,
                      transition: "opacity 0.22s",
                    }}
                  >
                    <div
                      style={{
                        width: "44px",
                        height: "44px",
                        borderRadius: "50%",
                        background: "rgba(0,0,0,0.5)",
                        backdropFilter: "blur(6px)",
                        border: "1px solid rgba(255,255,255,0.2)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <svg width="13" height="15" viewBox="0 0 14 16" fill="none">
                        <path d="M0 0L14 8 0 16z" fill="rgba(255,255,255,0.85)" />
                      </svg>
                    </div>
                  </div>

                  {/* Tags overlay */}
                  <div style={{ position: "absolute", top: "14px", left: "14px", display: "flex", gap: "6px", flexWrap: "wrap" }}>
                    {p.tags.map((tag) => (
                      <span
                        key={tag}
                        style={{
                          fontSize: "9.5px",
                          fontWeight: 600,
                          letterSpacing: "0.1em",
                          textTransform: "uppercase",
                          color: "rgba(255,255,255,0.5)",
                          background: "rgba(0,0,0,0.5)",
                          backdropFilter: "blur(8px)",
                          padding: "3px 8px",
                          borderRadius: "4px",
                          border: "1px solid rgba(255,255,255,0.08)",
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card info */}
                <div style={{ padding: "20px 22px 24px" }}>
                  <span style={{ fontSize: "10px", color: "rgba(255,255,255,0.22)", fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase" }}>
                    {p.type}
                  </span>
                  <h3
                    style={{
                      fontFamily: "var(--font-dm)",
                      fontWeight: 700,
                      fontSize: "15px",
                      letterSpacing: "-0.02em",
                      margin: "6px 0 4px",
                      color: isHovered ? "rgba(255,255,255,0.82)" : "rgba(255,255,255,0.7)",
                      transition: "color 0.2s",
                    }}
                  >
                    {p.client} — {p.title}
                  </h3>
                  <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.28)", margin: 0, lineHeight: 1.55 }}>
                    {p.deliverable}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
        {/* ── WORK GRID ── END ── */}

        {/* ── BOTTOM CTA ── START ── */}
        <div
          style={{
            marginTop: "80px",
            paddingTop: "48px",
            borderTop: "1px solid rgba(255,255,255,0.06)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "24px",
          }}
        >
          <div>
            <p
              style={{
                fontSize: "18px",
                fontWeight: 700,
                color: "rgba(255,255,255,0.7)",
                letterSpacing: "-0.02em",
                margin: "0 0 6px",
                fontFamily: "var(--font-dm)",
              }}
            >
              Seen enough?
            </p>
            <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.28)", margin: 0 }}>
              Let's talk about your next launch.
            </p>
          </div>

          {/* ✅ FIXED CTA: no rimGlow / no premiumBtn classes → no wedge */}
          <PremiumCTAButton />
        </div>
        {/* ── BOTTOM CTA ── END ── */}
      </div>

      {/* ── MODAL ── START ── */}
      {modal && (
        <div
          onClick={() => setModal(null)}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            background: "rgba(0,0,0,0.85)",
            backdropFilter: "blur(16px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "24px",
          }}
        >
          <div
            ref={modalRef}
            onClick={(e) => e.stopPropagation()}
            style={{
              width: "100%",
              maxWidth: "620px",
              background: "#111",
              borderRadius: "20px",
              border: "1px solid rgba(255,255,255,0.1)",
              overflow: "hidden",
              opacity: 0,
            }}
          >
            {/* ── VIDEO ── */}
            <div style={{ aspectRatio: "16/9", position: "relative", background: "#000" }}>
              {modal.videoId ? (
                <iframe
                  src={`https://www.youtube.com/embed/${modal.videoId}?autoplay=0&modestbranding=1&rel=0`}
                  style={{ width: "100%", height: "100%", border: "none", display: "block" }}
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "14px",
                    background: "linear-gradient(135deg, #0d0d0d, #111)",
                  }}
                >
                  <div
                    style={{
                      width: "52px",
                      height: "52px",
                      borderRadius: "50%",
                      border: "1px solid rgba(255,255,255,0.12)",
                      background: "rgba(255,255,255,0.04)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <svg width="14" height="16" viewBox="0 0 14 16" fill="rgba(255,255,255,0.3)">
                      <path d="M0 0L14 8 0 16z" />
                    </svg>
                  </div>
                  <p
                    style={{
                      fontSize: "11px",
                      color: "rgba(255,255,255,0.2)",
                      margin: 0,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                    }}
                  >
                    Video coming soon
                  </p>
                </div>
              )}
            </div>

            {/* ── BODY ── */}
            <div style={{ padding: "28px 28px 24px" }}>
              <p
                style={{
                  fontSize: "11px",
                  color: "rgba(255,255,255,0.3)",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  fontWeight: 600,
                  margin: "0 0 8px",
                }}
              >
                {modal.modal.label}
              </p>
              <h3
                style={{
                  fontFamily: "var(--font-dm)",
                  fontWeight: 700,
                  fontSize: "clamp(17px, 2.5vw, 21px)",
                  letterSpacing: "-0.025em",
                  lineHeight: 1.2,
                  margin: "0 0 12px",
                  color: "#fff",
                }}
              >
                {modal.modal.title}
              </h3>
              <p style={{ fontSize: "13.5px", color: "rgba(255,255,255,0.5)", lineHeight: 1.7, margin: "0 0 24px" }}>
                {modal.modal.desc}
              </p>

              {/* Stats */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  borderTop: "1px solid rgba(255,255,255,0.07)",
                  borderLeft: "1px solid rgba(255,255,255,0.07)",
                  marginBottom: "24px",
                }}
              >
                {modal.modal.stats.map((s) => (
                  <div
                    key={s.l}
                    style={{
                      padding: "14px 16px",
                      borderRight: "1px solid rgba(255,255,255,0.07)",
                      borderBottom: "1px solid rgba(255,255,255,0.07)",
                      textAlign: "center",
                    }}
                  >
                    <p
                      style={{
                        fontFamily: "var(--font-dm)",
                        fontWeight: 700,
                        fontSize: "15px",
                        letterSpacing: "-0.02em",
                        margin: "0 0 3px",
                        color: "rgba(255,255,255,0.85)",
                      }}
                    >
                      {s.n}
                    </p>
                    <p
                      style={{
                        fontSize: "10px",
                        color: "rgba(255,255,255,0.28)",
                        textTransform: "uppercase",
                        letterSpacing: "0.08em",
                        margin: 0,
                        fontWeight: 600,
                      }}
                    >
                      {s.l}
                    </p>
                  </div>
                ))}
              </div>

              {/* Footer buttons */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px" }}>
                <Link
                  href={modal.caseUrl}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    padding: "10px 22px",
                    borderRadius: "8px",
                    background: "#fff",
                    color: "#000",
                    fontSize: "13px",
                    fontWeight: 700,
                    textDecoration: "none",
                    fontFamily: "var(--font-dm)",
                    transition: "opacity 0.2s",
                  }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.opacity = "0.88")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.opacity = "1")}
                >
                  View full case study →
                </Link>

                <button
                  onClick={() => setModal(null)}
                  style={{
                    background: "transparent",
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: "rgba(255,255,255,0.4)",
                    borderRadius: "8px",
                    padding: "10px 20px",
                    fontSize: "13px",
                    cursor: "pointer",
                    fontFamily: "var(--font-dm)",
                    transition: "border-color 0.2s, color 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.25)";
                    (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.7)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.1)";
                    (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.4)";
                  }}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* ── MODAL ── END ── */}

      <script
        dangerouslySetInnerHTML={{
          __html: `
        (function(){
          var el = document.getElementById('cursorLightWork');
          if(!el) return;
          window.addEventListener('mousemove', function(e){
            el.style.left = e.clientX + 'px';
            el.style.top = e.clientY + 'px';
          }, { passive: true });
        })();
      `,
        }}
      />
    </div>
  );
}