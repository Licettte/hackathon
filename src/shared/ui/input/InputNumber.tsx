import { FC, InputHTMLAttributes } from 'react';
import clsx from 'clsx';

import { ButtonSize } from '../../types/types';

import styles from './Input.module.scss';

type BaseProps = {
    size?: ButtonSize;
    isError?: boolean;
    onChangeValue?: (value: string) => void;
};

type InputProps = BaseProps & InputHTMLAttributes<HTMLInputElement>;

export const InputNumber: FC<InputProps> = (props) => {
    const {
        size = 'md',
        placeholder,
        type = 'text',
        isError,
        onChangeValue,
        className,
        ...rest
    } = props;

    const inputProps: InputHTMLAttributes<HTMLInputElement> = {
        ...rest,
        placeholder,
        type,
        className: clsx(styles.input, className, {
            [styles.error]: isError,
        }),
        onChange: (e) => {
            rest.onChange?.(e);
            onChangeValue?.(e.target.value);
        },
    };

    if (rest.value !== undefined) {
        inputProps.value = rest.value;
    }

    return (
        <label className={clsx(styles.field, styles[size])}>
            <input {...inputProps} />
        </label>
    );
};
