import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { t } from '../../utils/translations';
import { WorkerProfile, PricingModel, JobRequest } from '../../types';
import { WorkerVerificationSection } from '../common/WorkerVerificationSection';
import { speakUrduOrEnglish } from '../../utils/audioAssistant';
import {
  Briefcase,
  Star,
  CheckCircle2,
  Clock,
  Shield,
  ShieldCheck,
  Phone,
  Send,
  DollarSign,
  TrendingUp,
  MapPin,
  Calendar,
  AlertCircle,
  FileCheck,
  User,
  Settings,
  ChevronRight,
  Wallet,
  Volume2
} from 'lucide-react';

export const WorkerView: React.FC = () => {
  const {
    lang,
    workers,
    activeWorkerId,
    setActiveWorkerId,
    bookings,
    categories,
    selectedCity,
    settings,
    workerBalancePKR,
    setIsJazzCashModalOpen,
    submitQuote,
    updateJobStatus,
    updateWorkerProfile
  } = useApp();

  // Current active worker object
  const activeWorker = workers.find((w) => w.id === activeWorkerId) || workers[0];

  const [activeTab, setActiveTab] = useState<'jobs' | 'active_work' | 'profile' | 'verification'>('jobs');
  const [selectedJobForQuote, setSelectedJobForQuote] = useState<JobRequest | null>(null);
  
  // Quote form state
  const [quotePrice, setQuotePrice] = useState<number>(activeWorker?.visitFeePKR || 1500);
  const [quotePricingType, setQuotePricingType] = useState<PricingModel>('visit');
  const [quoteDuration, setQuoteDuration] = useState('1-2 days');
  const [quoteNotes, setQuoteNotes] = useState('');
  const [isSubmittingQuote, setIsSubmittingQuote] = useState(false);

  // Profile Edit State
  const [bioEn, setBioEn] = useState(activeWorker?.bioEn || '');
  const [bioUr, setBioUr] = useState(activeWorker?.bioUr || '');
  const [visitFee, setVisitFee] = useState(activeWorker?.visitFeePKR || 1000);
  const [dailyRate, setDailyRate] = useState(activeWorker?.dailyRatePKR || 2800);
  const [hourlyRate, setHourlyRate] = useState(activeWorker?.hourlyRatePKR || 450);
  const [cnicInput, setCnicInput] = useState(activeWorker?.cnicNumber || '');
  const [verificationApplied, setVerificationApplied] = useState(false);

  // Available job requests posted by customers in the market
  const availableJobRequests = bookings.filter(
    (b) => b.status === 'requested' || b.status === 'quoted'
  );

  // Active jobs assigned to this worker
  const myAssignedJobs = bookings.filter(
    (b) => b.selectedWorkerId === activeWorker?.id
  );

  // Completed jobs
  const myCompletedJobs = myAssignedJobs.filter((b) => b.status === 'completed');

  // Total earnings calculated from completed jobs
  const totalEarningsPKR = myCompletedJobs.reduce((acc, curr) => acc + (curr.finalPricePKR || 0), 0);

  // Handle send quote
  const handleSendQuote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedJobForQuote || !activeWorker) return;

    setIsSubmittingQuote(true);
    setTimeout(() => {
      submitQuote(selectedJobForQuote.id, {
        workerId: activeWorker.id,
        workerName: activeWorker.name,
        workerPhone: activeWorker.phone,
        workerPhoto: activeWorker.photo,
        workerRating: activeWorker.rating,
        workerVerified: activeWorker.verified,
        pricePKR: Number(quotePrice),
        pricingType: quotePricingType,
        estimatedDuration: quoteDuration,
        notes: quoteNotes || `I can start on ${selectedJobForQuote.scheduledDate}. Professional work guaranteed with high quality tools.`
      });

      setIsSubmittingQuote(false);
      setSelectedJobForQuote(null);
      setQuoteNotes('');
      alert('Quotation submitted successfully to customer!');
    }, 400);
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeWorker) return;
    updateWorkerProfile(activeWorker.id, {
      bioEn,
      bioUr,
      visitFeePKR: Number(visitFee),
      dailyRatePKR: Number(dailyRate),
      hourlyRatePKR: Number(hourlyRate),
      cnicNumber: cnicInput
    });
    alert('Worker profile updated successfully.');
  };

  const handleApplyVerification = () => {
    if (!cnicInput || cnicInput.length < 13) {
      alert('Please enter a valid 13-digit Pakistani CNIC number (e.g. 35201-1234567-1).');
      return;
    }
    updateWorkerProfile(activeWorker.id, {
      cnicNumber: cnicInput,
      verificationStatus: 'pending'
    });
    setVerificationApplied(true);
    alert('Verification application submitted to KaamConnect Admin. Awaiting document approval.');
  };

  const toggleAvailability = () => {
    const nextStatus = activeWorker.availabilityStatus === 'available' ? 'offline' : 'available';
    updateWorkerProfile(activeWorker.id, {
      availabilityStatus: nextStatus
    });
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Worker Header & Profile Selector */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="relative w-16 h-16 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
            <img
              src={activeWorker.photo}
              alt={activeWorker.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            {activeWorker.verified && (
              <div className="absolute bottom-1 right-1 bg-emerald-600 text-white p-0.5 rounded-full" title="Verified">
                <CheckCircle2 className="w-3.5 h-3.5" />
              </div>
            )}
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-slate-900">{activeWorker.name}</h2>
              {activeWorker.verified ? (
                <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  {t('verifiedBadge', lang)}
                </span>
              ) : (
                <span className="text-[11px] font-semibold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-md">
                  {t('pendingBadge', lang)}
                </span>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
              <span className="text-amber-600 font-semibold flex items-center gap-1">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span className="tabular-nums">{activeWorker.rating}</span> ({activeWorker.reviewCount})
              </span>
              <span>·</span>
              <span>{activeWorker.city} ({activeWorker.serviceAreas.slice(0, 2).join(', ')})</span>
              <span>·</span>
              <span className="font-mono">{activeWorker.phone}</span>
            </div>
          </div>
        </div>

        {/* Worker Switcher & Availability Toggle */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto justify-between md:justify-end">
          {/* Switch demo worker identity */}
          <div className="flex items-center gap-1.5 text-xs text-slate-600">
            <span className="text-[11px] text-slate-400">Worker ID:</span>
            <select
              value={activeWorkerId}
              onChange={(e) => setActiveWorkerId(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-800 font-medium"
            >
              {workers.map((w) => (
                <option key={w.id} value={w.id}>
                  {w.name} ({w.primaryCategoryCode})
                </option>
              ))}
            </select>
          </div>

          {/* Availability Toggle */}
          <button
            onClick={toggleAvailability}
            className={`min-h-[40px] px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors ${
              activeWorker.availabilityStatus === 'available'
                ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                : 'bg-slate-200 text-slate-700'
            }`}
          >
            <span className={`w-2 h-2 rounded-full ${
              activeWorker.availabilityStatus === 'available' ? 'bg-emerald-600' : 'bg-slate-400'
            }`} />
            <span>{activeWorker.availabilityStatus === 'available' ? t('workerAvailable', lang) : t('workerBusy', lang)}</span>
          </button>
        </div>
      </div>

      {/* KPI Stats Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs">
          <span className="text-[11px] text-slate-500 uppercase tracking-wider block">Total Earned</span>
          <div className="text-xl font-bold text-slate-900 tabular-nums mt-1">
            Rs. {totalEarningsPKR.toLocaleString()}
          </div>
          <span className="text-[10px] text-emerald-700 font-medium block mt-0.5">
            {myCompletedJobs.length} completed jobs
          </span>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs">
          <span className="text-[11px] text-slate-500 uppercase tracking-wider block">Active Jobs</span>
          <div className="text-xl font-bold text-slate-900 tabular-nums mt-1">
            {myAssignedJobs.filter(j => j.status !== 'completed' && j.status !== 'cancelled').length}
          </div>
          <span className="text-[10px] text-slate-400 font-medium block mt-0.5">In progress & scheduled</span>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs">
          <span className="text-[11px] text-slate-500 uppercase tracking-wider block">Customer Rating</span>
          <div className="text-xl font-bold text-slate-900 tabular-nums mt-1 flex items-center gap-1">
            <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
            <span>{activeWorker.rating}</span>
          </div>
          <span className="text-[10px] text-slate-400 font-medium block mt-0.5">From {activeWorker.reviewCount} customer reviews</span>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs">
          <span className="text-[11px] text-slate-500 uppercase tracking-wider block">CNIC Status</span>
          <div className="text-base font-bold text-slate-900 mt-1 flex items-center gap-1">
            {activeWorker.verified ? (
              <span className="text-emerald-700">Verified</span>
            ) : (
              <span className="text-amber-700">Verification Pending</span>
            )}
          </div>
          <span className="text-[10px] text-slate-400 font-medium block mt-0.5">NADRA Identity check</span>
        </div>
      </div>

      {/* Worker JazzCash Wallet & 10% Commission Card */}
      <div className="bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 rounded-3xl p-5 sm:p-6 border border-emerald-500/30 text-white shadow-lg">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center font-bold text-lg shadow-md shrink-0">
              <Wallet className="w-6 h-6" />
            </div>
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                  {lang === 'ur' ? 'کاریگر جاز کیش اکاؤنٹ بیلنس' : 'Worker JazzCash Wallet'}
                </span>
                <button
                  type="button"
                  onClick={() =>
                    speakUrduOrEnglish(
                      `آپ کا موجودہ جاز کیش بیلنس ${workerBalancePKR} روپے ہے۔ ہر مکمل کام پر دس فیصد کمیشن کٹوتی ہوتی ہے۔ ایڈمن جاز کیش نمبر ہے 0308-4306705`,
                      'ur'
                    )
                  }
                  title="بول کر سنیں (Audio Guide)"
                  className="p-1 rounded-full text-amber-300 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                </button>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl sm:text-3xl font-black text-white tabular-nums">
                  Rs. {workerBalancePKR.toLocaleString()}
                </span>
                <span className="text-xs text-emerald-400 font-medium">
                  {workerBalancePKR > 200 ? 'Active & Ready for jobs' : 'Low balance - recharge to receive leads'}
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
            <div className="text-xs text-slate-300 max-w-xs sm:text-right">
              <span className="text-amber-300 font-bold block">10% Platform Commission</span>
              <span>Auto-credited to Admin JazzCash: <strong className="text-white">0308-4306705</strong></span>
            </div>
            <button
              onClick={() => setIsJazzCashModalOpen(true)}
              className="min-h-[44px] px-5 py-2.5 bg-amber-400 hover:bg-amber-300 active:scale-95 text-slate-950 font-bold text-xs rounded-xl shadow-md flex items-center justify-center gap-2 transition-transform"
            >
              <Wallet className="w-4 h-4 text-slate-950" />
              <span>{lang === 'ur' ? '+ جاز کیش بیلنس لوڈ کریں' : '+ Load JazzCash'}</span>
            </button>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 border-b border-slate-200 text-sm font-medium">
        <button
          onClick={() => setActiveTab('jobs')}
          className={`pb-3 px-1 border-b-2 transition-colors min-h-[44px] flex items-center gap-1.5 ${
            activeTab === 'jobs'
              ? 'border-emerald-600 text-emerald-800 font-semibold'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Briefcase className="w-4 h-4" />
          <span>New Customer Requests ({availableJobRequests.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('active_work')}
          className={`pb-3 px-1 border-b-2 transition-colors min-h-[44px] flex items-center gap-1.5 ${
            activeTab === 'active_work'
              ? 'border-emerald-600 text-emerald-800 font-semibold'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>My Assigned Jobs ({myAssignedJobs.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('profile')}
          className={`pb-3 px-1 border-b-2 transition-colors min-h-[44px] flex items-center gap-1.5 ${
            activeTab === 'profile'
              ? 'border-emerald-600 text-emerald-800 font-semibold'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <User className="w-4 h-4" />
          <span>Edit Profile & Rates</span>
        </button>

        <button
          onClick={() => setActiveTab('verification')}
          className={`pb-3 px-1 border-b-2 transition-colors min-h-[44px] flex items-center gap-1.5 ${
            activeTab === 'verification'
              ? 'border-emerald-600 text-emerald-800 font-semibold'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
          <span>Verification & Checks</span>
          {activeWorker.verified && (
            <span className="text-[10px] text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded font-semibold">
              4/4 Passed
            </span>
          )}
        </button>
      </div>

      {/* TAB 1: Available Customer Job Requests */}
      {activeTab === 'jobs' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900">
              Customer Work Posts in Lahore Open for Quotations
            </h3>
            <span className="text-xs text-slate-500">Submit competitive bids to win bookings</span>
          </div>

          {availableJobRequests.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-10 text-center text-xs text-slate-500">
              No open customer requests right now. Check back shortly.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {availableJobRequests.map((job) => {
                const alreadyQuoted = job.quotes.some(q => q.workerId === activeWorker.id);
                return (
                  <div
                    key={job.id}
                    className="bg-white rounded-2xl border border-slate-200 p-5 space-y-3 shadow-xs hover:border-emerald-300 transition-colors flex flex-col justify-between"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-mono text-slate-400">#{job.id}</span>
                        <span className="px-2 py-0.5 bg-emerald-50 text-emerald-800 font-semibold rounded-md">
                          {job.categoryNameEn}
                        </span>
                      </div>

                      <h4 className="text-sm font-bold text-slate-900">{job.title}</h4>
                      <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">{job.description}</p>

                      <div className="grid grid-cols-2 gap-2 text-xs bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                        <div>
                          <span className="text-[10px] text-slate-400 block uppercase">Customer Area</span>
                          <span className="font-semibold text-slate-800">{job.customerArea}, {job.customerCity}</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-slate-400 block uppercase">Schedule</span>
                          <span className="font-semibold text-slate-800">{job.scheduledDate}</span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-xs text-slate-500">
                        Preferred: <span className="font-semibold text-slate-700 capitalize">{job.pricingModelPreferred}</span>
                      </span>

                      {alreadyQuoted ? (
                        <span className="text-xs font-semibold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-md">
                          Quotation Submitted
                        </span>
                      ) : (
                        <button
                          onClick={() => setSelectedJobForQuote(job)}
                          className="px-3.5 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-semibold transition-colors"
                        >
                          Send Quotation
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* TAB 2: My Assigned Jobs & Status Updating */}
      {activeTab === 'active_work' && (
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-slate-900">
            Jobs Assigned to You ({myAssignedJobs.length})
          </h3>

          {myAssignedJobs.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-10 text-center text-xs text-slate-500">
              No assigned jobs at the moment. Submit quotations on open customer requests to win jobs.
            </div>
          ) : (
            <div className="space-y-4">
              {myAssignedJobs.map((job) => (
                <div
                  key={job.id}
                  className="bg-white rounded-2xl border border-slate-200 p-5 space-y-4 shadow-xs"
                >
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                    <div>
                      <div className="flex items-center gap-2 text-xs">
                        <span className="font-mono text-slate-400">#{job.id}</span>
                        <span>·</span>
                        <span className="font-bold text-slate-900">{job.title}</span>
                      </div>
                      <span className="text-xs text-slate-500">Customer: {job.customerName} ({job.customerPhone})</span>
                    </div>

                    <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-md">
                      Price: Rs. {job.finalPricePKR?.toLocaleString()}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">{job.description}</p>
                  
                  <div className="text-xs text-slate-700 bg-slate-50 p-3 rounded-xl">
                    <span className="font-semibold block mb-0.5">Customer Address:</span>
                    <span>{job.addressDetails}, {job.customerArea}, {job.customerCity}</span>
                  </div>

                  {/* Worker Status Progression Buttons */}
                  <div className="pt-2 border-t border-slate-100 space-y-2">
                    <span className="text-[11px] font-semibold text-slate-500 block">
                      Update Job Status for Customer: (Current: <span className="text-emerald-700 capitalize">{job.status.replace(/_/g, ' ')}</span>)
                    </span>

                    <div className="flex flex-wrap items-center gap-2">
                      <button
                        onClick={() => updateJobStatus(job.id, 'on_the_way')}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                          job.status === 'on_the_way' ? 'bg-amber-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                        }`}
                      >
                        I'm On The Way (راستے میں)
                      </button>

                      <button
                        onClick={() => updateJobStatus(job.id, 'in_progress')}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                          job.status === 'in_progress' ? 'bg-purple-700 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                        }`}
                      >
                        Started Work (کام شروع کیا)
                      </button>

                      <button
                        onClick={() => updateJobStatus(job.id, 'completed')}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                          job.status === 'completed' ? 'bg-emerald-800 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                        }`}
                      >
                        Work Finished / Completed (مکمل)
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 3: Edit Profile & Rate Card */}
      {activeTab === 'profile' && (
        <form onSubmit={handleSaveProfile} className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-5">
          <h3 className="text-base font-bold text-slate-900">Professional Rate Card & Details</h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Visit / Inspection Fee (PKR)</label>
              <input
                type="number"
                value={visitFee}
                onChange={(e) => setVisitFee(Number(e.target.value))}
                className="w-full text-xs text-slate-800 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Daily Wage / Dihari (PKR)</label>
              <input
                type="number"
                value={dailyRate}
                onChange={(e) => setDailyRate(Number(e.target.value))}
                className="w-full text-xs text-slate-800 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Hourly Rate (PKR)</label>
              <input
                type="number"
                value={hourlyRate}
                onChange={(e) => setHourlyRate(Number(e.target.value))}
                className="w-full text-xs text-slate-800 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5"
              />
            </div>
          </div>

          <div className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">English Bio / Scope of Work</label>
              <textarea
                rows={2}
                value={bioEn}
                onChange={(e) => setBioEn(e.target.value)}
                className="w-full text-xs text-slate-800 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Urdu Bio (اردو تفصیل)</label>
              <textarea
                rows={2}
                value={bioUr}
                dir="rtl"
                onChange={(e) => setBioUr(e.target.value)}
                className="w-full text-xs text-slate-800 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5"
              />
            </div>
          </div>

          {/* Dedicated Verification Section */}
          <div className="pt-2">
            <WorkerVerificationSection
              worker={activeWorker}
              isOwner={true}
              onApplyVerification={() => {
                const el = document.getElementById('cnic-input-field');
                if (el) el.focus();
              }}
            />
          </div>

          {/* Verification input field */}
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-emerald-600" />
              <div>
                <h4 className="text-xs font-bold text-slate-900">Update CNIC / Documentation</h4>
                <p className="text-[11px] text-slate-500">Provide 13-digit Pakistani CNIC for automated and manual audit.</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-2">
              <input
                id="cnic-input-field"
                type="text"
                value={cnicInput}
                onChange={(e) => setCnicInput(e.target.value)}
                placeholder="35201-1234567-1"
                className="w-full sm:flex-1 text-xs text-slate-800 bg-white border border-slate-200 rounded-xl px-3 py-2.5 font-mono"
              />
              <button
                type="button"
                onClick={handleApplyVerification}
                className="w-full sm:w-auto px-4 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-semibold shrink-0"
              >
                Apply for / Renew Verified Badge
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold transition-colors shadow-sm"
          >
            Save Rate Card Updates
          </button>
        </form>
      )}

      {/* TAB 4: Dedicated Verification View */}
      {activeTab === 'verification' && (
        <div className="space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Worker Trust & Verification Profile
              </h3>
              <p className="text-xs text-slate-500">
                Detailed record of background checks, identity authentication, and police clearances on file.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md">
                Worker ID: #{activeWorker.id}
              </span>
            </div>
          </div>

          {/* Full Dedicated Verification Section */}
          <WorkerVerificationSection
            worker={activeWorker}
            isOwner={true}
            onApplyVerification={handleApplyVerification}
          />

          {/* Verification Protocol & Requirements Information Card */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-4">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              KaamConnect 4-Step Verification Protocol for Lahore
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
                <span className="font-bold text-slate-900 block">1. NADRA Biometric CNIC Validation</span>
                <p className="text-slate-600">
                  Workers must provide an active Computerized National Identity Card. Name and photograph are cross-checked with the citizen registry.
                </p>
              </div>

              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
                <span className="font-bold text-slate-900 block">2. Police Clearance Certificate</span>
                <p className="text-slate-600">
                  Criminal record verification obtained through Punjab Police Khidmat Markaz (PKM) ensuring safety for residential visits.
                </p>
              </div>

              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
                <span className="font-bold text-slate-900 block">3. Trade Skill & Practical Vetting</span>
                <p className="text-slate-600">
                  Practical inspection of tools and previous work quality by senior trade assessors in Lahore.
                </p>
              </div>

              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
                <span className="font-bold text-slate-900 block">4. In-Person Address Audit</span>
                <p className="text-slate-600">
                  Physical visit to worker's residence or contractor shop to confirm local contactability.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Quote Submission Modal */}
      {selectedJobForQuote && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Submit Quotation to Customer</h3>
                <p className="text-xs text-slate-500">For: {selectedJobForQuote.title}</p>
              </div>
              <button
                onClick={() => setSelectedJobForQuote(null)}
                className="text-slate-400 hover:text-slate-700"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSendQuote} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Quoted Price (PKR)</label>
                  <input
                    type="number"
                    required
                    value={quotePrice}
                    onChange={(e) => setQuotePrice(Number(e.target.value))}
                    className="w-full text-xs text-slate-800 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 font-bold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Pricing Model</label>
                  <select
                    value={quotePricingType}
                    onChange={(e) => setQuotePricingType(e.target.value as PricingModel)}
                    className="w-full text-xs text-slate-800 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5"
                  >
                    <option value="visit">Per Visit</option>
                    <option value="daily">Daily Wage (Dihari)</option>
                    <option value="sqft">Per Sq Ft</option>
                    <option value="project">Full Project Theka</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Estimated Completion Duration</label>
                <input
                  type="text"
                  required
                  value={quoteDuration}
                  onChange={(e) => setQuoteDuration(e.target.value)}
                  placeholder="e.g. 3 hours, 2 days, 1 week"
                  className="w-full text-xs text-slate-800 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Scope of Work & Notes for Homeowner</label>
                <textarea
                  rows={3}
                  value={quoteNotes}
                  onChange={(e) => setQuoteNotes(e.target.value)}
                  placeholder="Explain what is included in your quote (labor only, tools included, warranty etc.)..."
                  className="w-full text-xs text-slate-800 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmittingQuote}
                className="w-full min-h-[44px] py-2.5 px-4 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 shadow-sm"
              >
                <Send className="w-4 h-4" />
                <span>{isSubmittingQuote ? 'Sending Quotation...' : 'Send Quote to Customer'}</span>
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
