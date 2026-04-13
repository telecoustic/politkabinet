"use client";

import { useState, useCallback, useEffect } from "react";
import { questions } from "@/lib/questions";
import type { AxisKey } from "@/lib/questions";
import type { Scores } from "@/lib/types";
import { QuizResult } from "./quiz-result";

interface QuizFlowProps {
  name: string;
  friendCode: string | null;
}

const initialScores: Scores = { econ: 50, diplo: 50, gov: 50, soc: 50 };

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

export function QuizFlow({ name, friendCode }: QuizFlowProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [scores, setScores] = useState<Scores>({ ...initialScores });
  const [finished, setFinished] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [fadeState, setFadeState] = useState<"in" | "out">("in");

  const totalQuestions = questions.length;
  const question = questions[currentQuestion];

  const handleSelect = useCallback(
    (optionIndex: number) => {
      if (selectedIndex !== null) return; // already selecting

      setSelectedIndex(optionIndex);

      const option = question.options[optionIndex];
      setScores((prev) => {
        const next = { ...prev };
        const keys = Object.keys(option.scores) as AxisKey[];
        for (const axis of keys) {
          const delta = option.scores[axis];
          if (delta !== undefined) {
            next[axis] = clamp(next[axis] + delta, 0, 100);
          }
        }
        return next;
      });

      // Visual feedback then advance
      setTimeout(() => {
        setFadeState("out");
        setTimeout(() => {
          if (currentQuestion + 1 >= totalQuestions) {
            setFinished(true);
          } else {
            setCurrentQuestion((q) => q + 1);
            setSelectedIndex(null);
            setFadeState("in");
          }
        }, 200);
      }, 250);
    },
    [selectedIndex, question, currentQuestion, totalQuestions]
  );

  // Keyboard support: 1-4 keys
  useEffect(() => {
    if (finished) return;
    const handler = (e: KeyboardEvent) => {
      const num = parseInt(e.key);
      if (num >= 1 && num <= 4) {
        handleSelect(num - 1);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [handleSelect, finished]);

  if (finished) {
    return <QuizResult scores={scores} name={name} friendCode={friendCode} />;
  }

  const progress = ((currentQuestion + 1) / totalQuestions) * 100;

  return (
    <div className="min-h-screen bg-[#f5f0e8] flex flex-col">
      {/* Progress bar */}
      <div className="sticky top-0 z-10 bg-[#f5f0e8] pt-4 px-5 pb-2">
        <div className="max-w-[600px] mx-auto">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-[#888]">
              {currentQuestion + 1} / {totalQuestions}
            </span>
            <span className="text-sm text-[#888]">{name}</span>
          </div>
          <div className="w-full h-1 bg-[#ddd5c8] rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-300 ease-out"
              style={{
                width: `${progress}%`,
                backgroundColor: "#2c2c2c",
              }}
            />
          </div>
        </div>
      </div>

      {/* Question area */}
      <div className="flex-1 flex items-center justify-center px-5 py-8">
        <div
          className="max-w-[600px] w-full transition-opacity duration-200"
          style={{ opacity: fadeState === "in" ? 1 : 0 }}
        >
          {/* Question text */}
          <p
            className="text-[1.25rem] leading-[1.5] text-[#2c2c2c] mb-8 text-center"
            style={{
              fontFamily: "Georgia, 'Times New Roman', serif",
            }}
          >
            {question.text}
          </p>

          {/* Options */}
          <div className="flex flex-col gap-3">
            {question.options.map((option, index) => {
              const isSelected = selectedIndex === index;
              return (
                <button
                  key={index}
                  onClick={() => handleSelect(index)}
                  disabled={selectedIndex !== null}
                  className={`
                    w-full text-left px-5 py-4 rounded-xl
                    bg-white border transition-all duration-150
                    cursor-pointer select-none
                    min-h-[60px]
                    text-[1rem] leading-[1.5] text-[#2c2c2c]
                    ${
                      isSelected
                        ? "border-[#2c2c2c] shadow-[0_2px_12px_rgba(44,44,44,0.15)] scale-[0.98]"
                        : "border-[#e8e2d8] shadow-[0_1px_4px_rgba(0,0,0,0.06)] hover:border-[#ccc5b8] hover:shadow-[0_2px_8px_rgba(0,0,0,0.1)] active:scale-[0.98]"
                    }
                    ${selectedIndex !== null && !isSelected ? "opacity-50" : ""}
                    disabled:cursor-default
                  `}
                >
                  {option.text}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
