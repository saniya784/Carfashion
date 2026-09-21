import { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, Sparkles, Car as CarIcon, Trash2 } from 'lucide-react';
import { CARS } from '@/data/cars';
import CarCard from '@/components/cars/CarCard';
import CarFilters from '@/components/cars/CarFilters';
import { AIEngine } from '@/services/aiEngine';
import { useApp } from '@/context/AppContext';

export default function Cars() {
  const { addToast, searchPrefs } = useApp();
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('recommended');
  const [filters, setFilters] = useState({ price: [], brand: [], fuel: [], transmission: [], category: [] });
  const [mobileFilters, setMobileFilters] = useState(false);
  const [aiQuery, setAiQuery] = useState('');
  const [aiResult, setAiResult] = useState(null);

  const toggleFilter = (group, value) => {
    setFilters((prev) => {
      const arr = prev[group];
      const next = arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value];
      return { ...prev, [group]: next };
    });
  };

  const clearAll = () => {
    setFilters({ price: [], brand: [], fuel: [], transmission: [], category: [] });
    setSearch('');
    setAiResult(null);
  };

  const handleAi = () => {
    if (!aiQuery.trim()) return addToast('Describe your trip first', 'error');
    const result = AIEngine.findCars(aiQuery, CARS);
    setAiResult(result);
    addToast('AI filtered the fleet for you!', 'ai');
  };

  const filtered = useMemo(() => {
    let list = [...CARS];
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter((c) =>
        c.name.toLowerCase().includes(q) ||
        c.brand.toLowerCase().includes(q) ||
        c.model.toLowerCase().includes(q) ||
        c.category.toLowerCase().includes(q)
      );
    }
    if (filters.brand.length) list = list.filter((c) => filters.brand.includes(c.brand));
    if (filters.fuel.length) list = list.filter((c) => filters.fuel.includes(c.fuelType));
    if (filters.transmission.length) list = list.filter((c) => filters.transmission.includes(c.transmission));
    if (filters.category.length) list = list.filter((c) => filters.category.includes(c.category));

    switch (sort) {
      case 'price-asc': list.sort((a, b) => a.pricePerDay - b.pricePerDay); break;
      case 'price-desc': list.sort((a, b) => b.pricePerDay - a.pricePerDay); break;
      case 'newest': list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); break;
      case 'popular': list.sort((a, b) => b.popularity - a.popularity); break;
      default: list.sort((a, b) => b.popularity - a.popularity);
    }
    return list;
  }, [search, filters, sort]);

  return (
    <div className="page-enter pt-[100px] pb-16">
      <div className="max-w-[1320px] mx-auto px-6">
        <div className="mb-12">
          <span className="section-label-cf"><CarIcon size={12} /> Our Fleet</span>
          <h1 className="section-title-cf">Find your <em>perfect ride</em></h1>
          {searchPrefs.location && (
            <p className="text-lg mt-3.5" style={{ color: 'var(--text-secondary)' }}>Available in {searchPrefs.location}</p>
          )}
        </div>

        {/* AI Search */}
        <div className="rounded-[28px] p-8 border mb-6 relative overflow-hidden"
             style={{ background: 'var(--bg-surface)', borderColor: 'var(--border)', boxShadow: 'var(--sh-lg)' }}>
          <div className="absolute top-0 left-0 right-0 h-1" style={{ background: 'var(--grad-brand)' }} />
          <div className="relative">
            <Sparkles size={20} className="absolute left-5 top-1/2 -translate-y-1/2 text-violet-600 pointer-events-none" />
            <input
              className="input-cf !pl-14"
              type="text"
              value={aiQuery}
              onChange={(e) => setAiQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAi()}
              placeholder='AI search: "SUV for 5 with luggage under ₹5000/day"'
            />
          </div>
          <div className="flex gap-3 flex-wrap items-center mt-3">
            <button className="btn-primary-cf" onClick={handleAi}>
              <Sparkles size={16} /> AI Search
            </button>
            {aiResult && (
              <span className="text-sm font-semibold text-violet-600">
                ✓ AI found {aiResult.cars.length} top picks
              </span>
            )}
          </div>
        </div>

        {/* Search & Sort Bar */}
        <div className="flex gap-3 flex-wrap mb-6">
          <div className="relative flex-1 min-w-[280px]">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: 'var(--text-muted)' }} />
            <input
              type="text"
              placeholder="Search by name, brand, model or category..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input-cf !pl-12"
            />
          </div>
          <select className="input-cf !w-auto cursor-pointer" value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="recommended">Recommended</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="newest">Newest</option>
            <option value="popular">Popular</option>
          </select>
          <button className="btn-secondary-cf lg:hidden" onClick={() => setMobileFilters(true)}>
            <SlidersHorizontal size={16} /> Filters
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
          <CarFilters
            filters={filters}
            toggleFilter={toggleFilter}
            clearAll={clearAll}
            isMobile={false}
          />
          <div>
            <p className="text-sm font-medium mb-5" style={{ color: 'var(--text-secondary)' }}>
              <CarIcon size={14} className="inline align-middle text-blue-600" /> {filtered.length} {filtered.length === 1 ? 'car' : 'cars'} found
            </p>
            {filtered.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-20 h-20 rounded-full mx-auto mb-5 flex items-center justify-center"
                     style={{ background: 'var(--grad-soft)', color: 'var(--blue)' }}>
                  <CarIcon size={32} />
                </div>
                <h3 className="text-2xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>No cars found</h3>
                <p className="mb-6" style={{ color: 'var(--text-secondary)' }}>Try adjusting your search or filters.</p>
                <button className="btn-primary-cf" onClick={clearAll}>Clear all filters</button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-7">
                {filtered.map((car) => <CarCard key={car.id} car={car} />)}
              </div>
            )}
          </div>
        </div>
      </div>

      {mobileFilters && (
        <CarFilters
          filters={filters}
          toggleFilter={toggleFilter}
          clearAll={clearAll}
          isMobile={true}
          onClose={() => setMobileFilters(false)}
        />
      )}
    </div>
  );
}