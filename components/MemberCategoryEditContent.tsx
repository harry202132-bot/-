import React, { useState } from 'react';
import { Page } from '../App';
import { PencilSquareIcon, PlusIcon } from './icons';

interface MemberCategoryEditContentProps {
  setCurrentPage?: (page: Page) => void;
}

const mockCategories = [
  { id: 'c1', name: '測試小組', members: 9, description: '內部測試專用群組，享有所有測試權限', editable: true },
  { id: 'c2', name: '體驗店家', members: 67, description: '試用期內的店家', editable: true },
  { id: 'c3', name: '正式店家', members: 6, description: '已完成簽約付款的正式店家', editable: true },
  { id: 'c4', name: '門店服務商', members: 4, description: '提供線下門店服務之合作商', editable: true },
  { id: 'c5', name: '合作夥伴', members: 2, description: '策略聯盟合作夥伴', editable: true },
  { id: 'c6', name: '已關注的粉絲', members: 14027, description: '一般消費者與粉絲', editable: false },
];

export const MemberCategoryEditContent: React.FC<MemberCategoryEditContentProps> = () => {
  return (
    <div className="space-y-4 font-sans text-gray-700 text-sm">
      <div className="flex flex-wrap items-center justify-between gap-2 pb-1 border-b border-gray-200">
        <h1 className="text-2xl font-semibold text-gray-800">會員類別編輯</h1>
        <button className="bg-[#1890ff] hover:bg-blue-600 text-white px-4 py-1.5 rounded transition-colors text-xs font-medium flex items-center space-x-1">
          <PlusIcon className="w-4 h-4" />
          <span>新增會員類別</span>
        </button>
      </div>

      <div className="bg-white border border-gray-200 rounded shadow-xs overflow-x-auto">
        <table className="w-full text-xs text-left border-collapse">
          <thead>
            <tr className="bg-[#e6f7ff] text-[#003a8c] font-semibold border-b border-gray-200">
              <th className="py-3 px-4">類別名稱</th>
              <th className="py-3 px-4">類別描述</th>
              <th className="py-3 px-4 text-center">人數統計</th>
              <th className="py-3 px-4 text-center">狀態</th>
              <th className="py-3 px-4 text-center">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-gray-700">
            {mockCategories.map((cat) => (
              <tr key={cat.id} className="hover:bg-blue-50/20 transition-colors">
                <td className="py-3 px-4 font-medium text-gray-900">
                  {cat.name}
                </td>
                <td className="py-3 px-4 text-gray-500">{cat.description}</td>
                <td className="py-3 px-4 text-center text-blue-600 font-medium">{cat.members.toLocaleString()}</td>
                <td className="py-3 px-4 text-center">
                  <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded text-[11px] font-medium border border-green-200">
                    啟用中
                  </span>
                </td>
                <td className="py-3 px-4 text-center">
                  <div className="flex items-center justify-center space-x-3 text-blue-500">
                    {cat.editable ? (
                      <button className="hover:text-blue-700 flex items-center space-x-1" title="編輯">
                        <PencilSquareIcon className="w-4 h-4" />
                        <span>編輯</span>
                      </button>
                    ) : (
                      <span className="text-gray-400 text-[11px] bg-gray-100 px-2 py-0.5 rounded border border-gray-200">
                        系統預設
                      </span>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MemberCategoryEditContent;
