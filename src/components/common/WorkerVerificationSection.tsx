import React from 'react';
import { WorkerProfile, VerificationCheck } from '../../types';
import { useApp } from '../../context/AppContext';
import {
  ShieldCheck,
  CheckCircle2,
  Clock,
  AlertCircle,
  FileText,
  Building,
  UserCheck,
  Award,
  ChevronDown,
  Info
} from 'lucide-react';

interface WorkerVerificationSectionProps {
  worker: WorkerProfile;
  isOwner?: boolean;
  onApplyVerification?: () => void;
}

export const WorkerVerificationSection: React.FC<WorkerVerificationSectionProps> = ({
  worker,
  isOwner = false,
  onApplyVerification
}) => {
  const { lang } = useApp();
  const [expanded, setExpanded] = React.useState(true);

  // Default standard checks if worker is verified and custom checks are not yet attached
  const defaultChecks: VerificationCheck[] = [
    {
      id: 'check_nadra',
      titleEn: 'NADRA CNIC Identity Verification',
      titleUr: 'نادرا شناختی کارڈ بائیو میٹرک تصدیق',
      status: 'passed',
      documentNameEn: 'Computerized National Identity Card (CNIC)',
      documentNameUr: 'کمپیوٹرائزڈ قومی شناختی کارڈ',
      completedDate: worker.verificationDate || '2026-09-15',
      authorityEn: 'NADRA Citizen Registry System',
      authorityUr: 'نادرا پاکستان ڈیٹا بیس',
      summaryEn: 'National identity, biometric verification, and legal residency confirmed in Lahore.',
      summaryUr: 'قومی شناختی کارڈ، بائیو میٹرک انگوٹھے کے نشانات اور قانونی رہائش کی مکمل جانچ پڑتال مکمل ہے۔'
    },
    {
      id: 'check_police',
      titleEn: 'Police Character Clearance Certificate',
      titleUr: 'پولیس کریکٹر کلیئرنس سرٹیفکیٹ',
      status: 'passed',
      documentNameEn: 'Punjab Police Khidmat Markaz (PKM) Clearance',
      documentNameUr: 'پنجاب پولیس خدمت مرکز کریکٹر سرٹیفکیٹ',
      completedDate: worker.verificationDate || '2026-09-18',
      authorityEn: 'Punjab Police Department (Lahore Division)',
      authorityUr: 'پنجاب پولیس لاہور ڈویژن',
      summaryEn: 'Clean criminal record check with no pending litigation or security infractions on file.',
      summaryUr: 'کوئی مجرمانہ ریکارڈ یا عدالتی تنازعہ نہیں پایا گیا، پولیس خدمت مرکز سے باقاعدہ کلیئرنس حاصل ہے۔'
    },
    {
      id: 'check_trade',
      titleEn: 'Trade Competency & Tool Assessment',
      titleUr: 'تکنیکی مہارت اور اوزاروں کا معائنہ',
      status: 'passed',
      documentNameEn: 'KaamConnect Technical Trade Review',
      documentNameUr: 'کام کنیکٹ ٹیکنیکل ٹریڈ ایویلوایشن',
      completedDate: worker.verificationDate || '2026-09-22',
      authorityEn: 'KaamConnect Master Craftsman Committee',
      authorityUr: 'کام کنیکٹ کاریگر نگران کمیٹی',
      summaryEn: `Field evaluation of on-site craft, safety standards, and ${worker.experienceYears}+ years of trade expertise.`,
      summaryUr: `موقع پر کام کی مہارت، حفاظتی اصولوں اور ${worker.experienceYears} سالہ تجربے کا باقاعدہ فیلڈ معائنہ مکمل۔`
    },
    {
      id: 'check_address',
      titleEn: 'Physical Address & Workshop Inspection',
      titleUr: 'رہائشی پتہ اور ورکشاپ فزیکل معائنہ',
      status: 'passed',
      documentNameEn: 'On-site Field Verification Slip',
      documentNameUr: 'فیلڈ آفیسر سائٹ رپورٹ',
      completedDate: worker.verificationDate || '2026-09-25',
      authorityEn: 'KaamConnect Lahore Field Operations',
      authorityUr: 'کام کنیکٹ فیلڈ آپریشنز لاہور',
      summaryEn: `Physical physical inspection of home and workshop in ${worker.city} confirmed by field officer.`,
      summaryUr: `لاہور میں کاریگر کی رہائش گاہ اور ورکشاپ کا موقع پر معائنہ مکمل اور مصدقہ پایا گیا۔`
    }
  ];

  const checksToDisplay = worker.verificationChecks && worker.verificationChecks.length > 0
    ? worker.verificationChecks
    : (worker.verified ? defaultChecks : []);

  return (
    <div className="border border-slate-200/90 rounded-2xl bg-white overflow-hidden shadow-xs">
      {/* Section Header */}
      <div className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 bg-slate-50/60">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
            worker.verified
              ? 'bg-emerald-100 text-emerald-700'
              : worker.verificationStatus === 'pending'
              ? 'bg-amber-100 text-amber-700'
              : 'bg-slate-100 text-slate-600'
          }`}>
            <ShieldCheck className="w-5 h-5" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-slate-900">
                {lang === 'ur' ? 'کاریگر کی سرکاری و پلیٹ فارم تصدیق' : 'Official Verification & Background Checks'}
              </h3>
            </div>
            <p className="text-xs text-slate-500">
              {lang === 'ur'
                ? 'نادرا بائیو میٹرک، پولیس ریکارڈ، اور کاریگری کی تسلی'
                : 'Multi-tier verification for homeowner security & peace of mind'}
            </p>
          </div>
        </div>

        {/* Status Badge */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          {worker.verified ? (
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>{lang === 'ur' ? 'مصدقہ کاریگر (100% تصدیق شدہ)' : 'Verified Professional · 4/4 Checks Passed'}</span>
            </div>
          ) : worker.verificationStatus === 'pending' ? (
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-50 text-amber-800 border border-amber-200 text-xs font-semibold">
              <Clock className="w-4 h-4 text-amber-600" />
              <span>{lang === 'ur' ? 'تصدیق زیر التواء ہے' : 'Verification Under Review'}</span>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 border border-slate-200 text-xs font-semibold">
              <AlertCircle className="w-4 h-4 text-slate-500" />
              <span>{lang === 'ur' ? 'غیر تصدیق شدہ پروفائل' : 'Unverified Profile'}</span>
            </div>
          )}
        </div>
      </div>

      {/* Verification Content Body */}
      <div className="p-4 sm:p-5 space-y-4">
        {worker.verified ? (
          <>
            {/* Trust Statement Banner */}
            <div className="p-3.5 bg-emerald-50/70 border border-emerald-100 rounded-xl text-xs text-emerald-900 flex items-start gap-2.5">
              <Info className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold block mb-0.5">
                  {lang === 'ur' ? 'مکمل جانچ پڑتال کا خلاصہ' : 'Verified Documentation Summary'}
                </span>
                <span>
                  {lang === 'ur'
                    ? `${worker.name} نے کام کنیکٹ لاہور کے تمام بنیادی سیکیورٹی، قانونی، اور ٹیکنیکل مراحل پاس کر لیے ہیں۔ شناختی کارڈ ${worker.cnicNumber ? worker.cnicNumber.slice(0, 5) + '*****' : ''} کی نادرا سے مکمل توثیق موجود ہے۔`
                    : `${worker.name} has successfully completed KaamConnect's strict 4-step identity, legal background, and field craft verification protocol in Lahore.`}
                </span>
              </div>
            </div>

            {/* Detailed Checks Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
              {checksToDisplay.map((check) => (
                <div
                  key={check.id}
                  className="p-3.5 rounded-xl border border-slate-200/90 bg-white space-y-2 flex flex-col justify-between"
                >
                  <div className="space-y-1">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>{lang === 'ur' ? check.titleUr : check.titleEn}</span>
                      </div>
                      <span className="text-[10px] text-emerald-700 font-semibold bg-emerald-50 px-1.5 py-0.5 rounded">
                        PASSED
                      </span>
                    </div>

                    <p className="text-[11px] text-slate-600 leading-relaxed">
                      {lang === 'ur' ? check.summaryUr : check.summaryEn}
                    </p>
                  </div>

                  {/* Metadata line */}
                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400">
                    <span className="truncate">
                      {lang === 'ur' ? check.authorityUr : check.authorityEn}
                    </span>
                    {check.completedDate && (
                      <span className="font-mono shrink-0 ml-2">{check.completedDate}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* NADRA & Security Card Footnote */}
            <div className="flex flex-wrap items-center justify-between gap-2 pt-1 text-[11px] text-slate-500">
              <div className="flex items-center gap-2">
                <span className="font-medium text-slate-700">CNIC Record:</span>
                <span className="font-mono text-slate-900 bg-slate-100 px-2 py-0.5 rounded">
                  {worker.cnicNumber ? `${worker.cnicNumber.slice(0, 5)}-*******-${worker.cnicNumber.slice(-1)}` : 'NADRA Verified'}
                </span>
                <span className="text-slate-300">·</span>
                <span>Verified by KaamConnect Lahore Wing</span>
              </div>

              <div className="flex items-center gap-1 text-emerald-700 font-medium">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Homeowner Safety Guaranteed</span>
              </div>
            </div>
          </>
        ) : worker.verificationStatus === 'pending' ? (
          <div className="p-4 bg-amber-50/70 border border-amber-200 rounded-xl space-y-3">
            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <h4 className="text-xs font-bold text-amber-900">
                  {lang === 'ur' ? 'دستاویزات کی جانچ جاری ہے' : 'Documents Submitted & In Process'}
                </h4>
                <p className="text-xs text-amber-800 leading-relaxed">
                  {lang === 'ur'
                    ? 'کاریگر نے شناختی کارڈ نمبر اور سروس کے متعلقہ ثبوت جمع کروائے ہیں۔ ہماری ٹیم لاہور دفتر سے نادرا اور پولیس کلیئرنس کا جائزہ لے رہی ہے۔'
                    : 'The worker has submitted their NADRA CNIC credentials. The KaamConnect verification desk is performing criminal background verification and field address confirmation.'}
                </p>
              </div>
            </div>

            {/* Checklist Progress */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1 text-xs">
              <div className="p-2.5 bg-white rounded-lg border border-amber-200 flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span className="text-slate-700">CNIC Form Received</span>
              </div>
              <div className="p-2.5 bg-white rounded-lg border border-amber-200 flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                <span className="text-slate-700">Police Check in Queue</span>
              </div>
              <div className="p-2.5 bg-white rounded-lg border border-amber-200 flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                <span className="text-slate-700">Site Inspection Pending</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="space-y-1">
              <h4 className="text-xs font-bold text-slate-800">
                {lang === 'ur' ? 'تصدیقی بیج حاصل کریں' : 'Unverified Worker Profile'}
              </h4>
              <p className="text-xs text-slate-500">
                {lang === 'ur'
                  ? 'مصدقہ بیج حاصل کرنے کے لیے اپنا شناختی کارڈ اور پولیس کلیئرنس جمع کروائیں۔'
                  : 'Submit NADRA CNIC and Police clearance to unlock the green Verified Pro badge.'}
              </p>
            </div>

            {isOwner && onApplyVerification && (
              <button
                type="button"
                onClick={onApplyVerification}
                className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-semibold shrink-0 transition-colors"
              >
                {lang === 'ur' ? 'ابھی تصدیق کے لیے اپلائی کریں' : 'Apply for Verification'}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
