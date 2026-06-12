/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

type ScenarioStatus = 'demo-ready' | 'not-implemented'

type PlannedScenarioSlot = {
  slotId: string
  label: string
  title?: string
  status: ScenarioStatus
  scenarioId?: string
  description: string
}

type BodySystemSection = {
  moduleNumber: number
  name: string
  subtitle: string
  slots: PlannedScenarioSlot[]
}

const plannedCurriculum: BodySystemSection[] = [
  {
    moduleNumber: 1,
    name: 'Primary Medical Care in EENT',
    subtitle: 'Ear, eye, nose, and throat',
    slots: [
      {
        slotId: 'eent-01',
        label: 'Case 1',
        status: 'not-implemented',
        description: 'Reserved for validated EENT clinical scenario content.',
      },
      {
        slotId: 'eent-02',
        label: 'Case 2',
        status: 'not-implemented',
        description: 'Reserved for validated EENT clinical scenario content.',
      },
    ],
  },
  {
    moduleNumber: 2,
    name: 'Primary Medical Care in Respiratory system',
    subtitle: 'Respiratory and pulmonary conditions',
    slots: [
      {
        slotId: 'resp-01',
        label: 'Case 1',
        status: 'not-implemented',
        description: 'Reserved for validated respiratory clinical scenario content.',
      },
      {
        slotId: 'resp-02',
        label: 'Case 2',
        status: 'not-implemented',
        description: 'Reserved for validated respiratory clinical scenario content.',
      },
    ],
  },
  {
    moduleNumber: 3,
    name: 'Primary Medical Care in GI system',
    subtitle: 'Gastrointestinal conditions',
    slots: [
      {
        slotId: 'gi-01',
        label: 'Case 1',
        status: 'not-implemented',
        description: 'Reserved for validated gastrointestinal clinical scenario content.',
      },
      {
        slotId: 'gi-02',
        label: 'Case 2',
        status: 'not-implemented',
        description: 'Reserved for validated gastrointestinal clinical scenario content.',
      },
    ],
  },
  {
    moduleNumber: 4,
    name: 'Primary Medical Care in Musculoskeletal system',
    subtitle: 'Bone, joint, muscle, and movement',
    slots: [
      {
        slotId: 'msk-01',
        label: 'Case 1',
        title: 'Acute Lower Back Pain',
        status: 'demo-ready',
        scenarioId: 'back-pain-scenario-001',
        description: 'Validated demo scenario using the 10-step clinical checkpoint flow.',
      },
      {
        slotId: 'msk-02',
        label: 'Case 2',
        status: 'not-implemented',
        description: 'Reserved for the second validated musculoskeletal scenario.',
      },
    ],
  },
  {
    moduleNumber: 5,
    name: 'Primary Medical Care in Urinary and Reproductive system',
    subtitle: 'Urinary and reproductive health',
    slots: [
      {
        slotId: 'ur-01',
        label: 'Case 1',
        status: 'not-implemented',
        description: 'Reserved for validated urinary or reproductive clinical scenario content.',
      },
      {
        slotId: 'ur-02',
        label: 'Case 2',
        status: 'not-implemented',
        description: 'Reserved for validated urinary or reproductive clinical scenario content.',
      },
    ],
  },
  {
    moduleNumber: 6,
    name: 'Primary Medical Care in Fever and Skin condition',
    subtitle: 'Fever and skin conditions',
    slots: [
      {
        slotId: 'fs-01',
        label: 'Case 1',
        status: 'not-implemented',
        description: 'Reserved for validated fever or skin condition clinical scenario content.',
      },
      {
        slotId: 'fs-02',
        label: 'Case 2',
        status: 'not-implemented',
        description: 'Reserved for validated fever or skin condition clinical scenario content.',
      },
    ],
  },
]

const MFU_LOGO_URL =
  'https://www.mfu.ac.th/fileadmin/_processed_/6/7/csm_logo_mfu_3d_colour_630b77d675.png'

