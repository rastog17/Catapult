import { useId } from 'react'

type Props = { score: number; size?: number }

export function MatchRing({ score, size = 72 }: Props) {
  const gid = useId().replace(/:/g, '')
  const gradId = `gradTrial-${gid}`
  const r = (size - 8) / 2
  const c = 2 * Math.PI * r
  const offset = c - (score / 100) * c
  return (
    <div className="match-ring-wrap" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth="6"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={`url(#${gradId})`}
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={offset}
        />
        <defs>
          <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3ee8c8" />
            <stop offset="100%" stopColor="#6ca6ff" />
          </linearGradient>
        </defs>
      </svg>
      <span className="pct">{score}</span>
    </div>
  )
}
