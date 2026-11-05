---
applyTo: "**/*.html,assets/js/*.js,**/llms.txt"
---

# Writing copy

Applies to every visitor-facing string: page body, headings, `<title>`, meta and
`og:` / `twitter:` descriptions, `alt` text, button and link labels, and the
locale string maps in `main.js` (`NAV_STRINGS`, `FOOTER_STRINGS` and similar).
Dashes are covered separately by the house design skill and `tools/check-dashes.py`.

The aim is copy that reads as written by a person who knows the product, not
generic marketing text that could describe anything. No single pattern below
proves anything: good writers use lists of three and the odd long sentence. A
cluster of them is the problem, and the most reliable tell is missing specifics.

## The test

Before keeping any sentence, ask whether it could appear on a competitor's site
unchanged. If it could, replace it with a fact only this product has, or delete it.

- Prefer names, numbers, versions, file formats, platforms, prices and dates over
  adjectives. "Reads 12 chord types across 7 modes" beats "powerful theory engine".
- Say what the thing does, to whom, in the first sentence. Do not open by
  restating the page topic or describing the problem space.
- Never invent specifics. If a number, quote, review or date is not in the repo or
  given by the user, leave it out or ask. Do not write "experts say", "studies
  show" or cite sources that were not provided.
- It is fine to state an opinion, a limitation or a trade-off. Not every feature
  needs a positive spin, and not every point needs a balancing "on the other hand".

## Sentence patterns to avoid

- **Lists of three by default** ("fast, flexible and reliable"). Use as many items
  as are true, and only ones that are concrete.
- **Short punchy closer after a longer sentence** ("And that matters.", "It's that
  simple.", "No more guesswork."). End the paragraph on the last useful fact.
- **Fake-suspense setups**: "The result?", "Here's the thing:", "The best part?",
  "What does this mean for you?". State the result directly.
- **"Not just X, but Y"** and **"more than just X"**. Say what it is.
- **"Whether you're a beginner or an expert..."** Name the actual audience.
- **"From X to Y" used for breadth** ("from startups to global enterprises"). Use
  it only for a real range with real endpoints.
- **Trailing "-ing" clauses that add vague significance** ("...highlighting the
  importance of collaboration", "...ensuring a seamless experience"). Cut the
  clause, or turn it into its own sentence with a concrete claim.

## Vocabulary to avoid

Do not use these unless the literal meaning is exactly what you need (for example
"navigate" for moving through a real menu):

- delve, tapestry, testament, landscape, realm, nuanced, robust, seamless,
  leverage, elevate, foster, navigate, crucial, pivotal, vibrant, unlock,
  unleash, empower, streamline, cutting-edge, game-changer, next-level,
  state-of-the-art, holistic
- **Grand framing**: "in today's fast-paced world", "ever-evolving", "in the
  digital age", "take it to the next level", "a game-changer"
- **Weak hedges and filler**: "it's important to note", "it's worth mentioning",
  "generally speaking", "can often"
- **Connectors used for rhythm**: moreover, furthermore, additionally, "that
  said". Let adjacent sentences connect by meaning, or use "and" / "but".
- **Inflated significance for ordinary things**: "a pivotal moment", "stands as a
  testament to", "plays a crucial role", "a rich tapestry of".

## Structure

- No intro that restates the topic and no conclusion that repeats the body. Do not
  write "In summary", "Ultimately", "In conclusion" or a closing recap section.
- Vary paragraph and sentence length with the content. A long explanation next to a
  one-line note is normal. Even, metronomic rhythm is not.
- Use as few headings and bullets as the content needs. A short page does not need
  five sections. Prose is the default; use a list only for genuinely parallel items.
- **No bold-label-colon bullets** ("**Scalability:** Easily grows with your needs").
  Write a sentence, or use a real definition list or table when the data is
  tabular.
- **Sentence case for headings and labels** ("Supported scales", not "Supported
  Scales"). This matters more in British English, where Title Case stands out.
  Product names, proper nouns and acronyms keep their normal capitalisation.
- No emoji as bullets, in headings, or as decoration in copy.
- No exclamation marks in marketing copy or success messages.

## Tone

- Plain and specific. Describe, do not hype. Not relentlessly upbeat.
- A little irregularity is fine: a blunt sentence, a specific aside, an unusual but
  accurate word. Do not sand everything down to the same smooth register.
- Match the spelling a page already uses. The publisher is UK-based, so British
  English is the default for new `en` copy. Use plain straight quotes (`'` and
  `"`), not curly quotes.

## Chatbot leftovers (never ship these)

- "Great question!", "Certainly!", "Absolutely!", "I hope this helps!", "Let me
  know if...", "Feel free to..."
- "As of my last update", "as an AI", or any unfilled placeholder such as
  `[Your Name]`, `[Company]`, `TODO`, `Lorem ipsum`.
- Markdown syntax pasted into HTML or plain text (`**bold**`, `# heading`,
  backticks, `- ` bullets) and curly quotes pasted in from a chat window.

## Other locales

These rules describe English. For translated pages, keep the same intent: no
filler, no invented specifics, no fake suspense, and no calques of the English
cliches above (a literal translation of "seamless" is still "seamless"). Do not
apply English-only items such as British spelling or the vocabulary list to other
languages, and do not rewrite a locale's native punctuation to match English
habits. Preserve the meaning of the English source: if the English copy changes,
the translation follows.

## Before finishing

1. Scan the new or changed copy for the patterns above and rewrite, do not just
   swap one banned word for a synonym ("seamless" becoming "smooth" fixes nothing).
2. Check every claim has a specific behind it, or remove it.
3. Run `tools/check-dashes.py` on the changed files.
