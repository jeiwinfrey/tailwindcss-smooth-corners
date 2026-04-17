"use client";

import Link from "next/link";

import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight } from "lucide-react";

import { InstallCommandMenu } from "@/components/install-command-menu";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const heroMotion = {
  hidden: { opacity: 0, transform: "translateY(10px)" },
  visible: (index: number) => ({
    opacity: 1,
    transform: "translateY(0px)",
    transition: {
      duration: 0.2,
      ease: "easeOut" as const,
      delay: 0.04 * index,
    },
  }),
};

export function HeroSection() {
  const reduceMotion = Boolean(useReducedMotion());

  return (
    <section className="mx-auto flex w-full max-w-4xl flex-col items-center gap-8 py-20 text-center sm:py-24">
      <motion.div
        custom={0}
        initial={reduceMotion ? { opacity: 0 } : heroMotion.hidden}
        animate={reduceMotion ? { opacity: 1 } : heroMotion.visible(0)}
        className="flex flex-wrap items-center justify-center gap-2"
      >
        <Badge variant="outline" className="border-primary/15 bg-primary/10 text-primary">
          Tailwind CSS v4
        </Badge>
        <Badge variant="outline" className="border-primary/15 bg-primary/10 text-primary">
          Default: superellipse(2)
        </Badge>
        <Badge variant="outline" className="border-primary/15 bg-primary/10 text-primary">
          Progressive fallback
        </Badge>
      </motion.div>

      <motion.div
        custom={1}
        initial={reduceMotion ? { opacity: 0 } : heroMotion.hidden}
        animate={reduceMotion ? { opacity: 1 } : heroMotion.visible(1)}
        className="space-y-5"
      >
        <p className="text-sm text-primary">Smooth corners without rewriting your design system.</p>
        <h1 className="font-heading text-4xl font-semibold text-balance text-foreground sm:text-6xl">
          Tailwind rounded utilities, upgraded with calmer geometry.
        </h1>
        <p className="mx-auto max-w-2xl text-base leading-7 text-muted-foreground text-pretty sm:text-lg">
          Drop in one plugin and your existing rounded surfaces render with smoother
          superellipse corners. The default profile is <code className="inline-code">superellipse(2)</code>,
          and unsupported browsers keep plain border radius with no extra work.
        </p>
      </motion.div>

      <motion.div
        custom={2}
        initial={reduceMotion ? { opacity: 0 } : heroMotion.hidden}
        animate={reduceMotion ? { opacity: 1 } : heroMotion.visible(2)}
        className="flex flex-col items-center gap-2"
      >
        <div className="flex flex-col items-center gap-2 sm:flex-row">
          <InstallCommandMenu />
          <Link
            href="/playground"
            className={cn(buttonVariants({ size: "lg", variant: "default" }), "rounded-full px-4")}
          >
            Open playground
            <ArrowUpRight data-icon="inline-end" />
          </Link>
        </div>
        <p className="text-xs text-muted-foreground">
          Install command lines live in the package dropdown.
        </p>
      </motion.div>

      <motion.p
        custom={3}
        initial={reduceMotion ? { opacity: 0 } : heroMotion.hidden}
        animate={reduceMotion ? { opacity: 1 } : heroMotion.visible(3)}
        className="max-w-xl text-sm leading-6 text-muted-foreground text-pretty"
      >
        Keep shipping the same markup. Add named corner profiles only when a surface needs a
        more editorial silhouette.
      </motion.p>
    </section>
  );
}
