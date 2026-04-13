import { Hero } from "@/components/landing/hero";
import { HowItWorks } from "@/components/landing/how-it-works";
import { TypesPreview } from "@/components/landing/types-preview";
import { Compare } from "@/components/landing/compare";
import { Disclaimer } from "@/components/landing/disclaimer";
import { CtaForm } from "@/components/landing/cta-form";

export default function Home() {
  return (
    <main className="flex-1">
      <Hero />
      <HowItWorks />
      <TypesPreview />
      <Compare />
      <Disclaimer />
      <CtaForm />
    </main>
  );
}