function StatusBadge({ status }: { status: ScenarioStatus }) {
  if (status === 'demo-ready') {
    return (
      <span className="inline-flex items-center rounded-full bg-[#173B63] px-3 py-1 text-xs font-semibold text-white shadow-sm">
        Demo Ready
      </span>
    )
  }

  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-500">
      <svg className="h-3 w-3 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="11" width="18" height="11" rx="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
      Coming Soon
    </span>
  )
}




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
              <img src={MFU_LOGO_URL} alt="Mae Fah Luang University logo" className="h-full w-auto object-contain" />
            </div>

            <div className="h-12 w-px shrink-0 bg-[#B9442C]" />

            <div className="min-w-0">
              <p className="text-[15px] font-medium leading-tight text-[#9B1C1F]">
                มหาวิทยาลัยแม่ฟ้าหลวง
              </p>
              <h1 className="mt-1 text-[24px] font-semibold leading-none tracking-tight text-[#F5821F] sm:text-[30px]">
                สำนักวิชาพยาบาลศาสตร์
              </h1>
              <p className="mt-1.5 text-xs font-semibold uppercase tracking-widest text-[#9B1C1F] sm:text-[13px]">
                School of Nursing | Mae Fah Luang University
              </p>
            </div>
          </div>

          <details className="group relative shrink-0">
            <summary className="flex cursor-pointer list-none items-center gap-2 rounded-full border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-950 shadow-[0_8px_22px_rgba(15,23,42,0.12)] transition hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-[#F5821F] focus:ring-offset-2 sm:px-4">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#173B63] text-white">
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.25} d="M19 9l-7 7-7-7" />
              </svg>
            </summary>

            <div className="absolute right-0 top-full mt-3 w-56 rounded-2xl border border-slate-200 bg-white p-2 shadow-xl">
              <div className="border-b border-slate-100 px-3 py-3">
                <p className="text-xs font-medium text-slate-600">Signed in as</p>
                <p className="mt-1 truncate text-sm font-semibold text-slate-950">{studentId}</p>
              </div>

              <form action="/auth/signout" method="post" className="mt-2">
                <button
                  type="submit"
                  className="flex w-full items-center justify-center rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#173B63] focus:outline-none focus:ring-2 focus:ring-[#173B63] focus:ring-offset-2"
                >
                  Logout
                </button>
              </form>
            </div>
          </details>
        </div>

        <div className="bg-[#F5821F] py-6 shadow-md sm:py-8">
          <div className="mx-auto flex max-w-[1500px] flex-col justify-center px-5 sm:px-8 lg:px-10">
            <h2 className="text-xl font-bold leading-tight text-white sm:text-2xl">
              12 Clinical Scenario Cases
            </h2>
            <p className="mt-1 text-sm text-white/90 sm:text-base">
              Six Primary Medical Care modules. Each module contains two clinical scenario cases.
            </p>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-[1500px] flex-1 px-5 py-10 sm:px-8 lg:px-10 lg:py-14">
        <section>
          <div className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between lg:mb-12">
            <div>
              <p className="inline-flex items-center gap-2.5 text-sm font-semibold uppercase tracking-wider text-[#C65F16]">
                <span className="h-4 w-1 rounded-full bg-[#F5821F]" />
                Curriculum Structure
              </p>

              {/* Availability summary stats */}
              <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
                <span className="flex items-center gap-1.5 font-semibold text-[#173B63]">
                  <span className="inline-block h-2 w-2 rounded-full bg-[#173B63]" />
                  1 Available Now
                </span>
                <span className="text-slate-300" aria-hidden="true">|</span>
                <span className="flex items-center gap-1.5 font-medium text-slate-400">
                  <span className="inline-block h-2 w-2 rounded-full bg-slate-300" />
                  11 Coming Soon
                </span>
                <span className="text-slate-300" aria-hidden="true">|</span>
                <span className="flex items-center gap-1.5 font-medium text-slate-500">
                  <span className="inline-block h-2 w-2 rounded-full bg-slate-400" />
                  6 Modules
                </span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <StatusBadge status="demo-ready" />
              <StatusBadge status="not-implemented" />
            </div>
          </div>

          <div className="space-y-10 lg:space-y-12">
            {([plannedCurriculum.slice(0, 3), plannedCurriculum.slice(3, 6)] as typeof plannedCurriculum[]).map((band, bandIndex) => (
              <div
                key={bandIndex}
                className="space-y-10 md:grid md:grid-cols-2 md:gap-x-8 md:space-y-0 xl:grid-cols-3 xl:gap-x-10"
              >
                {band.map((section) => (
                  <section
                    key={section.name}
                    className="group flex flex-col overflow-hidden rounded-[24px] bg-white shadow-[0_18px_42px_rgba(15,23,42,0.10)] ring-1 ring-slate-200/90 transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_24px_56px_rgba(15,23,42,0.13)] xl:row-span-2 xl:grid xl:[grid-template-rows:subgrid] xl:gap-0"
                  >
                    {/* Header — mapped to band row 1 via subgrid; all headers in the band share this row height */}
                    <div className="relative min-h-[148px] flex-shrink-0 bg-white px-6 py-6">
                      <div className="absolute inset-x-0 top-0 h-1.5 bg-[#F5821F]" />
                      <div className="flex items-start justify-between gap-4 pt-2">
                        <div className="min-w-0">
                          <p className="text-base font-bold text-[#C65F16]">Module {section.moduleNumber}</p>
                          <h3 className="mt-2 text-[21px] font-semibold leading-snug text-slate-950">
                            {section.name}
                          </h3>
                          <p className="mt-2 text-base leading-6 text-slate-950">{section.subtitle}</p>
                        </div>
                        <span className="inline-flex shrink-0 items-center rounded-full bg-[#E9EAEC] px-3 py-1 text-xs font-semibold text-slate-900">
                          2 Cases
                        </span>
                      </div>
                    </div>

                    {/* Slot area — mapped to band row 2 via subgrid; always starts at the same height as siblings */}
                    <div className="grid auto-rows-fr grid-cols-1 gap-3 bg-[#F7F8FA] p-5">
                      {section.slots.map((slot) => {
                        const isDemoReady = slot.status === 'demo-ready'

                        const content = (
                          <div
                            className={`flex h-full min-h-[200px] flex-col rounded-2xl p-5 ring-1 transition ${isDemoReady
                              ? 'border-l-4 border-[#173B63] bg-[#F8FBFF] ring-[#173B63]/15 hover:shadow-md'
                              : 'bg-white ring-slate-200 hover:bg-[#FCFCFD]'
                              }`}
                          >
                            <div className="flex items-start justify-between gap-3">
                              <div className="min-w-0">
                                <h4 className="text-[16px] font-semibold leading-snug text-slate-900">
                                  {slot.title ? slot.title : slot.label}
                                </h4>
                                {slot.title ? (
                                  <p className="mt-0.5 text-sm text-slate-500">{slot.label}</p>
                                ) : null}
                              </div>
                              <StatusBadge status={slot.status} />
                            </div>

                            <p className="mt-3 flex-1 text-sm leading-6 text-slate-500">{slot.description}</p>

                            {isDemoReady ? (
                              <div className="mt-4 inline-flex items-center gap-2 self-start rounded-xl bg-[#173B63] px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-[#0F2A47]">
                                Open 10-step practice
                                <svg
                                  className="h-4 w-4"
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
                              </div>
                            ) : null}
                          </div>
                        )

                        if (isDemoReady && slot.scenarioId) {
                          return (
                            <Link key={slot.slotId} href={`/dashboard/scenario/${slot.scenarioId}`} className="block">
                              {content}
                            </Link>
                          )
                        }

                        return <div key={slot.slotId}>{content}</div>
                      })}
                    </div>
                  </section>
                ))}
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-[1500px] flex-col gap-1 px-5 py-4 text-center text-sm text-black sm:flex-row sm:items-center sm:justify-between sm:text-left sm:px-8 lg:px-10">
          <p>© 2026 School of Nursing, Mae Fah Luang University.</p>
          <p>Web-Based Clinical Scenario with AI Feedback by <span className="font-semibold text-black">MLii</span></p>
        </div>
      </footer>
    </div>
  )
}