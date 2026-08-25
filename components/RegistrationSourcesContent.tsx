import React, { useState } from 'react';
import { Page } from '../App';
import { ExcelIcon, PencilSquareIcon } from './icons';
import Select from 'react-select';

interface RegistrationSourcesContentProps {
  setCurrentPage?: (page: Page) => void;
}

export interface MemberNode {
  id: string;
  memberNo: string;
  name?: string;
  phone: string;
  avatar: string;
  referrerId?: string; // ID of the member who invited them
  referrerName?: string;
  referrerPhone?: string;
  depth: number;
  directInvitesCount: number;
  teamTotalCount: number;
  registeredAt: string;
}

// Initial Mock Member Referral Tree Data
export const initialReferralMembers: MemberNode[] = [
  {
    id: 'M001',
    memberNo: 'SYS000',
    name: '總公司 (無推薦人)',
    phone: '+886 900000000',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&auto=format&fit=crop&q=80',
    depth: 0,
    directInvitesCount: 12,
    teamTotalCount: 14115,
    registeredAt: '2025/01/01 00:00:00',
  },
  {
    id: 'M002',
    memberNo: 'L100001',
    name: 'Gary',
    phone: '+886 913000827',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop&q=80',
    referrerId: 'M001',
    referrerName: '總公司 (無推薦人)',
    referrerPhone: '+886 900000000',
    depth: 1,
    directInvitesCount: 5,
    teamTotalCount: 128,
    registeredAt: '2026/01/10 14:20:11',
  },
  {
    id: 'M006',
    memberNo: 'L308384',
    name: '李雅婷',
    phone: '+86 18180560261',
    avatar: 'https://images.unsplash.com/photo-1534188753412-3e26d0d618d6?w=100&auto=format&fit=crop&q=80',
    referrerId: 'M002',
    referrerName: 'Gary',
    referrerPhone: '+886 913000827',
    depth: 2,
    directInvitesCount: 2,
    teamTotalCount: 15,
    registeredAt: '2026/08/12 10:41:10',
  },
  {
    id: 'M007',
    memberNo: 'L305273',
    name: '禮悟哥 (迴圈示範)',
    phone: '+86 921998662',
    avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&auto=format&fit=crop&q=80',
    referrerId: 'M006',
    referrerName: '李雅婷',
    referrerPhone: '+86 18180560261',
    depth: 3,
    directInvitesCount: 1,
    teamTotalCount: 3,
    registeredAt: '2026/08/11 22:46:37',
  },
  {
    id: 'M008',
    memberNo: 'L270600',
    name: '王正懋',
    phone: '+886 955556685',
    avatar: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=100&auto=format&fit=crop&q=80',
    referrerId: 'M007',
    referrerName: '禮悟哥 (迴圈示範)',
    referrerPhone: '+86 921998662',
    depth: 4,
    directInvitesCount: 0,
    teamTotalCount: 0,
    registeredAt: '2026/08/11 21:37:24',
  },
  {
    id: 'M003',
    memberNo: 'L305878',
    name: 'David',
    phone: '+886 958068028',
    avatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100&auto=format&fit=crop&q=80',
    referrerId: 'M002',
    referrerName: 'Gary',
    referrerPhone: '+886 913000827',
    depth: 2,
    directInvitesCount: 2,
    teamTotalCount: 8,
    registeredAt: '2026/08/12 09:31:58',
  },
  {
    id: 'M004',
    memberNo: 'L288258',
    name: '鄭文豪',
    phone: '+886 987286397',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80',
    referrerId: 'M003',
    referrerName: 'David',
    referrerPhone: '+886 958068028',
    depth: 3,
    directInvitesCount: 1,
    teamTotalCount: 2,
    registeredAt: '2026/08/12 09:31:23',
  },
  {
    id: 'M005',
    memberNo: 'L102516',
    name: '張檻如',
    phone: '+886 958102586',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80',
    referrerId: 'M004',
    referrerName: '鄭文豪',
    referrerPhone: '+886 987286397',
    depth: 4,
    directInvitesCount: 0,
    teamTotalCount: 0,
    registeredAt: '2026/08/12 09:19:25',
  },
];

