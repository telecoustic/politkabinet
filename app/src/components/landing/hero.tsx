import { Badge } from "@/components/ui/badge";

export function Hero() {
  return (
    <section className="min-h-dvh flex flex-col justify-center text-center px-5 py-8">
      <div className="max-w-[640px] mx-auto">
        <Badge
          variant="secondary"
          className="mb-6 text-xs tracking-[0.15em] uppercase text-muted-foreground font-normal"
        >
          Бесплатный тест
        </Badge>

        <h1
          className="text-[clamp(2.2rem,7vw,3.5rem)] leading-[1.15] tracking-[-0.03em] mb-5"
          style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontWeight: 700 }}
        >
          Ты не знаешь свои политические взгляды
        </h1>

        <p className="text-lg text-[#555] max-w-[480px] mx-auto mb-8 leading-relaxed">
          Серьёзно. Ты думаешь, что знаешь, но{" "}
          <strong className="text-foreground">24 бытовые ситуации</strong>{" "}
          покажут, кто ты на самом деле. Без вопросов про Путина и Навального.
          Без правильных ответов. Только ты и твои решения.
        </p>

        <a
          href="#cta"
          className="inline-block mt-4 text-sm text-[#aaa] animate-bounce-subtle cursor-pointer hover:text-[#888] transition-colors"
        >
          Листай вниз, если не боишься
        </a>
      </div>
    </section>
  );
}
