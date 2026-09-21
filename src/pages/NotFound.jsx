import { useNavigate } from 'react-router-dom';
import { Home } from 'lucide-react';

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="min-h-[80vh] flex items-center justify-center text-center px-6 pt-[120px] pb-16 page-enter">
      <div>
        <h1 className="text-8xl font-extrabold leading-none tracking-tight"
            style={{ background: 'var(--grad-brand)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
          404
        </h1>
        <h2 className="text-3xl font-bold mt-4 mb-3" style={{ color: 'var(--text-primary)' }}>
          Looks like this road doesn't exist.
        </h2>
        <p className="text-lg mb-8" style={{ color: 'var(--text-secondary)' }}>
          The page you're looking for might have been moved or deleted.
        </p>
        <button className="btn-primary-cf !text-lg !py-4 !px-9" onClick={() => navigate('/')}>
          <Home size={18} /> Return Home
        </button>
      </div>
    </div>
  );
}