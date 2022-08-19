export interface ITransactionData {
  from: string,
  to: string,
  amount: string,
  txHash: string
}

export interface IAccount {
  address: string,
  privateKey: string,
  balance: string
}