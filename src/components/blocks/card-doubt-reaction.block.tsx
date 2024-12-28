import ColorCardElement from "../elements/color-card.element";
import { DoubtReaction_E } from "@prisma/client";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
interface CardDoubtReactionProps {
  type: DoubtReaction_E;
  text: string;
  date: Date;
  className?: string;
}
const CardDoubtReaction: React.FC<CardDoubtReactionProps> = ({
  type,
  text,
  date,
  className,
}) => {
  return (
    <div
      className={cn(
        className,
        "flex w-full bg-primary-foreground p-3 py-4 rounded-lg gap-3"
      )}
    >
      <p className="w-full text-sm text-secondary break-all">{text}</p>
      <div className="flex flex-col gap-1 items-center">
        <p className="text-[0.6rem] font-normal">{format(date, "HH:mm")}</p>
        <ColorCardElement type={type} className="p-[0.25rem] rounded-lg" />
      </div>
    </div>
  );
};

export default CardDoubtReaction;
