import React from 'react';
import { useApp } from '../context/AppContext';
import { t } from '../utils/translations';
import { UserRole } from '../types';
import { speakUrduOrEnglish } from '../utils/audioAssistant';
import {
  MapPin,
  Globe,
  Shield,
  HardHat,
  UserCheck,
  RefreshCw,
  Smartphone,
  Wallet,
  Volume2,
  ShieldAlert,
  PhoneCall
} from 'lucide-react';

interface HeaderProps {
  onOpenArchitectureModal: () => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenArchitectureModal, activeTab, setActiveTab }) => {
  const {
    role,
    setRole,
    lang,
    setLang,
    selectedCity,
    setSelectedCity,
    cities,
    settings,
    resetDemoData,
    customerBalancePKR,
    workerBalancePKR,
    adminJazzCashEarningsPKR,
    setIsJazzCashModalOpen,
    setIsEmergencyModalOpen
  } = useApp();

  const handleRoleChange = (newRole: UserRole) => {
    setRole(newRole);
    if (newRole === 'customer') setActiveTab('explore');
    if (newRole === 'worker') setActiveTab('jobs');
    if (newRole === 'admin') setActiveTab('overview');
  };

  const currentBalance = role === 'customer'
    ? customerBalancePKR
    : role === 'worker'
    ? workerBalancePKR
    : adminJazzCashEarningsPKR;

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      {/* Platform Announcement Banner with Direct JazzCash Information */}
      {settings.bannerActive && (
        <div className="bg-gradient-to-r from-red-700 via-rose-800 to-emerald-800 text-white text-xs px-4 py-1.5 flex items-center justify-between">
          <div className="flex items-center gap-2 max-w-5xl mx-auto truncate text-center w-full justify-center">
            <span className="font-bold tracking-wide">
              {lang === 'ur'
                ? `ایڈمن و اونر جاز کیش اکاؤنٹ: 0308-4306705 (${settings.adminName}) · 10% کمیشن اور بیلنس سسٹم فعال ہے`
                : `Official Owner JazzCash: 0308-4306705 (${settings.adminName}) · 10% Platform Commission · Instant Top-up`}
            </span>
            <button
              onClick={() => setIsJazzCashModalOpen(true)}
              className="bg-amber-400 hover:bg-amber-300 text-slate-900 font-extrabold text-[10px] px-2 py-0.5 rounded shadow-xs ml-2 cursor-pointer whitespace-nowrap"
            >
              {lang === 'ur' ? 'بیلنس کروائیں' : 'Load Balance'}
            </button>
          </div>
        </div>
      )}

      {/* Main Top Bar Contract: 3 zones */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 h-16 flex items-center justify-between gap-2 sm:gap-4 md:gap-8">
        {/* Zone 1: Professional 3D Brand Logo & Wordmark */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={() => {
              setRole('customer');
              setActiveTab('explore');
            }}
            className="flex items-center gap-2.5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded-lg p-0.5 group"
          >
            {/* High-Fidelity 3D Brand Logo */}
            <div className="relative w-11 h-11 rounded-2xl overflow-hidden shadow-md border border-emerald-600/30 shrink-0 group-hover:scale-105 transition-transform bg-slate-900">
              <img
                src="/src/assets/images/kaamconnect_brand_logo_1793287428821.jpg"
                alt="KaamConnect Pakistan 3D Logo"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1541888946425-d0fbb1861564?w=400';
                }}
              />
            </div>
            <div>
              <span className="text-base sm:text-lg font-black tracking-tight text-slate-900 block leading-tight">
                {settings.appName}
              </span>
              <span className="text-[10px] sm:text-[11px] text-emerald-700 font-bold block">
                {lang === 'ur' ? 'پاکستان ہوم سروسز' : 'Pakistan Home & Construction'}
              </span>
            </div>
          </button>

          {/* City selector dropdown */}
          <div className="hidden md:flex items-center gap-1.5 ml-2 pl-3 border-l border-slate-200 text-xs text-slate-700">
            <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="bg-transparent font-medium text-slate-800 cursor-pointer focus:outline-none"
            >
              {cities.map((c) => (
                <option key={c.id} value={c.nameEn}>
                  {lang === 'ur' ? c.nameUr : c.nameEn}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Zone 2: Navigation Links (Clean single line) */}
        <nav className="hidden lg:flex items-center gap-5 text-sm font-medium text-slate-600">
          {role === 'customer' && (
            <>
              <button
                onClick={() => setActiveTab('explore')}
                className={`whitespace-nowrap transition-colors hover:text-emerald-600 ${
                  activeTab === 'explore' ? 'text-emerald-700 font-semibold' : ''
                }`}
              >
                {t('findWorkers', lang)}
              </button>
              <button
                onClick={() => setActiveTab('categories')}
                className={`whitespace-nowrap transition-colors hover:text-emerald-600 ${
                  activeTab === 'categories' ? 'text-emerald-700 font-semibold' : ''
                }`}
              >
                {t('categories', lang)}
              </button>
              <button
                onClick={() => setActiveTab('bookings')}
                className={`whitespace-nowrap transition-colors hover:text-emerald-600 ${
                  activeTab === 'bookings' ? 'text-emerald-700 font-semibold' : ''
                }`}
              >
                {t('myBookings', lang)}
              </button>
            </>
          )}

          {role === 'worker' && (
            <>
              <button
                onClick={() => setActiveTab('jobs')}
                className={`whitespace-nowrap transition-colors hover:text-emerald-600 ${
                  activeTab === 'jobs' ? 'text-emerald-700 font-semibold' : ''
                }`}
              >
                {t('workerJobs', lang)}
              </button>
              <button
                onClick={() => setActiveTab('profile')}
                className={`whitespace-nowrap transition-colors hover:text-emerald-600 ${
                  activeTab === 'profile' ? 'text-emerald-700 font-semibold' : ''
                }`}
              >
                {t('workerProfile', lang)}
              </button>
              <button
                onClick={() => setActiveTab('verification')}
                className={`whitespace-nowrap transition-colors hover:text-emerald-600 ${
                  activeTab === 'verification' ? 'text-emerald-700 font-semibold' : ''
                }`}
              >
                {lang === 'ur' ? 'تصدیقی دستاویزات' : 'Verification Checks'}
              </button>
            </>
          )}

          {role === 'admin' && (
            <>
              <button
                onClick={() => setActiveTab('overview')}
                className={`whitespace-nowrap transition-colors hover:text-emerald-600 ${
                  activeTab === 'overview' ? 'text-emerald-700 font-semibold' : ''
                }`}
              >
                {t('adminOverview', lang)}
              </button>
              <button
                onClick={() => setActiveTab('workers')}
                className={`whitespace-nowrap transition-colors hover:text-emerald-600 ${
                  activeTab === 'workers' ? 'text-emerald-700 font-semibold' : ''
                }`}
              >
                {t('adminWorkers', lang)}
              </button>
              <button
                onClick={() => setActiveTab('categories')}
                className={`whitespace-nowrap transition-colors hover:text-emerald-600 ${
                  activeTab === 'categories' ? 'text-emerald-700 font-semibold' : ''
                }`}
              >
                {t('adminCategories', lang)}
              </button>
              <button
                onClick={() => setActiveTab('complaints')}
                className={`whitespace-nowrap transition-colors hover:text-emerald-600 ${
                  activeTab === 'complaints' ? 'text-emerald-700 font-semibold' : ''
                }`}
              >
                {t('adminComplaints', lang)}
              </button>
            </>
          )}

          <button
            onClick={onOpenArchitectureModal}
            className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-800 transition-colors whitespace-nowrap"
          >
            <Smartphone className="w-3.5 h-3.5 text-emerald-600" />
            <span>{t('mobileArchitecture', lang)}</span>
          </button>
        </nav>

        {/* Zone 3: Actions (JazzCash Wallet, Voice Guide, Language & Role Switcher) */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
          {/* JazzCash In-App Wallet Button */}
          <button
            onClick={() => setIsJazzCashModalOpen(true)}
            className="min-h-[38px] px-2.5 sm:px-3 py-1.5 bg-gradient-to-r from-red-600 via-rose-700 to-amber-700 hover:opacity-95 text-white rounded-xl text-xs font-extrabold flex items-center gap-1.5 shadow-sm transition-all active:scale-95 border border-red-400/40"
            title="JazzCash Wallet Balance (Send to 0308-4306705)"
          >
            <Wallet className="w-3.5 h-3.5 text-amber-200" />
            <div className="text-left hidden xs:block sm:block">
              <span className="text-[9px] uppercase tracking-wider block opacity-90 leading-tight">
                {role === 'admin' ? 'JC Earnings' : 'Wallet'}
              </span>
              <span className="tabular-nums text-xs leading-none">
                Rs. {currentBalance.toLocaleString()}
              </span>
            </div>
            <span className="text-[10px] bg-white/25 px-1.5 py-0.5 rounded font-bold">
              + Load
            </span>
          </button>

          {/* Emergency 1122 / 15 / 16 / Admin Quick Button */}
          <button
            onClick={() => setIsEmergencyModalOpen(true)}
            className="min-h-[38px] px-2.5 sm:px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200/90 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-transform active:scale-95 shadow-xs"
            title="Emergency Services: Rescue 1122, Police 15, Fire 16, Admin 0308-4306705"
          >
            <ShieldAlert className="w-4 h-4 text-rose-600 animate-pulse shrink-0" />
            <span className="hidden sm:inline font-bold">
              {lang === 'ur' ? 'ایمرجنسی 1122' : '1122 / 15'}
            </span>
          </button>

          {/* Audio Speech Assistant for Low-Literacy users */}
          <button
            onClick={() => {
              speakUrduOrEnglish(
                "Welcome to KaamConnect Pakistan. You can book Raj Mistri, plumbers, electricians and carpenters with 10% platform commission. Recharge your wallet by sending JazzCash to 0308-4306705.",
                "کام کنیکٹ پاکستان میں خوش آمدید۔ راج مستری، پلمبر اور الیکٹریشن تلاش کریں۔ جاز کیش اکاؤنٹ 03084306705 پر بیلنس لوڈ کروائیں اور کام کروائیں۔",
                lang
              );
            }}
            className="min-h-[38px] w-9 sm:w-10 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200/80 flex items-center justify-center transition-colors"
            title={lang === 'ur' ? 'آواز سے سنیں (بول کر رہنمائی)' : 'Audio Voice Guide for Low Literacy'}
          >
            <Volume2 className="w-4 h-4 text-emerald-600" />
          </button>

          {/* Language Toggle */}
          <button
            onClick={() => setLang(lang === 'en' ? 'ur' : 'en')}
            className="min-h-[38px] px-2 py-1.5 flex items-center gap-1 text-xs font-bold text-slate-700 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors"
            title="Switch Language (Urdu / English)"
          >
            <Globe className="w-3.5 h-3.5 text-slate-500" />
            <span className="whitespace-nowrap">{lang === 'en' ? 'اردو' : 'EN'}</span>
          </button>

          {/* Interactive Role Switcher Segmented Control */}
          <div className="flex items-center p-0.5 bg-slate-100 rounded-xl border border-slate-200">
            <button
              onClick={() => handleRoleChange('customer')}
              className={`min-h-[34px] px-2 sm:px-2.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1 whitespace-nowrap ${
                role === 'customer'
                  ? 'bg-white text-emerald-700 shadow-sm font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <UserCheck className="w-3 h-3" />
              <span className="hidden sm:inline">{t('customerRole', lang)}</span>
              <span className="sm:hidden">Cust</span>
            </button>

            <button
              onClick={() => handleRoleChange('worker')}
              className={`min-h-[34px] px-2 sm:px-2.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1 whitespace-nowrap ${
                role === 'worker'
                  ? 'bg-white text-emerald-700 shadow-sm font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <HardHat className="w-3 h-3" />
              <span className="hidden sm:inline">{t('workerRole', lang)}</span>
              <span className="sm:hidden">Worker</span>
            </button>

            <button
              onClick={() => handleRoleChange('admin')}
              className={`min-h-[34px] px-2 sm:px-2.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1 whitespace-nowrap ${
                role === 'admin'
                  ? 'bg-white text-emerald-700 shadow-sm font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Shield className="w-3 h-3" />
              <span className="hidden sm:inline">{t('adminRole', lang)}</span>
              <span className="sm:hidden">Admin</span>
            </button>
          </div>

          {/* Demo Reset Button */}
          <button
            onClick={() => {
              if (window.confirm('Reset all demo bookings, categories, wallet balances, and settings?')) {
                resetDemoData();
              }
            }}
            className="hidden sm:flex items-center justify-center min-h-[38px] min-w-[38px] text-slate-400 hover:text-slate-700 rounded-xl hover:bg-slate-100 transition-colors"
            title="Reset Demo Data"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
