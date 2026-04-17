import { AlertTriangle, CheckCircle2 } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const checks = [
  {
    title: "Make sure the plugin line is in the right CSS entry file",
    description:
      "If Tailwind is loaded from `app/globals.css`, the `@plugin " +
      `"tailwindcss-smooth-corners"` +
      "` line should live there too.",
  },
  {
    title: "Confirm you are testing a rounded surface",
    description:
      "The plugin enhances the `rounded-*` utility family. If the element has no rounded utility, there is nothing for it to upgrade.",
  },
  {
    title: "Check browser support before assuming setup is broken",
    description:
      "A browser without `corner-shape` support will still show plain `border-radius`. That is expected fallback behavior, not a failed install.",
  },
  {
    title: "Add overrides only after the default path works",
    description:
      "If you are debugging setup, start with a plain rounded example first. Tokens and one-off overrides are easier to reason about once the base install is confirmed.",
  },
] as const;

export function TroubleshootingSection() {
  return (
    <section className="mx-auto flex w-full max-w-6xl flex-col gap-5 py-12">
      <div className="space-y-4">
        <Badge variant="secondary">Troubleshooting</Badge>
        <div className="space-y-2">
          <h2 className="font-heading text-3xl font-semibold text-balance text-foreground sm:text-4xl">
            If it is not working, check these first
          </h2>
          <p className="max-w-3xl text-base leading-7 text-muted-foreground text-pretty">
            Beginners usually run into one of a few simple setup issues. These checks are ordered
            from most likely to least likely, so you can debug quickly without guessing.
          </p>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
        <Card className="rounded-[2.2rem] border border-border/70 bg-card">
          <CardHeader className="gap-3">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                <CheckCircle2 className="size-5" />
              </div>
              <div>
                <CardTitle>Quick checks</CardTitle>
                <CardDescription className="leading-7 text-pretty">
                  Run through these before changing config or rewriting classes.
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="grid gap-3">
            {checks.map((item) => (
              <div key={item.title} className="rounded-[1.75rem] border border-border/70 bg-muted/30 p-4">
                <p className="text-sm font-medium text-foreground">{item.title}</p>
                <p className="mt-1 text-sm leading-7 text-muted-foreground text-pretty">
                  {item.description}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="rounded-[2.2rem] border border-border/70 bg-card">
          <CardHeader className="gap-3">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                <AlertTriangle className="size-5" />
              </div>
              <div>
                <CardTitle>Good debugging habit</CardTitle>
                <CardDescription className="leading-7 text-pretty">
                  Start simple, verify one thing at a time, then add complexity back in.
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="grid gap-3">
            <div className="rounded-[1.75rem] border border-border/70 bg-secondary/30 p-4">
              <p className="text-sm font-medium text-foreground">Begin with this mental model</p>
              <p className="mt-1 text-sm leading-7 text-muted-foreground text-pretty">
                If the plugin is installed and the element uses a rounded utility, the enhanced
                corners should appear only in browsers that support `corner-shape`. Everything
                else is optional configuration.
              </p>
            </div>
            <div className="rounded-[1.75rem] border border-border/70 bg-muted/30 p-4">
              <p className="text-sm font-medium text-foreground">Then move in this order</p>
              <p className="mt-1 text-sm leading-7 text-muted-foreground text-pretty">
                Install → CSS plugin line → rounded utility test → default config → overrides.
                This sequence makes setup issues much easier to isolate.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
