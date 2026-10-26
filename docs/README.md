# Docs layout

Internal only. Never published through the public CMS.

| Folder | Audience | Contents |
|---|---|---|
| `product/` | Owner, content team, designers | `site-map.md`, `content-model.md`, `acceptance-and-qa.md` (to add from the spec) |
| `decisions/` | Everyone | `gaps-and-conflicts.md`, open decisions, later ADRs |
| `technical/` | Developers, ops | One file per topic below |

## `technical/` (stubs to fill once the stack is confirmed)

- `integrations.md` — Sheets, email, analytics: owner, credential location, rotation
- `data-flows.md` — order and wholesale flows, retry and reconciliation
- `environments.md` — env vars and config per environment (names only, no values)
- `deployment-and-rollback.md`
- `backup-and-recovery.md`
- `access-and-permissions.md` — admin roles, who can see orders and leads
- `troubleshooting.md` — failed sheet writes, missing emails, duplicate orders

No credentials, order data, or admin URLs belong in any of these files.
