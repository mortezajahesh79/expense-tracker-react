import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

import TransactionTable from "./components/TransactionTable/TransactionTable";

export default function App() {
  return (
    <main className="container">
      <TransactionTable />
    </main>
  );
}
