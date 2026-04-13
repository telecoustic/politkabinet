const YM_ID = 108526234;

type YmFunc = (id: number, action: string, ...args: unknown[]) => void;

declare global {
  interface Window {
    ym?: YmFunc;
  }
}

function ym(action: string, ...args: unknown[]) {
  if (typeof window !== "undefined" && window.ym) {
    window.ym(YM_ID, action, ...args);
  }
}

// --- Воронка ---

export function trackCtaClick() {
  ym("reachGoal", "cta_click");
}

export function trackQuizStart() {
  ym("reachGoal", "quiz_start");
}

export function trackQuizQuestion(num: number) {
  ym("reachGoal", "quiz_q", { question: num });
}

export function trackQuizComplete(typeKey: string) {
  ym("reachGoal", "quiz_complete", { type: typeKey });
}

// --- Результат ---

export function trackShareClick() {
  ym("reachGoal", "share_click");
}

export function trackShareCopy() {
  ym("reachGoal", "share_copy");
}

export function trackFriendCodeEnter() {
  ym("reachGoal", "friend_code_enter");
}

export function trackCompareClick() {
  ym("reachGoal", "compare_click");
}

// --- Ссылка друга ---

export function trackFriendLinkVisit() {
  ym("reachGoal", "friend_link_visit");
}
