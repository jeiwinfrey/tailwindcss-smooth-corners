import path from "node:path";
import { fileURLToPath } from "node:url";

import postcss from "postcss";
import tailwindcss from "@tailwindcss/postcss";
import { describe, expect, it } from "vitest";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const packageRoot = path.resolve(__dirname, "..");

async function compile(css: string) {
  const result = await postcss([tailwindcss()]).process(css, {
    from: path.join(packageRoot, "tests", "fixture.css"),
  });

  return result.css;
}

function expectPattern(output: string, pattern: RegExp) {
  expect(output).toMatch(pattern);
}

describe("tailwindcss-smooth-corners", () => {
  it("auto-applies the zero-config default to rounded utilities", async () => {
    const output = await compile(`
      @import "tailwindcss";
      @plugin "tailwindcss-smooth-corners";
      @source inline("rounded-lg rounded-full rounded-none rounded-[20px]");
    `);

    expect(output).toContain(".rounded-lg");
    expect(output).toContain(".rounded-\\[20px\\]");
    expectPattern(output, /border-radius:\s*var\(--radius-lg\)/);
    expectPattern(output, /@supports \(corner-shape: round\)/);
    expectPattern(output, /corner-shape:\s*superellipse\(2\)/);
  });

  it("covers directional and corner-specific rounded utilities", async () => {
    const output = await compile(`
      @import "tailwindcss";
      @plugin "tailwindcss-smooth-corners";
      @source inline("rounded-s-lg rounded-t-xl rounded-ee-2xl rounded-bl-[32px]");
    `);

    expect(output).toContain(".rounded-s-lg");
    expect(output).toContain(".rounded-t-xl");
    expect(output).toContain(".rounded-ee-2xl");
    expect(output).toContain(".rounded-bl-\\[32px\\]");
    expectPattern(output, /corner-shape:\s*superellipse\(2\)/);
  });

  it("supports named, bare, and arbitrary corner-shape overrides", async () => {
    const output = await compile(`
      @import "tailwindcss";
      @config "./fixtures/tailwind.corner-shape.config.js";
      @plugin "tailwindcss-smooth-corners";
      @source inline("corner-shape-soft corner-shape-3 corner-shape-[1.75] corner-shape-[superellipse(1.6)] corner-shape-round corner-shape-default");
    `);

    expect(output).toContain(".corner-shape-soft");
    expectPattern(output, /corner-shape:\s*superellipse\(4\)/);
    expect(output).toContain(".corner-shape-3");
    expectPattern(output, /corner-shape:\s*superellipse\(3\)/);
    expect(output).toContain(".corner-shape-\\[1\\.75\\]");
    expectPattern(output, /corner-shape:\s*superellipse\(1\.75\)/);
    expect(output).toContain(".corner-shape-\\[superellipse\\(1\\.6\\)\\]");
    expectPattern(output, /corner-shape:\s*superellipse\(1\.6\)/);
    expect(output).toContain(".corner-shape-round");
    expectPattern(output, /corner-shape:\s*round/);
    expect(output).toContain(".corner-shape-default");
    expectPattern(output, /corner-shape:\s*superellipse\(1\.7\)/);
  });

  it("allows the theme default to replace the zero-config default", async () => {
    const output = await compile(`
      @import "tailwindcss";
      @config "./fixtures/tailwind.corner-shape.config.js";
      @plugin "tailwindcss-smooth-corners";
      @source inline("rounded-xl corner-shape-default");
    `);

    expect(output).toContain(".rounded-xl");
    expectPattern(output, /corner-shape:\s*superellipse\(1\.7\)/);
    expect(output).not.toMatch(/corner-shape:\s*superellipse\(2\)/);
  });

  it("supports plugin-level default overrides through the CSS @plugin block", async () => {
    const output = await compile(`
      @import "tailwindcss";
      @plugin "tailwindcss-smooth-corners" {
        default: 2.6;
      }
      @source inline("rounded-lg corner-shape-default");
    `);

    expectPattern(output, /corner-shape:\s*superellipse\(2\.6\)/);
  });
});
