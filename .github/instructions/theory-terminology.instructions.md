---
applyTo: "**/*.html,assets/js/*.js"
---

# Music-theory terminology in translations

The Harmonic Tools apps are music-theory software, so a translated page has to use the
nomenclature a musician in that language would use, not a literal rendering of the
English. Getting a term wrong (for example "voicing" translated as "voice leading")
makes the product look careless to exactly the audience it is for.

- For every concept, use the term found in the standard music-theory teaching
  vocabulary of that language (conservatory textbooks, Wikipedia's music-theory
  articles in that language, the DAW and notation software vendors' localisations).
  If the language normally keeps the English or Italian term (voicing, pentatonic
  where standard, "capo"), keep it.
- Pick one translation per concept and use it on every page of the locale (index, all
  six product pages, headings, `<th>` labels, figcaptions, alt text, aria-labels,
  meta tags, JSON-LD). Consistency matters more than elegance.
- Keep distinct concepts distinct. Do not collapse: scale vs mode, interval vs
  distance, chord vs harmony, voicing vs voice leading vs inversion, parallel key vs
  relative key, borrowed chord (modal interchange) vs secondary dominant, tuning vs
  temperament, cents vs semitones, frequency vs pitch vs tempo (BPM), period vs
  wavelength.
- Concepts to settle per locale, at least: scale, mode and the seven diatonic mode
  names, pentatonic and other named scales, interval, semitone, whole tone, enharmonic,
  chord, triad, seventh chord, extension, inversion, voicing, voice leading, diatonic,
  chromatic, tonic / subdominant / dominant function, Roman numeral analysis, relative
  and parallel key, borrowed chord, secondary dominant, circle of fifths and circle of
  thirds, key signature, transposition, capo, fretboard, guitar tuning, harmonic
  series and overtone, partial, sideband, cents, metronome and tap tempo, subdivision,
  dotted and triplet note values, time signature, LFO rate, FM synthesis ratio.
- Theory-table body data, note and chord symbols, interval tokens and tag lists stay
  in English notation in every locale (see `theory-tables.instructions.md`). Only
  headings, intro paragraphs and `<th>` labels are translated, and the terms there
  must match the terminology used in the surrounding prose.
- Note names in prose follow the same notation as the tables (C, D, E...) unless the
  existing page already explains a locale convention; do not introduce solfège or the
  German H/B convention in places where the table data uses English letters.
- Brand and technical tokens (Siri, Shortcuts, Spotlight, Dynamic Island, Live
  Activity, Notification Center, BPM, Hz, kHz, FM, LFO, MIDI) and product names stay
  as they are.
- Where an English UI label names a feature that also exists as a screen in the app
  (Scale & Chord Finder, Shared Notes, Circle of Fifths), check the app's own
  localisation in the repo's screenshots folder for that locale before translating;
  if the screenshot shows a localised label, use exactly that.
