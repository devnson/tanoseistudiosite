"use client";

type Node = {
  id: string;
  label: string;
  sub: string;
  x: number;
  y: number;
};

const nodes: Node[] = [
  { id: "design", label: "Design Lead", sub: "Visual Systems", x: 120, y: 90 },
  { id: "story", label: "Storyboard", sub: "Story + Structure", x: 90, y: 210 },
  { id: "motion", label: "Motion", sub: "2D/3D Production", x: 150, y: 350 },
  { id: "sound", label: "Sound", sub: "Polish", x: 450, y: 350 },
  { id: "ops", label: "Ops", sub: "Delivery", x: 510, y: 210 },
  { id: "you", label: "Sushan", sub: "Founder", x: 480, y: 90 },

  // ✅ extra two slots
  { id: "slot1", label: "+", sub: "Add role", x: 300, y: 34 },
  { id: "slot2", label: "+", sub: "Add role", x: 300, y: 395 },
];

export default function TeamNetwork() {
  const cx = 300;
  const cy = 210;

  return (
    <div className="teamHubWrap">
      <svg viewBox="0 0 600 420" className="teamHubSvg" role="img" aria-label="Tanosei Studio team network">
        <defs>
          <radialGradient id="hubGlow" cx="50%" cy="45%" r="60%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.12)" />
            <stop offset="55%" stopColor="rgba(255,255,255,0.05)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0.00)" />
          </radialGradient>

          <linearGradient id="hubRing" x1="0" x2="1">
            <stop offset="0%" stopColor="rgba(255,255,255,0.28)" />
            <stop offset="50%" stopColor="rgba(255,255,255,0.10)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0.24)" />
          </linearGradient>
        </defs>

        {/* ambient glow */}
        <circle cx={cx} cy={cy} r="170" fill="url(#hubGlow)" />

        {/* dashed connections */}
        <g className="teamHubLines">
          {nodes.map((n) => (
            <line key={n.id} x1={cx} y1={cy} x2={n.x} y2={n.y} />
          ))}
        </g>

        {/* center hub */}
        <g className="teamHubCenter">
          <circle cx={cx} cy={cy} r="76" fill="rgba(255,255,255,0.06)" stroke="url(#hubRing)" strokeWidth="1.2" />
          <circle cx={cx} cy={cy} r="58" fill="rgba(0,0,0,0.35)" stroke="rgba(255,255,255,0.14)" strokeWidth="1" />

          {/* ✅ LOGO SLOT: put your SVG/logo here */}
          <g transform={`translate(${cx - 18}, ${cy - 18})`}>
            {/* temporary placeholder */}
            <rect width="36" height="36" rx="10" fill="rgba(255,255,255,0.07)" stroke="rgba(255,255,255,0.14)" />
            <path d="M10 14 H26" stroke="rgba(255,255,255,0.70)" strokeWidth="3.5" strokeLinecap="round" />
            <path d="M18 14 V26" stroke="rgba(255,255,255,0.55)" strokeWidth="3.5" strokeLinecap="round" />
          </g>
        </g>

        {/* outer nodes */}
        {nodes.map((n) => (
          <g key={n.id} className="teamHubPerson">
            {/* ring */}
            <circle cx={n.x} cy={n.y} r="44" className="teamHubAvatarBg" />
            <circle cx={n.x} cy={n.y} r="30" className="teamHubAvatarInner" />

            {/* minimal glyph OR plus */}
            {n.label === "+" ? (
              <text x={n.x} y={n.y + 6} textAnchor="middle" className="teamHubPlus">
                +
              </text>
            ) : (
              <>
                <circle cx={n.x} cy={n.y - 9} r="9.5" fill="rgba(255,255,255,0.30)" />
                <path
                  d={`M ${n.x - 18} ${n.y + 18} C ${n.x - 9} ${n.y + 5}, ${n.x + 9} ${n.y + 5}, ${n.x + 18} ${n.y + 18}`}
                  stroke="rgba(255,255,255,0.30)"
                  strokeWidth="3.2"
                  fill="none"
                  strokeLinecap="round"
                />
              </>
            )}

            {/* labels */}
            <text x={n.x} y={n.y + 66} textAnchor="middle" className="teamHubName">
              {n.label}
            </text>
            <text x={n.x} y={n.y + 82} textAnchor="middle" className="teamHubRole">
              {n.sub}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}