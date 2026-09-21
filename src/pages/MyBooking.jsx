import { useNavigate } from 'react-router-dom';
import { CalendarX, Car, Hash, User, Calendar, MapPin, CheckCircle } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { formatCurrency } from '@/utils/format';

export default function MyBooking() {
  const { bookings } = useApp();
  const navigate = useNavigate();

  if (bookings.length === 0) {
    return (
      <div className="page-enter pt-[120px] pb-20">
        <div className="max-w-[1320px] mx-auto px-6">
          <div className="text-center py-16">
            <div className="w-20 h-20 rounded-full mx-auto mb-5 flex items-center justify-center"
                 style={{ background: 'var(--grad-soft)', color: 'var(--blue)' }}>
              <CalendarX size={32} />
            </div>
            <h3 className="text-2xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>No bookings yet</h3>
            <p className="mb-6" style={{ color: 'var(--text-secondary)' }}>
              You haven't made any bookings. Start exploring our premium fleet.
            </p>
            <button className="btn-primary-cf" onClick={() => navigate('/cars')}>
              <Car size={18} /> Browse Cars
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-enter pt-[100px] pb-16">
      <div className="max-w-[1320px] mx-auto px-6">
        <div className="max-w-[600px] mb-10">
          <span className="section-label-cf"><CalendarCheck size={12} /> My Bookings</span>
          <h1 className="section-title-cf">Your <em>rental requests</em></h1>
          <p className="text-lg mt-3.5" style={{ color: 'var(--text-secondary)' }}>
            {bookings.length} {bookings.length === 1 ? 'booking' : 'bookings'} found
          </p>
        </div>

        <div className="flex flex-col gap-5">
          {bookings.slice().reverse().map((b, i) => (
            <div key={i} className="rounded-[20px] p-7 border"
                 style={{ background: 'var(--bg-surface)', borderColor: 'var(--border)', boxShadow: 'var(--sh-md)' }}>
              <div className="flex gap-5 flex-wrap items-start">
                <img src={b.carImage} alt={b.carName}
                     className="w-[160px] h-[110px] object-cover rounded-2xl flex-shrink-0"
                     onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=400&auto=format&fit=crop&q=80'; }} />
                <div className="flex-1 min-w-[300px]">
                  <div className="flex justify-between items-start flex-wrap gap-3 mb-3">
                    <div>
                      <div className="text-[0.75rem] font-bold uppercase tracking-widest flex items-center gap-1.5 mb-1" style={{ color: 'var(--blue)' }}>
                        <Hash size={12} /> {b.bookingId}
                      </div>
                      <h3 className="text-[1.2rem] font-bold" style={{ color: 'var(--text-primary)' }}>{b.carName}</h3>
                    </div>
                    <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[0.7rem] font-bold uppercase text-white bg-emerald-500">
                      <CheckCircle size={12} /> {b.status}
                    </span>
                  </div>
                  <Row icon={User} label="Customer" value={b.customerName} />
                  <Row icon={Calendar} label="Pickup" value={`${b.pickup} → ${b.return}`} />
                  <Row icon={MapPin} label="Location" value={b.location} />
                  <Row icon={null} label="Estimated Amount" value={formatCurrency(b.total)} total />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Row({ icon: Icon, label, value, total }) {
  return (
    <div className={`flex justify-between ${total ? 'pt-4.5 mt-1.5 font-extrabold text-[1.25rem] border-t-2' : 'py-3 text-[0.95rem] border-b'}`}
         style={{ color: total ? 'var(--text-primary)' : 'var(--text-secondary)', borderColor: 'var(--border)' }}>
      <span className="flex items-center gap-1.5">
        {Icon && <Icon size={12} />} {label}
      </span>
      <span style={total ? { background: 'var(--grad-brand)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' } : {}}>
        {value}
      </span>
    </div>
  );
}