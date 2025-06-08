import React, { useState, useMemo } from 'react';
import Icon from 'components/AppIcon';

const PatientDataTable = ({ 
  patients, 
  selectedPatients, 
  setSelectedPatients, 
  onPatientSelect, 
  language 
}) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedPatients = React.useMemo(() => {
    if (!sortConfig.key) return patients;

    return [...patients].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      if (aValue < bValue) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }, [patients, sortConfig]);

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedPatients(patients.map(p => p.id));
    } else {
      setSelectedPatients([]);
    }
  };

  const handleSelectPatient = (patientId, checked) => {
    if (checked) {
      setSelectedPatients([...selectedPatients, patientId]);
    } else {
      setSelectedPatients(selectedPatients.filter(id => id !== patientId));
    }
  };

  const getStatusColor = (status) => {
    const statusColors = {
      'Active': 'bg-success-100 text-success border-success-200',
      'Scheduled': 'bg-warning-100 text-warning border-warning-200',
      'Completed': 'bg-secondary-100 text-secondary-600 border-secondary-200',
      'Cancelled': 'bg-error-100 text-error border-error-200'
    };
    return statusColors[status] || 'bg-secondary-100 text-secondary-600 border-secondary-200';
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return language === 'en' ? date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
      : date.toLocaleDateString('ar-SA', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  const SortIcon = ({ column }) => {
    if (sortConfig.key !== column) {
      return <Icon name="ArrowUpDown" size={14} className="text-text-secondary" />;
    }
    return sortConfig.direction === 'asc' 
      ? <Icon name="ArrowUp" size={14} className="text-primary" />
      : <Icon name="ArrowDown" size={14} className="text-primary" />;
  };

  return (
    <div className="h-full flex flex-col">
      {/* Desktop Table View */}
      <div className="hidden lg:block h-full overflow-auto">
        <table className="w-full">
          <thead className="bg-secondary-50 border-b border-secondary-200 sticky top-0">
            <tr>
              <th className="w-12 p-4">
                <input
                  type="checkbox"
                  checked={selectedPatients.length === patients.length && patients.length > 0}
                  onChange={(e) => handleSelectAll(e.target.checked)}
                  className="rounded border-secondary-300 text-primary focus:ring-primary"
                />
              </th>
              <th 
                className="text-left rtl:text-right p-4 text-sm font-semibold text-text-primary cursor-pointer hover:bg-secondary-100 transition-colors duration-200"
                onClick={() => handleSort('name')}
              >
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <span>{language === 'en' ? 'Patient Name' : 'اسم المريض'}</span>
                  <SortIcon column="name" />
                </div>
              </th>
              <th 
                className="text-left rtl:text-right p-4 text-sm font-semibold text-text-primary cursor-pointer hover:bg-secondary-100 transition-colors duration-200"
                onClick={() => handleSort('barcode')}
              >
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <span>{language === 'en' ? 'Barcode' : 'الباركود'}</span>
                  <SortIcon column="barcode" />
                </div>
              </th>
              <th 
                className="text-left rtl:text-right p-4 text-sm font-semibold text-text-primary cursor-pointer hover:bg-secondary-100 transition-colors duration-200"
                onClick={() => handleSort('hospital')}
              >
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <span>{language === 'en' ? 'Hospital' : 'المستشفى'}</span>
                  <SortIcon column="hospital" />
                </div>
              </th>
              <th 
                className="text-left rtl:text-right p-4 text-sm font-semibold text-text-primary cursor-pointer hover:bg-secondary-100 transition-colors duration-200"
                onClick={() => handleSort('clinic')}
              >
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <span>{language === 'en' ? 'Clinic' : 'العيادة'}</span>
                  <SortIcon column="clinic" />
                </div>
              </th>
              <th 
                className="text-left rtl:text-right p-4 text-sm font-semibold text-text-primary cursor-pointer hover:bg-secondary-100 transition-colors duration-200"
                onClick={() => handleSort('visitDate')}
              >
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <span>{language === 'en' ? 'Visit Date' : 'تاريخ الزيارة'}</span>
                  <SortIcon column="visitDate" />
                </div>
              </th>
              <th 
                className="text-left rtl:text-right p-4 text-sm font-semibold text-text-primary cursor-pointer hover:bg-secondary-100 transition-colors duration-200"
                onClick={() => handleSort('reviewDate')}
              >
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <span>{language === 'en' ? 'Review Date' : 'تاريخ المراجعة'}</span>
                  <SortIcon column="reviewDate" />
                </div>
              </th>
              <th 
                className="text-left rtl:text-right p-4 text-sm font-semibold text-text-primary cursor-pointer hover:bg-secondary-100 transition-colors duration-200"
                onClick={() => handleSort('status')}
              >
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <span>{language === 'en' ? 'Status' : 'الحالة'}</span>
                  <SortIcon column="status" />
                </div>
              </th>
              <th className="w-20 p-4 text-sm font-semibold text-text-primary">
                {language === 'en' ? 'Actions' : 'الإجراءات'}
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedPatients.map((patient) => (
              <tr 
                key={patient.id}
                className="border-b border-secondary-100 hover:bg-secondary-50 transition-colors duration-200"
              >
                <td className="p-4">
                  <input
                    type="checkbox"
                    checked={selectedPatients.includes(patient.id)}
                    onChange={(e) => handleSelectPatient(patient.id, e.target.checked)}
                    className="rounded border-secondary-300 text-primary focus:ring-primary"
                  />
                </td>
                <td className="p-4">
                  <div className="flex items-center space-x-3 rtl:space-x-reverse">
                    <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                      <Icon name="User" size={18} className="text-primary" />
                    </div>
                    <div>
                      <div className="font-medium text-text-primary">{patient.name}</div>
                      <div className="text-sm text-text-secondary">
                        {patient.age} {language === 'en' ? 'years' : 'سنة'} • {patient.gender}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <span className="font-mono text-sm text-text-secondary bg-secondary-50 px-2 py-1 rounded">
                    {patient.barcode}
                  </span>
                </td>
                <td className="p-4 text-text-primary">{patient.hospital}</td>
                <td className="p-4 text-text-primary">{patient.clinic}</td>
                <td className="p-4 text-text-secondary">{formatDate(patient.visitDate)}</td>
                <td className="p-4 text-text-secondary">{formatDate(patient.reviewDate)}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded-md text-xs font-medium border ${getStatusColor(patient.status)}`}>
                    {patient.status}
                  </span>
                </td>
                <td className="p-4">
                  <button
                    onClick={() => onPatientSelect(patient)}
                    className="p-2 text-text-secondary hover:text-primary hover:bg-primary-50 rounded-md transition-colors duration-200"
                    title={language === 'en' ? 'View Details' : 'عرض التفاصيل'}
                  >
                    <Icon name="Eye" size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="lg:hidden h-full overflow-auto p-4 space-y-4">
        {sortedPatients.map((patient) => (
          <div 
            key={patient.id}
            className="card p-4 cursor-pointer hover:shadow-elevation-2 transition-shadow duration-200"
            onClick={() => onPatientSelect(patient)}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <input
                  type="checkbox"
                  checked={selectedPatients.includes(patient.id)}
                  onChange={(e) => {
                    e.stopPropagation();
                    handleSelectPatient(patient.id, e.target.checked);
                  }}
                  className="rounded border-secondary-300 text-primary focus:ring-primary"
                />
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                  <Icon name="User" size={20} className="text-primary" />
                </div>
              </div>
              <span className={`px-2 py-1 rounded-md text-xs font-medium border ${getStatusColor(patient.status)}`}>
                {patient.status}
              </span>
            </div>
            
            <div className="space-y-2">
              <h3 className="font-semibold text-text-primary">{patient.name}</h3>
              <div className="text-sm text-text-secondary space-y-1">
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <Icon name="Hash" size={14} />
                  <span className="font-mono">{patient.barcode}</span>
                </div>
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <Icon name="Building2" size={14} />
                  <span>{patient.hospital}</span>
                </div>
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <Icon name="Stethoscope" size={14} />
                  <span>{patient.clinic}</span>
                </div>
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <Icon name="Calendar" size={14} />
                  <span>{formatDate(patient.visitDate)}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {patients.length === 0 && (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="Users" size={32} className="text-secondary" />
            </div>
            <h3 className="text-lg font-semibold text-text-primary mb-2">
              {language === 'en' ? 'No Patients Found' : 'لم يتم العثور على مرضى'}
            </h3>
            <p className="text-text-secondary">
              {language === 'en' ?'Start by adding a new patient or scanning a barcode' :'ابدأ بإضافة مريض جديد أو مسح الباركود'
              }
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientDataTable;