import { useState } from 'react';
import { Screen, AppState } from '@/app/App';
import { ArrowLeft, Pin, FileText, CheckCircle2 } from 'lucide-react';

interface GroupChatScreenProps {
  navigate: (screen: Screen) => void;
  state: AppState;
}

export default function GroupChatScreen({ navigate, state }: GroupChatScreenProps) {
  const [showDecisionHistory, setShowDecisionHistory] = useState(false);

  const messages = [
    { id: 1, sender: 'Sarah Chen', avatar: 'SC', color: 'bg-green-600', text: 'Great job on getting that task approved!', time: '10:35' },
    { id: 2, sender: 'Marcus Liu', avatar: 'ML', color: 'bg-purple-600', text: 'The AI research was really thorough', time: '10:36' },
  ];

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Header */}
      <div className="px-6 pt-16 pb-4 border-b border-border bg-background">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('community')}
            className="w-10 h-10 flex items-center justify-center -ml-2"
          >
            <ArrowLeft className="w-6 h-6 text-foreground" />
          </button>
          <div className="flex-1">
            <h1 className="text-lg font-bold text-foreground">
              {state.groupCreated ? 'Project team' : '#task-approvals'}
            </h1>
            <p className="text-xs text-muted-foreground">
              {state.groupCreated ? '3 members' : 'Team channel'}
            </p>
          </div>
          <button
            onClick={() => setShowDecisionHistory(!showDecisionHistory)}
            className="w-10 h-10 flex items-center justify-center bg-muted rounded-full"
          >
            <FileText className="w-5 h-5 text-foreground" />
          </button>
        </div>
      </div>

      {/* Decision history modal */}
      {showDecisionHistory && (
        <div className="absolute inset-0 bg-background z-20 overflow-y-auto">
          <div className="px-6 pt-16 pb-4 border-b border-border sticky top-0 bg-background">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowDecisionHistory(false)}
                className="w-10 h-10 flex items-center justify-center -ml-2"
              >
                <ArrowLeft className="w-6 h-6 text-foreground" />
              </button>
              <h1 className="text-xl font-bold text-foreground">Decision history</h1>
            </div>
          </div>

          <div className="px-6 pt-6 pb-6">
            <p className="text-sm text-muted-foreground mb-6">
              Unified view of all approvals and decisions made in this space
            </p>

            {state.taskTitle && (
              <div className="space-y-4">
                <div className="bg-card border border-border rounded-2xl p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground mb-1">{state.taskTitle}</h3>
                      <p className="text-sm text-muted-foreground">Budget: £{state.purchaseAmount}</p>
                    </div>
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                  </div>
                  
                  <div className="border-t border-border pt-3 mt-3">
                    <h4 className="text-xs font-semibold text-foreground mb-2">Timeline</h4>
                    <div className="space-y-2">
                      <div className="text-xs text-muted-foreground">
                        <span className="font-medium">10:28</span> — Task created
                      </div>
                      <div className="text-xs text-muted-foreground">
                        <span className="font-medium">10:29</span> — AI research completed
                      </div>
                      {state.approvedBy.includes('You') && (
                        <>
                          <div className="text-xs text-muted-foreground">
                            <span className="font-medium">10:32</span> — You approved (£{state.purchaseAmount} limit)
                          </div>
                          <div className="text-xs text-green-600 font-medium">
                            ✓ 48-hour dispute window active
                          </div>
                        </>
                      )}
                      {state.taskStatus === 'Executed' && (
                        <div className="text-xs text-muted-foreground">
                          <span className="font-medium">{state.executionTime}</span> — Executed via x402
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                  <p className="text-sm text-blue-900">
                    <span className="font-semibold">Immutable audit trail:</span> All decisions are permanently recorded and cryptographically secured.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Pinned task card */}
      {state.taskTitle && !showDecisionHistory && (
        <div className="px-6 py-4 bg-blue-50 border-b border-blue-200">
          <div className="flex items-start gap-3">
            <Pin className="w-4 h-4 text-blue-700 flex-shrink-0 mt-1" />
            <div className="flex-1">
              <p className="text-xs font-semibold text-blue-900 mb-2">PINNED</p>
              <div className="bg-card rounded-xl p-3 border border-blue-200">
                <h3 className="font-semibold text-foreground text-sm mb-1">{state.taskTitle}</h3>
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                    state.taskStatus === 'Executed' ? 'bg-green-100 text-green-700' :
                    state.taskStatus === 'Approved' ? 'bg-blue-100 text-blue-700' :
                    'bg-orange-100 text-orange-700'
                  }`}>
                    {state.taskStatus === 'NeedsApproval' ? 'Needs Approval' : state.taskStatus}
                  </span>
                  <span className="text-xs text-muted-foreground">£{state.purchaseAmount}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-6 py-4">
        {messages.map((message) => (
          <div key={message.id} className="flex gap-3 mb-4">
            <div className={`w-10 h-10 ${message.color} rounded-full flex items-center justify-center text-white text-sm font-semibold flex-shrink-0`}>
              {message.avatar}
            </div>
            <div className="flex-1">
              <div className="flex items-baseline gap-2 mb-1">
                <span className="font-semibold text-foreground text-sm">{message.sender}</span>
                <span className="text-xs text-muted-foreground">{message.time}</span>
              </div>
              <p className="text-sm text-foreground">{message.text}</p>
            </div>
          </div>
        ))}

        {state.taskStatus === 'Executed' && (
          <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-4">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle2 className="w-5 h-5 text-green-700" />
              <span className="font-semibold text-green-900">Task completed</span>
            </div>
            <p className="text-sm text-green-800">
              Payment settled via x402 in ~2 seconds. View full details in decision history.
            </p>
          </div>
        )}
      </div>

      {/* Message input */}
      <div className="px-6 py-4 border-t border-border">
        <div className="bg-muted rounded-xl px-4 py-3">
          <input
            type="text"
            placeholder="Type a message..."
            className="w-full bg-transparent outline-none text-foreground placeholder:text-muted-foreground"
          />
        </div>
      </div>
    </div>
  );
}