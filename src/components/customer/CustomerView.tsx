import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { t } from '../../utils/translations';
import { WorkerProfile, ServiceCategory, ServiceSubcategory } from '../../types';
import { ServiceIcon } from '../ServiceIcon';
import { ThreeDIcon } from '../common/ThreeDIcon';
import { speakUrduOrEnglish } from '../../utils/audioAssistant';
import { WorkerProfileModal } from './WorkerProfileModal';
import { BookServiceModal } from './BookServiceModal';
import {
  Search,
  Filter,
  CheckCircle2,
  Star,
  MapPin,
  Clock,
  Briefcase,
  AlertTriangle,
  ChevronRight,
  Shield,
  Phone,
  MessageCircle,
  X,
  Volume2,
  Wallet,
  ArrowUpRight,
  CreditCard,
  Sparkles
} from 'lucide-react';

interface CustomerViewProps {
  onGoToBookings: () => void;
  activeSubView?: 'explore' | 'categories';
}

export const CustomerView: React.FC<CustomerViewProps> = ({ onGoToBookings, activeSubView = 'explore' }) => {
  const {
    lang,
    selectedCity,
    selectedArea,
    setSelectedArea,
    categories,
    workers,
    cities,
    settings,
    customerBalancePKR,
    setIsJazzCashModalOpen
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategoryCode, setSelectedCategoryCode] = useState<string>('all');
  const [onlyVerified, setOnlyVerified] = useState(false);
  const [minRating, setMinRating] = useState<number>(0);
  
  // Modals state
  const [activeWorkerProfile, setActiveWorkerProfile] = useState<WorkerProfile | null>(null);
  const [bookingWorker, setBookingWorker] = useState<WorkerProfile | null>(null);
  const [bookingCategoryCode, setBookingCategoryCode] = useState<string | null>(null);
  const [bookingSubcategoryId, setBookingSubcategoryId] = useState<string | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [viewingCategoryDetails, setViewingCategoryDetails] = useState<ServiceCategory | null>(null);

  const currentCityData = cities.find(c => c.nameEn.toLowerCase() === selectedCity.toLowerCase()) || cities[0];

  // Filtered workers logic
  const filteredWorkers = useMemo(() => {
    return workers.filter((worker) => {
      // City check
      if (worker.city.toLowerCase() !== selectedCity.toLowerCase()) {
        return false;
      }
      // Area check
      if (selectedArea && !worker.serviceAreas.includes(selectedArea)) {
        return false;
      }
      // Verified only
      if (onlyVerified && !worker.verified) {
        return false;
      }
      // Rating
      if (minRating > 0 && worker.rating < minRating) {
        return false;
      }
      // Category code
      if (selectedCategoryCode !== 'all' && worker.primaryCategoryCode !== selectedCategoryCode) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchName = worker.name.toLowerCase().includes(query);
        const matchBio = worker.bioEn.toLowerCase().includes(query) || worker.bioUr.includes(query);
        const matchArea = worker.serviceAreas.some(a => a.toLowerCase().includes(query));
        
        // Match category or subcategory name
        const cat = categories.find(c => c.code === worker.primaryCategoryCode);
        const matchCat = cat?.nameEn.toLowerCase().includes(query) || cat?.nameUr.includes(query);
        const matchSub = cat?.subcategories.some(s => s.nameEn.toLowerCase().includes(query) || s.nameUr.includes(query));

        if (!matchName && !matchBio && !matchArea && !matchCat && !matchSub) {
          return false;
        }
      }
      return true;
    });
  }, [workers, selectedCity, selectedArea, onlyVerified, minRating, selectedCategoryCode, searchQuery, categories]);

  // Handle open booking modal
  const handleOpenBooking = (worker?: WorkerProfile, catCode?: string, subId?: string) => {
    setBookingWorker(worker || null);
    setBookingCategoryCode(catCode || (worker ? worker.primaryCategoryCode : null));
    setBookingSubcategoryId(subId || null);
    setIsBookingModalOpen(true);
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Hero Section */}
      <section className="relative rounded-3xl overflow-hidden bg-slate-900 text-white border border-slate-800 shadow-md">
        {/* Background photo with contrast scrim */}
        <div className="absolute inset-0 z-0">
          <img
            src="/src/assets/images/hero_construction_pakistan_1793284436903.jpg"
            alt="KaamConnect Pakistan Construction Site in Lahore"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/80 to-transparent" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 p-6 sm:p-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-semibold backdrop-blur-xs">
            <Shield className="w-3.5 h-3.5" />
            <span>{lang === 'ur' ? 'لاہور میں سند یافتہ اور تصدیق شدہ راج مستری و کاریگر' : 'Verified Professionals & Home Construction Specialists in Lahore'}</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
            {lang === 'ur'
              ? 'گھر کی تعمیر، مرمت اور دیکھ بھال کا بااعتماد حل'
              : 'Reliable Workers & Construction Pros for Your Home'}
          </h1>

          <p className="text-sm text-slate-300 leading-relaxed max-w-xl">
            {lang === 'ur'
              ? 'راج مستری، پلمبر، الیکٹریشن، کارپینٹر، پینٹر اور ٹھیکیدار براہ راست بلائیں۔ شفاف ریٹس اور مکمل تسلی۔'
              : 'Directly hire expert Raj Mistri, plumbers, certified electricians, carpenters, painters, and turnkey contractors in Lahore.'}
          </p>

          {/* Search bar inside hero */}
          <div className="pt-2">
            <div className="relative flex items-center bg-white rounded-2xl p-1.5 shadow-xl border border-slate-100 max-w-xl">
              <Search className="w-5 h-5 text-slate-400 ml-3 mr-2 shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t('searchPlaceholder', lang)}
                className="w-full text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none bg-transparent py-2 px-1"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg mr-1"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              <button
                onClick={() => {}}
                className="min-h-[42px] px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-semibold shrink-0 transition-colors"
              >
                {t('searchBtn', lang)}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Quick Assist Bar (Instant Dispatch) */}
      <section className="bg-gradient-to-r from-rose-50 to-amber-50 rounded-2xl p-4 sm:p-5 border border-rose-200/70 shadow-xs">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-rose-600 text-white flex items-center justify-center shrink-0">
              <AlertTriangle className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900">{t('emergencyRepairsTitle', lang)}</h2>
              <p className="text-[11px] text-slate-600">Urgent technicians dispatched within 45 minutes in {selectedCity}</p>
            </div>
          </div>
          <span className="text-[11px] font-semibold text-rose-700 bg-rose-100/80 px-2.5 py-1 rounded-md">
            24/7 Rapid Help
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {[
            { title: 'Water Pipe Burst', subId: 'b_12', catCode: 'B', icon: 'Wrench' },
            { title: 'DB Spark / Blackout', subId: 'c_1', catCode: 'C', icon: 'Zap' },
            { title: 'Motor Pump Failure', subId: 'b_6', catCode: 'B', icon: 'Wrench' },
            { title: 'Emergency Lock Jam', subId: 'r_1', catCode: 'R', icon: 'ShieldCheck' }
          ].map((item, idx) => (
            <button
              key={idx}
              onClick={() => handleOpenBooking(undefined, item.catCode, item.subId)}
              className="p-3 bg-white hover:bg-rose-50/50 rounded-xl border border-rose-100 flex items-center justify-between text-left transition-all hover:border-rose-300 shadow-xs group"
            >
              <div className="space-y-0.5">
                <span className="text-xs font-bold text-slate-900 block group-hover:text-rose-700 transition-colors">
                  {item.title}
                </span>
                <span className="text-[10px] text-rose-600 font-medium block">Tap to dispatch</span>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-rose-600 transition-colors" />
            </button>
          ))}
        </div>
      </section>

      {/* JazzCash Official App Wallet & Payment Banner */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-amber-600 via-rose-600 to-red-700 text-white shadow-xl p-5 sm:p-6 border border-amber-400/40">
        <div className="absolute -right-12 -bottom-12 w-64 h-64 rounded-full bg-white/10 blur-2xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
          <div className="flex items-start sm:items-center gap-4">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden bg-black/20 shrink-0 border-2 border-white/30 shadow-md">
              <img
                src="/src/assets/images/jazzcash_payment_banner_1793287429388.jpg"
                alt="JazzCash Official Payment Partner"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wide bg-amber-400 text-slate-950 shadow-xs">
                  {lang === 'ur' ? 'آفیشل جاز کیش ادائیگی' : 'Official JazzCash Wallet'}
                </span>
                <span className="text-[11px] text-amber-200 font-medium">10% Platform Commission</span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-white leading-tight">
                {lang === 'ur' ? 'کام کنیکٹ والٹ بیلنس اور جاز کیش سروس' : 'Customer Wallet & Direct JazzCash Payments'}
              </h3>
              <p className="text-xs text-amber-100/90 max-w-xl">
                {lang === 'ur'
                  ? `ایڈمن جاز کیش اکاؤنٹ: 0308-4306705 (ذیشان ہاشمی)۔ کام کروانے اور کاریگروں کو بک کرنے کے لیے بیلنس لوڈ کریں۔`
                  : `Admin JazzCash Account: 0308-4306705 (Zishan Hashmi). Top-up balance to confirm service bookings & direct dispatch.`}
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
            <div className="bg-white/15 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/25 flex flex-col justify-center">
              <span className="text-[10px] text-amber-200 uppercase tracking-wider font-semibold">
                {lang === 'ur' ? 'آپ کا والٹ بیلنس' : 'Your Balance'}
              </span>
              <span className="text-xl sm:text-2xl font-black text-white tabular-nums">
                Rs. {customerBalancePKR.toLocaleString()}
              </span>
            </div>

            <button
              onClick={() => setIsJazzCashModalOpen(true)}
              className="min-h-[46px] px-5 py-2.5 bg-amber-400 hover:bg-amber-300 active:scale-95 text-slate-950 font-bold text-xs sm:text-sm rounded-2xl shadow-lg flex items-center justify-center gap-2 transition-transform"
            >
              <Wallet className="w-4 h-4 text-slate-950" />
              <span>{lang === 'ur' ? '+ جاز کیش بیلنس لوڈ کریں' : '+ Load JazzCash'}</span>
            </button>
          </div>
        </div>
      </section>

      {/* Complete Service Categories Section (A to U) with 3D Tactile Icons */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
                {t('allCategoriesTitle', lang)}
              </h2>
              <button
                type="button"
                onClick={() => speakUrduOrEnglish(lang === 'ur' ? 'تمام اکیس شعبہ جات اور کاریگروں کی فہرست' : 'All twenty-one trade categories', lang)}
                title="بول کر سنیں (Audio Guide)"
                className="p-1 rounded-full text-emerald-700 bg-emerald-100 hover:bg-emerald-200 transition-colors"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs text-slate-500">
              {lang === 'ur'
                ? 'رنگ برنگے 3D آئیکونز اور اردو آواز کے ساتھ تمام شعبے باآسانی تلاش کریں۔'
                : 'Browse all 21 building trades with vibrant 3D colorful icons and audio voice assist.'}
            </p>
          </div>
          <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200/60 self-start sm:self-auto">
            {categories.length} Trade Categories (A–U)
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3.5">
          {categories.map((cat) => {
            const isSelected = selectedCategoryCode === cat.code;
            return (
              <div
                key={cat.id}
                onClick={() => {
                  if (isSelected) {
                    setSelectedCategoryCode('all');
                  } else {
                    setSelectedCategoryCode(cat.code);
                  }
                }}
                className={`p-3.5 sm:p-4 rounded-3xl border transition-all cursor-pointer flex flex-col justify-between space-y-3 relative group overflow-hidden ${
                  isSelected
                    ? 'border-emerald-600 bg-emerald-50/70 shadow-md ring-2 ring-emerald-500/50'
                    : 'border-slate-200 bg-white hover:border-emerald-300 hover:shadow-md'
                }`}
              >
                <div className="flex items-start justify-between">
                  {/* Vibrant 3D tactile icon with realistic bevel and glow */}
                  <div className="transform transition-transform group-hover:scale-105">
                    <ThreeDIcon code={cat.code} size="lg" />
                  </div>
                  
                  <div className="flex items-center gap-1">
                    {/* Audio speech button for low-literacy users */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        speakUrduOrEnglish(cat.nameUr, 'ur');
                      }}
                      title="آواز سنیں (Listen Pronunciation)"
                      className="p-1.5 rounded-full text-slate-400 hover:text-emerald-700 hover:bg-emerald-100 transition-colors"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                    <span className="text-[10px] font-mono font-bold text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded-md">
                      {cat.code}
                    </span>
                  </div>
                </div>

                <div className="space-y-1">
                  <h3 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug group-hover:text-emerald-800 transition-colors">
                    {lang === 'ur' ? cat.nameUr : cat.nameEn}
                  </h3>
                  <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">
                    {lang === 'ur' ? cat.descriptionUr : cat.descriptionEn}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-[11px]">
                  <span className="text-slate-400 font-medium">{cat.subcategories.length} trades</span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setViewingCategoryDetails(cat);
                    }}
                    className="text-emerald-700 font-bold hover:underline flex items-center gap-0.5"
                  >
                    <span>{lang === 'ur' ? 'کاریگر دیکھیں' : 'View'}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Worker Directory & Filters */}
      <section className="space-y-5">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              {t('nearbyWorkersTitle', lang)} ({filteredWorkers.length})
            </h2>
            <p className="text-xs text-slate-500">
              Showing verified workers in <span className="font-semibold text-slate-800">{selectedCity}</span>
              {selectedArea ? ` · Area: ${selectedArea}` : ' · All Areas'}
            </p>
          </div>

          {/* Area quick pills for Lahore */}
          <div className="flex items-center gap-1.5 overflow-x-auto max-w-full pb-1 text-xs">
            <button
              onClick={() => setSelectedArea('')}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors min-h-[36px] ${
                !selectedArea ? 'bg-slate-900 text-white font-semibold' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {t('allAreas', lang)}
            </button>
            {currentCityData.areas.slice(0, 6).map((area, i) => (
              <button
                key={i}
                onClick={() => setSelectedArea(area)}
                className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors min-h-[36px] ${
                  selectedArea === area ? 'bg-emerald-700 text-white font-semibold' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {area}
              </button>
            ))}
          </div>
        </div>

        {/* Secondary Filter Bar */}
        <div className="p-3 bg-white rounded-2xl border border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex flex-wrap items-center gap-4">
            <label className="flex items-center gap-2 cursor-pointer font-medium text-slate-700 select-none">
              <input
                type="checkbox"
                checked={onlyVerified}
                onChange={(e) => setOnlyVerified(e.target.checked)}
                className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 border-slate-300"
              />
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                {t('verifiedOnly', lang)}
              </span>
            </label>

            <div className="flex items-center gap-1.5">
              <span className="text-slate-500">{t('minRating', lang)}:</span>
              <select
                value={minRating}
                onChange={(e) => setMinRating(Number(e.target.value))}
                className="bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 text-slate-800"
              >
                <option value={0}>Any rating</option>
                <option value={4.5}>4.5+ Stars</option>
                <option value={4.8}>4.8+ Stars</option>
              </select>
            </div>

            {selectedCategoryCode !== 'all' && (
              <div className="flex items-center gap-1 bg-emerald-50 text-emerald-800 px-2.5 py-1 rounded-md">
                <span>Category {selectedCategoryCode}</span>
                <button
                  onClick={() => setSelectedCategoryCode('all')}
                  className="hover:text-emerald-950 font-bold ml-1"
                >
                  ×
                </button>
              </div>
            )}
          </div>

          {(onlyVerified || minRating > 0 || selectedCategoryCode !== 'all' || selectedArea || searchQuery) && (
            <button
              onClick={() => {
                setOnlyVerified(false);
                setMinRating(0);
                setSelectedCategoryCode('all');
                setSelectedArea('');
                setSearchQuery('');
              }}
              className="text-xs text-rose-600 hover:underline font-semibold"
            >
              {t('resetFilters', lang)}
            </button>
          )}
        </div>

        {/* Workers Grid */}
        {filteredWorkers.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-3">
            <Briefcase className="w-10 h-10 text-slate-300 mx-auto" />
            <h3 className="text-sm font-bold text-slate-800">No professionals found matching criteria</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Try adjusting your area filter or search terms. Alternatively, post an open job request and we'll notify registered workers.
            </p>
            <button
              onClick={() => handleOpenBooking()}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-700 text-white text-xs font-semibold rounded-xl hover:bg-emerald-800"
            >
              Post an Open Job Request
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredWorkers.map((worker) => (
              <div
                key={worker.id}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                {/* Worker Card Top */}
                <div className="p-5 space-y-3">
                  <div className="flex items-start gap-3.5">
                    <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
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
                        <div className="absolute bottom-1 right-1 bg-emerald-600 text-white p-0.5 rounded-full" title="Verified">
                          <CheckCircle2 className="w-3 h-3" />
                        </div>
                      )}
                    </div>

                    <div className="space-y-1 flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-bold text-slate-900 truncate">
                          {worker.name}
                        </h3>
                      </div>

                      <div className="flex items-center gap-1 text-xs text-amber-600">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <span className="font-semibold tabular-nums">{worker.rating}</span>
                        <span className="text-slate-400 text-[11px]">({worker.reviewCount})</span>
                        <span className="text-slate-300">·</span>
                        <span className="text-slate-500 text-[11px]">{worker.experienceYears}y exp</span>
                      </div>

                      <div className="text-[11px] text-slate-500 flex items-center gap-1 truncate">
                        <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                        <span>{worker.city}: {worker.serviceAreas.slice(0, 2).join(', ')}</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {lang === 'ur' ? worker.bioUr : worker.bioEn}
                  </p>

                  {/* Pricing tag */}
                  <div className="bg-slate-50 rounded-xl p-2.5 flex items-center justify-between text-xs border border-slate-100">
                    <div>
                      <span className="text-[10px] text-slate-400 block uppercase">Base Inspection</span>
                      <span className="font-bold text-slate-900 tabular-nums">
                        Rs. {worker.visitFeePKR.toLocaleString()}
                      </span>
                    </div>
                    {worker.dailyRatePKR && (
                      <div className="text-right">
                        <span className="text-[10px] text-slate-400 block uppercase">Daily Wage</span>
                        <span className="font-bold text-slate-900 tabular-nums">
                          Rs. {worker.dailyRatePKR.toLocaleString()}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Card Actions */}
                <div className="px-5 py-3.5 bg-slate-50/70 border-t border-slate-100 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5">
                    <a
                      href={`tel:${worker.phone}`}
                      className="min-h-[38px] px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-100 text-slate-700 text-xs font-semibold flex items-center gap-1"
                    >
                      <Phone className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Call</span>
                    </a>
                    <button
                      onClick={() => setActiveWorkerProfile(worker)}
                      className="min-h-[38px] px-2.5 py-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 text-xs font-medium"
                    >
                      {t('viewProfile', lang)}
                    </button>
                  </div>

                  <button
                    onClick={() => handleOpenBooking(worker)}
                    className="min-h-[38px] px-3.5 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-semibold transition-colors shadow-xs"
                  >
                    {t('bookNow', lang)}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Category Trades Modal Detail */}
      {viewingCategoryDetails && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full max-h-[85vh] overflow-y-auto shadow-2xl border border-slate-200 flex flex-col">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center">
                  <ServiceIcon name={viewingCategoryDetails.iconName} className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    Category {viewingCategoryDetails.code}: {lang === 'ur' ? viewingCategoryDetails.nameUr : viewingCategoryDetails.nameEn}
                  </h3>
                  <span className="text-[11px] text-slate-400">{viewingCategoryDetails.subcategories.length} specialized trades</span>
                </div>
              </div>
              <button
                onClick={() => setViewingCategoryDetails(null)}
                className="text-slate-400 hover:text-slate-700 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-3">
              {viewingCategoryDetails.subcategories.map((sub) => (
                <div
                  key={sub.id}
                  className="p-3.5 rounded-xl border border-slate-200 hover:border-emerald-300 hover:bg-emerald-50/20 transition-colors flex items-center justify-between gap-3"
                >
                  <div className="space-y-0.5 flex-1">
                    <h4 className="text-xs font-bold text-slate-900">
                      {lang === 'ur' ? sub.nameUr : sub.nameEn}
                    </h4>
                    <p className="text-[11px] text-slate-500">
                      {lang === 'ur' ? sub.descriptionUr : sub.descriptionEn}
                    </p>
                    <div className="text-[10px] text-emerald-700 font-medium">
                      Benchmark: ~Rs. {sub.baseEstimatePKR.toLocaleString()} ({sub.typicalPricingModel})
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setViewingCategoryDetails(null);
                      handleOpenBooking(undefined, viewingCategoryDetails.code, sub.id);
                    }}
                    className="min-h-[36px] px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-semibold shrink-0"
                  >
                    Book Trade
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Worker Profile Detail Modal */}
      {activeWorkerProfile && (
        <WorkerProfileModal
          worker={activeWorkerProfile}
          onClose={() => setActiveWorkerProfile(null)}
          onBookNow={(w) => handleOpenBooking(w)}
        />
      )}

      {/* Book Service / Request Quotes Modal */}
      {isBookingModalOpen && (
        <BookServiceModal
          initialWorker={bookingWorker}
          initialCategoryCode={bookingCategoryCode}
          initialSubcategoryId={bookingSubcategoryId}
          onClose={() => setIsBookingModalOpen(false)}
          onSuccess={(jobId) => {
            setIsBookingModalOpen(false);
            onGoToBookings();
          }}
        />
      )}
    </div>
  );
};
