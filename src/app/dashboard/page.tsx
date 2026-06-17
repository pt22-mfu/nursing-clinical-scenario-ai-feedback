/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type ScenarioStatus = 'demo-ready' | 'not-implemented'

type TestType = 'practice' | 'graded'

type TestSlot = {
  id: string
  testType: TestType
  scenarioName?: string
  status: ScenarioStatus
  scenarioId?: string
  description: string
}

type SystemSection = {
  id: string
  name: string
  description?: string
  slots: [TestSlot, TestSlot]
}

// ---------------------------------------------------------------------------
// Curriculum data — exactly 4 systems, 2 tests per system
// ---------------------------------------------------------------------------

const DEMO_SCENARIO_ID = 'back-pain-scenario-001'

const curriculum: SystemSection[] = [
  {
    id: 'musculoskeletal-system',
    name: 'Musculoskeletal System',
    description: 'Primary Medical Care in Bone, joint, muscle, and movement',
    slots: [
      {
        id: 'musculoskeletal-practice',
        testType: 'practice',
        scenarioName: 'Acute Lower Back Pain',
        status: 'demo-ready',
        scenarioId: DEMO_SCENARIO_ID,
        description:
          'A guided practice walkthrough of the Acute Lower Back Pain scenario. Use this to familiarise yourself with the assessment format before attempting the graded test.',
      },
      {
        id: 'musculoskeletal-graded',
        testType: 'graded',
        scenarioName: 'Acute Lower Back Pain',
        status: 'demo-ready',
        scenarioId: DEMO_SCENARIO_ID,
        description:
          'Submit your clinical assessment for AI-assisted feedback. Your responses will be evaluated against evidence-based nursing criteria.',
      },
    ],
  },
  {
    id: 'system-2',
    name: 'System 2',
    slots: [
      {
        id: 'system-2-practice',
        testType: 'practice',
        status: 'not-implemented',
        description:
          'Practice test content for this system will be available in a future release.',
      },
      {
        id: 'system-2-graded',
        testType: 'graded',
        status: 'not-implemented',
        description:
          'Graded test content for this system will be available in a future release.',
      },
    ],
  },
  {
    id: 'system-3',
    name: 'System 3',
    slots: [
      {
        id: 'system-3-practice',
        testType: 'practice',
        status: 'not-implemented',
        description:
          'Practice test content for this system will be available in a future release.',
      },
      {
        id: 'system-3-graded',
        testType: 'graded',
        status: 'not-implemented',
        description:
          'Graded test content for this system will be available in a future release.',
      },
    ],
  },
  {
    id: 'system-4',
    name: 'System 4',
    slots: [
      {
        id: 'system-4-practice',
        testType: 'practice',
        status: 'not-implemented',
        description:
          'Practice test content for this system will be available in a future release.',
      },
      {
        id: 'system-4-graded',
        testType: 'graded',
        status: 'not-implemented',
        description:
          'Graded test content for this system will be available in a future release.',
      },
    ],
  },
]

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const MFU_LOGO_URL =
  'https://www.mfu.ac.th/fileadmin/_processed_/6/7/csm_logo_mfu_3d_colour_630b77d675.png'

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function StatusBadge({ status }: { status: ScenarioStatus }) {
  if (status === 'demo-ready') {
    return (
      <span className="inline-flex items-center rounded-full bg-[#0F5C6E] px-4 py-1.5 text-sm font-semibold text-white shadow-sm">
        Demo Ready
      </span>
    )
  }

  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-4 py-1.5 text-sm font-semibold text-amber-700 ring-1 ring-amber-200">
      <svg
        className="h-4 w-4 shrink-0"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <rect x="3" y="11" width="18" height="11" rx="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>

      Coming Soon
    </span>
  )
}

function AiFeedbackBadge() {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-violet-50 px-2.5 py-0.5 text-xs font-semibold text-violet-700 ring-1 ring-violet-200">
      <svg
        className="h-3 w-3 shrink-0"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M12 2a9 9 0 0 1 9 9c0 4.97-4.03 9-9 9S3 15.97 3 11 7.03 2 12 2z" />
        <path d="M12 8v4l3 3" />
      </svg>

      AI Feedback
    </span>
  )
}

