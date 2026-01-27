import { useState } from 'react';
import { Screen, AppState, TaskMode } from '@/app/App';
import { ArrowLeft, ChevronDown } from 'lucide-react';

interface NewTaskScreenProps {
  navigate: (screen: Screen) => void;
  state: AppState;
  updateState: (updates: Partial<AppState>) => void;
}

export default function NewTaskScreen({ navigate, state, updateState }: NewTaskScreenProps) {
  const [title, setTitle] = useState('');
  const [budget, setBudget] = useState('120');
  const [mode, setMode] = useState<TaskMode>(state.selectedMode);
  const [showModeDropdown, setShowModeDropdown] = useState(false);

  const handleCreate = () => {
    if (!title) return;

    updateState({
      taskTitle: title,
      purchaseAmount: parseFloat(budget) || 120,
      selectedMode: mode,
      taskStatus: 'Researching',
    });

    // Simulate AI research
    setTimeout(() => {
      updateState({
        taskStatus: mode === 'Manual' ? 'Draft' : 'NeedsApproval',
        currentScreen: 'task-detail',
      });
    }, 1500);

    navigate('task-detail');
  };

  const modes: TaskMode[] = ['Manual', 'Approval', 'Autonomous'];

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Header */}
      <div className="px-6 pt-16 pb-4 border-b border-border">
        <div className="flex items-center gap-3 mb-2">
          <button
            onClick={() => navigate('tasks')}
            className="w-10 h-10 flex items-center justify-center -ml-2"
          >
            <ArrowLeft className="w-6 h-6 text-foreground" />
          </button>
          <h1 className="text-xl font-bold text-foreground">New task</h1>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-6 pt-6 pb-6">
        {/* Task title */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-foreground mb-2">
            Task title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g., Research and purchase project management software"
            className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
          />
        </div>

        {/* Budget limit */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-foreground mb-2">
            Budget limit (optional)
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">£</span>
            <input
              type="number"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              placeholder="120"
              className="w-full pl-8 pr-4 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            />
          </div>
        </div>

        {/* Mode selection */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-foreground mb-2">
            Execution mode
          </label>
          <div className="relative">
            <button
              onClick={() => setShowModeDropdown(!showModeDropdown)}
              className="w-full px-4 py-3 rounded-xl border border-border flex items-center justify-between bg-card"
            >
              <span className="text-foreground">{mode}</span>
              <ChevronDown className="w-5 h-5 text-muted-foreground" />
            </button>
            
            {showModeDropdown && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-xl shadow-lg overflow-hidden z-10">
                {modes.map((m) => (
                  <button
                    key={m}
                    onClick={() => {
                      setMode(m);
                      setShowModeDropdown(false);
                    }}
                    className="w-full px-4 py-3 text-left hover:bg-muted border-b border-border last:border-b-0"
                  >
                    <div className="font-medium text-foreground">{m}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">
                      {m === 'Manual' && 'You complete purchases manually'}
                      {m === 'Approval' && 'Team approves before execution'}
                      {m === 'Autonomous' && 'AI executes within limits'}
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Mode explanation */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <h3 className="font-semibold text-blue-900 mb-2">
            {mode === 'Approval' && 'Recommended: Approval mode'}
            {mode === 'Manual' && 'Manual mode'}
            {mode === 'Autonomous' && 'Autonomous mode'}
          </h3>
          <p className="text-sm text-blue-800">
            {mode === 'Approval' && 'AI researches options, team reviews and approves spending, then AI executes. Full audit trail with 48-hour dispute window.'}
            {mode === 'Manual' && 'AI researches and provides recommendations. You complete purchases manually outside the platform.'}
            {mode === 'Autonomous' && 'AI executes purchases automatically within your preset spending limits. Graduated autonomy based on trust.'}
          </p>
        </div>
      </div>

      {/* Create button */}
      <div className="px-6 pb-6 border-t border-border pt-4">
        <button
          onClick={handleCreate}
          disabled={!title}
          className="w-full bg-blue-600 text-white py-4 rounded-2xl font-semibold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed active:scale-98 transition-transform"
        >
          Create & start AI research
        </button>
      </div>
    </div>
  );
}