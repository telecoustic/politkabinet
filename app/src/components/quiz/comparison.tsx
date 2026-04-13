"use client";

import { useMemo } from "react";
import type { Scores } from "@/lib/types";
import { getType } from "@/lib/types";
import { axisTexts, chemistryTexts, discussionQuestions } from "@/lib/comparison-texts";

interface ComparisonProps {
  myScores: Scores;
  friendScores: Scores;
}

type AxisKey = "econ" | "diplo" | "gov" | "soc";

const axisConfig = [
  { key: "econ" as AxisKey, label: "Экономика", left: "Равенство", right: "Рынок" },
  { key: "diplo" as AxisKey, label: "Дипломатия", left: "Глобализм", right: "Нация" },
  { key: "gov" as AxisKey, label: "Государство", left: "Свобода", right: "Порядок" },
  { key: "soc" as AxisKey, label: "Общество", left: "Прогресс", right: "Традиция" },
];

function pick(arr: string[]): string {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getPattern(my: number, friend: number): string {
  const myPole = my > 60 ? "right" : my < 40 ? "left" : "center";
  const friendPole = friend > 60 ? "right" : friend < 40 ? "left" : "center";

  if (myPole === "center" && friendPole === "center") return "bothCenter";
  if (myPole === "center" || friendPole === "center") return "oneCenterOneNot";
  if (myPole === friendPole) return "samePole";
  return "oppositePoles";
}

function countMatches(my: Scores, friend: Scores): number {
  let matches = 0;
  for (const axis of axisConfig) {
    const pattern = getPattern(my[axis.key], friend[axis.key]);
    if (pattern === "samePole" || pattern === "bothCenter") matches++;
  }
  return matches;
}

export function Comparison({ myScores, friendScores }: ComparisonProps) {
  const friendType = useMemo(() => getType(friendScores), [friendScores]);

  const matchPercent = useMemo(() => {
    const diffs = axisConfig.map((a) =>
      Math.abs(myScores[a.key] - friendScores[a.key])
    );
    const avgDiff = diffs.reduce((a, b) => a + b, 0) / 4;
    return Math.round(100 - avgDiff);
  }, [myScores, friendScores]);

  const matches = useMemo(() => countMatches(myScores, friendScores), [myScores, friendScores]);

  // Find axis with biggest difference for discussion question
  const biggestDiffAxis = useMemo(() => {
    let maxDiff = 0;
    let maxKey: AxisKey = "econ";
    for (const axis of axisConfig) {
      const diff = Math.abs(myScores[axis.key] - friendScores[axis.key]);
      if (diff > maxDiff) {
        maxDiff = diff;
        maxKey = axis.key;
      }
    }
    return maxKey;
  }, [myScores, friendScores]);

  const chemistryKey = `match${Math.min(matches, 4)}`;
  const chemistry = pick(chemistryTexts[chemistryKey] || chemistryTexts.match2);
  const question = pick(discussionQuestions[biggestDiffAxis] || []);

  return (
    <div className="bg-[#2c2c2c] rounded-2xl px-5 py-8 text-[#f5f0e8]">
      {/* Match header */}
      <div className="text-center mb-8">
        <p className="text-[#888] text-sm mb-1">Совпадение</p>
        <p
          className="text-[3rem] leading-none mb-3"
          style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontWeight: 700 }}
        >
          {matchPercent}%
        </p>
        <p className="text-[#ccc] text-sm max-w-[400px] mx-auto leading-relaxed">
          {chemistry}
        </p>
        <p className="text-[#666] text-xs mt-3">
          Друг — {friendType.emoji} {friendType.name}
        </p>
      </div>

      {/* Legend */}
      <div className="flex justify-center gap-6 mb-6">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#e07a5f]" />
          <span className="text-xs text-[#aaa]">Ты</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#3d85c6]" />
          <span className="text-xs text-[#aaa]">Друг</span>
        </div>
      </div>

      {/* Axes comparison */}
      <div className="flex flex-col gap-6">
        {axisConfig.map((axis) => {
          const pattern = getPattern(myScores[axis.key], friendScores[axis.key]);
          const texts = axisTexts[axis.key]?.[pattern] || [];
          const comment = texts.length > 0 ? pick(texts) : "";

          return (
            <div key={axis.key}>
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs text-[#666]">{axis.left}</span>
                <span className="text-xs text-[#888]">{axis.label}</span>
                <span className="text-xs text-[#666]">{axis.right}</span>
              </div>
              <div className="relative h-3 bg-[#3a3a3a] rounded-full">
                <div
                  className="absolute top-1/2 w-4 h-4 rounded-full border-2 border-[#2c2c2c] shadow-[0_0_4px_rgba(0,0,0,0.5)] z-10"
                  style={{
                    left: `clamp(4%, ${myScores[axis.key]}%, 96%)`,
                    transform: "translate(-50%, -50%)",
                    backgroundColor: "#e07a5f",
                  }}
                />
                <div
                  className="absolute top-1/2 w-4 h-4 rounded-full border-2 border-[#2c2c2c] shadow-[0_0_4px_rgba(0,0,0,0.5)] z-10"
                  style={{
                    left: `clamp(4%, ${friendScores[axis.key]}%, 96%)`,
                    transform: "translate(-50%, -50%)",
                    backgroundColor: "#3d85c6",
                  }}
                />
              </div>
              {comment && (
                <p className="text-xs text-[#888] mt-2 leading-relaxed">{comment}</p>
              )}
            </div>
          );
        })}
      </div>

      {/* Discussion question */}
      {question && (
        <div className="mt-8 pt-6 border-t border-[#444]">
          <p className="text-xs text-[#666] uppercase tracking-wider mb-2">Попробуйте обсудить</p>
          <p className="text-[0.95rem] text-[#ccc] leading-relaxed italic">
            {question}
          </p>
        </div>
      )}
    </div>
  );
}
