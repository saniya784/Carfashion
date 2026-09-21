import { useState } from 'react';
import { Briefcase, Users, ShoppingBag, Sparkles, CheckCircle, AlertTriangle, XCircle } from 'lucide-react';
import { AIEngine } from '@/services/aiEngine';
import { useApp } from '@/context/AppContext';

export default function FitChecker({ car }) {
  const { addToast } = useApp();
  const [passengers, setPassengers] = useState(4);
  const [largeBags, setLargeBags] = useState(2);
  const [smallBags, setSmallBags] = useState(1);
  const [result, setResult] = useState(null);

  const run = () => {
    const res = AIEngine.checkFit(car, passengers, largeBags, smallBags);
    setResult(res);
    addToast('AI checked your luggage fit!', 'ai');
  };

  const ResultIcon = result?.fits ? CheckCircle : result?.tight ? AlertTriangle : XCircle;

  return (
    <div
      className="rounded-[20px] p-7 border mt-6"
      style={{ background: 'var(--bg-surface)', borderColor: 'var(--border)', boxShadow: 'var(--sh-md)' }}
    >
      <h3 className="text-[1.2rem] font-bold mb-5 flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
        <Briefcase size={22} className="text-violet-600" /> AI Luggage & Passenger Fit Checker
      </h3>
      <p className="text-[0.9rem] mb-4" style={{ color: 'var(--text-secondary)' }}>
        Tell us about your group and luggage — we'll check if everything fits.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
        <div>
          <label className="form-label-cf"><Users size={12} /> Passengers</label>
          <input
            type="number"
            min="1"
            max={car.seats}
            value={passengers}
            onChange={(e) => setPassengers(parseInt(e.target.value) || 1)}
            className="input-cf"
          />
        </div>
        <div>
          <label className="form-label-cf"><Briefcase size={12} /> Large Bags</label>
          <input
            type="number"
            min="0"
            max="10"
            value={largeBags}
            onChange={(e) => setLargeBags(parseInt(e.target.value) || 0)}
            className="input-cf"
          />
        </div>
        <div>
          <label className="form-label-cf"><ShoppingBag size={12} /> Small Bags</label>
          <input
            type="number"
            min="0"
            max="10"
            value={smallBags}
            onChange={(e) => setSmallBags(parseInt(e.target.value) || 0)}
            className="input-cf"
          />
        </div>
      </div>

      <button className="btn-primary-cf" onClick={run}>
        <Sparkles size={16} /> Check Fit
      </button>

      {result && (
        <div
          className="mt-4 p-4 rounded-xl flex items-center gap-3 text-[0.9rem] font-medium"
          style={{
            background: result.fits ? 'var(--success-soft)' : result.tight ? 'var(--warning-soft)' : 'var(--error-soft)',
            borderLeft: `4px solid ${result.fits ? 'var(--success)' : result.tight ? 'var(--warning)' : 'var(--error)'}`,
            color: 'var(--text-primary)',
            animation: 'fadeUp .3s ease',
          }}
        >
          <ResultIcon size={20} />
          <span>{result.message}</span>
        </div>
      )}
    </div>
  );
}