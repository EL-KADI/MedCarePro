// src/pages/medication-inventory-dispensing/index.jsx
import React, { useState, useEffect } from 'react';
import { useNavigation } from 'components/ui/NavigationHeader';
import Icon from 'components/AppIcon';
import MedicationSearchPanel from './components/MedicationSearchPanel';
import MedicationInventoryTable from './components/MedicationInventoryTable';
import DispensingPanel from './components/DispensingPanel';

const MedicationInventoryDispensing = () => {
  const { language } = useNavigation();
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    category: 'all',
    showExpiryAlerts: false,
    showLowStock: false
  });
  const [selectedMedication, setSelectedMedication] = useState(null);
  const [criticalAlerts, setCriticalAlerts] = useState([]);
  const [isMobileView, setIsMobileView] = useState(false);
  const [activePanel, setActivePanel] = useState('inventory'); // 'search', 'inventory', 'dispensing'

  // Handle responsive layout
  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 1024);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Mock critical alerts
  useEffect(() => {
    const mockAlerts = [
      {
        id: 1,
        type: 'expired',
        message: language === 'en' ? '3 medications have expired' : '3 أدوية منتهية الصلاحية',
        severity: 'high',
        count: 3
      },
      {
        id: 2,
        type: 'low_stock',
        message: language === 'en' ? '5 medications are low on stock' : '5 أدوية ناقصة في المخزون',
        severity: 'medium',
        count: 5
      },
      {
        id: 3,
        type: 'expiring_soon',
        message: language === 'en' ? '8 medications expiring within 30 days' : '8 أدوية تنتهي صلاحيتها خلال 30 يوماً',
        severity: 'low',
        count: 8
      }
    ];
    setCriticalAlerts(mockAlerts);
  }, [language]);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleMedicationSelect = (medication) => {
    setSelectedMedication(medication);
    if (isMobileView) {
      setActivePanel('dispensing');
    }
  };

  const renderMobileNavigation = () => (
    <div className="lg:hidden bg-surface border-b border-secondary-200 px-4 py-2">
      <div className="flex space-x-1 rtl:space-x-reverse">
        {[
          { key: 'search', label: language === 'en' ? 'Search' : 'البحث', icon: 'Search' },
          { key: 'inventory', label: language === 'en' ? 'Inventory' : 'المخزون', icon: 'Package' },
          { key: 'dispensing', label: language === 'en' ? 'Dispense' : 'الصرف', icon: 'ShoppingCart' }
        ].map((panel) => (
          <button
            key={panel.key}
            onClick={() => setActivePanel(panel.key)}
            className={`
              flex-1 flex items-center justify-center space-x-1 rtl:space-x-reverse py-2 px-3 rounded-md text-sm font-medium transition-colors duration-200
              ${activePanel === panel.key
                ? 'bg-primary-50 text-primary border border-primary-200' :'text-text-secondary hover:text-text-primary hover:bg-secondary-50'
              }
            `}
          >
            <Icon name={panel.icon} size={16} />
            <span>{panel.label}</span>
          </button>
        ))}
      </div>
    </div>
  );

  const renderCriticalAlerts = () => (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-text-primary">
          {language === 'en' ? 'Critical Alerts' : 'التنبيهات الحرجة'}
        </h2>
        <button className="text-sm text-primary hover:text-primary/80 transition-colors duration-200">
          {language === 'en' ? 'View All' : 'عرض الكل'}
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {criticalAlerts.map((alert) => (
          <div
            key={alert.id}
            className={`
              p-4 rounded-lg border-l-4 bg-opacity-50
              ${alert.severity === 'high' ? 'border-error bg-error-50' :
                alert.severity === 'medium'? 'border-warning bg-warning-50' : 'border-accent bg-accent-50'
              }
            `}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <Icon
                  name={alert.type === 'expired' ? 'AlertTriangle' :
                        alert.type === 'low_stock' ? 'TrendingDown' : 'Clock'}
                  size={20}
                  className={alert.severity === 'high' ? 'text-error' :
                            alert.severity === 'medium' ? 'text-warning' : 'text-accent'}
                />
                <span className="font-medium text-text-primary">{alert.count}</span>
              </div>
            </div>
            <p className="text-sm text-text-secondary mt-1">{alert.message}</p>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background pt-16">
      <div className="max-w-full mx-auto h-[calc(100vh-4rem)] flex flex-col">
        {/* Page Header */}
        <div className="bg-surface border-b border-secondary-200 px-4 lg:px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-text-primary">
                {language === 'en' ? 'Medication Inventory & Dispensing' : 'مخزون الأدوية والصرف'}
              </h1>
              <p className="text-text-secondary mt-1">
                {language === 'en' ?'Manage medication inventory and process dispensing requests' :'إدارة مخزون الأدوية ومعالجة طلبات الصرف'
                }
              </p>
            </div>
            
            <div className="flex items-center space-x-3 rtl:space-x-reverse">
              <button className="p-2 text-text-secondary hover:text-primary hover:bg-secondary-50 rounded-md transition-colors duration-200">
                <Icon name="Settings" size={20} />
              </button>
              <button className="p-2 text-text-secondary hover:text-primary hover:bg-secondary-50 rounded-md transition-colors duration-200">
                <Icon name="HelpCircle" size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Critical Alerts */}
        <div className="px-4 lg:px-6 py-4 bg-surface border-b border-secondary-200">
          {renderCriticalAlerts()}
        </div>

        {/* Mobile Navigation */}
        {renderMobileNavigation()}

        {/* Main Content */}
        <div className="flex-1 flex overflow-hidden">
          {/* Desktop Three-Panel Layout */}
          {!isMobileView ? (
            <>
              {/* Left Panel - Search */}
              <div className="w-1/4 min-w-[300px] flex-shrink-0">
                <MedicationSearchPanel
                  language={language}
                  onSearch={handleSearch}
                  onFilterChange={handleFilterChange}
                  filters={filters}
                />
              </div>

              {/* Center Panel - Inventory */}
              <div className="flex-1">
                <MedicationInventoryTable
                  language={language}
                  searchTerm={searchTerm}
                  filters={filters}
                  onMedicationSelect={handleMedicationSelect}
                />
              </div>

              {/* Right Panel - Dispensing */}
              <div className="w-1/4 min-w-[300px] flex-shrink-0">
                <DispensingPanel
                  language={language}
                  selectedMedication={selectedMedication}
                />
              </div>
            </>
          ) : (
            /* Mobile Single Panel Layout */
            <div className="flex-1">
              {activePanel === 'search' && (
                <MedicationSearchPanel
                  language={language}
                  onSearch={handleSearch}
                  onFilterChange={handleFilterChange}
                  filters={filters}
                />
              )}
              {activePanel === 'inventory' && (
                <MedicationInventoryTable
                  language={language}
                  searchTerm={searchTerm}
                  filters={filters}
                  onMedicationSelect={handleMedicationSelect}
                />
              )}
              {activePanel === 'dispensing' && (
                <DispensingPanel
                  language={language}
                  selectedMedication={selectedMedication}
                />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MedicationInventoryDispensing;