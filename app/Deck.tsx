"use client";

import { useCallback, useEffect, useState } from "react";
import {
  DOC, FIGURES, PROVIDE, RATE, TERMS, TOTAL_FEE, TOTAL_HOURS, WEEKS, WORK, money,
} from "@/lib/proposal";

/* ── the parts, each of which is one screen of the deck ────────────────── */

function Cover() {
  return (
    <div className="cover">
      <p className="lab lab-a">
        {DOC.kind} &nbsp;/&nbsp; {DOC.ref}
      </p>
      <h1>{DOC.headline}</h1>
      <p className="lede">{DOC.lede}</p>
      <dl>
        <div>
          <dt className="lab">For</dt>
          <dd>{DOC.client}</dd>
        </div>
        <div>
          <dt className="lab">By</dt>
          <dd>{DOC.studio}</dd>
        </div>
        <div>
          <dt className="lab">Issued</dt>
          <dd className="num">{DOC.issued}</dd>
        </div>
        <div>
          <dt className="lab">Valid until</dt>
          <dd className="num">{DOC.validUntil}</dd>
        </div>
      </dl>
    </div>
  );
}

function Numbers() {
  return (
    <>
      <h2>The shape of it</h2>
      <div className="figs">
        {FIGURES.map((f) => (
          <div className="fig" key={f.k}>
            <p className="lab">{f.k}</p>
            <div className="v">{f.v}</div>
            <div className="n">{f.n}</div>
          </div>
        ))}
      </div>
    </>
  );
}

function Scope({ from, to, part }: { from: number; to: number; part: string }) {
  return (
    <>
      <h2>What will be built</h2>
      <p className="intro">
        {part} &mdash; {WORK.slice(from, to).reduce((n, w) => n + w.hours, 0)} of the{" "}
        {TOTAL_HOURS} hours.
      </p>
      <div className="work">
        {WORK.slice(from, to).map((w) => (
          <article className="item" key={w.name}>
            <div className="item-h">
              <h3>{w.name}</h3>
              <span className="hrs">{w.hours} hrs</span>
            </div>
            <ul>
              {w.points.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </>
  );
}

function Fee() {
  return (
    <>
      <h2>The number</h2>
      <div className="fee">
        <p className="lab lab-a">Total</p>
        <div className="amt">{money(TOTAL_FEE)}</div>
        <p className="sub">
          {TOTAL_HOURS} hours at {money(RATE)} per hour &mdash; 16 working days at five hours a day.
        </p>
      </div>
    </>
  );
}

function Timeline() {
  return (
    <>
      <h2>Four weeks</h2>
      <div>
        {WEEKS.map((w) => (
          <div className="wk" key={w.when}>
            <div className="when">
              {w.when}
              <span>{w.dates}</span>
            </div>
            <div>
              <h3>{w.title}</h3>
              <p>{w.body}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

function Provide() {
  return (
    <>
      <h2>What you provide</h2>
      <p className="intro">
        The date holds if these arrive on time. The Razorpay application is the one to start
        first &mdash; it waits on someone else&rsquo;s queue, not on us.
      </p>
      <ul className="list">
        {PROVIDE.map((p) => (
          <li key={p.when}>
            <b>{p.when}</b> &mdash; {p.text}
          </li>
        ))}
      </ul>
    </>
  );
}

function Terms() {
  return (
    <>
      <h2>The commercials</h2>
      <ul className="list">
        {TERMS.map((t) => (
          <li key={t}>{t}</li>
        ))}
      </ul>
    </>
  );
}

function Accept() {
  return (
    <>
      <h2>Acceptance</h2>
      <p className="intro">
        Signing accepts this document in full. Valid until{" "}
        <span className="num">{DOC.validUntil}</span>.
      </p>
      <div className="sign">
        <div>
          <p className="lab">For the client</p>
          <div className="line" />
          <div className="who">{DOC.client} &nbsp;&middot;&nbsp; date</div>
        </div>
        <div>
          <p className="lab">For the studio</p>
          <div className="line" />
          <div className="who">{DOC.studio} &nbsp;&middot;&nbsp; date</div>
        </div>
      </div>
    </>
  );
}

const STEPS: { label: string; node: React.ReactNode }[] = [
  { label: "Cover", node: <Cover /> },
  { label: "The shape of it", node: <Numbers /> },
  { label: "What will be built, 1", node: <Scope from={0} to={5} part="First five" /> },
  { label: "What will be built, 2", node: <Scope from={5} to={10} part="Last five" /> },
  { label: "The number", node: <Fee /> },
  { label: "Four weeks", node: <Timeline /> },
  { label: "What you provide", node: <Provide /> },
  { label: "The commercials", node: <Terms /> },
  { label: "Acceptance", node: <Accept /> },
];

/* ── the deck ──────────────────────────────────────────────────────────── */

export default function Deck() {
  const [i, setI] = useState(0);
  const [all, setAll] = useState(false);

  const go = useCallback((n: number) => {
    setI(Math.max(0, Math.min(STEPS.length - 1, n)));
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  // Arrow keys and space, the way anyone reads a deck. Ignored while the
  // all-on-one-page view is open, where the page scrolls instead.
  useEffect(() => {
    if (all) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (e.key === "ArrowRight" || e.key === "PageDown" || e.key === " ") {
        e.preventDefault();
        setI((n) => Math.min(STEPS.length - 1, n + 1));
        window.scrollTo({ top: 0, behavior: "instant" });
      }
      if (e.key === "ArrowLeft" || e.key === "PageUp") {
        e.preventDefault();
        setI((n) => Math.max(0, n - 1));
        window.scrollTo({ top: 0, behavior: "instant" });
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [all]);

  if (all) {
    return (
      <div className="deck">
        <div className="bar">
          <div className="bar-in">
            <p className="lab">
              {DOC.kind} &nbsp;/&nbsp; {DOC.ref}
            </p>
            <button type="button" className="btn" onClick={() => setAll(false)}>
              Step through
            </button>
          </div>
        </div>
        <div className="all">
          {STEPS.map((s) => (
            <section key={s.label}>{s.node}</section>
          ))}
        </div>
      </div>
    );
  }

  const first = i === 0;
  const last = i === STEPS.length - 1;

  return (
    <div className="deck">
      <div className="bar">
        <div className="bar-in">
          <p className="lab">
            {DOC.kind} &nbsp;/&nbsp; {DOC.ref}
          </p>
          <div className="ticks">
            {STEPS.map((s, n) => (
              <button
                key={s.label}
                type="button"
                className="tick"
                data-on={n <= i}
                onClick={() => go(n)}
                aria-label={`Go to ${s.label}`}
                aria-current={n === i ? "step" : undefined}
              />
            ))}
          </div>
          <button type="button" className="btn" onClick={() => setAll(true)}>
            Read it all
          </button>
        </div>
      </div>

      <div className="stage">
        {/* Keyed so React remounts on every step — which is what replays the
            entry animation instead of swapping the text under a static frame. */}
        <div className="step" key={i}>
          {STEPS[i].node}
        </div>
      </div>

      <div className="nav">
        <div className="nav-in">
          <button type="button" className="btn" onClick={() => go(i - 1)} disabled={first}>
            Back
          </button>
          <span className="count">
            {String(i + 1).padStart(2, "0")} / {String(STEPS.length).padStart(2, "0")}
          </span>
          <button
            type="button"
            className="btn btn-solid"
            onClick={() => go(i + 1)}
            disabled={last}
          >
            {last ? "End" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
}
