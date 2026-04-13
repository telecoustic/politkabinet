export function AhaMoment() {
  return (
    <section className="border-t border-border py-12 px-5 text-center">
      <div className="max-w-[640px] mx-auto">
        <h2
          className="text-[1.8rem] leading-[1.15] mb-6"
          style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontWeight: 700 }}
        >
          Попробуй прямо сейчас
        </h2>

        <a
          href="#cta"
          className="inline-flex items-center justify-center h-12 px-8 text-lg rounded-[10px] bg-primary text-primary-foreground hover:bg-primary/90 transition-colors cursor-pointer"
          style={{ fontFamily: "Georgia, serif", fontWeight: 700 }}
        >
          Пройти тест — 10 минут
        </a>

        <p className="mt-6 text-[0.95rem] text-[#888] max-w-[480px] mx-auto leading-relaxed">
          Ты ответишь на первый вопрос и поймёшь: это не «оцените по шкале от 1
          до 5 ваше отношение к глобализации». Это ситуации, в которых ты бывал.
          Правильных ответов нет. Есть твои.
        </p>
      </div>
    </section>
  );
}
