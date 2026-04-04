import type { AlertItem } from '../types'

const icon = (type: AlertItem['type']) => {
  if (type === 'trial') return '🧬'
  if (type === 'cost') return '📈'
  return '⏱'
}

export function AlertsBar({ items }: { items: AlertItem[] }) {
  return (
    <div className="alerts-bar" role="region" aria-label="Alerts">
      {items.map((a) => (
        <article key={a.id} className={`alert-chip ${a.type}`}>
          <span className="ic" aria-hidden>
            {icon(a.type)}
          </span>
          <div>
            <strong>{a.title}</strong>
            <span>{a.body}</span>
            <time>{a.time}</time>
          </div>
        </article>
      ))}
    </div>
  )
}
