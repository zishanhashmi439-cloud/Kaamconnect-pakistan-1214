import { WorkerProfile } from '../../types';
import { useApp } from '../../context/AppContext';
import { t } from '../../utils/translations';
import { WorkerVerificationSection } from '../common/WorkerVerificationSection';
import {
  X,
  Star,
  CheckCircle2,
  Clock,
  Shield,
  Phone,
  MessageCircle,
  Briefcase,
  MapPin,
  Calendar,
  Lock,
  ShieldCheck
} from 'lucide-react';

interface WorkerProfileModalProps {
  worker: WorkerProfile;
  onClose: () => void;
  onBookNow: (worker: WorkerProfile) => void;
}

export const WorkerProfileModal: React.FC<WorkerProfileModalProps> = ({ worker, onClose, onBookNow }) => {
  const { lang, bookings } = useApp();

  const isUnlocked = bookings.some(
    b => b.selectedWorkerId === worker.id && (b.phoneUnlocked || b.status === 'accepted' || b.status === 'in_progress' || b.status === 'completed')
  );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-200 flex flex-col">
        {/* Modal Top Bar */}
        <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-md px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-slate-800">
              {lang === 'ur' ? 'کاریگر کی مکمل تفصیل' : 'Professional Profile'}
            </span>
            {worker.verified && (
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                {t('verifiedBadge', lang)}
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6">
          {/* Header Info */}
          <div className="flex flex-col sm:flex-row gap-5 items-start sm:items-center">
            <div className="relative w-24 h-24 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
              <img
                src={worker.photo}
                alt={worker.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1541888946425-d0fbb1861564?w=400';
                }}
              />
              {worker.verified && (
                <div className="absolute bottom-1 right-1 bg-emerald-600 text-white p-1 rounded-full shadow-sm" title="CNIC Verified">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
              )}
            </div>

            <div className="space-y-1.5 flex-1">
              <h2 className="text-xl font-bold text-slate-900">{worker.name}</h2>
              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-600">
                <div className="flex items-center gap-1 text-amber-600 font-semibold">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span className="tabular-nums">{worker.rating}</span>
                  <span className="text-slate-400 font-normal">({worker.reviewCount} reviews)</span>
                </div>
                <span className="text-slate-300">·</span>
                <div className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>{worker.experienceYears} {t('yearsExp', lang)}</span>
                </div>
                <span className="text-slate-300">·</span>
                <div className="flex items-center gap-1">
                  <Briefcase className="w-3.5 h-3.5 text-slate-400" />
                  <span>{worker.completedJobsCount} {t('completedJobs', lang)}</span>
                </div>
              </div>

              <div className="flex items-center gap-1.5 text-xs text-slate-500 pt-1">
                <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>{worker.city}: {worker.serviceAreas.slice(0, 3).join(', ')}{worker.serviceAreas.length > 3 ? '...' : ''}</span>
              </div>
            </div>
          </div>

          {/* Pricing & Rate Card Strip */}
          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80 grid grid-cols-2 sm:grid-cols-3 gap-3 text-center">
            <div className="p-2 bg-white rounded-xl border border-slate-100">
              <span className="text-[11px] text-slate-500 block uppercase tracking-wider">{t('visitFee', lang)}</span>
              <span className="text-base font-bold text-slate-900 tabular-nums">
                Rs. {worker.visitFeePKR.toLocaleString()}
              </span>
            </div>
            {worker.dailyRatePKR && (
              <div className="p-2 bg-white rounded-xl border border-slate-100">
                <span className="text-[11px] text-slate-500 block uppercase tracking-wider">{t('dailyRate', lang)}</span>
                <span className="text-base font-bold text-slate-900 tabular-nums">
                  Rs. {worker.dailyRatePKR.toLocaleString()}
                </span>
              </div>
            )}
            {worker.hourlyRatePKR && (
              <div className="p-2 bg-white rounded-xl border border-slate-100 col-span-2 sm:col-span-1">
                <span className="text-[11px] text-slate-500 block uppercase tracking-wider">{t('hourlyRate', lang)}</span>
                <span className="text-base font-bold text-slate-900 tabular-nums">
                  Rs. {worker.hourlyRatePKR.toLocaleString()}
                </span>
              </div>
            )}
          </div>

          {/* About / Bio */}
          <div className="space-y-2">
            <h3 className="text-sm font-bold text-slate-900">
              {lang === 'ur' ? 'کاریگر کے بارے میں' : 'About & Experience'}
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              {lang === 'ur' ? worker.bioUr : worker.bioEn}
            </p>
          </div>

          {/* Dedicated Verification Section */}
          <WorkerVerificationSection worker={worker} />

          {/* Service Areas */}
          <div className="space-y-2">
            <h3 className="text-sm font-bold text-slate-900">
              {lang === 'ur' ? 'سروس کے علاقے' : 'Service Locations in Lahore'}
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {worker.serviceAreas.map((area, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 text-xs text-slate-700 bg-slate-100 rounded-md font-medium"
                >
                  {area}
                </span>
              ))}
            </div>
          </div>

          {/* Portfolio Work Photos */}
          {worker.portfolioPhotos && worker.portfolioPhotos.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-sm font-bold text-slate-900">
                {lang === 'ur' ? 'سابقہ کام کی تصاویر' : 'Recent Work Portfolio'}
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {worker.portfolioPhotos.map((photo, i) => (
                  <div key={i} className="aspect-video rounded-xl overflow-hidden bg-slate-100 border border-slate-200">
                    <img
                      src={photo}
                      alt="Work sample"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Customer Reviews */}
          <div className="space-y-3 pt-2">
            <h3 className="text-sm font-bold text-slate-900 flex items-center justify-between">
              <span>{lang === 'ur' ? 'صارفین کے تبصرے' : 'Verified Customer Reviews'}</span>
              <span className="text-xs text-slate-500 font-normal">{worker.reviews.length} reviews</span>
            </h3>

            {worker.reviews.length === 0 ? (
              <p className="text-xs text-slate-400 italic">No reviews yet for this verified technician.</p>
            ) : (
              <div className="space-y-3">
                {worker.reviews.map((rev) => (
                  <div key={rev.id} className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-slate-800">{rev.customerName}</span>
                      <div className="flex items-center gap-1 text-xs text-amber-600 font-medium">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <span>{rev.rating}.0</span>
                      </div>
                    </div>
                    <p className="text-xs text-slate-600">{rev.comment}</p>
                    <div className="flex items-center gap-2 text-[11px] text-slate-400">
                      <span>{rev.serviceName}</span>
                      <span>·</span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {rev.date}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Modal Sticky Bottom Action Footer */}
        <div className="sticky bottom-0 bg-white/95 backdrop-blur-md px-6 py-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
          {isUnlocked ? (
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <a
                href={`tel:${worker.phone}`}
                className="flex-1 sm:flex-initial min-h-[44px] px-4 py-2.5 rounded-xl border border-emerald-300 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm transition-transform active:scale-95"
              >
                <Phone className="w-4 h-4" />
                <span>Call {worker.phone}</span>
              </a>
              <a
                href={`https://wa.me/${worker.whatsapp.replace(/\D/g, '')}?text=Salam%20${encodeURIComponent(worker.name)},%20I%20accepted%20your%20quote%20on%20KaamConnect`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-initial min-h-[44px] px-4 py-2.5 rounded-xl border border-emerald-200 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                <span>WhatsApp</span>
              </a>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-xs text-slate-500 bg-amber-50 border border-amber-200/80 px-3.5 py-2 rounded-xl w-full sm:w-auto">
              <Lock className="w-4 h-4 text-amber-600 shrink-0" />
              <div className="text-[11px] leading-tight">
                <span className="font-bold text-amber-900 block">
                  {lang === 'ur' ? 'فون نمبر محفوظ ہے' : 'Direct Phone Locked'}
                </span>
                <span>
                  {lang === 'ur'
                    ? 'بکنگ تصدیق اور 10% فیس کے بعد دونوں کے نمبرز کھلیں گے۔'
                    : 'Revealed after booking confirmation & 10% platform fee.'}
                </span>
              </div>
            </div>
          )}

          <button
            onClick={() => {
              onClose();
              onBookNow(worker);
            }}
            className="w-full sm:flex-1 min-h-[48px] px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-sm font-bold flex items-center justify-center gap-2 shadow-sm transition-transform active:scale-[0.99]"
          >
            <span>{isUnlocked ? t('bookNow', lang) : (lang === 'ur' ? 'کام بک کریں (10% فیس پر نمبر ان لاک)' : 'Book Worker & Unlock Contact')}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
