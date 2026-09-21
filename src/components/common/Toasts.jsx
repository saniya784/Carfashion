import { CheckCircle2, AlertCircle, Info, Sparkles } from 'lucide-react';
import { useApp } from '@/context/AppContext';

const icons = {
  success: CheckCircle2,
  error: AlertCircle,
  ai: Sparkles,
  info: Info,
};

export default function Toasts() {
  const { toasts } = useApp();
  return (
    <div className="fixed bottom-6 right-6 z-[5000] flex flex-col gap-3" aria-live="polite">
      {toasts.map((t) => {
        const Icon = icons[t.type] || Info;
        const borderColor = t.type === 'success' ? 'var(--success)' : t.type === 'error' ? 'var(--error)' : t.type === 'ai' ? 'var(--violet)' : 'var(--blue)';
        return (
          <div
            key={t.id}
            className="flex items-center gap-2.5 px-5.5 py-3.5 rounded-xl text-white text-sm font-medium max-w-[360px] border border-white/10"
            style={{
              background: 'var(--navy-900)',
              boxShadow: 'var(--sh-lg)',
              animation: 'slideIn .3s ease',
              borderLeft: `4px solid ${borderColor}`,
            }}
          >
            <Icon size={16} /> {t.message}
          </div>
        );
      })}
    </div>
  );
}