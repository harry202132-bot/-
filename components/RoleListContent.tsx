import React from 'react';
import { Page } from '../App';

interface RoleListContentProps {
  setCurrentPage: (page: Page) => void;
}

const mockRoles = [
  { id: 1, name: '總店', permissions: '訊息管理, 會員管理, 分店, 平台設定', creator: '小魚仔', creatorPhone: '+886987683125', createdAt: '2025/11/20 17:50:14', editor: '小魚仔', editorPhone: '+886987683125', editedAt: '2025/11/20 17:50:14' },
  { id: 2, name: '社區', permissions: '訊息管理, 會員管理, 交易管理, 平台設定, 商品管理, 社群活動', creator: '小魚仔', creatorPhone: '+886987683125', createdAt: '2025/05/06 17:12:02', editor: '小魚仔', editorPhone: '+886987683125', editedAt: '2025/11/07 15:08:19' },
  { id: 3, name: '行銷導師', permissions: '直播, 訊息管理, 會員管理, 交易管理, 平台設定, 商品管理, 財務管理, 活動, 團購管理, 團購報表, 社群活動', creator: '洪志豪', creatorPhone: '+886975802391', createdAt: '2024/10/30 16:36:54', editor: '小魚仔', editorPhone: '+886987683125', editedAt: '2025/11/06 16:26:47' },
  { id: 4, name: '發票助手', permissions: '訊息管理, 平台設定', creator: '小魚仔', creatorPhone: '+886987683125', createdAt: '2024/08/05 18:01:09', editor: '小魚仔', editorPhone: '+886987683125', editedAt: '2024/08/05 18:01:09' },
  { id: 5, name: '新媒體', permissions: '直播, 訊息管理, 會員管理, 平台設定', creator: '小魚仔', creatorPhone: '+886987683125', createdAt: '2023/08/03 18:03:51', editor: '小魚仔', editorPhone: '+886987683125', editedAt: '2023/08/11 09:40:36' },
  { id: 6, name: '商家', permissions: '直播, 訊息管理, 會員管理, 交易管理, 平台設定, 商品管理, 財務管理, 資料查詢, 活動, 團購管理, 團購報表', creator: 'FisherMan', creatorPhone: '+886936651116', createdAt: '2023/07/24 09:43:53', editor: '小魚仔', editorPhone: '+886987683125', editedAt: '2025/12/04 11:46:44' },
  { id: 7, name: '門店服務商', permissions: '直播, 訊息管理, 會員管理, 平台設定, 資料查詢, 團隊管理', creator: 'FisherMan', creatorPhone: '+886936651116', createdAt: '2023/07/24 09:43:14', editor: 'FisherMan', editorPhone: '+886936651116', editedAt: '2023/07/24 09:43:14' },
  { id: 8, name: '城市服務商', permissions: '直播, 訊息管理, 會員管理, 平台設定, 資料查詢, 團隊管理', creator: 'FisherMan', creatorPhone: '+886936651116', createdAt: '2023/07/24 09:41:55', editor: 'FisherMan', editorPhone: '+886936651116', editedAt: '2023/07/24 09:42:46' },
];

const RoleListContent: React.FC<RoleListContentProps> = ({ setCurrentPage }) => {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold text-gray-800">角色名單</h1>

      <div className="bg-white rounded-md shadow-sm border border-gray-200">
        <div className="p-4 flex justify-end">
            <button className="bg-[#4a90e2] text-white px-4 py-1.5 rounded text-sm hover:bg-blue-600">
                + 新增角色
            </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-center">
            <thead className="bg-[#e4effb] text-gray-700 font-medium">
              <tr>
                <th className="py-3 px-4 w-1/6">角色名稱</th>
                <th className="py-3 px-4 w-1/3">權限</th>
                <th className="py-3 px-4 w-1/5">建立時間</th>
                <th className="py-3 px-4 w-1/5">最後編輯者</th>
                <th className="py-3 px-4 w-[10%]">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 text-gray-600">
              {mockRoles.map((role) => (
                <tr key={role.id} className="hover:bg-gray-50">
                  <td 
                    className="py-4 px-4 align-middle text-blue-500 cursor-pointer hover:underline"
                    onClick={() => setCurrentPage('roleDetail')}
                  >{role.name}</td>
                  <td className="py-4 px-4 align-middle text-left leading-relaxed">{role.permissions}</td>
                  <td className="py-4 px-4 align-middle">
                    <div className="flex flex-col items-center text-gray-600">
                        <span>{role.creator}</span>
                        <span>{role.creatorPhone}</span>
                        <span>{role.createdAt}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 align-middle">
                     <div className="flex flex-col items-center text-gray-600">
                        <span>{role.editor}</span>
                        <span>{role.editorPhone}</span>
                        <span>{role.editedAt}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 align-middle">
                    <div className="flex justify-center space-x-3 text-blue-400">
                      <button className="hover:text-blue-600">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
                      </button>
                      <button className="hover:text-blue-600">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="flex items-center justify-center p-4 border-t border-gray-100 text-sm text-gray-600">
            <span className="mr-2">上一頁</span>
            <button className="bg-blue-500 text-white w-6 h-6 flex items-center justify-center rounded text-xs mx-1">1</button>
            <span className="ml-2 mr-4">下一頁</span>
            <select className="border border-gray-300 rounded px-2 py-1 text-xs text-gray-600 focus:outline-none focus:border-blue-500 mr-2">
                <option>20項/頁</option>
            </select>
            <span>共 8 項</span>
        </div>
      </div>
    </div>
  );
};

export default RoleListContent;
