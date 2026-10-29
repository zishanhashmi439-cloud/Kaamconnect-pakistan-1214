import React, { useState, useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { CustomerView } from './components/customer/CustomerView';
import { CustomerBookingsView } from './components/customer/CustomerBookingsView';
import { WorkerView } from './components/worker/WorkerView';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { MobileBottomNav } from './components/MobileBottomNav';
import { ArchitectureModal } from './components/modals/ArchitectureModal';
import { BookServiceModal } from './components/customer/BookServiceModal';
import { JazzCashTopUpModal } from './components/wallet/JazzCashTopUpModal';
import { EmergencyHelplineModal } from './components/common/EmergencyHelplineModal';
import { LiveJobMapModal } from './components/map/LiveJobMapModal';
import { Plus, Shield, Phone, MessageSquare, Smartphone, AlertTriangle } from 'lucide-react';

function MainApp() {
  const {
    role,
    lang,
    settings,
    isJazzCashModalOpen,
    setIsJazzCashModalOpen,
    isEmergencyModalOpen,
    setIsEmergencyModalOpen,
    activeMapJob,
    setActiveMapJob
  } = useApp();
  const [activeTab, setActiveTab] = useState('explore');
  const [isArchitectureModalOpen, setIsArchitectureModalOpen] = useState(false);
  const [isGlobalBookingModalOpen, setIsGlobalBookingModalOpen] = useState(false);
  const [quotaExceeded, setQuotaExceeded] = useState(false);

  useEffect(() => {
    const handleQuota = () => setQuotaExceeded(true);
    window.addEventListener('gmp-quota-exceeded', handleQuota);
    return () => window.removeEventListener('gmp-quota-exceeded', handleQuota);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col antialiased">
      {/* Google Maps Quota Warning (Case A Demo Key) */}
      {quotaExceeded && (
        <div className="bg-amber-50 border-b border-amber-200 text-amber-900 px-4 py-2 text-xs text-center sticky top-0 z-50 shadow-sm flex items-center justify-center gap-2">
          <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
          <span>
            Google Maps Platform quota reached. If you are the app owner, visit{' '}
            <a
              href="https://developers.google.com/maps/ai/ai-studio?utm_campaign=gmp_mcp_codeassist_v1_aistudio#quota_exceeded_errors"
              target="_blank"
              rel="noopener noreferrer"
              className="underline font-semibold text-amber-950 hover:text-amber-800"
            >
              maps developer site
            </a>{' '}
            for instructions to update your account.
          </span>
        </div>
      )}

      {/* Top Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenArchitectureModal={() => setIsArchitectureModalOpen(true)}
      />

      {/* Main Content Viewport */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 pt-6 pb-24 lg:pb-12">
        {role === 'customer' && (
          <>
            {activeTab === 'bookings' ? (
              <CustomerBookingsView onNewBookingClick={() => setIsGlobalBookingModalOpen(true)} />
            ) : (
              <CustomerView
                onGoToBookings={() => setActiveTab('bookings')}
                activeSubView={activeTab === 'categories' ? 'categories' : 'explore'}
              />
            )}
          </>
        )}

        {role === 'worker' && <WorkerView />}

        {role === 'admin' && <AdminDashboard />}
      </main>

      {/* Floating Action Button (Customer View on Mobile) */}
      {role === 'customer' && activeTab !== 'bookings' && (
        <button
          onClick={() => setIsGlobalBookingModalOpen(true)}
          className="fixed bottom-20 right-4 lg:bottom-8 lg:right-8 z-30 min-h-[48px] px-4 py-3 bg-emerald-700 hover:bg-emerald-800 text-white rounded-full font-bold text-xs shadow-xl flex items-center gap-2 transition-transform active:scale-95"
        >
          <Plus className="w-5 h-5" />
          <span>{lang === 'ur' ? 'کام پوسٹ کریں' : 'Post Job / Get Bids'}</span>
        </button>
      )}

      {/* Mobile Bottom Tab Bar */}
      <MobileBottomNav
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenArchitecture={() => setIsArchitectureModalOpen(true)}
        onNewBookingClick={() => setIsGlobalBookingModalOpen(true)}
      />

      {/* Architecture & Flutter Blueprint Modal */}
      {isArchitectureModalOpen && (
        <ArchitectureModal onClose={() => setIsArchitectureModalOpen(false)} />
      )}

      {/* Global Booking Modal */}
      {isGlobalBookingModalOpen && (
        <BookServiceModal
          onClose={() => setIsGlobalBookingModalOpen(false)}
          onSuccess={() => {
            setIsGlobalBookingModalOpen(false);
            setActiveTab('bookings');
          }}
        />
      )}

      {/* JazzCash Top-Up Wallet Modal */}
      {isJazzCashModalOpen && (
        <JazzCashTopUpModal onClose={() => setIsJazzCashModalOpen(false)} />
      )}

      {/* Emergency Hotlines Modal (1122, 15, 16, Admin +923084306705) */}
      {isEmergencyModalOpen && (
        <EmergencyHelplineModal onClose={() => setIsEmergencyModalOpen(false)} />
      )}

      {/* Live Interactive Location Map Modal */}
      {activeMapJob && (
        <LiveJobMapModal job={activeMapJob} onClose={() => setActiveMapJob(null)} />
      )}

      {/* Universal Footer */}
      <footer className="hidden lg:block bg-white border-t border-slate-200 mt-auto py-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-3">
            <span className="font-bold text-slate-800">{settings.appName}</span>
            <span>·</span>
            <span>Initial Launch City: Lahore, Pakistan</span>
            <span>·</span>
            <span className="font-mono">Support: {settings.supportPhone}</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsArchitectureModalOpen(true)}
              className="text-emerald-700 hover:underline flex items-center gap-1 font-medium"
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Android Flutter Architecture & Schemas</span>
            </button>
            <span>·</span>
            <span>© 2026 KaamConnect Technologies Pakistan</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <MainApp />
    </AppProvider>
  );
}
