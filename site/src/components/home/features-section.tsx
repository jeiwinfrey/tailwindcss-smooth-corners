"use client";

import { motion, useReducedMotion } from "motion/react";
import { Layers2, PanelsTopLeft, Sparkles } from "lucide-react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const features = [
  {
    icon: Sparkles,
    title: "Softer surfaces by default",
    description:
      "Buttons, cards, and media frames stop feeling inflated at larger radii and settle into a calmer silhouette.",
    bars: ["w-20", "w-32", "w-24"],
  },
  {
    icon: Layers2,
    title: "Theme-wide or one-off control",
    description:
      "Pick a repo-wide default, add named tokens, or sharpen a single component when the composition needs more tension.",
    bars: ["w-16", "w-28", "w-36"],
  },
  {
    icon: PanelsTopLeft,
    title: "Fallback stays invisible",
    description:
      "Unsupported browsers keep plain border radius so layouts still read correctly even without corner-shape.",
    bars: ["w-24", "w-14", "w-28"],
  },
] as const;

export function FeaturesSection() {
  const reduceMotion = Boolean(useReducedMotion());

  return (
    <section className="mx-auto grid w-full max-w-6xl gap-4 py-10 md:grid-cols-3">
      {features.map(({ icon: Icon, title, description, bars }, index) => (
        <motion.div
          key={title}
          initial={reduceMotion ? { opacity: 0 } : { opacity: 0, transform: "translateY(12px)" }}
          whileInView={reduceMotion ? { opacity: 1 } : { opacity: 1, transform: "translateY(0px)" }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.2, ease: "easeOut", delay: index * 0.05 }}
        >
          <Card className="h-full rounded-[2.4rem] border border-border/70 bg-card">
            <CardHeader className="gap-4">
              <div className="flex size-11 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Icon className="size-5" />
              </div>
              <div className="space-y-2">
                <CardTitle className="text-lg text-balance">{title}</CardTitle>
                <CardDescription className="leading-7 text-pretty">{description}</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-[2rem] border border-border/70 bg-muted/40 p-4">
                <div className="grid gap-3 rounded-[inherit] border border-border/70 bg-background p-4">
                  <div className="flex items-center justify-between">
                    <div className="grid gap-2">
                      <div className="h-3 w-16 rounded-full bg-primary/20" />
                      <div className="h-2 w-24 rounded-full bg-muted-foreground/15" />
                    </div>
                    <div className="size-10 rounded-full bg-primary/10" />
                  </div>
                  <div className="grid gap-2">
                    {bars.map((bar) => (
                      <div key={bar} className={`h-2 rounded-full bg-foreground/8 ${bar}`} />
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </section>
  );
}
