import { X } from 'lucide-react';

interface DemoTooltipProps {
  message: string;
  onDismiss: () => void;
}

export default function DemoTooltip({ message, onDismiss }: DemoTooltipProps) {
  return (
    <div className="fixed top-24 left-1/2 -translate-x-1/2 bg-gray-900 text-white rounded-2xl p-4 shadow-2xl max-w-[320px] z-[100] animate-in fade-in slide-in-from-top-4 duration-300">
      <div className="flex items-start gap-3">
        <div className="flex-1">
          <p className="text-xs font-semibold text-blue-300 mb-1">INVESTOR DEMO</p>
          <p className="text-sm">{message}</p>
        </div>
        <button
          onClick={onDismiss}
          className="w-6 h-6 flex items-center justify-center bg-white/20 rounded-full flex-shrink-0 hover:bg-white/30 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}