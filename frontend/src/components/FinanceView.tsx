import { useMemo, useState } from 'react'
import { MOCK_SPENDING, TREND_MONTHS } from '../data/mock'

export function FinanceView() {
  const [trialSim, setTrialSim] = useState(false)
  const [rxIntensity, setRxIntensity] = useState(50)
  const [visitFreq, setVisitFreq] = useState(40)

  const baseMonthly = useMemo(
    () => MOCK_SPENDING.reduce((s, l) => s + l.monthly, 0),
    [],
  )

  const adjusted = useMemo(() => {
    const rxAdj = 1 + (rxIntensity - 50) / 200
    const visitAdj = 1 + (visitFreq - 50) / 180
    const trialOffset = trialSim ? 0.88 : 1
    return Math.round(baseMonthly * rxAdj * visitAdj * trialOffset)
  }, [baseMonthly, rxIntensity, visitFreq, trialSim])

  const riskScore = useMemo(() => {
    let s = 52
    MOCK_SPENDING.forEach((l) => {
      if (l.yoyChangePct > 15) s += 6
      if (l.label.includes('Pharmacy')) s += 4
    })
    if (trialSim) s -= 5
    s += Math.round((rxIntensity - 50) / 15)
    return Math.min(92, Math.max(38, s))
  }, [trialSim, rxIntensity])

  const maxTrend = Math.max(...TREND_MONTHS.flatMap((m) => [m.you, m.bench]))

  return (
    <>
      <h1 className="page-title">Healthcare financial forecast</h1>
      <p className="page-sub">
        Predict near-term care costs from recurring prescriptions, doctor visits, and insurance share.
        Compare spending trends, stress-test with past increases, and layer a trial cost simulator plus
        budget optimization hints.
      </p>

      <div className="finance-grid">
        <div className="card">
          <h3>Cost predictor</h3>
          <p style={{ margin: '0 0 1rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Adjust sliders to reflect expected refill intensity and visit cadence. Figures are illustrative.
          </p>
          <div className="field">
            <label htmlFor="rx">Recurring prescriptions load</label>
            <input
              id="rx"
              type="range"
              min={0}
              max={100}
              value={rxIntensity}
              onChange={(e) => setRxIntensity(Number(e.target.value))}
            />
          </div>
          <div className="field" style={{ marginTop: '0.75rem' }}>
            <label htmlFor="visits">Doctor visits (primary + specialists)</label>
            <input
              id="visits"
              type="range"
              min={0}
              max={100}
              value={visitFreq}
              onChange={(e) => setVisitFreq(Number(e.target.value))}
            />
          </div>
          <div className="toggle-row">
            <button
              type="button"
              className={`switch ${trialSim ? 'on' : ''}`}
              onClick={() => setTrialSim((v) => !v)}
              aria-pressed={trialSim}
              aria-label="Toggle trial cost simulator"
            />
            <span>With trial cost simulator (assumes ~12% net OOP reduction while enrolled)</span>
          </div>
          <div className="hero-stat" style={{ marginTop: '0.5rem' }}>
            <span className="big">${adjusted.toLocaleString()}</span>
            <span className="lbl">modeled monthly total</span>
          </div>
        </div>

        <div className="card">
          <h3>Health cost risk score</h3>
          <div className="risk-gauge">
            <span className="gauge-val">{riskScore}</span>
            <span className="gauge-lbl">
              Blends pharmacy trend velocity, visit load, insurance share growth, and (optionally) trial
              offset. Higher means more budget stress ahead.
            </span>
          </div>
        </div>
      </div>

      <div className="finance-grid" style={{ marginTop: '1rem' }}>
        <div className="card">
          <h3>Spending breakdown</h3>
          <p style={{ margin: '0 0 0.75rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            Pharmacists, visits (rolled into rows), and insurance payments — monthly estimates.
          </p>
          <table className="spending-table">
            <thead>
              <tr>
                <th>Category</th>
                <th className="num">/mo</th>
                <th className="num">YoY</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_SPENDING.map((row) => (
                <tr key={row.label}>
                  <td>{row.label}</td>
                  <td className="num">${row.monthly}</td>
                  <td className={`num ${row.yoyChangePct >= 0 ? 'up' : 'down'}`}>
                    {row.yoyChangePct >= 0 ? '+' : ''}
                    {row.yoyChangePct}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="card">
          <h3>Spending trends</h3>
          <p style={{ margin: '0 0 0.5rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            You vs regional benchmark (illustrative).
          </p>
          <div className="trend-chart" role="img" aria-label="Six month spending trend chart">
            {TREND_MONTHS.map((row) => (
              <div key={row.m} className="trend-col">
                <div className="trend-bars">
                  <span
                    className="you"
                    style={{ height: `${(row.you / maxTrend) * 100}%` }}
                    title={`You ${row.you}`}
                  />
                  <span
                    className="bench"
                    style={{ height: `${(row.bench / maxTrend) * 100}%` }}
                    title={`Benchmark ${row.bench}`}
                  />
                </div>
                <label>{row.m}</label>
              </div>
            ))}
          </div>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
            <span style={{ color: 'var(--accent-finance)' }}>■</span> you &nbsp;
            <span style={{ color: 'rgba(139,152,168,0.5)' }}>■</span> benchmark
          </div>
        </div>
      </div>

      <div className="card" style={{ marginTop: '1rem' }}>
        <h3>Budget optimization tool</h3>
        <p style={{ margin: '0 0 0.75rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          Suggestions ranked by estimated savings and friction. Trial enrollment appears when the simulator
          is on.
        </p>
        <ul className="budget-list">
          <li>
            <div>
              <strong>90-day fills for maintenance meds</strong>
              <span className="why">Pharmacy line down ~8% in models with mail-order tier.</span>
            </div>
            <span style={{ fontFamily: 'var(--mono)', color: 'var(--accent-trial)' }}>~$42/mo</span>
          </li>
          <li>
            <div>
              <strong>FSHCP / specialist bundling</strong>
              <span className="why">Fewer duplicate labs when PCP and derm share health system.</span>
            </div>
            <span style={{ fontFamily: 'var(--mono)', color: 'var(--accent-trial)' }}>~$28/mo</span>
          </li>
          {trialSim && (
            <li>
              <div>
                <strong>Enroll in nearby dermatology Phase III</strong>
                <span className="why">Study covers visits + drug arm; offset modeled in simulator.</span>
              </div>
              <span style={{ fontFamily: 'var(--mono)', color: 'var(--accent-finance)' }}>scenario</span>
            </li>
          )}
        </ul>
      </div>
    </>
  )
}
