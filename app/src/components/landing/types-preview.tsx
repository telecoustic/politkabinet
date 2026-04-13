import { AnimateOnScroll } from "./animate-on-scroll";

const types = [
  {
    name: "Железный канцлер",
    desc: "Порядок, скрепы, частная собственность. Бисмарк одобряет.",
    color: "#f2cc8f",
    axes: "Рынок / Нация / Порядок / Традиция",
  },
  {
    name: "Космический хиппи",
    desc: "Границы — выдумка, собственность — иллюзия, будущее — за коммунами на Марсе.",
    color: "#81b29a",
    axes: "Равенство / Глобализм / Свобода / Прогресс",
  },
  {
    name: "Кремниевый евангелист",
    desc: "Uber для всего, блокчейн для остального, государство — помеха.",
    color: "#3d85c6",
    axes: "Рынок / Глобализм / Свобода / Прогресс",
  },
  {
    name: "Народный трибун",
    desc: "Всё наше, чужим не дадим, вождь знает лучше. С 1917 года.",
    color: "#e07a5f",
    axes: "Равенство / Нация / Порядок / Традиция",
  },
];

export function TypesPreview() {
  return (
    <section className="py-24 px-5">
      <div className="max-w-[900px] mx-auto">
        <AnimateOnScroll>
          <h2
            className="text-[clamp(1.6rem,4vw,2.4rem)] leading-[1.15] mb-2"
            style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontWeight: 700 }}
          >
            Кем ты можешь оказаться
          </h2>
          <p className="text-[#aaa] text-sm mb-12">
            4 из 16 типов. Остальные — когда пройдёшь.
          </p>
        </AnimateOnScroll>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {types.map((type, i) => (
            <AnimateOnScroll key={type.name} delay={i * 100}>
              <div
                className="group rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg cursor-default relative overflow-hidden"
                style={{ backgroundColor: `${type.color}0a`, border: `1px solid ${type.color}20` }}
              >
                {/* Color accent bar */}
                <div
                  className="absolute top-0 left-0 w-full h-1 transition-all duration-300 group-hover:h-1.5"
                  style={{ backgroundColor: type.color }}
                />

                <h3
                  className="text-[1.15rem] mt-2 mb-2 transition-colors duration-300"
                  style={{
                    fontFamily: "Georgia, 'Times New Roman', serif",
                    fontWeight: 700,
                    color: type.color,
                  }}
                >
                  {type.name}
                </h3>
                <p className="text-[0.88rem] text-[#666] leading-snug mb-4">
                  {type.desc}
                </p>
                <p className="text-[0.7rem] text-[#bbb] tracking-[0.05em]">
                  {type.axes}
                </p>
              </div>
            </AnimateOnScroll>
          ))}
        </div>

        <AnimateOnScroll delay={500}>
          <p className="text-center mt-8 text-sm text-[#ccc] italic">
            ...и ещё 12, которые ты пока не заслужил увидеть
          </p>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
