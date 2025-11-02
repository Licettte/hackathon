import s from "./tes.module.scss";

import  qwe from './text5.jpg'
import  qwe1 from './ship.jpg'
import React from "react";
import {Button} from "shared/ui/buttons/button/Button";
type Props = {
  textureUrl: string;
  alpha?: number;
  chip?: boolean;
  neumorph?: boolean;     // ← новый режим
  iridescent?: boolean;   // ← новый режим
};

export function SberMatteCard({
  textureUrl, alpha = 0.08, chip = false, neumorph = false, iridescent = true
}: Props) {
  return (
    <div >
      <article
        className={[
          s.card,
          neumorph ? s.neumorph : "",
          iridescent ? s.iridescent : ""
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
          {/*5355 1234 0000 9999*/}
          ****   **** **** 9999
        </label>

        <header className={s.bank}>

          <div>BANK</div>
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
