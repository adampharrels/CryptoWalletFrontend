# Crypto Wallet

React/TypeScript crypto wallet demo following NexStox colour scheme. Shows balances for BTC/ETH/USDT/SOL/ADA with withdrawal functionality.

## Structure
```
src/
├── hooks/useWallet.ts     # State management
├── components/WalletPage.tsx  # Main UI
├── types/index.ts         # TypeScript definitions  
└── lib/constants.ts       # Mock data
```

## Implementation
- React Context for state (no external deps)
- Mock data hardcoded in constants.ts
- Form validation for withdrawals (balance checks, network fees)
- shadcn/ui + Tailwind for components

Run `npm install && npm run dev`
