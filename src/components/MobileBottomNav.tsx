import React from 'react';
import { useApp } from '../../src/context/AppContext';
import { t } from '../../src/utils/translations';
import {
  Search,
  Grid,
  Calendar,
  HardHat,
  Shield,
  User,
  Smartphone,
  Layers,
  AlertTriangle
} from 'lucide-react';

interface MobileBottomNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenArchitecture: () => void;
  onNewBookingClick: () => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  activeTab,
  setActiveTab,
  onOpenArchitecture,
  onNewBookingClick
}) => {
  const { role, lang, bookings } = useApp();

  const activeBookingsCount = bookings.filter(b => b.status !== 'completed' && b.status !== 'cancelled').length;

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200">
      <div className="grid grid-cols-4 items-center h-16 max-w-md mx-auto px-2">
        {role === 'customer' && (
          <>
            <button
              onClick={() => setActiveTab('explore')}
              className={`flex flex-col items-center justify-center min-h-[44px] transition-colors ${
                activeTab === 'explore' ? 'text-emerald-700 font-bold' : 'text-slate-500'
              }`}
            >
              <Search className="w-5 h-5" />
              <span className="text-[10px] mt-1">{lang === 'ur' ? 'تلاش' : 'Explore'}</span>
            </button>

            <button
              onClick={() => setActiveTab('categories')}
              className={`flex flex-col items-center justify-center min-h-[44px] transition-colors ${
                activeTab === 'categories' ? 'text-emerald-700 font-bold' : 'text-slate-500'
              }`}
            >
              <Grid className="w-5 h-5" />
              <span className="text-[10px] mt-1">{lang === 'ur' ? 'سروسز' : 'Services'}</span>
            </button>

            <button
              onClick={() => setActiveTab('bookings')}
              className={`relative flex flex-col items-center justify-center min-h-[44px] transition-colors ${
                activeTab === 'bookings' ? 'text-emerald-700 font-bold' : 'text-slate-500'
              }`}
            >
              <Calendar className="w-5 h-5" />
              {activeBookingsCount > 0 && (
                <span className="absolute top-1 right-5 w-4 h-4 bg-emerald-600 text-white rounded-full text-[9px] flex items-center justify-center font-bold">
                  {activeBookingsCount}
                </span>
              )}
              <span className="text-[10px] mt-1">{lang === 'ur' ? 'بکنگز' : 'Bookings'}</span>
            </button>

            <button
              onClick={onOpenArchitecture}
              className="flex flex-col items-center justify-center min-h-[44px] text-slate-500 hover:text-slate-800 transition-colors"
            >
              <Smartphone className="w-5 h-5" />
              <span className="text-[10px] mt-1">{lang === 'ur' ? 'ایپ' : 'Android'}</span>
            </button>
          </>
        )}

        {role === 'worker' && (
          <>
            <button
              onClick={() => setActiveTab('jobs')}
              className={`flex flex-col items-center justify-center min-h-[44px] transition-colors ${
                activeTab === 'jobs' ? 'text-emerald-700 font-bold' : 'text-slate-500'
              }`}
            >
              <HardHat className="w-5 h-5" />
              <span className="text-[10px] mt-1">{lang === 'ur' ? 'نئے کام' : 'Job Feed'}</span>
            </button>

            <button
              onClick={() => setActiveTab('active_work')}
              className={`flex flex-col items-center justify-center min-h-[44px] transition-colors ${
                activeTab === 'active_work' ? 'text-emerald-700 font-bold' : 'text-slate-500'
              }`}
            >
              <Calendar className="w-5 h-5" />
              <span className="text-[10px] mt-1">{lang === 'ur' ? 'جاری کام' : 'My Jobs'}</span>
            </button>

            <button
              onClick={() => setActiveTab('profile')}
              className={`flex flex-col items-center justify-center min-h-[44px] transition-colors ${
                activeTab === 'profile' ? 'text-emerald-700 font-bold' : 'text-slate-500'
              }`}
            >
              <User className="w-5 h-5" />
              <span className="text-[10px] mt-1">{lang === 'ur' ? 'پروفائل' : 'Rates'}</span>
            </button>

            <button
              onClick={onOpenArchitecture}
              className="flex flex-col items-center justify-center min-h-[44px] text-slate-500 hover:text-slate-800 transition-colors"
            >
              <Smartphone className="w-5 h-5" />
              <span className="text-[10px] mt-1">Flutter</span>
            </button>
          </>
        )}

        {role === 'admin' && (
          <>
            <button
              onClick={() => setActiveTab('overview')}
              className={`flex flex-col items-center justify-center min-h-[44px] transition-colors ${
                activeTab === 'overview' ? 'text-emerald-700 font-bold' : 'text-slate-500'
              }`}
            >
              <Shield className="w-5 h-5" />
              <span className="text-[10px] mt-1">Overview</span>
            </button>

            <button
              onClick={() => setActiveTab('workers')}
              className={`flex flex-col items-center justify-center min-h-[44px] transition-colors ${
                activeTab === 'workers' ? 'text-emerald-700 font-bold' : 'text-slate-500'
              }`}
            >
              <HardHat className="w-5 h-5" />
              <span className="text-[10px] mt-1">Verify</span>
            </button>

            <button
              onClick={() => setActiveTab('categories')}
              className={`flex flex-col items-center justify-center min-h-[44px] transition-colors ${
                activeTab === 'categories' ? 'text-emerald-700 font-bold' : 'text-slate-500'
              }`}
            >
              <Layers className="w-5 h-5" />
              <span className="text-[10px] mt-1">Trades</span>
            </button>

            <button
              onClick={() => setActiveTab('complaints')}
              className={`flex flex-col items-center justify-center min-h-[44px] transition-colors ${
                activeTab === 'complaints' ? 'text-emerald-700 font-bold' : 'text-slate-500'
              }`}
            >
              <AlertTriangle className="w-5 h-5" />
              <span className="text-[10px] mt-1">Disputes</span>
            </button>
          </>
        )}
      </div>
    </nav>
  );
};
