import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const UpcomingAppointments = ({ language }) => {
  const [sortBy, setSortBy] = useState('time');

  const appointments = [
    {
      id: 1,
      patientName: { en: 'Ahmed Hassan', ar: 'أحمد حسن' },
      patientId: 'PT001234',
      appointmentType: { en: 'General Consultation', ar: 'استشارة عامة' },
      doctor: { en: 'Dr. Sarah Johnson', ar: 'د. سارة جونسون' },
      time: new Date(Date.now() + 3600000), // 1 hour from now
      priority: 'normal',
      status: 'confirmed',
      room: 'A-101'
    },
    {
      id: 2,
      patientName: { en: 'Mohammed Ali', ar: 'محمد علي' },
      patientId: 'PT002345',
      appointmentType: { en: 'Follow-up Review', ar: 'مراجعة متابعة' },
      doctor: { en: 'Dr. Ahmed Khalil', ar: 'د. أحمد خليل' },
      time: new Date(Date.now() + 5400000), // 1.5 hours from now
      priority: 'high',
      status: 'confirmed',
      room: 'B-205'
    },
    {
      id: 3,
      patientName: { en: 'Fatima Al-Zahra', ar: 'فاطمة الزهراء' },
      patientId: 'PT003456',
      appointmentType: { en: 'Specialist Referral', ar: 'إحالة أخصائي' },
      doctor: { en: 'Dr. Omar Rashid', ar: 'د. عمر راشد' },
      time: new Date(Date.now() + 7200000), // 2 hours from now
      priority: 'urgent',
      status: 'pending',
      room: 'C-301'
    },
    {
      id: 4,
      patientName: { en: 'Khalid Ibrahim', ar: 'خالد إبراهيم' },
      patientId: 'PT004567',
      appointmentType: { en: 'Routine Checkup', ar: 'فحص روتيني' },
      doctor: { en: 'Dr. Layla Hassan', ar: 'د. ليلى حسن' },
      time: new Date(Date.now() + 10800000), // 3 hours from now
      priority: 'normal',
      status: 'confirmed',
      room: 'A-102'
    },
    {
      id: 5,
      patientName: { en: 'Nour Al-Din', ar: 'نور الدين' },
      patientId: 'PT005678',
      appointmentType: { en: 'Emergency Consultation', ar: 'استشارة طارئة' },
      doctor: { en: 'Dr. Sarah Johnson', ar: 'د. سارة جونسون' },
      time: new Date(Date.now() + 1800000), // 30 minutes from now
      priority: 'urgent',
      status: 'confirmed',
      room: 'ER-01'
    }
  ];

  const getPriorityColor = (priority) => {
    const colorMap = {
      urgent: 'text-error bg-error-50 border-error-200',
      high: 'text-warning bg-warning-50 border-warning-200',
      normal: 'text-accent bg-accent-50 border-emerald-200'
    };
    return colorMap[priority] || colorMap.normal;
  };

  const getStatusColor = (status) => {
    const colorMap = {
      confirmed: 'text-accent bg-accent-50',
      pending: 'text-warning bg-warning-50',
      cancelled: 'text-error bg-error-50'
    };
    return colorMap[status] || colorMap.pending;
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString(language === 'ar' ? 'ar-SA' : 'en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatTimeUntil = (date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((date - now) / (1000 * 60));
    
    if (diffInMinutes < 60) {
      return language === 'en' 
        ? `${diffInMinutes} min` 
        : `${diffInMinutes} دقيقة`;
    } else {
      const hours = Math.floor(diffInMinutes / 60);
      const minutes = diffInMinutes % 60;
      return language === 'en' 
        ? `${hours}h ${minutes}m` 
        : `${hours}س ${minutes}د`;
    }
  };

  const sortedAppointments = [...appointments].sort((a, b) => {
    if (sortBy === 'time') {
      return a.time - b.time;
    } else if (sortBy === 'priority') {
      const priorityOrder = { urgent: 0, high: 1, normal: 2 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    }
    return 0;
  });

  return (
    <div className="card p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-text-primary">
          {language === 'en' ? 'Upcoming Appointments' : 'المواعيد القادمة'}
        </h3>
        
        <div className="flex items-center space-x-3 rtl:space-x-reverse">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="text-sm border border-secondary-300 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="time">
              {language === 'en' ? 'Sort by Time' : 'ترتيب حسب الوقت'}
            </option>
            <option value="priority">
              {language === 'en' ? 'Sort by Priority' : 'ترتيب حسب الأولوية'}
            </option>
          </select>
          
          <button className="text-primary hover:text-primary-700 text-sm font-medium transition-colors duration-200">
            {language === 'en' ? 'View All' : 'عرض الكل'}
          </button>
        </div>
      </div>

      <div className="space-y-3 max-h-80 overflow-y-auto">
        {sortedAppointments.slice(0, 6).map((appointment) => (
          <div
            key={appointment.id}
            className="flex items-center justify-between p-4 rounded-lg border border-secondary-200 hover:border-primary-300 hover:bg-primary-50 transition-all duration-200 group"
          >
            <div className="flex items-center space-x-4 rtl:space-x-reverse flex-1">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                  <Icon name="User" size={20} className="text-primary" />
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 rtl:space-x-reverse mb-1">
                  <h4 className="font-medium text-text-primary group-hover:text-primary transition-colors duration-200">
                    {appointment.patientName[language]}
                  </h4>
                  <span className="text-xs text-text-secondary font-mono">
                    {appointment.patientId}
                  </span>
                </div>
                
                <p className="text-sm text-text-secondary mb-1">
                  {appointment.appointmentType[language]}
                </p>
                
                <div className="flex items-center space-x-3 rtl:space-x-reverse text-xs text-text-secondary">
                  <span className="flex items-center space-x-1 rtl:space-x-reverse">
                    <Icon name="User" size={12} />
                    <span>{appointment.doctor[language]}</span>
                  </span>
                  <span className="flex items-center space-x-1 rtl:space-x-reverse">
                    <Icon name="MapPin" size={12} />
                    <span>{appointment.room}</span>
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-3 rtl:space-x-reverse flex-shrink-0">
              <div className="text-right rtl:text-left">
                <div className="font-medium text-text-primary">
                  {formatTime(appointment.time)}
                </div>
                <div className="text-xs text-text-secondary">
                  {language === 'en' ? 'in' : 'خلال'} {formatTimeUntil(appointment.time)}
                </div>
              </div>

              <div className="flex flex-col space-y-1">
                <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(appointment.priority)}`}>
                  {language === 'en' 
                    ? appointment.priority.charAt(0).toUpperCase() + appointment.priority.slice(1)
                    : appointment.priority === 'urgent' ? 'عاجل' : appointment.priority === 'high' ? 'عالي' : 'عادي'
                  }
                </span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                  {language === 'en' 
                    ? appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)
                    : appointment.status === 'confirmed' ? 'مؤكد' : appointment.status === 'pending' ? 'معلق' : 'ملغي'
                  }
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {appointments.length === 0 && (
        <div className="text-center py-8">
          <Icon name="Calendar" size={48} className="text-secondary-300 mx-auto mb-4" />
          <p className="text-text-secondary">
            {language === 'en' ? 'No upcoming appointments' : 'لا توجد مواعيد قادمة'}
          </p>
        </div>
      )}
    </div>
  );
};

export default UpcomingAppointments;