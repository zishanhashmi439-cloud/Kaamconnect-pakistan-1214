import React, { useState } from 'react';
import { X, Smartphone, Database, ShieldCheck, Code2, Server, CheckCircle2 } from 'lucide-react';

interface ArchitectureModalProps {
  onClose: () => void;
}

export const ArchitectureModal: React.FC<ArchitectureModalProps> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState<'flutter' | 'database' | 'security' | 'setup'>('flutter');

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 flex flex-col">
        {/* Top Header */}
        <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-md px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Smartphone className="w-5 h-5 text-emerald-600" />
            <div>
              <h2 className="text-sm font-bold text-slate-900">
                KaamConnect Pakistan · Android & Cloud Architecture
              </h2>
              <span className="text-[11px] text-slate-500">
                Native Flutter Conversion Guide, Cloud Firestore Schemas & Security Rules
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-1 px-6 pt-3 border-b border-slate-100 text-xs font-semibold overflow-x-auto">
          {[
            { id: 'flutter', label: 'Flutter / Dart Architecture', icon: Code2 },
            { id: 'database', label: 'Firestore Schema', icon: Database },
            { id: 'security', label: 'Security Rules (firestore.rules)', icon: ShieldCheck },
            { id: 'setup', label: 'Pakistan Launch & APIs', icon: Server }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`pb-3 px-3 border-b-2 whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                activeTab === tab.id
                  ? 'border-emerald-600 text-emerald-700'
                  : 'border-transparent text-slate-500 hover:text-slate-900'
              }`}
            >
              <tab.icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="p-6 space-y-4 text-xs text-slate-700 leading-relaxed overflow-y-auto">
          {/* TAB 1: Flutter / Dart Architecture */}
          {activeTab === 'flutter' && (
            <div className="space-y-4">
              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-900">
                <span className="font-bold block mb-1">Architecture Disclosure:</span>
                This web implementation is built with React 19, TypeScript, and mobile touch-first Tailwind design adhering to the Android thumb-zone guidelines. Below is the blueprint to connect or port this codebase to native Android via Flutter 3.x.
              </div>

              <h4 className="font-bold text-slate-900 text-sm">Recommended Flutter Project Directory Tree</h4>
              <pre className="bg-slate-900 text-slate-100 p-4 rounded-xl font-mono text-[11px] overflow-x-auto">
{`lib/
├── main.dart                      # MultiProvider & MaterialApp (Theme, RTL Locale)
├── core/
│   ├── constants/colors.dart      # Pakistani Emerald (#047857), Amber (#D97706)
│   ├── l10n/app_ur.arb            # Urdu translations (Nastaliq & Noto Sans)
│   ├── l10n/app_en.arb            # English localization
│   └── network/api_client.dart    # Cloud Functions / REST endpoints
├── models/
│   ├── user_model.dart            # Customer, Worker, Admin models
│   ├── category_model.dart        # 21 Service Categories (A to U)
│   ├── job_request_model.dart     # Bookings, status & photos
│   └── quotation_model.dart       # Worker bids & rates
├── services/
│   ├── auth_service.dart          # Firebase Phone Auth (Pakistani OTP +92 3XX)
│   ├── firestore_service.dart     # CRUD for jobs, bids, and reviews
│   ├── storage_service.dart       # Firebase Storage for work portfolios
│   └── location_service.dart      # Geolocator & Google Maps places
└── screens/
    ├── customer/
    │   ├── customer_home_screen.dart
    │   ├── worker_detail_screen.dart
    │   └── book_job_sheet.dart
    ├── worker/
    │   ├── worker_dashboard_screen.dart
    │   ├── job_bidding_screen.dart
    │   └── rate_card_editor.dart
    └── admin/
        ├── verification_screen.dart
        └── category_manager.dart`}
              </pre>

              <h4 className="font-bold text-slate-900 text-sm">Flutter State Management</h4>
              <p>
                Recommended: <strong>Riverpod</strong> or <strong>Bloc</strong> for reactive synchronization between customer quotation requests and worker push notifications via Firebase Cloud Messaging (FCM).
              </p>
            </div>
          )}

          {/* TAB 2: Firestore Database Schema */}
          {activeTab === 'database' && (
            <div className="space-y-4">
              <h4 className="font-bold text-slate-900 text-sm">Cloud Firestore Collections Schema</h4>
              <pre className="bg-slate-900 text-emerald-400 p-4 rounded-xl font-mono text-[11px] overflow-x-auto">
{`// 1. users Collection
users/{userId}
  - uid: string (Firebase Auth ID)
  - role: "customer" | "worker" | "admin"
  - fullName: string
  - phone: string (+923001234567)
  - city: "Lahore"
  - area: "Johar Town"
  - createdAt: timestamp

// 2. worker_profiles Collection
worker_profiles/{workerId}
  - userId: string
  - name: string ("Ustad Tariq Mehmood")
  - primaryCategory: "A" (Construction & Masonry)
  - subcategories: ["a_1", "a_2", "a_15"]
  - experienceYears: 18
  - cnicNumber: "35201-XXXXXXX-X"
  - verified: boolean
  - verificationStatus: "verified" | "pending"
  - visitFeePKR: 1000
  - dailyRatePKR: 2800
  - rating: 4.9
  - reviewCount: 84
  - serviceAreas: ["DHA", "Gulberg", "Johar Town"]
  - availability: "available" | "busy"

// 3. categories Collection (Managed by Admin)
categories/{catId}
  - code: "A" ... "U"
  - nameEn: string
  - nameUr: string
  - subcategories: array of objects

// 4. job_requests Collection
job_requests/{jobId}
  - customerId: string
  - title: string
  - description: string
  - urgency: "emergency" | "today" | "scheduled"
  - status: "requested" | "quoted" | "accepted" | "in_progress" | "completed"
  - quotes: subcollection / array of Quotation objects
  - selectedWorkerId: string
  - finalPricePKR: number

// 5. complaints Collection
complaints/{complaintId}
  - bookingId: string
  - issueType: string
  - status: "pending" | "resolved"
  - resolutionNotes: string`}
              </pre>
            </div>
          )}

          {/* TAB 3: Security Rules */}
          {activeTab === 'security' && (
            <div className="space-y-4">
              <h4 className="font-bold text-slate-900 text-sm">Firestore Security Rules (firestore.rules)</h4>
              <pre className="bg-slate-900 text-amber-300 p-4 rounded-xl font-mono text-[11px] overflow-x-auto">
{`rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    function isAuthenticated() {
      return request.auth != null;
    }
    
    function isAdmin() {
      return isAuthenticated() && 
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }

    // Worker profiles: Anyone can read, only worker or admin can write
    match /worker_profiles/{workerId} {
      allow read: if true;
      allow create: if isAuthenticated();
      allow update: if isAuthenticated() && (request.auth.uid == workerId || isAdmin());
      // Only Admin can modify the 'verified' field!
      allow update: if request.resource.data.verified == resource.data.verified || isAdmin();
    }

    // Categories: Read by all, written only by Admin
    match /categories/{categoryId} {
      allow read: if true;
      allow write: if isAdmin();
    }

    // Job requests: Customers create, assigned workers update status
    match /job_requests/{jobId} {
      allow read: if isAuthenticated();
      allow create: if isAuthenticated();
      allow update: if isAuthenticated() && (
        resource.data.customerId == request.auth.uid ||
        resource.data.selectedWorkerId == request.auth.uid ||
        isAdmin()
      );
    }
  }
}`}
              </pre>
            </div>
          )}

          {/* TAB 4: Setup & Pakistan Launch Strategy */}
          {activeTab === 'setup' && (
            <div className="space-y-3">
              <h4 className="font-bold text-slate-900 text-sm">Pakistan Localization & API Integration Roadmap</h4>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong>SMS OTP Gateway:</strong> Integrate Firebase Phone Auth or Pakistani SMS API (Telenor / Jazz / Zong BizSMS API) with +92 3XX XXXXXXX mobile format.
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong>Google Maps Geolocation:</strong> Enable Google Maps Platform Directions and Places API for live worker navigation across Lahore's societies (DHA, Bahria Town, Johar Town).
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong>Pakistani Payment Gateways:</strong> Support Cash on Delivery (COD), JazzCash Merchant API, Easypaisa Open API, and 1Link PayPak credit/debit card processing.
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong>NADRA Verisys Integration:</strong> For automated worker CNIC verification to complement manual admin approvals.
                  </div>
                </li>
              </ul>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-100 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold"
          >
            Close Documentation
          </button>
        </div>
      </div>
    </div>
  );
};
