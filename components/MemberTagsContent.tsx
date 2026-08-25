import React, { useState } from 'react';
import { Page } from '../App';
import { PencilSquareIcon, PlusIcon, XMarkIcon } from './icons';

interface MemberTagsContentProps {
  setCurrentPage?: (page: Page) => void;
}

const mockTags = [
  { id: 't1', name: 'VIP', description: '高消費頻率客戶', count: 120, createdAt: '2025/12/01' },
  { id: 't2', name: '活躍用戶', description: '近一個月內有登入紀錄', count: 5430, createdAt: '2026/01/15' },
  { id: 't3', name: '沉睡用戶', description: '超過三個月未登入', count: 3210, createdAt: '2026/02/20' },
  { id: 't4', name: '黑名單', description: '惡意棄單或客訴用戶', count: 15, createdAt: '2026/03/05' },
];

export const MemberTagsContent: React.FC<MemberTagsContentProps> = () => {
  const [keyword, setKeyword] = useState('');
  
  const filteredTags = mockTags.filter(tag => 
    tag.name.includes(keyword) || tag.description.includes(keyword)
  );

  return (
    <div className="space-y-4 font-sans text-gray-700 text-sm">
      <div className="flex flex-wrap items-center justify-between gap-2 pb-1 border-b border-gray-200">
        <h1 className="text-2xl font-semibold text-gray-800">會員標籤</h1>
        <button className="bg-[#1890ff] hover:bg-blue-600 text-white px-4 py-1.5 rounded transition-colors text-xs font-medium flex items-center space-x-1">
          <PlusIcon className="w-4 h-4" />
          <span>新增標籤</span>
        </button>
      </div>

      <div className="bg-white rounded border border-gray-200 p-4 space-y-3 text-xs shadow-xs">
        <div className="flex items-center space-x-2">
          <span className="text-gray-600 font-medium">標籤搜尋:</span>
          <input
            type="text"
            placeholder="搜尋標籤名稱或描述"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className="border border-gray-300 rounded px-3 py-1.5 w-64 focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded shadow-xs overflow-x-auto">
        <table className="w-full text-xs text-left border-collapse">
          <thead>
            <tr className="bg-[#e6f7ff] text-[#003a8c] font-semibold border-b border-gray-200">
              <th className="py-3 px-4">標籤名稱</th>
              <th className="py-3 px-4">標籤描述</th>
              <th className="py-3 px-4 text-center">綁定人數</th>
              <th className="py-3 px-4">建立日期</th>
              <th className="py-3 px-4 text-center">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-gray-700">
            {filteredTags.map((tag) => (
              <tr key={tag.id} className="hover:bg-blue-50/20 transition-colors">
                <td className="py-3 px-4 font-medium text-gray-900">
                  <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded border border-gray-200">
                    {tag.name}
                  </span>
                </td>
                <td className="py-3 px-4">{tag.description}</td>
                <td className="py-3 px-4 text-center text-blue-600 font-medium">{tag.count}</td>
                <td className="py-3 px-4 font-mono">{tag.createdAt}</td>
                <td className="py-3 px-4 text-center">
                  <div className="flex items-center justify-center space-x-3 text-blue-500">
                    <button className="hover:text-blue-700" title="編輯"><PencilSquareIcon className="w-4 h-4" /></button>
                    <button className="hover:text-red-600 text-red-400" title="刪除"><XMarkIcon className="w-4 h-4" /></button>
                  </div>
                </td>
              </tr>
            ))}
            {filteredTags.length === 0 && (
              <tr>
                <td colSpan={5} className="py-8 text-center text-gray-400">找不到符合的標籤</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MemberTagsContent;
