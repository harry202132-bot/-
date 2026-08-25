import React from 'react';
import { CheckCircleIcon } from './icons';

// This is a non-interactive, visual-only representation of a modal
// for use within the UIFlowCanvas.
interface SuccessModalProps {
  title?: string;
  message?: string;
  buttons?: string[] | null; // Allow null to handle potential AI response
}

const SuccessModal: React.FC<SuccessModalProps> = ({ 
    title = "操作成功", 
    message = "您的變更已成功儲存。",
    buttons: rawButtons = ["確認"]
}) => {
  // Ensure buttons is a valid array, defaulting to ["確認"] if rawButtons is null or undefined.
  const buttons = rawButtons || ["確認"];
    
  return (
    <div className="bg-white rounded-lg shadow-xl w-full max-w-md m-4 transform transition-all border border-gray-200">
      <div className="p-6">
        <div className="text-center">
          <CheckCircleIcon className="w-12 h-12 text-green-500 mx-auto mb-4" />
          <h3 className="text-base leading-6 font-medium text-gray-900">
            {title}
          </h3>
          <div className="mt-2">
            <p className="text-sm text-gray-500">{message}</p>
          </div>
        </div>
      </div>
      <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse rounded-b-lg">
        {buttons.map((btnText, index) => (
             <button
                key={index}
                type="button"
                className={`w-full inline-flex justify-center rounded-md border shadow-sm px-4 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto ${
                    index === 0 
                    ? 'border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500'
                    : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-indigo-500'
                }`}
                // This component is for display only, so buttons are disabled
                disabled
             >
                {btnText}
            </button>
        ))}
      </div>
    </div>
  );
};

export default SuccessModal;