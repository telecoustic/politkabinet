import { redirect } from "next/navigation";

function isValidCode(code: string): boolean {
  const parts = code.split("-");
  if (parts.length !== 4) return false;
  return parts.every((part) => {
    const num = Number(part);
    return !isNaN(num) && num >= 0 && num <= 100 && String(Math.round(num)) === part;
  });
}

export default async function SharePage({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = await params;

  if (!isValidCode(code)) {
    redirect("/");
  }

  redirect(`/?friend=${code}`);
}
