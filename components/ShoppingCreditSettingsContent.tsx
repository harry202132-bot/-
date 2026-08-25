import React, { useState } from 'react';
import { InformationCircleIcon, CheckCircleIcon } from './icons';

const ShoppingCreditSettingsContent: React.FC = () => {
    const [newUserReward, setNewUserReward] = useState<string>('50');
    const [inviterReward, setInviterReward] = useState<string>('50');
    const [isSaving, setIsSaving] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const handleSave = () => {
        setIsSaving(true);
        // Simulate API call
        setTimeout(() => {
            setIsSaving(false);
            setShowSuccess(true);
            setTimeout(() => setShowSuccess(false), 3000);
        }, 800);
    };

    return (
        <div className="max-w-4xl mx-auto pb-12">
            <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900" data-selectable-id="SCS-01" data-step-name="註冊/推薦獎勵設定頁面標題">註冊/推薦獎勵設定</h1>
                    <p className="text-sm text-gray-500 mt-1" data-selectable-id="SCS-02" data-step-name="註冊/推薦獎勵設定頁面說明">設定全平台適用的註冊/推薦獎勵發放規則。若需要特定檔期的行銷活動，請至「發送活動」設定。</p>
                </div>
                
                {/* Success Toast */}
                <div className={`transition-all duration-300 ${showSuccess ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'}`}>
                    <div className="bg-green-50 text-green-700 px-4 py-2 rounded-lg border border-green-200 flex items-center shadow-sm">
                        <CheckCircleIcon className="w-5 h-5 mr-2 text-green-500" />
                        <span className="text-sm font-medium">設定已儲存</span>
                    </div>
                </div>
            </div>

            <div className="space-y-6">
                {/* 新用戶註冊獎勵 */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden" data-selectable-id="SCS-CARD-01" data-step-name="新用戶註冊獎勵設定區塊">
                    <div className="px-6 py-5 border-b border-gray-100 bg-gray-50 flex items-center justify-between">
                        <div>
                            <h2 className="text-lg font-semibold text-gray-800">新用戶註冊獎勵</h2>
                            <p className="text-sm text-gray-500 mt-1">當新用戶完成驗證並註冊成功後，即可獲得的購物金。</p>
                        </div>
                    </div>
                    <div className="p-6">
                        <div className="max-w-md">
                            <label className="block text-sm font-medium text-gray-700 mb-2">發放購物金金額</label>
                            <div className="relative rounded-md shadow-sm">
                                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                    <span className="text-gray-500 sm:text-sm">$</span>
                                </div>
                                <input
                                    type="number"
                                    className="block w-full rounded-md border-gray-300 pl-7 pr-12 focus:border-blue-500 focus:ring-blue-500 sm:text-sm py-2 border"
                                    placeholder="0"
                                    value={newUserReward}
                                    onChange={(e) => setNewUserReward(e.target.value)}
                                    data-selectable-id="SCS-INPUT-01" 
                                    data-step-name="輸入新用戶註冊獎勵金額"
                                    min="0"
                                />
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                                    <span className="text-gray-500 sm:text-sm" id="price-currency">
                                        元
                                    </span>
                                </div>
                            </div>
                            <div className="mt-2 flex items-start text-xs text-gray-500">
                                <InformationCircleIcon className="w-4 h-4 mr-1 flex-shrink-0 text-gray-400" />
                                <span>註冊成功後將於系統內自動派發。</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 邀請好友獎勵 */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden" data-selectable-id="SCS-CARD-02" data-step-name="邀請好友獎勵設定區塊">
                    <div className="px-6 py-5 border-b border-gray-100 bg-gray-50 flex items-center justify-between">
                        <div>
                            <h2 className="text-lg font-semibold text-gray-800">邀請好友獎勵</h2>
                            <p className="text-sm text-gray-500 mt-1">現有用戶成功邀請新朋友註冊，雙方皆可獲得獎勵。</p>
                        </div>
                    </div>
                    <div className="p-6">
                        <div className="max-w-md space-y-6">
                            
                            {/* Inviter Reward */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">邀請人（舊用戶）可獲得</label>
                                <div className="relative rounded-md shadow-sm">
                                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                        <span className="text-gray-500 sm:text-sm">$</span>
                                    </div>
                                    <input
                                        type="number"
                                        className="block w-full rounded-md border-gray-300 pl-7 pr-12 focus:border-blue-500 focus:ring-blue-500 sm:text-sm py-2 border"
                                        placeholder="0"
                                        value={inviterReward}
                                        onChange={(e) => setInviterReward(e.target.value)}
                                        data-selectable-id="SCS-INPUT-02" 
                                        data-step-name="輸入邀請人獎勵金額"
                                        min="0"
                                    />
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                                        <span className="text-gray-500 sm:text-sm" id="price-currency">
                                            元
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Invitee Reward Visualization (Read-only as it equals new user reward) */}
                            <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
                                <div className="flex items-start">
                                    <InformationCircleIcon className="w-5 h-5 text-blue-500 mr-2 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <p className="text-sm font-medium text-blue-900">被邀請人（新用戶）將獲得 {newUserReward || 0} 元</p>
                                        <p className="text-sm text-blue-700 mt-1">被邀請的新用戶，將直接適用上方「新用戶註冊獎勵」之設定金額。</p>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                <div className="flex justify-end pt-4">
                    <button
                        onClick={handleSave}
                        disabled={isSaving}
                        className={`inline-flex items-center px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors ${isSaving ? 'opacity-70 cursor-not-allowed' : ''}`}
                        data-selectable-id="SCS-BTN-01" 
                        data-step-name="儲存註冊/推薦獎勵設定按鈕"
                    >
                        {isSaving ? '儲存中...' : '儲存設定'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ShoppingCreditSettingsContent;
