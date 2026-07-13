import React, { useState, useEffect, useRef } from 'react';
import { Zap, ArrowRight, CheckCircle2, PackageCheck, Radio, Timer, GitBranch, ShieldCheck } from 'lucide-react';

/* ---------------------------------------------------------
   FlowOps — "Dispatch Manifest" concept
   Every inbound lead is treated like a shipment with a
   clock running against it. The visual language borrows
   from cargo manifests and dispatch logs: stamps, routing
   codes, timestamps, monospace data — because that is
   literally the job the product does (route a lead before
   the clock runs out).
--------------------------------------------------------- */

const TOKENS = `
  @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600;700&family=IBM+Plex+Sans:wght@400;500;600;700&display=swap');

  .fo-root {
    --bg: #EEF0EA;
    --bg-panel: #E4E7DF;
    --card: #FCFCFA;
    --ink: #15181A;
    --ink-soft: #565D57;
    --ink-faint: #8B9088;
    --line: #D3D6CB;
    --accent: #FF4405;
    --accent-soft: #FFE3D4;
    --confirm: #1F7A55;
    --confirm-soft: #DCEEE2;
    font-family: 'IBM Plex Sans', ui-sans-serif, system-ui, sans-serif;
    background: var(--bg);
    color: var(--ink);
  }
  .fo-root .mono { font-family: 'IBM Plex Mono', ui-monospace, monospace; }

  .fo-noise {
    background-image: radial-gradient(circle at 1px 1px, rgba(21,24,26,0.045) 1px, transparent 0);
    background-size: 22px 22px;
  }

  .fo-card { background: var(--card); border: 1px solid var(--line); }
  .fo-line-t { border-top: 1px solid var(--line); }
  .fo-line-b { border-bottom: 1px solid var(--line); }
  .fo-line-x { border-left: 1px solid var(--line); }

  .fo-accent-text { color: var(--accent); }
  .fo-confirm-text { color: var(--confirm); }
  .fo-ink-soft { color: var(--ink-soft); }
  .fo-ink-faint { color: var(--ink-faint); }

  .fo-btn-primary {
    background: var(--ink);
    color: var(--bg);
    transition: transform .15s ease, background .15s ease;
  }
  .fo-btn-primary:hover { background: var(--accent); transform: translateY(-1px); }
  .fo-btn-primary:active { transform: translateY(0); }

  .fo-stamp {
    border: 1.5px dashed var(--accent);
    color: var(--accent);
    transform: rotate(-3deg);
  }

  .fo-input:focus { outline: none; border-color: var(--ink); }

  @keyframes fo-slide-in {
    from { opacity: 0; transform: translateY(6px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .fo-log-row { animation: fo-slide-in .35s ease both; }

  @keyframes fo-blink {
    0%, 100% { opacity: 1; }
    50% { opacity: .25; }
  }
  .fo-pulse-dot { animation: fo-blink 1.6s ease-in-out infinite; }

  @media (prefers-reduced-motion: reduce) {
    .fo-log-row, .fo-pulse-dot { animation: none !important; }
  }

  .fo-decay-bar { transition: height .8s cubic-bezier(.2,.8,.2,1); }
`;

const NAMES = ['J. Alvarez', 'R. Chen', 'M. Osei', 'T. Novak', 'S. Iqbal', 'D. Marsh', 'K. Petrova', 'A. Reyes'];
const SOURCES = ['site form', 'FB ad', 'landing pg', 'referral', 'chatbot'];

function makeLead(idCounter) {
  return {
    id: idCounter,
    name: NAMES[Math.floor(Math.random() * NAMES.length)],
    source: SOURCES[Math.floor(Math.random() * SOURCES.length)],
    code: 'LD-' + Math.floor(1000 + Math.random() * 9000),
    status: 'captured',
  };
}

