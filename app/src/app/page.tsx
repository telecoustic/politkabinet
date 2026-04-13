import { Suspense } from "react";
import { Hero } from "@/components/landing/hero";
import { CoreValue } from "@/components/landing/core-value";
import { WhatYouGet } from "@/components/landing/what-you-get";
import { HowItWorks } from "@/components/landing/how-it-works";
import { TypesPreview } from "@/components/landing/types-preview";
import { Compare } from "@/components/landing/compare";
import { Objections } from "@/components/landing/objections";
import { CtaForm } from "@/components/landing/cta-form";

export default function Home() {
  return (
    <main className="flex-1">
      <Hero />
      <CoreValue />
      <WhatYouGet />
      <HowItWorks />
      <TypesPreview />
      <Compare />
      <Objections />
      <Suspense>
        <CtaForm />
      </Suspense>
    </main>
  );
}
