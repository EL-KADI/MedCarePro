// src/pages/medication-inventory-dispensing/components/MedicationSearchPanel.jsx
import React, { useState } from 'react';
import Icon from 'components/AppIcon';
import Button from 'components/ui/Button';
import Input from 'components/ui/Input';
import BarcodeScanner from './BarcodeScanner';

const MedicationSearchPanel = ({ language, onSearch, onFilterChange, filters }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showBarcodeScanner, setShowBarcodeScanner] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  const categories = [
    { value: 'all', label: { en: 'All Medications', ar: 'جميع الأدوية' } },
    { value: 'antibiotics', label: { en: 'Antibiotics', ar: 'المضادات الحيوية' } },
    { value: 'painkillers', label: { en: 'Pain Relief', ar: 'مسكنات الألم' } },
    { value: 'vitamins', label: { en: 'Vitamins & Supplements', ar: 'الفيتامينات والمكملات' } },
    { value: 'cardiac', label: { en: 'Cardiac Medications', ar: 'أدوية القلب' } },
    { value: 'diabetes', label: { en: 'Diabetes', ar: 'أدوية السكري' } },
    { value: 'respiratory', label: { en: 'Respiratory', ar: 'أدوية الجهاز التنفسي' } }
  ];

  const handleSearch = (value) => {
    setSearchTerm(value);
    onSearch?.(value);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    onFilterChange?.({ ...filters, category });
  };

  const handleBarcodeScan = (barcode) => {
    setSearchTerm(barcode);
    onSearch?.(barcode);
    setShowBarcodeScanner(false);
  };

  const handleFilterToggle = (filterType, value) => {
    const newFilters = { ...filters };
    if (filterType === 'expiryAlert') {
      newFilters.showExpiryAlerts = value;
    } else if (filterType === 'lowStock') {
      newFilters.showLowStock = value;
    }
    onFilterChange?.(newFilters);
  };

  return (
    <div className="bg-surface border-r border-secondary-200 h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-secondary-200">
        <h2 className="text-lg font-semibold text-text-primary mb-4">
          {language === 'en' ? 'Medication Search' : 'البحث عن الأدوية'}
        </h2>

        {/* Search Input */}
        <div className="space-y-3">
          <div className="relative">
            <Input
              type="text"
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder={language === 'en' ? 'Search medications...' : 'البحث عن الأدوية...'}
              className="pr-10 rtl:pl-10 rtl:pr-3"
            />
            <button
              onClick={() => setShowBarcodeScanner(true)}
              className="absolute right-2 rtl:left-2 rtl:right-auto top-1/2 transform -translate-y-1/2 p-1 text-text-secondary hover:text-primary transition-colors duration-200"
              title={language === 'en' ? 'Scan Barcode' : 'مسح الباركود'}
            >
              <Icon name="ScanLine" size={18} />
            </button>
          </div>

          {/* Quick Search Button */}
          <Button
            variant="outline"
            size="sm"
            fullWidth
            iconName="Search"
            onClick={() => handleSearch(searchTerm)}
          >
            {language === 'en' ? 'Search' : 'بحث'}
          </Button>
        </div>
      </div>

      {/* Categories */}
      <div className="p-4 border-b border-secondary-200">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-medium text-text-primary">
            {language === 'en' ? 'Categories' : 'الفئات'}
          </h3>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="p-1 text-text-secondary hover:text-primary transition-colors duration-200"
          >
            <Icon name={showFilters ? 'ChevronUp' : 'ChevronDown'} size={16} />
          </button>
        </div>

        <div className="space-y-2">
          {categories.map((category) => (
            <button
              key={category.value}
              onClick={() => handleCategoryChange(category.value)}
              className={`
                w-full text-left px-3 py-2 rounded-md text-sm transition-colors duration-200
                ${selectedCategory === category.value
                  ? 'bg-primary-50 text-primary border border-primary-200' :'text-text-secondary hover:text-text-primary hover:bg-secondary-50'
                }
              `}
            >
              {category.label[language]}
            </button>
          ))}
        </div>
      </div>

      {/* Filters */}
      {showFilters && (
        <div className="p-4 border-b border-secondary-200">
          <h3 className="text-sm font-medium text-text-primary mb-3">
            {language === 'en' ? 'Filters' : 'المرشحات'}
          </h3>
          
          <div className="space-y-3">
            {/* Expiry Alerts */}
            <label className="flex items-center space-x-3 rtl:space-x-reverse">
              <input
                type="checkbox"
                checked={filters?.showExpiryAlerts || false}
                onChange={(e) => handleFilterToggle('expiryAlert', e.target.checked)}
                className="rounded border-secondary-300 text-primary focus:ring-primary"
              />
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <Icon name="AlertTriangle" size={16} className="text-warning" />
                <span className="text-sm text-text-primary">
                  {language === 'en' ? 'Expiry Alerts' : 'تنبيهات انتهاء الصلاحية'}
                </span>
              </div>
            </label>

            {/* Low Stock */}
            <label className="flex items-center space-x-3 rtl:space-x-reverse">
              <input
                type="checkbox"
                checked={filters?.showLowStock || false}
                onChange={(e) => handleFilterToggle('lowStock', e.target.checked)}
                className="rounded border-secondary-300 text-primary focus:ring-primary"
              />
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <Icon name="TrendingDown" size={16} className="text-error" />
                <span className="text-sm text-text-primary">
                  {language === 'en' ? 'Low Stock' : 'المخزون المنخفض'}
                </span>
              </div>
            </label>
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="p-4 flex-1">
        <h3 className="text-sm font-medium text-text-primary mb-3">
          {language === 'en' ? 'Quick Actions' : 'الإجراءات السريعة'}
        </h3>
        
        <div className="space-y-2">
          <Button
            variant="outline"
            size="sm"
            fullWidth
            iconName="Plus"
          >
            {language === 'en' ? 'Add Medication' : 'إضافة دواء'}
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            fullWidth
            iconName="Upload"
          >
            {language === 'en' ? 'Bulk Import' : 'استيراد مجمع'}
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            fullWidth
            iconName="FileText"
          >
            {language === 'en' ? 'Generate Report' : 'إنشاء تقرير'}
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            fullWidth
            iconName="Printer"
          >
            {language === 'en' ? 'Print Labels' : 'طباعة التسميات'}
          </Button>
        </div>
      </div>

      {/* Barcode Scanner Modal */}
      <BarcodeScanner
        isOpen={showBarcodeScanner}
        onClose={() => setShowBarcodeScanner(false)}
        onScan={handleBarcodeScan}
        language={language}
      />
    </div>
  );
};

export default MedicationSearchPanel;