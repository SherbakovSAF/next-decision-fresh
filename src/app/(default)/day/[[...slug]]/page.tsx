import CardDoubtReactionBlock from "@/components/blocks/card-doubt-reaction.block";
import MasonryGrid from "@/components/blocks/masonry-grid.block";
// import { DoubtReaction_M, DoubtReaction_E } from "@prisma/client";
// import { useState } from "react";
// import { getReactionService } from "@/services/reaction.service";
import { RoutePath_E } from "@/types/route-path.type";
import { DoubtReaction_M } from "@prisma/client";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
// import { RoutePath_E } from "../types/route-path.type";
// import { getReactionService } from "../services/reactiom.service";
interface DayPageProps {
  params: Promise<{
    slug: string[];
  }>;
}

const DayPage: React.FC<DayPageProps> = async ({ params }) => {
  // const searchParams = useSearchParams();
  const slug = (await params).slug;
  const doubtId = slug[0];

  const time = slug[1];

  if (!doubtId || !time || !Number(doubtId) || !Number(time))
    redirect(RoutePath_E.HOME);
  // TODO: Блокировать завтрашние дни в календаре, но при этом оставлять те, которые были выбраны ранее
  // TODO: К всем этим параметрам и прочему добавить нормальную логику, чтобы человек понимал что и почему передаётся
  // TODO: Продумать получение doubt, но не во всех реакциях
  // TODO: Подумать о защите id для doubt в url, ведь не очень хорошо, когда виден idшник
  // TODO: Решить как будет выглядить карточка без текста
  // TODO: Всё же добавить вариации "Да и нет", чтобы можно было различать по настроению. Расстаться ли с парнем "нет" будет красным, как будто это не так. "Пожертвовать ли деньги на убийство кого то. Да" - тоже странно что это позитово обозначено
  // TODO: Добавить пагицию на все запросы

  let reactionsForDay: DoubtReaction_M[] = [];
  try {
    const cookieStore = await cookies();
    const rawDoubt = await fetch(
      `${
        process.env.NEXT_PUBLIC_URL_PATH
      }/api/reaction/?doubtId=${doubtId}&time=${new Date(
        Number(time)
      ).getTime()}`,
      {
        method: "GET",
        headers: new Headers({ Cookie: cookieStore.toString() }),
      }
    );
    reactionsForDay = await rawDoubt.json();
  } catch {
    return <div>Не удалось получить данные на день</div>;
  }

  // const [isViewDoubtModal, setViewDoubtModal] = useState(false);
  return (
    <div className="pb-20">
      <div className="mb-8">
        <strong>{new Date(Number(time)).getDate()} числа</strong> на Ваш вопрос
        у Вас были такие реакции
      </div>

      <MasonryGrid columnNumber={2} elements={reactionsForDay} gap={4}>
        {(data) => (
          <CardDoubtReactionBlock
            key={data.id}
            type={data.type}
            date={data.createdAt}
            text={data.emotionText}
          />
        )}
      </MasonryGrid>
      {/* 
      {!isViewDoubtModal && (
        <ButtonBottom onClick={() => setViewDoubtModal(true)}>
          Добавить
        </ButtonBottom>
      )}

      {isViewDoubtModal && (
        <DoubtModal
          doubt={{ id: 2 }}
          isViewModalValue={isViewDoubtModal}
          onCloseModal={() => setViewDoubtModal(false)}
        />
      )} */}
    </div>
  );
};

export default DayPage;
