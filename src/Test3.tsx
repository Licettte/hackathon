import React from "react";
import s from "./entities/creditCard/ui/CreditCard.module.scss";
// import texture from "./144.jpg"; // op ///0/5
import texture from "./ship.jpg"; // op ///0/5
import texture1 from "./e0612b945fb7ec0e72b00a8dd587edc7.jpg"; // op ///0/5

export function GlassBankCard() {
  return (
    <div className={s.scene} >
      <div className={s.card}   >

        <header className={s.top}>
          <div className={s.chip} aria-hidden />
          <div className={s.brand}>BANK</div>
        </header>

        <div className={s.number} aria-label="Card number">
          5321&nbsp;8541&nbsp;8745&nbsp;1842
        </div>

        <div className={s.bottom}>
          <div className={s.holder}>
            <span className={s.label}>CARDHOLDER</span>
            <span className={s.value}>IVAN IVANOV</span>
          </div>
          <div className={s.exp}>
            <span className={s.label}>VALID THRU</span>
            <span className={s.value}>12/28</span>
          </div>
        </div>
      </div>
    </div>
  );
}

