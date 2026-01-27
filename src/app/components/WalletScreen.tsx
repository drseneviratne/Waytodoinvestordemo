import { Screen, AppState } from '@/app/App';
import { ArrowDownLeft, ArrowUpRight, Settings } from 'lucide-react';

interface WalletScreenProps {
  navigate: (screen: Screen) => void;
  state: AppState;
}

export default function WalletScreen({ navigate, state }: WalletScreenProps) {
  const transactions = [];

  if (state.taskStatus === 'Executed' && state.taskTitle) {
    transactions.push({
      id: 1,
      type: 'payment',
      description: state.taskTitle,
      amount: -state.purchaseAmount,
      method: 'x402 settlement (USDC on BASE)',
      time: state.executionTime || '10:35',
      status: 'Completed',
    });
  }

  return (
    <div className="h-full flex flex-col bg-background overflow-y-auto pb-20">
      {/* Header */}
      <div className="px-6 pt-16 pb-6 bg-gradient-to-b from-blue-50 to-background">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-foreground">Wallet</h1>
          <button
            onClick={() => navigate('settings')}
            className="w-10 h-10 flex items-center justify-center bg-card rounded-full shadow-sm"
          >
            <Settings className="w-5 h-5 text-foreground" />
          </button>
        </div>

        {/* Balance card */}
        <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-6 shadow-lg">
          <p className="text-blue-100 text-sm mb-1">Total balance</p>
          <p className="text-white text-4xl font-bold mb-6">
            £{state.walletBalance.toLocaleString()}
          </p>
          
          <div className="flex gap-3">
            <button className="flex-1 bg-white text-blue-600 py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2">
              <ArrowDownLeft className="w-4 h-4" />
              Deposit
            </button>
            <button className="flex-1 bg-white/20 text-white py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2">
              <ArrowUpRight className="w-4 h-4" />
              Send
            </button>
          </div>
        </div>
      </div>

      {/* Quick stats */}
      <div className="px-6 pb-6">
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-muted rounded-xl p-4">
            <p className="text-xs text-muted-foreground mb-1">This month</p>
            <p className="text-xl font-bold text-foreground">
              £{state.taskStatus === 'Executed' ? state.purchaseAmount : 0}
            </p>
            <p className="text-xs text-muted-foreground mt-1">Spent</p>
          </div>
          <div className="bg-muted rounded-xl p-4">
            <p className="text-xs text-muted-foreground mb-1">Settlement</p>
            <p className="text-xl font-bold text-foreground">~2s</p>
            <p className="text-xs text-muted-foreground mt-1">Average time</p>
          </div>
        </div>
      </div>

      {/* Transactions */}
      <div className="px-6 pb-6 flex-1">
        <h2 className="text-lg font-semibold text-foreground mb-4">Recent transactions</h2>
        
        {transactions.length > 0 ? (
          <div className="space-y-3">
            {transactions.map((tx) => (
              <div key={tx.id} className="bg-card border border-border rounded-2xl p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground mb-1">{tx.description}</h3>
                    <p className="text-xs text-muted-foreground">{tx.method}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-red-600">-£{Math.abs(tx.amount)}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-border">
                  <span className="text-xs text-muted-foreground">{tx.time}</span>
                  <span className="text-xs font-medium text-green-600">{tx.status}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <path d="M8 12h16M8 20h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-muted-foreground"/>
              </svg>
            </div>
            <h3 className="font-semibold text-foreground mb-1">No transactions yet</h3>
            <p className="text-sm text-muted-foreground text-center">
              Your transaction history will appear here
            </p>
          </div>
        )}
      </div>

      {/* Payment methods */}
      <div className="px-6 pb-6 border-t border-border pt-6">
        <h2 className="text-lg font-semibold text-foreground mb-4">Payment method</h2>
        <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl p-5 text-white">
          <p className="text-sm text-gray-300 mb-1">USDC Stablecoin</p>
          <p className="text-2xl font-bold mb-4">•••• {state.walletBalance.toString().slice(-4)}</p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <circle cx="8" cy="8" r="6" stroke="white" strokeWidth="1.5"/>
                </svg>
              </div>
              <span className="text-sm">BASE Network</span>
            </div>
            <span className="text-xs text-gray-300">~£0.02 fees</span>
          </div>
        </div>
      </div>
    </div>
  );
}