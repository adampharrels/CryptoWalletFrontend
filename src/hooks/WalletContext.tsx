/**
 * Wallet context for sharing state across the application
 * Provides wallet data and transaction operations to any component
 */

import React, { createContext, useContext } from 'react';
import { useWallet } from './useWallet';
import type { Currency, Transaction, WithdrawalPayload } from '../types';

interface WalletContextType {
  currencies: Currency[];
  transactions: Transaction[];
  withdraw: (payload: WithdrawalPayload) => Transaction;
  getTotalPortfolioValue: () => number;
  getTotalAvailableValue: () => number;
  getTotalLockedValue: () => number;
  getCurrency: (id: string) => Currency | undefined;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const wallet = useWallet();

  return (
    <WalletContext.Provider value={wallet}>
      {children}
    </WalletContext.Provider>
  );
}

/**
 * Hook to access wallet context
 * Must be used within WalletProvider
 */
export function useWalletContext() {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWalletContext must be used within WalletProvider');
  }
  return context;
}
