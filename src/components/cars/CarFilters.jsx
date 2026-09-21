import { X, SlidersHorizontal, Trash2, IndianRupee, Award, Fuel, Settings, Car as CarIcon } from 'lucide-react';
import { CARS } from '@/data/cars';

const PRICE_RANGES = [
  { label: 'Under ₹2,000/day', value: 'under-2000', test: (p) => p < 2000 },
  { label: '₹2,000–₹4,000/day', value: '2000-4000', test: (p) => p >= 2000 && p < 4000 },
  { label: '₹4,000–₹7,000/day', value: '4000-7000', test: (p) => p >= 4000 && p < 7000 },
  { label: '₹7,000+/day', value: '7000-plus', test: (p) => p >= 7000 },
];

export { PRICE_RANGES };

export default function CarFilters({ filters, toggleFilter, clearAll, isMobile = false, onClose }) {
  const brands = [...new Set(CARS.map((c) => c.brand))].sort();
  const fuels = [...new Set(CARS.map((c) => c.fuelType))].sort();
  const transmissions = [...new Set(CARS.map((c) => c.transmission))].sort();
  const categories = [...new Set(CARS.map((c) => c.category))].sort();

  const activeCount =
    filters.price.length +
    filters.brand.length +
    filters.fuel.length +
    filters.transmission.length +
    filters.category.length;

  const content = (
    <>
      {isMobile && (
        <button
          className="absolute top-5 right-6 text-3xl cursor-pointer"
          style={{ color: 'var(--text-primary)', background: 'transparent', border: 'none' }}
          onClick={onClose}
          aria-label="Close filters"
        >
          <X />
        </button>
      )}

      <div className="flex justify-between items-center mb-5">
        <h3 className="text-[1.1rem] font-bold flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
          <SlidersHorizontal size={18} className="text-blue-600" /> Filters
        </h3>
        {activeCount > 0 && (
          <button className="text-sm font-semibold text-blue-600 hover:text-red-500 flex items-center gap-1.5 transition-colors" onClick={clearAll}>
            <Trash2 size={12} /> Clear
          </button>
        )}
      </div>

      <FilterGroup title="Price per day" icon={IndianRupee}>
        {PRICE_RANGES.map((r) => (
          <FilterOption
            key={r.value}
            checked={filters.price.includes(r.value)}
            onChange={() => toggleFilter('price', r.value)}
          >
            {r.label}
          </FilterOption>
        ))}
      </FilterGroup>

      <FilterGroup title="Brand" icon={Award}>
        {brands.map((b) => (
          <FilterOption
            key={b}
            checked={filters.brand.includes(b)}
            onChange={() => toggleFilter('brand', b)}
          >
            {b}
          </FilterOption>
        ))}
      </FilterGroup>

      <FilterGroup title="Fuel Type" icon={Fuel}>
        {fuels.map((f) => (
          <FilterOption
            key={f}
            checked={filters.fuel.includes(f)}
            onChange={() => toggleFilter('fuel', f)}
          >
            {f}
          </FilterOption>
        ))}
      </FilterGroup>

      <FilterGroup title="Transmission" icon={Settings}>
        {transmissions.map((t) => (
          <FilterOption
            key={t}
            checked={filters.transmission.includes(t)}
            onChange={() => toggleFilter('transmission', t)}
          >
            {t}
          </FilterOption>
        ))}
      </FilterGroup>

      <FilterGroup title="Category" icon={CarIcon}>
        {categories.map((c) => (
          <FilterOption
            key={c}
            checked={filters.category.includes(c)}
            onChange={() => toggleFilter('category', c)}
          >
            {c}
          </FilterOption>
        ))}
      </FilterGroup>
    </>
  );

  if (isMobile) {
    return (
      <>
        <div
          className="fixed inset-0 bg-black/50 z-[1999] backdrop-blur-sm"
          onClick={onClose}
        />
        <aside
          className="fixed inset-0 z-[2000] overflow-y-auto px-6 pt-20 pb-6 rounded-none"
          style={{ background: 'var(--bg-surface)' }}
          aria-label="Car filters"
        >
          {content}
        </aside>
      </>
    );
  }

  return (
    <aside
      className="hidden lg:block sticky top-[100px] h-fit rounded-[20px] p-7 border"
      style={{ background: 'var(--bg-surface)', borderColor: 'var(--border)', boxShadow: 'var(--sh-sm)' }}
      aria-label="Car filters"
    >
      {content}
    </aside>
  );
}

function FilterGroup({ title, icon: Icon, children }) {
  return (
    <div className="mb-6">
      <h4 className="text-[0.82rem] font-bold uppercase tracking-wider mb-3 flex items-center gap-1.5"
          style={{ color: 'var(--text-muted)' }}>
        <Icon size={12} className="text-blue-600" /> {title}
      </h4>
      {children}
    </div>
  );
}

function FilterOption({ checked, onChange, children }) {
  return (
    <label className="flex items-center gap-2.5 py-2 text-[0.9rem] cursor-pointer transition-colors hover:text-blue-600"
           style={{ color: 'var(--text-secondary)' }}>
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="w-[18px] h-[18px] cursor-pointer"
        style={{ accentColor: 'var(--blue)' }}
      />
      {children}
    </label>
  );
}