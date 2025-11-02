import {FC} from "react";
import styles from './Input.module.scss'
import clsx from "clsx";
import {ButtonSize} from "../../types/types";

type InputProps = {
 size?: ButtonSize;
 placeholder?: string
 type?: string
}

export const Input: FC<InputProps> = ({size='md', placeholder='Введите ваше имя', type}) => {
  return (
    <label className={clsx(styles.field, styles[size])}>
      <input className={styles.input} placeholder={placeholder} type={type} />
    </label>
  );
};
