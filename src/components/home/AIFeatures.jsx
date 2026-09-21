import { Sparkles, MessageCircle, Route, Briefcase, Calculator, Calendar, MapPin, Award } from 'lucide-react';

const FEATURES = [
  { icon: Sparkles, title: 'AI "Find My Car"', desc: 'Describe your trip in plain English and get instant, intelligent car matches.' },
  { icon: MessageCircle, title: 'AI Rental Assistant', desc: '24/7 chat assistant answers questions about pricing, bookings, and policies.' },
  { icon: Route, title: 'AI Trip Planner', desc: 'Day-by-day itinerary generated for your destination and interests.' },
  { icon: Briefcase, title: 'Luggage Fit Checker', desc: 'Verify your bags and passengers fit before you book.' },
  { icon: Calculator, title: 'Trip Cost Calculator', desc: 'Estimate fuel, rental, and total trip cost in seconds.' },
  { icon: Calendar, title: 'Smart Availability', desc: 'AI-highlighted best-price days on a live availability calendar.' },
  { icon: MapPin, title: 'Interactive Pickup Map', desc: 'Explore pickup hubs with live car counts on an interactive map.' },
  { icon: Award, title: 'Rental Passport', desc: 'Track your trips, km, points, and savings — your loyalty passport.' },
];

export default function AIFeatures() {
  return (
    <section className="py-24" style={{ background: 'var(--bg-surface)' }}>
      <div className="max-w-[1320px] mx-auto px-6">
        <div className="max-w-[600px] mb-12">
          <span className="section-label-cf"><Sparkles size={12} /> ⭐ Innovation</span>
          <h2 className="section-title-cf">AI features that <em>redefine rental</em></h2>
          <p className="text-lg mt-3.5 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            Powered by intelligent assistants, smart planners, and personalized recommendations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURES.map((f, i) => {
            const Icon = f.icon;
            return (
              <div
                key={i}
                className="group relative overflow-hidden rounded-[20px] p-7 border cursor-pointer transition-all hover:-translate-y-1.5"
                style={{ background: 'var(--bg-surface)', borderColor: 'var(--border)' }}
              >
                <div className="absolute top-0 left-0 right-0 h-[3px] origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100"
                     style={{ background: 'var(--grad-brand)' }} />
                <div
                  className="w-13 h-13 rounded-2xl flex items-center justify-center text-white mb-4"
                  style={{ background: 'var(--grad-brand)', boxShadow: '0 8px 20px -6px rgba(124,58,237,.5)', width: 52, height: 52 }}
                >
                  <Icon size={24} />
                </div>
                <h3 className="text-[1.1rem] font-bold mb-2" style={{ color: 'var(--text-primary)' }}>{f.title}</h3>
                <p className="text-[0.88rem] leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{f.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}