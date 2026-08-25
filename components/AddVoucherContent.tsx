import React, { useState } from 'react';
import { Page } from '../App';
import { ArrowUturnLeftIcon, PlusIcon, QuestionMarkCircleIcon, CalendarIcon, CheckCircleIcon } from './icons';
import Modal from './Modal';

interface AddVoucherContentProps {
  setCurrentPage: (page: Page) => void;
  setIsVoucherCreationComplete: (isComplete: boolean) => void;
  isBasicSettingsComplete: boolean;
  isVoucherCreationComplete: boolean;
}

const FormSection: React.FC<{ title: string; children: React.ReactNode; subtitle?: React.ReactNode; className?: string }> = ({ title, children, subtitle, className = "" }) => (
    <div className={`bg-[#e9ecef]/60 p-6 rounded-md ${className}`}>
      {title && (
        <div className="flex items-center mb-6 border-b border-gray-300 pb-4">
          <h2 className="text-base font-semibold text-gray-800">{title}</h2>
          {subtitle}
        </div>
      )}
      <div className="space-y-6">
        {children}
      </div>
    </div>
);

const FormRow: React.FC<{ label: string; required?: boolean; children: React.ReactNode; className?: string, helperText?: string }> = ({ label, required, children, className = "", helperText }) => (
    <div className={`flex items-start py-2 ${className}`}>
        <label className="w-32 text-right pr-6 text-sm text-gray-700 shrink-0 pt-2">
            {required && <span className="text-red-500 mr-1">•</span>}
            {label}:
        </label>
        <div className="flex-1 flex flex-col">
          {children}
          {helperText && <p className="text-xs text-gray-500 mt-1.5">{helperText}</p>}
        </div>
    </div>
);

const RichTextEditorToolbar: React.FC = () => (
    <div className="flex flex-wrap items-center bg-white border border-b-0 border-gray-300 rounded-t-md px-3 py-1.5 space-x-2 text-gray-700 text-sm">
        <div className="flex items-center space-x-1">
            <button className="px-2 py-1 hover:bg-gray-100 rounded font-bold">B</button>
            <button className="px-2 py-1 hover:bg-gray-100 rounded italic">I</button>
            <button className="px-2 py-1 hover:bg-gray-100 rounded underline">U</button>
            <button className="px-2 py-1 hover:bg-gray-100 rounded line-through">S</button>
        </div>
        <div className="h-4 w-px bg-gray-300"></div>
        <div className="flex items-center space-x-1">
            <button className="px-2 py-1 hover:bg-gray-100 rounded text-lg font-serif">”</button>
            <button className="px-2 py-1 hover:bg-gray-100 rounded">&lt;/&gt;</button>
        </div>
        <div className="h-4 w-px bg-gray-300"></div>
        <div className="flex items-center space-x-1">
            <button className="px-2 py-1 hover:bg-gray-100 rounded font-semibold">H<sub className="text-xs">1</sub></button>
            <button className="px-2 py-1 hover:bg-gray-100 rounded font-semibold">H<sub className="text-xs">2</sub></button>
        </div>
        <div className="h-4 w-px bg-gray-300"></div>
         <div className="flex items-center space-x-1">
            <button className="px-1.5 py-1 hover:bg-gray-100 rounded"><svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg></button>
            <button className="px-1.5 py-1 hover:bg-gray-100 rounded">x<sub className="text-xs">2</sub></button>
             <button className="px-1.5 py-1 hover:bg-gray-100 rounded">x<sup className="text-xs">2</sup></button>
        </div>
        <div className="h-4 w-px bg-gray-300"></div>
        <select className="text-sm border-gray-300 rounded-md py-1 text-gray-700 focus:ring-blue-500 focus:border-blue-500"><option>Normal</option></select>
        <select className="text-sm border-gray-300 rounded-md py-1 text-gray-700 focus:ring-blue-500 focus:border-blue-500"><option>Normal</option></select>
        <select className="text-sm border-gray-300 rounded-md py-1 text-gray-700 focus:ring-blue-500 focus:border-blue-500"><option>Sans Serif</option></select>
    </div>
);


