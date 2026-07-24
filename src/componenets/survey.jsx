"use client"

import { useSurveyModal } from "./useSurveyModal"

export default function Survey() {
  const { open } = useSurveyModal()

  return (
    <section className="bg-[#F1EEE6] py-20 sm:py-28">
      <div className="mx-auto max-w-3xl px-6 sm:px-8">
        <div className="rounded-2xl border border-[#E6C8A8] bg-[#FBEFE0] p-8 sm:rounded-3xl sm:p-14">
          <p className="font-mono text-s uppercase tracking-[0.2em] text-[#B85E1F] sm:text-sm">
            Research interview
          </p>
          <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-tight text-[#12151B] sm:text-4xl">
            Can we learn from your process?
          </h2>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-[#5B564A] sm:text-lg">
            No sales pitch.
            <br />
            No software demo.
            <br />
            Just 12 questions about how enquiries move through your team.
          </p>
          <button
            type="button"
            onClick={open}
            className="mt-10 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#E2762C] px-6 py-3.5 text-xl font-medium text-[#12151B] transition-colors hover:bg-[#EF8B47] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B85E1F] sm:w-auto"
          >
            Take survey
          </button>
        </div>
      </div>
    </section>
  )
}
