import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const ChartWidget = ({ title, description, children, actions = [] }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  const handleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const handleExport = () => {
    console.log('Exporting chart...');
  };

  return (
    <div className={`
      card transition-all duration-300
      ${isFullscreen 
        ? 'fixed inset-4 z-1020 overflow-auto' :'relative'
      }
    `}>
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-secondary-200">
        <div>
          <h3 className="text-lg font-semibold text-text-primary mb-1">
            {title}
          </h3>
          {description && (
            <p className="text-sm text-text-secondary">
              {description}
            </p>
          )}
        </div>
        
        <div className="flex items-center space-x-2 rtl:space-x-reverse">
          {actions.map((action, index) => (
            <button
              key={index}
              onClick={action.onClick}
              className="p-2 text-text-secondary hover:text-text-primary hover:bg-secondary-50 rounded-md transition-colors duration-200"
              title={action.title}
            >
              <Icon name={action.icon} size={16} />
            </button>
          ))}
          
          <button
            onClick={handleRefresh}
            disabled={isLoading}
            className="p-2 text-text-secondary hover:text-text-primary hover:bg-secondary-50 rounded-md transition-colors duration-200 disabled:opacity-50"
            title="Refresh"
          >
            <Icon 
              name="RefreshCw" 
              size={16} 
              className={isLoading ? 'animate-spin' : ''}
            />
          </button>
          
          <button
            onClick={handleExport}
            className="p-2 text-text-secondary hover:text-text-primary hover:bg-secondary-50 rounded-md transition-colors duration-200"
            title="Export Chart"
          >
            <Icon name="Download" size={16} />
          </button>
          
          <button
            onClick={handleFullscreen}
            className="p-2 text-text-secondary hover:text-text-primary hover:bg-secondary-50 rounded-md transition-colors duration-200"
            title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
          >
            <Icon name={isFullscreen ? "Minimize2" : "Maximize2"} size={16} />
          </button>
          
          {isFullscreen && (
            <button
              onClick={() => setIsFullscreen(false)}
              className="p-2 text-text-secondary hover:text-text-primary hover:bg-secondary-50 rounded-md transition-colors duration-200"
              title="Close"
            >
              <Icon name="X" size={16} />
            </button>
          )}
        </div>
      </div>

      {/* Content */}
      <div className={`
        p-6 relative
        ${isLoading ? 'opacity-50' : ''}
      `}>
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-surface bg-opacity-75 z-10">
            <div className="flex items-center space-x-2 rtl:space-x-reverse text-text-secondary">
              <Icon name="Loader2" size={20} className="animate-spin" />
              <span>Loading...</span>
            </div>
          </div>
        )}
        
        {children}
      </div>
    </div>
  );
};

export default ChartWidget;