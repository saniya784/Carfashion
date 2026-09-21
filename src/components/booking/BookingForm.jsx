import { User, Mail, Phone, MapPin, Calendar, CalendarCheck, MessageSquare, CheckCircle, AlertCircle } from 'lucide-react';

export default function BookingForm({ form, setForm, errors, agreed, setAgreed, agreedError, onSubmit }) {
  return (
    <form onSubmit={onSubmit} noValidate>
      <h3 className="text-[1.2rem] font-bold mb-5 flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
        <User size={18} className="text-blue-600" /> Personal Information
      </h3>

      <div className="mb-6">
        <label htmlFor="name" className="form-label-cf"><User size={12} /> Full Name *</label>
        <input
          id="name"
          type="text"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          aria-invalid={!!errors.name}
          placeholder="John Doe"
          className="input-cf"
        />
        {errors.name && <p className="error-msg-cf"><AlertCircle size={12} /> {errors.name}</p>}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div>
          <label htmlFor="email" className="form-label-cf"><Mail size={12} /> Email *</label>
          <input
            id="email"
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            aria-invalid={!!errors.email}
            placeholder="john@example.com"
            className="input-cf"
          />
          {errors.email && <p className="error-msg-cf"><AlertCircle size={12} /> {errors.email}</p>}
        </div>
        <div>
          <label htmlFor="phone" className="form-label-cf"><Phone size={12} /> Phone Number *</label>
          <input
            id="phone"
            type="tel"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            aria-invalid={!!errors.phone}
            placeholder="+91 98765 43210"
            className="input-cf"
          />
          {errors.phone && <p className="error-msg-cf"><AlertCircle size={12} /> {errors.phone}</p>}
        </div>
      </div>

      <h3 className="text-[1.2rem] font-bold my-8 flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
        <Calendar size={18} className="text-blue-600" /> Rental Information
      </h3>

      <div className="mb-6">
        <label htmlFor="location" className="form-label-cf"><MapPin size={12} /> Pickup Location *</label>
        <input
          id="location"
          type="text"
          value={form.location}
          onChange={(e) => setForm({ ...form, location: e.target.value })}
          aria-invalid={!!errors.location}
          placeholder="Bhopal, Madhya Pradesh"
          className="input-cf"
        />
        {errors.location && <p className="error-msg-cf"><AlertCircle size={12} /> {errors.location}</p>}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div>
          <label htmlFor="pickup" className="form-label-cf"><Calendar size={12} /> Pickup Date *</label>
          <input
            id="pickup"
            type="date"
            value={form.pickup}
            onChange={(e) => setForm({ ...form, pickup: e.target.value })}
            aria-invalid={!!errors.pickup}
            className="input-cf"
          />
          {errors.pickup && <p className="error-msg-cf"><AlertCircle size={12} /> {errors.pickup}</p>}
        </div>
        <div>
          <label htmlFor="return" className="form-label-cf"><CalendarCheck size={12} /> Return Date *</label>
          <input
            id="return"
            type="date"
            value={form.return}
            onChange={(e) => setForm({ ...form, return: e.target.value })}
            aria-invalid={!!errors.return}
            className="input-cf"
          />
          {errors.return && <p className="error-msg-cf"><AlertCircle size={12} /> {errors.return}</p>}
        </div>
      </div>

      <div className="mb-6">
        <label htmlFor="specialRequest" className="form-label-cf"><MessageSquare size={12} /> Special Request (optional)</label>
        <textarea
          id="specialRequest"
          rows="3"
          value={form.specialRequest}
          onChange={(e) => setForm({ ...form, specialRequest: e.target.value })}
          placeholder="Any special requirements?"
          className="input-cf resize-none"
        />
      </div>

      <div className="flex gap-2.5 items-start mb-2 mt-5">
        <input
          id="agree"
          type="checkbox"
          checked={agreed}
          onChange={(e) => setAgreed(e.target.checked)}
          className="w-[18px] h-[18px] mt-[3px] cursor-pointer"
          style={{ accentColor: 'var(--violet)' }}
        />
        <label htmlFor="agree" className="text-[0.85rem] cursor-pointer m-0" style={{ color: 'var(--text-secondary)' }}>
          I agree to the rental terms and conditions outlined above. *
        </label>
      </div>
      {agreedError && <p className="error-msg-cf"><AlertCircle size={12} /> {agreedError}</p>}

      <button type="submit" className="btn-primary-cf !text-lg !py-4 w-full mt-5">
        <CheckCircle size={18} /> Confirm Booking
      </button>
    </form>
  );
}