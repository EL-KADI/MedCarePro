import React, { useState, useEffect } from 'react';
import { useNavigation } from 'components/ui/NavigationHeader';
import Icon from 'components/AppIcon';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { format } from 'date-fns';

// Components
import ReportCard from './components/ReportCard';
import FilterPanel from './components/FilterPanel';
import ExportPanel from './components/ExportPanel';
import ChartWidget from './components/ChartWidget';

const ReportsAnalyticsDashboard = () => {
  const { language } = useNavigation();
  const [selectedDateRange, setSelectedDateRange] = useState('last30days');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [selectedReportType, setSelectedReportType] = useState('overview');
  const [isExportPanelOpen, setIsExportPanelOpen] = useState(false);
  const [refreshInterval, setRefreshInterval] = useState(30000); // 30 seconds
  const [lastUpdated, setLastUpdated] = useState(new Date());

  // Mock data for analytics
  const kpiData = [
    {
      id: 'total-patients',
      title: { en: 'Total Patients', ar: 'إجمالي المرضى' },
      value: 1247,
      change: 12.5,
      trend: 'up',
      icon: 'Users',
      color: 'primary'
    },
    {
      id: 'medications-dispensed',
      title: { en: 'Medications Dispensed', ar: 'الأدوية المصروفة' },
      value: 3456,
      change: -2.3,
      trend: 'down',
      icon: 'Pill',
      color: 'accent'
    },
    {
      id: 'staff-attendance',
      title: { en: 'Staff Attendance', ar: 'حضور الموظفين' },
      value: 94.2,
      change: 3.1,
      trend: 'up',
      icon: 'UserCheck',
      color: 'success',
      suffix: '%'
    },
    {
      id: 'inventory-turnover',
      title: { en: 'Inventory Turnover', ar: 'دوران المخزون' },
      value: 78.9,
      change: 5.7,
      trend: 'up',
      icon: 'Package',
      color: 'warning',
      suffix: '%'
    }
  ];

  const patientFlowData = [
    { date: '2024-01-01', visits: 45, newPatients: 12, followUps: 33 },
    { date: '2024-01-02', visits: 52, newPatients: 15, followUps: 37 },
    { date: '2024-01-03', visits: 38, newPatients: 8, followUps: 30 },
    { date: '2024-01-04', visits: 61, newPatients: 18, followUps: 43 },
    { date: '2024-01-05', visits: 47, newPatients: 11, followUps: 36 },
    { date: '2024-01-06', visits: 55, newPatients: 16, followUps: 39 },
    { date: '2024-01-07', visits: 42, newPatients: 9, followUps: 33 }
  ];

  const medicationUsageData = [
    { name: 'Antibiotics', value: 35, color: '#2563EB' },
    { name: 'Pain Relief', value: 28, color: '#059669' },
    { name: 'Vitamins', value: 20, color: '#F59E0B' },
    { name: 'Cardiac', value: 12, color: '#DC2626' },
    { name: 'Others', value: 5, color: '#64748B' }
  ];

  const attendanceData = [
    { department: 'Emergency', present: 24, absent: 2, total: 26 },
    { department: 'Surgery', present: 18, absent: 1, total: 19 },
    { department: 'Pharmacy', present: 12, absent: 0, total: 12 },
    { department: 'Administration', present: 15, absent: 3, total: 18 },
    { department: 'Laboratory', present: 8, absent: 1, total: 9 }
  ];

  const predefinedReports = [
    {
      id: 'regulatory-compliance',
      title: { en: 'Regulatory Compliance', ar: 'الامتثال التنظيمي' },
      description: { en: 'Monthly compliance report for health authorities', ar: 'تقرير الامتثال الشهري للسلطات الصحية' },
      icon: 'FileCheck',
      frequency: 'Monthly',
      lastGenerated: '2024-01-15'
    },
    {
      id: 'financial-summary',
      title: { en: 'Financial Summary', ar: 'الملخص المالي' },
      description: { en: 'Revenue and cost analysis report', ar: 'تقرير تحليل الإيرادات والتكاليف' },
      icon: 'DollarSign',
      frequency: 'Weekly',
      lastGenerated: '2024-01-20'
    },
    {
      id: 'operational-audit',
      title: { en: 'Operational Audit', ar: 'التدقيق التشغيلي' },
      description: { en: 'Comprehensive operational performance review', ar: 'مراجعة شاملة للأداء التشغيلي' },
      icon: 'Search',
      frequency: 'Quarterly',
      lastGenerated: '2024-01-01'
    },
    {
      id: 'inventory-report',
      title: { en: 'Inventory Report', ar: 'تقرير المخزون' },
      description: { en: 'Stock levels and expiry tracking', ar: 'مستويات المخزون وتتبع انتهاء الصلاحية' },
      icon: 'Package',
      frequency: 'Daily',
      lastGenerated: '2024-01-22'
    }
  ];

  // Auto-refresh functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdated(new Date());
    }, refreshInterval);

    return () => clearInterval(interval);
  }, [refreshInterval]);

  const handleExport = (format) => {
    console.log(`Exporting report in ${format} format`);
    // Export logic would go here
  };

  const handlePrint = () => {
    window.print();
  };

  const generateReport = (reportId) => {
    console.log(`Generating report: ${reportId}`);
    // Report generation logic would go here
  };

  return (
    <div className="min-h-screen bg-background pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div className="mb-4 lg:mb-0">
              <h1 className="text-3xl font-bold text-text-primary mb-2">
                {language === 'en' ? 'Reports & Analytics Dashboard' : 'لوحة التقارير والتحليلات'}
              </h1>
              <p className="text-text-secondary">
                {language === 'en' ?'Comprehensive data insights and compliance reporting across all operational modules' :'رؤى شاملة للبيانات وتقارير الامتثال عبر جميع الوحدات التشغيلية'
                }
              </p>
            </div>
            <div className="flex items-center space-x-3 rtl:space-x-reverse">
              <div className="text-sm text-text-secondary">
                {language === 'en' ? 'Last updated:' : 'آخر تحديث:'}
                <span className="ml-1 rtl:mr-1 rtl:ml-0 font-medium">
                  {format(lastUpdated, 'HH:mm:ss')}
                </span>
              </div>
              <button
                onClick={() => setIsExportPanelOpen(true)}
                className="btn-primary flex items-center space-x-2 rtl:space-x-reverse"
              >
                <Icon name="Download" size={18} />
                <span>{language === 'en' ? 'Export' : 'تصدير'}</span>
              </button>
              <button
                onClick={handlePrint}
                className="btn-secondary flex items-center space-x-2 rtl:space-x-reverse"
              >
                <Icon name="Printer" size={18} />
                <span>{language === 'en' ? 'Print' : 'طباعة'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Filter Panel */}
        <FilterPanel
          selectedDateRange={selectedDateRange}
          setSelectedDateRange={setSelectedDateRange}
          selectedDepartment={selectedDepartment}
          setSelectedDepartment={setSelectedDepartment}
          selectedReportType={selectedReportType}
          setSelectedReportType={setSelectedReportType}
          language={language}
        />

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {kpiData.map((kpi) => (
            <ReportCard
              key={kpi.id}
              title={kpi.title[language]}
              value={kpi.value}
              change={kpi.change}
              trend={kpi.trend}
              icon={kpi.icon}
              color={kpi.color}
              suffix={kpi.suffix}
              language={language}
            />
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Charts Section */}
          <div className="lg:col-span-2 space-y-8">
            {/* Patient Flow Chart */}
            <ChartWidget
              title={language === 'en' ? 'Patient Flow Analysis' : 'تحليل تدفق المرضى'}
              description={language === 'en' ? 'Daily patient visits and new registrations' : 'الزيارات اليومية للمرضى والتسجيلات الجديدة'}
            >
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={patientFlowData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="date" 
                    tickFormatter={(value) => format(new Date(value), 'MMM dd')}
                  />
                  <YAxis />
                  <Tooltip 
                    labelFormatter={(value) => format(new Date(value), 'MMM dd, yyyy')}
                  />
                  <Legend />
                  <Bar 
                    dataKey="visits" 
                    fill="var(--color-primary)" 
                    name={language === 'en' ? 'Total Visits' : 'إجمالي الزيارات'}
                  />
                  <Bar 
                    dataKey="newPatients" 
                    fill="var(--color-accent)" 
                    name={language === 'en' ? 'New Patients' : 'مرضى جدد'}
                  />
                </BarChart>
              </ResponsiveContainer>
            </ChartWidget>

            {/* Attendance Trends */}
            <ChartWidget
              title={language === 'en' ? 'Staff Attendance by Department' : 'حضور الموظفين حسب القسم'}
              description={language === 'en' ? 'Current attendance rates across departments' : 'معدلات الحضور الحالية عبر الأقسام'}
            >
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={attendanceData} layout="horizontal">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="department" type="category" width={100} />
                  <Tooltip />
                  <Legend />
                  <Bar 
                    dataKey="present" 
                    fill="var(--color-success)" 
                    name={language === 'en' ? 'Present' : 'حاضر'}
                  />
                  <Bar 
                    dataKey="absent" 
                    fill="var(--color-error)" 
                    name={language === 'en' ? 'Absent' : 'غائب'}
                  />
                </BarChart>
              </ResponsiveContainer>
            </ChartWidget>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Medication Usage Pie Chart */}
            <ChartWidget
              title={language === 'en' ? 'Medication Usage' : 'استخدام الأدوية'}
              description={language === 'en' ? 'Distribution by category' : 'التوزيع حسب الفئة'}
            >
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={medicationUsageData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {medicationUsageData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </ChartWidget>

            {/* Quick Stats */}
            <div className="card p-6">
              <h3 className="text-lg font-semibold text-text-primary mb-4">
                {language === 'en' ? 'Quick Statistics' : 'إحصائيات سريعة'}
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-text-secondary">
                    {language === 'en' ? 'Average Wait Time' : 'متوسط وقت الانتظار'}
                  </span>
                  <span className="font-semibold text-text-primary">12 min</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-text-secondary">
                    {language === 'en' ? 'Bed Occupancy' : 'إشغال الأسرة'}
                  </span>
                  <span className="font-semibold text-text-primary">87%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-text-secondary">
                    {language === 'en' ? 'Critical Stock Items' : 'عناصر المخزون الحرجة'}
                  </span>
                  <span className="font-semibold text-error">5</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-text-secondary">
                    {language === 'en' ? 'Patient Satisfaction' : 'رضا المرضى'}
                  </span>
                  <span className="font-semibold text-success">4.8/5</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Predefined Reports Section */}
        <div className="card p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-text-primary">
              {language === 'en' ? 'Predefined Report Templates' : 'قوالب التقارير المحددة مسبقاً'}
            </h2>
            <button className="btn-secondary flex items-center space-x-2 rtl:space-x-reverse">
              <Icon name="Plus" size={18} />
              <span>{language === 'en' ? 'Create Template' : 'إنشاء قالب'}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {predefinedReports.map((report) => (
              <div key={report.id} className="border border-secondary-200 rounded-lg p-4 hover:shadow-elevation-1 transition-shadow duration-200">
                <div className="flex items-start justify-between mb-3">
                  <div className="w-10 h-10 bg-primary-50 rounded-lg flex items-center justify-center">
                    <Icon name={report.icon} size={20} className="text-primary" />
                  </div>
                  <button
                    onClick={() => generateReport(report.id)}
                    className="text-primary hover:text-primary-700 transition-colors duration-200"
                  >
                    <Icon name="Play" size={16} />
                  </button>
                </div>
                <h3 className="font-semibold text-text-primary mb-2">
                  {report.title[language]}
                </h3>
                <p className="text-sm text-text-secondary mb-3">
                  {report.description[language]}
                </p>
                <div className="flex items-center justify-between text-xs text-text-secondary">
                  <span>{report.frequency}</span>
                  <span>
                    {language === 'en' ? 'Last:' : 'آخر:'} {format(new Date(report.lastGenerated), 'MMM dd')}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Export Panel */}
        <ExportPanel
          isOpen={isExportPanelOpen}
          onClose={() => setIsExportPanelOpen(false)}
          onExport={handleExport}
          language={language}
        />
      </div>
    </div>
  );
};

export default ReportsAnalyticsDashboard;