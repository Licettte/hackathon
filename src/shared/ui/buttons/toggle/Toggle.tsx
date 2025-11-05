import {FC, useState} from "react";
import styles from './Toggle.module.scss'
import {ButtonSize} from "../../../types/types";
import clsx from "clsx";

type ToggleProps = {
    defaultIsToggle?: boolean
    size?: ButtonSize;

}

export const Toggle:FC<ToggleProps> = ({ defaultIsToggle = false, size='md'}) => {
  const [isToggle, setIsToggle] = useState(defaultIsToggle)


  return (

    <label  className={clsx(styles.label, styles[size])}>
      <div className={clsx(styles.background, styles[size])}>
        <div className={styles.toggle}>

          <input className={styles.toggleState}
            type="checkbox"
            checked={isToggle}
            onChange={(e) => setIsToggle(e.target.checked)}/>

          <div className={styles.indicator}></div>
        </div>
      </div>
    </label>
  );
};

