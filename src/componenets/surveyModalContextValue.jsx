"use client"

import { createContext } from "react"

// Only a non-component export lives here, so this file is never a
// Fast Refresh boundary in the first place — nothing to warn about.
export const SurveyModalContext = createContext(null)

export const ContributionModalContext = createContext(null)