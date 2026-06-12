'use client'

import Image from 'next/image'
import { useRef, useState } from 'react'

const TOTAL_STEPS = 10
const MAX_STEP_ANSWER_LENGTH = 2000
const BACK_PAIN_IMAGE_PATH = '/scenarios/back-pain/back-pain-clinical-scene.png'
const SCENARIO_TITLE = 'Acute Lower Back Pain'

type ScenarioStepPracticeProps = {
  scenarioId: string
}

type ScreenState = 'answering' | 'success' | 'completed'

type StepItem = {
  order: number
  title: string
  prompt: string
  feedback: string
}

const STEPS: StepItem[] = [
  {
    order: 1,
    title: 'Problem / Situation',
    prompt:
      'EN: You meet the patient in the OPD examination room. How would you greet the patient, introduce yourself, explain the purpose of the assessment, and confirm the patient’s identity?\n\nTH: คุณพบผู้ป่วยในห้องตรวจผู้ป่วยนอก คุณจะทักทายผู้ป่วย แนะนำตนเอง อธิบายวัตถุประสงค์ของการประเมิน และยืนยันตัวตนของผู้ป่วยอย่างไร?',
    feedback:
      'EN: This step should include greeting, self-introduction, purpose explanation, and patient identification before starting the assessment.\n\nTH: ขั้นตอนนี้ควรประกอบด้วยการทักทาย การแนะนำตนเอง การอธิบายวัตถุประสงค์ และการยืนยันตัวตนของผู้ป่วยก่อนเริ่มประเมิน',
  },
  {
    order: 2,
    title: 'Chief Complaint (CC)',
    prompt:
      'EN: What questions would you ask to identify the patient’s chief complaint and the duration of the symptom?\n\nTH: คุณจะถามคำถามใดเพื่อทราบอาการสำคัญที่ทำให้ผู้ป่วยมาโรงพยาบาล และระยะเวลาของอาการ?',
    feedback:
      'EN: The chief complaint should clearly identify the main reason the patient came to the hospital and how long the symptom has been present.\n\nTH: อาการสำคัญควรระบุเหตุผลหลักที่ทำให้ผู้ป่วยมาโรงพยาบาล และระยะเวลาที่มีอาการอย่างชัดเจน',
  },
  {
    order: 3,
    title: 'Present Illness (PI) using COLDSPA',
    prompt:
      'EN: Assess the patient’s present illness using the COLDSPA framework.\n\nTH: ซักประวัติการเจ็บป่วยปัจจุบันของผู้ป่วยโดยใช้หลัก COLDSPA',
    feedback:
      'EN: Present illness should cover Characteristic, Onset, Location, Duration, Severity, Pattern, and Associated symptoms.\n\nTH: การซักประวัติอาการปัจจุบันควรครอบคลุม Characteristic, Onset, Location, Duration, Severity, Pattern และ Associated symptoms',
  },
  {
    order: 4,
    title: 'Other Related History',
    prompt:
      'EN: What other related history would you ask about for this patient with back pain?\n\nTH: คุณควรถามประวัติอื่น ๆ ที่เกี่ยวข้องกับอาการปวดหลังของผู้ป่วยรายนี้อย่างไร?',
    feedback:
      'EN: Related history may include occupation, work posture, heavy lifting, injury, surgery, health behaviors, medication, allergy, and underlying diseases.\n\nTH: ประวัติที่เกี่ยวข้องอาจรวมถึงอาชีพ ท่าทางการทำงาน การยกของหนัก อุบัติเหตุ การผ่าตัด พฤติกรรมสุขภาพ การใช้ยา การแพ้ยา และโรคประจำตัว',
  },
  {
    order: 5,
    title: 'Review of System (ROS)',
    prompt:
      'EN: What review of systems should be asked for a patient presenting with back pain?\n\nTH: ควรถาม Review of System อะไรบ้างในผู้ป่วยที่มาด้วยอาการปวดหลัง?',
    feedback:
      'EN: ROS should include musculoskeletal, urinary, neurological, gastrointestinal, and other related red flag symptoms.\n\nTH: การทบทวนอาการตามระบบควรครอบคลุมระบบกระดูกและกล้ามเนื้อ ระบบปัสสาวะ ระบบประสาท ระบบทางเดินอาหาร และอาการอันตรายอื่น ๆ ที่เกี่ยวข้อง',
  },
  {
    order: 6,
    title: 'Physical Examination (PE)',
    prompt:
      'EN: Describe the physical examination findings or examination steps related to this patient’s back pain using appropriate technical terms.\n\nTH: อธิบายผลการตรวจร่างกายหรือขั้นตอนการตรวจที่เกี่ยวข้องกับอาการปวดหลังของผู้ป่วย โดยใช้คำศัพท์ทางเทคนิคที่เหมาะสม',
    feedback:
      'EN: Physical examination should include lumbar tenderness, muscle spasm, range of motion, neurological examination, straight leg raising test, and CVA tenderness when appropriate.\n\nTH: การตรวจร่างกายควรกล่าวถึง lumbar tenderness, muscle spasm, range of motion, neurological examination, straight leg raising test และ CVA tenderness ตามความเหมาะสม',
  },
  {
    order: 7,
    title: 'Differential Diagnosis',
    prompt:
      'EN: Identify three possible differential diagnoses, rank them by likelihood, and explain the reason for each diagnosis.\n\nTH: ระบุโรคที่เป็นไปได้ 3 โรค เรียงตามความเป็นไปได้ พร้อมอธิบายเหตุผลประกอบของแต่ละโรค',
    feedback:
      'EN: Differential diagnosis should include three possible conditions with clear clinical reasoning linked to the patient’s information.\n\nTH: การวินิจฉัยแยกโรคควรระบุโรคที่เป็นไปได้ 3 โรค พร้อมเหตุผลทางคลินิกที่เชื่อมโยงกับข้อมูลของผู้ป่วยอย่างชัดเจน',
  },
  {
    order: 8,
    title: 'Plan for Investigation',
    prompt:
      'EN: Plan appropriate investigations or laboratory tests for this patient and explain the reason for each investigation.\n\nTH: วางแผนการตรวจเพิ่มเติมหรือการตรวจทางห้องปฏิบัติการที่เหมาะสมสำหรับผู้ป่วยรายนี้ พร้อมอธิบายเหตุผล',
    feedback:
      'EN: Investigation planning should be linked to the differential diagnoses and should consider red flags, imaging needs, laboratory tests, and referral needs.\n\nTH: การวางแผนการตรวจเพิ่มเติมควรเชื่อมโยงกับการวินิจฉัยแยกโรค และพิจารณาสัญญาณอันตราย ความจำเป็นในการตรวจภาพถ่ายทางการแพทย์ การตรวจทางห้องปฏิบัติการ และการส่งต่อ',
  },
  {
    order: 9,
    title: 'Plan for Treatment',
    prompt:
      'EN: Propose an initial treatment plan for this patient with back pain.\n\nTH: วางแผนการรักษาเบื้องต้นสำหรับผู้ป่วยที่มีอาการปวดหลังรายนี้',
    feedback:
      'EN: Treatment planning should include pain management, non-pharmacological care, safety advice, follow-up, and referral criteria.\n\nTH: แผนการรักษาควรครอบคลุมการจัดการอาการปวด การดูแลแบบไม่ใช้ยา คำแนะนำด้านความปลอดภัย การติดตามอาการ และเกณฑ์การส่งต่อ',
  },
  {
    order: 10,
    title: 'Nursing Care / DMETHOD',
    prompt:
      'EN: Provide nursing care and patient education using the DMETHOD framework.\n\nTH: ให้คำแนะนำด้านการพยาบาลแก่ผู้ป่วยโดยใช้หลัก DMETHOD',
    feedback:
      'EN: Nursing care and patient education should cover Disease, Medication, Environment, Treatment, Health, Outpatient follow-up, and Diet.\n\nTH: การพยาบาลและการให้คำแนะนำผู้ป่วยควรครอบคลุม Disease, Medication, Environment, Treatment, Health, Outpatient follow-up และ Diet',
  },
]

