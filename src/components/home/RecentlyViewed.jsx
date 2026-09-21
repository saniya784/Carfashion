import { useNavigate } from 'react-router-dom';
import { History } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { CARS } from '@/data/cars';
import { formatCurrency } from '@/utils/format';

export default function RecentlyViewed() {
  const { recentlyViewed, addRecentlyViewed } = useApp();
  const navigate = useNavigate();
  const cars = recentlyViewed.map((id) => CARS.find((c) => c.id === id)).filter(Boolean);

  if (cars.length === 0) return null;

  return (
    <div className="max-w-[1320px] mx-auto px-6 py-8">
      <h3 className="text-[1.3rem] font-bold mb-5 flex items-center gap-2.5" style={{ color: 'var(--text-primary)' }}>
        <History size={20} className="text-blue-600" /> Recently viewed
      </h3>
      <div className="flex gap-4 overflow-x-auto pb-2">
        {cars.map((car) => (
          <div
            key={car.id}
            className="min-w-[170px] rounded-2xl p-3 border cursor-pointer transition-all hover:-translate-y-1 hover:shadow-lg text-center"
            style={{ background: 'var(--bg-surface)', borderColor: 'var(--border)', boxShadow: 'var(--sh-sm)' }}
            onClick={() => { addRecentlyViewed(car.id); navigate(`/cars/${car.id}`); }}
          >
            <img
              src={car.image}
              alt={car.name}
              className="w-full h-20 object-cover rounded-[10px] mb-2"
              onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=400&auto=format&fit=crop&q=80'; }}
            />
            <p className="text-[0.85rem] font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>{car.name}</p>
            <small className="text-[0.75rem] font-bold text-blue-600">{formatCurrency(car.pricePerDay)}/day</small>
          </div>
        ))}
      </div>
    </div>
  );
}