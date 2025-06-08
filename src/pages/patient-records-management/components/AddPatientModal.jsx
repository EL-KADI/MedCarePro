import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const AddPatientModal = ({ isOpen, onClose, onSave, language }) => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    phone: '',
    nationalId: '',
    bloodType: '',
    hospital: '',
    clinic: '',
    visitDate: '',
    reviewDate: '',
    allergies: '',
    complaints: '',
    symptoms: ''
  });

  const [errors, setErrors] = useState({});

  if (!isOpen) return null;

  const hospitals = [
    "King Fahd Medical City",
    "Prince Sultan Medical Center", 
    "National Guard Hospital",
    "King Abdulaziz Medical City"
  ];

  const clinics = [
    "Internal Medicine",
    "Pediatrics",
    "Orthopedics",
    "Gynecology",
    "Dermatology",
    "Cardiology",
    "Emergency",
    "Surgery"
  ];

  const bloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = language === 'en' ? 'Name is required' : 'الاسم مطلوب';
    }
    if (!formData.age || formData.age < 1 || formData.age > 120) {
      newErrors.age = language === 'en' ? 'Valid age is required' : 'عمر صحيح مطلوب';
    }
    if (!formData.gender) {
      newErrors.gender = language === 'en' ? 'Gender is required' : 'الجنس مطلوب';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = language === 'en' ? 'Phone number is required' : 'رقم الهاتف مطلوب';
    }
    if (!formData.nationalId.trim()) {
      newErrors.nationalId = language === 'en' ? 'National ID is required' : 'رقم الهوية مطلوب';
    }
    if (!formData.hospital) {
      newErrors.hospital = language === 'en' ? 'Hospital is required' : 'المستشفى مطلوب';
    }
    if (!formData.clinic) {
      newErrors.clinic = language === 'en' ? 'Clinic is required' : 'العيادة مطلوبة';
    }
    if (!formData.visitDate) {
      newErrors.visitDate = language === 'en' ? 'Visit date is required' : 'تاريخ الزيارة مطلوب';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const patientData = {
      ...formData,
      age: parseInt(formData.age),
      status: 'Active',
      allergies: formData.allergies ? formData.allergies.split(',').map(a => a.trim()) : [],
      symptoms: formData.symptoms ? formData.symptoms.split(',').map(s => s.trim()) : [],
      medications: [],
      vitals: {
        bloodPressure: '',
        heartRate: '',
        temperature: '',
        weight: '',
        height: ''
      }
    };

    onSave(patientData);
  };

  const handleClose = () => {
    setFormData({
      name: '',
      age: '',
      gender: '',
      phone: '',
      nationalId: '',
      bloodType: '',
      hospital: '',
      clinic: '',
      visitDate: '',
      reviewDate: '',
      allergies: '',
      complaints: '',
      symptoms: ''
    });
    setErrors({});
    onClose();
  };

  return (
    <div className="fixed inset-0 z-1020 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity bg-black bg-opacity-50" onClick={handleClose}></div>

        <div className="inline-block w-full max-w-2xl my-8 overflow-hidden text-left align-middle transition-all transform bg-surface shadow-elevation-3 rounded-lg">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-secondary-200">
            <div className="flex items-center space-x-3 rtl:space-x-reverse">
              <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                <Icon name="UserPlus" size={20} className="text-primary" />
              </div>
              <h2 className="text-xl font-semibold text-text-primary">
                {language === 'en' ? 'Add New Patient' : 'إضافة مريض جديد'}
              </h2>
            </div>
            <button
              onClick={handleClose}
              className="p-2 text-text-secondary hover:text-text-primary hover:bg-secondary-50 rounded-md transition-colors duration-200"
            >
              <Icon name="X" size={20} />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 max-h-96 overflow-y-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Name */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-text-primary mb-2">
                  {language === 'en' ? 'Full Name' : 'الاسم الكامل'} *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className={`input-field ${errors.name ? 'border-error' : ''}`}
                  placeholder={language === 'en' ? 'Enter full name' : 'أدخل الاسم الكامل'}
                />
                {errors.name && <p className="text-error text-sm mt-1">{errors.name}</p>}
              </div>

              {/* Age */}
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  {language === 'en' ? 'Age' : 'العمر'} *
                </label>
                <input
                  type="number"
                  value={formData.age}
                  onChange={(e) => handleInputChange('age', e.target.value)}
                  className={`input-field ${errors.age ? 'border-error' : ''}`}
                  placeholder={language === 'en' ? 'Enter age' : 'أدخل العمر'}
                  min="1"
                  max="120"
                />
                {errors.age && <p className="text-error text-sm mt-1">{errors.age}</p>}
              </div>

              {/* Gender */}
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  {language === 'en' ? 'Gender' : 'الجنس'} *
                </label>
                <select
                  value={formData.gender}
                  onChange={(e) => handleInputChange('gender', e.target.value)}
                  className={`input-field ${errors.gender ? 'border-error' : ''}`}
                >
                  <option value="">
                    {language === 'en' ? 'Select gender' : 'اختر الجنس'}
                  </option>
                  <option value="Male">{language === 'en' ? 'Male' : 'ذكر'}</option>
                  <option value="Female">{language === 'en' ? 'Female' : 'أنثى'}</option>
                </select>
                {errors.gender && <p className="text-error text-sm mt-1">{errors.gender}</p>}
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  {language === 'en' ? 'Phone Number' : 'رقم الهاتف'} *
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className={`input-field ${errors.phone ? 'border-error' : ''}`}
                  placeholder={language === 'en' ? '+966501234567' : '+966501234567'}
                />
                {errors.phone && <p className="text-error text-sm mt-1">{errors.phone}</p>}
              </div>

              {/* National ID */}
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  {language === 'en' ? 'National ID' : 'رقم الهوية'} *
                </label>
                <input
                  type="text"
                  value={formData.nationalId}
                  onChange={(e) => handleInputChange('nationalId', e.target.value)}
                  className={`input-field ${errors.nationalId ? 'border-error' : ''}`}
                  placeholder={language === 'en' ? 'Enter national ID' : 'أدخل رقم الهوية'}
                />
                {errors.nationalId && <p className="text-error text-sm mt-1">{errors.nationalId}</p>}
              </div>

              {/* Blood Type */}
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  {language === 'en' ? 'Blood Type' : 'فصيلة الدم'}
                </label>
                <select
                  value={formData.bloodType}
                  onChange={(e) => handleInputChange('bloodType', e.target.value)}
                  className="input-field"
                >
                  <option value="">
                    {language === 'en' ? 'Select blood type' : 'اختر فصيلة الدم'}
                  </option>
                  {bloodTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              {/* Hospital */}
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  {language === 'en' ? 'Hospital' : 'المستشفى'} *
                </label>
                <select
                  value={formData.hospital}
                  onChange={(e) => handleInputChange('hospital', e.target.value)}
                  className={`input-field ${errors.hospital ? 'border-error' : ''}`}
                >
                  <option value="">
                    {language === 'en' ? 'Select hospital' : 'اختر المستشفى'}
                  </option>
                  {hospitals.map(hospital => (
                    <option key={hospital} value={hospital}>{hospital}</option>
                  ))}
                </select>
                {errors.hospital && <p className="text-error text-sm mt-1">{errors.hospital}</p>}
              </div>

              {/* Clinic */}
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  {language === 'en' ? 'Clinic' : 'العيادة'} *
                </label>
                <select
                  value={formData.clinic}
                  onChange={(e) => handleInputChange('clinic', e.target.value)}
                  className={`input-field ${errors.clinic ? 'border-error' : ''}`}
                >
                  <option value="">
                    {language === 'en' ? 'Select clinic' : 'اختر العيادة'}
                  </option>
                  {clinics.map(clinic => (
                    <option key={clinic} value={clinic}>{clinic}</option>
                  ))}
                </select>
                {errors.clinic && <p className="text-error text-sm mt-1">{errors.clinic}</p>}
              </div>

              {/* Visit Date */}
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  {language === 'en' ? 'Visit Date' : 'تاريخ الزيارة'} *
                </label>
                <input
                  type="date"
                  value={formData.visitDate}
                  onChange={(e) => handleInputChange('visitDate', e.target.value)}
                  className={`input-field ${errors.visitDate ? 'border-error' : ''}`}
                />
                {errors.visitDate && <p className="text-error text-sm mt-1">{errors.visitDate}</p>}
              </div>

              {/* Review Date */}
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  {language === 'en' ? 'Review Date' : 'تاريخ المراجعة'}
                </label>
                <input
                  type="date"
                  value={formData.reviewDate}
                  onChange={(e) => handleInputChange('reviewDate', e.target.value)}
                  className="input-field"
                />
              </div>

              {/* Allergies */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-text-primary mb-2">
                  {language === 'en' ? 'Known Allergies' : 'الحساسيات المعروفة'}
                </label>
                <input
                  type="text"
                  value={formData.allergies}
                  onChange={(e) => handleInputChange('allergies', e.target.value)}
                  className="input-field"
                  placeholder={language === 'en' ? 'Separate multiple allergies with commas' : 'افصل الحساسيات المتعددة بفواصل'}
                />
              </div>

              {/* Complaints */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-text-primary mb-2">
                  {language === 'en' ? 'Chief Complaints' : 'الشكاوى الرئيسية'}
                </label>
                <textarea
                  value={formData.complaints}
                  onChange={(e) => handleInputChange('complaints', e.target.value)}
                  className="input-field"
                  rows="3"
                  placeholder={language === 'en' ? 'Describe patient complaints...' : 'اوصف شكاوى المريض...'}
                />
              </div>

              {/* Symptoms */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-text-primary mb-2">
                  {language === 'en' ? 'Symptoms' : 'الأعراض'}
                </label>
                <input
                  type="text"
                  value={formData.symptoms}
                  onChange={(e) => handleInputChange('symptoms', e.target.value)}
                  className="input-field"
                  placeholder={language === 'en' ? 'Separate multiple symptoms with commas' : 'افصل الأعراض المتعددة بفواصل'}
                />
              </div>
            </div>
          </form>

          {/* Footer */}
          <div className="flex items-center justify-end space-x-3 rtl:space-x-reverse p-6 border-t border-secondary-200 bg-secondary-50">
            <button
              type="button"
              onClick={handleClose}
              className="btn-secondary"
            >
              {language === 'en' ? 'Cancel' : 'إلغاء'}
            </button>
            <button
              onClick={handleSubmit}
              className="btn-primary"
            >
              {language === 'en' ? 'Add Patient' : 'إضافة مريض'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPatientModal;