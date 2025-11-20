/**
 * Mock currency data for development and testing
 */

import type { Currency } from '../types';

export const INITIAL_CURRENCIES: Currency[] = [
  {
    id: 'btc',
    symbol: 'BTC',
    name: 'Bitcoin',
    icon: '₿',
    available: 0.58234156,
    locked: 0.01234567,
    networks: [
      { id: 'btc', name: 'Bitcoin Network', fee: 0.0005, minAmount: 0.001 },
      { id: 'lightning', name: 'Lightning Network', fee: 0.00001, minAmount: 0.0001 },
    ],
    priceUSD: 64234.5,
  },
  {
    id: 'eth',
    symbol: 'ETH',
    name: 'Ethereum',
    icon: 'Ξ',
    available: 5.42318765,
    locked: 0.5,
    networks: [
      { id: 'erc20', name: 'Ethereum (ERC20)', fee: 0.005, minAmount: 0.01 },
      { id: 'arbitrum', name: 'Arbitrum One', fee: 0.0001, minAmount: 0.001 },
      { id: 'optimism', name: 'Optimism', fee: 0.0001, minAmount: 0.001 },
    ],
    priceUSD: 3421.8,
  },
  {
    id: 'usdt',
    symbol: 'USDT',
    name: 'Tether',
    icon: '₮',
    available: 12450.5,
    locked: 500.0,
    networks: [
      { id: 'erc20', name: 'Ethereum (ERC20)', fee: 5.0, minAmount: 10 },
      { id: 'trc20', name: 'Tron (TRC20)', fee: 1.0, minAmount: 10 },
      { id: 'bep20', name: 'BNB Smart Chain (BEP20)', fee: 0.5, minAmount: 10 },
    ],
    priceUSD: 1.0,
  },
  {
    id: 'sol',
    symbol: 'SOL',
    name: 'Solana',
    icon: '◎',
    available: 28.75432101,
    locked: 5.0,
    networks: [
      { id: 'solana', name: 'Solana Network', fee: 0.000005, minAmount: 0.01 },
    ],
    priceUSD: 142.67,
  },
  {
    id: 'ada',
    symbol: 'ADA',
    name: 'Cardano',
    icon: '₳',
    available: 1234.56789,
    locked: 100.0,
    networks: [
      { id: 'cardano', name: 'Cardano Network', fee: 1.0, minAmount: 10 },
    ],
    priceUSD: 0.5234,
  },
];
