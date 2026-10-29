import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  X,
  Copy,
  Check,
  Smartphone,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  AlertCircle,
  Clock,
  PhoneCall
} from 'lucide-react';

interface JazzCashTopUpModalProps {
  onClose: () => void;
  defaultAmount?: number;
}

export const JazzCashTopUpModal: React.FC<JazzCashTopUpModalProps> = ({ onClose, defaultAmount = 1000 }) => {
  const { lang, role, settings, customerBalancePKR, workerBalancePKR, rechargeWallet } = useApp();

  const [amount, setAmount] = useState<number>(defaultAmount);
  const [tid, setTid] = useState('');
  const [senderNumber, setSenderNumber] = useState('');
  const [copied, setCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);

  const adminNumber = settings.adminJazzCashNumber || '+923084306705';
  const adminFormatted = '0308-4306705';
  const adminName = settings.adminName || 'Zishan Hashmi (App Owner / Admin)';

  const handleCopy = () => {
    navigator.clipboard.writeText('03084306705');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tid.trim() || tid.length < 8) {
      alert(lang === 'ur' ? 'براہ کرم صحیح 12 ہندسوں کی جاز کیش TID درج کریں۔' : 'Please enter a valid 12-digit JazzCash Transaction ID (TID).');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      rechargeWallet({
        userRole: role,
        amountPKR: Number(amount),
        jazzcashTID: tid.trim(),
        senderNumber: senderNumber || '03XX-XXXXXXX'
      });
      setIsSubmitting(false);
      setSuccessMessage(true);
      setTimeout(() => {
        onClose();
      }, 1500);
    }, 600);
  };

  const quickAmounts = [300, 500, 1000, 2000, 5000];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-200 flex flex-col">
        {/* Top Header with JazzCash Branding */}
        <div className="sticky top-0 z-10 bg-gradient-to-r from-red-600 via-rose-700 to-amber-700 text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center font-black text-xl shadow-inner border border-white/30">
              JC
            </div>
            <div>
              <h3 className="text-base font-bold leading-tight">
                {lang === 'ur' ? 'جاز کیش بیلنس لوڈ کریں' : 'JazzCash Wallet Recharge'}
              </h3>
              <span className="text-[11px] text-amber-200 font-medium">
                {lang === 'ur' ? 'ایڈمن کو فیس اور بیلنس ادائیگی' : 'Official KaamConnect Payment Gateway'}
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        {successMessage ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-3xl flex items-center justify-center mx-auto shadow-sm">
              <Check className="w-8 h-8 stroke-[3]" />
            </div>
            <h4 className="text-lg font-bold text-slate-900">
              {lang === 'ur' ? 'بیلنس کامیابی سے والٹ میں جمع ہو گیا!' : 'Balance Loaded Successfully!'}
            </h4>
            <p className="text-xs text-slate-600 max-w-xs mx-auto">
              {lang === 'ur'
                ? `آپ کے والٹ میں روپے ${amount.toLocaleString()} کا بیلنس شامل کر دیا گیا ہے۔ ایڈمن جاز کیش (${adminFormatted}) پر تصدیق ہو گئی ہے۔`
                : `PKR ${amount.toLocaleString()} has been credited to your KaamConnect Wallet. Linked to Admin JazzCash (${adminFormatted}).`}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-5">
            {/* Visual Owner JazzCash Account Details Card */}
            <div className="bg-gradient-to-br from-red-50 to-amber-50 rounded-2xl p-4 border border-red-200/80 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] uppercase tracking-wider font-bold text-red-900 flex items-center gap-1.5">
                  <Smartphone className="w-3.5 h-3.5 text-red-700" />
                  {lang === 'ur' ? 'ایڈمن / اونر کا جاز کیش اکاؤنٹ' : 'Owner / Admin JazzCash Account'}
                </span>
                <span className="text-[10px] font-semibold bg-emerald-600 text-white px-2 py-0.5 rounded-full">
                  Verified Official
                </span>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-3.5 rounded-xl border border-red-100 shadow-xs">
                <div>
                  <span className="text-[11px] text-slate-500 block">Account Title / Owner:</span>
                  <span className="text-sm font-extrabold text-slate-900 block">{adminName}</span>
                  <span className="text-xs font-mono font-bold text-red-600 block mt-0.5">{adminFormatted}</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleCopy}
                    className="min-h-[40px] px-3.5 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors shadow-xs"
                  >
                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    <span>{copied ? 'Copied!' : 'Copy Number'}</span>
                  </button>
                  <a
                    href="tel:*786#"
                    className="min-h-[40px] px-3 py-2 bg-amber-100 hover:bg-amber-200 text-amber-900 rounded-xl text-xs font-semibold flex items-center gap-1"
                    title="Dial *786#"
                  >
                    <span>*786#</span>
                  </a>
                </div>
              </div>

              {/* 10% Commission Notice */}
              <div className="text-[11px] text-slate-600 leading-relaxed bg-white/60 p-2.5 rounded-lg border border-red-100/60">
                <span className="font-bold text-red-800 block mb-0.5">
                  {lang === 'ur' ? '10 فیصد سروس فیس و کمیشن پالیسی:' : '10% Platform Commission Policy:'}
                </span>
                {lang === 'ur'
                  ? 'کام کروانے والے اور کام کرنے والے، دونوں اس ایپ کو استعمال کرنے کے لیے والٹ میں بیلنس رکھیں۔ ہر مکمل کام پر 10% کمیشن کٹوتی ہو کر ایڈمن کے جاز کیش میں جمع ہو گی۔'
                  : 'Both customers and workers maintain wallet balance to book/accept jobs. A 10% commission is deducted per completed job and credited directly to the Owner JazzCash account.'}
              </div>
            </div>

            {/* Quick Amount Selectors */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-800">
                {lang === 'ur' ? 'کتنی رقم کا بیلنس کروانا چاہتے ہیں؟' : 'Select Recharge Amount (PKR)'}
              </label>
              <div className="grid grid-cols-5 gap-1.5">
                {quickAmounts.map((q) => (
                  <button
                    key={q}
                    type="button"
                    onClick={() => setAmount(q)}
                    className={`min-h-[40px] py-2 text-xs font-bold rounded-xl border transition-all ${
                      amount === q
                        ? 'bg-red-600 text-white border-red-600 shadow-sm'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    Rs.{q}
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Amount Input */}
            <div>
              <span className="text-[11px] text-slate-500 block mb-1">
                {lang === 'ur' ? 'یا اپنی مرضی کی رقم درج کریں:' : 'Or Enter Custom Amount:'}
              </span>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-xs font-bold text-slate-400">Rs.</span>
                <input
                  type="number"
                  min={100}
                  step={50}
                  required
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className="w-full text-sm font-bold text-slate-900 bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-3 py-2.5 focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
            </div>

            {/* Step-by-Step Guidance */}
            <div className="bg-slate-50 rounded-xl p-3 border border-slate-200 text-xs text-slate-700 space-y-1.5">
              <span className="font-bold text-slate-900 block">
                {lang === 'ur' ? 'آسان 3 طریقے سے بیلنس لوڈ کریں:' : '3 Simple Steps to Load Balance:'}
              </span>
              <p>1. {lang === 'ur' ? 'اپنے جاز کیش اکاؤنٹ سے 0308-4306705 پر پیسے بھیجیں' : 'Send chosen amount to JazzCash 0308-4306705 (Zishan Hashmi)'}</p>
              <p>2. {lang === 'ur' ? 'میسج میں آنے والی 12 ہندسوں کی TID یہاں درج کریں' : 'Note down the 12-digit TID from 8558 SMS'}</p>
              <p>3. {lang === 'ur' ? 'نیچے بٹن دبائیں اور فوری بیلنس پائیں' : 'Enter details below and submit for instant wallet credit'}</p>
            </div>

            {/* Transaction ID & Sender Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  {lang === 'ur' ? 'جاز کیش TID نمبر (12 ہندسے)' : 'JazzCash TID (Transaction ID)'}
                </label>
                <input
                  type="text"
                  required
                  value={tid}
                  onChange={(e) => setTid(e.target.value)}
                  placeholder="e.g. 248910283741"
                  className="w-full text-xs font-mono font-bold text-slate-900 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  {lang === 'ur' ? 'آپ کا موبائل نمبر جس سے پیسے بھیجے' : 'Your JazzCash Mobile Number'}
                </label>
                <input
                  type="text"
                  value={senderNumber}
                  onChange={(e) => setSenderNumber(e.target.value)}
                  placeholder="0300-1234567"
                  className="w-full text-xs font-mono text-slate-900 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full min-h-[48px] py-3 px-5 bg-gradient-to-r from-red-600 via-rose-700 to-amber-700 hover:opacity-95 text-white font-extrabold text-sm rounded-xl flex items-center justify-center gap-2 shadow-md transition-all active:scale-[0.99] disabled:opacity-50"
            >
              {isSubmitting ? (
                <span>{lang === 'ur' ? 'جاز کیش ویریفائی ہو رہا ہے...' : 'Verifying JazzCash TID...'}</span>
              ) : (
                <>
                  <Check className="w-5 h-5 stroke-[2.5]" />
                  <span>
                    {lang === 'ur'
                      ? `روپے ${amount.toLocaleString()} کا بیلنس والٹ میں شامل کریں`
                      : `Credit PKR ${amount.toLocaleString()} to Wallet`}
                  </span>
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
