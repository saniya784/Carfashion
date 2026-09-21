import { CalendarCheck, IndianRupee, Heart, Clock } from 'lucide-react';
import { formatCurrency } from '@/utils/format';

export default function DashboardStats({ bookings, favorites, totalSpent, avgDays }) {
  const stats = [
    { icon: CalendarCheck, label: 'Total Bookings', value: bookings.length, sub: 'All-time rentals' },
    { icon: IndianRupee, label: 'Total Spent', value: formatCurrency(totalSpent), sub: 'Across all trips' },
    { icon: Heart, label: 'Favorites', value: favorites.length, sub: 'Saved cars' },
    { icon: Clock, label: 'Avg Duration', value: `${avgDays} days`, sub: 'Per rental' },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-8">
      {stats.map((s, i) => {
        const Icon = s.icon;
        return (
          <div
            key={i}
            className="relative overflow-hidden rounded-[20px] p-6 border transition-all hover:-translate-y-1 hover:shadow-md"
            style={{ background: 'var(--bg-surface)', borderColor: 'var(--border)' }}
          >
            <span className="absolute top-0 left-0 w-1 h-full" style={{ background: 'var(--grad-brand)' }} />
            <div className="text-[0.8rem] font-semibold uppercase tracking-wider mb-2 flex items-center gap-1.5"
                 style={{ color: 'var(--text-muted)' }}>
              <Icon size={14} /> {s.label}
            </div>
            <div
              className="text-[1.8rem] font-extrabold tracking-tight"
              style={{
                background: 'var(--grad-brand)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              {s.value}
            </div>
            <div className="text-[0.8rem] mt-1" style={{ color: 'var(--text-secondary)' }}>{s.sub}</div>
          </div>
        );
      })}
    </div>
  );
}