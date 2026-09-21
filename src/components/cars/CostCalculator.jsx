import { useState } from 'react';
import { Calculator, Route, Calendar, Fuel, Sparkles } from 'lucide-react';
import { AIEngine } from '@/services/aiEngine';
import { useApp } from '@/context/AppContext';
import { formatCurrency } from '@/utils/format';

export default function CostCalculator({ car }) {
  const { addToast } = useApp();
  const [distance, setDistance] = useState(300);
  const [fuelPrice, setFuelPrice] = useState(105);
  const [days, setDays] = useState(2);
  const [result, setResult] = useState(null);

  const run = () => {
    const res = AIEngine.calculateCost(car, distance, fuelPrice, days);
    setResult(res);
    addToast('AI calculated your trip cost!', 'ai');
  };

  return (
    <div
      className="rounded-[20px] p-7 border mt-6"
      style={{ background: 'var(--bg-surface)', borderColor: 'var(--border)', boxShadow: 'var(--sh-md)' }}
    >
      <h3 className="text-[1.2rem] font-bold mb-5 flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
        <Calculator size={22} className="text-violet-600" /> AI Trip Cost & Fuel Calculator
      </h3>
      <p className="text-[0.9rem] mb-4" style={{ color: 'var(--text-secondary)' }}>
        Estimate your total trip cost including fuel and rental.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
        <div>
          <label className="form-label-cf"><Route size={12} /> Distance (km)</label>
          <input type="number" min="1" value={distance}
                 onChange={(e) => setDistance(parseInt(e.target.value) || 1)}
                 className="input-cf" />
        </div>
        <div>
          <label className="form-label-cf"><Calendar size={12} /> Days</label>
          <input type="number" min="1" value={days}
                 onChange={(e) => setDays(parseInt(e.target.value) || 1)}
                 className="input-cf" />
        </div>
        <div>
          <label className="form-label-cf"><Fuel size={12} /> Fuel Price (₹/L)</label>
          <input type="number" min="1" value={fuelPrice}
                 onChange={(e) => setFuelPrice(parseInt(e.target.value) || 1)}
                 className="input-cf" />
        </div>
      </div>

      <button className="btn-primary-cf" onClick={run}>
        <Sparkles size={16} /> Calculate Cost
      </button>

      {result && (
        <div className="mt-4 p-5 rounded-2xl border"
             style={{ background: 'var(--bg-soft)', borderColor: 'var(--border)' }}>
          <div className="flex justify-between py-3 text-[0.95rem] border-b" style={{ color: 'var(--text-secondary)', borderColor: 'var(--border)' }}>
            <span>Rental ({days} days × {formatCurrency(car.pricePerDay)})</span>
            <span>{formatCurrency(result.rentalCost)}</span>
          </div>
          <div className="flex justify-between py-3 text-[0.95rem] border-b" style={{ color: 'var(--text-secondary)', borderColor: 'var(--border)' }}>
            <span>Fuel ({result.fuelLitres.toFixed(1)} {car.fuelType === 'Electric' ? 'kWh' : 'L'} @ {result.mileage} kmpl)</span>
            <span>{formatCurrency(Math.round(result.fuelCost))}</span>
          </div>
          <div className="flex justify-between pt-4.5 mt-1.5 font-extrabold text-[1.25rem] border-t-2"
               style={{ color: 'var(--text-primary)', borderColor: 'var(--border)' }}>
            <span>Estimated Total</span>
            <span style={{
              background: 'var(--grad-brand)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>{formatCurrency(Math.round(result.total))}</span>
          </div>
        </div>
      )}
    </div>
  );
}