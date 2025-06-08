import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from 'components/AppIcon';
import { useNavigation } from 'components/ui/NavigationHeader';

const NotFound = () => {
  const navigate = useNavigate();
  const { language } = useNavigation();

  const handleGoHome = () => {
    navigate('/main-dashboard');
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <div className="w-24 h-24 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <Icon name="FileX" size={48} className="text-primary" />
          </div>
          <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-text-primary mb-2">
            {language === 'en' ? 'Page Not Found' : 'الصفحة غير موجودة'}
          </h2>
          <p className="text-text-secondary mb-8">
            {language === 'en' ?'The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.' :'قد تكون الصفحة التي تبحث عنها قد تم حذفها أو تغيير اسمها أو غير متاحة مؤقتاً.'
            }
          </p>
        </div>
        
        <div className="space-y-4">
          <button
            onClick={handleGoHome}
            className="w-full btn-primary flex items-center justify-center space-x-2 rtl:space-x-reverse"
          >
            <Icon name="Home" size={20} />
            <span>
              {language === 'en' ? 'Go to Dashboard' : 'الذهاب إلى لوحة التحكم'}
            </span>
          </button>
          
          <button
            onClick={() => navigate(-1)}
            className="w-full btn-secondary flex items-center justify-center space-x-2 rtl:space-x-reverse"
          >
            <Icon name="ArrowLeft" size={20} />
            <span>
              {language === 'en' ? 'Go Back' : 'العودة'}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;