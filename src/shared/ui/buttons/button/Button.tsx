import {FC} from "react";
import clsx from "clsx";
import styles from './Button.module.scss'
import s from "../../../../pages/loginCard/LoginCard.module.scss";
import {ButtonSize} from "../../../types/types";

type ButtonProps = {
  variant?: 'primary' | 'text' | 'ghostWhite'
  size?: ButtonSize;
  color?:'green'| 'blue' | 'black';
  label?: string;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>

export const Button: FC<ButtonProps> = ({
  color = 'black',
  size = 'md',
  label ,
  onClick,
  disabled,
  className,
}) => {
  return      <button
    className={clsx(styles.btn, className, styles[size],styles[color] )}
    onClick={onClick}
    disabled={disabled}
    aria-label={label}
  >
    <span className={clsx(styles.btnText, styles[color])}>{label}</span>
  </button>
}

