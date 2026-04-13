import { AnimateOnScroll } from "./animate-on-scroll";

const axes = [
  { label: "Экономика", left: "Равенство", right: "Рынок", you: 82, friend: 35 },
  { label: "Дипломатия", left: "Глобализм", right: "Нация", you: 28, friend: 22 },
  { label: "Государство", left: "Свобода", right: "Порядок", you: 75, friend: 48 },
  { label: "Общество", left: "Прогресс", right: "Традиция", you: 55, friend: 60 },
];

export function Compare() {
  return (
    <section className="py-24 px-5 bg-[#2c2c2c] text-[#f5f0e8] relative overflow-hidden">
      <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-[#3d85c6] rounded-full opacity-[0.06] blur-[100px]" />

      <div className="max-w-[900px] mx-auto relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: text */}
          <AnimateOnScroll>
            <div>
              <h2
                className="text-[clamp(1.6rem,4vw,2.4rem)] leading-[1.15] mb-4"
                style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontWeight: 700 }}
              >
                А потом —<br />сравни
              </h2>
              <p className="text-[#888] leading-relaxed mb-6">
                Узнай, почему вы с другом спорите о каждой новости.
                Одна ссылка — и вы оба знаете, о чём лучше не говорить
                за праздничным столом.
              </p>
              <div className="flex gap-6 text-sm text-[#888]">
                <div className="flex items-center gap-2">
                  <div className="w-3.5 h-3.5 rounded-full bg-[#e07a5f]" /> Ты
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3.5 h-3.5 rounded-full bg-[#3d85c6]" /> Друг
                </div>
              </div>
            </div>
          </AnimateOnScroll>

          {/* Right: visualization */}
          <AnimateOnScroll delay={200}>
            <div className="space-y-5">
              {axes.map((axis) => (
                <div key={axis.label}>
                  <div className="flex justify-between text-[0.7rem] text-[#777] mb-1.5">
                    <span>{axis.left}</span>
                    <span className="text-[#bbb] text-xs" style={{ fontFamily: "Georgia, serif" }}>
                      {axis.label}
                    </span>
                    <span>{axis.right}</span>
                  </div>
                  <div className="relative h-2 bg-[#444] rounded-full">
                    <div
                      className="absolute top-1/2 w-4.5 h-4.5 rounded-full bg-[#e07a5f] border-2 border-[#2c2c2c] shadow-[0_0_8px_rgba(224,122,95,0.4)] z-10"
                      style={{ left: `${axis.you}%`, transform: "translate(-50%, -50%)" }}
                    />
                    <div
                      className="absolute top-1/2 w-4.5 h-4.5 rounded-full bg-[#3d85c6] border-2 border-[#2c2c2c] shadow-[0_0_8px_rgba(61,133,198,0.4)] z-10"
                      style={{ left: `${axis.friend}%`, transform: "translate(-50%, -50%)" }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  );
}
