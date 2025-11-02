// FrostTextureCard.tsx
import React from "react";
import s from "./tes.module.scss";
// Вариант A: импортируй свою текстуру (лучше PNG/JPG с мягким градиентом)
import texture from "./green.jpg"; // положи файл рядом

export function FrostTextureCard() {
  return (
    <div className={s.scene}>
      <div className={s.card} >
        <div  style={{padding: '15px'}}>    DNS </div>

        {/* здесь можешь разместить любой контент; по умолчанию пусто */}
      </div>
    </div>
  );
}
