"use client";
import CalendarBoard from "@/components/elements/calendar-board.element";
import { Doubt_I } from "@/types/doubt.type";
import { useRouter } from "next/navigation";
import { RoutePath_E } from "@/types/route-path.type";
import { JSX } from "react";

interface DoubtCalendarClientProps {
  doubt: Doubt_I;
  // TODO: RenderCell пока что не проработан
  renderCell?: (day: Date, events: Event[]) => JSX.Element;
}
const DoubtCalendarClient: React.FC<DoubtCalendarClientProps> = ({ doubt }) => {
  const router = useRouter();

  const handleSelectDate = (selectedDate: Date) => {
    const finedReaction = doubt.doubtReactions?.find(
      (event) =>
        new Date(event.createdAt).toDateString() === selectedDate.toDateString()
    );

    if (finedReaction) {
      router.push(
        `${RoutePath_E.DAY}/${finedReaction.doubtId}/${new Date(
          finedReaction.createdAt
        ).getTime()}`
      );
    } else {
      console.log("Нет события на этот день");
    }
  };

  return (
    <CalendarBoard
      reactions={doubt.doubtReactions ?? []}
      selectDayEvent={(selectedDate) => handleSelectDate(selectedDate)}
      min={doubt.createdAt}
    ></CalendarBoard>
  );
};

export default DoubtCalendarClient;
