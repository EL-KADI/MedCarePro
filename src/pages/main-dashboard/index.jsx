import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from 'components/AppIcon';
import { useNavigation } from 'components/ui/NavigationHeader';
import RecentActivity from './components/RecentActivity';
import SummaryCard from './components/SummaryCard';
import UpcomingAppointments from './components/UpcomingAppointments';
import MedicationExpiryWarnings from './components/MedicationExpiryWarnings';

const MainDashboard = () => {
  const navigate = useNavigate();
  const { language } = useNavigation();
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const summaryData = [
    {
      id: 'patients-today',
      title: { en: 'Patients Today', ar: 'المرضى اليوم' },
      value: 127,
      change: { value: 12, type: 'increase' },
      icon: 'Users',
      color: 'primary',
      description: { en: 'Total visits today', ar: 'إجمالي الزيارات اليوم' },
      route: '/patient-records-management'
    },
    {
      id: 'medication-alerts',
      title: { en: 'Medication Alerts', ar: 'تنبيهات الأدوية' },
      value: 8,
      change: { value: 3, type: 'increase' },
      icon: 'AlertTriangle',
      color: 'warning',
      description: { en: 'Low stock & expiring', ar: 'مخزون منخفض ومنتهي الصلاحية' },
      route: '/medication-inventory-dispensing'
    },
    {
      id: 'staff-attendance',
      title: { en: 'Staff Present', ar: 'الموظفون الحاضرون' },
      value: 45,
      change: { value: 2, type: 'decrease' },
      icon: 'UserCheck',
      color: 'accent',
      description: { en: 'Out of 47 total staff', ar: 'من أصل 47 موظف' },
      route: '/personnel-attendance-tracking'
    },
    {
      id: 'pending-reviews',
      title: { en: 'Pending Reviews', ar: 'المراجعات المعلقة' },
      value: 23,
      change: { value: 5, type: 'increase' },
      icon: 'Clock',
      color: 'secondary',
      description: { en: 'Awaiting medical review', ar: 'في انتظار المراجعة الطبية' },
      route: '/reports-analytics-dashboard'
    }
  ];

  const quickActions = [
    {
      id: 'new-patient',
      title: { en: 'New Patient Visit', ar: 'زيارة مريض جديد' },
      description: { en: 'Register new patient visit', ar: 'تسجيل زيارة مريض جديد' },
      icon: 'UserPlus',
      color: 'primary',
      route: '/patient-records-management'
    },
    {
      id: 'dispense-medication',
      title: { en: 'Dispense Medication', ar: 'صرف دواء' },
      description: { en: 'Quick medication dispensing', ar: 'صرف سريع للأدوية' },
      icon: 'Pill',
      color: 'accent',
      route: '/medication-inventory-dispensing'
    },
    {
      id: 'record-attendance',
      title: { en: 'Record Attendance', ar: 'تسجيل الحضور' },
      description: { en: 'Mark staff attendance', ar: 'تسجيل حضور الموظفين' },
      icon: 'CheckSquare',
      color: 'secondary',
      route: '/personnel-attendance-tracking'
    },
    {
      id: 'register-personnel',
      title: { en: 'Register Personnel', ar: 'تسجيل موظف' },
      description: { en: 'Add new staff member', ar: 'إضافة موظف جديد' },
      icon: 'UserPlus',
      color: 'primary',
      route: '/personnel-attendance-tracking'
    }
  ];

  const handleCardClick = (route) => {
    navigate(route);
  };

  const handleQuickAction = (actionId, route) => {
    console.log(`Quick action: ${actionId}`);
    navigate(route);
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString(language === 'ar' ? 'ar-SA' : 'en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString(language === 'ar' ? 'ar-SA' : 'en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-background pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div className="mb-4 lg:mb-0">
              <h1 className="text-3xl font-bold text-text-primary mb-2">
                {language === 'en' ? 'Medical Point Dashboard' : 'لوحة تحكم النقطة الطبية'}
              </h1>
              <p className="text-text-secondary">
                {language === 'en' ?'Comprehensive healthcare management overview' :'نظرة عامة شاملة على إدارة الرعاية الصحية'
                }
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-6 rtl:space-x-reverse">
              <div className="text-right rtl:text-left">
                <div className="text-2xl font-bold text-primary">
                  {formatTime(currentTime)}
                </div>
                <div className="text-sm text-text-secondary">
                  {formatDate(currentTime)}
                </div>
              </div>
              
              <button className="flex items-center space-x-2 rtl:space-x-reverse px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-700 transition-colors duration-200">
                <Icon name="ScanLine" size={20} />
                <span className="text-sm font-medium">
                  {language === 'en' ? 'Scan Barcode' : 'مسح الباركود'}
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Summary Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
          {summaryData.map((item) => (
            <SummaryCard
              key={item.id}
              data={item}
              language={language}
              onClick={() => handleCardClick(item.route)}
            />
          ))}
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-8">
          <div className="xl:col-span-2">
            <RecentActivity language={language} />
          </div>

          {/* Quick Actions Panel */}
          <div className="space-y-6">
            <div className="card p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-text-primary">
                  {language === 'en' ? 'Quick Actions' : 'الإجراءات السريعة'}
                </h3>
                <Icon name="Zap" size={20} className="text-primary" />
              </div>
              
              <div className="space-y-3">
                {quickActions.map((action) => (
                  <button
                    key={action.id}
                    onClick={() => handleQuickAction(action.id, action.route)}
                    className="w-full flex items-center space-x-3 rtl:space-x-reverse p-4 rounded-lg border border-secondary-200 hover:border-primary-300 hover:bg-primary-50 transition-all duration-200 group"
                  >
                    <div className={`
                      w-10 h-10 rounded-lg flex items-center justify-center
                      ${action.color === 'primary' ? 'bg-primary-100 text-primary group-hover:bg-primary' : ''}
                      ${action.color === 'accent' ? 'bg-accent-100 text-accent group-hover:bg-accent' : ''}
                      ${action.color === 'secondary' ? 'bg-secondary-100 text-secondary group-hover:bg-secondary' : ''}
                      group-hover:text-white transition-colors duration-200
                    `}>
                      <Icon name={action.icon} size={20} />
                    </div>
                    <div className="flex-1 text-left rtl:text-right">
                      <div className="font-medium text-text-primary group-hover:text-primary transition-colors duration-200">
                        {action.title[language]}
                      </div>
                      <div className="text-sm text-text-secondary">
                        {action.description[language]}
                      </div>
                    </div>
                    <Icon name="ChevronRight" size={16} className="text-text-secondary group-hover:text-primary transition-colors duration-200" />
                  </button>
                ))}
              </div>
            </div>

            {/* Emergency Contact */}
            <div className="card p-6 border-error-200 bg-error-50">
              <div className="flex items-center space-x-3 rtl:space-x-reverse mb-4">
                <div className="w-10 h-10 bg-error rounded-lg flex items-center justify-center">
                  <Icon name="Phone" size={20} className="text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-error">
                    {language === 'en' ? 'Emergency Contact' : 'اتصال الطوارئ'}
                  </h4>
                  <p className="text-sm text-error">
                    {language === 'en' ? '24/7 Medical Emergency' : 'طوارئ طبية 24/7'}
                  </p>
                </div>
              </div>
              <button className="w-full bg-error text-white py-3 rounded-md font-semibold hover:bg-red-700 transition-colors duration-200">
                {language === 'en' ? 'Call 911' : 'اتصل 911'}
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Section - Appointments and Medication Warnings */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          <UpcomingAppointments language={language} />
          <MedicationExpiryWarnings language={language} />
        </div>
      </div>
    </div>
  );
};

export default MainDashboard;