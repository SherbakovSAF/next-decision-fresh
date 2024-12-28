"use client";
import React, { JSX, useState } from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { DoubtReaction_E, DoubtReaction_M } from "@prisma/client";
import {
  getDoubtBgColor,
  getDoubtTextColor,
} from "@/consts/doubt-colors.const";
import { isToday } from "date-fns";

interface CalendarProps {
  reactions: DoubtReaction_M[];
  selectDayEvent: (date: Date) => void;
  // TODO: RenderCell пока что не проработан
  renderCell?: (day: Date, events: Event[]) => JSX.Element;
  min?: Date;
}

const CalendarBoardElement: React.FC<CalendarProps> = ({
  reactions,
  selectDayEvent,
  min,
}) => {
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());

  const handleDayClick = (day: Date) => {
    if (
      day.getMonth() !== currentMonth.getMonth() ||
      day.getFullYear() !== currentMonth.getFullYear()
    ) {
      setCurrentMonth(day);
    } else {
      selectDayEvent(day);
    }
  };

  const generateDays = () => {
    const startOfMonth = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      1
    );
    const endOfMonth = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth() + 1,
      0
    );
    const startDay = new Date(startOfMonth);
    startDay.setDate(startDay.getDate() - startDay.getDay() + 1); // Начинаем с начала недели
    const endDay = new Date(endOfMonth);
    endDay.setDate(endDay.getDate() + (6 - endDay.getDay()) + 1); // Конец недели

    const days: Date[] = [];
    let day = startDay;

    while (day <= endDay) {
      days.push(day);

      day = new Date(day);
      day.setDate(day.getDate() + 1);
    }

    return days;
  };

  const getReactionByDay = (day: Date) => {
    return (
      reactions.find(
        (event) =>
          new Date(event.createdAt).toDateString() === day.toDateString()
      ) ?? null
    );
  };

  const isFutureMonthByDay = (day: Date) => {
    return day.getMonth() !== currentMonth.getMonth();
  };

  const handlePrevMonth = () => {
    setCurrentMonth(
      (prev) => new Date(prev.getFullYear(), prev.getMonth() - 1)
    );
  };

  const handleNextMonth = () => {
    setCurrentMonth(
      (prev) => new Date(prev.getFullYear(), prev.getMonth() + 1)
    );
  };

  return (
    <div className="py-8">
      <div className="flex gap-4 justify-between items-center mb-4">
        <Button onClick={handlePrevMonth}>Назад</Button>
        <h2 className="text-md text-center uppercase">
          {currentMonth.toLocaleString("default", { month: "long" })}{" "}
          {currentMonth.getFullYear()}
        </h2>
        <Button onClick={handleNextMonth}>Вперед</Button>
      </div>
      <div className="grid grid-cols-7 gap-2">
        {generateDays().map((day) => (
          <CalendarCell
            day={day}
            key={day.getTime()}
            reactionDoubt={getReactionByDay(day) ?? null}
            isFutureMonth={isFutureMonthByDay(day)}
            onClickDay={() => handleDayClick(day)}
            min={min}
          />
        ))}
      </div>
    </div>
  );
};

const CalendarCell: React.FC<{
  day: Date;
  reactionDoubt: DoubtReaction_M | null;
  isFutureMonth: boolean;
  onClickDay?: (day: Date) => void;
  customCell?: React.ReactNode;
  min?: Date;
}> = ({ day, reactionDoubt, isFutureMonth, onClickDay, customCell, min }) => {
  const isValidDay = min
    ? new Date(day.setHours(0, 0, 0, 0)).getTime() <
      new Date(new Date(min).setHours(0, 0, 0, 0)).getTime()
    : true;

  const isFuture = reactionDoubt
    ? new Date(reactionDoubt.createdAt).getTime() > Date.now()
    : false;

  const getClassesForDay = () => {
    if (isFuture || isFutureMonth || isValidDay) {
      return "opacity-40";
    }

    if (reactionDoubt) {
      return reactionDoubt.type === DoubtReaction_E.GOOD
        ? `${getDoubtBgColor(DoubtReaction_E.GOOD).primary} ${
            getDoubtTextColor(DoubtReaction_E.GOOD).secondary
          }`
        : `${getDoubtBgColor(DoubtReaction_E.BAD).primary} ${
            getDoubtTextColor(DoubtReaction_E.BAD).secondary
          }`;
    }
    return "bg-primary-foreground";
  };

  const isNextDay =
    new Date(day.setHours(0, 0, 0, 0)).getTime() >
    new Date(new Date().setHours(0, 0, 0, 0)).getTime();

  const getClassesForToday = () => {
    return isToday(day)
      ? "border-gray-500 border-opacity-25 border-[1px] bg-primary text-primary-foreground"
      : "";
  };
  return (
    <div
      onClick={() => onClickDay && !isValidDay && !isNextDay && onClickDay(day)}
      className={cn(
        "flex  justify-center items-center w-full cursor-pointer rounded-md py-3 ",
        getClassesForDay(),
        getClassesForToday()
      )}
    >
      {customCell ?? <div>{day.getDate()}</div>}
    </div>
  );
};

export default CalendarBoardElement;
