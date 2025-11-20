/**
 * Core wallet and transaction types for the cryptocurrency platform
 */

export interface Network {
  id: string;
  name: string;
  fee: number;
  minAmount: number;
}

export interface Currency {
  id: string;
  symbol: string;
  name: string;
  icon: string;
  available: number;
  locked: number;
  networks: Network[];
  priceUSD: number;
}

export interface Transaction {
  id: string;
  type: 'withdrawal' | 'deposit';
  currencyId: string;
  amount: number;
  address: string;
  network: string;
  status: 'pending' | 'completed' | 'failed';
  timestamp: Date;
}

export interface WalletState {
  currencies: Currency[];
  transactions: Transaction[];
  hideBalances: boolean;
}

export interface WithdrawalPayload {
  currencyId: string;
  amount: number;
  address: string;
  network: string;
}
