import React, { useState } from 'react';
import { InformationCircleIcon, ExcelIcon } from './icons';

interface BindingRecord {
    id: string;
    user: {
        name: string;
        phone: string;
        registerDate: string;
    };
    boundTo: {
        name: string;
        phone: string;
        type: string;
    };
}

const mockData: BindingRecord[] = [
    {
        id: '1',
        user: { name: '王大明', phone: '0912-345-678', registerDate: '2026/05/10 14:00' },
        boundTo: { name: '陳快樂', phone: '0904-900-077', type: '分享者Lv3' },
    },
    {
        id: '2',
        user: { name: '李小梅', phone: '0987-654-321', registerDate: '2026/05/12 09:30' },
        boundTo: { name: '維客多', phone: '0979-359-099', type: '分享者Lv1' },
    },
    {
        id: '3',
        user: { name: '張阿姨', phone: '0922-333-444', registerDate: '2026/01/05 10:15' },
        boundTo: { name: '陳顧問', phone: '0939-103-128', type: '市場顧問' },
    },
    {
        id: '4',
        user: { name: '陳先生', phone: '0955-666-777', registerDate: '2026/05/14 08:20' },
        boundTo: { name: '王代理', phone: '0928-020-789', type: '市場代理' },
    },
    {
        id: '5',
        user: { name: '林小姐', phone: '0911-222-333', registerDate: '2026/05/14 10:20' },
        boundTo: { name: '林督導', phone: '0933-444-555', type: '區督導' },
    },
    {
        id: '6',
        user: { name: '黃小哥', phone: '0977-888-999', registerDate: '2026/05/14 11:20' },
        boundTo: { name: '小資族分享', phone: '0988-777-666', type: '分享者Lv2' },
    }
];

