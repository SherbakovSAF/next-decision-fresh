import CardDoubtReactionBlock from "@/components/blocks/card-doubt-reaction.block";
import MasonryGrid from "@/components/blocks/masonry-grid.block";
import { getReactionsByDoubtIdAndDateService } from "@/services/reaction.service";

import { RoutePath_E } from "@/types/route-path.type";
import { DoubtReaction_M } from "@prisma/client";
import { redirect } from "next/navigation";

interface DayPageProps {
  params: Promise<{
    slug: string[];
  }>;
}

const DayPage: React.FC<DayPageProps> = async ({ params }) => {
  const slug = (await params).slug;
  const doubtId = slug[0];

  const time = slug[1];

  if (!doubtId || !time || !Number(doubtId) || !Number(time))
    redirect(RoutePath_E.HOME);
  // TODO: Очень странно достаются параметры, может найти другой способ
  // TODO: Блокировать завтрашние дни в календаре, но при этом оставлять те, которые были выбраны ранее
  // TODO: К всем этим параметрам и прочему добавить нормальную логику, чтобы человек понимал что и почему передаётся
  // TODO: Продумать получение doubt, но не во всех реакциях
  // TODO: Подумать о защите id для doubt в url, ведь не очень хорошо, когда виден idшник
  // TODO: Решить как будет выглядить карточка без текста
  // TODO: Всё же добавить вариации "Да и нет", чтобы можно было различать по настроению. Расстаться ли с парнем "нет" будет красным, как будто это не так. "Пожертвовать ли деньги на убийство кого то. Да" - тоже странно что это позитово обозначено
  // TODO: Добавить пагицию на все запросы

  let reactionsForDay: DoubtReaction_M[] = [];

  try {
    reactionsForDay = await getReactionsByDoubtIdAndDateService(
      Number(doubtId),
      new Date(Number(time)).getTime()
    );
  } catch {
    return <div>Не удалось получить данные на день</div>;
  }

  if (!reactionsForDay.length)
    return <div>Вы не оставляли реакции на день</div>;

  return (
    <div className="pb-20">
      <div className="mb-8">
        <strong>
          {new Date(reactionsForDay[0].createdAt).getDate()} числа
        </strong>{" "}
        на Ваш вопрос у Вас были такие реакции
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
