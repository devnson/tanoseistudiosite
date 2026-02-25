"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ─────────────────────────────────────────────────────────────
// TEAM DATA — Small, elite, strategic
// UI RULE: Only Founder shows NAME. Everyone else shows TITLE only.
// Per-card image tweaks supported via: zoom + x/y focus.
// Audio Authority: one clean card with only “+3 more” inside image.
// ─────────────────────────────────────────────────────────────
type ImgTweaks = {
  zoom?: number; // 1.00 = normal
  x?: number; // percent, 50 = center
  y?: number; // percent, 12 = upper-center
};

type Member = {
  name: string;
  role: string;
  desc: string; // keep, but render only if not empty
  initials: string;
  photo: string;
  isLead?: boolean;
  img?: ImgTweaks;

  // big label in image area (ex: “+3 more”)
  cardTag?: string;
};

const groups: { label: string; members: Member[] }[] = [
  {
    label: "Leadership",
    members: [
      {
        name: "Sushan Bastola",
        role: "Founder & Creative Director",
        desc: "Shapes positioning, narrative strategy, and clarity systems for every client.",
        initials: "SB",
        photo: "/headshots/sushan.png",
        isLead: true,
        img: { zoom: 1.08, x: 50, y: 12 },
      },
    ],
  },
  {
    label: "Narrative Strategy",
    members: [
      {
        name: "Story Architecture",
        role: "Story Architecture",
        desc: "Builds conviction arcs that turn complex products into obvious choices.",
        initials: "NL",
        photo: "/headshots/sushan.png",
        img: { zoom: 1.2, x: 50, y: 50 },
      },
      {
        name: "Content Strategist",
        role: "Positioning & Hooks",
        desc: "Develops buyer-focused angles and reusable content frameworks.",
        initials: "CS",
        photo: "/headshots/sunil.png",
        img: { zoom: 1.07, x: 50, y: 12 },
      },
    ],
  },
  {
    label: "Visual Systems",
    members: [
      {
        name: "Design Lead",
        role: "Visual Language",
        desc: "Creates repeatable design systems that make complexity feel premium.",
        initials: "DL",
        photo: "/headshots/sakshyam.png",
        img: { zoom: 1.02, x: 50, y: 12 },
      },
      {
        name: "Senior Designer",
        role: "Frame Systems",
        desc: "Translates strategy into precise, brand-true static designs.",
        initials: "D1",
        photo: "/headshots/dikshya.png",
        img: { zoom: 1.03, x: 40, y: 12 }, // your tweak
      },
    ],
  },
  {
    label: "Motion Systems",
    members: [
      {
        name: "Motion Lead",
        role: "Animation Systems",
        desc: "Builds reusable motion frameworks that scale across launches.",
        initials: "ML",
        photo: "/headshots/avisek.png",
        img: { zoom: 2, x: 50, y: 60 },
      },
      {
        name: "Motion Designer",
        role: "Premium Execution",
        desc: "Brings narrative to life with timing tuned for instant understanding.",
        initials: "MD",
        photo: "/headshots/rohil.png",
        img: { zoom: 1.02, x: 30, y: 40 },
      },
      {
        // ✅ Clean: only “+3 more” inside image, NO text below
        name: ".",
        role: "Audio Authority",
        desc: "",
        initials: "SA",
        photo: "",
        cardTag: "+3 more",
      },
    ],
  },
];

