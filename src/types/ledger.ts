export interface LedgerEntry {
  date: string;
  name: string;
  rent: number;
  advances: {
    amount: number;
    date: string;
  }[];
  bills: {
    gst: number;
    cleaning: number;
    electricity: number;
    water: number;
    gas: number;
    ac: number;
    roomRent: number;
    generator: number;
    prevDay: number;
    others: number;
    discount: number;
    gstAmount: number;
  };
  expenses: {
    description: string;
    amount: number;
  }[];
  deposits: {
    account: string;
    amount: number;
    date: string;
  }[];
  totals: {
    billTotal: number;
    advanceReceived: number;
    balanceCollected: number;
    pendingBalance: number;
    excessShortage: number;
  };
}