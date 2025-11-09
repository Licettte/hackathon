import { FormEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch } from 'app/store/hooks';
import {
    useLoginMutation,
    useStartOnboardingMutation,
} from 'features/auth/api';
import { setToken } from 'features/auth/model/authSlice';
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
    const dispatch = useAppDispatch();

    const navigate = useNavigate();
    const [login, { isSuccess, data }] = useLoginMutation();

    const [start, { isSuccess: isSuccessStartData, data: responseStartData }] =
        useStartOnboardingMutation();

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
        login({ email: 'team205-1@example.com', password: '123' }); //todo добавить данные с инпута
    };

    useEffect(() => {
        if (isSuccess) {
            dispatch(setToken(String(data?.accessToken)));
            start();
        }
    }, [isSuccess]);

    useEffect(() => {
        if (isSuccessStartData) {
            console.log(responseStartData, 'responseStartData');
            navigate('/onboarding', {
                state: { jobId: responseStartData.jobId },
                replace: true,
            });
        }
    }, [isSuccessStartData]);

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
                    <Input placeholder={TXT.email} {...register('email')} />
                    {/*todo тут валидация для почты*/}
                    <Input
                        placeholder={TXT.password}
                        type='password'
                        {...register('password')}
                    />
                    {/*todo тут валидация для пароля*/}
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
