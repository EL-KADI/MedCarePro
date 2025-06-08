// src/pages/medication-inventory-dispensing/components/MedicationInventoryTable.jsx
import React, { useState, useMemo } from 'react';
import Icon from 'components/AppIcon';
import Button from 'components/ui/Button';

const MedicationInventoryTable = ({ language, searchTerm, filters, onMedicationSelect }) => {
  const [sortField, setSortField] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');
  const [selectedMedications, setSelectedMedications] = useState([]);

  // Mock medication data
  const mockMedications = [
    {
      id: 'MED001',
      name: 'Amoxicillin 500mg',
      barcode: '8901234567890',
      category: 'antibiotics',
      currentStock: 150,
      minStock: 20,
      startDate: '2024-01-15',
      expiryDate: '2025-01-15',
      location: 'A-1-01',
      manufacturer: 'PharmaCorp',
      price: 25.50,
      status: 'available'
    },
    {
      id: 'MED002',
      name: 'Paracetamol 500mg',
      barcode: '8901234567891',
      category: 'painkillers',
      currentStock: 8,
      minStock: 15,
      startDate: '2024-02-01',
      expiryDate: '2024-12-31',
      location: 'B-2-05',
      manufacturer: 'MediLab',
      price: 12.00,
      status: 'low_stock'
    },
    {
      id: 'MED003',
      name: 'Vitamin D3 1000IU',
      barcode: '8901234567892',
      category: 'vitamins',
      currentStock: 75,
      minStock: 10,
      startDate: '2023-12-01',
      expiryDate: '2024-11-30',
      location: 'C-1-03',
      manufacturer: 'HealthVit',
      price: 18.75,
      status: 'expiry_warning'
    },
    {
      id: 'MED004',
      name: 'Metformin 850mg',
      barcode: '8901234567893',
      category: 'diabetes',
      currentStock: 200,
      minStock: 30,
      startDate: '2024-03-01',
      expiryDate: '2026-03-01',
      location: 'D-3-02',
      manufacturer: 'DiabetCare',
      price: 35.25,
      status: 'available'
    },
    {
      id: 'MED005',
      name: 'Lisinopril 10mg',
      barcode: '8901234567894',
      category: 'cardiac',
      currentStock: 0,
      minStock: 25,
      startDate: '2024-01-01',
      expiryDate: '2025-01-01',
      location: 'E-1-01',
      manufacturer: 'HeartMeds',
      price: 42.00,
      status: 'out_of_stock'
    }
  ];

  // Filter and sort medications
  const filteredAndSortedMedications = useMemo(() => {
    let filtered = mockMedications;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(med =>
        med.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        med.barcode.includes(searchTerm) ||
        med.id.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply category filter
    if (filters?.category && filters.category !== 'all') {
      filtered = filtered.filter(med => med.category === filters.category);
    }

    // Apply status filters
    if (filters?.showExpiryAlerts) {
      filtered = filtered.filter(med => med.status === 'expiry_warning');
    }
    if (filters?.showLowStock) {
      filtered = filtered.filter(med => med.status === 'low_stock' || med.status === 'out_of_stock');
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let aValue = a[sortField];
      let bValue = b[sortField];

      if (sortField === 'expiryDate' || sortField === 'startDate') {
        aValue = new Date(aValue);
        bValue = new Date(bValue);
      }

      if (sortDirection === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return filtered;
  }, [searchTerm, filters, sortField, sortDirection]);

  const handleSort = (field) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'available':
        return 'text-success bg-success-50 border-success-200';
      case 'low_stock':
        return 'text-warning bg-warning-50 border-warning-200';
      case 'out_of_stock':
        return 'text-error bg-error-50 border-error-200';
      case 'expiry_warning':
        return 'text-warning bg-warning-50 border-warning-200';
      default:
        return 'text-text-secondary bg-secondary-50 border-secondary-200';
    }
  };

  const getStatusLabel = (status) => {
    const labels = {
      available: { en: 'Available', ar: 'متاح' },
      low_stock: { en: 'Low Stock', ar: 'مخزون منخفض' },
      out_of_stock: { en: 'Out of Stock', ar: 'نفد المخزون' },
      expiry_warning: { en: 'Expiry Warning', ar: 'تحذير انتهاء صلاحية' }
    };
    return labels[status]?.[language] || status;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(language === 'ar' ? 'ar-SA' : 'en-US');
  };

  const isExpiringsoon = (expiryDate) => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const daysUntilExpiry = Math.ceil((expiry - today) / (1000 * 60 * 60 * 24));
    return daysUntilExpiry <= 30 && daysUntilExpiry > 0;
  };

  const handleSelectMedication = (medication) => {
    onMedicationSelect?.(medication);
  };

  const handleSelectAll = () => {
    if (selectedMedications.length === filteredAndSortedMedications.length) {
      setSelectedMedications([]);
    } else {
      setSelectedMedications(filteredAndSortedMedications.map(med => med.id));
    }
  };

  const handleSelectSingle = (medicationId) => {
    if (selectedMedications.includes(medicationId)) {
      setSelectedMedications(selectedMedications.filter(id => id !== medicationId));
    } else {
      setSelectedMedications([...selectedMedications, medicationId]);
    }
  };

  return (
    <div className="bg-surface h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-secondary-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-text-primary">
            {language === 'en' ? 'Medication Inventory' : 'مخزون الأدوية'}
          </h2>
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <span className="text-sm text-text-secondary">
              {language === 'en' ? 'Total:' : 'المجموع:'} {filteredAndSortedMedications.length}
            </span>
            <Button
              variant="outline"
              size="sm"
              iconName="RotateCcw"
            >
              {language === 'en' ? 'Refresh' : 'تحديث'}
            </Button>
          </div>
        </div>

        {/* Bulk Actions */}
        {selectedMedications.length > 0 && (
          <div className="flex items-center space-x-3 rtl:space-x-reverse p-3 bg-primary-50 border border-primary-200 rounded-md">
            <span className="text-sm font-medium text-primary">
              {language === 'en' ? `${selectedMedications.length} selected` : `${selectedMedications.length} محدد`}
            </span>
            <Button variant="outline" size="sm" iconName="Download">
              {language === 'en' ? 'Export' : 'تصدير'}
            </Button>
            <Button variant="outline" size="sm" iconName="Printer">
              {language === 'en' ? 'Print Labels' : 'طباعة التسميات'}
            </Button>
          </div>
        )}
      </div>

      {/* Table */}
      <div className="flex-1 overflow-auto">
        <table className="w-full">
          <thead className="bg-secondary-50 border-b border-secondary-200 sticky top-0">
            <tr>
              <th className="w-8 p-3 text-left">
                <input
                  type="checkbox"
                  checked={selectedMedications.length === filteredAndSortedMedications.length}
                  onChange={handleSelectAll}
                  className="rounded border-secondary-300 text-primary focus:ring-primary"
                />
              </th>
              <th
                className="p-3 text-left cursor-pointer hover:bg-secondary-100 transition-colors duration-200"
                onClick={() => handleSort('name')}
              >
                <div className="flex items-center space-x-1 rtl:space-x-reverse">
                  <span className="text-sm font-medium text-text-primary">
                    {language === 'en' ? 'Medication' : 'الدواء'}
                  </span>
                  <Icon
                    name={sortField === 'name' && sortDirection === 'desc' ? 'ChevronDown' : 'ChevronUp'}
                    size={14}
                    className={sortField === 'name' ? 'text-primary' : 'text-text-secondary'}
                  />
                </div>
              </th>
              <th className="p-3 text-left">
                <span className="text-sm font-medium text-text-primary">
                  {language === 'en' ? 'Barcode' : 'الباركود'}
                </span>
              </th>
              <th
                className="p-3 text-left cursor-pointer hover:bg-secondary-100 transition-colors duration-200"
                onClick={() => handleSort('currentStock')}
              >
                <div className="flex items-center space-x-1 rtl:space-x-reverse">
                  <span className="text-sm font-medium text-text-primary">
                    {language === 'en' ? 'Stock' : 'المخزون'}
                  </span>
                  <Icon
                    name={sortField === 'currentStock' && sortDirection === 'desc' ? 'ChevronDown' : 'ChevronUp'}
                    size={14}
                    className={sortField === 'currentStock' ? 'text-primary' : 'text-text-secondary'}
                  />
                </div>
              </th>
              <th
                className="p-3 text-left cursor-pointer hover:bg-secondary-100 transition-colors duration-200"
                onClick={() => handleSort('expiryDate')}
              >
                <div className="flex items-center space-x-1 rtl:space-x-reverse">
                  <span className="text-sm font-medium text-text-primary">
                    {language === 'en' ? 'Expiry Date' : 'تاريخ انتهاء الصلاحية'}
                  </span>
                  <Icon
                    name={sortField === 'expiryDate' && sortDirection === 'desc' ? 'ChevronDown' : 'ChevronUp'}
                    size={14}
                    className={sortField === 'expiryDate' ? 'text-primary' : 'text-text-secondary'}
                  />
                </div>
              </th>
              <th className="p-3 text-left">
                <span className="text-sm font-medium text-text-primary">
                  {language === 'en' ? 'Status' : 'الحالة'}
                </span>
              </th>
              <th className="p-3 text-center">
                <span className="text-sm font-medium text-text-primary">
                  {language === 'en' ? 'Actions' : 'الإجراءات'}
                </span>
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredAndSortedMedications.map((medication, index) => (
              <tr
                key={medication.id}
                className={`
                  border-b border-secondary-100 hover:bg-secondary-50 transition-colors duration-200
                  ${index % 2 === 0 ? 'bg-white' : 'bg-secondary-25'}
                `}
              >
                <td className="p-3">
                  <input
                    type="checkbox"
                    checked={selectedMedications.includes(medication.id)}
                    onChange={() => handleSelectSingle(medication.id)}
                    className="rounded border-secondary-300 text-primary focus:ring-primary"
                  />
                </td>
                <td className="p-3">
                  <div>
                    <p className="font-medium text-text-primary">{medication.name}</p>
                    <p className="text-xs text-text-secondary">{medication.manufacturer}</p>
                    <p className="text-xs text-text-secondary">{medication.location}</p>
                  </div>
                </td>
                <td className="p-3">
                  <span className="font-mono text-sm text-text-secondary">{medication.barcode}</span>
                </td>
                <td className="p-3">
                  <div className="text-sm">
                    <span className={`font-medium ${
                      medication.currentStock <= medication.minStock ? 'text-error' : 'text-text-primary'
                    }`}>
                      {medication.currentStock}
                    </span>
                    <span className="text-text-secondary"> / {medication.minStock} min</span>
                  </div>
                  {medication.currentStock <= medication.minStock && (
                    <div className="flex items-center space-x-1 rtl:space-x-reverse mt-1">
                      <Icon name="AlertTriangle" size={12} className="text-warning" />
                      <span className="text-xs text-warning">
                        {language === 'en' ? 'Low Stock' : 'مخزون منخفض'}
                      </span>
                    </div>
                  )}
                </td>
                <td className="p-3">
                  <div className="text-sm">
                    <span className="text-text-primary">{formatDate(medication.expiryDate)}</span>
                    {isExpiringSoon(medication.expiryDate) && (
                      <div className="flex items-center space-x-1 rtl:space-x-reverse mt-1">
                        <Icon name="Clock" size={12} className="text-warning" />
                        <span className="text-xs text-warning">
                          {language === 'en' ? 'Expiring Soon' : 'ينتهي قريباً'}
                        </span>
                      </div>
                    )}
                  </div>
                </td>
                <td className="p-3">
                  <span className={`px-2 py-1 rounded-md text-xs font-medium border ${getStatusColor(medication.status)}`}>
                    {getStatusLabel(medication.status)}
                  </span>
                </td>
                <td className="p-3">
                  <div className="flex items-center justify-center space-x-1 rtl:space-x-reverse">
                    <button
                      onClick={() => handleSelectMedication(medication)}
                      className="p-1 text-text-secondary hover:text-primary transition-colors duration-200"
                      title={language === 'en' ? 'Select for Dispensing' : 'اختر للصرف'}
                    >
                      <Icon name="Plus" size={16} />
                    </button>
                    <button
                      className="p-1 text-text-secondary hover:text-primary transition-colors duration-200"
                      title={language === 'en' ? 'Edit' : 'تعديل'}
                    >
                      <Icon name="Edit" size={16} />
                    </button>
                    <button
                      className="p-1 text-text-secondary hover:text-primary transition-colors duration-200"
                      title={language === 'en' ? 'View Details' : 'عرض التفاصيل'}
                    >
                      <Icon name="Eye" size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Empty State */}
        {filteredAndSortedMedications.length === 0 && (
          <div className="text-center py-12">
            <Icon name="Package" size={48} className="text-secondary mx-auto mb-4" />
            <h3 className="text-lg font-medium text-text-primary mb-2">
              {language === 'en' ? 'No medications found' : 'لم يتم العثور على أدوية'}
            </h3>
            <p className="text-text-secondary">
              {language === 'en' ? 'Try adjusting your search or filters' : 'حاول تعديل البحث أو المرشحات'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MedicationInventoryTable;