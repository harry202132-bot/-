import React from 'react';
import { SparklesIcon } from './icons';

interface FlowCaptureButtonProps {
  onClick: () => void;
}

const FlowCaptureButton: React.FC<FlowCaptureButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="bg-purple-600 text-white h-14 w-14 rounded-full shadow-lg flex items-center justify-center hover:bg-purple-700 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
      aria-label="從畫面擷取流程"
    >
      <SparklesIcon className="w-7 h-7" />
    </button>
  );
};

export default FlowCaptureButton;
