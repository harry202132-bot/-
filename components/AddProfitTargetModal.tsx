import React, { useState, useEffect } from 'react';

interface AddProfitTargetModalProps {
    isOpen: boolean;
    onClose: () => void;
    activeTab: 'operator' | 'store';
    onSubmit: (data: { type: string; accountId: string; accountName: string; superiorId: string; superiorName: string }) => void;
}

const mockMemberAccounts = [
    { id: '886 904900021', name: '王大文' },
    { id: '886 988788390', name: '李阿明' },
    { id: '886 932225631', name: '趙小美' },
    { id: '886 939103128', name: '陳顧問' },
    { id: '886 905718766', name: '張代理' },
    { id: '886 917787811', name: '林督導' }
];

const mockStoreAccounts = [
    { id: '886 904900077', name: '共享享示範店' },
    { id: '886 979359099', name: '維客多手機維修太平旗艦店' },
    { id: '886 939103128', name: '康寶健康生活館' },
    { id: '886 928020789', name: '三街海鮮屋' },
    { id: '886 909284702', name: 'NX Coffee' }
];

const mockOperators = [
    { id: '886 904900001', name: '珮蒂 (顧問)' },
    { id: '886 904900003', name: 'peter (經銷)' },
    { id: '886 932540007', name: '老鈜 (區督導)' },
    { id: '886 916889668', name: 'David (代理)' },
    { id: '886 904900004', name: '愛爾達 (經銷)' },
    { id: '886 932225631', name: 'Simon (顧問)' },
    { id: '886 928020789', name: '黃進恭 (區督導)' }
];

