"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function CtaForm() {
  const router = useRouter();
  const [age, setAge] = useState("");
  const [name, setName] = useState("");

  const ageNum = parseInt(age, 10);
  const isValid =
    name.trim().length > 0 &&
    age.trim().length > 0 &&
    !isNaN(ageNum) &&
    ageNum >= 14 &&
    ageNum <= 99;

  const handleSubmit = useCallback(() => {
    if (!isValid) return;
    const params = new URLSearchParams({
      name: name.trim(),
      age: age.trim(),
    });
    router.push(`/quiz/?${params.toString()}`);
  }, [isValid, name, age, router]);

  return (
    <section id="cta" className="border-t border-border py-12 px-5 text-center pb-16">
      <div className="max-w-[640px] mx-auto">
        <h2
          className="text-[1.8rem] leading-[1.15] mb-2"
          style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontWeight: 700 }}
        >
          Ну что, готов?
        </h2>
        <p className="text-[#666] mb-8">
          Занимает 5 минут. Терять нечего, кроме иллюзий о себе.
        </p>

        <div className="max-w-[320px] mx-auto flex flex-col gap-3">
          <Input
            type="number"
            inputMode="numeric"
            min={14}
            max={99}
            placeholder="Сколько тебе полных лет?"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                const next = e.currentTarget
                  .parentElement?.querySelector<HTMLInputElement>(
                    'input[type="text"]'
                  );
                next?.focus();
              }
            }}
            className="h-12 text-base text-center rounded-[10px] border-2 border-border bg-card placeholder:text-[#bbb] focus-visible:border-foreground focus-visible:ring-0"
          />
          <Input
            type="text"
            maxLength={30}
            placeholder="Как тебя зовут?"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && isValid) handleSubmit();
            }}
            className="h-12 text-base text-center rounded-[10px] border-2 border-border bg-card placeholder:text-[#bbb] focus-visible:border-foreground focus-visible:ring-0"
          />
          <Button
            disabled={!isValid}
            onClick={handleSubmit}
            className="h-12 text-lg rounded-[10px] mt-1 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
            style={{ fontFamily: "Georgia, serif", fontWeight: 700 }}
          >
            Поехали
          </Button>
          <p className="text-xs text-[#bbb]">
            Мы ничего не сохраняем. Даже если захотим -- негде.
          </p>
        </div>
      </div>
    </section>
  );
}
