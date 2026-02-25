"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type CaseStudy = {
  client: string;
  tag: string;
  title: string;
  caption: string;
  youtubeUrl: string;
  accent: string;
};

function getYouTubeId(url: string) {
  try {
    const u = new URL(url);
    if (u.hostname.includes("youtu.be")) return u.pathname.replace("/", "");
    const v = u.searchParams.get("v");
    if (v) return v;
    const parts = u.pathname.split("/").filter(Boolean);
    const embedIdx = parts.indexOf("embed");
    if (embedIdx >= 0 && parts[embedIdx + 1]) return parts[embedIdx + 1];
  } catch {}
  return "";
}

// ── REPLACE YOUTUBE URLS WITH YOUR ACTUAL LINKS ── START ──
const cases: CaseStudy[] = [
  {
    client: "SecurityPal",
    tag: "Brand Video",
    title: "Positioning a $50M security platform for enterprise buyers",
    caption: "Cinematic brand narrative that shortened enterprise sales cycles.",
    youtubeUrl: "https://www.youtube.com/watch?v=VIDEO_ID_1",
    accent: "#4f8ef7",
  },
  {
    client: "Thera",
    tag: "Case Study Video",
    title: "Making global payroll feel effortless on screen",
    caption: "Customer stories turned into high-converting sales collateral.",
    youtubeUrl: "https://www.youtube.com/watch?v=VIDEO_ID_2",
    accent: "#4faf6f",
  },
  {
    client: "Niural AI",
    tag: "Explainer Series",
    title: "Explaining AI-native HR to a skeptical market",
    caption: "3-part series that made technical AI features intuitive for buyers.",
    youtubeUrl: "https://www.youtube.com/watch?v=VIDEO_ID_3",
    accent: "#f7c44f",
  },
  {
    client: "Julius",
    tag: "Motion Design",
    title: "Pure motion system for an AI analytics platform",
    caption: "Reusable 2D/3D motion library that scaled across all marketing.",
    youtubeUrl: "https://www.youtube.com/watch?v=VIDEO_ID_4",
    accent: "#b44ff7",
  },
];
// ── REPLACE YOUTUBE URLS WITH YOUR ACTUAL LINKS ── END ──

function CaseCard({
  item,
  onOpen,
}: {
  item: CaseStudy;
  onOpen: (embedUrl: string) => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const playRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);

  const id = getYouTubeId(item.youtubeUrl);
  const thumb = id ? `https://i.ytimg.com/vi/${id}/hqdefault.jpg` : "";
  const embed = id ? `https://www.youtube.com/embed/${id}?autoplay=1&rel=0` : "";

  useEffect(() => {
    if (!playRef.current) return;
    gsap.set(playRef.current, { opacity: 0, scale: 0.9 });

    const onEnter = () => {
      gsap.to(playRef.current, { opacity: 1, scale: 1, duration: 0.22, ease: "power3.out" });
      gsap.to(thumbRef.current, { scale: 1.03, duration: 0.5, ease: "power3.out" });
    };
    const onLeave = () => {
      gsap.to(playRef.current, { opacity: 0, scale: 0.9, duration: 0.22, ease: "power3.out" });
      gsap.to(thumbRef.current, { scale: 1, duration: 0.5, ease: "power3.out" });
    };

    const el = cardRef.current;
    el?.addEventListener("mouseenter", onEnter);
    el?.addEventListener("mouseleave", onLeave);
    return () => {
      el?.removeEventListener("mouseenter", onEnter);
      el?.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div
      ref={cardRef}
      role="button"
      tabIndex={0}
      onClick={() => embed && onOpen(embed)}
      onKeyDown={(e) => e.key === "Enter" && embed && onOpen(embed)}
      style={{
        borderRadius: 18,
        border: "1px solid rgba(255,255,255,0.07)",
        background: "rgba(255,255,255,0.02)",
        overflow: "hidden",
        cursor: "pointer",
        position: "relative",
        transition: "border-color 0.3s, box-shadow 0.3s",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.borderColor = item.accent + "44";
        (e.currentTarget as HTMLDivElement).style.boxShadow = `0 20px 60px rgba(0,0,0,0.4)`;
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.07)";
        (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
      }}
    >
      {/* ── THUMBNAIL ── START ── */}
      <div
        style={{
          position: "relative",
          aspectRatio: "16 / 9",
          overflow: "hidden",
          background: "rgba(0,0,0,0.6)",
        }}
      >
        <div ref={thumbRef} style={{ width: "100%", height: "100%" }}>
          {thumb ? (
            <img
              src={thumb}
              alt={item.title}
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", opacity: 0.9 }}
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = `https://i.ytimg.com/vi/${id}/mqdefault.jpg`;
              }}
            />
          ) : (
            <div
              style={{
                width: "100%",
                height: "100%",
                display: "grid",
                placeItems: "center",
                color: "rgba(255,255,255,0.2)",
                fontSize: 12,
              }}
            >
              No thumbnail
            </div>
          )}
        </div>

        {/* Accent glow overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `radial-gradient(400px 200px at 10% 10%, ${item.accent}18, transparent 60%)`,
            pointerEvents: "none",
          }}
        />

        {/* Tag pill on thumbnail */}
        <div
          style={{
            position: "absolute",
            top: 14,
            left: 14,
            fontSize: 10.5,
            fontWeight: 600,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: item.accent,
            background: "rgba(0,0,0,0.6)",
            backdropFilter: "blur(8px)",
            padding: "5px 10px",
            borderRadius: 999,
            border: `1px solid ${item.accent}33`,
          }}
        >
          {item.tag}
        </div>

        {/* Client name top right */}
        <div
          style={{
            position: "absolute",
            top: 14,
            right: 14,
            fontSize: 11,
            fontWeight: 600,
            color: "rgba(255,255,255,0.5)",
            background: "rgba(0,0,0,0.55)",
            backdropFilter: "blur(8px)",
            padding: "5px 10px",
            borderRadius: 999,
            border: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          {item.client}
        </div>

        {/* Play button */}
        <div
          ref={playRef}
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            display: "grid",
            placeItems: "center",
            pointerEvents: "none",
          }}
        >
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: 999,
              background: "rgba(255,255,255,0.12)",
              border: "1px solid rgba(255,255,255,0.2)",
              backdropFilter: "blur(12px)",
              display: "grid",
              placeItems: "center",
              boxShadow: "0 16px 60px rgba(0,0,0,0.6)",
            }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path d="M9 7.5V16.5L17 12L9 7.5Z" fill="rgba(255,255,255,0.95)" />
            </svg>
          </div>
        </div>
      </div>
      {/* ── THUMBNAIL ── END ── */}

      {/* ── CARD TEXT ── START ── */}
      <div style={{ padding: "24px" }}>
        <h3
          style={{
            fontFamily: "var(--font-dm)",
            fontWeight: 700,
            fontSize: "17px",
            lineHeight: 1.35,
            letterSpacing: "-0.02em",
            marginBottom: "10px",
            color: "rgba(255,255,255,0.9)",
          }}
        >
          {item.title}
        </h3>
        <p
          style={{
            fontSize: "13.5px",
            color: "rgba(255,255,255,0.4)",
            lineHeight: 1.65,
            margin: 0,
          }}
        >
          {item.caption}
        </p>

        {/* Watch link */}
        <div
          style={{
            marginTop: "18px",
            display: "flex",
            alignItems: "center",
            gap: "6px",
            fontSize: "12px",
            color: item.accent,
            fontWeight: 600,
            opacity: 0.8,
          }}
        >
          Watch case study
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </div>
      </div>
      {/* ── CARD TEXT ── END ── */}
    </div>
  );
}

