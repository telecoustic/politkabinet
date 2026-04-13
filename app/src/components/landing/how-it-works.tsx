const steps = [
  {
    num: 1,
    title: "Бытовые ситуации",
    text: "Сосед шумит, друг потерял работу, в школе запретили телефоны. Ты выбираешь, что делать. Мы считаем, кто ты.",
  },
  {
    num: 2,
    title: "4 оси, 16 типов",
    text: 'Экономика, дипломатия, государство, общество. От "Железного канцлера" до "Космического хиппи". Один из них -- ты.',
  },
  {
    num: 3,
    title: "Сравни с друзьями",
    text: "Скинь ссылку -- друг проходит -- вы видите, где совпадаете и где готовы начать гражданскую войну за ужином.",
  },
];

export function HowItWorks() {
  return (
    <section className="border-t border-border py-12 px-5">
      <div className="max-w-[640px] mx-auto">
        <h2
          className="text-[1.8rem] leading-[1.15] mb-2"
          style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontWeight: 700 }}
        >
          Как это работает
        </h2>
        <p className="text-muted-foreground mb-8">Никакой политики. Почти.</p>

        <div className="flex flex-col gap-6">
          {steps.map((step) => (
            <div key={step.num} className="flex gap-4 items-start">
              <div
                className="shrink-0 w-10 h-10 rounded-full bg-foreground text-background flex items-center justify-center text-lg"
                style={{ fontFamily: "Georgia, serif", fontWeight: 700 }}
              >
                {step.num}
              </div>
              <div>
                <h3
                  className="text-[1.1rem] mb-0.5"
                  style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontWeight: 700 }}
                >
                  {step.title}
                </h3>
                <p className="text-[#666] text-[0.95rem] leading-relaxed">{step.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
