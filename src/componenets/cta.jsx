"use client"

import { useContextModal } from "./useSurveyModal"

export default function CTA() {
  const { open } = useContextModal()

  return (
    <section className="bg-[#F1EEE6] py-20 sm:py-28">
      <div className="mx-auto max-w-2xl px-6 text-center sm:px-8">
        <div className="mx-auto flex h-3 w-3 items-center justify-center">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full rounded-full bg-[#E2762C] motion-safe:animate-pulse motion-reduce:animate-none" />
          </span>
        </div>

        <h2 className="mt-5 text-3xl font-semibold tracking-tight text-[#12151B] sm:text-4xl">
          Want to contribute?
        </h2>
        <p className="mx-auto mt-4 max-w-md text-lg leading-relaxed text-[#5B564A] sm:text-lg">
          If you manage enquiries for a real estate team, we&apos;d love to
          learn how your process works.
        </p>

        <button
          type="button"
          onClick={open}
          className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#E2762C] px-6 py-3.5 text-xl font-medium text-[#12151B] transition-colors hover:bg-[#EF8B47] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B85E1F] sm:w-auto"
        >
          Take survey
        </button>
      </div>
    </section>
  )
}
