"use client";

import { ChevronsRight } from "lucide-react";
import ColorCardElement from "@/components/elements/color-card.element";
import { differenceInDays } from "date-fns";
import { useMemo, useState } from "react";
import { Doubt_I } from "@/types/doubt.type";
import DoubtModal from "@/components/blocks/doubt-modal.block";
import { Button } from "../ui/button";

interface CardDoubtBlockProps {
  doubt: Doubt_I;
}

const CardDoubtBlock: React.FC<CardDoubtBlockProps> = ({ doubt }) => {
  const differenceDayDoubt = useMemo(
    () => Math.abs(differenceInDays(new Date(), doubt.dateFinish)),
    [doubt.dateFinish]
  );
  const [isViewDoubtModal, setViewDoubtModal] = useState(false);

  const handleOpenModal = (event: React.MouseEvent) => {
    event.preventDefault();

    setViewDoubtModal(true);
  };
  return (
    <div className="bg-primary-foreground py-3 px-2  rounded-lg flex flex-col gap-3">
      <div className="flex justify-between items-center  ">
        <div className="flex flex-col gap-2 w-full">
          <div className="flex flex- gap-3 items-center">
            <ColorCardElement
              type={doubt.averageReaction}
              className="p-2 rounded-sm md:p-3"
            />
            <div>
              <h3 className="md:text-base">{doubt.title}</h3>
              <p className="text-sm text-secondary">
                Осталось {differenceDayDoubt} дней
              </p>
            </div>
          </div>
        </div>
        <ChevronsRight />
        {/* TODO: Переделать логику модалки на встаивание с помощью create и тем более не в  комопонент карточки */}
      </div>
      <Button
        className="px-4 py-[0.1rem] rounded-lg w-fit h-fit"
        size="sm"
        onClick={(event) => handleOpenModal(event)}
      >
        Реакция
      </Button>
      {isViewDoubtModal && (
        <DoubtModal
          doubt={doubt}
          isViewModalValue={isViewDoubtModal}
          onCloseModal={() => setViewDoubtModal(false)}
        />
      )}
    </div>
  );
};

export default CardDoubtBlock;
