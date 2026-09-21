import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  User,
  Mail,
  Phone,
  Save,
  Camera,
  Award,
  CalendarCheck,
  Heart,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  LogOut,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useApp } from '@/context/AppContext';
import { formatCurrency } from '@/utils/format';

export default function Profile() {
  const { user, updateProfile, logout } = useAuth();
  const { bookings, favorites, passport, addToast } = useApp();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
  });
  const [errors, setErrors] = useState({});
  const [saved, setSaved] = useState(false);

  if (!user) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center text-center px-6 pt-[120px] pb-16">
        <div>
          <h2 className="text-3xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>
            Please log in
          </h2>
          <p className="mb-6" style={{ color: 'var(--text-secondary)' }}>
            You need an account to view your profile.
          </p>
          <button className="btn-primary-cf" onClick={() => navigate('/')}>
            Back Home
          </button>
        </div>
      </div>
    );
  }

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Name is required';
    else if (form.name.trim().length < 2) errs.name = 'Name is too short';
    if (form.phone && !/^[\d\s+\-()]{7,15}$/.test(form.phone)) {
      errs.phone = 'Enter a valid phone number';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const submit = (e) => {
    e.preventDefault();
    if (!validate()) {
      addToast('Please fix the errors', 'error');
      return;
    }
    updateProfile({ name: form.name.trim(), phone: form.phone });
    addToast('Profile updated successfully!', 'success');
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handleLogout = () => {
    logout();
    addToast('Logged out', 'info');
    navigate('/');
  };

  const totalSpent = bookings.reduce((s, b) => s + (b.total || 0), 0);
  const memberSince = new Date(user.joinedAt || Date.now()).toLocaleDateString('en-IN', {
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="page-enter pt-[100px] pb-16">
      <div className="max-w-[1320px] mx-auto px-6">
        <div className="max-w-[600px] mb-10">
          <span className="section-label-cf">
            <User size={12} /> My Profile
          </span>
          <h1 className="section-title-cf">
            Your <em>account</em>
          </h1>
          <p className="text-lg mt-3.5" style={{ color: 'var(--text-secondary)' }}>
            Manage your personal information and view your rental activity.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-8">
          {/* LEFT: Avatar card */}
          <div
            className="rounded-[20px] p-7 border text-center"
            style={{
              background: 'var(--bg-surface)',
              borderColor: 'var(--border)',
              boxShadow: 'var(--sh-md)',
            }}
          >
            <div className="relative inline-block mb-4">
              <div
                className="w-24 h-24 rounded-full flex items-center justify-center text-white font-extrabold text-3xl mx-auto"
                style={{
                  background: `linear-gradient(135deg, ${user.avatar.gradient[0]}, ${user.avatar.gradient[1]})`,
                  boxShadow: '0 12px 32px -8px rgba(124,58,237,.5)',
                }}
              >
                {user.avatar.initials}
              </div>
              <button
                className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full flex items-center justify-center text-white transition-all hover:scale-110"
                style={{
                  background: 'var(--grad-brand)',
                  border: '2px solid var(--bg-surface)',
                }}
                aria-label="Change avatar"
                title="Avatar is generated from your name"
              >
                <Camera size={14} />
              </button>
            </div>

            <h3 className="text-xl font-bold mb-1" style={{ color: 'var(--text-primary)' }}>
              {user.name}
            </h3>
            <p className="text-[0.88rem] mb-4" style={{ color: 'var(--text-muted)' }}>
              {user.email}
            </p>

            <span
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[0.75rem] font-bold text-white mb-5"
              style={{ background: 'var(--grad-brand)' }}
            >
              <Award size={12} /> Member since {memberSince}
            </span>

            <div
              className="grid grid-cols-3 gap-2 pt-5 border-t"
              style={{ borderColor: 'var(--border)' }}
            >
              <MiniStat icon={CalendarCheck} label="Trips" value={bookings.length} />
              <MiniStat icon={Heart} label="Favs" value={favorites.length} />
              <MiniStat icon={TrendingUp} label="Points" value={passport?.points || 0} />
            </div>

            <button
              onClick={handleLogout}
              className="mt-6 w-full flex items-center justify-center gap-2 py-3 rounded-full text-[0.9rem] font-semibold transition-all hover:bg-red-50 text-red-600"
              style={{ border: '1px solid rgba(239,68,68,.2)' }}
            >
              <LogOut size={16} /> Log Out
            </button>
          </div>

          {/* RIGHT: Edit form + Stats */}
          <div>
            <form
              onSubmit={submit}
              noValidate
              className="rounded-[20px] p-7 border"
              style={{
                background: 'var(--bg-surface)',
                borderColor: 'var(--border)',
                boxShadow: 'var(--sh-md)',
              }}
            >
              <h3
                className="text-[1.2rem] font-bold mb-6 flex items-center gap-2"
                style={{ color: 'var(--text-primary)' }}
              >
                <User size={18} className="text-blue-600" /> Personal Information
              </h3>

              <div className="mb-5">
                <label className="form-label-cf">
                  <User size={12} /> Full Name
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  aria-invalid={!!errors.name}
                  className="input-cf"
                />
                {errors.name && (
                  <p className="error-msg-cf">
                    <AlertCircle size={12} /> {errors.name}
                  </p>
                )}
              </div>

              <div className="mb-5">
                <label className="form-label-cf">
                  <Mail size={12} /> Email
                </label>
                <input
                  type="email"
                  value={user.email}
                  disabled
                  className="input-cf opacity-60 cursor-not-allowed"
                />
                <p className="text-[0.78rem] mt-1.5" style={{ color: 'var(--text-muted)' }}>
                  Email cannot be changed (demo).
                </p>
              </div>

              <div className="mb-6">
                <label className="form-label-cf">
                  <Phone size={12} /> Phone Number
                </label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  aria-invalid={!!errors.phone}
                  placeholder="+91 98765 43210"
                  className="input-cf"
                />
                {errors.phone && (
                  <p className="error-msg-cf">
                    <AlertCircle size={12} /> {errors.phone}
                  </p>
                )}
              </div>

              <button type="submit" className="btn-primary-cf">
                {saved ? (
                  <>
                    <CheckCircle size={16} /> Saved!
                  </>
                ) : (
                  <>
                    <Save size={16} /> Save Changes
                  </>
                )}
              </button>
            </form>

            {/* Stats */}
            <div
              className="mt-6 rounded-[20px] p-7 border grid grid-cols-2 sm:grid-cols-3 gap-4"
              style={{
                background: 'var(--bg-surface)',
                borderColor: 'var(--border)',
                boxShadow: 'var(--sh-md)',
              }}
            >
              <StatBox label="Total Bookings" value={bookings.length} />
              <StatBox label="Total Spent" value={formatCurrency(totalSpent)} />
              <StatBox label="Favorites" value={favorites.length} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============ HELPER COMPONENTS ============ */

function MiniStat({ icon: Icon, label, value }) {
  return (
    <div className="text-center">
      <Icon size={16} className="mx-auto mb-1" style={{ color: 'var(--blue)' }} />
      <p className="text-[1.1rem] font-bold" style={{ color: 'var(--text-primary)' }}>
        {value}
      </p>
      <p
        className="text-[0.7rem] uppercase tracking-wider"
        style={{ color: 'var(--text-muted)' }}
      >
        {label}
      </p>
    </div>
  );
}

function StatBox({ label, value }) {
  return (
    <div className="text-center">
      <p
        className="text-[1.5rem] font-extrabold tracking-tight"
        style={{
          background: 'var(--grad-brand)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}
      >
        {value}
      </p>
      <p className="text-[0.78rem] mt-1" style={{ color: 'var(--text-secondary)' }}>
        {label}
      </p>
    </div>
  );
}