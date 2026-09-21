import { FileSignature } from 'lucide-react';
import SignaturePad from './SignaturePad';

export default function DigitalAgreement({ car, onSigned }) {
  return (
    <div
      className="rounded-[20px] p-7 border mt-6"
      style={{ background: 'var(--bg-surface)', borderColor: 'var(--border)', boxShadow: 'var(--sh-md)' }}
    >
      <h3 className="text-[1.2rem] font-bold mb-5 flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
        <FileSignature size={22} className="text-violet-600" /> Digital Rental Agreement
      </h3>

      <div
        className="rounded-xl p-5 max-h-[200px] overflow-y-auto text-[0.85rem] leading-relaxed border"
        style={{ background: 'var(--bg-soft)', borderColor: 'var(--border)', color: 'var(--text-secondary)' }}
      >
        <h4 className="text-[0.9rem] font-bold mb-1.5 mt-3 first:mt-0" style={{ color: 'var(--text-primary)' }}>1. Vehicle Use</h4>
        <p>The renter agrees to use the vehicle only for lawful purposes and within the agreed rental period.</p>
        <h4 className="text-[0.9rem] font-bold mb-1.5 mt-3" style={{ color: 'var(--text-primary)' }}>2. Liability</h4>
        <p>The renter is responsible for any traffic violations, tolls, or fines incurred during the rental period.</p>
        <h4 className="text-[0.9rem] font-bold mb-1.5 mt-3" style={{ color: 'var(--text-primary)' }}>3. Fuel Policy</h4>
        <p>{car.fuelPolicy} The vehicle must be returned with the same fuel level as at pickup.</p>
        <h4 className="text-[0.9rem] font-bold mb-1.5 mt-3" style={{ color: 'var(--text-primary)' }}>4. Cancellation</h4>
        <p>{car.cancellationPolicy}</p>
        <h4 className="text-[0.9rem] font-bold mb-1.5 mt-3" style={{ color: 'var(--text-primary)' }}>5. Damage</h4>
        <p>Any damage to the vehicle during the rental period will be charged to the renter's security deposit.</p>
      </div>

      <div className="mt-5">
        <SignaturePad onSigned={onSigned} />
      </div>
    </div>
  );
}