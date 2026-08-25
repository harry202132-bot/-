import React, { useState } from 'react';
import { Page } from '../App';
import { CheckCircleIcon, LineIcon } from './icons';

const PermissionRow: React.FC<{ label: string; permissions: string; }> = ({ label, permissions }) => (
    <div className="grid grid-cols-1 md:grid-cols-5 py-3">
        <div className="col-span-1 text-gray-500 font-medium">{label}</div>
        <div className="col-span-4 text-gray-800">{permissions}</div>
    </div>
);

interface MyAccountContentProps {
    setCurrentPage: (page: Page) => void;
    isBasicSettingsComplete: boolean;
    isVoucherCreationComplete: boolean;
}

const MyAccountContent: React.FC<MyAccountContentProps> = ({ setCurrentPage, isBasicSettingsComplete, isVoucherCreationComplete }) => {
    const [showOnboarding, setShowOnboarding] = useState(true);

    const areAllStepsComplete = isBasicSettingsComplete && isVoucherCreationComplete;

    return (
        <div className="space-y-6">
            {showOnboarding && !areAllStepsComplete && (
                <div 
                    className="bg-white p-6 rounded-lg shadow-md border border-gray-200 relative"
                    data-selectable-id="myaccount-onboarding-widget"
                    data-selectable-name="新手引導區塊"
                >
                    <button 
                        onClick={() => setShowOnboarding(false)}
                        className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
                        aria-label="關閉新手引導"
                        data-selectable-id="myaccount-close-onboarding-btn"
                        data-selectable-name="關閉新手引導"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                    <h2 className="text-lg font-semibold text-gray-800 mb-2">歡迎！讓我們開始設定您的商店</h2>
                    <p className="text-sm text-gray-600 mb-4">請跟隨以下步驟，完成您的帳號設定並建立第一張票券。</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Step 1 */}
                        <div className={`p-4 rounded-md transition-all ${isBasicSettingsComplete ? 'bg-green-50 border border-green-200' : 'bg-gray-50'}`}>
                            <h3 className="font-semibold text-gray-700 flex items-center">
                                {isBasicSettingsComplete && <CheckCircleIcon className="w-5 h-5 mr-2 text-green-500" />}
                                步驟一：完成商店基本設定
                            </h3>
                            <p className="text-xs text-gray-500 mt-1 mb-3">前往「基本設定」頁面，填寫您的商店資訊，如名稱、地址與封面照片。</p>
                            <button 
                                onClick={() => setCurrentPage('basicSettings')}
                                disabled={isBasicSettingsComplete}
                                className={`text-white px-4 py-1.5 rounded-md text-sm transition-colors w-full md:w-auto ${
                                    isBasicSettingsComplete 
                                        ? 'bg-gray-400 cursor-not-allowed' 
                                        : 'bg-blue-500 hover:bg-blue-600'
                                }`}
                                data-selectable-id="myaccount-goto-basic-settings-btn"
                                data-selectable-name="前往設定 (基本設定)"
                            >
                                {isBasicSettingsComplete ? '已完成設定' : '前往設定'}
                            </button>
                        </div>
                        {/* Step 2 */}
                        <div className={`p-4 rounded-md transition-all ${isVoucherCreationComplete ? 'bg-green-50 border border-green-200' : 'bg-gray-50'}`}>
                             <h3 className="font-semibold text-gray-700 flex items-center">
                                {isVoucherCreationComplete && <CheckCircleIcon className="w-5 h-5 mr-2 text-green-500" />}
                                步驟二：建立您的第一張票券
                            </h3>
                            <p className="text-xs text-gray-500 mt-1 mb-3">前往「票券管理」頁面，開始新增您的第一張電子票券或優惠券。</p>
                            <button 
                                onClick={() => setCurrentPage('ticketManagement')}
                                disabled={isVoucherCreationComplete}
                                className={`text-white px-4 py-1.5 rounded-md text-sm transition-colors w-full md:w-auto ${
                                    isVoucherCreationComplete 
                                        ? 'bg-gray-400 cursor-not-allowed' 
                                        : 'bg-green-500 hover:bg-green-600'
                                }`}
                                data-selectable-id="myaccount-goto-ticket-management-btn"
                                data-selectable-name="新增票券 (新手引導)"
                            >
                                {isVoucherCreationComplete ? '已成功建立' : '新增票券'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <h1 className="text-xl font-semibold text-gray-800">我的帳號</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* User Info Section */}
                <div className="lg:col-span-2 bg-blue-50 p-6 rounded-lg flex items-center space-x-6 border border-blue-100 h-full">
                    <img
                        className="h-24 w-24 rounded-full object-cover"
                        src="https://i.imgur.com/4KeKvtH.jpeg"
                        alt="使用者頭像"
                    />
                    <div className="text-sm space-y-1.5">
                        <p className="text-gray-800">名稱: 王大明</p>
                        <p className="text-gray-800">電話: +886975856212</p>
                        <p className="text-gray-800">身份: 最高管理者</p>
                        <p className="text-gray-800">建立時間: 2023/12/06</p>
                        <div className="flex items-center pt-1">
                            <p className="text-gray-800">登入帳號: 尚未啟用</p>
                            <button 
                                className="ml-4 bg-blue-500 text-white px-4 py-1.5 rounded-md text-xs hover:bg-blue-600 transition-colors"
                                data-selectable-id="myaccount-change-password-btn"
                                data-selectable-name="修改密碼按鈕"
                            >
                                修改密碼
                            </button>
                        </div>
                    </div>
                </div>
                {/* Line Support Card */}
                <div className="lg:col-span-1 bg-white p-6 rounded-lg shadow-md border border-gray-200 h-full">
                    <div className="flex flex-col sm:flex-row items-center gap-4 text-left sm:text-left h-full">
                        <div className="flex-shrink-0">
                           <img src="https://i.imgur.com/QR48I0p.png" alt="LINE QR Code" className="w-28 h-28 rounded-lg shadow-sm" />
                        </div>
                        <div className="flex flex-col justify-between flex-grow h-full">
                            <div>
                                <h3 className="font-semibold text-gray-800 flex items-center mb-2">
                                    <LineIcon className="w-6 h-6 mr-2"/>
                                    專屬支援與最新消息
                                </h3>
                                <ul className="space-y-1 text-gray-600 text-xs mb-3">
                                    <li className="flex items-start">
                                        <CheckCircleIcon className="w-3.5 h-3.5 text-green-500 mr-1.5 mt-0.5 shrink-0" />
                                        <span>一對一客服，開店問題隨時問。</span>
                                    </li>
                                    <li className="flex items-start">
                                        <CheckCircleIcon className="w-3.5 h-3.5 text-green-500 mr-1.5 mt-0.5 shrink-0" />
                                        <span>最新功能教學，讓您立刻上手。</span>
                                    </li>
                                    <li className="flex items-start">
                                        <CheckCircleIcon className="w-3.5 h-3.5 text-green-500 mr-1.5 mt-0.5 shrink-0" />
                                        <span>重要公告不漏接，掌握第一手消息。</span>
                                    </li>
                                </ul>
                            </div>
                             <a 
                                href="https://line.me/ti/p/@your-line-id"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-white text-center px-4 py-2 rounded-md text-sm transition-colors w-full inline-flex items-center justify-center bg-[#00B900] hover:bg-[#00a300]"
                                data-selectable-id="myaccount-join-line-btn"
                                data-selectable-name="加入 LINE 好友按鈕"
                            >
                                <LineIcon className="w-5 h-5 mr-2" />
                                點此加入好友
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* General Permissions Section */}
            <div className="bg-white rounded-lg">
                <div className="bg-blue-50 px-6 py-3 rounded-t-lg border border-blue-100 border-b-0">
                    <h2 className="text-base font-semibold text-gray-700">一般管理權限</h2>
                </div>
                <div className="p-6 divide-y divide-gray-100 border border-gray-200 rounded-b-lg">
                    <PermissionRow label="訊息管理" permissions="訊息管理" />
                    <PermissionRow label="直播" permissions="直播管理" />
                    <PermissionRow label="會員管理" permissions="會員列表、群發訊息、會員相關編輯" />
                    <PermissionRow label="會員設定" permissions="會員方案、會員標籤、會員欄位編輯" />
                    <PermissionRow label="商品管理" permissions="票券管理、發送活動" />
                    <PermissionRow label="交易管理" permissions="交易記錄、發票記錄、退款記錄設定" />
                    <PermissionRow label="財務管理" permissions="對帳管理、帳戶設定" />
                    <PermissionRow label="平台設定" permissions="基本設定、權限管理、LINE OA 串接" />
                    <PermissionRow label="活動" permissions="發佈的機器人" />
                </div>
            </div>

            {/* Special Permissions Section */}
            <div className="bg-white rounded-lg">
                <div className="bg-blue-50 px-6 py-3 rounded-t-lg border border-blue-100 border-b-0">
                    <h2 className="text-base font-semibold text-gray-700">特殊功能權限</h2>
                </div>
                <div className="p-6 border border-gray-200 rounded-b-lg">
                     <div className="py-2">
                        <div className="text-gray-800">群發機器人名單、購物車編輯、修改已上架的單一票券</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyAccountContent;