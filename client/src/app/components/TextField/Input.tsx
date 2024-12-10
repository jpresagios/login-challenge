import * as React from "react";
import { twMerge } from "tailwind-merge";

import { RootContext } from "./Root";
import type { TextFieldInputProps } from "./types";
import { textInput } from "./styles";

const { input } = textInput();

/**
 * Based on the `input` element. Must be wrapped with `TextField.Root` to work properly.
 */
export const Input = ({ className, ...props }: TextFieldInputProps) => {
  const context = React.useContext(RootContext);

  if (!context) {
    throw new Error("`TextField.Input` must be used within `TextField.Root`");
  }

  return (
    <input
      {...props}
      className={twMerge(input({ size: context.size }), className)}
    />
  );
};
Input.displayName = "TextField.Input";
