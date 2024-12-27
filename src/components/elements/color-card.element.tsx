import { cn } from "@/lib/utils";
import { DoubtReaction_E } from "@prisma/client";
import { useMemo } from "react";
import Icon from "../ui/icon";
import { getDoubtBgColor } from "@/consts/doubt-colors.const";

interface ColorCardElementProps {
  type?: DoubtReaction_E;
  children?: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const ColorCardElement: React.FC<ColorCardElementProps> = ({
  type = DoubtReaction_E.NORMAL,
  className,
  children,
  onClick,
}) => {
  const getIconByType = useMemo(() => {
    switch (type) {
      case DoubtReaction_E.GOOD:
        return "Smile";
      case DoubtReaction_E.BAD:
        return "Frown";
      default:
        return "Meh";
    }
  }, [type]);

  return (
    <div
      className={cn(
        getDoubtBgColor(type).primary,
        className,
        "flex justify-center items-center h-fit relative rounded-sm"
      )}
      onClick={onClick}
    >
      {children ?? <Icon name={getIconByType} />}
    </div>
  );
};

export default ColorCardElement;
