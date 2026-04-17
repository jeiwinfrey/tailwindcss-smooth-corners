import { DocsSnippetCard } from "@/components/home/docs-snippet-card";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const docsSteps = [
  {
    step: "1",
    title: "Install the package",
    description:
      "Start with your package manager of choice. You only need the plugin package itself.",
  },
  {
    step: "2",
    title: "Add the plugin to your CSS",
    description:
      "In Tailwind v4, plugin setup usually happens in the same CSS entrypoint where you import Tailwind.",
  },
  {
    step: "3",
    title: "Keep using rounded utilities",
    description:
      "You do not need new markup for the default behavior. Existing `rounded-*` utilities are upgraded automatically.",
  },
  {
    step: "4",
    title: "Verify the fallback behavior",
    description:
      "Browsers that support `corner-shape` show the smoother geometry. Others keep normal `border-radius`.",
  },
] as const;

const installSnippet = `npm install tailwindcss-smooth-corners
pnpm add tailwindcss-smooth-corners
yarn add tailwindcss-smooth-corners
bun add tailwindcss-smooth-corners`;

const installCommands = [
  { id: "npm", label: "npm", command: "npm install tailwindcss-smooth-corners" },
  { id: "pnpm", label: "pnpm", command: "pnpm add tailwindcss-smooth-corners" },
  { id: "yarn", label: "yarn", command: "yarn add tailwindcss-smooth-corners" },
  { id: "bun", label: "bun", command: "bun add tailwindcss-smooth-corners" },
] as const;

const cssSetupSnippet = `/* app/globals.css */
@import "tailwindcss";
@plugin "tailwindcss-smooth-corners";`;

const firstResultSnippet = `<div class="rounded-3xl bg-card p-6">
  This already gets smooth corners where supported
</div>`;

const defaultSnippet = `@plugin "tailwindcss-smooth-corners" {
  default: 2.8;
}`;

const overrideSnippet = `<div class="rounded-[28px] corner-shape-[superellipse(3.2)]">
  Sharper one-off override
</div>

<div class="rounded-[28px] corner-shape-soft">
  Named token override
</div>`;

export function BeginnerDocsSection() {
  return (
    <section className="mx-auto flex w-full max-w-6xl flex-col gap-5 py-12">
      <div className="space-y-4">
        <Badge variant="secondary">Beginner docs</Badge>
        <div className="space-y-2">
          <h2 className="font-heading text-3xl font-semibold text-balance text-foreground sm:text-4xl">
            Read this once, ship it once, keep using the same rounded classes.
          </h2>
          <p className="max-w-3xl text-base leading-7 text-muted-foreground text-pretty">
            This page is designed so a beginner can go from zero setup to a working result
            without leaving the home page. Start with installation, verify the first result,
            then move on to defaults and overrides only if you need them.
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {docsSteps.map((item) => (
          <Card key={item.step} className="rounded-[2.2rem] border border-border/70 bg-card">
            <CardHeader className="gap-3">
              <div className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                <span className="font-mono text-sm tabular-nums">{item.step}</span>
              </div>
              <div className="space-y-2">
                <CardTitle>{item.title}</CardTitle>
                <CardDescription className="leading-7 text-pretty">
                  {item.description}
                </CardDescription>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>

      <DocsSnippetCard
        eyebrow="Getting started"
        title="Install the plugin"
        description="If you are just trying it for the first time, pick one package manager command below, install the package, and then move to your Tailwind CSS entry file."
        code={installSnippet}
        copyOptions={[...installCommands]}
      />

      <DocsSnippetCard
        eyebrow="Setup"
        title="Add it to your Tailwind CSS entrypoint"
        description="For Tailwind v4, import Tailwind and then declare the plugin. This is enough to enable the default behavior."
        code={cssSetupSnippet}
      />

      <DocsSnippetCard
        eyebrow="First result"
        title="Use your existing rounded utilities"
        description="The beginner-friendly mental model is simple: keep writing `rounded-*` and let the plugin enhance those corners automatically."
        code={firstResultSnippet}
      />

      <div className="grid gap-4 lg:grid-cols-2">
        <DocsSnippetCard
          eyebrow="Configuration"
          title="Set a repo-wide default"
          description="The plugin starts at `superellipse(2)` by default. If you want all rounded surfaces to feel a little softer or a little sharper, set a new default value in the plugin block."
          code={defaultSnippet}
        />

        <DocsSnippetCard
          eyebrow="Overrides"
          title="Use one-off or named overrides"
          description="Once the default is in place, only override a surface when you need a more specific silhouette for that component."
          code={overrideSnippet}
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
        <Card className="rounded-[2.2rem] border border-border/70 bg-card">
          <CardHeader className="gap-3">
            <CardTitle>What you get automatically</CardTitle>
            <CardDescription className="leading-7 text-pretty">
              The plugin is intentionally small in scope. It upgrades what you already use
              instead of asking you to learn a new styling workflow on day one.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3">
            <InfoRow
              title="Existing rounded utilities keep working"
              description="A `rounded-3xl` or `rounded-[28px]` surface still reads like a normal Tailwind surface, just with smoother geometry where supported."
            />
            <InfoRow
              title="Unsupported browsers still look correct"
              description="If the browser does not support `corner-shape`, users still see plain rounded corners instead of a broken layout."
            />
            <InfoRow
              title="You can stay at the default level"
              description="Beginners do not need tokens or overrides immediately. The out-of-the-box default is `superellipse(2)`, so you can install, enable, and keep moving until you actually need more control."
            />
          </CardContent>
        </Card>

        <Card className="rounded-[2.2rem] border border-border/70 bg-card">
          <CardHeader className="gap-3">
            <CardTitle>Browser fallback, in plain language</CardTitle>
            <CardDescription className="leading-7 text-pretty">
              The plugin wraps its `corner-shape` output in an `@supports` check, so it only
              applies the enhanced geometry when the browser understands it.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3">
            <InfoRow
              title="Supported browser"
              description="You see the smoother superellipse corner profile."
            />
            <InfoRow
              title="Unsupported browser"
              description="You still get normal `border-radius`, so the component remains usable and visually correct."
            />
            <InfoRow
              title="Why this matters"
              description="It keeps adoption low-risk for beginners, because the fallback is built in rather than something you have to wire up yourself."
            />
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

function InfoRow({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-[1.75rem] border border-border/70 bg-muted/30 p-4">
      <p className="text-sm font-medium text-foreground">{title}</p>
      <p className="mt-1 text-sm leading-7 text-muted-foreground text-pretty">{description}</p>
    </div>
  );
}
