# PR Template (Cassius)

Paste into `.github/pull_request_template.md`.

```md
## Summary
- What changed?

## Success criteria (must be measurable)
- [ ] …
- [ ] …

## Test/quality (Ralph Loop)
Loops used (lint/typecheck/unit only): **X/10**

Commands run:
- [ ] `pnpm lint`
- [ ] `pnpm typecheck`
- [ ] `pnpm test`
- [ ] `pnpm e2e` (when applicable)
- [ ] `pnpm build`

## Risk
- Risk level: low / medium / high
- Rollback plan:

## Analytics (PostHog)
- [ ] Events added/updated (list):

## Screenshots / video (if UI)

## Notes
- Known issues / follow-ups:
```
