import { useState } from "react";
import {Input} from "shared/ui/input/Input";
import {Button} from "shared/ui/buttons/button/Button";
import styles from "./LoginPage.module.scss";
import {Toggle} from "shared/ui/buttons/toggle/Toggle";
import logo from '../../333.png'
import {Flex} from "shared/ui/flex/Flex";
import {Modal} from "shared/ui/modal/Modal";

export  const  LoginPage=() =>{
  const [email, setEmail] = useState("");
  const [openConfirmModal, setOpenConfirmModal] = useState(false);

  return (
    <div className={styles.card}>
      <header className={styles.header}>
        <div className={styles.logoWrapper}>
          <img src={logo} alt="" className={styles.logoImg} />
          <span className={styles.logoTitle}>Элли</span>
        </div>

      </header>

      <main className={styles.body}>
        <h1 className={styles.title}>Добро пожаловать</h1>

        <label >
          <Input placeholder={'Введите ваше имя'}/>
          {/*todo вынести весь текст в перменную*/}
        </label>

        <label >
          <Input type={'password'} placeholder={'Введите ваш пароль'}/>
        </label>

        <div className={styles.wrapperHint}>
          <label className={styles.switch}>
            <Toggle size='sm'/>
          </label>
          <span className={styles.hint}>Разрешить доступ к данным</span>

        </div>
        {/*todo вынести в компонент Agreement*/}

        <div className={styles.submitButtons}>
          <Button label='Начать' color='blue' onClick={() => setOpenConfirmModal(true)}/>
          <Modal
            open={openConfirmModal}
            onClose={() => setOpenConfirmModal(false)}
            title="Необходимо дать согласие"
            ariaLabel="Официальное подтверждение условий сервиса и доступа к данным"

          >
            <ul>
              <li>1. условия соглашения</li>
              <li>2. блаблабла</li>
              <li>3. блаблабла</li>
            </ul>

            <div className={styles.wrapperHint}>
              <label className={styles.switch}>
                <Toggle size='sm'/>
              </label>
              <span className={styles.hint}>Разрешить доступ к данным</span>

            </div>
            <Button label='Начать' color='blue' onClick={() => setOpenConfirmModal(true)}/>

          </Modal>
          {/*todo вынести компонент*/}
          <Button label='Войти по номеру телефона'  color="green"  />
        </div>
        <a className={styles.linkAlt} href="#" onClick={(e)=>e.preventDefault()}>Забыли пароль?</a>
      </main>
    </div>

  );
}

