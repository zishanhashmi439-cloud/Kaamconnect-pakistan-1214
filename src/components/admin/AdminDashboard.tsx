import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { t } from '../../utils/translations';
import { ServiceCategory, WorkerProfile, CityData, PlatformSettings } from '../../types';
import { ServiceIcon } from '../ServiceIcon';
import {
  Users,
  HardHat,
  ShieldCheck,
  CheckCircle,
  XCircle,
  Plus,
  Trash2,
  Edit2,
  Settings,
  AlertTriangle,
  Building2,
  TrendingUp,
  MapPin,
  Clock,
  Layers,
  FileText,
  Wallet,
  ArrowDownLeft,
  CheckCircle2,
  PhoneCall,
  Copy,
  Check
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const {
    lang,
    workers,
    bookings,
    categories,
    cities,
    settings,
    complaints,
    adminJazzCashEarningsPKR,
    customerBalancePKR,
    workerBalancePKR,
    walletTransactions,
    verifyWorker,
    suspendWorker,
    addCategory,
    deleteCategory,
    addSubcategory,
    addCity,
    addAreaToCity,
    updateSettings,
    resolveComplaint
  } = useApp();

  const [activeAdminTab, setActiveAdminTab] = useState<
    'overview' | 'workers' | 'categories' | 'bookings' | 'cities' | 'complaints' | 'settings' | 'jazzcash'
  >('overview');

  // New Category State
  const [newCatNameEn, setNewCatNameEn] = useState('');
  const [newCatNameUr, setNewCatNameUr] = useState('');
  const [newCatCode, setNewCatCode] = useState('V');
  const [newCatIcon, setNewCatIcon] = useState('Hammer');
  const [newCatDescEn, setNewCatDescEn] = useState('');
  const [newCatDescUr, setNewCatDescUr] = useState('');
  const [isAddingCat, setIsAddingCat] = useState(false);

  // New Subcategory Modal State
  const [targetCategoryForSub, setTargetCategoryForSub] = useState<ServiceCategory | null>(null);
  const [newSubNameEn, setNewSubNameEn] = useState('');
  const [newSubNameUr, setNewSubNameUr] = useState('');
  const [newSubDescEn, setNewSubDescEn] = useState('');
  const [newSubDescUr, setNewSubDescUr] = useState('');
  const [newSubPrice, setNewSubPrice] = useState<number>(2000);
  const [newSubModel, setNewSubModel] = useState<any>('visit');

  // New City & Area State
  const [newCityEn, setNewCityEn] = useState('');
  const [newCityUr, setNewCityUr] = useState('');
  const [targetCityIdForArea, setTargetCityIdForArea] = useState(cities[0]?.id || 'lahore');
  const [newAreaName, setNewAreaName] = useState('');

  // Settings State
  const [appName, setAppName] = useState(settings.appName);
  const [adminName, setAdminName] = useState(settings.adminName || 'Zishan Hashmi (App Owner / Admin)');
  const [adminJazzCashNumber, setAdminJazzCashNumber] = useState(settings.adminJazzCashNumber || '+923084306705');
  const [commission, setCommission] = useState(settings.commissionPercentage || 10);
  const [serviceFee, setServiceFee] = useState(settings.baseServiceFeePKR);
  const [emergencySurcharge, setEmergencySurcharge] = useState(settings.emergencySurchargePKR);
  const [announcementEn, setAnnouncementEn] = useState(settings.announcementEn);
  const [announcementUr, setAnnouncementUr] = useState(settings.announcementUr);
  const [bannerActive, setBannerActive] = useState(settings.bannerActive);

  // Complaints state
  const [resolutionText, setResolutionText] = useState('');
  const [selectedCompId, setSelectedCompId] = useState<string | null>(null);

  // Metrics
  const totalWorkers = workers.length;
  const verifiedWorkers = workers.filter((w) => w.verified).length;
  const pendingWorkers = workers.filter((w) => !w.verified).length;
  const totalBookings = bookings.length;
  const completedBookings = bookings.filter((b) => b.status === 'completed');
  const platformGMVPKR = completedBookings.reduce((sum, b) => sum + (b.finalPricePKR || 0), 0);
  const estimatedCommissionPKR = Math.round((platformGMVPKR * settings.commissionPercentage) / 100);

  const handleCreateCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCatNameEn || !newCatCode) return;
    addCategory({
      code: newCatCode.toUpperCase(),
      nameEn: newCatNameEn,
      nameUr: newCatNameUr || newCatNameEn,
      iconName: newCatIcon,
      descriptionEn: newCatDescEn || 'Specialized home & construction service category.',
      descriptionUr: newCatDescUr || 'تعمیراتی اور گھریلو سروس کیٹیگری۔',
      subcategories: []
    });
    setNewCatNameEn('');
    setNewCatNameUr('');
    setNewCatDescEn('');
    setNewCatDescUr('');
    setIsAddingCat(false);
    alert('Category created successfully!');
  };

  const handleCreateSubcategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!targetCategoryForSub || !newSubNameEn) return;
    addSubcategory(targetCategoryForSub.id, {
      nameEn: newSubNameEn,
      nameUr: newSubNameUr || newSubNameEn,
      descriptionEn: newSubDescEn || 'Specialized work item',
      descriptionUr: newSubDescUr || 'کام کی تفصیل',
      typicalPricingModel: newSubModel,
      baseEstimatePKR: Number(newSubPrice)
    });
    setNewSubNameEn('');
    setNewSubNameUr('');
    setNewSubDescEn('');
    setNewSubDescUr('');
    setTargetCategoryForSub(null);
    alert('Trade subcategory added successfully!');
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings({
      appName,
      adminName,
      adminJazzCashNumber,
      commissionPercentage: Number(commission),
      baseServiceFeePKR: Number(serviceFee),
      emergencySurchargePKR: Number(emergencySurcharge),
      announcementEn,
      announcementUr,
      bannerActive
    });
    alert('Platform settings updated successfully.');
  };

  const handleCreateCity = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCityEn) return;
    addCity({
      nameEn: newCityEn,
      nameUr: newCityUr || newCityEn,
      areas: ['Main City Center', 'Model Town', 'Cantt'],
      active: true
    });
    setNewCityEn('');
    setNewCityUr('');
    alert(`City ${newCityEn} added to KaamConnect network.`);
  };

  const handleAddArea = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAreaName) return;
    addAreaToCity(targetCityIdForArea, newAreaName);
    setNewAreaName('');
    alert(`Area added successfully.`);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-slate-900">
            {lang === 'ur' ? 'ایڈمن کنٹرول پینل • کام کنیکٹ' : 'Super Admin Portal · KaamConnect Pakistan'}
          </h2>
          <p className="text-xs text-slate-500">
            Platform governance, worker CNIC approvals, dynamic trades, dispute resolution & commission settings.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200">
            Lahore Hub Active
          </span>
        </div>
      </div>

      {/* Navigation Sub-tabs */}
      <div className="flex items-center gap-1 overflow-x-auto pb-1 text-xs font-medium border-b border-slate-200">
        {[
          { id: 'overview', label: 'Platform Overview', icon: TrendingUp },
          { id: 'jazzcash', label: `JazzCash & 10% Fees (Rs. ${adminJazzCashEarningsPKR.toLocaleString()})`, icon: Wallet },
          { id: 'workers', label: `Worker Verification (${pendingWorkers})`, icon: HardHat },
          { id: 'categories', label: `Categories (A-U) (${categories.length})`, icon: Layers },
          { id: 'bookings', label: `All Bookings (${bookings.length})`, icon: FileText },
          { id: 'cities', label: `Cities & Areas (${cities.length})`, icon: MapPin },
          { id: 'complaints', label: `Complaints (${complaints.length})`, icon: AlertTriangle },
          { id: 'settings', label: 'Platform Settings', icon: Settings }
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveAdminTab(tab.id as any)}
              className={`px-3.5 py-2.5 rounded-xl whitespace-nowrap transition-colors flex items-center gap-1.5 min-h-[40px] ${
                activeAdminTab === tab.id
                  ? 'bg-slate-900 text-white font-semibold shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* VIEW 1: Overview */}
      {activeAdminTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs">
              <span className="text-[11px] text-slate-500 uppercase tracking-wider block">Registered Workers</span>
              <div className="text-2xl font-bold text-slate-900 tabular-nums mt-1">{totalWorkers}</div>
              <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-1">
                <span className="text-emerald-600 font-semibold">{verifiedWorkers} Verified</span>
                <span>·</span>
                <span className="text-amber-600 font-semibold">{pendingWorkers} Pending</span>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs">
              <span className="text-[11px] text-slate-500 uppercase tracking-wider block">Total Bookings</span>
              <div className="text-2xl font-bold text-slate-900 tabular-nums mt-1">{totalBookings}</div>
              <span className="text-[11px] text-slate-400 block mt-1">
                {completedBookings.length} completed orders
              </span>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs">
              <span className="text-[11px] text-slate-500 uppercase tracking-wider block">Completed GMV</span>
              <div className="text-2xl font-bold text-slate-900 tabular-nums mt-1">
                Rs. {platformGMVPKR.toLocaleString()}
              </div>
              <span className="text-[11px] text-emerald-600 font-semibold block mt-1">
                Transacted through platform
              </span>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs">
              <span className="text-[11px] text-slate-500 uppercase tracking-wider block">Platform Commission</span>
              <div className="text-2xl font-bold text-emerald-700 tabular-nums mt-1">
                Rs. {estimatedCommissionPKR.toLocaleString()}
              </div>
              <span className="text-[11px] text-slate-400 block mt-1">
                At {settings.commissionPercentage}% fee
              </span>
            </div>
          </div>

          {/* Quick verification alert */}
          {pendingWorkers > 0 && (
            <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
                <div>
                  <h4 className="text-xs font-bold text-amber-900">
                    {pendingWorkers} Worker Account(s) Awaiting CNIC Verification
                  </h4>
                  <p className="text-[11px] text-amber-700">
                    Review NADRA ID credentials before issuing the official KaamConnect Verified Badge.
                  </p>
                </div>
              </div>

              <button
                onClick={() => setActiveAdminTab('workers')}
                className="px-3.5 py-1.5 bg-amber-700 hover:bg-amber-800 text-white rounded-lg text-xs font-semibold shrink-0"
              >
                Review Now
              </button>
            </div>
          )}

          {/* Quick city launch status */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-3">
            <h3 className="text-sm font-bold text-slate-900">Active Expansion Cities in Pakistan</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {cities.map((city) => (
                <div key={city.id} className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-slate-900 block">{city.nameEn}</span>
                    <span className="text-[10px] text-slate-400">{city.areas.length} covered areas</span>
                  </div>
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* VIEW 2: Worker Verification */}
      {activeAdminTab === 'workers' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900">Worker Verification & Account Moderation</h3>
            <span className="text-xs text-slate-500">Only verified workers receive the green shield badge</span>
          </div>

          <div className="space-y-3">
            {workers.map((worker) => (
              <div
                key={worker.id}
                className="bg-white rounded-2xl border border-slate-200 p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xs"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={worker.photo}
                    alt={worker.name}
                    referrerPolicy="no-referrer"
                    className="w-12 h-12 rounded-xl object-cover border border-slate-200"
                  />
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <h4 className="text-xs font-bold text-slate-900">{worker.name}</h4>
                      {worker.verified ? (
                        <span className="text-[10px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md flex items-center gap-1">
                          <CheckCircle className="w-3 h-3 text-emerald-600" />
                          Verified
                        </span>
                      ) : (
                        <span className="text-[10px] font-semibold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-md">
                          Unverified
                        </span>
                      )}
                    </div>
                    <div className="text-[11px] text-slate-500 flex items-center gap-2">
                      <span>CNIC: <span className="font-mono text-slate-800">{worker.cnicNumber || 'Not provided'}</span></span>
                      <span>·</span>
                      <span>{worker.city}</span>
                      <span>·</span>
                      <span>Cat {worker.primaryCategoryCode}</span>
                    </div>
                  </div>
                </div>

                {/* Moderation actions */}
                <div className="flex items-center gap-2 self-end sm:self-auto">
                  {!worker.verified ? (
                    <button
                      onClick={() => {
                        verifyWorker(worker.id);
                        alert(`Verified badge issued to ${worker.name}.`);
                      }}
                      className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors"
                    >
                      <CheckCircle className="w-3.5 h-3.5" />
                      <span>Approve & Verify</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        suspendWorker(worker.id);
                        alert(`Suspended badge for ${worker.name}.`);
                      }}
                      className="px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors border border-rose-200"
                    >
                      <XCircle className="w-3.5 h-3.5" />
                      <span>Revoke / Suspend</span>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* VIEW 3: Dynamic Category & Subcategory Management */}
      {activeAdminTab === 'categories' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Dynamic Service Categories (A to U)</h3>
              <p className="text-xs text-slate-500">
                Add, customize, or delete categories and trades without redeploying code.
              </p>
            </div>
            <button
              onClick={() => setIsAddingCat(true)}
              className="px-3.5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Category</span>
            </button>
          </div>

          {/* New Category Form Modal */}
          {isAddingCat && (
            <form onSubmit={handleCreateCategory} className="p-5 bg-white rounded-2xl border border-slate-300 shadow-sm space-y-3">
              <h4 className="text-xs font-bold text-slate-900">Add New Category</h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">Code (Letter)</label>
                  <input
                    type="text"
                    required
                    value={newCatCode}
                    onChange={(e) => setNewCatCode(e.target.value)}
                    placeholder="e.g. V"
                    className="w-full text-xs text-slate-800 bg-slate-50 border border-slate-200 rounded-lg p-2 uppercase"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">Name (English)</label>
                  <input
                    type="text"
                    required
                    value={newCatNameEn}
                    onChange={(e) => setNewCatNameEn(e.target.value)}
                    placeholder="e.g. Solar & Renewable Energy"
                    className="w-full text-xs text-slate-800 bg-slate-50 border border-slate-200 rounded-lg p-2"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">Name (Urdu)</label>
                  <input
                    type="text"
                    dir="rtl"
                    value={newCatNameUr}
                    onChange={(e) => setNewCatNameUr(e.target.value)}
                    placeholder="سولر و متبادل توانائی"
                    className="w-full text-xs text-slate-800 bg-slate-50 border border-slate-200 rounded-lg p-2"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-700 text-white rounded-lg text-xs font-semibold"
                >
                  Create Category
                </button>
                <button
                  type="button"
                  onClick={() => setIsAddingCat(false)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg text-xs font-medium"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}

          {/* Categories List */}
          <div className="space-y-3">
            {categories.map((cat) => (
              <div key={cat.id} className="bg-white rounded-2xl border border-slate-200 p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center">
                      <ServiceIcon name={cat.iconName} className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">
                        {cat.code}. {cat.nameEn} ({cat.nameUr})
                      </h4>
                      <span className="text-[11px] text-slate-400">{cat.subcategories.length} sub-trades</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setTargetCategoryForSub(cat)}
                      className="px-2.5 py-1 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 rounded-lg"
                    >
                      + Add Trade
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`Delete Category ${cat.code}?`)) deleteCategory(cat.id);
                      }}
                      className="text-slate-400 hover:text-rose-600 p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Subcategories preview tags */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {cat.subcategories.map((sub) => (
                    <span
                      key={sub.id}
                      className="text-[11px] bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md font-medium"
                    >
                      {sub.nameEn} · ~Rs. {sub.baseEstimatePKR}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Add Subcategory Modal */}
          {targetCategoryForSub && (
            <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3">
              <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-xl">
                <h3 className="text-sm font-bold text-slate-900">
                  Add Sub-Trade to {targetCategoryForSub.nameEn}
                </h3>
                <form onSubmit={handleCreateSubcategory} className="space-y-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">Trade Title (English)</label>
                    <input
                      type="text"
                      required
                      value={newSubNameEn}
                      onChange={(e) => setNewSubNameEn(e.target.value)}
                      placeholder="e.g. Solar Geyser Repair"
                      className="w-full text-xs text-slate-800 bg-slate-50 border border-slate-200 rounded-lg p-2"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">Trade Title (Urdu)</label>
                    <input
                      type="text"
                      dir="rtl"
                      value={newSubNameUr}
                      onChange={(e) => setNewSubNameUr(e.target.value)}
                      placeholder="سولر گیزر مرمت"
                      className="w-full text-xs text-slate-800 bg-slate-50 border border-slate-200 rounded-lg p-2"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 mb-1">Pricing Model</label>
                      <select
                        value={newSubModel}
                        onChange={(e) => setNewSubModel(e.target.value)}
                        className="w-full text-xs text-slate-800 bg-slate-50 border border-slate-200 rounded-lg p-2"
                      >
                        <option value="visit">Per Visit</option>
                        <option value="daily">Daily</option>
                        <option value="sqft">Per Sqft</option>
                        <option value="project">Project</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 mb-1">Estimate (PKR)</label>
                      <input
                        type="number"
                        value={newSubPrice}
                        onChange={(e) => setNewSubPrice(Number(e.target.value))}
                        className="w-full text-xs text-slate-800 bg-slate-50 border border-slate-200 rounded-lg p-2"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-2">
                    <button
                      type="submit"
                      className="flex-1 py-2 bg-emerald-700 text-white rounded-lg text-xs font-semibold"
                    >
                      Save Trade
                    </button>
                    <button
                      type="button"
                      onClick={() => setTargetCategoryForSub(null)}
                      className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg text-xs"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}

      {/* VIEW 4: Cities & Service Areas */}
      {activeAdminTab === 'cities' && (
        <div className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Add new City */}
            <form onSubmit={handleCreateCity} className="bg-white rounded-2xl p-5 border border-slate-200 space-y-3">
              <h4 className="text-xs font-bold text-slate-900">Add New Pakistani City</h4>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  required
                  value={newCityEn}
                  onChange={(e) => setNewCityEn(e.target.value)}
                  placeholder="City Name (e.g. Sialkot)"
                  className="text-xs text-slate-800 bg-slate-50 border border-slate-200 rounded-lg p-2"
                />
                <input
                  type="text"
                  dir="rtl"
                  value={newCityUr}
                  onChange={(e) => setNewCityUr(e.target.value)}
                  placeholder="شہر کا نام (سیالکوٹ)"
                  className="text-xs text-slate-800 bg-slate-50 border border-slate-200 rounded-lg p-2"
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2 bg-slate-900 text-white rounded-lg text-xs font-semibold"
              >
                Add City
              </button>
            </form>

            {/* Add Area to existing City */}
            <form onSubmit={handleAddArea} className="bg-white rounded-2xl p-5 border border-slate-200 space-y-3">
              <h4 className="text-xs font-bold text-slate-900">Add Service Area to City</h4>
              <div className="grid grid-cols-2 gap-2">
                <select
                  value={targetCityIdForArea}
                  onChange={(e) => setTargetCityIdForArea(e.target.value)}
                  className="text-xs text-slate-800 bg-slate-50 border border-slate-200 rounded-lg p-2"
                >
                  {cities.map((c) => (
                    <option key={c.id} value={c.id}>{c.nameEn}</option>
                  ))}
                </select>
                <input
                  type="text"
                  required
                  value={newAreaName}
                  onChange={(e) => setNewAreaName(e.target.value)}
                  placeholder="Area (e.g. DHA Phase 9)"
                  className="text-xs text-slate-800 bg-slate-50 border border-slate-200 rounded-lg p-2"
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2 bg-emerald-700 text-white rounded-lg text-xs font-semibold"
              >
                Add Area
              </button>
            </form>
          </div>

          {/* List of active cities */}
          <div className="space-y-3">
            {cities.map((c) => (
              <div key={c.id} className="bg-white rounded-2xl border border-slate-200 p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-slate-900">{c.nameEn} ({c.nameUr})</h4>
                  <span className="text-[11px] text-emerald-700 font-semibold">{c.areas.length} service sectors</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {c.areas.map((a, i) => (
                    <span key={i} className="text-[11px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md">
                      {a}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* VIEW 5: Complaints and Dispute Resolution */}
      {activeAdminTab === 'complaints' && (
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-slate-900">Customer Complaints & Disputes</h3>

          {complaints.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-10 text-center text-xs text-slate-500">
              Zero active complaints. Platform quality is high!
            </div>
          ) : (
            <div className="space-y-3">
              {complaints.map((comp) => (
                <div key={comp.id} className="bg-white rounded-2xl border border-slate-200 p-4 space-y-3 shadow-xs">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-900">{comp.issueType}</span>
                        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-md ${
                          comp.status === 'resolved' ? 'bg-emerald-50 text-emerald-800' : 'bg-rose-50 text-rose-800'
                        }`}>
                          {comp.status}
                        </span>
                      </div>
                      <span className="text-[11px] text-slate-400">
                        Customer: {comp.customerName} · Worker: {comp.workerName} · Ticket #{comp.id}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                    "{comp.description}"
                  </p>

                  {comp.resolutionNotes ? (
                    <div className="text-xs text-emerald-800 bg-emerald-50 p-2.5 rounded-xl">
                      <span className="font-semibold block mb-0.5">Admin Resolution:</span>
                      <span>{comp.resolutionNotes}</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 pt-1">
                      <input
                        type="text"
                        placeholder="Type resolution notes (e.g. Warning issued, 15% refunded)..."
                        value={selectedCompId === comp.id ? resolutionText : ''}
                        onChange={(e) => {
                          setSelectedCompId(comp.id);
                          setResolutionText(e.target.value);
                        }}
                        className="flex-1 text-xs text-slate-800 bg-slate-50 border border-slate-200 rounded-lg p-2"
                      />
                      <button
                        onClick={() => {
                          if (resolutionText) {
                            resolveComplaint(comp.id, resolutionText);
                            setResolutionText('');
                            setSelectedCompId(null);
                          }
                        }}
                        className="px-3.5 py-2 bg-emerald-700 text-white rounded-lg text-xs font-semibold shrink-0"
                      >
                        Resolve
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* VIEW 6: Platform Settings */}
      {activeAdminTab === 'settings' && (
        <form onSubmit={handleSaveSettings} className="bg-white rounded-3xl p-6 border border-slate-200 space-y-4 max-w-2xl">
          <h3 className="text-sm font-bold text-slate-900">Platform Settings & Fee Structure</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Application Name</label>
              <input
                type="text"
                value={appName}
                onChange={(e) => setAppName(e.target.value)}
                className="w-full text-xs text-slate-800 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 font-bold"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Commission Rate (%)</label>
              <input
                type="number"
                value={commission}
                onChange={(e) => setCommission(Number(e.target.value))}
                className="w-full text-xs text-slate-800 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 font-bold"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Base Platform Fee (PKR)</label>
              <input
                type="number"
                value={serviceFee}
                onChange={(e) => setServiceFee(Number(e.target.value))}
                className="w-full text-xs text-slate-800 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Emergency Surcharge (PKR)</label>
              <input
                type="number"
                value={emergencySurcharge}
                onChange={(e) => setEmergencySurcharge(Number(e.target.value))}
                className="w-full text-xs text-slate-800 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Owner / Admin JazzCash Mobile Number
              </label>
              <input
                type="text"
                value={adminJazzCashNumber}
                onChange={(e) => setAdminJazzCashNumber(e.target.value)}
                placeholder="+923084306705"
                className="w-full text-xs text-slate-800 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 font-bold"
              />
              <span className="text-[10px] text-slate-500 block mt-1">Direct receiving account for 10% platform commission</span>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Owner / Super Admin Title & Name
              </label>
              <input
                type="text"
                value={adminName}
                onChange={(e) => setAdminName(e.target.value)}
                placeholder="Zishan Hashmi (App Owner / Admin)"
                className="w-full text-xs text-slate-800 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 font-bold"
              />
              <span className="text-[10px] text-slate-500 block mt-1">Displayed in JazzCash payment slips & receipt modal</span>
            </div>
          </div>

          <div className="space-y-3 pt-2">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Announcement Banner (English)</label>
              <input
                type="text"
                value={announcementEn}
                onChange={(e) => setAnnouncementEn(e.target.value)}
                className="w-full text-xs text-slate-800 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Announcement Banner (Urdu)</label>
              <input
                type="text"
                dir="rtl"
                value={announcementUr}
                onChange={(e) => setAnnouncementUr(e.target.value)}
                className="w-full text-xs text-slate-800 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5"
              />
            </div>

            <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 pt-1 cursor-pointer">
              <input
                type="checkbox"
                checked={bannerActive}
                onChange={(e) => setBannerActive(e.target.checked)}
                className="w-4 h-4 text-emerald-600 rounded"
              />
              <span>Display top announcement banner on mobile & web</span>
            </label>
          </div>

          <button
            type="submit"
            className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold transition-colors"
          >
            Save Platform Settings
          </button>
        </form>
      )}

      {/* VIEW 7: Bookings Oversight */}
      {activeAdminTab === 'bookings' && (
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-slate-900">All System Bookings & Quotations</h3>
          <div className="space-y-3">
            {bookings.map((job) => (
              <div key={job.id} className="bg-white rounded-2xl border border-slate-200 p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs text-slate-400">#{job.id}</span>
                    <span className="font-bold text-xs text-slate-900">{job.title}</span>
                  </div>
                  <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md">
                    {job.status}
                  </span>
                </div>
                <div className="text-[11px] text-slate-500 flex flex-wrap gap-2">
                  <span>Customer: {job.customerName} ({job.customerPhone})</span>
                  <span>·</span>
                  <span>Worker: {job.selectedWorkerName || 'Open Broadcast'}</span>
                  <span>·</span>
                  <span>Price: Rs. {job.finalPricePKR || 'Pending'}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* VIEW 8: JazzCash Financials & 10% Commission Revenue (Owner: Zishan Hashmi) */}
      {activeAdminTab === 'jazzcash' && (
        <div className="space-y-6">
          {/* JazzCash Owner Official Banner */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-red-700 via-rose-700 to-amber-600 text-white shadow-xl p-6 border border-amber-400/40">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="flex items-start sm:items-center gap-5">
                <div className="w-20 h-20 rounded-2xl overflow-hidden bg-black/20 shrink-0 border-2 border-white/30 shadow-md">
                  <img
                    src="/src/assets/images/jazzcash_payment_banner_1793287429388.jpg"
                    alt="JazzCash Official Gateway"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-400 text-slate-950">
                      Direct Owner JazzCash Gateway
                    </span>
                    <span className="text-xs text-amber-200 font-semibold">10% Platform Fee Active</span>
                  </div>
                  <h3 className="text-xl font-black text-white">
                    {settings.adminName || 'Zishan Hashmi (Owner & Super Admin)'}
                  </h3>
                  <div className="flex flex-wrap items-center gap-3 text-xs text-amber-100">
                    <span className="flex items-center gap-1 font-mono font-bold text-sm bg-black/20 px-2.5 py-1 rounded-lg">
                      <PhoneCall className="w-3.5 h-3.5 text-amber-300" />
                      {settings.adminJazzCashNumber || '+923084306705'}
                    </span>
                    <span>·</span>
                    <span>Status: Official Verified Receiving Account</span>
                  </div>
                </div>
              </div>

              <div className="bg-white/15 backdrop-blur-md p-4 rounded-2xl border border-white/20 text-right">
                <span className="text-[11px] text-amber-200 uppercase tracking-wider font-semibold block">
                  Total Direct Commission Earned
                </span>
                <span className="text-3xl font-black text-white tabular-nums block mt-0.5">
                  Rs. {adminJazzCashEarningsPKR.toLocaleString()}
                </span>
                <span className="text-[10px] text-amber-100 block mt-1">
                  Transferred directly into 0308-4306705
                </span>
              </div>
            </div>
          </div>

          {/* Wallet Financial Pools */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs">
              <span className="text-[11px] text-slate-500 uppercase tracking-wider block">Customer Balances Pool</span>
              <div className="text-2xl font-bold text-slate-900 tabular-nums mt-1">
                Rs. {customerBalancePKR.toLocaleString()}
              </div>
              <span className="text-[10px] text-slate-400 block mt-1">
                Funded by customer JazzCash top-ups
              </span>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs">
              <span className="text-[11px] text-slate-500 uppercase tracking-wider block">Worker Balances Pool</span>
              <div className="text-2xl font-bold text-slate-900 tabular-nums mt-1">
                Rs. {workerBalancePKR.toLocaleString()}
              </div>
              <span className="text-[10px] text-slate-400 block mt-1">
                Funded by technician & contractor top-ups
              </span>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs">
              <span className="text-[11px] text-slate-500 uppercase tracking-wider block">Platform Commission Rate</span>
              <div className="text-2xl font-bold text-emerald-700 tabular-nums mt-1">
                {settings.commissionPercentage}% Direct
              </div>
              <span className="text-[10px] text-emerald-600 font-medium block mt-1">
                Auto-deducted upon job completion
              </span>
            </div>
          </div>

          {/* JazzCash Transaction Ledger */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  {lang === 'ur' ? 'جاز کیش ٹرانزیکشن لیجر اور کمیشن ریکارڈ' : 'JazzCash Real-Time Transaction Ledger'}
                </h3>
                <p className="text-xs text-slate-500">
                  All balance top-ups and 10% platform commission credits to 0308-4306705.
                </p>
              </div>
              <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-3 py-1 rounded-lg">
                {walletTransactions.length} Transactions
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-700">
                <thead className="bg-slate-50 text-[11px] font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-200">
                  <tr>
                    <th className="px-4 py-3">TID / Transaction ID</th>
                    <th className="px-4 py-3">User & Role</th>
                    <th className="px-4 py-3">Type</th>
                    <th className="px-4 py-3">Recipient JazzCash</th>
                    <th className="px-4 py-3 text-right">Amount (PKR)</th>
                    <th className="px-4 py-3 text-center">Status</th>
                    <th className="px-4 py-3">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {walletTransactions.map((tx) => (
                    <tr key={tx.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="px-4 py-3 font-mono font-bold text-slate-900">
                        {tx.jazzcashTID || tx.id}
                      </td>
                      <td className="px-4 py-3">
                        <div className="font-semibold text-slate-900">{tx.userName}</div>
                        <span className="text-[10px] uppercase font-bold text-slate-400">{tx.userRole}</span>
                      </td>
                      <td className="px-4 py-3">
                        {tx.type === 'commission_deduction' ? (
                          <span className="inline-flex items-center gap-1 text-[11px] text-amber-700 font-semibold bg-amber-50 px-2 py-0.5 rounded-md">
                            10% Commission
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-[11px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded-md">
                            Wallet Top-Up
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3 font-mono text-slate-600">
                        {tx.recipientJazzCash}
                      </td>
                      <td className="px-4 py-3 text-right font-bold text-slate-900 tabular-nums">
                        {tx.type === 'commission_deduction' ? '+' : '+'}Rs. {tx.amountPKR.toLocaleString()}
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          {tx.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-[11px] text-slate-400 tabular-nums">
                        {tx.date}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
