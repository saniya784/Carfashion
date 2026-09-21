import { Link } from 'react-router-dom';
import { LayoutDashboard, Car, Heart } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { CARS } from '@/data/cars';
import { formatCurrency } from '@/utils/format';
import RentalPassport from '@/components/dashboard/RentalPassport';
import DashboardStats from '@/components/dashboard/DashboardStats';
import BookingHistory from '@/components/dashboard/BookingHistory';

export default function Dashboard() {
  const { bookings, favorites, passport, navigate } = useApp();

  const totalSpent = bookings.reduce((s, b) => s + (b.total || 0), 0);
  const avgDays = bookings.length
    ? Math.round(bookings.reduce((s, b) => s + b.days, 0) / bookings.length)
    : 0;
  const favCars = favorites.map((id) => CARS.find((c) => c.id === id)).filter(Boolean);
  const recentBookings = bookings.slice().reverse();

  return (
    <div className="page-enter pt-[100px] pb-16">
      <div className="max-w-[1320px] mx-auto px-6">
        <div className="max-w-[600px] mb-10">
          <span className="section-label-cf"><LayoutDashboard size={12} /> Customer Dashboard</span>
          <h1 className="section-title-cf">Welcome back, <em>traveller</em></h1>
          <p className="text-lg mt-3.5" style={{ color: 'var(--text-secondary)' }}>
            Track your trips, spending, points, and personalized picks.
          </p>
        </div>

        <RentalPassport passport={passport} />
        <DashboardStats
          bookings={bookings}
          favorites={favorites}
          totalSpent={totalSpent}
          avgDays={avgDays}
        />

        <BookingHistory bookings={recentBookings.slice(0, 5)} title="Recent Bookings" />

        {favCars.length > 0 && (
          <div className="mt-14 pt-10 border-t" style={{ borderColor: 'var(--border)' }}>
            <h3 className="text-[1.5rem] font-bold mb-6 flex items-center gap-2.5" style={{ color: 'var(--text-primary)' }}>
              <Heart size={20} className="text-blue-600" /> Your Favorite Cars
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {favCars.map((c) => (
                <div key={c.id}
                     className="rounded-2xl overflow-hidden border cursor-pointer transition-all hover:-translate-y-1.5 hover:shadow-lg"
                     style={{ background: 'var(--bg-surface)', borderColor: 'var(--border)' }}
                     onClick={() => navigate(`/cars/${c.id}`)}>
                  <img src={c.image} alt={c.name} className="w-full h-[130px] object-cover"
                       onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=400&auto=format&fit=crop&q=80'; }} />
                  <div className="p-3.5">
                    <p className="font-semibold text-[0.95rem] mb-1" style={{ color: 'var(--text-primary)' }}>{c.name}</p>
                    <small className="font-bold text-blue-600">{formatCurrency(c.pricePerDay)}/day</small>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {bookings.length === 0 && favorites.length === 0 && (
          <div className="text-center py-16 mt-10">
            <div className="w-20 h-20 rounded-full mx-auto mb-5 flex items-center justify-center"
                 style={{ background: 'var(--grad-soft)', color: 'var(--blue)' }}>
              <LayoutDashboard size={32} />
            </div>
            <h3 className="text-2xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>Your dashboard is empty</h3>
            <p className="mb-6" style={{ color: 'var(--text-secondary)' }}>
              Book your first car or save favorites to see them here.
            </p>
            <button className="btn-primary-cf" onClick={() => navigate('/cars')}>
              <Car size={18} /> Browse Cars
            </button>
          </div>
        )}
      </div>
    </div>
  );
}