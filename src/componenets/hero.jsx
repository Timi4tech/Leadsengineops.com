"use client"

import { useSurveyModal } from "./useSurveyModal"

export default function Hero() {
  const { open } = useSurveyModal()

  return (
    <section className="relative overflow-hidden bg-[#12151B] py-20 sm:py-28 lg:py-36">
      {/* Signal trace — pulse decaying into a flat, dotted line */}
      <svg
        className="pointer-events-none absolute inset-x-0 bottom-0 h-32 w-full sm:h-40 lg:h-48"
        viewBox="0 0 1200 200"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M0,100 L120,100 L145,40 L170,160 L195,60 L220,100 L340,100
             L365,70 L390,130 L415,100 L600,100"
          fill="none"
          stroke="#E2762C"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.55"
        />
        <path
          d="M600,100 L1200,100"
          fill="none"
          stroke="#3A3F4B"
          strokeWidth="2"
          strokeDasharray="1 10"
          strokeLinecap="round"
        />
      </svg>

      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute -left-24 top-1/3 h-72 w-72 rounded-full bg-[#E2762C] opacity-[0.08] blur-3xl"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-5xl px-6 sm:px-8">
        <span className="font-mono text-3xl font-semibold tracking-tight text-[#F1EEE6]">
          LeadsEngineOps
        </span>

        <div className="mt-8 flex items-center gap-2.5 sm:mt-10">
          <span className="relative flex h-2 w-2 motion-safe:animate-pulse motion-reduce:animate-none">
            <span className="absolute inline-flex h-full w-full rounded-full bg-[#E2762C]" />
          </span>
          <p className="font-mono text-s uppercase tracking-[0.2em] text-[#E2762C] sm:text-sm">
            Lead Operations For Real Estate
          </p>
        </div>

        <h1 className="mt-5 max-w-3xl text-[2.5rem] font-semibold leading-[1.08] tracking-tight text-[#F1EEE6] sm:text-6xl sm:leading-[1.05] lg:text-7xl">
          What actually happens after someone submits your property form?
        </h1>

        <p className="mt-6 max-w-xl text-lg leading-relaxed text-[#9CA3AF] sm:mt-8 sm:text-xl">
          We&apos;re interviewing real estate teams to understand where leads
          disappear between enquiry and first contact.
        </p>

        <div className="mt-9 flex flex-col gap-3.5 sm:mt-10 sm:flex-row sm:gap-5">
          <button
            type="button"
            onClick={open}
            className="w-full rounded-lg bg-[#E2762C] px-6 py-3.5 text-xl font-medium text-[#12151B] transition-colors hover:bg-[#EF8B47] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E2762C] sm:w-auto"
          >
            Take the 5 minute survey
          </button>
          <a
            href="#what-were-hearing"
            className="flex w-full items-center justify-center rounded-lg border border-[#3A3F4B] px-6 py-3.5 text-xl font-medium text-[#F1EEE6] transition-colors hover:border-[#565D6B] hover:bg-white/[0.03] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#565D6B] sm:w-auto"
          >
            See what we&apos;re learning
          </a>
        </div>
      </div>
    </section>
  )
}
