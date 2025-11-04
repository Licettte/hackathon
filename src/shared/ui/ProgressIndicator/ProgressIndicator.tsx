import { FC, ReactNode, memo, useEffect, useRef, useState } from "react";
import s from "./ProgressIndicator.module.scss";

export type ProgressItem = {
    id: string;
    label: string;
    state?: "pending" | "active" | "done";
};

export type ProgressIndicatorProps = {
    /** Заголовок блока */
    title?: ReactNode;
    /** Подзаголовок / пояснение */
    note?: ReactNode;
    /** Прогресс 0..100 — контролируется снаружи */
    value: number;
    /** Список шагов (опционально) */
    items?: ProgressItem[];
    /** Нижняя зона (кнопки/подпись) */
    footer?: ReactNode;
    /** Идёт ли анимация (пульс/шиммер) */
    running?: boolean;
    /** Доп. класс контейнера */
    className?: string;
};

/** Хелпер: привести прогресс к 0..100 */
const clampPct = (v: number) => Math.max(0, Math.min(100, Math.round(v)));

export const ProgressIndicator: FC<ProgressIndicatorProps> = memo(
  ({ title, note, value, items = [], footer, running = true, className }) => {
    const pct = clampPct(value);

    // a11y: SR увидит только уже «готовую» строку процентов
    const liveRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
      if (!liveRef.current) return;
      liveRef.current.textContent = `${pct}%`;
    }, [pct]);

    return (
      <section
        className={[s.wrap, className].filter(Boolean).join(" ")}
        data-running={running ? "y" : "n"}
      >
        {title && <h3 className={s.title}>{title}</h3>}
        {note && <p className={s.note}>{note}</p>}

        <div className={s.progress}>
          <div className={s.track}>
            <div className={s.fill} style={{ width: `${pct}%` }} />
            <div className={s.gloss} aria-hidden />
          </div>
          <div className={s.percent} aria-hidden>
            {pct}%
          </div>
          {/* screen-reader only text */}
          <div className={s.srOnly} aria-live="polite" ref={liveRef} />
        </div>

        {items.length > 0 && (
          <ul className={s.list}>
            {items.map((it) => (
              <li key={it.id} className={s.item} data-state={it.state ?? "pending"}>
                <span className={s.dot} aria-hidden />
                <span className={s.label}>{it.label}</span>
                <span className={s.pulse} aria-hidden />
              </li>
            ))}
          </ul>
        )}

        {footer && <div className={s.footer}>{footer}</div>}
      </section>
    );
  }
);

/* -------- Контроллер: start/stop/reset/set (опционально) -------- */

type ControllerOpts = {
    autoStep?: number;      // прирост в % за тик (по умолчанию 4)
    autoInterval?: number;  // период тика, мс (по умолчанию 600)
    cap?: number;           // потолок авто-движения (по умолчанию 95)
    initial?: number;       // стартовое значение (по умолчанию 0)
};

export function useProgressController(opts: ControllerOpts = {}) {
  const { autoStep = 4, autoInterval = 600, cap = 95, initial = 0 } = opts;
  const [value, setValue] = useState(clampPct(initial));
  const [running, setRunning] = useState(false);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (!running) {
      if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }
      return;
    }
    timerRef.current = window.setInterval(
      () => setValue((v) => clampPct(Math.min(cap, v + autoStep))),
      autoInterval
    );
    return () => {
      if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }
    };
  }, [running, autoStep, autoInterval, cap]);

  return {
    value,
    running,
    start: () => setRunning(true),
    stop: () => setRunning(false),
    reset: (to = 0) => setValue(clampPct(to)),
    set: (v: number) => setValue(clampPct(v)),
  };
}
