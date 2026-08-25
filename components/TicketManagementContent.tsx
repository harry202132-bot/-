import React from 'react';
import { ExcelIcon, CalendarIcon } from './icons';
import { Page } from '../App';

interface Ticket {
  id: string;
  imageUrl: string;
  name: string;
  type: string;
  account: string;
  price: number | string;
  totalStock: number | '無限制';
  redeemed: number;
  unredeemed: string;
  sent: number;
  unsent: string;
  verified: number;
  lastEditor: {
    name: string;
    phone: string;
  };
  lastEditDate: string;
}

const mockTickets: Ticket[] = [
    { id: 'Voucher0011', imageUrl: 'https://i.imgur.com/nJHSiV5.png', name: '禮物券0011', type: '儀式券', account: '好想賣票券', price: 0, totalStock: '無限制', redeemed: 110, unredeemed: '-', sent: 25, unsent: '-', verified: 39, lastEditor: { name: '王大明', phone: '+886975856212' }, lastEditDate: '2024/11/07 00:46:46'},
    { id: 'Travel001', imageUrl: 'https://i.imgur.com/hXVCheney.png', name: '行的超級優惠券', type: '優惠券', account: '好想賣票券', price: 0, totalStock: '無限制', redeemed: 12, unredeemed: '-', sent: 0, unsent: '-', verified: 2, lastEditor: { name: '王大明', phone: '+886975856212' }, lastEditDate: '2024/11/07 00:46:45'},
    { id: 'Gift001', imageUrl: 'https://i.imgur.com/5r51V3s.jpeg', name: '現金小禮物', type: '優惠券', account: '好想賣票券', price: 100, totalStock: '無限制', redeemed: 3, unredeemed: '-', sent: 0, unsent: '-', verified: 2, lastEditor: { name: '王大明', phone: '+886975856212' }, lastEditDate: '2024/10/18 15:07:21'},
    { id: 'Drink001', imageUrl: 'https://i.imgur.com/YwB43h6.jpeg', name: '飲料券001', type: '優惠券', account: '好想賣票券', price: 8, totalStock: 38, redeemed: 0, unredeemed: '-', sent: 0, unsent: '-', verified: 13, lastEditor: { name: '王大明', phone: '+886975856212' }, lastEditDate: '2024/10/18 15:07:21'},
];

interface TicketManagementContentProps {
    setCurrentPage: (page: Page) => void;
}


