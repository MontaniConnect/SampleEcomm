# Gaps and conflicts in the architecture

Found while turning the spec into a structure. "Open" items match the spec's own seven open decisions.

## Conflicts

1. **"Final" vs. seven open decisions.** The title says final; section 7 says the spec cannot be locked. Treat as draft.
2. **Order backend is decided and undecided.** Section 4G says store in a protected database, then write to Sheets. Open item 3 asks whether a database is needed at all. The scaffold assumes database first, Sheets second.
3. **Admin scope.** The admin is P0 for *product management* only, yet section 1 includes "order access" and AC-08 needs failed Sheets writes to be "recoverable". Recovery needs some way to see orders. Open item 5.
4. **Confirmation page vs. "only after success".** `/order/confirmation` is a normal URL. Refresh, back button, or a typed URL could show it without an order. It needs a reference to a saved order (signed token or `order_id` plus a check), and must not put personal data in the URL.
5. **Duplicate relationship.** `products.faq_ids` and `faqs.related_products` describe the same link and can drift. The model keeps it on one side.
6. **Per-product currency vs. one order currency.** Every product has a `currency`, but an order has one `currency` and one subtotal. Mixed currencies would break totals.
7. **Subtotal vs. real total.** The order stores only `estimated_subtotal`. Shipping fees and minimums are open (item 4), so the model cannot yet hold a full estimate.
8. **Two publish mechanisms.** `published` boolean on some types, `status` on others. Pick one.

## Gaps

9. **Legal routes missing.** Privacy and terms are P0 before launch but have no URL or nav entry. Added `/privacy` and `/terms`. Shipping and payment policies are "if approved" with no home.
10. **No site settings.** The "configured order limit", contact details, social/Messenger links, notification emails, and default currency need a home. Added `site_settings`.
11. **Order fields missing.** No idempotency key (needed for "duplicates handled safely"), no consent timestamp, no Sheets sync status (separate from `notification_status`), and no defined values for `status`, `notification_status`, or `payment_method_preference`.
12. **Delivery address is one blob.** Shipping coverage and fees (item 4) will likely need structured city/province/postal code.
13. **Wholesale form protection.** Public forms need spam protection and rate limiting. Neither form mentions it. Wholesale also lacks a consent field and notification status.
14. **Search is required, not specified.** AC-03 needs product search; the spec names no approach or searchable fields.
15. **Contact page has no form.** It lists channels only. Confirm that is intended, since inbound messages would otherwise live in Messenger with no record.
16. **Health-claim control.** The spec says claims must be approved and testimonials must not imply outcomes, but there is no approval field or workflow. Proposed `claims_reviewed_at` on products and a publish block on testimonials without consent.
17. **Slug changes and unpublishing.** No redirect handling when a slug changes. No rule for what happens to articles, FAQs, or testimonials that point to an unpublished product, or to a cart that contains one.
18. **Analytics consent.** AC-12 avoids personal data in analytics, but a cookie or consent notice may still be required. Fold into the privacy decision (item 6).
19. **Data retention vs. snapshots and Sheets.** Deletion requests would have to cover the database, Sheets, and email. Retention rules are open (item 6).
20. **Admin discoverability.** "Never linked" is not protection. Needs noindex, server-side auth (already in the checklist), and exclusion from the sitemap.
21. **Author/reviewer is vague.** "Author or reviewer, where applicable" does not say whether this is text or a profile record.
22. **Technical docs location.** The spec says internal, not public, but names no home. Placed in `docs/technical/` in the repo.

## Still open (from the spec)

Stack and reusable admin, product catalog and approved claims, order backend and retry/reconciliation, currency/payment/shipping rules, admin scope, legal and privacy approval, launch targets.
