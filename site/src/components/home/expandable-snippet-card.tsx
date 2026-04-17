"use client";

import { useRef, useState } from "react";

import { Check, ChevronDown, Copy } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

type ExpandableSnippetCardProps = {
  eyebrow: string;
  title: string;
  description: string;
  code: string;
};

export function ExpandableSnippetCard({
  eyebrow,
  title,
  description,
  code,
}: ExpandableSnippetCardProps) {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  async function handleCopy() {
    await navigator.clipboard.writeText(code);
    setCopied(true);

    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = window.setTimeout(() => {
      setCopied(false);
    }, 1200);
  }

  return (
    <Card className="rounded-[2.2rem] border border-border/70 bg-card">
      <details className="group">
        <summary className="list-none px-4 py-4 marker:hidden">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1">
              <p className="text-sm text-primary">{eyebrow}</p>
              <h3 className="font-heading text-lg font-medium text-balance text-foreground">
                {title}
              </h3>
              <p className="max-w-3xl text-sm leading-7 text-muted-foreground text-pretty">
                {description}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={(event) => {
                  event.preventDefault();
                  event.stopPropagation();
                  void handleCopy();
                }}
                aria-label={`Copy ${title} snippet`}
                className="rounded-full"
              >
                {copied ? <Check data-icon="inline-start" /> : <Copy data-icon="inline-start" />}
                {copied ? "Copied" : "Copy"}
              </Button>
              <span className="flex size-9 items-center justify-center rounded-full border border-border/70 bg-secondary/40">
                <ChevronDown className="size-4 text-muted-foreground transition-transform duration-150 ease-out group-open:rotate-180" />
              </span>
            </div>
          </div>
        </summary>
        <CardContent className="grid gap-3 border-t border-border/70 pt-4">
          <div className="overflow-x-auto rounded-[1.75rem] border border-border/70 bg-secondary/40 p-4 font-mono text-sm leading-7 text-foreground">
            <pre>
              <code>{code}</code>
            </pre>
          </div>
        </CardContent>
      </details>
    </Card>
  );
}
