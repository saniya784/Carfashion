import { Award, Sparkles } from 'lucide-react';
import { formatCurrency } from '@/utils/format';

export default function RentalPassport({ passport }) {
  return (
    <div
      className="relative overflow-hidden rounded-[20px] p-7 text-white mt-6"
      style={{ background: 'var(--grad-brand)', boxShadow: '0 20px 40px -12px rgba(124,58,237,.5)' }}
    >
      <div
        className="absolute -top-1/2 -right-[20%] w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(255,255,255,.15), transparent 70%)' }}
      />
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
          <h3 className="text-[1.3rem] font-extrabold flex items-center gap-2.5 tracking-tight">
            <Award size={26} /> Rental Passport
          </h3>
          <span
            className="px-3.5 py-1.5 rounded-full text-[0.75rem] font-bold tracking-wider uppercase flex items-center gap-1.5 backdrop-blur-md"
            style={{ background: 'rgba(255,255,255,.2)' }}
          >
            <Sparkles size={12} /> Gold Member
          </span>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          <Stat label="Trips" value={passport.trips || 0} />
          <Stat label="Km Driven" value={(passport.km || 0).toLocaleString()} />
          <Stat label="Points" value={(passport.points || 0).toLocaleString()} />
          <Stat label="Savings" value={formatCurrency(passport.savings || 0)} />
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <div>
      <div className="text-[0.75rem] opacity-80 uppercase tracking-wider mb-1">{label}</div>
      <div className="text-[1.5rem] font-extrabold tracking-tight">{value}</div>
    </div>
  );
}