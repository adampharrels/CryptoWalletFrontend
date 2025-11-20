import { WalletPage } from "./components/WalletPage";
import { Toaster } from "./components/ui/sonner";
import { WalletProvider } from "./hooks/WalletContext";

export default function App() {
  return (
    <WalletProvider>
      <WalletPage />
      <Toaster />
    </WalletProvider>
  );
}
