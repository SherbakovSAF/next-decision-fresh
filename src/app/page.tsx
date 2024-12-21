import { User } from "@prisma/client";
import prisma from "@/../prisma/prisma.client";
import { Suspense } from "react";

export default async function Home() {
  let users: User[] = [];
  try {
    users = await prisma.user.findMany();
  } catch (error: unknown) {
    console.log(error);
    return <div>Ошибка</div>;
  }

  return (
    <Suspense fallback={<div>Load</div>}>
      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16">
        {users.map((userF) => {
          return (
            <div key={userF.id}>
              {userF.id}
              {userF.name}
              {userF.email}
            </div>
          );
        })}
      </div>
    </Suspense>
  );
}
