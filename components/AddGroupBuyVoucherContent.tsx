import React, { useState } from 'react';
import { Page } from '../App';
import { ArrowUturnLeftIcon, PlusIcon, CalendarIcon } from './icons';

interface AddGroupBuyVoucherContentProps {
  setCurrentPage: (page: Page) => void;
}

const FormSection: React.FC<{ title?: string; children: React.ReactNode; className?: string }> = ({ title, children, className = "" }) => (
    <div className={`bg-[#e9ecef]/60 p-6 rounded-md ${className}`}>
      {title && (
        <div className="flex items-center mb-6 pb-2">
          <h2 className="text-base font-semibold text-gray-800">{title}</h2>
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
    <div className="flex flex-wrap items-center bg-white border border-b-0 border-gray-300 px-3 py-1.5 space-x-2 text-gray-700 text-sm">
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
        <select className="text-sm border border-gray-300 rounded py-1 text-gray-700 focus:ring-blue-500 focus:border-blue-500"><option>Normal</option></select>
        <select className="text-sm border border-gray-300 rounded py-1 ml-1 text-gray-700 focus:ring-blue-500 focus:border-blue-500"><option>Normal</option></select>
        <div className="h-4 w-px bg-gray-300 ml-2"></div>
        <button className="px-1.5 py-1 hover:bg-gray-100 rounded text-gray-700 font-bold ml-1">A</button>
        <button className="px-1.5 py-1 hover:bg-gray-100 rounded text-gray-700 font-bold ml-1 flex flex-col items-center justify-center leading-none">A<span className="w-full h-1 bg-black mt-px"></span></button>
        <select className="text-sm border border-gray-300 rounded py-1 ml-2 text-gray-700 focus:ring-blue-500 focus:border-blue-500"><option>Sans Serif</option></select>
        <div className="h-4 w-px bg-gray-300 ml-2"></div>
        <button className="px-1.5 py-1 hover:bg-gray-100 rounded ml-1"><svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg></button>
        <button className="px-1.5 py-1 hover:bg-gray-100 rounded"><svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="21" y1="10" x2="3" y2="10"></line><line x1="21" y1="6" x2="3" y2="6"></line><line x1="21" y1="14" x2="3" y2="14"></line><line x1="21" y1="18" x2="3" y2="18"></line></svg></button>
        <button className="px-1.5 py-1 hover:bg-gray-100 rounded italic font-serif">Tx</button>
        <div className="h-4 w-px bg-gray-300 ml-1"></div>
        <button className="px-1.5 py-1 hover:bg-gray-100 rounded ml-1"><svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg></button>
        <button className="px-1.5 py-1 hover:bg-gray-100 rounded"><svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg></button>
        <button className="px-1.5 py-1 hover:bg-gray-100 rounded"><svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></svg></button>
        <button className="px-1.5 py-1 hover:bg-gray-100 rounded">&lt;/&gt;</button>
    </div>
);


const AddGroupBuyVoucherContent: React.FC<AddGroupBuyVoucherContentProps> = ({ setCurrentPage }) => {
  const [maxDiscount, setMaxDiscount] = useState<number>(10);
  const [salesCommission, setSalesCommission] = useState<number>(10);
  const [originalPrice, setOriginalPrice] = useState<number | ''>('');
  const platformFee = 5; // 假設平台抽成為 5%，實際會依店家方案變動

  const discountedPrice = originalPrice ? Math.floor(Number(originalPrice) * (1 - maxDiscount / 100)) : 0;

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold text-gray-800">新增票券</h1>
      <button 
        onClick={() => setCurrentPage('ticketManagement')} 
        className="flex items-center text-sm text-gray-600 hover:text-gray-800 mb-2 inline-flex"
      >
        <ArrowUturnLeftIcon className="w-4 h-4 mr-1" />
        返回上一層
      </button>

      {/* Upload Section */}
      <FormSection>
        <FormRow label="圖片" required>
            <div 
                className="w-32 h-32 border border-blue-400 bg-[#f8fbff] rounded flex flex-col items-center justify-center text-blue-500 cursor-pointer hover:bg-blue-50"
            >
                <PlusIcon className="w-6 h-6"/>
                <span className="text-sm mt-1">上傳圖片</span>
            </div>
        </FormRow>
      </FormSection>

      {/* Basic Info Section */}
      <FormSection title="基本資料">
        <FormRow label="名稱" required>
          <input 
            type="text" 
            placeholder="1-30字" 
            className="w-full bg-white border border-gray-300 rounded shadow-sm text-sm px-3 py-2 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none" 
          />
        </FormRow>
        
        <div className="flex flex-wrap items-start py-2">
            <label className="w-32 text-right pr-6 text-sm text-gray-700 shrink-0 pt-2">
                <span className="text-red-500 mr-1">•</span>類別:
            </label>
            <div className="flex-1 flex flex-col sm:flex-row gap-4">
                <div className="flex items-center">
                    <select className="w-48 bg-white border border-gray-300 rounded shadow-sm text-sm px-3 py-2 outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-gray-500">
                        <option>請選擇</option>
                    </select>
                </div>
                <div className="flex items-center">
                    <label className="text-sm text-gray-700 mr-2"><span className="text-red-500 mr-1">•</span>所屬官方帳號:</label>
                    <select className="w-48 bg-white border border-gray-300 rounded shadow-sm text-sm px-3 py-2 outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-gray-500">
                        <option>請輸入關鍵字</option>
                    </select>
                </div>
            </div>
        </div>

        <FormRow label="序號" required>
          <select 
            className="w-48 bg-white border border-gray-300 rounded shadow-sm text-sm px-3 py-2 outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-gray-700"
          >
            <option>無</option>
          </select>
        </FormRow>
        <FormRow label="上架數量" required>
            <div className="flex items-center space-x-4 pt-1 text-sm text-gray-700">
                <label className="flex items-center cursor-pointer">
                    <input type="radio" name="stock" className="form-radio text-blue-500" defaultChecked />
                    <span className="ml-2 text-blue-500">無限制</span>
                </label>
                <label className="flex items-center cursor-pointer">
                    <input type="radio" name="stock" className="form-radio text-gray-300 mr-2" />
                    <input type="text" placeholder="請輸入數字" className="w-32 bg-white border border-gray-300 rounded shadow-sm text-sm px-3 py-1.5 outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500" />
                </label>
            </div>
        </FormRow>
      </FormSection>

      {/* Price Settings Section */}
      <FormSection title="價格設定">
        <div className="flex flex-wrap items-start py-2">
            <label className="w-32 text-right pr-6 text-sm text-gray-700 shrink-0 pt-2">
                <span className="text-red-500 mr-1">•</span>原價:
            </label>
            <div className="flex-1 flex flex-col sm:flex-row gap-4 flex-wrap">
                <div className="flex flex-col">
                    <input 
                        type="number" 
                        placeholder="填寫原價" 
                        className="w-32 bg-white border border-gray-300 rounded shadow-sm text-sm px-3 py-2 outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                        value={originalPrice}
                        onChange={(e) => setOriginalPrice(e.target.value === '' ? '' : Number(e.target.value))}
                    />
                    <span className="text-xs text-gray-500 mt-1 h-4">
                        折扣後: ${originalPrice !== '' ? discountedPrice : '0'}
                    </span>
                </div>
                <div className="flex items-center">
                    <label className="flex items-center text-sm text-gray-700 mr-2 relative group cursor-help">
                        <span className="text-red-500 mr-1">•</span>最高折扣%:
                        <svg className="w-4 h-4 text-gray-400 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        
                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-64 p-2.5 bg-gray-800 text-white text-xs rounded shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10 leading-relaxed font-normal text-left pointer-events-none">
                            此為消費者最高可使用的購物金折抵比例。<br/><br/>
                            店家實際總負擔為「最高折扣%」加上您專屬方案的「平台抽成%」。
                            <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-800 rotate-45"></div>
                        </div>
                    </label>
                    <select 
                        className="w-32 bg-white border border-gray-300 rounded shadow-sm text-sm px-3 py-2 outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-gray-700 relative z-0"
                        value={maxDiscount}
                        onChange={(e) => setMaxDiscount(Number(e.target.value))}
                    >
                        {Array.from({ length: 20 }, (_, i) => (i + 1) * 5).map(value => (
                            <option key={value} value={value}>{value}%</option>
                        ))}
                    </select>
                </div>
                <div className="flex items-center">
                    <label className="flex items-center text-sm text-gray-700 mr-2 relative group cursor-help">
                        <span className="text-red-500 mr-1">•</span>銷售分潤%:
                        <svg className="w-4 h-4 text-gray-400 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        
                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-64 p-2.5 bg-gray-800 text-white text-xs rounded shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10 leading-relaxed font-normal text-left pointer-events-none">
                            此為推薦或分銷人員推廣此票券時可獲得的銷售分潤比例。
                            <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-800 rotate-45"></div>
                        </div>
                    </label>
                    <select 
                        className="w-32 bg-white border border-gray-300 rounded shadow-sm text-sm px-3 py-2 outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-gray-700 relative z-0"
                        value={salesCommission}
                        onChange={(e) => setSalesCommission(Number(e.target.value))}
                    >
                        {Array.from({ length: 20 }, (_, i) => (i + 1) * 5).map(value => (
                            <option key={value} value={value}>{value}%</option>
                        ))}
                    </select>
                </div>
                <div className="flex items-center">
                    <span className="text-sm text-gray-700 bg-gray-100 px-3 py-2 rounded-md border border-gray-200 shadow-sm flex items-center">
                        預估總讓利：<span className="font-semibold text-blue-600 ml-1 mr-1">{maxDiscount + salesCommission + platformFee}%</span> 
                        <span className="text-xs text-gray-500 ml-1">(含平台抽成及銷售分潤)</span>
                    </span>
                </div>
            </div>
        </div>
      </FormSection>

      {/* Advanced Settings Section */}
      <FormSection title="進階設定">
        <FormRow label="使用期限" required>
            <div className="flex items-center space-x-4 pt-1 text-sm text-gray-700 flex-wrap gap-y-2">
                <label className="flex items-center cursor-pointer">
                    <input type="radio" name="expire" className="form-radio text-blue-500" defaultChecked />
                    <span className="ml-2 text-blue-500 mr-2">完成兌換後算起</span>
                    <select className="w-20 bg-white border border-gray-300 rounded shadow-sm text-sm px-2 py-1 outline-none text-gray-500">
                        <option>7</option>
                    </select>
                    <span className="ml-2 text-blue-500">天到期</span>
                </label>
                <label className="flex items-center cursor-pointer">
                    <input type="radio" name="expire" className="form-radio text-gray-300" />
                    <span className="ml-2 mr-2">於</span>
                    <div className="relative">
                        <input type="text" placeholder="請選擇日期" className="w-32 pl-8 pr-2 py-1.5 bg-white border border-gray-300 rounded shadow-sm text-sm outline-none placeholder-gray-400" />
                        <CalendarIcon className="w-4 h-4 text-gray-400 absolute left-2.5 top-2" />
                    </div>
                    <span className="ml-2">到期</span>
                </label>
            </div>
        </FormRow>
        <FormRow label="每人限換">
            <input type="text" placeholder="請輸入數字" className="w-32 bg-white border border-gray-300 rounded shadow-sm text-sm px-3 py-2 outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500" />
        </FormRow>
      </FormSection>
      
      {/* Detail Page Section */}
      <FormSection title="票券詳細頁">
         <FormRow label="備註">
             <textarea 
                rows={5}
                placeholder="備註內容將顯示於票券頁面上方，最多可輸入1000字"
                className="w-full bg-white border border-gray-300 rounded text-sm p-3 outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 resize-none shadow-sm"
             ></textarea>
         </FormRow>
         <FormRow label="說明" required>
             <div>
                <RichTextEditorToolbar />
                <textarea 
                    rows={6}
                    placeholder="請輸入內文"
                    className="w-full bg-white border border-gray-300 border-t-0 rounded-b text-sm p-3 outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 resize-none shadow-sm"
                ></textarea>
             </div>
         </FormRow>
      </FormSection>
      
      {/* Keywords Section */}
      <FormSection title="關鍵字">
          <div className="mb-2 text-sm text-gray-700">
              <span className="font-semibold mr-1">搜尋關鍵字:</span>
              <span className="text-gray-500">(增加票券被搜尋的機率)</span>
          </div>
          <textarea 
            rows={2}
            placeholder="最多可輸入10個關鍵字，關鍵字之間請輸入半形逗號(例如: 原創設計,)"
            className="w-full bg-white border border-gray-300 rounded text-sm p-3 outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 resize-none shadow-sm"
          ></textarea>
      </FormSection>

      {/* Action Buttons */}
      <div className="flex justify-center items-center space-x-4 pt-4 pb-12">
        <button 
            className="bg-blue-500 text-white px-8 py-1.5 rounded hover:bg-blue-600 font-medium text-sm"
        >儲存</button>
        <button 
            className="bg-blue-500 text-white px-8 py-1.5 rounded hover:bg-blue-600 font-medium text-sm opacity-80"
        >上架</button>
        <button 
            onClick={() => setCurrentPage('ticketManagement')} 
            className="bg-gray-400 text-white px-8 py-1.5 rounded hover:bg-gray-500 font-medium text-sm"
        >取消</button>
      </div>
    </div>
  );
};

export default AddGroupBuyVoucherContent;
