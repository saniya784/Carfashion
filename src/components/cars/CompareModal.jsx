import { useEffect } from 'react';
import { GitCompare, X } from 'lucide-react';
import { formatCurrency } from '@/utils/format';

/**
 * CompareModal — displays a side-by-side comparison of up to 3 cars.
 *
 * Props:
 *   - cars: array of car objects to compare (already resolved from IDs)
 *   - onClose: callback to close the modal
 */
export default function CompareModal({ cars, onClose }) {
  // Close on Escape key
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  // Prevent body scroll while modal is open
  useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = original;
    };
  }, []);

  const specs = [
    { label: 'Price / day', key: 'pricePerDay', format: (v) => formatCurrency(v), highlight: true },
    { label: 'Fuel Type', key: 'fuelType' },
    { label: 'Seats', key: 'seats' },
    { label: 'Transmission', key: 'transmission' },
    { label: 'Rating', key: 'rating' },
    { label: 'Reviews', key: 'reviews' },
    { label: 'Year', key: 'year' },
    { label: 'Category', key: 'category' },
    { label: 'Brand', key: 'brand' },
    { label: 'Engine', key: 'specifications', format: (v) => v.engine },
    { label: 'Horsepower', key: 'specifications', format: (v) => v.horsepower },
    { label: 'Mileage', key: 'specifications', format: (v) => v.mileage },
    { label: 'Fuel Capacity', key: 'specifications', format: (v) => v.fuelCapacity },
    { label: 'Boot Space', key: 'specifications', format: (v) => v.bootSpace },
    { label: 'Security Deposit', key: 'securityDeposit', format: (v) => formatCurrency(v) },
    { label: 'Availability', key: 'availabilityLabel' },
    { label: 'Features', key: 'features', format: (v) => v.join(', ') },
  ];

  return (
    <div
      className="fixed inset-0 bg-black/80 z-[3000] flex items-center justify-center p-6 backdrop-blur-md"
      style={{ animation: 'fadeIn .2s ease' }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-label="Car comparison"
    >
      <div
        className="relative rounded-[28px] p-9 max-w-[1000px] w-full max-h-[85vh] overflow-y-auto"
        style={{ background: 'var(--bg-surface)', boxShadow: 'var(--sh-xl)' }}
      >
        <button
          className="absolute top-4 right-5 w-10 h-10 rounded-full flex items-center justify-center text-2xl cursor-pointer transition-all hover:rotate-90 hover:bg-red-500 hover:text-white border-0"
          style={{ background: 'var(--bg-soft)', color: 'var(--text-muted)' }}
          onClick={onClose}
          aria-label="Close comparison"
        >
          <X size={20} />
        </button>

        <h2
          className="text-3xl font-extrabold mb-6 flex items-center gap-3"
          style={{ color: 'var(--text-primary)' }}
        >
          <GitCompare size={24} className="text-blue-600" /> Compare Cars
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr>
                <th
                  className="p-3.5 text-left border-b"
                  style={{
                    borderColor: 'var(--border)',
                    color: 'var(--text-muted)',
                    fontWeight: 700,
                    fontSize: '0.8rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                  }}
                >
                  Spec
                </th>
                {cars.map((c) => (
                  <th
                    key={c.id}
                    className="p-3.5 text-left border-b"
                    style={{
                      borderColor: 'var(--border)',
                      color: 'var(--text-muted)',
                      fontWeight: 700,
                      fontSize: '0.8rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      minWidth: 180,
                    }}
                  >
                    {c.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {specs.map((spec) => (
                <tr key={spec.label}>
                  <td
                    className="p-3.5 border-b font-bold"
                    style={{ borderColor: 'var(--border)', color: 'var(--text-muted)' }}
                  >
                    {spec.label}
                  </td>
                  {cars.map((c) => {
                    let val = c[spec.key];
                    if (spec.format) val = spec.format(val);
                    return (
                      <td
                        key={c.id}
                        className={`p-3.5 border-b ${spec.highlight ? 'text-blue-600 font-bold' : ''}`}
                        style={{
                          borderColor: 'var(--border)',
                          color: spec.highlight ? 'var(--blue)' : 'var(--text-secondary)',
                        }}
                      >
                        {val}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}