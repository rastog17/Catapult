import type { AlertItem, ClinicalTrial, SpendingLine } from '../types'

const baseBreakdown = (
  scores: [string, number, number, string][]
): ClinicalTrial['breakdown'] =>
  scores.map(([label, weight, score, detail]) => ({
    label,
    weight,
    score,
    detail,
  }))

export const MOCK_TRIALS: ClinicalTrial[] = [
  {
    id: 't1',
    title: 'Novel JAK inhibitor for moderate-to-severe atopic dermatitis',
    phase: 'Phase III',
    sponsor: 'Northlake Therapeutics',
    location: 'Chicago, IL — Academic Medical Center',
    distanceMiles: 4.2,
    compensation: 'Stipend + travel',
    matchScore: 94,
    payRange: '$2,400–$3,800 total',
    condition: 'Atopic dermatitis',
    demographics: 'Ages 18–65, documented diagnosis ≥6 months, BSA 10–30%',
    requirements: [
      'Failed topical corticosteroid within 8 weeks',
      'No live vaccine in 30 days',
      'Willing to use contraception if applicable',
    ],
    aiSummary:
      'Strong fit: your documented treatment history and age band align with inclusion. Travel burden is low given site proximity. Discuss steroid washout timing with your clinician before screening.',
    riskDisclaimer:
      'Clinical trials involve investigational therapies. Benefits are not guaranteed; you may experience side effects or receive placebo if the design includes one. This summary is informational, not medical advice.',
    breakdown: baseBreakdown([
      ['Condition & history', 0.35, 98, 'ICD-10 match + prior biologic notes'],
      ['Geography', 0.2, 100, 'Within 15 miles of home ZIP'],
      ['Labs & vitals', 0.25, 88, 'Recent CBC within range'],
      ['Eligibility rules', 0.2, 92, 'No conflicting exclusions detected'],
    ]),
  },
  {
    id: 't2',
    title: 'Digital therapeutic + coaching for T2DM glycemic control',
    phase: 'Phase II',
    sponsor: 'Glucose Path Labs',
    location: 'Remote + quarterly site visit (Evanston)',
    distanceMiles: 12,
    compensation: 'Device stipend',
    matchScore: 81,
    payRange: '$600 stipend',
    condition: 'Type 2 diabetes',
    demographics: 'Ages 30–70, HbA1c 7.5–10%, on stable metformin',
    requirements: ['Smartphone iOS 16+', 'CGM-capable if assigned'],
    aiSummary:
      'Moderate-high fit: remote-first reduces friction. Your pharmacy history shows stable metformin—good for wash-in. Confirm latest HbA1c date in records.',
    riskDisclaimer:
      'Digital and behavioral interventions may not replace prescribed care. Always coordinate with your prescribing clinician before changing medications or devices.',
    breakdown: baseBreakdown([
      ['Condition & history', 0.35, 85, 'T2DM on metformin, no recent DKA'],
      ['Geography', 0.2, 70, 'Quarterly visits feasible'],
      ['Labs & vitals', 0.25, 78, 'HbA1c window needs confirmation'],
      ['Eligibility rules', 0.2, 90, 'Tech requirements satisfied'],
    ]),
  },
  {
    id: 't3',
    title: 'Postpartum depression: rapid-acting oral compound',
    phase: 'Phase IIb',
    sponsor: 'Harbor Psychiatry Consortium',
    location: 'Oak Park, IL',
    distanceMiles: 7,
    compensation: 'Per visit + childcare stipend',
    matchScore: 72,
    payRange: '$1,100–$2,000',
    condition: 'Postpartum depression',
    demographics: 'Within 12 months delivery, EPDS screening eligible',
    requirements: ['Stable housing', 'Support person on call for visits'],
    aiSummary:
      'Emerging fit: timeline-sensitive. If your delivery date is outside the enrollment window, score will drop—update profile dates to refine matching.',
    riskDisclaimer:
      'Mental health trials require careful monitoring. Crisis resources should remain available; trial participation is not emergency care.',
    breakdown: baseBreakdown([
      ['Condition & history', 0.35, 80, 'Self-report + screening tool'],
      ['Geography', 0.2, 85, 'Moderate commute'],
      ['Labs & vitals', 0.25, 55, 'Limited recent labs on file'],
      ['Eligibility rules', 0.2, 68, 'Childcare logistics TBD'],
    ]),
  },
  {
    id: 't4',
    title: 'Migraine prevention: CGRP pathway monoclonal antibody',
    phase: 'Phase IV',
    sponsor: 'Summit Neuroscience',
    location: 'Downtown Chicago',
    distanceMiles: 2.1,
    compensation: 'Study drug + parking',
    matchScore: 88,
    payRange: 'No cash; drug provided',
    condition: 'Chronic migraine',
    demographics: '≥15 headache days/mo, failed 2 prior prophylactics',
    requirements: ['Headache diary 28 days', 'MRI within 24 months or screening'],
    aiSummary:
      'Strong geographic and symptomatic alignment. Diary compliance is the main lift—your app usage patterns suggest you will tolerate digital logging.',
    riskDisclaimer:
      'Biologics may affect immune response. Infection history and vaccination status must be reviewed by the site physician.',
    breakdown: baseBreakdown([
      ['Condition & history', 0.35, 92, 'Diary-compatible headache pattern'],
      ['Geography', 0.2, 100, 'Very close site'],
      ['Labs & vitals', 0.25, 82, 'LFTs within normal on last draw'],
      ['Eligibility rules', 0.2, 78, 'Prior prophylactic count needs chart review'],
    ]),
  },
]

export function moreTrials(offset: number): ClinicalTrial[] {
  const clones = MOCK_TRIALS.map((t, i) => ({
    ...t,
    id: `${t.id}-d${offset}-${i}`,
    matchScore: Math.max(55, Math.min(99, t.matchScore + ((offset + i) % 5) - 2)),
    distanceMiles: Math.round((t.distanceMiles + offset * 0.3) * 10) / 10,
  }))
  return clones
}

export const MOCK_ALERTS: AlertItem[] = [
  {
    id: 'a1',
    type: 'trial',
    title: 'New trial within 5 miles',
    body: 'Dermatology Phase III — match updated to 94%',
    time: '2h ago',
  },
  {
    id: 'a2',
    type: 'cost',
    title: 'Rx refill price spike',
    body: 'Maintenance inhaler up 18% vs last quarter',
    time: 'Yesterday',
  },
  {
    id: 'a3',
    type: 'reminder',
    title: 'Budget check-in',
    body: 'You are 12% over care budget with 9 days left',
    time: 'Mon',
  },
]

export const MOCK_SPENDING: SpendingLine[] = [
  { label: 'Primary care & specialists', monthly: 185, yoyChangePct: 8 },
  { label: 'Pharmacy (recurring)', monthly: 312, yoyChangePct: 22 },
  { label: 'Insurance (your share)', monthly: 428, yoyChangePct: 4 },
  { label: 'Labs & imaging', monthly: 96, yoyChangePct: -3 },
]

export const TREND_MONTHS = [
  { m: 'Oct', you: 920, bench: 880 },
  { m: 'Nov', you: 940, bench: 890 },
  { m: 'Dec', you: 1010, bench: 900 },
  { m: 'Jan', you: 1050, bench: 910 },
  { m: 'Feb', you: 1120, bench: 920 },
  { m: 'Mar', you: 1188, bench: 930 },
]