function Card({
  member,
  size = "normal",
}: {
  member: Member;
  size?: "large" | "normal";
}) {
  const isLarge = size === "large";

  const zoom = member.img?.zoom ?? 1.02;
  const x = member.img?.x ?? 50;
  const y = member.img?.y ?? 12;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 0,
        cursor: "default",
      }}
    >
      <div
        style={{
          width: "100%",
          aspectRatio: "3 / 4",
          background: isLarge
            ? "linear-gradient(160deg,#161616,#0b0b0b)"
            : "linear-gradient(160deg,#101010,#070707)",
          borderRadius: "12px",
          overflow: "hidden",
          position: "relative",
          marginBottom: member.cardTag ? "0px" : "14px",
          border: `1px solid ${
            isLarge ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.07)"
          }`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {member.photo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={member.photo}
            alt={member.isLead ? member.name : member.role}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: `${x}% ${y}%`,
              filter: "grayscale(25%) brightness(1.02) contrast(1.05)",
              transform: `scale(${zoom})`,
              transformOrigin: `${x}% ${y}%`,
            }}
          />
        ) : (
          <>
            {/* Dot grid */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                backgroundImage:
                  "radial-gradient(rgba(255,255,255,0.02) 1px,transparent 1px)",
                backgroundSize: "24px 24px",
              }}
            />

            {/* Big “+3 more” label (or initials fallback) */}
            {member.cardTag ? (
              <div
                style={{
                  position: "relative",
                  zIndex: 2,
                  fontFamily: "var(--font-dm)",
                  fontWeight: 400,
                  fontSize: "44px",
                  letterSpacing: "-0.02em",
                  color: "rgba(255,255,255,0.92)",
                  textAlign: "center",
                  transform: "translateY(-6px)",
                  userSelect: "none",
                }}
              >
                {member.cardTag}
              </div>
            ) : (
              <div
                style={{
                  width: isLarge ? "76px" : "56px",
                  height: isLarge ? "76px" : "56px",
                  borderRadius: "50%",
                  background: isLarge
                    ? "rgba(255,255,255,0.08)"
                    : "rgba(255,255,255,0.045)",
                  border: `1px solid ${
                    isLarge ? "rgba(255,255,255,0.18)" : "rgba(255,255,255,0.09)"
                  }`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "var(--font-dm)",
                  fontWeight: 800,
                  fontSize: isLarge ? "20px" : "14px",
                  color: isLarge
                    ? "rgba(255,255,255,0.7)"
                    : "rgba(255,255,255,0.35)",
                  position: "relative",
                  zIndex: 2,
                  textAlign: "center",
                  lineHeight: 1,
                  userSelect: "none",
                }}
              >
                {member.initials}
              </div>
            )}
          </>
        )}

        {/* soft vignette */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.08), rgba(0,0,0,0.38))",
          }}
        />
      </div>

      {/* ✅ If cardTag exists, HIDE EVERYTHING under the image */}
      {!member.cardTag && (
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: "10px",
              marginBottom: "6px",
              flexWrap: "wrap",
            }}
          >
            {/* Only founder shows name */}
            {member.isLead && (
              <span
                style={{
                  fontFamily: "var(--font-dm)",
                  fontWeight: 800,
                  fontSize: isLarge ? "16.5px" : "13.8px",
                  letterSpacing: "-0.02em",
                  color: isLarge
                    ? "rgba(255,255,255,0.9)"
                    : "rgba(255,255,255,0.85)",
                }}
              >
                {member.name}
              </span>
            )}

            {/* Everyone shows role/title */}
            <span
              style={{
                fontSize: "10px",
                color: member.isLead
                  ? "rgba(255,255,255,0.26)"
                  : "rgba(255,255,255,0.52)",
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
              }}
            >
              {member.role}
            </span>
          </div>

          {/* render only if desc exists */}
          {member.desc && (
            <p
              style={{
                fontSize: isLarge ? "13px" : "12px",
                color: "rgba(255,255,255,0.34)",
                lineHeight: 1.7,
                margin: 0,
              }}
            >
              {member.desc}
            </p>
          )}
        </div>
      )}
    </div>
  );
}

function ClarityBtn() {
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
        }}
      >
        <svg
          width="13"
          height="13"
          viewBox="0 0 24 24"
          fill="none"
          stroke="rgba(255,255,255,0.78)"
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

