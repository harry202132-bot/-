import React, { useState } from 'react';
import { Page } from '../App';
import { detectReferralLoop, initialReferralMembers } from './RegistrationSourcesContent';
import Select from 'react-select';

interface MemberDetailContentProps {
  setCurrentPage?: (page: Page) => void;
  memberData?: {
    memberNo: string;
    phone: string;
    name?: string;
    avatar: string;
    system: string;
    category: string;
    registeredAt: string;
    joinedAt: string;
  };
}

const customSelectStyles = {
  control: (base: any, state: any) => ({
    ...base,
    minHeight: '38px',
    backgroundColor: 'white',
    borderColor: state.isFocused ? '#3b82f6' : '#d1d5db',
    boxShadow: state.isFocused ? '0 0 0 1px #3b82f6' : 'none',
    '&:hover': {
      borderColor: state.isFocused ? '#3b82f6' : '#9ca3af'
    },
    fontSize: '0.75rem',
  }),
  menu: (base: any) => ({
    ...base,
    fontSize: '0.75rem',
    zIndex: 9999
  }),
  option: (base: any, state: any) => ({
    ...base,
    backgroundColor: state.isSelected ? '#eff6ff' : state.isFocused ? '#f3f4f6' : 'white',
    color: state.isSelected ? '#1d4ed8' : '#374151',
    cursor: 'pointer',
    '&:active': {
      backgroundColor: '#eff6ff'
    }
  })
};

