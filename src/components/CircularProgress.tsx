export default function CircularProgress({ percent, size = 64, stroke = 6, color = '#2563EB', bgColor = '#BAE6FD', children }: {
  percent: number; size?: number; stroke?: number; color?: string; bgColor?: string; children?: React.ReactNode;
}) {
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ * (1 - percent);
  return (
    <div className="circular-progress" style={{ width: size, height: size }}>
      <svg width={size} height={size}>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={bgColor} strokeWidth={stroke} />
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={stroke}
          strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round" />
      </svg>
      <span className="circular-progress-text" style={{ color }}>{children}</span>
    </div>
  );
}
