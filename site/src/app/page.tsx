import { BeginnerDocsSection } from "@/components/home/beginner-docs-section";
import { FaqSection } from "@/components/home/faq-section";
import { FeaturesSection } from "@/components/home/features-section";
import { HeroSection } from "@/components/home/hero-section";
import { MigrationSection } from "@/components/home/migration-section";
import { QuickStartSection } from "@/components/home/quick-start-section";
import { TroubleshootingSection } from "@/components/home/troubleshooting-section";
import { Navbar } from "@/components/navbar";

export default function HomePage() {
  return (
    <main className="mx-auto min-h-dvh w-full max-w-7xl px-5 pb-20 pt-6 sm:px-8 lg:px-10">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <QuickStartSection />
      <BeginnerDocsSection />
      <MigrationSection />
      <FaqSection />
      <TroubleshootingSection />
    </main>
  );
}
