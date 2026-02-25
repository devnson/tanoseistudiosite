"use client";

const logos = [
  "Ramp",
  "SecurityPal",
  "Aleph",
  "Thera",
  "Sunsama",
  "Openmart",
  "Niural AI",
  "reAlpha",
  "Eleftra",
  "Saral",
];

export default function LogoMarquee() {
  // Duplicate list so the animation can loop seamlessly
  const loop = [...logos, ...logos];

  return (
    <section className="logoMarquee">
      <div style={{ maxWidth: 1160, margin: "0 auto", padding: "0 24px" }}>
        <div
          style={{
            textAlign: "center",
            fontSize: 11,
            letterSpacing: "0.18em",
            color: "rgba(255,255,255,0.28)",
            marginBottom: 24,
            fontWeight: 600,
          }}
        >
          TRUSTED BY TEAMS AT
        </div>

        <div style={{ position: "relative" }}>
          <div className="logoTrack" aria-label="Client logos marquee">
            {loop.map((name, i) => (
              <div className="logoItem" key={`${name}-${i}`}>
                <strong>{name}</strong>
                <span className="logoDot" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}