import React, { useState, useContext, createContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Icon from "../AppIcon";

const NavigationContext = createContext();

export const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error("useNavigation must be used within NavigationProvider");
  }
  return context;
};

export const NavigationProvider = ({ children }) => {
  const [language, setLanguage] = useState(
    localStorage.getItem("language") || "en"
  );
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleLanguage = () => {
    const newLanguage = language === "en" ? "ar" : "en";
    setLanguage(newLanguage);
    localStorage.setItem("language", newLanguage);
    document.documentElement.dir = newLanguage === "ar" ? "rtl" : "ltr";
  };

  const value = {
    language,
    toggleLanguage,
    isMenuOpen,
    setIsMenuOpen,
  };

  return (
    <NavigationContext.Provider value={value}>
      {children}
    </NavigationContext.Provider>
  );
};

const NavigationHeader = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { language, toggleLanguage, isMenuOpen, setIsMenuOpen } =
    useNavigation();
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const navigationItems = [
    {
      path: "/main-dashboard",
      label: { en: "Dashboard", ar: "لوحة التحكم" },
      icon: "LayoutDashboard",
      tooltip: {
        en: "Main operational overview",
        ar: "نظرة عامة على العمليات الرئيسية",
      },
    },
    {
      path: "/patient-records-management",
      label: { en: "Patients", ar: "المرضى" },
      icon: "Users",
      tooltip: {
        en: "Patient records and management",
        ar: "سجلات المرضى والإدارة",
      },
    },
    {
      path: "/medication-inventory-dispensing",
      label: { en: "Pharmacy", ar: "الصيدلية" },
      icon: "Pill",
      tooltip: {
        en: "Medication inventory and dispensing",
        ar: "مخزون الأدوية والصرف",
      },
    },
    {
      path: "/personnel-attendance-tracking",
      label: { en: "Personnel", ar: "الموظفون" },
      icon: "UserCheck",
      tooltip: {
        en: "Staff management and attendance",
        ar: "إدارة الموظفين والحضور",
      },
    },
    {
      path: "/reports-analytics-dashboard",
      label: { en: "Reports", ar: "التقارير" },
      icon: "BarChart3",
      tooltip: { en: "Analytics and reporting", ar: "التحليلات والتقارير" },
    },
  ];

  const handleNavigation = (path) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <header className="fixed top-0 left-0 right-0 z-1000 bg-surface border-b border-secondary-200 shadow-elevation-1">
      <div className="flex items-center justify-between h-16 px-4 lg:px-6">
        <div className="flex items-center space-x-4 rtl:space-x-reverse">
          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <svg
                viewBox="0 0 24 24"
                className="w-6 h-6 text-white"
                fill="currentColor"
              >
                <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z" />
                <path d="M12 8C14.21 8 16 9.79 16 12S14.21 16 12 16 8 14.21 8 12 9.79 8 12 8Z" />
              </svg>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg font-semibold text-text-primary">
                {language === "en" ? "MedCare Pro" : "ميدكير برو"}
              </h1>
              <p className="text-xs text-text-secondary">
                {language === "en"
                  ? "Healthcare Management"
                  : "إدارة الرعاية الصحية"}
              </p>
            </div>
          </div>
        </div>

        <nav className="hidden lg:flex items-center space-x-1 rtl:space-x-reverse">
          {navigationItems.map((item) => (
            <button
              key={item.path}
              onClick={() => handleNavigation(item.path)}
              className={`
                flex items-center space-x-2 rtl:space-x-reverse px-4 py-2 rounded-md text-sm font-medium
                transition-colors duration-200 group relative
                ${
                  isActive(item.path)
                    ? "bg-primary-50 text-primary border border-primary-100"
                    : "text-text-secondary hover:text-text-primary hover:bg-secondary-50"
                }
              `}
              title={item.tooltip[language]}
            >
              <Icon name={item.icon} size={18} />
              <span>{item.label[language]}</span>
              {isActive(item.path) && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />
              )}
            </button>
          ))}
        </nav>

        <div className="flex items-center space-x-3 rtl:space-x-reverse">
          <button
            className="p-2 text-text-secondary hover:text-text-primary hover:bg-secondary-50 rounded-md transition-colors duration-200"
            title={language === "en" ? "Barcode Scanner" : "ماسح الباركود"}
          ></button>

          <button
            onClick={toggleLanguage}
            className="flex items-center space-x-2 rtl:space-x-reverse px-3 py-2 text-sm font-medium text-text-secondary hover:text-text-primary hover:bg-secondary-50 rounded-md transition-colors duration-200"
            title={
              language === "en" ? "Switch to Arabic" : "التبديل إلى الإنجليزية"
            }
          >
            <Icon name="Languages" size={18} />
            <span className="hidden sm:inline">
              {language === "en" ? "العربية" : "English"}
            </span>
          </button>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 text-text-secondary hover:text-text-primary hover:bg-secondary-50 rounded-md transition-colors duration-200"
          >
            <Icon name={isMenuOpen ? "X" : "Menu"} size={20} />
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="lg:hidden bg-surface border-t border-secondary-200 shadow-elevation-2">
          <nav className="px-4 py-2 space-y-1">
            {navigationItems.map((item) => (
              <button
                key={item.path}
                onClick={() => handleNavigation(item.path)}
                className={`
                  w-full flex items-center space-x-3 rtl:space-x-reverse px-3 py-3 rounded-md text-sm font-medium
                  transition-colors duration-200
                  ${
                    isActive(item.path)
                      ? "bg-primary-50 text-primary border border-primary-100"
                      : "text-text-secondary hover:text-text-primary hover:bg-secondary-50"
                  }
                `}
              >
                <Icon name={item.icon} size={20} />
                <span>{item.label[language]}</span>
              </button>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default NavigationHeader;
