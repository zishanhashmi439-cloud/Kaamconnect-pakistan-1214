import React, { useState } from 'react';
import { JobRequest } from '../../types';
import { useApp } from '../../context/AppContext';
import { X, AlertCircle, CheckCircle2 } from 'lucide-react';

interface ComplaintModalProps {
  job: JobRequest;
  onClose: () => void;
}

export const ComplaintModal: React.FC<ComplaintModalProps> = ({ job, onClose }) => {
  const { lang, submitComplaint } = useApp();
  const [issueType, setIssueType] = useState('Poor Workmanship');
  const [description, setDescription] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitComplaint({
      bookingId: job.id,
      customerName: job.customerName,
      workerName: job.selectedWorkerName || 'Contractor',
      issueType,
      description
    });
    setSubmitted(true);
    setTimeout(() => {
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-slate-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2 text-rose-700">
            <AlertCircle className="w-4 h-4" />
            <h2 className="text-sm font-bold">Report Worker / File Dispute</h2>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="p-8 text-center space-y-3">
            <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
            <h3 className="text-base font-bold text-slate-900">Complaint Logged</h3>
            <p className="text-xs text-slate-500">
              The KaamConnect Lahore Support Admin has received your report for ticket #{job.id}. We will investigate within 2 hours.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Issue Category</label>
              <select
                value={issueType}
                onChange={(e) => setIssueType(e.target.value)}
                className="w-full text-xs text-slate-800 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5"
              >
                <option>Poor Workmanship / Substandard Work</option>
                <option>No-Show / Unannounced Delay</option>
                <option>Overcharging / Demanding Cash Beyond Quote</option>
                <option>Unprofessional Behavior</option>
                <option>Property Damage</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Description of Issue</label>
              <textarea
                required
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Explain what happened and what resolution you require..."
                className="w-full text-xs text-slate-800 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-500"
              />
            </div>

            <p className="text-[11px] text-slate-500">
              Our admin review committee will review and may mediate a partial refund or worker suspension.
            </p>

            <button
              type="submit"
              className="w-full min-h-[44px] py-2.5 px-4 bg-rose-700 hover:bg-rose-800 text-white rounded-xl text-xs font-semibold transition-colors shadow-sm"
            >
              Submit Formal Complaint
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
