export type TrialMatchBreakdown = {
  label: string
  weight: number
  score: number
  detail: string
}

export type ClinicalTrial = {
  id: string
  title: string
  phase: string
  sponsor: string
  location: string
  distanceMiles: number
  compensation: string
  matchScore: number
  breakdown: TrialMatchBreakdown[]
  aiSummary: string
  riskDisclaimer: string
  demographics: string
  requirements: string[]
  condition: string
  payRange?: string
}

export type AlertItem = {
  id: string
  type: 'trial' | 'cost' | 'reminder'
  title: string
  body: string
  time: string
}

export type SpendingLine = {
  label: string
  monthly: number
  yoyChangePct: number
}
