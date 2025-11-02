import {FC} from "react";
import styles from './GosButton.module.scss'
import clsx from "clsx";

type GosButtonProps = {}

export const GosButton: FC<GosButtonProps> = () => {
  return (
    <button
      className={styles.btn}

    >
      <span className={styles.btnText}>Войти через Госулуги</span>
    </button>
  );
};

