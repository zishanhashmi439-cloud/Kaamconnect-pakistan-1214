import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  UserRole,
  Language,
  ServiceCategory,
  WorkerProfile,
  JobRequest,
  Quotation,
  CityData,
  PlatformSettings,
  Complaint,
  JobStatus,
  WalletTransaction
} from '../types';
import { INITIAL_CATEGORIES } from '../data/categoriesData';
import { INITIAL_CITIES, INITIAL_WORKERS, INITIAL_BOOKINGS, INITIAL_SETTINGS, INITIAL_COMPLAINTS } from '../data/mockData';

interface AppContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  lang: Language;
  setLang: (lang: Language) => void;
  selectedCity: string;
  setSelectedCity: (city: string) => void;
  selectedArea: string;
  setSelectedArea: (area: string) => void;
  
  categories: ServiceCategory[];
  workers: WorkerProfile[];
  bookings: JobRequest[];
  cities: CityData[];
  settings: PlatformSettings;
  complaints: Complaint[];
  
  activeWorkerId: string;
  setActiveWorkerId: (id: string) => void;

  // In-app Wallet & JazzCash Payment State
  customerBalancePKR: number;
  workerBalancePKR: number;
  adminJazzCashEarningsPKR: number;
  walletTransactions: WalletTransaction[];
  isJazzCashModalOpen: boolean;
  setIsJazzCashModalOpen: (open: boolean) => void;
  isEmergencyModalOpen: boolean;
  setIsEmergencyModalOpen: (open: boolean) => void;
  activeMapJob: JobRequest | null;
  setActiveMapJob: (job: JobRequest | null) => void;
  rechargeWallet: (params: {
    userRole: UserRole;
    amountPKR: number;
    jazzcashTID: string;
    senderNumber?: string;
  }) => void;
  deductCommission: (jobId: string, finalPricePKR: number) => number;

  // Actions
  createJobRequest: (job: Omit<JobRequest, 'id' | 'createdAt' | 'status' | 'quotes'>) => string;
  submitQuote: (jobId: string, quoteData: Omit<Quotation, 'id' | 'createdAt' | 'status'>) => void;
  acceptQuote: (jobId: string, quoteId: string) => void;
  updateJobStatus: (jobId: string, status: JobStatus, reason?: string) => void;
  rateJob: (jobId: string, rating: number, review: string) => void;
  
  // Worker profile actions
  updateWorkerProfile: (workerId: string, updates: Partial<WorkerProfile>) => void;
  registerWorker: (newWorker: Omit<WorkerProfile, 'id' | 'rating' | 'reviewCount' | 'completedJobsCount' | 'reviews'>) => void;
  
  // Admin actions
  verifyWorker: (workerId: string) => void;
  suspendWorker: (workerId: string) => void;
  addCategory: (category: Omit<ServiceCategory, 'id'>) => void;
  updateCategory: (id: string, updates: Partial<ServiceCategory>) => void;
  deleteCategory: (id: string) => void;
  addSubcategory: (categoryId: string, sub: any) => void;
  addCity: (city: Omit<CityData, 'id'>) => void;
  addAreaToCity: (cityId: string, areaName: string) => void;
  updateSettings: (newSettings: Partial<PlatformSettings>) => void;
  submitComplaint: (complaint: Omit<Complaint, 'id' | 'status' | 'createdAt'>) => void;
  resolveComplaint: (id: string, notes: string) => void;
  resetDemoData: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEYS = {
  ROLE: 'kaamconnect_role',
  LANG: 'kaamconnect_lang',
  CITY: 'kaamconnect_city',
  AREA: 'kaamconnect_area',
  CATEGORIES: 'kaamconnect_categories',
  WORKERS: 'kaamconnect_workers',
  BOOKINGS: 'kaamconnect_bookings',
  CITIES: 'kaamconnect_cities',
  SETTINGS: 'kaamconnect_settings',
  COMPLAINTS: 'kaamconnect_complaints'
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRoleState] = useState<UserRole>(() => {
    return (localStorage.getItem(STORAGE_KEYS.ROLE) as UserRole) || 'customer';
  });

  const [lang, setLangState] = useState<Language>(() => {
    return (localStorage.getItem(STORAGE_KEYS.LANG) as Language) || 'en';
  });

  const [selectedCity, setSelectedCityState] = useState<string>(() => {
    return localStorage.getItem(STORAGE_KEYS.CITY) || 'Lahore';
  });

  const [selectedArea, setSelectedAreaState] = useState<string>(() => {
    return localStorage.getItem(STORAGE_KEYS.AREA) || '';
  });

  const [categories, setCategories] = useState<ServiceCategory[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.CATEGORIES);
    return saved ? JSON.parse(saved) : INITIAL_CATEGORIES;
  });

  const [workers, setWorkers] = useState<WorkerProfile[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.WORKERS);
    return saved ? JSON.parse(saved) : INITIAL_WORKERS;
  });

  const [bookings, setBookings] = useState<JobRequest[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.BOOKINGS);
    return saved ? JSON.parse(saved) : INITIAL_BOOKINGS;
  });

  const [cities, setCities] = useState<CityData[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.CITIES);
    return saved ? JSON.parse(saved) : INITIAL_CITIES;
  });

  const [settings, setSettings] = useState<PlatformSettings>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    return saved ? JSON.parse(saved) : INITIAL_SETTINGS;
  });

  const [complaints, setComplaints] = useState<Complaint[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.COMPLAINTS);
    return saved ? JSON.parse(saved) : INITIAL_COMPLAINTS;
  });

  const [activeWorkerId, setActiveWorkerId] = useState<string>('w_1');

  // Wallet and JazzCash States
  const [customerBalancePKR, setCustomerBalancePKR] = useState<number>(() => {
    const saved = localStorage.getItem('kaamconnect_cust_balance');
    return saved ? Number(saved) : 2500;
  });

  const [workerBalancePKR, setWorkerBalancePKR] = useState<number>(() => {
    const saved = localStorage.getItem('kaamconnect_worker_balance');
    return saved ? Number(saved) : 3200;
  });

  const [adminJazzCashEarningsPKR, setAdminJazzCashEarningsPKR] = useState<number>(() => {
    const saved = localStorage.getItem('kaamconnect_admin_jazzcash');
    return saved ? Number(saved) : 18500;
  });

  const [walletTransactions, setWalletTransactions] = useState<WalletTransaction[]>(() => {
    const saved = localStorage.getItem('kaamconnect_wallet_txs');
    if (saved) return JSON.parse(saved);
    return [
      {
        id: 'tx_101',
        userId: 'cust_1',
        userRole: 'customer',
        userName: 'Muhammad Hamza',
        type: 'topup',
        amountPKR: 2000,
        jazzcashTID: '248910283741',
        senderNumber: '0300-4567890',
        recipientJazzCash: '+923084306705',
        status: 'completed',
        date: '2026-10-28 10:15',
        descriptionEn: 'JazzCash Wallet Top-up credited via TID 248910283741',
        descriptionUr: 'جاز کیش والٹ بیلنس لوڈ بذریعہ 03084306705'
      },
      {
        id: 'tx_102',
        userId: 'w_1',
        userRole: 'worker',
        userName: 'Ustad Tariq Mehmood',
        type: 'topup',
        amountPKR: 3000,
        jazzcashTID: '883912049182',
        senderNumber: '0301-4452198',
        recipientJazzCash: '+923084306705',
        status: 'completed',
        date: '2026-10-27 14:20',
        descriptionEn: 'Worker Partner Security & Commission Deposit',
        descriptionUr: 'کاریگر والٹ پیشگی بیلنس ڈپازٹ'
      },
      {
        id: 'tx_103',
        userId: 'w_3',
        userRole: 'worker',
        userName: 'Hafiz Bilal Electrician',
        type: 'commission_deduction',
        amountPKR: 350,
        recipientJazzCash: '+923084306705',
        status: 'completed',
        date: '2026-10-26 13:00',
        descriptionEn: '10% Commission auto-deducted for Solar Inverter job (#job_103)',
        descriptionUr: '10 فیصد پلیٹ فارم کمیشن کٹوتی (ایڈمن جاز کیش 03084306705)'
      }
    ];
  });

  const [isJazzCashModalOpen, setIsJazzCashModalOpen] = useState(false);
  const [isEmergencyModalOpen, setIsEmergencyModalOpen] = useState(false);
  const [activeMapJob, setActiveMapJob] = useState<JobRequest | null>(null);

  useEffect(() => {
    localStorage.setItem('kaamconnect_cust_balance', String(customerBalancePKR));
  }, [customerBalancePKR]);

  useEffect(() => {
    localStorage.setItem('kaamconnect_worker_balance', String(workerBalancePKR));
  }, [workerBalancePKR]);

  useEffect(() => {
    localStorage.setItem('kaamconnect_admin_jazzcash', String(adminJazzCashEarningsPKR));
  }, [adminJazzCashEarningsPKR]);

  useEffect(() => {
    localStorage.setItem('kaamconnect_wallet_txs', JSON.stringify(walletTransactions));
  }, [walletTransactions]);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ROLE, role);
  }, [role]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.LANG, lang);
    document.documentElement.dir = lang === 'ur' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CITY, selectedCity);
  }, [selectedCity]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.AREA, selectedArea);
  }, [selectedArea]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.WORKERS, JSON.stringify(workers));
  }, [workers]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(bookings));
  }, [bookings]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CITIES, JSON.stringify(cities));
  }, [cities]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.COMPLAINTS, JSON.stringify(complaints));
  }, [complaints]);

  const setRole = (newRole: UserRole) => setRoleState(newRole);
  const setLang = (newLang: Language) => setLangState(newLang);
  const setSelectedCity = (city: string) => {
    setSelectedCityState(city);
    setSelectedAreaState('');
  };
  const setSelectedArea = (area: string) => setSelectedAreaState(area);

  // Job creation
  const createJobRequest = (job: Omit<JobRequest, 'id' | 'createdAt' | 'status' | 'quotes'>): string => {
    const id = `job_${Date.now()}`;
    const newJob: JobRequest = {
      ...job,
      id,
      status: 'requested',
      quotes: [],
      createdAt: new Date().toISOString().replace('T', ' ').substring(0, 16)
    };
    setBookings(prev => [newJob, ...prev]);
    return id;
  };

  // Submit quote
  const submitQuote = (jobId: string, quoteData: Omit<Quotation, 'id' | 'createdAt' | 'status'>) => {
    const quoteId = `q_${Date.now()}`;
    const newQuote: Quotation = {
      ...quoteData,
      id: quoteId,
      status: 'pending',
      createdAt: new Date().toISOString().replace('T', ' ').substring(0, 16)
    };

    setBookings(prev =>
      prev.map(b => {
        if (b.id === jobId) {
          return {
            ...b,
            status: b.status === 'requested' ? 'quoted' : b.status,
            quotes: [...b.quotes, newQuote]
          };
        }
        return b;
      })
    );
  };

  // Accept quote - deducts 10% platform commission, unlocks contact phone numbers, and initializes live GPS tracking
  const acceptQuote = (jobId: string, quoteId: string) => {
    setBookings(prev =>
      prev.map(b => {
        if (b.id === jobId) {
          const selected = b.quotes.find(q => q.id === quoteId);
          const price = selected?.pricePKR || 2000;
          const commissionPercent = settings.commissionPercentage || 10;
          const commissionAmount = Math.round((price * commissionPercent) / 100);
          const timestamp = new Date().toISOString().replace('T', ' ').substring(0, 16);

          // Deduct 10% booking fee from customer balance
          setCustomerBalancePKR(c => Math.max(0, c - commissionAmount));

          // Credit 10% fee directly to Owner/Admin JazzCash account
          setAdminJazzCashEarningsPKR(a => a + commissionAmount);

          // Record transaction in ledger
          const commissionTx: WalletTransaction = {
            id: `comm_book_${Date.now()}`,
            userId: b.customerId,
            userRole: 'customer',
            userName: b.customerName,
            type: 'commission_deduction',
            amountPKR: commissionAmount,
            recipientJazzCash: settings.adminJazzCashNumber || '+923084306705',
            status: 'completed',
            date: timestamp,
            jobId,
            descriptionEn: `10% Booking deposit & platform fee for Job #${jobId} (Credited to Admin JazzCash 0308-4306705). Phone numbers unlocked!`,
            descriptionUr: `10 فیصد بکنگ ڈپازٹ کٹوتی (ایڈمن جاز کیش 03084306705 میں ٹرانسفر) - موبائل نمبرز کھل گئے۔`
          };
          setWalletTransactions(txs => [commissionTx, ...txs]);

          // Real-world Lahore area coordinates
          const custCoords = b.customerCoordinates || { lat: 31.4697, lng: 74.2728 };
          const workerCoords = b.workerLiveCoordinates || {
            lat: custCoords.lat + 0.008,
            lng: custCoords.lng + 0.009
          };

          return {
            ...b,
            status: 'accepted',
            selectedWorkerId: selected?.workerId,
            selectedWorkerName: selected?.workerName,
            selectedWorkerPhone: selected?.workerPhone,
            finalPricePKR: selected?.pricePKR,
            bookingCommissionPaid: true,
            phoneUnlocked: true,
            customerCoordinates: custCoords,
            workerLiveCoordinates: workerCoords,
            quotes: b.quotes.map(q => ({
              ...q,
              status: q.id === quoteId ? 'accepted' : 'rejected'
            }))
          };
        }
        return b;
      })
    );
  };

  // Wallet Recharge via JazzCash
  const rechargeWallet = ({
    userRole,
    amountPKR,
    jazzcashTID,
    senderNumber
  }: {
    userRole: UserRole;
    amountPKR: number;
    jazzcashTID: string;
    senderNumber?: string;
  }) => {
    const txId = `tx_${Date.now()}`;
    const timestamp = new Date().toISOString().replace('T', ' ').substring(0, 16);

    if (userRole === 'customer') {
      setCustomerBalancePKR(prev => prev + amountPKR);
    } else if (userRole === 'worker') {
      setWorkerBalancePKR(prev => prev + amountPKR);
    }

    const newTx: WalletTransaction = {
      id: txId,
      userId: userRole === 'customer' ? 'cust_1' : activeWorkerId,
      userRole,
      userName: userRole === 'customer' ? 'Muhammad Hamza' : 'Worker Partner',
      type: 'topup',
      amountPKR,
      jazzcashTID,
      senderNumber,
      recipientJazzCash: settings.adminJazzCashNumber || '+923084306705',
      status: 'completed',
      date: timestamp,
      descriptionEn: `JazzCash Wallet Top-up (TID: ${jazzcashTID}) credited to ${userRole} account`,
      descriptionUr: `جاز کیش بیلنس لوڈ بذریعہ TID ${jazzcashTID} برائے ${userRole === 'customer' ? 'کسٹمر' : 'کاریگر'}`
    };

    setWalletTransactions(prev => [newTx, ...prev]);
  };

  // 10% Platform Commission Deduction (Credited to Owner JazzCash +923084306705)
  const deductCommission = (jobId: string, finalPricePKR: number): number => {
    const commissionPercent = settings.commissionPercentage || 10;
    const commissionAmount = Math.round((finalPricePKR * commissionPercent) / 100);
    const timestamp = new Date().toISOString().replace('T', ' ').substring(0, 16);

    // Deduct from worker balance
    setWorkerBalancePKR(prev => Math.max(0, prev - commissionAmount));

    // Credit directly to Owner JazzCash Revenue
    setAdminJazzCashEarningsPKR(prev => prev + commissionAmount);

    const commissionTx: WalletTransaction = {
      id: `comm_${Date.now()}`,
      userId: activeWorkerId,
      userRole: 'worker',
      userName: 'Worker Partner',
      type: 'commission_deduction',
      amountPKR: commissionAmount,
      recipientJazzCash: settings.adminJazzCashNumber || '+923084306705',
      status: 'completed',
      date: timestamp,
      jobId,
      descriptionEn: `10% Platform Commission auto-deducted for Job #${jobId} (Credited to Admin JazzCash 0308-4306705)`,
      descriptionUr: `10 فیصد پلیٹ فارم کمیشن کٹوتی (ایڈمن جاز کیش اکاؤنٹ 03084306705 میں ٹرانسفر)`
    };

    setWalletTransactions(prev => [commissionTx, ...prev]);
    return commissionAmount;
  };

  // Status updates with automatic 10% commission triggering
  const updateJobStatus = (jobId: string, status: JobStatus, reason?: string) => {
    setBookings(prev =>
      prev.map(b => {
        if (b.id === jobId) {
          const updates: Partial<JobRequest> = { status };
          if (status === 'completed' && b.status !== 'completed') {
            updates.completedAt = new Date().toISOString().replace('T', ' ').substring(0, 16);
            // Trigger 10% platform commission deduction
            deductCommission(jobId, b.finalPricePKR || 2500);
          }
          if (reason) {
            updates.cancellationReason = reason;
          }
          return { ...b, ...updates };
        }
        return b;
      })
    );
  };

  // Rating
  const rateJob = (jobId: string, rating: number, review: string) => {
    let targetWorkerId: string | undefined;
    let serviceTitle = '';

    setBookings(prev =>
      prev.map(b => {
        if (b.id === jobId) {
          targetWorkerId = b.selectedWorkerId;
          serviceTitle = b.title;
          return {
            ...b,
            ratingGiven: rating,
            reviewGiven: review
          };
        }
        return b;
      })
    );

    if (targetWorkerId) {
      setWorkers(prev =>
        prev.map(w => {
          if (w.id === targetWorkerId) {
            const newTotalCount = w.reviewCount + 1;
            const newRating = Number(((w.rating * w.reviewCount + rating) / newTotalCount).toFixed(2));
            const newReview = {
              id: `rev_${Date.now()}`,
              customerName: 'Muhammad Hamza',
              rating,
              comment: review,
              date: new Date().toISOString().substring(0, 10),
              serviceName: serviceTitle
            };
            return {
              ...w,
              rating: newRating,
              reviewCount: newTotalCount,
              completedJobsCount: w.completedJobsCount + 1,
              reviews: [newReview, ...w.reviews]
            };
          }
          return w;
        })
      );
    }
  };

  // Worker profile updates
  const updateWorkerProfile = (workerId: string, updates: Partial<WorkerProfile>) => {
    setWorkers(prev =>
      prev.map(w => (w.id === workerId ? { ...w, ...updates } : w))
    );
  };

  const registerWorker = (newWorker: Omit<WorkerProfile, 'id' | 'rating' | 'reviewCount' | 'completedJobsCount' | 'reviews'>) => {
    const id = `w_${Date.now()}`;
    const created: WorkerProfile = {
      ...newWorker,
      id,
      rating: 5.0,
      reviewCount: 0,
      completedJobsCount: 0,
      reviews: []
    };
    setWorkers(prev => [created, ...prev]);
    setActiveWorkerId(id);
  };

  // Admin controls
  const verifyWorker = (workerId: string) => {
    setWorkers(prev =>
      prev.map(w =>
        w.id === workerId
          ? { ...w, verified: true, verificationStatus: 'verified' }
          : w
      )
    );
  };

  const suspendWorker = (workerId: string) => {
    setWorkers(prev =>
      prev.map(w =>
        w.id === workerId
          ? { ...w, verified: false, verificationStatus: 'suspended' }
          : w
      )
    );
  };

  const addCategory = (category: Omit<ServiceCategory, 'id'>) => {
    const id = `cat_${Date.now()}`;
    setCategories(prev => [...prev, { ...category, id }]);
  };

  const updateCategory = (id: string, updates: Partial<ServiceCategory>) => {
    setCategories(prev =>
      prev.map(c => (c.id === id ? { ...c, ...updates } : c))
    );
  };

  const deleteCategory = (id: string) => {
    setCategories(prev => prev.filter(c => c.id !== id));
  };

  const addSubcategory = (categoryId: string, sub: any) => {
    setCategories(prev =>
      prev.map(c => {
        if (c.id === categoryId) {
          const subId = `${c.code.toLowerCase()}_${Date.now()}`;
          return {
            ...c,
            subcategories: [...c.subcategories, { ...sub, id: subId }]
          };
        }
        return c;
      })
    );
  };

  const addCity = (city: Omit<CityData, 'id'>) => {
    const id = city.nameEn.toLowerCase().replace(/\s+/g, '_');
    setCities(prev => [...prev, { ...city, id }]);
  };

  const addAreaToCity = (cityId: string, areaName: string) => {
    setCities(prev =>
      prev.map(c => {
        if (c.id === cityId && !c.areas.includes(areaName)) {
          return { ...c, areas: [...c.areas, areaName] };
        }
        return c;
      })
    );
  };

  const updateSettings = (newSettings: Partial<PlatformSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  const submitComplaint = (complaint: Omit<Complaint, 'id' | 'status' | 'createdAt'>) => {
    const id = `comp_${Date.now()}`;
    const newComp: Complaint = {
      ...complaint,
      id,
      status: 'pending',
      createdAt: new Date().toISOString().substring(0, 10)
    };
    setComplaints(prev => [newComp, ...prev]);
  };

  const resolveComplaint = (id: string, notes: string) => {
    setComplaints(prev =>
      prev.map(c =>
        c.id === id
          ? { ...c, status: 'resolved', resolutionNotes: notes }
          : c
      )
    );
  };

  const resetDemoData = () => {
    localStorage.clear();
    setCategories(INITIAL_CATEGORIES);
    setWorkers(INITIAL_WORKERS);
    setBookings(INITIAL_BOOKINGS);
    setCities(INITIAL_CITIES);
    setSettings(INITIAL_SETTINGS);
    setComplaints(INITIAL_COMPLAINTS);
    setRoleState('customer');
    setLangState('en');
    setSelectedCityState('Lahore');
    setSelectedAreaState('');
    setActiveWorkerId('w_1');
  };

  return (
    <AppContext.Provider
      value={{
        role,
        setRole,
        lang,
        setLang,
        selectedCity,
        setSelectedCity,
        selectedArea,
        setSelectedArea,
        categories,
        workers,
        bookings,
        cities,
        settings,
        complaints,
        activeWorkerId,
        setActiveWorkerId,
        customerBalancePKR,
        workerBalancePKR,
        adminJazzCashEarningsPKR,
        walletTransactions,
        isJazzCashModalOpen,
        setIsJazzCashModalOpen,
        isEmergencyModalOpen,
        setIsEmergencyModalOpen,
        activeMapJob,
        setActiveMapJob,
        rechargeWallet,
        deductCommission,
        createJobRequest,
        submitQuote,
        acceptQuote,
        updateJobStatus,
        rateJob,
        updateWorkerProfile,
        registerWorker,
        verifyWorker,
        suspendWorker,
        addCategory,
        updateCategory,
        deleteCategory,
        addSubcategory,
        addCity,
        addAreaToCity,
        updateSettings,
        submitComplaint,
        resolveComplaint,
        resetDemoData
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
