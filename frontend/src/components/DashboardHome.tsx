export function DashboardHome() {
  return (
    <>
      <h1 className="page-title">Care cost &amp; trials, together</h1>
      <p className="page-sub">
        Your finances are not only about spending. Healthcare is one of the largest financial risks most
        households face. FutureCash Health forecasts where costs are heading and surfaces clinical trials that may
        offset out-of-pocket spend or provide study-related care.
      </p>

      <div className="hero-dual">
        <section className="hero-insight">
          <h2>Financial forecasting</h2>
          <p>
            Model pharmacy, visits, and insurance contribution. See a health cost risk score, trends vs a
            benchmark, and optional &ldquo;what if you enroll&rdquo; trial scenarios.
          </p>
          <div className="hero-stat">
            <span className="big">$1,188</span>
            <span className="lbl">projected monthly care spend (next 90d)</span>
          </div>
          <div className="pill-row">
            <span className="pill">+22% pharmacy YoY</span>
            <span className="pill">risk score 67</span>
            <span className="pill">trial simulator off</span>
          </div>
        </section>
        <section className="hero-insight finance">
          <h2>Clinical trial discovery</h2>
          <p>
            Match scores break down eligibility, geography, labs, and protocol fit. AI summaries and
            disclaimers keep expectations clear; alerts flag new nearby studies.
          </p>
          <div className="hero-stat">
            <span className="big">4</span>
            <span className="lbl">high-match trials within 15 miles</span>
          </div>
          <div className="pill-row">
            <span className="pill">top match 94%</span>
            <span className="pill">doom scroll feed</span>
            <span className="pill">extract records → refine</span>
          </div>
        </section>
      </div>

      <div className="grid-2">
        <div className="card">
          <h3>How the loop works</h3>
          <p style={{ margin: 0, fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
            Connect or paste medical and pharmacy history to improve matching. The forecast engine learns
            recurring prescriptions and visit cadence. Toggle trial enrollment assumptions to see budget
            impact alongside the optimization suggestions panel.
          </p>
        </div>
        <div className="card">
          <h3>Not medical or financial advice</h3>
          <p style={{ margin: 0, fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
            Catapult is a decision-support prototype. Always consult licensed clinicians for care choices
            and a qualified professional for financial planning. Trial participation carries risks; sites
            make final eligibility determinations.
          </p>
        </div>
      </div>
    </>
  )
}
