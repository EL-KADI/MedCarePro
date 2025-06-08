import React from 'react';
import Icon from 'components/AppIcon';

const ReportCard = ({ 
  title, 
  value, 
  change, 
  trend, 
  icon, 
  color = 'primary', 
  suffix = '', 
  language 
}) => {
  const getColorClasses = (color) => {
    const colorMap = {
      primary: 'bg-primary-50 text-primary border-primary-100',
      accent: 'bg-accent-50 text-accent border-accent-100',
      success: 'bg-success-50 text-success border-success-100',
      warning: 'bg-warning-50 text-warning border-warning-100',
      error: 'bg-error-50 text-error border-error-100'
    };
    return colorMap[color] || colorMap.primary;
  };

  const formatValue = (value) => {
    if (typeof value === 'number') {
      return value.toLocaleString();
    }
    return value;
  };

  return (
    <div className="card p-6 hover:shadow-elevation-2 transition-shadow duration-200">
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${getColorClasses(color)}`}>
          <Icon name={icon} size={24} />
        </div>
        <div className={`flex items-center space-x-1 rtl:space-x-reverse text-sm font-medium ${
          trend === 'up' ? 'text-success' : trend === 'down' ? 'text-error' : 'text-text-secondary'
        }`}>
          {trend === 'up' && <Icon name="TrendingUp" size={16} />}
          {trend === 'down' && <Icon name="TrendingDown" size={16} />}
          {change !== undefined && (
            <span>
              {change > 0 ? '+' : ''}{change}%
            </span>
          )}
        </div>
      </div>
      
      <div className="mb-2">
        <div className="text-2xl font-bold text-text-primary">
          {formatValue(value)}{suffix}
        </div>
      </div>
      
      <div className="text-sm text-text-secondary">
        {title}
      </div>
      
      {change !== undefined && (
        <div className="mt-2 text-xs text-text-secondary">
          {language === 'en' ? 'vs last period' : 'مقارنة بالفترة السابقة'}
        </div>
      )}
    </div>
  );
};

export default ReportCard;