import React from 'react';
import { SitemapIcon } from './icons';

interface DevProgressButtonProps {
  onClick: () => void;
  pageId: string;
  pageName: string;
}

const DevProgressButton: React.FC<DevProgressButtonProps> = ({ onClick, pageId, pageName }) => {
  return (
    <button
      onClick={onClick}
      className="bg-indigo-600 text-white h-14 rounded-full shadow-lg flex items-center justify-center hover:bg-indigo-700 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 px-5 space-x-3"
      aria-label="顯示頁面結構"
    >
      <div className="text-right">
        <span className="block font-bold text-sm leading-tight">{pageId}</span>
        <span className="block text-xs leading-tight opacity-90">{pageName}</span>
      </div>
      <div className="h-8 w-px bg-white/40"></div>
      <SitemapIcon className="w-7 h-7" />
    </button>
  );
};

export default DevProgressButton;