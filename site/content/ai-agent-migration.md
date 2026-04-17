# Migration brief for AI agents

Please migrate this project to `tailwindcss-smooth-corners`.

## Install the package

Use one package manager command:

```bash
npm install tailwindcss-smooth-corners
pnpm add tailwindcss-smooth-corners
yarn add tailwindcss-smooth-corners
bun add tailwindcss-smooth-corners
```

## Configure Tailwind CSS v4

In the main Tailwind CSS entry file, keep the Tailwind import and add the plugin:

```css
@import "tailwindcss";
@plugin "tailwindcss-smooth-corners";
```

The default corner profile is `superellipse(2)`.

## Optional repo-wide default

Only add this if the product needs a softer or sharper default than `superellipse(2)`:

```css
@plugin "tailwindcss-smooth-corners" {
  default: 2.8;
}
```

## Usage rules

- Keep existing `rounded-*` utilities in place.
- Do not rewrite components just to adopt the plugin.
- Use `corner-shape-*` utilities only for one-off overrides or named tokens.

```html
<div class="rounded-3xl">Default smooth-corner upgrade</div>
<div class="rounded-[28px] corner-shape-[superellipse(2.6)]">One-off override</div>
<div class="rounded-[28px] corner-shape-soft">Named token override</div>
```

## Fallback behavior

Rely on the built-in progressive enhancement. Browsers without `corner-shape` support should keep plain `border-radius` automatically. Do not add custom fallback code unless the project has a documented browser-specific requirement.
