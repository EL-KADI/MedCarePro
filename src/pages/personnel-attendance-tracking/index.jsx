import React from 'react';
import { useNavigation } from 'components/ui/NavigationHeader';

const PersonnelAttendanceTracking = () => {
  const { language } = useNavigation();

  return (
    <div className="min-h-screen bg-background pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="text-center py-20">
          <h1 className="text-3xl font-bold text-text-primary mb-4">
            {language === 'en' ? 'Personnel Attendance Tracking' : 'تتبع حضور الموظفين'}
          </h1>
          <p className="text-text-secondary">
            {language === 'en' ? 'This page is under development' : 'هذه الصفحة قيد التطوير'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PersonnelAttendanceTracking;