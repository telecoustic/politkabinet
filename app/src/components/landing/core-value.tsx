import { AnimateOnScroll } from "./animate-on-scroll";

export function CoreValue() {
  return (
    <section className="py-24 px-5 bg-[#2c2c2c] text-[#f5f0e8] relative overflow-hidden">
      {/* Accent glow */}
      <div className="absolute -top-32 -right-32 w-64 h-64 bg-[#e07a5f] rounded-full opacity-[0.06] blur-[100px]" />

      <div className="max-w-[900px] mx-auto relative">
        <AnimateOnScroll>
          <h2
            className="text-[clamp(2rem,5vw,3.5rem)] leading-[1.05] tracking-[-0.02em] mb-8"
            style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontWeight: 700 }}
          >
            Не тест. Зеркало.
          </h2>
        </AnimateOnScroll>

        <div className="max-w-[580px] space-y-5 text-[1.05rem] text-[#aaa] leading-[1.7]">
          <AnimateOnScroll delay={100}>
            <p>
              Мы не спрашиваем, за кого ты голосуешь. Мы спрашиваем, что ты
              сделаешь, когда сосед дымит на балконе, друг просит в долг,
              а в школе запретили телефоны.
            </p>
          </AnimateOnScroll>

          <AnimateOnScroll delay={200}>
            <p>
              Каждый ответ двигает тебя по{" "}
              <span className="text-[#e07a5f]">4 осям</span>. На выходе —
              координаты на карте и ироничное название, которое ты будешь
              цитировать весь вечер.
            </p>
          </AnimateOnScroll>

          <AnimateOnScroll delay={300}>
            <p className="text-[#f5f0e8] text-[1.15rem]" style={{ fontFamily: "Georgia, serif" }}>
              А потом кидаешь ссылку другу — и узнаёшь,
              кто из вас авторитарист.
            </p>
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  );
}
