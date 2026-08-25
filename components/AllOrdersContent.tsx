import React, { useState } from 'react';
import { ExcelIcon, ChevronDownIcon, InformationCircleIcon } from './icons';

interface Order {
    id: string;
    orderNo: string;
    orderDate: string;
    storeName: string;
    image: string;
    type: string;
    name: string;
    quantity: number;
    amount: number;
    actualPaid: number;
    shoppingCredit: number;
    buyer: {
        name: string;
        id: string;
        phone: string;
    };
    paymentMethod: string;
    transactionId?: string;
    invoiceNumber?: string;
    recipient: {
        name: string;
        phone: string;
        address: string;
    };
    lastEditorTime: string;
    status: string;
    source: {
        type: '平台' | '推廣分享';
        referrerName?: string;
        referrerPhone?: string;
    };
    profitTarget?: {
        name: string;
        phone: string;
    };
}

const mockData: Order[] = [
    {
        id: '1',
        orderNo: '260514156993001197',
        orderDate: '2026/05/14 12:21:39',
        storeName: 'A 店家 (生活良品)',
        image: 'https://placehold.co/100x100/e2e8f0/64748b?text=Image',
        type: '實體',
        name: '防風雨衣(一組12入 不挑色) / P238',
        quantity: 1,
        amount: 890,
        actualPaid: 0,
        shoppingCredit: 890,
        buyer: { name: '謝小佳', id: 'B04530027', phone: '0903-369-624' },
        paymentMethod: '全額購物金',
        transactionId: '-',
        invoiceNumber: 'RQ88293011',
        recipient: {
            name: '謝小佳',
            phone: '0903-369-624',
            address: '台北市信義區信義路五段7號',
        },
        lastEditorTime: '2026/05/14 12:21:39',
        status: '待發貨',
        source: {
            type: '推廣分享',
            referrerName: '王大頭',
            referrerPhone: '0988-111-222'
        },
        profitTarget: {
            name: 'LOC社區',
            phone: '0904-900-077'
        }
    },
    {
        id: '2',
        orderNo: '260514143043001944',
        orderDate: '2026/05/14 11:58:24',
        storeName: 'B 店家 (潮流服飾)',
        image: 'https://placehold.co/100x100/e2e8f0/64748b?text=Image',
        type: '實體',
        name: '韓版荔枝紋水桶包 / P091',
        quantity: 1,
        amount: 980,
        actualPaid: 480,
        shoppingCredit: 500,
        buyer: { name: '迪哥', id: '', phone: '0920-371-959' },
        paymentMethod: 'LINE Pay',
        transactionId: 'LP2026051411582499',
        invoiceNumber: 'RQ88293012',
        recipient: {
            name: '王小明',
            phone: '0912-345-678',
            address: '台中市西屯區台灣大道三段99號'
        },
        lastEditorTime: '2026/05/14 11:58:24',
        status: '待發貨',
        source: {
            type: '平台'
        },
        profitTarget: {
            name: '維客多手機維修太平旗艦店',
            phone: '0979-359-099'
        }
    },
    {
        id: '3',
        orderNo: '260514073643001640',
        orderDate: '2026/05/14 10:02:44',
        storeName: 'A 店家 (生活良品)',
        image: 'https://placehold.co/100x100/e2e8f0/64748b?text=Image',
        type: '實體',
        name: '拉鍊式衣物壓縮袋(一組兩入) / P212',
        quantity: 2,
        amount: 1699,
        actualPaid: 1699,
        shoppingCredit: 0,
        buyer: { name: '林口王先生', id: 'K10050061', phone: '0928-306-998' },
        paymentMethod: '信用卡 (一次付清)',
        transactionId: 'CHB2026051410024401',
        invoiceNumber: 'RQ88293013',
        recipient: {
            name: '林口王先生',
            phone: '0928-306-998',
            address: '新北市林口區文化一路一段1號',
        },
        lastEditorTime: '2026/05/14 10:02:44',
        status: '待發貨',
        source: {
            type: '平台'
        },
        profitTarget: {
            name: '王小梅',
            phone: '0955-444-333'
        }
    },
    {
        id: '4',
        orderNo: '260514073243001695',
        orderDate: '2026/05/14 10:02:04',
        storeName: 'C 店家 (3C配件)',
        image: 'https://placehold.co/100x100/e2e8f0/64748b?text=Image',
        type: '票券',
        name: '長款拉鍊雨衣兌換券 / P209',
        quantity: 1,
        amount: 1390,
        actualPaid: 390,
        shoppingCredit: 1000,
        buyer: { name: '陳美玲', id: 'K10050061', phone: '0928-306-998' },
        paymentMethod: 'Apple Pay',
        transactionId: 'AP2026051410020488',
        invoiceNumber: 'RQ88293014',
        recipient: {
             name: '陳美玲',
             phone: '0928-306-998',
             address: '台南市中西區西門路一段123號',
        },
        lastEditorTime: '2026/05/14 10:02:04',
        status: '待發貨',
        source: {
            type: '推廣分享',
            referrerName: '陳美麗',
            referrerPhone: '0977-333-444'
        },
        profitTarget: {
            name: '王大頭',
            phone: '0988-111-222'
        }
    },
    {
        id: '5',
        orderNo: '260514054663001420',
        orderDate: '2026/05/14 09:31:06',
        storeName: 'B 店家 (潮流服飾)',
        image: 'https://placehold.co/100x100/e2e8f0/64748b?text=Image',
        type: '實體',
        name: '可擦手廚房圍裙 / P214',
        quantity: 1,
        amount: 1490,
        actualPaid: 1490,
        shoppingCredit: 0,
        buyer: { name: '李良輝', id: 'K03130180', phone: '0933-633-799' },
        paymentMethod: 'Google Pay',
        transactionId: 'GP2026051409310677',
        invoiceNumber: 'RQ88293015',
        recipient: {
            name: '李良輝',
            phone: '0933-633-799',
            address: '高雄市新興區中正三路1號',
        },
        lastEditorTime: '2026/05/14 09:31:06',
        status: '待發貨',
        source: {
            type: '平台'
        },
        profitTarget: {
            name: '三街海鮮屋',
            phone: '0928-020-789'
        }
    }
];

