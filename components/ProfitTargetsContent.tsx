import React, { useState } from 'react';
import { PencilSquareIcon } from './icons';
import AddProfitTargetModal from './AddProfitTargetModal';
import EditProfitTargetModal from './EditProfitTargetModal';

export interface ProfitTarget {
    id: string;
    name: string;
    phone: string;
    type: string;
    superiorName: string;
    superiorPhone: string;
    status: string;
    createdAt: string;
}

const initialTargets: ProfitTarget[] = [
    { id: '1', name: '王大頭', phone: '886 904900077', type: '店家', superiorName: '瑪莉', superiorPhone: '886 904900001', status: '啟用', createdAt: '2025/09/01 15:09:21' },
    { id: '2', name: '李阿明', phone: '886 988788390', type: '經銷', superiorName: '--', superiorPhone: '', status: '啟用', createdAt: '2025/07/24 12:59:26' },
    { id: '3', name: '趙小美', phone: '886 932225631', type: '經銷', superiorName: '--', superiorPhone: '', status: '啟用', createdAt: '2025/07/24 12:58:42' },
    { id: '4', name: '維客多手機維修太平旗艦店', phone: '886 979359099', type: '店家', superiorName: '可樂', superiorPhone: '886 979359099', status: '啟用', createdAt: '2025/07/24 12:58:26' },
    { id: '5', name: '陳顧問', phone: '886 939103128', type: '顧問', superiorName: '--', superiorPhone: '', status: '啟用', createdAt: '2025/07/24 12:57:28' },
    { id: '6', name: '張代理', phone: '886 905718766', type: '代理', superiorName: '--', superiorPhone: '', status: '啟用', createdAt: '2025/07/24 12:56:49' },
    { id: '7', name: '林督導', phone: '886 917787811', type: '區督導', superiorName: '--', superiorPhone: '', status: '啟用', createdAt: '2025/07/24 12:55:51' },
    { id: '8', name: '康寶健康生活館', phone: '886 939103128', type: '店家', superiorName: '老鈜', superiorPhone: '886 932540007', status: '啟用', createdAt: '2025/07/24 12:55:28' },
    { id: '9', name: '三街海鮮屋', phone: '886 928020789', type: '店家', superiorName: '黃進恭', superiorPhone: '886 928020789', status: '啟用', createdAt: '2025/07/24 12:54:54' },
    { id: '10', name: '王大文', phone: '886 933464193', type: '代理', superiorName: '--', superiorPhone: '', status: '啟用', createdAt: '2025/07/24 12:54:40' },
    { id: '11', name: 'NX Coffee', phone: '886 909284702', type: '店家', superiorName: 'William', superiorPhone: '886 987561344', status: '啟用', createdAt: '2025/07/24 12:53:53' },
    { id: '12', name: '小資族分享', phone: '886 973957003', type: '經銷', superiorName: '--', superiorPhone: '', status: '啟用', createdAt: '2025/07/24 12:52:46' },
];

