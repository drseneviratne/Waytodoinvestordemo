import { Screen, AppState } from '@/app/App';
import { Plus, Hash, Lock, Sparkles } from 'lucide-react';

interface CommunityScreenProps {
  navigate: (screen: Screen) => void;
  state: AppState;
}

export default function CommunityScreen({ navigate, state }: CommunityScreenProps) {
  const channels = [
    { id: 1, name: 'general', type: 'text', unread: 3 },
    { id: 2, name: 'task-approvals', type: 'text', unread: state.taskStatus === 'NeedsApproval' ? 1 : 0 },
    { id: 3, name: 'announcements', type: 'text', unread: 0 },
  ];

  return (
    <div className="h-full flex flex-col bg-background overflow-y-auto pb-20">
      {/* Header */}
      <div className="px-6 pt-16 pb-4 border-b border-border">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-foreground">Community+</h1>
          <button
            onClick={() => navigate('create-group')}
            className="w-10 h-10 flex items-center justify-center bg-blue-600 rounded-full"
          >
            <Plus className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>

      <div className="flex-1">
        {/* Workspace info */}
        <div className="px-6 py-4 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-lg">W</span>
            </div>
            <div>
              <h2 className="font-semibold text-foreground">Workspace Team</h2>
              <p className="text-sm text-muted-foreground">4 members</p>
            </div>
          </div>
        </div>

        {/* Channels */}
        <div className="px-6 py-4">
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">
            Channels
          </h3>
          <div className="space-y-1">
            {channels.map((channel) => (
              <button
                key={channel.id}
                onClick={() => {
                  if (channel.name === 'task-approvals' || state.groupCreated) {
                    navigate('group-chat');
                  }
                }}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-muted transition-colors"
              >
                <Hash className="w-5 h-5 text-muted-foreground" />
                <span className="flex-1 text-left font-medium text-foreground">{channel.name}</span>
                {channel.unread > 0 && (
                  <span className="bg-blue-600 text-white text-xs font-semibold px-2 py-0.5 rounded-full">
                    {channel.unread}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Direct Messages */}
        {state.groupCreated && (
          <div className="px-6 py-4 border-t border-border">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">
              Direct Messages
            </h3>
            <div className="space-y-1">
              <button
                onClick={() => navigate('group-chat')}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-muted transition-colors"
              >
                <div className="flex -space-x-2">
                  <div className="w-6 h-6 bg-green-600 rounded-full border-2 border-card flex items-center justify-center">
                    <span className="text-white text-xs font-semibold">SC</span>
                  </div>
                  <div className="w-6 h-6 bg-purple-600 rounded-full border-2 border-card flex items-center justify-center">
                    <span className="text-white text-xs font-semibold">ML</span>
                  </div>
                  <div className="w-6 h-6 bg-orange-600 rounded-full border-2 border-card flex items-center justify-center">
                    <span className="text-white text-xs font-semibold">ED</span>
                  </div>
                </div>
                <span className="flex-1 text-left font-medium text-foreground">Project team</span>
                <span className="bg-blue-600 text-white text-xs font-semibold px-2 py-0.5 rounded-full">
                  New
                </span>
              </button>
            </div>
          </div>
        )}

        {/* Info card */}
        <div className="px-6 py-4">
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <Lock className="w-5 h-5 text-blue-700 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-blue-900 mb-1">Governance-first design</h3>
                <p className="text-sm text-blue-800">
                  Community spaces integrate decision history, approval flows, and audit trails for full transparency.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* LLM Hub card */}
        <div className="px-6 py-4">
          <button
            onClick={() => navigate('llm-hub')}
            className="w-full bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl p-5 text-white text-left shadow-lg active:scale-98 transition-transform"
          >
            <div className="flex items-start gap-3 mb-3">
              <Sparkles className="w-6 h-6 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-lg mb-1">LLM Hub</h3>
                <p className="text-sm text-blue-100">
                  Multi-model AI chat with Fast, Accurate, Reasoning, and Creative modes
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="bg-white/20 rounded-full px-3 py-1">GPT-4</span>
              <span className="bg-white/20 rounded-full px-3 py-1">Claude</span>
              <span className="bg-white/20 rounded-full px-3 py-1">Gemini</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}