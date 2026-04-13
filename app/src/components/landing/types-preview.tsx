import { Card, CardContent } from "@/components/ui/card";

const types = [
  {
    emoji: "\u2692\uFE0F",
    name: "Железный канцлер",
    desc: "Порядок, скрепы, частная собственность. Бисмарк одобряет.",
  },
  {
    emoji: "\uD83D\uDE80",
    name: "Космический хиппи",
    desc: "Границы -- выдумка, собственность -- иллюзия, будущее -- за коммунами на Марсе.",
  },
  {
    emoji: "\uD83D\uDCBB",
    name: "Кремниевый евангелист",
    desc: "Uber для всего, блокчейн для остального, государство -- помеха.",
  },
  {
    emoji: "\u2696\uFE0F",
    name: "Народный трибун",
    desc: "Всё наше, чужим не дадим, вождь знает лучше. Работает с 1917 года.",
  },
];

export function TypesPreview() {
  return (
    <section className="border-t border-border py-12 px-5">
      <div className="max-w-[640px] mx-auto">
        <h2
          className="text-[1.8rem] leading-[1.15] mb-2"
          style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontWeight: 700 }}
        >
          Кем ты можешь оказаться
        </h2>
        <p className="text-muted-foreground mb-8">
          4 из 16 типов. Остальные узнаешь, когда пройдёшь.
        </p>

        <div className="grid grid-cols-1 min-[480px]:grid-cols-2 gap-3">
          {types.map((type) => (
            <Card
              key={type.name}
              className="bg-card shadow-sm hover:-translate-y-0.5 transition-transform duration-150 cursor-default border-0 ring-1 ring-foreground/5"
            >
              <CardContent className="pt-5 pb-5">
                <div className="text-3xl mb-1">{type.emoji}</div>
                <h3
                  className="text-[0.95rem] mb-1"
                  style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontWeight: 700 }}
                >
                  {type.name}
                </h3>
                <p className="text-[0.8rem] text-muted-foreground leading-snug">
                  {type.desc}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <p className="text-center mt-5 text-sm text-[#999] italic">
          ...и ещё 12 типов, которые ты пока не заслужил увидеть
        </p>
      </div>
    </section>
  );
}
