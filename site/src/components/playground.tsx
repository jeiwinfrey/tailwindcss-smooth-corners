"use client";

import { useDeferredValue, useState } from "react";

import { motion, useReducedMotion } from "motion/react";
import {
  Bell,
  Bot,
  CornerDownRight,
  ImageIcon,
  LayoutPanelTop,
  MessageSquareText,
  PanelsTopLeft,
  Search,
  SlidersHorizontal,
  Sparkles,
  WandSparkles,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

type DemoStyle = React.CSSProperties & {
  cornerShape?: string;
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
  const [shape, setShape] = useState(2.4);
  const [fallbackEnabled, setFallbackEnabled] = useState(false);
  const deferredRadius = useDeferredValue(radius);
  const deferredShape = useDeferredValue(shape);
  const reduceMotion = Boolean(useReducedMotion());

  const radiusValue = Math.round(deferredRadius);
  const shapeValue = formatNumber(deferredShape);

  function createStyle(localRadius: number): DemoStyle {
    return fallbackEnabled
      ? { borderRadius: `${localRadius}px` }
      : { borderRadius: `${localRadius}px`, cornerShape: `superellipse(${shapeValue})` };
  }

  const surfaces = {
    shell: createStyle(radiusValue),
    card: createStyle(Math.max(radiusValue - 2, 14)),
    chip: createStyle(Math.max(radiusValue - 10, 12)),
    button: createStyle(Math.max(radiusValue - 12, 12)),
    bubble: createStyle(Math.max(radiusValue - 6, 16)),
  };

  return (
    <section className="grid h-full min-h-0 gap-4 py-4 lg:grid-cols-[18rem_minmax(0,1fr)]">
      <Card
        className="h-fit min-h-0 rounded-[2.4rem] border border-border/70 bg-card lg:sticky lg:top-0"
        style={surfaces.shell}
      >
        <CardHeader className="gap-3">
          <Badge variant="secondary">Playground</Badge>
          <div className="space-y-1">
            <CardTitle className="text-xl text-balance">Tune the surface.</CardTitle>
            <CardDescription className="text-sm leading-6 text-pretty">
              One control dock, a structured showcase grid.
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <div className="flex items-center justify-between gap-3">
              <Label htmlFor="radius-slider">Corner radius</Label>
              <span className="font-mono text-sm tabular-nums text-muted-foreground">
                {radiusValue}px
              </span>
            </div>
            <Slider
              id="radius-slider"
              value={[radius]}
              min={10}
              max={48}
              step={1}
              onValueChange={(value) => {
                setRadius(getSliderValue(value, 28));
              }}
            />
          </div>

          <div className="grid gap-2">
            <div className="flex items-center justify-between gap-3">
              <Label htmlFor="shape-slider">Superellipse</Label>
              <span className="font-mono text-sm tabular-nums text-muted-foreground">
                {shapeValue}
              </span>
            </div>
            <Slider
              id="shape-slider"
              value={[shape]}
              min={0.8}
              max={5}
              step={0.1}
              onValueChange={(value) => {
                setShape(getSliderValue(value, 2.4));
              }}
            />
          </div>

          <div className="flex items-center justify-between gap-4 rounded-[2rem] border border-border/70 bg-secondary/40 p-3">
            <div className="space-y-1">
              <Label htmlFor="fallback-toggle">Fallback preview</Label>
              <p className="text-sm leading-5 text-muted-foreground">
                {fallbackEnabled ? "Plain radius only" : "Enhanced corners"}
              </p>
            </div>
            <Switch
              id="fallback-toggle"
              checked={fallbackEnabled}
              onCheckedChange={setFallbackEnabled}
              aria-label="Toggle fallback preview"
            />
          </div>

          <div className="rounded-[2rem] border border-border/70 bg-muted/40 p-3">
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline">{`radius ${radiusValue}px`}</Badge>
              <Badge variant="outline">
                {fallbackEnabled ? "fallback" : `superellipse(${shapeValue})`}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid min-h-0 auto-rows-[18rem] content-start gap-4 overflow-y-auto pr-1 lg:grid-cols-4">
        <ShowcaseCard
          icon={WandSparkles}
          title="Buttons"
          description="Fast feedback surfaces."
          reduceMotion={reduceMotion}
          style={surfaces.shell}
          size="wide"
        >
          <motion.div
            animate={reduceMotion ? { opacity: 1 } : { opacity: 1, transform: "translateY(0px)" }}
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, transform: "translateY(8px)" }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="flex flex-wrap gap-2"
          >
            <Button style={surfaces.button} className="rounded-[inherit]">
              Primary
            </Button>
            <Button variant="outline" style={surfaces.button} className="rounded-[inherit]">
              Secondary
            </Button>
            <span
              className="inline-flex items-center gap-2 border border-border/70 bg-secondary/50 px-3 py-2 text-sm text-foreground"
              style={surfaces.chip}
            >
              <Sparkles className="size-4 text-primary" />
              Token
            </span>
          </motion.div>
        </ShowcaseCard>

        <ShowcaseCard
          icon={PanelsTopLeft}
          title="Cards"
          description="Calmer large surfaces."
          reduceMotion={reduceMotion}
          style={surfaces.shell}
          size="wide"
        >
          <div className="grid h-full gap-3 overflow-y-auto md:grid-cols-2">
            <div className="border border-border/70 bg-card p-4" style={surfaces.card}>
              <p className="text-sm font-medium text-foreground">Launch assets</p>
              <p className="mt-1 text-sm text-muted-foreground">Ready for review</p>
              <div className="mt-4 grid gap-2">
                <div className="h-2 rounded-full bg-primary/20" />
                <div className="h-2 w-4/5 rounded-full bg-foreground/10" />
              </div>
            </div>
            <div className="border border-border/70 bg-card p-4" style={surfaces.card}>
              <div className="flex items-center justify-between gap-2">
                <p className="text-sm font-medium text-foreground">Default profile</p>
                <CornerDownRight className="size-4 text-primary" />
              </div>
              <div className="mt-4 rounded-[inherit] border border-border/70 bg-secondary/40 p-4" style={surfaces.shell}>
                <p className="text-sm text-muted-foreground">rounded-3xl</p>
              </div>
            </div>
          </div>
        </ShowcaseCard>

        <ShowcaseCard
          icon={MessageSquareText}
          title="AI chat"
          description="Bubbles and composer shell."
          reduceMotion={reduceMotion}
          style={surfaces.shell}
          size="tall"
        >
          <div className="grid h-full gap-3 overflow-y-auto border border-border/70 bg-card p-4" style={surfaces.shell}>
            <div className="flex justify-start">
              <div
                className="max-w-[16rem] border border-border/70 bg-secondary/60 px-4 py-3 text-sm leading-6 text-foreground"
                style={surfaces.bubble}
              >
                Compare the fallback mode without corner-shape.
              </div>
            </div>
            <div className="flex justify-end">
              <div
                className="max-w-[16rem] bg-primary px-4 py-3 text-sm leading-6 text-primary-foreground"
                style={surfaces.bubble}
              >
                The outer frame stays calmer with the enhanced profile.
              </div>
            </div>
            <div className="grid gap-2 border border-border/70 bg-background p-3" style={surfaces.card}>
              <Label htmlFor="chat-composer" className="text-muted-foreground">
                Composer
              </Label>
              <div className="flex gap-2">
                <Input id="chat-composer" placeholder="Ask for a sharper token…" style={surfaces.button} />
                <Button style={surfaces.button} className="rounded-[inherit]" aria-label="Send">
                  <Bot className="size-4" />
                </Button>
              </div>
            </div>
          </div>
        </ShowcaseCard>

        <ShowcaseCard
          icon={LayoutPanelTop}
          title="Dashboard"
          description="Nested panels and stats."
          reduceMotion={reduceMotion}
          style={surfaces.shell}
          size="feature"
        >
          <div className="grid h-full gap-3 overflow-y-auto lg:grid-cols-[0.9fr_1.1fr]">
            <div className="grid gap-3">
              <div className="border border-border/70 bg-card p-4" style={surfaces.card}>
                <p className="text-sm text-muted-foreground">Adoption</p>
                <p className="mt-2 font-mono text-3xl tabular-nums text-foreground">64.2%</p>
              </div>
              <div className="border border-border/70 bg-card p-4" style={surfaces.card}>
                <div className="flex gap-2">
                  <span className="inline-flex border border-border/70 bg-secondary/40 px-3 py-2 text-sm" style={surfaces.chip}>round</span>
                  <span className="inline-flex border border-border/70 bg-secondary/40 px-3 py-2 text-sm" style={surfaces.chip}>soft</span>
                </div>
              </div>
            </div>
            <div className="border border-border/70 bg-card p-4" style={surfaces.shell}>
              <div className="flex items-center justify-between gap-2">
                <p className="text-sm font-medium text-foreground">Surface audit</p>
                <Badge variant="secondary">{fallbackEnabled ? "fallback" : "enhanced"}</Badge>
              </div>
              <div className="mt-3 grid gap-2 md:grid-cols-3">
                {["Primary", "Media", "Mini"].map((label) => (
                  <div key={label} className="border border-border/70 bg-background p-3" style={surfaces.card}>
                    <p className="text-sm text-foreground">{label}</p>
                    <div className="mt-3 h-16 rounded-[inherit] bg-secondary/60" style={surfaces.card} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ShowcaseCard>

        <ShowcaseCard
          icon={SlidersHorizontal}
          title="Controls"
          description="Search, filters, and segmentation."
          reduceMotion={reduceMotion}
          style={surfaces.shell}
          size="square"
        >
          <div className="grid h-full gap-3 overflow-y-auto">
            <div className="flex items-center gap-2 border border-border/70 bg-card px-3 py-2" style={surfaces.card}>
              <Search className="size-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Search corners, tokens, overrides</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {["All", "Buttons", "Cards", "Media"].map((item, index) => (
                <span
                  key={item}
                  className={index === 0 ? "inline-flex bg-primary px-3 py-2 text-sm text-primary-foreground" : "inline-flex border border-border/70 bg-secondary/40 px-3 py-2 text-sm text-foreground"}
                  style={surfaces.chip}
                >
                  {item}
                </span>
              ))}
            </div>
            <div className="grid gap-2 md:grid-cols-2">
              <div className="border border-border/70 bg-card p-3" style={surfaces.card}>
                <p className="text-xs text-muted-foreground">Softer default</p>
                <div className="mt-3 h-2 rounded-full bg-primary/20" />
              </div>
              <div className="border border-border/70 bg-card p-3" style={surfaces.card}>
                <p className="text-xs text-muted-foreground">Sharper override</p>
                <div className="mt-3 h-2 w-3/4 rounded-full bg-foreground/10" />
              </div>
            </div>
          </div>
        </ShowcaseCard>

        <ShowcaseCard
          icon={Bell}
          title="Notifications"
          description="Small floating surfaces."
          reduceMotion={reduceMotion}
          style={surfaces.shell}
          size="square"
        >
          <div className="grid h-full overflow-y-auto place-items-start">
            <div className="w-full space-y-3">
              {[
                "New preset token saved",
                "Fallback mode enabled for preview",
                "Rounded utilities upgraded",
              ].map((item, index) => (
                <div
                  key={item}
                  className="flex items-center justify-between gap-3 border border-border/70 bg-card px-4 py-3"
                  style={createStyle(Math.max(radiusValue - 8 - index * 2, 14))}
                >
                  <div className="flex items-center gap-3">
                    <div className="flex size-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Bell className="size-4" />
                    </div>
                    <p className="text-sm text-foreground">{item}</p>
                  </div>
                  <Badge variant="outline">now</Badge>
                </div>
              ))}
            </div>
          </div>
        </ShowcaseCard>

        <ShowcaseCard
          icon={Bot}
          title="Composer"
          description="Prompt box, helper actions, and states."
          reduceMotion={reduceMotion}
          style={surfaces.shell}
          size="wide"
        >
          <div className="grid h-full gap-3 overflow-y-auto">
            <div className="border border-border/70 bg-card p-4" style={surfaces.card}>
              <p className="text-sm font-medium text-foreground">Draft prompt</p>
              <div className="mt-3 grid gap-3">
                <Input
                  placeholder="Describe the corner style you want to preview"
                  style={surfaces.button}
                />
                <div className="flex flex-wrap gap-2">
                  <Button style={surfaces.button} className="rounded-[inherit]">
                    Generate
                  </Button>
                  <Button variant="outline" style={surfaces.button} className="rounded-[inherit]">
                    Refine
                  </Button>
                  <span
                    className="inline-flex border border-border/70 bg-secondary/40 px-3 py-2 text-sm text-foreground"
                    style={surfaces.chip}
                  >
                    fallback-safe
                  </span>
                </div>
              </div>
            </div>
          </div>
        </ShowcaseCard>

        <ShowcaseCard
          icon={Search}
          title="Navigation list"
          description="Dense lists and nested rows."
          reduceMotion={reduceMotion}
          style={surfaces.shell}
          size="square"
        >
          <div className="grid h-full gap-2 overflow-y-auto">
            {[
              "rounded-lg tokens",
              "corner-shape defaults",
              "browser fallback",
              "one-off overrides",
              "playground presets",
            ].map((item, index) => (
              <div
                key={item}
                className="flex items-center justify-between border border-border/70 bg-card px-3 py-3"
                style={createStyle(Math.max(radiusValue - 10 - index, 12))}
              >
                <span className="text-sm text-foreground">{item}</span>
                <span className="font-mono text-xs text-muted-foreground tabular-nums">
                  0{index + 1}
                </span>
              </div>
            ))}
          </div>
        </ShowcaseCard>

        <ShowcaseCard
          icon={ImageIcon}
          title="Media"
          description="Artwork, captions, and stacked info."
          reduceMotion={reduceMotion}
          style={surfaces.shell}
          size="square"
        >
          <div className="grid h-full gap-3 overflow-y-auto">
            <div className="aspect-[4/3] border border-border/70 bg-secondary/50 p-3" style={surfaces.card}>
              <div className="grid h-full place-items-center rounded-[inherit] border border-border/70 bg-primary/8">
                <ImageIcon className="size-8 text-primary" />
              </div>
            </div>
            <div className="border border-border/70 bg-card p-3" style={surfaces.card}>
              <p className="text-sm font-medium text-foreground">Rounded gallery cover</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Preview how media blocks feel with the current radius and profile.
              </p>
            </div>
          </div>
        </ShowcaseCard>
      </div>
    </section>
  );
}

