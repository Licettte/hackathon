import { useState } from "react";
import {Input, Button} from "shared/ui";
import {ConsentRequiredConfirm} from "./modal/ConsentRequiredConfirm";
import {Agreement} from "./agreement/Agreement";

import logo from '../../../logoElli.png' //todo webP формать переделать

import styles from "./Login.module.scss";

export  const  Login=() =>{
    const [email, setEmail] = useState("");
    const [openConfirmModal, setOpenConfirmModal] = useState(false);//todo вынести в хук

    return (
        <div className={styles.card}>
            <header className={styles.header}>
                <div className={styles.logoWrapper}>
                    <img src={logo} alt="" className={styles.logoImg}/>
                    <span className={styles.logoTitle}>Элли</span>
                </div>

            </header>
            <main className={styles.body}>
                <h1 className={styles.title}>Добро пожаловать</h1>

                <Input placeholder={'Введите ваше имя'}/>
                    {/*todo вынести весь текст в перменную*/}
                <Input type={'password'} placeholder={'Введите ваш пароль'}/>

                <div className={styles.buttonsWrapper} >
                  <Agreement isOfferLink/>
                    <div className={styles.submitButtons}>
                        <Button label='Начать' color='blue' onClick={() => setOpenConfirmModal(true)}/>
                        <Button label='Войти по номеру телефона' color="green"/>
                    </div>
                    <a className={styles.linkAlt} href="#" onClick={(e) => e.preventDefault()}>Забыли пароль?</a>
                </div>

            </main>

            {/*//todo нельзя передавать setOpenConfirmModal - написать фукнцию*/}
            <ConsentRequiredConfirm setOpenConfirmModal={setOpenConfirmModal}
                                    openConfirmModal={openConfirmModal}/>

        </div>

    );
}

