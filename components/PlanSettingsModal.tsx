import React, { useState } from 'react';

interface PlanSettingsModalProps {
  onClose: () => void;
  onAddPlan: () => void;
}

const mockPlans = [
  { id: 1, name: '社區—一般店家(3800元)', count: 10, editor: '小魚仔', editorPhone: '+886987683125', editedAt: '2025/12/23 13:02:04' },
  { id: 2, name: '社區/協會', count: 4, editor: '洪志豪', editorPhone: '+886975802391', editedAt: '2025/12/09 10:09:59' },
  { id: 3, name: '測試組-社區', count: 4, editor: '小魚仔', editorPhone: '+886987683125', editedAt: '2025/12/15 10:24:09' },
  { id: 4, name: '有權限管理', count: 2, editor: '小魚仔', editorPhone: '+886987683125', editedAt: '2026/03/11 11:37:45' },
  { id: 5, name: '協會團購電子票券方案', count: 3, editor: 'peter', editorPhone: '+886904900003', editedAt: '2025/08/26 15:32:42' },
  { id: 6, name: '測試組-團購', count: 5, editor: '小魚仔', editorPhone: '+886987683125', editedAt: '2025/10/22 15:29:10' },
  { id: 7, name: '團購', count: 21, editor: 'peter', editorPhone: '+886904900003', editedAt: '2025/10/29 15:00:15' },
];

const PlanSettingsModal: React.FC<PlanSettingsModalProps> = ({ onClose, onAddPlan }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800">方案設定</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
            <div className="flex justify-between items-center">
                <div className="flex items-center text-gray-700 text-sm">
                    <span className="mr-2">預設方案: --</span>
                    <button className="text-blue-500 hover:text-blue-700">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
                    </button>
                </div>
                <button 
                    onClick={onAddPlan}
                    className="bg-[#4a90e2] text-white px-5 py-2 rounded text-sm hover:bg-blue-600 transition-colors font-medium"
                >
                    新增方案
                </button>
            </div>

            <div className="border border-gray-200 rounded overflow-hidden">
                <table className="w-full text-sm text-center">
                    <thead className="bg-[#e4effb] text-gray-700 font-medium">
                        <tr>
                            <th className="py-3 px-4 w-[30%] border-b border-r border-white/50">方案名稱</th>
                            <th className="py-3 px-4 w-[20%] border-b border-r border-white/50">數量</th>
                            <th className="py-3 px-4 w-[30%] border-b border-r border-white/50">最後編輯者</th>
                            <th className="py-3 px-4 w-[20%] border-b">操作</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 text-gray-600 bg-white">
                        {mockPlans.map(plan => (
                            <tr key={plan.id} className="hover:bg-gray-50">
                                <td className="py-4 px-4 align-middle text-gray-700">{plan.name}</td>
                                <td className="py-4 px-4 align-middle text-gray-700">{plan.count}</td>
                                <td className="py-4 px-4 align-middle">
                                    <div className="flex flex-col items-center text-gray-600 text-sm">
                                        <span>{plan.editor}</span>
                                        <span className="text-gray-500">{plan.editorPhone}</span>
                                        <span className="text-gray-500">{plan.editedAt}</span>
                                    </div>
                                </td>
                                <td className="py-4 px-4 align-middle">
                                    <button className="text-blue-500 hover:text-blue-700 transition-colors">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
      </div>
    </div>
  );
};

export default PlanSettingsModal;
