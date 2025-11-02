import { useState } from "react";
import s from "./LoginCard.module.scss";
import {Input} from "../../shared/ui/input/Input";
import {Button} from "../../shared/ui/buttons/button/Button";
import styles from "./LoginCard.module.scss";
import {Toggle} from "../../shared/ui/buttons/toggle/Toggle";
import logo from '../../333.png'

export  const  LoginCard=() =>{
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");

  return (

    <div className={s.card}>
      <header className={s.header}>
        <div className={s.logoWrapper}>
          <img src={logo} alt="" className={s.logoImg} />
          <div className={styles.logoTitle}>Элли</div>
        </div>

      </header>

      <main className={s.body}>
        <h1 className={s.title}>Добро пожаловать
        </h1>
        <p className={s.sub}>Let’s get started</p>

        <label >
          <Input placeholder={'Введите ваше имя'}/>
        </label>

        <label >
          <Input type={'password'} placeholder={'Введите ваш пароль'}/>
        </label>

        <div className={styles.wrapperHint}>
          <label className={styles.switch}>
            <Toggle size='sm'/>
          </label>
          <span className={styles.hint}>Запомнить меня</span>
          <a className={styles.hint} href="#" onClick={(e)=>e.preventDefault()}>Забыли пароль?</a>
        </div>

        <div className={s.submitButtons}>
          <Button label='Войти' color='blue'/>

          <Button label='Войти по номеру телефона'  color="green"  />
        </div>

        <a className={s.linkAlt} href="#">Зарегистрироваться</a>
      </main>

    </div>

  ///

  );
}

