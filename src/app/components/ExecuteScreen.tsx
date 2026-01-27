import { useState, useEffect } from 'react';
import { Screen, AppState } from '@/app/App';
import { CheckCircle2 } from 'lucide-react';

interface ExecuteScreenProps {
  navigate: (screen: Screen) => void;
  state: AppState;
  updateState: (updates: Partial<AppState>) => void;
}

export default function ExecuteScreen({ navigate, state, updateState }: ExecuteScreenProps) {
  const [status, setStatus] = useState<'processing' | 'success'>('processing');

  useEffect(() => {
    // Simulate settlement
    setTimeout(() => {
      setStatus('success');
      const now = new Date();
      const timeStr = now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
      
      updateState({
        taskStatus: 'Executed',
        walletBalance: state.walletBalance - state.purchaseAmount,
        executionTime: timeStr,
        showTooltip: 'Simulated x402 settlement on BASE network',
      });

      setTimeout(() => {
        updateState({ showTooltip: null });
      }, 3000);
    }, 2000);
  }, []);

  return (
    <div className="h-full flex flex-col items-center justify-center px-6 bg-background">
      {status === 'processing' ? (
        <div className="flex flex-col items-center">
          <div className="w-20 h-20 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-6" />
          <h2 className="text-2xl font-bold text-foreground mb-2">Processing payment</h2>
          <p className="text-base text-muted-foreground text-center mb-8">
            Executing via x402 stablecoin settlement
          </p>
          
          <div className="w-full max-w-sm space-y-3">
            <div className="flex items-center gap-3 text-sm">
              <div className="w-2 h-2 bg-green-600 rounded-full animate-pulse" />
              <span className="text-foreground">Initiating USDC transfer on BASE</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse" />
              <span className="text-foreground">Smart contract execution</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <div className="w-2 h-2 bg-gray-300 rounded-full" />
              <span className="text-muted-foreground">Awaiting confirmation</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center text-center">
          <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center mb-6">
            <CheckCircle2 className="w-12 h-12 text-white" />
          </div>
          
          <h2 className="text-2xl font-bold text-foreground mb-2">Payment settled!</h2>
          <p className="text-base text-muted-foreground mb-8">
            Transaction completed in ~2 seconds
          </p>

          {/* Settlement details */}
          <div className="w-full max-w-sm bg-muted rounded-2xl p-5 mb-8">
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm text-muted-foreground">Amount</span>
              <span className="font-semibold text-foreground">£{state.purchaseAmount}</span>
            </div>
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm text-muted-foreground">Method</span>
              <span className="font-semibold text-foreground">USDC (BASE)</span>
            </div>
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm text-muted-foreground">Settlement time</span>
              <span className="font-semibold text-foreground">~2 seconds</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Fees</span>
              <span className="font-semibold text-green-600">£0.02</span>
            </div>
          </div>

          {/* New balance */}
          <div className="w-full max-w-sm bg-blue-600 rounded-2xl p-5 mb-8">
            <p className="text-blue-100 text-sm mb-1">New balance</p>
            <p className="text-white text-3xl font-bold">
              £{(state.walletBalance - state.purchaseAmount).toLocaleString()}
            </p>
          </div>

          <div className="space-y-3 w-full max-w-sm">
            <button
              onClick={() => navigate('wallet')}
              className="w-full bg-blue-600 text-white py-4 rounded-2xl font-semibold shadow-lg active:scale-98 transition-transform"
            >
              View in wallet
            </button>
            <button
              onClick={() => navigate('tasks')}
              className="w-full bg-card text-foreground py-4 rounded-2xl font-semibold border border-border active:scale-98 transition-transform"
            >
              Back to tasks
            </button>
          </div>
        </div>
      )}
    </div>
  );
}