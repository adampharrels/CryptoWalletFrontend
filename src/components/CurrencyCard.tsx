import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { ArrowUpRight, Lock } from "lucide-react";

interface CurrencyCardProps {
  symbol: string;
  name: string;
  icon: string;
  available: number;
  locked: number;
  total: number;
  usdValue: number;
  onWithdraw: () => void;
  accentColor?: string;
}

export function CurrencyCard({
  symbol,
  name,
  icon,
  available,
  locked,
  total,
  usdValue,
  onWithdraw,
  accentColor = 'linear-gradient(to bottom right, #0ea5ff, #0047ab)',
}: CurrencyCardProps) {
  return (
    <Card className="p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div 
            className="size-12 rounded-full flex items-center justify-center text-white text-xl"
            style={{
              background: accentColor
            }}
          >
            {icon}
          </div>
          <div>
            <h3 className="text-foreground">{symbol}</h3>
            <p className="text-sm text-muted-foreground">{name}</p>
          </div>
        </div>
      </div>

      <div className="space-y-3 mb-4">
        <div>
          <div className="text-sm text-muted-foreground mb-1">Total Balance</div>
          <div className="text-2xl text-foreground">{total.toFixed(8)}</div>
          <div className="text-sm text-muted-foreground">
            ≈ ${usdValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 pt-3 border-t border-border">
          <div>
            <div className="text-xs text-muted-foreground mb-1">Available</div>
            <div className="text-foreground">{available.toFixed(8)}</div>
          </div>
          <div>
            <div className="text-xs text-muted-foreground mb-1 flex items-center gap-1">
              <Lock className="size-3" />
              Locked
            </div>
            <div className="text-foreground">{locked.toFixed(8)}</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <Button variant="outline" size="sm" className="w-full">
          Deposit
        </Button>
        <Button
          size="sm"
          className="w-full"
          onClick={onWithdraw}
          disabled={available <= 0}
        >
          Withdraw
          <ArrowUpRight className="ml-1 size-4" />
        </Button>
      </div>
    </Card>
  );
}
