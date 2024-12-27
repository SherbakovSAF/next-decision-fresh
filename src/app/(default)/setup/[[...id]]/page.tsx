import { Doubt_I } from "@/types/doubt.type";
import SetupPageContent from "./(components)/setup-page-content";
// import { getDoubtService } from "@/services/doubt.service";
import { DoubtReaction_E } from "@prisma/client";

// TODO: Подумать на params. Какая то странная история
interface SetupPageProps {
  params: Promise<{ id: string[] }>;
}

const SetupPage: React.FC<SetupPageProps> = async ({ params }) => {
  const defaultDoubt: Doubt_I = {
    id: 0,
    title: "",
    dateFinish: new Date(),
    userId: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
    averageReaction: DoubtReaction_E.NORMAL,
  };
  const getDoubtService = async (id: number) => {
    const rawDoubt = await fetch(
      `${process.env.NEXT_PUBLIC_URL_PATH}/api/doubt?id=${id}`
    );

    return rawDoubt.json();
  };

  const id: string[] | null = (await params).id ?? null;
  const initialDoubt = id ? await getDoubtService(Number(id[0])) : defaultDoubt;

  return (
    <div className="flex flex-col gap-4">
      <SetupPageContent initialDoubt={initialDoubt ?? defaultDoubt} />
    </div>
  );
};

export default SetupPage;
