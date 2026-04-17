"use client";

import { useRef, useState } from "react";

import { Check, ChevronDown, Copy } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type DocsSnippetCardProps = {
  eyebrow: string;
  title: string;
  description: string;
  code: string;
  language?: string;
  copyOptions?: Array<{
    id: string;
    label: string;
    command: string;
  }>;
};

export function DocsSnippetCard({
  eyebrow,
  title,
  description,
  code,
  copyOptions,
}: DocsSnippetCardProps) {
  const [copied, setCopied] = useState<string | null>(null);
  const timeoutRef = useRef<number | null>(null);

  async function handleCopy(value: string, copiedLabel: string) {
    await navigator.clipboard.writeText(value);
    setCopied(copiedLabel);

    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = window.setTimeout(() => {
      setCopied(null);
    }, 1200);
  }

  return (
    <Card className="rounded-[2.2rem] border border-border/70 bg-card">
      <CardHeader className="gap-3">
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-1">
            <p className="text-sm text-primary">{eyebrow}</p>
            <CardTitle className="text-lg text-balance">{title}</CardTitle>
            <CardDescription className="max-w-2xl leading-7 text-pretty">
              {description}
            </CardDescription>
          </div>
          {copyOptions ? (
            <DropdownMenu modal={false}>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  aria-label={`Copy ${title} snippet`}
                  className="rounded-full"
                >
                  {copied ? <Check data-icon="inline-start" /> : <Copy data-icon="inline-start" />}
                  {copied ?? "Copy"}
                  <ChevronDown data-icon="inline-end" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-72">
                <DropdownMenuLabel>Install command lines</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {copyOptions.map((option) => (
                  <DropdownMenuItem
                    key={option.id}
                    onSelect={(event) => {
                      event.preventDefault();
                      void handleCopy(option.command, option.label);
                    }}
                  >
                    <div className="flex size-8 items-center justify-center rounded-full bg-secondary text-secondary-foreground">
                      {copied === option.label ? (
                        <Check className="size-4" />
                      ) : (
                        <Copy className="size-4" />
                      )}
                    </div>
                    <div className="flex min-w-0 flex-1 flex-col">
                      <span className="text-foreground">{option.label}</span>
                      <span className="truncate font-mono text-xs text-muted-foreground">
                        {option.command}
                      </span>
                    </div>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button
              variant="outline"
              size="sm"
              onClick={() => void handleCopy(code, "Copied")}
              aria-label={`Copy ${title} snippet`}
              className="rounded-full"
            >
              {copied ? <Check data-icon="inline-start" /> : <Copy data-icon="inline-start" />}
              {copied ?? "Copy"}
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto rounded-[1.75rem] border border-border/70 bg-secondary/40 p-4 font-mono text-sm leading-7 text-foreground">
          <pre>
            <code>{code}</code>
          </pre>
        </div>
      </CardContent>
    </Card>
  );
}
