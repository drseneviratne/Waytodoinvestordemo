import { Screen, AppState } from '@/app/App';
import { Settings, TrendingUp, CheckCircle2, Clock } from 'lucide-react';

interface HomeScreenProps {
  navigate: (screen: Screen) => void;
  state: AppState;
}

export default function HomeScreen({ navigate, state }: HomeScreenProps) {
  return (
    <div className="h-full flex flex-col bg-background overflow-y-auto pb-20">
      {/* Header */}
      <div className="px-6 pt-16 pb-6 bg-gradient-to-b from-blue-50 to-background">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Good morning</h1>
            <p className="text-sm text-muted-foreground">Let's get things done</p>
          </div>
          <button
            onClick={() => navigate('settings')}
            className="w-10 h-10 flex items-center justify-center bg-card rounded-full shadow-sm"
          >
            <Settings className="w-5 h-5 text-foreground" />
          </button>
        </div>

        {/* Balance card */}
        <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-5 shadow-lg">
          <p className="text-blue-100 text-sm mb-1">Available balance</p>
          <p className="text-white text-3xl font-bold mb-4">
            £{state.walletBalance.toLocaleString()}
          </p>
          <div className="flex items-center gap-2 text-blue-100 text-sm">
            <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <circle cx="6" cy="6" r="5" stroke="white" strokeWidth="1.5"/>
              </svg>
            </div>
            <span>USDC on BASE</span>
          </div>
        </div>
      </div>

      {/* Activity */}
      <div className="px-6 py-6">
        <h2 className="text-lg font-semibold text-foreground mb-4">Activity</h2>
        
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-muted rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="w-4 h-4 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Pending</span>
            </div>
            <p className="text-2xl font-bold text-foreground">
              {state.taskStatus === 'NeedsApproval' ? 1 : 0}
            </p>
          </div>

          <div className="bg-muted rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4 text-green-600" />
              <span className="text-xs text-muted-foreground">Completed</span>
            </div>
            <p className="text-2xl font-bold text-foreground">
              {state.taskStatus === 'Executed' ? 1 : 0}
            </p>
          </div>
        </div>
      </div>

      {/* CTA */}
      {!state.taskTitle && (
        <div className="px-6 pb-6">
          <button
            onClick={() => navigate('tasks')}
            className="w-full bg-blue-600 text-white py-4 rounded-2xl font-semibold shadow-lg active:scale-98 transition-transform"
          >
            Create your first task
          </button>
        </div>
      )}
    </div>
  );
}