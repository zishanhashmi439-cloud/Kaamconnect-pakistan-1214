import React, { useState } from 'react';
import { WorkerProfile, PricingModel } from '../../types';
import { useApp } from '../../context/AppContext';
import { t } from '../../utils/translations';
import {
  X,
  Calendar,
  Clock,
  MapPin,
  AlertTriangle,
  Upload,
  CheckCircle,
  Banknote
} from 'lucide-react';

interface BookServiceModalProps {
  initialWorker?: WorkerProfile | null;
  initialCategoryCode?: string | null;
  initialSubcategoryId?: string | null;
  onClose: () => void;
  onSuccess: (jobId: string) => void;
}

export const BookServiceModal: React.FC<BookServiceModalProps> = ({
  initialWorker,
  initialCategoryCode,
  initialSubcategoryId,
  onClose,
  onSuccess
}) => {
  const { lang, categories, selectedCity, cities, createJobRequest, submitQuote } = useApp();

  const currentCityData = cities.find(c => c.nameEn.toLowerCase() === selectedCity.toLowerCase()) || cities[0];

  const [categoryCode, setCategoryCode] = useState<string>(
    initialCategoryCode || (initialWorker ? initialWorker.primaryCategoryCode : 'A')
  );
  
  const currentCategory = categories.find(c => c.code === categoryCode) || categories[0];
  
  const [subcategoryId, setSubcategoryId] = useState<string>(
    initialSubcategoryId || (currentCategory.subcategories[0]?.id || '')
  );

  const [title, setTitle] = useState(
    initialWorker
      ? `Service Request for ${initialWorker.name}`
      : (currentCategory.subcategories.find(s => s.id === subcategoryId)?.nameEn || 'General Home Service')
  );
  const [description, setDescription] = useState('');
  const [customerName, setCustomerName] = useState('Muhammad Hamza');
  const [customerPhone, setCustomerPhone] = useState('+92 300 4567890');
  const [customerArea, setCustomerArea] = useState(currentCityData.areas[0] || 'Johar Town');
  const [addressDetails, setAddressDetails] = useState('House 42, Block G-3');
  const [urgency, setUrgency] = useState<'emergency' | 'today' | 'scheduled'>('today');
  const [scheduledDate, setScheduledDate] = useState(
    new Date(Date.now() + 86400000).toISOString().substring(0, 10)
  );
  const [scheduledTimeSlot, setScheduledTimeSlot] = useState('Morning (09:00 AM - 12:00 PM)');
  const [pricingModelPreferred, setPricingModelPreferred] = useState<PricingModel>('visit');
  const [attachedPhotos, setAttachedPhotos] = useState<string[]>([
    '/src/assets/images/service_plumbing_pakistan_1793284437496.jpg'
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const selectedSub = currentCategory.subcategories.find(s => s.id === subcategoryId);

  const handleCategoryChange = (newCode: string) => {
    setCategoryCode(newCode);
    const cat = categories.find(c => c.code === newCode);
    if (cat && cat.subcategories.length > 0) {
      setSubcategoryId(cat.subcategories[0].id);
      setTitle(cat.subcategories[0].nameEn);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) {
      alert('Please describe your job requirements so workers can quote accurately.');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const newJobId = createJobRequest({
        customerId: 'cust_1',
        customerName,
        customerPhone,
        customerCity: selectedCity,
        customerArea,
        addressDetails,
        categoryCode: currentCategory.code,
        categoryNameEn: currentCategory.nameEn,
        categoryNameUr: currentCategory.nameUr,
        subcategoryId,
        subcategoryNameEn: selectedSub ? selectedSub.nameEn : 'Service',
        subcategoryNameUr: selectedSub ? selectedSub.nameUr : 'سروس',
        title,
        description,
        urgency,
        scheduledDate: urgency === 'scheduled' ? scheduledDate : new Date().toISOString().substring(0, 10),
        scheduledTimeSlot: urgency === 'emergency' ? 'Immediate (< 45 mins)' : scheduledTimeSlot,
        photos: attachedPhotos,
        pricingModelPreferred
      });

      // If initial worker was chosen, automatically submit an initial quotation from them
      if (initialWorker) {
        submitQuote(newJobId, {
          workerId: initialWorker.id,
          workerName: initialWorker.name,
          workerPhone: initialWorker.phone,
          workerPhoto: initialWorker.photo,
          workerRating: initialWorker.rating,
          workerVerified: initialWorker.verified,
          pricePKR: initialWorker.visitFeePKR || 1000,
          pricingType: pricingModelPreferred,
          estimatedDuration: 'Same day',
          notes: `Assigned direct request. Available in ${customerArea}. Standard inspection and service.`
        });
      }

      setIsSubmitting(false);
      onSuccess(newJobId);
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-200 flex flex-col">
        {/* Top Header */}
        <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-md px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900">{t('postJobTitle', lang)}</h2>
            <p className="text-xs text-slate-500">
              {initialWorker ? `Direct request to ${initialWorker.name}` : `Broadcasting to verified workers in ${selectedCity}`}
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Category & Subcategory selection */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {lang === 'ur' ? 'مرکزی کیٹیگری' : 'Service Category'}
              </label>
              <select
                value={categoryCode}
                onChange={(e) => handleCategoryChange(e.target.value)}
                className="w-full text-xs font-medium text-slate-800 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.code}>
                    {c.code}. {lang === 'ur' ? c.nameUr : c.nameEn}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {lang === 'ur' ? 'ذیلی سروس' : 'Sub-service / Trade'}
              </label>
              <select
                value={subcategoryId}
                onChange={(e) => {
                  setSubcategoryId(e.target.value);
                  const sub = currentCategory.subcategories.find(s => s.id === e.target.value);
                  if (sub) setTitle(sub.nameEn);
                }}
                className="w-full text-xs font-medium text-slate-800 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                {currentCategory.subcategories.map((s) => (
                  <option key={s.id} value={s.id}>
                    {lang === 'ur' ? s.nameUr : s.nameEn}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Job Title */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              {t('jobTitleLabel', lang)}
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. 5 Marla Room Plastering / Water Tank Leakage..."
              className="w-full text-xs text-slate-800 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
            />
          </div>

          {/* Job Description */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              {t('jobDescLabel', lang)}
            </label>
            <textarea
              required
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={
                lang === 'ur'
                  ? 'کام کی تفصیل لکھیں تاکہ کاریگر درست تخمینہ لگا سکے (جیسے کہ کتنے کمرے ہیں، کیا سامان موجود ہے وغیرہ)...'
                  : 'Describe the work needed, dimensions, existing materials, and any special issues...'
              }
              className="w-full text-xs text-slate-800 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {/* Urgency */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              {t('urgencyLabel', lang)}
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setUrgency('emergency')}
                className={`py-2 px-2.5 text-xs font-medium rounded-xl border flex flex-col items-center justify-center text-center transition-colors min-h-[44px] ${
                  urgency === 'emergency'
                    ? 'border-red-500 bg-red-50 text-red-800 font-semibold'
                    : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <AlertTriangle className="w-4 h-4 text-red-600 mb-0.5" />
                <span>Emergency (&lt;45m)</span>
              </button>

              <button
                type="button"
                onClick={() => setUrgency('today')}
                className={`py-2 px-2.5 text-xs font-medium rounded-xl border flex flex-col items-center justify-center text-center transition-colors min-h-[44px] ${
                  urgency === 'today'
                    ? 'border-emerald-600 bg-emerald-50 text-emerald-800 font-semibold'
                    : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <Clock className="w-4 h-4 text-emerald-600 mb-0.5" />
                <span>Today</span>
              </button>

              <button
                type="button"
                onClick={() => setUrgency('scheduled')}
                className={`py-2 px-2.5 text-xs font-medium rounded-xl border flex flex-col items-center justify-center text-center transition-colors min-h-[44px] ${
                  urgency === 'scheduled'
                    ? 'border-emerald-600 bg-emerald-50 text-emerald-800 font-semibold'
                    : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <Calendar className="w-4 h-4 text-slate-600 mb-0.5" />
                <span>Scheduled</span>
              </button>
            </div>
          </div>

          {/* If scheduled: pick date and time slot */}
          {urgency === 'scheduled' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-200/80">
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">Date</label>
                <input
                  type="date"
                  value={scheduledDate}
                  min={new Date().toISOString().substring(0, 10)}
                  onChange={(e) => setScheduledDate(e.target.value)}
                  className="w-full text-xs text-slate-800 bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">Time Slot</label>
                <select
                  value={scheduledTimeSlot}
                  onChange={(e) => setScheduledTimeSlot(e.target.value)}
                  className="w-full text-xs text-slate-800 bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 focus:outline-none"
                >
                  <option>Morning (08:00 AM - 12:00 PM)</option>
                  <option>Afternoon (01:00 PM - 05:00 PM)</option>
                  <option>Evening (05:00 PM - 08:00 PM)</option>
                </select>
              </div>
            </div>
          )}

          {/* Location details */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-slate-700">
              {t('serviceLocationLabel', lang)}
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div>
                <span className="text-[11px] text-slate-500 block mb-0.5">Area in {selectedCity}</span>
                <select
                  value={customerArea}
                  onChange={(e) => setCustomerArea(e.target.value)}
                  className="w-full text-xs text-slate-800 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2"
                >
                  {currentCityData.areas.map((a, i) => (
                    <option key={i} value={a}>{a}</option>
                  ))}
                </select>
              </div>

              <div>
                <span className="text-[11px] text-slate-500 block mb-0.5">Street Address / House No.</span>
                <input
                  type="text"
                  required
                  value={addressDetails}
                  onChange={(e) => setAddressDetails(e.target.value)}
                  placeholder="e.g. House 14-B, Street 3"
                  className="w-full text-xs text-slate-800 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2"
                />
              </div>
            </div>
          </div>

          {/* Pricing Model Preference */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              {t('preferredPricingLabel', lang)}
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 text-center">
              {[
                { id: 'visit', label: 'Per Visit' },
                { id: 'daily', label: 'Daily Wage' },
                { id: 'sqft', label: 'Per Sq Ft' },
                { id: 'project', label: 'Lump Sum Theka' }
              ].map((m) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setPricingModelPreferred(m.id as PricingModel)}
                  className={`py-2 px-2 text-xs rounded-lg border transition-colors min-h-[40px] ${
                    pricingModelPreferred === m.id
                      ? 'border-emerald-600 bg-emerald-50 text-emerald-800 font-semibold'
                      : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {m.label}
                </button>
              ))}
            </div>
          </div>

          {/* Optional Photo Attachment */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              {lang === 'ur' ? 'کام کی تصویر منسلک کریں' : 'Attach Job Photos (Optional)'}
            </label>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => {
                  setAttachedPhotos([
                    '/src/assets/images/service_masonry_pakistan_1793284436647.jpg',
                    '/src/assets/images/hero_construction_pakistan_1793284436903.jpg'
                  ]);
                }}
                className="px-3 py-2 text-xs text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl flex items-center gap-1.5 border border-slate-200 transition-colors"
              >
                <Upload className="w-3.5 h-3.5 text-slate-500" />
                <span>Simulate Camera / Gallery Upload</span>
              </button>
              <span className="text-xs text-slate-500">
                {attachedPhotos.length} photo(s) attached
              </span>
            </div>
          </div>

          {/* Cost Estimate Reference Note */}
          {selectedSub && (
            <div className="p-3 bg-emerald-50/70 border border-emerald-100 rounded-xl flex items-start gap-2.5 text-xs text-emerald-900">
              <Banknote className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold block">Market Benchmark Estimate:</span>
                <span>
                  Approx. Rs. {selectedSub.baseEstimatePKR.toLocaleString()} ({selectedSub.typicalPricingModel}).
                  Actual quote will be provided by responding workers.
                </span>
              </div>
            </div>
          )}

          {/* Submit CTA */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full min-h-[48px] px-5 py-3 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-sm font-semibold flex items-center justify-center gap-2 shadow-sm transition-all active:scale-[0.99] disabled:opacity-50"
            >
              {isSubmitting ? (
                <span>Posting request to Lahore workers...</span>
              ) : (
                <>
                  <CheckCircle className="w-4 h-4" />
                  <span>{t('submitJobRequest', lang)}</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
