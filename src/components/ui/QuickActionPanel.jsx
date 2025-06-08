import React, { useState } from 'react';
import Icon from '../AppIcon';
import { useNavigation } from './NavigationHeader';

const QuickActionPanel = ({ isVisible = true, position = 'dashboard' }) => {
  const { language } = useNavigation();
  const [isExpanded, setIsExpanded] = useState(false);

  const quickActions = [
    {
      id: 'new-patient',
      label: { en: 'New Patient Visit', ar: 'زيارة مريض جديد' },
      icon: 'UserPlus',
      color: 'primary',
      description: { en: 'Register new patient', ar: 'تسجيل مريض جديد' },
      shortcut: 'Ctrl+N'
    },
    {
      id: 'dispense-medication',
      label: { en: 'Dispense Medication', ar: 'صرف دواء' },
      icon: 'Pill',
      color: 'accent',
      description: { en: 'Quick medication dispensing', ar: 'صرف سريع للأدوية' },
      shortcut: 'Ctrl+D'
    },
    {
      id: 'emergency-alert',
      label: { en: 'Emergency Alert', ar: 'تنبيه طوارئ' },
      icon: 'AlertTriangle',
      color: 'error',
      description: { en: 'Trigger emergency protocol', ar: 'تفعيل بروتوكول الطوارئ' },
      shortcut: 'Ctrl+E'
    },
    {
      id: 'scan-barcode',
      label: { en: 'Scan Barcode', ar: 'مسح الباركود' },
      icon: 'ScanLine',
      color: 'secondary',
      description: { en: 'Scan patient or medication', ar: 'مسح مريض أو دواء' },
      shortcut: 'Ctrl+S'
    }
  ];

  const contextualActions = {
    'patient-records': [
      {
        id: 'add-record',
        label: { en: 'Add Record', ar: 'إضافة سجل' },
        icon: 'FileText',
        color: 'primary'
      },
      {
        id: 'schedule-appointment',
        label: { en: 'Schedule', ar: 'جدولة' },
        icon: 'Calendar',
        color: 'accent'
      }
    ],
    'medication-inventory': [
      {
        id: 'add-stock',
        label: { en: 'Add Stock', ar: 'إضافة مخزون' },
        icon: 'Package',
        color: 'primary'
      },
      {
        id: 'low-stock-alert',
        label: { en: 'Stock Alert', ar: 'تنبيه مخزون' },
        icon: 'AlertCircle',
        color: 'warning'
      }
    ]
  };

  const getColorClasses = (color) => {
    const colorMap = {
      primary: 'bg-primary hover:bg-primary-700 text-white',
      accent: 'bg-accent hover:bg-accent text-white',
      error: 'bg-error hover:bg-red-700 text-white',
      warning: 'bg-warning hover:bg-amber-600 text-white',
      secondary: 'bg-secondary hover:bg-secondary-600 text-white'
    };
    return colorMap[color] || colorMap.primary;
  };

  const handleActionClick = (actionId) => {
    console.log(`Quick action triggered: ${actionId}`);
    // Handle specific action logic here
    switch (actionId) {
      case 'new-patient':
        // Navigate to new patient form or open modal
        break;
      case 'dispense-medication':
        // Open medication dispensing interface
        break;
      case 'emergency-alert':
        // Trigger emergency protocol
        break;
      case 'scan-barcode':
        // Activate barcode scanner
        break;
      default:
        break;
    }
  };

  if (!isVisible) return null;

  return (
    <div className={`
      fixed z-1010 transition-all duration-300 ease-in-out
      ${position === 'dashboard' ?'bottom-6 right-6 rtl:left-6 rtl:right-auto' :'top-20 right-4 rtl:left-4 rtl:right-auto'
      }
    `}>
      {/* Main Action Button */}
      <div className="relative">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className={`
            w-14 h-14 rounded-full shadow-elevation-3 transition-all duration-200
            flex items-center justify-center group
            ${isExpanded 
              ? 'bg-secondary-600 text-white rotate-45' :'bg-primary text-white hover:bg-primary-700'
            }
          `}
          title={language === 'en' ? 'Quick Actions' : 'الإجراءات السريعة'}
        >
          <Icon 
            name={isExpanded ? "X" : "Zap"} 
            size={24} 
            className="transition-transform duration-200"
          />
        </button>

        {/* Action Panel */}
        {isExpanded && (
          <div className={`
            absolute bottom-16 right-0 rtl:left-0 rtl:right-auto
            bg-surface border border-secondary-200 rounded-lg shadow-elevation-3
            p-4 w-72 transition-all duration-300 ease-out
            transform origin-bottom-right rtl:origin-bottom-left
          `}>
            <div className="mb-3">
              <h3 className="text-sm font-semibold text-text-primary mb-1">
                {language === 'en' ? 'Quick Actions' : 'الإجراءات السريعة'}
              </h3>
              <p className="text-xs text-text-secondary">
                {language === 'en' ?'Frequently used clinical functions' :'الوظائف السريرية المستخدمة بكثرة'
                }
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {quickActions.map((action) => (
                <button
                  key={action.id}
                  onClick={() => handleActionClick(action.id)}
                  className={`
                    p-3 rounded-md transition-all duration-200 group
                    flex flex-col items-center text-center space-y-1
                    ${getColorClasses(action.color)}
                    hover:shadow-elevation-1 transform hover:scale-105
                  `}
                  title={action.description[language]}
                >
                  <Icon name={action.icon} size={20} />
                  <span className="text-xs font-medium leading-tight">
                    {action.label[language]}
                  </span>
                  {action.shortcut && (
                    <span className="text-xs opacity-75 font-mono">
                      {action.shortcut}
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* Emergency Contact */}
            <div className="mt-4 pt-3 border-t border-secondary-200">
              <button className="w-full flex items-center justify-center space-x-2 rtl:space-x-reverse p-2 text-error hover:bg-error-50 rounded-md transition-colors duration-200">
                <Icon name="Phone" size={16} />
                <span className="text-sm font-medium">
                  {language === 'en' ? 'Emergency: 911' : 'الطوارئ: 911'}
                </span>
              </button>
            </div>
          </div>
        )}

        {/* Notification Badge */}
        <div className="absolute -top-1 -right-1 rtl:-left-1 rtl:right-auto w-5 h-5 bg-error rounded-full flex items-center justify-center">
          <span className="text-xs font-bold text-white">3</span>
        </div>
      </div>

      {/* Contextual Actions for specific modules */}
      {position !== 'dashboard' && (
        <div className="mt-3 space-y-2">
          {contextualActions[position]?.map((action) => (
            <button
              key={action.id}
              onClick={() => handleActionClick(action.id)}
              className={`
                w-12 h-12 rounded-full shadow-elevation-2 transition-all duration-200
                flex items-center justify-center
                ${getColorClasses(action.color)}
                hover:shadow-elevation-3 transform hover:scale-105
              `}
              title={action.label[language]}
            >
              <Icon name={action.icon} size={20} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default QuickActionPanel;