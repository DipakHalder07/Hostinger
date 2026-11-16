# Digital Grove: Website Design in Siliguri (Ads Landing Page)

This is the original Digital Grove landing-page template (same design, layout and classes), with its content rewritten to sell **website design services in Siliguri** and set up for Google/Meta ads, SEO and lead capture.

```text
LP1/
├── index.html                 # Landing page (template design + Siliguri web design content, SEO meta, JSON-LD)
├── thank-you.html             # Post-submit page (noindex); GTM + Ads tag, no duplicate conversion
├── privacy-policy.html        # Privacy policy (linked in the footer and under the form). Review before going live
├── favicon.ico
├── assets/css/style.css       # Original template stylesheet
├── assets/css/lead.css        # Add-ons: quote form, WhatsApp buttons, logo slider, portfolio spacing
├── assets/css/thank-you.css   # Styles for thank-you.html and privacy-policy.html only
├── assets/js/app.js           # Template controller (tabs, reviews, FAQ, menus); CTAs go to the quote form
├── assets/js/lead.js          # Quote form → HubSpot, Google Ads conversion, WhatsApp links, UTM/gclid capture
├── assets/images/             # Only images the pages use (WebP), plus clients/ (logos) and portfolio/ (screenshots)
└── docs/keyword-research-and-ads-plan.md   # Keywords, ad groups, negatives, ad copy, tracking
```

Every file in the project is used by a page. Unused template images, old versions and local tool files were removed (they remain in git history). `.gitignore` keeps `.DS_Store` and local tool folders out of the repo.

## Page sections (in the template's order)

1. **Top ticker:** free consultation, 150+ businesses served, Siliguri
2. **Hero:** "Website Design in Siliguri that brings you more customers", websites from ₹9,999, Get free quote + WhatsApp
3. **Client logo slider:** Trinity Hotel, SGMG, TeaAru, Status Bath & Kitchen, Shree Shyam Sweets, The Tea Cartel, Nidhi Tea, Shaadi Shenanigans, SBM Gold (white logos in `assets/images/clients/`)
4. **Our work:** 9 live client websites (SBM Gold, Status Bath & Kitchen and SGMG first)
5. **Services tabs:** Ecommerce, Business, Schools & coaching, Professionals, Hotels & bookings, Custom web apps, Redesign
6. **Reviews:** 4 real client reviews from digitalgrove.in (placed right before pricing)
7. **Pricing:** Starter ₹9,999 · Business ₹19,999 · Ecommerce ₹34,999 (one-time, starting prices)
8. **3 steps:** consultation → design & build → launch & grow
9. **Why us:** stats · 10. **FAQs:** 8 local FAQs · 11. **Quote form** (`#get-quote`) · 12. WhatsApp CTA · 13. Footer

## Before running ads

1. **Prices:** ₹9,999 / ₹19,999 / ₹34,999 confirmed (pricing cards, FAQ, JSON-LD `OfferCatalog`, hero).
2. **HubSpot form:** ✅ connected to portal `245081602`, form `bbaca643-e741-42f8-aa5a-4b03e7d94778` (same form as the old ads page; only `phone` is required). Sends firstname/lastname, phone, message and UTM/gclid fields.
3. **Tracking:** ✅ Google Ads tag `AW-17957925667` + GTM `GTM-MBS7FWKB` on the landing and thank-you pages. A successful form submit fires the Ads conversion `AW-17957925667/Bk7pCPKB6cocEKPmgPNC` and pushes `generate_lead` + `form_submit_success` (same event as the old page) to the dataLayer, then redirects to `thank-you.html` (which does not fire it again).
4. **URL:** publish at `https://digitalgrove.in/website-design-siliguri`, or update the canonical and OG URLs.
5. **Privacy policy:** review `privacy-policy.html` and publish it at `digitalgrove.in/privacy-policy` (update the two links if you use a different URL).

## Preview locally

Use VS Code Live Server (http://localhost:5500/), or:

```bash
python3 -m http.server 8080 --bind 127.0.0.1
```
Then open http://127.0.0.1:8080/