export const MemberDetailContent: React.FC<MemberDetailContentProps> = ({
  setCurrentPage,
  memberData = {
    memberNo: 'L308384',
    phone: '+8618180560261',
    name: '李雅婷',
    avatar: 'https://images.unsplash.com/photo-1534188753412-3e26d0d618d6?w=100&auto=format&fit=crop&q=80',
    system: 'Android',
    category: '已關注的粉絲',
    registeredAt: '2026/08/12 10:41:10',
    joinedAt: '2026/08/12 10:41:10',
  },
}) => {
  const [currentReferrerName, setCurrentReferrerName] = useState('Gary (+886913000827)');
  const [currentReferrerId, setCurrentReferrerId] = useState('M002');
  const [notice, setNotice] = useState<string | null>(null);

  return (
    <div className="space-y-6 font-sans text-gray-700 text-xs">
      {/* Top Header & Back Button */}
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold text-gray-800">會員詳情</h1>
        <button
          onClick={() => setCurrentPage && setCurrentPage('memberList')}
          className="text-gray-600 hover:text-blue-600 flex items-center space-x-1 font-medium transition-colors cursor-pointer text-xs"
        >
          <span>↪ 返回上一層</span>
        </button>
      </div>

      {/* Notice Banner */}
      {notice && (
        <div className="bg-green-50 border border-green-300 text-green-800 px-4 py-3 rounded text-xs flex items-center justify-between shadow-2xs">
          <span>{notice}</span>
          <button onClick={() => setNotice(null)} className="font-bold text-green-700 hover:text-green-900">×</button>
        </div>
      )}

      {/* Main Profile Info Card */}
      <div className="bg-white rounded border border-gray-200 p-6 relative shadow-xs">
        {/* Card Header Actions */}
        <div className="flex items-center justify-between mb-6">
          <button className="bg-[#1890ff] hover:bg-blue-600 text-white px-3 py-1.5 rounded transition-colors text-xs font-medium">
            檢舉/停權紀錄
          </button>
          <div className="flex items-center space-x-4 text-xs">
            <button className="text-blue-500 hover:text-blue-700 flex items-center space-x-1 cursor-pointer">
              <span>💬</span>
              <span>傳送訊息</span>
            </button>
            <button className="text-blue-500 hover:text-blue-700 flex items-center space-x-1 cursor-pointer">
              <span>✏️</span>
              <span>編輯會員</span>
            </button>
          </div>
        </div>

        {/* Profile Content Layout */}
        <div className="flex flex-col md:flex-row gap-8 items-start">
          {/* Avatar and Level Badge */}
          <div className="flex flex-col items-center shrink-0 space-y-2">
            <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-amber-300 shadow-sm">
              <img
                src={memberData.avatar}
                alt="Member Avatar"
                className="w-full h-full object-cover"
              />
            </div>
            <span className="bg-[#fadb14] text-amber-900 font-bold px-4 py-0.5 rounded-full text-xs shadow-2xs">
              LV 1
            </span>
          </div>

          {/* Detailed Info Columns */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-2.5 w-full text-xs text-gray-700 leading-relaxed">
            {/* Column 1 */}
            <div className="space-y-2">
              <div className="flex">
                <span className="text-gray-900 font-medium w-20 shrink-0">會員名稱:</span>
                <span className="text-gray-800">{memberData.memberNo} ({memberData.phone})</span>
              </div>
              <div className="flex">
                <span className="text-gray-900 font-medium w-20 shrink-0">註冊日期:</span>
                <span className="text-gray-800">{memberData.registeredAt}</span>
              </div>
              <div className="flex items-center flex-wrap gap-2">
                <span className="text-gray-900 font-medium w-20 shrink-0">註冊來源:</span>
                <span className="text-gray-800 font-medium">{currentReferrerName}</span>
              </div>
              <div className="flex">
                <span className="text-gray-900 font-medium w-20 shrink-0">系統:</span>
                <span className="text-gray-800">{memberData.system}</span>
              </div>
              <div className="flex">
                <span className="text-gray-900 font-medium w-20 shrink-0">裝置:</span>
                <span className="text-gray-800">Xiaomi 25098RA98G</span>
              </div>
              <div className="flex">
                <span className="text-gray-900 font-medium w-20 shrink-0">版本:</span>
                <span className="text-gray-800">2.6.5</span>
              </div>
              <div className="flex">
                <span className="text-gray-900 font-medium w-20 shrink-0">喜好類別:</span>
                <span className="text-gray-800 leading-normal">
                  星座運勢、旅遊攻略、美食推薦、美食食譜、戶外旅行
                </span>
              </div>
            </div>

            {/* Column 2 */}
            <div className="space-y-2">
              <div className="flex">
                <span className="text-gray-900 font-medium w-28 shrink-0">邀請碼:</span>
                <span className="text-gray-800">{memberData.memberNo}</span>
              </div>
              <div className="flex">
                <span className="text-gray-900 font-medium w-28 shrink-0">加入會員數:</span>
                <span className="text-gray-800">0</span>
              </div>
              <div className="flex">
                <span className="text-gray-900 font-medium w-28 shrink-0">發布數:</span>
                <span className="text-gray-800">0</span>
              </div>
              <div className="flex">
                <span className="text-gray-900 font-medium w-28 shrink-0">粉絲數:</span>
                <span className="text-gray-800">1</span>
              </div>
              <div className="flex">
                <span className="text-gray-900 font-medium w-28 shrink-0">關注官方帳號數:</span>
                <span className="text-gray-800">2</span>
              </div>
              <div className="flex">
                <span className="text-gray-900 font-medium w-28 shrink-0">關注用戶數:</span>
                <span className="text-gray-800">3</span>
              </div>
              <div className="flex">
                <span className="text-gray-900 font-medium w-28 shrink-0">邀請人數:</span>
                <span className="text-gray-800">0</span>
              </div>
            </div>

            {/* Column 3 */}
            <div className="space-y-2">
              <div className="flex">
                <span className="text-gray-900 font-medium w-24 shrink-0">會員類別:</span>
                <span className="text-gray-800">{memberData.category}</span>
              </div>
              <div className="flex">
                <span className="text-gray-900 font-medium w-24 shrink-0">本次加入日期:</span>
                <span className="text-gray-800">{memberData.joinedAt}</span>
              </div>
              <div className="flex">
                <span className="text-gray-900 font-medium w-24 shrink-0">本次會員期限:</span>
                <span className="text-gray-800">-</span>
              </div>
              <div className="flex">
                <span className="text-gray-900 font-medium w-24 shrink-0">累計會員天數:</span>
                <span className="text-gray-800">1</span>
              </div>
              <div className="flex">
                <span className="text-gray-900 font-medium w-24 shrink-0">目前綁定店家:</span>
                <span className="text-gray-800">--</span>
              </div>
              <div className="flex">
                <span className="text-gray-900 font-medium w-24 shrink-0">分潤綁定:</span>
                <span className="text-gray-800">[代理]E N Yang 共享家 886979672319</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section: 會員屬性 */}
      <div className="space-y-2">
        <h2 className="text-sm font-semibold text-gray-800">會員屬性:</h2>
        <div className="bg-white rounded border border-gray-200 p-4 shadow-xs">
          <span className="text-gray-700">性別: 男</span>
        </div>
      </div>

      {/* Section: 總後台會員紀錄 */}
      <div className="space-y-2">
        <h2 className="text-sm font-semibold text-gray-800">總後台會員紀錄</h2>
        <div className="bg-white rounded border border-gray-200 shadow-xs overflow-hidden">
          <table className="w-full text-xs text-center border-collapse">
            <thead>
              <tr className="bg-[#e6f7ff] text-[#003a8c] font-semibold border-b border-gray-200">
                <th className="py-2.5 px-4">會員類別</th>
                <th className="py-2.5 px-4">本次加入日期</th>
                <th className="py-2.5 px-4">本次會員期限</th>
                <th className="py-2.5 px-4">最後編輯者</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-gray-700">
              <tr>
                <td className="py-3 px-4">{memberData.category}</td>
                <td className="py-3 px-4">{memberData.joinedAt}</td>
                <td className="py-3 px-4">-</td>
                <td className="py-3 px-4">-</td>
              </tr>
            </tbody>
          </table>

          {/* Pagination */}
          <div className="flex items-center justify-center space-x-3 p-3 border-t border-gray-200 text-xs text-gray-500 bg-white">
            <button className="text-gray-400 cursor-not-allowed">上一頁</button>
            <button className="w-5 h-5 bg-blue-500 text-white rounded text-xs flex items-center justify-center font-medium">
              1
            </button>
            <button className="text-gray-500 hover:text-blue-600">下一頁</button>
            <select className="border border-gray-300 rounded px-1.5 py-0.5 text-xs bg-white text-gray-600 focus:outline-none">
              <option value="20">20項/頁</option>
            </select>
            <span>共 1 項</span>
          </div>
        </div>
      </div>

      {/* Section: 目前加入的官方帳號 */}
      <div className="space-y-2">
        <h2 className="text-sm font-semibold text-gray-800">目前加入的官方帳號</h2>
        <div className="bg-white rounded border border-gray-200 shadow-xs overflow-hidden">
          <table className="w-full text-xs text-center border-collapse">
            <thead>
              <tr className="bg-[#e6f7ff] text-[#003a8c] font-semibold border-b border-gray-200">
                <th className="py-2.5 px-4 text-left">加入帳號</th>
                <th className="py-2.5 px-4">會員類別</th>
                <th className="py-2.5 px-4">加入方式</th>
                <th className="py-2.5 px-4">本次加入日期</th>
                <th className="py-2.5 px-4">本次會員期限</th>
                <th className="py-2.5 px-4">最後編輯者</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-gray-700">
              <tr className="hover:bg-blue-50/20">
                <td className="py-3 px-4 text-left font-medium text-gray-800">亞太全通科技有限公司</td>
                <td className="py-3 px-4">{memberData.category}</td>
                <td className="py-3 px-4">用戶主動關注</td>
                <td className="py-3 px-4">2026/08/12 10:41:21</td>
                <td className="py-3 px-4">-</td>
                <td className="py-3 px-4">-</td>
              </tr>
              <tr className="hover:bg-blue-50/20">
                <td className="py-3 px-4 text-left font-medium text-gray-800">共享家發票通知</td>
                <td className="py-3 px-4">{memberData.category}</td>
                <td className="py-3 px-4">用戶主動關注</td>
                <td className="py-3 px-4">2026/08/12 10:41:14</td>
                <td className="py-3 px-4">-</td>
                <td className="py-3 px-4">-</td>
              </tr>
            </tbody>
          </table>

          {/* Pagination */}
          <div className="flex items-center justify-center space-x-3 p-3 border-t border-gray-200 text-xs text-gray-500 bg-white">
            <button className="text-gray-400 cursor-not-allowed">上一頁</button>
            <button className="w-5 h-5 bg-blue-500 text-white rounded text-xs flex items-center justify-center font-medium">
              1
            </button>
            <button className="text-gray-500 hover:text-blue-600">下一頁</button>
            <select className="border border-gray-300 rounded px-1.5 py-0.5 text-xs bg-white text-gray-600 focus:outline-none">
              <option value="20">20項/頁</option>
            </select>
            <span>共 2 項</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberDetailContent;
