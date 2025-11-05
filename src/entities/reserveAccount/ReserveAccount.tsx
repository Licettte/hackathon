import { FC, useMemo, useState } from "react";

import styles from "./ReserveAccount.module.scss"; // можно подставить свои стили

type LedgerType = "FUND" | "WITHDRAW" | "PAY" | "INTEREST";

type LedgerItem = {
  id: string;
  ts: string;        // ISO
  type: LedgerType;
  amount: number;    // в копейках; пополнение >0, списание <0
  comment?: string;
  balanceAfter: number; // баланс после операции (в копейках)
};

const fmtRUB = (cents: number) =>
  new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: "RUB",
    maximumFractionDigits: 0,
  }).format(Math.round(cents / 100));

const fmtDate = (iso: string) =>
  new Date(iso).toLocaleString("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });

const fmtSigned = (cents: number) => {
  const isNeg = cents < 0;
  const val = Math.abs(cents);
  const txt = new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: "RUB",
    maximumFractionDigits: 0,
  }).format(Math.round(val / 100));
  return (isNeg ? "−" : "+") + txt.replace("₽", " ₽");
};

const mapType = (t: LedgerType, comment?: string) => {
  switch (t) {
    case "FUND":
      return comment ?? "Пополнение";
    case "WITHDRAW":
      return comment ?? "Снятие";
    case "PAY":
      return comment ?? "Оплата по плану";
    case "INTEREST":
      return "Проценты на остаток";
    default:
      return t;
  }
};

type Props = {
  userId?: number;
  /** Подсказка — «сумма по плану» (в рублях), чтобы автозаполнить пополнение */
  planTotalRub?: number;
};

export const ReserveAccountMock: FC<Props> = ({ userId = 1, planTotalRub = 13450 }) => {
  // ---- mock state ----
  const [accountNumber] = useState(`40817·OBL·${String(userId).padStart(6, "0")}`);
  const [balance, setBalance] = useState<number>(0); // копейки
  const [ledger, setLedger] = useState<LedgerItem[]>([
    // демо-операции (можно убрать)
    {
      id: crypto.randomUUID(),
      ts: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
      type: "FUND",
      amount: 500000, // +5 000 ₽
      comment: "Стартовое пополнение",
      balanceAfter: 500000,
    },
    {
      id: crypto.randomUUID(),
      ts: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
      type: "PAY",
      amount: -300000, // −3 000 ₽
      comment: "Оплата ЖКХ",
      balanceAfter: 200000,
    },
  ]);

  // ---- ui state ----
  const [showLedger, setShowLedger] = useState(false);
  const [fundValueRub, setFundValueRub] = useState<number>(planTotalRub || 0);
  const [withdrawValueRub, setWithdrawValueRub] = useState<number>(0);
  const busy = false; // здесь нет сетевых запросов

  // ---- actions (mock) ----
  const pushLedger = (type: LedgerType, amountCents: number, comment?: string) => {
    const newBalance = balance + amountCents;
    const row: LedgerItem = {
      id: crypto.randomUUID(),
      ts: new Date().toISOString(),
      type,
      amount: amountCents,
      comment,
      balanceAfter: newBalance,
    };
    setLedger((prev) => [row, ...prev]); // новые сверху
    setBalance(newBalance);
  };

  const onFund = () => {
       const cents = Math.round(fundValueRub * 100);
    if (cents <= 0) return;
    pushLedger("FUND", cents, "Перевод из зарплаты");
    // подсказка: после пополнения можно сбросить поле или оставить
    // setFundValueRub(0);
  };

  const onWithdraw = () => {
    const cents = Math.round(withdrawValueRub * 100);
    if (cents <= 0) return;
    if (balance < cents) {
      alert("Недостаточно средств");
      return;
    }
    pushLedger("WITHDRAW", -cents, "Перевод на основной счёт");
    // setWithdrawValueRub(0);
  };

  const hint = useMemo(() => {
    if (!planTotalRub || planTotalRub <= 0)
      return "Счёт для обязательных платежей. Карта им не платит.";
    return `Подсказка: по плану — ${new Intl.NumberFormat("ru-RU").format(planTotalRub)} ₽`;
  }, [planTotalRub]);

  return (
    <section className={styles.card} aria-live="polite">
      <header className={styles.header}>
        <div className={styles.title}>Сберегательный счёт обязательных</div>
        <div className={styles.number}>{accountNumber}</div>
      </header>

      <div className={styles.row}>
        <div className={styles.balanceBlock}>
          <div className={styles.balanceLabel}>Баланс</div>
          <div className={styles.balanceValue}>{fmtRUB(balance)}</div>
          <div className={styles.hint}>{hint}</div>
        </div>

        <div className={styles.actions}>
          <div className={styles.field}>
            <label>Пополнить из зарплаты</label>
            <div className={styles.inputRow}>
              <input
                type="number"
                min={0}
                step={100}
                value={fundValueRub}
                onChange={(e) => setFundValueRub(Number(e.target.value))}
                placeholder={planTotalRub ? String(planTotalRub) : "Сумма, ₽"}
              />
              <button className={styles.primary} disabled={fundValueRub <= 0 || busy} onClick={onFund}>
                Пополнить
              </button>
            </div>
          </div>

          <div className={styles.field}>
            <label>Снять на основной счёт</label>
            <div className={styles.inputRow}>
              <input
                type="number"
                min={0}
                step={100}
                value={withdrawValueRub}
                onChange={(e) => setWithdrawValueRub(Number(e.target.value))}
                placeholder="Сумма, ₽"
              />
              <button
                className={styles.secondary}
                disabled={withdrawValueRub <= 0 || busy}
                onClick={onWithdraw}
              >
                Снять
              </button>
            </div>
          </div>
        </div>
      </div>

      <footer className={styles.footer}>
        <button className={styles.ghost} onClick={() => setShowLedger((v) => !v)}>
          {showLedger ? "Скрыть историю" : "История операций"}
        </button>
      </footer>

      {showLedger && (
        <div className={styles.ledger}>
          {ledger.length ? (
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Дата/время</th>
                  <th>Операция</th>
                  <th className={styles.right}>Сумма</th>
                  <th className={styles.right}>Баланс</th>
                </tr>
              </thead>
              <tbody>
                {ledger.map((row) => (
                  <tr key={row.id}>
                    <td>{fmtDate(row.ts)}</td>
                    <td>{mapType(row.type, row.comment)}</td>
                    <td className={styles.right}>{fmtSigned(row.amount)}</td>
                               <td className={styles.right}>{fmtRUB(row.balanceAfter)}</td>
                  </tr>
                     ))}
              </tbody>
            </table>
          ) : (
            <div className={styles.muted}>Пока нет операций</div>
          )}
        </div>
      )}
    </section>
  );
};
