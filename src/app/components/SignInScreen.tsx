import { useState } from 'react';
import { Screen, AppState } from '@/app/App';
import { ArrowLeft } from 'lucide-react';

interface SignInScreenProps {
  navigate: (screen: Screen) => void;
  updateState: (updates: Partial<AppState>) => void;
}

export default function SignInScreen({ navigate, updateState }: SignInScreenProps) {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = () => {
    if (!email) return;
    
    setIsLoading(true);
    
    // Simulate sign in
    setTimeout(() => {
      updateState({ isLoggedIn: true, currentScreen: 'home', activeTab: 'home' });
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="h-full flex flex-col px-6 pt-16 pb-8 bg-background">
      {/* Header */}
      <button
        onClick={() => navigate('welcome')}
        className="w-10 h-10 flex items-center justify-center -ml-2 mb-8"
      >
        <ArrowLeft className="w-6 h-6 text-foreground" />
      </button>

      <div className="flex-1">
        <h1 className="text-3xl font-bold text-foreground mb-2">Sign in</h1>
        <p className="text-base text-muted-foreground mb-8">
          Enter your email to continue
        </p>

        {/* Email input */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-foreground mb-2">
            Email address
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@company.com"
            className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
          />
        </div>

        {/* Demo notice */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
          <p className="text-sm text-blue-900">
            <span className="font-semibold">Investor Demo:</span> This is a simulated login. No authentication is performed.
          </p>
        </div>
      </div>

      {/* Continue button */}
      <button
        onClick={handleSignIn}
        disabled={!email || isLoading}
        className="w-full bg-blue-600 text-white py-4 rounded-2xl font-semibold text-base shadow-lg disabled:opacity-50 disabled:cursor-not-allowed active:scale-98 transition-transform"
      >
        {isLoading ? 'Signing in...' : 'Continue'}
      </button>
    </div>
  );
}