export function Signal({ compact = false }: { compact?: boolean }) {
  const lines = Array.from({ length: 10 }, (_, i) => {
    const points = Array.from({ length: 38 }, (_, j) => {
      const x = 60 + j * 13 + i * 7;
      const y =
        343 -
        i * 9 -
        j * (2 + i * 0.11) -
        Math.sin(j * 0.26 + i * 0.35) * (15 + j * 1.2) -
        Math.max(0, j - 23) * 5;
      return [x, y];
    });
    return (
      <g key={i} opacity={0.23 + i * 0.07}>
        <polyline
          points={points.map((p) => p.join(",")).join(" ")}
          fill="none"
          stroke="currentColor"
          strokeWidth={i === 8 ? 1.9 : 0.8}
        />
        {points
          .filter((_, j) => j % 7 === 0)
          .map(([x, y], j) => (
            <circle
              key={j}
              cx={x}
              cy={y}
              r={i === 8 ? 2.5 : 1.5}
              fill="currentColor"
            />
          ))}
      </g>
    );
  });
  return (
    <figure
      className={`signal ${compact ? "signal-compact" : ""}`}
      aria-label="Abstract gold trajectories rising over time; an illustration, not measured data."
    >
      <svg
        viewBox="0 0 660 460"
        fill="none"
        role="img"
        aria-label="AI progress and momentum, illustrated"
      >
        <g stroke="currentColor" strokeWidth=".5" opacity=".15">
          {Array.from({ length: 9 }, (_, i) => (
            <path
              key={i}
              d={`M${55 + i * 61} ${387 - i * 3} L${138 + i * 55} ${304 - i * 3} M${55 + i * 8} ${387 - i * 10} L${604 + i * 2} ${360 - i * 10}`}
            />
          ))}
          <path d="M55 387V74 M55 387L609 360 M55 387L138 304" />
        </g>
        <g className="trajectories">{lines}</g>
        <g
          fill="currentColor"
          opacity=".7"
          fontFamily="monospace"
          fontSize="9"
          letterSpacing="2"
        >
          <text x="56" y="55">
            SIGNAL / MOMENTUM
          </text>
          <text x="526" y="403">
            TIME →
          </text>
          <text x="56" y="436">
            FIG. 01
          </text>
          <text x="141" y="436" opacity=".6">
            A FIELD IN MOTION
          </text>
        </g>
      </svg>
      {!compact && (
        <figcaption>Independent perspective. A wider view.</figcaption>
      )}
    </figure>
  );
}
