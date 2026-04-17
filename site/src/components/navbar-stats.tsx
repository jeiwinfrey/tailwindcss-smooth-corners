"use client";

import { motion, useReducedMotion } from "motion/react";
import { Github, Package } from "lucide-react";

import type { SocialStat } from "@/lib/social-stats";

type NavbarStatsProps = {
  stats: SocialStat[];
};

export function NavbarStats({ stats }: NavbarStatsProps) {
  const reduceMotion = Boolean(useReducedMotion());
  const iconMap = {
    GitHub: Github,
    npm: Package,
  } as const;

  return (
    <div className="flex flex-wrap items-center gap-2">
      {stats.map((stat, index) => {
        const Icon = iconMap[stat.label as keyof typeof iconMap] ?? Package;

        return (
        <motion.a
          key={stat.label}
          href={stat.href}
          rel="noreferrer"
          target="_blank"
          aria-label={`${stat.label} ${stat.live ? stat.value : "0"}`}
          initial={reduceMotion ? { opacity: 0 } : { opacity: 0, transform: "translateY(6px)" }}
          animate={reduceMotion ? { opacity: 1 } : { opacity: 1, transform: "translateY(0px)" }}
          transition={{ duration: 0.18, ease: "easeOut", delay: index * 0.04 }}
          className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background px-3 py-1.5 text-xs text-muted-foreground transition-colors duration-150 ease-out hover:bg-muted"
        >
          <Icon className="size-3.5" />
          <span className="font-mono tabular-nums text-foreground">{stat.value}</span>
        </motion.a>
        );
      })}
    </div>
  );
}
