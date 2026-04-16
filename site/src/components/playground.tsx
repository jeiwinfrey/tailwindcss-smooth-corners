"use client";

import { useDeferredValue, useState, useTransition } from "react";

import { motion } from "motion/react";
import {
  ArrowRight,
  Copy,
  Layers2,
  Package,
  Sparkles,
  Waves,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type DemoStyle = React.CSSProperties & {
  cornerShape?: string;
};

const presetMap = {
  round: 1,
  squircle: 2,
  sharp: 4,
} as const;

const spring = {
  type: "spring" as const,
  duration: 0.3,
  bounce: 0,
};

function formatNumber(value: number) {
  return Number(value.toFixed(1)).toString();
}

function getSliderValue(value: number | readonly number[] | undefined, fallback: number) {
  if (typeof value === "number") {
    return value;
  }

  return value?.[0] ?? fallback;
}

export function Playground() {
  const [radius, setRadius] = useState(28);
  const [shape, setShape] = useState(2);
  const [tab, setTab] = useState("usage");
  const [isPending, startTransition] = useTransition();
  const deferredRadius = useDeferredValue(radius);
  const deferredShape = useDeferredValue(shape);

  const shapeValue = formatNumber(deferredShape);
  const radiusValue = Math.round(deferredRadius);
  const namedShapeValue = deferredShape >= 3.5 ? "soft" : deferredShape >= 2 ? "squircle" : "round";
  const pluginSnippet = `pnpm add tailwindcss-smooth-corners

/* app/globals.css */
@import "tailwindcss";
@plugin "tailwindcss-smooth-corners";`;
  const themeSnippet = `// tailwind.config.ts
export default {
  theme: {
    extend: {
      cornerShape: {
        DEFAULT: ${shapeValue},
        soft: 4,
      },
    },
  },
};`;
  const usageSnippet = `<div className="rounded-[${radiusValue}px] bg-card p-8 shadow-sm">
  Zero-config: corner-shape uses superellipse(${shapeValue})
</div>

<div className="rounded-[${radiusValue}px] corner-shape-[superellipse(${shapeValue})] bg-card p-8 shadow-sm">
  Per-element override
</div>

<div className="rounded-[${radiusValue}px] corner-shape-${namedShapeValue} bg-card p-8 shadow-sm">
  Named token
</div>`;

  const smoothStyle: DemoStyle = {
    borderRadius: `${radiusValue}px`,
    cornerShape: `superellipse(${shapeValue})`,
  };
  const roundStyle: DemoStyle = {
    borderRadius: `${radiusValue}px`,
    cornerShape: "round",
  };
  const sharpStyle: DemoStyle = {
    borderRadius: `${radiusValue}px`,
    cornerShape: "superellipse(4)",
  };

  return (
    <section
      id="playground"
      className="grid gap-8 py-16 lg:grid-cols-[minmax(0,0.4fr)_minmax(0,0.6fr)] lg:items-start"
    >
      <div className="max-w-xl space-y-4">
        <p className="text-sm font-medium uppercase tracking-[0.28em] text-primary/80">
          Playground
        </p>
        <h2 className="text-3xl font-semibold tracking-[-0.04em] [text-wrap:balance] sm:text-4xl">
          Tune the radius and superellipse profile, then copy the matching Tailwind code.
        </h2>
        <p className="text-base leading-8 text-muted-foreground [text-wrap:pretty]">
          The live preview uses the same underlying CSS properties the plugin emits, so you can
          compare plain rounded corners, the current default, and a sharper named token without
          waiting on a build step.
        </p>
        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            onClick={() =>
              startTransition(() => {
                setShape(presetMap.round);
                setRadius(24);
              })
            }
          >
            <Waves data-icon="inline-start" />
            round
          </Button>
          <Button
            variant="outline"
            onClick={() =>
              startTransition(() => {
                setShape(presetMap.squircle);
                setRadius(28);
              })
            }
          >
            <Sparkles data-icon="inline-start" />
            squircle
          </Button>
          <Button
            variant="outline"
            onClick={() =>
              startTransition(() => {
                setShape(presetMap.sharp);
                setRadius(32);
              })
            }
          >
            <Layers2 data-icon="inline-start" />
            sharp
          </Button>
        </div>
      </div>

      <div className="grid gap-5">
        <Card className="border border-border/60 bg-[linear-gradient(180deg,rgba(255,255,255,0.94),rgba(250,242,230,0.86))] shadow-[0_32px_120px_-70px_rgba(85,51,16,0.72)]">
          <CardHeader className="gap-4 border-b border-border/60">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <CardTitle className="text-xl tracking-[-0.03em]">Live preview</CardTitle>
                <CardDescription>
                  Radius {radiusValue}px with a current default of superellipse({shapeValue})
                </CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="secondary">radius {radiusValue}</Badge>
                <Badge variant="outline">shape {shapeValue}</Badge>
              </div>
            </div>
          </CardHeader>

          <CardContent className="grid gap-6 pt-5">
            <div className="grid gap-4 lg:grid-cols-3">
              {[
                {
                  label: "Plain round",
                  description: "Rounded corners only",
                  style: roundStyle,
                },
                {
                  label: "Plugin default",
                  description: `superellipse(${shapeValue})`,
                  style: smoothStyle,
                },
                {
                  label: "Named sharp token",
                  description: "superellipse(4)",
                  style: sharpStyle,
                },
              ].map((preview, index) => (
                <motion.div
                  key={preview.label}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ ...spring, delay: index * 0.08 }}
                  className="rounded-4xl border border-border/70 bg-background/86 p-4 shadow-[0_20px_48px_-42px_rgba(77,44,14,0.58)]"
                >
                  <div className="flex items-center justify-between gap-2">
                    <div>
                      <p className="text-sm font-semibold tracking-[-0.02em]">{preview.label}</p>
                      <p className="text-xs text-muted-foreground">{preview.description}</p>
                    </div>
                    <Badge variant="outline">{index + 1}</Badge>
                  </div>
                  <motion.div
                    layout
                    transition={spring}
                    className="mt-4 aspect-[5/4] border border-border/70 bg-[radial-gradient(circle_at_20%_18%,rgba(255,183,94,0.22),transparent_28%),linear-gradient(180deg,rgba(255,255,255,0.96),rgba(248,234,211,0.84))] p-4"
                    style={preview.style}
                  >
                    <div className="grid h-full grid-cols-[1fr_auto] gap-3 rounded-[inherit] border border-foreground/8 bg-background/72 p-4">
                      <div className="flex flex-col gap-2">
                        <div className="h-3 w-14 rounded-full bg-primary/28" />
                        <div className="h-3 w-20 rounded-full bg-foreground/10" />
                      </div>
                      <div className="size-9 rounded-full bg-primary/12" />
                      <div className="col-span-2 mt-auto grid gap-2">
                        <div className="h-2 w-full rounded-full bg-foreground/8" />
                        <div className="h-2 w-2/3 rounded-full bg-foreground/8" />
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>

            <Separator className="bg-border/70" />

            <div className="grid gap-6 lg:grid-cols-[minmax(0,0.43fr)_minmax(0,0.57fr)]">
              <div className="grid gap-5">
                <div className="grid gap-3">
                  <div className="flex items-center justify-between gap-3">
                    <Label>Corner radius</Label>
                    <span className="font-mono text-sm tabular-nums text-muted-foreground">
                      {radiusValue}px
                    </span>
                  </div>
                  <Slider
                    value={[radius]}
                    min={8}
                    max={64}
                    step={1}
                    onValueChange={(value) => {
                      startTransition(() => {
                        setRadius(getSliderValue(value, 28));
                      });
                    }}
                  />
                </div>

                <div className="grid gap-3">
                  <div className="flex items-center justify-between gap-3">
                    <Label>Superellipse value</Label>
                    <span className="font-mono text-sm tabular-nums text-muted-foreground">
                      {shapeValue}
                    </span>
                  </div>
                  <Slider
                    value={[shape]}
                    min={0.5}
                    max={5}
                    step={0.1}
                    onValueChange={(value) => {
                      startTransition(() => {
                        setShape(getSliderValue(value, 2));
                      });
                    }}
                  />
                </div>

                <div className="rounded-3xl border border-border/70 bg-background/72 p-4">
                  <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">
                    current utilities
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <Badge variant="secondary">{`rounded-[${radiusValue}px]`}</Badge>
                    <Badge variant="outline">{`corner-shape-[superellipse(${shapeValue})]`}</Badge>
                    <Badge variant="outline">{`corner-shape-${namedShapeValue}`}</Badge>
                  </div>
                  <p className="mt-4 text-sm leading-7 text-muted-foreground">
                    {isPending
                      ? "Updating previews..."
                      : "Use the global default for most surfaces, then override only the pieces that need a stronger profile."}
                  </p>
                </div>
              </div>

              <Card className="border border-border/60 bg-[#20160f] text-[#f8eddc] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
                <CardHeader className="gap-4 border-b border-white/8">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <CardTitle className="text-lg text-[#fff6ea]">Generated code</CardTitle>
                      <CardDescription className="text-[#d6c0a3]">
                        Match the live preview with one copyable snippet.
                      </CardDescription>
                    </div>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={async () => {
                        await navigator.clipboard.writeText(usageSnippet);
                      }}
                    >
                      <Copy data-icon="inline-start" />
                      Copy
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="pt-5">
                  <Tabs value={tab} onValueChange={setTab}>
                    <TabsList variant="line">
                      <TabsTrigger value="install">
                        <Package data-icon="inline-start" />
                        install
                      </TabsTrigger>
                      <TabsTrigger value="theme">
                        <Layers2 data-icon="inline-start" />
                        theme
                      </TabsTrigger>
                      <TabsTrigger value="usage">
                        <ArrowRight data-icon="inline-start" />
                        usage
                      </TabsTrigger>
                    </TabsList>
                    <TabsContent value="install" className="mt-4">
                      <pre className="overflow-x-auto rounded-3xl border border-white/8 bg-black/12 p-4 text-sm leading-7">
                        <code>{pluginSnippet}</code>
                      </pre>
                    </TabsContent>
                    <TabsContent value="theme" className="mt-4">
                      <pre className="overflow-x-auto rounded-3xl border border-white/8 bg-black/12 p-4 text-sm leading-7">
                        <code>{themeSnippet}</code>
                      </pre>
                    </TabsContent>
                    <TabsContent value="usage" className="mt-4">
                      <pre className="overflow-x-auto rounded-3xl border border-white/8 bg-black/12 p-4 text-sm leading-7">
                        <code>{usageSnippet}</code>
                      </pre>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
