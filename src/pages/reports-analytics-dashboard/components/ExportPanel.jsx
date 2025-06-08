import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const ExportPanel = ({ isOpen, onClose, onExport, language }) => {
  const [selectedFormat, setSelectedFormat] = useState('pdf');
  const [includeCharts, setIncludeCharts] = useState(true);
  const [includeRawData, setIncludeRawData] = useState(false);
  const [emailReport, setEmailReport] = useState(false);
  const [emailAddress, setEmailAddress] = useState('');

  const exportFormats = [
    { value: 'pdf', label: 'PDF', icon: 'FileText', description: { en: 'Formatted report with charts', ar: 'تقرير منسق مع الرسوم البيانية' } },
    { value: 'excel', label: 'Excel', icon: 'FileSpreadsheet', description: { en: 'Spreadsheet with data tables', ar: 'جدول بيانات مع جداول البيانات' } },
    { value: 'csv', label: 'CSV', icon: 'Database', description: { en: 'Raw data in CSV format', ar: 'بيانات خام بتنسيق CSV' } },
    { value: 'json', label: 'JSON', icon: 'Code', description: { en: 'Structured data for APIs', ar: 'بيانات منظمة لواجهات برمجة التطبيقات' } }
  ];

  const handleExport = () => {
    const exportOptions = {
      format: selectedFormat,
      includeCharts,
      includeRawData,
      emailReport,
      emailAddress: emailReport ? emailAddress : null
    };
    
    onExport(exportOptions);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-1020 p-4">
      <div className="bg-surface rounded-lg shadow-elevation-3 w-full max-w-md">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-secondary-200">
          <h3 className="text-lg font-semibold text-text-primary">
            {language === 'en' ? 'Export Report' : 'تصدير التقرير'}
          </h3>
          <button
            onClick={onClose}
            className="text-text-secondary hover:text-text-primary transition-colors duration-200"
          >
            <Icon name="X" size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Export Format Selection */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-3">
              {language === 'en' ? 'Export Format' : 'تنسيق التصدير'}
            </label>
            <div className="grid grid-cols-2 gap-3">
              {exportFormats.map((format) => (
                <button
                  key={format.value}
                  onClick={() => setSelectedFormat(format.value)}
                  className={`
                    p-3 rounded-lg border-2 transition-all duration-200 text-left
                    ${selectedFormat === format.value
                      ? 'border-primary bg-primary-50 text-primary' :'border-secondary-200 hover:border-secondary-300 text-text-secondary'
                    }
                  `}
                >
                  <div className="flex items-center space-x-2 rtl:space-x-reverse mb-1">
                    <Icon name={format.icon} size={16} />
                    <span className="font-medium">{format.label}</span>
                  </div>
                  <p className="text-xs">
                    {format.description[language]}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Export Options */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-3">
              {language === 'en' ? 'Export Options' : 'خيارات التصدير'}
            </label>
            <div className="space-y-3">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={includeCharts}
                  onChange={(e) => setIncludeCharts(e.target.checked)}
                  className="rounded border-secondary-300 text-primary focus:ring-primary-500"
                />
                <span className="ml-2 rtl:mr-2 rtl:ml-0 text-sm text-text-primary">
                  {language === 'en' ? 'Include charts and graphs' : 'تضمين الرسوم البيانية والمخططات'}
                </span>
              </label>
              
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={includeRawData}
                  onChange={(e) => setIncludeRawData(e.target.checked)}
                  className="rounded border-secondary-300 text-primary focus:ring-primary-500"
                />
                <span className="ml-2 rtl:mr-2 rtl:ml-0 text-sm text-text-primary">
                  {language === 'en' ? 'Include raw data tables' : 'تضمين جداول البيانات الخام'}
                </span>
              </label>
              
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={emailReport}
                  onChange={(e) => setEmailReport(e.target.checked)}
                  className="rounded border-secondary-300 text-primary focus:ring-primary-500"
                />
                <span className="ml-2 rtl:mr-2 rtl:ml-0 text-sm text-text-primary">
                  {language === 'en' ? 'Email report after export' : 'إرسال التقرير بالبريد الإلكتروني بعد التصدير'}
                </span>
              </label>
            </div>
          </div>

          {/* Email Address Input */}
          {emailReport && (
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                {language === 'en' ? 'Email Address' : 'عنوان البريد الإلكتروني'}
              </label>
              <input
                type="email"
                value={emailAddress}
                onChange={(e) => setEmailAddress(e.target.value)}
                placeholder={language === 'en' ? 'Enter email address' : 'أدخل عنوان البريد الإلكتروني'}
                className="input-field"
              />
            </div>
          )}

          {/* File Size Estimate */}
          <div className="bg-secondary-50 rounded-lg p-3">
            <div className="flex items-center space-x-2 rtl:space-x-reverse text-sm text-text-secondary">
              <Icon name="Info" size={16} />
              <span>
                {language === 'en' ?'Estimated file size: 2.5 MB' :'حجم الملف المقدر: 2.5 ميجابايت'
                }
              </span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end space-x-3 rtl:space-x-reverse p-6 border-t border-secondary-200">
          <button
            onClick={onClose}
            className="btn-secondary"
          >
            {language === 'en' ? 'Cancel' : 'إلغاء'}
          </button>
          <button
            onClick={handleExport}
            className="btn-primary flex items-center space-x-2 rtl:space-x-reverse"
          >
            <Icon name="Download" size={16} />
            <span>{language === 'en' ? 'Export' : 'تصدير'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExportPanel;