import { useState } from 'react';
import { Mail, Phone, MapPin, Clock, User, Tag, MessageSquare, Send, CheckCircle, MailCheck, AlertCircle } from 'lucide-react';
import { useApp } from '@/context/AppContext';

const CONTACT_INFO = [
  { icon: Phone, title: 'Phone', value: '+91 98765 43210' },
  { icon: Mail, title: 'Email', value: 'hello@carfashion.com' },
  { icon: MapPin, title: 'Address', value: '123 MG Road, Bhopal, MP 462001' },
  { icon: Clock, title: 'Business Hours', value: 'Mon–Sat: 8:00 AM – 9:00 PM' },
];

export default function Contact() {
  const { addToast } = useApp();
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Name is required';
    if (!form.email.trim()) errs.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Enter a valid email';
    if (!form.phone.trim()) errs.phone = 'Phone is required';
    else if (!/^[\d\s+\-()]{7,15}$/.test(form.phone)) errs.phone = 'Enter a valid phone number';
    if (!form.subject.trim()) errs.subject = 'Subject is required';
    if (!form.message.trim()) errs.message = 'Message is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) {
      addToast('Please fix the errors in the form', 'error');
      return;
    }
    setSubmitted(true);
    addToast('Message sent successfully!', 'success');
  };

  const reset = () => {
    setSubmitted(false);
    setForm({ name: '', email: '', phone: '', subject: '', message: '' });
  };

  return (
    <div className="page-enter pt-[100px] pb-16">
      <div className="max-w-[1320px] mx-auto px-6">
        <div className="max-w-[600px] mb-12">
          <span className="section-label-cf"><Mail size={12} /> Contact</span>
          <h1 className="section-title-cf">Get in <em>touch</em></h1>
          <p className="text-lg mt-3.5" style={{ color: 'var(--text-secondary)' }}>
            Have a question or need help with your booking? We're here to help.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-12">
          <div className="rounded-[20px] p-7 border"
               style={{ background: 'var(--bg-surface)', borderColor: 'var(--border)', boxShadow: 'var(--sh-sm)' }}>
            {CONTACT_INFO.map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className="flex gap-4 py-4 border-b last:border-0" style={{ borderColor: 'var(--border)' }}>
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                       style={{ background: 'var(--grad-soft)', color: 'var(--blue)' }}>
                    <Icon size={20} />
                  </div>
                  <div>
                    <h4 className="text-[0.9rem] font-bold mb-1" style={{ color: 'var(--text-primary)' }}>{item.title}</h4>
                    <p className="text-[0.9rem]" style={{ color: 'var(--text-secondary)' }}>{item.value}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {submitted ? (
            <div className="relative overflow-hidden text-center rounded-[28px] p-12 border"
                 style={{ background: 'var(--bg-surface)', borderColor: 'var(--border)', boxShadow: 'var(--sh-md)' }}>
              <div className="absolute top-0 left-0 right-0 h-1.5" style={{ background: 'var(--grad-brand)' }} />
              <div className="w-20 h-20 rounded-full mx-auto mb-5 flex items-center justify-center"
                   style={{ background: 'var(--success-soft)', color: 'var(--success)' }}>
                <MailCheck size={40} />
              </div>
              <h2 className="text-3xl font-extrabold mb-3" style={{ color: 'var(--text-primary)' }}>Message Sent</h2>
              <p className="mb-6" style={{ color: 'var(--text-secondary)' }}>
                Thank you for reaching out. We'll get back to you within 24 hours.
              </p>
              <button className="btn-primary-cf" onClick={reset}>
                <Send size={16} /> Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate
                  className="rounded-[20px] p-7 border"
                  style={{ background: 'var(--bg-surface)', borderColor: 'var(--border)', boxShadow: 'var(--sh-sm)' }}>
              <div className="mb-6">
                <label className="form-label-cf"><User size={12} /> Name *</label>
                <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                       aria-invalid={!!errors.name} placeholder="Your name" className="input-cf" />
                {errors.name && <p className="error-msg-cf"><AlertCircle size={12} /> {errors.name}</p>}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="form-label-cf"><Mail size={12} /> Email *</label>
                  <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                         aria-invalid={!!errors.email} placeholder="you@example.com" className="input-cf" />
                  {errors.email && <p className="error-msg-cf"><AlertCircle size={12} /> {errors.email}</p>}
                </div>
                <div>
                  <label className="form-label-cf"><Phone size={12} /> Phone *</label>
                  <input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })}
                         aria-invalid={!!errors.phone} placeholder="+91 98765 43210" className="input-cf" />
                  {errors.phone && <p className="error-msg-cf"><AlertCircle size={12} /> {errors.phone}</p>}
                </div>
              </div>
              <div className="mb-6">
                <label className="form-label-cf"><Tag size={12} /> Subject *</label>
                <input type="text" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })}
                       aria-invalid={!!errors.subject} placeholder="How can we help?" className="input-cf" />
                {errors.subject && <p className="error-msg-cf"><AlertCircle size={12} /> {errors.subject}</p>}
              </div>
              <div className="mb-6">
                <label className="form-label-cf"><MessageSquare size={12} /> Message *</label>
                <textarea rows="5" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                          aria-invalid={!!errors.message} placeholder="Write your message..." className="input-cf resize-none" />
                {errors.message && <p className="error-msg-cf"><AlertCircle size={12} /> {errors.message}</p>}
              </div>
              <button type="submit" className="btn-primary-cf !text-lg !py-4 w-full">
                <Send size={18} /> Send Message
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}