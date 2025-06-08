import React from 'react';
import Icon from 'components/AppIcon';

const FilterPanel = ({
  selectedDateRange,
  setSelectedDateRange,
  selectedDepartment,
  setSelectedDepartment,
  selectedReportType,
  setSelectedReportType,
  language
}) => {
  const dateRangeOptions = [
    { value: 'today', label: { en: 'Today', ar: 'اليوم' } },
    { value: 'yesterday', label: { en: 'Yesterday', ar: 'أمس' } },
    { value: 'last7days', label: { en: 'Last 7 Days', ar: 'آخر 7 أيام' } },
    { value: 'last30days', label: { en: 'Last 30 Days', ar: 'آخر 30 يوم' } },
    { value: 'thisMonth', label: { en: 'This Month', ar: 'هذا الشهر' } },
    { value: 'lastMonth', label: { en: 'Last Month', ar: 'الشهر الماضي' } },
    { value: 'thisYear', label: { en: 'This Year', ar: 'هذا العام' } },
    { value: 'custom', label: { en: 'Custom Range', ar: 'نطاق مخصص' } }
  ];

  const departmentOptions = [
    { value: 'all', label: { en: 'All Departments', ar: 'جميع الأقسام' } },
    { value: 'emergency', label: { en: 'Emergency', ar: 'الطوارئ' } },
    { value: 'surgery', label: { en: 'Surgery', ar: 'الجراحة' } },
    { value: 'pharmacy', label: { en: 'Pharmacy', ar: 'الصيدلية' } },
    { value: 'laboratory', label: { en: 'Laboratory', ar: 'المختبر' } },
    { value: 'administration', label: { en: 'Administration', ar: 'الإدارة' } }
  ];

  const reportTypeOptions = [
    { value: 'overview', label: { en: 'Overview', ar: 'نظرة عامة' } },
    { value: 'detailed', label: { en: 'Detailed Analysis', ar: 'تحليل مفصل' } },
    { value: 'compliance', label: { en: 'Compliance Report', ar: 'تقرير الامتثال' } },
    { value: 'financial', label: { en: 'Financial Summary', ar: 'ملخص مالي' } },
    { value: 'operational', label: { en: 'Operational Metrics', ar: 'المقاييس التشغيلية' } }
  ];

  return (
    <div className="card p-6 mb-8">
      <div className="flex items-center mb-4">
        <Icon name="Filter" size={20} className="text-primary mr-2 rtl:ml-2 rtl:mr-0" />
        <h2 className="text-lg font-semibold text-text-primary">
          {language === 'en' ? 'Report Filters' : 'مرشحات التقرير'}
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Date Range Filter */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            {language === 'en' ? 'Date Range' : 'النطاق الزمني'}
          </label>
          <select
            value={selectedDateRange}
            onChange={(e) => setSelectedDateRange(e.target.value)}
            className="input-field"
          >
            {dateRangeOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label[language]}
              </option>
            ))}
          </select>
        </div>

        {/* Department Filter */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            {language === 'en' ? 'Department' : 'القسم'}
          </label>
          <select
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
            className="input-field"
          >
            {departmentOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label[language]}
              </option>
            ))}
          </select>
        </div>

        {/* Report Type Filter */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            {language === 'en' ? 'Report Type' : 'نوع التقرير'}
          </label>
          <select
            value={selectedReportType}
            onChange={(e) => setSelectedReportType(e.target.value)}
            className="input-field"
          >
            {reportTypeOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label[language]}
              </option>
            ))}
          </select>
        </div>

        {/* Quick Actions */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            {language === 'en' ? 'Quick Actions' : 'إجراءات سريعة'}
          </label>
          <div className="flex space-x-2 rtl:space-x-reverse">
            <button className="flex-1 btn-secondary text-xs py-2">
              <Icon name="RefreshCw" size={14} className="mr-1 rtl:ml-1 rtl:mr-0" />
              {language === 'en' ? 'Refresh' : 'تحديث'}
            </button>
            <button className="flex-1 btn-secondary text-xs py-2">
              <Icon name="RotateCcw" size={14} className="mr-1 rtl:ml-1 rtl:mr-0" />
              {language === 'en' ? 'Reset' : 'إعادة تعيين'}
            </button>
          </div>
        </div>
      </div>

      {/* Advanced Filters Toggle */}
      <div className="mt-4 pt-4 border-t border-secondary-200">
        <button className="flex items-center text-sm text-primary hover:text-primary-700 transition-colors duration-200">
          <Icon name="Settings" size={16} className="mr-2 rtl:ml-2 rtl:mr-0" />
          {language === 'en' ? 'Advanced Filters' : 'مرشحات متقدمة'}
          <Icon name="ChevronDown" size={16} className="ml-1 rtl:mr-1 rtl:ml-0" />
        </button>
      </div>
    </div>
  );
};

export default FilterPanel;