const ChangeStatusModal: React.FC<{
    isOpen: boolean;
    onClose: () => void;
    currentStatus?: string;
}> = ({ isOpen, onClose, currentStatus = '待發貨' }) => {
    const [selectedStatus, setSelectedStatus] = React.useState(currentStatus);

    React.useEffect(() => {
        if (isOpen) {
            setSelectedStatus(currentStatus);
        }
    }, [isOpen, currentStatus]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="fixed inset-0 bg-black/40 transition-opacity" onClick={onClose}></div>
            <div className="relative bg-white rounded shadow-lg w-[320px] p-6 text-gray-800">
                <h3 className="text-lg mb-8">變更狀態</h3>
                
                <div className="flex items-center gap-6 mb-10">
                    <label className="flex items-center cursor-pointer">
                        <div className="relative flex items-center justify-center">
                            <input 
                                type="radio" 
                                name="status" 
                                className="peer sr-only"
                                checked={selectedStatus === '待發貨'}
                                onChange={() => setSelectedStatus('待發貨')}
                            />
                            <div className="w-[18px] h-[18px] border border-gray-300 rounded-full peer-checked:border-[#409eff] peer-checked:bg-[#409eff] flex items-center justify-center transition-all">
                                <div className="w-2 h-2 bg-white rounded-full opacity-0 peer-checked:opacity-100"></div>
                            </div>
                        </div>
                        <span className={`ml-2 text-sm ${selectedStatus === '待發貨' ? 'text-[#409eff]' : 'text-gray-600'}`}>待發貨</span>
                    </label>

                    <label className="flex items-center cursor-pointer">
                        <div className="relative flex items-center justify-center">
                            <input 
                                type="radio" 
                                name="status" 
                                className="peer sr-only"
                                checked={selectedStatus === '已發貨'}
                                onChange={() => setSelectedStatus('已發貨')}
                            />
                            <div className="w-[18px] h-[18px] border border-gray-300 rounded-full peer-checked:border-[#409eff] peer-checked:bg-[#409eff] flex items-center justify-center transition-all">
                                <div className="w-2 h-2 bg-white rounded-full opacity-0 peer-checked:opacity-100"></div>
                            </div>
                        </div>
                        <span className={`ml-2 text-sm ${selectedStatus === '已發貨' ? 'text-[#409eff]' : 'text-gray-600'}`}>已發貨</span>
                    </label>
                </div>

                <div className="flex justify-center gap-3">
                    <button 
                        onClick={onClose}
                        className="px-6 py-2 min-w-[80px] bg-[#409eff] text-white border border-transparent rounded text-sm hover:bg-blue-500 transition-colors"
                    >
                        更新
                    </button>
                    <button 
                        onClick={onClose}
                        className="px-6 py-2 min-w-[80px] bg-white border border-gray-300 text-gray-600 rounded text-sm hover:bg-gray-50 hover:text-gray-700 transition-colors"
                    >
                        取消
                    </button>
                </div>
            </div>
        </div>
    );
};

