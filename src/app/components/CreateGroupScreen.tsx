import { useState } from 'react';
import { Screen, AppState } from '@/app/App';
import { ArrowLeft, Check } from 'lucide-react';

interface CreateGroupScreenProps {
  navigate: (screen: Screen) => void;
  state: AppState;
  updateState: (updates: Partial<AppState>) => void;
}

export default function CreateGroupScreen({ navigate, state, updateState }: CreateGroupScreenProps) {
  const [groupName, setGroupName] = useState('');
  const [selectedMembers, setSelectedMembers] = useState<number[]>([]);

  const members = [
    { id: 1, name: 'Sarah Chen', role: 'Product Manager', avatar: 'SC', color: 'bg-green-600' },
    { id: 2, name: 'Marcus Liu', role: 'Engineering Lead', avatar: 'ML', color: 'bg-purple-600' },
    { id: 3, name: 'Emma Davis', role: 'Finance', avatar: 'ED', color: 'bg-orange-600' },
    { id: 4, name: 'Alex Johnson', role: 'Operations', avatar: 'AJ', color: 'bg-blue-600' },
  ];

  const toggleMember = (id: number) => {
    setSelectedMembers(prev => 
      prev.includes(id) ? prev.filter(m => m !== id) : [...prev, id]
    );
  };

  const handleCreate = () => {
    if (!groupName || selectedMembers.length === 0) return;
    
    updateState({ groupCreated: true, currentScreen: 'group-chat' });
  };

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Header */}
      <div className="px-6 pt-16 pb-4 border-b border-border">
        <div className="flex items-center gap-3 mb-2">
          <button
            onClick={() => navigate('community')}
            className="w-10 h-10 flex items-center justify-center -ml-2"
          >
            <ArrowLeft className="w-6 h-6 text-foreground" />
          </button>
          <h1 className="text-xl font-bold text-foreground">Create group chat</h1>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-6 pt-6 pb-6">
        {/* Group name */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-foreground mb-2">
            Group name
          </label>
          <input
            type="text"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            placeholder="e.g., Project team"
            className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
          />
        </div>

        {/* Members selection */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-3">
            Add members
          </label>
          <div className="space-y-2">
            {members.map((member) => {
              const isSelected = selectedMembers.includes(member.id);
              return (
                <button
                  key={member.id}
                  onClick={() => toggleMember(member.id)}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl border-2 transition-all ${
                    isSelected 
                      ? 'border-blue-600 bg-blue-50' 
                      : 'border-border bg-card hover:border-muted-foreground'
                  }`}
                >
                  <div className={`w-10 h-10 ${member.color} rounded-full flex items-center justify-center text-white text-sm font-semibold flex-shrink-0`}>
                    {member.avatar}
                  </div>
                  <div className="flex-1 text-left">
                    <p className="font-medium text-foreground">{member.name}</p>
                    <p className="text-sm text-muted-foreground">{member.role}</p>
                  </div>
                  {isSelected && (
                    <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {selectedMembers.length > 0 && (
          <div className="mt-4 bg-muted rounded-xl p-3">
            <p className="text-sm text-foreground">
              {selectedMembers.length} {selectedMembers.length === 1 ? 'member' : 'members'} selected
            </p>
          </div>
        )}
      </div>

      {/* Create button */}
      <div className="px-6 pb-6 border-t border-border pt-4">
        <button
          onClick={handleCreate}
          disabled={!groupName || selectedMembers.length === 0}
          className="w-full bg-blue-600 text-white py-4 rounded-2xl font-semibold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed active:scale-98 transition-transform"
        >
          Create group
        </button>
      </div>
    </div>
  );
}