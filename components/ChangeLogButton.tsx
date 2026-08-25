import React from 'react';
import { PencilSquareIcon } from './icons';

interface ChangeLogButtonProps {
  onClick: () => void;
}

const ChangeLogButton: React.FC<ChangeLogButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="bg-green-600 text-white h-14 w-14 rounded-full shadow-lg flex items-center justify-center hover:bg-green-700 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
      aria-label="開啟需求變更紀錄"
    >
      <PencilSquareIcon className="w-7 h-7" />
    </button>
  );
};

export default ChangeLogButton;