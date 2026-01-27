import { Screen, AppState } from '@/app/App';
import { Plus, CheckCircle2, Clock, XCircle } from 'lucide-react';

interface TasksScreenProps {
  navigate: (screen: Screen) => void;
  state: AppState;
}

export default function TasksScreen({ navigate, state }: TasksScreenProps) {
  const getProgressStep = () => {
    if (state.taskStatus === 'Executed') return 3;
    if (state.taskStatus === 'Approved') return 2;
    if (state.taskStatus === 'NeedsApproval') return 1;
    return 0;
  };

  const progressStep = getProgressStep();

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Executed':
        return <CheckCircle2 className="w-5 h-5 text-green-600" />;
      case 'Approved':
        return <CheckCircle2 className="w-5 h-5 text-blue-600" />;
      case 'NeedsApproval':
        return <Clock className="w-5 h-5 text-orange-600" />;
      case 'Rejected':
        return <XCircle className="w-5 h-5 text-red-600" />;
      default:
        return <Clock className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Executed':
        return 'bg-green-100 text-green-700';
      case 'Approved':
        return 'bg-blue-100 text-blue-700';
      case 'NeedsApproval':
        return 'bg-orange-100 text-orange-700';
      case 'Rejected':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="h-full flex flex-col bg-background overflow-y-auto pb-20">
      {/* Header */}
      <div className="px-6 pt-16 pb-4">
        <h1 className="text-2xl font-bold text-foreground">Tasks</h1>
      </div>

      {/* Your workflow */}
      <div className="px-6 py-4">
        <h2 className="text-lg font-semibold text-foreground mb-4">Your workflow</h2>
        
        <div className="bg-card border border-border rounded-2xl p-5 space-y-4">
          {/* Step 1: Create */}
          <div className="flex items-start gap-4">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
              progressStep >= 0 ? 'bg-blue-600' : 'bg-muted'
            }`}>
              {progressStep >= 1 ? (
                <CheckCircle2 className="w-5 h-5 text-white" />
              ) : (
                <span className="text-white font-semibold">1</span>
              )}
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-foreground">Create</h3>
              <p className="text-sm text-muted-foreground">Define task and set budget</p>
            </div>
          </div>

          <div className="ml-5 h-6 w-0.5 bg-border" />

          {/* Step 2: Collaborate */}
          <div className="flex items-start gap-4">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
              progressStep >= 2 ? 'bg-blue-600' : 'bg-muted'
            }`}>
              {progressStep >= 2 ? (
                <CheckCircle2 className="w-5 h-5 text-white" />
              ) : (
                <span className={progressStep >= 1 ? 'text-blue-600 font-semibold' : 'text-muted-foreground'}>2</span>
              )}
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-foreground">Collaborate</h3>
              <p className="text-sm text-muted-foreground">Team approves spending</p>
            </div>
          </div>

          <div className="ml-5 h-6 w-0.5 bg-border" />

          {/* Step 3: Execute */}
          <div className="flex items-start gap-4">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
              progressStep >= 3 ? 'bg-green-600' : 'bg-muted'
            }`}>
              {progressStep >= 3 ? (
                <CheckCircle2 className="w-5 h-5 text-white" />
              ) : (
                <span className={progressStep >= 2 ? 'text-green-600 font-semibold' : 'text-muted-foreground'}>3</span>
              )}
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-foreground">Execute</h3>
              <p className="text-sm text-muted-foreground">AI completes purchase via x402</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tasks list */}
      <div className="flex-1 px-6">
        {state.taskTitle ? (
          <div
            onClick={() => navigate('task-detail')}
            className="bg-card border border-border rounded-2xl p-5 mb-3 active:scale-98 transition-transform cursor-pointer"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h3 className="font-semibold text-foreground mb-1">{state.taskTitle}</h3>
                <p className="text-sm text-muted-foreground">Mode: {state.selectedMode}</p>
              </div>
              {getStatusIcon(state.taskStatus)}
            </div>

            <div className="flex items-center justify-between">
              <span className={`text-xs font-medium px-3 py-1 rounded-full ${getStatusColor(state.taskStatus)}`}>
                {state.taskStatus === 'NeedsApproval' ? 'Needs Approval' : state.taskStatus}
              </span>
              <span className="text-sm text-muted-foreground">£{state.purchaseAmount}</span>
            </div>

            {state.taskStatus === 'Executed' && state.executionTime && (
              <div className="mt-3 pt-3 border-t border-border">
                <p className="text-xs text-muted-foreground">Settled {state.executionTime}</p>
              </div>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <path d="M8 16h16M16 8v16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-muted-foreground"/>
              </svg>
            </div>
            <h3 className="font-semibold text-foreground mb-1">No tasks yet</h3>
            <p className="text-sm text-muted-foreground text-center mb-6 max-w-[240px]">
              Create your first task to get started with AI-powered workflows
            </p>
          </div>
        )}
      </div>

      {/* New task button */}
      <div className="px-6 pb-6">
        <button
          onClick={() => navigate('new-task')}
          className="w-full bg-blue-600 text-white py-4 rounded-2xl font-semibold shadow-lg flex items-center justify-center gap-2 active:scale-98 transition-transform"
        >
          <Plus className="w-5 h-5" />
          New task
        </button>
      </div>
    </div>
  );
}