import Hero from '@/components/home/Hero';
import SearchWidget from '@/components/home/SearchWidget';
import AISearch from '@/components/home/AISearch';
import AITripPlanner from '@/components/home/AITripPlanner';
import RecentlyViewed from '@/components/home/RecentlyViewed';
import AIFeatures from '@/components/home/AIFeatures';
import PremiumUX from '@/components/home/PremiumUX';
import AnimatedStats from '@/components/common/AnimatedStats';
import CarCard from '@/components/cars/CarCard';
import { CARS } from '@/data/cars';
import { Link } from 'react-router-dom';
import { Star, ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <div className="page-enter">
      <Hero />
      <div className="max-w-[1320px] mx-auto px-6">
        <SearchWidget />
        <AISearch />
        <AITripPlanner />
      </div>
      <RecentlyViewed />

      <section className="py-24">
        <div className="max-w-[1320px] mx-auto px-6">
          <div className="flex justify-between items-end mb-12 flex-wrap gap-5">
            <div className="max-w-[600px]">
              <span className="section-label-cf"><Star size={12} /> Featured Fleet</span>
              <h2 className="section-title-cf">Premium cars for <em>every journey</em></h2>
              <p className="text-lg mt-3.5 leading-relaxed" style={{ color: 'var(--text-secondary)', maxWidth: 620 }}>
                Handpicked vehicles maintained to the highest standards.
              </p>
            </div>
            <Link to="/cars" className="btn-secondary-cf">
              View All Cars <ArrowRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {CARS.slice(0, 6).map((car) => <CarCard key={car.id} car={car} />)}
          </div>
        </div>
      </section>

      <AIFeatures />
      <PremiumUX />

      <section className="py-24" style={{ background: 'var(--bg-surface)' }}>
        <div className="max-w-[1320px] mx-auto px-6">
          <div className="text-center mb-12">
            <span className="section-label-cf">📈 By the Numbers</span>
            <h2 className="section-title-cf">CarFashion <em>at a glance</em></h2>
          </div>
          <AnimatedStats />
          <p className="text-center text-xs mt-6 italic" style={{ color: 'var(--text-muted)' }}>
            * Demo statistics for illustrative purposes only.
          </p>
        </div>
      </section>
    </div>
  );
}