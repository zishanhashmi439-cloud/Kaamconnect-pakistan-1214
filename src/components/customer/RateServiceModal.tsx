import React, { useState } from 'react';
import { JobRequest } from '../../types';
import { useApp } from '../../context/AppContext';
import { t } from '../../utils/translations';
import { X, Star, CheckCircle } from 'lucide-react';

interface RateServiceModalProps {
  job: JobRequest;
  onClose: () => void;
}

export const RateServiceModal: React.FC<RateServiceModalProps> = ({ job, onClose }) => {
  const { lang, rateJob } = useApp();
  const [rating, setRating] = useState<number>(5);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    rateJob(job.id, rating, comment || 'Professional and high quality service delivered on time.');
    setSubmitted(true);
    setTimeout(() => {
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-slate-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <h2 className="text-sm font-bold text-slate-900">{t('rateJob', lang)}</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="p-8 text-center space-y-3">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-7 h-7" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Thank you for your rating!</h3>
            <p className="text-xs text-slate-500">Your review helps other Pakistani homeowners choose verified workers.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div className="text-center space-y-1">
              <h3 className="text-sm font-semibold text-slate-800">{job.title}</h3>
              <p className="text-xs text-slate-500">
                Worker: <span className="font-medium text-slate-700">{job.selectedWorkerName || 'Assigned Professional'}</span>
              </p>
            </div>

            {/* Interactive Stars */}
            <div className="flex items-center justify-center gap-2 py-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onClick={() => setRating(star)}
                  className="p-1 focus:outline-none transition-transform hover:scale-110"
                >
                  <Star
                    className={`w-8 h-8 ${
                      star <= rating
                        ? 'fill-amber-400 text-amber-400'
                        : 'text-slate-200'
                    }`}
                  />
                </button>
              ))}
            </div>
            <p className="text-center text-xs font-semibold text-slate-700">
              {rating === 5 ? 'Excellent (بہترین)' : rating === 4 ? 'Good (اچھا)' : rating === 3 ? 'Average (درمیانہ)' : 'Needs Improvement'}
            </p>

            {/* Comment */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {t('leaveReview', lang)}
              </label>
              <textarea
                rows={3}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Share your experience (punctuality, workmanship, cleanliness)..."
                className="w-full text-xs text-slate-800 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <button
              type="submit"
              className="w-full min-h-[44px] py-2.5 px-4 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-semibold transition-colors shadow-sm"
            >
              {t('submitReview', lang)}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