type ShowcaseCardProps = {
  icon: typeof Sparkles;
  title: string;
  description: string;
  reduceMotion: boolean;
  children: React.ReactNode;
  style?: DemoStyle;
  size: "square" | "wide" | "tall" | "feature";
};

function ShowcaseCard({
  icon: Icon,
  title,
  description,
  reduceMotion,
  children,
  style,
  size,
}: ShowcaseCardProps) {
  const sizeClassName =
    size === "wide"
      ? "lg:col-span-2 lg:row-span-1"
      : size === "tall"
        ? "lg:col-span-1 lg:row-span-2"
        : size === "feature"
          ? "lg:col-span-2 lg:row-span-2"
          : "lg:col-span-1 lg:row-span-1";

  return (
    <motion.div
      initial={reduceMotion ? { opacity: 0 } : { opacity: 0, transform: "translateY(12px)" }}
      animate={reduceMotion ? { opacity: 1 } : { opacity: 1, transform: "translateY(0px)" }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className={cn("min-h-0", sizeClassName)}
    >
      <Card
        className="h-full min-h-0 rounded-[2.4rem] border border-border/70 bg-card"
        style={style}
      >
        <CardHeader className="gap-3">
          <div className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Icon className="size-4" />
          </div>
          <div className="space-y-1">
            <CardTitle className="text-base text-balance">{title}</CardTitle>
            <CardDescription className="text-sm leading-6 text-pretty">{description}</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="min-h-0 flex-1 overflow-hidden">{children}</CardContent>
      </Card>
    </motion.div>
  );
}
