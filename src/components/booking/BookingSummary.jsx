import { Award } from 'lucide-react';
import { formatCurrency } from '@/utils/format';

export default function BookingSummary({ car, days, subtotal, total }) {
  return (
    <div
      className="rounded-[20px] p-7 border sticky top-[100px]"
      style={{ background: 'var(--bg-surface)', borderColor: 'var(--border)', boxShadow: 'var(--sh-md)' }}
    >
      <img
        src={car.image}
        alt={car.name}
        className="w-full h-[180px] object-cover rounded-2xl mb-5"
        onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=600&auto=format&fit=crop&q=80'; }}
      />
      <div className="text-[0.75rem] font-bold uppercase tracking-widest flex items-center gap-1.5 mb-1.5" style={{ color: 'var(--blue)' }}>
        <Award size={12} /> {car.brand}
      </div>
      <h3 className="text-[1.2rem] font-bold mb-5" style={{ color: 'var(--text-primary)' }}>{car.name}</h3>

      <Row label="Rental Duration" value={`${days} ${days === 1 ? 'day' : 'days'}`} />
      <Row label="Daily Rate" value={formatCurrency(car.pricePerDay)} />
      <Row label="Subtotal" value={formatCurrency(subtotal)} />
      <Row label="Security Deposit" value={formatCurrency(car.securityDeposit)} />
      <Row label="Estimated Total" value={formatCurrency(total)} total />
    </div>
  );
}

function Row({ label, value, total = false }) {
  return (
    <div
      className={`flex justify-between ${total ? 'pt-4.5 mt-1.5 font-extrabold text-[1.25rem] border-t-2' : 'py-3 text-[0.95rem] border-b'}`}
      style={{ color: total ? 'var(--text-primary)' : 'var(--text-secondary)', borderColor: 'var(--border)' }}
    >
      <span>{label}</span>
      <span style={total ? {
        background: 'var(--grad-brand)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
      } : {}}>{value}</span>
    </div>
  );
}