import { FormEvent, useState } from 'react';

import { Button, Input } from 'shared/ui';
import { useLoginForm } from 'widgets/login/lib/useLoginForm';
import { Agreement } from 'widgets/login/ui/agreement/Agreement';
import { ConsentRequiredConfirm } from 'widgets/login/ui/modal/ConsentRequiredConfirm';

import logoPng from '../../../logoElli.png';

import styles from './Login.module.scss';

const TXT = {
    title: 'Элли',
    email: 'Почта',
    password: 'Пароль',
    start: 'Начать',
    signIn: 'Войти',
    forgotPassword: 'Забыли пароль?',
};

export const Login = () => {
    const { register, validate } = useLoginForm();
    const [isAgree, setIsAgree] = useState(false);
    const [isOpenModal, setIsOpenModal] = useState(false);

    const onSubmit = (e: FormEvent) => {
        e.preventDefault();

        if (!isAgree) {
            setIsOpenModal(true);
            return;
        }
        if (!validate()) return;
        // TODO: submit + redirect
    };

    return (
        <div className={styles.card}>
            <header>
                <div className={styles.logoWrapper}>
                    <img
                        src={logoPng}
                        alt='Элли — логотип'
                        className={styles.logoImg}
                    />
                    <h1 className={styles.logoTitle}>{TXT.title}</h1>
                </div>
            </header>

            <main className={styles.body}>
                <form onSubmit={onSubmit} className={styles.form}>
                    <Input
                        placeholder={TXT.email}
                        type='email'
                        {...register('email')}
                    />
                    <Input
                        placeholder={TXT.password}
                        type='password'
                        {...register('password')}
                    />

                    <div className={styles.buttonsWrapper}>
                        <Agreement isOfferLink onChange={setIsAgree} />
                        <div className={styles.submitButtons}>
                            <Button
                                type='submit'
                                label={TXT.start}
                                color='blue'
                            />
                            <Button
                                type='button'
                                label={TXT.signIn}
                                color='green'
                            />
                        </div>
                        <button type='button' className={styles.linkAlt}>
                            {TXT.forgotPassword}
                        </button>
                    </div>
                </form>
            </main>

            <ConsentRequiredConfirm
                isOpenModal={isOpenModal}
                onClose={() => setIsOpenModal(false)}
                confirmStart={onSubmit}
                onChange={setIsAgree}
            />
        </div>
    );
};
