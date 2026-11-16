# Digital Grove: Website Design in Siliguri (Ads Landing Page)

This is the original Digital Grove landing-page template (same design, layout and classes), with its content rewritten to sell **website design services in Siliguri** and set up for Google/Meta ads, SEO and lead capture.

```text
LP1/
├── index.html                 # Landing page (template design + Siliguri web design content, SEO meta, JSON-LD)
├── thank-you.html             # Post-submit page (noindex). Put your Google Ads conversion tag here
├── privacy-policy.html        # Privacy policy (linked in the footer and under the form). Review before going live
├── assets/css/style.css       # Original template stylesheet (unchanged)
├── assets/css/lead.css        # Small add-on: quote form, WhatsApp buttons, client names, review initials
├── assets/css/thank-you.css   # Styles for thank-you.html only
├── assets/js/app.js           # Original template controller (tabs, reviews, FAQ, menus), CTAs now go to the form
├── assets/js/lead.js          # Quote form → HubSpot, WhatsApp links, UTM/gclid capture, dataLayer events
├── assets/images/             # Template images + assets/images/portfolio (real client screenshots)
└── docs/keyword-research-and-ads-plan.md   # Keywords, ad groups, negatives, ad copy, tracking
```

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

1. **Prices:** check ₹9,999 / ₹19,999 / ₹34,999 (pricing cards, FAQ, JSON-LD `OfferCatalog`, hero).
2. **HubSpot form ID:** set `hubspotFormGuid` in `assets/js/lead.js`. Until you do, **form leads are not saved**: visitors only get the thank-you page and a WhatsApp button.
3. **Tracking:** add GTM (both pages) or the Google Ads conversion snippet in `thank-you.html`, and create a conversion for the `generate_lead` event.
4. **URL:** publish at `https://digitalgrove.in/website-design-siliguri`, or update the canonical and OG URLs.
5. **Privacy policy:** review `privacy-policy.html` and publish it at `digitalgrove.in/privacy-policy` (update the two links if you use a different URL).

## Preview locally

```bash
python3 -m http.server 3000 --bind 127.0.0.1
```
Then open http://127.0.0.1:3000/
