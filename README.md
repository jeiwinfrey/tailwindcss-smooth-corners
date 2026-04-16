# tailwindcss-smooth-corners

`tailwindcss-smooth-corners` is a Tailwind CSS v4 plugin that adds smooth `corner-shape` superellipse rendering to the existing `rounded-*` utility family.

It is built for the CSS-first Tailwind v4 workflow:

```css
@import "tailwindcss";
@plugin "tailwindcss-smooth-corners";
```

The monorepo also includes the docs and playground site for [smooth-corner.jeiwinfrey.com](https://smooth-corner.jeiwinfrey.com).

## Features

- Auto-applies `corner-shape` to `rounded-*` utilities
- Zero-config default with `superellipse(2)`
- `theme.extend.cornerShape` support for defaults and named tokens
- Explicit `corner-shape-*` overrides
- Arbitrary value support, including `corner-shape-[superellipse(1.6)]`
- Progressive enhancement via `@supports (corner-shape: round)`
- TypeScript package output
- No runtime dependency in the published plugin

## Installation

```bash
pnpm add tailwindcss-smooth-corners
```

```css
/* app/globals.css */
@import "tailwindcss";
@plugin "tailwindcss-smooth-corners";
```

## Usage

The plugin upgrades your existing radius utilities automatically:

```html
<div class="rounded-3xl">...</div>
<div class="rounded-[28px]">...</div>
```

For one-off overrides, use `corner-shape-*` utilities:

```html
<div class="rounded-[28px] corner-shape-[superellipse(2.6)]">...</div>
<div class="rounded-[28px] corner-shape-round">...</div>
<div class="rounded-[28px] corner-shape-soft">...</div>
```

You can also set the default directly in CSS:

```css
@plugin "tailwindcss-smooth-corners" {
  default: 2.8;
}
```

## Theme Configuration

Use named tokens and a repo-wide default in `tailwind.config.ts`:

```ts
export default {
  theme: {
    extend: {
      cornerShape: {
        DEFAULT: 2.4,
        squircle: 2,
        soft: 4,
      },
    },
  },
};
```

`number` values are normalized to `superellipse(<number>)`. String values are passed through, which means you can also provide values like `round` or `superellipse(3.2)`.

## Browser Support

The plugin wraps emitted `corner-shape` declarations in `@supports (corner-shape: round)`.

- Browsers with `corner-shape` support render smooth superellipse corners
- Browsers without support keep plain `border-radius`

## Monorepo

```text
packages/tailwindcss-smooth-corners  Published Tailwind plugin
site                                 Next.js docs and playground
```

## Development

```bash
pnpm install
pnpm --filter tailwindcss-smooth-corners test
pnpm --filter site dev
pnpm build
```

## Contributing

Issues and pull requests are welcome. Please read [CONTRIBUTING.md](./CONTRIBUTING.md) before opening a PR.

## License

[MIT](./LICENSE) © jeiwinfrey
