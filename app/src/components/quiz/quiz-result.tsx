"use client";

import { useState, useMemo, useCallback } from "react";
import type { Scores } from "@/lib/types";
import { getType, scoresToCode, codeToScores } from "@/lib/types";
import { Comparison } from "./comparison";
import { trackShareClick, trackShareCopy, trackFriendCodeEnter, trackCompareClick } from "@/lib/analytics";

interface QuizResultProps {
  scores: Scores;
  name: string;
  friendCode: string | null;
}

interface AxisDisplay {
  key: string;
  label: string;
  leftLabel: string;
  rightLabel: string;
  color: string;
  value: number;
}

export function QuizResult({ scores, name, friendCode }: QuizResultProps) {
  const [friendInput, setFriendInput] = useState(friendCode || "");
  const [showComparison, setShowComparison] = useState(!!friendCode);
  const [copied, setCopied] = useState(false);

  const type = useMemo(() => getType(scores), [scores]);
  const code = useMemo(() => scoresToCode(scores), [scores]);

  const axes: AxisDisplay[] = [
    { key: "econ", label: "Экономика", leftLabel: "Равенство", rightLabel: "Рынок", color: "#e07a5f", value: scores.econ },
    { key: "diplo", label: "Дипломатия", leftLabel: "Глобализм", rightLabel: "Нация", color: "#3d85c6", value: scores.diplo },
    { key: "gov", label: "Государство", leftLabel: "Свобода", rightLabel: "Порядок", color: "#81b29a", value: scores.gov },
    { key: "soc", label: "Общество", leftLabel: "Прогресс", rightLabel: "Традиция", color: "#f2cc8f", value: scores.soc },
  ];

  const shareUrl = useMemo(() => {
    if (typeof window === "undefined") return "";
    return `${window.location.origin}/t/${code}`;
  }, [code]);

  const handleShare = useCallback(async () => {
    trackShareClick();
    try {
      await navigator.clipboard.writeText(shareUrl);
      trackShareCopy();
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const ta = document.createElement("textarea");
      ta.value = shareUrl;
      ta.style.position = "fixed";
      ta.style.left = "-9999px";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [shareUrl]);

  const friendScores = useMemo(() => {
    if (!friendInput.trim()) return null;
    return codeToScores(friendInput.trim());
  }, [friendInput]);

  const handleCompare = useCallback(() => {
    if (friendScores) {
      trackCompareClick();
      setShowComparison(true);
    }
  }, [friendScores]);

  const handleClearFriend = useCallback(() => {
    setFriendInput("");
    setShowComparison(false);
  }, []);

  return (
    <div className="min-h-screen bg-[#f5f0e8]">
      {/* Result header */}
      <div className="bg-[#2c2c2c] text-[#f5f0e8] px-5 py-16 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#e07a5f] rounded-full opacity-[0.04] blur-[120px]" />

        <div className="max-w-[600px] mx-auto text-center relative">
          <p className="text-[#888] text-sm mb-2">{name}, ты —</p>
          <p className="text-[3rem] mb-3">{type.emoji}</p>
          <h1
            className="text-[clamp(2rem,7vw,3rem)] leading-[1.1] tracking-[-0.02em] mb-4"
            style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontWeight: 700 }}
          >
            {type.name}
          </h1>
          <p className="text-[#ccc] text-[1.05rem] leading-[1.6] max-w-[500px] mx-auto mb-6">
            {type.desc}
          </p>

          {type.fullDesc && (
            <div className="text-left max-w-[500px] mx-auto text-[0.92rem] text-[#999] leading-[1.7] space-y-4">
              {type.fullDesc.split('\n\n').map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Axes visualization */}
      <div className="px-5 py-12">
        <div className="max-w-[600px] mx-auto">
          <h2
            className="text-[1.5rem] text-[#2c2c2c] mb-8 text-center"
            style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontWeight: 700 }}
          >
            Твои координаты
          </h2>

          <div className="flex flex-col gap-8">
            {axes.map((axis) => (
              <div key={axis.key}>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-[#888]">{axis.leftLabel}</span>
                  <span
                    className="text-sm font-medium"
                    style={{ color: axis.color }}
                  >
                    {axis.label}
                  </span>
                  <span className="text-sm text-[#888]">{axis.rightLabel}</span>
                </div>
                <div className="relative h-3 bg-[#e8e2d8] rounded-full mx-2.5">
                  {/* Track fill */}
                  <div
                    className="absolute top-0 left-0 h-full rounded-full opacity-20"
                    style={{
                      width: `${axis.value}%`,
                      backgroundColor: axis.color,
                    }}
                  />
                  {/* Marker */}
                  <div
                    className="absolute top-1/2 w-5 h-5 rounded-full border-2 border-white shadow-[0_1px_4px_rgba(0,0,0,0.3)] transition-all duration-500"
                    style={{
                      left: `clamp(0%, ${axis.value}%, 100%)`,
                      transform: "translate(-50%, -50%)",
                      backgroundColor: axis.color,
                    }}
                  />
                </div>
                <div className="text-center mt-1">
                  <span className="text-xs text-[#888]">{Math.round(axis.value)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Result code & share */}
      <div className="bg-[#2c2c2c] text-[#f5f0e8] px-5 py-12">
        <div className="max-w-[600px] mx-auto text-center">
          <p className="text-[#888] text-sm mb-3">Твой код результата</p>
          <p
            className="text-[2rem] tracking-[0.1em] mb-6"
            style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontWeight: 700 }}
          >
            {code}
          </p>
          <button
            onClick={handleShare}
            className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-[#e07a5f] text-white text-[1rem] hover:bg-[#d06a4f] active:scale-[0.98] transition-all cursor-pointer shadow-[0_4px_24px_rgba(224,122,95,0.3)]"
            style={{ fontFamily: "Georgia, serif", fontWeight: 700 }}
          >
            {copied ? "Скопировано!" : "Поделиться"}
          </button>
          <p className="text-[#555] text-xs mt-4">
            Ссылка ведёт на тест — друг пройдёт и увидит сравнение
          </p>
        </div>
      </div>

      {/* Compare with friend */}
      <div className="px-5 py-12">
        <div className="max-w-[600px] mx-auto">
          <h2
            className="text-[1.5rem] text-[#2c2c2c] mb-6 text-center"
            style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontWeight: 700 }}
          >
            Сравни с другом
          </h2>

          <div className="flex gap-2 items-center">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Код друга (XX-XX-XX-XX)"
                value={friendInput}
                onChange={(e) => {
                  setFriendInput(e.target.value);
                  setShowComparison(false);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && friendScores) handleCompare();
                }}
                className="w-full h-12 px-4 rounded-xl bg-white border border-[#ddd5c8] text-[#2c2c2c] placeholder:text-[#aaa] focus:outline-none focus:border-[#2c2c2c] transition-colors text-center"
              />
              {friendInput && (
                <button
                  onClick={handleClearFriend}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center text-[#888] hover:text-[#2c2c2c] cursor-pointer"
                >
                  x
                </button>
              )}
            </div>
            <button
              onClick={handleCompare}
              disabled={!friendScores}
              className="h-12 px-6 rounded-xl bg-[#2c2c2c] text-[#f5f0e8] hover:bg-[#3a3a3a] active:scale-[0.98] disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer"
              style={{ fontFamily: "Georgia, serif", fontWeight: 700 }}
            >
              Сравнить
            </button>
          </div>

          {friendInput && !friendScores && (
            <p className="text-sm text-[#c44] mt-2 text-center">
              Формат: четыре числа от 0 до 100 через дефис
            </p>
          )}

          {showComparison && friendScores && (
            <div className="mt-8">
              <Comparison myScores={scores} friendScores={friendScores} />
            </div>
          )}
        </div>
      </div>

      {/* Footer note */}
      <div className="px-5 pb-12 text-center">
        <p className="text-xs text-[#888]">
          Это не научное исследование. Мы ничего не сохраняем — негде.
        </p>
      </div>
    </div>
  );
}
