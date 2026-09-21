import { useState, useEffect } from 'react';
import { GitCompare, X, Trash2 } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { CARS } from '@/data/cars';
import CompareModal from '@/components/cars/CompareModal';
import { setStorage } from '@/utils/storage';

export default function CompareBar() {
  const { compare, setCompare } = useApp();
  const [modalOpen, setModalOpen] = useState(false);

  const cars = compare.map((id) => CARS.find((c) => c.id === id)).filter(Boolean);

  const remove = (id) => {
    const next = compare.filter((c) => c !== id);
    setCompare(next);
    setStorage('cf_compare', next);
  };

  if (compare.length === 0) return null;

  return (
    <>
      <div
        className="fixed bottom-0 left-0 w-full z-[900] py-3.5 border-t transition-transform duration-300"
        style={{ background: 'var(--bg-surface)', borderColor: 'var(--border)', boxShadow: '0 -12px 32px rgba(0,0,0,.08)' }}
      >
        <div className="max-w-[1320px] mx-auto px-6 flex items-center justify-between gap-4 flex-wrap">
          <div className="flex gap-2.5 flex-wrap items-center">
            <span className="font-semibold text-sm flex items-center gap-1.5" style={{ color: 'var(--text-muted)' }}>
              <GitCompare size={16} className="text-blue-600" /> Compare ({compare.length}/3):
            </span>
            {cars.map((c) => (
              <span key={c.id} className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border"
                    style={{ background: 'var(--bg-soft)', color: 'var(--text-secondary)', borderColor: 'var(--border)' }}>
                {c.name}
                <button onClick={() => remove(c.id)} aria-label={`Remove ${c.name}`} className="flex items-center text-slate-400 hover:text-red-500 transition-all">
                  <X size={14} />
                </button>
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            <button className="btn-secondary-cf !py-2 !px-4.5 text-sm" onClick={() => { setCompare([]); setStorage('cf_compare', []); }}>
              <Trash2 size={14} /> Clear
            </button>
            <button className="btn-primary-cf !py-2 !px-4.5 text-sm" disabled={compare.length < 2} onClick={() => setModalOpen(true)}>
              <GitCompare size={14} /> Compare Now
            </button>
          </div>
        </div>
      </div>
      {modalOpen && <CompareModal cars={cars} onClose={() => setModalOpen(false)} />}
    </>
  );
}