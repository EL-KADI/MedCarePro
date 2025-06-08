import React, { useState, useEffect } from 'react';
import Icon from 'components/AppIcon';

const BarcodeScanner = ({ isOpen, onClose, onScan, language }) => {
  const [scannedCode, setScannedCode] = useState('');
  const [isScanning, setIsScanning] = useState(false);

  if (!isOpen) return null;

  // Mock barcode scanning simulation
  const simulateBarcodeScan = () => {
    setIsScanning(true);
    
    // Simulate scanning delay
    setTimeout(() => {
      const mockBarcodes = [
        'PT001234567890',
        'PT001234567891', 
        'PT001234567892',
        'PT001234567893',
        'PT001234567894'
      ];
      
      const randomBarcode = mockBarcodes[Math.floor(Math.random() * mockBarcodes.length)];
      setScannedCode(randomBarcode);
      setIsScanning(false);
      
      // Auto-trigger scan after getting result
      setTimeout(() => {
        onScan(randomBarcode);
      }, 1000);
    }, 2000);
  };

  const handleManualEntry = () => {
    if (scannedCode.trim()) {
      onScan(scannedCode.trim());
    }
  };

  const handleClose = () => {
    setScannedCode('');
    setIsScanning(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-1020 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity bg-black bg-opacity-50" onClick={handleClose}></div>

        <div className="inline-block w-full max-w-md my-8 overflow-hidden text-left align-middle transition-all transform bg-surface shadow-elevation-3 rounded-lg">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-secondary-200">
            <div className="flex items-center space-x-3 rtl:space-x-reverse">
              <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                <Icon name="ScanLine" size={20} className="text-primary" />
              </div>
              <h2 className="text-xl font-semibold text-text-primary">
                {language === 'en' ? 'Barcode Scanner' : 'ماسح الباركود'}
              </h2>
            </div>
            <button
              onClick={handleClose}
              className="p-2 text-text-secondary hover:text-text-primary hover:bg-secondary-50 rounded-md transition-colors duration-200"
            >
              <Icon name="X" size={20} />
            </button>
          </div>

          {/* Scanner Area */}
          <div className="p-6">
            <div className="text-center mb-6">
              <div className="w-32 h-32 mx-auto mb-4 border-2 border-dashed border-secondary-300 rounded-lg flex items-center justify-center bg-secondary-50">
                {isScanning ? (
                  <div className="animate-pulse">
                    <Icon name="ScanLine" size={48} className="text-primary" />
                  </div>
                ) : (
                  <Icon name="QrCode" size={48} className="text-secondary" />
                )}
              </div>
              
              <p className="text-text-secondary mb-4">
                {isScanning 
                  ? (language === 'en' ? 'Scanning...' : 'جاري المسح...')
                  : (language === 'en' ? 'Position barcode within the frame' : 'ضع الباركود داخل الإطار')
                }
              </p>

              {!isScanning && (
                <button
                  onClick={simulateBarcodeScan}
                  className="btn-primary w-full mb-4"
                  disabled={isScanning}
                >
                  <Icon name="Camera" size={18} className="mr-2 rtl:ml-2 rtl:mr-0" />
                  {language === 'en' ? 'Start Scanning' : 'بدء المسح'}
                </button>
              )}
            </div>

            {/* Manual Entry */}
            <div className="border-t border-secondary-200 pt-4">
              <label className="block text-sm font-medium text-text-primary mb-2">
                {language === 'en' ? 'Or enter barcode manually:' : 'أو أدخل الباركود يدوياً:'}
              </label>
              <div className="flex space-x-2 rtl:space-x-reverse">
                <input
                  type="text"
                  value={scannedCode}
                  onChange={(e) => setScannedCode(e.target.value)}
                  placeholder={language === 'en' ? 'Enter barcode...' : 'أدخل الباركود...'}
                  className="input-field flex-1"
                  disabled={isScanning}
                />
                <button
                  onClick={handleManualEntry}
                  disabled={!scannedCode.trim() || isScanning}
                  className="btn-secondary disabled:opacity-50"
                >
                  <Icon name="Search" size={18} />
                </button>
              </div>
            </div>

            {/* Scanning Status */}
            {isScanning && (
              <div className="mt-4 p-3 bg-primary-50 border border-primary-200 rounded-md">
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <div className="animate-spin">
                    <Icon name="Loader2" size={16} className="text-primary" />
                  </div>
                  <span className="text-primary text-sm font-medium">
                    {language === 'en' ? 'Scanning in progress...' : 'المسح قيد التقدم...'}
                  </span>
                </div>
              </div>
            )}

            {/* Scanned Result */}
            {scannedCode && !isScanning && (
              <div className="mt-4 p-3 bg-success-50 border border-success-200 rounded-md">
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <Icon name="CheckCircle" size={16} className="text-success" />
                  <span className="text-success text-sm font-medium">
                    {language === 'en' ? 'Barcode detected:' : 'تم اكتشاف الباركود:'}
                  </span>
                </div>
                <p className="font-mono text-sm text-text-primary mt-1">{scannedCode}</p>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end space-x-3 rtl:space-x-reverse p-6 border-t border-secondary-200 bg-secondary-50">
            <button
              onClick={handleClose}
              className="btn-secondary"
              disabled={isScanning}
            >
              {language === 'en' ? 'Cancel' : 'إلغاء'}
            </button>
            {scannedCode && !isScanning && (
              <button
                onClick={handleManualEntry}
                className="btn-primary"
              >
                {language === 'en' ? 'Use This Code' : 'استخدم هذا الرمز'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BarcodeScanner;