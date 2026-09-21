import { Link } from 'react-router-dom';
import { Instagram, Linkedin, Facebook, Twitter, Info, Car, LayoutDashboard, Mail, Sparkles, Route, Calculator, Briefcase, HelpCircle, CalendarCheck, FileText, Shield, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative overflow-hidden py-20 pb-10 text-slate-400" style={{ background: 'var(--navy-900)' }}>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] pointer-events-none"
           style={{ background: 'radial-gradient(ellipse, rgba(124,58,237,.25), transparent 70%)' }} />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] pointer-events-none"
           style={{ background: 'radial-gradient(ellipse, rgba(236,72,153,.12), transparent 70%)' }} />

      <div className="max-w-[1320px] mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-14">
          <div className="max-w-[320px]">
            <Link to="/" className="text-2xl font-extrabold tracking-tight text-white no-underline flex items-center gap-2.5 mb-5">
              <span className="w-9 h-9 rounded-[10px] flex items-center justify-center text-white font-extrabold" style={{ background: 'var(--grad-brand)' }}>C</span>
              CarFashion
            </Link>
            <p className="text-[0.95rem] leading-relaxed text-slate-400">
              Drive Beyond Ordinary. AI-powered premium car rentals for every journey — transparent, flexible, and effortless.
            </p>
            <div className="flex gap-2.5 mt-5">
              {[Instagram, Linkedin, Facebook, Twitter].map((Icon, i) => (
                <a key={i} href="#" aria-label="social" onClick={(e) => e.preventDefault()}
                   className="w-10 h-10 rounded-xl flex items-center justify-center text-slate-400 transition-all hover:-translate-y-1"
                   style={{ background: 'rgba(255,255,255,.06)', border: '1px solid rgba(255,255,255,.06)' }}>
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          <FooterCol title="Company">
            <FooterLink to="/about" icon={Info}>About</FooterLink>
            <FooterLink to="/cars" icon={Car}>Cars</FooterLink>
            <FooterLink to="/dashboard" icon={LayoutDashboard}>Dashboard</FooterLink>
            <FooterLink to="/contact" icon={Mail}>Contact</FooterLink>
          </FooterCol>

          <FooterCol title="AI Features">
            <FooterLink to="/cars" icon={Sparkles}>AI Find My Car</FooterLink>
            <FooterLink to="/" icon={Route}>AI Trip Planner</FooterLink>
            <FooterLink to="/cars" icon={Calculator}>Cost Calculator</FooterLink>
            <FooterLink to="/cars" icon={Briefcase}>Fit Checker</FooterLink>
          </FooterCol>

          <FooterCol title="Support">
            <FooterLink to="/contact" icon={HelpCircle}>Help Center</FooterLink>
            <FooterLink to="/contact" icon={CalendarCheck}>Booking Help</FooterLink>
            <FooterLink to="/about" icon={FileText}>Terms</FooterLink>
            <FooterLink to="/about" icon={Shield}>Privacy</FooterLink>
          </FooterCol>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
          <span>© 2026 CarFashion. All rights reserved.</span>
          <span className="flex items-center gap-1.5 flex-wrap justify-center">
            <Phone size={14} className="text-violet-400" /> +91 98765 43210
            <span className="mx-2 opacity-40">·</span>
            <Mail size={14} className="text-violet-400" /> hello@carfashion.com
          </span>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, children }) {
  return (
    <div>
      <h4 className="text-white text-[0.95rem] font-bold mb-5 tracking-tight">{title}</h4>
      <div className="flex flex-col gap-0">{children}</div>
    </div>
  );
}

function FooterLink({ to, icon: Icon, children }) {
  return (
    <Link to={to} className="flex items-center gap-2 text-slate-400 no-underline text-[0.9rem] mb-3 transition-all hover:text-white hover:translate-x-1 group">
      <Icon size={14} className="text-slate-500 group-hover:text-violet-400 transition-colors" /> {children}
    </Link>
  );
}