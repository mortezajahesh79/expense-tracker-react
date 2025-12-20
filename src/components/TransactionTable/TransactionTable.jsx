import styles from "./TransactionTable.module.css";
import { transactionsMock } from "../../data/transactions.mock";
import { formatCurrencyFa } from "../../utils/formatCurrency";
import { formatDateFaShort } from "../../utils/formatDate";

export default function TransactionTable() {
  return (
    <section className={styles.wrapper}>
      <h2 className={styles.title}>تراکنش‌ها</h2>

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
            </tr>
          </thead>

          <tbody>
            {transactionsMock.map((t) => {
              const isIncome = t.type === "income";
              const isExpense = t.type === "expense";

              return (
                <tr key={t.id} className={styles.tr}>
                  <td className={styles.tdDate}>{formatDateFaShort(t.date)}</td>

                  {/* Income cell: if not income show nothing */}
                  <td className={`${styles.tdAmount} ${styles.tdIncome}`}>
                    {isIncome ? (
                      <span className={styles.income}>
                        +{formatCurrencyFa(t.amount)}
                      </span>
                    ) : null}
                  </td>

                  {/* Expense cell: if not expense show nothing */}
                  <td className={`${styles.tdAmount} ${styles.tdExpense}`}>
                    {isExpense ? (
                      <span className={styles.expense}>
                        -{formatCurrencyFa(t.amount)}
                      </span>
                    ) : null}
                  </td>

                  <td className={styles.tdTitle}>{t.title}</td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {/* Mobile List */}
        {/* Mobile List */}
        <div className={`${styles.mobileOnly} ${styles.mobileList}`}>
          {transactionsMock.map((t) => {
            const isIncome = t.type === "income";

            return (
              <div key={t.id} className={styles.mobileRow}>
                {/* 👇👇 این بخش جدید و دقیقاً همونی که گفتی 👇👇 */}
                <div className={styles.mobileTop}>
                  <div className={styles.mobileDate}>
                    {formatDateFaShort(t.date)}
                  </div>
                  <div className={styles.mobileAmountLine}>
                    <span className={isIncome ? styles.income : styles.expense}>
                      {formatCurrencyFa(t.amount)}
                    </span>
                  </div>
                </div>

                <div className={styles.mobileTitle}>{t.title}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
