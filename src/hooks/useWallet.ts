/**
 * Custom hook for wallet state management
 * Handles currency balances, withdrawals, and transaction tracking
 */

import { useState, useCallback } from 'react';
import type { Currency, Transaction, WithdrawalPayload } from '../types';
import { INITIAL_CURRENCIES } from '../lib/constants';

export function useWallet() {
  const [currencies, setCurrencies] = useState<Currency[]>(INITIAL_CURRENCIES);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  /**
   * Process a withdrawal: deduct from available balance and record transaction
   */
  const withdraw = useCallback((payload: WithdrawalPayload) => {
    const { currencyId, amount, address, network } = payload;

    setCurrencies((prev) =>
      prev.map((currency) =>
        currency.id === currencyId
          ? {
              ...currency,
              available: Math.max(0, currency.available - amount),
            }
          : currency
      )
    );

    const transaction: Transaction = {
      id: `tx_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      type: 'withdrawal',
      currencyId,
      amount,
      address,
      network,
      status: 'completed',
      timestamp: new Date(),
    };

    setTransactions((prev) => [transaction, ...prev]);

    return transaction;
  }, []);

  /**
   * Get total portfolio value in USD
   */
  const getTotalPortfolioValue = useCallback(() => {
    return currencies.reduce((total, currency) => {
      const currencyTotal = (currency.available + currency.locked) * currency.priceUSD;
      return total + currencyTotal;
    }, 0);
  }, [currencies]);

  /**
   * Get total available balance in USD
   */
  const getTotalAvailableValue = useCallback(() => {
    return currencies.reduce((total, currency) => {
      return total + currency.available * currency.priceUSD;
    }, 0);
  }, [currencies]);

  /**
   * Get total locked balance in USD
   */
  const getTotalLockedValue = useCallback(() => {
    return currencies.reduce((total, currency) => {
      return total + currency.locked * currency.priceUSD;
    }, 0);
  }, [currencies]);

  /**
   * Get a specific currency by ID
   */
  const getCurrency = useCallback(
    (id: string) => currencies.find((c) => c.id === id),
    [currencies]
  );

  return {
    currencies,
    transactions,
    withdraw,
    getTotalPortfolioValue,
    getTotalAvailableValue,
    getTotalLockedValue,
    getCurrency,
  };
}
