import { useRef, useState } from 'react';
import { Eraser, CheckCircle } from 'lucide-react';

export default function SignaturePad({ onSigned }) {
  const canvasRef = useRef(null);
  const [signing, setSigning] = useState(false);
  const [lastPos, setLastPos] = useState(null);
  const [hasSignature, setHasSignature] = useState(false);

  const getPos = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const clientX = e.clientX ?? e.touches?.[0]?.clientX ?? 0;
    const clientY = e.clientY ?? e.touches?.[0]?.clientY ?? 0;
    return { x: clientX - rect.left, y: clientY - rect.top };
  };

  const start = (e) => {
    e.preventDefault();
    setSigning(true);
    setLastPos(getPos(e));
  };

  const draw = (e) => {
    if (!signing) return;
    e.preventDefault();
    const pos = getPos(e);
    const ctx = canvasRef.current.getContext('2d');
    ctx.strokeStyle = '#0A0F1E';
    ctx.lineWidth = 2.5;
    ctx.lineCap = 'round';
    ctx.beginPath();
    if (lastPos) {
      ctx.moveTo(lastPos.x, lastPos.y);
      ctx.lineTo(pos.x, pos.y);
      ctx.stroke();
    }
    setLastPos(pos);
  };

  const end = () => {
    setSigning(false);
    setLastPos(null);
    setHasSignature(true);
    onSigned?.(true);
  };

  const clear = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasSignature(false);
    onSigned?.(null);
  };

  return (
    <div>
      <p className="text-[0.85rem] mb-3" style={{ color: 'var(--text-secondary)' }}>
        <span className="text-violet-600 font-semibold">✎</span> Sign below with your mouse or finger:
      </p>
      <canvas
        ref={canvasRef}
        width={400}
        height={120}
        onMouseDown={start}
        onMouseMove={draw}
        onMouseUp={end}
        onMouseLeave={end}
        onTouchStart={start}
        onTouchMove={draw}
        onTouchEnd={end}
        className="max-w-full rounded-xl border-[1.5px] cursor-crosshair touch-none bg-white"
        style={{ borderColor: 'var(--input-border)' }}
      />
      <div className="flex gap-3 items-center mt-3 flex-wrap">
        <button type="button" className="btn-secondary-cf !py-2 !px-4 text-sm" onClick={clear}>
          <Eraser size={14} /> Clear
        </button>
        {hasSignature && (
          <span className="text-[0.85rem] font-semibold flex items-center gap-1.5" style={{ color: 'var(--success)' }}>
            <CheckCircle size={14} /> Signature captured
          </span>
        )}
      </div>
    </div>
  );
}