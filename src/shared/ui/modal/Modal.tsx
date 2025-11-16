import { FC, ReactNode, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';

import { Flex } from 'shared/ui/flex/Flex';

import styles from './Modal.module.scss';

type ModalProps = {
    isOpenModal: boolean;
    onClose: () => void;
    title?: ReactNode;
    children?: ReactNode;
    footer?: ReactNode;
    closeOnEsc?: boolean;
    closeOnBackdrop?: boolean;
    ariaLabel?: string;
};

export const Modal: FC<ModalProps> = ({
    isOpenModal,
    onClose,
    title,
    children,
    footer,
    closeOnEsc = true,
    closeOnBackdrop = true,
    ariaLabel,
}) => {
    const overlayRef = useRef<HTMLDivElement>(null);
    const cardRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!isOpenModal) return;
        (cardRef.current ?? overlayRef.current)?.focus();
    }, [isOpenModal]);

    if (!isOpenModal) return null;

    const handleKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
        if (!closeOnEsc) return;
        if (e.key === 'Escape') {
            e.stopPropagation();
            onClose();
        }
    };

    const handleBackdropMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!closeOnBackdrop) return;
        if (e.target === e.currentTarget) onClose();
    };

    const content = (
        <div
            ref={overlayRef}
            className={styles.overlay}
            onMouseDown={handleBackdropMouseDown}
            onKeyDown={handleKeyDown}
            tabIndex={-1}
        >
            <div
                ref={cardRef}
                role='dialog'
                aria-modal='true'
                aria-label={ariaLabel}
                className={styles.card}
                onKeyDown={handleKeyDown}
                tabIndex={-1}
            >
                {title && (
                    <div className={styles.header}>
                        <div className={styles.title}>{title}</div>
                        <button
                            className={styles.close}
                            aria-label='Закрыть'
                            onClick={onClose}
                        >
                            ×
                        </button>
                    </div>
                )}

                <div className={styles.body}>{children}</div>

                {footer && <Flex>{footer}</Flex>}
            </div>
        </div>
    );

    return ReactDOM.createPortal(content, document.body);
};
