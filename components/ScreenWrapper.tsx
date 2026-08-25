import React, { FC, ReactNode } from 'react';

interface ScreenWrapperProps {
  title: string;
  children: ReactNode;
}

const ScreenWrapper: FC<ScreenWrapperProps> = ({ title, children }) => {
  return (
    <div className="bg-white rounded-lg shadow-2xl border border-gray-300 w-full">
      {/* Window Header */}
      <div className="h-10 bg-gray-200 rounded-t-lg flex items-center px-4 border-b border-gray-300">
        <div className="flex space-x-2">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
        </div>
        <div className="flex-1 text-center text-sm text-gray-700 font-medium truncate">
          {title}
        </div>
        <div className="w-12"></div> {/* Spacer to balance the controls */}
      </div>
      
      {/* Content */}
      <div className="bg-white rounded-b-lg">
         <div className="p-1">
            {children}
         </div>
      </div>
    </div>
  );
};

export default ScreenWrapper;
