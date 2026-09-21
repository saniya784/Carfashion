import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  User, LogOut, LayoutDashboard, Heart, CalendarCheck, Settings, ChevronDown, Award,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useApp } from '@/context/AppContext';

export default function ProfileDropdown({ onOpenAuth }) {
  const { user, logout } = useAuth();
  const { addToast, favorites, bookings, passport } = useApp();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const onClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  const handleLogout = () => {
    logout();
    setOpen(false);
    addToast('You have been logged out', 'info');
    navigate('/');
  };

  if (!user) {
    return (
      <button
        onClick={onOpenAuth}
        className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold text-white transition-all hover:-translate-y-0.5"
        style={{
          background: 'var(--grad-brand)',
          boxShadow: '0 8px 20px -8px rgba(124,58,237,.5)',
        }}
      >
        <User size={16} /> Login
      </button>
    );
  }

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 p-1 pr-2.5 rounded-full transition-all hover:bg-white/10"
        style={{
          background: 'rgba(255,255,255,.08)',
          border: '1px solid rgba(255,255,255,.12)',
        }}
        aria-haspopup="menu"
        aria-expanded={open}
      >
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-[0.8rem]"
          style={{
            background: `linear-gradient(135deg, ${user.avatar.gradient[0]}, ${user.avatar.gradient[1]})`,
          }}
        >
          {user.avatar.initials}
        </div>
        <span className="hidden md:inline text-white text-sm font-medium max-w-[100px] truncate">
          {user.name.split(' ')[0]}
        </span>
        <ChevronDown
          size={14}
          className={`text-white/70 transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {open && (
        <div
          className="absolute right-0 top-[calc(100%+10px)] w-[280px] rounded-2xl border overflow-hidden z-[1500]"
          style={{
            background: 'var(--bg-surface)',
            borderColor: 'var(--border)',
            boxShadow: 'var(--sh-xl)',
            animation: 'fadeUp .2s ease',
          }}
          role="menu"
        >
          {/* Header */}
          <div className="p-4 border-b" style={{ borderColor: 'var(--border)' }}>
            <div className="flex items-center gap-3">
              <div
                className="w-11 h-11 rounded-full flex items-center justify-center text-white font-bold"
                style={{
                  background: `linear-gradient(135deg, ${user.avatar.gradient[0]}, ${user.avatar.gradient[1]})`,
                }}
              >
                {user.avatar.initials}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[0.95rem] font-bold truncate" style={{ color: 'var(--text-primary)' }}>
                  {user.name}
                </p>
                <p className="text-[0.78rem] truncate" style={{ color: 'var(--text-muted)' }}>
                  {user.email}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 mt-3 text-[0.75rem]" style={{ color: 'var(--text-secondary)' }}>
              <span className="flex items-center gap-1">
                <Award size={12} className="text-amber-500" />
                {passport?.points || 0} pts
              </span>
              <span>·</span>
              <span>{bookings.length} bookings</span>
              <span>·</span>
              <span>{favorites.length} favs</span>
            </div>
          </div>

          {/* Menu items */}
          <div className="p-1.5">
            <MenuItem
              icon={LayoutDashboard}
              label="Dashboard"
              onClick={() => {
                navigate('/dashboard');
                setOpen(false);
              }}
            />
            <MenuItem
              icon={CalendarCheck}
              label="My Bookings"
              onClick={() => {
                navigate('/my-booking');
                setOpen(false);
              }}
              badge={bookings.length}
            />
            <MenuItem
              icon={Heart}
              label="Favorites"
              onClick={() => {
                navigate('/cars');
                setOpen(false);
              }}
              badge={favorites.length}
            />
            <MenuItem
              icon={Settings}
              label="Profile Settings"
              onClick={() => {
                navigate('/profile');
                setOpen(false);
              }}
            />
          </div>

          <div className="p-1.5 border-t" style={{ borderColor: 'var(--border)' }}>
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-[0.88rem] font-medium transition-all hover:bg-red-50 text-red-600"
            >
              <LogOut size={16} /> Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function MenuItem({ icon: Icon, label, onClick, badge }) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center justify-between gap-3 px-3.5 py-2.5 rounded-xl text-[0.88rem] font-medium transition-all hover:bg-blue-50"
      style={{ color: 'var(--text-primary)' }}
      role="menuitem"
    >
      <span className="flex items-center gap-3">
        <Icon size={16} style={{ color: 'var(--blue)' }} /> {label}
      </span>
      {badge !== undefined && badge > 0 && (
        <span
          className="text-[0.7rem] font-bold px-1.5 py-0.5 rounded-full text-white min-w-[20px] text-center"
          style={{ background: 'var(--grad-brand)' }}
        >
          {badge}
        </span>
      )}
    </button>
  );
}