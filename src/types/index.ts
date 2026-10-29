export type UserRole = 'customer' | 'worker' | 'admin';

export type Language = 'en' | 'ur';

export type PricingModel = 'visit' | 'hourly' | 'daily' | 'sqft' | 'unit' | 'project' | 'custom';

export type JobStatus = 
  | 'requested' 
  | 'quoted' 
  | 'accepted' 
  | 'on_the_way' 
  | 'in_progress' 
  | 'completed' 
  | 'cancelled';

export interface ServiceSubcategory {
  id: string;
  nameEn: string;
  nameUr: string;
  descriptionEn: string;
  descriptionUr: string;
  typicalPricingModel: PricingModel;
  baseEstimatePKR: number;
}

export interface ServiceCategory {
  id: string;
  code: string; // A through U
  nameEn: string;
  nameUr: string;
  iconName: string;
  descriptionEn: string;
  descriptionUr: string;
  popular?: boolean;
  emergency?: boolean;
  subcategories: ServiceSubcategory[];
}

export interface WorkerReview {
  id: string;
  customerName: string;
  rating: number;
  comment: string;
  date: string;
  serviceName: string;
}

export interface WorkerProfile {
  id: string;
  name: string;
  phone: string;
  whatsapp: string;
  photo: string;
  city: string;
  serviceAreas: string[];
  primaryCategoryCode: string;
  subcategories: string[];
  experienceYears: number;
  rating: number;
  reviewCount: number;
  verified: boolean;
  verificationStatus: 'verified' | 'pending' | 'unverified' | 'suspended';
  cnicNumber?: string;
  verificationDate?: string;
  verificationBadgeType?: string;
  verificationChecks?: VerificationCheck[];
  hourlyRatePKR?: number;
  dailyRatePKR?: number;
  visitFeePKR: number;
  supportedPricingModels: PricingModel[];
  bioEn: string;
  bioUr: string;
  completedJobsCount: number;
  availabilityStatus: 'available' | 'busy' | 'offline';
  portfolioPhotos: string[];
  reviews: WorkerReview[];
  locationCoordinates?: Coordinates;
}

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface VerificationCheck {
  id: string;
  titleEn: string;
  titleUr: string;
  status: 'passed' | 'pending' | 'unverified';
  documentNameEn: string;
  documentNameUr: string;
  completedDate?: string;
  summaryEn: string;
  summaryUr: string;
  authorityEn: string;
  authorityUr: string;
}

export interface Quotation {
  id: string;
  workerId: string;
  workerName: string;
  workerPhone: string;
  workerPhoto: string;
  workerRating: number;
  workerVerified: boolean;
  pricePKR: number;
  pricingType: PricingModel;
  estimatedDuration: string;
  notes: string;
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: string;
}

export interface JobRequest {
  id: string;
  customerId: string;
  customerName: string;
  customerPhone: string;
  customerCity: string;
  customerArea: string;
  addressDetails: string;
  categoryCode: string;
  categoryNameEn: string;
  categoryNameUr: string;
  subcategoryId: string;
  subcategoryNameEn: string;
  subcategoryNameUr: string;
  title: string;
  description: string;
  urgency: 'emergency' | 'today' | 'scheduled';
  scheduledDate: string;
  scheduledTimeSlot: string;
  photos: string[];
  pricingModelPreferred: PricingModel;
  status: JobStatus;
  quotes: Quotation[];
  selectedWorkerId?: string;
  selectedWorkerName?: string;
  selectedWorkerPhone?: string;
  finalPricePKR?: number;
  createdAt: string;
  completedAt?: string;
  ratingGiven?: number;
  reviewGiven?: string;
  cancellationReason?: string;
  customerCoordinates?: Coordinates;
  workerLiveCoordinates?: Coordinates;
  bookingCommissionPaid?: boolean;
  phoneUnlocked?: boolean;
}

export interface Complaint {
  id: string;
  bookingId: string;
  customerName: string;
  workerName: string;
  issueType: string;
  description: string;
  status: 'pending' | 'investigating' | 'resolved';
  resolutionNotes?: string;
  createdAt: string;
}

export interface CityData {
  id: string;
  nameEn: string;
  nameUr: string;
  areas: string[];
  active: boolean;
}

export interface PlatformSettings {
  appName: string;
  commissionPercentage: number;
  baseServiceFeePKR: number;
  emergencySurchargePKR: number;
  supportPhone: string;
  supportWhatsapp: string;
  adminJazzCashNumber: string;
  adminName: string;
  announcementEn: string;
  announcementUr: string;
  bannerActive: boolean;
}

export interface WalletTransaction {
  id: string;
  userId: string;
  userRole: UserRole;
  userName: string;
  type: 'topup' | 'commission_deduction' | 'service_charge' | 'admin_revenue';
  amountPKR: number;
  jazzcashTID?: string;
  senderNumber?: string;
  recipientJazzCash: string;
  status: 'completed' | 'pending' | 'rejected';
  date: string;
  descriptionEn: string;
  descriptionUr: string;
  jobId?: string;
}

export interface AuditLog {
  id: string;
  actor: string;
  action: string;
  details: string;
  timestamp: string;
}
