const findings = [
  {
    title: "Some teams respond immediately.",
    body: "Others wait until someone checks the inbox.",
  },
  {
    title: "Different CRMs create different delays.",
    body: "We're mapping common workflows.",
  },
  {
    title: "Every agency has its own process.",
    body: "We're looking for recurring bottlenecks.",
  },
]

export default function Blueprint() {
  return (
    <section id="what-were-hearing" className="scroll-mt-20 bg-[#12151B] py-20 sm:py-28">
      <div className="mx-auto max-w-3xl px-6 sm:px-8">
        <p className="font-mono text-s uppercase tracking-[0.2em] text-[#E2762C] sm:text-sm">
          Early findings
        </p>
        <h2 className="mt-4 max-w-xl text-3xl font-semibold leading-tight tracking-tight text-[#F1EEE6] sm:text-5xl">
          What we&apos;re hearing so far
        </h2>

        <div className="relative mt-12 sm:mt-16">
          {/* Signal line connecting findings — same trace motif as the hero */}
          <div
            className="absolute bottom-2 left-[5px] top-2 w-px bg-[#3A3F4B] sm:left-[7px]"
            aria-hidden="true"
          />

          <div className="space-y-8 sm:space-y-10">
            {findings.map((finding) => (
              <div key={finding.title} className="relative flex gap-5 pl-6 sm:gap-7 sm:pl-8">
                <span
                  className="absolute left-0 top-1.5 h-2.5 w-2.5 shrink-0 rounded-full bg-[#E2762C] sm:h-3.5 sm:w-3.5"
                  aria-hidden="true"
                />
                <div>
                  <p className="text-lg font-medium leading-snug text-[#F1EEE6] sm:text-xl">
                    {finding.title}
                  </p>
                  <p className="mt-1.5 text-base leading-relaxed text-[#9CA3AF]">
                    {finding.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