function TestTypeLabel({ testType }: { testType: TestType }) {
  if (testType === 'practice') {
    return (
      <span className="inline-flex items-center gap-1 rounded-md bg-slate-100 px-2 py-0.5 text-xs font-semibold uppercase tracking-wide text-slate-600">
        Practice Test
      </span>
    )
  }

  return (
    <span className="inline-flex items-center gap-1 rounded-md bg-violet-50 px-2 py-0.5 text-xs font-semibold uppercase tracking-wide text-violet-700 ring-1 ring-violet-200">
      Graded Test
    </span>
  )
}

function ArrowIcon() {
  return (
    <svg
      className="h-4 w-4 shrink-0 transition-transform duration-200 group-hover:translate-x-1"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2.25}
        d="M13 7l5 5m0 0l-5 5m5-5H6"
      />
    </svg>
  )
}

// ---------------------------------------------------------------------------
// Main page
// ---------------------------------------------------------------------------

export default async function DashboardPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const studentId = user.email?.split('@')[0] || 'Unknown ID'

  return (
    <div className="flex min-h-screen flex-col bg-[#F3F4F6] font-sans text-slate-950">
      <header className="border-b border-slate-200 bg-white shadow-sm">
        <div className="mx-auto flex min-h-[108px] max-w-[1500px] items-center justify-between gap-5 px-5 pt-6 pb-8 sm:px-8 lg:px-10 lg:pt-8 lg:pb-10">
          <div className="flex min-w-0 items-center gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center sm:h-16 sm:w-16">
              <img
                src={MFU_LOGO_URL}
                alt="Mae Fah Luang University logo"
                className="h-full w-auto object-contain"
              />
            </div>

            <div className="h-12 w-px shrink-0 bg-[#B9442C]" />

            <div className="min-w-0">
              <p className="text-[15px] font-medium leading-tight text-[#9B1C1F]">
                Mae Fah Luang University
              </p>

              <h1 className="mt-1 text-[24px] font-semibold leading-none tracking-tight text-[#F5821F] sm:text-[30px]">
                School of Nursing
              </h1>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-4">
            <Link
              href="/dashboard/history"
              className="hidden items-center justify-center rounded-full bg-gradient-to-r from-[#F5821F] to-[#C65F16] px-5 py-2.5 text-sm font-bold tracking-wide text-white shadow-sm transition hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#F5821F] focus:ring-offset-2 sm:inline-flex"
            >
              Practice History
            </Link>

            <details className="group relative">
              <summary className="flex cursor-pointer list-none items-center gap-2 rounded-full border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-950 shadow-[0_8px_22px_rgba(15,23,42,0.12)] transition hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-[#F5821F] focus:ring-offset-2 sm:px-4">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#0F5C6E] text-white">
                  <svg
                    className="h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <circle cx="12" cy="8" r="4" />
                    <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
                  </svg>
                </span>

                <span className="hidden sm:inline">ID: {studentId}</span>
                <span className="sm:hidden">{studentId}</span>

                <svg
                  className="h-4 w-4 text-slate-700 transition group-open:rotate-180"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.25}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </summary>

              <div className="absolute right-0 top-full mt-3 w-56 rounded-2xl border border-slate-200 bg-white p-2 shadow-xl">
                <div className="border-b border-slate-100 px-3 py-3">
                  <p className="text-xs font-medium text-slate-600">
                    Signed in as
                  </p>

                  <p className="mt-1 truncate text-sm font-semibold text-slate-950">
                    {studentId}
                  </p>
                </div>

                <form action="/auth/signout" method="post" className="mt-2">
                  <button
                    type="submit"
                    className="flex w-full items-center justify-center rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#0F5C6E] focus:outline-none focus:ring-2 focus:ring-[#0F5C6E] focus:ring-offset-2"
                  >
                    Logout
                  </button>
                </form>
              </div>
            </details>
          </div>
        </div>

        <div className="bg-[#F5821F] py-6 shadow-md sm:py-8">
          <div className="mx-auto flex max-w-[1500px] flex-col justify-center px-5 sm:px-8 lg:px-10">
            <h2 className="text-xl font-bold leading-tight text-white sm:text-2xl">
              Clinical Nurse Learning Lab
            </h2>

            <p className="mt-1 text-sm text-white/90 sm:text-base">
              Four Primary Medical Care systems designed for guided practice, graded assessment, and AI-assisted feedback.
            </p>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-[1500px] flex-1 px-5 py-10 sm:px-8 lg:px-10 lg:py-14">
        <section>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-10">
            {curriculum.map((system) => (
              <section
                key={system.id}
                className="group flex flex-col overflow-hidden rounded-[24px] bg-white shadow-[0_18px_42px_rgba(15,23,42,0.10)] ring-1 ring-slate-200/90 transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_24px_56px_rgba(15,23,42,0.13)]"
              >
                <div className="relative flex-shrink-0 bg-white px-6 py-6 min-h-[140px]">
                  <div className="absolute inset-x-0 top-0 h-1.5 bg-[#F5821F]" />

                  <div className="pt-2">
                    <h3 className="text-xl font-bold text-[#C65F16]">
                      {system.name}
                    </h3>

                    {system.description && (
                      <p className="mt-2 text-base leading-6 text-slate-950">
                        {system.description}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid auto-rows-fr grid-cols-1 gap-3 bg-[#F7F8FA] p-5 flex-1">
                  {system.slots.map((slot) => {
                    const isDemoReady = slot.status === 'demo-ready'
                    const isGraded = slot.testType === 'graded'

                    const cardContent = (
                      <div
                        className={`flex h-full min-h-[260px] flex-col rounded-2xl p-5 transition ${
                          isDemoReady
                            ? 'ring-1 border-l-4 border-[#0F5C6E] bg-[#F0F7F9] ring-[#0F5C6E]/15 hover:shadow-[0_12px_30px_-4px_rgba(15,92,110,0.14)] hover:ring-[#0F5C6E]/30'
                            : 'bg-white/80 border border-dashed border-slate-300 opacity-65 hover:bg-slate-50/50'
                        }`}
                      >
                        <div className="flex flex-wrap items-start justify-between gap-3">
                          <div className="flex flex-wrap items-center gap-2">
                            <TestTypeLabel testType={slot.testType} />
                            {isGraded && <AiFeedbackBadge />}
                          </div>

                          {!isDemoReady && <StatusBadge status={slot.status} />}
                        </div>

                        {slot.scenarioName && (
                          <h4 className="mt-3 text-[18px] font-semibold font-sans antialiased leading-snug text-slate-900">
                            {slot.scenarioName}
                          </h4>
                        )}

                        <p className="mt-3 flex-1 text-sm leading-6 text-slate-500">
                          {slot.description}
                        </p>

                        {isDemoReady && (
                          <div className="mt-4 flex flex-col gap-3">
                            <div className="inline-flex items-center gap-2 self-start rounded-xl bg-[#0F5C6E] px-4 py-2.5 text-sm font-medium text-white shadow-sm transition group-hover:bg-[#0A4350]">
                              Start
                              <ArrowIcon />
                            </div>

                            {isGraded && (
                              <p className="text-xs leading-5 text-slate-400">
                                Time limit: 25 minutes. Progress is saved automatically when time expires.
                              </p>
                            )}
                          </div>
                        )}
                      </div>
                    )

                    if (isDemoReady && slot.scenarioId) {
                      return (
                        <Link
                          key={slot.id}
                          href={`/dashboard/scenario/${slot.scenarioId}`}
                          className="block h-full group"
                        >
                          {cardContent}
                        </Link>
                      )
                    }

                    return (
                      <div key={slot.id} className="h-full">
                        {cardContent}
                      </div>
                    )
                  })}
                </div>
              </section>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-[1500px] flex-col gap-2 px-5 py-5 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-10">
          <p>© 2026 School of Nursing, Mae Fah Luang University.</p>

          <p>
            Clinical Nurse Learning Lab &bull; Developed by{' '}
            <span className="font-semibold text-slate-700">MLii</span>
          </p>
        </div>
      </footer>
    </div>
  )
}
