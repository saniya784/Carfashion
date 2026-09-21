import { useState, useEffect } from 'react';

export default function CountUp({ target, animated, suffix = '' }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!animated) return;
    const duration = 2000;
    const start = performance.now();
    let raf;
    const update = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) raf = requestAnimationFrame(update);
      else setCount(target);
    };
    raf = requestAnimationFrame(update);
    return () => cancelAnimationFrame(raf);
  }, [animated, target]);

  return (
    <div
      className="text-[2.6rem] font-extrabold tracking-tight leading-none tabular-nums"
      style={{
        background: 'var(--grad-brand)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
      }}
    >
      {count.toLocaleString()}
      {suffix}
    </div>
  );
}