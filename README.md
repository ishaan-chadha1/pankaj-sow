# Pankaj Soni — Statement of Work

A click-through proposal. Nine steps, arrow keys or the buttons, plus a
**Read it all** view that puts everything on one page for printing or saving.

Every word lives in [`lib/proposal.ts`](lib/proposal.ts) — the deck and the
one-page view are two readings of the same data, so an edit made once shows up
in both. The total is computed from the workstream hours rather than typed, so
the document cannot contradict itself.

## Run it

```bash
npm install
npm run dev
```

## Deploy

Vercel detects Next automatically — no configuration needed.

```bash
npx vercel deploy --prod
```

Or push to GitHub and import the repo at vercel.com/new.

The page is marked `noindex`: a client proposal has no business turning up in
search results. Anyone with the link can read it, so treat the URL as private.

## Save it as a PDF

Open **Read it all**, then **Save as PDF**. In the browser's print dialogue set
the destination to *Save as PDF* and switch **Background graphics** on — without
it the hour badges, the rules and the accent colour are dropped.

A4, one section per page, and nothing splits across a page break. Chrome gives
the cleanest result; Safari adds its own header and footer unless you turn them
off in the dialogue.

## Change the numbers

Edit `lib/proposal.ts`. Adding or removing a workstream re-totals the hours and
the fee on its own.
