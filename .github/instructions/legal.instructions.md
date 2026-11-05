---
applyTo: "**/privacy.html,**/terms.html"
---

# Privacy policy and terms of use

Every site in the family carries the same two legal pages, with the same section
order and the same clause wording. Only the facts that really differ between sites
change. These pages are drafted for the publisher, Greenwood IT Consultancy Ltd, and
have not been reviewed by a lawyer; do not add, remove or soften a legal commitment
without the owner's approval.

## Reference text

`harmonic-tools/en/privacy.html` and `harmonic-tools/en/terms.html` are the reference
wording. For any other site, copy the clause text verbatim and change only:

- the brand and product names, and "app" / "apps" / "website" to match what the site
  actually offers;
- clauses that depend on a fact in the table below.

Do not paraphrase a shared clause "to sound better". If a shared clause needs
improving, improve it in the reference and then in every site.

## Fixed structure

Privacy (12 sections, always numbered and in this order): 1 Who we are, 2 What data we
collect, 3 Legal basis for processing, 4 Cookies and analytics, 5 Data sharing,
6 Data retention, 7 International transfers, 8 Your rights, 9 Complaints,
10 Children's privacy, 11 Changes to this policy, 12 Contact us.

Terms (12 sections, always numbered and in this order): 1 About us, 2 Use of our
services, 3 Purchases, 4 Intellectual property, 5 Limitation of liability,
6 Consumer rights, 7 Availability and updates, 8 Third-party services,
9 Termination, 10 Governing law and jurisdiction, 11 Changes to these terms,
12 Contact us.

Headings are sentence case. Keep a section even when little applies, and say so
plainly (for example "No products are sold through this website yet") instead of
dropping it, so numbering and cross-references stay identical across sites.

## Facts that vary per site

Describe what the site does today, not what is planned. Check before writing:

- **Analytics.** Say the site uses Google Analytics only if the Google Analytics
  `<script src>` is in the page head. If the cookie banner is present but no tag is
  loaded, say that analytics is not currently active and that if it is switched on it
  will run only after the visitor accepts the banner and this policy will be updated.
  Never describe analytics, cookies or data that the site does not use.
- **Hosting.** All sites are hosted on GitHub Pages, which may process technical data
  such as IP addresses. Say so in sections 2 and 5 and name GitHub in section 7.
- **Local storage.** Cookie choice and theme preference are stored locally. Say so.
- **Purchases.** Mention Apple and the App Store only where the site's own pages sell
  or link to App Store apps. Do not invent a payment provider. Where there is nothing
  to buy yet, say so in terms section 3.
- **Third-party embeds and links** (for example Instagram feeds, Bandcamp): name only
  the ones that actually appear on the site.
- **Controller.** "Greenwood IT Consultancy Ltd, a limited company registered in
  England and Wales" for every site except Inner Hell Records, which keeps its own
  identity and address. Always write "Ltd", never "Limited".
- **Contact.** Use the site's existing contact mechanism (a `data-email` "Reveal
  email" link where the repo has one, otherwise a `mailto:` link). Do not change the
  address or the mechanism.

## Style

- Plain legal English in the first person plural. No "committed to protecting your
  privacy", no "we encourage you to review", no "improve your experience".
- Do not call Google Analytics data "anonymised"; say it is aggregate usage data that
  is not used to identify individuals.
- Rights lists use the same seven verb-phrase items, each ending with the legal term
  in parentheses where there is one.
- Dates read "Last updated: 5 November 2026" (day, month name, year). Update the date
  whenever the text changes.
- Use the shared markup: `<div class="legal-content">` containing `h2`, `p`, `ul`, and
  a trailing `<p class="legal-date">`. No inline `style` attributes inside the legal
  content, and no bold-label bullets.

## Translations

Mirror the English clause for clause, in the same order, with the same section
numbers. Use the standard legal terms of the language and jurisdiction (for example
the official local names for the data protection regulator and the rights in the GDPR)
rather than a literal translation, and keep the English-law references (UK GDPR,
Consumer Rights Act 2015, England and Wales) unchanged. Brand, product and regulator
names stay as they are. Flag anything doubtful for the owner instead of guessing.
