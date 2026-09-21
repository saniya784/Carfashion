import { useState } from 'react';
import { Route, MapPin, Calendar, Heart, Sparkles } from 'lucide-react';
import { AIEngine } from '@/services/aiEngine';
import { useApp } from '@/context/AppContext';

export default function AITripPlanner() {
  const { addToast } = useApp();
  const [dest, setDest] = useState('');
  const [days, setDays] = useState(3);
  const [interests, setInterests] = useState('');
  const [plan, setPlan] = useState(null);

  const generate = () => {
    if (!dest.trim()) return addToast('Enter a destination', 'error');
    const interestList = interests.split(',').map((s) => s.trim()).filter(Boolean);
    setPlan(AIEngine.planTrip(dest, days, interestList));
    addToast('AI planned your trip!', 'ai');
  };

  return (
    <div
      className="rounded-[20px] p-7 mt-6 border"
      style={{ background: 'var(--bg-surface)', borderColor: 'var(--border)', boxShadow: 'var(--sh-md)' }}
    >
      <h3 className="text-[1.2rem] font-bold mb-5 flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
        <Route size={22} className="text-violet-600" /> AI Trip Planner
      </h3>
      <p className="text-[0.9rem] mb-4" style={{ color: 'var(--text-secondary)' }}>
        Tell us where you're going and how long — we'll craft a day-by-day itinerary.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
        <div>
          <label className="form-label-cf"><MapPin size={12} /> Destination</label>
          <input
            type="text"
            value={dest}
            onChange={(e) => setDest(e.target.value)}
            placeholder="e.g. Goa, Manali, Jaipur"
            className="input-cf"
          />
        </div>
        <div>
          <label className="form-label-cf"><Calendar size={12} /> Days</label>
          <input
            type="number"
            min="1"
            max="7"
            value={days}
            onChange={(e) => setDays(parseInt(e.target.value) || 1)}
            className="input-cf"
          />
        </div>
        <div>
          <label className="form-label-cf"><Heart size={12} /> Interests (comma separated)</label>
          <input
            type="text"
            value={interests}
            onChange={(e) => setInterests(e.target.value)}
            placeholder="e.g. beaches, food, history"
            className="input-cf"
          />
        </div>
      </div>

      <button className="btn-primary-cf" onClick={generate}>
        <Sparkles size={16} /> Generate Itinerary
      </button>

      {plan && (
        <div className="flex flex-col gap-3 mt-4">
          {plan.map((d, i) => (
            <div
              key={i}
              className="flex gap-4 p-3.5 rounded-xl border-l-[3px] transition-all hover:translate-x-1"
              style={{ background: 'var(--bg-soft)', borderLeftColor: 'var(--violet)' }}
            >
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-[0.85rem] flex-shrink-0"
                style={{ background: 'var(--grad-brand)' }}
              >
                {d.day}
              </div>
              <div>
                <h5 className="text-[0.9rem] font-bold mb-0.5" style={{ color: 'var(--text-primary)' }}>{d.title}</h5>
                <p className="text-[0.82rem]" style={{ color: 'var(--text-secondary)' }}>{d.desc}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}