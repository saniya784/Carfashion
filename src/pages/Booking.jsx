import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle, LayoutDashboard, Home } from 'lucide-react';
import { CARS } from '@/data/cars';
import { useApp } from '@/context/AppContext';
import { formatCurrency, today, calcDays } from '@/utils/format';
import BookingForm from '@/components/booking/BookingForm';
import BookingSummary from '@/components/booking/BookingSummary';
import BookingQR from '@/components/booking/BookingQR';
import DigitalAgreement from '@/components/booking/DigitalAgreement';

export default function Booking() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addBooking, addToast, searchPrefs } = useApp();
  const car = CARS.find((c) => c.id === Number(id));

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    location: searchPrefs.location || 'Bhopal, Madhya Pradesh',
    pickup: searchPrefs.pickup || '',
    return: searchPrefs.return || '',
    specialRequest: '',
  });
  const [errors, setErrors] = useState({});
  const [confirmation, setConfirmation] = useState(null);
  const [signed, setSigned] = useState(null);
  const [agreed, setAgreed] = useState(false);

  if (!car) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center text-center px-6 pt-[120px] pb-16">
        <div>
          <h1 className="text-8xl font-extrabold" style={{ background: 'var(--grad-brand)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>404</h1>
          <h2 className="text-3xl font-bold mt-4 mb-3" style={{ color: 'var(--text-primary)' }}>Car not found</h2>
          <button className="btn-primary-cf mt-4" onClick={() => navigate('/cars')}>Browse Cars</button>
        </div>
      </div>
    );
  }

  const days = calcDays(form.pickup, form.return);
  const subtotal = days * car.pricePerDay;
  const total = subtotal + car.securityDeposit;

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Full name is required';
    if (!form.email.trim()) errs.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Enter a valid email address';
    if (!form.phone.trim()) errs.phone = 'Phone number is required';
    else if (!/^[\d\s+\-()]{7,15}$/.test(form.phone)) errs.phone = 'Enter a valid phone number';
    if (!form.location.trim()) errs.location = 'Pickup location is required';
    if (!form.pickup) errs.pickup = 'Pickup date is required';
    else if (form.pickup < today) errs.pickup = 'Pickup date cannot be in the past';
    if (!form.return) errs.return = 'Return date is required';
    else if (form.return <= form.pickup) errs.return = 'Return date must be after pickup';
    if (!agreed) errs.agreed = 'Please agree to the rental terms';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) {
      addToast('Please fix the errors in the form', 'error');
      return;
    }
    const bookingId = `CF-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const booking = {
      bookingId,
      carId: car.id,
      carName: car.name,
      carImage: car.image,
      customerName: form.name,
      customerEmail: form.email,
      customerPhone: form.phone,
      location: form.location,
      pickup: form.pickup,
      return: form.return,
      specialRequest: form.specialRequest,
      days,
      dailyRate: car.pricePerDay,
      subtotal,
      securityDeposit: car.securityDeposit,
      total,
      status: 'Booking Request Received',
      createdAt: new Date().toISOString(),
      signed: !!signed,
    };
    addBooking(booking);
    setConfirmation(booking);
    addToast('Booking confirmed! QR code generated.', 'success');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (confirmation) {
    return (
      <div className="page-enter pt-[120px] pb-20">
        <div className="max-w-[1320px] mx-auto px-6">
          <div
            className="relative overflow-hidden text-center max-w-[680px] mx-auto rounded-[28px] p-14 border"
            style={{ background: 'var(--bg-surface)', borderColor: 'var(--border)', boxShadow: 'var(--sh-lg)' }}
          >
            <div className="absolute top-0 left-0 right-0 h-1.5" style={{ background: 'var(--grad-brand)' }} />
            <div className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center"
                 style={{ background: 'var(--success-soft)', color: 'var(--success)', animation: 'heartBeat .6s ease' }}>
              <CheckCircle size={40} />
            </div>
            <h2 className="text-3xl font-extrabold mb-3" style={{ color: 'var(--text-primary)' }}>Booking Confirmed 🎉</h2>
            <p className="mb-8 text-[1.05rem]" style={{ color: 'var(--text-secondary)' }}>
              Your rental has been successfully booked. Scan the QR code below at pickup.
            </p>

            <BookingQR booking={confirmation} />

            <div className="text-left rounded-2xl p-6 mb-8" style={{ background: 'var(--bg-soft)' }}>
              <Row label="Booking ID" value={confirmation.bookingId} highlight />
              <Row label="Customer" value={confirmation.customerName} />
              <Row label="Car" value={confirmation.carName} />
              <Row label="Pickup Date" value={confirmation.pickup} />
              <Row label="Return Date" value={confirmation.return} />
              <Row label="Location" value={confirmation.location} />
              <Row label="Digital Signature" value={confirmation.signed ? '✓ Signed' : 'Not signed'} success={confirmation.signed} />
              <Row label="Estimated Total" value={formatCurrency(confirmation.total)} total />
            </div>

            <div className="flex gap-3 justify-center flex-wrap">
              <button className="btn-primary-cf" onClick={() => navigate('/dashboard')}>
                <LayoutDashboard size={16} /> Go to Dashboard
              </button>
              <button className="btn-secondary-cf" onClick={() => navigate('/')}>
                <Home size={16} /> Back to Home
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-enter pt-[100px] pb-16">
      <div className="max-w-[1320px] mx-auto px-6">
        <button className="btn-secondary-cf !py-2 !px-4.5 text-sm mb-6" onClick={() => navigate(`/cars/${car.id}`)}>
          <ArrowLeft size={16} /> Back to Details
        </button>

        <div className="max-w-[600px] mb-10">
          <span className="section-label-cf"><CalendarCheck size={12} /> Booking</span>
          <h1 className="section-title-cf">Complete your <em>reservation</em></h1>
          <p className="text-lg mt-3.5" style={{ color: 'var(--text-secondary)' }}>
            Fill in your details, sign the digital agreement, and confirm.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 items-start">
          <div>
            <BookingForm
              form={form}
              setForm={setForm}
              errors={errors}
              agreed={agreed}
              setAgreed={setAgreed}
              agreedError={errors.agreed}
              onSubmit={handleSubmit}
            />
            <DigitalAgreement car={car} onSigned={setSigned} />
          </div>
          <BookingSummary car={car} days={days} subtotal={subtotal} total={total} />
        </div>
      </div>
    </div>
  );
}

function Row({ label, value, highlight, success, total }) {
  return (
    <div className={`flex justify-between ${total ? 'pt-4.5 mt-1.5 font-extrabold text-[1.25rem] border-t-2' : 'py-3 text-[0.95rem] border-b'}`}
         style={{ color: total ? 'var(--text-primary)' : 'var(--text-secondary)', borderColor: 'var(--border)' }}>
      <span>{label}</span>
      <span style={
        total ? { background: 'var(--grad-brand)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }
        : highlight ? { color: 'var(--blue)', fontWeight: 700 }
        : success ? { color: 'var(--success)', fontWeight: 700 }
        : {}
      }>{value}</span>
    </div>
  );
}