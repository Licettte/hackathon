import { CSSProperties, FC } from 'react';
import clsx from 'clsx';

import styles from './ImgWrapper.module.scss';

type ImgWrapperProps = {
    /** Путь к PNG (или любому растровому изображению) */
    src: string;
    /** Alt-текст, по умолчанию пустой */
    alt?: string;

    /** Универсальный размер: задаст и width, и height (например, 128 или "200px") */
    size?: number | string;

    /** Либо можно задать отдельно ширину/высоту */
    width?: number | string;
    height?: number | string;

    /** Скругление (по умолчанию 12px) */
    radius?: number | string;

    className?: string;
    style?: CSSProperties;
};

export const ImgWrapper: FC<ImgWrapperProps> = ({
    src,
    alt = '',
    size,
    width,
    height,
    radius = 12,
    className,
    style,
}) => {
    const w = size ?? width;
    const h = size ?? height;

    return (
        <img
            src={src}
            alt={alt}
            loading='lazy'
            className={clsx(styles.img, className)}
            style={{
                width: w,
                height: h,
                borderRadius:
                    typeof radius === 'number' ? `${radius}px` : radius,
                ...style,
            }}
            draggable={false}
        />
    );
};
