"use client";

import { useCallback, useEffect, useState } from "react";
import {
  DOC, FIGURES, PROVIDE, RATE, TERMS, TOTAL_FEE, TOTAL_HOURS, WEEKS, WORK, money,
} from "@/lib/proposal";

/* One step per section of the document, and nothing that is not in it. */

function Cover() {
  return (
    <div className="cover">
      <p className="lab lab-a">
        {DOC.kind} &nbsp;&middot;&nbsp; {DOC.ref}
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

      <div className="figs">
        {FIGURES.map((f) => (
          <div className="fig" key={f.k}>
            <p className="lab">{f.k}</p>
            <div className="v">{f.v}</div>
            {f.n ? <div className="n">{f.n}</div> : null}
          </div>
        ))}
      </div>
    </div>
  );
}

function Built() {
  return (
    <>
      <h2>What will be built</h2>
      <div className="work">
        {WORK.map((w) => (
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

function Pricing() {
  return (
    <>
      <h2>Pricing</h2>

      <div className="tbl">
        <table>
          <thead>
            <tr>
              <th>Item</th>
              <th className="r">Hours</th>
            </tr>
          </thead>
          <tbody>
            {WORK.map((w) => (
              <tr key={w.name}>
                <td>{w.name}</td>
                <td className="r num">{w.hours}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td>Total</td>
              <td className="r num">{TOTAL_HOURS}</td>
            </tr>
          </tfoot>
        </table>
      </div>

      <div className="total">
        <span className="lab">
          {TOTAL_HOURS} hours at {money(RATE)} per hour
        </span>
        <span className="amt num">{money(TOTAL_FEE)}</span>
      </div>

      <ul className="list">
        {TERMS.map((t) => (
          <li key={t}>{t}</li>
        ))}
      </ul>
    </>
  );
}

function Timeline() {
  return (
    <>
      <h2>Timeline</h2>
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

const STEPS: { label: string; node: React.ReactNode }[] = [
  { label: "Cover", node: <Cover /> },
  { label: "What will be built", node: <Built /> },
  { label: "Pricing", node: <Pricing /> },
  { label: "Timeline", node: <Timeline /> },
  { label: "What you provide", node: <Provide /> },
];

export default function Deck() {
  const [i, setI] = useState(0);
  const [all, setAll] = useState(false);

  const go = useCallback((n: number) => {
    setI(Math.max(0, Math.min(STEPS.length - 1, n)));
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  // Arrow keys and space, the way anyone reads a deck. Off while the
  // all-on-one-page view is open, where the page scrolls instead.
  useEffect(() => {
    if (all) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const fwd = e.key === "ArrowRight" || e.key === "PageDown" || e.key === " ";
      const back = e.key === "ArrowLeft" || e.key === "PageUp";
      if (!fwd && !back) return;
      e.preventDefault();
      setI((n) => Math.max(0, Math.min(STEPS.length - 1, n + (fwd ? 1 : -1))));
      window.scrollTo({ top: 0, behavior: "instant" });
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
              {DOC.kind} &nbsp;&middot;&nbsp; {DOC.ref}
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

  return (
    <div className="deck">
      <div className="bar">
        <div className="bar-in">
          <p className="lab">
            {DOC.kind} &nbsp;&middot;&nbsp; {DOC.ref}
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
            entry animation instead of swapping text under a static frame. */}
        <div className="step" key={i}>
          {STEPS[i].node}
        </div>
      </div>

      <div className="nav">
        <div className="nav-in">
          <button type="button" className="btn" onClick={() => go(i - 1)} disabled={i === 0}>
            Back
          </button>
          <span className="count">
            {String(i + 1).padStart(2, "0")} / {String(STEPS.length).padStart(2, "0")}
          </span>
          <button
            type="button"
            className="btn btn-solid"
            onClick={() => go(i + 1)}
            disabled={i === STEPS.length - 1}
          >
            {i === STEPS.length - 1 ? "End" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
}
