"use client";

import { useState, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { trackCtaClick } from "@/lib/analytics";

export function CtaForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [name, setName] = useState("");

  const isValid = name.trim().length > 0;
  const friendCode = searchParams.get("friend");

  const handleSubmit = useCallback(() => {
    if (!isValid) return;
    trackCtaClick();
    const params = new URLSearchParams({ name: name.trim() });
    if (friendCode) {
      params.set("friend", friendCode);
    }
    router.push(`/quiz?${params.toString()}`);
  }, [isValid, name, friendCode, router]);

  return (
    <section id="cta" className="py-24 px-5 bg-[#2c2c2c] text-[#f5f0e8] relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#e07a5f] rounded-full opacity-[0.04] blur-[120px]" />

      <div className="max-w-[900px] mx-auto text-center relative">
        <h2
          className="text-[clamp(2rem,6vw,3.5rem)] leading-[1.05] tracking-[-0.02em] mb-4"
          style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontWeight: 700 }}
        >
          Ну что, готов?
        </h2>
        <p className="text-[#888] mb-12 text-[1.1rem]">
          Терять нечего, кроме иллюзий о себе.
        </p>

        <div className="max-w-[360px] mx-auto">
          <input
            type="text"
            maxLength={30}
            placeholder="Как тебя зовут?"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && isValid) handleSubmit();
            }}
            className="w-full h-14 text-lg text-center rounded-xl bg-[#3a3a3a] border border-[#555] text-[#f5f0e8] placeholder:text-[#666] focus:outline-none focus:border-[#e07a5f] focus:shadow-[0_0_0_3px_rgba(224,122,95,0.15)] transition-all px-4 mb-3"
          />
          <button
            disabled={!isValid}
            onClick={handleSubmit}
            className="w-full h-14 text-lg rounded-xl cursor-pointer bg-[#e07a5f] text-white hover:bg-[#d06a4f] active:scale-[0.98] disabled:opacity-25 disabled:cursor-not-allowed transition-all shadow-[0_4px_24px_rgba(224,122,95,0.3)] hover:shadow-[0_8px_32px_rgba(224,122,95,0.4)]"
            style={{ fontFamily: "Georgia, serif", fontWeight: 700 }}
          >
            Поехали
          </button>
        </div>

        <p className="text-[0.75rem] text-[#555] mt-8">
          Это не научное исследование. Мы ничего не сохраняем — негде.
        </p>
      </div>
    </section>
  );
}
