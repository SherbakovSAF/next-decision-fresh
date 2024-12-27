// import { User } from "@prisma/client";

import CardDoubtBlock from "@/components/blocks/card-doubt.block";
import ButtonBottom from "@/components/elements/button-bottom.element";
import { Doubt_I } from "@/types/doubt.type";
import Link from "next/dist/client/link";
import { cookies } from "next/headers";
import { Suspense } from "react";
export const dynamic = "force-dynamic";
export default async function Home() {
  // let users: User[] = [];
  // try {
  //   const finedUsers = await fetch(
  //     `${process.env.NEXT_PUBLIC_URL_PATH}/api/user`,
  //     {
  //       method: "GET",
  //     }
  //   );

  //   users = await finedUsers.json();
  // } catch (error) {
  //   console.log(error);
  //   return <div>Ошибка</div>;
  // }
  let doubts: Doubt_I[] = [];
  try {
    const cookieStore = await cookies();

    const requestDoubts = await fetch(
      `${process.env.NEXT_PUBLIC_URL_PATH}/api/doubt`,
      {
        method: "GET",
        headers: new Headers({ Cookie: cookieStore.toString() }),
      }
    );

    doubts = await requestDoubts.json();
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
