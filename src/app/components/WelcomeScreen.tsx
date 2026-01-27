import { Screen } from '@/app/App';

interface WelcomeScreenProps {
  navigate: (screen: Screen) => void;
}

export default function WelcomeScreen({ navigate }: WelcomeScreenProps) {
  return (
    <div className="h-full flex flex-col items-center justify-between px-6 pt-20 pb-12 bg-gradient-to-b from-background to-blue-50">
      {/* Logo */}
      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="w-24 h-24 rounded-3xl flex items-center justify-center mb-6 shadow-lg bg-gradient-to-br from-cyan-500 to-purple-600">
          <span className="text-white font-bold text-6xl">W</span>
        </div>
        
        <h1 className="text-4xl font-bold text-foreground mb-3 text-center">Way‑To‑Do</h1>
        
        <p className="text-2xl text-foreground font-semibold mb-8 text-center leading-tight">
          Create. Collaborate. Execute.
        </p>

        {/* CTA */}
        <button
          onClick={() => navigate('signin')}
          className="w-full bg-blue-600 text-white py-4 rounded-2xl font-semibold text-base shadow-lg active:scale-98 transition-transform"
        >
          Get Started
        </button>
      </div>
    </div>
  );
}