import { Doubt_I } from "@/types/doubt.type";
import SetupPageContent from "./(components)/setup-page-content";
import { getOneDoubtService } from "@/services/doubt.service";
import { DoubtReaction_E } from "@prisma/client";

// TODO: Подумать на params. Какая то странная история
interface SetupPageProps {
  params: Promise<{ id: string[] }>;
}

const SetupPage: React.FC<SetupPageProps> = async ({ params }) => {
  // TODO: Что то мне не нравиться хранение тут default
  let initialDoubt: Doubt_I = {
    id: 0,
    title: "",
    dateFinish: new Date(),
    userId: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
    averageReaction: DoubtReaction_E.NORMAL,
  };
  const id: string[] | null = (await params).id ?? null;

  if (id) {
    try {
      initialDoubt = await getOneDoubtService(Number(id));
    } catch {
      return <div>Не удалось получить данные на день</div>;
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <SetupPageContent initialDoubt={initialDoubt} />
    </div>
  );
};

export default SetupPage;
