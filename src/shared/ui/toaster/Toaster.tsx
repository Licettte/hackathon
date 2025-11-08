import { Toaster as ToasterUI, ToasterProps } from 'sonner';

import styles from './Toaster.module.scss';

export const Toaster = (props: ToasterProps) => (
    <ToasterUI
        position='top-center'
        duration={3000}
        richColors
        className={styles.neoToastItem}
        toastOptions={{
            classNames: {
                toast: styles.neoToastItem,
            },
        }}
        {...props}
    />
);
