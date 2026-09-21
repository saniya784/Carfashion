import { useState, useEffect } from 'react';
import {
  Star, ThumbsUp, AlertCircle, CheckCircle, MessageSquare,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useApp } from '@/context/AppContext';
import { safeParse, setStorage } from '@/utils/storage';

export default function CarRating({ car, onOpenAuth }) {
  const { user } = useAuth();
  const { addToast } = useApp();

  const [allReviews, setAllReviews] = useState(() => safeParse('cf_reviews', {}));
  const reviews = allReviews[car.id] || [];
  const userReview = user ? reviews.find((r) => r.userId === user.id) : null;

  const [form, setForm] = useState({
    rating: userReview?.rating || 0,
    comment: userReview?.comment || '',
  });
  const [hover, setHover] = useState(0);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setForm({
      rating: userReview?.rating || 0,
      comment: userReview?.comment || '',
    });
  }, [userReview]);

  const avg = reviews.length
    ? reviews.reduce((s, r) => s + r.rating, 0) / reviews.length
    : car.rating;

  const distribution = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: reviews.filter((r) => r.rating === star).length,
  }));

  const submit = (e) => {
    e.preventDefault();
    if (!user) {
      addToast('Please login to leave a review', 'error');
      onOpenAuth?.('login');
      return;
    }
    const errs = {};
    if (!form.rating) errs.rating = 'Please select a star rating';
    if (!form.comment.trim()) errs.comment = 'Please write a short review';
    else if (form.comment.trim().length < 5) errs.comment = 'Review is too short';
    setErrors(errs);
    if (Object.keys(errs).length) return;

    const newReview = {
      id: 'r_' + Date.now(),
      userId: user.id,
      userName: user.name,
      userAvatar: user.avatar,
      rating: form.rating,
      comment: form.comment.trim(),
      date: new Date().toISOString(),
      helpful: 0,
    };

    setAllReviews((prev) => {
      const carReviews = prev[car.id] || [];
      const filtered = carReviews.filter((r) => r.userId !== user.id);
      const next = { ...prev, [car.id]: [newReview, ...filtered] };
      setStorage('cf_reviews', next);
      return next;
    });

    addToast(userReview ? 'Review updated!' : 'Review submitted! Thank you ⭐', 'success');
    setForm({ rating: 0, comment: '' });
  };

  const markHelpful = (reviewId) => {
    setAllReviews((prev) => {
      const next = {
        ...prev,
        [car.id]: (prev[car.id] || []).map((r) =>
          r.id === reviewId ? { ...r, helpful: (r.helpful || 0) + 1 } : r
        ),
      };
      setStorage('cf_reviews', next);
      return next;
    });
  };

  return (
    <div className="mt-10 pt-8 border-t" style={{ borderColor: 'var(--border)' }}>
      <h3
        className="text-[1.4rem] font-extrabold mb-6 flex items-center gap-2"
        style={{ color: 'var(--text-primary)' }}
      >
        <Star size={22} className="text-amber-500" fill="currentColor" />
        Ratings & Reviews
      </h3>

      {/* Summary */}
      <div
        className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-8 p-6 rounded-2xl border mb-8"
        style={{ background: 'var(--bg-soft)', borderColor: 'var(--border)' }}
      >
        <div
          className="flex flex-col items-center justify-center text-center md:border-r md:pr-8"
          style={{ borderColor: 'var(--border)' }}
        >
          <div
            className="text-[3.5rem] font-extrabold leading-none tracking-tight"
            style={{
              background: 'var(--grad-brand)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            {avg.toFixed(1)}
          </div>
          <div className="flex gap-1 my-2">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star
                key={s}
                size={18}
                className={s <= Math.round(avg) ? 'text-amber-500' : 'text-slate-300'}
                fill={s <= Math.round(avg) ? 'currentColor' : 'none'}
              />
            ))}
          </div>
          <p className="text-[0.85rem]" style={{ color: 'var(--text-secondary)' }}>
            {reviews.length} {reviews.length === 1 ? 'review' : 'reviews'}
          </p>
        </div>

        <div className="flex flex-col justify-center gap-2">
          {distribution.map(({ star, count }) => {
            const pct = reviews.length ? (count / reviews.length) * 100 : 0;
            return (
              <div key={star} className="flex items-center gap-3 text-[0.82rem]">
                <span
                  className="w-8 flex items-center gap-1 font-medium"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  {star} <Star size={11} fill="currentColor" className="text-amber-500" />
                </span>
                <div
                  className="flex-1 h-2 rounded-full overflow-hidden"
                  style={{ background: 'var(--bg-surface)' }}
                >
                  <div
                    className="h-full transition-all duration-500"
                    style={{ width: `${pct}%`, background: 'var(--grad-brand)' }}
                  />
                </div>
                <span className="w-8 text-right" style={{ color: 'var(--text-muted)' }}>
                  {count}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Write a review */}
      <div
        className="p-6 rounded-2xl border mb-8"
        style={{ background: 'var(--bg-surface)', borderColor: 'var(--border)' }}
      >
        <h4
          className="text-[1.05rem] font-bold mb-3 flex items-center gap-2"
          style={{ color: 'var(--text-primary)' }}
        >
          <MessageSquare size={18} className="text-blue-600" />
          {userReview ? 'Update your review' : 'Write a review'}
        </h4>

        {!user ? (
          <div
            className="flex items-center justify-between gap-3 flex-wrap p-4 rounded-xl"
            style={{ background: 'var(--bg-soft)' }}
          >
            <p className="text-[0.9rem]" style={{ color: 'var(--text-secondary)' }}>
              Please log in to share your experience with this car.
            </p>
            <button
              className="btn-primary-cf !py-2 !px-5 text-sm"
              onClick={() => onOpenAuth?.('login')}
            >
              Login to Review
            </button>
          </div>
        ) : (
          <form onSubmit={submit} noValidate>
            <div className="mb-4">
              <p className="form-label-cf mb-2">
                <Star size={12} /> Your rating
              </p>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((s) => (
                  <button
                    key={s}
                    type="button"
                    onMouseEnter={() => setHover(s)}
                    onMouseLeave={() => setHover(0)}
                    onClick={() => setForm({ ...form, rating: s })}
                    className="transition-transform hover:scale-115"
                    aria-label={`Rate ${s} star${s > 1 ? 's' : ''}`}
                  >
                    <Star
                      size={30}
                      className={s <= (hover || form.rating) ? 'text-amber-500' : 'text-slate-300'}
                      fill={s <= (hover || form.rating) ? 'currentColor' : 'none'}
                    />
                  </button>
                ))}
                {form.rating > 0 && (
                  <span
                    className="ml-3 text-[0.88rem] font-semibold self-center"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    {['Poor', 'Fair', 'Good', 'Very Good', 'Excellent'][form.rating - 1]}
                  </span>
                )}
              </div>
              {errors.rating && (
                <p className="error-msg-cf mt-2">
                  <AlertCircle size={12} /> {errors.rating}
                </p>
              )}
            </div>

            <div className="mb-4">
              <label className="form-label-cf">
                <MessageSquare size={12} /> Your review
              </label>
              <textarea
                rows="3"
                value={form.comment}
                onChange={(e) => setForm({ ...form, comment: e.target.value })}
                placeholder="Share your experience with this car..."
                aria-invalid={!!errors.comment}
                className="input-cf resize-none"
              />
              {errors.comment && (
                <p className="error-msg-cf">
                  <AlertCircle size={12} /> {errors.comment}
                </p>
              )}
            </div>

            <button type="submit" className="btn-primary-cf">
              <CheckCircle size={16} /> {userReview ? 'Update Review' : 'Submit Review'}
            </button>
          </form>
        )}
      </div>

      {/* Reviews list */}
      {reviews.length > 0 ? (
        <div className="flex flex-col gap-4">
          {reviews.map((r) => (
            <ReviewItem key={r.id} review={r} onHelpful={() => markHelpful(r.id)} />
          ))}
        </div>
      ) : (
        <div className="text-center py-8" style={{ color: 'var(--text-muted)' }}>
          <p className="text-[0.9rem]">No reviews yet. Be the first to review this car!</p>
        </div>
      )}
    </div>
  );
}

