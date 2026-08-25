import React, { useState, useEffect } from 'react';
import { ProfitTarget } from './ProfitTargetsContent';

interface EditProfitTargetModalProps {
    isOpen: boolean;
    onClose: () => void;
    target: ProfitTarget | null;
    onSubmit: (id: string, data: { status: string; superiorId: string; superiorName: string; type: string }) => void;
}

const mockOperators = [
    { id: '886 904900001', name: '珮蒂' },
    { id: '886 904900003', name: 'peter' },
    { id: '886 932540007', name: '老鈜' },
    { id: '886 916889668', name: 'David' },
    { id: '886 904900004', name: '愛爾達' },
    { id: '886 932225631', name: 'Simon' },
    { id: '886 928020789', name: '黃進恭' }
];

const EditProfitTargetModal: React.FC<EditProfitTargetModalProps> = ({ isOpen, onClose, target, onSubmit }) => {
    const [status, setStatus] = useState('啟用');
    const [selectedOperator, setSelectedOperator] = useState('');
    const [type, setType] = useState('經銷');

    const isStore = target?.type === '店家';

    useEffect(() => {
        if (target) {
            setStatus(target.status);
            setType(target.type);
            const foundOp = mockOperators.find(s => s.name === target.superiorName) || mockOperators.find(s => s.id === target.superiorPhone);
            setSelectedOperator(foundOp ? foundOp.id : (target.superiorPhone || ''));
        }
    }, [target]);

    if (!isOpen || !target) return null;

    const handleSubmit = () => {
        if (isStore) {
            const op = mockOperators.find(s => s.id === selectedOperator);
            onSubmit(target.id, {
                status,
                type: '店家',
                superiorId: op?.id || selectedOperator || '',
                superiorName: op?.name || target.superiorName || '--'
            });
        } else {
            onSubmit(target.id, {
                status,
                type,
                superiorId: '',
                superiorName: '--'
            });
        }
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/40 z-50 flex justify-center items-center font-sans">
            <div className="bg-white rounded shadow-xl w-[480px]">
                <div className="flex justify-between items-center p-5 pb-3 border-b border-gray-100">
                    <h3 className="text-xl font-bold text-gray-800">
                        {isStore ? '編輯店家引薦' : '編輯經營者'}
                    </h3>
                </div>

                <div className="p-6 space-y-6 pt-4">
                    {!isStore ? (
                        <div className="flex items-center">
                            <label className="w-32 text-right mr-4 text-gray-700">
                                <span className="text-red-500 mr-1">*</span>經營者類型：
                            </label>
                            <div className="flex-1">
                                <select 
                                    value={type}
                                    onChange={(e) => setType(e.target.value)}
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
                                對象身分：
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

                    <div className="flex items-center">
                        <label className="w-32 text-right mr-4 text-gray-700">
                            帳號：
                        </label>
                        <div className="flex-1">
                            <input 
                                type="text"
                                disabled
                                value={`${target.name} (${target.phone})`}
                                className="w-full border border-gray-200 bg-gray-50 text-gray-500 rounded px-3 py-2 outline-none cursor-not-allowed"
                            />
                        </div>
                    </div>

                    {isStore && (
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
                                        <option key={op.id} value={op.id}>{op.name} ({op.id})</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    )}

                    {!isStore && (
                        <>
                            <hr className="border-gray-200" />
                            <div className="flex items-center">
                                <label className="w-32 text-right mr-4 text-gray-700">
                                    狀態：
                                </label>
                                <div className="flex-1 flex gap-6">
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input 
                                            type="radio" 
                                            name="status"
                                            value="啟用"
                                            checked={status === '啟用'}
                                            onChange={(e) => setStatus(e.target.value)}
                                            className="w-4 h-4 text-blue-500 cursor-pointer"
                                        />
                                        <span className={status === '啟用' ? 'text-blue-600 font-medium' : 'text-gray-600'}>啟用</span>
                                    </label>
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input 
                                            type="radio" 
                                            name="status"
                                            value="暫停"
                                            checked={status === '暫停'}
                                            onChange={(e) => setStatus(e.target.value)}
                                            className="w-4 h-4 text-gray-400 cursor-pointer"
                                        />
                                        <span className={status === '暫停' ? 'text-blue-600 font-medium' : 'text-gray-600'}>暫停</span>
                                    </label>
                                </div>
                            </div>
                        </>
                    )}
                </div>

                <div className="p-4 flex justify-center gap-4 border-t border-gray-100 mt-2">
                    <button 
                        onClick={onClose}
                        className="px-6 py-2 border border-gray-300 rounded text-gray-600 hover:bg-gray-50 transition-colors bg-white"
                    >
                        取消
                    </button>
                    <button 
                        onClick={handleSubmit}
                        className="px-6 py-2 bg-[#409eff] hover:bg-blue-500 text-white rounded transition-colors"
                    >
                        確認變更
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditProfitTargetModal;
