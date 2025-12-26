import { useState } from "react";
import "./App.css";

import TransactionTable from "./components/TransactionTable/TransactionTable";
import Modal from "./components/Modal/Modal";
import AddTransactionForm from "./components/AddTransactionForm/AddTransactionForm";

import { transactionsMock } from "./data/transactions.mock";

export default function App() {
  const [transactions, setTransactions] = useState(transactionsMock);
  const [isModalOpen, setIsModalOpen] = useState(false);

  function handleAddTransaction(newTx) {
    const txWithId = {
      ...newTx,
      id: newTx.id ?? Date.now(), // ساده و کافی برای پروژه
    };

    setTransactions((prev) => [txWithId, ...prev]); // جدیدها بیاد بالا
    setIsModalOpen(false); // بعد از submit مودال بسته شود
  }

  function handleDeleteTransaction(id) {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  }

  return (
    <>
      <TransactionTable
        transactions={transactions}
        onAddClick={() => setIsModalOpen(true)}
        onDelete={handleDeleteTransaction}
      />

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <AddTransactionForm
            onSubmit={handleAddTransaction}
            onCancel={() => setIsModalOpen(false)}
          />
        </Modal>
      )}
    </>
  );
}
