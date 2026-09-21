import { useState } from 'react';
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';

const UNAVAILABLE_DATES = [5, 6, 12, 13, 20, 21];
const BEST_PRICE_DATES = [3, 8, 15, 22, 28];
const DAY_HEADERS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

export default function AvailabilityCalendar() {
  const [month, setMonth] = useState(new Date());

  const year = month.getFullYear();
  const monthIdx = month.getMonth();
  const firstDay = new Date(year, monthIdx, 1).getDay();
  const daysInMonth = new Date(year, monthIdx + 1, 0).getDate();
  const monthName = month.toLocaleString('en-US', { month: 'long', year: 'numeric' });
  const today = new Date();

  const days = [];
  for (let i = 0; i < firstDay; i++) days.push(null);
  for (let d = 1; d <= daysInMonth; d++) days.push(d);

  return (
    <div className="rounded-2xl p-6 border my-6"
         style={{ background: 'var(--bg-soft)', borderColor: 'var(--border)' }}>
      <h4 className="text-[1.05rem] font-bold mb-4 flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
        <Calendar size={18} className="text-blue-600" /> Smart Availability — {monthName}
      </h4>

      <div className="flex items-center gap-2 mb-4">
        <button
          className="w-8 h-8 rounded-lg flex items-center justify-center border transition-all hover:bg-blue-600 hover:text-white hover:border-blue-600"
          style={{ background: 'var(--bg-surface)', borderColor: 'var(--border)', color: 'var(--text-primary)' }}
          onClick={() => setMonth(new Date(year, monthIdx - 1, 1))}
          aria-label="Previous month"
        >
          <ChevronLeft size={16} />
        </button>
        <button
          className="w-8 h-8 rounded-lg flex items-center justify-center border transition-all hover:bg-blue-600 hover:text-white hover:border-blue-600"
          style={{ background: 'var(--bg-surface)', borderColor: 'var(--border)', color: 'var(--text-primary)' }}
          onClick={() => setMonth(new Date(year, monthIdx + 1, 1))}
          aria-label="Next month"
        >
          <ChevronRight size={16} />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1.5 text-center">
        {DAY_HEADERS.map((d) => (
          <div key={d} className="py-2.5 text-[0.72rem] font-bold uppercase tracking-wider"
               style={{ color: 'var(--text-muted)', background: 'transparent' }}>
            {d}
          </div>
        ))}
        {days.map((d, i) => {
          if (d === null) return <div key={`empty-${i}`} />;
          const unavailable = UNAVAILABLE_DATES.includes(d);
          const best = BEST_PRICE_DATES.includes(d);
          const isToday = d === today.getDate() && monthIdx === today.getMonth() && year === today.getFullYear();

          return (
            <div
              key={d}
              className={`relative py-2.5 rounded-[10px] text-[0.85rem] font-medium border transition-all ${
                unavailable ? 'line-through opacity-80' : ''
              }`}
              style={{
                background: unavailable ? 'var(--error-soft)' : 'var(--success-soft)',
                color: unavailable ? 'var(--error)' : 'var(--text-secondary)',
                borderColor: isToday ? 'var(--blue)' : 'transparent',
                boxShadow: isToday ? '0 0 0 2px var(--blue-soft)' : 'none',
                fontWeight: unavailable ? 500 : 600,
              }}
            >
              {d}
              {best && (
                <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-[5px] h-[5px] rounded-full"
                      style={{ background: 'var(--violet)' }} />
              )}
            </div>
          );
        })}
      </div>

      <div className="flex gap-5 mt-4 text-[0.8rem] flex-wrap" style={{ color: 'var(--text-muted)' }}>
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded" style={{ background: 'var(--success-soft)', border: '1px solid var(--success)' }} />
          Available
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded" style={{ background: 'var(--error-soft)', border: '1px solid var(--error)' }} />
          Unavailable
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full" style={{ background: 'var(--violet)' }} />
          Best Price
        </span>
      </div>
    </div>
  );
}