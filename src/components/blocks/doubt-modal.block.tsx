"use client";
// import { createReactionService } from "@/services/reaction.service";
import { Doubt_I } from "@/types/doubt.type";
import { cn } from "@/lib/utils";
import { DoubtReaction_E, DoubtReaction_M } from "@prisma/client";
import { useCallback, useEffect, useState } from "react";
import { useLockBodyScroll, useToggle } from "react-use";
import ColorCardElement from "@/components/elements/color-card.element";
import { Button } from "../ui/button";
import Icon from "../ui/icon";
import { Textarea } from "../ui/textarea";
import { createReactionService } from "@/services/reaction.service";

interface Props {
  isViewModalValue: true;
  onCloseModal: () => void;
  doubt: Doubt_I;
  reactionId?: number | null;
}

const DoubtModal: React.FC<Props> = ({
  onCloseModal,
  isViewModalValue,
  reactionId = null,
  doubt,
}) => {
  const [isLoadingReaction, setLoadingReaction] = useState<boolean>(false);
  const [isLoadingReactionRequest, setLoadingReactionRequest] =
    useState<boolean>(false);
  const [reaction, setReaction] = useState<DoubtReaction_M>({
    id: 0,
    emotionText: "",
    type: DoubtReaction_E.NORMAL,
    userId: 1,
    doubtId: doubt.id,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  const [isViewModal, setViewModal] = useToggle(isViewModalValue);
  useLockBodyScroll(isViewModalValue);

  const callReactionById = useCallback(() => {
    try {
      setLoadingReaction(true);

      if (reaction) setReaction(reaction);
    } finally {
      setLoadingReaction(false);
    }
  }, [reaction]);

  useEffect(() => {
    if (isViewModal && reactionId) {
      callReactionById();
    }
  }, [isViewModal, reactionId, callReactionById]);

  const handleCloseModalOutside = (event: React.MouseEvent) => {
    event.preventDefault();
    if (event.target === event.currentTarget) {
      event.preventDefault();
      handleCloseModal(event);
    }
  };

  const handleCloseModal = (event: React.MouseEvent) => {
    event.preventDefault();
    setViewModal(false);
    onCloseModal();
  };

  // TODO: Переделать с текстового варианта на прямой из енама
  const setTypeReaction = (type: DoubtReaction_E) => {
    setReaction({ ...reaction, type });
  };

  const getActiveClassByReactionType = (type: DoubtReaction_E) => {
    return type === reaction.type
      ? "border-2 border-primary drop-shadow-2xl"
      : "";
  };

  const saveReaction = async (event: React.MouseEvent) => {
    try {
      setLoadingReactionRequest(true);
      if (!!reaction.id) {
        console.log("update");
      } else {
        const a = await createReactionService(reaction);
        console.log(a);
        // TODO: При преносе в жустан сделать обновление реакции
      }
    } finally {
      handleCloseModal(event);
      setLoadingReactionRequest(false);
    }
  };

  return (
    <div
      className="z-10 fixed bg-[#0000007c] backdrop-blur-sm w-full  h-full top-0 left-0"
      onClick={(event) => handleCloseModalOutside(event)}
    >
      <div className="w-[90%] max-w-[500px] h-fit  md:max-h-[75svh] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary-foreground backdrop-blur-sm  rounded-md p-3">
        <header className="flex justify-center items-center">
          <h3 className="text-xl w-full">{doubt.title}</h3>
          <Button
            size="icon"
            className="ml-auto"
            onClick={(event) => handleCloseModal(event)}
          >
            <Icon name="X" />
          </Button>
        </header>

        {isLoadingReaction ? (
          <>Loading....</>
        ) : (
          <>
            <main className="mt-auto">
              <div className="flex justify-center gap-6 my-8">
                <ColorCardElement
                  type={DoubtReaction_E.BAD}
                  className={cn(
                    "w-28 p-2 aspect-square rounded-xl ",
                    getActiveClassByReactionType(DoubtReaction_E.BAD)
                  )}
                  onClick={() => setTypeReaction(DoubtReaction_E.BAD)}
                />
                <ColorCardElement
                  type={DoubtReaction_E.GOOD}
                  className={cn(
                    "w-28 aspect-square p-2 rounded-xl",
                    getActiveClassByReactionType(DoubtReaction_E.GOOD)
                  )}
                  onClick={() => setTypeReaction(DoubtReaction_E.GOOD)}
                />
              </div>
              <Textarea
                className="resize-none min-h-24"
                autoFocus
                spellCheck
                placeholder="Поделитель эмоциями (необязательно)"
                value={reaction.emotionText}
                onChange={(event) =>
                  setReaction({ ...reaction, emotionText: event.target.value })
                }
              />
            </main>

            <footer className="mx-auto mt-4 flex">
              <Button
                onClick={(event) => saveReaction(event)}
                className="ml-auto"
              >
                {isLoadingReactionRequest ? "Loading" : "Отправить"}
              </Button>
            </footer>
          </>
        )}
      </div>
    </div>
  );
};

export default DoubtModal;
