import { JSX } from 'react';

export type ButtonElementProps = JSX.IntrinsicElements['button'];
export type ButtonProps = {
  onClick?: ButtonElementProps['onClick'];
  disabled?: ButtonElementProps['disabled'];
  'aria-label'?: ButtonElementProps['aria-label'];
  'aria-labeledby'?: ButtonElementProps['aria-labelledby'];
} & ButtonElementProps