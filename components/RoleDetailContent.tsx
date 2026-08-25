import React, { useState } from 'react';
import { Page } from '../App';
import { ArrowUturnLeftIcon } from './icons';
import PlanSettingsModal from './PlanSettingsModal';
import PermissionEditModal from './PermissionEditModal';

interface RoleDetailContentProps {
  setCurrentPage: (page: Page) => void;
}


const mockAccounts = [
  { id: 1, name: '測試博士漢堡', manager: 'L208401', managerPhone: '+886904900183', category: '餐飲業', plan: '社區一般店家(3800元)', minDiscount: '5%', minProfit: '10%', platformFee: '5%', members: 0, editor: 'Kimberly', editorPhone: '+886952887670', editedAt: '2026/06/18 16:22:50', img: 'https://placehold.co/100x100?text=Burger' },
  { id: 2, name: '團購揪很大', manager: '文娟', managerPhone: '+886989075718', category: '零售業', plan: '團購', minDiscount: '10%', minProfit: '15%', platformFee: '3%', members: 5, editor: 'peter', editorPhone: '+886904900003', editedAt: '2026/01/20 18:14:30', img: 'https://placehold.co/100x100?text=Buy' },
  { id: 3, name: 'Zoom教學', manager: 'MIKE', managerPhone: '+886928445323', category: '3C', plan: '社區一般店家(3800元)', minDiscount: '15%', minProfit: '5%', platformFee: '5%', members: 0, editor: 'peter', editorPhone: '+886904900003', editedAt: '2026/01/07 11:15:05', img: 'https://placehold.co/100x100?text=Zoom' },
  { id: 4, name: '囍囍', manager: '編', managerPhone: '+886904900021', category: '電子商務', plan: '一般店家(3800元)', minDiscount: '5%', minProfit: '5%', platformFee: '5%', members: 0, editor: '小魚仔', editorPhone: '+886987683125', editedAt: '2025/12/23 13:05:16', img: 'https://placehold.co/100x100?text=XiXi' },
  { id: 5, name: '以寧團購', manager: '丁以寧', managerPhone: '+886989273886', category: '服務業', plan: '團購', minDiscount: '10%', minProfit: '10%', platformFee: '3%', members: 3, editor: 'peter', editorPhone: '+886904900003', editedAt: '2025/12/12 11:48:51', img: 'https://placehold.co/100x100?text=YN' },
  { id: 6, name: '尚億汽車保養廠', manager: 'L387626', managerPhone: '+886931342056', category: '汽機車業', plan: '一般店家(3800元)', minDiscount: '5%', minProfit: '5%', platformFee: '5%', members: 7, editor: 'peter', editorPhone: '+886904900003', editedAt: '2025/11/20 17:29:18', img: 'https://placehold.co/100x100?text=Car' },
];

const tabs = ['全部 (284)', '精選帳號 (0)', '零售業 (66)', '健身運動產業 (2)', '保健食品 (3)', '新自媒體 (2)', '餐飲業 (139)', '服務業 (27)', '服飾業 (2)', '社區 (7)', '二手車 (0)'];

