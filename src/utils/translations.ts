import { Language } from '../types';

export const t = (key: string, lang: Language): string => {
  const dictionary: Record<string, { en: string; ur: string }> = {
    // App Brand
    appName: { en: 'KaamConnect Pakistan', ur: 'کام کنیکٹ پاکستان' },
    appTagline: { en: 'All-in-One Workers & Home Construction Services', ur: 'تعمیرات اور گھریلو خدمات کا بااعتماد پلیٹ فارم' },
    lahoreLaunchBadge: { en: 'Lahore Launch Edition', ur: 'لاہور ایڈیشن' },

    // Role switcher
    customerRole: { en: 'Customer View', ur: 'کسٹمر ویو' },
    workerRole: { en: 'Worker Partner', ur: 'کاریگر پارٹنر' },
    adminRole: { en: 'Admin Portal', ur: 'ایڈمن پورٹل' },
    switchRole: { en: 'Switch Role', ur: 'کردار تبدیل کریں' },

    // Top Navigation & Actions
    findWorkers: { en: 'Find Workers', ur: 'کاریگر تلاش کریں' },
    myBookings: { en: 'My Bookings', ur: 'میری بکنگز' },
    categories: { en: 'All Services', ur: 'تمام سروسز' },
    workerJobs: { en: 'Job Requests', ur: 'کام کی درخواستیں' },
    workerProfile: { en: 'My Profile', ur: 'میری پروفائل' },
    adminOverview: { en: 'Overview', ur: 'جائزہ' },
    adminWorkers: { en: 'Workers Verification', ur: 'کاریگر تصدیق' },
    adminCategories: { en: 'Manage Categories', ur: 'کیٹیگریز انتظام' },
    adminCities: { en: 'Cities & Areas', ur: 'شہر اور علاقے' },
    adminComplaints: { en: 'Complaints', ur: 'شکایات' },
    adminSettings: { en: 'Settings', ur: 'ترتیبات' },
    mobileArchitecture: { en: 'Mobile Architecture', ur: 'موبائل آرکیٹیکچر' },

    // Search and filters
    searchPlaceholder: { en: 'What service do you need? (e.g. Raj Mistri, Plumber, AC repair)...', ur: 'آپ کو کس کام کے لیے کاریگر چاہیے؟ (مثلاً راج مستری، پلمبر، الیکٹریشن)...' },
    searchBtn: { en: 'Search', ur: 'تلاش کریں' },
    selectCity: { en: 'City', ur: 'شہر' },
    selectArea: { en: 'Area', ur: 'علاقہ' },
    allAreas: { en: 'All Areas', ur: 'تمام علاقے' },
    filterBy: { en: 'Filters', ur: 'فلٹرز' },
    verifiedOnly: { en: 'Verified Only', ur: 'صرف تصدیق شدہ' },
    experienceMin: { en: 'Min. Experience', ur: 'کم از کم تجربہ' },
    minRating: { en: 'Min. Rating', ur: 'کم از کم ریٹنگ' },
    resetFilters: { en: 'Clear Filters', ur: 'فلٹرز ختم کریں' },

    // Home Section Headers
    emergencyRepairsTitle: { en: 'Emergency Repairs (Under 45 mins)', ur: 'ہنگامی ایمرجنسی خدمات (فوری آمد)' },
    popularServicesTitle: { en: 'Popular Construction & Home Services', ur: 'مشہور تعمیراتی و گھریلو خدمات' },
    allCategoriesTitle: { en: 'Complete Service Categories (A - U)', ur: 'مکمل سروس کیٹیگریز (A سے U)' },
    nearbyWorkersTitle: { en: 'Available Professionals in Lahore', ur: 'لاہور میں دستیاب تصدیق شدہ کاریگر' },
    recentBookingsTitle: { en: 'Your Active Bookings & Quotes', ur: 'آپ کی فعال بکنگز اور کوٹیشنز' },

    // Worker Card
    verifiedBadge: { en: 'Verified Pro', ur: 'مصدقہ کاریگر' },
    pendingBadge: { en: 'Verification Pending', ur: 'تصدیق زیر التواء' },
    completedJobs: { en: 'jobs completed', ur: 'مکمل کام' },
    yearsExp: { en: 'yrs experience', ur: 'سال کا تجربہ' },
    visitFee: { en: 'Visit Fee', ur: 'وزٹ فیس' },
    dailyRate: { en: 'Daily Rate', ur: 'روزانہ اجرت' },
    hourlyRate: { en: 'Hourly Rate', ur: 'فی گھنٹہ' },
    bookNow: { en: 'Book / Request Quote', ur: 'کوٹیشن مانگیں' },
    viewProfile: { en: 'View Profile', ur: 'پروفائل دیکھیں' },
    callNow: { en: 'Call Worker', ur: 'فون کریں' },
    whatsappChat: { en: 'WhatsApp', ur: 'واٹس ایپ' },

    // Booking modal
    postJobTitle: { en: 'Describe Your Job & Request Quotes', ur: 'اپنے کام کی تفصیل بتائیں اور کوٹیشن حاصل کریں' },
    jobTitleLabel: { en: 'Job Title / Work Required', ur: 'کام کا عنوان' },
    jobDescLabel: { en: 'Detailed Description', ur: 'کام کی مکمل تفصیل' },
    serviceLocationLabel: { en: 'Your Address in Lahore', ur: 'لاہور میں آپ کا پتہ' },
    urgencyLabel: { en: 'Urgency', ur: 'ضرورت کی نوعیت' },
    emergencyOption: { en: 'Emergency (Immediate dispatch)', ur: 'ہنگامی (فوری کاریگر چاہیے)' },
    todayOption: { en: 'Today', ur: 'آج ہی' },
    scheduledOption: { en: 'Scheduled for later date', ur: 'آئندہ تاریخ کے لیے' },
    preferredPricingLabel: { en: 'Preferred Pricing Model', ur: 'ادائیگی کا ترجیحی طریقہ' },
    pricingVisit: { en: 'Per Visit (Diagnosis & fix)', ur: 'فی وزٹ معائنہ و مرمت' },
    pricingDaily: { en: 'Daily Wage (Dihari)', ur: 'روزانہ دیہاڑی' },
    pricingHourly: { en: 'Hourly Rate', ur: 'فی گھنٹہ ریٹ' },
    pricingSqft: { en: 'Per Square Foot (Sq Ft)', ur: 'فی مربع فٹ (اسکوائر فٹ)' },
    pricingProject: { en: 'Full Project Lump Sum (Theka)', ur: 'مکمل پراجیکٹ ٹھیکہ' },
    submitJobRequest: { en: 'Post Job & Alert Nearby Workers', ur: 'کام پوسٹ کریں اور کاریگروں کو مطلع کریں' },
    cancel: { en: 'Cancel', ur: 'منسوخ کریں' },

    // Quotation and Status
    statusRequested: { en: 'Request Posted', ur: 'درخواست موصول' },
    statusQuoted: { en: 'Quotes Received', ur: 'کوٹیشن موصول' },
    statusAccepted: { en: 'Worker Confirmed', ur: 'کاریگر منتخب' },
    statusOnTheWay: { en: 'Worker On The Way', ur: 'کاریگر راستے میں ہے' },
    statusInProgress: { en: 'Work In Progress', ur: 'کام جاری ہے' },
    statusCompleted: { en: 'Completed', ur: 'مکمل ہو چکا' },
    statusCancelled: { en: 'Cancelled', ur: 'منسوخ شدہ' },

    // Worker Dashboard
    workerAvailable: { en: 'Available for Work', ur: 'کام کے لیے دستیاب' },
    workerBusy: { en: 'Busy / Inactive', ur: 'مصروف / غیر دستیاب' },
    todayEarnings: { en: "Today's Earnings", ur: 'آج کی آمدنی' },
    activeJobsCount: { en: 'Active Jobs', ur: 'جاری کام' },
    ratingScore: { en: 'Rating', ur: 'ریٹنگ' },
    newRequestsHeader: { en: 'Available Customer Job Posts', ur: 'نئی دستیاب کسٹمر درخواستیں' },
    submitQuoteBtn: { en: 'Send Quotation', ur: 'کوٹیشن بھیجیں' },
    quotePricePKR: { en: 'Quote Amount (PKR)', ur: 'رقم (پاکستانی روپے)' },
    quoteEstimatedTime: { en: 'Estimated Time', ur: 'تخمینی وقت' },
    quoteNotes: { en: 'Notes / Scope of Work', ur: 'کام کی وضاحت' },

    // Currency and Units
    currencyPKR: { en: 'PKR', ur: 'روپے' },
    perDay: { en: '/ day', ur: '/ دن' },
    perHour: { en: '/ hr', ur: '/ گھنٹہ' },
    perVisit: { en: '/ visit', ur: '/ وزٹ' },
    perSqft: { en: '/ sqft', ur: '/ مربع فٹ' },
    perUnit: { en: '/ item', ur: '/ یونٹ' },

    // Feedback & Reviews
    rateJob: { en: 'Rate Completed Job', ur: 'کاریگر کی ریٹنگ دیں' },
    leaveReview: { en: 'Leave Review & Feedback', ur: 'رائے اور تبصرہ لکھیں' },
    submitReview: { en: 'Submit Review', ur: 'تبصرہ جمع کروائیں' },
    fileComplaint: { en: 'Report Issue / Complaint', ur: 'شکایت درج کروائیں' }
  };

  return dictionary[key] ? dictionary[key][lang] : key;
};
