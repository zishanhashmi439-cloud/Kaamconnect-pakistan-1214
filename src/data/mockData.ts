import { CityData, WorkerProfile, JobRequest, PlatformSettings, Complaint } from '../types';

export const INITIAL_CITIES: CityData[] = [
  {
    id: 'lahore',
    nameEn: 'Lahore',
    nameUr: 'لاہور',
    active: true,
    areas: [
      'DHA Phase 1-8',
      'Gulberg (I, II, III)',
      'Bahria Town Lahore',
      'Johar Town',
      'Model Town',
      'Cantt & Cavalry Ground',
      'Wapda Town',
      'Faisal Town',
      'Allama Iqbal Town',
      'Valancia Town',
      'Askari (1-11)',
      'Garden Town',
      'Shadman & Jail Road',
      'Thokar Niaz Baig & Raiwind Road',
      'Sabzazar',
      'Samanabad',
      'Mughalpura & Harbanspura',
      'Baghbanpura',
      'EME Society',
      'Lake City'
    ]
  },
  {
    id: 'karachi',
    nameEn: 'Karachi',
    nameUr: 'کراچی',
    active: true,
    areas: [
      'DHA & Clifton',
      'Gulshan-e-Iqbal',
      'North Nazimabad',
      'PECHS & Tariq Road',
      'Bahria Town Karachi',
      'Federal B Area',
      'Malir Cantt',
      'Gulistan-e-Johar',
      'KDA Scheme 1',
      'Saddar'
    ]
  },
  {
    id: 'islamabad',
    nameEn: 'Islamabad',
    nameUr: 'اسلام آباد',
    active: true,
    areas: [
      'F-6 / F-7 / F-8',
      'G-9 / G-10 / G-11',
      'DHA Islamabad Phase 1-5',
      'Bahria Town Phase 1-8',
      'Bani Gala',
      'E-7 / E-11',
      'I-8 / I-9',
      'PWD & Pakistan Town',
      'Gulberg Greens'
    ]
  },
  {
    id: 'rawalpindi',
    nameEn: 'Rawalpindi',
    nameUr: 'راولپنڈی',
    active: true,
    areas: [
      'Saddar & Cantt',
      'Satellite Town',
      'Chaklala Scheme 3',
      'Westridge',
      'Adyala Road',
      'Peshawar Road',
      'Gulraiz Housing'
    ]
  },
  {
    id: 'faisalabad',
    nameEn: 'Faisalabad',
    nameUr: 'فیصل آباد',
    active: true,
    areas: [
      'Madina Town',
      'Peoples Colony No 1 & 2',
      'Kohinoor City',
      'D Ground',
      'Canal Road',
      'Samanabad'
    ]
  },
  {
    id: 'multan',
    nameEn: 'Multan',
    nameUr: 'ملتان',
    active: true,
    areas: [
      'Cantt Multan',
      'Gulgasht Colony',
      'Bosan Road',
      'Model Town Multan',
      'Shah Rukn-e-Alam Colony'
    ]
  },
  {
    id: 'gujranwala',
    nameEn: 'Gujranwala',
    nameUr: 'گوجرانوالہ',
    active: true,
    areas: [
      'DC Colony',
      'Model Town',
      'Wapda Town',
      'Satellite Town',
      'Cantt'
    ]
  },
  {
    id: 'peshawar',
    nameEn: 'Peshawar',
    nameUr: 'پشاور',
    active: true,
    areas: [
      'Hayatabad Phases 1-7',
      'University Town',
      'Peshawar Cantt',
      'Warsak Road',
      'Ring Road'
    ]
  }
];

export const INITIAL_SETTINGS: PlatformSettings = {
  appName: 'KaamConnect Pakistan',
  commissionPercentage: 10,
  baseServiceFeePKR: 150,
  emergencySurchargePKR: 350,
  supportPhone: '+92 308 4306705',
  supportWhatsapp: '+92 308 4306705',
  adminJazzCashNumber: '+923084306705',
  adminName: 'Zishan Hashmi (Owner & Super Admin)',
  announcementEn: 'Official Owner JazzCash Account: 0308-4306705 (Zishan Hashmi) · Load Wallet Balance & 10% Commission Hub',
  announcementUr: 'ایڈمن و اونر جاز کیش اکاؤنٹ: 03084306705 (ذیشان ہاشمی) · بیلنس کروائیں اور کام حاصل کریں',
  bannerActive: true
};

