import Link from "next/link";

import {
  ArrowUpRight,
  Braces,
  CornerDownRight,
  Github,
  Layers2,
  Sparkles,
} from "lucide-react";

import { Playground } from "@/components/playground";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

type DemoStyle = React.CSSProperties & {
  cornerShape?: string;
};

const featureCards = [
  {
    icon: Sparkles,
    title: "Rounded utilities, upgraded",
    description:
      "Drop the plugin into Tailwind v4 and every existing rounded utility gets a smooth corner-shape layer without changing how you author classes.",
  },
  {
    icon: Layers2,
    title: "Theme tokens or one-off overrides",
    description:
      "Keep a global default, add named superellipse tokens, or target a single element with corner-shape utilities and arbitrary values.",
  },
  {
    icon: Braces,
    title: "Progressive enhancement",
    description:
      "Unsupported browsers keep plain border-radius. Supported browsers pick up corner-shape automatically behind an @supports gate.",
  },
] as const;

const comparisonCards = [
  {
    eyebrow: "round",
    title: "Default border radius",
    description:
      "The familiar rounded shape is still there, but the corners flatten sooner and feel more geometric.",
    style: {
      borderRadius: "2rem",
    } satisfies DemoStyle,
  },
  {
    eyebrow: "superellipse(2)",
    title: "Zero-config smooth corners",
    description:
      "The default plugin profile shifts the weight into the edges and makes surfaces feel less inflated.",
    style: {
      borderRadius: "2rem",
      cornerShape: "superellipse(2)",
    } satisfies DemoStyle,
  },
  {
    eyebrow: "superellipse(4)",
    title: "Sharper, more editorial",
    description:
      "Named tokens or arbitrary values let you dial the profile toward bolder, squarer silhouettes when the design wants it.",
    style: {
      borderRadius: "2rem",
      cornerShape: "superellipse(4)",
    } satisfies DemoStyle,
  },
] as const;

