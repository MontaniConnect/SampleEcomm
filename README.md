# JK Brands Health and Wellness: website plan and prototype

Status: **planning and static prototype**. No backend, no CMS, no production code yet.

This repo holds the agreed information architecture, the CMS content model, a clickable HTML/CSS prototype of every page, and a scaffold for the real build.

## Structure

```
prototype/            Clickable static prototype (plain HTML, CSS, one small JS file)
  flow.html           Review map: start here
  index.html ...      One folder per route (products/, order/, wellness/, admin/ ...)
  assets/style.css    Shared styles
  assets/motion.js    Scroll reveals (optional, skipped for reduced motion)
docs/
  product/            site-map.md, content-model.md
  decisions/          gaps-and-conflicts.md (open questions and conflicts)
  technical/          Planned ops docs (stubs listed in docs/README.md)
app/                  Route scaffold for the real build (empty folders)
  (public)/ (transactional)/ admin/ api/
cms/  lib/  components/  tests/     Empty scaffold folders
```

The `app/` layout uses Next.js App Router naming because the site is on Vercel. That is an assumption until the existing stack is confirmed.

## Run the prototype

No install or build step.

```
# Option 1: open the file
open prototype/flow.html

# Option 2: serve it locally
python3 -m http.server 8000 --directory prototype
# then visit http://localhost:8000/flow.html
```

What to expect:

- All content is placeholder. Currency shows as `XXX` until the launch currency is confirmed.
- Forms send a GET request to the next page so you can walk the flow. Nothing is stored.
- Search, filters, quantities and totals are static sample values.
- Wholesale shows its success banner through a CSS `:target` rule.
- Admin pages are under `prototype/admin/` and are reachable from `flow.html` only.
- Motion is subtle (400ms or less): hero entrance, scroll reveals, hover effects. It is switched off when the visitor prefers reduced motion.

To change the prototype, edit the HTML and `assets/style.css` directly. Product pages and article pages repeat one template, so a template change must be applied to each file.

## Architecture decisions

1. **Three kinds of content, kept apart.** Marketing/catalog content is CMS-managed. Order, order item and wholesale inquiry records are private data, never CMS entries. Technical docs live in `docs/`, never in the public CMS.
2. **Ordering is an application route, not a CMS page.** `/order` and `/order/confirmation` are transactional. The confirmation page must be tied to a saved order, so it cannot be shown by typing the URL.
3. **No inventory.** There are no stock fields anywhere. Customer quantities are order quantities. The team confirms availability after submission.
4. **Orders keep snapshots.** Each order item stores product name and unit price at submission, so later catalog edits do not rewrite history.
5. **Database first, Sheets second (assumed).** Orders are recorded in a protected store, then written to Google Sheets. Failures are logged and retryable. This is not yet confirmed (see open decisions).
6. **One product template.** Products and articles use reusable templates driven by structured content, not hand-built pages.
7. **Separate retail and wholesale workflows.** No accounts, loyalty or full checkout in version 1.
8. **Admin is server-protected and unlisted.** Not linked from public navigation, marked noindex, with permissions enforced server-side.
9. **Visual style follows the current site.** Colors, Inter font, pill buttons, hero, FAQ band and footer come from the existing stylesheet. The logo and photos are placeholders.
10. **Prototype uses no framework.** Plain HTML and CSS keeps it reviewable without tooling. The only script is the optional scroll reveal.

## Open decisions and known gaps

See `docs/decisions/gaps-and-conflicts.md`. The main open items are the existing tech stack, the order backend, admin scope, currency, shipping and payment rules, health-claim approvals, and legal and privacy text.

The prototype keeps the marketplace tiles (Lazada, Shopee, Messenger, TikTok) from the current site. Their role next to the new order form is still to be confirmed.
