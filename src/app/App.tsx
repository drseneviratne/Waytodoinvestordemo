import { useEffect, useState } from "react";

import WelcomeScreen from "@/app/components/WelcomeScreen";
import SignInScreen from "@/app/components/SignInScreen";
import HomeScreen from "@/app/components/HomeScreen";
import TasksScreen from "@/app/components/TasksScreen";
import NewTaskScreen from "@/app/components/NewTaskScreen";
import TaskDetailScreen from "@/app/components/TaskDetailScreen";
import ExecuteScreen from "@/app/components/ExecuteScreen";
import CommunityScreen from "@/app/components/CommunityScreen";
import CreateGroupScreen from "@/app/components/CreateGroupScreen";
import GroupChatScreen from "@/app/components/GroupChatScreen";
import WalletScreen from "@/app/components/WalletScreen";
import SettingsScreen from "@/app/components/SettingsScreen";

import BottomTabBar from "@/app/components/BottomTabBar";
import DemoTooltip from "@/app/components/DemoTooltip";

export type Screen =
  | "welcome"
  | "signin"
  | "home"
  | "tasks"
  | "new-task"
  | "task-detail"
  | "execute"
  | "community"
  | "create-group"
  | "group-chat"
  | "wallet"
  | "settings";

export type TaskMode = "Manual" | "Approval" | "Autonomous";
export type TaskStatus =
  | "Draft"
  | "Researching"
  | "NeedsApproval"
  | "Approved"
  | "Executed"
  | "Rejected";

export type ThemeMode = "light" | "dark";

export interface AppState {
  isLoggedIn: boolean;
  currentScreen: Screen;
  activeTab: "home" | "tasks" | "community" | "wallet";

  theme: ThemeMode;

  selectedMode: TaskMode;
  taskStatus: TaskStatus;

  walletBalance: number;
  purchaseAmount: number;

  groupCreated: boolean;
  taskTitle: string;

  approvedBy: string[];
  executionTime: string;

  showTooltip: string | null;
}

export default function App() {
  const [state, setState] = useState<AppState>({
    isLoggedIn: false,
    currentScreen: "welcome",
    activeTab: "home",

    theme: "light",

    selectedMode: "Approval",
    taskStatus: "Draft",

    walletBalance: 5000,
    purchaseAmount: 120,

    groupCreated: false,
    taskTitle: "",

    approvedBy: [],
    executionTime: "",

    showTooltip: null,
  });

  // Sync theme with <html> class to drive light/dark tokens.
  useEffect(() => {
    const root = document.documentElement;
    if (state.theme === "dark") root.classList.add("dark");
    else root.classList.remove("dark");
  }, [state.theme]);

  const navigate = (screen: Screen) => {
    setState((prev) => ({ ...prev, currentScreen: screen }));
  };

  const setTab = (tab: "home" | "tasks" | "community" | "wallet") => {
    const screenMap: Record<typeof tab, Screen> = {
      home: "home",
      tasks: "tasks",
      community: "community",
      wallet: "wallet",
    };

    setState((prev) => ({
      ...prev,
      activeTab: tab,
      currentScreen: screenMap[tab],
    }));
  };

  const updateState = (updates: Partial<AppState>) => {
    setState((prev) => ({ ...prev, ...updates }));
  };

  const renderScreen = () => {
    switch (state.currentScreen) {
      case "welcome":
        return <WelcomeScreen navigate={navigate} />;

      case "signin":
        return <SignInScreen navigate={navigate} updateState={updateState} />;

      case "home":
        return <HomeScreen navigate={navigate} state={state} />;

      case "tasks":
        return <TasksScreen navigate={navigate} state={state} />;

      case "new-task":
        return (
          <NewTaskScreen
            navigate={navigate}
            state={state}
            updateState={updateState}
          />
        );

      case "task-detail":
        return (
          <TaskDetailScreen
            navigate={navigate}
            state={state}
            updateState={updateState}
          />
        );

      case "execute":
        return (
          <ExecuteScreen
            navigate={navigate}
            state={state}
            updateState={updateState}
          />
        );

      case "community":
        return (
          <CommunityScreen
            navigate={navigate}
            state={state}
            updateState={updateState}
          />
        );

      case "create-group":
        return (
          <CreateGroupScreen
            navigate={navigate}
            state={state}
            updateState={updateState}
          />
        );

      case "group-chat":
        return <GroupChatScreen navigate={navigate} state={state} />;

      case "wallet":
        return <WalletScreen navigate={navigate} state={state} />;

      case "settings":
        return (
          <SettingsScreen
            navigate={navigate}
            state={state}
            updateState={updateState}
          />
        );

      default:
        return <WelcomeScreen navigate={navigate} />;
    }
  };

  const showTabBar =
    state.isLoggedIn &&
    ![
      "welcome",
      "signin",
      "new-task",
      "task-detail",
      "execute",
      "create-group",
      "group-chat",
      "settings",
    ].includes(state.currentScreen);

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-black">
      {/* Phone frame */}
      <div className="relative w-[390px] h-[844px] bg-background text-foreground overflow-hidden rounded-[48px] shadow-2xl border border-border">
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[160px] h-[30px] bg-black rounded-b-3xl z-50" />

        {/* Screen content */}
        <div className="h-full">{renderScreen()}</div>

        {/* Bottom tab bar */}
        {showTabBar && (
          <BottomTabBar activeTab={state.activeTab} setTab={setTab} />
        )}

        {/* Demo tooltips */}
        {state.showTooltip && (
          <DemoTooltip
            message={state.showTooltip}
            onClose={() => updateState({ showTooltip: null })}
          />
        )}
      </div>
    </div>
  );
}
