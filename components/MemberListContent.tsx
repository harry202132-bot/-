import React, { useState } from 'react';
import { Page } from '../App';
import { ChatBubbleLeftRightIcon, PencilSquareIcon, ExcelIcon } from './icons';

interface MemberListContentProps {
  setCurrentPage?: (page: Page) => void;
}

interface MemberRecord {
  id: string;
  memberNo: string;
  phone: string;
  name?: string;
  avatar: string;
  system: 'Android' | 'Web' | 'iOS';
  category: string;
  registeredAt: string;
  joinedAt: string;
  expiry: string;
  totalDays: number;
  referrerName?: string;
  referrerPhone?: string;
}

const mockMembers: MemberRecord[] = [
  {
    id: '1',
    memberNo: 'L308384',
    name: '李雅婷',
    referrerName: 'Gary',
    referrerPhone: '+886 913000827',
    phone: '+86 18180560261',
    avatar: 'https://images.unsplash.com/photo-1534188753412-3e26d0d618d6?w=100&auto=format&fit=crop&q=80',
    system: 'Android',
    category: '已關注的粉絲',
    registeredAt: '2026/08/12 10:41:10',
    joinedAt: '2026/08/12 10:41:10',
    expiry: '-',
    totalDays: 1,
  },
  {
    id: '2',
    memberNo: 'L359296',
    phone: '+886 935880805',
    avatar: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=100&auto=format&fit=crop&q=80',
    system: 'Web',
    category: '已關注的粉絲',
    registeredAt: '2026/08/12 09:42:46',
    joinedAt: '2026/08/12 09:42:46',
    expiry: '-',
    totalDays: 1,
  },
  {
    id: '3',
    memberNo: 'L200005',
    phone: '+886 972206891',
    avatar: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=100&auto=format&fit=crop&q=80',
    system: 'Web',
    category: '已關注的粉絲',
    registeredAt: '2026/08/12 09:38:15',
    joinedAt: '2026/08/12 09:38:15',
    expiry: '-',
    totalDays: 1,
  },
  {
    id: '4',
    memberNo: 'L112466',
    phone: '+886 937242819',
    avatar: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=100&auto=format&fit=crop&q=80',
    system: 'Android',
    category: '已關注的粉絲',
    registeredAt: '2026/08/12 09:33:34',
    joinedAt: '2026/08/12 09:33:34',
    expiry: '-',
    totalDays: 1,
  },
  {
    id: '5',
    name: 'David',
    memberNo: 'L305878',
    phone: '+886 958068028',
    avatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100&auto=format&fit=crop&q=80',
    system: 'iOS',
    category: '已關注的粉絲',
    registeredAt: '2026/08/12 09:31:58',
    joinedAt: '2026/08/12 09:31:58',
    expiry: '-',
    totalDays: 1,
  },
  {
    id: '6',
    name: '鄭文豪',
    memberNo: 'L288258',
    phone: '+886 987286397',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80',
    system: 'iOS',
    category: '已關注的粉絲',
    registeredAt: '2026/08/12 09:31:23',
    joinedAt: '2026/08/12 09:31:23',
    expiry: '-',
    totalDays: 1,
  },
  {
    id: '7',
    name: '張檻如',
    memberNo: 'L102516',
    phone: '+886 958102586',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80',
    system: 'Android',
    category: '已關注的粉絲',
    registeredAt: '2026/08/12 09:19:25',
    joinedAt: '2026/08/12 09:19:25',
    expiry: '-',
    totalDays: 1,
  },
  {
    id: '8',
    memberNo: 'L174253',
    phone: '+886 928001308',
    avatar: 'https://images.unsplash.com/photo-1560343090-f0409e92791a?w=100&auto=format&fit=crop&q=80',
    system: 'Web',
    category: '已關注的粉絲',
    registeredAt: '2026/08/12 09:09:40',
    joinedAt: '2026/08/12 09:09:40',
    expiry: '-',
    totalDays: 1,
  },
  {
    id: '9',
    memberNo: 'L361803',
    phone: '+886 903279001',
    avatar: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=100&auto=format&fit=crop&q=80',
    system: 'Web',
    category: '已關注的粉絲',
    registeredAt: '2026/08/12 08:42:53',
    joinedAt: '2026/08/12 08:42:53',
    expiry: '-',
    totalDays: 1,
  },
  {
    id: '10',
    memberNo: 'L227917',
    phone: '+886 958291395',
    avatar: 'https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?w=100&auto=format&fit=crop&q=80',
    system: 'Android',
    category: '已關注的粉絲',
    registeredAt: '2026/08/12 08:23:30',
    joinedAt: '2026/08/12 08:23:30',
    expiry: '-',
    totalDays: 1,
  },
  {
    id: '11',
    name: '禮悟哥 (迴圈示範)',
    memberNo: 'L305273',
    referrerName: '李雅婷',
    referrerPhone: '+86 18180560261',
    phone: '+86 921998662',
    avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&auto=format&fit=crop&q=80',
    system: 'iOS',
    category: '已關注的粉絲',
    registeredAt: '2026/08/11 22:46:37',
    joinedAt: '2026/08/11 22:46:37',
    expiry: '-',
    totalDays: 2,
  },
  {
    id: '12',
    memberNo: 'L248110',
    phone: '+886 936189295',
    avatar: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=100&auto=format&fit=crop&q=80',
    system: 'Web',
    category: '已關注的粉絲',
    registeredAt: '2026/08/11 22:23:38',
    joinedAt: '2026/08/11 22:23:38',
    expiry: '-',
    totalDays: 2,
  },
  {
    id: '13',
    name: '王正懋',
    memberNo: 'L270600',
    referrerName: '禮悟哥 (迴圈示範)',
    referrerPhone: '+86 921998662',
    phone: '+886 955556685',
    avatar: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=100&auto=format&fit=crop&q=80',
    system: 'iOS',
    category: '已關注的粉絲',
    registeredAt: '2026/08/11 21:37:24',
    joinedAt: '2026/08/11 21:37:24',
    expiry: '-',
    totalDays: 2,
  },
  {
    id: '14',
    name: '安安',
    memberNo: 'L128405',
    phone: '+886 936921868',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80',
    system: 'Android',
    category: '已關注的粉絲',
    registeredAt: '2026/08/11 20:52:28',
    joinedAt: '2026/08/11 20:52:28',
    expiry: '-',
    totalDays: 2,
  },
  {
    id: '15',
    memberNo: 'L395628',
    phone: '+886 911727964',
    avatar: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?w=100&auto=format&fit=crop&q=80',
    system: 'Web',
    category: '已關注的粉絲',
    registeredAt: '2026/08/11 20:30:38',
    joinedAt: '2026/08/11 20:30:38',
    expiry: '-',
    totalDays: 2,
  },
  {
    id: '16',
    memberNo: 'L148290',
    phone: '+886 921084807',
    avatar: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=100&auto=format&fit=crop&q=80',
    system: 'Web',
    category: '已關注的粉絲',
    registeredAt: '2026/08/11 20:02:07',
    joinedAt: '2026/08/11 20:02:07',
    expiry: '-',
    totalDays: 2,
  },
  {
    id: '17',
    memberNo: 'L146353',
    phone: '+886 UNSET_fb3936',
    avatar: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=100&auto=format&fit=crop&q=80',
    system: 'iOS',
    category: '已關注的粉絲',
    registeredAt: '2026/08/11 19:47:53',
    joinedAt: '2026/08/11 19:47:53',
    expiry: '-',
    totalDays: 2,
  },
  {
    id: '18',
    memberNo: 'L136297',
    phone: '+886 UNSET_fb3935',
    avatar: 'https://images.unsplash.com/photo-1532767153582-b1a0e5145009?w=100&auto=format&fit=crop&q=80',
    system: 'Android',
    category: '已關注的粉絲',
    registeredAt: '2026/08/11 19:45:44',
    joinedAt: '2026/08/11 19:45:44',
    expiry: '-',
    totalDays: 2,
  },
  {
    id: '19',
    memberNo: 'L233944',
    phone: '+886 UNSET_google3934',
    avatar: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=100&auto=format&fit=crop&q=80',
    system: 'Android',
    category: '已關注的粉絲',
    registeredAt: '2026/08/11 19:32:07',
    joinedAt: '2026/08/11 19:32:07',
    expiry: '-',
    totalDays: 2,
  },
  {
    id: '20',
    memberNo: 'L364048',
    phone: '+886 955156415',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80',
    system: 'Web',
    category: '已關注的粉絲',
    registeredAt: '2026/08/11 18:39:54',
    joinedAt: '2026/08/11 18:39:54',
    expiry: '-',
    totalDays: 2,
  },
];

