import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';

import { Button } from 'shared/ui';

import styles from './Mode.module.scss';

type ModeValue = 'semi' | 'auto';

export const Mode = () => {
    const navigate = useNavigate();

    const handleClick = (mode: ModeValue) => {
        navigate('/connection', { replace: true, state: { mode: mode } });
    };

    return (
        <section aria-label='Выбор режима списаний'>
            <div className={styles.rows}>
                <div className={styles.row}>
                    <p className={styles.text}>
                        <b>Полуавто</b> — пришлю push, вы подтвердите.
                    </p>
                    <Button
                        label='Полуавто'
                        color='blue'
                        className={clsx(styles.cta)}
                        onClick={() => handleClick('semi')}
                    />
                </div>

                <div className={styles.row}>
                    <p className={styles.text}>
                        <b>Авто</b> — всё сделаю за вас.
                    </p>
                    <Button
                        label='Авто'
                        color='green'
                        className={clsx(styles.cta)}
                        onClick={() => handleClick('auto')}
                    />
                </div>
            </div>
        </section>
    );
};
