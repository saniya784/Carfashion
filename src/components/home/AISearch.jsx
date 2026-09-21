import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, MessageCircle, Zap } from 'lucide-react';
import { AIEngine } from '@/services/aiEngine';
import { CARS } from '@/data/cars';
import { useApp } from '@/context/AppContext';
import { formatCurrency } from '@/utils/format';

const SUGGESTIONS = [
  'Cheap car for 4',
  'Luxury SUV for wedding',
  'Electric car for city',
  '7-seater for family',
];

export default function AISearch() {
  const { addToast, addRecentlyViewed } = useApp();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [result, setResult] = useState(null);

  const handleSearch = (q) => {
    const text = (q ?? query).trim();
    if (!text) return addToast('Describe your trip first', 'error');
    setResult(AIEngine.findCars(text, CARS));
    addToast('AI found your matches!', 'ai');
  };

  return (
    <div
      className="rounded-[28px] p-8 mt-8 relative overflow-hidden border"
      style={{ background: 'var(--bg-surface)', borderColor: 'var(--border)', boxShadow: 'var(--sh-lg)' }}
    >
      <div className="absolute top-0 left-0 right-0 h-1" style={{ background: 'var(--grad-brand)' }} />

      <div className="flex items-center gap-3 mb-4">
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center text-white"
          style={{ background: 'var(--grad-brand)' }}
        >
          <Sparkles size={22} />
        </div>
        <div>
          <h3 className="text-[1.2rem] font-bold" style={{ color: 'var(--text-primary)' }}>AI "Find My Car"</h3>
          <p className="text-[0.88rem]" style={{ color: 'var(--text-secondary)' }}>
            Describe your trip in plain English — our AI matches the perfect car.
          </p>
        </div>
      </div>

      <div className="relative mb-4">
        <MessageCircle size={20} className="absolute left-5 top-1/2 -translate-y-1/2 pointer-events-none text-violet-600" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          placeholder='e.g. "SUV for 5 people with lots of luggage for a mountain trip under ₹5000/day"'
          className="input-cf !pl-14 !py-[18px]"
          aria-label="AI trip search"
        />
      </div>

      <div className="flex gap-3 flex-wrap items-center">
        <button className="btn-primary-cf" onClick={() => handleSearch()}>
          <Sparkles size={16} /> AI Search
        </button>
        <div className="flex flex-wrap gap-2">
          {SUGGESTIONS.map((s) => (
            <button
              key={s}
              className="px-4 py-2 rounded-full border text-[0.85rem] font-medium flex items-center gap-1.5 transition-all hover:text-white hover:-translate-y-0.5"
              style={{ background: 'var(--bg-soft)', borderColor: 'var(--border)', color: 'var(--text-secondary)' }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--grad-brand)'; e.currentTarget.style.borderColor = 'transparent'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--bg-soft)'; e.currentTarget.style.borderColor = 'var(--border)'; }}
              onClick={() => { setQuery(s); setTimeout(() => handleSearch(s), 50); }}
            >
              <Zap size={12} /> {s}
            </button>
          ))}
        </div>
      </div>

      {result && (
        <div
          className="mt-5 p-5 rounded-2xl border-l-4"
          style={{ background: 'var(--bg-soft)', borderLeftColor: 'var(--violet)', animation: 'fadeUp .4s ease' }}
        >
          <h4 className="text-base font-bold mb-2 flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
            <Sparkles size={16} className="text-violet-600" /> AI Recommendation
          </h4>
          <p className="text-[0.9rem] mb-3" style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>
            {result.reasonText}{' '}
            <span className="font-semibold text-violet-600">({result.totalMatches} total matches)</span>
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {result.cars.map((c) => (
              <div
                key={c.id}
                className="flex gap-2.5 items-center p-2.5 rounded-xl border cursor-pointer transition-all hover:-translate-y-1"
                style={{ background: 'var(--bg-surface)', borderColor: 'var(--border)' }}
                onClick={() => { addRecentlyViewed(c.id); navigate(`/cars/${c.id}`); }}
              >
                <img
                  src={c.image}
                  alt={c.name}
                  className="w-14 h-[42px] object-cover rounded-lg"
                  onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=200&auto=format&fit=crop&q=80'; }}
                />
                <div className="flex-1">
                  <p className="text-[0.85rem] font-semibold" style={{ color: 'var(--text-primary)' }}>{c.name}</p>
                  <small className="text-[0.75rem] font-bold text-blue-600">{formatCurrency(c.pricePerDay)}/day</small>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}