function DispatchLog() {
  const [rows, setRows] = useState(() => [makeLead(1), makeLead(2)]);
  const counter = useRef(3);

  useEffect(() => {
    const addTimer = setInterval(() => {
      setRows((prev) => {
        const next = [makeLead(counter.current), ...prev].slice(0, 5);
        counter.current += 1;
        return next;
      });
    }, 3200);

    const routeTimer = setInterval(() => {
      setRows((prev) =>
        prev.map((r, i) => (i === 0 && r.status === 'captured' ? { ...r, status: 'routed' } : r))
      );
    }, 1400);

    return () => {
      clearInterval(addTimer);
      clearInterval(routeTimer);
    };
  }, []);

  return (
    <div className="fo-card rounded-2xl p-5 sm:p-6 shadow-[0_1px_0_rgba(0,0,0,0.03)]">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="fo-pulse-dot absolute inline-flex h-full w-full rounded-full" style={{ background: 'var(--confirm)' }} />
          </span>
          <span className="mono text-[11px] tracking-widest uppercase fo-ink-soft">Live dispatch log</span>
        </div>
        <span className="mono text-[11px] fo-ink-faint">MANIFEST #0429</span>
      </div>

      <div className="space-y-2 min-h-[220px]">
        {rows.map((r) => (
          <div
            key={r.id}
            className="fo-log-row flex items-center justify-between gap-3 rounded-lg px-3 py-2.5"
            style={{ background: 'var(--bg-panel)' }}
          >
            <div className="flex items-center gap-3 min-w-0">
              <span className="mono text-[11px] fo-ink-faint hidden xs:inline">{r.code}</span>
              <div className="min-w-0">
                <p className="text-sm font-semibold truncate">{r.name}</p>
                <p className="mono text-[10px] fo-ink-faint uppercase tracking-wide">{r.source}</p>
              </div>
            </div>
            {r.status === 'captured' ? (
              <span className="mono text-[10px] uppercase tracking-wide px-2 py-1 rounded-md shrink-0" style={{ background: 'var(--accent-soft)', color: 'var(--accent)' }}>
                captured
              </span>
            ) : (
              <span className="mono text-[10px] uppercase tracking-wide px-2 py-1 rounded-md shrink-0 flex items-center gap-1" style={{ background: 'var(--confirm-soft)', color: 'var(--confirm)' }}>
                <CheckCircle2 className="h-3 w-3" /> routed
              </span>
            )}
          </div>
        ))}
      </div>

      <div className="fo-line-t mt-4 pt-3 flex items-center justify-between">
        <span className="mono text-[11px] fo-ink-faint">avg. dispatch time</span>
        <span className="mono text-sm font-semibold fo-confirm-text">41s</span>
      </div>
    </div>
  );
}

