import { tv } from 'tailwind-variants';

export const textInput = tv({
  slots: {
    root: [
      'bg-purple',
      'isolate font-normal flex cursor-text items-center gap-2 px-3',
      'border-none rounded-2xl',
      '[&:has(input:focus)]:ring-1 [&:has(input:focus)]:border-blue-500 [&:has(input:focus)]:ring-blue-500'
    ],
    input: [
      'h-[52px]',
      'self-center',
      'grow',
      'z-10',
      'bg-transparent',
      'outline-none',
      'disabled:cursor-[inherit]',
      'w-full'
    ],
    slot: ['flex', 'items-center', 'gap-2'],
  },
  variants: {
    size: {
      medium: {
        root: ['text-xs', 'min-h-[52px]'],
        input: ['min-h-[52px]'],
        slot: ['-my-1.5'],
      },
      large: {
        root: ['text-base', 'min-h-16'],
        input: ['min-h-16'],
        slot: ['-my-2'],
      },
    },
  },
});
