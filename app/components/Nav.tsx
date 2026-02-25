"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const links = [
  { label: "Work",      href: "#work" },
  { label: "Solutions", href: "#solutions" },
  { label: "Process",   href: "#how-we-work" },
  { label: "Team",      href: "#team" },
];

export default function Nav() {
  const [scrolled,    setScrolled]    = useState(false);
  const [open,        setOpen]        = useState(false);
  const [isMobile,    setIsMobile]    = useState(false);
  const [btnHovered,  setBtnHovered]  = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    const onResize = () => setIsMobile(window.innerWidth < 768);
    onResize();
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      padding: "14px 20px",
      display: "flex", alignItems: "center", justifyContent: "center",
    }}>

      {/* ── FLOATING PILL ── */}
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        width: "100%", maxWidth: "1120px",
        height: "56px",
        padding: "0 8px 0 24px",
        borderRadius: "999px",
        background: scrolled ? "rgba(14,14,14,0.97)" : "rgba(10,10,10,0.6)",
        border: scrolled ? "1px solid rgba(255,255,255,0.14)" : "1px solid rgba(255,255,255,0.08)",
        backdropFilter: "blur(32px) saturate(180%)",
        WebkitBackdropFilter: "blur(32px) saturate(180%)",
        boxShadow: scrolled
          ? "0 8px 40px rgba(0,0,0,0.65), 0 1px 0 rgba(255,255,255,0.06) inset"
          : "0 4px 24px rgba(0,0,0,0.35)",
        transition: "background 0.3s, border-color 0.3s, box-shadow 0.3s",
      }}>

        {/* Logo */}
        <Link href="/" style={{
          display: "flex", alignItems: "center", gap: "8px",
          fontFamily: "var(--font-syne)", fontWeight: 700, fontSize: "15px",
          color: "white", textDecoration: "none", flexShrink: 0,
        }}>
          <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "rgba(255,255,255,0.85)", display: "inline-block" }} />
          Tanosei{" "}
          <span style={{ color: "rgba(255,255,255,0.35)", fontWeight: 400 }}>Studio</span>
        </Link>

        {/* Desktop links */}
        {!isMobile && (
          <ul style={{
            display: "flex", alignItems: "center", gap: "32px",
            listStyle: "none", margin: 0, padding: 0,
          }}>
            {links.map(link => (
              <li key={link.label}>
                <a href={link.href} style={{
                  fontSize: "13.5px", color: "rgba(255,255,255,0.45)",
                  textDecoration: "none", transition: "color 0.18s",
                  letterSpacing: "0.01em",
                }}
                onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.88)"}
                onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.45)"}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        )}

        {/* Desktop buttons */}
        {!isMobile && (
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>

            {/* Ghost — See How It Works */}
            <a href="#how-we-work" style={{
              padding: "9px 18px", borderRadius: "999px",
              border: "1px solid transparent", background: "transparent",
              fontSize: "13px", fontWeight: 500, color: "rgba(255,255,255,0.45)",
              textDecoration: "none", transition: "color 0.18s, border-color 0.18s",
              whiteSpace: "nowrap",
            }}
            onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.color = "rgba(255,255,255,0.85)"; el.style.borderColor = "rgba(255,255,255,0.12)"; }}
            onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.color = "rgba(255,255,255,0.45)"; el.style.borderColor = "transparent"; }}>
              See How It Works
            </a>

            {/* Primary CTA — Book a Clarity Call */}
            <a
              href="https://cal.com/tanoseihito/30min"
              target="_blank" rel="noopener noreferrer"
              onMouseEnter={() => setBtnHovered(true)}
              onMouseLeave={() => setBtnHovered(false)}
              style={{
                display: "inline-flex", alignItems: "center",
                padding: "0", borderRadius: "999px",
                border: `1px solid ${btnHovered ? "rgba(255,255,255,0.3)" : "rgba(255,255,255,0.18)"}`,
                background: btnHovered ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.05)",
                fontSize: "13.5px", fontWeight: 600,
                color: btnHovered ? "#fff" : "rgba(255,255,255,0.78)",
                textDecoration: "none",
                transition: "border-color 0.2s, background 0.2s, color 0.2s",
                whiteSpace: "nowrap",
              }}
            >
              <span style={{ padding: "10px 12px 10px 20px" }}>Book a Clarity Call</span>
              <span style={{
                display: "flex", alignItems: "center", justifyContent: "center",
                width: "38px", height: "38px", margin: "4px 4px 4px 0",
                borderRadius: "50%",
                background: btnHovered ? "rgba(255,255,255,0.16)" : "rgba(255,255,255,0.09)",
                border: `1px solid ${btnHovered ? "rgba(255,255,255,0.25)" : "rgba(255,255,255,0.12)"}`,
                flexShrink: 0, transition: "background 0.2s, border-color 0.2s",
              }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
                  style={{ transform: btnHovered ? "rotate(0deg)" : "rotate(-45deg)", transition: "transform 0.25s ease" }}>
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </span>
            </a>

          </div>
        )}

        {/* Mobile hamburger — only on mobile */}
        {isMobile && (
          <button onClick={() => setOpen(!open)} style={{
            display: "flex", flexDirection: "column", gap: "5px",
            padding: "10px", background: "transparent", border: "none", cursor: "pointer",
          }}>
            <span style={{ display: "block", width: "20px", height: "1.5px", background: "rgba(255,255,255,0.75)", transition: "all 0.3s", transform: open ? "rotate(45deg) translateY(6.5px)" : "none" }} />
            <span style={{ display: "block", width: "20px", height: "1.5px", background: "rgba(255,255,255,0.75)", transition: "all 0.3s", opacity: open ? 0 : 1 }} />
            <span style={{ display: "block", width: "20px", height: "1.5px", background: "rgba(255,255,255,0.75)", transition: "all 0.3s", transform: open ? "rotate(-45deg) translateY(-6.5px)" : "none" }} />
          </button>
        )}

      </div>

      {/* Mobile drawer */}
      {isMobile && open && (
        <div style={{
          position: "absolute", top: "78px", left: "16px", right: "16px",
          background: "rgba(10,10,10,0.97)", backdropFilter: "blur(28px)",
          border: "1px solid rgba(255,255,255,0.09)",
          borderRadius: "20px",
          padding: "20px 24px", display: "flex", flexDirection: "column", gap: "16px",
          boxShadow: "0 12px 40px rgba(0,0,0,0.6)",
        }}>
          {links.map(link => (
            <a key={link.label} href={link.href} onClick={() => setOpen(false)}
              style={{ fontSize: "15px", color: "rgba(255,255,255,0.6)", textDecoration: "none", padding: "4px 0" }}>
              {link.label}
            </a>
          ))}
          <a href="https://cal.com/tanoseihito/30min" target="_blank" rel="noopener noreferrer"
            onClick={() => setOpen(false)} style={{
              marginTop: "8px", display: "flex", alignItems: "center", justifyContent: "space-between",
              padding: "12px 16px", borderRadius: "999px",
              background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)",
              color: "rgba(255,255,255,0.85)", fontSize: "14px", fontWeight: 600, textDecoration: "none",
            }}>
            Book a Clarity Call
            <span style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "30px", height: "30px", borderRadius: "50%", background: "rgba(255,255,255,0.09)", border: "1px solid rgba(255,255,255,0.1)" }}>
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ transform: "rotate(-45deg)" }}>
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </span>
          </a>
        </div>
      )}

    </nav>
  );
}