import { FC, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import clsx from 'clsx';

import { Button } from 'shared/ui';
import { useOnboardingSse } from 'widgets/login/lib/useOnboardingSse';

import styles from './Mode.module.scss';

type ModeValue = 'semi' | 'auto';

type ModeProps = {
    value?: ModeValue;
    onChange?: (v: ModeValue) => void;
};

type ModeStatus = 'auto' | 'semi';

export const Mode: FC<ModeProps> = ({ value, onChange }) => {
    const navigate = useNavigate();

    const [modeStatus, setModeStatus] = useState<ModeStatus>('auto');

    const onClick = (mode: ModeStatus) => {
        setModeStatus(mode);

        navigate('/cabinet', { replace: true });
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
                        className={clsx(
                            styles.cta,
                            modeStatus === 'semi' && styles.active
                        )}
                        onClick={() => onClick}
                        aria-pressed={modeStatus === 'semi'}
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
                            modeStatus === 'auto' && styles.active
                        )}
                        onClick={() => onClick}
                        aria-pressed={modeStatus === 'auto'}
                    />
                </div>
            </div>
        </section>
    );
};
