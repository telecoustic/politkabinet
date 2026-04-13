const triggers = [
  "В чате тишина второй день, а ты листаешь мемы в поисках чего-нибудь поумнее?",
  "Посмотрел рилс про политику и не можешь сформулировать, с чем согласен, а с чем нет?",
  "С другом спорите о политике каждый раз, когда видитесь — и каждый раз одинаково бесполезно?",
  "Друзья уверены, что знают твои взгляды, а ты сам — не факт?",
  "16personalities уже пройдено, а хочется ещё что-то про себя узнать?",
  "Собрались компанией и через 20 минут уже не знаете, чем заняться?",
];

export function Recognize() {
  return (
    <section className="py-14 px-5">
      <div className="max-w-[640px] mx-auto">
        <h2
          className="text-[1.8rem] leading-[1.15] mb-6"
          style={{
            fontFamily: "Georgia, 'Times New Roman', serif",
            fontWeight: 700,
          }}
        >
          Узнаёшь себя?
        </h2>

        <div className="space-y-3">
          {triggers.map((t, i) => (
            <div
              key={i}
              className="flex items-start gap-3 bg-card rounded-xl px-4 py-3 ring-1 ring-foreground/5 shadow-sm"
            >
              <span className="text-muted-foreground text-lg mt-0.5 shrink-0">?</span>
              <p className="text-[0.92rem] text-[#555] leading-relaxed">
                {t}
              </p>
            </div>
          ))}
        </div>

        <p className="mt-6 text-sm text-muted-foreground italic text-center">
          Если хотя бы одно — попал. Листай дальше.
        </p>
      </div>
    </section>
  );
}
