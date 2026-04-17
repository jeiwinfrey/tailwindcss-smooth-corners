# tailwindcss-smooth-corners

`tailwindcss-smooth-corners` is a Tailwind CSS v4 plugin that makes Tailwind's `rounded-*` utilities render with smoother, iOS-style corners using CSS `corner-shape`.

If you already use classes like `rounded-lg`, `rounded-2xl`, or `rounded-[24px]`, this plugin works on top of them. You do not need to learn a new radius system first.

## What This Plugin Does

Normally, Tailwind's rounded utilities only set `border-radius`.

This plugin keeps `border-radius`, then adds `corner-shape` as a progressive enhancement:

- supported browsers get smoother superellipse corners
- unsupported browsers keep normal rounded corners

That means the fallback is already built in.

## Install

```bash
npm install tailwindcss-smooth-corners
```

You can also use:

```bash
pnpm add tailwindcss-smooth-corners
```

```bash
yarn add tailwindcss-smooth-corners
```

```bash
bun add tailwindcss-smooth-corners
```

## Quick Start

Add the plugin to your main CSS file:

```css
@import "tailwindcss";
@plugin "tailwindcss-smooth-corners";
```

That is enough to get started.

Now your existing classes will work like this:

```html
<div class="rounded-xl"></div>
<button class="rounded-full"></button>
<div class="rounded-[24px]"></div>
```

By default, the plugin uses:

```css
superellipse(2)
```

## Beginner Explanation

Think of it like this:

- `border-radius` decides how round the corner is
- `corner-shape` decides the style of that curve

This plugin keeps Tailwind in charge of the radius, and adds a smoother shape on top.

## Changing The Default Shape

If you want a different default shape for the whole project, configure it directly in CSS:

```css
@import "tailwindcss";

@plugin "tailwindcss-smooth-corners" {
  default: 2.8;
}
```

## Theme Configuration

You can also define reusable shape tokens in `tailwind.config.ts`:

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

Then use them with utilities like:

```html
<div class="rounded-2xl corner-shape-squircle"></div>
<div class="rounded-2xl corner-shape-soft"></div>
```

## Per-Element Overrides

If you only want to change the shape on one element, use `corner-shape-*` utilities.

### Named values

```html
<div class="rounded-[28px] corner-shape-soft"></div>
```

### Numeric values

```html
<div class="rounded-[28px] corner-shape-3"></div>
```

### Arbitrary values

```html
<div class="rounded-[28px] corner-shape-[superellipse(1.6)]"></div>
```

### Reset back to normal rounded corners

```html
<div class="rounded-[28px] corner-shape-round"></div>
```

### Reset back to the configured default

```html
<div class="rounded-[28px] corner-shape-default"></div>
```

## Works With Arbitrary Radius Values

This plugin also supports Tailwind's arbitrary radius utilities:

```html
<div class="rounded-[20px]"></div>
<div class="rounded-t-[32px]"></div>
<div class="rounded-bl-[48px]"></div>
```

## Browser Support

The plugin outputs `corner-shape` inside:

```css
@supports (corner-shape: round)
```

So:

- supported browsers get smooth corners
- unsupported browsers fall back to normal Tailwind rounded corners

## Requirements

- Tailwind CSS v4

This package is built for Tailwind's CSS-first plugin workflow.

## Common Example

```css
@import "tailwindcss";
@plugin "tailwindcss-smooth-corners";
```

```html
<div class="rounded-3xl bg-white p-6 shadow-sm">
  Smooth card
</div>

<button class="rounded-full bg-black px-4 py-2 text-white">
  Smooth pill button
</button>
```

## Development

From the monorepo root:

```bash
pnpm --filter tailwindcss-smooth-corners test
pnpm --filter tailwindcss-smooth-corners build
```

## License

MIT
