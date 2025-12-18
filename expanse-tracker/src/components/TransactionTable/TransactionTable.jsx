import styles from "./TransactionTable.module.css";
import { transactionsMock } from "../../data/transactions.mock";
import { formatCurrencyFa } from "../../utils/formatCurrency";

export default function TransactionTable() {
  return (
    <section className={styles.wrapper}>
      <h2 className={styles.title}>تراکنش‌ها</h2>

      <div className={styles.card}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.th}>تاریخ</th>
              <th className={styles.th}>درآمد (تومان)</th>
              <th className={styles.th}>هزینه (تومان)</th>
              <th className={styles.th}>شرح</th>
            </tr>
          </thead>

          <tbody>
            {transactionsMock.map((t) => {
              const isIncome = t.type === "income";
              const isExpense = t.type === "expense";

              return (
                <tr key={t.id} className={styles.tr}>
                  <td className={styles.tdDate}>{t.date}</td>

                  <td className={styles.tdAmount}>
                    {isIncome ? (
                      <span className={styles.income}>
                        +{formatCurrencyFa(t.amount)}
                      </span>
                    ) : (
                      <span className={styles.muted}>—</span>
                    )}
                  </td>

                  <td className={styles.tdAmount}>
                    {isExpense ? (
                      <span className={styles.expense}>
                        -{formatCurrencyFa(t.amount)}
                      </span>
                    ) : (
                      <span className={styles.muted}>—</span>
                    )}
                  </td>

                  <td className={styles.tdTitle}>{t.title}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}
