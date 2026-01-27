import { Home, CheckSquare, Users, Wallet } from 'lucide-react';

interface BottomTabBarProps {
  activeTab: 'home' | 'tasks' | 'community' | 'wallet';
  setTab: (tab: 'home' | 'tasks' | 'community' | 'wallet') => void;
}

export default function BottomTabBar({ activeTab, setTab }: BottomTabBarProps) {
  const tabs = [
    { id: 'home' as const, icon: Home, label: 'Home' },
    { id: 'tasks' as const, icon: CheckSquare, label: 'Tasks' },
    { id: 'community' as const, icon: Users, label: 'Community+' },
    { id: 'wallet' as const, icon: Wallet, label: 'Wallet' },
  ];

  return (
    <div className="absolute bottom-0 left-0 right-0 bg-background border-t border-border px-4 py-2 pb-6">
      <div className="flex items-center justify-around">
        {tabs.map(({ id, icon: Icon, label }) => {
          const isActive = activeTab === id;
          return (
            <button
              key={id}
              onClick={() => setTab(id)}
              className="flex flex-col items-center gap-1 py-2 px-4 transition-colors"
            >
              <Icon
                className={`w-6 h-6 ${
                  isActive ? 'text-blue-600' : 'text-muted-foreground'
                }`}
              />
              <span
                className={`text-xs font-medium ${
                  isActive ? 'text-blue-600' : 'text-muted-foreground'
                }`}
              >
                {label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}