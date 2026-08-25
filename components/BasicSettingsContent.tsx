import React, { useState } from 'react';
import { Page } from '../App';
import Modal from './Modal';
import { CheckCircleIcon } from './icons';

const FormRow: React.FC<{ label: string; required?: boolean; children: React.ReactNode; className?: string }> = ({ label, required, children, className }) => (
    <div className={`flex items-start py-4 ${className}`}>
        <label className="w-32 text-right pr-6 text-sm text-gray-600 shrink-0">
            {required && <span className="text-red-500 mr-1">*</span>}
            {label}:
        </label>
        <div className="flex-1">
            {children}
        </div>
    </div>
);

interface BasicSettingsContentProps {
    setIsBasicSettingsComplete: (isComplete: boolean) => void;
    setCurrentPage: (page: Page) => void;
    isVoucherCreationComplete: boolean;
    // FIX: Add isBasicSettingsComplete to the props interface to make it available in the component.
    isBasicSettingsComplete: boolean;
}

const BasicSettingsContent: React.FC<BasicSettingsContentProps> = ({ setIsBasicSettingsComplete, setCurrentPage, isVoucherCreationComplete, isBasicSettingsComplete }) => {
    const [saveState, setSaveState] = useState<'idle' | 'saving' | 'success'>('idle');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleSave = () => {
        // FIX: isBasicSettingsComplete was not defined. It is now passed in as a prop.
        const wereAllStepsAlreadyComplete = isBasicSettingsComplete && isVoucherCreationComplete;

        setSaveState('saving');
        setTimeout(() => {
            setIsBasicSettingsComplete(true);
            setSaveState('success');
            if (!wereAllStepsAlreadyComplete) {
                setIsModalOpen(true);
            }
        }, 1000);
    };
    
    const closeModalAndReset = () => {
        setIsModalOpen(false);
        setSaveState('idle');
    };

    const getButtonText = () => {
        switch (saveState) {
            case 'saving': return '儲存中...';
            case 'success': return '儲存成功！';
            default: return '儲存';
        }
    };

    return (
        <>
            <div className="max-w-5xl mx-auto">
                <h1 className="text-2xl font-semibold text-gray-800 mb-6">基本設定</h1>
                
                <div className="bg-white p-8 rounded-lg shadow-sm">
                    <div className="flex items-start pb-6 border-b border-gray-200">
                         <label className="w-32 text-right pr-6 text-sm text-gray-600 shrink-0"></label>
                         <div className="flex-1 flex space-x-8">
                            <div className="flex flex-col items-center space-y-3">
                                 <img 
                                    src="https://picsum.photos/seed/hedgehog/120/120" 
                                    alt="頭像"
                                    className="w-32 h-32 rounded-md object-cover bg-gray-200"
                                />
                                <button 
                                    className="w-full bg-blue-500 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-600"
                                    data-selectable-id="basic-settings-change-avatar-btn"
                                    data-selectable-name="變更頭像按鈕"
                                >
                                    變更頭像
                                </button>
                            </div>
                             <div className="flex flex-col items-center space-y-3">
                                 <img 
                                    src="https://picsum.photos/seed/winter/120/120" 
                                    alt="封面"
                                    className="w-32 h-32 rounded-md object-cover bg-gray-200"
                                />
                                <button 
                                    className="w-full bg-blue-500 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-600"
                                    data-selectable-id="basic-settings-change-cover-btn"
                                    data-selectable-name="變更封面按鈕"
                                >
                                    變更封面
                                </button>
                            </div>
                         </div>
                    </div>

                    <div className="divide-y divide-gray-200">
                        <FormRow label="名稱" required>
                            <input 
                                type="text" 
                                defaultValue="好想賣票券" 
                                className="w-full max-w-md border border-gray-300 rounded-md px-3 py-2 text-sm placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500" 
                                data-selectable-id="basic-settings-name-input"
                                data-selectable-name="店家名稱輸入框"
                            />
                        </FormRow>

                        <FormRow label="統編">
                            <div className="flex items-center space-x-2">
                               <input 
                                    type="text" 
                                    defaultValue="1304" 
                                    className="w-48 border border-gray-300 rounded-md px-3 py-2 text-sm placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500" 
                                    data-selectable-id="basic-settings-tax-id-input"
                                    data-selectable-name="統一編號輸入框"
                                />
                               <span className="text-sm text-gray-500">(供用戶辨識商店使用，可自行變更)</span>
                               <button 
                                    className="bg-orange-400 text-white px-3 py-2 rounded-md text-sm hover:bg-orange-500"
                                    data-selectable-id="basic-settings-download-qr-btn"
                                    data-selectable-name="下載QR Code按鈕"
                                >下載QR Code下載</button>
                               <button 
                                    className="bg-orange-400 text-white px-3 py-2 rounded-md text-sm hover:bg-orange-500"
                                    data-selectable-id="basic-settings-view-qr-btn"
                                    data-selectable-name="檢視QR Code按鈕"
                                >檢視QR Code下載</button>
                            </div>
                        </FormRow>
                        
                        <FormRow label="Line認證">
                            <input 
                                type="text" 
                                placeholder="具備Line官方認證盾牌" 
                                className="w-full max-w-md border border-gray-300 rounded-md px-3 py-2 text-sm placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500" 
                                data-selectable-id="basic-settings-line-cert-input"
                                data-selectable-name="Line認證輸入框"
                            />
                        </FormRow>
                        
                        <FormRow label="地址">
                            <input 
                                type="text" 
                                defaultValue="台中市北區進化路三段109號" 
                                className="w-full max-w-md border border-gray-300 rounded-md px-3 py-2 text-sm placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500" 
                                data-selectable-id="basic-settings-address-input"
                                data-selectable-name="地址輸入框"
                            />
                        </FormRow>
                        
                        <FormRow label="地圖功能" required>
                            <div className="pt-2 text-sm text-gray-800">
                                <span>已開啟</span>
                                <a 
                                    href="#" 
                                    className="text-blue-600 ml-2 hover:underline"
                                    data-selectable-id="basic-settings-show-map-link"
                                    data-selectable-name="顯示地圖連結"
                                >(顯示地圖)</a>
                            </div>
                        </FormRow>
                        
                        <FormRow label="票券核銷通知" required>
                             <div className="pt-2 text-sm text-gray-800">
                                <span>將由入門票務系統接手，</span>
                                <a 
                                    href="#" 
                                    className="text-blue-600 hover:underline"
                                    data-selectable-id="basic-settings-verification-notice-link"
                                    data-selectable-name="票券核銷通知詳情連結"
                                >詳見 +886975856212</a>
                            </div>
                        </FormRow>

                         <FormRow label="官網">
                            <input 
                                type="text" 
                                defaultValue="https://www.yuanbao.org.tw/" 
                                className="w-full max-w-md border border-gray-300 rounded-md px-3 py-2 text-sm placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500" 
                                data-selectable-id="basic-settings-website-input"
                                data-selectable-name="官網輸入框"
                            />
                        </FormRow>

                         <FormRow label="簡介">
                            <textarea 
                                rows={4} 
                                placeholder="請輸入文字" 
                                className="w-full max-w-md border border-gray-300 rounded-md px-3 py-2 text-sm placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                                data-selectable-id="basic-settings-intro-textarea"
                                data-selectable-name="簡介輸入區"
                            ></textarea>
                        </FormRow>
                    </div>

                     <div className="flex justify-end items-center space-x-3 pt-6 mt-4 border-t border-gray-200">
                        {saveState === 'success' && !isModalOpen && <span className="text-green-600 text-sm">✓ 已更新設定</span>}
                        <button 
                            className="bg-gray-200 text-gray-700 px-6 py-2 rounded-md text-sm hover:bg-gray-300"
                            data-selectable-id="basic-settings-cancel-btn"
                            data-selectable-name="取消按鈕"
                        >取消</button>
                        <button 
                            onClick={handleSave}
                            disabled={saveState === 'saving'}
                            className={`px-6 py-2 rounded-md text-sm text-white transition-colors ${
                                saveState === 'success' 
                                    ? 'bg-green-500' 
                                    : 'bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300'
                            }`}
                            data-selectable-id="basic-settings-save-btn"
                            data-selectable-name="儲存按鈕"
                        >
                            {getButtonText()}
                        </button>
                     </div>
                </div>
            </div>

            <Modal
                isOpen={isModalOpen}
                onClose={closeModalAndReset}
                title={isVoucherCreationComplete ? "恭喜！您已完成所有設定！" : "太棒了！已完成第一步"}
                icon={<CheckCircleIcon className="w-12 h-12 text-green-500 mx-auto mb-4" />}
            >
                {isVoucherCreationComplete ? (
                     <>
                        <p className="text-sm text-gray-500 text-center mb-6">
                            您的商店已設定完成，第一張票券也成功建立了。您可以開始您的業務了！
                        </p>
                        <div className="flex flex-col sm:flex-row-reverse gap-3">
                            <button
                                onClick={() => {
                                    setCurrentPage('myAccount');
                                    closeModalAndReset();
                                }}
                                className="w-full bg-blue-500 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-600 transition-colors"
                            >
                                返回我的帳號
                            </button>
                             <button
                                onClick={closeModalAndReset}
                                className="w-full bg-gray-200 text-gray-700 px-4 py-2 rounded-md text-sm hover:bg-gray-300 transition-colors"
                            >
                                關閉
                            </button>
                        </div>
                    </>
                ) : (
                    <>
                        <p className="text-sm text-gray-500 text-center mb-6">
                            您已成功儲存商店的基本設定。要繼續完成新手引導的下一步嗎？
                        </p>
                        <div className="flex flex-col sm:flex-row-reverse gap-3">
                            <button
                                onClick={() => setCurrentPage('ticketManagement')}
                                className="w-full bg-green-500 text-white px-4 py-2 rounded-md text-sm hover:bg-green-600 transition-colors"
                            >
                                前往步驟二：新增票券
                            </button>
                            <button
                                onClick={() => {
                                    setCurrentPage('myAccount');
                                    closeModalAndReset();
                                }}
                                className="w-full bg-gray-200 text-gray-700 px-4 py-2 rounded-md text-sm hover:bg-gray-300 transition-colors"
                            >
                                返回我的帳號
                            </button>
                        </div>
                    </>
                )}
            </Modal>
        </>
    );
};

export default BasicSettingsContent;