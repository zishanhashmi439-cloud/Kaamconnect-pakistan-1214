import React, { useState } from 'react';
import { APIProvider, Map, AdvancedMarker, Pin } from '@vis.gl/react-google-maps';
import { JobRequest } from '../../types';
import { useApp } from '../../context/AppContext';
import {
  X,
  MapPin,
  Navigation,
  Phone,
  MessageCircle,
  Clock,
  HardHat,
  Home,
  ShieldCheck,
  Lock,
  ExternalLink,
  Volume2
} from 'lucide-react';
import { speakUrduOrEnglish } from '../../utils/audioAssistant';

interface LiveJobMapModalProps {
  job: JobRequest;
  onClose: () => void;
}

export const LiveJobMapModal: React.FC<LiveJobMapModalProps> = ({ job, onClose }) => {
  const { lang, settings } = useApp();
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || 'AIzaSyD0j54JQxRjRttwi0vOLjDdzriKwMWDPoY';

  // Default coordinates (Lahore base if not set)
  const customerPos = job.customerCoordinates || { lat: 31.4697, lng: 74.2728 }; // Johar Town
  const workerPos = job.workerLiveCoordinates || {
    lat: customerPos.lat + 0.008,
    lng: customerPos.lng + 0.009
  };

  const centerPos = {
    lat: (customerPos.lat + workerPos.lat) / 2,
    lng: (customerPos.lng + workerPos.lng) / 2
  };

  const isUnlocked = Boolean(job.phoneUnlocked || job.status === 'accepted' || job.status === 'in_progress' || job.status === 'completed');

  const mapsDirectionUrl = `https://www.google.com/maps/dir/?api=1&origin=${workerPos.lat},${workerPos.lng}&destination=${customerPos.lat},${customerPos.lng}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[95vh] overflow-hidden shadow-2xl border border-slate-200 flex flex-col">
        {/* Modal Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-400">
              <Navigation className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-wider bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-500/30">
                  {lang === 'ur' ? 'لائیو نقشہ اور آن لائن لوکیشن' : 'Live GPS Location'}
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              </div>
              <h2 className="text-base sm:text-lg font-bold text-white leading-snug">
                {lang === 'ur' ? 'کاریگر اور کسٹمر کی آن لائن لوکیشن' : 'Live Online Tracking & Site Directions'}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() =>
                speakUrduOrEnglish(
                  `لائیو نقشہ فعال ہے۔ کاریگر کی دوری دو اعشاریہ تین کلومیٹر ہے۔ پہنچنے کا متوقع وقت دس منٹ ہے۔`,
                  'ur'
                )
              }
              title="آواز سنیں"
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <Volume2 className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Live Trip Status Strip */}
        <div className="bg-emerald-50 border-b border-emerald-200/80 px-4 py-2.5 flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-3">
            <span className="font-semibold text-emerald-900 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-emerald-700" />
              <span>{lang === 'ur' ? 'پہنچنے کا متوقع وقت: 10 منٹ' : 'Est. Arrival: ~10-12 mins'}</span>
            </span>
            <span className="text-slate-300">·</span>
            <span className="font-mono font-bold text-emerald-800">2.1 km distance</span>
          </div>

          <a
            href={mapsDirectionUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] font-bold text-emerald-800 hover:text-emerald-950 flex items-center gap-1 underline underline-offset-2"
          >
            <span>{lang === 'ur' ? 'گوگل میپس میں کھولیں' : 'Open in Google Maps'}</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        {/* Interactive Map Viewport */}
        <div className="relative w-full h-80 sm:h-96 bg-slate-100 overflow-hidden">
          <APIProvider apiKey={apiKey} libraries={['marker']}>
            <Map
              mapId="DEMO_MAP_ID"
              defaultCenter={centerPos}
              defaultZoom={13}
              gestureHandling="greedy"
              disableDefaultUI={false}
              className="w-full h-full"
              internalUsageAttributionIds={['gmp_mcp_codeassist_v1_aistudio']}
            >
              {/* Customer Home Pin */}
              <AdvancedMarker position={customerPos} title={job.customerName}>
                <div className="relative flex flex-col items-center">
                  <div className="px-2 py-1 rounded-lg bg-slate-900 text-white text-[10px] font-bold shadow-md whitespace-nowrap mb-1">
                    🏠 {job.customerArea || 'Customer Site'}
                  </div>
                  <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center border-2 border-white shadow-lg">
                    <Home className="w-4 h-4" />
                  </div>
                </div>
              </AdvancedMarker>

              {/* Worker Live Location Pin */}
              <AdvancedMarker position={workerPos} title={job.selectedWorkerName || 'Worker Partner'}>
                <div className="relative flex flex-col items-center animate-bounce">
                  <div className="px-2 py-1 rounded-lg bg-emerald-700 text-white text-[10px] font-bold shadow-md whitespace-nowrap mb-1 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse" />
                    <span>{job.selectedWorkerName || 'Worker En Route'}</span>
                  </div>
                  <div className="w-9 h-9 rounded-full bg-emerald-600 text-white flex items-center justify-center border-2 border-white shadow-xl ring-4 ring-emerald-400/30">
                    <HardHat className="w-5 h-5" />
                  </div>
                </div>
              </AdvancedMarker>
            </Map>
          </APIProvider>

          {/* Floating Map Overlay Pill */}
          <div className="absolute bottom-3 left-3 right-3 sm:right-auto bg-white/95 backdrop-blur-md p-3 rounded-2xl border border-slate-200/80 shadow-lg text-xs space-y-1 z-10 max-w-sm">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-bold text-slate-900">
                {job.selectedWorkerName || 'Assigned Technician'}
              </span>
              <span className="text-[10px] text-emerald-800 bg-emerald-100 font-semibold px-2 py-0.5 rounded-full">
                Online & Moving
              </span>
            </div>
            <p className="text-[11px] text-slate-500 truncate">
              📍 Destination: {job.addressDetails || `${job.customerArea}, ${job.customerCity}`}
            </p>
          </div>
        </div>

        {/* Contact and Phone Number Privacy Status Footer */}
        <div className="p-4 sm:p-5 bg-white border-t border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              {isUnlocked ? (
                <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-md flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  {lang === 'ur' ? 'موبائل نمبر ان لاک (10% فیس تصدیق شدہ)' : 'Direct Phone Unlocked (10% Fee Paid)'}
                </span>
              ) : (
                <span className="text-[11px] font-bold text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded-md flex items-center gap-1">
                  <Lock className="w-3.5 h-3.5 text-amber-600" />
                  {lang === 'ur' ? 'نمبر لاک ہے (بکنگ پر کھلے گا)' : 'Phone Locked Until 10% Fee Confirmed'}
                </span>
              )}
            </div>

            <div className="text-xs text-slate-700 font-medium">
              {isUnlocked ? (
                <div className="flex flex-wrap items-center gap-3">
                  <span>Worker Phone: <strong className="font-mono text-emerald-800 font-bold">{job.selectedWorkerPhone || '0301-4452198'}</strong></span>
                  <span>·</span>
                  <span>Customer Phone: <strong className="font-mono text-slate-900 font-bold">{job.customerPhone}</strong></span>
                </div>
              ) : (
                <p className="text-[11px] text-slate-500">
                  {lang === 'ur'
                    ? 'دونوں فریقین کی رضامندی اور 10 فیصد فیس کے بعد نمبر ظاہر ہو چکے ہیں۔'
                    : 'Numbers are revealed once the quote is accepted and 10% fee is processed.'}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            {isUnlocked ? (
              <>
                <a
                  href={`tel:${job.selectedWorkerPhone || '+923084306705'}`}
                  className="min-h-[42px] px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold shadow-md flex items-center justify-center gap-1.5 transition-transform active:scale-95 flex-1 sm:flex-initial"
                >
                  <Phone className="w-4 h-4" />
                  <span>{lang === 'ur' ? 'کال کریں' : 'Call Worker'}</span>
                </a>

                <a
                  href={`https://wa.me/${(job.selectedWorkerPhone || '+923084306705').replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-[42px] px-3.5 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-xs font-bold shadow-md flex items-center justify-center gap-1.5 transition-transform active:scale-95"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp</span>
                </a>
              </>
            ) : (
              <button
                onClick={onClose}
                className="min-h-[42px] px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold shadow-md"
              >
                {lang === 'ur' ? 'بند کریں' : 'Close Map'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
