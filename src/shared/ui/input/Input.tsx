import { FC } from 'react';
import clsx from 'clsx';

import { ButtonSize } from '../../types/types';

import styles from './Input.module.scss';

type InputProps = Partial<{
    value: string;
    onChange: (value: string) => void;
    size: ButtonSize;
    placeholder: string;
    type: string;
    isError: boolean;
}>;

export const Input: FC<InputProps> = ({
    size = 'md',
    placeholder = 'Введите ваше имя',
    type,
    value,
    onChange,
    isError,
}) => {
    return (
        <label className={clsx(styles.field, styles[size])}>
            <input
                className={clsx(styles.input, { [styles.error]: isError })}
                placeholder={placeholder}
                type={type}
                value={value}
                onChange={(e) => onChange?.(e.target.value)}
            />
        </label>
    );
};