const tabCategories = [
  { key: 'all', label: '全部', count: 14115 },
  { key: 'fans', label: '已關注的粉絲', count: 14027 },
  { key: 'testGroup', label: '測試小組', count: 9 },
  { key: 'trialStore', label: '體驗店家', count: 67 },
  { key: 'officialStore', label: '正式店家', count: 6 },
  { key: 'storeServiceProvider', label: '門店服務商', count: 4 },
  { key: 'partners', label: '合作夥伴', count: 2 },
];

export const MemberListContent: React.FC<MemberListContentProps> = ({ setCurrentPage }) => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchKeyType, setSearchKeyType] = useState('memberAccount');
  const [keyword, setKeyword] = useState('');
  const [systemFilter, setSystemFilter] = useState('all');
  const [appLoginFilter, setAppLoginFilter] = useState('all');
  const [dateType, setDateType] = useState('registerDate');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [memberDaysOperator, setMemberDaysOperator] = useState('gt');
  const [memberDaysValue, setMemberDaysValue] = useState('');
  const [tagFilter, setTagFilter] = useState('');

  // Filter list
  const filteredList = mockMembers.filter(member => {
    // system filter
    if (systemFilter !== 'all' && member.system !== systemFilter) return false;
    
    // keyword search
    if (keyword.trim()) {
      const kw = keyword.trim().toLowerCase();
      const matchNo = member.memberNo.toLowerCase().includes(kw);
      const matchPhone = member.phone.toLowerCase().includes(kw);
      const matchName = member.name ? member.name.toLowerCase().includes(kw) : false;
      if (!matchNo && !matchPhone && !matchName) return false;
    }
    return true;
  });

  const handleSearch = () => {
    // triggers filter update via state
  };

  const handleClear = () => {
    setKeyword('');
    setSystemFilter('all');
    setAppLoginFilter('all');
    setStartDate('');
    setEndDate('');
    setMemberDaysValue('');
    setTagFilter('');
  };

  return (
    <div className="space-y-4 font-sans text-gray-700 text-sm">
      {/* Top Header / Breadcrumb Header */}
      <div className="flex items-center justify-between pb-1 border-b border-gray-200">
        <h1 className="text-2xl font-semibold text-gray-800">會員名單</h1>
      </div>

      {/* Filter Card */}
      <div className="bg-white rounded border border-gray-200 p-4 space-y-3 text-xs shadow-xs">
        {/* Row 1 */}
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
          <div className="flex items-center space-x-2">
            <span className="text-gray-600 font-medium">關鍵字:</span>
            <select
              value={searchKeyType}
              onChange={(e) => setSearchKeyType(e.target.value)}
              className="border border-gray-300 rounded px-2 py-1 bg-white focus:outline-none focus:border-blue-500"
            >
              <option value="memberAccount">會員帳號</option>
              <option value="memberName">會員姓名</option>
              <option value="phone">手機號碼</option>
            </select>
            <input
              type="text"
              placeholder="請輸入關鍵字"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              className="border border-gray-300 rounded px-3 py-1 w-48 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-gray-600 font-medium">系統:</span>
            <select
              value={systemFilter}
              onChange={(e) => setSystemFilter(e.target.value)}
              className="border border-gray-300 rounded px-2 py-1 bg-white min-w-[80px] focus:outline-none focus:border-blue-500"
            >
              <option value="all">全部</option>
              <option value="Android">Android</option>
              <option value="iOS">iOS</option>
              <option value="Web">Web</option>
            </select>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-gray-600 font-medium">登入APP:</span>
            <select
              value={appLoginFilter}
              onChange={(e) => setAppLoginFilter(e.target.value)}
              className="border border-gray-300 rounded px-2 py-1 bg-white min-w-[80px] focus:outline-none focus:border-blue-500"
            >
              <option value="all">全部</option>
              <option value="yes">是</option>
              <option value="no">否</option>
            </select>
          </div>
        </div>

        {/* Row 2 */}
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
          <div className="flex items-center space-x-2">
            <span className="text-gray-600 font-medium">日期:</span>
            <select
              value={dateType}
              onChange={(e) => setDateType(e.target.value)}
              className="border border-gray-300 rounded px-2 py-1 bg-white focus:outline-none focus:border-blue-500"
            >
              <option value="registerDate">註冊日期</option>
              <option value="joinDate">加入日期</option>
            </select>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="border border-gray-300 rounded px-2 py-1 text-gray-500 focus:outline-none focus:border-blue-500"
            />
            <span className="text-gray-500">至</span>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="border border-gray-300 rounded px-2 py-1 text-gray-500 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-gray-600 font-medium">累計會員天數:</span>
            <select
              value={memberDaysOperator}
              onChange={(e) => setMemberDaysOperator(e.target.value)}
              className="border border-gray-300 rounded px-2 py-1 bg-white focus:outline-none focus:border-blue-500"
            >
              <option value="gt">大於</option>
              <option value="gte">大於等於</option>
              <option value="eq">等於</option>
              <option value="lt">小於</option>
            </select>
            <input
              type="text"
              placeholder="請輸入關鍵字"
              value={memberDaysValue}
              onChange={(e) => setMemberDaysValue(e.target.value)}
              className="border border-gray-300 rounded px-3 py-1 w-32 focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        {/* Row 3 & Action Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-y-2 pt-1">
          <div className="flex items-center space-x-2">
            <span className="text-gray-600 font-medium">標籤:</span>
            <select
              value={tagFilter}
              onChange={(e) => setTagFilter(e.target.value)}
              className="border border-gray-300 rounded px-2 py-1 bg-white min-w-[120px] text-gray-500 focus:outline-none focus:border-blue-500"
            >
              <option value="">請選擇</option>
              <option value="vip">VIP</option>
              <option value="new">新會員</option>
            </select>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleSearch}
              className="bg-[#1890ff] hover:bg-blue-600 text-white px-5 py-1.5 rounded transition-colors text-xs font-medium"
            >
              搜尋
            </button>
            <button
              onClick={handleClear}
              className="bg-white hover:bg-gray-50 border border-gray-300 text-gray-700 px-4 py-1.5 rounded transition-colors text-xs"
            >
              清空條件
            </button>
          </div>

          <div className="ml-auto">
            <button className="bg-[#40a9ff] hover:bg-blue-500 text-white px-3 py-1.5 rounded text-xs transition-colors flex items-center space-x-1">
              <span>匯出報表</span>
            </button>
          </div>
        </div>
      </div>

      {/* Tab Segment Header */}
      <div className="border-b border-gray-200 bg-white px-2 flex space-x-6 text-xs font-medium overflow-x-auto">
        {tabCategories.map(cat => {
          const isActive = activeTab === cat.key;
          return (
            <button
              key={cat.key}
              onClick={() => setActiveTab(cat.key)}
              className={`py-3 whitespace-nowrap border-b-2 transition-colors ${
                isActive
                  ? 'border-blue-500 text-blue-600 font-semibold'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              {cat.label} ({cat.count.toLocaleString()})
            </button>
          );
        })}
      </div>

      {/* Main Table */}
      <div className="bg-white border border-gray-200 rounded shadow-xs overflow-x-auto">
        <table className="w-full text-xs text-left border-collapse">
          <thead>
            <tr className="bg-[#e6f7ff] text-[#003a8c] font-semibold border-b border-gray-200">
              <th className="py-2.5 px-4">會員名稱</th>
              <th className="py-2.5 px-3">系統</th>
              <th className="py-2.5 px-3">目前類別</th>
              <th className="py-2.5 px-3">註冊日期</th>
              <th className="py-2.5 px-3">註冊來源</th>
              <th className="py-2.5 px-3">本次加入日期</th>
              <th className="py-2.5 px-3">本次會員期限</th>
              <th className="py-2.5 px-3 text-center">累計會員天數</th>
              <th className="py-2.5 px-3 text-center">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-gray-700">
            {filteredList.map((member) => (
              <tr key={member.id} className="hover:bg-blue-50/20 transition-colors">
                {/* Member Name / ID / Phone */}
                <td className="py-3 px-4 align-middle">
                  <div className="flex items-center space-x-3">
                    <img
                      src={member.avatar}
                      alt="Avatar"
                      className="w-10 h-10 rounded object-cover border border-gray-200 shrink-0"
                    />
                    <div className="flex flex-col text-xs leading-tight">
                      {member.name && (
                        <span
                          onClick={() => setCurrentPage && setCurrentPage('memberDetail')}
                          className="font-medium text-blue-600 hover:underline cursor-pointer"
                        >
                          {member.name}
                        </span>
                      )}
                      <span
                        onClick={() => setCurrentPage && setCurrentPage('memberDetail')}
                        className="text-blue-600 font-mono hover:underline cursor-pointer"
                      >
                        {member.memberNo}
                      </span>
                      <span className="text-gray-500 font-mono">{member.phone}</span>
                    </div>
                  </div>
                </td>

                {/* System */}
                <td className="py-3 px-3 align-middle text-gray-600">
                  {member.system}
                </td>

                {/* Category */}
                <td className="py-3 px-3 align-middle text-gray-600">
                  {member.category}
                </td>

                {/* Registered At */}
                <td className="py-3 px-3 align-middle text-gray-600 whitespace-nowrap">
                  {member.registeredAt}
                </td>

                {/* Referrer */}
                <td className="py-3 px-3 align-middle text-gray-600 whitespace-nowrap">
                  {member.referrerName ? (
                    <div className="flex flex-col text-xs leading-tight">
                      <span className="font-medium text-gray-800">{member.referrerName}</span>
                      <span className="text-gray-500 font-mono mt-0.5">{member.referrerPhone}</span>
                    </div>
                  ) : (
                    <span className="text-gray-400">-</span>
                  )}
                </td>

                {/* Joined At */}
                <td className="py-3 px-3 align-middle text-gray-600 whitespace-nowrap">
                  {member.joinedAt}
                </td>

                {/* Expiry */}
                <td className="py-3 px-3 align-middle text-gray-600 text-center">
                  {member.expiry}
                </td>

                {/* Total Days */}
                <td className="py-3 px-3 align-middle text-center font-medium">
                  {member.totalDays}
                </td>

                {/* Actions */}
                <td className="py-3 px-3 align-middle">
                  <div className="flex items-center justify-center space-x-2 text-blue-500">
                    <button className="p-1 hover:text-blue-700 transition-colors" title="傳送訊息">
                      <ChatBubbleLeftRightIcon className="w-4 h-4" />
                    </button>
                    <button className="p-1 hover:text-blue-700 transition-colors" title="編輯紀錄">
                      <PencilSquareIcon className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Bottom Pagination */}
        <div className="flex flex-wrap items-center justify-between p-3 border-t border-gray-200 text-xs text-gray-600 bg-white">
          <div className="flex items-center space-x-1">
            <button className="px-2 py-1 text-gray-400 hover:text-gray-700 cursor-not-allowed">
              上一頁
            </button>
            <button className="w-6 h-6 bg-blue-500 text-white rounded font-medium flex items-center justify-center">
              1
            </button>
            <button className="w-6 h-6 hover:bg-gray-100 rounded text-gray-600 flex items-center justify-center">
              2
            </button>
            <button className="w-6 h-6 hover:bg-gray-100 rounded text-gray-600 flex items-center justify-center">
              3
            </button>
            <button className="w-6 h-6 hover:bg-gray-100 rounded text-gray-600 flex items-center justify-center">
              4
            </button>
            <span className="px-1 text-gray-400">...</span>
            <button className="px-1.5 py-0.5 hover:bg-gray-100 rounded text-gray-600">
              706
            </button>
            <button className="px-2 py-1 text-gray-600 hover:text-blue-600">
              下一頁
            </button>
          </div>

          <div className="flex items-center space-x-4">
            <select className="border border-gray-300 rounded px-2 py-1 text-xs bg-white text-gray-600 focus:outline-none focus:border-blue-500">
              <option value="20">20條/頁</option>
              <option value="50">50條/頁</option>
              <option value="100">100條/頁</option>
            </select>
            <span>共 14115 項</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberListContent;
