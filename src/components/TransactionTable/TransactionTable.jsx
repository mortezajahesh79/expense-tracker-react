import styles from "./TransactionTable.module.css";
import { formatCurrencyFa } from "../../utils/formatCurrency";
import { formatDateFaShort } from "../../utils/formatDate";

import DeleteIcon from "../../assets/icons/light/Delete.svg";

export default function TransactionTable({
  transactions,
  onAddClick,
  onDelete,
}) {
  return (
    <section className={styles.wrapper}>
      <div className={styles.header}>
        <h2 className={styles.title}>تراکنش‌ها</h2>

        <button className={styles.addBtn} type="button" onClick={onAddClick}>
          <span className={styles.addIcon}>+</span>
          افزودن تراکنش
        </button>
      </div>

      <div className={styles.card}>
        {/* Desktop Table */}
        <table className={`${styles.table} ${styles.desktopOnly}`}>
          <thead>
            <tr>
              <th className={`${styles.th} ${styles.thDate}`}>تاریخ</th>
              <th className={`${styles.th} ${styles.thIncome}`}>
                درآمد (تومان)
              </th>
              <th className={`${styles.th} ${styles.thExpense}`}>
                هزینه (تومان)
              </th>
              <th className={`${styles.th} ${styles.thTitle}`}>شرح</th>
              <th className={`${styles.th} ${styles.thActions}`}></th>
            </tr>
          </thead>

          <tbody>
            {transactions.map((t) => {
              const isIncome = t.type === "income";
              const isExpense = t.type === "expense";

              return (
                <tr key={t.id} className={styles.tr}>
                  <td className={styles.tdDate}>{formatDateFaShort(t.date)}</td>

                  <td className={`${styles.tdAmount} ${styles.tdIncome}`}>
                    {isIncome ? (
                      <span className={styles.income}>
                        + {formatCurrencyFa(t.amount)}
                      </span>
                    ) : null}
                  </td>

                  <td className={`${styles.tdAmount} ${styles.tdExpense}`}>
                    {isExpense ? (
                      <span className={styles.expense}>
                        - {formatCurrencyFa(t.amount)}
                      </span>
                    ) : null}
                  </td>

                  <td className={styles.tdTitle}>{t.title}</td>

                  <td className={styles.tdActions}>
                    <button
                      className={styles.deleteBtn}
                      type="button"
                      onClick={() => onDelete(t.id)}
                    >
                      <img
                        src={DeleteIcon}
                        alt="delete"
                        className={styles.deleteIcon}
                      />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {/* Mobile List */}
        <div className={`${styles.mobileOnly} ${styles.mobileList}`}>
          {transactions.map((t) => {
            const isIncome = t.type === "income";
            const sign = isIncome ? "+" : "-";

            return (
              <div key={t.id} className={styles.mobileRow}>
                {/* top row: date + amount + delete */}
                <div className={styles.mobileTop}>
                  <div className={styles.mobileDate}>
                    {formatDateFaShort(t.date)}
                  </div>

                  <div className={styles.mobileRight}>
                    <div className={styles.mobileAmountLine}>
                      <span
                        className={isIncome ? styles.income : styles.expense}
                      >
                        {sign} {formatCurrencyFa(t.amount)}{" "}
                        <span className={styles.currency}>تومان</span>
                      </span>
                    </div>
                    <div className={styles.mobilebottom}>
                      <div className={styles.mobileTitle}>{t.title}</div>
                      <button
                        type="button"
                        className={styles.deleteBtn}
                        onClick={() => onDelete(t.id)}
                        aria-label="حذف تراکنش"
                        title="حذف"
                      >
                        <img src={DeleteIcon} alt="" />
                      </button>
                    </div>
                  </div>
                </div>
                {/* bottom row: title */}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