export const INITIAL_WORKERS: WorkerProfile[] = [
  {
    id: 'w_1',
    name: 'Ustad Tariq Mehmood (Raj Mistri)',
    phone: '+92 301 4452198',
    whatsapp: '+92 301 4452198',
    photo: '/src/assets/images/service_masonry_pakistan_1793284436647.jpg',
    city: 'Lahore',
    serviceAreas: ['Johar Town', 'Faisal Town', 'Model Town', 'Wapda Town', 'Garden Town'],
    primaryCategoryCode: 'A',
    subcategories: ['a_1', 'a_2', 'a_13', 'a_15'],
    experienceYears: 18,
    rating: 4.9,
    reviewCount: 84,
    verified: true,
    verificationStatus: 'verified',
    cnicNumber: '35201-4567891-3',
    verificationDate: '2026-09-15',
    verificationBadgeType: 'Master Craftsman Gold Shield',
    verificationChecks: [
      {
        id: 'chk_w1_1',
        titleEn: 'NADRA CNIC Biometric Verification',
        titleUr: 'نادرا قومی شناختی کارڈ بائیو میٹرک تصدیق',
        status: 'passed',
        documentNameEn: 'Smart National ID Card',
        documentNameUr: 'اسمارٹ شناختی کارڈ',
        completedDate: '2026-09-12',
        authorityEn: 'NADRA Citizen Database (Lahore Center)',
        authorityUr: 'نادرا سٹیزن ڈیٹا بیس (لاہور)',
        summaryEn: 'Identity authenticity and permanent residence in Johar Town, Lahore confirmed.',
        summaryUr: 'شناخت اور جوہر ٹاؤن لاہور کی مستقل رہائش کی تصدیق مکمل ہے۔'
      },
      {
        id: 'chk_w1_2',
        titleEn: 'Punjab Police Character Clearance (PKM)',
        titleUr: 'پنجاب پولیس کریکٹر سرٹیفکیٹ (خدمت مرکز)',
        status: 'passed',
        documentNameEn: 'Khidmat Markaz Security Clearance Certificate',
        documentNameUr: 'پولیس خدمت مرکز سیکیورٹی کلیئرنس',
        completedDate: '2026-09-15',
        authorityEn: 'Punjab Police Khidmat Markaz, Lahore',
        authorityUr: 'پنجاب پولیس خدمت مرکز، لاہور',
        summaryEn: 'Zero criminal record or legal complaints on police record. Fully cleared for residential entries.',
        summaryUr: 'کوئی فوجداری یا پولیس ریکارڈ نہیں۔ رہائشی گھروں میں کام کے لیے مکمل کلیئرنس۔'
      },
      {
        id: 'chk_w1_3',
        titleEn: 'Structural Masonry Trade Evaluation',
        titleUr: 'تعمیراتی راج مستری ٹریڈ و مہارت ٹیسٹ',
        status: 'passed',
        documentNameEn: 'Master Mason Field Practical Assessment',
        documentNameUr: 'ماسٹر راج مستری عملی جانچ',
        completedDate: '2026-09-18',
        authorityEn: 'KaamConnect Technical Assessment Board',
        authorityUr: 'کام کنیکٹ ٹیکنیکل بورڈ',
        summaryEn: 'Evaluated on bricklaying plumb level, mortar mix proportions, and plastering finish across 3 completed sites.',
        summaryUr: 'اینٹ چنائی کی سیدھ، واٹر لیول اور پلستر فنشنگ کا سائٹ پر عملی معائنہ پاس کیا۔'
      },
      {
        id: 'chk_w1_4',
        titleEn: 'Workshop & Residence Physical Verification',
        titleUr: 'رہائش و ٹولز فزیکل فیلڈ انسپکشن',
        status: 'passed',
        documentNameEn: 'Physical Site Audit Form',
        documentNameUr: 'فیلڈ آڈٹ فارم',
        completedDate: '2026-09-20',
        authorityEn: 'KaamConnect Field Operations Lahore',
        authorityUr: 'کام کنیکٹ فیلڈ آپریشنز لاہور',
        summaryEn: 'In-person verification of contractor depot, scaffolding tools, and permanent address.',
        summaryUr: 'مستقل پتہ اور تعمیراتی اوزاروں کا موقع پر فزیکل معائنہ مکمل۔'
      }
    ],
    hourlyRatePKR: 400,
    dailyRatePKR: 2800,
    visitFeePKR: 800,
    supportedPricingModels: ['daily', 'sqft', 'visit'],
    bioEn: '18+ years of structural masonry and brickwork in Lahore. Expert in boundary walls, plastering, and RCC foundation.',
    bioUr: 'لاہور میں 18 سال سے زیادہ کا چنائی، پلستر اور مکانات کی تعمیر کا تجربہ۔ مضبوط اور معیاری کام کی مکمل ضمانت۔',
    completedJobsCount: 142,
    availabilityStatus: 'available',
    portfolioPhotos: [
      '/src/assets/images/hero_construction_pakistan_1793284436903.jpg',
      '/src/assets/images/service_masonry_pakistan_1793284436647.jpg'
    ],
    reviews: [
      {
        id: 'rev_1',
        customerName: 'Muhammad Salman (Johar Town)',
        rating: 5,
        comment: 'Ustad Tariq built our 10 Marla boundary wall with laser-straight brick lines. Timely arrival and very honest rates.',
        date: '2026-10-18',
        serviceName: 'Boundary Wall Construction'
      },
      {
        id: 'rev_2',
        customerName: 'Dr. Asad Raza (Model Town)',
        rating: 5,
        comment: 'Excellent plastering and foundation repair. Clean worker, highly recommended for any house construction.',
        date: '2026-10-04',
        serviceName: 'Plastering & Rendering'
      }
    ]
  },
  {
    id: 'w_2',
    name: 'Engr. Zafar Ali & Associates',
    phone: '+92 321 8847112',
    whatsapp: '+92 321 8847112',
    photo: '/src/assets/images/verified_contractor_portrait_1793284437036.jpg',
    city: 'Lahore',
    serviceAreas: ['DHA Phase 1-8', 'Cantt & Cavalry Ground', 'Askari (1-11)', 'Gulberg (I, II, III)', 'Lake City'],
    primaryCategoryCode: 'K',
    subcategories: ['k_1', 'k_3', 'k_4', 'k_9', 'k_10', 'k_11', 'k_14'],
    experienceYears: 14,
    rating: 4.95,
    reviewCount: 62,
    verified: true,
    verificationStatus: 'verified',
    cnicNumber: '35202-7891234-7',
    verificationDate: '2026-08-10',
    verificationBadgeType: 'PEC Certified Engineering Consultant',
    verificationChecks: [
      {
        id: 'chk_w2_1',
        titleEn: 'Pakistan Engineering Council (PEC) Registration',
        titleUr: 'پاکستان انجینئرنگ کونسل (پی ای سی) لائسنس',
        status: 'passed',
        documentNameEn: 'PEC Professional Engineer License',
        documentNameUr: 'پی ای سی انجینئر رجسٹریشن کارڈ',
        completedDate: '2026-08-05',
        authorityEn: 'Pakistan Engineering Council (PEC Islamabad)',
        authorityUr: 'پاکستان انجینئرنگ کونسل اسلام آباد',
        summaryEn: 'Valid Professional Engineer (CIVIL/18920) credential verified. Authorized for structural vetting in LDA, DHA, and Bahria Town.',
        summaryUr: 'سول انجینئرنگ پریکٹس لائسنس مصدقہ ہے، ڈی ایچ اے اور ایل ڈی اے کے نقشہ جات پاس کروانے کے مجاز ہیں۔'
      },
      {
        id: 'chk_w2_2',
        titleEn: 'NADRA Smart CNIC Verification',
        titleUr: 'نادرا اسمارٹ شناختی کارڈ تصدیق',
        status: 'passed',
        documentNameEn: 'NADRA Citizen Verification Record',
        documentNameUr: 'نادرا سٹیزن ویریفیکیشن رپورٹ',
        completedDate: '2026-08-08',
        authorityEn: 'NADRA DHA Phase 3 Executive Center',
        authorityUr: 'نادرا ایگزیکٹو سینٹر ڈی ایچ اے فیز 3',
        summaryEn: 'National biometric identity authenticated matching engineering credentials.',
        summaryUr: 'بائیو میٹرک تصدیق پی ای سی دستاویزات سے مطابقت رکھتی ہے۔'
      },
      {
        id: 'chk_w2_3',
        titleEn: 'Punjab Police Character Clearance (PKM)',
        titleUr: 'پولیس خدمت مرکز کریکٹر سرٹیفکیٹ',
        status: 'passed',
        documentNameEn: 'Police Clearance Certificate',
        documentNameUr: 'پولیس کلیئرنس سرٹیفکیٹ',
        completedDate: '2026-08-10',
        authorityEn: 'Punjab Police Khidmat Markaz, Cantt Lahore',
        authorityUr: 'پنجاب پولیس خدمت مرکز کینٹ لاہور',
        summaryEn: 'Clean security and character check with zero adverse history.',
        summaryUr: 'کوئی سیکیورٹی یا فوجداری تنازعہ نہیں۔ مکمل کلیئرنس۔'
      },
      {
        id: 'chk_w2_4',
        titleEn: 'Consulting Office & Project Auditing',
        titleUr: 'دفتر اور پراجیکٹ فیلڈ آڈٹ',
        status: 'passed',
        documentNameEn: 'Consultancy Verification Audit',
        documentNameUr: 'آفس ویریفیکیشن رپورٹ',
        completedDate: '2026-08-12',
        authorityEn: 'KaamConnect Corporate Verification Cell',
        authorityUr: 'کام کنیکٹ کارپوریٹ سیل',
        summaryEn: 'Physical audit of design studio in Gulberg and inspection of 4 ongoing residential projects in DHA Phase 5.',
        summaryUr: 'گلبرگ آفس اور ڈی ایچ اے میں جاری پراجیکٹس کا تفصیلی فیلڈ معائنہ مکمل۔'
      }
    ],
    hourlyRatePKR: 1200,
    dailyRatePKR: 6000,
    visitFeePKR: 3000,
    supportedPricingModels: ['project', 'sqft', 'visit'],
    bioEn: 'PEC Registered Civil Engineer & Architectural Designer. Specializes in DHA/Bahria approved maps, 3D house plans, and Turnkey building.',
    bioUr: 'پی ای سی رجسٹرڈ سول انجینئر اور آرکیٹیکٹ۔ ڈی ایچ اے اور بحریہ کے منظور شدہ نقشہ جات، 3D ایلیویشن اور تعمیراتی نگرانی۔',
    completedJobsCount: 96,
    availabilityStatus: 'available',
    portfolioPhotos: [
      '/src/assets/images/hero_construction_pakistan_1793284436903.jpg',
      '/src/assets/images/verified_contractor_portrait_1793284437036.jpg'
    ],
    reviews: [
      {
        id: 'rev_3',
        customerName: 'Brig. (R) Haroon (DHA Phase 5)',
        rating: 5,
        comment: 'Engr. Zafar provided full structural drawing, BOQ, and site supervision for our 1 Kanal bungalow. Top professional.',
        date: '2026-10-12',
        serviceName: 'Architectural & Structural Drawings'
      }
    ]
  },
  {
    id: 'w_3',
    name: 'Hafiz Bilal Electrician & Solar',
    phone: '+92 333 5566778',
    whatsapp: '+92 333 5566778',
    photo: '/src/assets/images/service_electrician_pakistan_1793284438828.jpg',
    city: 'Lahore',
    serviceAreas: ['Gulberg (I, II, III)', 'Shadman & Jail Road', 'Model Town', 'Faisal Town', 'Cantt & Cavalry Ground'],
    primaryCategoryCode: 'C',
    subcategories: ['c_1', 'c_3', 'c_4', 'c_8', 'c_10', 'c_11'],
    experienceYears: 11,
    rating: 4.88,
    reviewCount: 112,
    verified: true,
    verificationStatus: 'verified',
    cnicNumber: '35201-9988123-5',
    hourlyRatePKR: 500,
    dailyRatePKR: 3200,
    visitFeePKR: 1000,
    supportedPricingModels: ['visit', 'project', 'unit'],
    bioEn: 'Certified Electrician & Solar Specialist. Expert in 3-phase DB panel dressing, solar inverter programming, and fault diagnosis.',
    bioUr: 'سند یافتہ الیکٹریشن اور سولر ایکسپرٹ۔ مین ڈی بی بریکر پینل، ہائبرڈ سولر سیٹنگ اور گھر کی مکمل برقی وائرنگ۔',
    completedJobsCount: 220,
    availabilityStatus: 'available',
    portfolioPhotos: [
      '/src/assets/images/service_electrician_pakistan_1793284438828.jpg'
    ],
    reviews: [
      {
        id: 'rev_4',
        customerName: 'Khurram Shehzad (Gulberg III)',
        rating: 5,
        comment: 'Had a sudden tripping in main DB after rain. Hafiz Bilal detected the underground wire grounding in 20 minutes.',
        date: '2026-10-22',
        serviceName: 'Main DB & Fault Diagnosis'
      }
    ]
  },
  {
    id: 'w_4',
    name: 'Mian Rashid Sanitary & Plumber',
    phone: '+92 300 9876543',
    whatsapp: '+92 300 9876543',
    photo: '/src/assets/images/service_plumbing_pakistan_1793284437496.jpg',
    city: 'Lahore',
    serviceAreas: ['Bahria Town Lahore', 'Valancia Town', 'Wapda Town', 'Lake City', 'Thokar Niaz Baig & Raiwind Road'],
    primaryCategoryCode: 'B',
    subcategories: ['b_1', 'b_2', 'b_5', 'b_6', 'b_7', 'b_9', 'b_12'],
    experienceYears: 15,
    rating: 4.92,
    reviewCount: 95,
    verified: true,
    verificationStatus: 'verified',
    cnicNumber: '35202-1234567-9',
    hourlyRatePKR: 450,
    dailyRatePKR: 2900,
    visitFeePKR: 1000,
    supportedPricingModels: ['visit', 'project', 'unit'],
    bioEn: 'Master Plumber specializing in PPRC pipe leaks, water pumps, automatic pressure motors, and concealed bathroom sanitary.',
    bioUr: 'پلمبر اور سینیٹری ماہر۔ واٹر پریشر پمپ، ٹینکی صفائی، گیزر انسٹالیشن اور واش روم لیکیج کا مستقل حل۔',
    completedJobsCount: 178,
    availabilityStatus: 'available',
    portfolioPhotos: [
      '/src/assets/images/service_plumbing_pakistan_1793284437496.jpg'
    ],
    reviews: [
      {
        id: 'rev_5',
        customerName: 'Mrs. Farhan (Bahria Town Sector C)',
        rating: 5,
        comment: 'Installed our automatic pressure pump and repaired our wall mixer. Very clean and respectful craftsman.',
        date: '2026-10-25',
        serviceName: 'Pressure Pump & Sanitary Fitting'
      }
    ]
  },
  {
    id: 'w_5',
    name: 'Chaudhry Akram Tile & Marble Works',
    phone: '+92 302 7788991',
    whatsapp: '+92 302 7788991',
    photo: '/src/assets/images/service_masonry_pakistan_1793284436647.jpg',
    city: 'Lahore',
    serviceAreas: ['DHA Phase 1-8', 'Cantt & Cavalry Ground', 'Johar Town', 'Askari (1-11)'],
    primaryCategoryCode: 'D',
    subcategories: ['d_1', 'd_2', 'd_3', 'd_4', 'd_6', 'd_10'],
    experienceYears: 13,
    rating: 4.85,
    reviewCount: 49,
    verified: true,
    verificationStatus: 'verified',
    cnicNumber: '35201-8899771-1',
    hourlyRatePKR: 500,
    dailyRatePKR: 3000,
    visitFeePKR: 1000,
    supportedPricingModels: ['sqft', 'daily'],
    bioEn: 'Specialist in 60x120cm large format porcelain tiles, Spanish tiles, Badal marble, and Italian diamond chemical polishing.',
    bioUr: 'بڑے سائز کی سپینش اور پورسلین ٹائل فکسنگ، ماربل کی سلائی اور ڈائمنڈ کیمیکل چمکدار پالش۔',
    completedJobsCount: 110,
    availabilityStatus: 'available',
    portfolioPhotos: [
      '/src/assets/images/service_masonry_pakistan_1793284436647.jpg'
    ],
    reviews: [
      {
        id: 'rev_6',
        customerName: 'Kamran Butt (DHA Phase 6)',
        rating: 5,
        comment: 'Flawless porcelain floor tile work without any uneven edges. Excellent spacer work and neat epoxy grouting.',
        date: '2026-10-15',
        serviceName: 'Porcelain Floor Tiling'
      }
    ]
  },
  {
    id: 'w_6',
    name: 'Sardar Naveed AC & HVAC Master',
    phone: '+92 345 6677889',
    whatsapp: '+92 345 6677889',
    photo: '/src/assets/images/service_electrician_pakistan_1793284438828.jpg',
    city: 'Lahore',
    serviceAreas: ['Allama Iqbal Town', 'Sabzazar', 'Johar Town', 'Faisal Town', 'Model Town'],
    primaryCategoryCode: 'M',
    subcategories: ['m_1', 'm_2', 'm_3', 'm_4'],
    experienceYears: 9,
    rating: 4.82,
    reviewCount: 71,
    verified: false,
    verificationStatus: 'pending',
    cnicNumber: '35202-3344556-2',
    hourlyRatePKR: 400,
    dailyRatePKR: 2800,
    visitFeePKR: 1200,
    supportedPricingModels: ['visit', 'unit'],
    bioEn: 'Inverter AC repair, chemical master servicing, and R410 gas refilling. Fast response in Iqbal Town and Johar Town.',
    bioUr: 'انورٹر اے سی ماسٹر کیمیکل واش، پائپ لیک ریپیئر اور گیس چارجنگ۔',
    completedJobsCount: 88,
    availabilityStatus: 'available',
    portfolioPhotos: [
      '/src/assets/images/service_electrician_pakistan_1793284438828.jpg'
    ],
    reviews: []
  }
];

