const competitors = [
  {
    name: "Political Compass / 8values",
    verdict: "Экзамен без оценки",
    text: "На английском. Вопросы типа «международные организации подрывают суверенитет наций — согласен / не согласен». Результат — точка на графике без объяснения. Нечем делиться, не с кем сравнить.",
    color: "#e07a5f",
  },
  {
    name: "Тесты из соцсетей",
    verdict: "Забыл через минуту",
    text: "Три вопроса, один результат: «ты либерал». Без осей, без глубины, без ситуаций. Даже скриншот делать стыдно.",
    color: "#3d85c6",
  },
  {
    name: "Просто поговорить",
    verdict: "Пока кто-то не скажет лишнего",
    text: "Нет структуры, нет данных, нет шанса сравнить позиции без эмоций. Политкабинет даёт рамку, в которой разногласия — это интересно, а не опасно.",
    color: "#81b29a",
  },
];

export function Competitors() {
  return (
    <section className="py-14 px-5">
      <div className="max-w-[640px] mx-auto">
        <h2
          className="text-[1.8rem] leading-[1.15] mb-8"
          style={{
            fontFamily: "Georgia, 'Times New Roman', serif",
            fontWeight: 700,
          }}
        >
          Почему не другие тесты
        </h2>

        <div className="space-y-3">
          {competitors.map((c) => (
            <div
              key={c.name}
              className="bg-card rounded-xl p-5 ring-1 ring-foreground/5 shadow-sm"
            >
              <div className="flex items-center gap-3 mb-2">
                <div
                  className="w-1 h-8 rounded-full shrink-0"
                  style={{ backgroundColor: c.color }}
                />
                <div>
                  <h3
                    className="text-[0.95rem]"
                    style={{
                      fontFamily: "Georgia, 'Times New Roman', serif",
                      fontWeight: 700,
                    }}
                  >
                    {c.name}
                  </h3>
                  <span className="text-xs text-muted-foreground italic">
                    {c.verdict}
                  </span>
                </div>
              </div>
              <p className="text-[0.88rem] text-[#666] leading-relaxed pl-4">
                {c.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
