import { BookOpen, Layers2, PenSquare, ShieldCheck } from "lucide-react";

import { InstallCommandMenu } from "@/components/install-command-menu";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const docsCards = [
  {
    icon: BookOpen,
    title: "Install",
    description: "Add the package and point Tailwind at the plugin from your CSS-first entrypoint.",
    snippet: '@plugin "tailwindcss-smooth-corners";',
  },
  {
    icon: Layers2,
    title: "Set defaults",
    description: "Choose a repo-wide starting profile so every rounded surface inherits the same tension.",
    snippet: "default: 2.8;",
  },
  {
    icon: PenSquare,
    title: "Override locally",
    description: "Use named tokens or arbitrary values when one component needs a different silhouette.",
    snippet: "corner-shape-[superellipse(3.4)]",
  },
  {
    icon: ShieldCheck,
    title: "Fallback behavior",
    description: "Unsupported browsers keep plain rounded corners behind an automatic supports gate.",
    snippet: "@supports (corner-shape: round)",
  },
] as const;

export function QuickStartSection() {
  return (
    <section className="mx-auto flex w-full max-w-6xl flex-col gap-5 py-12">
      <Card className="rounded-[2.4rem] border border-border/70 bg-card">
        <CardHeader className="gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-2">
            <Badge variant="secondary">Quick start</Badge>
            <div className="space-y-1">
              <CardTitle className="text-2xl text-balance">
                Install the package, keep the markup, let the corners settle in.
              </CardTitle>
              <CardDescription className="max-w-2xl leading-7 text-pretty">
                Pick your package manager, drop the plugin into your Tailwind entrypoint, and
                keep using the same rounded utilities you already ship.
              </CardDescription>
            </div>
          </div>
          <InstallCommandMenu className="w-full sm:w-auto" />
        </CardHeader>
        <CardContent>
          <div className="rounded-[2rem] border border-border/70 bg-secondary/40 p-4 font-mono text-sm leading-7 text-foreground">
            <div>{`/* app/globals.css */`}</div>
            <div>{`@import "tailwindcss";`}</div>
            <div>{`@plugin "tailwindcss-smooth-corners";`}</div>
            <div />
            <div>{`@plugin "tailwindcss-smooth-corners" {`}</div>
            <div className="pl-4">default: 2.8;</div>
            <div>{`}`}</div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {docsCards.map(({ icon: Icon, title, description, snippet }) => (
          <Card key={title} className="rounded-[2.2rem] border border-border/70 bg-card">
            <CardHeader className="gap-4">
              <div className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Icon className="size-4" />
              </div>
              <div className="space-y-2">
                <CardTitle>{title}</CardTitle>
                <CardDescription className="leading-7 text-pretty">{description}</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-[1.5rem] border border-border/70 bg-muted/40 px-3 py-2 font-mono text-xs text-foreground">
                {snippet}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
