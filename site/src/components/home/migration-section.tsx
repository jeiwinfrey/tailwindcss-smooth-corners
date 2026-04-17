import { readFile } from "node:fs/promises";
import path from "node:path";

import { ExpandableSnippetCard } from "@/components/home/expandable-snippet-card";
import { Badge } from "@/components/ui/badge";

export async function MigrationSection() {
  const migrationPrompt = await readFile(
    path.join(process.cwd(), "content", "ai-agent-migration.md"),
    "utf8"
  );

  return (
    <section className="mx-auto flex w-full max-w-6xl flex-col gap-5 py-12">
      <div className="space-y-4">
        <Badge variant="secondary">Migration</Badge>
        <div className="space-y-2">
          <h2 className="font-heading text-3xl font-semibold text-balance text-foreground sm:text-4xl">
            Hand the migration to an AI agent without rewriting the brief.
          </h2>
          <p className="max-w-3xl text-base leading-7 text-muted-foreground text-pretty">
            This markdown prompt tells an agent to install the package, wire the Tailwind CSS
            v4 plugin, keep existing rounded utilities, and only reach for overrides when a
            component actually needs them.
          </p>
        </div>
      </div>

      <ExpandableSnippetCard
        eyebrow="AI agent prompt"
        title="Copy this migration brief"
        description="Paste this into your agent when you want a project migrated to `tailwindcss-smooth-corners` with the correct install and configuration steps."
        code={migrationPrompt}
      />
    </section>
  );
}
