import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import { NavigationProvider } from "components/ui/NavigationHeader";
import NavigationHeader from "components/ui/NavigationHeader";
import QuickActionPanel from "components/ui/QuickActionPanel";

import MainDashboard from "pages/main-dashboard";
import PatientRecordsManagement from "pages/patient-records-management";
import MedicationInventoryDispensing from "pages/medication-inventory-dispensing";
import PersonnelAttendanceTracking from "pages/personnel-attendance-tracking";
import ReportsAnalyticsDashboard from "pages/reports-analytics-dashboard";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <NavigationProvider>
          <ScrollToTop />
          <NavigationHeader />
          <QuickActionPanel />
          <RouterRoutes>
            <Route path="/" element={<MainDashboard />} />
            <Route path="/main-dashboard" element={<MainDashboard />} />
            <Route path="/patient-records-management" element={<PatientRecordsManagement />} />
            <Route path="/medication-inventory-dispensing" element={<MedicationInventoryDispensing />} />
            <Route path="/personnel-attendance-tracking" element={<PersonnelAttendanceTracking />} />
            <Route path="/reports-analytics-dashboard" element={<ReportsAnalyticsDashboard />} />
          </RouterRoutes>
        </NavigationProvider>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;