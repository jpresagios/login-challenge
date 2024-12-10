import type { VariantProps } from "tailwind-variants";
import { textInput } from "./styles";
import { JSX } from "react";

export type TextFieldProps = {
  children: React.ReactNode;
} & JSX.IntrinsicElements["div"] &
  Pick<VariantProps<typeof textInput>, "size">;

export type TextFieldInputProps = React.InputHTMLAttributes<HTMLInputElement>;

export type TextFieldSlotProps = {
  children: React.ReactNode;
} & JSX.IntrinsicElements["div"];
