import React from 'react';
import Icon from 'components/AppIcon';

const SummaryCard = ({ data, language, onClick }) => {
  const getColorClasses = (color) => {
    const colorMap = {
      primary: {
        bg: 'bg-primary-50',
        icon: 'bg-primary text-white',
        text: 'text-primary',
        border: 'border-primary-200'
      },
      accent: {
        bg: 'bg-accent-50',
        icon: 'bg-accent text-white',
        text: 'text-accent',
        border: 'border-emerald-200'
      },
      warning: {
        bg: 'bg-warning-50',
        icon: 'bg-warning text-white',
        text: 'text-warning',
        border: 'border-warning-200'
      },
      secondary: {
        bg: 'bg-secondary-100',
        icon: 'bg-secondary text-white',
        text: 'text-secondary',
        border: 'border-secondary-200'
      }
    };
    return colorMap[color] || colorMap.primary;
  };

  const colors = getColorClasses(data.color);

  return (
    <div
      onClick={onClick}
      className={`
        card p-6 cursor-pointer transition-all duration-200 hover:shadow-elevation-2
        ${colors.bg} ${colors.border} border hover:border-opacity-50
        transform hover:scale-105
      `}
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 rounded-lg ${colors.icon} flex items-center justify-center`}>
          <Icon name={data.icon} size={24} />
        </div>
        
        <div className={`flex items-center space-x-1 rtl:space-x-reverse text-sm ${colors.text}`}>
          <Icon 
            name={data.change.type === 'increase' ? 'TrendingUp' : 'TrendingDown'} 
            size={16} 
          />
          <span className="font-medium">
            {data.change.type === 'increase' ? '+' : '-'}{data.change.value}
          </span>
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-2xl font-bold text-text-primary">
          {data.value.toLocaleString(language === 'ar' ? 'ar-SA' : 'en-US')}
        </h3>
        
        <div>
          <p className="font-medium text-text-primary text-sm">
            {data.title[language]}
          </p>
          <p className="text-xs text-text-secondary">
            {data.description[language]}
          </p>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-secondary-200 border-opacity-50">
        <div className="flex items-center justify-between">
          <span className="text-xs text-text-secondary">
            {language === 'en' ? 'View Details' : 'عرض التفاصيل'}
          </span>
          <Icon name="ArrowRight" size={14} className={colors.text} />
        </div>
      </div>
    </div>
  );
};

export default SummaryCard;