import type { ClinicalTrial } from '../types'
import { MatchRing } from './MatchRing'

type Props = {
  trial: ClinicalTrial | null
  onClose: () => void
}

export function TrialDrawer({ trial, onClose }: Props) {
  const open = trial !== null
  return (
    <>
      <div
        className={`drawer-backdrop ${open ? 'open' : ''}`}
        onClick={onClose}
        onKeyDown={(e) => e.key === 'Escape' && onClose()}
        role="presentation"
        aria-hidden={!open}
      />
      <aside
        className={`drawer ${open ? 'open' : ''}`}
        aria-hidden={!open}
        aria-modal="true"
        role="dialog"
        aria-labelledby="drawer-title"
      >
        {trial && (
          <>
            <div className="drawer-head">
              <h2 id="drawer-title">{trial.title}</h2>
              <button type="button" className="icon-btn" onClick={onClose} aria-label="Close">
                ×
              </button>
            </div>
            <div className="drawer-body">
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1.25rem' }}>
                <MatchRing score={trial.matchScore} />
                <div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Overall match</div>
                  <div style={{ fontWeight: 700, fontSize: '1.25rem' }}>{trial.matchScore}%</div>
                </div>
              </div>

              <h3 style={{ fontSize: '0.85rem', margin: '0 0 0.5rem', color: 'var(--accent-trial)' }}>
                Match score breakdown
              </h3>
              <ul className="breakdown-list">
                {trial.breakdown.map((b) => (
                  <li key={b.label} className="breakdown-item">
                    <header>
                      <span>{b.label}</span>
                      <span style={{ fontFamily: 'var(--mono)', fontSize: '0.75rem' }}>
                        {b.score}% · weight {(b.weight * 100).toFixed(0)}%
                      </span>
                    </header>
                    <div className="bar">
                      <span style={{ width: `${b.score}%` }} />
                    </div>
                    <p>{b.detail}</p>
                  </li>
                ))}
              </ul>

              <h3 style={{ fontSize: '0.85rem', margin: '1.25rem 0 0.5rem', color: 'var(--accent-trial)' }}>
                AI summarization
              </h3>
              <p style={{ margin: 0, fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                {trial.aiSummary}
              </p>

              <h3 style={{ fontSize: '0.85rem', margin: '1.25rem 0 0.5rem' }}>Pay &amp; logistics</h3>
              <p style={{ margin: 0, fontSize: '0.85rem' }}>
                <span className="tag pay">{trial.payRange ?? trial.compensation}</span>{' '}
                <span className="tag">{trial.compensation}</span>
              </p>

              <h3 style={{ fontSize: '0.85rem', margin: '1.25rem 0 0.5rem' }}>Demographics</h3>
              <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)' }}>{trial.demographics}</p>

              <h3 style={{ fontSize: '0.85rem', margin: '1.25rem 0 0.5rem' }}>Location</h3>
              <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                {trial.location} · {trial.distanceMiles} mi
              </p>

              <h3 style={{ fontSize: '0.85rem', margin: '1.25rem 0 0.5rem' }}>Requirements</h3>
              <ul className="req-list">
                {trial.requirements.map((r) => (
                  <li key={r}>{r}</li>
                ))}
              </ul>

              <h3 style={{ fontSize: '0.85rem', margin: '1.25rem 0 0.5rem', color: 'var(--accent-warn)' }}>
                Trial risk disclaimer
              </h3>
              <p
                style={{
                  margin: 0,
                  fontSize: '0.8rem',
                  lineHeight: 1.45,
                  color: 'var(--text-muted)',
                  padding: '0.65rem',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid rgba(255,107,107,0.25)',
                  background: 'rgba(255,107,107,0.06)',
                }}
              >
                {trial.riskDisclaimer}
              </p>
            </div>
          </>
        )}
      </aside>
    </>
  )
}
