import Link from 'next/link'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

export const metadata = {
  title: 'Practice History - School of Nursing',
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
        <div className="mx-auto flex max-w-[1000px] flex-col justify-between gap-4 px-5 py-6 sm:flex-row sm:items-center sm:px-8 lg:px-10">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-[#173B63] sm:text-3xl">
              Practice History
            </h1>
            <p className="mt-1.5 text-sm font-medium text-slate-500">
              Review your completed clinical scenario practice attempts.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 hover:text-slate-900"
            >
              <span aria-hidden="true">&larr;</span>
              Back to Dashboard
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-[1000px] flex-1 px-5 py-10 sm:px-8 lg:px-10 lg:py-12">
        <section className="overflow-hidden rounded-[24px] bg-white p-8 text-center shadow-sm ring-1 ring-slate-200 sm:p-12">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-slate-50">
            <svg
              className="h-10 w-10 text-slate-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>

          <h2 className="mt-6 text-xl font-bold text-slate-900">
            No practice history yet.
          </h2>
          <p className="mx-auto mt-3 max-w-md text-[15px] leading-relaxed text-slate-500">
            Completed clinical scenario attempts will appear here after students
            complete scenario practice.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center rounded-xl bg-slate-100 px-6 py-3.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-200 active:scale-[0.98]"
            >
              Back to Dashboard
            </Link>
          </div>
        </section>

        {/* Future records layout placeholder */}
        <section className="mt-12 rounded-2xl border border-dashed border-slate-300 p-6 opacity-60">
          <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
            Future records preview (Placeholder)
          </p>
          <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
            <div className="grid grid-cols-4 border-b border-slate-100 bg-slate-50 px-6 py-3 text-xs font-semibold uppercase text-slate-500">
              <div className="col-span-2">Scenario</div>
              <div>Status</div>
              <div>Last Practiced</div>
            </div>
            <div className="flex items-center justify-center py-8 text-sm text-slate-400">
              Data structure ready for future evaluator integration.
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
