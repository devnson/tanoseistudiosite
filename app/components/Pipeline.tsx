"use client";

import { useEffect, useMemo, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import VideoCard from "./VideoCard";
import VideoRail from "./VideoRail";

gsap.registerPlugin(ScrollTrigger);

type Step = {
  key: string;
  title: string;
  desc: string;
};

export default function Pipeline() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const steps: Step[] = useMemo(
    () => [
      { key: "Input", title: "Input", desc: "Brief + context" },
      { key: "Script", title: "Script", desc: "Message clarity" },
      { key: "Storyboard", title: "Storyboard", desc: "Shot design" },
      { key: "Design", title: "Design", desc: "Visual language" },
      { key: "Motion", title: "Motion", desc: "Rhythm + polish" },
      { key: "Sound", title: "Sound", desc: "Punch + feel" },
      { key: "Delivery", title: "Delivery", desc: "Assets shipped" },
    ],
    []
  );

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    // reveal
    gsap.fromTo(
      section.querySelectorAll("[data-reveal]"),
      { opacity: 0, y: 18 },
      {
        opacity: 1,
        y: 0,
        duration: 0.75,
        ease: "power3.out",
        stagger: 0.08,
        scrollTrigger: { trigger: section, start: "top 80%" },
      }
    );

    // infinite conveyor
    // duplicate content for seamless loop
    const content = track.querySelector("[data-track-inner]");
    if (!content) return;

    const clone = content.cloneNode(true);
    track.appendChild(clone);

    const inner = track.querySelectorAll("[data-track-inner]");

    gsap.set(inner, { xPercent: 0 });

    const tl = gsap.timeline({ repeat: -1, defaults: { ease: "none" } });
    tl.to(inner, { xPercent: -100, duration: 28 });

    // pause on hover
    const onEnter = () => tl.pause();
    const onLeave = () => tl.resume();
    track.addEventListener("mouseenter", onEnter);
    track.addEventListener("mouseleave", onLeave);

    return () => {
      track.removeEventListener("mouseenter", onEnter);
      track.removeEventListener("mouseleave", onLeave);
      ScrollTrigger.getAll().forEach((t) => t.kill());
      tl.kill();
      // remove clone
      if (track.children.length > 1) track.removeChild(track.lastChild as Node);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="pipeline"
      style={{
        padding: "110px 24px 80px",
        background: "#000",
      }}
    >
      <div style={{ maxWidth: 1160, margin: "0 auto" }}>
        

        <VideoCard
            youtubeUrl="https://www.youtube.com/watch?v=xFfXn_jViaM"
            title="See our pipeline in action"
            caption="A quick breakdown of how we ship story + motion without delays."
            />
        
        <div data-reveal style={{ marginBottom: 22 }}>
          <p
            style={{
              fontSize: 11,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.35)",
              marginBottom: 14,
              fontWeight: 600,
            }}
          >
            How it ships
          </p>

          <h2
            data-reveal
            style={{
              fontWeight: 700,
              fontSize: "clamp(28px, 4vw, 44px)",
              letterSpacing: "-0.03em",
              lineHeight: 1.06,
              margin: 0,
              color: "rgba(255,255,255,0.94)",
            }}
          >
            A pipeline your team can rely on.
          </h2>

          <p
            data-reveal
            style={{
              marginTop: 12,
              maxWidth: 640,
              fontSize: 14,
              lineHeight: 1.7,
              color: "rgba(255,255,255,0.5)",
            }}
          >
            Clear stages. Predictable handoffs. Fast iterations — without chaos.
          </p>
        </div>

        {/* Conveyor surface */}
        <div
          data-reveal
          ref={trackRef}
          style={{
            position: "relative",
            borderRadius: 18,
            border: "1px solid rgba(255,255,255,0.07)",
            background: "rgba(255,255,255,0.02)",
            overflow: "hidden",
            padding: 14,
          }}
        >
          {/* subtle glow */}
          <div
            aria-hidden
            style={{
              position: "absolute",
              inset: 0,
              pointerEvents: "none",
              background:
                "radial-gradient(700px 240px at 15% 20%, rgba(255,255,255,0.06), transparent 60%)",
              opacity: 0.9,
            }}
          />

          <div
            style={{
              position: "relative",
              overflow: "hidden",
              borderRadius: 14,
              background: "rgba(0,0,0,0.65)",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <div
              style={{
                display: "flex",
                width: "100%",
                maskImage:
                  "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
                WebkitMaskImage:
                  "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
              }}
            >
              <div
                data-track-inner
                style={{
                  display: "flex",
                  gap: 12,
                  padding: "18px 16px",
                  flexShrink: 0,
                }}
              >
                {steps.map((s) => (
                  <div
                    key={s.key}
                    style={{
                      width: 240,
                      flexShrink: 0,
                      borderRadius: 14,
                      padding: "16px 16px 14px",
                      border: "1px solid rgba(255,255,255,0.07)",
                      background: "rgba(255,255,255,0.02)",
                      transition: "transform 220ms ease, border-color 220ms ease",
                    }}
                    onMouseEnter={(e) => {
                      gsap.to(e.currentTarget, {
                        y: -4,
                        duration: 0.22,
                        ease: "power3.out",
                      });
                      gsap.to(e.currentTarget, {
                        borderColor: "rgba(255,255,255,0.14)",
                        duration: 0.22,
                        ease: "power3.out",
                      });
                    }}
                    onMouseLeave={(e) => {
                      gsap.to(e.currentTarget, {
                        y: 0,
                        duration: 0.22,
                        ease: "power3.out",
                      });
                      gsap.to(e.currentTarget, {
                        borderColor: "rgba(255,255,255,0.07)",
                        duration: 0.22,
                        ease: "power3.out",
                      });
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginBottom: 10,
                      }}
                    >
                      <div
                        style={{
                          fontSize: 11,
                          letterSpacing: "0.14em",
                          textTransform: "uppercase",
                          color: "rgba(255,255,255,0.25)",
                          fontWeight: 700,
                        }}
                      >
                        {s.title}
                      </div>

                      <div
                        style={{
                          width: 9,
                          height: 9,
                          borderRadius: 99,
                          background: "rgba(255,255,255,0.18)",
                          boxShadow: "0 0 0 4px rgba(255,255,255,0.04)",
                        }}
                      />
                    </div>

                    <div
                      style={{
                        fontSize: 13.5,
                        lineHeight: 1.55,
                        color: "rgba(255,255,255,0.55)",
                      }}
                    >
                      {s.desc}
                    </div>

                    <div
                      style={{
                        marginTop: 14,
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                      }}
                    >
                      <div
                        style={{
                          height: 1,
                          flex: 1,
                          background: "rgba(255,255,255,0.06)",
                        }}
                      />
                      <div
                        style={{
                          fontSize: 11,
                          color: "rgba(255,255,255,0.3)",
                        }}
                      >
                        →
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* bottom rail */}
            <div
              aria-hidden
              style={{
                height: 1,
                background: "rgba(255,255,255,0.06)",
              }}
            />
          </div>

          <div
            data-reveal
            style={{
              marginTop: 14,
              display: "flex",
              justifyContent: "space-between",
              gap: 12,
              flexWrap: "wrap",
            }}
          >
            <span
              style={{
                fontSize: 12,
                color: "rgba(255,255,255,0.45)",
              }}
            >
              Hover to pause. Built for async teams.
            </span>
            <span
              style={{
                fontSize: 12,
                color: "rgba(255,255,255,0.3)",
              }}
            >
              Typical delivery: 10–14 days
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