const EditRecipientModal: React.FC<{
    isOpen: boolean;
    onClose: () => void;
    order: Order | null;
    onSave: (name: string, phone: string, address: string) => void;
}> = ({ isOpen, onClose, order, onSave }) => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [city, setCity] = useState('');
    const [district, setDistrict] = useState('');
    const [detailAddress, setDetailAddress] = useState('');
    const [errors, setErrors] = useState<Record<string, string>>({});

    React.useEffect(() => {
        if (isOpen && order) {
            setName(order.recipient.name);
            setPhone(order.recipient.phone);
            
            const addr = order.recipient.address || '';
            if (addr.length >= 6 && (addr.includes('市') || addr.includes('縣'))) {
                setCity(addr.substring(0, 3));
                setDistrict(addr.substring(3, 6));
                setDetailAddress(addr.substring(6));
            } else {
                setCity('');
                setDistrict('');
                setDetailAddress(addr);
            }
            setErrors({});
        }
    }, [isOpen, order]);

    if (!isOpen || !order) return null;

    const handleSave = () => {
        const newErrors: Record<string, string> = {};
        if (!name.trim()) newErrors.name = '請填寫收件人姓名';
        if (!phone.trim()) newErrors.phone = '請填寫聯絡電話';
        if (!city) newErrors.city = '請選擇縣市';
        if (!district) newErrors.district = '請選擇鄉鎮市區';
        if (!detailAddress.trim()) newErrors.detailAddress = '請填寫詳細地址';

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        const fullAddress = `${city}${district}${detailAddress}`;
        onSave(name, phone, fullAddress);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="fixed inset-0 bg-black/40 transition-opacity" onClick={onClose}></div>
            <div className="relative bg-white rounded shadow-lg w-[450px] p-6 text-gray-800">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg text-gray-800 font-medium">變更收件資訊</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                    </button>
                </div>
                
                <div className="space-y-4 mb-8">
                    <div>
                        <input type="text" value={name} onChange={(e) => {setName(e.target.value); setErrors(prev => ({...prev, name: ''}))}} className={`w-full px-4 py-3 border ${errors.name ? 'border-red-500' : 'border-gray-200'} rounded-lg outline-none focus:border-[#409eff] text-sm text-gray-800 placeholder-gray-400`} placeholder="收件人姓名" />
                        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                    </div>
                    <div>
                        <input type="text" value={phone} onChange={(e) => {setPhone(e.target.value); setErrors(prev => ({...prev, phone: ''}))}} className={`w-full px-4 py-3 border ${errors.phone ? 'border-red-500' : 'border-gray-200'} rounded-lg outline-none focus:border-[#409eff] text-sm text-gray-800 placeholder-gray-400`} placeholder="聯絡電話" />
                        {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <select value={city} onChange={(e) => {setCity(e.target.value); setErrors(prev => ({...prev, city: ''}))}} className={`w-full px-4 py-3 border ${errors.city ? 'border-red-500' : 'border-gray-200'} rounded-lg outline-none focus:border-[#409eff] text-sm text-gray-800 bg-white`}>
                                <option value="" disabled>縣市</option>
                                <option value="台北市">台北市</option>
                                <option value="新北市">新北市</option>
                                <option value="台中市">台中市</option>
                                <option value="高雄市">高雄市</option>
                            </select>
                            {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
                        </div>
                        <div>
                            <select value={district} onChange={(e) => {setDistrict(e.target.value); setErrors(prev => ({...prev, district: ''}))}} className={`w-full px-4 py-3 border ${errors.district ? 'border-red-500' : 'border-gray-200'} rounded-lg outline-none focus:border-[#409eff] text-sm text-gray-800 bg-white`}>
                                <option value="" disabled>鄉鎮市區</option>
                                <option value="中正區">中正區</option>
                                <option value="信義區">信義區</option>
                                <option value="西屯區">西屯區</option>
                                <option value="前鎮區">前鎮區</option>
                            </select>
                            {errors.district && <p className="text-red-500 text-xs mt-1">{errors.district}</p>}
                        </div>
                    </div>
                    <div>
                        <input type="text" value={detailAddress} onChange={(e) => {setDetailAddress(e.target.value); setErrors(prev => ({...prev, detailAddress: ''}))}} className={`w-full px-4 py-3 border ${errors.detailAddress ? 'border-red-500' : 'border-gray-200'} rounded-lg outline-none focus:border-[#409eff] text-sm text-gray-800 placeholder-gray-400`} placeholder="詳細地址 (街道、巷弄、門牌、樓層)" />
                        {errors.detailAddress && <p className="text-red-500 text-xs mt-1">{errors.detailAddress}</p>}
                    </div>
                </div>

                <div className="flex justify-end gap-3 border-t border-gray-100 pt-5">
                    <button 
                        onClick={handleSave}
                        className="w-full py-3 bg-[#1e293b] text-white border border-transparent rounded-lg text-sm hover:bg-[#334155] transition-colors font-medium"
                    >
                        儲存並使用此地址
                    </button>
                </div>
            </div>
        </div>
    );
};

const OrderDetailView: React.FC<{
    order: Order;
    onBack: () => void;
    onEditRecipient: (order: Order) => void;
}> = ({ order, onBack, onEditRecipient }) => {
    return (
        <div className="w-full flex-1 flex flex-col relative animate-in fade-in duration-200">
            <div className="flex items-center gap-3 mb-6">
                <button 
                    onClick={onBack} 
                    className="flex items-center justify-center w-8 h-8 rounded-full bg-white border border-gray-300 hover:bg-gray-50 transition-colors text-gray-600 shadow-sm"
                    title="返回訂單列表"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
                </button>
                <h1 className="text-2xl font-bold text-gray-800">訂單明細</h1>
                <span className="text-sm font-normal text-gray-500 bg-white border border-gray-200 px-3 py-1 rounded ml-2 shadow-sm">{order.orderNo}</span>
                <span className="text-sm font-medium text-blue-700 bg-blue-50 border border-blue-100 px-3 py-1 rounded shadow-sm">{order.storeName || '未指定店家'}</span>
            </div>
            
            <div className="flex-1 space-y-6">
                {/* Header Summary */}
                <div className="flex justify-between items-center bg-white p-5 rounded-lg shadow-sm border border-gray-200">
                    <div className="flex gap-10 flex-wrap">
                        <div>
                            <div className="text-xs text-gray-500 mb-1">下單時間</div>
                            <div className="text-sm font-medium text-gray-800">{order.orderDate}</div>
                        </div>
                        <div>
                            <div className="text-xs text-gray-500 mb-1">訂單狀態</div>
                            <div className="text-sm font-bold text-amber-600">{order.status}</div>
                        </div>
                        <div>
                            <div className="text-xs text-gray-500 mb-1">付款方式</div>
                            <div className="text-sm font-medium text-gray-800">{order.paymentMethod}</div>
                        </div>
                        <div>
                            <div className="text-xs text-gray-500 mb-1">金流單號</div>
                            <div className="text-sm font-mono text-gray-800 break-all">{order.transactionId || '-'}</div>
                        </div>
                        <div>
                            <div className="text-xs text-gray-500 mb-1">發票號碼</div>
                            <div className="text-sm font-mono text-gray-800">{order.invoiceNumber || '-'}</div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* 顧客資訊 */}
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                        <h4 className="font-bold text-gray-700 mb-5 pb-3 border-b border-gray-100 flex items-center gap-2">
                            <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                            顧客資訊
                        </h4>
                        <div className="space-y-4">
                            <div className="flex items-center">
                                <span className="w-24 text-gray-500 text-sm">名稱</span>
                                <span className="text-sm text-gray-800 font-medium">{order.buyer.name} {order.buyer.id ? <span className="text-gray-500 font-normal ml-1">({order.buyer.id})</span> : ''}</span>
                            </div>
                            <div className="flex items-center">
                                <span className="w-24 text-gray-500 text-sm">電話</span>
                                <span className="text-sm text-gray-800 font-mono">{order.buyer.phone}</span>
                            </div>
                        </div>
                    </div>

                    {/* 收件資訊 */}
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 flex flex-col relative justify-start">
                        <div className="font-bold text-gray-700 mb-5 pb-3 border-b border-gray-100 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
                                收件資訊
                            </div>
                            <button
                                onClick={() => onEditRecipient(order)}
                                className="text-sm text-[#409eff] hover:bg-blue-50 px-3 py-1.5 rounded transition-colors flex items-center gap-1.5 font-medium border border-transparent hover:border-blue-100"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                                編輯
                            </button>
                        </div>
                        <div className="space-y-4">
                            <div className="flex items-center">
                                <span className="w-24 text-gray-500 text-sm">姓名</span>
                                <span className="text-sm text-gray-800 font-medium">{order.recipient.name}</span>
                            </div>
                            <div className="flex items-center">
                                <span className="w-24 text-gray-500 text-sm">電話</span>
                                <span className="text-sm text-gray-800 font-mono">{order.recipient.phone}</span>
                            </div>
                            <div className="flex items-start">
                                <span className="w-24 text-gray-500 text-sm">地址</span>
                                <span className="text-sm text-gray-800 leading-relaxed max-w-md">{order.recipient.address}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 商品清單 */}
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <h4 className="font-bold text-gray-700 mb-5 pb-3 border-b border-gray-100 flex items-center gap-2">
                        <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
                        商品明細
                    </h4>
                    <div className="flex items-center justify-between border-b border-gray-100 pb-5 mb-5">
                        <div className="flex gap-5">
                            <img src={order.image} alt={order.name} className="w-[80px] h-[80px] object-cover border border-gray-200 rounded-md shadow-sm" />
                            <div className="flex flex-col justify-center">
                                <div className="text-base font-medium text-gray-800 mb-1">
                                    {order.name}
                                </div>
                                <div className="text-sm text-gray-500">
                                    商品售價: ${order.amount.toLocaleString()} <span className="mx-2 text-gray-300">|</span> 數量: {order.quantity}
                                </div>
                            </div>
                        </div>
                        <div className="text-right flex flex-col justify-center">
                            <div className="text-xs text-gray-500 mb-1">小計</div>
                            <div className="text-lg font-bold text-gray-800">${(order.amount * order.quantity).toLocaleString()}</div>
                        </div>
                    </div>

                    {/* 金額計算 */}
                    <div className="w-80 ml-auto space-y-3 text-sm">
                        <div className="flex justify-between text-gray-600">
                            <span>商品總金額</span>
                            <span className="font-medium">${(order.amount * order.quantity).toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-gray-600">
                            <span>購物金折抵</span>
                            <span className="text-red-500 font-medium">- ${order.shoppingCredit.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center pt-4 border-t border-gray-200 mt-4">
                            <span className="font-bold text-gray-700">實付金額</span>
                            <span className="text-blue-600 font-bold text-2xl">${order.actualPaid.toLocaleString()}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const ExcelPreviewModal: React.FC<{
    isOpen: boolean;
    onClose: () => void;
}> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="fixed inset-0 bg-black/40 transition-opacity" onClick={onClose}></div>
            <div className="relative bg-white rounded shadow-lg w-[90vw] max-w-[1200px] h-[80vh] flex flex-col text-gray-800 overflow-hidden">
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
                            <tr><td className="px-3 py-1 border border-gray-300 bg-gray-100 w-48">名稱：</td><td className="px-3 py-1 border border-gray-300">-</td></tr>
                            <tr><td className="px-3 py-1 border border-gray-300 bg-gray-100">兌換者/帳號：</td><td className="px-3 py-1 border border-gray-300">不限</td></tr>
                            <tr><td className="px-3 py-1 border border-gray-300 bg-gray-100">兌換日期：</td><td className="px-3 py-1 border border-gray-300">2026-04-30 00:00:00~2026-05-07 23:59:59</td></tr>
                            <tr><td className="px-3 py-1 border border-gray-300 bg-gray-100">狀態(0.待發貨、1.已出貨、2.已取消)：</td><td className="px-3 py-1 border border-gray-300">待發貨</td></tr>
                            <tr><td className="px-3 py-1 border-0" colSpan={2}></td></tr>
                            <tr><td className="px-3 py-1 border border-gray-300 bg-gray-100">總數：</td><td className="px-3 py-1 border border-gray-300">115</td></tr>
                            <tr><td className="px-3 py-1 border-0" colSpan={2}></td></tr>
                        </tbody>
                    </table>

                    <div className="overflow-x-auto border-t border-gray-300">
                        <table className="w-full text-left text-sm whitespace-nowrap bg-white border-collapse">
                            <thead>
                                <tr className="bg-gray-200">
                                    <th className="px-3 py-2 border border-gray-300 font-medium">訂單編號</th>
                                    <th className="px-3 py-2 border border-gray-300 font-medium">店家名稱</th>
                                    <th className="px-3 py-2 border border-gray-300 font-medium">金流單號</th>
                                    <th className="px-3 py-2 border border-gray-300 font-medium">發票號碼</th>
                                    <th className="px-3 py-2 border border-gray-300 font-medium">下單日期</th>
                                    <th className="px-3 py-2 border border-gray-300 font-medium">最後更新日</th>
                                    <th className="px-3 py-2 border border-gray-300 font-medium whitespace-nowrap">狀態(0.待發貨、1.已出貨、2.已取消)</th>
                                    <th className="px-3 py-2 border border-gray-300 font-medium">付款方式</th>
                                    <th className="px-3 py-2 border border-gray-300 font-medium text-center">訂單來源</th>
                                    <th className="px-3 py-2 border border-gray-300 font-medium text-center">推薦人</th>
                                    <th className="px-3 py-2 border border-gray-300 font-medium text-center">推薦人電話</th>
                                    <th className="px-3 py-2 border border-gray-300 font-medium text-center">分潤綁定對象名稱</th>
                                    <th className="px-3 py-2 border border-gray-300 font-medium text-center">分潤綁定對象電話</th>
                                    <th className="px-3 py-2 border border-gray-300 font-medium">顧客名稱</th>
                                    <th className="px-3 py-2 border border-gray-300 font-medium">顧客手機</th>
                                    <th className="px-3 py-2 border border-gray-300 font-medium">收件人姓名</th>
                                    <th className="px-3 py-2 border border-gray-300 font-medium">收件人手機</th>
                                    <th className="px-3 py-2 border border-gray-300 font-medium">配送地址</th>
                                    <th className="px-3 py-2 border border-gray-300 font-medium">商品名稱</th>
                                    <th className="px-3 py-2 border border-gray-300 font-medium text-right">數量</th>
                                    <th className="px-3 py-2 border border-gray-300 font-medium text-right">商品總額</th>
                                    <th className="px-3 py-2 border border-gray-300 font-medium text-right">購物金折抵</th>
                                    <th className="px-3 py-2 border border-gray-300 font-medium text-right">實付金額</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="hover:bg-gray-50">
                                    <td className="px-3 py-2 border border-gray-300 font-mono">260507568813001745</td>
                                    <td className="px-3 py-2 border border-gray-300">A 店家 (生活良品)</td>
                                    <td className="px-3 py-2 border border-gray-300 font-mono">-</td>
                                    <td className="px-3 py-2 border border-gray-300 font-mono">RQ88293011</td>
                                    <td className="px-3 py-2 border border-gray-300">2026/05/07 23:48:01</td>
                                    <td className="px-3 py-2 border border-gray-300">2026/05/07 23:48:01</td>
                                    <td className="px-3 py-2 border border-gray-300 text-center">0</td>
                                    <td className="px-3 py-2 border border-gray-300">全額購物金</td>
                                    <td className="px-3 py-2 border border-gray-300 text-center">平台</td>
                                    <td className="px-3 py-2 border border-gray-300 text-center text-gray-400">-</td>
                                    <td className="px-3 py-2 border border-gray-300 text-center text-gray-400">-</td>
                                    <td className="px-3 py-2 border border-gray-300 text-center text-gray-400">-</td>
                                    <td className="px-3 py-2 border border-gray-300 text-center text-gray-400">-</td>
                                    <td className="px-3 py-2 border border-gray-300">謝小佳</td>
                                    <td className="px-3 py-2 border border-gray-300 font-mono">0903369624</td>
                                    <td className="px-3 py-2 border border-gray-300">謝小佳</td>
                                    <td className="px-3 py-2 border border-gray-300 font-mono">0903369624</td>
                                    <td className="px-3 py-2 border border-gray-300 truncate max-w-[200px]" title="台北市信義區信義路五段7號">台北市信義區信義路五段7號</td>
                                    <td className="px-3 py-2 border border-gray-300 truncate max-w-[200px]" title="可掛式眼鏡收納袋 / P213">可掛式眼鏡收納袋 / P213</td>
                                    <td className="px-3 py-2 border border-gray-300 text-right">1</td>
                                    <td className="px-3 py-2 border border-gray-300 text-right">890</td>
                                    <td className="px-3 py-2 border border-gray-300 text-right text-red-500">-890</td>
                                    <td className="px-3 py-2 border border-gray-300 text-right font-medium">0</td>
                                </tr>
                                <tr className="hover:bg-gray-50">
                                    <td className="px-3 py-2 border border-gray-300 font-mono">260507516953001478</td>
                                    <td className="px-3 py-2 border border-gray-300">B 店家 (潮流服飾)</td>
                                    <td className="px-3 py-2 border border-gray-300 font-mono">LP2026051411582499</td>
                                    <td className="px-3 py-2 border border-gray-300 font-mono">RQ88293012</td>
                                    <td className="px-3 py-2 border border-gray-300">2026/05/07 22:21:35</td>
                                    <td className="px-3 py-2 border border-gray-300">2026/05/08 10:15:00</td>
                                    <td className="px-3 py-2 border border-gray-300 text-center">1</td>
                                    <td className="px-3 py-2 border border-gray-300">LINE Pay</td>
                                    <td className="px-3 py-2 border border-gray-300 text-center text-blue-600 font-medium">推廣分享</td>
                                    <td className="px-3 py-2 border border-gray-300 text-center">王大頭</td>
                                    <td className="px-3 py-2 border border-gray-300 text-center font-mono">0988111222</td>
                                    <td className="px-3 py-2 border border-gray-300 text-center">LOC社區</td>
                                    <td className="px-3 py-2 border border-gray-300 text-center font-mono">0904900077</td>
                                    <td className="px-3 py-2 border border-gray-300">迪哥</td>
                                    <td className="px-3 py-2 border border-gray-300 font-mono">0920371959</td>
                                    <td className="px-3 py-2 border border-gray-300">王小明</td>
                                    <td className="px-3 py-2 border border-gray-300 font-mono">0912345678</td>
                                    <td className="px-3 py-2 border border-gray-300 truncate max-w-[200px]" title="新北市板橋區文化路一段100號">新北市板橋區文化路一段100號</td>
                                    <td className="px-3 py-2 border border-gray-300 truncate max-w-[200px]" title="韓版荔枝紋水桶包 / P091">韓版荔枝紋水桶包 / P091</td>
                                    <td className="px-3 py-2 border border-gray-300 text-right">1</td>
                                    <td className="px-3 py-2 border border-gray-300 text-right">1,780</td>
                                    <td className="px-3 py-2 border border-gray-300 text-right text-red-500">-500</td>
                                    <td className="px-3 py-2 border border-gray-300 text-right font-medium">1,280</td>
                                </tr>
                                <tr className="hover:bg-gray-50">
                                    <td className="px-3 py-2 border border-gray-300 font-mono">260507487963001710</td>
                                    <td className="px-3 py-2 border border-gray-300">A 店家 (生活良品)</td>
                                    <td className="px-3 py-2 border border-gray-300 font-mono">CHB2026051410024401</td>
                                    <td className="px-3 py-2 border border-gray-300 font-mono">RQ88293013</td>
                                    <td className="px-3 py-2 border border-gray-300">2026/05/07 21:33:16</td>
                                    <td className="px-3 py-2 border border-gray-300">2026/05/07 21:40:22</td>
                                    <td className="px-3 py-2 border border-gray-300 text-center">0</td>
                                    <td className="px-3 py-2 border border-gray-300">信用卡 (一次付清)</td>
                                    <td className="px-3 py-2 border border-gray-300 text-center">平台</td>
                                    <td className="px-3 py-2 border border-gray-300 text-center text-gray-400">-</td>
                                    <td className="px-3 py-2 border border-gray-300 text-center text-gray-400">-</td>
                                    <td className="px-3 py-2 border border-gray-300 text-center">三街海鮮屋</td>
                                    <td className="px-3 py-2 border border-gray-300 text-center font-mono">0928020789</td>
                                    <td className="px-3 py-2 border border-gray-300">林口王先生</td>
                                    <td className="px-3 py-2 border border-gray-300 font-mono">0928306998</td>
                                    <td className="px-3 py-2 border border-gray-300">林口王先生</td>
                                    <td className="px-3 py-2 border border-gray-300 font-mono">0928306998</td>
                                    <td className="px-3 py-2 border border-gray-300 truncate max-w-[200px]" title="桃園市龜山區復興一路200號">桃園市龜山區復興一路200號</td>
                                    <td className="px-3 py-2 border border-gray-300 truncate max-w-[200px]" title="新潮時尚豆腐包【黑色】/ P115">新潮時尚豆腐包【黑色】/ P115</td>
                                    <td className="px-3 py-2 border border-gray-300 text-right">1</td>
                                    <td className="px-3 py-2 border border-gray-300 text-right">2,450</td>
                                    <td className="px-3 py-2 border border-gray-300 text-right text-red-500">0</td>
                                    <td className="px-3 py-2 border border-gray-300 text-right font-medium">2,450</td>
                                </tr>
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

const AllOrdersContent: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'pending' | 'shipped' | 'cancelled'>('pending');
    const [viewMode, setViewMode] = useState<'list' | 'detail'>('list');
    const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
    const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
    const [isEditRecipientOpen, setIsEditRecipientOpen] = useState(false);
    const [isExcelPreviewOpen, setIsExcelPreviewOpen] = useState(false);
    const [orders, setOrders] = useState<Order[]>(mockData);

    const handleOpenStatusModal = (orderId: string) => {
        setSelectedOrderId(orderId);
        setIsStatusModalOpen(true);
    };

    const handleOpenEditRecipient = (order: Order) => {
        setSelectedOrderId(order.id);
        setIsEditRecipientOpen(true);
    };

    const handleOpenOrderDetail = (order: Order) => {
        setSelectedOrderId(order.id);
        setViewMode('detail');
    };

    const handleSaveRecipient = (name: string, phone: string, address: string) => {
        setOrders(prevOrders => prevOrders.map(order => 
            order.id === selectedOrderId 
                ? { ...order, recipient: { name, phone, address } } 
                : order
        ));
    };

    if (viewMode === 'detail') {
        const selectedOrder = orders.find(item => item.id === selectedOrderId);
        if (selectedOrder) {
            return (
                <div className="w-full flex-1 flex flex-col relative h-full">
                    <OrderDetailView 
                        order={selectedOrder} 
                        onBack={() => setViewMode('list')}
                        onEditRecipient={handleOpenEditRecipient}
                    />
                    <EditRecipientModal
                        isOpen={isEditRecipientOpen}
                        onClose={() => setIsEditRecipientOpen(false)}
                        order={selectedOrder}
                        onSave={handleSaveRecipient}
                    />
                </div>
            );
        }
    }

    return (
        <div className="w-full flex-1 flex flex-col pt-2 relative">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">所有訂單</h1>

            {/* Filter Section */}
            <div className="bg-[#f8f9fa] border border-gray-200 rounded p-5 mb-4 max-w-full">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {/* 綜合查詢 */}
                    <div className="flex items-center">
                        <span className="text-gray-600 text-sm font-medium mr-3 w-16 text-right shrink-0">綜合查詢</span>
                        <div className="flex flex-1 items-center bg-white border border-gray-300 rounded overflow-hidden focus-within:border-[#409eff] focus-within:ring-1 focus-within:ring-[#409eff] transition-all shadow-sm">
                            <select className="px-3 py-2 text-sm text-gray-700 outline-none border-r border-gray-300 bg-gray-50 hover:bg-gray-100 cursor-pointer shrink-0">
                                <option>訂單編號</option>
                                <option>金流單號</option>
                                <option>發票號碼</option>
                                <option>顧客名稱</option>
                                <option>收件人姓名</option>
                                <option>聯絡電話</option>
                            </select>
                            <input type="text" placeholder="請輸入關鍵字" className="flex-1 min-w-0 px-3 py-2 text-sm outline-none placeholder-gray-400 bg-transparent" />
                        </div>
                    </div>

                    {/* 商品名稱 */}
                    <div className="flex items-center">
                        <span className="text-gray-600 text-sm font-medium mr-3 w-16 text-right shrink-0">商品名稱</span>
                        <input type="text" placeholder="請輸入商品名稱" className="flex-1 min-w-0 px-3 py-2 text-sm bg-white border border-gray-300 rounded outline-none placeholder-gray-400 focus:border-[#409eff] focus:ring-1 focus:ring-[#409eff] transition-all shadow-sm" />
                    </div>

                    {/* 付款方式 */}
                    <div className="flex items-center">
                        <span className="text-gray-600 text-sm font-medium mr-3 w-16 text-right shrink-0">付款方式</span>
                        <div className="relative flex-1 shadow-sm">
                            <select className="w-full appearance-none bg-white border border-gray-300 rounded px-3 py-2 text-sm text-gray-700 outline-none focus:border-[#409eff] focus:ring-1 focus:ring-[#409eff] transition-all cursor-pointer">
                                <option>全部</option>
                                <option>信用卡 (一次付清)</option>
                                <option>信用卡 (分期)</option>
                                <option>LINE Pay</option>
                                <option>Apple Pay</option>
                                <option>Google Pay</option>
                                <option>ATM 轉帳</option>
                                <option>全額購物金</option>
                            </select>
                            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none text-gray-500">
                                <ChevronDownIcon className="w-4 h-4" />
                            </div>
                        </div>
                    </div>

                    {/* 日期區間 */}
                    <div className="flex items-center lg:col-span-2">
                        <span className="text-gray-600 text-sm font-medium mr-3 w-16 text-right shrink-0">日期區間</span>
                        <div className="flex items-center flex-1 bg-white border border-gray-300 rounded overflow-hidden focus-within:border-[#409eff] focus-within:ring-1 focus-within:ring-[#409eff] transition-all shadow-sm">
                            <select className="px-3 py-2 text-sm text-gray-700 outline-none border-r border-gray-300 bg-gray-50 hover:bg-gray-100 cursor-pointer shrink-0">
                                <option>下單日期</option>
                                <option>最後更新日</option>
                            </select>
                            <div className="flex flex-1 items-center px-3 py-2 text-sm bg-transparent">
                                <input type="date" className="flex-1 bg-transparent outline-none text-gray-600 cursor-pointer" />
                                <span className="text-gray-400 px-3 shrink-0">至</span>
                                <input type="date" className="flex-1 bg-transparent outline-none text-gray-600 cursor-pointer" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-gray-200">
                    <button className="px-6 py-2 bg-white border border-gray-300 text-gray-600 text-sm rounded shadow-sm hover:bg-gray-50 hover:text-gray-800 transition-colors">
                        清除重置
                    </button>
                    <button className="px-8 py-2 bg-[#409eff] hover:bg-blue-500 text-white text-sm rounded shadow-sm transition-colors flex items-center gap-1.5">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                        開始查詢
                    </button>
                </div>
            </div>

            {/* Export action */}
            <div className="flex flex-wrap justify-end items-center gap-3 mb-4">
                <div className="flex items-center text-sm">
                    <span className="flex items-center text-green-600 mr-2">
                        <ExcelIcon className="w-4 h-4 mr-1 text-green-600" />
                        匯入Excel文件
                    </span>
                    <input type="file" id="file-upload" className="hidden" />
                    <label htmlFor="file-upload" className="bg-gray-100 hover:bg-gray-200 border border-gray-300 text-gray-700 px-2 py-1 rounded cursor-pointer text-xs">
                        選擇檔案
                    </label>
                    <span className="text-gray-500 ml-2 text-xs">未選擇任何檔案</span>
                </div>
                <button 
                    onClick={() => setIsExcelPreviewOpen(true)}
                    className="flex items-center gap-1 px-3 py-1.5 bg-white border border-[#107C41] text-[#107C41] text-sm rounded hover:bg-green-50 transition-colors"
                >
                    <ExcelIcon className="w-4 h-4" />
                    <span>匯出為Excel</span>
                </button>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-gray-200 bg-[#f8f9fa] pt-2">
                <button 
                    onClick={() => setActiveTab('pending')}
                    className={`px-6 py-2.5 text-sm font-medium transition-colors border-t-2 relative ${
                        activeTab === 'pending' 
                            ? 'text-[#409eff] bg-white border-[#409eff]' 
                            : 'text-gray-600 border-transparent hover:text-[#409eff] bg-[#f8f9fa] hover:bg-white'
                    }`}
                >
                    待發貨 (5992)
                </button>
                <button 
                    onClick={() => setActiveTab('shipped')}
                    className={`px-6 py-2.5 text-sm font-medium transition-colors border-t-2 relative ${
                        activeTab === 'shipped' 
                            ? 'text-[#409eff] bg-white border-[#409eff]' 
                            : 'text-gray-600 border-transparent hover:text-[#409eff] bg-[#f8f9fa] hover:bg-white'
                    }`}
                >
                    已出貨 (16629)
                </button>
                <button 
                    onClick={() => setActiveTab('cancelled')}
                    className={`px-6 py-2.5 text-sm font-medium transition-colors border-t-2 relative ${
                        activeTab === 'cancelled' 
                            ? 'text-[#409eff] bg-white border-[#409eff]' 
                            : 'text-gray-600 border-transparent hover:text-[#409eff] bg-[#f8f9fa] hover:bg-white'
                    }`}
                >
                    已取消 (493)
                </button>
            </div>

            {/* Table */}
            <div className="bg-white border-x border-b border-gray-200 overflow-hidden flex-1">
                <div className="overflow-x-auto h-full">
                    <table className="w-full text-left border-collapse text-sm min-w-[1100px]">
                        <thead className="sticky top-0 bg-[#f8f9fa] z-10 shadow-sm border-b border-gray-200">
                            <tr className="text-gray-500 font-medium whitespace-nowrap">
                                <th className="px-4 py-3 min-w-[140px]">訂單資訊</th>
                                <th className="px-4 py-3 min-w-[200px]">商品明細</th>
                                <th className="px-4 py-3 min-w-[120px]">顧客資訊</th>
                                <th className="px-4 py-3 min-w-[160px]">付款資訊</th>
                                <th className="px-4 py-3 min-w-[180px]">收件資訊</th>
                                <th className="px-4 py-3 text-center w-[100px]">訂單狀態</th>
                                <th className="px-4 py-3 text-center w-[140px]">操作</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 bg-white">
                            {orders.map((item) => (
                                <tr key={item.id} className="hover:bg-blue-50/30 transition-colors group">
                                    <td className="px-4 py-4 align-top">
                                        <div className="flex flex-col">
                                            {/* 訂單編號 */}
                                            <div className="flex items-start gap-2 mb-1.5">
                                                <span 
                                                    className="text-sm text-blue-600 font-bold font-mono hover:text-[#409eff] hover:underline cursor-pointer"
                                                    onClick={() => handleOpenOrderDetail(item)}
                                                >
                                                    {item.orderNo}
                                                </span>
                                            </div>

                                            {/* 店家標籤 */}
                                            <div className="block mb-2">
                                                <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[11px] font-medium bg-blue-50 text-blue-700 border border-blue-100">
                                                    <svg className="w-3 h-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                                                    {item.storeName || '未指定'}
                                                </span>
                                            </div>

                                            {/* 下單時間 */}
                                            <div className="text-[11px] text-gray-400">
                                                {item.orderDate}
                                            </div>

                                            {/* 訂單來源 */}
                                            <div className="mt-2 flex flex-col gap-1">
                                                {item.source.type === '平台' ? (
                                                    <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[11px] font-medium bg-gray-100 text-gray-600 w-max">
                                                        平台直購
                                                    </span>
                                                ) : (
                                                    <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[11px] font-medium bg-blue-50 text-blue-600 border border-blue-100 w-max">
                                                        推廣分享
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </td>
                                    
                                    <td className="px-4 py-4 align-top">
                                        <div className="flex gap-3">
                                            <div className="w-[44px] h-[44px] border border-gray-200 p-0.5 rounded bg-white flex-shrink-0">
                                                <img className="w-full h-full object-cover rounded-sm" src={item.image} alt="product" />
                                            </div>
                                            <div className="flex flex-col flex-1 min-w-0">
                                                <div className="text-gray-800 text-sm font-medium mb-1 line-clamp-2 leading-relaxed">
                                                    {item.name}
                                                </div>
                                                <div className="text-gray-500 text-xs">數量: x{item.quantity}</div>
                                            </div>
                                        </div>
                                    </td>
                                    
                                    <td className="px-4 py-4 align-top">
                                        <div className="text-gray-700 text-[14px] leading-snug mb-1 whitespace-normal break-words">
                                            {item.buyer.name} <span className="text-gray-500">{item.buyer.id ? `(${item.buyer.id})` : ''}</span>
                                        </div>
                                        <div className="text-gray-500 text-[13px] font-mono leading-snug whitespace-normal break-words">{item.buyer.phone}</div>
                                    </td>

                                    <td className="px-4 py-4 align-top">
                                        <div className="flex items-center justify-between mb-1">
                                            <span className="text-gray-500 text-xs text-right w-12">支付:</span>
                                            <span className="text-gray-800 text-xs">{item.paymentMethod}</span>
                                        </div>
                                        <div className="flex items-center justify-between mb-1">
                                            <span className="text-gray-500 text-xs text-right w-12">總額:</span>
                                            <span className="text-gray-600 text-xs">${item.amount.toLocaleString()}</span>
                                        </div>
                                        <div className="flex items-center justify-between mb-1">
                                            <span className="text-gray-500 text-xs text-right w-12">折抵:</span>
                                            <span className="text-red-500 text-xs">-${item.shoppingCredit.toLocaleString()}</span>
                                        </div>
                                        <div className="flex items-center justify-between pt-1 border-t border-gray-100 mt-1">
                                            <span className="text-gray-500 text-xs text-right w-12">實付:</span>
                                            <span className="text-blue-600 text-xs font-medium">${item.actualPaid.toLocaleString()}</span>
                                        </div>
                                    </td>

                                    <td className="px-4 py-4 align-top">
                                        <div className="flex justify-between items-start mb-1">
                                            <div className="text-gray-800 text-sm font-medium">
                                                {item.recipient.name}
                                            </div>
                                        </div>
                                        <div className="text-gray-500 text-xs mb-1 font-mono">
                                            {item.recipient.phone}
                                        </div>
                                        <div className="text-gray-600 text-xs leading-relaxed max-w-[200px] break-words">
                                            {item.recipient.address}
                                        </div>
                                    </td>

                                    <td className="px-4 py-4 align-top text-center">
                                        <div className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-600 border border-amber-200 w-auto mb-2">
                                            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mr-1.5"></span>
                                            {item.status}
                                        </div>
                                        <div className="text-[11px] text-gray-400">
                                            {item.lastEditorTime}更新
                                        </div>
                                    </td>

                                    <td className="px-4 py-4 align-top">
                                        <div className="flex flex-col items-center justify-center gap-2">
                                            <button 
                                                onClick={() => handleOpenStatusModal(item.id)}
                                                className="w-full px-3 py-1.5 bg-[#409eff] hover:bg-blue-500 text-white rounded text-xs transition-colors shadow-sm"
                                            >
                                                變更狀態
                                            </button>
                                            <div className="flex gap-2 w-full">
                                                <button 
                                                    onClick={() => handleOpenOrderDetail(item)}
                                                    className="flex-1 px-2 py-1.5 bg-white border border-gray-300 text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded text-xs transition-colors"
                                                >
                                                    明細
                                                </button>
                                                <button className="flex-1 px-2 py-1.5 bg-white border border-red-200 text-red-500 hover:bg-red-50 hover:border-red-300 rounded text-xs transition-colors">
                                                    取消
                                                </button>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {/* Fill empty space */}
                            <tr className="h-auto">
                              <td colSpan={7} className="border-0"></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-center gap-2 py-4 bg-[#f8f9fa] border border-gray-200 w-full mt-4">
                <button className="px-2 py-1 text-sm text-gray-500 hover:text-gray-700">上一頁</button>
                <div className="flex gap-1">
                    <button className="w-8 h-8 flex justify-center items-center rounded bg-[#409eff] text-white text-sm">1</button>
                    <button className="w-8 h-8 flex justify-center items-center rounded hover:bg-gray-100 text-sm text-gray-600">2</button>
                    <button className="w-8 h-8 flex justify-center items-center rounded hover:bg-gray-100 text-sm text-gray-600">3</button>
                    <button className="w-8 h-8 flex justify-center items-center rounded hover:bg-gray-100 text-sm text-gray-600">4</button>
                    <span className="w-8 h-8 flex justify-center items-center text-sm text-gray-500">...</span>
                    <button className="w-8 h-8 flex justify-center items-center rounded hover:bg-gray-100 text-sm text-gray-600">300</button>
                </div>
                <button className="px-2 py-1 text-sm text-gray-500 hover:text-gray-700">下一頁</button>
                <div className="ml-4 flex items-center gap-2">
                    <select className="border border-gray-300 rounded px-2 py-1 text-sm outline-none text-gray-600">
                        <option>20筆/頁</option>
                    </select>
                    <span className="text-sm text-gray-500">共 5992 項</span>
                </div>
            </div>
            
            <ChangeStatusModal 
                isOpen={isStatusModalOpen} 
                onClose={() => setIsStatusModalOpen(false)} 
                currentStatus={orders.find(item => item.id === selectedOrderId)?.status || '待發貨'}
            />

            <EditRecipientModal
                isOpen={isEditRecipientOpen}
                onClose={() => setIsEditRecipientOpen(false)}
                order={orders.find(item => item.id === selectedOrderId) || null}
                onSave={handleSaveRecipient}
            />

            <ExcelPreviewModal 
                isOpen={isExcelPreviewOpen}
                onClose={() => setIsExcelPreviewOpen(false)}
            />
        </div>
    );
};

export default AllOrdersContent;
