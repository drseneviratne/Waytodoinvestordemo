import { useState, useEffect } from 'react';
import WelcomeScreen from '@/app/components/WelcomeScreen';
import SignInScreen from '@/app/components/SignInScreen';
import HomeScreen from '@/app/components/HomeScreen';
import TasksScreen from '@/app/components/TasksScreen';
import NewTaskScreen from '@/app/components/NewTaskScreen';
import TaskDetailScreen from '@/app/components/TaskDetailScreen';
import ExecuteScreen from '@/app/components/ExecuteScreen';
import CommunityScreen from '@/app/components/CommunityScreen';
import CreateGroupScreen from '@/app/components/CreateGroupScreen';
import GroupChatScreen from '@/app/components/GroupChatScreen';
import WalletScreen from '@/app/components/WalletScreen';
import SettingsScreen from '@/app/components/SettingsScreen';
import LLMHubScreen from '@/app/components/LLMHubScreen';
import BottomTabBar from '@/app/components/BottomTabBar';
import DemoTooltip from '@/app/components/DemoTooltip';

export type Screen = 
  | 'welcome' 
  | 'signin' 
  | 'home' 
  | 'tasks' 
  | 'new-task' 
  | 'task-detail' 
  | 'execute'
  | 'community' 
  | 'create-group' 
  | 'group-chat' 
  | 'wallet' 
  | 'settings'
  | 'llm-hub';

export type TaskMode = 'Manual' | 'Approval' | 'Autonomous';
export type TaskStatus = 'Draft' | 'Researching' | 'NeedsApproval' | 'Approved' | 'Executed' | 'Rejected';

export interface AppState {
  isLoggedIn: boolean;
  currentScreen: Screen;
  activeTab: 'home' | 'tasks' | 'community' | 'wallet';
  selectedMode: TaskMode;
  taskStatus: TaskStatus;
  walletBalance: number;
  purchaseAmount: number;
  groupCreated: boolean;
  taskTitle: string;
  approvedBy: string[];
  executionTime: string;
  showTooltip: string | null;
  theme: 'light' | 'dark';
}

export default function App() {
  const [state, setState] = useState<AppState>({
    isLoggedIn: false,
    currentScreen: 'welcome',
    activeTab: 'home',
    selectedMode: 'Approval',
    taskStatus: 'Draft',
    walletBalance: 5000,
    purchaseAmount: 120,
    groupCreated: false,
    taskTitle: '',
    approvedBy: [],
    executionTime: '',
    showTooltip: null,
    theme: 'light',
  });

  const navigate = (screen: Screen) => {
    setState(prev => ({ ...prev, currentScreen: screen }));
  };

  const setTab = (tab: 'home' | 'tasks' | 'community' | 'wallet') => {
    setState(prev => ({ ...prev, activeTab: tab }));
    const screenMap = {
      home: 'home' as Screen,
      tasks: 'tasks' as Screen,
      community: 'community' as Screen,
      wallet: 'wallet' as Screen,
    };
    navigate(screenMap[tab]);
  };

  const updateState = (updates: Partial<AppState>) => {
    setState(prev => ({ ...prev, ...updates }));
  };

  // Manage dark mode class on document element
  useEffect(() => {
    if (state.theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [state.theme]);

  const renderScreen = () => {
    switch (state.currentScreen) {
      case 'welcome':
        return <WelcomeScreen navigate={navigate} />;
      case 'signin':
        return <SignInScreen navigate={navigate} updateState={updateState} />;
      case 'home':
        return <HomeScreen navigate={navigate} state={state} />;
      case 'tasks':
        return <TasksScreen navigate={navigate} state={state} />;
      case 'new-task':
        return <NewTaskScreen navigate={navigate} state={state} updateState={updateState} />;
      case 'task-detail':
        return <TaskDetailScreen navigate={navigate} state={state} updateState={updateState} />;
      case 'execute':
        return <ExecuteScreen navigate={navigate} state={state} updateState={updateState} />;
      case 'community':
        return <CommunityScreen navigate={navigate} state={state} />;
      case 'create-group':
        return <CreateGroupScreen navigate={navigate} state={state} updateState={updateState} />;
      case 'group-chat':
        return <GroupChatScreen navigate={navigate} state={state} />;
      case 'wallet':
        return <WalletScreen navigate={navigate} state={state} />;
      case 'settings':
        return <SettingsScreen navigate={navigate} state={state} updateState={updateState} />;
      case 'llm-hub':
        return <LLMHubScreen navigate={navigate} />;
      default:
        return <WelcomeScreen navigate={navigate} />;
    }
  };

  const showTabBar = state.isLoggedIn && !['welcome', 'signin', 'new-task', 'task-detail', 'execute', 'create-group', 'group-chat', 'settings', 'llm-hub'].includes(state.currentScreen);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      {/* iPhone 14/15 frame */}
      <div className="relative w-[390px] h-[844px] bg-background rounded-[3rem] shadow-2xl overflow-hidden border-[14px] border-black">
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[150px] h-[30px] bg-black rounded-b-3xl z-50" />
        
        {/* Screen content */}
        <div className="h-full bg-background overflow-hidden">
          {renderScreen()}
        </div>

        {/* Bottom tab bar */}
        {showTabBar && <BottomTabBar activeTab={state.activeTab} setTab={setTab} />}
      </div>

      {/* Demo tooltips */}
      {state.showTooltip && (
        <DemoTooltip
          message={state.showTooltip}
          onDismiss={() => updateState({ showTooltip: null })}
        />
      )}
    </div>
  );
}