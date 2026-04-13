"use client";

import { useMemo } from "react";
import type { Scores } from "@/lib/types";
import { getType } from "@/lib/types";

interface ComparisonProps {
  myScores: Scores;
  friendScores: Scores;
}

interface AxisCompare {
  key: string;
  label: string;
  leftLabel: string;
  rightLabel: string;
  color: string;
  myValue: number;
  friendValue: number;
  diff: number;
  comment: string;
}

function getAxisComment(myValue: number, friendValue: number, leftLabel: string, rightLabel: string): string {
  const myCenter = myValue >= 40 && myValue <= 60;
  const friendCenter = friendValue >= 40 && friendValue <= 60;

  if (myCenter && friendCenter) {
    return "Оба держитесь середины";
  }

  if (myCenter || friendCenter) {
    return "Один из вас осторожничает, другой определился";
  }

  const myRight = myValue > 60;
  const friendRight = friendValue > 60;

  if (myRight === friendRight) {
    return "Тут вы на одной волне";
  }

  return `А вот тут начнётся дискуссия: ${leftLabel} vs ${rightLabel}`;
}

export function Comparison({ myScores, friendScores }: ComparisonProps) {
  const friendType = useMemo(() => getType(friendScores), [friendScores]);

  const matchPercent = useMemo(() => {
    const diffs = [
      Math.abs(myScores.econ - friendScores.econ),
      Math.abs(myScores.diplo - friendScores.diplo),
      Math.abs(myScores.gov - friendScores.gov),
      Math.abs(myScores.soc - friendScores.soc),
    ];
    const avgDiff = diffs.reduce((a, b) => a + b, 0) / 4;
    return Math.round(100 - avgDiff);
  }, [myScores, friendScores]);

  const axes: AxisCompare[] = useMemo(() => {
    const axisConfigs = [
      { key: "econ", label: "Экономика", leftLabel: "Равенство", rightLabel: "Рынок", color: "#e07a5f" },
      { key: "diplo", label: "Дипломатия", leftLabel: "Глобализм", rightLabel: "Нация", color: "#3d85c6" },
      { key: "gov", label: "Государство", leftLabel: "Свобода", rightLabel: "Порядок", color: "#81b29a" },
      { key: "soc", label: "Общество", leftLabel: "Прогресс", rightLabel: "Традиция", color: "#f2cc8f" },
    ];

    return axisConfigs.map((cfg) => {
      const myVal = myScores[cfg.key as keyof Scores];
      const friendVal = friendScores[cfg.key as keyof Scores];
      return {
        ...cfg,
        myValue: myVal,
        friendValue: friendVal,
        diff: Math.abs(myVal - friendVal),
        comment: getAxisComment(myVal, friendVal, cfg.leftLabel, cfg.rightLabel),
      };
    });
  }, [myScores, friendScores]);

  const matchComment = useMemo(() => {
    if (matchPercent >= 85) return "Вы практически клоны. Подозрительно.";
    if (matchPercent >= 70) return "Много общего — спорить будете редко.";
    if (matchPercent >= 55) return "Есть о чём поговорить за ужином.";
    if (matchPercent >= 40) return "Разные взгляды — но это интересно.";
    return "Политику лучше не обсуждать. Или наоборот — только её.";
  }, [matchPercent]);

  return (
    <div className="bg-[#2c2c2c] rounded-2xl px-5 py-8 text-[#f5f0e8]">
      {/* Match header */}
      <div className="text-center mb-8">
        <p className="text-[#888] text-sm mb-1">Совпадение</p>
        <p
          className="text-[3rem] leading-none mb-2"
          style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontWeight: 700 }}
        >
          {matchPercent}%
        </p>
        <p className="text-[#aaa] text-sm">{matchComment}</p>
        <p className="text-[#666] text-xs mt-2">
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
        {axes.map((axis) => (
          <div key={axis.key}>
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs text-[#666]">{axis.leftLabel}</span>
              <span className="text-xs text-[#888]">{axis.label}</span>
              <span className="text-xs text-[#666]">{axis.rightLabel}</span>
            </div>
            <div className="relative h-3 bg-[#3a3a3a] rounded-full">
              {/* My marker (orange) */}
              <div
                className="absolute top-1/2 w-4 h-4 rounded-full border-2 border-[#2c2c2c] shadow-[0_0_4px_rgba(0,0,0,0.5)] z-10"
                style={{
                  left: `${axis.myValue}%`,
                  transform: "translate(-50%, -50%)",
                  backgroundColor: "#e07a5f",
                }}
              />
              {/* Friend marker (blue) */}
              <div
                className="absolute top-1/2 w-4 h-4 rounded-full border-2 border-[#2c2c2c] shadow-[0_0_4px_rgba(0,0,0,0.5)] z-10"
                style={{
                  left: `${axis.friendValue}%`,
                  transform: "translate(-50%, -50%)",
                  backgroundColor: "#3d85c6",
                }}
              />
            </div>
            <p className="text-xs text-[#888] mt-1.5 text-center">{axis.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
