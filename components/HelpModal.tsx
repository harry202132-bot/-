import React from 'react';
import { LineIcon } from './icons';

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const HelpModal: React.FC<HelpModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div 
        className="fixed inset-0 bg-black bg-opacity-60 z-[100] flex justify-center items-center" 
        aria-labelledby="help-modal-title" 
        role="dialog" 
        aria-modal="true"
        onClick={onClose}
    >
      <div 
        className="bg-white rounded-lg shadow-xl w-full max-w-sm m-4 transform transition-all text-center p-8 relative"
        onClick={e => e.stopPropagation()}
      >
        <h3 className="text-xl font-bold text-gray-800" id="help-modal-title">
            遇到問題了嗎？
        </h3>
        <p className="mt-2 text-gray-600">
            歡迎加入我們的官方 LINE，將有專人為您即時解答註冊相關問題。
        </p>
        
        <img 
            src="https://i.imgur.com/QR48I0p.png" 
            alt="LINE QR Code" 
            className="w-48 h-48 rounded-lg shadow-sm mx-auto my-6" 
        />
        
        <a 
            href="https://line.me/ti/p/@your-line-id" 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center bg-[#00B900] text-white px-6 py-3 rounded-md font-semibold hover:bg-[#00a300] transition-colors"
        >
            <LineIcon className="w-5 h-5 mr-2" />
            點此加入 LINE 好友
        </a>
        
        <button 
            onClick={onClose} 
            className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
            aria-label="關閉"
        >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
        </button>
      </div>
    </div>
  );
};

export default HelpModal;