const AddVoucherContent: React.FC<AddVoucherContentProps> = ({ setCurrentPage, setIsVoucherCreationComplete, isBasicSettingsComplete, isVoucherCreationComplete }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [saveState, setSaveState] = useState<'idle' | 'saving'>('idle');

  const handleSaveOrPublish = () => {
    const wereAllStepsAlreadyComplete = isBasicSettingsComplete && isVoucherCreationComplete;
    
    setSaveState('saving');
    setTimeout(() => {
        setIsVoucherCreationComplete(true);
        setSaveState('idle');
        if (!wereAllStepsAlreadyComplete) {
            setIsModalOpen(true);
        }
    }, 1000);
  };
  
  const closeModal = () => {
    setIsModalOpen(false);
  }

  return (
    <>
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-800">新增優惠券</h1>
      <button 
        onClick={() => setCurrentPage('ticketManagement')} 
        className="flex items-center text-sm text-gray-600 hover:text-gray-800"
        data-selectable-id="add-voucher-back-btn"
        data-selectable-name="返回上一層按鈕"
      >
        <ArrowUturnLeftIcon className="w-4 h-4 mr-1" />
        返回上一層
      </button>

      {/* Upload Section */}
      <FormSection title="">
        <FormRow label="圖片" required>
            <div 
                className="w-40 h-40 border-2 border-dashed border-gray-300 rounded-md flex flex-col items-center justify-center text-blue-500 cursor-pointer hover:bg-gray-50"
                data-selectable-id="add-voucher-upload-image"
                data-selectable-name="上傳圖片區塊"
            >
                <PlusIcon className="w-8 h-8"/>
                <span className="text-sm mt-1">上傳圖片</span>
            </div>
        </FormRow>
      </FormSection>

      {/* Basic Info Section */}
      <FormSection title="基本資料">
        <FormRow label="名稱" required helperText="ex: 四季春買兩杯送一杯、全品項9折、咖啡禮盒滿$2000贈濾掛咖啡一盒($300)、免費領取手工仙草茶一杯、做臉400元送30元面膜乙份">
          <input 
            type="text" 
            placeholder="1-30字" 
            className="w-full bg-white border-gray-300 rounded-md shadow-sm text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500 px-3 py-2" 
            data-selectable-id="add-voucher-name-input"
            data-selectable-name="優惠券名稱輸入框"
          />
        </FormRow>
        <FormRow label="類別" required>
          <select 
            className="w-full bg-white border-gray-300 rounded-md shadow-sm text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500 px-3 py-2"
            data-selectable-id="add-voucher-category-select"
            data-selectable-name="類別選擇器"
          >
            <option>請選擇</option>
          </select>
        </FormRow>
        <FormRow label="序號" required>
          <select 
            className="w-full bg-white border-gray-300 rounded-md shadow-sm text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500 px-3 py-2"
            data-selectable-id="add-voucher-serial-select"
            data-selectable-name="序號選擇器"
          >
            <option>無</option>
          </select>
        </FormRow>
        <FormRow label="上架數量" required>
            <div className="flex items-center space-x-4 pt-1">
                <label 
                    className="flex items-center"
                    data-selectable-id="add-voucher-stock-unlimited"
                    data-selectable-name="上架數量：無限制"
                >
                    <input type="radio" name="stock" className="form-radio text-blue-600" defaultChecked />
                    <span className="ml-2 text-sm">無限制</span>
                </label>
                <label 
                    className="flex items-center"
                    data-selectable-id="add-voucher-stock-limited"
                    data-selectable-name="上架數量：自訂"
                >
                    <input type="radio" name="stock" className="form-radio text-blue-600" />
                    <input type="text" placeholder="請輸入數字" className="ml-2 w-32 bg-white border-gray-300 rounded-md shadow-sm text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500 px-3 py-2" />
                </label>
            </div>
        </FormRow>
      </FormSection>

      {/* Discount Settings Section */}
      <FormSection title="優惠設定" subtitle={
        <a href="#" className="flex items-center text-xs text-blue-600 hover:underline ml-3">
          <QuestionMarkCircleIcon className="w-4 h-4 mr-1"/>
          優惠條件說明一覽
        </a>
      }>
        <FormRow label="優惠條件" required helperText="ex. SPA免費體驗、四季春一杯免費兌換">
          <div 
            className="flex items-center space-x-2"
            data-selectable-id="add-voucher-discount-condition"
            data-selectable-name="優惠條件設定"
          >
            <select className="w-40 bg-white border-gray-300 rounded-md shadow-sm text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500 px-3 py-2">
                <option>商品免費券</option>
            </select>
            <input type="text" defaultValue="0" className="w-40 bg-white border-gray-300 rounded-md shadow-sm text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500 px-3 py-2" />
          </div>
        </FormRow>
        <FormRow label="" required helperText="填寫贈送商品價格">
            <div 
                className="flex items-center space-x-2"
                data-selectable-id="add-voucher-gift-setting"
                data-selectable-name="贈品設定"
            >
                <select className="w-40 bg-white border-gray-300 rounded-md shadow-sm text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500 px-3 py-2">
                    <option>贈送</option>
                </select>
                <input type="text" defaultValue="0" className="w-40 bg-white border-gray-300 rounded-md shadow-sm text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500 px-3 py-2" />
            </div>
        </FormRow>
      </FormSection>

      {/* Action Buttons */}
      <div className="flex justify-center items-center space-x-4 pt-4">
        <button 
            onClick={handleSaveOrPublish} 
            disabled={saveState==='saving'} 
            className="bg-blue-500 text-white px-8 py-2 rounded-md hover:bg-blue-600 disabled:bg-blue-300"
            data-selectable-id="add-voucher-save-btn"
            data-selectable-name="儲存按鈕"
        >
            {saveState === 'saving' ? '儲存中...' : '儲存'}
        </button>
        <button 
            onClick={handleSaveOrPublish} 
            disabled={saveState==='saving'} 
            className="bg-blue-500 text-white px-8 py-2 rounded-md hover:bg-blue-600 disabled:bg-blue-300"
            data-selectable-id="add-voucher-publish-btn"
            data-selectable-name="上架按鈕"
        >
            {saveState === 'saving' ? '上架中...' : '上架'}
        </button>
        <button 
            onClick={() => setCurrentPage('ticketManagement')} 
            className="bg-gray-600 text-white px-8 py-2 rounded-md hover:bg-gray-700"
            data-selectable-id="add-voucher-cancel-btn"
            data-selectable-name="取消按鈕"
        >取消</button>
      </div>
    </div>
    
    <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={isBasicSettingsComplete ? "恭喜！您已完成所有設定！" : "票券已成功建立！"}
        icon={<CheckCircleIcon className="w-12 h-12 text-green-500 mx-auto mb-4" />}
    >
      {isBasicSettingsComplete ? (
        <>
           <p className="text-sm text-gray-500 text-center mb-6">
               您的商店已設定完成，第一張票券也成功建立了。您可以開始您的業務了！
           </p>
           <div className="flex flex-col sm:flex-row-reverse gap-3">
               <button
                   onClick={() => setCurrentPage('ticketManagement')}
                   className="w-full bg-blue-500 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-600 transition-colors"
               >
                   查看票券列表
               </button>
                <button
                   onClick={() => {
                       setCurrentPage('myAccount');
                       closeModal();
                   }}
                   className="w-full bg-gray-200 text-gray-700 px-4 py-2 rounded-md text-sm hover:bg-gray-300 transition-colors"
               >
                   返回我的帳號
               </button>
           </div>
        </>
      ) : (
        <>
            <p className="text-sm text-gray-500 text-center mb-6">
                太棒了！不過，我們發現您尚未完成商店的基本設定。請完成最後一步，讓您的商店準備就緒。
            </p>
            <div className="flex flex-col sm:flex-row-reverse gap-3">
                <button
                    onClick={() => setCurrentPage('basicSettings')}
                    className="w-full bg-green-500 text-white px-4 py-2 rounded-md text-sm hover:bg-green-600 transition-colors"
                >
                    前往步驟一：基本設定
                </button>
                 <button
                    onClick={() => {
                        setCurrentPage('myAccount');
                        closeModal();
                    }}
                    className="w-full bg-gray-200 text-gray-700 px-4 py-2 rounded-md text-sm hover:bg-gray-300 transition-colors"
                >
                    稍後再說
                </button>
            </div>
        </>
      )}
    </Modal>
    </>
  );
};

export default AddVoucherContent;