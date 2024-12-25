"use client";
import { icons } from "lucide-react";
import { MouseEventHandler } from "react";

interface Props {
  name: keyof typeof icons; // Ensure name is a key of icons
  color?: string;
  size?: number;
  className?: string;
  onClick?: MouseEventHandler<SVGSVGElement>; // Change to SVGSVGElement
}

const Icon = ({ name, color, size, className, onClick, ...props }: Props) => {
  const LucideIcon = icons[name];

  return (
    <LucideIcon
      className={className}
      color={color}
      size={size}
      onClick={onClick} // Now this is compatible
      {...props}
    />
  );
};

export default Icon;