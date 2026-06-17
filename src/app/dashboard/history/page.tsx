/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

export const metadata = {
  title: 'Practice History - School of Nursing',
}

function PracticeTestIcon() {
  return (
    <svg
      className="h-7 w-7"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.8}
        d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
      />
    </svg>
  )
}

function GradedTestIcon() {
  return (
    <svg
      className="h-7 w-7"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.8}
        d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.456-2.456L14.25 6l1.035-.259a3.375 3.375 0 0 0 2.456-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456Z"
      />
    </svg>
  )
}

function ComparisonIcon() {
  return (
    <svg
      className="h-8 w-8"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.7}
        d="M7.5 14.25 10 11.75l2.25 2.25 4.25-5M6.75 19.5h10.5A2.25 2.25 0 0 0 19.5 17.25V6.75a2.25 2.25 0 0 0-2.25-2.25H6.75A2.25 2.25 0 0 0 4.5 6.75v10.5a2.25 2.25 0 0 0 2.25 2.25Z"
      />
    </svg>
  )
}

export default async function HistoryPage() {
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
        <div className="mx-auto flex min-h-[108px] w-full max-w-[1500px] items-center justify-between gap-5 px-5 pt-6 pb-8 sm:px-8 lg:px-10 lg:pt-8 lg:pb-10">
          <div className="flex min-w-0 items-center gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center sm:h-16 sm:w-16">
              <img
                src="https://www.mfu.ac.th/fileadmin/_processed_/6/7/csm_logo_mfu_3d_colour_630b77d675.png"
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

          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 bg-white px-3.5 py-2.5 text-xs font-semibold text-slate-700 shadow-sm transition hover:border-slate-400 hover:bg-slate-50 hover:text-slate-950 sm:px-5 sm:text-sm"
            >
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
                  strokeWidth={2}
                  d="m15 19-7-7 7-7"
                />
              </svg>
              <span className="hidden sm:inline">Back to Dashboard</span>
              <span className="sm:hidden">Dashboard</span>
            </Link>

            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 shadow-sm sm:px-4">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#0B7189] text-white">
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
                    strokeWidth={2}
                    d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                  />
                </svg>
              </div>

              <span className="hidden text-xs font-semibold text-slate-700 sm:inline">
                ID: {studentId}
              </span>

              <svg
                className="h-4 w-4 text-slate-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="m19 9-7 7-7-7"
                />
              </svg>
            </div>
          </div>
        </div>
      </header>

      <section className="bg-[#F5821F] py-6 shadow-md sm:py-8 text-white">
        <div className="mx-auto w-full max-w-[1500px] px-5 sm:px-8 lg:px-10">
          <h1 className="text-xl font-bold leading-tight text-white sm:text-2xl">
            Clinical Nurse Learning Lab Record
          </h1>

          <p className="mt-1 text-sm text-white/90 sm:text-base">
            Review your practice test and graded test results across completed
            clinical assessments.
          </p>
        </div>
      </section>

      <main className="mx-auto w-full max-w-[1500px] flex-1 px-5 py-8 sm:px-8 sm:py-10 lg:px-10 lg:py-12">
        <section className="grid grid-cols-1 gap-6">
          <article className="overflow-hidden rounded-[20px] border border-slate-200 bg-white shadow-[0_8px_24px_rgba(15,23,42,0.06)]">
            <div className="h-1.5 bg-[#0B7189]" />

            <div className="p-5 sm:p-7">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <span className="inline-flex rounded-md bg-slate-100 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-slate-600">
                    Practice Test
                  </span>

                  <h2 className="mt-3 text-xl font-bold text-slate-950">
                    Practice Test Score
                  </h2>

                  <p className="mt-2 max-w-lg text-sm leading-relaxed text-slate-500">
                    Results from completed practice tests will appear here.
                  </p>
                </div>

                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#E8F6F8] text-[#0B7189]">
                  <PracticeTestIcon />
                </div>
              </div>

              <div className="mt-7 flex min-h-[230px] flex-col items-center justify-center rounded-2xl border border-[#CFE8EC] bg-[#F3FAFB] px-5 py-9 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-[#0B7189] shadow-sm ring-1 ring-[#D7ECEF]">
                  <PracticeTestIcon />
                </div>

                <h3 className="mt-5 text-base font-bold text-slate-900">
                  No practice test result yet
                </h3>

                <p className="mt-2 max-w-sm text-sm leading-relaxed text-slate-500">
                  Complete a practice test to view your result.
                </p>
              </div>
            </div>
          </article>

          <article className="overflow-hidden rounded-[20px] border border-slate-200 bg-white shadow-[0_8px_24px_rgba(15,23,42,0.06)]">
            <div className="h-1.5 bg-[#7C3AED]" />

            <div className="p-5 sm:p-7">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex rounded-md bg-[#F1EAFE] px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-[#6D28D9]">
                      Graded Test
                    </span>

                    <span className="inline-flex items-center gap-1 rounded-full border border-[#DDD0FB] bg-[#F7F3FF] px-2.5 py-1 text-[11px] font-semibold text-[#6D28D9]">
                      <svg
                        className="h-3.5 w-3.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09Z"
                        />
                      </svg>
                      AI Feedback
                    </span>
                  </div>

                  <h2 className="mt-3 text-xl font-bold text-slate-950">
                    Graded Test Score
                  </h2>

                  <p className="mt-2 max-w-lg text-sm leading-relaxed text-slate-500">
                    Results from completed graded tests will appear here.
                  </p>
                </div>

                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#F2ECFF] text-[#7C3AED]">
                  <GradedTestIcon />
                </div>
              </div>

              <div className="mt-7 flex min-h-[230px] flex-col items-center justify-center rounded-2xl border border-[#DED3F7] bg-[#FAF8FF] px-5 py-9 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-[#7C3AED] shadow-sm ring-1 ring-[#E5DCF9]">
                  <GradedTestIcon />
                </div>

                <h3 className="mt-5 text-base font-bold text-slate-900">
                  No graded test result yet
                </h3>

                <p className="mt-2 max-w-sm text-sm leading-relaxed text-slate-500">
                  Complete a graded test to view your result and feedback.
                </p>
              </div>
            </div>
          </article>

          <article className="overflow-hidden rounded-[20px] border border-slate-200 bg-white shadow-[0_8px_24px_rgba(15,23,42,0.06)]">
            <div className="h-1.5 bg-gradient-to-r from-[#0B7189] to-[#7C3AED]" />

            <div className="p-5 sm:p-7">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <span className="inline-flex rounded-md bg-[#FFF0E4] px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-[#C75500]">
                    Result Comparison
                  </span>

                  <h2 className="mt-3 text-xl font-bold text-slate-950">
                    Practice and Graded Test Comparison
                  </h2>

                  <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-500">
                    Comparison will be available after both assessment results
                    are recorded.
                  </p>
                </div>

                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#FFF2E8] text-[#E96500]">
                  <ComparisonIcon />
                </div>
              </div>

              <div className="mt-7 rounded-2xl border border-slate-200 bg-slate-50 px-5 py-8 sm:px-8 sm:py-10">
                <div className="mx-auto grid max-w-4xl grid-cols-1 items-stretch gap-4 md:grid-cols-[1fr_auto_1fr] md:gap-6">
                  <div className="flex min-h-[150px] flex-col items-center justify-center rounded-2xl border border-[#CFE8EC] bg-white px-5 py-6 text-center">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E8F6F8] text-[#0B7189]">
                      <PracticeTestIcon />
                    </span>

                    <p className="mt-4 text-xs font-bold uppercase tracking-wide text-[#0B7189]">
                      Practice Test
                    </p>

                    <p className="mt-1 text-sm text-slate-500">
                      Result not available
                    </p>
                  </div>

                  <div className="flex items-center justify-center">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-xs font-bold text-slate-400 shadow-sm">
                      VS
                    </div>
                  </div>

                  <div className="flex min-h-[150px] flex-col items-center justify-center rounded-2xl border border-[#DED3F7] bg-white px-5 py-6 text-center">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F2ECFF] text-[#7C3AED]">
                      <GradedTestIcon />
                    </span>

                    <p className="mt-4 text-xs font-bold uppercase tracking-wide text-[#6D28D9]">
                      Graded Test
                    </p>

                    <p className="mt-1 text-sm text-slate-500">
                      Result not available
                    </p>
                  </div>
                </div>

                <div className="mx-auto mt-7 max-w-xl text-center">
                  <h3 className="text-base font-bold text-slate-900">
                    Complete both assessments to compare your results
                  </h3>

                  <p className="mt-2 text-sm leading-relaxed text-slate-500">
                    Your completed assessment results will be presented together
                    in this section.
                  </p>
                </div>
              </div>
            </div>
          </article>
        </section>

        <div className="mt-8 flex justify-end">
          <Link
            href="/dashboard"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-slate-400 hover:bg-slate-50 hover:text-slate-950"
          >
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
                strokeWidth={2}
                d="m15 19-7-7 7-7"
              />
            </svg>
            <span>Back to Dashboard</span>
          </Link>
        </div>
      </main>

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto flex w-full max-w-[1500px] flex-col gap-2 px-5 py-5 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-10">
          <p>© 2026 School of Nursing, Mae Fah Luang University.</p>

          <p>
            Clinical Nurse Learning Lab with AI-feedback Developed by{' '}
            <span className="font-semibold text-slate-700">MLii</span>
          </p>
        </div>
      </footer>
    </div>
  )
}