function ReviewItem({ review, onHelpful }) {
  const [helpfulClicked, setHelpfulClicked] = useState(false);

  const timeAgo = (iso) => {
    const diff = (Date.now() - new Date(iso).getTime()) / 1000;
    if (diff < 60) return 'just now';
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    if (diff < 2592000) return `${Math.floor(diff / 86400)}d ago`;
    return new Date(iso).toLocaleDateString();
  };

  return (
    <div
      className="p-5 rounded-2xl border"
      style={{ background: 'var(--bg-soft)', borderColor: 'var(--border)' }}
    >
      <div className="flex items-center gap-3 mb-3">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-[0.8rem] flex-shrink-0"
          style={{
            background: review.userAvatar
              ? `linear-gradient(135deg, ${review.userAvatar.gradient[0]}, ${review.userAvatar.gradient[1]})`
              : 'var(--grad-brand)',
          }}
        >
          {review.userAvatar?.initials || review.userName[0]}
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-[0.92rem] truncate" style={{ color: 'var(--text-primary)' }}>
            {review.userName}
          </p>
          <div className="flex items-center gap-2 mt-0.5">
            <div className="flex gap-0.5">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star
                  key={s}
                  size={12}
                  className={s <= review.rating ? 'text-amber-500' : 'text-slate-300'}
                  fill={s <= review.rating ? 'currentColor' : 'none'}
                />
              ))}
            </div>
            <span className="text-[0.75rem]" style={{ color: 'var(--text-muted)' }}>
              · {timeAgo(review.date)}
            </span>
          </div>
        </div>
      </div>
      <p className="text-[0.9rem] leading-relaxed mb-3" style={{ color: 'var(--text-secondary)' }}>
        {review.comment}
      </p>
      <button
        onClick={() => {
          if (!helpfulClicked) {
            onHelpful();
            setHelpfulClicked(true);
          }
        }}
        disabled={helpfulClicked}
        className="flex items-center gap-1.5 text-[0.8rem] font-medium px-3 py-1.5 rounded-full transition-all disabled:opacity-60 disabled:cursor-not-allowed"
        style={{
          background: 'var(--bg-surface)',
          color: 'var(--text-secondary)',
          border: '1px solid var(--border)',
        }}
      >
        <ThumbsUp size={12} /> Helpful ({review.helpful || 0})
      </button>
    </div>
  );
}