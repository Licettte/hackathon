import { FC } from 'react';
import clsx from 'clsx';

import { SLIDE_STATUS } from 'widgets/onboarding/model/constants';

import styles from './ProgressBar.module.scss';

interface ItemProgressBarProps {
    current: number;
    index: number;
}

export const ItemProgressBar: FC<ItemProgressBarProps> = ({
    current,
    index,
}) => {
    const status = index <= current ? SLIDE_STATUS.PASSED : SLIDE_STATUS.REST;

    return (
        <div
            className={clsx(
                styles.item,
                status === SLIDE_STATUS.PASSED ? styles.passed : styles.rest
            )}
        />
    );
};
