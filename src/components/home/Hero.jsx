import { Link } from 'react-router-dom';
import { Sparkles, Car, Star, ShieldCheck } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-36 pb-24"
             style={{ background: 'var(--navy-900)' }}>
      {/* Background video */}
      <div className="absolute inset-0 z-[1]" style={{ background: 'var(--navy-900)' }}>
        <video
          autoPlay
          muted
          loop
          playsInline
          poster="https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=1920&auto=format&fit=crop&q=80"
          className="w-full h-full object-cover opacity-55 absolute inset-0"
        >
          <source src="https://assets.mixkit.co/videos/preview/mixkit-luxury-car-driving-on-a-road-at-sunset-4633-large.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 z-[2]"
             style={{ background: 'linear-gradient(135deg, rgba(10,15,30,.95) 0%, rgba(10,15,30,.65) 40%, rgba(10,15,30,.95) 100%)' }} />
        <div className="absolute inset-0 z-[3]"
             style={{
               background: 'radial-gradient(ellipse at 75% 35%, rgba(124,58,237,.35) 0%, transparent 55%), radial-gradient(ellipse at 20% 80%, rgba(236,72,153,.2) 0%, transparent 55%), radial-gradient(ellipse at 50% 50%, rgba(37,99,235,.25) 0%, transparent 60%)',
               animation: 'heroGlow 8s ease-in-out infinite alternate',
             }} />
      </div>

      <div className="relative z-[4] max-w-[1320px] mx-auto px-6 w-full">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-16 items-center">
          <div className="max-w-[640px]">
            <span
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full border text-white text-[0.85rem] font-medium mb-7 backdrop-blur-md"
              style={{ background: 'rgba(255,255,255,.08)', borderColor: 'rgba(255,255,255,.12)', animation: 'fadeUp .8s ease both' }}
            >
              <span className="w-2 h-2 rounded-full" style={{ background: 'var(--success)', boxShadow: '0 0 12px var(--success)', animation: 'pulse 2s infinite' }} />
              <Sparkles size={14} className="text-violet-400" /> AI-Powered Car Rentals
            </span>

            <h1
              className="font-extrabold text-white mb-5 tracking-tight leading-[1.05]"
              style={{ fontSize: 'clamp(2.6rem, 5.5vw, 4.5rem)', animation: 'fadeUp 1s ease both' }}
            >
              Drive Beyond{' '}
              <em
                className="not-italic"
                style={{
                  fontFamily: "'Instrument Serif', serif",
                  fontStyle: 'italic',
                  fontWeight: 400,
                  background: 'linear-gradient(135deg, #60A5FA, #A78BFA, #F472B6)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Ordinary.
              </em>
            </h1>

            <p className="text-xl mb-9 max-w-[520px]"
               style={{ color: 'rgba(255,255,255,.75)', lineHeight: 1.7, animation: 'fadeUp 1.2s ease both' }}>
              Premium cars. AI trip planning. Seamless journeys. Experience the future of car rental with CarFashion.
            </p>

            <div className="flex gap-3.5 flex-wrap mb-10" style={{ animation: 'fadeUp 1.4s ease both' }}>
              <Link to="/cars" className="btn-primary-cf !text-lg !py-4 !px-9">
                <Sparkles size={18} /> AI Find My Car
              </Link>
              <Link to="/cars" className="btn-outline-light-cf !text-lg !py-4 !px-9">
                <Car size={18} /> Explore Cars
              </Link>
            </div>

            <div className="flex gap-8 flex-wrap pt-8 border-t"
                 style={{ borderColor: 'rgba(255,255,255,.1)', animation: 'fadeUp 1.6s ease both' }}>
              <HeroStat num="500+" label="Premium Cars" />
              <HeroStat num="10K+" label="Happy Customers" />
              <HeroStat num="AI" label="Trip Planner" />
            </div>
          </div>

          <div className="relative hidden lg:flex justify-center items-center" style={{ animation: 'fadeUp 1.8s ease both' }}>
            <img
              src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&auto=format&fit=crop&q=80"
              alt="Premium car"
              className="w-full max-w-[600px] rounded-[28px] relative z-[2]"
              style={{
                boxShadow: '0 60px 100px -30px rgba(0,0,0,.8), 0 0 0 1px rgba(255,255,255,.06)',
                animation: 'float 6s ease-in-out infinite',
              }}
            />
            <FloatCard
              className="top-[15%] -left-5"
              delay="0.5s"
              icon={<Sparkles size={20} />}
              title="AI Powered"
              value="Smart Matches"
            />
            <FloatCard
              className="bottom-[18%] -right-5"
              delay="1s"
              icon={<Star size={20} fill="currentColor" />}
              title="Top Rated"
              value="4.9 / 5.0"
            />
            <FloatCard
              className="top-[45%] -right-7"
              delay="1.5s"
              icon={<ShieldCheck size={20} />}
              title="Fully Insured"
              value="100% Covered"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function HeroStat({ num, label }) {
  return (
    <div className="flex flex-col">
      <span
        className="text-[1.7rem] font-extrabold tracking-tight"
        style={{
          background: 'linear-gradient(135deg, #fff, #94A3B8)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}
      >
        {num}
      </span>
      <span className="text-[0.8rem] uppercase tracking-wider mt-0.5" style={{ color: 'rgba(255,255,255,.5)' }}>
        {label}
      </span>
    </div>
  );
}

function FloatCard({ className = '', delay = '0s', icon, title, value }) {
  return (
    <div
      className={`absolute rounded-2xl px-4.5 py-3.5 flex items-center gap-3 z-[3] ${className}`}
      style={{
        background: 'rgba(255,255,255,.95)',
        backdropFilter: 'blur(12px)',
        boxShadow: '0 20px 40px -12px rgba(0,0,0,.3)',
        animation: `float 5s ease-in-out infinite`,
        animationDelay: delay,
      }}
    >
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
        style={{ background: 'var(--grad-soft)', color: 'var(--blue)' }}
      >
        {icon}
      </div>
      <div>
        <div className="text-[0.75rem] font-semibold uppercase tracking-wider" style={{ color: 'var(--navy-500)' }}>
          {title}
        </div>
        <div className="text-[0.95rem] font-bold" style={{ color: 'var(--navy-900)' }}>{value}</div>
      </div>
    </div>
  );
}