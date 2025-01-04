"use client";

import LabelBlock from "@/components/blocks/label.block";
import ButtonBottom from "@/components/elements/button-bottom.element";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import Icon from "@/components/ui/icon";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  createDoubtService,
  updateDoubtService,
} from "@/services/doubt.service";
// import {
//   createDoubtService,
//   updateDoubtService,
// } from "@/services/doubt.service";
import { RoutePath_E } from "@/types/route-path.type";
import { yupResolver } from "@hookform/resolvers/yup";
import { Doubt_M } from "@prisma/client";
import { useRouter } from "next/navigation";
import React, { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schema = yup
  .object({
    title: yup
      .string()
      .required("Поле обязательное")
      .min(3, "Минимум 3 символа"),
    dayNumber: yup.number().positive().integer().required().min(1),
  })
  .required();
const SetupPageContent: React.FC<{ initialDoubt: Doubt_M }> = ({
  initialDoubt,
}) => {
  type FormData = yup.InferType<typeof schema>;
  const router = useRouter();

  const [doubt, setDoubt] = useState<Doubt_M>(initialDoubt);

  const daysVariantList = useMemo(() => [7, 14, 21, 30], []);

  const getDiffDaysFromToday = useMemo(
    () =>
      Math.ceil(
        Math.abs((Date.now() - new Date(doubt.dateFinish).getTime()) / 86400000)
      ),
    [doubt.dateFinish]
  );

  const getDateByDayNumber = (numberDays: number) => {
    if (numberDays <= 0) Date.now();
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    now.setDate(now.getDate() + numberDays);
    return now.getTime();
  };

  const isSelectedDate = (days: number) => {
    return (
      new Date(doubt.dateFinish).getTime() ===
      new Date().setHours(0, 0, 0, 0) + days * 24 * 60 * 60 * 1000
    );
  };

  const updateDoubt = (
    key: keyof Doubt_M,
    value: Doubt_M[keyof Doubt_M]
  ): void => {
    if (key === "dateFinish") {
      setDoubt({ ...doubt, dateFinish: new Date(value) });
    } else {
      setDoubt({ ...doubt, [key]: value });
    }

    if (key === "title") setValue("title", value.toString());
    if (key === "dateFinish") setValue("dayNumber", getDiffDaysFromToday);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
    setValue,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      title: doubt.title,
      dayNumber: getDiffDaysFromToday,
    },
  });

  const handleSave = async () => {
    const newDoubt =
      doubt.id > 0
        ? await updateDoubtService(doubt)
        : await createDoubtService(doubt);

    if (newDoubt) setDoubt(newDoubt);
    router.push(RoutePath_E.HOME);
  };

  return (
    <>
      <LabelBlock htmlFor="doubtTitle" value="В чём твоё сомнение">
        <Input
          {...register("title")}
          className={errors.title && "border-2 border-error"}
          type="text"
          id="doubt"
          onBlur={() => clearErrors("title")}
          placeholder="Купить ли мне гитару?"
          value={doubt.title}
          onChange={(value) => updateDoubt("title", value.target.value)}
        />
        {errors.title && (
          <small className="text-error">{errors.title.message}</small>
        )}
      </LabelBlock>

      <LabelBlock htmlFor="doubtTime" value="Сколько дней на решение?">
        <div className="flex flex-col md:flex-row gap-4 justify-between">
          <div className="flex gap-2">
            <Button
              className="px-2"
              onClick={() =>
                updateDoubt(
                  "dateFinish",
                  getDateByDayNumber(getDiffDaysFromToday - 1)
                )
              }
            >
              <Icon name="Minus" />
            </Button>
            <Input
              type="number"
              placeholder="Кол-во дней"
              {...register("dayNumber", { required: true, min: 1 })}
              min={0}
              value={getDiffDaysFromToday}
              onBlur={() => clearErrors("dayNumber")}
              onChange={(event) =>
                updateDoubt(
                  "dateFinish",
                  getDateByDayNumber(Number(event.target.value))
                )
              }
            />

            <Button
              className="px-2"
              onClick={() => {
                updateDoubt(
                  "dateFinish",
                  getDateByDayNumber(getDiffDaysFromToday + 1)
                );
                clearErrors("dayNumber");
              }}
            >
              <Icon name="Plus" />
            </Button>
          </div>
          <div className="flex justify-between md:justify-start items-center gap-2">
            {daysVariantList.map((day) => (
              <Button
                key={day}
                onClick={() =>
                  updateDoubt("dateFinish", getDateByDayNumber(day))
                }
                variant={isSelectedDate(day) ? "default" : "outline"}
              >
                {day}
              </Button>
            ))}

            <Popover>
              <PopoverTrigger asChild>
                <Button>
                  <Icon name="Calendar" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  defaultMonth={new Date(doubt.dateFinish)}
                  fromDate={new Date()}
                  mode="single"
                  selected={new Date(doubt.dateFinish)}
                  weekStartsOn={1}
                  onSelect={(event) =>
                    updateDoubt("dateFinish", event ?? new Date())
                  }
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </LabelBlock>
      {errors.dayNumber && (
        <small className="text-error">{errors.dayNumber.message}</small>
      )}

      <ButtonBottom onClick={handleSubmit(handleSave)}>
        Создать/Обновить
      </ButtonBottom>
    </>
  );
};

export default SetupPageContent;