export const INITIAL_BOOKINGS: JobRequest[] = [
  {
    id: 'job_101',
    customerId: 'cust_1',
    customerName: 'Muhammad Hamza',
    customerPhone: '+92 300 4567890',
    customerCity: 'Lahore',
    customerArea: 'Johar Town',
    addressDetails: 'House 42, Block G-3, Johar Town, Lahore',
    categoryCode: 'A',
    categoryNameEn: 'Construction & Masonry',
    categoryNameUr: 'تعمیرات اور راج مستری',
    subcategoryId: 'a_15',
    subcategoryNameEn: 'Boundary Wall Builder',
    subcategoryNameUr: 'چاردیواری بنانے والا',
    title: '5 Marla Plot 7-feet Boundary Wall Construction',
    description: 'Need experienced Raj Mistri with 2 mazdoors to build a 7-foot high boundary wall with 9-inch brickwork. Bricks and cement are already on site.',
    urgency: 'scheduled',
    scheduledDate: '2026-10-31',
    scheduledTimeSlot: 'Morning (08:00 AM - 12:00 PM)',
    photos: [
      '/src/assets/images/hero_construction_pakistan_1793284436903.jpg'
    ],
    pricingModelPreferred: 'daily',
    status: 'quoted',
    quotes: [
      {
        id: 'q_1',
        workerId: 'w_1',
        workerName: 'Ustad Tariq Mehmood (Raj Mistri)',
        workerPhone: '+92 301 4452198',
        workerPhoto: '/src/assets/images/service_masonry_pakistan_1793284436647.jpg',
        workerRating: 4.9,
        workerVerified: true,
        pricePKR: 2800,
        pricingType: 'daily',
        estimatedDuration: '4 days',
        notes: 'I will provide top quality bricklaying with 2 experienced helpers (Mazdoors at Rs 1,800/day). Spirit-level tested.',
        status: 'pending',
        createdAt: '2026-10-28 09:30'
      }
    ],
    createdAt: '2026-10-28 08:15'
  },
  {
    id: 'job_102',
    customerId: 'cust_1',
    customerName: 'Muhammad Hamza',
    customerPhone: '+92 300 4567890',
    customerCity: 'Lahore',
    customerArea: 'Johar Town',
    addressDetails: 'House 42, Block G-3, Johar Town, Lahore',
    categoryCode: 'B',
    categoryNameEn: 'Plumbing & Water Systems',
    categoryNameUr: 'پلمبنگ اور واٹر سسٹمز',
    subcategoryId: 'b_7',
    subcategoryNameEn: 'Motor & Pressure Pump Technician',
    subcategoryNameUr: 'پریشر پمپ ٹیکنیشن',
    title: 'Water Pressure Pump Automatic Kit Not Starting',
    description: 'Water pressure drops in upper floor showers. Automatic pump motor hums but does not engage. Needs urgent repair or kit replacement.',
    urgency: 'today',
    scheduledDate: '2026-10-29',
    scheduledTimeSlot: 'Afternoon (02:00 PM - 05:00 PM)',
    photos: [
      '/src/assets/images/service_plumbing_pakistan_1793284437496.jpg'
    ],
    pricingModelPreferred: 'visit',
    status: 'in_progress',
    selectedWorkerId: 'w_4',
    selectedWorkerName: 'Mian Rashid Sanitary & Plumber',
    selectedWorkerPhone: '+92 300 9876543',
    finalPricePKR: 1500,
    quotes: [
      {
        id: 'q_2',
        workerId: 'w_4',
        workerName: 'Mian Rashid Sanitary & Plumber',
        workerPhone: '+92 300 9876543',
        workerPhoto: '/src/assets/images/service_plumbing_pakistan_1793284437496.jpg',
        workerRating: 4.92,
        workerVerified: true,
        pricePKR: 1500,
        pricingType: 'visit',
        estimatedDuration: '2 hours',
        notes: 'Visiting with testing gear and automatic switch spares.',
        status: 'accepted',
        createdAt: '2026-10-29 08:30'
      }
    ],
    createdAt: '2026-10-29 07:50'
  },
  {
    id: 'job_103',
    customerId: 'cust_2',
    customerName: 'Fatima Zahra',
    customerPhone: '+92 321 9900112',
    customerCity: 'Lahore',
    customerArea: 'DHA Phase 5',
    addressDetails: 'Sector K, DHA Phase 5, Lahore',
    categoryCode: 'C',
    categoryNameEn: 'Electrical & Power',
    categoryNameUr: 'الیکٹریکل اور پاور سسٹمز',
    subcategoryId: 'c_11',
    subcategoryNameEn: 'Solar Inverter & Battery Technician',
    subcategoryNameUr: 'سولر انورٹر و لیتھیم بیٹری ایکسپرٹ',
    title: 'Hybrid 10kW Solar Inverter Net Metering Configuration',
    description: 'Need inverter parameter check and battery equalization calibration for lithium storage.',
    urgency: 'scheduled',
    scheduledDate: '2026-10-26',
    scheduledTimeSlot: 'Morning (10:00 AM)',
    photos: [],
    pricingModelPreferred: 'visit',
    status: 'completed',
    selectedWorkerId: 'w_3',
    selectedWorkerName: 'Hafiz Bilal Electrician & Solar',
    selectedWorkerPhone: '+92 333 5566778',
    finalPricePKR: 3500,
    completedAt: '2026-10-26 12:45',
    ratingGiven: 5,
    reviewGiven: 'Very professional engineer. Configured export settings seamlessly and explained the battery cycles.',
    quotes: [],
    createdAt: '2026-10-25 14:00'
  }
];

export const INITIAL_COMPLAINTS: Complaint[] = [
  {
    id: 'comp_1',
    bookingId: 'job_98',
    customerName: 'Sajjad Ahmed (Gulberg)',
    workerName: 'Naveed Electrician',
    issueType: 'Delayed Arrival',
    description: 'Technician was scheduled at 10 AM but arrived 3 hours late without prior notice.',
    status: 'resolved',
    resolutionNotes: 'Worker cautioned and 20% discount coupon issued to customer.',
    createdAt: '2026-10-20'
  }
];