const ExcelPreviewModal: React.FC<{
    isOpen: boolean;
    onClose: () => void;
}> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="fixed inset-0 bg-black/40 transition-opacity" onClick={onClose}></div>
            <div className="relative bg-white rounded shadow-lg w-[90vw] max-w-[800px] h-[80vh] flex flex-col text-gray-800 overflow-hidden">
                <div className="flex justify-between items-center px-6 py-4 bg-white border-b border-gray-200">
                    <h3 className="text-lg font-bold flex items-center gap-2">
                        <ExcelIcon className="w-5 h-5 text-green-600" />
                        匯出格式模擬 (討論專用)
                    </h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100 transition-colors">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                    </button>
                </div>
                
                <div className="bg-blue-50 text-blue-800 text-sm px-6 py-3 border-b border-blue-100 flex items-center gap-2">
                    <svg className="w-5 h-5 shrink-0 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>💡 <strong>提示：</strong>這是在開發環境中的模擬畫面，主要是為了方便我們討論 EXCEL 欄位設計。在實際系統中，點擊「匯出為Excel」按鈕後會<strong>直接下載檔案</strong>，不會出現這個預覽視窗。</span>
                </div>
                
                <div className="flex-1 overflow-auto p-0 bg-gray-50">
                    <table className="w-full text-left text-sm whitespace-nowrap bg-white">
                        <tbody>
                            <tr><td className="px-3 py-1 border border-gray-300 bg-gray-100 w-48">匯出日期：</td><td className="px-3 py-1 border border-gray-300">2026-05-15 11:27:00</td></tr>
                            <tr><td className="px-3 py-1 border border-gray-300 bg-gray-100">總數：</td><td className="px-3 py-1 border border-gray-300">6</td></tr>
                            <tr><td className="px-3 py-1 border-0" colSpan={2}></td></tr>
                        </tbody>
                    </table>

                    <div className="overflow-x-auto border-t border-gray-300">
                        <table className="w-full text-left text-sm whitespace-nowrap bg-white border-collapse">
                            <thead>
                                <tr className="bg-gray-200">
                                    <th className="px-3 py-2 border border-gray-300 font-medium text-center">用戶名稱</th>
                                    <th className="px-3 py-2 border border-gray-300 font-medium text-center">用戶手機</th>
                                    <th className="px-3 py-2 border border-gray-300 font-medium text-center">用戶註冊時間</th>
                                    <th className="px-3 py-2 border border-gray-300 font-medium text-center">分潤綁定(經營者)名稱</th>
                                    <th className="px-3 py-2 border border-gray-300 font-medium text-center">分潤綁定(經營者)手機</th>
                                    <th className="px-3 py-2 border border-gray-300 font-medium text-center">分潤綁定(經營者)身分</th>
                                </tr>
                            </thead>
                            <tbody>
                                {mockData.map((item) => (
                                    <tr key={item.id} className="hover:bg-gray-50">
                                        <td className="px-3 py-2 border border-gray-300">{item.user.name}</td>
                                        <td className="px-3 py-2 border border-gray-300 font-mono text-center">{item.user.phone}</td>
                                        <td className="px-3 py-2 border border-gray-300 text-center">{item.user.registerDate}</td>
                                        <td className="px-3 py-2 border border-gray-300">{item.boundTo.name}</td>
                                        <td className="px-3 py-2 border border-gray-300 font-mono text-center">{item.boundTo.phone}</td>
                                        <td className="px-3 py-2 border border-gray-300 text-center">{item.boundTo.type}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="px-6 py-4 bg-white border-t border-gray-200 flex justify-end gap-3 flex-shrink-0">
                    <button 
                        onClick={onClose}
                        className="px-6 py-2 bg-gray-600 text-white border border-transparent rounded text-sm hover:bg-gray-700 transition-colors shadow-sm"
                    >
                        我知道了，關閉
                    </button>
                </div>
            </div>
        </div>
    );
};

const UserBindingRecordsContent: React.FC = () => {
    const [records, setRecords] = useState<BindingRecord[]>(mockData);
    const [isExcelPreviewOpen, setIsExcelPreviewOpen] = useState(false);

    return (
        <div className="bg-white p-6 rounded shadow-sm border border-gray-100 flex flex-col h-[calc(100vh-4rem)]">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                        用戶分潤綁定
                    </h2>
                </div>
                
                <div className="flex flex-wrap justify-end items-center gap-3">
                    <button 
                        onClick={() => setIsExcelPreviewOpen(true)}
                        className="flex items-center gap-1 px-3 py-1.5 bg-white border border-[#107C41] text-[#107C41] text-sm rounded hover:bg-green-50 transition-colors shadow-sm"
                    >
                        <ExcelIcon className="w-4 h-4" />
                        <span>匯出為Excel</span>
                    </button>
                </div>
            </div>
            
            <div className="bg-[#f8f9fa] p-4 rounded mb-6 text-sm flex gap-4 items-center flex-wrap">
                <div className="flex items-center gap-2">
                    <span className="text-gray-600 whitespace-nowrap">分潤綁定:</span>
                    <input type="text" placeholder="請輸入經營者手機或名稱" className="border border-gray-300 rounded px-3 py-1.5 bg-white text-gray-700 outline-none w-56 focus:border-blue-300 transition-colors placeholder-gray-400" />
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-gray-600 whitespace-nowrap">用戶:</span>
                    <input type="text" placeholder="請輸入用戶手機或名稱" className="border border-gray-300 rounded px-3 py-1.5 bg-white text-gray-700 outline-none w-56 focus:border-blue-300 transition-colors placeholder-gray-400" />
                </div>
                
                <div className="ml-auto flex gap-2 w-full sm:w-auto mt-2 sm:mt-0">
                    <button className="bg-gray-400 text-white px-5 py-1.5 rounded text-sm hover:bg-gray-500 transition-colors">
                        清空條件
                    </button>
                    <button className="bg-[#409eff] text-white px-5 py-1.5 rounded text-sm hover:bg-blue-500 transition-colors">
                        搜尋
                    </button>
                </div>
            </div>

            <div className="overflow-x-auto flex-1 custom-scrollbar">
                <table className="w-full text-left border-collapse text-sm min-w-[1000px]">
                    <thead className="sticky top-0 bg-[#eef1f6] z-10 shadow-sm">
                        <tr className="text-gray-600 font-medium">
                            <th className="px-4 py-3 min-w-[200px]">用戶</th>
                            <th className="px-4 py-3 min-w-[200px]">分潤綁定 (經營者)</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 bg-white">
                        {records.map((item) => (
                            <tr key={item.id} className="hover:bg-blue-50/30 transition-colors">
                                <td className="px-4 py-3">
                                    <div className="text-gray-800 font-medium">{item.user.name}</div>
                                    <div className="text-gray-500 font-mono text-xs mt-0.5">{item.user.phone}</div>
                                    <div className="text-gray-400 text-xs mt-0.5">註冊: {item.user.registerDate}</div>
                                </td>
                                <td className="px-4 py-3">
                                    <div className="text-gray-800 font-medium">{item.boundTo.name}</div>
                                    <div className="flex gap-2 items-center mt-0.5">
                                        <span className="text-gray-500 font-mono text-xs">{item.boundTo.phone}</span>
                                        <span className="text-blue-500 bg-blue-50 px-1 py-0.5 rounded text-[10px]">{item.boundTo.type}</span>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-center gap-2 text-sm text-gray-500">
                <button className="px-2 py-1 hover:text-blue-600 transition-colors opacity-50 cursor-not-allowed">上一頁</button>
                <div className="flex gap-1">
                    <button className="px-2.5 py-1 bg-blue-500 text-white rounded">1</button>
                </div>
                <button className="px-2 py-1 hover:text-blue-600 transition-colors opacity-50 cursor-not-allowed">下一頁</button>
                <div className="flex items-center gap-2 ml-4">
                    <select className="border border-gray-300 rounded px-2 py-1 bg-white focus:border-blue-300 outline-none">
                        <option>20項/頁</option>
                    </select>
                    <span>共 {records.length} 項</span>
                </div>
            </div>
            
            <ExcelPreviewModal 
                isOpen={isExcelPreviewOpen}
                onClose={() => setIsExcelPreviewOpen(false)}
            />
        </div>
    );
};

export default UserBindingRecordsContent;
