import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const RecentActivity = ({ language }) => {
  const [activeTab, setActiveTab] = useState('all');

  const activities = [
    {
      id: 1,
      type: 'patient-visit',
      title: { en: 'New Patient Visit', ar: 'زيارة مريض جديد' },
      description: { en: 'Ahmed Hassan registered for general consultation', ar: 'أحمد حسن مسجل للاستشارة العامة' },
      timestamp: new Date(Date.now() - 300000),
      icon: 'UserPlus',
      color: 'primary',
      user: { en: 'Dr. Sarah Johnson', ar: 'د. سارة جونسون' },
      barcode: 'PT001234'
    },
    {
      id: 2,
      type: 'medication-dispensed',
      title: { en: 'Medication Dispensed', ar: 'تم صرف الدواء' },
      description: { en: 'Paracetamol 500mg dispensed to Soldier ID: SLD789', ar: 'تم صرف باراسيتامول 500 مجم للجندي رقم: SLD789' },
      timestamp: new Date(Date.now() - 600000),
      icon: 'Pill',
      color: 'accent',
      user: { en: 'Pharmacist Ali', ar: 'الصيدلي علي' },
      barcode: 'MED456789'
    },
    {
      id: 3,
      type: 'attendance-marked',
      title: { en: 'Attendance Marked', ar: 'تم تسجيل الحضور' },
      description: { en: 'Morning shift attendance recorded for Alpha Company', ar: 'تم تسجيل حضور الوردية الصباحية لسرية ألفا' },
      timestamp: new Date(Date.now() - 900000),
      icon: 'CheckSquare',
      color: 'secondary',
      user: { en: 'Sgt. Mohammed', ar: 'الرقيب محمد' },
      barcode: 'ATT123456'
    },
    {
      id: 4,
      type: 'inventory-alert',
      title: { en: 'Low Stock Alert', ar: 'تنبيه مخزون منخفض' },
      description: { en: 'Antibiotics running low - 15 units remaining', ar: 'المضادات الحيوية تنفد - 15 وحدة متبقية' },
      timestamp: new Date(Date.now() - 1200000),
      icon: 'AlertTriangle',
      color: 'warning',
      user: { en: 'System Alert', ar: 'تنبيه النظام' },
      barcode: 'INV789012'
    },
    {
      id: 5,
      type: 'patient-review',
      title: { en: 'Medical Review Completed', ar: 'تمت المراجعة الطبية' },
      description: { en: 'Follow-up review completed for Patient ID: PT567', ar: 'تمت مراجعة المتابعة للمريض رقم: PT567' },
      timestamp: new Date(Date.now() - 1800000),
      icon: 'FileCheck',
      color: 'primary',
      user: { en: 'Dr. Ahmed Khalil', ar: 'د. أحمد خليل' },
      barcode: 'REV345678'
    },
    {
      id: 6,
      type: 'emergency-alert',
      title: { en: 'Emergency Protocol Activated', ar: 'تم تفعيل بروتوكول الطوارئ' },
      description: { en: 'Emergency response team dispatched to Building C', ar: 'تم إرسال فريق الاستجابة للطوارئ إلى المبنى ج' },
      timestamp: new Date(Date.now() - 2400000),
      icon: 'Siren',
      color: 'error',
      user: { en: 'Emergency System', ar: 'نظام الطوارئ' },
      barcode: 'EMG901234'
    }
  ];

  const tabs = [
    { id: 'all', label: { en: 'All Activities', ar: 'جميع الأنشطة' }, icon: 'Activity' },
    { id: 'patient-visit', label: { en: 'Patients', ar: 'المرضى' }, icon: 'Users' },
    { id: 'medication-dispensed', label: { en: 'Pharmacy', ar: 'الصيدلية' }, icon: 'Pill' },
    { id: 'attendance-marked', label: { en: 'Attendance', ar: 'الحضور' }, icon: 'CheckSquare' }
  ];

  const getColorClasses = (color) => {
    const colorMap = {
      primary: 'bg-primary-100 text-primary',
      accent: 'bg-accent-100 text-accent',
      warning: 'bg-warning-100 text-warning',
      error: 'bg-error-100 text-error',
      secondary: 'bg-secondary-100 text-secondary'
    };
    return colorMap[color] || colorMap.primary;
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now - timestamp) / (1000 * 60));
    
    if (diffInMinutes < 1) {
      return language === 'en' ? 'Just now' : 'الآن';
    } else if (diffInMinutes < 60) {
      return language === 'en' 
        ? `${diffInMinutes} min ago` 
        : `منذ ${diffInMinutes} دقيقة`;
    } else {
      const diffInHours = Math.floor(diffInMinutes / 60);
      return language === 'en' 
        ? `${diffInHours}h ago` 
        : `منذ ${diffInHours} ساعة`;
    }
  };

  const filteredActivities = activeTab === 'all' 
    ? activities 
    : activities.filter(activity => activity.type === activeTab);

  return (
    <div className="card p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-text-primary">
          {language === 'en' ? 'Recent Activity' : 'النشاط الأخير'}
        </h3>
        <button className="text-primary hover:text-primary-700 text-sm font-medium transition-colors duration-200">
          {language === 'en' ? 'View All' : 'عرض الكل'}
        </button>
      </div>

      {/* Activity Tabs */}
      <div className="flex space-x-1 rtl:space-x-reverse mb-6 bg-secondary-50 p-1 rounded-lg">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`
              flex items-center space-x-2 rtl:space-x-reverse px-3 py-2 rounded-md text-sm font-medium
              transition-all duration-200 flex-1 justify-center
              ${activeTab === tab.id
                ? 'bg-surface text-primary shadow-sm'
                : 'text-text-secondary hover:text-text-primary'
              }
            `}
          >
            <Icon name={tab.icon} size={16} />
            <span className="hidden sm:inline">{tab.label[language]}</span>
          </button>
        ))}
      </div>

      {/* Activity List */}
      <div className="space-y-4 max-h-96 overflow-y-auto">
        {filteredActivities.map((activity) => (
          <div
            key={activity.id}
            className="flex items-start space-x-4 rtl:space-x-reverse p-4 rounded-lg hover:bg-secondary-50 transition-colors duration-200 group"
          >
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${getColorClasses(activity.color)}`}>
              <Icon name={activity.icon} size={20} />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="font-medium text-text-primary group-hover:text-primary transition-colors duration-200">
                    {activity.title[language]}
                  </h4>
                  <p className="text-sm text-text-secondary mt-1 line-clamp-2">
                    {activity.description[language]}
                  </p>
                  
                  <div className="flex items-center space-x-4 rtl:space-x-reverse mt-2 text-xs text-text-secondary">
                    <span className="flex items-center space-x-1 rtl:space-x-reverse">
                      <Icon name="User" size={12} />
                      <span>{activity.user[language]}</span>
                    </span>
                    <span className="flex items-center space-x-1 rtl:space-x-reverse">
                      <Icon name="Hash" size={12} />
                      <span className="font-mono">{activity.barcode}</span>
                    </span>
                  </div>
                </div>

                <div className="text-xs text-text-secondary ml-4 rtl:mr-4 rtl:ml-0 flex-shrink-0">
                  {formatTimeAgo(activity.timestamp)}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredActivities.length === 0 && (
        <div className="text-center py-8">
          <Icon name="Activity" size={48} className="text-secondary-300 mx-auto mb-4" />
          <p className="text-text-secondary">
            {language === 'en' ? 'No recent activities found' : 'لم يتم العثور على أنشطة حديثة'}
          </p>
        </div>
      )}
    </div>
  );
};

export default RecentActivity;