function MiniSignal({ title, lines }: { title: string; lines: string[] }) {
  return (
    <div
      className="fade-el"
      style={{
        opacity: 0,
        border: "1px solid rgba(255,255,255,0.06)",
        borderRadius: "14px",
        padding: "18px 18px",
        background: "rgba(255,255,255,0.02)",
        boxShadow: "0 24px 70px rgba(0,0,0,0.55)",
      }}
    >
      <div
        style={{
          fontSize: "10px",
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.30)",
          fontWeight: 800,
          marginBottom: "12px",
        }}
      >
        {title}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        {lines.map((t, i) => (
          <div
            key={i}
            style={{
              fontSize: "13.5px",
              color: "rgba(255,255,255,0.52)",
              lineHeight: 1.6,
            }}
          >
            {t}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function TeamPage() {
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const els = pageRef.current?.querySelectorAll<HTMLElement>(".fade-el");
    if (!els) return;

    els.forEach((el) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 18 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 90%", once: true },
        }
      );
    });
  }, []);

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
      <div className="cursor-light" id="cursorLightTeam" aria-hidden="true" />

      {/* NAV */}
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
              fontWeight: 800,
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
            { label: "Work", href: "/#work" },
            { label: "Studio", href: "/studio" },
            { label: "Team", href: "/team" },
          ].map(({ label, href }) => {
            const active = label === "Team";
            return (
              <Link
                key={label}
                href={href}
                style={{
                  fontSize: "13px",
                  color: active
                    ? "rgba(255,255,255,0.75)"
                    : "rgba(255,255,255,0.38)",
                  textDecoration: "none",
                  borderBottom: active
                    ? "1px solid rgba(255,255,255,0.25)"
                    : "none",
                  paddingBottom: active ? "1px" : "0",
                  transition: "color 0.2s",
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
              fontWeight: 700,
            }}
          >
            Book a call
          </a>
        </div>
      </nav>

      <div
        ref={pageRef}
        style={{
          padding: "160px 28px 140px",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        {/* HERO */}
        <div
          style={{
            display: "flex",
            gap: "80px",
            alignItems: "center",
            marginBottom: "120px",
          }}
        >
          <div style={{ flex: 1 }}>
            <p
              className="fade-el"
              style={{
                opacity: 0,
                fontSize: "11px",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.28)",
                marginBottom: "20px",
              }}
            >
              The Team
            </p>
            <h1
              className="fade-el"
              style={{
                opacity: 0,
                fontSize: "clamp(42px, 7vw, 82px)",
                lineHeight: 1.0,
                letterSpacing: "-0.04em",
                fontWeight: 800,
              }}
            >
              A small senior team.
              <br />
              Built for complex products.
            </h1>
            <p
              className="fade-el"
              style={{
                opacity: 0,
                fontSize: "16.5px",
                color: "rgba(255,255,255,0.42)",
                maxWidth: "520px",
                marginTop: "28px",
                lineHeight: 1.75,
              }}
            >
              No outsourcing. No departments. No handoffs.
              <br />
              One unified unit that treats your product like our own.
            </p>
          </div>

          <div
            className="fade-el"
            style={{
              opacity: 0,
              flex: 1,
              borderRadius: "16px",
              overflow: "hidden",
              border: "1px solid rgba(255,255,255,0.06)",
              background: "linear-gradient(160deg,#101010,#070707)",
              boxShadow: "0 30px 80px rgba(0,0,0,0.7)",
              minHeight: "320px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "rgba(255,255,255,0.35)",
              fontWeight: 700,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              fontSize: "11px",
            }}
          >
            Unit Visual Placeholder
          </div>
        </div>

        {/* LEADERSHIP */}
        <div style={{ marginBottom: "80px" }}>
          <p
            className="fade-el"
            style={{
              opacity: 0,
              fontSize: "11px",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.22)",
              marginBottom: "32px",
            }}
          >
            Leadership
          </p>
          <div
            className="fade-el"
            style={{ opacity: 0, display: "flex", justifyContent: "flex-start" }}
          >
            <div style={{ width: "280px" }}>
              <Card member={groups[0].members[0]} size="large" />
            </div>
          </div>
        </div>

        {/* OTHER GROUPS */}
        {groups.slice(1).map((group) => (
          <div key={group.label} style={{ marginBottom: "72px" }}>
            <p
              className="fade-el"
              style={{
                opacity: 0,
                fontSize: "11px",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.22)",
                marginBottom: "32px",
              }}
            >
              {group.label}
            </p>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
                gap: "24px",
              }}
            >
              {group.members.map((m, i) => (
                <div
                  key={`${m.role}-${i}`}
                  className="fade-el"
                  style={{ opacity: 0 }}
                >
                  <Card member={m} size="normal" />
                </div>
              ))}
            </div>
          </div>
        ))}

        <div
          style={{
            borderTop: "1px solid rgba(255,255,255,0.06)",
            margin: "80px 0 64px",
          }}
        />

        {/* ENDING */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.2fr 1fr",
            gap: "56px",
            alignItems: "start",
            marginBottom: "90px",
          }}
        >
          <div className="fade-el" style={{ opacity: 0, maxWidth: "680px" }}>
            <p
              style={{
                fontSize: "11px",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.22)",
                marginBottom: "18px",
              }}
            >
              Operating Model
            </p>

            <p
              style={{
                fontSize: "16px",
                color: "rgba(255,255,255,0.46)",
                lineHeight: 1.8,
                margin: 0,
              }}
            >
              Creative direction sits at the center.
              <br />
              Narrative, design, and motion operate as one unit — never separate.
            </p>

            <div
              style={{
                marginTop: "18px",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: "14px",
                overflow: "hidden",
              }}
            >
              {[
                {
                  k: "Input",
                  v: "One clarity call + any existing docs / product context.",
                },
                {
                  k: "Output",
                  v: "Script direction + visual agreement + reduced revision risk.",
                },
                {
                  k: "Cadence",
                  v: "Async first. One clean review when direction is locked.",
                },
                {
                  k: "Control",
                  v: "We own craft decisions. You own accuracy + intent.",
                },
              ].map((row, idx) => (
                <div
                  key={idx}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "140px 1fr",
                    gap: "16px",
                    padding: "14px 16px",
                    background:
                      idx % 2 === 0
                        ? "rgba(255,255,255,0.02)"
                        : "rgba(255,255,255,0.015)",
                    borderTop:
                      idx === 0
                        ? "none"
                        : "1px solid rgba(255,255,255,0.05)",
                  }}
                >
                  <div
                    style={{
                      fontSize: "10px",
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      color: "rgba(255,255,255,0.28)",
                      fontWeight: 800,
                    }}
                  >
                    {row.k}
                  </div>
                  <div
                    style={{
                      fontSize: "13.5px",
                      color: "rgba(255,255,255,0.46)",
                      lineHeight: 1.65,
                    }}
                  >
                    {row.v}
                  </div>
                </div>
              ))}
            </div>

            <div
              style={{
                marginTop: "22px",
                display: "flex",
                gap: "14px",
                flexWrap: "wrap",
              }}
            >
              <Link
                href="/#work"
                style={{
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "10px 14px",
                  borderRadius: "999px",
                  border: "1px solid rgba(255,255,255,0.10)",
                  background: "rgba(255,255,255,0.03)",
                  color: "rgba(255,255,255,0.70)",
                  fontSize: "13px",
                  fontWeight: 700,
                }}
              >
                See Work <span style={{ opacity: 0.6 }}>→</span>
              </Link>

              <a
                href="https://cal.com/tanoseihito/30min"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "10px 14px",
                  borderRadius: "999px",
                  border: "1px solid rgba(255,255,255,0.10)",
                  background: "rgba(255,255,255,0.03)",
                  color: "rgba(255,255,255,0.70)",
                  fontSize: "13px",
                  fontWeight: 700,
                }}
              >
                Talk Through Fit <span style={{ opacity: 0.6 }}>→</span>
              </a>
            </div>
          </div>

          <div style={{ display: "grid", gap: "14px" }}>
            <MiniSignal
              title="What you get"
              lines={[
                "A unified narrative → design → motion system (not separate departments).",
                "Speed without sloppiness: direction is locked early.",
                "Founder-level thinking on every deliverable.",
              ]}
            />
            <MiniSignal
              title="What we avoid"
              lines={[
                "Overproduced, low-clarity “video vendor” output.",
                "Endless revision loops caused by weak direction.",
                "Fragmented handoffs between roles.",
              ]}
            />
            <MiniSignal
              title="Best fit"
              lines={[
                "Complex B2B products with messy messaging.",
                "Teams shipping fast but underleveraging launches.",
                "Founders who want clarity, not decoration.",
              ]}
            />
          </div>
        </div>

        <div
          className="fade-el"
          style={{
            opacity: 0,
            textAlign: "center",
            marginBottom: "140px",
          }}
        >
          <ClarityBtn />
        </div>
      </div>
    </div>
  );
}