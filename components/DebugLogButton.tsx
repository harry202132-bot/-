import React from 'react';
import { CommandLineIcon } from './icons';

interface DebugLogButtonProps {
  onClick: () => void;
}

const DebugLogButton: React.FC<DebugLogButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="bg-gray-800 text-white h-14 w-14 rounded-full shadow-lg flex items-center justify-center hover:bg-gray-900 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-700"
      aria-label="查看 AI 思考過程"
      title="AI 思考過程紀錄"
    >
      <CommandLineIcon className="w-7 h-7" />
    </button>
  );
};

export default DebugLogButton;