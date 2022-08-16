export interface ITransactionData {
  from: string;
  to: string;
  amount: string;
}

export interface IAddress {
  address: string,
  privateKey: string,
  balance: string
}