export default function CaseStudyCards() {
  const [openEmbed, setOpenEmbed] = useState<string | null>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.fromTo(
      headerRef.current,
      { opacity: 0, y: 24 },
      {
        opacity: 1, y: 0, duration: 0.7, ease: "power3.out",
        scrollTrigger: { trigger: headerRef.current, start: "top 85%" },
      }
    );

    const cards = gridRef.current?.children;
    if (!cards) return;
    Array.from(cards).forEach((card, i) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.7, delay: i * 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: gridRef.current, start: "top 85%" },
        }
      );
    });
  }, []);

  return (
    <>
      <section
        style={{
          padding: "0 24px 120px",
          borderTop: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div style={{ maxWidth: 1160, margin: "0 auto" }}>

          {/* ── SECTION HEADER ── START ── */}
          <div ref={headerRef} style={{ padding: "80px 0 48px", opacity: 0 }}>
            <p
              style={{
                fontSize: 11,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.3)",
                marginBottom: 14,
                fontWeight: 600,
              }}
            >
              Case Studies
            </p>
            <h2
              style={{
                fontFamily: "var(--font-dm)",
                fontWeight: 800,
                fontSize: "clamp(32px, 5vw, 56px)",
                letterSpacing: "-0.03em",
                lineHeight: 1.05,
                margin: 0,
              }}
            >
              <span style={{ fontWeight: 300 }}>Work that</span>{" "}
              moves pipeline.
            </h2>
          </div>
          {/* ── SECTION HEADER ── END ── */}

          {/* ── CASE STUDY GRID 2×2 ── START ── */}
          <div
            ref={gridRef}
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: 20,
            }}
          >
            {cases.map((c) => (
              <CaseCard
                key={c.client}
                item={c}
                onOpen={(embed) => setOpenEmbed(embed)}
              />
            ))}
          </div>
          {/* ── CASE STUDY GRID 2×2 ── END ── */}

        </div>
      </section>

      {/* ── VIDEO MODAL ── START ── */}
      {openEmbed && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setOpenEmbed(null)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.8)",
            display: "grid",
            placeItems: "center",
            padding: 16,
            zIndex: 9999,
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: "min(1000px, 96vw)",
              borderRadius: 18,
              overflow: "hidden",
              border: "1px solid rgba(255,255,255,0.10)",
              background: "#000",
              boxShadow: "0 30px 120px rgba(0,0,0,0.8)",
            }}
          >
            <div style={{ position: "relative", aspectRatio: "16 / 9" }}>
              <iframe
                src={openEmbed}
                title="Case study video"
                allow="autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  border: 0,
                }}
              />
            </div>
            <div
              style={{
                padding: "12px 16px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span style={{ color: "rgba(255,255,255,0.35)", fontSize: 12 }}>
                Click outside to close
              </span>
              <button
                onClick={() => setOpenEmbed(null)}
                style={{
                  borderRadius: 999,
                  padding: "7px 14px",
                  border: "1px solid rgba(255,255,255,0.12)",
                  background: "rgba(255,255,255,0.04)",
                  color: "rgba(255,255,255,0.85)",
                  fontSize: 13,
                  cursor: "pointer",
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      {/* ── VIDEO MODAL ── END ── */}
    </>
  );
}