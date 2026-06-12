import Link from 'next/link'
import { notFound, redirect } from 'next/navigation'
import ScenarioStepPractice from './ScenarioStepPractice'
import prisma from '@/utils/prisma'
import { createClient } from '@/utils/supabase/server'

export default async function AssessmentPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const resolvedParams = await params
  const scenarioId = resolvedParams.id

  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const scenario = await prisma.scenario.findUnique({
    where: {
      id: scenarioId,
    },
  })

  if (!scenario) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-[#f5f2ef] font-sans text-slate-950">
      <header className="border-b border-orange-100 bg-white">
        <div className="mx-auto flex h-14 w-full max-w-[560px] items-center justify-between px-4">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 text-sm font-bold text-[#ef6c13] transition hover:text-[#c74f08]"
          >
            <span aria-hidden="true">←</span>
            Back to Dashboard
          </Link>

          <p className="max-w-[220px] truncate text-right text-sm font-bold text-slate-800">
            {scenario.title}
          </p>
        </div>
      </header>

      <main className="mx-auto w-full max-w-[560px] bg-white shadow-sm">
        <ScenarioStepPractice scenarioId={scenario.id} />
      </main>
    </div>
  )
}