const RoleDetailContent: React.FC<RoleDetailContentProps> = ({ setCurrentPage }) => {
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [isPlanSettingsModalOpen, setIsPlanSettingsModalOpen] = useState(false);
  const [isPermissionEditModalOpen, setIsPermissionEditModalOpen] = useState(false);

  return (
    <div className="space-y-4">
      <button 

        onClick={() => setCurrentPage('roleList')} 
        className="flex items-center text-sm text-blue-500 hover:text-blue-700 mb-2 inline-flex"
      >
        <ArrowUturnLeftIcon className="w-4 h-4 mr-1" />
        返回上一層
      </button>
      <h1 className="text-2xl font-semibold text-gray-800">商家</h1>

      <div className="bg-white rounded-md shadow-sm border border-gray-200">
        
        {/* Search Bar */}
        <div className="p-4 flex flex-wrap items-center gap-3 border-b border-gray-200 text-sm">
            <label className="text-gray-700 font-medium">關鍵字:</label>
            <select className="border border-gray-300 rounded px-3 py-1.5 focus:outline-none focus:border-blue-500 text-gray-600 bg-white min-w-[120px]">
                <option>名稱</option>
            </select>
            <input 
                type="text" 
                placeholder="輸入關鍵字"
                className="border border-gray-300 rounded px-3 py-1.5 focus:outline-none focus:border-blue-500 min-w-[200px]"
            />
            <button className="bg-blue-500 text-white px-5 py-1.5 rounded hover:bg-blue-600 transition-colors">
                搜尋
            </button>
            <button className="border border-gray-300 bg-white text-gray-700 px-5 py-1.5 rounded hover:bg-gray-50 transition-colors">
                清空條件
            </button>
        </div>

        {/* Action Buttons */}
        <div className="p-4 flex justify-end gap-2 bg-[#f8fbff]">
            <button 
                onClick={() => setIsPlanSettingsModalOpen(true)}
                className="bg-[#4a90e2] text-white px-4 py-1.5 rounded text-sm hover:bg-blue-600"
            >
                方案設定
            </button>
            <button className="bg-[#4a90e2] text-white px-4 py-1.5 rounded text-sm hover:bg-blue-600">
                + 新增帳號
            </button>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 bg-white overflow-x-auto">
            <div className="flex px-2 w-max">
                {tabs.map(tab => (
                    <button 
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-4 py-3 text-sm font-medium border-b-2 whitespace-nowrap transition-colors ${
                            activeTab === tab 
                                ? 'border-blue-500 text-blue-500' 
                                : 'border-transparent text-gray-600 hover:text-gray-800'
                        }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-center">
            <thead className="bg-[#e4effb] text-gray-700 font-medium border-b border-gray-200">
              <tr>
                <th className="py-3 px-4 w-[20%] text-left">名稱</th>
                <th className="py-3 px-4 w-[10%]">最高管理者</th>
                <th className="py-3 px-4 w-[10%]">角色類別</th>
                <th className="py-3 px-4 w-[15%]">方案</th>
                <th className="py-3 px-4 w-[10%] whitespace-nowrap">消費者折抵最低%</th>
                <th className="py-3 px-4 w-[10%] whitespace-nowrap">銷售分潤最低%</th>
                <th className="py-3 px-4 w-[10%] whitespace-nowrap">平台抽成%</th>
                <th className="py-3 px-4 w-[8%]">會員人數</th>
                <th className="py-3 px-4 w-[10%]">最後編輯者</th>
                <th className="py-3 px-4 w-[8%]">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 text-gray-600">
              {mockAccounts.map((account) => (
                <tr key={account.id} className="hover:bg-gray-50">
                  <td className="py-4 px-4 align-middle text-left">
                    <div className="flex items-center space-x-3">
                        <img src={account.img} alt={account.name} className="w-12 h-12 rounded object-cover border border-gray-200" />
                        <span className="text-blue-500 cursor-pointer hover:underline">{account.name}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 align-middle">
                    <div className="flex flex-col items-center text-gray-600">
                        <span>{account.manager}</span>
                        <span className="text-xs">{account.managerPhone}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 align-middle">{account.category}</td>
                  <td className="py-4 px-4 align-middle">{account.plan}</td>
                  <td className="py-4 px-4 align-middle">{account.minDiscount}</td>
                  <td className="py-4 px-4 align-middle">{account.minProfit}</td>
                  <td className="py-4 px-4 align-middle">{account.platformFee}</td>
                  <td className="py-4 px-4 align-middle">{account.members}</td>
                  <td className="py-4 px-4 align-middle">
                     <div className="flex flex-col items-center text-gray-600">
                        <span>{account.editor}</span>
                        <span className="text-xs">{account.editorPhone}</span>
                        <span className="text-xs text-gray-400">{account.editedAt}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 align-middle">
                    <div className="flex flex-col items-center space-y-2">
                      <button className="text-blue-500 hover:text-blue-700 text-xs hover:underline">
                        下載快篩碼
                      </button>
                      <div className="flex justify-center space-x-2 text-blue-400">
                        <button className="hover:text-blue-600" title="編輯">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
                        </button>
                        <button className="hover:text-blue-600" title="設定">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                        </button>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="flex items-center justify-center p-4 border-t border-gray-100 text-sm text-gray-600 bg-gray-50/50">
            <span className="mr-2 cursor-pointer hover:text-blue-500">上一頁</span>
            <button className="bg-blue-500 text-white w-7 h-7 flex items-center justify-center rounded text-sm mx-1 shadow-sm">1</button>
            <button className="hover:bg-gray-200 text-gray-700 w-7 h-7 flex items-center justify-center rounded text-sm mx-1">2</button>
            <button className="hover:bg-gray-200 text-gray-700 w-7 h-7 flex items-center justify-center rounded text-sm mx-1">3</button>
            <button className="hover:bg-gray-200 text-gray-700 w-7 h-7 flex items-center justify-center rounded text-sm mx-1">4</button>
            <span className="mx-1">...</span>
            <button className="hover:bg-gray-200 text-gray-700 w-7 h-7 flex items-center justify-center rounded text-sm mx-1">15</button>
            <span className="ml-2 mr-4 cursor-pointer hover:text-blue-500">下一頁</span>
            <select className="border border-gray-300 rounded px-2 py-1 text-xs text-gray-600 focus:outline-none focus:border-blue-500 mr-2 bg-white">
                <option>20項/頁</option>
            </select>
            <span>共 284 項</span>
        </div>
      </div>

      {isPlanSettingsModalOpen && (
        <PlanSettingsModal 
            onClose={() => setIsPlanSettingsModalOpen(false)} 
            onAddPlan={() => {
                setIsPlanSettingsModalOpen(false);
                setIsPermissionEditModalOpen(true);
            }}
        />
      )}

      {isPermissionEditModalOpen && (
        <PermissionEditModal onClose={() => setIsPermissionEditModalOpen(false)} />
      )}
    </div>
  );
};

export default RoleDetailContent;
