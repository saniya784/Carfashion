import { useState, useEffect } from 'react';
import {
  X, Sparkles, Mail, Lock, User, Phone, Eye, EyeOff, AlertCircle, CheckCircle,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useApp } from '@/context/AppContext';

export default function AuthModal({ open, onClose, initialTab = 'login' }) {
  const { signUp, login, loading } = useAuth();
  const { addToast } = useApp();
  const [tab, setTab] = useState(initialTab);
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    name: '', email: '', phone: '', password: '', confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');

  useEffect(() => {
    if (open) {
      setTab(initialTab);
      setForm({ name: '', email: '', phone: '', password: '', confirmPassword: '' });
      setErrors({});
      setServerError('');
    }
  }, [open, initialTab]);

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose();
    if (open) document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  useEffect(() => {
    if (open) {
      const original = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = original;
      };
    }
  }, [open]);

  if (!open) return null;

  const validate = () => {
    const errs = {};
    if (!form.email.trim()) errs.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Enter a valid email';
    if (!form.password) errs.password = 'Password is required';
    else if (form.password.length < 6) errs.password = 'Password must be at least 6 characters';

    if (tab === 'signup') {
      if (!form.name.trim()) errs.name = 'Full name is required';
      else if (form.name.trim().length < 2) errs.name = 'Name is too short';
      if (form.phone && !/^[\d\s+\-()]{7,15}$/.test(form.phone)) {
        errs.phone = 'Enter a valid phone number';
      }
      if (!form.confirmPassword) errs.confirmPassword = 'Please confirm your password';
      else if (form.confirmPassword !== form.password) {
        errs.confirmPassword = 'Passwords do not match';
      }
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError('');
    if (!validate()) return;

    try {
      if (tab === 'signup') {
        await signUp({
          name: form.name,
          email: form.email,
          password: form.password,
          phone: form.phone,
        });
        addToast(`Welcome to CarFashion, ${form.name.split(' ')[0]}! 🎉`, 'success');
      } else {
        await login({ email: form.email, password: form.password });
        addToast('Welcome back! 👋', 'success');
      }
      onClose();
    } catch (err) {
      setServerError(err.message);
      addToast(err.message, 'error');
    }
  };

  const switchTab = (newTab) => {
    setTab(newTab);
    setErrors({});
    setServerError('');
  };

  return (
    <div
      className="fixed inset-0 bg-black/70 z-[4000] flex items-center justify-center p-6 backdrop-blur-md"
      style={{ animation: 'fadeIn .2s ease' }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="relative rounded-[28px] p-8 max-w-[460px] w-full max-h-[92vh] overflow-y-auto border"
        style={{
          background: 'var(--bg-surface)',
          borderColor: 'var(--border)',
          boxShadow: 'var(--sh-xl)',
          animation: 'fadeUp .3s ease',
        }}
      >
        <button
          className="absolute top-4 right-5 w-10 h-10 rounded-full flex items-center justify-center cursor-pointer transition-all hover:rotate-90 hover:bg-red-500 hover:text-white border-0"
          style={{ background: 'var(--bg-soft)', color: 'var(--text-muted)' }}
          onClick={onClose}
          aria-label="Close"
        >
          <X size={20} />
        </button>

        <div className="text-center mb-7">
          <div
            className="w-14 h-14 rounded-2xl mx-auto mb-4 flex items-center justify-center text-white"
            style={{
              background: 'var(--grad-brand)',
              boxShadow: '0 12px 24px -8px rgba(124,58,237,.5)',
            }}
          >
            <Sparkles size={26} />
          </div>
          <h2 className="text-2xl font-extrabold tracking-tight" style={{ color: 'var(--text-primary)' }}>
            {tab === 'login' ? 'Welcome back' : 'Create your account'}
          </h2>
          <p className="text-[0.9rem] mt-1.5" style={{ color: 'var(--text-secondary)' }}>
            {tab === 'login'
              ? 'Sign in to access your bookings and favorites.'
              : 'Join CarFashion and start your premium journey.'}
          </p>
        </div>

        {/* Tabs */}
        <div className="grid grid-cols-2 gap-1 p-1 rounded-2xl mb-6" style={{ background: 'var(--bg-soft)' }}>
          <button
            type="button"
            onClick={() => switchTab('login')}
            className={`py-2.5 rounded-xl text-[0.9rem] font-semibold transition-all ${
              tab === 'login' ? 'text-white' : ''
            }`}
            style={
              tab === 'login'
                ? { background: 'var(--grad-brand)', boxShadow: '0 4px 12px -4px rgba(124,58,237,.5)' }
                : { color: 'var(--text-secondary)' }
            }
          >
            Login
          </button>
          <button
            type="button"
            onClick={() => switchTab('signup')}
            className={`py-2.5 rounded-xl text-[0.9rem] font-semibold transition-all ${
              tab === 'signup' ? 'text-white' : ''
            }`}
            style={
              tab === 'signup'
                ? { background: 'var(--grad-brand)', boxShadow: '0 4px 12px -4px rgba(124,58,237,.5)' }
                : { color: 'var(--text-secondary)' }
            }
          >
            Sign Up
          </button>
        </div>

        {serverError && (
          <div
            className="flex items-start gap-2 px-4 py-3 rounded-xl mb-5 text-[0.85rem] font-medium"
            style={{
              background: 'var(--error-soft)',
              color: 'var(--error)',
              borderLeft: '4px solid var(--error)',
            }}
          >
            <AlertCircle size={16} className="flex-shrink-0 mt-0.5" />
            <span>{serverError}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          {tab === 'signup' && (
            <>
              <InputField
                icon={User}
                label="Full Name"
                value={form.name}
                onChange={(v) => setForm({ ...form, name: v })}
                error={errors.name}
                placeholder="John Doe"
                autoComplete="name"
              />
              <InputField
                icon={Phone}
                label="Phone (optional)"
                value={form.phone}
                onChange={(v) => setForm({ ...form, phone: v })}
                error={errors.phone}
                placeholder="+91 98765 43210"
                autoComplete="tel"
              />
            </>
          )}

          <InputField
            icon={Mail}
            label="Email"
            type="email"
            value={form.email}
            onChange={(v) => setForm({ ...form, email: v })}
            error={errors.email}
            placeholder="you@example.com"
            autoComplete="email"
          />

          <PasswordField
            label="Password"
            value={form.password}
            onChange={(v) => setForm({ ...form, password: v })}
            error={errors.password}
            placeholder="••••••••"
            show={showPassword}
            onToggle={() => setShowPassword((s) => !s)}
            autoComplete={tab === 'signup' ? 'new-password' : 'current-password'}
          />

          {tab === 'signup' && (
            <PasswordField
              label="Confirm Password"
              value={form.confirmPassword}
              onChange={(v) => setForm({ ...form, confirmPassword: v })}
              error={errors.confirmPassword}
              placeholder="••••••••"
              show={showPassword}
              onToggle={() => setShowPassword((s) => !s)}
              autoComplete="new-password"
            />
          )}

          <button type="submit" disabled={loading} className="btn-primary-cf w-full mt-2 !py-3.5">
            {loading ? (
              <>
                <span className="inline-block w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                {tab === 'login' ? 'Signing in…' : 'Creating account…'}
              </>
            ) : (
              <>
                <CheckCircle size={16} />
                {tab === 'login' ? 'Login' : 'Create Account'}
              </>
            )}
          </button>
        </form>

        <p className="text-center text-[0.85rem] mt-5" style={{ color: 'var(--text-secondary)' }}>
          {tab === 'login' ? "Don't have an account? " : 'Already have an account? '}
          <button
            type="button"
            className="font-semibold text-blue-600 hover:underline"
            onClick={() => switchTab(tab === 'login' ? 'signup' : 'login')}
          >
            {tab === 'login' ? 'Sign Up' : 'Login'}
          </button>
        </p>

        <p className="text-center text-[0.72rem] mt-4 italic" style={{ color: 'var(--text-muted)' }}>
          Demo auth — accounts are stored locally in your browser.
        </p>
      </div>
    </div>
  );
}

function InputField({ icon: Icon, label, type = 'text', value, onChange, error, placeholder, autoComplete }) {
  return (
    <div className="mb-4">
      <label className="form-label-cf">
        <Icon size={12} /> {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoComplete={autoComplete}
        aria-invalid={!!error}
        className="input-cf"
      />
      {error && (
        <p className="error-msg-cf">
          <AlertCircle size={12} /> {error}
        </p>
      )}
    </div>
  );
}

function PasswordField({ label, value, onChange, error, placeholder, show, onToggle, autoComplete }) {
  return (
    <div className="mb-4">
      <label className="form-label-cf">
        <Lock size={12} /> {label}
      </label>
      <div className="relative">
        <input
          type={show ? 'text' : 'password'}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          autoComplete={autoComplete}
          aria-invalid={!!error}
          className="input-cf !pr-12"
        />
        <button
          type="button"
          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-600 transition-colors"
          onClick={onToggle}
          aria-label={show ? 'Hide password' : 'Show password'}
        >
          {show ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
      {error && (
        <p className="error-msg-cf">
          <AlertCircle size={12} /> {error}
        </p>
      )}
    </div>
  );
}