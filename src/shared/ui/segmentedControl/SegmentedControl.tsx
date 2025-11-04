import React, { useState } from "react";
import s from "./SegmentedControl.module.scss";

type Option = { label: string; value: string };

type Props = {
    options: Option[];
    value?: string;
    defaultValue?: string;
    onChange?: (value: string, index: number) => void;
    className?: string;
};

export  function SegmentedControl({
  options,
  value,
  defaultValue,
  onChange,
  className,
}: Props) {
  const idx = options.findIndex(o => o.value === value);
  const count =  options.length;

  const select = (i: number) => {
    const selectedBank = options[i];

    onChange?.(selectedBank.value, i);
  };

  return (
    <div className={[s.card, className ?? ""].join(" ")}>
      <div className={[s.track, s[`count-${count}`], s[`pos-${idx+1}`]].join(" ")}>
        <div className={s.indicator} aria-hidden />
        {options.map((o, i) => (
          <button
            key={o.value}
            type="button"
            className={[s.btn, i === idx ? '' : s.passive].join(" ")}
            onClick={() => select(i)}
          >
            {o.label}
          </button>
        ))}
      </div>
    </div>
  );
}
