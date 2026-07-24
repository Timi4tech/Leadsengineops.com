// Thin proxy: the browser posts to this route, and this route forwards
// the payload to your Make.com webhook. Keeping it server-side (rather
// than posting to the Make URL directly from the browser) means the
// webhook URL never appears in your page's source.
//
// Setup:
// 1. In Make.com, create a scenario starting with a "Webhooks > Custom
//    webhook" trigger. Copy its URL.
// 2. Add a "Google Sheets > Add a Row" module after it, and map each
//    field below (they arrive flat, so mapping is drag-and-drop).
// 3. Put the webhook URL in .env.local as MAKE_SURVEY_WEBHOOK_URL.

export const runtime = "nodejs"

export async function POST(request) {
  try {
    const body = await request.json()

    const webhookUrl = import.meta.env.MAKE_SURVEY_WEBHOOK_URL
    if (!webhookUrl) {
      console.error("MAKE_SURVEY_WEBHOOK_URL is not set")
      return Response.json(
        { ok: false, error: "Survey endpoint not configured" },
        { status: 500 }
      )
    }

    const payload = {
      timestamp: new Date().toISOString(),
      ...body.answers,
      wants_follow_up: body.wantsFollowUp ?? "",
      name: body.contact?.name ?? "",
      email: body.contact?.email ?? "",
      company: body.contact?.company ?? "",
    }

    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })

    if (!res.ok) throw new Error(`Make.com webhook responded ${res.status}`)

    return Response.json({ ok: true })
  } catch (err) {
    console.error("Survey submission error:", err)
    return Response.json(
      { ok: false, error: "Failed to submit survey" },
      { status: 500 }
    )
  }
}
