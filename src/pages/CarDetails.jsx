import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft, Award, Star, Heart, GitCompare, CalendarCheck, CheckCircle, XCircle,
  Fuel, Users, Settings, Calendar, Gauge, Zap, Cpu, Briefcase, Info,
  Calculator, Palette, Sparkles
} from 'lucide-react';
import { CARS } from '@/data/cars';
import { useApp } from '@/context/AppContext';
import { formatCurrency } from '@/utils/format';
import CarGallery from '@/components/cars/CarGallery';
import FitChecker from '@/components/cars/FitChecker';
import CostCalculator from '@/components/cars/CostCalculator';
import AvailabilityCalendar from '@/components/cars/AvailabilityCalendar';
import CarRating from '@/components/cars/CarRating';
import AuthModal from '@/components/auth/AuthModal';

export default function CarDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    favorites,
    toggleFavorite,
    compare,
    toggleCompare,
    addRecentlyViewed,
    bookings,
  } = useApp();

  const car = CARS.find((c) => c.id === Number(id));
  const [selectedColor, setSelectedColor] = useState(0);
  const [activeTab, setActiveTab] = useState('overview');
  const [authOpen, setAuthOpen] = useState(false);
  const [authTab, setAuthTab] = useState('login');

  useEffect(() => {
    if (car) addRecentlyViewed(car.id);
  }, [car, addRecentlyViewed]);

  // Reset tab + color when switching cars
  useEffect(() => {
    setActiveTab('overview');
    setSelectedColor(0);
  }, [id]);

  if (!car) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center text-center px-6 pt-[120px] pb-16">
        <div>
          <h1
            className="text-8xl font-extrabold leading-none tracking-tight"
            style={{
              background: 'var(--grad-brand)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            404
          </h1>
          <h2 className="text-3xl font-bold mt-4 mb-3" style={{ color: 'var(--text-primary)' }}>
            Car not found
          </h2>
          <p className="mb-8" style={{ color: 'var(--text-secondary)' }}>
            The vehicle you're looking for doesn't exist.
          </p>
          <button className="btn-primary-cf" onClick={() => navigate('/cars')}>
            Browse Cars
          </button>
        </div>
      </div>
    );
  }

  const isFav = favorites.includes(car.id);
  const inCompare = compare.includes(car.id);
  const related = CARS.filter(
    (c) => c.id !== car.id && (c.category === car.category || c.brand === car.brand)
  ).slice(0, 3);
  const recentBookings = bookings.slice(-3).reverse();

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Info },
    { id: 'fit', label: 'AI Fit Checker', icon: Briefcase },
    { id: 'cost', label: 'AI Cost Calculator', icon: Calculator },
    { id: 'availability', label: 'Availability', icon: Calendar },
    { id: 'info', label: 'Rental Info', icon: Info },
  ];

  const openAuth = (tab = 'login') => {
    setAuthTab(tab);
    setAuthOpen(true);
  };

  return (
    <div className="page-enter pt-[100px] pb-16">
      <div className="max-w-[1320px] mx-auto px-6">
        <button
          className="btn-secondary-cf !py-2 !px-4.5 text-sm mb-6"
          onClick={() => navigate('/cars')}
        >
          <ArrowLeft size={16} /> Back to Cars
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-12">
          {/* LEFT COLUMN */}
          <div>
            <CarGallery car={car} />

            {/* Color selector */}
            <div className="mt-5">
              <p
                className="text-[0.85rem] font-semibold mb-2 flex items-center gap-1.5"
                style={{ color: 'var(--text-secondary)' }}
              >
                <Palette size={14} className="text-violet-600" /> Available Colors
              </p>
              <div className="flex gap-2.5 flex-wrap">
                {car.colors.map((c, i) => (
                  <button
                    key={i}
                    className={`w-9 h-9 rounded-full transition-all border-[3px] ${
                      selectedColor === i ? 'scale-115' : 'hover:scale-110'
                    }`}
                    style={{
                      background: c,
                      borderColor: selectedColor === i ? 'var(--blue)' : 'transparent',
                      boxShadow:
                        selectedColor === i
                          ? '0 0 0 3px var(--blue-soft)'
                          : '0 2px 8px rgba(0,0,0,.15)',
                    }}
                    aria-label={`Color ${i + 1}`}
                    onClick={() => setSelectedColor(i)}
                  />
                ))}
              </div>
            </div>

            {/* Header */}
            <div className="mt-8">
              <div
                className="text-[0.75rem] font-bold uppercase tracking-widest flex items-center gap-1.5 mb-2"
                style={{ color: 'var(--blue)' }}
              >
                <Award size={14} /> {car.brand}
              </div>
              <h1
                className="text-[2.2rem] font-extrabold tracking-tight"
                style={{ color: 'var(--text-primary)' }}
              >
                {car.name}
              </h1>
              <div
                className="flex items-center gap-3 text-[0.82rem] mt-3 flex-wrap"
                style={{ color: 'var(--text-muted)' }}
              >
                <span className="flex items-center gap-1 text-amber-500 font-semibold">
                  <Star size={14} fill="currentColor" /> {car.rating}
                </span>
                <span>({car.reviews} reviews)</span>
                <span>·</span>
                <span>{car.category}</span>
                <span>·</span>
                <span>{car.year}</span>
              </div>

              {/* Price & availability */}
              <div className="flex items-center gap-4 mt-5 flex-wrap">
                <div
                  className="text-[2rem] font-extrabold tracking-tight flex items-baseline gap-0.5"
                  style={{
                    background: 'var(--grad-brand)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  {formatCurrency(car.pricePerDay)}
                  <small
                    className="text-[0.78rem] font-medium"
                    style={{ WebkitTextFillColor: 'var(--text-muted)' }}
                  >
                    / day
                  </small>
                </div>
                <span
                  className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[0.7rem] font-bold uppercase text-white ${
                    car.available
                      ? car.availabilityLabel === 'Limited'
                        ? 'bg-amber-500'
                        : 'bg-emerald-500'
                      : 'bg-red-500'
                  }`}
                >
                  {car.available ? <CheckCircle size={12} /> : <XCircle size={12} />}
                  {car.availabilityLabel}
                </span>
              </div>

              {/* Action buttons */}
              <div className="flex gap-3 mt-6 flex-wrap">
                <button
                  className="btn-primary-cf !text-lg !py-4 !px-7"
                  disabled={!car.available}
                  onClick={() => navigate(`/booking/${car.id}`)}
                >
                  <CalendarCheck size={18} /> Book This Car
                </button>
                <button
                  className={isFav ? 'btn-primary-cf' : 'btn-secondary-cf'}
                  onClick={() => toggleFavorite(car.id)}
                >
                  <Heart size={18} fill={isFav ? 'currentColor' : 'none'} />
                  {isFav ? 'Saved' : 'Save'}
                </button>
                <button
                  className={inCompare ? 'btn-primary-cf' : 'btn-secondary-cf'}
                  onClick={() => toggleCompare(car.id)}
                >
                  <GitCompare size={18} /> {inCompare ? 'Added' : 'Compare'}
                </button>
              </div>

              {/* Tabs */}
              <div
                className="flex gap-2 flex-wrap mt-9 pb-3 border-b"
                style={{ borderColor: 'var(--border)' }}
              >
                {tabs.map((t) => {
                  const Icon = t.icon;
                  const active = activeTab === t.id;
                  return (
                    <button
                      key={t.id}
                      className={`px-4.5 py-2 rounded-full text-[0.88rem] font-semibold flex items-center gap-1.5 transition-all ${
                        active ? 'text-white' : ''
                      }`}
                      style={
                        active
                          ? {
                              background: 'var(--grad-brand)',
                              boxShadow: '0 8px 20px -8px rgba(124,58,237,.5)',
                            }
                          : { background: 'transparent', color: 'var(--text-secondary)' }
                      }
                      onClick={() => setActiveTab(t.id)}
                    >
                      <Icon size={14} /> {t.label}
                    </button>
                  );
                })}
              </div>

              {/* Tab content */}
              {activeTab === 'overview' && (
                <div>
                  <h3
                    className="text-[1.4rem] font-extrabold mt-6 mb-4"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    Specifications
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <SpecItem icon={Fuel}>{car.fuelType}</SpecItem>
                    <SpecItem icon={Users}>{car.seats} Seats</SpecItem>
                    <SpecItem icon={Settings}>{car.transmission}</SpecItem>
                    <SpecItem icon={Calendar}>{car.year}</SpecItem>
                    <SpecItem icon={Gauge}>{car.mileage.toLocaleString()} km</SpecItem>
                    <SpecItem icon={Zap}>{car.specifications.horsepower}</SpecItem>
                    <SpecItem icon={Cpu}>{car.specifications.engine}</SpecItem>
                    <SpecItem icon={Briefcase}>{car.specifications.bootSpace}</SpecItem>
                  </div>

                  <h3
                    className="text-[1.4rem] font-extrabold mt-8 mb-4"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    Features
                  </h3>
                  <div className="flex flex-wrap gap-2.5">
                    {car.features.map((f, i) => (
                      <span
                        key={i}
                        className="px-4.5 py-2.5 rounded-full text-[0.85rem] font-medium border flex items-center gap-1.5 transition-all hover:text-white hover:-translate-y-0.5"
                        style={{
                          background: 'var(--bg-soft)',
                          borderColor: 'var(--border)',
                          color: 'var(--text-secondary)',
                        }}
                      >
                        <CheckCircle size={12} /> {f}
                      </span>
                    ))}
                  </div>

                  <h3
                    className="text-[1.4rem] font-extrabold mt-8 mb-4"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    Description
                  </h3>
                  <p className="leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                    {car.description}
                  </p>
                </div>
              )}

              {activeTab === 'fit' && <FitChecker car={car} />}
              {activeTab === 'cost' && <CostCalculator car={car} />}
              {activeTab === 'availability' && <AvailabilityCalendar />}

              {activeTab === 'info' && (
                <div>
                  <h3
                    className="text-[1.4rem] font-extrabold mt-6 mb-4"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    Rental Information
                  </h3>
                  <div className="grid grid-cols-1 gap-3.5">
                    <SpecItem icon={CheckCircle}>
                      Security Deposit: {formatCurrency(car.securityDeposit)}
                    </SpecItem>
                    <SpecItem icon={XCircle}>{car.cancellationPolicy}</SpecItem>
                    <SpecItem icon={Fuel}>{car.fuelPolicy}</SpecItem>
                    <SpecItem icon={Briefcase}>{car.mileagePolicy}</SpecItem>
                  </div>
                </div>
              )}
            </div>

            {/* ⭐ RATINGS & REVIEWS SECTION */}
            <CarRating car={car} onOpenAuth={openAuth} />
          </div>

          {/* RIGHT COLUMN — Sticky Summary */}
          <div>
            <div
              className="rounded-[20px] p-7 border sticky top-[100px]"
              style={{
                background: 'var(--bg-surface)',
                borderColor: 'var(--border)',
                boxShadow: 'var(--sh-md)',
              }}
            >
              <img
                src={car.image}
                alt={car.name}
                className="w-full h-[180px] object-cover rounded-2xl mb-5"
                onError={(e) => {
                  e.target.src =
                    'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=600&auto=format&fit=crop&q=80';
                }}
              />
              <h3
                className="text-[1.2rem] font-bold mb-1"
                style={{ color: 'var(--text-primary)' }}
              >
                {car.name}
              </h3>
              <p className="text-[0.9rem] mb-5" style={{ color: 'var(--text-secondary)' }}>
                {car.category} · {car.transmission}
              </p>

              <SummaryRow label="Daily Rate" value={formatCurrency(car.pricePerDay)} />
              <SummaryRow label="Security Deposit" value={formatCurrency(car.securityDeposit)} />
              <SummaryRow label="Rating" value={`${car.rating} ⭐`} />

              <button
                className="btn-primary-cf w-full mt-5"
                disabled={!car.available}
                onClick={() => navigate(`/booking/${car.id}`)}
              >
                <CalendarCheck size={18} />
                {car.available ? 'Book Now' : 'Currently Unavailable'}
              </button>
            </div>
          </div>
        </div>

        {/* Related Cars */}
        {related.length > 0 && (
          <div className="mt-14 pt-10 border-t" style={{ borderColor: 'var(--border)' }}>
            <h3
              className="text-[1.5rem] font-bold mb-6 flex items-center gap-2.5"
              style={{ color: 'var(--text-primary)' }}
            >
              <Sparkles size={20} className="text-blue-600" /> AI-Personalized Recommendations
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {related.map((c) => (
                <div
                  key={c.id}
                  className="rounded-2xl overflow-hidden border cursor-pointer transition-all hover:-translate-y-1.5 hover:shadow-lg"
                  style={{ background: 'var(--bg-surface)', borderColor: 'var(--border)' }}
                  onClick={() => {
                    addRecentlyViewed(c.id);
                    navigate(`/cars/${c.id}`);
                  }}
                >
                  <img
                    src={c.image}
                    alt={c.name}
                    className="w-full h-[130px] object-cover"
                    onError={(e) => {
                      e.target.src =
                        'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=400&auto=format&fit=crop&q=80';
                    }}
                  />
                  <div className="p-3.5">
                    <p
                      className="font-semibold text-[0.95rem] mb-1"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      {c.name}
                    </p>
                    <small className="font-bold text-blue-600">
                      {formatCurrency(c.pricePerDay)}/day
                    </small>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Recent Bookings */}
        {recentBookings.length > 0 && (
          <div className="mt-14 pt-10 border-t" style={{ borderColor: 'var(--border)' }}>
            <h3
              className="text-[1.5rem] font-bold mb-6 flex items-center gap-2.5"
              style={{ color: 'var(--text-primary)' }}
            >
              <CalendarCheck size={20} className="text-blue-600" /> Your recent bookings
            </h3>
            {recentBookings.map((b, i) => (
              <div
                key={i}
                className="flex items-center gap-4 p-4 rounded-xl border mb-3"
                style={{ background: 'var(--bg-soft)', borderColor: 'var(--border)' }}
              >
                <img
                  src={b.carImage}
                  alt={b.carName}
                  className="w-[60px] h-[45px] object-cover rounded-lg"
                  onError={(e) => {
                    e.target.src =
                      'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=400&auto=format&fit=crop&q=80';
                  }}
                />
                <div className="flex-1 min-w-0">
                  <p className="font-semibold" style={{ color: 'var(--text-primary)' }}>
                    {b.carName}
                  </p>
                  <small className="text-[0.8rem]" style={{ color: 'var(--text-secondary)' }}>
                    {b.pickup} → {b.return} · {b.location}
                  </small>
                </div>
                <div className="font-bold text-blue-600">{formatCurrency(b.total)}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ⭐ AUTH MODAL */}
      <AuthModal
        open={authOpen}
        onClose={() => setAuthOpen(false)}
        initialTab={authTab}
      />
    </div>
  );
}

/* ============ HELPER COMPONENTS ============ */

function SpecItem({ icon: Icon, children }) {
  return (
    <div
      className="flex items-center gap-3 text-[0.95rem] px-4 py-3.5 rounded-xl border transition-all hover:border-blue-600 hover:bg-blue-50"
      style={{
        background: 'var(--bg-soft)',
        borderColor: 'var(--border)',
        color: 'var(--text-secondary)',
      }}
    >
      <Icon size={18} className="text-blue-600 flex-shrink-0" />
      <span>{children}</span>
    </div>
  );
}

function SummaryRow({ label, value }) {
  return (
    <div
      className="flex justify-between py-3 text-[0.95rem] border-b"
      style={{ color: 'var(--text-secondary)', borderColor: 'var(--border)' }}
    >
      <span>{label}</span>
      <span>{value}</span>
    </div>
  );
}