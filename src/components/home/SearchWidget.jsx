import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Calendar, CalendarCheck, Search, AlertCircle } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { today } from '@/utils/format';

export default function SearchWidget() {
  const { saveSearchPrefs, searchPrefs } = useApp();
  console.log('searchPrefs:', searchPrefs, 'ctx:', useApp());
  const navigate = useNavigate();
  const [form, setForm] = useState({
    location: searchPrefs.location || 'Bhopal, Madhya Pradesh',
    pickup: searchPrefs.pickup || '',
    return: searchPrefs.return || '',
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!form.location.trim()) errs.location = 'Location is required';
    if (!form.pickup) errs.pickup = 'Pickup date is required';
    else if (form.pickup < today) errs.pickup = 'Pickup date cannot be in the past';
    if (!form.return) errs.return = 'Return date is required';
    else if (form.return < form.pickup) errs.return = 'Return date must be after pickup';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const submit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    saveSearchPrefs(form);
    navigate('/cars');
  };

  return (
    <form
      onSubmit={submit}
      noValidate
      className="relative z-10 max-w-[1100px] mx-auto -mt-14 rounded-[28px] px-6 py-5 flex items-center gap-2 flex-wrap border transition-all hover:shadow-2xl"
      style={{ background: 'var(--bg-surface)', borderColor: 'var(--border)', boxShadow: 'var(--sh-xl)' }}
    >
      <Field
        icon={MapPin}
        label="Pickup Location"
        error={errors.location}
      >
        <input
          type="text"
          placeholder="Bhopal, Madhya Pradesh"
          value={form.location}
          onChange={(e) => setForm({ ...form, location: e.target.value })}
        />
      </Field>
      <Divider />
      <Field
        icon={Calendar}
        label="Pickup Date"
        error={errors.pickup}
      >
        <input
          type="date"
          min={today}
          value={form.pickup}
          onChange={(e) => setForm({ ...form, pickup: e.target.value })}
        />
      </Field>
      <Divider />
      <Field
        icon={CalendarCheck}
        label="Return Date"
        error={errors.return}
      >
        <input
          type="date"
          min={form.pickup || today}
          value={form.return}
          onChange={(e) => setForm({ ...form, return: e.target.value })}
        />
      </Field>
      <button type="submit" className="btn-primary-cf !py-3.5 !px-8 flex-shrink-0">
        <Search size={18} /> Find My Car
      </button>
    </form>
  );
}

function Field({ icon: Icon, label, error, children }) {
  return (
    <div className="flex-1 min-w-[180px] flex flex-col gap-1 px-3.5 py-2.5 rounded-xl transition-colors focus-within:bg-blue-50">
      <label className="text-[0.7rem] font-bold uppercase tracking-wider flex items-center gap-1.5"
             style={{ color: 'var(--text-muted)' }}>
        <Icon size={12} className="text-blue-600" /> {label}
      </label>
      <div className="[&>input]:w-full [&>input]:bg-transparent [&>input]:border-0 [&>input]:outline-none [&>input]:text-[0.95rem] [&>input]:font-medium [&>input]:cursor-pointer"
           style={{ color: 'var(--text-primary)' }}>
        {children}
      </div>
      {error && (
        <span className="text-[0.75rem] flex items-center gap-1" style={{ color: 'var(--error)' }} role="alert">
          <AlertCircle size={12} /> {error}
        </span>
      )}
    </div>
  );
}

function Divider() {
  return <div className="w-px h-10 flex-shrink-0 hidden md:block" style={{ background: 'var(--border)' }} />;
}