export const detectReferralLoop = (
  targetMemberId: string,
  newReferrerId: string | undefined,
  membersList: MemberNode[]
): { isLoop: boolean; cyclePath: string[] } => {
  if (!newReferrerId) return { isLoop: false, cyclePath: [] };
  if (targetMemberId === newReferrerId) {
    const member = membersList.find(m => m.id === targetMemberId);
    const label = member ? (member.name ? `${member.name} - ${member.phone}` : `${member.memberNo} - ${member.phone}`) : targetMemberId;
    return { isLoop: true, cyclePath: [label, label] };
  }

  const visitedPath: string[] = [];
  let currentId: string | undefined = newReferrerId;

  const targetMember = membersList.find(m => m.id === targetMemberId);
  const getLabel = (m: MemberNode | undefined, fallbackId: string) => {
    if (!m) return fallbackId;
    const nameStr = m.name ? m.name : m.memberNo;
    return `${nameStr} - ${m.phone}`;
  };
  visitedPath.push(getLabel(targetMember, targetMemberId));

  while (currentId) {
    const currNode = membersList.find(m => m.id === currentId);
    if (!currNode) break;

    visitedPath.push(getLabel(currNode, currNode.id));

    if (currNode.id === targetMemberId) {
      return { isLoop: true, cyclePath: visitedPath };
    }
    currentId = currNode.referrerId;
  }

  return { isLoop: false, cyclePath: [] };
};

