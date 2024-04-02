import { FC } from "react";

const LCurrencyCell: FC<{ value: number }> = ({ value }) => {
  const amount = parseFloat(value.toString());
  const formatted = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(amount);

  return <div className="text-left font-medium">{formatted}</div>;
};

export default LCurrencyCell;
