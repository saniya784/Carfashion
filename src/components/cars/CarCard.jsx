import { useNavigate } from 'react-router-dom';
import { Award, Star, Fuel, Users, Settings, Eye, CalendarCheck, Heart, CheckCircle, Clock, XCircle, Sparkles } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { formatCurrency } from '@/utils/format';

export default function CarCard({ car }) {
  const { favorites, toggleFavorite, addRecentlyViewed } = useApp();
  const navigate = useNavigate();
  const isFav = favorites.includes(car.id);

  const badgeClass = car.available
    ? car.availabilityLabel === 'Limited'
      ? 'badge-limited'
      : 'badge-available'
    : 'badge-unavailable';

  const badgeStyle = car.available
    ? car.availabilityLabel === 'Limited'
      ? { background: 'linear-gradient(135deg, rgba(245,158,11,.95), rgba(217,119,6,.95))', boxShadow: '0 4px 12px rgba(245,158,11,.3)' }
      : { background: 'linear-gradient(135deg, rgba(16,185,129,.95), rgba(5,150,105,.95))', boxShadow: '0 4px 12px rgba(16,185,129,.3)' }
    : { background: 'linear-gradient(135deg, rgba(239,68,68,.95), rgba(220,38,38,.95))', boxShadow: '0 4px 12px rgba(239,68,68,.3)' };

  const BadgeIcon = car.available ? (car.availabilityLabel === 'Limited' ? Clock : CheckCircle) : XCircle;

  const goDetails = () => {
    addRecentlyViewed(car.id);
    navigate(`/cars/${car.id}`);
  };

  return (
    <article
      className="group relative flex flex-col rounded-[20px] overflow-hidden border transition-all duration-300 hover:-translate-y-2"
      style={{ background: 'var(--bg-surface)', borderColor: 'var(--border)', boxShadow: 'var(--sh-sm)' }}
    >
      <div className="relative h-[230px] overflow-hidden cursor-pointer" onClick={goDetails}
           style={{ background: 'var(--bg-soft)' }}>
        <img
          src={car.image}
          alt={car.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=600&auto=format&fit=crop&q=80'; }}
        />
        <span className="absolute top-4 left-4 px-3.5 py-1.5 rounded-full text-[0.7rem] font-bold tracking-wider uppercase flex items-center gap-1.5 z-10 text-white backdrop-blur"
              style={badgeStyle}>
          <BadgeIcon size={12} />
          {car.availabilityLabel}
        </span>
        <span className="absolute top-4 right-[70px] px-3 py-1.5 rounded-full text-[0.65rem] font-bold tracking-wider z-10 text-white flex items-center gap-1"
              style={{ background: 'var(--grad-brand)', boxShadow: '0 4px 12px rgba(124,58,237,.4)' }}>
          <Sparkles size={11} /> AI Pick
        </span>
        <button
          type="button"
          className={`absolute top-4 right-4 w-[42px] h-[42px] rounded-full flex items-center justify-center cursor-pointer z-10 transition-all hover:scale-110 ${
            isFav ? 'text-pink-500' : 'text-slate-500'
          }`}
          style={{ background: 'rgba(255,255,255,.95)', backdropFilter: 'blur(8px)', boxShadow: '0 4px 12px rgba(0,0,0,.1)' }}
          aria-label={isFav ? 'Remove from favorites' : 'Add to favorites'}
          onClick={(e) => { e.stopPropagation(); toggleFavorite(car.id); }}
        >
          <Heart size={18} fill={isFav ? 'currentColor' : 'none'} />
        </button>
      </div>

      <div className="p-6 flex flex-col flex-1">
        <div className="text-[0.75rem] font-bold uppercase tracking-widest flex items-center gap-1.5 mb-1.5" style={{ color: 'var(--blue)' }}>
          <Award size={12} /> {car.brand}
        </div>
        <h3 className="text-[1.3rem] font-bold tracking-tight mb-2.5 leading-snug" style={{ color: 'var(--text-primary)' }}>
          {car.name}
        </h3>
        <div className="flex items-center gap-3 text-[0.82rem] mb-4 flex-wrap" style={{ color: 'var(--text-muted)' }}>
          <span className="flex items-center gap-1 text-amber-500 font-semibold">
            <Star size={14} fill="currentColor" /> {car.rating}
          </span>
          <span>({car.reviews} reviews)</span>
          <span>·</span>
          <span>{car.category}</span>
        </div>
        <div className="flex flex-wrap gap-2 mb-5">
          <SpecTag icon={Fuel}>{car.fuelType}</SpecTag>
          <SpecTag icon={Users}>{car.seats} Seats</SpecTag>
          <SpecTag icon={Settings}>{car.transmission}</SpecTag>
        </div>
        <div className="flex items-center justify-between mt-auto pt-4.5 border-t flex-wrap gap-3" style={{ borderColor: 'var(--border)' }}>
          <div className="text-[1.5rem] font-extrabold tracking-tight flex items-baseline gap-0.5"
               style={{ background: 'var(--grad-brand)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            {formatCurrency(car.pricePerDay)}
            <small className="text-[0.78rem] font-medium" style={{ WebkitTextFillColor: 'var(--text-muted)' }}>/ day</small>
          </div>
          <div className="flex gap-2 flex-wrap">
            <button className="btn-secondary-cf !py-2 !px-4.5 text-sm" onClick={goDetails}>
              <Eye size={14} /> Details
            </button>
            <button className="btn-primary-cf !py-2 !px-4.5 text-sm" disabled={!car.available}
                    onClick={() => navigate(`/booking/${car.id}`)}>
              <CalendarCheck size={14} /> Book
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

function SpecTag({ icon: Icon, children }) {
  return (
    <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[0.76rem] font-medium border"
          style={{ background: 'var(--bg-soft)', color: 'var(--text-secondary)', borderColor: 'var(--border)' }}>
      <Icon size={14} className="text-blue-600" /> {children}
    </span>
  );
}