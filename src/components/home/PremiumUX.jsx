import { Moon, Rotate3d, Palette, Wand2, Sparkles, QrCode, FileSignature, LayoutDashboard, Gem } from 'lucide-react';

const FEATURES = [
  { icon: Moon, title: 'Dark / Light Mode', desc: 'Switch themes instantly — your preference is remembered.' },
  { icon: Rotate3d, title: '360° Gallery', desc: 'Explore every angle of your car with our interactive viewer.' },
  { icon: Palette, title: 'Car Color Selector', desc: 'Preview your car in multiple colors before booking.' },
  { icon: Wand2, title: 'Animated Transitions', desc: 'Smooth, delightful micro-interactions throughout the app.' },
  { icon: Sparkles, title: 'Personalized Recommendations', desc: 'AI suggests cars based on your history and preferences.' },
  { icon: QrCode, title: 'Booking QR', desc: 'Instant scannable QR code for your confirmed booking.' },
  { icon: FileSignature, title: 'Digital Rental Agreement', desc: 'Sign your agreement digitally with a canvas signature pad.' },
  { icon: LayoutDashboard, title: 'Customer Dashboard', desc: 'Track trips, spending, points, and your rental passport.' },
];

export default function PremiumUX() {
  return (
    <section className="py-24">
      <div className="max-w-[1320px] mx-auto px-6">
        <div className="max-w-[600px] mb-12">
          <span className="section-label-cf"><Gem size={12} /> 🚀 Premium UX</span>
          <h2 className="section-title-cf">Crafted for <em>delight</em></h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURES.map((f, i) => {
            const Icon = f.icon;
            return (
              <div
                key={i}
                className="group relative overflow-hidden rounded-[20px] p-7 border transition-all hover:-translate-y-1.5"
                style={{ background: 'var(--bg-surface)', borderColor: 'var(--border)' }}
              >
                <div
                  className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-40"
                  style={{ background: 'var(--grad-soft)' }}
                />
                <div className="relative z-10">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 transition-all group-hover:scale-110 group-hover:-rotate-6"
                    style={{ background: 'var(--grad-soft)', color: 'var(--blue)' }}
                  >
                    <Icon size={26} />
                  </div>
                  <h3 className="text-[1.15rem] font-bold mb-2" style={{ color: 'var(--text-primary)' }}>{f.title}</h3>
                  <p className="text-[0.92rem] leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{f.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}