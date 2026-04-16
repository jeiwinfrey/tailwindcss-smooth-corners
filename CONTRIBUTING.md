# Contributing

## Getting started

```bash
pnpm install
pnpm --filter tailwindcss-smooth-corners test
pnpm --filter site dev
```

## Workflow

1. Create a branch for your change.
2. Keep changes scoped and intentional.
3. Add or update tests when plugin behavior changes.
4. Run the relevant checks before opening a pull request.

## Pull requests

- Describe the user-facing change clearly.
- Include screenshots for `/site` changes when the UI changed materially.
- Note any browser-support considerations for CSS behavior changes.
- Add a changeset when the change should affect package versioning.

## Local checks

```bash
pnpm --filter tailwindcss-smooth-corners test
pnpm --filter site typecheck
pnpm build
```
