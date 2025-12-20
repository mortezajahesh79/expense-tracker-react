export function formatDateFaShort(dateStr) {
  if (!dateStr) return "";

  const parts = String(dateStr).split("/");
  if (parts.length !== 3) return dateStr;

  const [y, m, d] = parts.map((x) => Number(x));

  const toFaDigits = (n) =>
    new Intl.NumberFormat("fa-IR", { useGrouping: false }).format(n);

  return `${toFaDigits(y)}/${toFaDigits(m)}/${toFaDigits(d)}`;
}
