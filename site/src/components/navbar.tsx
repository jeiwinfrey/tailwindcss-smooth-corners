import Link from "next/link";

import { CornerDownRight } from "lucide-react";

import { NavbarStats } from "@/components/navbar-stats";
import { getSocialStats } from "@/lib/social-stats";

export async function Navbar() {
  const { github, npm } = await getSocialStats();

  return (
    <header className="flex items-center justify-between gap-4 rounded-[2.25rem] border border-border/70 bg-background px-4 py-3 sm:px-5">
      <Link href="/" className="flex min-w-0 items-center gap-3">
        <div className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary">
          <CornerDownRight className="size-5" />
        </div>
        <div className="min-w-0">
          <span className="block truncate text-sm font-medium text-foreground sm:text-base">
            tailwindcss-smooth-corners
          </span>
        </div>
      </Link>

      <div className="flex min-w-0 items-center justify-end gap-1 overflow-x-auto text-sm text-muted-foreground">
        <NavbarStats stats={[github, npm]} />
        <nav className="flex items-center gap-1 pl-1">
          <Link
            className="rounded-full px-3 py-1.5 whitespace-nowrap transition-colors duration-150 ease-out hover:bg-muted hover:text-foreground"
            href="/"
          >
            Home
          </Link>
          <Link
            href="/playground"
            className="rounded-full px-3 py-1.5 whitespace-nowrap transition-colors duration-150 ease-out hover:bg-muted hover:text-foreground"
          >
            Playground
          </Link>
        </nav>
      </div>
    </header>
  );
}
