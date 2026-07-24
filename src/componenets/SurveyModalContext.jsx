"use client"

import { useState } from "react"
import { ContributionModalContext,SurveyModalContext } from "./surveyModalContextValue"
import ContributionModal from "./CtaModal"
import SurveyModal from "./SurveyModal"

// Wrap your app/page with this once (see app/page.tsx) so that Hero,
// Survey, and CTA can all open the same modal instance.
// This file exports only the component, so Fast Refresh works cleanly.
export function SurveyModalProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <SurveyModalContext.Provider
      value={{ open: () => setIsOpen(true), close: () => setIsOpen(false) }}
    >
      {children}
      <SurveyModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </SurveyModalContext.Provider>
  )
}

export function ContextModalProvider({children}){
    const[isOpen, setIsOpen] = useState(false)
    return(
        <ContributionModalContext 
         value={{ open: () => setIsOpen(true), close: () => setIsOpen(false) }}
         >
         {children}
          <ContributionModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
        </ContributionModalContext>
    )
}