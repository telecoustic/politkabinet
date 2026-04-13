import { AnimateOnScroll } from "./animate-on-scroll";

const steps = [
  {
    title: "Отвечаешь на 24 ситуации",
    text: "Сосед шумит, друг потерял работу, в аптеке нет аналога. Выбираешь, что бы сделал.",
    color: "#e07a5f",
  },
  {
    title: "Получаешь свой тип",
    text: "Один из 16 типов с ироничным описанием. Узнаёшь себя, удивляешься, делаешь скриншот.",
    color: "#3d85c6",
  },
  {
    title: "Кидаешь ссылку",
    text: "Друг проходит — видишь 4 шкалы рядом, процент совпадения, главное расхождение.",
    color: "#81b29a",
  },
  {
    title: "Обсуждаете",
    text: "«Почему у тебя авторитаризм 81?» — «Когда сосед курит, я за расстрел». Разговор — продукт.",
    color: "#f2cc8f",
  },
];

export function HowItWorks() {
  return (
    <section className="py-24 px-5 bg-[#eae4d9]">
      <div className="max-w-[900px] mx-auto">
        <AnimateOnScroll>
          <p className="text-xs tracking-[0.25em] uppercase text-[#aaa] mb-3">
            Никакой политики. Почти.
          </p>
          <h2
            className="text-[clamp(1.6rem,4vw,2.4rem)] leading-[1.15] mb-14"
            style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontWeight: 700 }}
          >
            Как это работает
          </h2>
        </AnimateOnScroll>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, i) => (
            <AnimateOnScroll key={step.title} delay={i * 120}>
              <div>
                <div
                  className="w-full h-1 rounded-full mb-5"
                  style={{ backgroundColor: step.color }}
                />
                <h3
                  className="text-[1rem] mb-2"
                  style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontWeight: 700 }}
                >
                  {step.title}
                </h3>
                <p className="text-[0.85rem] text-[#888] leading-relaxed">
                  {step.text}
                </p>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