const TicketManagementContent: React.FC<TicketManagementContentProps> = ({ setCurrentPage }) => {
    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-semibold text-gray-800">票券管理</h1>

            <div className="bg-white p-6 rounded-md shadow-sm border border-gray-200">
                 <div className="space-y-4">
                    {/* Row 1 */}
                    <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
                        <div className="flex items-center">
                            <label className="text-sm text-gray-600 whitespace-nowrap mr-3">類別:</label>
                            <select 
                                className="w-48 bg-white border-gray-300 rounded-md shadow-sm text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500 px-3 py-2"
                                data-selectable-id="ticket-filter-category"
                                data-selectable-name="篩選器：類別"
                            >
                                <option>全部</option>
                            </select>
                        </div>
                        <div className="flex items-center">
                            <label className="text-sm text-gray-600 whitespace-nowrap mr-3">數量:</label>
                            <div className="flex items-center space-x-2">
                                <select 
                                    className="bg-white border-gray-300 rounded-md shadow-sm text-sm w-32 px-3 py-2"
                                    data-selectable-id="ticket-filter-quantity-type"
                                    data-selectable-name="篩選器：數量類型"
                                >
                                    <option>點數/售價</option>
                                </select>
                                <select 
                                    className="bg-white border-gray-300 rounded-md shadow-sm text-sm w-24 px-3 py-2"
                                    data-selectable-id="ticket-filter-quantity-operator"
                                    data-selectable-name="篩選器：數量比較"
                                >
                                    <option>大於</option>
                                </select>
                                <input 
                                    type="text" 
                                    placeholder="請輸入數字" 
                                    className="w-32 bg-white border-gray-300 rounded-md shadow-sm text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500 px-3 py-2"
                                    data-selectable-id="ticket-filter-quantity-input"
                                    data-selectable-name="篩選器：數量輸入框"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Row 2 */}
                    <div className="flex flex-wrap items-center gap-y-4">
                        <div className="flex items-center">
                            <label className="text-sm text-gray-600 whitespace-nowrap mr-3">日期:</label>
                            <div className="flex items-center space-x-2">
                                <select 
                                    className="bg-white border-gray-300 rounded-md shadow-sm text-sm w-32 px-3 py-2"
                                    data-selectable-id="ticket-filter-date-type"
                                    data-selectable-name="篩選器：日期類型"
                                >
                                    <option>請選擇</option>
                                </select>
                                <div 
                                    className="flex items-center border border-gray-300 rounded-md bg-white"
                                    data-selectable-id="ticket-filter-date-range"
                                    data-selectable-name="篩選器：日期範圍"
                                >
                                    <span className="pl-3 pr-2 text-gray-400">
                                        <CalendarIcon className="w-5 h-5" />
                                    </span>
                                    <input type="text" placeholder="不限" className="w-24 border-0 text-center text-sm focus:ring-0 bg-transparent py-2" />
                                    <span className="text-gray-400 px-2">至</span>
                                    <input type="text" placeholder="不限" className="w-24 border-0 text-center text-sm focus:ring-0 bg-transparent py-2" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Row 3 */}
                    <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
                        <div className="flex items-center">
                            <label className="text-sm text-gray-600 whitespace-nowrap mr-3">關鍵字:</label>
                            <div className="flex items-center space-x-2">
                                <select 
                                    className="bg-white border-gray-300 rounded-md shadow-sm text-sm w-28 px-3 py-2"
                                    data-selectable-id="ticket-filter-keyword-type"
                                    data-selectable-name="篩選器：關鍵字類型"
                                >
                                    <option>名稱</option>
                                </select>
                                <input 
                                    type="text" 
                                    placeholder="請輸入關鍵字" 
                                    className="w-40 bg-white border-gray-300 rounded-md shadow-sm text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500 px-3 py-2"
                                    data-selectable-id="ticket-filter-keyword-input"
                                    data-selectable-name="篩選器：關鍵字輸入框"
                                />
                            </div>
                        </div>
                        <div className="flex items-center">
                            <label className="text-sm text-gray-600 whitespace-nowrap mr-3">所屬帳號:</label>
                            <select 
                                className="w-48 bg-white border-gray-300 rounded-md shadow-sm text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500 px-3 py-2" 
                                defaultValue="22KING花花世界崇德店"
                                data-selectable-id="ticket-filter-account"
                                data-selectable-name="篩選器：所屬帳號"
                            >
                                <option>22KING花花世界崇德店</option>
                                <option>好想賣票券</option>
                            </select>
                        </div>
                        <div className="flex items-center">
                            <label className="text-sm text-gray-600 whitespace-nowrap mr-3">類型:</label>
                            <select 
                                className="w-48 bg-white border-gray-300 rounded-md shadow-sm text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500 px-3 py-2"
                                data-selectable-id="ticket-filter-type"
                                data-selectable-name="篩選器：票券類型"
                            >
                                <option>請選擇</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-[#e6f4ff] p-4 rounded-md">
                <div className="flex justify-end space-x-2">
                     <button 
                        className="bg-blue-500 text-white px-6 py-1.5 rounded-md text-sm hover:bg-blue-600"
                        data-selectable-id="ticket-search-btn"
                        data-selectable-name="搜尋按鈕"
                    >搜尋</button>
                     <button 
                        className="bg-gray-600 text-white px-6 py-1.5 rounded-md text-sm hover:bg-gray-700"
                        data-selectable-id="ticket-clear-filter-btn"
                        data-selectable-name="清空條件按鈕"
                    >清空條件</button>
                </div>
            </div>

            <div className="flex justify-end">
                <button 
                    className="bg-white border border-gray-300 text-gray-700 px-3 py-1.5 rounded-md text-sm hover:bg-gray-50 flex items-center"
                    data-selectable-id="ticket-export-excel-btn"
                    data-selectable-name="匯出為Excel"
                >
                    <ExcelIcon className="w-5 h-5 mr-1" />
                    匯出為Excel
                </button>
            </div>

            <div className="bg-white rounded-md shadow-sm">
                <div className="flex items-center justify-between border-b border-gray-200 px-4">
                    <div className="flex -mb-px">
                        <button className="px-4 py-3 border-b-2 border-blue-500 text-blue-500 text-sm font-semibold">上架中 (23)</button>
                        <button className="px-4 py-3 text-gray-500 text-sm hover:text-blue-500">未上架 (2)</button>
                    </div>
                    <div className="flex items-center space-x-2">
                        <button 
                            onClick={() => setCurrentPage('addVoucher')} 
                            className="bg-gray-200 text-gray-700 px-3 py-1.5 rounded-md text-sm hover:bg-gray-300"
                            data-selectable-id="ticket-add-voucher-btn"
                            data-selectable-name="新增優惠券按鈕"
                        >+ 新增優惠券</button>
                        <button 
                            onClick={() => setCurrentPage('addGroupBuyVoucher')}
                            className="bg-gray-200 text-gray-700 px-3 py-1.5 rounded-md text-sm hover:bg-gray-300"
                            data-selectable-id="ticket-add-group-buy-btn"
                            data-selectable-name="新增票券按鈕"
                        >+ 新增票券</button>
                    </div>
                </div>
                
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-slate-100 text-slate-600">
                            <tr>
                                {['圖片', '名稱', '類型', '所屬帳號', '點數/售價', '上架總數', '已兌換數量', '未兌換數量', '已發送數量', '未發送數量', '已核銷', '最後編輯者', '操作'].map(header => (
                                    <th key={header} className="px-4 py-3 font-medium whitespace-nowrap">{header}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {mockTickets.map(ticket => (
                                <tr key={ticket.id} className="border-b border-gray-200 hover:bg-gray-50">
                                    <td className="px-4 py-2">
                                        <img src={ticket.imageUrl} alt={ticket.name} className="w-12 h-12 object-cover rounded-md bg-gray-200"/>
                                    </td>
                                    <td className="px-4 py-2"><a href="#" className="text-blue-600 hover:underline">{ticket.name}</a></td>
                                    <td className="px-4 py-2 text-gray-600">{ticket.type}</td>
                                    <td className="px-4 py-2"><a href="#" className="text-blue-600 hover:underline">{ticket.account}</a></td>
                                    <td className="px-4 py-2 text-gray-600">{ticket.price}</td>
                                    <td className="px-4 py-2 text-gray-600">{ticket.totalStock}</td>
                                    <td className="px-4 py-2 text-gray-600">{ticket.redeemed}</td>
                                    <td className="px-4 py-2 text-gray-600">{ticket.unredeemed}</td>
                                    <td className="px-4 py-2 text-gray-600">{ticket.sent}</td>
                                    <td className="px-4 py-2 text-gray-600">{ticket.unsent}</td>
                                    <td className="px-4 py-2 text-gray-600">{ticket.verified}</td>
                                    <td className="px-4 py-2 text-gray-600 whitespace-nowrap">
                                        <div>{ticket.lastEditor.name}</div>
                                        <div className="text-xs text-gray-400">({ticket.lastEditor.phone})</div>
                                        <div className="text-xs text-gray-400">{ticket.lastEditDate}</div>
                                    </td>
                                    <td className="px-4 py-2">
                                        {/* Placeholder for actions */}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="flex items-center justify-between px-4 py-3 text-sm">
                     <div className="flex items-center space-x-2">
                         <button className="px-2 py-1 border rounded-md hover:bg-gray-100">&lt;</button>
                         <button className="px-3 py-1 border rounded-md bg-blue-500 text-white">1</button>
                         <button className="px-2 py-1 border rounded-md hover:bg-gray-100">&gt;</button>
                     </div>
                     <div className="flex items-center space-x-2 text-gray-600">
                        <select className="bg-white border-gray-300 rounded-md text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500 px-3 py-2">
                            <option>20個/頁</option>
                            <option>50個/頁</option>
                            <option>100個/頁</option>
                        </select>
                        <span>共 23 筆</span>
                     </div>
                </div>
            </div>
        </div>
    );
};

export default TicketManagementContent;