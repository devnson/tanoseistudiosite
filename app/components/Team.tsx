"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Layout: Studio → Creative Lead → Ops → Spine → Team
 * Animation: blocks flow left→right, then up/down the spine, then branch to each role.
 */

const teamMembers = [
  { name: "Design Lead", role: "Visual Systems", initials: "DL" },
  { name: "Storyboard", role: "Story + Structure", initials: "SB" },
  { name: "Motion Lead", role: "Animation", initials: "ML" },
  { name: "Sound Lead", role: "Sound + Polish", initials: "SL" },
];

const studio = { name: "Tanosei", role: "Studio", initials: "" };
const creative = { name: "Creative Lead", role: "Direction", initials: "S" };
const ops = { name: "Ops", role: "Delivery", initials: "OP" };

// Card sizing
const CW = 130;
const CH = 130;

// Spacing
const VGAP = 22;
const HGAP = 90;

// Right-side team stack height
const TEAM_TOTAL_H = teamMembers.length * CH + (teamMembers.length - 1) * VGAP;
const VCENTER = TEAM_TOTAL_H / 2;

// Columns
const COL_STUDIO = 0;
const COL_CREATIVE = COL_STUDIO + CW + HGAP;
const COL_OPS = COL_CREATIVE + CW + HGAP;
const COL_TEAM = COL_OPS + CW + HGAP;

// Spine X (between Ops and Team)
const spineX = COL_OPS + CW + HGAP / 2;

// Y positions
const STUDIO_Y = VCENTER - CH / 2;
const CREATIVE_Y = VCENTER - CH / 2;
const OPS_Y = VCENTER - CH / 2;

const memberY = (i: number) => i * (CH + VGAP);

const studioMY = STUDIO_Y + CH / 2;
const creativeMY = CREATIVE_Y + CH / 2;
const opsMY = OPS_Y + CH / 2;

const topMY = memberY(0) + CH / 2;
const botMY = memberY(teamMembers.length - 1) + CH / 2;

// Canvas size
const W = COL_TEAM + CW + 30;
const H = TEAM_TOTAL_H + 10;

// ────────────────────────── Segment math ──────────────────────────
type Seg = { x1: number; y1: number; x2: number; y2: number; len: number };

function buildSegs(pts: [number, number][]) {
  const segs: Seg[] = [];
  let total = 0;
  for (let i = 0; i < pts.length - 1; i++) {
    const dx = pts[i + 1][0] - pts[i][0];
    const dy = pts[i + 1][1] - pts[i][1];
    const len = Math.sqrt(dx * dx + dy * dy);
    segs.push({ x1: pts[i][0], y1: pts[i][1], x2: pts[i + 1][0], y2: pts[i + 1][1], len });
    total += len;
  }
  return { segs, total };
}

function posAt(segs: Seg[], total: number, d: number) {
  let rem = Math.min(Math.max(d, 0), total);
  for (const s of segs) {
    if (rem <= s.len + 0.001) {
      const t = s.len > 0 ? rem / s.len : 0;
      return { x: s.x1 + (s.x2 - s.x1) * t, y: s.y1 + (s.y2 - s.y1) * t };
    }
    rem -= s.len;
  }
  const l = segs[segs.length - 1];
  return { x: l.x2, y: l.y2 };
}

// ────────────────────────── Paths ──────────────────────────

// Trunk path: Studio → Creative → Ops → Spine junction
const TRUNK_PTS: [number, number][] = [
  [COL_STUDIO + CW, studioMY],
  [COL_CREATIVE, creativeMY],
  [COL_CREATIVE + CW, creativeMY],
  [COL_OPS, opsMY],
  [COL_OPS + CW, opsMY],
  [spineX, opsMY],
];
const TRUNK = buildSegs(TRUNK_PTS);

// Spine paths: from junction, split UP and DOWN
const SPINE_UP = buildSegs([
  [spineX, opsMY],
  [spineX, topMY],
]);
const SPINE_DOWN = buildSegs([
  [spineX, opsMY],
  [spineX, botMY],
]);

// Branch path for each role (from spine to card center)
function buildBranch(mi: number): [number, number][] {
  const y = memberY(mi) + CH / 2;
  return [
    [spineX, y],
    [COL_TEAM, y],
    [COL_TEAM + CW / 2, y],
  ];
}
const BRANCHES = teamMembers.map((_, i) => buildSegs(buildBranch(i)));

