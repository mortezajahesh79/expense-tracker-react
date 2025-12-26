import { useMemo, useState } from "react";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import calendarIcon from "../../assets/icons/light/Calendar.svg"; // آیکون خودت

import styles from "./AddTransactionForm.module.css";

export default function AddTransactionForm({ onSubmit, onCancel }) {
  const [type, setType] = useState("expense");
  const [amount, setAmount] = useState("");
  const [title, setTitle] = useState("");
  const [dateValue, setDateValue] = useState(null); // مقدار اصلی (DateObject)

  // برای نمایش در input → همیشه به شکل رشته شمسی
  const displayDate = useMemo(() => {
    if (!dateValue) return "";
    return dateValue.format("YYYY/MM/DD"); // یا "D MMMM YYYY" یا هر فرمت دلخواه
  }, [dateValue]);

  function handleSubmit(e) {
    e.preventDefault();

    const numericAmount = Number(amount);

    if (!displayDate || !title.trim() || !numericAmount) return;

    onSubmit({
      id: Date.now(),
      date: displayDate,
      title: title.trim(),
      type,
      amount: numericAmount,
    });
  }

  // کامپوننت ورودی سفارشی
  const CustomDateInput = ({
    openCalendar,
    value = "", // مقدار فعلی (مثلاً "۱۴۰۳/۱۰/۰۵")
    handleValueChange,
  }) => {
    return (
      <div className={styles.dateInputWrapper}>
        <input
          className={styles.input}
          value={value}
          onChange={handleValueChange}
          onFocus={openCalendar}
          onClick={openCalendar} // ← کمک می‌کنه در موبایل بهتر باز بشه
          dir="ltr"
          inputMode="numeric"
          pattern="[0-9]{4}/[0-9]{2}/[0-9]{2}" // فقط فرمت yyyy/mm/dd قبول می‌کنه
          maxLength={10} // حداکثر ۱۰ کاراکتر (۱۴۰۳/۱۲/۲۹)
          // optional: جلوگیری از تایپ کاراکترهای غیرمجاز
          onKeyPress={(e) => {
            if (!/[0-9/]/.test(e.key)) {
              e.preventDefault();
            }
          }}
        />
        <img
          src={calendarIcon}
          alt="تقویم"
          className={styles.calendarIcon}
          onClick={openCalendar} // کلیک روی آیکون هم باز میشه
        />
      </div>
    );
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h3 className={styles.formTitle}>افزودن تراکنش</h3>
      <section className={styles.table}>
        <div className={styles.field}>
          <label className={styles.label}>تاریخ</label>

          <DatePicker
            value={dateValue}
            onChange={setDateValue}
            format="YYYY/MM/DD" // فرمت مهم برای هماهنگی
            calendar={persian}
            locale={persian_fa}
            calendarPosition="bottom-right"
            render={<CustomDateInput />}
          />
        </div>

        {/* JSX */}
        {/* JSX */}
        <div className={styles.field}>
          <label className={styles.label}>مبلغ(تومان)</label>
          <div className={styles.amountWrapper}>
            <input
              className={styles.amountInput}
              type="number"
              placeholder="۰"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <span className={styles.amountUnit}></span>
          </div>
        </div>

        {/* نوع تراکنش */}
        <div className={styles.field}>
          <label className={styles.label}>نوع تراکنش</label>
          <div className={styles.typeRow}>
            <label className={styles.typeItem}>
              <label className={styles.typeItem}>
                <input
                  type="radio"
                  name="type"
                  value="income"
                  checked={type === "income"}
                  onChange={() => setType("income")}
                />
                درآمد
              </label>
              <input
                type="radio"
                name="type"
                value="expense"
                checked={type === "expense"}
                onChange={() => setType("expense")}
              />
              هزینه
            </label>
          </div>
        </div>

        <div className={styles.field}>
          <label className={styles.label}>شرح</label>
          <div className={styles.explainWrapper}>
            <input
              className={styles.explainInputInput}
              type="text"
              placeholder=""
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <span className={styles.explainUnit}></span>
          </div>
        </div>
      </section>
      <div className={styles.actions}>
        <button type="button" className={styles.cancelBtn} onClick={onCancel}>
          انصراف
        </button>
        <button type="submit" className={styles.submitBtn}>
          ثبت
        </button>
      </div>
    </form>
  );
}
