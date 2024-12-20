import { User } from "@prisma/client";
import prisma from "@/../prisma/prisma.client";

export default async function Home() {
  const users: User[] = await prisma.user.findMany();

  return (
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
  );
}
