import { Suspense } from "react";
import { redirect } from "next/navigation";
import { QuizFlow } from "@/components/quiz/quiz-flow";

export default async function QuizPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const name = typeof params.name === "string" ? params.name.trim() : "";
  const friend = typeof params.friend === "string" ? params.friend.trim() : null;

  if (!name) {
    redirect("/");
  }

  return (
    <Suspense fallback={<QuizLoading />}>
      <QuizFlow name={name} friendCode={friend} />
    </Suspense>
  );
}

function QuizLoading() {
  return (
    <div className="min-h-screen bg-[#f5f0e8] flex items-center justify-center">
      <p className="text-[#888] text-lg">Загружаем вопросы...</p>
    </div>
  );
}
