import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  X,
  Phone,
  ShieldAlert,
  Flame,
  Ambulance,
  PhoneCall,
  Shield,
  MessageCircle,
  ExternalLink,
  Volume2
} from 'lucide-react';
import { speakUrduOrEnglish } from '../../utils/audioAssistant';

interface EmergencyHelplineModalProps {
  onClose: () => void;
}

export const EmergencyHelplineModal: React.FC<EmergencyHelplineModalProps> = ({ onClose }) => {
  const { lang, settings } = useApp();
  const adminPhone = settings.adminJazzCashNumber || '+923084306705';
  const adminName = settings.adminName || 'Zishan Hashmi (App Owner & Super Admin)';

  const emergencyServices = [
    {
      id: 'rescue1122',
      titleEn: 'Rescue 1122 (Ambulance & Medical Emergency)',
      titleUr: 'ریسکیو 1122 (ایمبولینس اور فوری طبی امداد)',
      number: '1122',
      callUrl: 'tel:1122',
      badge: '24/7 Free Emergency',
      icon: Ambulance,
      color: 'bg-emerald-600 text-white',
      border: 'border-emerald-200 bg-emerald-50/50',
      descEn: 'Government emergency ambulance service, medical paramedics, and trauma care response across Punjab.',
      descUr: 'حکومتی ایمرجنسی ایمبولینس سروس، حادثات و فوری طبی امداد برائے پنجاب و پاکستان۔'
    },
    {
      id: 'police15',
      titleEn: 'Police Emergency Assistance (Madadgar 15)',
      titleUr: 'پولیس ایمرجنسی مددگار 15 (حفاظت و سیکیورٹی)',
      number: '15',
      callUrl: 'tel:15',
      badge: 'Immediate Police Dispatch',
      icon: ShieldAlert,
      color: 'bg-blue-600 text-white',
      border: 'border-blue-200 bg-blue-50/50',
      descEn: 'Punjab Police Helpline 15 for crime reporting, robbery, home safety, and emergency law enforcement.',
      descUr: 'پنجاب پولیس فوری مدد، چوری ڈکیتی کی روک تھام اور گھریلو تحفظ کے لیے فوری ہیلپ لائن۔'
    },
    {
      id: 'fire16',
      titleEn: 'Fire Brigade (آگ بجھانے والا ادارہ / فائر اینڈ ریسکیو)',
      titleUr: 'فائر بریگیڈ (آگ بجھانے والا محکمہ و ریسکیو)',
      number: '16',
      altNumber: '1122',
      callUrl: 'tel:16',
      badge: 'Fire & Rescue Service',
      icon: Flame,
      color: 'bg-rose-600 text-white',
      border: 'border-rose-200 bg-rose-50/50',
      descEn: 'Emergency fire brigade response for short-circuit house fires, gas explosions, and building collapse rescue.',
      descUr: 'شارٹ سرکٹ سے لگنے والی آگ، گیس سلنڈر اور عمارتوں کے حادثات میں آگ بجھانے والا ادارہ۔'
    },
    {
      id: 'ownerHelpline',
      titleEn: 'KaamConnect Official Helpline & Safety Admin',
      titleUr: 'کام کنیکٹ آفیشل ایڈمن و اونر ہیلپ لائن',
      number: adminPhone,
      displayNumber: '0308-4306705',
      callUrl: `tel:${adminPhone}`,
      whatsappUrl: `https://wa.me/923084306705`,
      badge: 'Owner Direct Line',
      icon: Shield,
      color: 'bg-amber-500 text-slate-950',
      border: 'border-amber-300 bg-amber-50/70',
      descEn: `Direct official support managed by ${adminName}. For worker disputes, payment safety, and direct owner assistance.`,
      descUr: `ذیشان ہاشمی (ایڈمن و اونر) کا آفیشل نمبر: کاریگر تنازعہ، ادائیگی کی تصدیق اور تحفظ کے لیے 24 گھنٹے دستیاب۔`
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl max-w-xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-200 flex flex-col">
        {/* Header */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-red-600 via-rose-600 to-amber-600 text-white flex items-center justify-between rounded-t-3xl relative overflow-hidden">
          <div className="relative z-10 flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30 shadow-inner">
              <ShieldAlert className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-wider bg-white/20 px-2 py-0.5 rounded-full">
                  {lang === 'ur' ? 'ایمرجنسی و فوری رابطہ' : 'Emergency Assistance'}
                </span>
                <button
                  type="button"
                  onClick={() =>
                    speakUrduOrEnglish(
                      'ایمرجنسی سروسز: طبی امداد کے لیے گیارہ بائیس، پولیس کے لیے پندرہ، آگ بجھانے کے لیے سولہ، اور کام کنیکٹ ایڈمن کے لیے صفر تین صفر آٹھ چار تین صفر چھ سات صفر پانچ پر کال کریں۔',
                      'ur'
                    )
                  }
                  title="بول کر سنیں"
                  className="p-1 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                >
                  <Volume2 className="w-3.5 h-3.5 text-white" />
                </button>
              </div>
              <h2 className="text-lg sm:text-xl font-black text-white mt-0.5">
                {lang === 'ur' ? 'قومی ایمرجنسی ہیلپ لائنز و ایڈمن سپورٹ' : 'National Emergency Hotlines & Support'}
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-colors relative z-10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 space-y-4">
          <p className="text-xs text-slate-600">
            {lang === 'ur'
              ? 'کسی بھی ہنگامی صورتحال (طبی ایمرجنسی، آگ لگنا، حادثہ، یا پولیس مدد) میں نیچے دیے گئے نمبرز پر ایک کلک سے کال کریں۔'
              : 'In case of an urgent emergency (medical trauma, fire breakout, electrical accident, or police assistance), tap any button to dial immediately.'}
          </p>

          <div className="space-y-3">
            {emergencyServices.map((srv) => {
              const Icon = srv.icon;
              return (
                <div
                  key={srv.id}
                  className={`p-4 rounded-2xl border ${srv.border} flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xs hover:shadow-md transition-shadow`}
                >
                  <div className="flex items-start gap-3.5 flex-1">
                    <div className={`w-11 h-11 rounded-xl ${srv.color} flex items-center justify-center shrink-0 shadow-sm mt-0.5`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="text-xs sm:text-sm font-bold text-slate-900">
                          {lang === 'ur' ? srv.titleUr : srv.titleEn}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 line-clamp-2">
                        {lang === 'ur' ? srv.descUr : srv.descEn}
                      </p>
                      <div className="text-xs font-mono font-bold text-slate-700">
                        Dial: <span className="text-emerald-700 text-sm font-black">{srv.displayNumber || srv.number}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 w-full sm:w-auto justify-end pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-200">
                    <a
                      href={srv.callUrl}
                      className="min-h-[42px] px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold shadow-sm flex items-center justify-center gap-1.5 transition-transform active:scale-95 flex-1 sm:flex-initial"
                    >
                      <PhoneCall className="w-4 h-4" />
                      <span>{lang === 'ur' ? 'کال کریں' : 'Call'} {srv.number}</span>
                    </a>

                    {srv.whatsappUrl && (
                      <a
                        href={srv.whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="min-h-[42px] px-3.5 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-xs font-bold shadow-sm flex items-center justify-center gap-1.5 transition-transform active:scale-95"
                      >
                        <MessageCircle className="w-4 h-4" />
                        <span>WhatsApp</span>
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Admin Statement */}
          <div className="p-4 bg-slate-900 text-white rounded-2xl flex items-center justify-between gap-3 text-xs">
            <div className="space-y-0.5">
              <span className="font-bold text-amber-300 block">
                {settings.adminName || 'Zishan Hashmi (App Owner & Super Admin)'}
              </span>
              <span className="text-slate-300 text-[11px]">
                {lang === 'ur'
                  ? 'کام کنیکٹ پاکستان کے تمام صارفین اور کاریگروں کے جان و مال کا تحفظ ہماری اولین ترجیح ہے۔'
                  : 'Platform governance & immediate security resolution available 24/7.'}
              </span>
            </div>
            <a
              href={`tel:${adminPhone}`}
              className="px-3.5 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold rounded-xl text-xs shrink-0 flex items-center gap-1"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>0308-4306705</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
