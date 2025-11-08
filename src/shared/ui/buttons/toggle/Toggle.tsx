import { ChangeEventHandler, FC, useState } from 'react';
import clsx from 'clsx';

import { ButtonSize } from 'shared/types/types';

import styles from './Toggle.module.scss';

type ToggleProps = {
    onChange: (isToggle: boolean) => void;
    size?: ButtonSize;
    defaultIsToggle?: boolean;
    className?: string;
};

export const Toggle: FC<ToggleProps> = ({
    onChange,
    defaultIsToggle = false,
    size = 'md',
}) => {
    const [isToggle, setIsToggle] = useState(defaultIsToggle);

    const onLocalChange: ChangeEventHandler<HTMLInputElement> = ({
        currentTarget: { checked },
    }) => {
        setIsToggle(checked);
        onChange(checked);
    };

    return (
        <label className={clsx(styles.label, styles[size])}>
            <div className={clsx(styles.background, styles[size])}>
                <div className={styles.toggle}>
                    <input
                        className={styles.toggleState}
                        type='checkbox'
                        checked={isToggle}
                        onChange={onLocalChange}
                    />
                    <div className={styles.indicator}></div>
                </div>
            </div>
        </label>
    );
};
