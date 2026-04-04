import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import type { ClinicalTrial } from '../types'
import { MOCK_TRIALS, moreTrials } from '../data/mock'
import { MatchRing } from './MatchRing'

type Props = { onSelect: (t: ClinicalTrial) => void }

export function TrialDiscovery({ onSelect }: Props) {
  const [query, setQuery] = useState('')
  const [nearOnly, setNearOnly] = useState(false)
  const [highMatch, setHighMatch] = useState(false)
  const [items, setItems] = useState<ClinicalTrial[]>(MOCK_TRIALS)
  const [page, setPage] = useState(0)
  const [loading, setLoading] = useState(false)
  const sentinelRef = useRef<HTMLDivElement>(null)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return items.filter((t) => {
      if (nearOnly && t.distanceMiles > 10) return false
      if (highMatch && t.matchScore < 85) return false
      if (!q) return true
      return (
        t.title.toLowerCase().includes(q) ||
        t.condition.toLowerCase().includes(q) ||
        t.location.toLowerCase().includes(q)
      )
    })
  }, [items, query, nearOnly, highMatch])

  const loadMore = useCallback(() => {
    if (loading || page >= 12) return
    setLoading(true)
    window.setTimeout(() => {
      const next = page + 1
      setItems((prev) => [...prev, ...moreTrials(next)])
      setPage(next)
      setLoading(false)
    }, 600)
  }, [loading, page])

  useEffect(() => {
    const el = sentinelRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) loadMore()
      },
      { rootMargin: '200px' },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [loadMore])

  return (
    <>
      <h1 className="page-title">Clinical trial discovery</h1>
      <p className="page-sub">
        Search and filters surface structured trial cards with match scores, AI summaries, pay, demographics,
        location, and requirements. Scroll to load more trials (&ldquo;doom scroll&rdquo; feed).
      </p>

      <div className="filters-row">
        <label className="sr-only" htmlFor="trial-search">
          Search trials
        </label>
        <input
          id="trial-search"
          className="search-input"
          placeholder="Search condition, site, keyword…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          type="button"
          className={`chip-toggle ${nearOnly ? 'on' : ''}`}
          onClick={() => setNearOnly((v) => !v)}
        >
          ≤10 mi
        </button>
        <button
          type="button"
          className={`chip-toggle ${highMatch ? 'on' : ''}`}
          onClick={() => setHighMatch((v) => !v)}
        >
          match ≥85
        </button>
        <span className="doom-scroll-hint">infinite load · {filtered.length} visible</span>
      </div>

      <div className="trial-list">
        {filtered.map((t) => (
          <button key={t.id} type="button" className="trial-card" onClick={() => onSelect(t)}>
            <div className="trial-card-head">
              <MatchRing score={t.matchScore} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <h4>{t.title}</h4>
                <div className="trial-meta">
                  <span>{t.phase}</span>
                  <span>{t.sponsor}</span>
                  <span>{t.distanceMiles} mi</span>
                </div>
              </div>
            </div>
            <div className="trial-card-body">
              <div className="ai-snippet">{t.aiSummary}</div>
              <div className="disclaimer-inline">{t.riskDisclaimer}</div>
              <div className="tag-row">
                <span className="tag pay">{t.payRange ?? t.compensation}</span>
                <span className="tag">{t.demographics.slice(0, 42)}…</span>
                <span className="tag">{t.location.split('—')[0]?.trim()}</span>
                <span className="tag">{t.requirements.length} requirements</span>
              </div>
            </div>
          </button>
        ))}
      </div>

      <div ref={sentinelRef} className="load-more-wrap">
        <button type="button" className="load-more" disabled={loading} onClick={loadMore}>
          {loading ? 'Loading more trials…' : 'Load more (or keep scrolling)'}
        </button>
      </div>
    </>
  )
}
