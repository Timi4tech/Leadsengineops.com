const questions = [
  "How do new enquiries usually arrive?",
  "Who normally sees them first?",
  "What happens next?",
  "Have you ever found a lead hours later?",
  "What's the hardest part of following up quickly?",
]

export default function Problem() {
  return (
    <section className="bg-[#F1EEE6] py-20 sm:py-28">
      <div className="mx-auto max-w-4xl px-6 sm:px-8">
        <p className="font-mono text-s uppercase tracking-[0.2em] text-[#B85E1F] sm:text-sm">
          Interview log
        </p>
        <h2 className="mt-4 max-w-2xl text-3xl font-semibold leading-tight tracking-tight text-[#12151B] sm:text-5xl">
          The questions we&apos;re trying to answer
        </h2>

        <div className="mt-10 sm:mt-14">
          {questions.map((question, i) => (
            <div
              key={question}
              className="group flex items-start gap-4 border-t border-[#D8D3C4] py-5 first:border-t sm:gap-6 sm:py-6"
            >
              <span className="mt-0.5 shrink-0 font-mono text-lg text-[#B85E1F] sm:text-base">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="text-lg leading-snug text-[#12151B] sm:text-2xl">
                {question}
              </p>
            </div>
          ))}
          <div className="border-t border-[#D8D3C4]" />
        </div>
      </div>
    </section>
  )
}
