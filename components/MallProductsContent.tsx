import React, { useState } from 'react';
import { ExcelIcon, PlusIcon, ChevronDownIcon } from './icons';
import { Page } from '../App';

interface Product {
    id: string;
    image: string;
    name: string;
    account: string;
    type: string;
    price: number;
    discountLimit: number;
    stock: number;
    redeemed: number;
    status: {
        text: string;
        time: string;
    };
    lastEditor: {
        name: string;
        time: string;
    };
}

interface MallProductsContentProps {
    setCurrentPage: (page: Page) => void;
}

const mockData: Product[] = [
    {
        id: '1',
        image: 'https://placehold.co/100x100/e2e8f0/64748b?text=Image',
        name: '(台中用戶限定)網路六折券 100M x 12個月 / AP21',
        account: '亞太電信科技有限公司',
        type: '禮品',
        price: 1440,
        discountLimit: 1440,
        stock: 461,
        redeemed: 139,
        status: { text: '上架', time: '2026/05/06 15:03:10' },
        lastEditor: { name: '小魚仔 (987683125)', time: '2026/05/06 15:03:10' },
    },
    {
        id: '2',
        image: 'https://placehold.co/100x100/e2e8f0/64748b?text=Image',
        name: '(台中用戶限定)網路六折券 300M x 12個月 / AP23',
        account: '亞太電信科技有限公司',
        type: '禮品',
        price: 1920,
        discountLimit: 1920,
        stock: 148,
        redeemed: 52,
        status: { text: '上架', time: '2026/05/06 15:02:49' },
        lastEditor: { name: '小魚仔 (987683125)', time: '2026/05/06 15:02:49' },
    },
    {
        id: '3',
        image: 'https://placehold.co/100x100/e2e8f0/64748b?text=Image',
        name: '吹風機收納架(不挑色) / P251',
        account: '亞太電信科技有限公司',
        type: '禮品',
        price: 790,
        discountLimit: 790,
        stock: 91,
        redeemed: 9,
        status: { text: '上架', time: '2026/04/29 18:15:51' },
        lastEditor: { name: 'Kimberly (952887870)', time: '2026/04/29 18:15:51' },
    },
    {
        id: '4',
        image: 'https://placehold.co/100x100/e2e8f0/64748b?text=Image',
        name: '絕緣按摩梳 / P249',
        account: '亞太電信科技有限公司',
        type: '禮品',
        price: 1680,
        discountLimit: 1680,
        stock: 97,
        redeemed: 3,
        status: { text: '上架', time: '2026/04/29 15:23:15' },
        lastEditor: { name: 'Kimberly (952887870)', time: '2026/04/29 15:23:15' },
    },
    {
        id: '5',
        image: 'https://placehold.co/100x100/e2e8f0/64748b?text=Image',
        name: '鍋蓋架 / P248',
        account: '亞太電信科技有限公司',
        type: '禮品',
        price: 880,
        discountLimit: 880,
        stock: 97,
        redeemed: 3,
        status: { text: '上架', time: '2026/04/24 17:21:36' },
        lastEditor: { name: 'Kimberly (952887870)', time: '2026/04/24 17:21:36' },
    }
];

