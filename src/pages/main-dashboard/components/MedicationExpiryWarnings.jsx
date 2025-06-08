import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const MedicationExpiryWarnings = ({ language }) => {
  const [filterType, setFilterType] = useState('all');

  const medications = [
    {
      id: 1,
      name: { en: 'Paracetamol 500mg', ar: 'باراسيتامول 500 مجم' },
      barcode: 'MED001234',
      batchNumber: 'BTH2024001',
      currentStock: 45,
      minStock: 50,
      expiryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
      supplier: { en: 'PharmaCorp Ltd', ar: 'شركة فارماكورب المحدودة' },
      location: 'A-12-03',
      alertType: 'expiring',
      priority: 'high'
    },
    {
      id: 2,
      name: { en: 'Amoxicillin 250mg', ar: 'أموكسيسيلين 250 مجم' },
      barcode: 'MED002345',
      batchNumber: 'BTH2024002',
      currentStock: 12,
      minStock: 25,
      expiryDate: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000), // 45 days from now
      supplier: { en: 'MediSupply Co', ar: 'شركة ميدي سبلاي' },
      location: 'B-08-15',
      alertType: 'low-stock',
      priority: 'urgent'
    },
    {
      id: 3,
      name: { en: 'Ibuprofen 400mg', ar: 'إيبوبروفين 400 مجم' },
      barcode: 'MED003456',
      batchNumber: 'BTH2024003',
      currentStock: 8,
      minStock: 30,
      expiryDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
      supplier: { en: 'HealthMeds Inc', ar: 'شركة هيلث ميدز' },
      location: 'A-15-07',
      alertType: 'both',
      priority: 'urgent'
    },
    {
      id: 4,
      name: { en: 'Aspirin 75mg', ar: 'أسبرين 75 مجم' },
      barcode: 'MED004567',
      batchNumber: 'BTH2024004',
      currentStock: 78,
      minStock: 40,
      expiryDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 days from now
      supplier: { en: 'Global Pharma', ar: 'الصيدلة العالمية' },
      location: 'C-05-12',
      alertType: 'expiring',
      priority: 'normal'
    },
    {
      id: 5,
      name: { en: 'Metformin 500mg', ar: 'ميتفورمين 500 مجم' },
      barcode: 'MED005678',
      batchNumber: 'BTH2024005',
      currentStock: 15,
      minStock: 35,
      expiryDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000), // 60 days from now
      supplier: { en: 'DiabetesCare Ltd', ar: 'شركة رعاية السكري المحدودة' },
      location: 'B-12-09',
      alertType: 'low-stock',
      priority: 'high'
    }
  ];

  const getAlertTypeColor = (alertType) => {
    const colorMap = {
      'expiring': 'text-warning bg-warning-50 border-warning-200',
      'low-stock': 'text-error bg-error-50 border-error-200',
      'both': 'text-red-700 bg-red-100 border-red-300'
    };
    return colorMap[alertType] || colorMap['expiring'];
  };

  const getPriorityIcon = (priority) => {
    const iconMap = {
      urgent: 'AlertTriangle',
      high: 'AlertCircle',
      normal: 'Info'
    };
    return iconMap[priority] || iconMap.normal;
  };

  const getPriorityColor = (priority) => {
    const colorMap = {
      urgent: 'text-error',
      high: 'text-warning',
      normal: 'text-secondary'
    };
    return colorMap[priority] || colorMap.normal;
  };

  const formatExpiryDate = (date) => {
    return date.toLocaleDateString(language === 'ar' ? 'ar-SA' : 'en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getDaysUntilExpiry = (date) => {
    const now = new Date();
    const diffInDays = Math.ceil((date - now) / (1000 * 60 * 60 * 24));
    return diffInDays;
  };

  const getAlertTypeLabel = (alertType) => {
    const labels = {
      'expiring': { en: 'Expiring Soon', ar: 'ينتهي قريباً' },
      'low-stock': { en: 'Low Stock', ar: 'مخزون منخفض' },
      'both': { en: 'Critical Alert', ar: 'تنبيه حرج' }
    };
    return labels[alertType][language];
  };

  const filteredMedications = filterType === 'all' 
    ? medications 
    : medications.filter(med => med.alertType === filterType || (filterType === 'critical' && med.priority === 'urgent'));

  const filterOptions = [
    { value: 'all', label: { en: 'All Alerts', ar: 'جميع التنبيهات' } },
    { value: 'expiring', label: { en: 'Expiring', ar: 'منتهية الصلاحية' } },
    { value: 'low-stock', label: { en: 'Low Stock', ar: 'مخزون منخفض' } },
    { value: 'critical', label: { en: 'Critical', ar: 'حرجة' } }
  ];

  return (
    <div className="card p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3 rtl:space-x-reverse">
          <h3 className="text-lg font-semibold text-text-primary">
            {language === 'en' ? 'Medication Alerts' : 'تنبيهات الأدوية'}
          </h3>
          <div className="w-6 h-6 bg-error rounded-full flex items-center justify-center">
            <span className="text-xs font-bold text-white">
              {medications.filter(med => med.priority === 'urgent').length}
            </span>
          </div>
        </div>
        
        <div className="flex items-center space-x-3 rtl:space-x-reverse">
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="text-sm border border-secondary-300 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            {filterOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label[language]}
              </option>
            ))}
          </select>
          
          <button className="text-primary hover:text-primary-700 text-sm font-medium transition-colors duration-200">
            {language === 'en' ? 'Manage Inventory' : 'إدارة المخزون'}
          </button>
        </div>
      </div>

      <div className="space-y-3 max-h-80 overflow-y-auto">
        {filteredMedications.map((medication) => (
          <div
            key={medication.id}
            className="p-4 rounded-lg border border-secondary-200 hover:border-primary-300 transition-all duration-200 group"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-start space-x-3 rtl:space-x-reverse flex-1">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${getPriorityColor(medication.priority)}`}>
                  <Icon name={getPriorityIcon(medication.priority)} size={16} />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 rtl:space-x-reverse mb-1">
                    <h4 className="font-medium text-text-primary group-hover:text-primary transition-colors duration-200">
                      {medication.name[language]}
                    </h4>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getAlertTypeColor(medication.alertType)}`}>
                      {getAlertTypeLabel(medication.alertType)}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 text-xs text-text-secondary mb-2">
                    <span className="flex items-center space-x-1 rtl:space-x-reverse">
                      <Icon name="Hash" size={12} />
                      <span className="font-mono">{medication.barcode}</span>
                    </span>
                    <span className="flex items-center space-x-1 rtl:space-x-reverse">
                      <Icon name="Package" size={12} />
                      <span>{medication.batchNumber}</span>
                    </span>
                    <span className="flex items-center space-x-1 rtl:space-x-reverse">
                      <Icon name="MapPin" size={12} />
                      <span>{medication.location}</span>
                    </span>
                    <span className="flex items-center space-x-1 rtl:space-x-reverse">
                      <Icon name="Building" size={12} />
                      <span>{medication.supplier[language]}</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-3 border-t border-secondary-200">
              <div>
                <div className="text-xs text-text-secondary mb-1">
                  {language === 'en' ? 'Current Stock' : 'المخزون الحالي'}
                </div>
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <span className={`font-semibold ${medication.currentStock < medication.minStock ? 'text-error' : 'text-accent'}`}>
                    {medication.currentStock}
                  </span>
                  <span className="text-xs text-text-secondary">
                    / {medication.minStock} {language === 'en' ? 'min' : 'أدنى'}
                  </span>
                </div>
              </div>

              <div>
                <div className="text-xs text-text-secondary mb-1">
                  {language === 'en' ? 'Expires In' : 'ينتهي خلال'}
                </div>
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <span className={`font-semibold ${getDaysUntilExpiry(medication.expiryDate) <= 7 ? 'text-error' : getDaysUntilExpiry(medication.expiryDate) <= 14 ? 'text-warning' : 'text-accent'}`}>
                    {getDaysUntilExpiry(medication.expiryDate)} {language === 'en' ? 'days' : 'يوم'}
                  </span>
                  <span className="text-xs text-text-secondary">
                    ({formatExpiryDate(medication.expiryDate)})
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between mt-3 pt-3 border-t border-secondary-200">
              <div className="flex space-x-2 rtl:space-x-reverse">
                <button className="text-xs bg-primary text-white px-3 py-1 rounded-md hover:bg-primary-700 transition-colors duration-200">
                  {language === 'en' ? 'Reorder' : 'إعادة طلب'}
                </button>
                <button className="text-xs bg-secondary-100 text-secondary-700 px-3 py-1 rounded-md hover:bg-secondary-200 transition-colors duration-200">
                  {language === 'en' ? 'Details' : 'التفاصيل'}
                </button>
              </div>
              
              <span className={`text-xs font-medium ${getPriorityColor(medication.priority)}`}>
                {language === 'en' 
                  ? medication.priority.charAt(0).toUpperCase() + medication.priority.slice(1)
                  : medication.priority === 'urgent' ? 'عاجل' : medication.priority === 'high' ? 'عالي' : 'عادي'
                } {language === 'en' ? 'Priority' : 'الأولوية'}
              </span>
            </div>
          </div>
        ))}
      </div>

      {filteredMedications.length === 0 && (
        <div className="text-center py-8">
          <Icon name="CheckCircle" size={48} className="text-accent mx-auto mb-4" />
          <p className="text-text-secondary">
            {language === 'en' ? 'No medication alerts at this time' : 'لا توجد تنبيهات أدوية في الوقت الحالي'}
          </p>
        </div>
      )}
    </div>
  );
};

export default MedicationExpiryWarnings;