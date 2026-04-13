const feelings = [
  {
    emoji: "💡",
    title: "«Так вот я какой»",
    text: "Ясность вместо каши в голове. Не один ярлык, а четыре шкалы. Оказывается, твои противоречия — это не баг, а фича.",
  },
  {
    emoji: "🤝",
    title: "«А мы, оказывается, похожи»",
    text: "Или наоборот: «а вот тут мы вообще не совпадаем». И то, и другое — повод для разговора, а не для обиды.",
  },
  {
    emoji: "💬",
    title: "«Лучший вечер в чате за месяц»",
    text: "Не скроллинг, не мемы, а настоящий разговор. Тот, после которого не стыдно.",
  },
];

const imagines = [
  "Ты точно знаешь свои координаты на карте взглядов — и можешь объяснить их, не скатываясь в «ну, я в целом за свободу, но...»",
  "В чате — живое обсуждение, кто оказался авторитаристом, а кто — неожиданным анархистом",
  "Ты наконец понимаешь, почему с одним другом споришь по любому поводу, а с другим — всегда на одной волне",
  "Политика перестала быть темой, после которой надо извиняться",
];

export function AfterTest() {
  return (
    <section className="py-14 px-5 bg-[#eee8dd]/50">
      <div className="max-w-[640px] mx-auto">
        <h2
          className="text-[1.8rem] leading-[1.15] mb-8"
          style={{
            fontFamily: "Georgia, 'Times New Roman', serif",
            fontWeight: 700,
          }}
        >
          После теста
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-10">
          {feelings.map((f) => (
            <div
              key={f.title}
              className="bg-card rounded-xl p-5 ring-1 ring-foreground/5 shadow-sm text-center"
            >
              <div className="text-2xl mb-3">{f.emoji}</div>
              <h3
                className="text-[0.9rem] mb-2"
                style={{
                  fontFamily: "Georgia, 'Times New Roman', serif",
                  fontWeight: 700,
                }}
              >
                {f.title}
              </h3>
              <p className="text-[0.8rem] text-[#666] leading-relaxed">
                {f.text}
              </p>
            </div>
          ))}
        </div>

        <h3
          className="text-[1.2rem] mb-4"
          style={{
            fontFamily: "Georgia, 'Times New Roman', serif",
            fontWeight: 700,
          }}
        >
          Представь
        </h3>
        <ul className="space-y-2.5">
          {imagines.map((item, i) => (
            <li
              key={i}
              className="text-[0.9rem] text-[#555] leading-relaxed pl-5 relative before:content-['→'] before:absolute before:left-0 before:text-[#81b29a]"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
