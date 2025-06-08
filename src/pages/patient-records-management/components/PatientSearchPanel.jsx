import React from 'react';
import Icon from 'components/AppIcon';

const PatientSearchPanel = ({ searchFilters, setSearchFilters, onScanBarcode, language }) => {
  const hospitals = [
    "King Fahd Medical City",
    "Prince Sultan Medical Center", 
    "National Guard Hospital",
    "King Abdulaziz Medical City"
  ];

  const clinics = [
    "Internal Medicine",
    "Pediatrics",
    "Orthopedics",
    "Gynecology",
    "Dermatology",
    "Cardiology",
    "Emergency",
    "Surgery"
  ];

  const statuses = [
    { value: "Active", label: { en: "Active", ar: "نشط" } },
    { value: "Scheduled", label: { en: "Scheduled", ar: "مجدول" } },
    { value: "Completed", label: { en: "Completed", ar: "مكتمل" } },
    { value: "Cancelled", label: { en: "Cancelled", ar: "ملغي" } }
  ];

  const handleFilterChange = (key, value) => {
    setSearchFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const clearFilters = () => {
    setSearchFilters({
      name: '',
      barcode: '',
      hospital: '',
      clinic: '',
      visitDateFrom: '',
      visitDateTo: '',
      status: ''
    });
  };

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-secondary-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-text-primary">
            {language === 'en' ? 'Search & Filter' : 'البحث والتصفية'}
          </h2>
          <button
            onClick={clearFilters}
            className="text-sm text-text-secondary hover:text-text-primary transition-colors duration-200"
          >
            {language === 'en' ? 'Clear All' : 'مسح الكل'}
          </button>
        </div>

        {/* Barcode Scanner */}
        <div className="mb-4">
          <button
            onClick={onScanBarcode}
            className="w-full flex items-center justify-center space-x-2 rtl:space-x-reverse p-3 bg-primary-50 text-primary border border-primary-200 rounded-md hover:bg-primary-100 transition-colors duration-200"
          >
            <Icon name="ScanLine" size={20} />
            <span className="font-medium">
              {language === 'en' ? 'Scan Patient Barcode' : 'مسح باركود المريض'}
            </span>
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Patient Name Search */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            {language === 'en' ? 'Patient Name' : 'اسم المريض'}
          </label>
          <div className="relative">
            <Icon 
              name="Search" 
              size={18} 
              className="absolute left-3 rtl:right-3 rtl:left-auto top-1/2 transform -translate-y-1/2 text-text-secondary" 
            />
            <input
              type="text"
              value={searchFilters.name}
              onChange={(e) => handleFilterChange('name', e.target.value)}
              placeholder={language === 'en' ? 'Search by name...' : 'البحث بالاسم...'}
              className="input-field pl-10 rtl:pr-10 rtl:pl-3"
            />
          </div>
        </div>

        {/* Barcode Search */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            {language === 'en' ? 'Barcode ID' : 'رقم الباركود'}
          </label>
          <div className="relative">
            <Icon 
              name="Hash" 
              size={18} 
              className="absolute left-3 rtl:right-3 rtl:left-auto top-1/2 transform -translate-y-1/2 text-text-secondary" 
            />
            <input
              type="text"
              value={searchFilters.barcode}
              onChange={(e) => handleFilterChange('barcode', e.target.value)}
              placeholder={language === 'en' ? 'Enter barcode...' : 'أدخل الباركود...'}
              className="input-field pl-10 rtl:pr-10 rtl:pl-3"
            />
          </div>
        </div>

        {/* Hospital Filter */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            {language === 'en' ? 'Hospital' : 'المستشفى'}
          </label>
          <select
            value={searchFilters.hospital}
            onChange={(e) => handleFilterChange('hospital', e.target.value)}
            className="input-field"
          >
            <option value="">
              {language === 'en' ? 'All Hospitals' : 'جميع المستشفيات'}
            </option>
            {hospitals.map(hospital => (
              <option key={hospital} value={hospital}>{hospital}</option>
            ))}
          </select>
        </div>

        {/* Clinic Filter */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            {language === 'en' ? 'Clinic' : 'العيادة'}
          </label>
          <select
            value={searchFilters.clinic}
            onChange={(e) => handleFilterChange('clinic', e.target.value)}
            className="input-field"
          >
            <option value="">
              {language === 'en' ? 'All Clinics' : 'جميع العيادات'}
            </option>
            {clinics.map(clinic => (
              <option key={clinic} value={clinic}>{clinic}</option>
            ))}
          </select>
        </div>

        {/* Visit Date Range */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            {language === 'en' ? 'Visit Date Range' : 'نطاق تاريخ الزيارة'}
          </label>
          <div className="space-y-2">
            <input
              type="date"
              value={searchFilters.visitDateFrom}
              onChange={(e) => handleFilterChange('visitDateFrom', e.target.value)}
              className="input-field"
              placeholder={language === 'en' ? 'From date' : 'من تاريخ'}
            />
            <input
              type="date"
              value={searchFilters.visitDateTo}
              onChange={(e) => handleFilterChange('visitDateTo', e.target.value)}
              className="input-field"
              placeholder={language === 'en' ? 'To date' : 'إلى تاريخ'}
            />
          </div>
        </div>

        {/* Status Filter */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            {language === 'en' ? 'Status' : 'الحالة'}
          </label>
          <select
            value={searchFilters.status}
            onChange={(e) => handleFilterChange('status', e.target.value)}
            className="input-field"
          >
            <option value="">
              {language === 'en' ? 'All Statuses' : 'جميع الحالات'}
            </option>
            {statuses.map(status => (
              <option key={status.value} value={status.value}>
                {status.label[language]}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default PatientSearchPanel;