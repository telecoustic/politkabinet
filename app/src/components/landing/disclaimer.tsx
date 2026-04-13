export function Disclaimer() {
  return (
    <section className="py-8 px-5">
      <div className="max-w-[480px] mx-auto text-center">
        <div className="w-8 h-px bg-foreground/15 mx-auto mb-4" />
        <p className="text-[0.9rem] text-muted-foreground italic leading-relaxed">
          Это не научное исследование. Это 10 минут, после которых ты будешь
          спорить с результатами, а потом признаешь, что тест прав.
        </p>
        <div className="w-8 h-px bg-foreground/15 mx-auto mt-4" />
      </div>
    </section>
  );
}
