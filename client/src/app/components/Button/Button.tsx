import * as React from "react";
import { ButtonProps } from "./types";
import { twMerge } from "tailwind-merge";

export const Button = ({
  type = "button",
  children,
  disabled,
  onClick,
  ...props
}: ButtonProps) => {
  const onButtonClick = React.useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      if (disabled) {
        e.preventDefault();
        e.stopPropagation();
        return;
      }
      onClick?.(e);
    },
    [disabled, onClick]
  );

  return (
    <button
      {...props}
      type={type}
      className={twMerge(
        "text-white py-[18px] rounded-2xl w-[124px] bg-purple-gradient shadow-button hover:bg-blue-800 font-bold focus:ring-4 focus:ring-blue-300 font-medium text-sm px-6",
        props.className
      )}
      disabled={disabled ? true : false}
      aria-disabled={disabled ? true : false}
      onClick={onButtonClick}
    >
      {children}
    </button>
  );
};
Button.displayName = "Button";