const AddProfitTargetModal: React.FC<AddProfitTargetModalProps> = ({ isOpen, onClose, activeTab, onSubmit }) => {
    const [targetType, setTargetType] = useState('經銷');
    const [accountSearch, setAccountSearch] = useState('');
    const [selectedAccount, setSelectedAccount] = useState<{id: string, name: string} | null>(null);
    const [selectedOperator, setSelectedOperator] = useState('');

    const [isAccountDropdownOpen, setIsAccountDropdownOpen] = useState(false);

    useEffect(() => {
        if (activeTab === 'store') {
            setTargetType('店家');
        } else {
            setTargetType('經銷');
        }
        setAccountSearch('');
        setSelectedAccount(null);
        setSelectedOperator('');
    }, [activeTab, isOpen]);

    if (!isOpen) return null;

    const availableAccounts = activeTab === 'store' ? mockStoreAccounts : mockMemberAccounts;

    const filteredAccounts = availableAccounts.filter(acc => acc.id.includes(accountSearch) || acc.name.includes(accountSearch));

    const handleSubmit = () => {
        if (!selectedAccount) return;

        if (activeTab === 'operator') {
            onSubmit({
                type: targetType,
                accountId: selectedAccount.id,
                accountName: selectedAccount.name,
                superiorId: '',
                superiorName: '--'
            });
        } else {
            const operator = mockOperators.find(o => o.id === selectedOperator);
            onSubmit({
                type: '店家',
                accountId: selectedAccount.id,
                accountName: selectedAccount.name,
                superiorId: operator?.id || '',
                superiorName: operator ? operator.name.split(' ')[0] : '--'
            });
        }

        // Reset
        setAccountSearch('');
        setSelectedAccount(null);
        setSelectedOperator('');
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/40 z-50 flex justify-center items-center font-sans">
            <div className="bg-white rounded shadow-xl w-[480px]">
                <div className="flex justify-between items-center p-5 pb-3 border-b border-gray-100">
                    <h3 className="text-xl font-bold text-gray-800">
                        {activeTab === 'operator' ? '新增經營者' : '新增店家引薦'}
                    </h3>
                </div>

                <div className="p-6 space-y-6 pt-4">
                    {activeTab === 'operator' ? (
                        <div className="flex items-center">
                            <label className="w-32 text-right mr-4 text-gray-700">
                                <span className="text-red-500 mr-1">*</span>經營者類型：
                            </label>
                            <div className="flex-1">
                                <select 
                                    value={targetType}
                                    onChange={(e) => setTargetType(e.target.value)}
                                    className="w-full border border-gray-300 rounded px-3 py-2 text-gray-700 outline-none focus:border-blue-400 bg-white"
                                >
                                    <option value="顧問">顧問</option>
                                    <option value="經銷">經銷</option>
                                    <option value="代理">代理</option>
                                    <option value="區督導">區督導</option>
                                </select>
                            </div>
                        </div>
                    ) : (
                        <div className="flex items-center">
                            <label className="w-32 text-right mr-4 text-gray-700">
                                <span className="text-red-500 mr-1">*</span>對象身分：
                            </label>
                            <div className="flex-1">
                                <input 
                                    type="text" 
                                    value="店家" 
                                    disabled 
                                    className="w-full border border-gray-200 bg-gray-50 text-gray-500 rounded px-3 py-2 outline-none cursor-not-allowed"
                                />
                            </div>
                        </div>
                    )}

                    <div className="flex items-center relative">
                        <label className="w-32 text-right mr-4 text-gray-700">
                            <span className="text-red-500 mr-1">*</span>{activeTab === 'operator' ? '選擇會員帳號：' : '選擇店家帳號：'}
                        </label>
                        <div className="flex-1 relative">
                            <input 
                                type="text"
                                placeholder={activeTab === 'operator' ? '請輸入會員名稱或手機號碼' : '請輸入店家名稱或手機號碼'}
                                value={accountSearch}
                                onChange={(e) => {
                                    setAccountSearch(e.target.value);
                                    setSelectedAccount(null);
                                    setIsAccountDropdownOpen(true);
                                }}
                                onFocus={() => setIsAccountDropdownOpen(true)}
                                onBlur={() => setTimeout(() => setIsAccountDropdownOpen(false), 200)}
                                className={`w-full border rounded px-3 py-2 outline-none focus:border-blue-400
                                  ${isAccountDropdownOpen && !selectedAccount && accountSearch && filteredAccounts.length > 0 ? 'border-red-400' : 'border-gray-300'}
                                `}
                            />
                            {isAccountDropdownOpen && accountSearch && !selectedAccount && (
                                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 shadow-lg rounded max-h-48 overflow-y-auto z-10 py-1">
                                    {filteredAccounts.length > 0 ? (
                                        filteredAccounts.map((acc, index) => (
                                            <div 
                                                key={index} 
                                                className="px-4 py-2 hover:bg-gray-50 cursor-pointer text-gray-700 text-sm"
                                                onClick={() => {
                                                    setAccountSearch(`${acc.name} (${acc.id})`);
                                                    setSelectedAccount(acc);
                                                    setIsAccountDropdownOpen(false);
                                                }}
                                            >
                                                {acc.name} <span className="text-gray-400 font-mono text-xs">({acc.id})</span>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="px-4 py-2 text-gray-500 text-sm">無符合結果</div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>

                    {activeTab === 'store' && (
                        <>
                            <hr className="border-gray-200" />
                            <div className="flex items-center">
                                <label className="w-32 text-right mr-4 text-gray-700">
                                    <span className="text-red-500 mr-1">*</span>引薦經營者：
                                </label>
                                <div className="flex-1">
                                    <select 
                                        value={selectedOperator}
                                        onChange={(e) => setSelectedOperator(e.target.value)}
                                        className="w-full border border-gray-300 rounded px-3 py-2 text-gray-700 outline-none focus:border-blue-400 bg-white"
                                    >
                                        <option value="" disabled hidden>請選擇引薦經營者</option>
                                        {mockOperators.map(op => (
                                            <option key={op.id} value={op.id}>{op.name} - {op.id}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </>
                    )}
                </div>

                <div className="p-4 flex justify-center gap-4 mb-2 border-t border-gray-100 mt-4">
                    <button 
                        onClick={onClose}
                        className="px-6 py-2 border border-gray-300 rounded text-gray-600 hover:bg-gray-50 transition-colors bg-white"
                    >
                        取消
                    </button>
                    <button 
                        onClick={handleSubmit}
                        disabled={!selectedAccount || (activeTab === 'store' && !selectedOperator)}
                        className="px-6 py-2 bg-[#409eff] hover:bg-blue-500 disabled:bg-gray-300 text-white rounded transition-colors"
                    >
                        確認建立
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddProfitTargetModal;
