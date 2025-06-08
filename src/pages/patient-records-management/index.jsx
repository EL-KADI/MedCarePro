import React, { useState, useEffect } from 'react';
import { useNavigation } from 'components/ui/NavigationHeader';
import Icon from 'components/AppIcon';
import PatientSearchPanel from './components/PatientSearchPanel';
import PatientDataTable from './components/PatientDataTable';
import PatientDetailModal from './components/PatientDetailModal';
import AddPatientModal from './components/AddPatientModal';
import BarcodeScanner from './components/BarcodeScanner';

const PatientRecordsManagement = () => {
  const { language } = useNavigation();
  const [patients, setPatients] = useState([]);
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [selectedPatients, setSelectedPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [searchFilters, setSearchFilters] = useState({
    name: '',
    barcode: '',
    hospital: '',
    clinic: '',
    visitDateFrom: '',
    visitDateTo: '',
    status: ''
  });

  // Mock patient data
  const mockPatients = [
    {
      id: 1,
      name: "Ahmed Hassan Al-Mahmoud",
      barcode: "PT001234567890",
      hospital: "King Fahd Medical City",
      clinic: "Internal Medicine",
      visitDate: "2024-01-15",
      reviewDate: "2024-01-29",
      status: "Active",
      age: 45,
      gender: "Male",
      phone: "+966501234567",
      nationalId: "1234567890",
      bloodType: "O+",
      allergies: ["Penicillin", "Shellfish"],
      complaints: `Patient presents with persistent chest pain radiating to left arm, accompanied by shortness of breath and mild nausea. Symptoms started 3 hours ago during physical activity. No previous history of cardiac events.
Patient reports family history of coronary artery disease. Currently taking medication for hypertension.`,
      symptoms: ["Chest pain", "Shortness of breath", "Nausea", "Left arm pain"],
      medications: [
        { name: "Aspirin 81mg", dosage: "Once daily", duration: "Ongoing" },
        { name: "Lisinopril 10mg", dosage: "Once daily", duration: "6 months" }
      ],
      vitals: {
        bloodPressure: "140/90",
        heartRate: "88 bpm",
        temperature: "37.2°C",
        weight: "78 kg",
        height: "175 cm"
      },
      visitHistory: [
        { date: "2024-01-15", clinic: "Internal Medicine", diagnosis: "Hypertension follow-up" },
        { date: "2023-12-10", clinic: "Cardiology", diagnosis: "Chest pain evaluation" },
        { date: "2023-11-05", clinic: "Internal Medicine", diagnosis: "Annual checkup" }
      ]
    },
    {
      id: 2,
      name: "Fatima Abdullah Al-Zahra",
      barcode: "PT001234567891",
      hospital: "Prince Sultan Medical Center",
      clinic: "Pediatrics",
      visitDate: "2024-01-16",
      reviewDate: "2024-01-30",
      status: "Scheduled",
      age: 8,
      gender: "Female",
      phone: "+966502345678",
      nationalId: "2345678901",
      bloodType: "A+",
      allergies: ["Latex"],
      complaints: `Child presents with fever, sore throat, and difficulty swallowing for the past 2 days. Mother reports decreased appetite and general fatigue. No recent travel or sick contacts.
Temperature peaked at 39.5°C yesterday evening. Child has been taking paracetamol with temporary relief.`,
      symptoms: ["Fever", "Sore throat", "Difficulty swallowing", "Fatigue", "Decreased appetite"],
      medications: [
        { name: "Paracetamol 250mg", dosage: "Every 6 hours", duration: "As needed" }
      ],
      vitals: {
        bloodPressure: "95/60",
        heartRate: "110 bpm",
        temperature: "38.8°C",
        weight: "25 kg",
        height: "125 cm"
      },
      visitHistory: [
        { date: "2024-01-16", clinic: "Pediatrics", diagnosis: "Acute pharyngitis" },
        { date: "2023-10-20", clinic: "Pediatrics", diagnosis: "Routine vaccination" },
        { date: "2023-08-15", clinic: "Pediatrics", diagnosis: "School physical exam" }
      ]
    },
    {
      id: 3,
      name: "Mohammed Saleh Al-Rashid",
      barcode: "PT001234567892",
      hospital: "National Guard Hospital",
      clinic: "Orthopedics",
      visitDate: "2024-01-17",
      reviewDate: "2024-02-01",
      status: "Completed",
      age: 32,
      gender: "Male",
      phone: "+966503456789",
      nationalId: "3456789012",
      bloodType: "B+",
      allergies: [],
      complaints: `Patient reports severe lower back pain following a workplace injury 1 week ago. Pain radiates down right leg with numbness and tingling in toes. Difficulty walking and standing for extended periods.
Pain is worse in the morning and improves slightly with movement. Patient works in construction and lifted heavy materials when injury occurred.`,
      symptoms: ["Lower back pain", "Right leg pain", "Numbness in toes", "Difficulty walking", "Morning stiffness"],
      medications: [
        { name: "Ibuprofen 600mg", dosage: "Three times daily", duration: "1 week" },
        { name: "Muscle relaxant", dosage: "Twice daily", duration: "5 days" }
      ],
      vitals: {
        bloodPressure: "125/80",
        heartRate: "72 bpm",
        temperature: "36.8°C",
        weight: "85 kg",
        height: "180 cm"
      },
      visitHistory: [
        { date: "2024-01-17", clinic: "Orthopedics", diagnosis: "Lumbar disc herniation" },
        { date: "2024-01-10", clinic: "Emergency", diagnosis: "Acute back injury" },
        { date: "2023-06-15", clinic: "Orthopedics", diagnosis: "Knee pain evaluation" }
      ]
    },
    {
      id: 4,
      name: "Sarah Ibrahim Al-Mansouri",
      barcode: "PT001234567893",
      hospital: "King Fahd Medical City",
      clinic: "Gynecology",
      visitDate: "2024-01-18",
      reviewDate: "2024-02-15",
      status: "Active",
      age: 28,
      gender: "Female",
      phone: "+966504567890",
      nationalId: "4567890123",
      bloodType: "AB+",
      allergies: ["Sulfa drugs"],
      complaints: `Patient presents for routine prenatal checkup at 20 weeks gestation. Reports mild morning sickness that has improved over the past month. Some back pain and fatigue, which is expected for gestational age.
No bleeding, cramping, or unusual discharge. Fetal movements felt regularly. Patient following prenatal vitamin regimen and maintaining healthy diet.`,
      symptoms: ["Mild back pain", "Fatigue", "Resolved morning sickness"],
      medications: [
        { name: "Prenatal vitamins", dosage: "Once daily", duration: "Throughout pregnancy" },
        { name: "Iron supplement", dosage: "Once daily", duration: "As prescribed" }
      ],
      vitals: {
        bloodPressure: "110/70",
        heartRate: "85 bpm",
        temperature: "36.6°C",
        weight: "65 kg",
        height: "165 cm"
      },
      visitHistory: [
        { date: "2024-01-18", clinic: "Gynecology", diagnosis: "Routine prenatal care - 20 weeks" },
        { date: "2023-12-20", clinic: "Gynecology", diagnosis: "Routine prenatal care - 16 weeks" },
        { date: "2023-11-15", clinic: "Gynecology", diagnosis: "First prenatal visit" }
      ]
    },
    {
      id: 5,
      name: "Omar Khalid Al-Dosari",
      barcode: "PT001234567894",
      hospital: "Prince Sultan Medical Center",
      clinic: "Dermatology",
      visitDate: "2024-01-19",
      reviewDate: "2024-02-02",
      status: "Scheduled",
      age: 55,
      gender: "Male",
      phone: "+966505678901",
      nationalId: "5678901234",
      bloodType: "O-",
      allergies: ["Latex", "Iodine"],
      complaints: `Patient presents with persistent skin rash on arms and chest that has been present for 3 weeks. Rash is itchy and appears to be spreading. No known triggers or recent changes in soap, detergent, or medications.
Patient works outdoors and wonders if sun exposure might be contributing. Has tried over-the-counter antihistamines with minimal relief.`,
      symptoms: ["Skin rash", "Itching", "Rash spreading", "Mild burning sensation"],
      medications: [
        { name: "Antihistamine", dosage: "Twice daily", duration: "1 week" },
        { name: "Topical corticosteroid", dosage: "Apply twice daily", duration: "2 weeks" }
      ],
      vitals: {
        bloodPressure: "130/85",
        heartRate: "75 bpm",
        temperature: "36.9°C",
        weight: "82 kg",
        height: "178 cm"
      },
      visitHistory: [
        { date: "2024-01-19", clinic: "Dermatology", diagnosis: "Contact dermatitis evaluation" },
        { date: "2023-09-10", clinic: "Dermatology", diagnosis: "Skin cancer screening" },
        { date: "2023-03-22", clinic: "Internal Medicine", diagnosis: "Annual physical" }
      ]
    }
  ];

  useEffect(() => {
    setPatients(mockPatients);
    setFilteredPatients(mockPatients);
  }, []);

  useEffect(() => {
    filterPatients();
  }, [searchFilters, patients]);

  const filterPatients = () => {
    let filtered = patients.filter(patient => {
      const matchesName = patient.name.toLowerCase().includes(searchFilters.name.toLowerCase());
      const matchesBarcode = patient.barcode.toLowerCase().includes(searchFilters.barcode.toLowerCase());
      const matchesHospital = !searchFilters.hospital || patient.hospital === searchFilters.hospital;
      const matchesClinic = !searchFilters.clinic || patient.clinic === searchFilters.clinic;
      const matchesStatus = !searchFilters.status || patient.status === searchFilters.status;
      
      let matchesDateRange = true;
      if (searchFilters.visitDateFrom) {
        matchesDateRange = matchesDateRange && new Date(patient.visitDate) >= new Date(searchFilters.visitDateFrom);
      }
      if (searchFilters.visitDateTo) {
        matchesDateRange = matchesDateRange && new Date(patient.visitDate) <= new Date(searchFilters.visitDateTo);
      }

      return matchesName && matchesBarcode && matchesHospital && matchesClinic && matchesStatus && matchesDateRange;
    });

    setFilteredPatients(filtered);
  };

  const handlePatientSelect = (patient) => {
    setSelectedPatient(patient);
    setIsDetailModalOpen(true);
  };

  const handleBarcodeScanned = (barcode) => {
    const patient = patients.find(p => p.barcode === barcode);
    if (patient) {
      handlePatientSelect(patient);
    } else {
      alert(language === 'en' ? 'Patient not found with this barcode' : 'لم يتم العثور على مريض بهذا الباركود');
    }
    setIsScannerOpen(false);
  };

  const handleAddPatient = (newPatient) => {
    const patient = {
      ...newPatient,
      id: patients.length + 1,
      barcode: `PT${Date.now()}`,
      visitHistory: []
    };
    setPatients([...patients, patient]);
    setIsAddModalOpen(false);
  };

  const handlePrintRecords = () => {
    if (selectedPatients.length === 0) {
      alert(language === 'en' ? 'Please select patients to print' : 'يرجى اختيار المرضى للطباعة');
      return;
    }
    
    const printContent = selectedPatients.map(patient => `
      Patient: ${patient.name}
      Barcode: ${patient.barcode}
      Hospital: ${patient.hospital}
      Clinic: ${patient.clinic}
      Visit Date: ${patient.visitDate}
      Status: ${patient.status}
    `).join('\n\n');
    
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
        <head><title>Patient Records</title></head>
        <body style="font-family: Arial, sans-serif; padding: 20px;">
          <h1>Patient Records Report</h1>
          <pre>${printContent}</pre>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  const handleExportData = () => {
    const csvContent = [
      ['Name', 'Barcode', 'Hospital', 'Clinic', 'Visit Date', 'Review Date', 'Status'],
      ...filteredPatients.map(patient => [
        patient.name,
        patient.barcode,
        patient.hospital,
        patient.clinic,
        patient.visitDate,
        patient.reviewDate,
        patient.status
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'patient_records.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-background pt-16">
      <div className="flex h-[calc(100vh-4rem)]">
        {/* Left Panel - Search and Filters */}
        <div className="w-full lg:w-[30%] border-r border-secondary-200 bg-surface">
          <PatientSearchPanel
            searchFilters={searchFilters}
            setSearchFilters={setSearchFilters}
            onScanBarcode={() => setIsScannerOpen(true)}
            language={language}
          />
        </div>

        {/* Right Panel - Patient Data Table */}
        <div className="w-full lg:w-[70%] flex flex-col bg-background">
          {/* Action Toolbar */}
          <div className="bg-surface border-b border-secondary-200 p-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <h1 className="text-xl font-semibold text-text-primary">
                  {language === 'en' ? 'Patient Records' : 'سجلات المرضى'}
                </h1>
                <span className="bg-primary-100 text-primary px-2 py-1 rounded-md text-sm font-medium">
                  {filteredPatients.length}
                </span>
              </div>
              
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <button
                  onClick={() => setIsAddModalOpen(true)}
                  className="btn-primary flex items-center space-x-2 rtl:space-x-reverse"
                >
                  <Icon name="UserPlus" size={18} />
                  <span>{language === 'en' ? 'Add Patient' : 'إضافة مريض'}</span>
                </button>
                
                <button
                  onClick={() => setIsScannerOpen(true)}
                  className="btn-secondary flex items-center space-x-2 rtl:space-x-reverse"
                >
                  <Icon name="ScanLine" size={18} />
                  <span>{language === 'en' ? 'Scan' : 'مسح'}</span>
                </button>
                
                <button
                  onClick={handlePrintRecords}
                  disabled={selectedPatients.length === 0}
                  className="btn-secondary flex items-center space-x-2 rtl:space-x-reverse disabled:opacity-50"
                >
                  <Icon name="Printer" size={18} />
                  <span>{language === 'en' ? 'Print' : 'طباعة'}</span>
                </button>
                
                <button
                  onClick={handleExportData}
                  className="btn-secondary flex items-center space-x-2 rtl:space-x-reverse"
                >
                  <Icon name="Download" size={18} />
                  <span>{language === 'en' ? 'Export' : 'تصدير'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Patient Data Table */}
          <div className="flex-1 overflow-hidden">
            <PatientDataTable
              patients={filteredPatients}
              selectedPatients={selectedPatients}
              setSelectedPatients={setSelectedPatients}
              onPatientSelect={handlePatientSelect}
              language={language}
            />
          </div>
        </div>
      </div>

      {/* Modals */}
      {isDetailModalOpen && selectedPatient && (
        <PatientDetailModal
          patient={selectedPatient}
          isOpen={isDetailModalOpen}
          onClose={() => setIsDetailModalOpen(false)}
          language={language}
        />
      )}

      {isAddModalOpen && (
        <AddPatientModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onSave={handleAddPatient}
          language={language}
        />
      )}

      {isScannerOpen && (
        <BarcodeScanner
          isOpen={isScannerOpen}
          onClose={() => setIsScannerOpen(false)}
          onScan={handleBarcodeScanned}
          language={language}
        />
      )}
    </div>
  );
};

export default PatientRecordsManagement;