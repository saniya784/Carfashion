import { useEffect, useRef } from 'react';
import QRCode from 'qrcode';
import { QrCode } from 'lucide-react';

export default function BookingQR({ booking }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    const data = JSON.stringify({
      id: booking.bookingId,
      car: booking.carName,
      name: booking.customerName,
      pickup: booking.pickup,
      return: booking.return,
      total: booking.total,
    });
    QRCode.toCanvas(
      canvasRef.current,
      data,
      { width: 180, margin: 2, color: { dark: '#0A0F1E', light: '#FFFFFF' } },
      (err) => { if (err) console.error('QR generation error:', err); }
    );
  }, [booking]);

  return (
    <div className="flex flex-col items-center gap-3 p-6 bg-white rounded-2xl w-fit mx-auto mb-6">
      <canvas ref={canvasRef} className="rounded-lg" />
      <p className="text-[0.8rem] font-semibold uppercase tracking-wider flex items-center gap-1.5" style={{ color: 'var(--navy-500)' }}>
        <QrCode size={12} /> Scan at pickup
      </p>
    </div>
  );
}