import { useState } from 'react';
import { Screen } from '@/app/App';
import { ArrowLeft, Send, Sparkles } from 'lucide-react';

interface LLMHubScreenProps {
  navigate: (screen: Screen) => void;
}

type ModelType = 'fast' | 'accurate' | 'reasoning' | 'creative';

interface Message {
  id: number;
  role: 'user' | 'assistant';
  content: string;
  model?: ModelType;
}

const modelResponses: Record<ModelType, string> = {
  fast: "Quick response: Based on your query, here's a rapid analysis. I can process this efficiently with minimal latency. Would you like me to dive deeper?",
  accurate: "Detailed response: After careful analysis of your request, I've cross-referenced multiple sources to ensure accuracy. Here are the verified findings with supporting evidence...",
  reasoning: "Let me think through this step-by-step:\n1. First, we need to consider...\n2. Then, we should evaluate...\n3. Finally, the logical conclusion is...\nThis approach ensures sound reasoning.",
  creative: "Here's an innovative take! 🌟 Let's explore some creative angles you might not have considered. Imagine if we approached this from a completely different perspective..."
};

const models = [
  { id: 'fast' as ModelType, name: 'Fast', description: 'Quick responses' },
  { id: 'accurate' as ModelType, name: 'Accurate', description: 'Verified results' },
  { id: 'reasoning' as ModelType, name: 'Reasoning', description: 'Step-by-step logic' },
  { id: 'creative' as ModelType, name: 'Creative', description: 'Novel solutions' },
];

export default function LLMHubScreen({ navigate }: LLMHubScreenProps) {
  const [selectedModel, setSelectedModel] = useState<ModelType>('fast');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      role: 'assistant',
      content: 'Welcome to LLM Hub! Select a model above and ask me anything. Each model has its own unique approach.',
    },
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      role: 'user',
      content: input,
    };

    const assistantMessage: Message = {
      id: messages.length + 2,
      role: 'assistant',
      content: modelResponses[selectedModel],
      model: selectedModel,
    };

    setMessages([...messages, userMessage, assistantMessage]);
    setInput('');
  };

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Header */}
      <div className="px-6 pt-16 pb-4 border-b border-border bg-background">
        <div className="flex items-center gap-3 mb-4">
          <button
            onClick={() => navigate('community')}
            className="w-10 h-10 flex items-center justify-center -ml-2"
          >
            <ArrowLeft className="w-6 h-6 text-foreground" />
          </button>
          <div className="flex-1">
            <h1 className="text-xl font-bold text-foreground">LLM Hub</h1>
            <p className="text-xs text-muted-foreground">Multi-model AI chat</p>
          </div>
          <Sparkles className="w-5 h-5 text-blue-600" />
        </div>

        {/* Model selector */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {models.map((model) => (
            <button
              key={model.id}
              onClick={() => setSelectedModel(model.id)}
              className={`flex-shrink-0 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                selectedModel === model.id
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-muted text-foreground hover:bg-muted/80'
              }`}
            >
              <div className="flex flex-col items-start">
                <span>{model.name}</span>
                <span className={`text-xs ${selectedModel === model.id ? 'text-blue-100' : 'text-muted-foreground'}`}>
                  {model.description}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                message.role === 'user'
                  ? 'bg-blue-600 text-white'
                  : 'bg-muted text-foreground'
              }`}
            >
              {message.model && (
                <div className="text-xs font-semibold mb-1 opacity-70">
                  {models.find(m => m.id === message.model)?.name}
                </div>
              )}
              <p className="text-sm whitespace-pre-wrap">{message.content}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="px-6 py-4 border-t border-border bg-background">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask anything..."
            className="flex-1 px-4 py-3 bg-muted rounded-xl text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim()}
            className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 transition-transform"
          >
            <Send className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}