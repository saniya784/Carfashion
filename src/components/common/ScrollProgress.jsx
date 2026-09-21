import { useScrollProgress } from '@/hooks/useScrollProgress';

export default function ScrollProgress() {
  const progress = useScrollProgress();
  return (
    <div
      className="fixed top-0 left-0 h-[3px] z-[9999] rounded-r-[3px]"
      style={{
        width: `${progress}%`,
        background: 'var(--grad-brand)',
        boxShadow: '0 0 12px rgba(124,58,237,.7)',
        transition: 'width .1s ease-out',
      }}
      aria-hidden="true"
    />
  );
}