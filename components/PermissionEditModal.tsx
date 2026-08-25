import React from 'react';

interface PermissionEditModalProps {
  onClose: () => void;
}

const PermissionEditModal: React.FC<PermissionEditModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[60] p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="px-8 py-5 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800">方案設定</h2>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-8 py-2 pb-6 space-y-8">
            {/* 方案名稱 */}
            <div className="flex items-center">
                <label className="w-32 text-right pr-4 text-sm text-gray-700 font-medium shrink-0">
                    <span className="text-red-500 mr-1">*</span>方案名稱:
                </label>
                <input 
                    type="text" 
                    className="flex-1 bg-white border border-gray-300 rounded-md shadow-sm text-sm px-3 py-2 outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500" 
                />
            </div>

            {/* 權限 */}
            <div className="flex items-start">
                <label className="w-32 text-right pr-4 text-sm text-gray-700 font-medium shrink-0 pt-1">
                    <span className="text-red-500 mr-1">*</span>權限:
                </label>
                <div className="flex-1 bg-gray-50/50 border border-gray-100 rounded-md p-4 relative pr-10 shadow-inner h-[320px] overflow-y-auto">
                    {/* Scrollbar placeholder area on the right */}
                    <div className="absolute right-1.5 top-1.5 bottom-1.5 w-3 bg-gray-200 rounded-full flex flex-col justify-between items-center py-1 opacity-50">
                        <svg className="w-3 h-3 text-gray-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd"></path></svg>
                        <div className="w-2 h-16 bg-gray-400 rounded-full my-1"></div>
                         <svg className="w-3 h-3 text-gray-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                    </div>

                    <div className="space-y-4 pr-4">
                        <label className="flex items-center text-sm text-gray-700 cursor-pointer">
                            <input type="checkbox" className="form-checkbox h-4 w-4 text-blue-500 border-gray-300 rounded mr-3" defaultChecked />
                            全選
                        </label>

                        {/* 直播 */}
                        <div>
                            <h3 className="text-base font-semibold text-gray-800 mb-2 mt-2">直播</h3>
                            <div className="space-y-2 border-b border-gray-200 pb-3">
                                <label className="flex items-center text-sm text-gray-600 cursor-pointer pl-1">
                                    <input type="checkbox" className="form-checkbox h-4 w-4 text-blue-500 border-gray-300 rounded mr-3" />
                                    直播管理
                                </label>
                            </div>
                        </div>

                        {/* 訊息管理 */}
                        <div>
                            <h3 className="text-base font-semibold text-gray-800 mb-2 mt-2">訊息管理</h3>
                            <div className="space-y-4 border-b border-gray-200 pb-3">
                                <label className="flex items-center text-sm text-gray-600 cursor-pointer pl-1">
                                    <input type="checkbox" className="form-checkbox h-4 w-4 text-blue-500 border-gray-300 rounded mr-3" />
                                    會員訊息
                                </label>
                                <label className="flex items-center text-sm text-gray-600 cursor-pointer pl-1">
                                    <input type="checkbox" className="form-checkbox h-4 w-4 text-blue-500 border-gray-300 rounded mr-3" />
                                    群發訊息
                                </label>
                                <label className="flex items-center text-sm text-gray-600 cursor-pointer pl-1">
                                    <input type="checkbox" className="form-checkbox h-4 w-4 text-blue-500 border-gray-300 rounded mr-3" />
                                    智能回覆
                                </label>
                            </div>
                        </div>

                         {/* 會員管理 */}
                        <div>
                            <h3 className="text-base font-semibold text-gray-800 mb-2 mt-2">會員管理</h3>
                            <div className="space-y-4 border-b border-gray-200 pb-3">
                                <label className="flex items-center text-sm text-gray-600 cursor-pointer pl-1">
                                    <input type="checkbox" className="form-checkbox h-4 w-4 text-blue-500 border-gray-300 rounded mr-3" />
                                    會員名單
                                </label>
                                <label className="flex items-center text-sm text-gray-600 cursor-pointer pl-1">
                                    <input type="checkbox" className="form-checkbox h-4 w-4 text-blue-500 border-gray-300 rounded mr-3" />
                                    會員類別編輯(無收費功能)
                                </label>
                                <label className="flex items-center text-sm text-gray-600 cursor-pointer pl-1">
                                    <input type="checkbox" className="form-checkbox h-4 w-4 text-blue-500 border-gray-300 rounded mr-3" />
                                    會員標籤
                                </label>
                            </div>
                        </div>
                        
                        {/* 交易管理 */}
                        <div>
                            <h3 className="text-base font-semibold text-gray-800 mb-2 mt-2">交易管理</h3>
                            <div className="pb-2">
                                <div className="h-4 bg-gray-100 rounded-sm flex justify-between items-center px-1">
                                    <svg className="w-3 h-3 text-gray-500 rotate-90" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd"></path></svg>
                                    <svg className="w-3 h-3 text-gray-500 -rotate-90" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd"></path></svg>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 特殊功能 */}
            <div className="flex items-start">
                <label className="w-32 text-right pr-4 text-sm text-gray-700 font-medium shrink-0 pt-1">
                    特殊功能:
                </label>
                <div className="flex-1 space-y-5">
                    <label className="flex items-center text-sm text-gray-600 cursor-pointer">
                        <input type="checkbox" className="form-checkbox h-4 w-4 text-blue-500 border-gray-300 rounded mr-3" />
                        群發匯入名單
                    </label>
                    <div className="flex items-center text-sm text-gray-600">
                        <label className="flex items-center cursor-pointer mr-2">
                             <input type="checkbox" className="form-checkbox h-4 w-4 text-blue-500 border-gray-300 rounded mr-3" />
                             新增票券 (
                        </label>
                        <div className="flex items-center space-x-4">
                            <label className="flex items-center cursor-pointer">
                                <input type="radio" name="paymentType" className="form-radio text-blue-500 mr-2" defaultChecked />
                                <span className="text-blue-500">線上支付</span>
                            </label>
                            <label className="flex items-center cursor-pointer">
                                <input type="radio" name="paymentType" className="form-radio text-gray-400 mr-2" />
                                <span>店內支付</span>
                            </label>
                        </div>
                        <span className="ml-1">)</span>
                    </div>
                    <label className="flex items-center text-sm text-gray-600 cursor-pointer">
                        <input type="checkbox" className="form-checkbox h-4 w-4 text-blue-500 border-gray-300 rounded mr-3" />
                        核銷任一指定票券
                    </label>
                </div>
            </div>

            {/* 消費者折抵最低% */}
            <div className="flex items-center">
                <label className="w-32 text-right pr-4 text-sm text-gray-700 font-medium shrink-0">
                    消費者折抵最低%:
                </label>
                <select className="flex-1 bg-white border border-gray-300 rounded-md shadow-sm text-sm px-3 py-2 outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 max-w-[200px]">
                    {Array.from({ length: 21 }, (_, i) => i * 5).map(value => (
                        <option key={`discount-${value}`} value={value}>{value}%</option>
                    ))}
                </select>
            </div>

            {/* 銷售分潤最低% */}
            <div className="flex items-center">
                <label className="w-32 text-right pr-4 text-sm text-gray-700 font-medium shrink-0">
                    銷售分潤最低%:
                </label>
                <select className="flex-1 bg-white border border-gray-300 rounded-md shadow-sm text-sm px-3 py-2 outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 max-w-[200px]">
                    {Array.from({ length: 21 }, (_, i) => i * 5).map(value => (
                        <option key={`profit-${value}`} value={value}>{value}%</option>
                    ))}
                </select>
            </div>

            {/* 平台抽成% */}
            <div className="flex items-center">
                <label className="w-32 text-right pr-4 text-sm text-gray-700 font-medium shrink-0">
                    平台抽成%:
                </label>
                <select className="flex-1 bg-white border border-gray-300 rounded-md shadow-sm text-sm px-3 py-2 outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 max-w-[200px]">
                    {Array.from({ length: 21 }, (_, i) => i * 5).map(value => (
                        <option key={`platform-${value}`} value={value}>{value}%</option>
                    ))}
                </select>
            </div>
        </div>

        {/* Footer */}
        <div className="px-8 py-5 border-t border-gray-200 flex justify-end space-x-4 bg-white mt-auto">
             <button 
                onClick={onClose}
                className="bg-[#4a90e2] text-white px-8 py-2 rounded text-sm hover:bg-blue-600 transition-colors"
            >
                確定
            </button>
            <button 
                onClick={onClose}
                className="border border-gray-300 text-gray-700 px-8 py-2 rounded text-sm hover:bg-gray-50 transition-colors"
            >
                取消
            </button>
        </div>
      </div>
    </div>
  );
};

export default PermissionEditModal;
