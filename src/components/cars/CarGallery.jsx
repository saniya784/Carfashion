import { useState } from 'react';
import { Rotate3d, X, MoveHorizontal } from 'lucide-react';

export default function CarGallery({ car }) {
  const [activeImg, setActiveImg] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);
  const [viewer360, setViewer360] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startRot, setStartRot] = useState(0);

  const handlePointerDown = (e) => {
    setDragging(true);
    setStartX(e.clientX || e.touches?.[0]?.clientX || 0);
    setStartRot(rotation);
  };

  const handlePointerMove = (e) => {
    if (!dragging) return;
    const x = e.clientX || e.touches?.[0]?.clientX || 0;
    setRotation(startRot + (x - startX) * 0.8);
  };

  const handlePointerUp = () => setDragging(false);

  return (
    <>
      <div
        className="relative rounded-[20px] overflow-hidden mb-3 cursor-zoom-in aspect-[16/10]"
        style={{ background: 'var(--bg-soft)', boxShadow: 'var(--sh-lg)' }}
        onClick={() => setFullscreen(true)}
      >
        <img
          src={car.gallery[activeImg]}
          alt={`${car.name} view ${activeImg + 1}`}
          className="w-full h-full object-cover block transition-transform duration-500 hover:scale-105"
          onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=1200&auto=format&fit=crop&q=80'; }}
        />
        <button
          className="absolute bottom-4 right-4 px-4.5 py-2.5 rounded-full text-white text-sm font-semibold flex items-center gap-2 backdrop-blur-md transition-all hover:scale-105 z-10"
          style={{ background: 'rgba(0,0,0,.7)' }}
          onClick={(e) => { e.stopPropagation(); setViewer360(true); }}
        >
          <Rotate3d size={16} /> 360° View
        </button>
      </div>

      <div className="flex gap-2.5 overflow-x-auto pb-1">
        {car.gallery.map((img, i) => (
          <img
            key={i}
            src={img}
            alt={`${car.name} thumbnail ${i + 1}`}
            className={`w-[90px] h-[65px] object-cover rounded-[10px] cursor-pointer transition-all flex-shrink-0 border-2 ${
              activeImg === i ? 'opacity-100 border-blue-600 scale-105' : 'opacity-60 border-transparent hover:opacity-100 hover:border-blue-600 hover:scale-105'
            }`}
            onClick={() => setActiveImg(i)}
            onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=400&auto=format&fit=crop&q=80'; }}
          />
        ))}
      </div>

      {fullscreen && (
        <div
          className="fixed inset-0 bg-black/95 z-[4000] flex items-center justify-center p-10 backdrop-blur-md"
          style={{ animation: 'fadeIn .2s ease' }}
          onClick={() => setFullscreen(false)}
        >
          <button
            className="absolute top-8 right-10 text-white text-2xl w-14 h-14 rounded-full flex items-center justify-center transition-all hover:rotate-90 hover:bg-red-500"
            style={{ background: 'rgba(255,255,255,.1)', border: 'none' }}
            onClick={() => setFullscreen(false)}
            aria-label="Close fullscreen"
          >
            <X size={24} />
          </button>
          <img
            src={car.gallery[activeImg]}
            alt={`${car.name} fullscreen`}
            className="max-w-[90%] max-h-[85vh] rounded-[20px] object-contain"
            style={{ boxShadow: '0 60px 100px -30px rgba(0,0,0,.8)' }}
            onClick={(e) => e.stopPropagation()}
            onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=1600&auto=format&fit=crop&q=80'; }}
          />
        </div>
      )}

      {viewer360 && (
        <div
          className="fixed inset-0 bg-black/95 z-[4500] flex items-center justify-center flex-col p-10"
          style={{ animation: 'fadeIn .2s ease' }}
          onClick={() => setViewer360(false)}
          onMouseDown={handlePointerDown}
          onMouseMove={handlePointerMove}
          onMouseUp={handlePointerUp}
          onMouseLeave={handlePointerUp}
          onTouchStart={handlePointerDown}
          onTouchMove={handlePointerMove}
          onTouchEnd={handlePointerUp}
        >
          <button
            className="absolute top-8 right-10 text-white text-2xl w-14 h-14 rounded-full flex items-center justify-center transition-all hover:rotate-90 hover:bg-red-500"
            style={{ background: 'rgba(255,255,255,.1)', border: 'none' }}
            onClick={() => setViewer360(false)}
            aria-label="Close 360 view"
          >
            <X size={24} />
          </button>
          <img
            src={car.gallery[0]}
            alt={`${car.name} 360 view`}
            className={`max-w-[85%] max-h-[75vh] rounded-[20px] object-contain select-none ${dragging ? 'cursor-grabbing' : 'cursor-grab'}`}
            style={{ transform: `rotateY(${rotation}deg) scale(0.95)` }}
            onClick={(e) => e.stopPropagation()}
            onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=1600&auto=format&fit=crop&q=80'; }}
          />
          <div className="text-white mt-5 text-sm flex items-center gap-2 opacity-70">
            <MoveHorizontal size={16} /> Drag to rotate · Click outside to close
          </div>
        </div>
      )}
    </>
  );
}