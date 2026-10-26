# Content model

Two stores, kept apart.

- **CMS (public content):** `products`, `wellness_goals`, `wellness_articles`, `faqs`, `testimonials`, `site_pages`, `site_settings`
- **Protected database (private records):** `orders`, `order_items`, `wholesale_inquiries`

All types use a stable `id` (UUID or CMS ID). No type has stock, quantity-available, or inventory-sync fields.

Rows marked **(added)** are not in the source spec. They are proposals tied to a gap in `docs/decisions/gaps-and-conflicts.md`.

## Relationships

```
wellness_goals  <-->  products  <-->  faqs
                         ^   ^
        wellness_articles   testimonials (optional link)
                         |
orders -> order_items -> product_id + name/price snapshot

wholesale_inquiries   (standalone, private)
site_pages            (references products, testimonials, faqs through sections)
```

Rule: each many-to-many link is stored on **one** side only (see gap #5).

## products

| Field | Type | Notes |
|---|---|---|
| id | UUID | required, unique |
| name | text | required |
| slug | unique slug | required |
| short_description | plain text | required |
| description | rich text | required |
| images | media gallery | required |
| retail_price | decimal | required, > 0 |
| currency | ISO code | required; launch currency unconfirmed |
| wellness_goals | relation (many) | required, at least one |
| ingredients | rich text | where applicable |
| directions | rich text | where applicable |
| warnings | rich text | where applicable |
| faqs | relation (many) | optional (spec calls it `faq_ids`) |
| featured | boolean | default false |
| published | boolean | default false |
| seo_title, seo_description | text | optional |
| updated_at | timestamp | system |
| claims_reviewed_at **(added)** | timestamp | optional gate before publish |

## wellness_goals

id, name, slug, description, image, sort_order, published.

## wellness_articles

id, title, slug, summary, body, cover_image, related_products (relation), author_or_reviewer (text, or a relation if reviewers need profiles), published_at, updated_at, status (draft | published), seo_title, seo_description.

## faqs

id, question, answer, category, sort_order, published. `related_products` lives here only (see gap #5).

## testimonials

id, customer_display_name, quote, related_product (optional), consent_confirmed, published, sort_order.
Rule: cannot publish unless `consent_confirmed` is true. **(added)** `consent_note` and `received_at` for audit.

## site_pages

id, title, slug, page_type (home | about | contact | legal | other), sections (ordered blocks), seo_title, seo_description, status, updated_at.

Section blocks: hero, text_and_image, featured_products, testimonials, faq_list, cta.

## site_settings **(added, single record)**

Business name and logo, contact details, Messenger and social URLs, default currency, order quantity limit, staff notification emails, order minimum and shipping note (if confirmed). Navigation is code, not content.

## orders (private)

order_id, created_at, customer_name, email, phone, delivery_address, payment_method_preference, special_instructions, estimated_subtotal, currency, status, notification_status.
**(added)** idempotency_key, privacy_consent_at, sheet_sync_status, sheet_synced_at.

## order_items (private)

order_id, product_id, product_name_snapshot, unit_price_snapshot, quantity, line_subtotal.

## wholesale_inquiries (private)

inquiry_id, created_at, contact_name, business_name, email, phone, business_type, products_of_interest, estimated_order_volume (optional), message, status.
**(added)** privacy_consent_at, notification_status.

## Publishing states

Spec mixes `published` (boolean) and `status` (draft | published). Proposal: use `status` everywhere (draft | published). Gap #8.
