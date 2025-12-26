import styles from "./Modal.module.css";

export default function Modal({ children, onClose }) {
  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div className={styles.dialog} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={onClose} type="button">
          ×
        </button>
        {children}
      </div>
    </div>
  );
}