export const RegistrationSourcesContent: React.FC<RegistrationSourcesContentProps> = ({ setCurrentPage }) => {
  const [members, setMembers] = useState<MemberNode[]>(initialReferralMembers);
  const [keyword, setKeyword] = useState('');
  const [searchField, setSearchField] = useState('memberName'); // 'memberName', 'memberPhone', 'referrerName', 'referrerPhone'

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<MemberNode | null>(null);
  const [selectedNewReferrerId, setSelectedNewReferrerId] = useState<string>('none');
  const [loopCheckResult, setLoopCheckResult] = useState<{ isLoop: boolean; cyclePath: string[] }>({ isLoop: false, cyclePath: [] });
  const [changeSuccessNotice, setChangeSuccessNotice] = useState<string | null>(null);
  const [exportNotice, setExportNotice] = useState<string | null>(null);
  const [isFinalConfirmModalOpen, setIsFinalConfirmModalOpen] = useState(false);

  const filteredMembers = members.filter(m => {
    if (m.id === 'M001') return false; 

    if (keyword.trim()) {
      const kw = keyword.trim().toLowerCase();
      if (searchField === 'memberName') {
         if (!m.name?.toLowerCase().includes(kw) && !m.memberNo.toLowerCase().includes(kw)) return false;
      } else if (searchField === 'memberPhone') {
         if (!m.phone.toLowerCase().includes(kw)) return false;
      } else if (searchField === 'referrerName') {
         if (!m.referrerName?.toLowerCase().includes(kw)) return false;
      } else if (searchField === 'referrerPhone') {
         if (!m.referrerPhone?.toLowerCase().includes(kw)) return false;
      }
    }
    return true;
  });

  const handleOpenEditModal = (member: MemberNode) => {
    setEditingMember(member);
    setSelectedNewReferrerId(member.referrerId || 'none');
    setLoopCheckResult({ isLoop: false, cyclePath: [] });
    setIsFinalConfirmModalOpen(false);
    setIsEditModalOpen(true);
  };

  const handleSelectNewReferrer = (newRefId: string) => {
    setSelectedNewReferrerId(newRefId);
    if (!editingMember) return;

    if (newRefId === 'none') {
      setLoopCheckResult({ isLoop: false, cyclePath: [] });
    } else {
      const result = detectReferralLoop(editingMember.id, newRefId, members);
      setLoopCheckResult(result);
    }
  };

  const handleConfirmChangeSource = () => {
    if (!editingMember) return;
    setIsFinalConfirmModalOpen(false);
    if (loopCheckResult.isLoop) {
      alert('無法變更註冊來源：檢測到關係鏈迴圈！');
      return;
    }

    const newRefNode = members.find(m => m.id === selectedNewReferrerId);
    const newReferrerName = newRefNode ? (newRefNode.name || newRefNode.memberNo) : undefined;
    const newReferrerPhone = newRefNode ? newRefNode.phone : undefined;
    const newDepth = newRefNode ? newRefNode.depth + 1 : 1;

    setMembers(prev =>
      prev.map(m => {
        if (m.id === editingMember.id) {
          return {
            ...m,
            referrerId: selectedNewReferrerId === 'none' ? undefined : selectedNewReferrerId,
            referrerName: newReferrerName,
            referrerPhone: newReferrerPhone,
            depth: newDepth,
          };
        }
        return m;
      })
    );

    setIsEditModalOpen(false);
    setChangeSuccessNotice(`已成功將【${editingMember.name || editingMember.memberNo}】之註冊來源更新為：${newReferrerName || '無'}`);
    setTimeout(() => setChangeSuccessNotice(null), 4000);
  };

  const handleExportData = () => {
    setExportNotice('正在生成【註冊來源報表.csv】...');
    setTimeout(() => {
      // Generate CSV content
      const headers = ['會員帳號', '會員姓名', '手機號碼', '註冊時間', '推薦人帳號', '推薦人姓名', '推薦人手機'];
      
      const csvContent = [
        headers.join(','),
        ...filteredMembers.map(m => {
          const referrer = members.find(r => r.id === m.referrerId);
          const refNo = (referrer && referrer.id !== 'M001') ? referrer.memberNo : '';
          const refName = (referrer && referrer.id !== 'M001') ? (referrer.name || '') : '';
          const refPhone = (referrer && referrer.id !== 'M001') ? referrer.phone : '';
          
          return [
            m.memberNo,
            m.name || '',
            m.phone,
            m.registeredAt,
            refNo,
            refName,
            refPhone
          ].map(field => `"${field}"`).join(',');
        })
      ].join('\n');

      const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', '註冊來源報表_範本.csv');
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setExportNotice('✅ 報表匯出成功！檔案已自動下載。');
      setTimeout(() => setExportNotice(null), 3500);
    }, 1200);
  };

  return (
    <div className="space-y-4 font-sans text-gray-700 text-sm">
      <div className="flex flex-wrap items-center justify-between gap-2 pb-1 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <h1 className="text-2xl font-semibold text-gray-800">註冊來源</h1>
          <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded shadow-2xs">
            總後台限定
          </span>
        </div>
      </div>

      {changeSuccessNotice && (
        <div className="bg-green-50 border border-green-300 text-green-800 px-4 py-3 rounded text-xs flex items-center justify-between shadow-2xs">
          <span>{changeSuccessNotice}</span>
          <button onClick={() => setChangeSuccessNotice(null)} className="font-bold text-green-700 hover:text-green-900">×</button>
        </div>
      )}

      {exportNotice && (
        <div className="bg-blue-50 border border-blue-300 text-blue-800 px-4 py-3 rounded text-xs flex items-center justify-between shadow-2xs">
          <span>{exportNotice}</span>
          <button onClick={() => setExportNotice(null)} className="font-bold text-blue-700 hover:text-blue-900">×</button>
        </div>
      )}

      <div className="bg-white rounded border border-gray-200 p-4 space-y-3 text-xs shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-y-2">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <div className="flex items-center space-x-2">
              <span className="text-gray-600 font-medium">關鍵字搜尋:</span>
              <div className="flex bg-white border border-gray-300 rounded overflow-hidden">
                <select
                  value={searchField}
                  onChange={(e) => setSearchField(e.target.value)}
                  className="bg-gray-50 border-r border-gray-300 px-2 py-1.5 text-xs focus:outline-none text-gray-700 font-medium"
                >
                  <option value="memberName">會員名稱/帳號</option>
                  <option value="memberPhone">會員手機</option>
                  <option value="referrerName">推薦人名稱</option>
                  <option value="referrerPhone">推薦人手機</option>
                </select>
                <input
                  type="text"
                  placeholder="請輸入搜尋條件..."
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  className="px-3 py-1.5 w-56 focus:outline-none focus:border-blue-500 text-xs"
                />
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2 ml-auto">
            <button
              onClick={handleExportData}
              className="bg-[#27a844] hover:bg-green-700 text-white px-4 py-1.5 rounded text-xs transition-colors flex items-center space-x-1.5 shadow-2xs font-medium cursor-pointer"
            >
              <ExcelIcon className="w-4 h-4" />
              <span>匯出註冊來源報表</span>
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded shadow-xs overflow-x-auto">
        <table className="w-full text-xs text-left border-collapse">
          <thead>
            <tr className="bg-[#e6f7ff] text-[#003a8c] font-semibold border-b border-gray-200">
              <th className="py-3 px-4">會員資料</th>
              <th className="py-3 px-4">註冊時間</th>
              <th className="py-3 px-4">註冊來源 (推薦人)</th>
              <th className="py-3 px-4 text-center">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-gray-700">
            {filteredMembers.map((member) => {
              const referrer = members.find(m => m.id === member.referrerId);
              return (
              <tr key={member.id} className="hover:bg-blue-50/20 transition-colors">
                <td className="py-3 px-4 align-middle">
                  <div className="flex items-center space-x-3">
                    <img
                      src={member.avatar}
                      alt="Avatar"
                      className="w-9 h-9 rounded-full object-cover border border-gray-200 shrink-0"
                    />
                    <div className="flex flex-col text-xs leading-tight">
                      <span className="font-medium text-blue-600 hover:underline cursor-pointer">
                        {member.name || member.memberNo}
                      </span>
                      <span className="text-gray-500 font-mono">{member.memberNo}</span>
                      <span className="text-gray-400 font-mono">{member.phone}</span>
                    </div>
                  </div>
                </td>
                <td className="py-3 px-4 align-middle text-gray-500 whitespace-nowrap font-mono">
                  {member.registeredAt}
                </td>
                <td className="py-3 px-4 align-middle">
                  {member.referrerName && member.referrerId !== 'M001' ? (
                    <div className="flex flex-col leading-tight">
                      <span className="font-medium text-gray-800">{member.referrerName}</span>
                      <span className="text-gray-500 font-mono text-[11px]">{member.referrerPhone}</span>
                    </div>
                  ) : (
                    <span className="text-gray-400">
                      --
                    </span>
                  )}
                </td>
                <td className="py-3 px-4 align-middle text-center">
                  <div className="flex items-center justify-center space-x-2">
                    <button
                      onClick={() => handleOpenEditModal(member)}
                      className="bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-300 px-2.5 py-1 rounded transition-colors text-xs font-medium flex items-center space-x-1 cursor-pointer"
                      title="調整註冊來源（防迴圈自動檢測）"
                    >
                      <PencilSquareIcon className="w-3.5 h-3.5" />
                      <span>變更註冊來源</span>
                    </button>
                  </div>
                </td>
              </tr>
            )})}
          </tbody>
        </table>
        <div className="p-3 bg-gray-50 border-t border-gray-200 text-xs text-gray-500 flex justify-between items-center">
          <span>共顯示 {filteredMembers.length} 筆會員紀錄</span>
        </div>
      </div>

      {isEditModalOpen && editingMember && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-lg overflow-hidden border border-gray-200 text-xs">
            <div className="bg-[#1890ff] text-white px-4 py-3 flex items-center justify-between">
              <h3 className="text-sm font-semibold flex items-center space-x-1.5">
                <span>變更會員註冊來源</span>
                <span className="bg-amber-400 text-amber-900 text-[10px] font-bold px-1.5 py-0.5 rounded">
                  總後台專用
                </span>
              </h3>
              <button onClick={() => setIsEditModalOpen(false)} className="text-white hover:text-gray-200 font-bold text-base cursor-pointer">×</button>
            </div>
            <div className="p-5 space-y-4 text-gray-700">
              <div className="bg-gray-50 border border-gray-200 p-3 rounded flex items-center space-x-3">
                <img src={editingMember.avatar} alt="Avatar" className="w-10 h-10 rounded-full object-cover border border-gray-300" />
                <div>
                  <div className="font-bold text-gray-900 text-sm">{editingMember.name || editingMember.memberNo}</div>
                  <div className="text-gray-500 font-mono">帳號: {editingMember.memberNo} | 手機: {editingMember.phone}</div>
                  <div className="text-gray-600 mt-0.5">當前註冊來源：<span className="font-semibold text-blue-600">{(!editingMember.referrerName || editingMember.referrerId === 'M001') ? '--' : editingMember.referrerName}</span></div>
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="block font-semibold text-gray-800">請選擇新的註冊來源 (推薦人):</label>
                <Select
                  styles={{
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
                  }}
                  value={
                    selectedNewReferrerId === 'none' 
                      ? { value: 'none', label: '【清除註冊來源】 (無推薦人 / 自行註冊)' }
                      : {
                          value: selectedNewReferrerId,
                          label: (() => {
                            const m = members.find(x => x.id === selectedNewReferrerId);
                            if (!m) return '';
                            return m.name ? `${m.name} - ${m.phone}` : `${m.memberNo} - ${m.phone}`;
                          })()
                        }
                  }
                  onChange={(option: any) => handleSelectNewReferrer(option.value)}
                  options={[
                    { value: 'none', label: '【清除註冊來源】 (無推薦人 / 自行註冊)' },
                    ...members
                      .filter(m => m.id !== editingMember.id && m.id !== 'M001')
                      .map(m => ({
                        value: m.id,
                        label: m.name ? `${m.name} - ${m.phone}` : `${m.memberNo} - ${m.phone}`
                      }))
                  ]}
                  isSearchable={true}
                  placeholder="搜尋推薦人名稱或手機..."
                  noOptionsMessage={() => "找不到符合的會員"}
                />
              </div>
              {loopCheckResult.isLoop ? (
                <div className="bg-red-50 border-2 border-red-400 p-3.5 rounded text-red-700 space-y-1.5">
                  <div className="font-bold flex items-center space-x-1 text-sm text-red-800"><span>⚠️ 關係鏈迴圈警示 (Cycle Detected!)</span></div>
                  <p className="leading-relaxed">無法變更為此註冊來源！因為選擇的推薦人屬於【{editingMember.name || editingMember.memberNo}】的下線/團隊成員，變更後將導致推薦關係鏈出現無窮迴圈。</p>
                  <div className="bg-white border border-red-200 p-2 rounded text-red-900 font-mono text-[11px] overflow-x-auto whitespace-nowrap">
                    若強制綁定，將形成以下無窮迴圈：<br/>
                    {loopCheckResult.cyclePath.join(' ➔ ')}
                  </div>
                </div>
              ) : selectedNewReferrerId !== 'none' ? (
                <div className="bg-green-50 border border-green-300 p-3 rounded text-green-800 flex items-center space-x-2"><span className="font-bold text-sm">✓</span><span>關係鏈自動檢測通過：無迴圈風險，可安全變更。</span></div>
              ) : null}
              <div className="bg-amber-50 border border-amber-200 p-3 rounded text-amber-800 text-[11px] leading-relaxed flex flex-col space-y-2">
                <div>
                  💡 <strong>規則提示：</strong> 變更註冊來源後，該會員與其下線團隊將整體遷移至新推薦人旗下。
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 border-t border-gray-200 flex justify-end space-x-2">
              <button onClick={() => setIsEditModalOpen(false)} className="bg-white border border-gray-300 hover:bg-gray-100 text-gray-700 px-4 py-1.5 rounded transition-colors text-xs font-medium cursor-pointer">取消</button>
              <button disabled={loopCheckResult.isLoop} onClick={() => setIsFinalConfirmModalOpen(true)} className={`px-5 py-1.5 rounded text-xs font-medium transition-colors text-white cursor-pointer ${loopCheckResult.isLoop ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 shadow-xs'}`}>繼續變更</button>
            </div>
          </div>
        </div>
      )}

      {isFinalConfirmModalOpen && editingMember && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded shadow-xl w-full max-w-sm overflow-hidden border border-gray-200 text-sm p-6 text-center space-y-4">
            <h3 className="font-bold text-gray-900 text-lg">最後確認</h3>
            <p className="text-gray-600 leading-relaxed text-xs">
              您確定要將【{editingMember.name || editingMember.memberNo}】的註冊來源變更嗎？<br/>
              <span className="text-red-500 font-semibold mt-1 inline-block">此操作將一併轉移其下線團隊。</span>
            </p>
            <div className="flex flex-col items-center space-y-3 pt-4">
              <button 
                onClick={() => setIsFinalConfirmModalOpen(false)} 
                className="bg-blue-600 hover:bg-blue-700 text-white w-full py-2 rounded text-sm font-medium cursor-pointer shadow-sm transition-colors"
              >
                取消變更 (返回)
              </button>
              <button 
                onClick={handleConfirmChangeSource} 
                className="text-gray-400 hover:text-gray-600 text-xs cursor-pointer underline transition-colors"
              >
                我已確認無誤，執行變更
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RegistrationSourcesContent;
