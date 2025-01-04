import CardDoubtBlock from "@/components/blocks/card-doubt.block";
import ButtonBottom from "@/components/elements/button-bottom.element";
import { getAllDoubtService } from "@/services/doubt.service";
import { Doubt_I } from "@/types/doubt.type";
import Link from "next/dist/client/link";
import { Suspense } from "react";
export const dynamic = "force-dynamic";
export default async function Home() {
  let doubts: Doubt_I[] = [];

  try {
    doubts = await getAllDoubtService();
  } catch {
    return "Ошибка. Не удалось получить сомнения";
  }

  return (
    <Suspense fallback={<div>Load</div>}>
      <>
        <h2 className="text-2xl mb-4">Твои сомнения</h2>
        <div className="gap-4 grid grid-cols-1 lg:grid-cols-2">
          {doubts && doubts.length ? (
            doubts.map((doubt) => (
              <Link href={`/doubt/${doubt.id}`} key={doubt.id}>
                <CardDoubtBlock doubt={doubt} />
              </Link>
            ))
          ) : (
            <p>Нема</p>
          )}
        </div>

        <Link href={"/setup"}>
          <ButtonBottom>Я сомневаюсь в...</ButtonBottom>
        </Link>
      </>
    </Suspense>
  );
}
