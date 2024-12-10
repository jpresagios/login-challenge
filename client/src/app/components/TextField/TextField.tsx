import * as React from "react";
import { twMerge } from "tailwind-merge";

import type { TextFieldSlotProps } from "./types";
import { textInput } from "./styles";

const { slot } = textInput();

export const Slot = ({ className, children, ...props }: TextFieldSlotProps) => (
  <div {...props} className={twMerge(slot(), "z-10", className)}>
    {children}
  </div>
);

Slot.displayName = "TextField.Slot";

export { Root } from "./Root";
export { Input } from "./Input";