function DecayChart() {
  const bars = [
    { label: '1 min', pct: 100 },
    { label: '5 min', pct: 88 },
    { label: '30 min', pct: 52 },
    { label: '24 hrs', pct: 20 },
  ];
  return (
    <div className="fo-card rounded-2xl p-6 sm:p-8">
      <p className="mono text-[11px] uppercase tracking-widest fo-ink-soft mb-6">Odds of a lead going cold, by reply time</p>
      <div className="flex items-end justify-between gap-3 sm:gap-6 h-44">
        {bars.map((b) => (
          <div key={b.label} className="flex-1 flex flex-col items-center justify-end h-full">
            <span className="mono text-xs font-semibold mb-2">{b.pct}%</span>
            <div className="w-full rounded-t-md fo-decay-bar" style={{ height: `${b.pct}%`, background: b.pct > 60 ? 'var(--confirm)' : 'var(--accent)' }} />
            <span className="mono text-[10px] uppercase tracking-wide fo-ink-faint mt-3">{b.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function PerformanceLandingPage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const MAKE_WEBHOOK_URL = 'https://hook.us2.make.com/l93ft4kosyoasrn10d1r8xi0jj8ie043';

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    try {
      await fetch(MAKE_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: 'dispatch_manifest_page', timestamp: new Date().toISOString() }),
      });
    } catch (err) {
      console.error('Pipeline connectivity error:', err);
    } finally {
      setSubmitted(true);
    }
  };

  return (
    <div className="fo-root min-h-screen fo-noise">
      <style>{TOKENS}</style>

      {/* NAV */}
      <nav className="fo-line-b sticky top-0 z-50" style={{ background: 'rgba(238,240,234,0.9)', backdropFilter: 'blur(8px)' }}>
        <div className="max-w-6xl mx-auto px-5 sm:px-6 h-16 sm:h-20 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-lg sm:text-xl tracking-tight">
            <Zap className="h-5 w-5 sm:h-6 sm:w-6 fo-accent-text" strokeWidth={2.5} />
            <span>FlowOps</span>
          </div>
          <a
            href="#manifest-intake"
            className="fo-btn-primary font-semibold px-4 sm:px-5 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm tracking-tight"
          >
            Book pipeline audit
          </a>
        </div>
      </nav>

      {/* HERO */}
      <header className="max-w-6xl mx-auto px-5 sm:px-6 pt-14 sm:pt-20 pb-14 sm:pb-20">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div>
            <div className="fo-stamp inline-block mono text-[11px] uppercase tracking-widest px-3 py-1 rounded-sm mb-7">
              Speed-to-lead dispatch
            </div>
            <h1 className="text-[2.2rem] leading-[1.12] sm:text-5xl sm:leading-[1.1] lg:text-6xl lg:leading-[1.08] font-bold tracking-tight mb-6">
              Every lead has a
              <br className="hidden sm:block" /> shipping clock on it.
            </h1>
            <p className="fo-ink-soft text-base sm:text-lg max-w-lg mb-8 leading-relaxed">
              Wait more than five minutes to reply and your odds of closing the deal fall off a cliff. We wire a
              webhook straight from your site into your CRM, so every new lead gets routed and confirmed in under a
              minute — nobody has to watch an inbox for it.
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2.5 max-w-md" id="manifest-intake">
              {!submitted ? (
                <>
                  <input
                    type="email"
                    required
                    placeholder="you@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="fo-input mono flex-1 bg-white border rounded-lg px-4 py-3 text-sm placeholder:fo-ink-faint"
                    style={{ borderColor: 'var(--line)' }}
                  />
                  <button type="submit" className="fo-btn-primary font-semibold px-5 py-3 rounded-lg text-sm flex items-center justify-center gap-2 shrink-0">
                    Test the engine <ArrowRight className="h-4 w-4" />
                  </button>
                </>
              ) : (
                <div className="fo-card rounded-lg px-4 py-3.5 flex items-start gap-3 w-full" style={{ borderColor: 'var(--confirm)' }}>
                  <CheckCircle2 className="h-5 w-5 shrink-0 mt-0.5 fo-confirm-text" />
                  <div>
                    <p className="font-semibold text-sm mb-0.5">Manifest logged.</p>
                    <p className="fo-ink-soft text-xs">Check your inbox in a moment — that's roughly how fast your leads will move too.</p>
                  </div>
                </div>
              )}
            </form>
            <p className="mono fo-ink-faint text-[11px] mt-3">No CRM migration. No code on your end. Live in one afternoon.</p>
          </div>

          <DispatchLog />
        </div>
      </header>

      {/* PROBLEM / DECAY */}
      <section className="fo-line-t" style={{ background: 'var(--bg-panel)' }}>
        <div className="max-w-6xl mx-auto px-5 sm:px-6 py-16 sm:py-24 grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <DecayChart />
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4">The lead isn't lost. It's just cold.</h2>
            <p className="fo-ink-soft leading-relaxed mb-4">
              A person fills out your form while comparing three competitors in other tabs. Whoever replies first
              usually wins the job — not whoever has the better price. If a lead sits in an inbox overnight, you're
              not competing anymore.
            </p>
            <p className="fo-ink-soft leading-relaxed">
              We don't ask your team to check email faster. We remove the wait entirely: the moment a form
              submits, it's already in your CRM with a task assigned.
            </p>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS — manifest route */}
      <section className="max-w-6xl mx-auto px-5 sm:px-6 py-16 sm:py-24">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">The route, stop by stop</h2>
        <p className="fo-ink-soft mb-12 max-w-xl">Three handoffs. No manual step in between.</p>

        <div className="grid sm:grid-cols-3 gap-6 sm:gap-4 relative">
          {[
            { icon: Radio, tag: 'STOP 01', title: 'Capture', body: 'A lead submits your form, ad, or chatbot. The webhook fires the instant it lands — no polling, no delay.' },
            { icon: GitBranch, tag: 'STOP 02', title: 'Route', body: 'Middleware checks source and intent, then pushes the record into the right CRM pipeline and owner.' },
            { icon: PackageCheck, tag: 'STOP 03', title: 'Confirm', body: 'The rep gets a task with full context. The lead gets an instant reply. Both happen inside a minute.' },
          ].map((step, i) => (
            <div key={step.title} className="fo-card rounded-2xl p-6 relative">
              <div className="flex items-center justify-between mb-5">
                <span className="mono text-[10px] uppercase tracking-widest fo-ink-faint">{step.tag}</span>
                <step.icon className="h-4 w-4 fo-accent-text" />
              </div>
              <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
              <p className="fo-ink-soft text-sm leading-relaxed">{step.body}</p>
              {i < 2 && (
                <div className="hidden sm:block absolute top-1/2 -right-3 w-6 h-px" style={{ background: 'var(--line)' }} />
              )}
            </div>
          ))}
        </div>
      </section>

      {/* CAPABILITIES */}
      <section className="fo-line-t" style={{ background: 'var(--bg-panel)' }}>
        <div className="max-w-6xl mx-auto px-5 sm:px-6 py-16 sm:py-24">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="mono text-[11px] uppercase tracking-widest fo-accent-text block mb-3">What's on the manifest</span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4">Three integrations, zero copy-pasting</h2>
            <p className="fo-ink-soft text-sm sm:text-base">
              Most sales teams lose 15–20 hours a week to re-entering the same lead data by hand. Each of these
              removes one manual handoff for good.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-5 sm:gap-6">
            {[
              {
                icon: Zap,
                tag: 'ROUTE 01',
                title: 'Webhook form capture',
                body: 'Your existing forms get an async listener instead of a fresh rebuild — it fires the moment someone submits, on React, WordPress, or Webflow.',
                foot: 'Supports: React · WordPress · Webflow',
              },
              {
                icon: PackageCheck,
                tag: 'ROUTE 02',
                title: 'CRM field sync',
                body: 'Fields map straight into HubSpot, Salesforce, or Bitrix24 on arrival. No duplicate contacts, no half-filled records.',
                foot: 'New lead → assigned owner → deal stage',
              },
              {
                icon: Timer,
                tag: 'ROUTE 03',
                title: 'Instant notification chain',
                body: 'The rep and the lead both hear from you inside a minute, over whichever channel your buyers actually check.',
                foot: 'Channels: Email · SMS · WhatsApp',
              },
            ].map((cap) => (
              <div key={cap.title} className="fo-card rounded-2xl p-7 sm:p-8">
                <div className="flex items-center justify-between mb-6">
                  <span className="mono text-[10px] uppercase tracking-widest fo-ink-faint">{cap.tag}</span>
                  <cap.icon className="h-5 w-5 fo-accent-text" />
                </div>
                <h3 className="font-semibold text-lg mb-3">{cap.title}</h3>
                <p className="fo-ink-soft text-sm leading-relaxed mb-5">{cap.body}</p>
                <div className="mono text-[11px] fo-ink-faint fo-line-t pt-4">{cap.foot}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REQUIREMENTS / AUDIT PANEL */}
      <section id="audit-panel" className="max-w-6xl mx-auto px-5 sm:px-6 py-16 sm:py-24">
        <div className="fo-card rounded-2xl p-6 sm:p-12">
          <div className="grid md:grid-cols-2 gap-10 md:gap-14 items-start">
            <div>
              <span className="mono text-[11px] uppercase tracking-widest fo-accent-text block mb-3">System blueprint</span>
              <h3 className="text-2xl sm:text-3xl font-bold tracking-tight mb-5">What we'll need on your end</h3>
              <p className="fo-ink-soft text-sm leading-relaxed mb-7">
                Nothing exotic — most teams already have this in place. If something's missing, we'll flag it during
                the audit rather than mid-build.
              </p>
              <div className="space-y-4">
                {[
                  { icon: ShieldCheck, label: 'API access credentials for your form or site' },
                  { icon: PackageCheck, label: 'Admin access to HubSpot, Salesforce, or Bitrix24' },
                  { icon: GitBranch, label: 'A domain running on SSL (most already do)' },
                ].map((req) => (
                  <div key={req.label} className="flex items-center gap-3">
                    <span className="fo-card rounded-lg p-2 shrink-0" style={{ borderColor: 'var(--line)' }}>
                      <req.icon className="h-4 w-4 fo-accent-text" />
                    </span>
                    <span className="mono text-xs fo-ink-soft">{req.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl p-6 sm:p-7" style={{ background: 'var(--bg-panel)' }}>
              <h4 className="font-semibold text-lg mb-5">Free 15-minute route audit</h4>
              <ul className="space-y-3.5 mb-7">
                {[
                  'See exactly where leads stall between form and first reply.',
                  'Get a dispatch-time estimate for your current stack.',
                  'Leave with a fixed quote — no follow-up sales call.',
                ].map((line) => (
                  <li key={line} className="flex items-start gap-3 text-sm">
                    <CheckCircle2 className="h-4 w-4 mt-0.5 shrink-0 fo-confirm-text" />
                    <span className="fo-ink-soft">{line}</span>
                  </li>
                ))}
              </ul>
              <a href="#manifest-intake" className="fo-btn-primary w-full inline-flex items-center justify-center gap-2 font-semibold px-5 py-3 rounded-lg text-sm">
                Book the audit <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST STRIP */}
      <section className="fo-line-t fo-line-b" style={{ background: 'var(--bg-panel)' }}>
        <div className="max-w-6xl mx-auto px-5 sm:px-6 py-8 flex flex-wrap items-center justify-center gap-x-10 gap-y-3">
          <div className="flex items-center gap-2 fo-ink-soft text-sm">
            <ShieldCheck className="h-4 w-4 fo-confirm-text" /> No lead left unrouted for 90 days
          </div>
          <div className="flex items-center gap-2 fo-ink-soft text-sm">
            <Timer className="h-4 w-4 fo-confirm-text" /> Median dispatch time under 60s
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="max-w-6xl mx-auto px-5 sm:px-6 py-16 sm:py-24">
        <div className="fo-card rounded-2xl px-6 sm:px-12 py-12 sm:py-16 text-center">
          <div className="fo-stamp inline-block mono text-[11px] uppercase tracking-widest px-3 py-1 rounded-sm mb-6">
            Free pipeline audit
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight mb-4 max-w-2xl mx-auto">
            We'll trace where your leads currently stall.
          </h2>
          <p className="fo-ink-soft max-w-xl mx-auto mb-8">
            Twenty minutes, screen share, your actual form-to-CRM path. You'll leave with the exact minutes you're
            losing today.
          </p>
          <a href="#manifest-intake" className="fo-btn-primary inline-flex items-center gap-2 font-semibold px-6 py-3.5 rounded-lg text-sm">
            Book the audit <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="fo-line-t">
        <div className="max-w-6xl mx-auto px-5 sm:px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 font-semibold text-sm">
            <Zap className="h-4 w-4 fo-accent-text" /> FlowOps
          </div>
          <p className="mono fo-ink-faint text-[11px]">© {new Date().getFullYear()} FlowOps — dispatch, not delay.</p>
        </div>
      </footer>
    </div>
  );
}
