// Shared question list — used by SurveyModal.jsx for rendering.
// `field` is the flat key sent to the Make.com webhook, so it maps
// cleanly to a Google Sheets column with no nested-JSON parsing needed.
export const SURVEY_QUESTIONS = [
  { id: "q1", field: "about_agency", type: "text", label: "About your agency" },
  { id: "q2", field: "role", type: "text", label: "What is your role?" },
  {
    id: "q3",
    field: "weekly_enquiries",
    type: "single-choice",
    label:
      "How many property enquiries does your agency receive in a typical week?",
    options: ["Less than 10", "10 - 25", "26 - 50", "51 - 100", "More than 100"],
  },
  {
    id: "q4",
    field: "enquiry_source",
    type: "text",
    label: "Where do most of your enquiries come from?",
  },
  {
    id: "q5",
    field: "after_enquiry",
    type: "text",
    label: "What happens after someone submits an enquiry?",
  },
  {
    id: "q6",
    field: "follow_up_method",
    type: "text",
    label: "How do you follow up with new enquiries?",
  },
  {
    id: "q7",
    field: "response_time",
    type: "text",
    label: "Approximately how long does it usually take to respond to a new enquiry?",
  },
  {
    id: "q8",
    field: "biggest_challenge",
    type: "text",
    label: "Tell us about the biggest challenge your agency faces when managing enquiries.",
  },
  {
    id: "q9",
    field: "lost_buyers_reasons",
    type: "textarea",
    label: "What conditions have made you lose buyers?",
  },
  {
    id: "q10",
    field: "problem_solving_attempt",
    type: "textarea",
    label: "How did you try to solve the problem?",
  },
  {
    id: "q11",
    field: "improvement_suggestion",
    type: "textarea",
    label: "If you could improve one thing about your enquiries process, what would it be?",
  },
]

export const CTA_CONTIRBUTION =[
     {
    id: "q1",
    field: "Contribution",
    type: "textarea",
    label: "Please what aspect of your sales funnel is costing you more ?",
  },
  {
    id: "q2",
    field: "improvement_suggestion",
    type: "textarea",
    label: "If you could improve one thing about your sales process, what would it be?",
  },
]