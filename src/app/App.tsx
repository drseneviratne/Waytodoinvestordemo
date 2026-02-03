import { Screen } from '@/app/App';

interface WelcomeScreenProps {
  navigate: (screen: Screen) => void;
}

export default function WelcomeScreen({ navigate }: WelcomeScreenProps) {
  return (
    <div 
      className="h-full flex flex-col items-center justify-between px-6 pt-20 pb-12"
      style={{
        background: 'linear-gradient(180deg, #ffffff 0%, #eff6ff 100%)'
      }}
    >
      {/* Logo */}
      <div className="flex-1 flex flex-col items-center justify-center">
        <div 
          className="w-24 h-24 rounded-3xl flex items-center justify-center mb-6 shadow-lg"
          style={{
            background: 'linear-gradient(135deg, #06b6d4 0%, #8b5cf6 100%)'
          }}
        >
          <span className="text-white font-bold text-6xl">W</span>
        </div>
        
        <h1 
          className="text-4xl font-bold mb-3 text-center"
          style={{ color: '#0f0f0f' }}
        >
          Way‑To‑Do
        </h1>
        
        <p 
          className="text-2xl font-semibold mb-8 text-center leading-tight"
          style={{ color: '#0f0f0f' }}
        >
          Create. Collaborate. Execute.
        </p>

        {/* CTA */}
        <button
          onClick={() => navigate('signin')}
          className="w-full py-4 rounded-2xl font-semibold text-base shadow-lg active:scale-98 transition-transform"
          style={{
            backgroundColor: '#2563eb',
            color: 'white'
          }}
        >
          Get Started
        </button>
      </div>
    </div>
  );
}
