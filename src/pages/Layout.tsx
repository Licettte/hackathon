import { Outlet } from 'react-router-dom';

import { Toaster } from 'shared/ui/toaster/Toaster';

import styles from './Layout.module.scss';

export const Layout = () => {
    return (
        <div className={styles.wrapper}>
            <header className={styles.header}>HEDER</header>

            <main className={styles.content}>
                <Outlet />

                <Toaster />
            </main>

            <footer className={styles.footer}>/FOOTER</footer>
        </div>
    );
};
