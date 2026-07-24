import React from 'react';
import { Zap, ArrowRight, CheckCircle2, PackageCheck, Radio, Timer, GitBranch, ShieldCheck } from 'lucide-react';

import { SurveyModalProvider, ContextModalProvider } from './componenets/SurveyModalContext';
import Blueprint from "../src/componenets/bluePrint"
import CTA from "../src/componenets/cta"
import Hero from "../src/componenets/hero"
import Problem from "../src/componenets/problem"
import Survey from "../src/componenets/survey"

export default function App(){
  return (
  <>
    <SurveyModalProvider>
    <Hero/>
    <Problem/>
    <Blueprint/>
    <Survey/>
    </SurveyModalProvider>
    <ContextModalProvider>
    <CTA/>
      </ContextModalProvider>
</>
  )
}
