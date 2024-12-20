import { User } from "@prisma/client";
import prisma from "../../lib/prisma";

export default async function Home() {
  const users: User[] = await prisma.user.findMany();

  // const createUser = async () => {
  //   const newUser = await prisma.user.create({
  //     data: {
  //       email: email,
  //     },
  //   });
  //   users.push(newUser);
  // };

  // const [email, setEmail] = useState("");
  // const [name, setName] = useState("");

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16">
      {/* <input
        placeholder="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />
      <input
        placeholder="name"
        value={name}
        onChange={(event) => setName(event.target.value)}
      /> */}
      {users.map((userF) => {
        return (
          <div key={userF.id}>
            {userF.id}
            {userF.name}
            {userF.email}
          </div>
        );
      })}
      {/* <button onClick={() => createUser()}>Создать</button> */}
    </div>
  );
}
