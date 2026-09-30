type WatchFaceProps = {
  dial: string;
  hands: string;
  bezel?: string;
  caseColor?: string;
  label: string;
};

function clockPoint(cx: number, cy: number, degreesFromTwelve: number, length: number) {
  const radians = ((degreesFromTwelve - 90) * Math.PI) / 180;
  return {
    x: cx + Math.cos(radians) * length,
    y: cy + Math.sin(radians) * length,
  };
}

export function WatchFace({
  dial,
  hands,
  bezel = "#c4a36a",
  caseColor = "#1c1916",
  label,
}: WatchFaceProps) {
  const center = { x: 100, y: 104 };

  const ticks = Array.from({ length: 12 }, (_, index) => {
    const major = index % 3 === 0;
    const start = clockPoint(center.x, center.y, index * 30, major ? 66 : 72);
    const end = clockPoint(center.x, center.y, index * 30, 80);
    return { start, end, width: major ? 2.2 : 1 };
  });

  const hour = clockPoint(center.x, center.y, 300, 34);
  const minute = clockPoint(center.x, center.y, 60, 52);
  const second = clockPoint(center.x, center.y, 0, 62);

  return (
    <svg viewBox="0 0 220 210" className="h-full w-full" role="img" aria-label={label}>
      <circle cx={center.x} cy={center.y} r="92" fill={caseColor} />
      <circle
        cx={center.x}
        cy={center.y}
        r="84"
        fill="none"
        stroke={bezel}
        strokeWidth="1.25"
      />
      <circle cx={center.x} cy={center.y} r="78" fill={dial} />
      {ticks.map((tick) => (
        <line
          key={`${tick.end.x}-${tick.end.y}`}
          x1={tick.start.x}
          y1={tick.start.y}
          x2={tick.end.x}
          y2={tick.end.y}
          stroke={hands}
          strokeWidth={tick.width}
          strokeLinecap="round"
        />
      ))}
      <line
        x1={center.x}
        y1={center.y}
        x2={hour.x}
        y2={hour.y}
        stroke={hands}
        strokeWidth="3.2"
        strokeLinecap="round"
      />
      <line
        x1={center.x}
        y1={center.y}
        x2={minute.x}
        y2={minute.y}
        stroke={hands}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <line
        x1={center.x}
        y1={center.y}
        x2={second.x}
        y2={second.y}
        stroke={bezel}
        strokeWidth="1"
        strokeLinecap="round"
      />
      <circle cx={center.x} cy={center.y} r="4" fill={bezel} />
      <circle cx={center.x} cy={center.y} r="1.6" fill={caseColor} />
      <rect x="188" y="93" width="16" height="7" rx="1.5" fill={bezel} />
      <rect x="188" y="108" width="16" height="7" rx="1.5" fill={bezel} />
    </svg>
  );
}
