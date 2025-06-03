import React from 'react';
import { FiAlertCircle, FiCheckCircle, FiInfo, FiXCircle } from 'react-icons/fi';

const Alert = ({ 
  children, 
  type = 'info', 
  title,
  className = '',
  onClose,
  ...props 
}) => {
  const typeClasses = {
    info: 'bg-blue-50 text-blue-800 border-blue-200',
    success: 'bg-green-50 text-green-800 border-green-200',
    warning: 'bg-yellow-50 text-yellow-800 border-yellow-200',
    error: 'bg-red-50 text-red-800 border-red-200',
  };
  
  const icons = {
    info: <FiInfo className="h-5 w-5 text-blue-500" />,
    success: <FiCheckCircle className="h-5 w-5 text-green-500" />,
    warning: <FiAlertCircle className="h-5 w-5 text-yellow-500" />,
    error: <FiXCircle className="h-5 w-5 text-red-500" />,
  };
  
  return (
    <div 
      className={`p-4 border rounded-md ${typeClasses[type]} ${className}`}
      role="alert"
      {...props}
    >
      <div className="flex">
        <div className="flex-shrink-0">
          {icons[type]}
        </div>
        <div className="ml-3 flex-1">
          {title && (
            <h3 className="text-sm font-medium">{title}</h3>
          )}
          <div className={title ? 'mt-2 text-sm' : 'text-sm'}>
            {children}
          </div>
        </div>
        {onClose && (
          <button
            type="button"
            className="ml-auto -mx-1.5 -my-1.5 rounded-md p-1.5 inline-flex text-gray-500 hover:text-gray-700 focus:outline-none"
            onClick={onClose}
          >
            <span className="sr-only">Dismiss</span>
            <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

export default Alert;
