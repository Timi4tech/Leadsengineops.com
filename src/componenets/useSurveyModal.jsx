"use client"

import { useContext } from "react"
import { SurveyModalContext, ContributionModalContext} from "./surveyModalContextValue"

// Only a hook lives here — no component export, so Fast Refresh has
// nothing to conflict with.
export function useSurveyModal() {
  const ctx = useContext(SurveyModalContext)
  if (!ctx) {
    throw new Error("useSurveyModal must be used inside a SurveyModalProvider")
  }
  return ctx
}

export function useContextModal(){
      const ctx = useContext(ContributionModalContext)
  if (!ctx) {
    throw new Error("useSurveyModal must be used inside a ContextModalProvider")
  }
  return ctx
}