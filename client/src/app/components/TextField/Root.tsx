'use client'

import * as React from "react";
import { twMerge } from "tailwind-merge";
import { textInput } from "./styles";
import type { TextFieldProps } from "./types";

export const RootContext = React.createContext<
  | {
      size: TextFieldProps["size"];
    }
  | undefined
>(undefined);

const { root } = textInput();

/**
 * `Root`  groups `Slot` and `Input` sub-components.
 */
export const Root = ({
  size = "medium",
  className,
  children,
  ...props
}: TextFieldProps) => {
  return (
    <RootContext.Provider value={{ size }}>
      <div {...props} className={twMerge(root({ size }), className)}>
        {children}
      </div>
    </RootContext.Provider>
  );
};

Root.displayName = "TextField.Root";