const MallProductsContent: React.FC<MallProductsContentProps> = ({ setCurrentPage }) => {
    const [activeTab, setActiveTab] = useState<'on_shelf' | 'off_shelf'>('on_shelf');

    return (
        <div className="w-full flex-1 flex flex-col pt-2">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">商品管理</h1>

            {/* Filter Section */}
            <div className="bg-[#f8fafc] border border-gray-200 rounded-sm p-5 mb-4 shadow-sm">
                <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center min-w-max">
                            <span className="text-gray-600 text-sm mr-4 w-12 text-right">日期:</span>
                            <div className="flex items-center bg-white border border-gray-300 rounded overflow-hidden">
                                <select className="px-3 py-1.5 text-sm text-gray-700 outline-none border-r border-gray-300 bg-transparent">
                                    <option>請選擇</option>
                                    <option>建立時間</option>
                                    <option>上架時間</option>
                                </select>
                                <input type="text" placeholder="不限" className="w-32 px-3 py-1.5 text-sm outline-none text-center" readOnly />
                                <span className="text-gray-400 px-2 text-sm">至</span>
                                <input type="text" placeholder="不限" className="w-32 px-3 py-1.5 text-sm outline-none text-center" readOnly />
                            </div>
                        </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                        <div className="flex items-center min-w-max">
                            <span className="text-gray-600 text-sm mr-4 w-12 text-right">關鍵字:</span>
                            <div className="flex items-center bg-white border border-gray-300 rounded overflow-hidden mr-6">
                                <select className="px-3 py-1.5 text-sm text-gray-700 outline-none border-r border-gray-300 bg-transparent">
                                    <option>名稱</option>
                                    <option>ID</option>
                                </select>
                                <input type="text" placeholder="請輸入關鍵字" className="w-48 px-3 py-1.5 text-sm outline-none" />
                            </div>
                            
                            <span className="text-gray-600 text-sm w-16 text-right mr-3">所屬帳號:</span>
                            <div className="relative">
                                <select className="w-48 appearance-none bg-white border border-gray-300 rounded px-3 py-1.5 text-sm text-gray-700 outline-none">
                                    <option>請選擇</option>
                                </select>
                                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none text-gray-500">
                                    <ChevronDownIcon className="w-4 h-4" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex justify-end gap-2 mt-4 pt-4 border-t border-gray-200">
                    <button className="px-5 py-1.5 bg-[#409eff] hover:bg-blue-500 text-white text-sm rounded shadow-sm transition-colors">
                        搜尋
                    </button>
                    <button className="px-5 py-1.5 bg-[#909399] hover:bg-gray-500 text-white text-sm rounded shadow-sm transition-colors">
                        清除條件
                    </button>
                </div>
            </div>

            {/* Export action */}
            <div className="flex justify-end mb-4">
                <button className="flex items-center gap-1 px-3 py-1.5 bg-white border border-[#107C41] text-[#107C41] text-sm rounded hover:bg-green-50 transition-colors">
                    <ExcelIcon className="w-4 h-4" />
                    <span>匯出為Excel</span>
                </button>
            </div>

            {/* Tabs and Actions */}
            <div className="flex justify-between items-end border-b border-gray-200 mb-0 bg-[#f8fafc]">
                <div className="flex">
                    <button 
                        onClick={() => setActiveTab('on_shelf')}
                        className={`px-6 py-3 text-sm font-medium transition-colors border-t-2 relative ${
                            activeTab === 'on_shelf' 
                                ? 'text-[#409eff] bg-white border-blue-500' 
                                : 'text-gray-600 border-transparent hover:text-gray-800'
                        }`}
                    >
                        上架中 <span className="ml-1 text-xs text-gray-400">(92)</span>
                    </button>
                    <button 
                        onClick={() => setActiveTab('off_shelf')}
                        className={`px-6 py-3 text-sm font-medium transition-colors border-t-2 relative ${
                            activeTab === 'off_shelf' 
                                ? 'text-[#409eff] bg-white border-blue-500' 
                                : 'text-gray-600 border-transparent hover:text-gray-800'
                        }`}
                    >
                        未上架 <span className="ml-1 text-xs text-gray-400">(272)</span>
                    </button>
                </div>
                <div className="flex gap-2 p-2">
                    <button className="px-4 py-1.5 bg-white border border-gray-300 text-gray-700 text-sm rounded hover:bg-gray-50 transition-colors">
                        商品訂單
                    </button>
                    <button 
                        className="flex items-center gap-1 px-4 py-1.5 bg-white border border-gray-300 text-gray-700 text-sm rounded hover:bg-gray-50 transition-colors"
                        onClick={() => setCurrentPage('addProduct')}
                    >
                        <PlusIcon className="w-4 h-4" />
                        新增商品
                    </button>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white border-x border-b border-gray-200 shadow-sm overflow-hidden flex-1">
                <div className="overflow-x-auto h-full">
                    <table className="w-full text-left border-collapse text-sm min-w-[1200px]">
                        <thead>
                            <tr className="bg-[#f2f6fc] text-gray-600 border-y border-gray-200">
                                <th className="px-4 py-3 font-medium w-24 text-center">圖片</th>
                                <th className="px-4 py-3 font-medium">名稱</th>
                                <th className="px-4 py-3 font-medium text-center">所屬帳號</th>
                                <th className="px-4 py-3 font-medium text-center">類型</th>
                                <th className="px-4 py-3 font-medium text-right">售價</th>
                                <th className="px-4 py-3 font-medium text-right">折抵上限</th>
                                <th className="px-4 py-3 font-medium text-right">庫存</th>
                                <th className="px-4 py-3 font-medium text-right">已兌換</th>
                                <th className="px-4 py-3 font-medium text-center">狀態</th>
                                <th className="px-4 py-3 font-medium text-center">最後編輯者</th>
                                <th className="px-4 py-3 font-medium text-center">操作</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {mockData.map((item) => (
                                <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-4 py-3 text-center">
                                        <img className="w-20 h-20 object-cover mx-auto bg-gray-100 rounded-sm" src={item.image} alt="product" />
                                    </td>
                                    <td className="px-4 py-3 text-blue-500 font-medium cursor-pointer hover:underline">
                                        {item.name}
                                    </td>
                                    <td className="px-4 py-3 text-center text-gray-500">
                                        {item.account}
                                    </td>
                                    <td className="px-4 py-3 text-center">
                                        {item.type}
                                    </td>
                                    <td className="px-4 py-3 text-right">
                                        {item.price.toLocaleString()}
                                    </td>
                                    <td className="px-4 py-3 text-right">
                                        {item.discountLimit.toLocaleString()}
                                    </td>
                                    <td className="px-4 py-3 text-right text-gray-600">
                                        {item.stock.toLocaleString()}
                                    </td>
                                    <td className="px-4 py-3 text-right text-gray-600">
                                        {item.redeemed.toLocaleString()}
                                    </td>
                                    <td className="px-4 py-3 text-center text-gray-500 text-xs">
                                        <div className="mb-1">{item.status.text}</div>
                                        <div>{item.status.time}</div>
                                    </td>
                                    <td className="px-4 py-3 text-center text-gray-500 text-xs">
                                        <div className="mb-1">{item.lastEditor.name}</div>
                                        <div>{item.lastEditor.time}</div>
                                    </td>
                                    <td className="px-4 py-3 text-center">
                                        <button className="text-[#409eff] hover:text-blue-700 text-sm">↓ 下架</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-center gap-2 py-6 bg-white border-t border-gray-200 w-full mt-auto">
                <button className="px-2 py-1 text-sm text-gray-500 hover:text-gray-700">上一頁</button>
                <div className="flex gap-1">
                    <button className="w-8 h-8 flex justify-center items-center rounded bg-[#409eff] text-white text-sm">1</button>
                    <button className="w-8 h-8 flex justify-center items-center rounded hover:bg-gray-100 text-sm text-gray-600">2</button>
                    <button className="w-8 h-8 flex justify-center items-center rounded hover:bg-gray-100 text-sm text-gray-600">3</button>
                    <button className="w-8 h-8 flex justify-center items-center rounded hover:bg-gray-100 text-sm text-gray-600">4</button>
                    <button className="w-8 h-8 flex justify-center items-center rounded hover:bg-gray-100 text-sm text-gray-600">5</button>
                </div>
                <button className="px-2 py-1 text-sm text-gray-500 hover:text-gray-700">下一頁</button>
                <div className="ml-4 flex items-center gap-2">
                    <select className="border border-gray-300 rounded px-2 py-1 text-sm outline-none text-gray-600">
                        <option>20筆/頁</option>
                    </select>
                    <span className="text-sm text-gray-500">共 92 項</span>
                </div>
            </div>

        </div>
    );
};

export default MallProductsContent;
