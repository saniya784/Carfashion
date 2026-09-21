import { Clock } from 'lucide-react';
import { formatCurrency } from '@/utils/format';

export default function BookingHistory({ bookings, title = 'Recent Bookings' }) {
  if (!bookings || bookings.length === 0) return null;

  return (
    <div className="mt-14 pt-10 border-t" style={{ borderColor: 'var(--border)' }}>
      <h3 className="text-[1.5rem] font-bold mb-6 flex items-center gap-2.5" style={{ color: 'var(--text-primary)' }}>
        <Clock size={20} className="text-blue-600" /> {title}
      </h3>
      <div>
        {bookings.map((b, i) => (
          <div
            key={i}
            className="flex items-center gap-4 p-4 rounded-xl border mb-3 transition-all hover:translate-x-1"
            style={{ background: 'var(--bg-soft)', borderColor: 'var(--border)' }}
          >
            <img
              src={b.carImage}
              alt={b.carName}
              className="w-[60px] h-[45px] object-cover rounded-lg"
              onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=400&auto=format&fit=crop&q=80'; }}
            />
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-[0.95rem] truncate" style={{ color: 'var(--text-primary)' }}>{b.carName}</p>
              <small className="text-[0.8rem]" style={{ color: 'var(--text-secondary)' }}>
                {b.pickup} → {b.return} · {b.location}
              </small>
            </div>
            <div className="font-bold text-base text-blue-600">{formatCurrency(b.total)}</div>
          </div>
        ))}
      </div>
    </div>
  );
}