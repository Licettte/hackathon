import { ButtonHTMLAttributes, FC, MouseEventHandler } from 'react';
import clsx from 'clsx';

import { ButtonSize } from 'shared/types/types';

import styles from './Button.module.scss';

type OwnProps = Partial<{
    size: ButtonSize;
    color: 'green' | 'blue' | 'black';
    label: string;
    onClick: MouseEventHandler<HTMLButtonElement>;
    className: string;
}>;

type NativeProps = Omit<
    ButtonHTMLAttributes<HTMLButtonElement>,
    'size' | 'color'
>;

type ButtonProps = OwnProps & NativeProps;

export const Button: FC<ButtonProps> = ({
    size = 'md',
    color = 'black',
    label,
    onClick,
    className,
    disabled,
    type = 'button',
    ...rest
}) => {
    return (
        <button
            className={clsx(styles.btn, className, styles[size], styles[color])}
            onClick={onClick}
            disabled={disabled}
            aria-label={label}
            type={type}
            {...rest}
        >
            <span className={clsx(styles.btnText, styles[color])}>{label}</span>
        </button>
    );
};