// ────────────────────────── Animation constants ──────────────────────────
const SPEED = 150; // px/sec
const SPAWN_INTERVAL = 0.38;

// block sizes / fade distances
const FADE_IN = 22;
const FADE_OUT = 28;

// ────────────────────────── Block state ──────────────────────────
let _uid = 0;
const uid = () => ++_uid;

type TrunkBlock = { id: number; dist: number; spawnedSpine: boolean };
type SpineBlock = {
  id: number;
  dir: "up" | "down";
  dist: number;
  emitted: boolean[]; // per lane
};
type BranchBlock = { id: number; lane: number; dist: number };

export default function Team() {
  const headerRef = useRef<HTMLDivElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const [hov, setHov] = useState<string | null>(null);

  const trunkBlocks = useRef<TrunkBlock[]>([{ id: uid(), dist: 0, spawnedSpine: false }]);
  const spineBlocks = useRef<SpineBlock[]>([]);
  const branchBlocks = useRef<BranchBlock[]>([]);

  const lastTsRef = useRef<number | null>(null);
  const spawnTimerRef = useRef(0);
  const [, redraw] = useState(0);

  useEffect(() => {
    gsap.fromTo(
      headerRef.current,
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 0.7, ease: "power3.out", scrollTrigger: { trigger: headerRef.current, start: "top 88%" } }
    );
    gsap.fromTo(
      wrapRef.current,
      { opacity: 0, y: 18 },
      { opacity: 1, y: 0, duration: 0.75, ease: "power3.out", scrollTrigger: { trigger: wrapRef.current, start: "top 85%" } }
    );
  }, []);

  useEffect(() => {
    let raf: number;

    const loop = (ts: number) => {
      if (lastTsRef.current === null) lastTsRef.current = ts;
      const dt = Math.min((ts - lastTsRef.current) / 1000, 0.05);
      lastTsRef.current = ts;

      const move = SPEED * dt;

      // Spawn trunk blocks steadily
      spawnTimerRef.current += dt;
      while (spawnTimerRef.current >= SPAWN_INTERVAL) {
        spawnTimerRef.current -= SPAWN_INTERVAL;
        trunkBlocks.current.push({ id: uid(), dist: 0, spawnedSpine: false });
      }

      // Advance trunk blocks; when reaching junction, spawn spine flow up & down
      trunkBlocks.current = trunkBlocks.current.reduce<TrunkBlock[]>((acc, b) => {
        const next = b.dist + move;

        if (!b.spawnedSpine && next >= TRUNK.total) {
          const emitted = new Array(teamMembers.length).fill(false);
          spineBlocks.current.push({ id: uid(), dir: "up", dist: 0, emitted: [...emitted] });
          spineBlocks.current.push({ id: uid(), dir: "down", dist: 0, emitted: [...emitted] });
        }

        // keep trunk until it exits the junction a bit
        if (next <= TRUNK.total + 30) {
          acc.push({ ...b, dist: next, spawnedSpine: b.spawnedSpine || next >= TRUNK.total });
        }
        return acc;
      }, []);

      // Advance spine blocks + emit branch blocks as they pass each lane y
      spineBlocks.current = spineBlocks.current.reduce<SpineBlock[]>((acc, s) => {
        const path = s.dir === "up" ? SPINE_UP : SPINE_DOWN;
        const next = s.dist + move;

        // current pos along spine
        const p = posAt(path.segs, path.total, next);

        // emit when close to a lane y (and in correct direction region)
        for (let i = 0; i < teamMembers.length; i++) {
          if (s.emitted[i]) continue;

          const laneY = memberY(i) + CH / 2;

          // Only emit if the lane lies on this direction side
          const isLaneAbove = laneY <= opsMY;
          const laneMatchesDir = s.dir === "up" ? isLaneAbove : !isLaneAbove;
          if (!laneMatchesDir) continue;

          // emit when spine block is within threshold of that laneY
          if (Math.abs(p.y - laneY) < 10) {
            s.emitted[i] = true;
            branchBlocks.current.push({ id: uid(), lane: i, dist: 0 });
          }
        }

        // keep spine block until end
        if (next <= path.total + 30) acc.push({ ...s, dist: next });
        return acc;
      }, []);

      // Advance branch blocks
      branchBlocks.current = branchBlocks.current.reduce<BranchBlock[]>((acc, b) => {
        const br = BRANCHES[b.lane];
        const next = b.dist + move;
        if (next <= br.total + 25) acc.push({ ...b, dist: next });
        return acc;
      }, []);

      redraw((n) => n + 1);
      raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  // ────────────────────────── Render blocks ──────────────────────────
  const renderBlock = (key: string, x: number, y: number, alpha: number) => (
    <g key={key} opacity={Math.max(0, Math.min(alpha, 1))}>
      <rect x={x - 6} y={y - 6} width={12} height={12} rx={2.5} fill="rgba(140,200,255,0.08)" />
      <rect x={x - 3.5} y={y - 3.5} width={7} height={7} rx={1.6} fill="rgba(255,255,255,0.9)" />
    </g>
  );

  const blocks: React.ReactNode[] = [];

  // trunk
  for (const b of trunkBlocks.current) {
    const p = posAt(TRUNK.segs, TRUNK.total, b.dist);
    const fadeIn = Math.min(b.dist / FADE_IN, 1);
    const fadeOut = Math.min((TRUNK.total - b.dist) / FADE_OUT, 1);
    blocks.push(renderBlock(`t-${b.id}`, p.x, p.y, fadeIn * fadeOut));
  }

  // spine
  for (const s of spineBlocks.current) {
    const path = s.dir === "up" ? SPINE_UP : SPINE_DOWN;
    const p = posAt(path.segs, path.total, s.dist);
    const fadeIn = Math.min(s.dist / FADE_IN, 1);
    const fadeOut = Math.min((path.total - s.dist) / FADE_OUT, 1);
    blocks.push(renderBlock(`s-${s.id}`, p.x, p.y, fadeIn * fadeOut));
  }

  // branches
  for (const b of branchBlocks.current) {
    const br = BRANCHES[b.lane];
    const p = posAt(br.segs, br.total, b.dist);
    const fadeIn = Math.min(b.dist / FADE_IN, 1);
    const fadeOut = Math.min((br.total - b.dist) / FADE_OUT, 1);
    blocks.push(renderBlock(`b-${b.id}`, p.x, p.y, fadeIn * fadeOut));
  }

  // ────────────────────────── Card styles ──────────────────────────
  const cardFill = "rgb(12,12,12)";
  const strokeIdle = "rgba(255,255,255,0.10)";
  const strokeHover = "rgba(255,255,255,0.22)";

  const card = (x: number, y: number, m: { name: string; role: string; initials: string }, isHover: boolean, rx = 18) => (
    <g transform={`translate(${x}, ${y})`} onMouseEnter={() => setHov(m.name)} onMouseLeave={() => setHov(null)}>
      <rect x={0} y={0} width={CW} height={CH} rx={rx} fill={cardFill} stroke={isHover ? strokeHover : strokeIdle} strokeWidth="1" />
      <circle cx={CW / 2} cy={40} r={22} fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.10)" strokeWidth="1" />
      <text x={CW / 2} y={46} textAnchor="middle" fontFamily="var(--font-dm)" fontSize="13" fontWeight="700" fill="rgba(255,255,255,0.55)">
        {m.initials}
      </text>
      <text x={CW / 2} y={83} textAnchor="middle" fontFamily="var(--font-dm)" fontSize="12" fontWeight="700" fill={isHover ? "rgba(255,255,255,0.78)" : "rgba(255,255,255,0.50)"}>
        {m.name}
      </text>
      <text x={CW / 2} y={100} textAnchor="middle" fontFamily="var(--font-dm)" fontSize="9.5" fill="rgba(255,255,255,0.22)">
        {m.role}
      </text>
    </g>
  );

  return (
    <section id="team" style={{ padding: "120px 24px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
      <div style={{ maxWidth: "1160px", margin: "0 auto" }}>
        <div ref={headerRef} style={{ marginBottom: "72px", opacity: 0 }}>
          <h2
            style={{
              fontFamily: "var(--font-dm)",
              fontWeight: 800,
              fontSize: "clamp(32px, 5vw, 56px)",
              letterSpacing: "-0.03em",
              lineHeight: 1.05,
              margin: 0,
              color: "rgba(255,255,255,0.92)",
            }}
          >
            <span style={{ fontWeight: 300 }}>The people</span> behind the work.
          </h2>
        </div>

        <div ref={wrapRef} style={{ display: "flex", justifyContent: "center", overflowX: "auto", opacity: 0 }}>
          <svg width={W} height={H} style={{ overflow: "visible", display: "block" }}>
            {/* WIRES */}
            <line x1={COL_STUDIO + CW} y1={studioMY} x2={COL_CREATIVE} y2={creativeMY} stroke="rgba(255,255,255,0.10)" strokeWidth="1.5" strokeDasharray="6 9" />
            <line x1={COL_CREATIVE + CW} y1={creativeMY} x2={COL_OPS} y2={opsMY} stroke="rgba(255,255,255,0.10)" strokeWidth="1.5" strokeDasharray="6 9" />
            <line x1={COL_OPS + CW} y1={opsMY} x2={spineX} y2={opsMY} stroke="rgba(255,255,255,0.10)" strokeWidth="1.5" strokeDasharray="6 9" />
            <line x1={spineX} y1={topMY} x2={spineX} y2={botMY} stroke="rgba(255,255,255,0.10)" strokeWidth="1.5" strokeDasharray="6 9" />
            {teamMembers.map((_, i) => (
              <line
                key={i}
                x1={spineX}
                y1={memberY(i) + CH / 2}
                x2={COL_TEAM}
                y2={memberY(i) + CH / 2}
                stroke="rgba(255,255,255,0.10)"
                strokeWidth="1.5"
                strokeDasharray="6 9"
              />
            ))}

            {/* BLOCKS */}
            {blocks}

            {/* STUDIO */}
            <g transform={`translate(${COL_STUDIO}, ${STUDIO_Y})`}>
              <rect x={0} y={0} width={CW} height={CH} rx={22} fill="rgb(12,12,12)" stroke="rgba(255,255,255,0.14)" strokeWidth="1" />
              {/* minimal logo mark */}
              <g transform="translate(26, 18) scale(0.22)">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M71.211 258.453L71.211 163.678L71.211 87.162C71.211 74.4614 83.7004 67.488 92.7003 72.6307L152.706 107.171L152.706 265.423L130.571 269.742L130.572 276.101L152.706 271.472L162.723 269.375L274.349 246.21V335.3L152.393 334.675C101.22 334.675 71.211 290.544 71.211 258.453Z"
                  fill="rgba(255,255,255,0.86)"
                />
                <path
                  d="M213.42 193.732L161.703 223.687L161.821 163.659L165.881 161.265C167.856 163.644 169.986 165.935 172.271 168.125C184.107 179.473 198.472 186.554 213.462 189.409L213.42 193.732Z"
                  fill="rgba(255,255,255,0.86)"
                />
              </g>
            </g>

            {/* CREATIVE */}
            {card(COL_CREATIVE, CREATIVE_Y, creative, hov === creative.name, 22)}

            {/* OPS */}
            {card(COL_OPS, OPS_Y, ops, hov === ops.name, 22)}

            {/* TEAM (RIGHT STACK) */}
            {teamMembers.map((m, i) => card(COL_TEAM, memberY(i), m, hov === m.name, 18))}
          </svg>
        </div>

        {/* CTA */}
        <div style={{ display: "flex", justifyContent: "center", marginTop: "64px" }}>
          <a
            href="/team"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              padding: "14px 28px",
              borderRadius: "12px",
              border: "1px solid rgba(255,255,255,0.1)",
              background: "rgba(255,255,255,0.02)",
              color: "rgba(255,255,255,0.55)",
              fontSize: "13px",
              fontWeight: 600,
              textDecoration: "none",
              fontFamily: "var(--font-dm)",
              transition: "all 0.22s",
              letterSpacing: "0.02em",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget;
              el.style.borderColor = "rgba(255,255,255,0.22)";
              el.style.color = "rgba(255,255,255,0.88)";
              el.style.background = "rgba(255,255,255,0.04)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget;
              el.style.borderColor = "rgba(255,255,255,0.1)";
              el.style.color = "rgba(255,255,255,0.55)";
              el.style.background = "rgba(255,255,255,0.02)";
            }}
          >
            Meet the full team
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M1 7h12M7 1l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}