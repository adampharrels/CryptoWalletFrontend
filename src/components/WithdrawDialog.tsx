import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { AlertCircle, Info } from "lucide-react";
import { Alert, AlertDescription } from "./ui/alert";
import type { Currency } from "../types";

interface WithdrawDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currency: Currency | null;
  onWithdraw: (amount: number, address: string, network: string) => void;
}

export function WithdrawDialog({
  open,
  onOpenChange,
  currency,
  onWithdraw,
}: WithdrawDialogProps) {
  const [amount, setAmount] = useState("");
  const [address, setAddress] = useState("");
  const [selectedNetwork, setSelectedNetwork] = useState<string>("");
  const [error, setError] = useState<string>("");

  const network = currency?.networks.find((n) => n.id === selectedNetwork);
  const amountNum = parseFloat(amount) || 0;
  const receiveAmount = network ? Math.max(0, amountNum - network.fee) : 0;

  const handleWithdraw = () => {
    setError("");

    if (!currency) return;

    if (!address.trim()) {
      setError("Please enter a withdrawal address");
      return;
    }

    if (!selectedNetwork) {
      setError("Please select a network");
      return;
    }

    if (!amount || amountNum <= 0) {
      setError("Please enter a valid amount");
      return;
    }

    if (network && amountNum < network.minAmount) {
      setError(`Minimum withdrawal amount is ${network.minAmount} ${currency.symbol}`);
      return;
    }

    if (amountNum > currency.available) {
      setError(`Insufficient balance. Available: ${currency.available} ${currency.symbol}`);
      return;
    }

    if (network && receiveAmount <= 0) {
      setError("Amount is too small after fees");
      return;
    }

    onWithdraw(amountNum, address, selectedNetwork);
    
    // Reset form
    setAmount("");
    setAddress("");
    setSelectedNetwork("");
    setError("");
    onOpenChange(false);
  };

  const handleMaxClick = () => {
    if (currency) {
      setAmount(currency.available.toString());
    }
  };

  if (!currency) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Withdraw {currency.symbol}</DialogTitle>
          <DialogDescription>
            Withdraw {currency.name} to your external wallet
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Network Selection */}
          <div className="space-y-2">
            <Label>Network</Label>
            <Select value={selectedNetwork} onValueChange={setSelectedNetwork}>
              <SelectTrigger>
                <SelectValue placeholder="Select network" />
              </SelectTrigger>
              <SelectContent>
                {currency.networks.map((network) => (
                  <SelectItem key={network.id} value={network.id}>
                    {network.name} (Fee: {network.fee} {currency.symbol})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">
              Make sure the network matches your receiving address
            </p>
          </div>

          {/* Address Input */}
          <div className="space-y-2">
            <Label>Withdrawal Address</Label>
            <Input
              placeholder={`Enter ${currency.symbol} address`}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <p className="text-xs text-muted-foreground">
              Double-check the address to avoid loss of funds
            </p>
          </div>

          {/* Amount Input */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Amount</Label>
              <span className="text-xs text-muted-foreground">
                Available: {currency.available.toFixed(8)} {currency.symbol}
              </span>
            </div>
            <div className="relative">
              <Input
                type="number"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                step="any"
              />
              <Button
                size="sm"
                variant="ghost"
                className="absolute right-1 top-1/2 -translate-y-1/2 h-7 px-2"
                onClick={handleMaxClick}
              >
                MAX
              </Button>
            </div>
            {network && (
              <p className="text-xs text-muted-foreground">
                Minimum: {network.minAmount} {currency.symbol}
              </p>
            )}
          </div>

          {/* Fee and Receive Amount */}
          {network && amountNum > 0 && (
            <div className="bg-muted/50 rounded-lg p-4 space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Network Fee</span>
                <span className="text-foreground">
                  {network.fee} {currency.symbol}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm pt-2 border-t border-border">
                <span className="text-muted-foreground">You will receive</span>
                <span className="text-foreground">
                  {receiveAmount.toFixed(8)} {currency.symbol}
                </span>
              </div>
            </div>
          )}

          {/* Warning */}
          <Alert>
            <Info className="size-4" />
            <AlertDescription className="text-sm">
              Withdrawals are irreversible. Please verify all details before confirming.
            </AlertDescription>
          </Alert>

          {/* Error Message */}
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="size-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </div>

        <div className="flex gap-3">
          <Button
            variant="outline"
            className="flex-1"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button className="flex-1" onClick={handleWithdraw}>
            Confirm Withdrawal
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
