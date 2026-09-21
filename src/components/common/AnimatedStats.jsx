import { useState, useEffect, useRef } from 'react';
import { Car, Users, MapPin, Headphones } from 'lucide-react';
import CountUp from './CountUp';

const stats = [
  { icon: Car, target: 500, label: 'Premium Cars', suffix: '+' },
  { icon: Users, target: 10000, label: 'Happy Customers', suffix: '+' },
  { icon: MapPin, target: 20, label: 'Cities', suffix: '+' },
  { icon: Headphones, target: 24, label: '/7 AI Support', suffix: '' },
];

export default function AnimatedStats() {
  const [animated, setAnimated] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !animated) {
          setAnimated(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [animated]);

  return (
    <div ref={ref} className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
      {stats.map((s, i) => {
        const Icon = s.icon;
        return (
          <div
            key={i}
            className="relative overflow-hidden text-center px-6 py-9 rounded-[20px] border transition-all hover:-translate-y-1 hover:shadow-lg"
            style={{ background: 'var(--bg-surface)', borderColor: 'var(--border)', boxShadow: 'var(--sh-sm)' }}
          >
            <div
              className="w-12 h-12 rounded-[14px] flex items-center justify-center mx-auto mb-4"
              style={{ background: 'var(--grad-soft)', color: 'var(--blue)' }}
            >
              <Icon size={22} />
            </div>
            <CountUp target={s.target} animated={animated} suffix={s.suffix} />
            <div className="text-sm mt-2.5 font-medium" style={{ color: 'var(--text-secondary)' }}>
              {s.label}
            </div>
          </div>
        );
      })}
    </div>
  );
}