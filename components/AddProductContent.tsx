import React, { useState } from 'react';
import { Page } from '../App';

interface AddProductContentProps {
  setCurrentPage: (page: Page) => void;
}

const AddProductContent: React.FC<AddProductContentProps> = ({ setCurrentPage }) => {
  const [maxDiscount, setMaxDiscount] = useState<number>(10);
  const [salesCommission, setSalesCommission] = useState<number>(10);
  const [originalPrice, setOriginalPrice] = useState<number | ''>('');
  const platformFee = 5; // 假設平台抽成為 5%，實際會依店家方案變動

  const discountedPrice = originalPrice ? Math.floor(Number(originalPrice) * (1 - maxDiscount / 100)) : 0;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-800 mb-4">新增商品</h1>
        <button 
          onClick={() => setCurrentPage('mallProducts')}
          className="flex items-center text-gray-600 hover:text-gray-900 transition-colors text-sm"
        >
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
          </svg>
          返回上一層
        </button>
      </div>

      <div className="bg-[#f0f2f5] border border-gray-200 rounded-lg space-y-6">
        
        {/* Section 1: 圖片 */}
        <div className="p-6 pb-0">
          <div className="flex items-start">
            <label className="w-32 flex justify-end items-center text-gray-700 pr-6 mt-4">
              <span className="text-red-500 mr-1">•</span> 圖片:
            </label>
            <div className="w-40 h-40 border border-blue-300 border-dashed rounded flex flex-col items-center justify-center cursor-pointer hover:bg-blue-50 transition-colors bg-white">
              <svg className="w-8 h-8 text-[#409eff] mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
              </svg>
              <div className="flex items-center text-[#409eff] text-sm">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
                上傳圖片
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: 基本資料 */}
        <div className="px-6 border-t border-gray-200 pt-6">
          <h2 className="text-lg font-medium text-gray-800 mb-6">基本資料</h2>
          <div className="space-y-6">
            <div className="flex items-center">
              <label className="w-32 flex justify-end items-center text-gray-700 pr-6 shrink-0">
                <span className="text-red-500 mr-1">•</span> 名稱:
              </label>
              <input type="text" placeholder="1-50字" className="flex-1 bg-white border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500" />
            </div>

            <div className="flex items-center gap-12">
              <div className="flex-1 flex items-center">
                <label className="w-32 flex justify-end items-center text-gray-700 pr-6 shrink-0">
                  <span className="text-red-500 mr-1">•</span> 類別:
                </label>
                <div className="relative flex-1">
                  <select className="w-full bg-white border border-gray-300 rounded px-3 py-2 text-sm appearance-none focus:outline-none focus:border-blue-500 text-gray-400">
                    <option value="" disabled selected>請選擇</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                  </div>
                </div>
              </div>
              <div className="flex-1 flex items-center">
                <label className="w-32 flex justify-end items-center text-gray-700 pr-6 shrink-0">
                  <span className="text-red-500 mr-1">•</span> 所屬官方帳號:
                </label>
                <div className="relative flex-1">
                  <select className="w-full bg-white border border-gray-300 rounded px-3 py-2 text-sm appearance-none focus:outline-none focus:border-blue-500 text-gray-400">
                    <option value="" disabled selected>請輸入關鍵字</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center">
              <label className="w-32 flex justify-end items-center text-gray-700 pr-6 shrink-0">
                <span className="text-red-500 mr-1">•</span> 庫存:
              </label>
              <input type="text" placeholder="請輸入數字" className="w-[calc(50%-1.5rem)] bg-white border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500" />
            </div>
          </div>
        </div>

        {/* Section X: 價格設定 */}
        <div className="px-6 border-t border-gray-200 pt-6">
          <h2 className="text-lg font-medium text-gray-800 mb-6">價格設定</h2>
          <div className="flex flex-col sm:flex-row gap-4 flex-wrap">
              <div className="flex flex-col">
                  <div className="flex items-center">
                      <label className="w-32 flex justify-end items-center text-sm text-gray-700 mr-4 shrink-0">
                          <span className="text-red-500 mr-1">•</span>原價:
                      </label>
                      <input 
                          type="number" 
                          placeholder="填寫原價" 
                          className="w-32 bg-white border border-gray-300 rounded shadow-sm text-sm px-3 py-2 outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                          value={originalPrice}
                          onChange={(e) => setOriginalPrice(e.target.value === '' ? '' : Number(e.target.value))}
                      />
                  </div>
                  <div className="flex justify-end pr-[4.5rem]">
                      <span className="text-xs text-gray-500 mt-1 h-4">
                          折扣後: ${originalPrice !== '' ? discountedPrice : '0'}
                      </span>
                  </div>
              </div>
              <div className="flex items-center pb-5">
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
              <div className="flex items-center pb-5">
                  <label className="flex items-center text-sm text-gray-700 mr-2 relative group cursor-help">
                      <span className="text-red-500 mr-1">•</span>銷售分潤%:
                      <svg className="w-4 h-4 text-gray-400 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                      
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-64 p-2.5 bg-gray-800 text-white text-xs rounded shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10 leading-relaxed font-normal text-left pointer-events-none">
                          此為推薦或分銷人員推廣此商品時可獲得的銷售分潤比例。
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
              <div className="flex items-center pb-5">
                  <span className="text-sm text-gray-700 bg-gray-100 px-3 py-2 rounded-md border border-gray-200 shadow-sm flex items-center">
                      預估總讓利：<span className="font-semibold text-blue-600 ml-1 mr-1">{maxDiscount + salesCommission + platformFee}%</span> 
                      <span className="text-xs text-gray-500 ml-1">(含平台抽成及銷售分潤)</span>
                  </span>
              </div>
          </div>
        </div>

        {/* Section 3: 商品詳情頁 */}
        <div className="px-6 border-t border-gray-200 pt-6">
          <h2 className="text-lg font-medium text-gray-800 mb-6">商品詳情頁</h2>
          <div className="space-y-6">
            <div className="flex items-start">
              <label className="w-32 flex justify-end items-center text-gray-700 pr-6 pt-2">
                備註:
              </label>
              <textarea 
                placeholder="備註內容將顯示於商品頁面上方，最多可輸入1000字" 
                className="flex-1 bg-white border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500 h-32 resize-y"
              />
            </div>
            
            <div className="flex items-start">
              <label className="w-32 flex justify-end items-center text-gray-700 pr-6 pt-2">
                <span className="text-red-500 mr-1">•</span> 說明:
              </label>
              <div className="flex-1 bg-white border border-gray-300 rounded overflow-hidden">
                <div className="bg-white border-b border-gray-200 px-3 py-2 flex items-center gap-2 flex-wrap text-gray-600">
                  <span className="font-bold cursor-pointer hover:bg-gray-100 px-1 rounded">B</span>
                  <span className="italic cursor-pointer hover:bg-gray-100 px-1 rounded">I</span>
                  <span className="underline cursor-pointer hover:bg-gray-100 px-1 rounded">U</span>
                  <span className="line-through cursor-pointer hover:bg-gray-100 px-1 rounded">S</span>
                  <span className="text-gray-300 mx-1">|</span>
                  <span className="font-serif font-bold cursor-pointer hover:bg-gray-100 px-1 rounded">"</span>
                  <span className="font-mono cursor-pointer hover:bg-gray-100 px-1 rounded">&lt;/&gt;</span>
                  <span className="font-bold cursor-pointer hover:bg-gray-100 px-1 rounded text-sm">H₁</span>
                  <span className="font-bold cursor-pointer hover:bg-gray-100 px-1 rounded text-sm">H₂</span>
                  <span className="text-gray-300 mx-1">|</span>
                  <svg className="w-4 h-4 cursor-pointer hover:bg-gray-100" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                  <svg className="w-4 h-4 cursor-pointer hover:bg-gray-100" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path></svg>
                  <span className="text-gray-300 mx-1">|</span>
                  <span className="text-xs cursor-pointer hover:bg-gray-100 px-1 rounded">X₂</span>
                  <span className="text-xs cursor-pointer hover:bg-gray-100 px-1 rounded">X²</span>
                  <span className="text-gray-300 mx-1">|</span>
                  <svg className="w-4 h-4 cursor-pointer hover:bg-gray-100" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7"></path></svg>
                  <svg className="w-4 h-4 cursor-pointer hover:bg-gray-100" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
                  <span className="text-gray-300 mx-1">|</span>
                  <span className="text-sm cursor-pointer hover:bg-gray-100 px-1 rounded flex items-center">Normal <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg></span>
                  <span className="text-sm cursor-pointer hover:bg-gray-100 px-1 rounded flex items-center">Normal <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg></span>
                  <span className="text-sm cursor-pointer hover:bg-gray-100 px-1 rounded">A</span>
                  <span className="text-sm cursor-pointer hover:bg-gray-100 px-1 rounded bg-gray-200">A</span>
                  <span className="text-sm cursor-pointer hover:bg-gray-100 px-1 rounded flex items-center">Sans Serif <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg></span>
                  <span className="text-gray-300 mx-1">|</span>
                  <svg className="w-4 h-4 cursor-pointer hover:bg-gray-100" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"></path></svg>
                  <svg className="w-4 h-4 cursor-pointer hover:bg-gray-100" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                  <svg className="w-4 h-4 cursor-pointer hover:bg-gray-100" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
                  <span className="text-gray-300 mx-1">|</span>
                  <span className="font-bold cursor-pointer hover:bg-gray-100 px-1 rounded text-sm">&lt;/&gt;</span>
                </div>
                <div className="h-48 p-3 overflow-y-auto">
                  <p className="text-gray-400 text-sm">請輸入內文</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 4: 關鍵字 */}
        <div className="px-6 border-t border-gray-200 pt-6 pb-4">
          <h2 className="text-lg font-medium text-gray-800 mb-2">關鍵字:</h2>
          <div className="flex items-center text-sm text-gray-700 mb-2">
            <span className="font-medium mr-2">搜尋關鍵字:</span>
            <span className="text-gray-500">(增加商品被搜尋的機率)</span>
          </div>
          <div>
            <textarea 
              className="w-full bg-white border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500 h-16 resize-none mb-1"
            />
            <p className="text-sm text-gray-500">
              最多可輸入10個關鍵字，關鍵字之間請輸入半形逗號(例如: 原創設計,)
            </p>
          </div>
        </div>

        {/* Bottom Buttons */}
        <div className="flex justify-center gap-4 pt-6 pb-6 bg-[#e6ebf1] rounded-b-lg border-t border-gray-200">
          <button className="px-6 py-2 bg-[#409eff] hover:bg-blue-500 text-white text-sm rounded shadow-sm transition-colors w-24">
            儲存
          </button>
          <button className="px-6 py-2 bg-[#409eff] hover:bg-blue-500 text-white text-sm rounded shadow-sm transition-colors w-24">
            上架
          </button>
          <button 
            onClick={() => setCurrentPage('mallProducts')}
            className="px-6 py-2 bg-[#909399] hover:bg-gray-500 text-white text-sm rounded shadow-sm transition-colors w-24"
          >
            取消
          </button>
        </div>

      </div>
    </div>
  );
};

export default AddProductContent;
