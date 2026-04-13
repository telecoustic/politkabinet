"use client";

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { AnimateOnScroll } from "./animate-on-scroll";

const items = [
  {
    q: "10 минут — это долго",
    a: "Это ситуации, над которыми реально думаешь. Сосед шумит — что делаешь? Друг потерял работу — помогаешь? Большинство не замечают, как проходят. Некоторые жалеют, что вопросов всего 24.",
  },
  {
    q: "Навешиваете ярлыки?",
    a: "Тест показывает координаты по 4 осям — ты конкретная точка на карте, не «либерал» и не «консерватор». Тип вроде «Железный канцлер» — ирония, не приговор. Как знак зодиака, только с математикой.",
  },
  {
    q: "А мои данные?",
    a: "Нет бэкенда. Нет базы данных. Результат — код в ссылке. Живёт только у тебя. Мы ничего не сохраняем — негде.",
  },
  {
    q: "Чем лучше Political Compass?",
    a: "Political Compass — на английском, вопросы абстрактные, результат — точка без объяснения, нечем делиться. У нас — ситуации из жизни, ироничные типы, сравнение с друзьями.",
  },
];

export function Objections() {
  return (
    <section className="py-24 px-5 bg-[#eae4d9]">
      <div className="max-w-[900px] mx-auto">
        <AnimateOnScroll>
          <h2
            className="text-[clamp(1.6rem,4vw,2.4rem)] leading-[1.15] mb-10"
            style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontWeight: 700 }}
          >
            Но подожди...
          </h2>
        </AnimateOnScroll>

        <AnimateOnScroll delay={150}>
          <div className="max-w-[600px]">
            <Accordion>
              {items.map((item, i) => (
                <AccordionItem key={i}>
                  <AccordionTrigger
                    className="py-5 text-[1.05rem] hover:no-underline cursor-pointer text-left"
                    style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontWeight: 700 }}
                  >
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-[0.9rem] text-[#888] leading-relaxed">
                      {item.a}
                    </p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