export default function HomePage() {
  return (
    <main className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[44rem] bg-[radial-gradient(circle_at_top,rgba(255,171,87,0.28),transparent_32%),radial-gradient(circle_at_28%_18%,rgba(255,229,190,0.8),transparent_18%),linear-gradient(180deg,rgba(255,250,243,0.95),rgba(249,241,228,0.78),transparent)]"
      />

      <section className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-5 pb-20 pt-6 sm:px-8 lg:px-10">
        <header className="flex items-center justify-between gap-4 rounded-full border border-border/60 bg-background/70 px-4 py-3 shadow-[0_18px_80px_-48px_rgba(84,51,16,0.5)] backdrop-blur">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-2xl bg-primary/12 text-primary shadow-[inset_0_1px_0_rgba(255,255,255,0.6)]">
              <CornerDownRight className="size-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold tracking-[-0.02em]">
                tailwindcss-smooth-corners
              </span>
              <span className="text-xs text-muted-foreground">
                Tailwind v4 plugin by @jeiwinfrey
              </span>
            </div>
          </div>
          <div className="hidden items-center gap-2 md:flex">
            <Link href="#playground" className={cn(buttonVariants({ variant: "ghost" }))}>
              Playground
            </Link>
            <a
              href="https://github.com/jeiwinfrey/tailwindcss-smooth-corners"
              rel="noreferrer"
              target="_blank"
              className={cn(buttonVariants({ variant: "outline" }))}
            >
              <Github data-icon="inline-start" />
              GitHub
            </a>
          </div>
        </header>

        <div className="grid flex-1 items-start gap-12 pb-14 pt-14 lg:grid-cols-[minmax(0,1.1fr)_minmax(26rem,0.9fr)] lg:gap-14 lg:pt-20">
          <div className="flex flex-col gap-8">
            <div className="flex flex-wrap items-center gap-3">
              <Badge variant="secondary">Tailwind CSS v4</Badge>
              <Badge variant="outline">Zero config default: superellipse(2)</Badge>
              <Badge variant="outline">Progressive enhancement</Badge>
            </div>

            <div className="max-w-3xl space-y-6">
              <p className="text-sm font-medium uppercase tracking-[0.28em] text-primary/80">
                Smooth corners without rewriting your design system
              </p>
              <h1 className="max-w-4xl text-5xl font-semibold tracking-[-0.05em] text-foreground [text-wrap:balance] sm:text-6xl lg:text-7xl">
                Every <span className="text-primary">rounded-*</span> utility gets a smoother
                silhouette.
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-muted-foreground [text-wrap:pretty]">
                Install the package, add a single <code className="inline-code">@plugin</code>{" "}
                line, and Tailwind&apos;s existing radius utilities start rendering as
                superellipse-powered corners on browsers that support{" "}
                <code className="inline-code">corner-shape</code>.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="#playground"
                className={cn(buttonVariants({ size: "lg" }))}
              >
                Open playground
                <ArrowUpRight data-icon="inline-end" />
              </Link>
              <a
                href="https://www.npmjs.com/package/tailwindcss-smooth-corners"
                rel="noreferrer"
                target="_blank"
                className={cn(buttonVariants({ size: "lg", variant: "outline" }))}
              >
                npm install
                <ArrowUpRight data-icon="inline-end" />
              </a>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {featureCards.map(({ icon: Icon, title, description }) => (
                <Card
                  key={title}
                  className="border border-border/60 bg-background/72 shadow-[0_18px_60px_-40px_rgba(90,54,19,0.5)] backdrop-blur"
                >
                  <CardHeader className="gap-3">
                    <div className="flex size-11 items-center justify-center rounded-2xl bg-primary/10 text-primary shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]">
                      <Icon className="size-5" />
                    </div>
                    <CardTitle className="text-base tracking-[-0.02em]">{title}</CardTitle>
                    <CardDescription className="leading-7 [text-wrap:pretty]">
                      {description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>

          <Card className="relative overflow-hidden border border-border/60 bg-[linear-gradient(180deg,rgba(255,255,255,0.92),rgba(253,247,239,0.85))] shadow-[0_32px_120px_-60px_rgba(72,40,11,0.65)]">
            <CardHeader className="gap-3 border-b border-border/60">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <CardTitle className="text-lg tracking-[-0.03em]">Install in 20 seconds</CardTitle>
                  <CardDescription>
                    Keep your existing Tailwind markup. Smooth corners layer on top.
                  </CardDescription>
                </div>
                <Badge variant="outline">OSS</Badge>
              </div>
            </CardHeader>
            <CardContent className="grid gap-4 pt-4">
              <div className="rounded-3xl border border-border/70 bg-[#20160f] p-5 text-sm text-[#f7ead8] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
                <pre className="overflow-x-auto font-mono leading-7">
                  <code>{`pnpm add tailwindcss-smooth-corners

/* app/globals.css */
@import "tailwindcss";
@plugin "tailwindcss-smooth-corners";

/* optional: choose a default */
@plugin "tailwindcss-smooth-corners" {
  default: 2.8;
}`}</code>
                </pre>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                {comparisonCards.map((card) => (
                  <div
                    key={card.title}
                    className="rounded-4xl border border-border/70 bg-background/85 p-4 shadow-[0_16px_36px_-30px_rgba(81,46,14,0.55)]"
                    style={card.style}
                  >
                    <p className="text-xs uppercase tracking-[0.24em] text-primary/80">
                      {card.eyebrow}
                    </p>
                    <h2 className="mt-6 text-base font-semibold tracking-[-0.025em]">
                      {card.title}
                    </h2>
                    <p className="mt-2 text-sm leading-7 text-muted-foreground">
                      {card.description}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <Separator className="bg-border/70" />

        <section className="grid gap-8 py-14 lg:grid-cols-[minmax(0,0.42fr)_minmax(0,0.58fr)] lg:items-start">
          <div className="max-w-xl space-y-4">
            <p className="text-sm font-medium uppercase tracking-[0.28em] text-primary/80">
              Why this exists
            </p>
            <h2 className="text-3xl font-semibold tracking-[-0.04em] [text-wrap:balance] sm:text-4xl">
              Border radius handles geometry. Smooth corners handle perception.
            </h2>
            <p className="text-base leading-8 text-muted-foreground [text-wrap:pretty]">
              Standard rounded corners tend to feel inflated at larger radii. Superellipse
              profiles keep more tension in the edges, which makes buttons, cards, and media
              frames feel calmer and more deliberate.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {comparisonCards.map((card) => (
              <Card
                key={card.eyebrow}
                className="border border-border/60 bg-background/72 shadow-[0_20px_56px_-42px_rgba(88,52,15,0.45)]"
              >
                <CardHeader className="gap-4">
                  <Badge variant="outline">{card.eyebrow}</Badge>
                  <div
                    className="aspect-[5/4] w-full border border-border/60 bg-[radial-gradient(circle_at_20%_18%,rgba(255,183,94,0.22),transparent_28%),linear-gradient(180deg,rgba(255,255,255,0.95),rgba(249,237,219,0.88))] p-4"
                    style={card.style}
                  >
                    <div className="grid h-full grid-cols-[1fr_auto] gap-3 rounded-[inherit] border border-foreground/8 bg-background/70 p-4">
                      <div className="flex flex-col gap-2">
                        <div className="h-3 w-16 rounded-full bg-primary/30" />
                        <div className="h-3 w-24 rounded-full bg-foreground/10" />
                      </div>
                      <div className="size-9 rounded-full bg-primary/12" />
                      <div className="col-span-2 mt-auto grid gap-2">
                        <div className="h-2 w-full rounded-full bg-foreground/8" />
                        <div className="h-2 w-3/4 rounded-full bg-foreground/8" />
                      </div>
                    </div>
                  </div>
                  <div>
                    <CardTitle>{card.title}</CardTitle>
                    <CardDescription className="mt-2 leading-7">
                      {card.description}
                    </CardDescription>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </section>

        <Playground />
      </section>
    </main>
  );
}
