"use client";

import { Button } from "@/components/ui/button";

interface ButtonBottomProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  onClick?: (event: React.MouseEvent<Element, MouseEvent>) => void;
}
const ButtonBottom: React.FC<ButtonBottomProps> = ({
  onClick,
  children,
  ...props
}) => {
  return (
    <Button
      className="fixed text-base bottom-6 left-1/2 -translate-x-1/2"
      onClick={(event) => onClick && onClick(event)}
      {...props}
    >
      {children}
    </Button>
  );
};

export default ButtonBottom;
