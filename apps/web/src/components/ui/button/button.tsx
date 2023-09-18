import React, { type ButtonHTMLAttributes, memo, type ReactNode } from 'react';
import clsx from 'clsx';

import cls from './button.module.scss';

export enum ButtonSize {
  M = 'size-m',
  L = 'size-l',
  XL = 'size-xl',
}

export enum ButtonTheme {
  CLEAR = 'clear',
  OUTLINE = 'outline',
  OUTLINE_RED = 'outline-red',
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  theme?: ButtonTheme;
  square?: boolean;
  size?: ButtonSize;
  disabled?: boolean;
  children?: ReactNode;
}

export const Button = memo((props: ButtonProps) => {
  const {
    className,
    children,
    theme = ButtonTheme.OUTLINE,
    square,
    disabled,
    size = ButtonSize.M,
    ...otherProps
  } = props;

  const classes = clsx(cls.button, cls[theme], className, {
    [cls.square]: square,
    [cls[size]]: true,
    [cls.disabled]: disabled,
  });

  return (
    <button
      type="button"
      className={classes}
      disabled={disabled}
      {...otherProps}
    >
      {children}
    </button>
  );
});
