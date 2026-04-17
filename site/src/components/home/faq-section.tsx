import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const faqItems = [
  {
    question: "Do I need to replace my existing `rounded-*` classes?",
    answer:
      "No. That is the main beginner-friendly value of the plugin. Your existing rounded utilities keep working and become smoother where `corner-shape` is supported.",
  },
  {
    question: "Do I have to configure a default before it works?",
    answer:
      "No. The default behavior works right after you install the plugin and add the `@plugin` line. Extra configuration is optional.",
  },
  {
    question: "What happens in browsers that do not support `corner-shape` yet?",
    answer:
      "They keep plain `border-radius`. Your UI should still look correct; it just will not use the enhanced geometry.",
  },
  {
    question: "When should I use one-off overrides?",
    answer:
      "Use them only when a specific surface needs a different feeling than the global default, such as a hero card, floating panel, or editorial tile.",
  },
] as const;

export function FaqSection() {
  return (
    <section className="mx-auto flex w-full max-w-6xl flex-col gap-5 py-12">
      <div className="space-y-4">
        <Badge variant="secondary">FAQ</Badge>
        <div className="space-y-2">
          <h2 className="font-heading text-3xl font-semibold text-balance text-foreground sm:text-4xl">
            Common beginner questions
          </h2>
          <p className="max-w-3xl text-base leading-7 text-muted-foreground text-pretty">
            These are the questions people usually ask before they trust a styling plugin in an
            existing codebase. The short version: the default path is small, safe, and reversible.
          </p>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {faqItems.map((item) => (
          <Card key={item.question} className="rounded-[2.2rem] border border-border/70 bg-card">
            <CardHeader className="gap-3">
              <CardTitle className="text-lg text-balance">{item.question}</CardTitle>
              <CardDescription className="leading-7 text-pretty">
                {item.answer}
              </CardDescription>
            </CardHeader>
            <CardContent />
          </Card>
        ))}
      </div>
    </section>
  );
}