const ProfitTargetsContent: React.FC = () => {
    const [targets, setTargets] = useState<ProfitTarget[]>(initialTargets);
    const [activeTab, setActiveTab] = useState<'operator' | 'store'>('operator');
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingTarget, setEditingTarget] = useState<ProfitTarget | null>(null);

    // Filter states
    const [keyword, setKeyword] = useState('');
    const [typeFilter, setTypeFilter] = useState('全部');
    const [statusFilter, setStatusFilter] = useState('請選擇');

    const handleAddTarget = (data: { type: string; accountId: string; accountName: string; superiorId: string; superiorName: string }) => {
        const date = new Date();
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
        const formattedDate = `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;

        const newTarget: ProfitTarget = {
            id: String(targets.length + 1),
            name: data.accountName,
            phone: data.accountId,
            type: data.type,
            superiorName: data.superiorName || '--',
            superiorPhone: data.superiorId || '',
            status: '啟用',
            createdAt: formattedDate
        };

        setTargets([newTarget, ...targets]);
    };

    const handleEditTarget = (id: string, data: { status: string; superiorId: string; superiorName: string; type: string }) => {
        setTargets(targets.map(target => 
            target.id === id 
                ? { ...target, status: data.status, type: data.type, superiorPhone: data.superiorId, superiorName: data.superiorName || '--' }
                : target
        ));
    };

    const openEditModal = (target: ProfitTarget) => {
        setEditingTarget(target);
        setIsEditModalOpen(true);
    };

    const clearFilters = () => {
        setKeyword('');
        setTypeFilter('全部');
        setStatusFilter('請選擇');
    };

    // Filter records according to active tab and search fields
    const displayedTargets = targets.filter(item => {
        // Tab check
        if (activeTab === 'operator' && item.type === '店家') return false;
        if (activeTab === 'store' && item.type !== '店家') return false;

        // Keyword check
        if (keyword) {
            const lowerK = keyword.toLowerCase();
            const nameMatch = item.name.toLowerCase().includes(lowerK);
            const phoneMatch = item.phone.includes(keyword);
            const superiorMatch = item.superiorName.toLowerCase().includes(lowerK) || item.superiorPhone.includes(keyword);
            if (!nameMatch && !phoneMatch && !superiorMatch) return false;
        }

        // Type filter check (only for operators)
        if (activeTab === 'operator' && typeFilter !== '全部') {
            if (item.type !== typeFilter) return false;
        }

        // Status check
        if (statusFilter !== '請選擇' && statusFilter !== '全部') {
            if (item.status !== statusFilter) return false;
        }

        return true;
    });

    return (
        <div className="bg-white p-6 rounded shadow-sm border border-gray-100 flex flex-col h-full">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-800">分潤對象管理</h2>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-gray-200 mb-6">
                <button
                    onClick={() => { setActiveTab('operator'); clearFilters(); }}
                    className={`px-6 py-3 font-medium text-sm transition-colors border-b-2 -mb-px flex items-center gap-2 ${
                        activeTab === 'operator'
                            ? 'border-blue-500 text-blue-600 bg-blue-50/50'
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                >
                    <span>經營者</span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">
                        {targets.filter(t => t.type !== '店家').length}
                    </span>
                </button>
                <button
                    onClick={() => { setActiveTab('store'); clearFilters(); }}
                    className={`px-6 py-3 font-medium text-sm transition-colors border-b-2 -mb-px flex items-center gap-2 ${
                        activeTab === 'store'
                            ? 'border-blue-500 text-blue-600 bg-blue-50/50'
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                >
                    <span>店家</span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-700">
                        {targets.filter(t => t.type === '店家').length}
                    </span>
                </button>
            </div>
            
            {/* Search Filters */}
            <div className="bg-[#f8f9fa] p-4 rounded mb-4 text-sm flex gap-6 items-center flex-wrap">
                <div className="flex items-center gap-2">
                    <span className="text-gray-600 whitespace-nowrap">關鍵字:</span>
                    <select className="border border-gray-300 rounded px-3 py-1.5 bg-white text-gray-700 outline-none w-28 focus:border-blue-300 transition-colors">
                        <option>名稱</option>
                        <option>手機號碼</option>
                    </select>
                    <input 
                        type="text" 
                        placeholder="請輸入關鍵字" 
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                        className="border border-gray-300 rounded px-3 py-1.5 bg-white text-gray-700 outline-none w-48 focus:border-blue-300 transition-colors placeholder-gray-400" 
                    />
                </div>

                {activeTab === 'operator' && (
                    <div className="flex items-center gap-2">
                        <span className="text-gray-600 whitespace-nowrap">類型:</span>
                        <select 
                            value={typeFilter}
                            onChange={(e) => setTypeFilter(e.target.value)}
                            className="border border-gray-300 rounded px-3 py-1.5 bg-white text-gray-700 outline-none w-32 focus:border-blue-300 transition-colors"
                        >
                            <option value="全部">全部</option>
                            <option value="顧問">顧問</option>
                            <option value="經銷">經銷</option>
                            <option value="代理">代理</option>
                            <option value="區督導">區督導</option>
                        </select>
                    </div>
                )}

                {activeTab === 'operator' && (
                    <div className="flex items-center gap-2">
                        <span className="text-gray-600 whitespace-nowrap">狀態:</span>
                        <select 
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="border border-gray-300 rounded px-3 py-1.5 bg-white text-gray-700 outline-none w-32 focus:border-blue-300 transition-colors"
                        >
                            <option value="請選擇">請選擇</option>
                            <option value="啟用">啟用</option>
                            <option value="暫停">暫停</option>
                        </select>
                    </div>
                )}

                <div className="flex items-center gap-2 ml-auto">
                    <button className="bg-[#409eff] text-white px-5 py-1.5 rounded text-sm hover:bg-blue-500 transition-colors">
                        搜尋
                    </button>
                    <button 
                        onClick={clearFilters}
                        className="bg-gray-400 text-white px-5 py-1.5 rounded text-sm hover:bg-gray-500 transition-colors"
                    >
                        清空條件
                    </button>
                </div>
            </div>

            {/* Action Bar */}
            <div className="flex justify-end mb-4">
                <button 
                    onClick={() => setIsAddModalOpen(true)}
                    className="bg-[#409eff] text-white px-4 py-2 rounded text-sm hover:bg-blue-600 transition-colors shadow-sm flex items-center gap-1.5 font-medium"
                >
                    <span>+</span>
                    <span>{activeTab === 'operator' ? '新增經營者' : '新增店家引薦'}</span>
                </button>
            </div>

            {/* Data Table */}
            <div className="overflow-x-auto flex-1 h-0 custom-scrollbar">
                <table className="w-full text-left border-collapse text-sm min-w-[800px]">
                    <thead className="sticky top-0 bg-[#eef1f6] z-10 shadow-sm">
                        <tr className="text-gray-600 font-medium">
                            <th className="px-4 py-3 min-w-[180px] text-center">
                                {activeTab === 'operator' ? '經營者姓名 / 手機' : '店家名稱 / 手機'}
                            </th>
                            {activeTab === 'operator' ? (
                                <th className="px-4 py-3 min-w-[120px] text-center">經營者類型</th>
                            ) : (
                                <th className="px-4 py-3 min-w-[180px] text-center">引薦經營者</th>
                            )}
                            {activeTab === 'operator' && (
                                <th className="px-4 py-3 min-w-[100px] text-center">狀態</th>
                            )}
                            <th className="px-4 py-3 min-w-[150px] text-center">建立日期</th>
                            <th className="px-4 py-3 min-w-[100px] text-center">操作</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 bg-white">
                        {displayedTargets.length > 0 ? (
                            displayedTargets.map((item) => (
                                <tr key={item.id} className="hover:bg-blue-50/30 transition-colors group">
                                    <td className="px-4 py-4 text-center">
                                        <div className="text-gray-800 font-medium text-sm mb-0.5">{item.name}</div>
                                        <div className="text-gray-500 text-xs font-mono">{item.phone}</div>
                                    </td>
                                    
                                    {activeTab === 'operator' ? (
                                        <td className="px-4 py-4 text-center">
                                            <span className="px-2.5 py-1 rounded bg-blue-50 text-blue-700 text-xs font-medium border border-blue-100">
                                                {item.type}
                                            </span>
                                        </td>
                                    ) : (
                                        <td className="px-4 py-4 text-center">
                                            <div className="text-gray-800 text-sm mb-0.5">{item.superiorName}</div>
                                            {item.superiorPhone && (
                                                <div className="text-gray-400 text-xs font-mono">{item.superiorPhone}</div>
                                            )}
                                        </td>
                                    )}

                                    {activeTab === 'operator' && (
                                        <td className="px-4 py-4 text-center">
                                            <span className={`px-2.5 py-1 rounded text-xs font-medium ${
                                                item.status === '啟用' 
                                                    ? 'bg-green-50 text-green-700 border border-green-100' 
                                                    : 'bg-gray-100 text-gray-600 border border-gray-200'
                                            }`}>
                                                {item.status}
                                            </span>
                                        </td>
                                    )}
                                    <td className="px-4 py-4 text-center text-gray-600 font-mono text-xs">{item.createdAt}</td>
                                    <td className="px-4 py-4 text-center">
                                        <button 
                                            className="text-blue-500 hover:text-blue-700 transition-colors p-1 hover:bg-blue-50 rounded" 
                                            title="編輯"
                                            onClick={() => openEditModal(item)}
                                        >
                                            <PencilSquareIcon className="w-5 h-5 mx-auto" />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={5} className="py-12 text-center text-gray-400">
                                    暫無相關數據
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between text-sm text-gray-500">
                <div>共 {displayedTargets.length} 項數據</div>
                <div className="flex items-center gap-2">
                    <button className="px-2 py-1 border border-gray-200 rounded hover:bg-gray-50 disabled:opacity-50" disabled>上一頁</button>
                    <div className="flex gap-1">
                        <button className="px-3 py-1 bg-blue-500 text-white rounded">1</button>
                    </div>
                    <button className="px-2 py-1 border border-gray-200 rounded hover:bg-gray-50 disabled:opacity-50" disabled>下一頁</button>
                </div>
            </div>

            <AddProfitTargetModal 
                isOpen={isAddModalOpen} 
                onClose={() => setIsAddModalOpen(false)} 
                activeTab={activeTab}
                onSubmit={handleAddTarget} 
            />

            <EditProfitTargetModal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                target={editingTarget}
                onSubmit={handleEditTarget}
            />
        </div>
    );
};

export default ProfitTargetsContent;
