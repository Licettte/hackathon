import { FC, useState } from 'react';
import clsx from 'clsx';

import { Button } from 'shared/ui';

import styles from './Mode.module.scss';

type ModeValue = 'semi' | 'auto';

type ModeProps = {
    value?: ModeValue;
    onChange?: (v: ModeValue) => void;
};

export const Mode: FC<ModeProps> = ({ value, onChange }) => {
    const [mode, setMode] = useState<ModeValue>('auto');

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
                        className={clsx(
                            styles.cta,
                            mode === 'semi' && styles.active
                        )}
                        onClick={() => setMode('semi')}
                        aria-pressed={mode === 'semi'}
                    />
                </div>

                <div className={styles.row}>
                    <p className={styles.text}>
                        <b>Авто</b> — всё сделаю за вас.
                    </p>
                    <Button
                        label='Авто'
                        color='green'
                        className={clsx(
                            styles.cta,
                            mode === 'auto' && styles.active
                        )}
                        onClick={() => setMode('auto')}
                        aria-pressed={mode === 'auto'}
                    />
                </div>
            </div>
        </section>
    );
};
