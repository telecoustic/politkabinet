export function Hero() {
  return (
    <section className="min-h-dvh flex flex-col justify-center px-5 py-12 relative overflow-hidden">
      {/* Subtle grid texture */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, #2c2c2c 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="max-w-[900px] mx-auto w-full relative">
        <p className="text-xs tracking-[0.25em] uppercase text-[#aaa] mb-10 animate-[fadeInUp_0.8s_ease-out_both]">
          Бесплатный тест / 10 минут / 24 ситуации
        </p>

        <h1
          className="text-[clamp(3rem,10vw,6.5rem)] leading-[0.92] tracking-[-0.04em] mb-10 animate-[fadeInUp_0.8s_ease-out_0.15s_both]"
          style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontWeight: 700 }}
        >
          Ты не знаешь
          <br />
          <span className="text-[#e07a5f] italic">свои</span> политические
          <br />
          взгляды
        </h1>

        <div className="flex flex-col sm:flex-row sm:items-end gap-6 sm:gap-12 animate-[fadeInUp_0.8s_ease-out_0.3s_both]">
          <p className="text-[1.1rem] text-[#777] max-w-[400px] leading-relaxed">
            24 бытовые ситуации покажут, кто ты на самом деле.
            Без вопросов про Путина. Без правильных ответов.
          </p>

          <a
            href="#cta"
            className="group inline-flex items-center gap-3 text-sm text-[#aaa] hover:text-[#e07a5f] transition-colors shrink-0"
          >
            <span className="w-10 h-px bg-current transition-all group-hover:w-16" />
            Пройти тест
          </a>
        </div>
      </div>
    </section>
  );
}
