import { useState } from "react";
import {Input} from "shared/ui/input/Input";
import {Button} from "shared/ui/buttons/button/Button";
import styles from "./LoginPage.module.scss";
import {Toggle} from "shared/ui/buttons/toggle/Toggle";
import logo from '../../333.png'
import {Flex} from "shared/ui/flex/Flex";
import {Modal} from "shared/ui/modal/Modal";
import {ProgressIndicator, useProgressController} from "shared/ui/ProgressIndicator/ProgressIndicator";
import {ExplanationCarousel} from "shared/ui/сarousel/Carousel";
import {ObligationsTable} from "shared/ui/table/Table";
import {ReserveAccountMock} from "@/entities/reserveAccount/ReserveAccount";
const items: any[] = [
  { id: "utilities", label: "ЖКХ…",  state: "pending" },
  { id: "mobile",    label: "Связь…", state: "pending" },
  { id: "loan",      label: "Кредит…", state: "pending" },
];
export  const  LoginPage=() =>{
  const [email, setEmail] = useState("");
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const ctrl = useProgressController({ autoStep: 4, autoInterval: 600, cap: 95 });
  const steps = items.map((it, i) => ({
    ...it,
    state: ctrl.value >= (i + 1) * (100 / items.length) - 10 ? "done" : "pending",
  }));
  return (
    <div className={styles.card}>
      <ReserveAccountMock userId={1} planTotalRub={13450} />
      <ProgressIndicator
        title="Анализ обязательных платежей"
        note="Подготавливаем план на месяц…"
        value={ctrl.value}
        running={ctrl.running}
        items={steps}
        footer={ctrl.value >= 100 ? <span>Готово! Показываю найденные платежи</span> : null}
      />
      <ExplanationCarousel      />
      <header className={styles.header}>
        <div className={styles.logoWrapper}>
          <img src={logo} alt="" className={styles.logoImg} />
          <span className={styles.logoTitle}>Элли</span>
        </div>
        <ObligationsTable
          data={[
            { id: "1", name: "ЖКХ", amount: 5000, dueDay: 5 },
            { id: "2", name: "Кредит", amount: 8000, dueDay: 15 },
          ]}
        />

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
              <li>1. Согласие на обработку персональных данных</li>
              <li>2. Пользовательское соглашение</li>
              <li>3. Политика обработки персональных данных</li>

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

