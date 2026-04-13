import { AnimateOnScroll } from "./animate-on-scroll";

const items = [
  {
    color: "#e07a5f",
    num: "01",
    title: "Тип, а не диагноз",
    text: "Не «ты либерал» — а «Корпоративный монарх: рынок + порядок, прагматик». С историческими параллелями и списком тех, с кем будешь спорить.",
  },
  {
    color: "#3d85c6",
    num: "02",
    title: "4 оси вместо одной",
    text: "Экономика, дипломатия, государство, общество. Объясняет, почему ты можешь быть за свободный рынок и за расстрел за курение на балконе.",
  },
  {
    color: "#81b29a",
    num: "03",
    title: "Сравнение в одно касание",
    text: "Кинул ссылку — друг прошёл — видишь, где совпадаете и где готовы начать гражданскую войну за ужином.",
  },
  {
    color: "#f2cc8f",
    num: "04",
    title: "Повод поговорить",
    text: "Спорить о политиках — нервно. Спорить о том, почему у тебя авторитаризм 81 — весело.",
  },
];

export function WhatYouGet() {
  return (
    <section className="py-24 px-5">
      <div className="max-w-[900px] mx-auto">
        <AnimateOnScroll>
          <h2
            className="text-[clamp(1.6rem,4vw,2.4rem)] leading-[1.15] mb-14"
            style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontWeight: 700 }}
          >
            Что ты получишь
          </h2>
        </AnimateOnScroll>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-10">
          {items.map((item, i) => (
            <AnimateOnScroll key={item.num} delay={i * 100}>
              <div className="group">
                <span
                  className="text-[2.5rem] leading-none block mb-3 transition-colors duration-300"
                  style={{
                    fontFamily: "Georgia, serif",
                    fontWeight: 700,
                    color: `${item.color}30`,
                  }}
                >
                  {item.num}
                </span>
                <h3
                  className="text-[1.1rem] mb-2"
                  style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontWeight: 700 }}
                >
                  {item.title}
                </h3>
                <p className="text-[0.9rem] text-[#888] leading-relaxed">
                  {item.text}
                </p>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
