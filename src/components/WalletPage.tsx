import { useState } from 'react';
import { CurrencyCard } from './CurrencyCard';
import { WithdrawDialog } from './WithdrawDialog';
import { Wallet, TrendingUp, Eye, EyeOff } from 'lucide-react';
import { Button } from './ui/button';
import { toast } from 'sonner';
import { useWallet } from '../hooks/useWallet';
import type { Currency } from '../types';

const cryptoColors = {
  btc: 'linear-gradient(to bottom right, #f59e0b, #d97706)',
  eth: 'linear-gradient(to bottom right, #8b5cf6, #6d28d9)',
  usdt: 'linear-gradient(to bottom right, #06b6d4, #0891b2)',
  sol: 'linear-gradient(to bottom right, #06b6d4, #0d9488)',
  ada: 'linear-gradient(to bottom right, #6366f1, #4338ca)',
};

export function WalletPage() {
  const [hideBalances, setHideBalances] = useState(false);
  const [withdrawDialogOpen, setWithdrawDialogOpen] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState<Currency | null>(null);

  const { currencies, withdraw, getTotalPortfolioValue, getTotalAvailableValue, getTotalLockedValue } = useWallet();

  const handleOpenWithdraw = (currency: Currency) => {
    setSelectedCurrency(currency);
    setWithdrawDialogOpen(true);
  };

  const handleWithdraw = (amount: number, address: string, network: string) => {
    if (!selectedCurrency) return;

    withdraw({
      currencyId: selectedCurrency.id,
      amount,
      address,
      network,
    });

    toast.success('Withdrawal Submitted', {
      description: `${amount} ${selectedCurrency.symbol} withdrawal has been processed successfully.`,
    });

    setWithdrawDialogOpen(false);
  };

  const totalPortfolioValue = getTotalPortfolioValue();
  const totalAvailableValue = getTotalAvailableValue();
  const totalLockedValue = getTotalLockedValue();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div 
                className="size-10 rounded-lg flex items-center justify-center text-white"
                style={{
                  background: 'linear-gradient(to bottom right, #0ea5ff, #1e3a8a)'
                }}
              >
                <Wallet className="size-6" />
              </div>
              <div>
                <h1 className="text-2xl text-foreground">Wallet</h1>
                <p className="text-sm text-muted-foreground">Manage your crypto assets</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Portfolio Overview */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div 
          className="rounded-2xl p-8 text-white mb-8"
          style={{
            background: 'linear-gradient(to right, #0466d6, #0ea5ff, #00e0ff)'
          }}
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <h2 className="text-lg">Total Portfolio Value</h2>
              <Button
                variant="ghost"
                size="sm"
                className="size-8 p-0 text-white hover:bg-white/20 hover:text-white"
                onClick={() => setHideBalances(!hideBalances)}
              >
                {hideBalances ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
              </Button>
            </div>
            <div className="inline-flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full">
              <TrendingUp className="size-4 text-green-300" />
              <span className="text-sm font-medium text-white">+12.34%</span>
            </div>
          </div>

          <div className="text-4xl mb-6">
            {hideBalances ? "••••••" : `$${totalPortfolioValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <div className="text-sm text-blue-100 mb-1">Available Balance</div>
              <div className="text-xl">
                {hideBalances ? "••••••" : `$${totalAvailableValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
              </div>
            </div>
            <div>
              <div className="text-sm text-blue-100 mb-1">Locked Balance</div>
              <div className="text-xl">
                {hideBalances ? "••••••" : `$${totalLockedValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
              </div>
            </div>
          </div>
        </div>

        {/* Currency List */}
        <div className="mb-6">
          <h2 className="text-xl text-foreground mb-4">Assets</h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currencies.map((currency) => (
            <CurrencyCard
              key={currency.id}
              symbol={currency.symbol}
              name={currency.name}
              icon={currency.icon}
              available={hideBalances ? 0 : currency.available}
              locked={hideBalances ? 0 : currency.locked}
              total={hideBalances ? 0 : currency.available + currency.locked}
              usdValue={hideBalances ? 0 : (currency.available + currency.locked) * currency.priceUSD}
              onWithdraw={() => handleOpenWithdraw(currency)}
              accentColor={cryptoColors[currency.id as keyof typeof cryptoColors]}
            />
          ))}
        </div>
      </div>

      {/* Withdraw Dialog */}
      <WithdrawDialog
        open={withdrawDialogOpen}
        onOpenChange={setWithdrawDialogOpen}
        currency={selectedCurrency}
        onWithdraw={handleWithdraw}
      />
    </div>
  );
}
