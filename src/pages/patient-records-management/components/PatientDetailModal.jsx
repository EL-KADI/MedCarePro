import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const PatientDetailModal = ({ patient, isOpen, onClose, language }) => {
  const [activeTab, setActiveTab] = useState('overview');

  if (!isOpen || !patient) return null;

  const tabs = [
    { id: 'overview', label: { en: 'Overview', ar: 'نظرة عامة' }, icon: 'User' },
    { id: 'complaints', label: { en: 'Complaints', ar: 'الشكاوى' }, icon: 'FileText' },
    { id: 'medications', label: { en: 'Medications', ar: 'الأدوية' }, icon: 'Pill' },
    { id: 'history', label: { en: 'Visit History', ar: 'تاريخ الزيارات' }, icon: 'Clock' }
  ];

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return language === 'en' ? date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
      : date.toLocaleDateString('ar-SA', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Patient Basic Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1">
              {language === 'en' ? 'Full Name' : 'الاسم الكامل'}
            </label>
            <p className="text-text-primary font-medium">{patient.name}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1">
              {language === 'en' ? 'Age & Gender' : 'العمر والجنس'}
            </label>
            <p className="text-text-primary">{patient.age} {language === 'en' ? 'years' : 'سنة'} • {patient.gender}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1">
              {language === 'en' ? 'Phone Number' : 'رقم الهاتف'}
            </label>
            <p className="text-text-primary">{patient.phone}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1">
              {language === 'en' ? 'National ID' : 'رقم الهوية'}
            </label>
            <p className="text-text-primary font-mono">{patient.nationalId}</p>
          </div>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1">
              {language === 'en' ? 'Barcode ID' : 'رقم الباركود'}
            </label>
            <p className="text-text-primary font-mono bg-secondary-50 px-2 py-1 rounded">{patient.barcode}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1">
              {language === 'en' ? 'Blood Type' : 'فصيلة الدم'}
            </label>
            <p className="text-text-primary">{patient.bloodType}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1">
              {language === 'en' ? 'Hospital' : 'المستشفى'}
            </label>
            <p className="text-text-primary">{patient.hospital}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1">
              {language === 'en' ? 'Clinic' : 'العيادة'}
            </label>
            <p className="text-text-primary">{patient.clinic}</p>
          </div>
        </div>
      </div>

      {/* Vital Signs */}
      <div>
        <h3 className="text-lg font-semibold text-text-primary mb-4">
          {language === 'en' ? 'Vital Signs' : 'العلامات الحيوية'}
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="bg-secondary-50 p-3 rounded-md text-center">
            <div className="text-sm text-text-secondary mb-1">
              {language === 'en' ? 'Blood Pressure' : 'ضغط الدم'}
            </div>
            <div className="font-semibold text-text-primary">{patient.vitals.bloodPressure}</div>
          </div>
          <div className="bg-secondary-50 p-3 rounded-md text-center">
            <div className="text-sm text-text-secondary mb-1">
              {language === 'en' ? 'Heart Rate' : 'معدل النبض'}
            </div>
            <div className="font-semibold text-text-primary">{patient.vitals.heartRate}</div>
          </div>
          <div className="bg-secondary-50 p-3 rounded-md text-center">
            <div className="text-sm text-text-secondary mb-1">
              {language === 'en' ? 'Temperature' : 'درجة الحرارة'}
            </div>
            <div className="font-semibold text-text-primary">{patient.vitals.temperature}</div>
          </div>
          <div className="bg-secondary-50 p-3 rounded-md text-center">
            <div className="text-sm text-text-secondary mb-1">
              {language === 'en' ? 'Weight' : 'الوزن'}
            </div>
            <div className="font-semibold text-text-primary">{patient.vitals.weight}</div>
          </div>
          <div className="bg-secondary-50 p-3 rounded-md text-center">
            <div className="text-sm text-text-secondary mb-1">
              {language === 'en' ? 'Height' : 'الطول'}
            </div>
            <div className="font-semibold text-text-primary">{patient.vitals.height}</div>
          </div>
        </div>
      </div>

      {/* Allergies */}
      <div>
        <h3 className="text-lg font-semibold text-text-primary mb-4">
          {language === 'en' ? 'Known Allergies' : 'الحساسيات المعروفة'}
        </h3>
        {patient.allergies.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {patient.allergies.map((allergy, index) => (
              <span key={index} className="bg-error-100 text-error px-3 py-1 rounded-full text-sm font-medium">
                {allergy}
              </span>
            ))}
          </div>
        ) : (
          <p className="text-text-secondary italic">
            {language === 'en' ? 'No known allergies' : 'لا توجد حساسيات معروفة'}
          </p>
        )}
      </div>
    </div>
  );

  const renderComplaints = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-text-primary mb-4">
          {language === 'en' ? 'Current Complaints' : 'الشكاوى الحالية'}
        </h3>
        <div className="bg-secondary-50 p-4 rounded-md">
          <p className="text-text-primary leading-relaxed whitespace-pre-line">{patient.complaints}</p>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-text-primary mb-4">
          {language === 'en' ? 'Reported Symptoms' : 'الأعراض المبلغ عنها'}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {patient.symptoms.map((symptom, index) => (
            <div key={index} className="flex items-center space-x-2 rtl:space-x-reverse p-3 bg-warning-50 rounded-md">
              <Icon name="AlertCircle" size={16} className="text-warning" />
              <span className="text-text-primary">{symptom}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderMedications = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-text-primary mb-4">
        {language === 'en' ? 'Current Medications' : 'الأدوية الحالية'}
      </h3>
      {patient.medications.map((medication, index) => (
        <div key={index} className="border border-secondary-200 rounded-md p-4">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h4 className="font-semibold text-text-primary mb-2">{medication.name}</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-text-secondary">
                    {language === 'en' ? 'Dosage:' : 'الجرعة:'}
                  </span>
                  <span className="text-text-primary ml-2 rtl:mr-2 rtl:ml-0">{medication.dosage}</span>
                </div>
                <div>
                  <span className="text-text-secondary">
                    {language === 'en' ? 'Duration:' : 'المدة:'}
                  </span>
                  <span className="text-text-primary ml-2 rtl:mr-2 rtl:ml-0">{medication.duration}</span>
                </div>
              </div>
            </div>
            <Icon name="Pill" size={20} className="text-accent" />
          </div>
        </div>
      ))}
    </div>
  );

  const renderHistory = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-text-primary mb-4">
        {language === 'en' ? 'Visit History' : 'تاريخ الزيارات'}
      </h3>
      <div className="space-y-3">
        {patient.visitHistory.map((visit, index) => (
          <div key={index} className="border border-secondary-200 rounded-md p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <Icon name="Calendar" size={16} className="text-primary" />
                <span className="font-medium text-text-primary">{formatDate(visit.date)}</span>
              </div>
              <span className="text-sm text-text-secondary">{visit.clinic}</span>
            </div>
            <p className="text-text-primary">{visit.diagnosis}</p>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 z-1020 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity bg-black bg-opacity-50" onClick={onClose}></div>

        <div className="inline-block w-full max-w-4xl my-8 overflow-hidden text-left align-middle transition-all transform bg-surface shadow-elevation-3 rounded-lg">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-secondary-200">
            <div className="flex items-center space-x-4 rtl:space-x-reverse">
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                <Icon name="User" size={24} className="text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-text-primary">{patient.name}</h2>
                <p className="text-text-secondary">
                  {language === 'en' ? 'Patient Details' : 'تفاصيل المريض'}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-text-secondary hover:text-text-primary hover:bg-secondary-50 rounded-md transition-colors duration-200"
            >
              <Icon name="X" size={20} />
            </button>
          </div>

          {/* Tabs */}
          <div className="border-b border-secondary-200">
            <nav className="flex space-x-8 rtl:space-x-reverse px-6">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    flex items-center space-x-2 rtl:space-x-reverse py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200
                    ${activeTab === tab.id
                      ? 'border-primary text-primary' :'border-transparent text-text-secondary hover:text-text-primary hover:border-secondary-300'
                    }
                  `}
                >
                  <Icon name={tab.icon} size={16} />
                  <span>{tab.label[language]}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Content */}
          <div className="p-6 max-h-96 overflow-y-auto">
            {activeTab === 'overview' && renderOverview()}
            {activeTab === 'complaints' && renderComplaints()}
            {activeTab === 'medications' && renderMedications()}
            {activeTab === 'history' && renderHistory()}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end space-x-3 rtl:space-x-reverse p-6 border-t border-secondary-200 bg-secondary-50">
            <button
              onClick={onClose}
              className="btn-secondary"
            >
              {language === 'en' ? 'Close' : 'إغلاق'}
            </button>
            <button className="btn-primary">
              {language === 'en' ? 'Edit Patient' : 'تعديل المريض'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDetailModal;