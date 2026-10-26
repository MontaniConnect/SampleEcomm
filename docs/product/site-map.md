# Site map and route ownership

| Route | Page | Group | Source of content | Priority |
|---|---|---|---|---|
| `/` | Home | Marketing | `site_pages` sections (hero, featured products, testimonials, CTA) | P0 |
| `/products` | Listing + search + goal filter | Catalog | `products`, `wellness_goals` | P0 |
| `/products/{slug}` | Product detail (one template) | Catalog | `products` + related FAQs/testimonials | P0 |
| `/order` | Order form | Transactional | App route; reads `products` | P0 |
| `/order/confirmation` | Confirmation | Transactional | App route; reads the saved order | P0 |
| `/wholesale` | Reseller inquiry | Lead generation | Page copy in `site_pages`; form is app code | P0 |
| `/privacy`, `/terms` | Legal | Legal | `site_pages` (page_type = legal) | P0 before launch |
| `/about` | About Us | Marketing | `site_pages` | P1 |
| `/wellness` | Resources landing | Educational | `wellness_articles`, `faqs` | P1 |
| `/wellness/{slug}` | Article | Educational | `wellness_articles` (only if volume warrants) | P1 |
| `/testimonials` | Testimonials | Trust | `testimonials` | P1 |
| `/contact` | Contact | Support | `site_pages` + `site_settings` | P1 |
| `/admin/*` | Admin | Internal | Not CMS content | P0 (products) |

`/privacy` and `/terms` are proposed here. The source spec lists the pages but gives no URLs.

## Navigation

- Primary: Products, Order, Wellness, About, Testimonials, Wholesale, Contact.
- Footer: Privacy, Terms, social and Messenger links.
- Admin is never in either.

## Admin sections

products, wellness-goals, articles, faqs, testimonials, pages, settings, plus orders and wholesale-inquiries if the admin scope is confirmed (open decision #5).
