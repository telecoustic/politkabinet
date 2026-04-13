const axes = [
  { label: "Экономика", you: 82, friend: 35 },
  { label: "Дипломатия", you: 28, friend: 22 },
  { label: "Государство", you: 75, friend: 48 },
  { label: "Общество", you: 55, friend: 60 },
];

export function Compare() {
  return (
    <section className="border-t border-border py-12 px-5">
      <div className="max-w-[640px] mx-auto">
        <h2
          className="text-[1.8rem] leading-[1.15] mb-2"
          style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontWeight: 700 }}
        >
          А потом -- сравни
        </h2>
        <p className="text-muted-foreground mb-8">
          Узнай, почему вы с другом спорите о каждой новости
        </p>

        <div className="bg-card rounded-2xl p-6 shadow-sm ring-1 ring-foreground/5 mb-6">
          {axes.map((axis, i) => (
            <div
              key={axis.label}
              className={`flex items-center gap-3 py-2.5 text-sm ${
                i < axes.length - 1 ? "border-b border-[#f0ebe3]" : ""
              }`}
            >
              <span className="w-[5.5rem] shrink-0 text-xs text-muted-foreground">
                {axis.label}
              </span>
              <div className="flex-1 h-1.5 bg-secondary rounded-full relative">
                <div
                  className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-[#e07a5f]"
                  style={{ left: `${axis.you}%` }}
                />
                <div
                  className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-[#3d85c6]"
                  style={{ left: `${axis.friend}%` }}
                />
              </div>
            </div>
          ))}

          <div className="flex justify-center gap-6 mt-3 text-xs text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-[#e07a5f]" />
              Ты
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-[#3d85c6]" />
              Друг
            </div>
          </div>
        </div>

        <p className="text-center text-sm text-muted-foreground">
          Одна ссылка -- и вы оба знаете, о чём лучше не говорить за праздничным столом
        </p>
      </div>
    </section>
  );
}
