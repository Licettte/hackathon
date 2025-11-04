import { FC, ReactNode, useEffect, useMemo, useRef, useState } from "react";
import s from "./Carousel.module.scss";

type Slide = {
    id: string;
    title: ReactNode;
    text: ReactNode;
};

type Props = {
    slides?: Slide[];
    autoPlay?: boolean;       // автопрокрутка
    autoInterval?: number;    // мс между сменами
    className?: string;
};

const DEFAULT_SLIDES: Slide[] = [
  {
    id: "find",
    title: <>Находим ваши платежи</>,
    text: (
      <>Мы находим ваши <b>ежемесячные обязательные траты</b>: ЖКХ, связь, кредиты, подписки — и собираем в один список.</>
    ),
  },
  {
    id: "reserve",
    title: <>Резерв из зарплаты</>,
    text: (
      <>В день зарплаты <b>резервируем нужную сумму</b> на отдельном счёте. Деньги ждут своих дат — без риска, что в день оплаты их не окажется.</>
    ),
  },
  {
    id: "auto",
    title: <>Платим вовремя, вы подтверждаете</>,
    text: (
      <>
        В нужные даты <b>оплачиваем автоматически</b>. Перед каждым списанием — пуш-уведомление:
        <b> Подтвердить / Изменить / Отложить</b>. <b>Без вашего подтверждения ничего не спишется.</b>
      </>
    ),
  },
];

export const ExplanationCarousel: FC<Props> = ({
  slides = DEFAULT_SLIDES,
  autoPlay = true,
  autoInterval = 3800,
  className,
}) => {
  const [index, setIndex] = useState(0);
  const wrapRef = useRef<HTMLDivElement>(null);
  const count = slides.length;

  const next = () => setIndex((i) => (i + 1) % count);
  const prev = () => setIndex((i) => (i - 1 + count) % count);
  const go = (i: number) => setIndex(((i % count) + count) % count);

  // авто-прокрутка (уважаем reduced motion)
  const reducedMotion = useMemo(
    () => window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false,
    []
  );

  useEffect(() => {
    if (!autoPlay || reducedMotion || count <= 1) return;
    const id = window.setInterval(next, autoInterval);
    return () => clearInterval(id);
  }, [autoPlay, autoInterval, reducedMotion, count]);

  // свайп на таче
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    let startX = 0;
    const onStart = (e: TouchEvent) => (startX = e.touches[0].clientX);
    const onMove = (e: TouchEvent) => {
      const dx = e.touches[0].clientX - startX;
      if (Math.abs(dx) > 48) {
        dx < 0 ? next() : prev();
        startX = e.touches[0].clientX + (dx < 0 ? 9999 : -9999); // гасим повтор
      }
    };
    el.addEventListener("touchstart", onStart, { passive: true });
    el.addEventListener("touchmove", onMove, { passive: true });
    return () => {
      el.removeEventListener("touchstart", onStart);
      el.removeEventListener("touchmove", onMove);
    };
  }, [count]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") next();
    if (e.key === "ArrowLeft") prev();
  };

  return (
    <section
      ref={wrapRef}
      className={[s.wrap, className].filter(Boolean).join(" ")}
      role="region"
      aria-roledescription="carousel"
      aria-label="Как работает Элли"
      tabIndex={0}
      onKeyDown={onKeyDown}
    >
      <div className={s.viewport}>
        <div
          className={s.track}
          style={{ transform: `translateX(-${index * 100}%)` }}
          aria-live="polite"
        >
          {slides.map((sl, i) => (
            <article
              key={sl.id}
              className={s.card}
              aria-hidden={i === index ? "false" : "true"}
            >
              <h4 className={s.title}>{sl.title}</h4>
              <p className={s.text}>{sl.text}</p>
            </article>
          ))}
        </div>
      </div>

      <div className={s.controls}>
        <button className={s.nav} onClick={prev} aria-label="Назад">‹</button>
        <ul className={s.dots} role="tablist" aria-label="Слайды">
          {slides.map((sl, i) => (
            <li key={sl.id} role="presentation">
              <button
                role="tab"
                aria-selected={i === index}
                aria-controls={`slide-${sl.id}`}
                className={s.dot}
                data-active={i === index ? "y" : "n"}
                onClick={() => go(i)}
              />
            </li>
          ))}
        </ul>
        <button className={s.nav} onClick={next} aria-label="Вперёд">›</button>
      </div>
    </section>
  );
};
