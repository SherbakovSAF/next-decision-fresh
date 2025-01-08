// import CardDoubtBlock from "@/components/blocks/card-doubt.block";
// import ButtonBottom from "@/components/elements/button-bottom.element";
// import { getAllDoubtService } from "@/services/doubt.service";
// import { Doubt_I } from "@/types/doubt.type";
// import Link from "next/dist/client/link";
// import { Suspense } from "react";
// import Modal, { getModalControl } from "@/components/modals/reaction.modal";

// export default async function Home() {
//   let doubts: Doubt_I[] = [];

//   try {
//     doubts = await getAllDoubtService();
//   } catch {
//     return "Ошибка. Не удалось получить сомнения";
//   }

//   return (
//     <Suspense fallback={<div>Load</div>}>
//       <Modal key={"Reaction"} />
//       <button onClick={() => getModalControl().open()}>Open Modal</button>
//       <h2 className="text-2xl mb-4">Твои сомнения</h2>
//       <div className="gap-4 grid grid-cols-1 lg:grid-cols-2">
//         {doubts && doubts.length ? (
//           doubts.map((doubt) => (
//             <Link href={`/doubt/${doubt.id}`} key={doubt.id}>
//               <CardDoubtBlock doubt={doubt} />
//             </Link>
//           ))
//         ) : (
//           <p>Нема</p>
//         )}
//       </div>

//       <Link href={"/setup"}>
//         <ButtonBottom>Я сомневаюсь в...</ButtonBottom>
//       </Link>
//     </Suspense>
//   );
// }

// export const dynamic = "force-dynamic";

import CardDoubtBlock from "@/components/blocks/card-doubt.block";
import ButtonBottom from "@/components/elements/button-bottom.element";
import Modal from "@/components/modals/reaction.modal";
import { getAllDoubtService } from "@/services/doubt.service";
import { Doubt_I } from "@/types/doubt.type";
import Link from "next/dist/client/link";
import { Suspense } from "react";

export default async function Home() {
  let doubts: Doubt_I[] = [];

  try {
    doubts = await getAllDoubtService();
  } catch {
    return "Ошибка. Не удалось получить сомнения";
  }

  // const updateAverageReactionDoubt = (createdData: ReactionCreateDTO) => {
  //   const updatedIndexDoubt = doubts.findIndex(
  //     (doubt) => doubt.id === createdData.updatedDoubt.id
  //   );

  //   doubts[updatedIndexDoubt].averageReaction =
  //     createdData.updatedDoubt.averageReaction;
  // };

  return (
    <Suspense fallback={<div>Load</div>}>
      <Modal />

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
    </Suspense>
  );
}

export const dynamic = "force-dynamic";
