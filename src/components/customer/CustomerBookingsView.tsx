import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { JobRequest, Quotation } from '../../types';
import { t } from '../../utils/translations';
import { RateServiceModal } from './RateServiceModal';
import { ComplaintModal } from './ComplaintModal';
import {
  Calendar,
  Clock,
  MapPin,
  CheckCircle2,
  AlertCircle,
  Phone,
  MessageSquare,
  Star,
  ChevronRight,
  ShieldAlert,
  ArrowRight,
  Navigation,
  Lock,
  ShieldCheck,
  Wallet
} from 'lucide-react';

interface CustomerBookingsViewProps {
  onNewBookingClick: () => void;
}

export const CustomerBookingsView: React.FC<CustomerBookingsViewProps> = ({ onNewBookingClick }) => {
  const { lang, bookings, settings, acceptQuote, updateJobStatus, setActiveMapJob } = useApp();
  const [selectedJobForRating, setSelectedJobForRating] = useState<JobRequest | null>(null);
  const [selectedJobForComplaint, setSelectedJobForComplaint] = useState<JobRequest | null>(null);
  const [activeTabFilter, setActiveTabFilter] = useState<'all' | 'active' | 'completed'>('all');

  const filteredBookings = bookings.filter(b => {
    if (activeTabFilter === 'active') return b.status !== 'completed' && b.status !== 'cancelled';
    if (activeTabFilter === 'completed') return b.status === 'completed';
    return true;
  });

  const getStatusBadge = (status: JobRequest['status']) => {
    switch (status) {
      case 'requested':
        return <span className="text-xs font-semibold text-sky-800 bg-sky-50 px-2.5 py-1 rounded-md">{t('statusRequested', lang)}</span>;
      case 'quoted':
        return <span className="text-xs font-semibold text-indigo-800 bg-indigo-50 px-2.5 py-1 rounded-md">{t('statusQuoted', lang)}</span>;
      case 'accepted':
        return <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md">{t('statusAccepted', lang)}</span>;
      case 'on_the_way':
        return <span className="text-xs font-semibold text-amber-800 bg-amber-50 px-2.5 py-1 rounded-md">{t('statusOnTheWay', lang)}</span>;
      case 'in_progress':
        return <span className="text-xs font-semibold text-purple-800 bg-purple-50 px-2.5 py-1 rounded-md">{t('statusInProgress', lang)}</span>;
      case 'completed':
        return <span className="text-xs font-semibold text-emerald-900 bg-emerald-100 px-2.5 py-1 rounded-md">{t('statusCompleted', lang)}</span>;
      case 'cancelled':
        return <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-md">{t('statusCancelled', lang)}</span>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Bar with Filter and Action */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900">
            {lang === 'ur' ? 'آپ کی بکنگز اور کام کی پیش رفت' : 'Your Job Bookings & Quotations'}
          </h2>
          <p className="text-xs text-slate-500">
            Track real-time status, compare worker bids, and confirm completions in Lahore.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Filter tabs */}
          <div className="flex items-center p-1 bg-slate-100 rounded-xl text-xs font-medium">
            <button
              onClick={() => setActiveTabFilter('all')}
              className={`px-3 py-1.5 rounded-lg transition-colors min-h-[36px] ${
                activeTabFilter === 'all' ? 'bg-white text-slate-900 shadow-sm font-semibold' : 'text-slate-600'
              }`}
            >
              All ({bookings.length})
            </button>
            <button
              onClick={() => setActiveTabFilter('active')}
              className={`px-3 py-1.5 rounded-lg transition-colors min-h-[36px] ${
                activeTabFilter === 'active' ? 'bg-white text-slate-900 shadow-sm font-semibold' : 'text-slate-600'
              }`}
            >
              Active ({bookings.filter(b => b.status !== 'completed' && b.status !== 'cancelled').length})
            </button>
            <button
              onClick={() => setActiveTabFilter('completed')}
              className={`px-3 py-1.5 rounded-lg transition-colors min-h-[36px] ${
                activeTabFilter === 'completed' ? 'bg-white text-slate-900 shadow-sm font-semibold' : 'text-slate-600'
              }`}
            >
              Completed ({bookings.filter(b => b.status === 'completed').length})
            </button>
          </div>

          <button
            onClick={onNewBookingClick}
            className="min-h-[40px] px-3.5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-sm"
          >
            <span>+ New Job</span>
          </button>
        </div>
      </div>

      {filteredBookings.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-3">
          <Calendar className="w-10 h-10 text-slate-300 mx-auto" />
          <h3 className="text-sm font-bold text-slate-800">No bookings in this tab</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            You have no orders currently in this state. Post a job or select a worker from our directory to get started.
          </p>
          <button
            onClick={onNewBookingClick}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-700 text-white text-xs font-semibold rounded-xl hover:bg-emerald-800"
          >
            Post a Job Request
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredBookings.map((job) => (
            <div
              key={job.id}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-sm transition-shadow"
            >
              {/* Card Header */}
              <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-slate-400">#{job.id}</span>
                    <span className="text-xs text-slate-300">·</span>
                    <span className="text-xs font-medium text-emerald-700">
                      {lang === 'ur' ? job.categoryNameUr : job.categoryNameEn}
                    </span>
                    <span className="text-xs text-slate-300">·</span>
                    <span className="text-xs text-slate-500">
                      {lang === 'ur' ? job.subcategoryNameUr : job.subcategoryNameEn}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900">{job.title}</h3>
                </div>

                <div className="flex items-center gap-2 self-start sm:self-auto">
                  {getStatusBadge(job.status)}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 space-y-4">
                <p className="text-xs text-slate-600 leading-relaxed">{job.description}</p>

                {/* Details grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase">Location</span>
                    <span className="font-medium text-slate-700 flex items-center gap-1 truncate">
                      <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                      {job.customerArea}, {job.customerCity}
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase">Schedule</span>
                    <span className="font-medium text-slate-700 flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-slate-400 shrink-0" />
                      {job.scheduledDate}
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase">Pricing Preference</span>
                    <span className="font-medium text-slate-700 capitalize">
                      {job.pricingModelPreferred} pricing
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase">Assigned Worker</span>
                    <span className="font-semibold text-slate-900 truncate block">
                      {job.selectedWorkerName || 'Awaiting quote acceptance'}
                    </span>
                  </div>
                </div>

                {/* Quotation Comparison Section if quotes are available */}
                {job.quotes.length > 0 && job.status === 'quoted' && (
                  <div className="space-y-3 pt-2">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                        Received Quotations ({job.quotes.length}) - Compare & Choose
                      </h4>
                      <span className="text-[11px] text-emerald-700 font-medium">Click accept to confirm booking</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {job.quotes.map((quote) => (
                        <div
                          key={quote.id}
                          className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/40 flex flex-col justify-between space-y-3"
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex items-center gap-2.5">
                              <img
                                src={quote.workerPhoto}
                                alt={quote.workerName}
                                referrerPolicy="no-referrer"
                                className="w-10 h-10 rounded-full object-cover border border-slate-200"
                              />
                              <div>
                                <h5 className="text-xs font-bold text-slate-900">{quote.workerName}</h5>
                                <div className="flex items-center gap-1 text-[11px] text-amber-600">
                                  <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                                  <span className="tabular-nums font-semibold">{quote.workerRating}</span>
                                  {quote.workerVerified && (
                                    <span className="text-emerald-700 font-medium">· Verified</span>
                                  )}
                                </div>
                              </div>
                            </div>

                            <div className="text-right">
                              <span className="text-base font-bold text-emerald-800 tabular-nums block">
                                Rs. {quote.pricePKR.toLocaleString()}
                              </span>
                              <span className="text-[10px] text-slate-500 uppercase">{quote.pricingType}</span>
                            </div>
                          </div>

                          <p className="text-xs text-slate-600 italic bg-white/70 p-2 rounded-lg border border-slate-100">
                            "{quote.notes}"
                          </p>

                          <div className="flex items-center justify-between text-xs pt-1 border-t border-emerald-100">
                            <span className="text-slate-500 text-[11px]">Duration: {quote.estimatedDuration}</span>
                            <button
                              onClick={() => acceptQuote(job.id, quote.id)}
                              className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold rounded-lg text-xs transition-colors shadow-xs"
                            >
                              Accept This Quote
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Workflow Stepper & Demo Status Progression Simulator */}
                {job.status !== 'cancelled' && (
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-2">
                    <div className="flex items-center justify-between text-[11px] font-semibold text-slate-500">
                      <span>Status Progression</span>
                      <span className="text-slate-400 font-normal">Workflow Demo Controls</span>
                    </div>

                    <div className="flex flex-wrap items-center gap-1.5">
                      <button
                        onClick={() => updateJobStatus(job.id, 'accepted')}
                        className={`px-2.5 py-1 text-[11px] rounded-md transition-colors ${
                          job.status === 'accepted' ? 'bg-emerald-700 text-white font-semibold' : 'bg-white text-slate-600 hover:bg-slate-200'
                        }`}
                      >
                        1. Confirmed
                      </button>
                      <ArrowRight className="w-3 h-3 text-slate-300" />
                      <button
                        onClick={() => updateJobStatus(job.id, 'on_the_way')}
                        className={`px-2.5 py-1 text-[11px] rounded-md transition-colors ${
                          job.status === 'on_the_way' ? 'bg-amber-600 text-white font-semibold' : 'bg-white text-slate-600 hover:bg-slate-200'
                        }`}
                      >
                        2. On the Way
                      </button>
                      <ArrowRight className="w-3 h-3 text-slate-300" />
                      <button
                        onClick={() => updateJobStatus(job.id, 'in_progress')}
                        className={`px-2.5 py-1 text-[11px] rounded-md transition-colors ${
                          job.status === 'in_progress' ? 'bg-purple-700 text-white font-semibold' : 'bg-white text-slate-600 hover:bg-slate-200'
                        }`}
                      >
                        3. In Progress
                      </button>
                      <ArrowRight className="w-3 h-3 text-slate-300" />
                      <button
                        onClick={() => updateJobStatus(job.id, 'completed')}
                        className={`px-2.5 py-1 text-[11px] rounded-md transition-colors ${
                          job.status === 'completed' ? 'bg-emerald-800 text-white font-semibold' : 'bg-white text-slate-600 hover:bg-slate-200'
                        }`}
                      >
                        4. Completed
                      </button>
                    </div>
                  </div>
                )}

                {/* Rating Display if already submitted */}
                {job.ratingGiven && (
                  <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-xl space-y-1">
                    <div className="flex items-center gap-1 text-xs text-amber-700 font-semibold">
                      <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                      <span>Your Verified Rating: {job.ratingGiven}.0 / 5</span>
                    </div>
                    {job.reviewGiven && (
                      <p className="text-xs text-slate-600">"{job.reviewGiven}"</p>
                    )}
                  </div>
                )}
              </div>

              {/* Card Footer Actions */}
              <div className="px-5 py-3.5 bg-slate-50/60 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  {job.selectedWorkerPhone && (
                    <a
                      href={`tel:${job.selectedWorkerPhone}`}
                      className="px-3 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Call Worker</span>
                    </a>
                  )}
                  {job.selectedWorkerPhone && (
                    <a
                      href={`https://wa.me/${job.selectedWorkerPhone.replace(/\D/g, '')}?text=Salam%20${encodeURIComponent(job.selectedWorkerName || 'Ustad')},%20regarding%20KaamConnect%20job%20#${job.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 bg-emerald-50 border border-emerald-200 hover:bg-emerald-100 text-emerald-800 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors"
                    >
                      <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                      <span>WhatsApp</span>
                    </a>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  {job.status === 'completed' && !job.ratingGiven && (
                    <button
                      onClick={() => setSelectedJobForRating(job)}
                      className="px-3.5 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold rounded-lg flex items-center gap-1 transition-colors shadow-xs"
                    >
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <span>{t('rateJob', lang)}</span>
                    </button>
                  )}

                  <button
                    onClick={() => setSelectedJobForComplaint(job)}
                    className="text-xs text-slate-400 hover:text-rose-600 transition-colors flex items-center gap-1 px-2 py-1"
                  >
                    <ShieldAlert className="w-3.5 h-3.5" />
                    <span>Report Issue</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Rating Modal */}
      {selectedJobForRating && (
        <RateServiceModal
          job={selectedJobForRating}
          onClose={() => setSelectedJobForRating(null)}
        />
      )}

      {/* Complaint Modal */}
      {selectedJobForComplaint && (
        <ComplaintModal
          job={selectedJobForComplaint}
          onClose={() => setSelectedJobForComplaint(null)}
        />
      )}
    </div>
  );
};
