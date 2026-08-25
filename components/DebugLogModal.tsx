import React from 'react';
import { XMarkIcon, CommandLineIcon } from './icons';

export interface LogEntry {
    id: number;
    timestamp: string;
    title: string;
    content: string;
    type: 'request' | 'response' | 'error';
}

interface DebugLogModalProps {
  isOpen: boolean;
  onClose: () => void;
  logs: LogEntry[];
}

const DebugLogModal: React.FC<DebugLogModalProps> = ({ isOpen, onClose, logs }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-60 z-[120] flex justify-center items-center"
      aria-labelledby="debug-log-modal-title"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div
        className="bg-gray-900 text-gray-200 rounded-lg shadow-2xl w-full max-w-5xl h-[85vh] m-4 flex flex-col font-mono"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 border-b border-gray-700 flex justify-between items-center shrink-0">
          <div className="flex items-center space-x-3">
             <CommandLineIcon className="w-6 h-6 text-green-400" />
             <h3 className="text-lg font-bold text-white" id="debug-log-modal-title">
               AI 思考過程紀錄 (Debug Log)
             </h3>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
            aria-label="關閉"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>
        
        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {logs.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-gray-500">
                    <p>尚無紀錄。</p>
                    <p className="text-sm mt-2">請執行一次「生成需求變更紀錄」來產生資料。</p>
                </div>
            ) : (
                logs.map((log) => (
                    <div key={log.id} className="border border-gray-700 rounded-md overflow-hidden bg-gray-950">
                        <div className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider flex justify-between items-center ${
                            log.type === 'request' ? 'bg-blue-900/30 text-blue-300' : 
                            log.type === 'response' ? 'bg-green-900/30 text-green-300' :
                            'bg-red-900/30 text-red-300'
                        }`}>
                            <span>{log.type}</span>
                            <span>{log.timestamp}</span>
                        </div>
                        <div className="p-4">
                             <h4 className="font-bold text-gray-100 mb-2 border-b border-gray-800 pb-2">{log.title}</h4>
                             <pre className="whitespace-pre-wrap break-words text-sm text-gray-300 font-mono overflow-x-auto max-h-[400px]">
                                {log.content}
                             </pre>
                        </div>
                    </div>
                ))
            )}
        </div>
      </div>
    </div>
  );
};

export default DebugLogModal;