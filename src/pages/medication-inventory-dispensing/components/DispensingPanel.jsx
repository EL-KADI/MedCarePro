// src/pages/medication-inventory-dispensing/components/DispensingPanel.jsx
import React, { useState, useEffect } from 'react';
import Icon from 'components/AppIcon';
import Button from 'components/ui/Button';
import Input from 'components/ui/Input';
import BarcodeScanner from './BarcodeScanner';

const DispensingPanel = ({ language, selectedMedication }) => {
  const [patientBarcode, setPatientBarcode] = useState('');
  const [patientInfo, setPatientInfo] = useState(null);
  const [dispensingItems, setDispensingItems] = useState([]);
  const [showPatientScanner, setShowPatientScanner] = useState(false);
  const [isDispensing, setIsDispensing] = useState(false);
  const [dispensingHistory, setDispensingHistory] = useState([]);

  // Mock patient data
  const mockPatients = {
    'PT001234567890': {
      id: 'PT001234567890',
      name: 'Ahmed Al-Mansouri',
      age: 45,
      gender: 'Male',
      allergies: ['Penicillin'],
      insuranceNumber: 'INS001234',
      phoneNumber: '+971501234567'
    },
    'PT001234567891': {
      id: 'PT001234567891',
      name: 'Fatima Al-Zahra',
      age: 32,
      gender: 'Female',
      allergies: [],
      insuranceNumber: 'INS001235',
      phoneNumber: '+971501234568'
    }
  };

  useEffect(() => {
    if (selectedMedication) {
      addMedicationToDispensing(selectedMedication);
    }
  }, [selectedMedication]);

  const handlePatientScan = (barcode) => {
    setPatientBarcode(barcode);
    setShowPatientScanner(false);
    validatePatient(barcode);
  };

  const validatePatient = (barcode) => {
    const patient = mockPatients[barcode];
    if (patient) {
      setPatientInfo(patient);
    } else {
      setPatientInfo(null);
      // Show error message
    }
  };

  const addMedicationToDispensing = (medication) => {
    const existingItem = dispensingItems.find(item => item.medicationId === medication.id);
    
    if (existingItem) {
      setDispensingItems(dispensingItems.map(item =>
        item.medicationId === medication.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      const newItem = {
        id: Date.now(),
        medicationId: medication.id,
        medicationName: medication.name,
        currentStock: medication.currentStock,
        quantity: 1,
        price: medication.price,
        instructions: ''
      };
      setDispensingItems([...dispensingItems, newItem]);
    }
  };

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity <= 0) {
      removeItem(itemId);
      return;
    }

    setDispensingItems(dispensingItems.map(item =>
      item.id === itemId
        ? { ...item, quantity: newQuantity }
        : item
    ));
  };

  const removeItem = (itemId) => {
    setDispensingItems(dispensingItems.filter(item => item.id !== itemId));
  };

  const updateInstructions = (itemId, instructions) => {
    setDispensingItems(dispensingItems.map(item =>
      item.id === itemId
        ? { ...item, instructions }
        : item
    ));
  };

  const calculateTotal = () => {
    return dispensingItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const validateDispensing = () => {
    const errors = [];
    
    if (!patientInfo) {
      errors.push(language === 'en' ? 'Patient not found' : 'المريض غير موجود');
    }
    
    if (dispensingItems.length === 0) {
      errors.push(language === 'en' ? 'No medications selected' : 'لم يتم اختيار أدوية');
    }
    
    dispensingItems.forEach(item => {
      if (item.quantity > item.currentStock) {
        errors.push(`${language === 'en' ? 'Insufficient stock for' : 'مخزون غير كافٍ لـ'} ${item.medicationName}`);
      }
    });
    
    return errors;
  };

  const handleDispense = async () => {
    const validationErrors = validateDispensing();
    
    if (validationErrors.length > 0) {
      // Show validation errors
      return;
    }
    
    setIsDispensing(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Add to dispensing history
      const newRecord = {
        id: Date.now(),
        patientId: patientInfo.id,
        patientName: patientInfo.name,
        items: [...dispensingItems],
        total: calculateTotal(),
        timestamp: new Date().toISOString(),
        dispensedBy: 'Dr. Sarah Johnson'
      };
      
      setDispensingHistory([newRecord, ...dispensingHistory]);
      
      // Clear form
      setPatientBarcode('');
      setPatientInfo(null);
      setDispensingItems([]);
      
      // Show success message
    } catch (error) {
      // Show error message
    } finally {
      setIsDispensing(false);
    }
  };

  return (
    <div className="bg-surface border-l border-secondary-200 h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-secondary-200">
        <h2 className="text-lg font-semibold text-text-primary mb-4">
          {language === 'en' ? 'Medication Dispensing' : 'صرف الأدوية'}
        </h2>

        {/* Patient Search */}
        <div className="space-y-3">
          <label className="block text-sm font-medium text-text-primary">
            {language === 'en' ? 'Patient ID' : 'رقم المريض'}
          </label>
          
          <div className="relative">
            <Input
              type="text"
              value={patientBarcode}
              onChange={(e) => setPatientBarcode(e.target.value)}
              onBlur={() => validatePatient(patientBarcode)}
              placeholder={language === 'en' ? 'Scan or enter patient ID...' : 'امسح أو أدخل رقم المريض...'}
              className="pr-10 rtl:pl-10 rtl:pr-3"
            />
            <button
              onClick={() => setShowPatientScanner(true)}
              className="absolute right-2 rtl:left-2 rtl:right-auto top-1/2 transform -translate-y-1/2 p-1 text-text-secondary hover:text-primary transition-colors duration-200"
              title={language === 'en' ? 'Scan Patient Barcode' : 'مسح باركود المريض'}
            >
              <Icon name="ScanLine" size={18} />
            </button>
          </div>
        </div>

        {/* Patient Info */}
        {patientInfo && (
          <div className="mt-4 p-3 bg-success-50 border border-success-200 rounded-md">
            <div className="flex items-center space-x-2 rtl:space-x-reverse mb-2">
              <Icon name="CheckCircle" size={16} className="text-success" />
              <span className="text-sm font-medium text-success">
                {language === 'en' ? 'Patient Verified' : 'تم التحقق من المريض'}
              </span>
            </div>
            <div className="text-sm text-text-primary">
              <p className="font-medium">{patientInfo.name}</p>
              <p>{language === 'en' ? 'Age:' : 'العمر:'} {patientInfo.age} | {language === 'en' ? 'Gender:' : 'الجنس:'} {patientInfo.gender}</p>
              {patientInfo.allergies.length > 0 && (
                <p className="text-warning">
                  {language === 'en' ? 'Allergies:' : 'الحساسية:'} {patientInfo.allergies.join(', ')}
                </p>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Dispensing Items */}
      <div className="flex-1 overflow-auto p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-md font-semibold text-text-primary">
            {language === 'en' ? 'Items to Dispense' : 'الأدوية المراد صرفها'}
          </h3>
          {dispensingItems.length > 0 && (
            <span className="text-sm text-text-secondary">
              {language === 'en' ? 'Items:' : 'العناصر:'} {dispensingItems.length}
            </span>
          )}
        </div>

        {dispensingItems.length === 0 ? (
          <div className="text-center py-8">
            <Icon name="ShoppingCart" size={48} className="text-secondary mx-auto mb-4" />
            <p className="text-text-secondary">
              {language === 'en' ? 'No items selected for dispensing' : 'لم يتم اختيار أدوية للصرف'}
            </p>
            <p className="text-text-secondary text-sm mt-1">
              {language === 'en' ? 'Select medications from the inventory' : 'اختر الأدوية من المخزون'}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {dispensingItems.map((item) => (
              <div key={item.id} className="p-3 border border-secondary-200 rounded-md">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h4 className="font-medium text-text-primary">{item.medicationName}</h4>
                    <p className="text-sm text-text-secondary">
                      {language === 'en' ? 'Available:' : 'متاح:'} {item.currentStock} | 
                      {language === 'en' ? 'Price:' : 'السعر:'} ${item.price}
                    </p>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="p-1 text-text-secondary hover:text-error transition-colors duration-200"
                  >
                    <Icon name="X" size={16} />
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-text-primary mb-1">
                      {language === 'en' ? 'Quantity' : 'الكمية'}
                    </label>
                    <div className="flex items-center space-x-1 rtl:space-x-reverse">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-1 text-text-secondary hover:text-primary transition-colors duration-200"
                      >
                        <Icon name="Minus" size={14} />
                      </button>
                      <Input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 0)}
                        className="text-center w-20"
                        min="1"
                        max={item.currentStock}
                      />
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        disabled={item.quantity >= item.currentStock}
                        className="p-1 text-text-secondary hover:text-primary transition-colors duration-200 disabled:opacity-50"
                      >
                        <Icon name="Plus" size={14} />
                      </button>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-xs font-medium text-text-primary mb-1">
                      {language === 'en' ? 'Subtotal' : 'المجموع الفرعي'}
                    </label>
                    <div className="text-sm font-medium text-text-primary py-2">
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                </div>

                <div className="mt-3">
                  <label className="block text-xs font-medium text-text-primary mb-1">
                    {language === 'en' ? 'Instructions' : 'التعليمات'}
                  </label>
                  <Input
                    type="text"
                    value={item.instructions}
                    onChange={(e) => updateInstructions(item.id, e.target.value)}
                    placeholder={language === 'en' ? 'Dosage instructions...' : 'تعليمات الجرعة...'}
                    className="text-sm"
                  />
                </div>
              </div>
            ))}

            {/* Total */}
            <div className="border-t border-secondary-200 pt-3">
              <div className="flex items-center justify-between">
                <span className="text-lg font-semibold text-text-primary">
                  {language === 'en' ? 'Total:' : 'المجموع الكلي:'}
                </span>
                <span className="text-lg font-bold text-primary">
                  ${calculateTotal().toFixed(2)}
                </span>
              </div>
            </div>

            {/* Dispense Button */}
            <Button
              variant="primary"
              size="lg"
              fullWidth
              iconName={isDispensing ? 'Loader2' : 'Check'}
              disabled={!patientInfo || dispensingItems.length === 0 || isDispensing}
              onClick={handleDispense}
              className={isDispensing ? 'animate-pulse' : ''}
            >
              {isDispensing
                ? (language === 'en' ? 'Dispensing...' : 'جاري الصرف...')
                : (language === 'en' ? 'Dispense Medications' : 'صرف الأدوية')
              }
            </Button>
          </div>
        )}
      </div>

      {/* Recent Dispensing History */}
      {dispensingHistory.length > 0 && (
        <div className="border-t border-secondary-200 p-4">
          <h3 className="text-sm font-medium text-text-primary mb-3">
            {language === 'en' ? 'Recent Dispensing' : 'الصرف الحديث'}
          </h3>
          <div className="space-y-2 max-h-40 overflow-auto">
            {dispensingHistory.slice(0, 3).map((record) => (
              <div key={record.id} className="p-2 bg-secondary-50 rounded-md">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-text-primary">{record.patientName}</span>
                  <span className="text-xs text-text-secondary">
                    {new Date(record.timestamp).toLocaleTimeString()}
                  </span>
                </div>
                <p className="text-xs text-text-secondary">
                  {record.items.length} {language === 'en' ? 'items' : 'عنصر'} - ${record.total.toFixed(2)}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Patient Barcode Scanner */}
      <BarcodeScanner
        isOpen={showPatientScanner}
        onClose={() => setShowPatientScanner(false)}
        onScan={handlePatientScan}
        language={language}
      />
    </div>
  );
};

export default DispensingPanel;