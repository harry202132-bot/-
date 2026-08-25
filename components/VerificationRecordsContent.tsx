import React, { useState } from 'react';

const VerificationRecordsContent: React.FC = () => {
    const [activeTab, setActiveTab] = useState('all');

    const tabs = [
        { id: 'all', label: '全部', count: '44,130' },
        { id: 'unverified', label: '未核銷', count: '743' },
        { id: 'verified', label: '已核銷', count: '3,189' },
        { id: 'transferred', label: '已轉贈', count: '584' },
        { id: 'expired', label: '已過期', count: '39,607' },
    ];

    const mockData = [
        {
            id: '1710119',
            member: '@@@\\n+886975363280',
            name: '入會好禮送$100現金券【全店可折】',
            account: '有貓鼠 貓咪生活館\\n+886972100083',
            type: '優惠券',
            serial: '-',
            expiry: '2026/07/02 18:17:01',
            source: '發券機器人\\n[入會禮]',
            price: '0',
            actualPaid: '0',
            discount: '0',
            status: '已過期',
            changeTime: '2026/07/02 18:50:10',
            verifyName: '--',
            action: ''
        },
        {
            id: '1710390',
            member: '活穎\\n+886933141488',
            name: '(測試票券請勿兌換)來店優惠-超大蝦仁炒飯優惠折抵30元',
            account: '貓多多飯館\\n+886904900001',
            type: '優惠券',
            serial: '-',
            expiry: '2026/07/02 14:20:17',
            source: '發券機器人\\n[關注來店優惠好禮]',
            price: '0',
            actualPaid: '0',
            discount: '0',
            status: '已過期',
            changeTime: '2026/07/02 18:50:10',
            verifyName: '--',
            action: ''
        },
        {
            id: '1710614',
            member: '小惠\\n+886981620626',
            name: '免費原始點深層溫熱敷',
            account: '康寶健康生活館\\n+886939103128',
            type: '優惠券',
            serial: '-',
            expiry: '2026/08/01 17:40:36',
            source: '群發訊息\\n[免費原始點深層溫熱敷]',
            price: '0',
            actualPaid: '0',
            discount: '0',
            status: '未核銷',
            changeTime: '2026/07/02 17:40:36',
            verifyName: '--',
            action: '手動核銷'
        },
        {
            id: '1710613',
            member: 'tim智琪\\n+886932113737',
            name: '全店九折【LINE好友入會禮】',
            account: '無飲中和店\\n+886965731905',
            type: '優惠券',
            serial: '-',
            expiry: '2026/07/09 16:45:58',
            source: '發券機器人\\n[入會禮]',
            price: '0',
            actualPaid: '0',
            discount: '0',
            status: '未核銷',
            changeTime: '2026/07/02 16:45:58',
            verifyName: '--',
            action: '手動核銷'
        },
        {
            id: '1710612',
            member: 'tim智琪\\n+886932113737',
            name: '全店九折【LINE好友入會禮】',
            account: '無飲中和店\\n+886965731905',
            type: '優惠券',
            serial: '-',
            expiry: '2026/07/09 16:45:57',
            source: '兌換',
            price: '0',
            actualPaid: '0',
            discount: '0',
            status: '未核銷',
            changeTime: '2026/07/02 16:45:57',
            verifyName: '--',
            action: '手動核銷'
        }
    ];

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-semibold text-gray-800">核銷紀錄</h1>

            {/* Filter Section */}
            <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {/* 關鍵字 & 時間 */}
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-2">
                            <label className="text-sm text-gray-600 whitespace-nowrap min-w-[60px]">關鍵字:</label>
                            <select className="border border-gray-300 rounded-md px-3 py-1.5 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 w-32">
                                <option>票券名稱</option>
                            </select>
                            <input 
                                type="text" 
                                placeholder="請輸入關鍵字" 
                                className="flex-1 border border-gray-300 rounded-md px-3 py-1.5 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                        </div>
                        <div className="flex items-center gap-2">
                            <label className="text-sm text-gray-600 whitespace-nowrap min-w-[60px]">所屬帳號:</label>
                            <select className="flex-1 border border-gray-300 rounded-md px-3 py-1.5 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 text-gray-400">
                                <option>請選擇</option>
                            </select>
                        </div>
                    </div>

                    <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-2">
                            <label className="text-sm text-gray-600 whitespace-nowrap min-w-[40px]">時間:</label>
                            <select className="border border-gray-300 rounded-md px-3 py-1.5 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 w-32">
                                <option>異動時間</option>
                            </select>
                            <div className="flex-1 flex items-center border border-gray-300 rounded-md bg-white px-3 py-1.5 focus-within:ring-1 focus-within:ring-blue-500">
                                <svg className="w-4 h-4 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                                <input type="text" placeholder="不限" className="w-full text-sm outline-none text-center bg-transparent" readOnly />
                                <span className="text-gray-400 mx-2">至</span>
                                <input type="text" placeholder="不限" className="w-full text-sm outline-none text-center bg-transparent" readOnly />
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="flex flex-1 items-center gap-2">
                                <label className="text-sm text-gray-600 whitespace-nowrap min-w-[40px]">來源:</label>
                                <select className="flex-1 border border-gray-300 rounded-md px-3 py-1.5 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 text-gray-400">
                                    <option>請選擇</option>
                                </select>
                            </div>
                            <div className="flex flex-1 items-center gap-2">
                                <label className="text-sm text-gray-600 whitespace-nowrap min-w-[40px]">類型:</label>
                                <select className="flex-1 border border-gray-300 rounded-md px-3 py-1.5 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 text-gray-400">
                                    <option>請選擇</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-4 flex justify-end gap-2 p-2 bg-[#e6f0ff] -mx-4 -mb-4 rounded-b-md">
                    <button className="px-6 py-1.5 bg-blue-500 text-white rounded text-sm hover:bg-blue-600 transition-colors">
                        搜尋
                    </button>
                    <button className="px-6 py-1.5 bg-gray-400 text-white rounded text-sm hover:bg-gray-500 transition-colors">
                        清空條件
                    </button>
                </div>
            </div>

            {/* Export Button */}
            <div className="flex justify-end">
                <button className="flex items-center text-green-600 hover:text-green-700 text-sm border border-green-600 rounded px-3 py-1">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>
                    匯出為Excel
                </button>
            </div>

            {/* Tabs & Table */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                {/* Tabs */}
                <div className="flex border-b border-gray-200">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`px-6 py-3 text-sm font-medium transition-colors relative ${
                                activeTab === tab.id
                                    ? 'text-blue-600'
                                    : 'text-gray-500 hover:text-gray-700'
                            }`}
                        >
                            {tab.label} ({tab.count})
                            {activeTab === tab.id && (
                                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />
                            )}
                        </button>
                    ))}
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-[#e6f0ff] text-gray-700">
                            <tr>
                                <th className="px-4 py-3 font-medium whitespace-nowrap text-center">編號</th>
                                <th className="px-4 py-3 font-medium whitespace-nowrap text-center">會員</th>
                                <th className="px-4 py-3 font-medium whitespace-nowrap text-center min-w-[200px]">名稱</th>
                                <th className="px-4 py-3 font-medium whitespace-nowrap text-center min-w-[150px]">所屬帳號</th>
                                <th className="px-4 py-3 font-medium whitespace-nowrap text-center">型式</th>
                                <th className="px-4 py-3 font-medium whitespace-nowrap text-center">序號</th>
                                <th className="px-4 py-3 font-medium whitespace-nowrap text-center">使用期限</th>
                                <th className="px-4 py-3 font-medium whitespace-nowrap text-center min-w-[120px]">來源</th>
                                <th className="px-4 py-3 font-medium whitespace-nowrap text-center">售價/點數</th>
                                <th className="px-4 py-3 font-medium whitespace-nowrap text-center">實支金額</th>
                                <th className="px-4 py-3 font-medium whitespace-nowrap text-center">購物金折抵</th>
                                <th className="px-4 py-3 font-medium whitespace-nowrap text-center">狀態</th>
                                <th className="px-4 py-3 font-medium whitespace-nowrap text-center">異動時間</th>
                                <th className="px-4 py-3 font-medium whitespace-nowrap text-center">核銷碼名稱</th>
                                <th className="px-4 py-3 font-medium whitespace-nowrap text-center">操作</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {mockData.map((row, index) => (
                                <tr key={index} className="hover:bg-gray-50">
                                    <td className="px-4 py-4 text-center text-gray-600">{row.id}</td>
                                    <td className="px-4 py-4 text-center text-gray-600 whitespace-pre-line">{row.member}</td>
                                    <td className="px-4 py-4 text-center text-gray-600">{row.name}</td>
                                    <td className="px-4 py-4 text-center text-gray-600 whitespace-pre-line">{row.account}</td>
                                    <td className="px-4 py-4 text-center text-gray-600">{row.type}</td>
                                    <td className="px-4 py-4 text-center text-gray-600">{row.serial}</td>
                                    <td className="px-4 py-4 text-center text-gray-600">{row.expiry}</td>
                                    <td className="px-4 py-4 text-center text-gray-600 whitespace-pre-line">{row.source}</td>
                                    <td className="px-4 py-4 text-center text-gray-600">{row.price}</td>
                                    <td className="px-4 py-4 text-center text-gray-600">{row.actualPaid}</td>
                                    <td className="px-4 py-4 text-center text-gray-600">{row.discount}</td>
                                    <td className="px-4 py-4 text-center text-gray-600">{row.status}</td>
                                    <td className="px-4 py-4 text-center text-gray-600 whitespace-pre-line">{row.changeTime.replace(' ', '\\n')}</td>
                                    <td className="px-4 py-4 text-center text-gray-600">{row.verifyName}</td>
                                    <td className="px-4 py-4 text-center">
                                        {row.action && (
                                            <button className="text-blue-500 hover:text-blue-700 whitespace-nowrap">
                                                {row.action}
                                            </button>
                                        )}
                                        {!row.action && <span className="text-gray-400">--</span>}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="px-4 py-3 flex items-center justify-center border-t border-gray-200 bg-gray-50 gap-2 text-sm text-gray-600">
                    <button className="px-2 py-1 text-gray-400 cursor-not-allowed">上一頁</button>
                    <button className="px-3 py-1 bg-blue-500 text-white rounded">1</button>
                    <button className="px-3 py-1 hover:bg-gray-200 rounded">2</button>
                    <button className="px-3 py-1 hover:bg-gray-200 rounded">3</button>
                    <button className="px-3 py-1 hover:bg-gray-200 rounded">4</button>
                    <span>...</span>
                    <button className="px-3 py-1 hover:bg-gray-200 rounded">4413</button>
                    <button className="px-2 py-1 hover:text-gray-800">下一頁</button>
                    
                    <select className="ml-4 border border-gray-300 rounded px-2 py-1 bg-white focus:outline-none">
                        <option>10項/頁</option>
                    </select>
                    <span className="ml-2">共 44130 項</span>
                </div>
            </div>
        </div>
    );
};

export default VerificationRecordsContent;
