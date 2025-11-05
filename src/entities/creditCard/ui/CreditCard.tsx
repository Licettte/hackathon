import React, {FC} from "react";

import  qwe1 from '../../../ship.jpg'
import  qwe from '../../../text5.jpg'

import s from "./CreditCard.module.scss";


type CreditCardProps = {
  number: number;
  bankTitle: string;
  bankLogo: string;
};

export  const  CreditCard: FC<CreditCardProps>=({ number, bankTitle})=>{
  return (
    <div >
      <article
        className={[
          s.card,
        ].join(" ")}
        style={{
          ["--texture" as any]: `url(${qwe})`,
          ["--texture2" as any]: `url(${qwe1})`,
        }}
        aria-label="Matte plastic bank card"
      >
        <div className={s.texture} />
        <div className={s.texture2} />
        <div className={s.plastic} />

        <label className={s.number} >
          ****   **** ****  {number}
        </label>

        <header className={s.bank}>

          <div>{bankTitle}</div>
        </header>

        {/*<div className={s.number} aria-label="Card number">*/}
        {/*  5321&nbsp;8541&nbsp;8745&nbsp;1842*/}
        {/*</div>*/}

        {/*<div className={s.bottom}>*/}
        {/*  <div className={s.holder}>*/}
        {/*    <span className={s.label}>CARDHOLDER</span>*/}
        {/*    <span className={s.value}>IVAN IVANOV</span>*/}
        {/*  </div>*/}
        {/*  <div className={s.exp}>*/}
        {/*    <span className={s.label}>VALID THRU</span>*/}
        {/*    <span className={s.value}>12/28</span>*/}
        {/*  </div>*/}
        {/*</div>*/}
        {/*{chip && <div className={s.chip}><span/><span/><span/><span/><span/><span/></div>}*/}
        {/*<div className={s.logoBank}>*/}
        {/*  /!* твой реальный SVG можно вставить сюда *!/*/}
        {/*  <span className={s.word}>СБЕРБАНК</span>*/}
        {/*</div>*/}
        {/*<div className={s.logoMir}><span className={s.word}>MIR</span><span className={s.mirLeaf}/></div>*/}
        {/*<div className={s.shine} />*/}
        {/*/!* слой иридесценции *!/*/}
        {/*{iridescent && <div className={s.film} aria-hidden />}*/}
      </article>
      {/*<div style={{paddingTop: '35px'}}>*/}
      {/*  <Button label={'Оплатить'} color={'black'}/>*/}
      {/*</div>*/}

    </div>
  );
}
