import { useState } from 'react'
import type { ClinicalTrial } from './types'
import { MOCK_ALERTS } from './data/mock'
import { AlertsBar } from './components/AlertsBar'
import { DashboardHome } from './components/DashboardHome'
import { TrialDiscovery } from './components/TrialDiscovery'
import { TrialDrawer } from './components/TrialDrawer'
import { FinanceView } from './components/FinanceView'
import { ProfileView } from './components/ProfileView'

type Tab = 'home' | 'trials' | 'finance' | 'profile'

export default function App() {
  const [tab, setTab] = useState<Tab>('home')
  const [selected, setSelected] = useState<ClinicalTrial | null>(null)

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <span className="brand-mark">Catapult</span>
          <span className="brand-tag">
            Forecast healthcare spend · discover trials that may offset it
          </span>
        </div>
        <nav className="nav-group" aria-label="Primary">
          <button
            type="button"
            className={`nav-btn ${tab === 'home' ? 'active' : ''}`}
            onClick={() => setTab('home')}
          >
            <span className="dot home" aria-hidden />
            Overview
          </button>
          <button
            type="button"
            className={`nav-btn ${tab === 'trials' ? 'active' : ''}`}
            onClick={() => setTab('trials')}
          >
            <span className="dot trial" aria-hidden />
            Trials
          </button>
          <button
            type="button"
            className={`nav-btn ${tab === 'finance' ? 'active' : ''}`}
            onClick={() => setTab('finance')}
          >
            <span className="dot finance" aria-hidden />
            Forecast
          </button>
          <button
            type="button"
            className={`nav-btn ${tab === 'profile' ? 'active' : ''}`}
            onClick={() => setTab('profile')}
          >
            <span className="dot profile" aria-hidden />
            Health profile
          </button>
        </nav>
        <p className="sidebar-foot">
          Prototype UI for hackathon demo. No PHI is stored; mock data only.
        </p>
      </aside>

      <main className="main">
        {tab === 'home' && (
          <>
            <AlertsBar items={MOCK_ALERTS} />
            <DashboardHome />
          </>
        )}
        {tab === 'trials' && (
          <>
            <AlertsBar items={MOCK_ALERTS} />
            <TrialDiscovery onSelect={setSelected} />
          </>
        )}
        {tab === 'finance' && <FinanceView />}
        {tab === 'profile' && <ProfileView />}
      </main>

      <TrialDrawer trial={selected} onClose={() => setSelected(null)} />
    </div>
  )
}
