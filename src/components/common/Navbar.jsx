import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Home, Car, LayoutDashboard, Info, Mail, CalendarCheck,
  Heart, Moon, Sun, Sparkles, Menu, X, User,
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import ProfileDropdown from '@/components/auth/ProfileDropdown';
import AuthModal from '@/components/auth/AuthModal';

const links = [
  { path: '/', label: 'Home', icon: Home },
  { path: '/cars', label: 'Cars', icon: Car },
  { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/about', label: 'About', icon: Info },
  { path: '/contact', label: 'Contact', icon: Mail },
  { path: '/my-booking', label: 'My Booking', icon: CalendarCheck },
];

export default function Navbar() {
  const { favorites, theme, toggleTheme } = useApp();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [authTab, setAuthTab] = useState('login');
  const menuRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setMenuOpen(false);
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    if (menuOpen && menuRef.current) menuRef.current.focus();
  }, [menuOpen]);

  const openAuth = (tab = 'login') => {
    setAuthTab(tab);
    setAuthOpen(true);
  };

  const favCount = favorites.length;

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-[1000] transition-all duration-300 ${
          scrolled ? 'py-2.5 shadow-lg' : 'py-4'
        }`}
        style={{
          background: scrolled ? 'var(--navbar-scrolled)' : 'var(--navbar-bg)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderBottom: scrolled
            ? '1px solid var(--border)'
            : '1px solid rgba(255,255,255,.04)',
        }}
      >
        <div className="max-w-[1320px] mx-auto px-6 flex items-center justify-between gap-5">
          <Link
            to="/"
            className="text-2xl font-extrabold tracking-tight text-white no-underline flex items-center gap-2.5 hover:scale-105 transition-transform"
          >
            <span
              className="w-9 h-9 rounded-[10px] flex items-center justify-center text-white font-extrabold"
              style={{
                background: 'var(--grad-brand)',
                boxShadow: '0 8px 20px -6px rgba(37,99,235,.6)',
              }}
            >
              C
            </span>
            CarFashion
          </Link>

          <ul
            className="hidden md:flex items-center gap-1 list-none p-1.5 rounded-full m-0"
            style={{
              background: 'rgba(255,255,255,.06)',
              border: '1px solid rgba(255,255,255,.08)',
            }}
          >
            {links.map((l) => {
              const active = pathname === l.path;
              return (
                <li key={l.path}>
                  <Link
                    to={l.path}
                    className={`block px-4 py-2.5 rounded-full text-sm font-medium no-underline transition-all ${
                      active ? 'text-white' : 'text-white/75 hover:text-white hover:bg-white/10'
                    }`}
                    style={
                      active
                        ? {
                            background: 'var(--blue)',
                            boxShadow: '0 4px 12px -4px rgba(37,99,235,.6)',
                          }
                        : {}
                    }
                  >
                    {l.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2.5">
            {/* Favorites */}
            <button
              onClick={() => navigate('/cars')}
              className={`relative w-[42px] h-[42px] rounded-full flex items-center justify-center cursor-pointer transition-all text-white ${
                favCount > 0 ? 'text-pink-500' : ''
              }`}
              style={{
                background:
                  favCount > 0 ? 'rgba(236,72,153,.15)' : 'rgba(255,255,255,.08)',
                border:
                  favCount > 0
                    ? '1px solid rgba(236,72,153,.4)'
                    : '1px solid rgba(255,255,255,.12)',
              }}
              aria-label={`Favorites (${favCount})`}
              title="Favorites"
            >
              <Heart size={18} fill={favCount > 0 ? 'currentColor' : 'none'} />
              {favCount > 0 && (
                <span
                  className="absolute -top-1 -right-1 text-[0.65rem] font-bold min-w-[18px] h-[18px] rounded-full flex items-center justify-center px-1 text-white"
                  style={{
                    background: 'var(--grad-brand)',
                    border: '2px solid var(--navy-900)',
                  }}
                >
                  {favCount}
                </span>
              )}
            </button>

            {/* Theme toggle */}
            <button
              className="w-[42px] h-[42px] rounded-full flex items-center justify-center cursor-pointer transition-all text-white hover:bg-blue-600"
              style={{
                background: 'rgba(255,255,255,.08)',
                border: '1px solid rgba(255,255,255,.12)',
              }}
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              title="Toggle theme"
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {/* AI Find Car (desktop) */}
            <Link
              to="/cars"
              className="hidden lg:inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold text-white transition-all hover:-translate-y-0.5"
              style={{
                background: 'var(--grad-brand)',
                boxShadow: '0 8px 20px -8px rgba(124,58,237,.5)',
              }}
            >
              <Sparkles size={16} /> AI Find Car
            </Link>

            {/* Profile / Login */}
            <ProfileDropdown onOpenAuth={openAuth} />

            {/* Mobile menu toggle */}
            <button
              className="md:hidden text-white text-2xl p-2 rounded-xl transition-all"
              style={{
                background: 'rgba(255,255,255,.08)',
                border: '1px solid rgba(255,255,255,.12)',
              }}
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              aria-expanded={menuOpen}
            >
              <Menu />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile overlay */}
      <div
        className={`fixed inset-0 bg-black/50 z-[1999] transition-opacity duration-300 md:hidden ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        style={{ backdropFilter: 'blur(4px)' }}
        onClick={() => setMenuOpen(false)}
      />

      {/* Mobile menu drawer */}
      <div
        ref={menuRef}
        tabIndex={-1}
        className={`fixed top-0 right-0 w-full max-w-[380px] h-screen z-[2000] p-20 px-8 pb-8 overflow-y-auto transition-transform md:hidden ${
          menuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{
          background: 'var(--bg-surface)',
          boxShadow: '-20px 0 60px rgba(0,0,0,.4)',
          transitionDuration: '400ms',
          transitionTimingFunction: 'cubic-bezier(.2,0,0,1)',
        }}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        <button
          className="absolute top-5 right-6 w-10 h-10 rounded-full flex items-center justify-center text-xl cursor-pointer transition-all hover:rotate-90 hover:bg-red-500 hover:text-white"
          style={{ background: 'var(--bg-soft)', color: 'var(--text-primary)' }}
          onClick={() => setMenuOpen(false)}
          aria-label="Close menu"
        >
          <X />
        </button>

        <div
          className="text-2xl font-extrabold mb-6 flex items-center gap-2.5"
          style={{ color: 'var(--text-primary)' }}
        >
          <span
            className="w-9 h-9 rounded-[10px] flex items-center justify-center text-white font-extrabold"
            style={{ background: 'var(--grad-brand)' }}
          >
            C
          </span>
          CarFashion
        </div>

        <ul className="list-none flex flex-col gap-1.5 p-0 mt-6">
          {links.map((l) => {
            const Icon = l.icon;
            const active = pathname === l.path;
            return (
              <li key={l.path}>
                <Link
                  to={l.path}
                  onClick={() => setMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3.5 rounded-xl text-base font-semibold no-underline transition-all ${
                    active ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-300' : ''
                  }`}
                  style={!active ? { color: 'var(--text-primary)' } : {}}
                >
                  <Icon size={18} /> {l.label}
                </Link>
              </li>
            );
          })}

          {/* Login / Sign Up in mobile */}
          <li>
            <button
              onClick={() => {
                setMenuOpen(false);
                openAuth('login');
              }}
              className="w-full flex items-center justify-center gap-3 px-4 py-3.5 rounded-xl text-base font-semibold text-white"
              style={{ background: 'var(--grad-brand)' }}
            >
              <User size={18} /> Login / Sign Up
            </button>
          </li>
        </ul>
      </div>

      {/* Auth Modal */}
      <AuthModal
        open={authOpen}
        onClose={() => setAuthOpen(false)}
        initialTab={authTab}
      />
    </>
  );
}