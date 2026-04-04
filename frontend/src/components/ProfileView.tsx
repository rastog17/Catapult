import { useState } from 'react'

export function ProfileView() {
  const [busy, setBusy] = useState(false)

  return (
    <>
      <h1 className="page-title">Background &amp; medical data</h1>
      <p className="page-sub">
        Age, conditions, and treatment history sharpen trial matching and cost models. Extract structured
        fields from uploads or linked portals (prototype UI only).
      </p>

      <div className="profile-grid">
        <div className="card">
          <h3>Demographics &amp; vitals</h3>
          <div className="profile-grid" style={{ marginTop: '0.75rem' }}>
            <div className="field">
              <label htmlFor="age">Age</label>
              <input id="age" type="number" placeholder="e.g. 34" defaultValue={34} />
            </div>
            <div className="field">
              <label htmlFor="zip">Home ZIP</label>
              <input id="zip" type="text" placeholder="606xx" defaultValue="60614" />
            </div>
          </div>
          <div className="field" style={{ marginTop: '0.75rem' }}>
            <label htmlFor="conditions">Active conditions (comma-separated)</label>
            <input
              id="conditions"
              type="text"
              defaultValue="Atopic dermatitis, allergic rhinitis"
            />
          </div>
        </div>

        <div className="card">
          <h3>Treatments &amp; medications</h3>
          <div className="field">
            <label htmlFor="meds">Recurring prescriptions</label>
            <textarea
              id="meds"
              defaultValue="Triamcinolone cream 0.1%, cetirizine 10mg, albuterol PRN"
            />
          </div>
          <div className="field" style={{ marginTop: '0.75rem' }}>
            <label htmlFor="procedures">Recent procedures / hospitalizations</label>
            <textarea id="procedures" placeholder="Optional" />
          </div>
        </div>
      </div>

      <div className="card" style={{ marginTop: '1rem' }}>
        <h3>Extract medical data</h3>
        <p style={{ margin: '0 0 0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          Drop PDF exports, visit summaries, or connect EHR (mock). Parsed entities populate trials and
          forecast tabs after review.
        </p>
        <div className="extract-zone">
          <strong>Drag files here or choose upload</strong>
          Supports FHIR bulk export, Apple Health ZIP, or plain PDFs (demo).
          <div>
            <button
              type="button"
              className="btn-primary"
              disabled={busy}
              onClick={() => {
                setBusy(true)
                window.setTimeout(() => setBusy(false), 1200)
              }}
            >
              {busy ? 'Extracting…' : 'Simulate extraction'}
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
