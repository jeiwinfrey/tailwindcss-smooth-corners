"use client";

import { useRef, useState } from "react";

import { Check, ChevronDown, Copy, Terminal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

const PACKAGE_NAME = "tailwindcss-smooth-corners";

const installCommands = [
  { id: "npm", label: "npm", command: `npm install ${PACKAGE_NAME}` },
  { id: "pnpm", label: "pnpm", command: `pnpm add ${PACKAGE_NAME}` },
  { id: "yarn", label: "yarn", command: `yarn add ${PACKAGE_NAME}` },
  { id: "bun", label: "bun", command: `bun add ${PACKAGE_NAME}` },
] as const;

type InstallCommandMenuProps = {
  className?: string;
};

export function InstallCommandMenu({ className }: InstallCommandMenuProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const timeoutRef = useRef<number | null>(null);

  async function handleCopy(id: string, command: string) {
    await navigator.clipboard.writeText(command);
    setCopiedId(id);

    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = window.setTimeout(() => {
      setCopiedId(null);
    }, 1200);
  }

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="lg"
          className={cn(
            "w-full justify-between rounded-full border-border/70 px-4 sm:w-auto",
            className
          )}
        >
          <span className="truncate">{PACKAGE_NAME}</span>
          <ChevronDown className="size-4 text-muted-foreground" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center" className="w-[22rem]">
        <DropdownMenuLabel>Install command lines</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {installCommands.map((item) => (
          <DropdownMenuItem
            key={item.id}
            onSelect={(event) => {
              event.preventDefault();
              void handleCopy(item.id, item.command);
            }}
          >
            <div className="flex size-8 items-center justify-center rounded-full bg-secondary text-secondary-foreground">
              {copiedId === item.id ? <Check className="size-4" /> : <Copy className="size-4" />}
            </div>
            <div className="flex min-w-0 flex-1 flex-col">
              <span className="text-foreground">{item.label}</span>
              <span className="truncate font-mono text-xs text-muted-foreground">
                {item.command}
              </span>
            </div>
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <div className="flex items-center gap-2 px-3 py-2 text-xs text-muted-foreground">
          <Terminal className="size-3.5" />
          {copiedId ? "Command copied." : "Pick a package manager to copy the command."}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
