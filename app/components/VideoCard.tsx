"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

type Props = {
  youtubeUrl: string; // e.g. https://www.youtube.com/watch?v=VIDEO_ID
  title?: string;
  caption?: string;
};

function getYouTubeId(url: string) {
  try {
    const u = new URL(url);
    // youtu.be/VIDEO_ID
    if (u.hostname.includes("youtu.be")) return u.pathname.replace("/", "");
    // youtube.com/watch?v=VIDEO_ID
    const v = u.searchParams.get("v");
    if (v) return v;
    // youtube.com/embed/VIDEO_ID
    const parts = u.pathname.split("/").filter(Boolean);
    const embedIdx = parts.indexOf("embed");
    if (embedIdx >= 0 && parts[embedIdx + 1]) return parts[embedIdx + 1];
  } catch {}
  return "";
}

export default function VideoCard({
  youtubeUrl,
  title = "Watch a quick walkthrough",
  caption = "A short look at how the pipeline turns complexity into clarity.",
}: Props) {
  const [open, setOpen] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const playRef = useRef<HTMLDivElement>(null);

  const id = getYouTubeId(youtubeUrl);
  const thumb = id ? `https://i.ytimg.com/vi/${id}/maxresdefault.jpg` : "";
  const embed = id ? `https://www.youtube.com/embed/${id}?autoplay=1&rel=0` : "";

  useEffect(() => {
    if (!cardRef.current || !playRef.current) return;

    // initial
    gsap.set(playRef.current, { opacity: 0, scale: 0.96 });

    const onEnter = () => {
      gsap.to(cardRef.current, {
        y: -6,
        duration: 0.28,
        ease: "power3.out",
      });
      gsap.to(playRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.22,
        ease: "power3.out",
      });
    };

    const onLeave = () => {
      gsap.to(cardRef.current, {
        y: 0,
        duration: 0.28,
        ease: "power3.out",
      });
      gsap.to(playRef.current, {
        opacity: 0,
        scale: 0.96,
        duration: 0.22,
        ease: "power3.out",
      });
    };

    const el = cardRef.current;
    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mouseleave", onLeave);

    return () => {
      el.removeEventListener("mouseenter", onEnter);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <>
      <div
        ref={cardRef}
        role="button"
        tabIndex={0}
        onClick={() => setOpen(true)}
        onKeyDown={(e) => e.key === "Enter" && setOpen(true)}
        style={{
          marginTop: 18,
          borderRadius: 18,
          border: "1px solid rgba(255,255,255,0.08)",
          background: "rgba(255,255,255,0.02)",
          overflow: "hidden",
          cursor: "pointer",
          position: "relative",
        }}
      >
        {/* top text */}
        <div style={{ padding: "18px 18px 0" }}>
          <div
            style={{
              fontSize: 12,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.35)",
              fontWeight: 700,
              marginBottom: 10,
            }}
          >
            Video
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              gap: 16,
              marginBottom: 14,
            }}
          >
            <div>
              <div
                style={{
                  fontSize: 18,
                  fontWeight: 700,
                  letterSpacing: "-0.02em",
                  color: "rgba(255,255,255,0.92)",
                  marginBottom: 6,
                }}
              >
                {title}
              </div>
              <div style={{ fontSize: 13.5, color: "rgba(255,255,255,0.55)" }}>
                {caption}
              </div>
            </div>

            <div
              style={{
                fontSize: 12,
                color: "rgba(255,255,255,0.4)",
                border: "1px solid rgba(255,255,255,0.10)",
                padding: "6px 10px",
                borderRadius: 999,
                whiteSpace: "nowrap",
              }}
            >
              Click to play
            </div>
          </div>
        </div>

        {/* thumbnail */}
        <div
          style={{
            position: "relative",
            margin: 18,
            borderRadius: 16,
            overflow: "hidden",
            border: "1px solid rgba(255,255,255,0.07)",
            background: "rgba(0,0,0,0.6)",
            aspectRatio: "16 / 9",
          }}
        >
          {thumb ? (
            <img
              src={thumb}
              alt="Video thumbnail"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
                filter: "saturate(0.95) contrast(1.05)",
                opacity: 0.95,
              }}
              onError={(e) => {
                // fallback if maxres is missing
                (e.currentTarget as HTMLImageElement).src = `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
              }}
            />
          ) : (
            <div
              style={{
                width: "100%",
                height: "100%",
                display: "grid",
                placeItems: "center",
                color: "rgba(255,255,255,0.45)",
                fontSize: 13,
              }}
            >
              Invalid YouTube link
            </div>
          )}

          {/* soft hover glow overlay */}
          <div
            aria-hidden
            style={{
              position: "absolute",
              inset: 0,
              background:
                "radial-gradient(600px 280px at 20% 20%, rgba(255,255,255,0.10), transparent 60%)",
              opacity: 0.7,
              pointerEvents: "none",
            }}
          />

          {/* play button */}
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
                width: 78,
                height: 78,
                borderRadius: 999,
                background: "rgba(255,255,255,0.10)",
                border: "1px solid rgba(255,255,255,0.16)",
                backdropFilter: "blur(10px)",
                WebkitBackdropFilter: "blur(10px)",
                display: "grid",
                placeItems: "center",
                boxShadow: "0 14px 50px rgba(0,0,0,0.55)",
              }}
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden
              >
                <path
                  d="M9 7.5V16.5L17 12L9 7.5Z"
                  fill="rgba(255,255,255,0.92)"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* modal */}
      {open && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.72)",
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
              boxShadow: "0 30px 120px rgba(0,0,0,0.7)",
            }}
          >
            <div style={{ position: "relative", aspectRatio: "16 / 9" }}>
              <iframe
                src={embed}
                title="YouTube video player"
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
                padding: "12px 14px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 12,
              }}
            >
              <div style={{ color: "rgba(255,255,255,0.55)", fontSize: 13 }}>
                Press outside to close
              </div>
              <button
                onClick={() => setOpen(false)}
                style={{
                  borderRadius: 999,
                  padding: "8px 12px",
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
    </>
  );
}