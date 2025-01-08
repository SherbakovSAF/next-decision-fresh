"use client";

import { cn } from "@/lib/utils";
import { createReactionService } from "@/services/reaction.service";
import { Doubt_I } from "@/types/doubt.type";
import { ReactionCreateDTO } from "@/types/reaction.types";
import { Doubt_M, DoubtReaction_E, DoubtReaction_M } from "@prisma/client";
import React, { useCallback, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { useLockBodyScroll } from "react-use";
import ColorCardElement from "../elements/color-card.element";
import { Button } from "../ui/button";
import Icon from "../ui/icon";
import { Textarea } from "../ui/textarea";

let modalControl: {
  open: (doubt: Doubt_I, reactionId?: number | null) => void;
  close: () => void;
};

interface ReactionModalProps {
  onCreateReaction?: (createdData: ReactionCreateDTO) => void;
}

const ReactionModal: React.FC<ReactionModalProps> = ({ onCreateReaction }) => {
  const [isVisible, setVisible] = useState(false);
  const [isLoadingReaction, setLoadingReaction] = useState<boolean>(false);
  const [isLoadingReactionRequest, setLoadingReactionRequest] =
    useState<boolean>(false);

  const [reaction, setReaction] = useState<DoubtReaction_M>({
    id: 0,
    emotionText: "",
    type: DoubtReaction_E.NORMAL,
    userId: 1,
    doubtId: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  useLockBodyScroll(isVisible);
  const [doubt, setDoubt] = useState<Doubt_M | null>(null);

  const handleCloseModal = useCallback(() => {
    setVisible(false);
  }, [setVisible]);
  const callReaction = useCallback(() => {
    try {
      setLoadingReaction(true);
    } catch {
      handleCloseModal();
    } finally {
      setLoadingReaction(false);
    }
  }, [setLoadingReaction, handleCloseModal]);

  const handleOpenModal = useCallback(
    (doubt: Doubt_I, reactionId: number | null = null) => {
      setVisible(true);
      setReaction({ ...reaction, doubtId: doubt.id });
      setDoubt(doubt);
      if (reactionId) callReaction();
    },
    [setVisible, setReaction, setDoubt, callReaction, reaction]
  );

  useEffect(() => {
    modalControl = {
      open: (doubt: Doubt_I, reactionId: number | null = null) =>
        handleOpenModal(doubt, reactionId),
      close: () => handleCloseModal(),
    };
  }, [handleOpenModal, handleCloseModal]);

  if (!isVisible) return null;

  const handleCloseModalOutside = (event: React.MouseEvent) => {
    event.preventDefault();
    if (event.target === event.currentTarget) {
      event.preventDefault();
      handleCloseModal();
    }
  };

  // Если окно невидимо, ничего не рендерим

  // const [isViewModal, setViewModal] = useToggle(isViewModalValue);
  // useLockBodyScroll(isViewModalValue);

  // const callReactionById = useCallback(() => {
  //   try {
  //     setLoadingReaction(true);

  //     if (reaction) setReaction(reaction);
  //   } finally {
  //     setLoadingReaction(false);
  //   }
  // }, [reaction]);

  // useEffect(() => {
  //   if (isViewModal && reactionId) {
  //     callReactionById();
  //   }
  // }, [isViewModal, reactionId, callReactionById]);

  // const handleCloseModal = (event: React.MouseEvent) => {
  //   event.preventDefault();
  //   setViewModal(false);
  //   onCloseModal();
  // };

  const setTypeReaction = (type: DoubtReaction_E) =>
    setReaction({ ...reaction, type });

  const getActiveClassByReactionType = (type: DoubtReaction_E) => {
    return type === reaction.type
      ? "border-2 border-primary drop-shadow-2xl"
      : "";
  };

  const saveReaction = async () => {
    try {
      setLoadingReactionRequest(true);
      if (!!reaction.id) {
        console.log("update");
      } else {
        const result = await createReactionService(reaction);
        if (onCreateReaction) {
          onCreateReaction(result);
        }
      }
    } finally {
      handleCloseModal();
      setLoadingReactionRequest(false);
    }
  };

  // Рендер модального окна в корень DOM
  return ReactDOM.createPortal(
    <div
      className="z-10 fixed bg-[#0000007c] backdrop-blur-sm w-full  h-full top-0 left-0"
      onClick={(event) => handleCloseModalOutside(event)}
    >
      <div className="w-[90%] max-w-[500px] h-fit  md:max-h-[75svh] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary-foreground backdrop-blur-sm  rounded-md p-3">
        <header className="flex justify-center items-center">
          <h3 className="text-xl w-full">{doubt?.title}</h3>
          <Button
            size="icon"
            className="ml-auto"
            onClick={() => handleCloseModal()}
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
              <Button onClick={() => saveReaction()} className="ml-auto">
                {isLoadingReactionRequest ? "Loading" : "Отправить"}
              </Button>
            </footer>
          </>
        )}
      </div>
    </div>,
    // <div
    //   style={{
    //     position: "fixed",
    //     top: 0,
    //     left: 0,
    //     width: "100vw",
    //     height: "100vh",
    //     backgroundColor: "rgba(0, 0, 0, 0.5)",
    //     display: "flex",
    //     justifyContent: "center",
    //     alignItems: "center",
    //     zIndex: 1000,
    //   }}
    //   onClick={() => modalControl.close()} // Закрытие по клику на фон
    // >
    //   <div
    //     style={{
    //       backgroundColor: "#fff",
    //       padding: "20px",
    //       borderRadius: "8px",
    //       boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
    //     }}
    //     onClick={(e) => e.stopPropagation()} // Предотвращаем закрытие при клике внутри
    //   >
    //     <h2>Modal Window</h2>
    //     <p>This is a dynamically created modal window.</p>
    //     <button onClick={() => modalControl.close()}>Close</button>
    //   </div>
    // </div>,
    document.body
  );
};

// Функция для экспорта управления модальным окном

export default ReactionModal;
// export const getModalControl = () => modalControl;
class ReactionModalControlClass {
  public open(doubt: Doubt_I, reactionId?: number | null) {
    modalControl.open(doubt, reactionId);
  }

  public close() {
    modalControl.close();
  }
}

export const ReactionModalControl = new ReactionModalControlClass();