type SpeechRecognitionAlternative = {
  transcript: string
}

type SpeechRecognitionResult = {
  0: SpeechRecognitionAlternative
}

type SpeechRecognitionResultList = {
  length: number
  item(index: number): SpeechRecognitionResult
  [index: number]: SpeechRecognitionResult
}

type SpeechRecognitionEvent = {
  results: SpeechRecognitionResultList
}

type SpeechRecognitionErrorEvent = {
  error: string
}

type SpeechRecognitionInstance = {
  continuous: boolean
  interimResults: boolean
  maxAlternatives: number
  lang: string
  onstart: (() => void) | null
  onresult: ((event: SpeechRecognitionEvent) => void) | null
  onerror: ((event: SpeechRecognitionErrorEvent) => void) | null
  onend: (() => void) | null
  start: () => void
  stop: () => void
}

type SpeechRecognitionConstructor = new () => SpeechRecognitionInstance

type WindowWithSpeechRecognition = Window & {
  SpeechRecognition?: SpeechRecognitionConstructor
  webkitSpeechRecognition?: SpeechRecognitionConstructor
}

function MicrophoneIcon({ size = 'md' }: { size?: 'sm' | 'md' }) {
  const cls = size === 'sm' ? 'h-5 w-5' : 'h-6 w-6'

  return (
    <svg className={cls} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 14.5a3 3 0 0 0 3-3v-5a3 3 0 0 0-6 0v5a3 3 0 0 0 3 3Z"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18.5 11.5a6.5 6.5 0 0 1-13 0M12 18v3M9 21h6"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function CheckCircleIcon() {
  return (
    <svg
      className="h-16 w-16"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" fill="#4ade80" opacity="0.15" />
      <circle cx="12" cy="12" r="10" stroke="#22c55e" strokeWidth="1.5" />
      <path
        d="M7.5 12.5l3 3 6-6"
        stroke="#22c55e"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function TrophyIcon() {
  return (
    <svg
      className="h-20 w-20"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M6 3h12M6 3c0 5 2 8 6 9M6 3H4a1 1 0 0 0-1 1v1c0 2.5 1.5 4.5 3 5.5M18 3c0 5-2 8-6 9M18 3h2a1 1 0 0 1 1 1v1c0 2.5-1.5 4.5-3 5.5M12 12v5M9 21h6M10 17h4"
        stroke="#55aa20"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function getTranscriptFromSpeechResults(results: SpeechRecognitionResultList) {
  const transcripts: string[] = []

  for (let index = 0; index < results.length; index += 1) {
    transcripts.push(results[index][0].transcript)
  }

  return transcripts.join(' ')
}

function getStep(order: number) {
  return STEPS.find((step) => step.order === order) ?? STEPS[0]
}

function StepDots({
  currentStep,
  completedUpTo,
}: {
  currentStep: number
  completedUpTo: number
}) {
  return (
    <div className="mb-3 flex items-center justify-center gap-2.5 px-4 sm:mb-4 sm:gap-3">
      {Array.from({ length: TOTAL_STEPS }).map((_, index) => {
        const stepNumber = index + 1
        const isActive = stepNumber === currentStep
        const isDone = stepNumber <= completedUpTo && stepNumber < currentStep

        return (
          <div
            key={stepNumber}
            className={`flex items-center justify-center rounded-full transition-all duration-300 ${
              isActive ? 'h-6 w-6 border-2 border-[#F5821F]' : 'h-6 w-6'
            }`}
            aria-label={`Step ${stepNumber}`}
          >
            <span
              className={`block rounded-full transition-all duration-300 ${
                isActive
                  ? 'h-2.5 w-2.5 bg-[#F5821F]'
                  : isDone
                    ? 'h-2.5 w-2.5 bg-[#F5821F]/60'
                    : 'h-2 w-2 bg-slate-200'
              }`}
            />
          </div>
        )
      })}
    </div>
  )
}

function StepBar({ step }: { step: StepItem }) {
  return (
    <div className="border-b border-slate-100 bg-white px-6 py-4 sm:px-8 sm:py-5">
      <div className="flex items-center gap-3">
        <span className="inline-flex items-center justify-center rounded-full bg-[#F5821F]/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#C65F16]">
          Step {step.order}
        </span>
        <h1 className="text-lg font-bold text-slate-900 sm:text-xl">
          {step.title}
        </h1>
      </div>
    </div>
  )
}

export default function ScenarioStepPractice({
  scenarioId,
}: ScenarioStepPracticeProps) {
  const [currentStepOrder, setCurrentStepOrder] = useState(1)
  const [highestCompleted, setHighestCompleted] = useState(0)
  const [answer, setAnswer] = useState('')
  const [screenState, setScreenState] = useState<ScreenState>('answering')
  const [isListening, setIsListening] = useState(false)
  const [speechError, setSpeechError] = useState('')

  const recognitionRef = useRef<SpeechRecognitionInstance | null>(null)

  const currentStep = getStep(currentStepOrder)
  const isLastStep = currentStepOrder === TOTAL_STEPS

  function resetForStep(stepOrder: number) {
    setCurrentStepOrder(stepOrder)
    setAnswer('')
    setScreenState('answering')
    setSpeechError('')
  }

  function handleSubmit() {
    if (!answer.trim()) {
      return
    }

    setScreenState('success')
  }

  function handleNext() {
    setHighestCompleted((prev) => Math.max(prev, currentStepOrder))

    if (isLastStep) {
      setScreenState('completed')
      setAnswer('')
      setSpeechError('')
      return
    }

    resetForStep(currentStepOrder + 1)
  }

  function handleTryAgain() {
    setAnswer('')
    setScreenState('answering')
    setSpeechError('')
  }

  function stopVoiceInput() {
    try {
      recognitionRef.current?.stop()
    } catch {
      // Ignore stop errors from browser speech recognition.
    }

    recognitionRef.current = null
    setIsListening(false)
  }

  function handleVoiceInput() {
    setSpeechError('')

    if (isListening) {
      stopVoiceInput()
      return
    }

    const speechWindow = window as WindowWithSpeechRecognition
    const SpeechRecognition =
      speechWindow.SpeechRecognition || speechWindow.webkitSpeechRecognition

    if (!SpeechRecognition) {
      setSpeechError(
        'EN: Voice input is not supported in this browser. Please type your answer instead.\nTH: เบราว์เซอร์นี้ไม่รองรับการป้อนคำตอบด้วยเสียง กรุณาพิมพ์คำตอบแทน',
      )
      return
    }

    const recognition = new SpeechRecognition()
    recognitionRef.current = recognition

    recognition.continuous = false
    recognition.interimResults = false
    recognition.maxAlternatives = 1
    recognition.lang = 'th-TH'

    recognition.onstart = () => {
      setIsListening(true)
    }

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      setSpeechError(
        `EN: Voice input stopped: ${event.error}\nTH: การป้อนคำตอบด้วยเสียงหยุดลง: ${event.error}`,
      )
      recognitionRef.current = null
      setIsListening(false)
    }

    recognition.onend = () => {
      recognitionRef.current = null
      setIsListening(false)
    }

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const transcript = getTranscriptFromSpeechResults(event.results)

      if (!transcript.trim()) {
        return
      }

      setAnswer((currentAnswer) => {
        const nextAnswer = currentAnswer
          ? `${currentAnswer.trim()} ${transcript.trim()}`
          : transcript.trim()

        return nextAnswer.slice(0, MAX_STEP_ANSWER_LENGTH)
      })
    }

    try {
      recognition.start()
    } catch {
      setSpeechError(
        'EN: Voice input could not start. Please try again or type your answer.\nTH: ไม่สามารถเริ่มการป้อนคำตอบด้วยเสียงได้ กรุณาลองอีกครั้งหรือพิมพ์คำตอบ',
      )
      recognitionRef.current = null
      setIsListening(false)
    }
  }

  if (screenState === 'completed') {
    return (
      <div className="min-h-[calc(100vh-3.5rem)] bg-slate-50 py-4 px-4 sm:py-6 sm:px-6 pb-8 sm:pb-12">
        <StepDots currentStep={10} completedUpTo={10} />

        <section
          data-scenario-id={scenarioId}
          className="mx-auto w-full max-w-3xl overflow-hidden rounded-[24px] bg-white shadow-[0_8px_30px_rgba(15,23,42,0.04)] ring-1 ring-slate-200"
        >

          <div className="border-b border-slate-100 bg-white px-6 py-4 sm:px-8 sm:py-5">
            <h1 className="text-center text-lg font-bold text-slate-900 sm:text-xl">
              Scenario Complete / ทำสถานการณ์เสร็จสิ้น
            </h1>
          </div>

          <div className="px-6 py-10 sm:px-10 sm:py-14">
            <div className="flex flex-col items-center text-center">
              <TrophyIcon />

              <h2 className="mt-6 text-3xl font-bold tracking-tight text-[#55aa20] sm:text-4xl">
                Congratulations!
              </h2>

              <p className="mt-2 text-xl font-bold text-[#55aa20] sm:text-2xl">
                ยินดีด้วย
              </p>

              <div className="mt-6 max-w-lg space-y-4 text-base font-medium leading-relaxed text-slate-600">
                <p>EN: You completed all 10 steps of this clinical scenario.</p>
                <p>TH: คุณทำครบทั้ง 10 ขั้นตอนของสถานการณ์ทางคลินิกนี้แล้ว</p>
              </div>

              <p className="mt-6 text-sm leading-6 text-slate-400">
                EN: Great work. Keep practicing to build your clinical confidence.
                <br />
                TH: ทำได้ดีมาก ฝึกต่อไปเพื่อเพิ่มความมั่นใจทางคลินิก
              </p>

              <div className="mt-10 flex w-full max-w-[280px] flex-col gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setHighestCompleted(0)
                    resetForStep(1)
                  }}
                  className="w-full rounded-2xl bg-[#F5821F] px-6 py-4 text-[15px] font-bold text-white shadow-sm transition hover:bg-[#C65F16] active:scale-[0.98]"
                >
                  Restart Scenario / เริ่มใหม่
                </button>

                <a
                  href="/dashboard"
                  className="w-full rounded-2xl bg-slate-100 px-6 py-4 text-center text-[15px] font-semibold text-slate-700 transition hover:bg-slate-200 active:scale-[0.98]"
                >
                  Back to Dashboard / กลับแดชบอร์ด
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    )
  }

  if (screenState === 'success') {
    return (
      <div className="min-h-[calc(100vh-3.5rem)] bg-slate-50 py-4 px-4 sm:py-6 sm:px-6 pb-8 sm:pb-12">
        <StepDots
          currentStep={currentStepOrder}
          completedUpTo={highestCompleted}
        />

        <section
          data-scenario-id={scenarioId}
          className="mx-auto w-full max-w-3xl overflow-hidden rounded-[24px] bg-white shadow-[0_8px_30px_rgba(15,23,42,0.04)] ring-1 ring-slate-200"
        >
          <StepBar step={currentStep} />

          <div className="px-6 py-8 sm:px-10 sm:py-10">
            <div className="flex flex-col items-center">
              {isLastStep ? <TrophyIcon /> : <CheckCircleIcon />}

              {isLastStep ? (
                <>
                  <h2 className="mt-5 text-center text-3xl font-bold tracking-tight text-[#55aa20] sm:text-4xl">
                    Congratulations!
                  </h2>
                  <p className="mt-2 text-center text-xl font-bold text-[#55aa20] sm:text-2xl">
                    ยินดีด้วย
                  </p>
                </>
              ) : (
                <h2 className="mt-5 text-center text-2xl font-bold tracking-tight text-[#55aa20] sm:text-3xl">
                  Step Completed.
                </h2>
              )}

              <div className="mt-4 max-w-lg space-y-3 text-center text-[15px] font-medium leading-relaxed text-slate-600">
                {isLastStep ? (
                  <p>Good job. You have successfully finished &ldquo;{SCENARIO_TITLE}&rdquo; clinical scenario.</p>
                ) : (
                  <>
                    <p>EN: Your answer has been submitted for this step.</p>
                    <p>TH: ส่งคำตอบของคุณสำหรับขั้นตอนนี้แล้ว</p>
                  </>
                )}
              </div>
            </div>

            <div className="mx-auto mt-8 w-full max-w-2xl rounded-[20px] border border-orange-100 bg-orange-50/50 p-6">
              <p className="text-xs font-bold uppercase tracking-wider text-[#C65F16]">
                Tip for improvement / คำแนะนำเพิ่มเติม
              </p>
              <p className="mt-3 whitespace-pre-line text-[15px] leading-relaxed text-slate-700">
                {currentStep.feedback}
              </p>
            </div>

            <div className="mx-auto mt-10 flex w-full max-w-sm flex-col items-center gap-3">
              <button
                type="button"
                onClick={handleNext}
                className="w-full rounded-2xl bg-[#F5821F] px-6 py-4 text-[15px] font-bold text-white shadow-sm transition hover:bg-[#C65F16] active:scale-[0.98]"
              >
                {isLastStep ? 'Finish / เสร็จสิ้น' : 'Next / ถัดไป'}
              </button>

              <button
                type="button"
                onClick={handleTryAgain}
                className="w-full rounded-2xl bg-slate-100 px-6 py-4 text-center text-[15px] font-semibold text-slate-700 transition hover:bg-slate-200 active:scale-[0.98]"
              >
                Try again / ลองอีกครั้ง
              </button>
            </div>
          </div>
        </section>
      </div>
    )
  }

  return (
    <div className="min-h-[calc(100vh-3.5rem)] bg-slate-50 py-4 px-4 sm:py-6 sm:px-6 pb-8 sm:pb-12">
      <StepDots currentStep={currentStepOrder} completedUpTo={highestCompleted} />

      <section
        data-scenario-id={scenarioId}
        className="mx-auto w-full max-w-3xl overflow-hidden rounded-[24px] bg-white shadow-[0_8px_30px_rgba(15,23,42,0.04)] ring-1 ring-slate-200"
      >

        <StepBar step={currentStep} />

        <div className="relative aspect-[16/9] w-full bg-[#e8edf2] sm:aspect-[21/9]">
          <Image
            src={BACK_PAIN_IMAGE_PATH}
            alt="Clinical scenario patient with back pain"
            fill
            priority
            sizes="(max-width: 768px) 100vw, 768px"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        </div>

        <div className="mx-6 my-6 rounded-[20px] border border-orange-100 bg-orange-50/50 p-5 sm:mx-8 sm:my-8 sm:p-6">
          <p className="whitespace-pre-line text-[15px] leading-relaxed text-slate-800">
            {currentStep.prompt}
          </p>
        </div>

        <div className="px-6 pb-8 sm:px-8 sm:pb-10">
          <p className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-400">
            Your Answer / คำตอบของนักศึกษา
          </p>

          <div className="relative rounded-[20px] border border-slate-200 bg-white shadow-sm transition-all focus-within:border-[#F5821F] focus-within:ring-1 focus-within:ring-[#F5821F]">
            <textarea
              value={answer}
              onChange={(event) => {
                setAnswer(event.target.value.slice(0, MAX_STEP_ANSWER_LENGTH))
              }}
              maxLength={MAX_STEP_ANSWER_LENGTH}
              rows={5}
              className="block w-full resize-none rounded-[20px] bg-transparent px-5 py-5 pr-16 text-[15px] leading-relaxed text-slate-900 outline-none placeholder:text-slate-400"
              placeholder="EN: Type your answer or press the microphone to speak.&#10;TH: พิมพ์คำตอบหรือกดไมโครโฟนเพื่อพูดคำตอบ"
            />

            <button
              type="button"
              onClick={handleVoiceInput}
              className={`absolute bottom-3 right-3 flex h-11 w-11 items-center justify-center rounded-full transition ${
                isListening
                  ? 'animate-pulse bg-[#F5821F] text-white shadow-md shadow-orange-300'
                  : 'bg-slate-100 text-slate-400 hover:bg-orange-50 hover:text-[#F5821F]'
              }`}
              aria-label={
                isListening ? 'Stop voice input' : 'Start Thai voice input'
              }
              title={isListening ? 'Stop voice input' : 'Start Thai voice input'}
            >
              <MicrophoneIcon />
            </button>
          </div>

          <div className="mt-3 flex items-center justify-between px-1 text-[13px] text-slate-400">
            <span>
              {isListening ? (
                <span className="animate-pulse font-semibold text-[#F5821F]">
                  Listening... / กำลังฟัง...
                </span>
              ) : (
                'Voice input: Thai / English'
              )}
            </span>

            <span>
              {answer.length} / {MAX_STEP_ANSWER_LENGTH}
            </span>
          </div>

          {speechError && (
            <div className="mt-4 rounded-[16px] border border-red-200 bg-red-50 p-4 text-[14px] leading-relaxed text-red-800">
              {speechError}
            </div>
          )}

          <button
            type="button"
            onClick={handleSubmit}
            disabled={!answer.trim()}
            className="mt-8 w-full rounded-2xl bg-[#F5821F] px-6 py-4 text-[15px] font-bold text-white shadow-sm transition hover:bg-[#C65F16] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-40 sm:mt-10"
          >
            Submit Answer / ส่งคำตอบ
          </button>
        </div>
      </section>
    </div>
  )
}