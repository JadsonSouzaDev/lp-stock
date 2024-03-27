type TransactionType = "INPUT" | "OUTPUT";

type FinancialRecord = {
  id: string;
  transaction_date: Date;
  description: string;
  amount: number;
  transaction_type: TransactionType;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
};
