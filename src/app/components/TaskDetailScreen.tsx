import { useState, useEffect } from 'react';
import { Screen, AppState } from '@/app/App';
import { ArrowLeft, CheckCircle2, Clock, AlertCircle } from 'lucide-react';

interface TaskDetailScreenProps {
  navigate: (screen: Screen) => void;
  state: AppState;
  updateState: (updates: Partial<AppState>) => void;
}

export default function TaskDetailScreen({ navigate, state, updateState }: TaskDetailScreenProps) {
  const [showResearch, setShowResearch] = useState(false);

  useEffect(() => {
    if (state.taskStatus === 'Researching') {
      setTimeout(() => {
        setShowResearch(true);
      }, 1500);
    } else {
      setShowResearch(true);
    }
  }, [state.taskStatus]);

  const handleApprove = () => {
    const now = new Date();
    const timeStr = now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
    
    updateState({
      taskStatus: 'Approved',
      approvedBy: ['You'],
      showTooltip: 'Simulated approval event recorded in immutable audit trail',
    });

    setTimeout(() => {
      updateState({ showTooltip: null });
    }, 3000);
  };

  const handleReject = () => {
    updateState({
      taskStatus: 'Rejected',
    });
  };

  const approvers = [
    { id: 1, name: 'Sarah Chen', avatar: 'SC', status: state.approvedBy.includes('You') ? 'approved' : 'pending' },
    { id: 2, name: 'Marcus Liu', avatar: 'ML', status: 'pending' },
    { id: 3, name: 'Emma Davis', avatar: 'ED', status: 'pending' },
  ];

  const auditEntries = [
    { time: '10:28', actor: 'AI System', action: 'Task created', icon: 'create' },
    { time: '10:29', actor: 'Multi-LLM Router', action: 'Research completed across 3 models', icon: 'research' },
  ];

  if (state.approvedBy.includes('You')) {
    auditEntries.push({
      time: new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }),
      actor: 'You',
      action: `Approved purchase limit £${state.purchaseAmount}`,
      icon: 'approve',
    });
  }

  return (
    <div className="h-full flex flex-col bg-background overflow-y-auto">
      {/* Header */}
      <div className="px-6 pt-16 pb-4 border-b border-border bg-background sticky top-0 z-10">
        <div className="flex items-center gap-3 mb-2">
          <button
            onClick={() => navigate('tasks')}
            className="w-10 h-10 flex items-center justify-center -ml-2"
          >
            <ArrowLeft className="w-6 h-6 text-foreground" />
          </button>
          <h1 className="text-xl font-bold text-foreground flex-1 truncate">{state.taskTitle}</h1>
        </div>
        <div className="flex items-center gap-2">
          <span className={`text-xs font-medium px-3 py-1 rounded-full ${
            state.taskStatus === 'Approved' ? 'bg-blue-100 text-blue-700' :
            state.taskStatus === 'NeedsApproval' ? 'bg-orange-100 text-orange-700' :
            state.taskStatus === 'Researching' ? 'bg-gray-100 text-gray-700' :
            'bg-gray-100 text-gray-700'
          }`}>
            {state.taskStatus === 'NeedsApproval' ? 'Needs Approval' : state.taskStatus}
          </span>
          <span className="text-xs text-muted-foreground">£{state.purchaseAmount} budget</span>
        </div>
      </div>

      <div className="flex-1 px-6 pt-6 pb-6">
        {/* AI Research section */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">AI Research</h2>
          
          {state.taskStatus === 'Researching' && !showResearch ? (
            <div className="bg-muted rounded-2xl p-6 flex flex-col items-center">
              <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4" />
              <p className="text-sm text-muted-foreground">Multi-LLM routing in progress...</p>
            </div>
          ) : (
            <div className="space-y-3">
              {/* Model A */}
              <div className="bg-card border border-border rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                    <span className="text-xs font-bold text-purple-700">A</span>
                  </div>
                  <span className="font-semibold text-foreground">Model A</span>
                </div>
                <p className="text-sm text-foreground mb-2">Recommends: Monday.com Pro plan</p>
                <p className="text-sm text-muted-foreground">£10/user/month, robust automation</p>
              </div>

              {/* Model B */}
              <div className="bg-card border border-border rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                    <span className="text-xs font-bold text-green-700">B</span>
                  </div>
                  <span className="font-semibold text-foreground">Model B</span>
                </div>
                <p className="text-sm text-foreground mb-2">Recommends: Asana Business</p>
                <p className="text-sm text-muted-foreground">£24/user/month, advanced reporting</p>
              </div>

              {/* Model C */}
              <div className="bg-card border border-border rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <span className="text-xs font-bold text-blue-700">C</span>
                  </div>
                  <span className="font-semibold text-foreground">Model C</span>
                </div>
                <p className="text-sm text-foreground mb-2">Recommends: ClickUp Unlimited</p>
                <p className="text-sm text-muted-foreground">£7/user/month, best value</p>
              </div>

              {/* Combined recommendation */}
              <div className="bg-blue-600 text-white rounded-xl p-4 mt-4">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle2 className="w-5 h-5" />
                  <span className="font-semibold">Combined recommendation</span>
                </div>
                <p className="text-sm mb-2">ClickUp Unlimited - 5 user seats</p>
                <p className="text-2xl font-bold">£35/month</p>
                <p className="text-xs text-blue-100 mt-2">Within £120 budget</p>
              </div>
            </div>
          )}
        </div>

        {/* Approvers section */}
        {state.selectedMode === 'Approval' && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">Approvers</h2>
            <div className="space-y-2">
              {approvers.map((approver) => (
                <div key={approver.id} className="flex items-center gap-3 p-3 bg-muted rounded-xl">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold ${
                    approver.status === 'approved' ? 'bg-green-600 text-white' : 'bg-gray-300 text-gray-700'
                  }`}>
                    {approver.avatar}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-foreground">{approver.name}</p>
                  </div>
                  {approver.status === 'approved' && (
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                  )}
                  {approver.status === 'pending' && (
                    <Clock className="w-5 h-5 text-gray-400" />
                  )}
                </div>
              ))}
            </div>

            {/* Approval actions */}
            {state.taskStatus === 'NeedsApproval' && (
              <div className="mt-4 space-y-3">
                <button
                  onClick={handleApprove}
                  className="w-full bg-green-600 text-white py-4 rounded-2xl font-semibold shadow-lg active:scale-98 transition-transform"
                >
                  Approve
                </button>
                <button
                  onClick={handleReject}
                  className="w-full bg-card text-red-600 py-4 rounded-2xl font-semibold border-2 border-red-600 active:scale-98 transition-transform"
                >
                  Reject
                </button>
              </div>
            )}

            {/* 48-hour dispute notice */}
            {state.taskStatus === 'Approved' && (
              <div className="mt-4 bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-blue-700 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-blue-900">48-hour dispute window active</p>
                  <p className="text-xs text-blue-700 mt-1">Team members can dispute this approval within 48 hours</p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Audit trail */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">Audit trail</h2>
          <div className="space-y-3">
            {auditEntries.map((entry, idx) => (
              <div key={idx} className="flex gap-3">
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center flex-shrink-0">
                    {entry.icon === 'approve' && <CheckCircle2 className="w-4 h-4 text-muted-foreground" />}
                    {entry.icon === 'research' && <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5" className="text-muted-foreground"/></svg>}
                    {entry.icon === 'create' && <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 4v8M4 8h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="text-muted-foreground"/></svg>}
                  </div>
                  {idx < auditEntries.length - 1 && (
                    <div className="w-0.5 h-6 bg-border my-1" />
                  )}
                </div>
                <div className="flex-1 pb-4">
                  <p className="text-sm font-medium text-foreground">{entry.action}</p>
                  <p className="text-xs text-muted-foreground">{entry.actor} • {entry.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Execute button */}
        {state.taskStatus === 'Approved' && (
          <button
            onClick={() => navigate('execute')}
            className="w-full bg-blue-600 text-white py-4 rounded-2xl font-semibold shadow-lg active:scale-98 transition-transform"
          >
            Execute purchase
          </button>
        )}
      </div>
    </div>
  );
}