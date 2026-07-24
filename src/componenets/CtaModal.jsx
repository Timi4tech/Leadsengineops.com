"use client"

import { useEffect, useState } from "react"
import {CTA_CONTIRBUTION  } from "./surveyQuestions"

export default function ContributionModal({ isOpen, onClose }) {
  const [answers, setAnswers] = useState({})
  const [choice, setChoice] = useState(null) // q3 single-choice value
  const [wantsFollowUp, setWantsFollowUp] = useState(null) // "yes" | "no" | null
  const [contact, setContact] = useState({ name: "", email: "", company: "" })
  const [status, setStatus] = useState("idle") // idle | submitting | success | error

  // Lock body scroll while the modal is open
  useEffect(() => {
    if (!isOpen) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [isOpen])

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return
    const onKeyDown = (e) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [isOpen, onClose])

  if (!isOpen) return null

  function updateAnswer(id, value) {
    setAnswers((prev) => ({ ...prev, [id]: value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus("submitting")
    try {
      const flatAnswers = {}
      CTA_CONTIRBUTION.forEach((q) => {
        flatAnswers[q.field] = q.id === "q3" ? choice || "" : answers[q.id] || ""
      })
      
      const url = import.meta.env.VITE_MAKE_WEBHOOK_URL

      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contribution: flatAnswers,
          wantsFollowUp,
          contact: wantsFollowUp === "yes" ? contact : null,
        }),
      })
      if (!res.ok) throw new Error("Request failed")
      setStatus("success")
    } catch (err) {
      console.error("Survey submission error:", err)
      setStatus("error")
    }
  }

  function handleClose() {
    onClose()
    // Reset a completed/failed form the next time it's opened;
    // leave in-progress answers alone if the person just clicked away.
    if (status === "success" || status === "error") {
      setTimeout(() => {
        setAnswers({})
        setChoice(null)
        setWantsFollowUp(null)
        setContact({ name: "", email: "", company: "" })
        setStatus("idle")
      }, 300)
    }
  }

  const inputClasses =
    "w-full rounded-lg border border-[#D8D3C4] bg-white px-4 py-2.5 text-[#12151B] placeholder-[#9CA3AF] focus:border-[#E2762C] focus:outline-none focus:ring-2 focus:ring-[#E2762C]/30"

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-[#12151B]/70 px-4 py-8 backdrop-blur-sm sm:items-center sm:py-12"
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="survey-modal-title"
    >
      <div
        className="relative w-full max-w-2xl rounded-2xl bg-[#F1EEE6] shadow-2xl sm:rounded-3xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={handleClose}
          aria-label="Close survey"
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/70 text-[#12151B] transition-colors hover:bg-white sm:right-6 sm:top-6"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path
              d="M3 3L13 13M13 3L3 13"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>

        <div className="max-h-[85vh] overflow-y-auto p-6 sm:p-10">
          {status === "success" ? (
            <div className="py-10 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#E2762C]/15">
                <svg width="22" height="22" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path
                    d="M3 8.5L6.2 11.5L13 4"
                    stroke="#B85E1F"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h2 className="mt-5 text-2xl font-semibold text-[#12151B]">
                Thank you — that's a wrap.
              </h2>
              <p className="mt-2 text-[#5B564A]">
                Your responses have been recorded. We appreciate the five
                minutes.
              </p>
              <button
                type="button"
                onClick={handleClose}
                className="mt-8 rounded-lg bg-[#E2762C] px-6 py-3 font-medium text-[#12151B] transition-colors hover:bg-[#EF8B47]"
              >
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <p
                id="survey-modal-title"
                className="font-mono text-xs uppercase tracking-[0.2em] text-[#B85E1F] sm:text-sm"
              >
                LeadsEngineOps · Research Opinion
              </p>
              <h2 className="mt-3 text-2xl font-semibold leading-snug tracking-tight text-[#12151B] sm:text-3xl">
                Real Estate Lead Generation, Follow-up and Sales Insight
              </h2>
              <p className="mt-1 text-sm font-medium text-[#B85E1F]">
                Takes about 5 minutes
              </p>

              <div className="mt-6 space-y-3 text-sm leading-relaxed text-[#5B564A] sm:text-base">
                <p>
                  This is research on how real estate agencies currently
                  generate and manage buyer enquiries. It is not a sales
                  pitch,  we are simply trying to understand the real
                  challenges agencies face.
                </p>
                <p>
                  Your responses will remain confidential and will help
                  shape future solutions for the real estate industry.
                  Thank you for taking five minutes to participate.
                </p>
              </div>

              <div className="mt-8 space-y-7 sm:mt-10 sm:space-y-8">
                {CTA_CONTIRBUTION.map((q, i) => (
                  <div key={q.id}>
                    <label
                      htmlFor={q.id}
                      className="flex gap-3 text-base font-medium leading-snug text-[#12151B] sm:text-lg"
                    >
                      <span className="shrink-0 font-mono text-sm text-[#B85E1F]">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span>{q.label}</span>
                    </label>

                    <div className="mt-3 pl-0 sm:pl-8">
                      {q.type === "text" && (
                        <textarea
                          id={q.id}
                          rows={2}
                          value={answers[q.id] || ""}
                          onChange={(e) => updateAnswer(q.id, e.target.value)}
                          placeholder="Your answer"
                          className={inputClasses}
                        />
                      )}

                      {q.type === "textarea" && (
                        <textarea
                          id={q.id}
                          rows={4}
                          value={answers[q.id] || ""}
                          onChange={(e) => updateAnswer(q.id, e.target.value)}
                          placeholder="Your answer"
                          className={inputClasses}
                        />
                      )}

                      {q.type === "single-choice" && (
                        <div className="flex flex-wrap gap-2">
                          {q.options.map((option) => {
                            const selected = choice === option
                            return (
                              <button
                                key={option}
                                type="button"
                                onClick={() => setChoice(option)}
                                aria-pressed={selected}
                                className={`rounded-lg border px-4 py-2 text-sm font-medium transition-colors ${
                                  selected
                                    ? "border-[#E2762C] bg-[#E2762C] text-[#12151B]"
                                    : "border-[#D8D3C4] bg-white text-[#12151B] hover:border-[#B85E1F]"
                                }`}
                              >
                                {option}
                              </button>
                            )
                          })}
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                {/* Question 12 — opt-in for follow-up observations */}
                <div>
                  <label className="flex gap-3 text-base font-medium leading-snug text-[#12151B] sm:text-lg">
                    <span className="shrink-0 font-mono text-sm text-[#B85E1F]">12</span>
                    <span>
                      Would you like to receive our observations from this
                      survey later? Data from other agencies like yours
                      could provide more insight into your sales funnel.
                    </span>
                  </label>

                  <div className="mt-3 flex gap-2 pl-0 sm:pl-8">
                    {["Yes", "No"].map((option) => {
                      const value = option.toLowerCase()
                      const selected = wantsFollowUp === value
                      return (
                        <button
                          key={option}
                          type="button"
                          onClick={() => setWantsFollowUp(value)}
                          aria-pressed={selected}
                          className={`rounded-lg border px-5 py-2 text-sm font-medium transition-colors ${
                            selected
                              ? "border-[#E2762C] bg-[#E2762C] text-[#12151B]"
                              : "border-[#D8D3C4] bg-white text-[#12151B] hover:border-[#B85E1F]"
                          }`}
                        >
                          {option}
                        </button>
                      )
                    })}
                  </div>

                  {wantsFollowUp === "yes" && (
                    <div className="mt-4 space-y-3 pl-0 sm:pl-8">
                      <input
                        type="text"
                        required
                        placeholder="Name"
                        value={contact.name}
                        onChange={(e) =>
                          setContact((c) => ({ ...c, name: e.target.value }))
                        }
                        className={inputClasses}
                      />
                      <input
                        type="email"
                        required
                        placeholder="Email"
                        value={contact.email}
                        onChange={(e) =>
                          setContact((c) => ({ ...c, email: e.target.value }))
                        }
                        className={inputClasses}
                      />
                      <input
                        type="text"
                        placeholder="Company (optional)"
                        value={contact.company}
                        onChange={(e) =>
                          setContact((c) => ({ ...c, company: e.target.value }))
                        }
                        className={inputClasses}
                      />
                    </div>
                  )}
                </div>
              </div>

              {wantsFollowUp && (
                <div className="mt-9 sm:mt-10">
                  {status === "error" && (
                    <p className="mb-3 text-sm text-red-700">
                      Something went wrong submitting your response. Please
                      try again.
                    </p>
                  )}
                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="w-full rounded-lg bg-[#E2762C] px-6 py-3.5 text-base font-medium text-[#12151B] transition-colors hover:bg-[#EF8B47] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                  >
                    {status === "submitting" ? "Submitting…" : "Submit"}
                  </button>
                </div>
              )}
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
