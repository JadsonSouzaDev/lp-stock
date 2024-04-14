import { BadgePercent } from "lucide-react";
import { FC } from "react";

const LCurrencyCell: FC<{ value: number; isPromotion?: boolean }> = ({
  value,
  isPromotion,
}) => {
  const amount = parseFloat(value.toString());
  const formatted = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(amount);

  return (
    <div className="text-left font-medium">
      {formatted}
      {isPromotion && (
        <BadgePercent className="inline-block ml-1 text-amber-500" size={16} />
      )}
    </div>
  );
};

export default LCurrencyCell;
