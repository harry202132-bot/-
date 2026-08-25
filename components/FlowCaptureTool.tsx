import React, { useState, useEffect, useCallback } from 'react';
import { XMarkIcon } from './icons';

export interface CapturedStep {
  id: string;
  name: string;
}

interface FlowCaptureToolProps {
  onCancel: () => void;
  onComplete: (steps: CapturedStep[]) => void;
}

const FlowCaptureTool: React.FC<FlowCaptureToolProps> = ({ onCancel, onComplete }) => {
  const [capturedSteps, setCapturedSteps] = useState<CapturedStep[]>([]);
  
  const handleGlobalClick = useCallback((e: MouseEvent) => {
    const target = e.target as HTMLElement;
    const selectableElement = target.closest('[data-selectable-id]');

    // Ignore clicks inside the capture tool panel itself, let its own handlers work
    if (target.closest('.flow-capture-panel')) {
      return;
    }

    if (selectableElement) {
      e.preventDefault();
      e.stopPropagation();

      const id = selectableElement.getAttribute('data-selectable-id');
      const name = selectableElement.getAttribute('data-selectable-name') || '未命名元件';

      if (id) {
        setCapturedSteps(prevSteps => [...prevSteps, { id, name }]);
      }
    }
  }, []);

  useEffect(() => {
    document.body.classList.add('capture-mode-active');
    // Use capture phase to ensure we can intercept and stop the event before it triggers other actions.
    document.addEventListener('click', handleGlobalClick, { capture: true });

    return () => {
      document.body.classList.remove('capture-mode-active');
      document.removeEventListener('click', handleGlobalClick, { capture: true });
    };
  }, [handleGlobalClick]);
  
  useEffect(() => {
    // Add/remove data-is-selected attribute for styling
    const allSelectable = document.querySelectorAll('[data-selectable-id]');
    allSelectable.forEach(el => {
        el.removeAttribute('data-is-selected');
        el.removeAttribute('data-step-number');
    });

    capturedSteps.forEach((step, index) => {
        // Find all elements that might match, in case of duplicates from re-renders
        const selectedEls = document.querySelectorAll(`[data-selectable-id="${step.id}"]`);
        selectedEls.forEach(el => {
            el.setAttribute('data-is-selected', 'true');
            el.setAttribute('data-step-number', String(index + 1));
        })
    });
  }, [capturedSteps]);

  const handleComplete = () => {
    if (capturedSteps.length > 0) {
      onComplete(capturedSteps);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/30 z-[1000] flex items-start justify-end p-4 pointer-events-none">
      <div 
        className="bg-white w-full max-w-sm rounded-lg shadow-2xl flex flex-col pointer-events-auto flow-capture-panel"
      >
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <h3 className="font-semibold text-gray-800">擷取 UI 流程</h3>
          <button onClick={onCancel} className="text-gray-400 hover:text-gray-600">
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>
        <div className="p-4 space-y-3">
            <div className="text-sm text-gray-600 bg-blue-50 p-3 rounded-md border border-blue-200">
                <p><strong>單點分析：</strong>點擊一個元件後生成紀錄，AI 將分析該元件觸發的完整流程（包含所有分支）。</p>
                <hr className="my-2 border-blue-200"/>
                <p><strong>流程紀錄：</strong>依序點擊多個元件，AI 將繪製您操作的路徑並補充相關分支。</p>
            </div>
            <div className="max-h-60 overflow-y-auto pr-2">
                {capturedSteps.length > 0 ? (
                    <ol className="list-decimal list-inside space-y-2 text-sm">
                        {capturedSteps.map((step, index) => (
                            <li key={`${step.id}-${index}`} className="bg-gray-100 p-2 rounded-md">
                                <span className="font-medium text-gray-700">{step.name}</span>
                            </li>
                        ))}
                    </ol>
                ) : (
                    <div className="text-center py-6 text-gray-500 text-sm">
                        尚未擷取任何步驟
                    </div>
                )}
            </div>
        </div>
        <div className="flex justify-end space-x-3 p-4 bg-gray-50 rounded-b-lg border-t border-gray-200">
          <button 
            onClick={onCancel}
            className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md text-sm hover:bg-gray-300"
          >
            取消
          </button>
          <button
            onClick={handleComplete}
            disabled={capturedSteps.length === 0}
            className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed"
          >
            生成紀錄
          </button>
        </div>
      </div>
    </div>
  );
};

export default FlowCaptureTool;
