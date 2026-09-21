import { BookOpen, Target, Sparkles, MessageCircle, Route, Briefcase, Calculator, Calendar, Briefcase as BriefIcon, CalendarDays, CalendarRange, Plane, Building2, Crown, TrendingUp } from 'lucide-react';
import AnimatedStats from '@/components/common/AnimatedStats';

const AI_FEATURES = [
  { icon: Sparkles, title: 'AI Find My Car', desc: 'Natural language search across our entire fleet.' },
  { icon: MessageCircle, title: 'AI Rental Assistant', desc: '24/7 chat support for all your questions.' },
  { icon: Route, title: 'AI Trip Planner', desc: 'Custom day-by-day itineraries.' },
  { icon: Briefcase, title: 'Luggage Fit Checker', desc: 'Smart bag & passenger fit analysis.' },
  { icon: Calculator, title: 'Cost Calculator', desc: 'Fuel + rental cost estimates.' },
  { icon: Calendar, title: 'Smart Calendar', desc: 'Best-price day highlighting.' },
];

const SERVICES = [
  { icon: Calendar, title: 'Daily Rentals', desc: 'Perfect for short trips and weekend getaways.' },
  { icon: CalendarDays, title: 'Weekly Rentals', desc: 'Save more on extended journeys.' },
  { icon: CalendarRange, title: 'Long-Term Rentals', desc: 'Flexible monthly plans for every budget.' },
  { icon: Plane, title: 'Airport Pickup', desc: 'Convenient pickup at major airports.' },
  { icon: Building2, title: 'Corporate Rentals', desc: 'Tailored fleet solutions for businesses.' },
  { icon: Crown, title: 'Luxury Car Rentals', desc: 'Premium vehicles for special occasions.' },
];

export default function About() {
  return (
    <div className="page-enter">
      <section className="relative overflow-hidden text-center pt-36 pb-20" style={{ background: 'var(--navy-900)' }}>
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(124,58,237,.25) 0%, transparent 70%)' }} />
        <div className="absolute -bottom-24 -left-24 w-[400px] h-[400px]"
             style={{ background: 'radial-gradient(ellipse, rgba(37,99,235,.2), transparent 70%)' }} />
        <div className="relative z-10 max-w-[1320px] mx-auto px-6">
          <h1 className="font-extrabold text-white mb-4 tracking-tight" style={{ fontSize: 'clamp(2.4rem, 5vw, 3.8rem)' }}>
            Moving People.{' '}
            <em className="not-italic" style={{
              fontFamily: "'Instrument Serif', serif",
              fontStyle: 'italic',
              fontWeight: 400,
              background: 'linear-gradient(135deg, #60A5FA, #A78BFA, #F472B6)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>Creating Journeys.</em>
          </h1>
          <p className="text-xl max-w-[600px] mx-auto" style={{ color: 'rgba(255,255,255,.7)' }}>
            CarFashion is redefining car rental with AI-powered matching, premium vehicles, transparent pricing, and a seamless digital experience.
          </p>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-[1320px] mx-auto px-6">
          <div className="max-w-[800px] mx-auto">
            <span className="section-label-cf"><BookOpen size={12} /> Our Story</span>
            <h2 className="section-title-cf mb-5">Built for the <em>modern traveller</em></h2>
            <p className="text-[1.05rem] leading-loose mb-6" style={{ color: 'var(--text-secondary)' }}>
              CarFashion was founded with a simple belief: renting a car should be as enjoyable as driving one. We combine a meticulously maintained fleet with AI-powered intelligence and a frictionless digital booking experience.
            </p>
            <p className="text-[1.05rem] leading-loose" style={{ color: 'var(--text-secondary)' }}>
              From luxury sedans to rugged SUVs and electric vehicles, our diverse fleet caters to every occasion. Our AI assistant helps you find the perfect car, plan your trip, and estimate costs — all in seconds.
            </p>
          </div>

          <div className="max-w-[800px] mx-auto mt-16">
            <span className="section-label-cf"><Target size={12} /> Our Mission</span>
            <h2 className="section-title-cf mb-5">Make car rental <em>simple, transparent and intelligent.</em></h2>
            <p className="text-[1.05rem] leading-loose" style={{ color: 'var(--text-secondary)' }}>
              We're committed to removing friction from car rental — no hidden fees, no confusing policies, no unnecessary steps. Just intelligent matching and delightful experiences.
            </p>
          </div>

          <div className="max-w-[1000px] mx-auto mt-20">
            <div className="text-center mb-12">
              <span className="section-label-cf"><Sparkles size={12} /> ⭐ Innovation</span>
              <h2 className="section-title-cf">Powered by <em>AI</em></h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {AI_FEATURES.map((f, i) => (
                <AIFeatureCard key={i} {...f} />
              ))}
            </div>
          </div>

          <div className="max-w-[800px] mx-auto mt-16">
            <span className="section-label-cf"><BriefIcon size={12} /> Our Services</span>
            <h2 className="section-title-cf mb-8">Rentals for <em>every need</em></h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {SERVICES.map((s, i) => (
                <ServiceCard key={i} {...s} />
              ))}
            </div>
          </div>

          <div className="mt-20">
            <div className="text-center mb-12">
              <span className="section-label-cf"><TrendingUp size={12} /> By the Numbers</span>
              <h2 className="section-title-cf">CarFashion <em>at a glance</em></h2>
            </div>
            <AnimatedStats />
            <p className="text-center text-xs mt-6 italic" style={{ color: 'var(--text-muted)' }}>
              * Demo statistics for illustrative purposes only.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

function AIFeatureCard({ icon: Icon, title, desc }) {
  return (
    <div className="group relative overflow-hidden rounded-[20px] p-7 border transition-all hover:-translate-y-1.5"
         style={{ background: 'var(--bg-surface)', borderColor: 'var(--border)' }}>
      <div className="absolute top-0 left-0 right-0 h-[3px] origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100"
           style={{ background: 'var(--grad-brand)' }} />
      <div className="w-13 h-13 rounded-2xl flex items-center justify-center text-white mb-4"
           style={{ background: 'var(--grad-brand)', boxShadow: '0 8px 20px -6px rgba(124,58,237,.5)', width: 52, height: 52 }}>
        <Icon size={24} />
      </div>
      <h3 className="text-[1.1rem] font-bold mb-2" style={{ color: 'var(--text-primary)' }}>{title}</h3>
      <p className="text-[0.88rem] leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{desc}</p>
    </div>
  );
}

function ServiceCard({ icon: Icon, title, desc }) {
  return (
    <div className="group relative overflow-hidden rounded-[20px] p-7 border transition-all hover:-translate-y-1.5"
         style={{ background: 'var(--bg-surface)', borderColor: 'var(--border)' }}>
      <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-40"
           style={{ background: 'var(--grad-soft)' }} />
      <div className="relative z-10">
        <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 transition-all group-hover:scale-110 group-hover:-rotate-6"
             style={{ background: 'var(--grad-soft)', color: 'var(--blue)' }}>
          <Icon size={26} />
        </div>
        <h3 className="text-[1.15rem] font-bold mb-2" style={{ color: 'var(--text-primary)' }}>{title}</h3>
        <p className="text-[0.92rem] leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{desc}</p>
      </div>
    </div>
  );
}