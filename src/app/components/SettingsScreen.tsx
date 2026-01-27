import { Screen } from '@/app/App';
import { AppState } from '@/app/App';
import { ArrowLeft, Shield, DollarSign, Zap, Moon } from 'lucide-react';
import { Switch } from '@/app/components/ui/switch';

interface SettingsScreenProps {
  navigate: (screen: Screen) => void;
  state: AppState;
  updateState: (updates: Partial<AppState>) => void;
}

export default function SettingsScreen({ navigate, state, updateState }: SettingsScreenProps) {
  return (
    <div className="h-full flex flex-col bg-background overflow-y-auto">
      {/* Header */}
      <div className="px-6 pt-16 pb-4 border-b border-border sticky top-0 bg-background z-10">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('home')}
            className="w-10 h-10 flex items-center justify-center -ml-2"
          >
            <ArrowLeft className="w-6 h-6 text-foreground" />
          </button>
          <h1 className="text-xl font-bold text-foreground">Settings</h1>
        </div>
      </div>

      <div className="flex-1 px-6 pt-6 pb-6">
        {/* Spending limits */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <DollarSign className="w-5 h-5 text-foreground" />
            <h2 className="text-lg font-semibold text-foreground">Spending limits</h2>
          </div>
          
          <div className="space-y-3">
            <div className="bg-muted rounded-xl p-4">
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium text-foreground">Daily limit</span>
                <span className="font-bold text-foreground">£50</span>
              </div>
              <div className="w-full bg-border rounded-full h-2 mt-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: '0%' }} />
              </div>
              <p className="text-xs text-muted-foreground mt-1">£0 / £50 used today</p>
            </div>

            <div className="bg-muted rounded-xl p-4">
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium text-foreground">Monthly limit</span>
                <span className="font-bold text-foreground">£500</span>
              </div>
              <div className="w-full bg-border rounded-full h-2 mt-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: '0%' }} />
              </div>
              <p className="text-xs text-muted-foreground mt-1">£0 / £500 used this month</p>
            </div>
          </div>
        </div>

        {/* Graduated autonomy */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Zap className="w-5 h-5 text-foreground" />
            <h2 className="text-lg font-semibold text-foreground">Graduated autonomy</h2>
          </div>
          
          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5">
            <h3 className="font-semibold text-blue-900 mb-3">Trust ladder explained</h3>
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-bold text-orange-700">1</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 text-sm">Manual</h4>
                  <p className="text-xs text-gray-700 mt-0.5">
                    AI researches, you execute manually
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-bold text-blue-700">2</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 text-sm">Approval</h4>
                  <p className="text-xs text-gray-700 mt-0.5">
                    Team approves, AI executes with audit trail
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-bold text-green-700">3</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 text-sm">Autonomous</h4>
                  <p className="text-xs text-gray-700 mt-0.5">
                    AI executes within preset limits automatically
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-blue-200">
              <p className="text-xs text-blue-800">
                Build trust gradually. Start with approvals, move to autonomous as confidence grows.
              </p>
            </div>
          </div>
        </div>

        {/* Security */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Shield className="w-5 h-5 text-foreground" />
            <h2 className="text-lg font-semibold text-foreground">Security features</h2>
          </div>
          
          <div className="space-y-3">
            <div className="bg-card border border-border rounded-xl p-4 flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-foreground text-sm">Immutable audit trail</h3>
                <p className="text-xs text-muted-foreground mt-0.5">All decisions cryptographically secured</p>
              </div>
              <div className="w-10 h-6 bg-green-600 rounded-full flex items-center px-1">
                <div className="w-4 h-4 bg-white rounded-full ml-auto" />
              </div>
            </div>

            <div className="bg-card border border-border rounded-xl p-4 flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-foreground text-sm">48-hour dispute window</h3>
                <p className="text-xs text-muted-foreground mt-0.5">Challenge approvals within 2 days</p>
              </div>
              <div className="w-10 h-6 bg-green-600 rounded-full flex items-center px-1">
                <div className="w-4 h-4 bg-white rounded-full ml-auto" />
              </div>
            </div>

            <div className="bg-card border border-border rounded-xl p-4 flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-foreground text-sm">Multi-signature approval</h3>
                <p className="text-xs text-muted-foreground mt-0.5">Require multiple team confirmations</p>
              </div>
              <div className="w-10 h-6 bg-gray-200 rounded-full flex items-center px-1">
                <div className="w-4 h-4 bg-white rounded-full" />
              </div>
            </div>
          </div>
        </div>

        {/* Settlement info */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-5 text-white">
          <h3 className="font-semibold mb-2">x402 Settlement</h3>
          <p className="text-sm text-blue-100 mb-4">
            Lightning-fast stablecoin payments on BASE network with near-zero fees
          </p>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-blue-100 mb-1">Settlement time</p>
              <p className="text-xl font-bold">~2 seconds</p>
            </div>
            <div>
              <p className="text-xs text-blue-100 mb-1">Average fee</p>
              <p className="text-xl font-bold">£0.02</p>
            </div>
          </div>
        </div>

        {/* Theme toggle */}
        <div className="mt-8">
          <div className="flex items-center gap-2 mb-4">
            <Moon className="w-5 h-5 text-foreground" />
            <h2 className="text-lg font-semibold text-foreground">Theme</h2>
          </div>
          
          <div className="bg-card border border-border rounded-xl p-4 flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-foreground text-sm">Dark mode</h3>
              <p className="text-xs text-muted-foreground mt-0.5">Switch between light and dark theme</p>
            </div>
            <Switch
              checked={state.theme === 'dark'}
              onCheckedChange={(checked) => updateState({ theme: checked ? 'dark' : 'light' })}
            />
          </div>
        </div>
      </div>
    </div>
  );
}