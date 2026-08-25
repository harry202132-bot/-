import React from 'react';

interface DevProgressModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (pageId: string) => void;
}

const PageItem: React.FC<{ id: string; name: string; description: string; isFuture?: boolean; onNavigate: (pageId: string) => void }> = ({ id, name, description, isFuture, onNavigate }) => (
  <button
    onClick={() => onNavigate(id)}
    disabled={isFuture}
    className={`w-full flex items-start space-x-4 p-3 rounded-lg text-left ${isFuture ? 'cursor-not-allowed' : 'hover:bg-gray-100'} transition-colors disabled:opacity-50`}
  >
    <div className={`font-bold text-sm rounded-md w-14 h-8 flex items-center justify-center shrink-0 ${isFuture ? 'bg-gray-100 text-gray-400' : 'bg-indigo-100 text-indigo-700'}`}>{id}</div>
    <div className={isFuture ? 'text-gray-400' : ''}>
      <p className={`font-semibold ${isFuture ? '' : 'text-gray-800'}`}>{name}</p>
      <p className="text-sm">{description}</p>
    </div>
  </button>
);

const DevProgressModal: React.FC<DevProgressModalProps> = ({ isOpen, onClose, onNavigate }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-60 z-[100] flex justify-center items-center"
      aria-labelledby="dev-modal-title"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl shadow-xl w-full max-w-2xl m-4 transform transition-all"
        onClick={e => e.stopPropagation()}
      >
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-900" id="dev-modal-title">
            Sitemap
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
            aria-label="關閉"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="p-6 max-h-[70vh] overflow-y-auto">
          <p className="text-sm text-gray-600 mb-6 bg-gray-50 p-3 rounded-md border border-gray-200">
            您好！這裡是目前已完成的頁面結構。您可以點擊指定項目直接前往該頁面。標示為<span className="text-gray-400">灰色</span>的項目為尚未實作的頁面。
          </p>
          <div className="space-y-6">
            <div>
              <h4 className="font-bold text-gray-700 mb-2">登入/註冊流程</h4>
              <div className="space-y-2 border border-gray-200 rounded-lg p-2">
                <PageItem id="P-01" name="登入頁" description="使用者登入系統的入口，包含帳號密碼輸入。" onNavigate={onNavigate}/>
                <div>
                  <PageItem id="P-02" name="註冊頁" description="新使用者輸入手機號碼進行註冊。" onNavigate={onNavigate}/>
                  <div className="pl-8 ml-7 pt-2 border-l-2 border-gray-200 space-y-2">
                     <PageItem id="P-03" name="驗證手機號碼" description="輸入簡訊驗證碼以完成手機驗證。" onNavigate={onNavigate}/>
                     <PageItem id="P-04" name="填寫店家資訊" description="建立商店的基本資料，包含地址、產業等。" onNavigate={onNavigate}/>
                     <PageItem id="P-05" name="恭喜完成註冊" description="顯示註冊成功訊息。" onNavigate={onNavigate} />
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-bold text-gray-700 mb-2">後台管理介面 (依選單結構)</h4>
              <div className="space-y-2 border border-gray-200 rounded-lg p-2">
                <div>
                  <h5 className="text-sm font-semibold text-gray-500 mb-1 px-3 mt-2">帳號管理</h5>
                  <PageItem id="B-01" name="我的帳號" description="顯示使用者資訊與權限，並包含新手上路引導。" onNavigate={onNavigate}/>
                </div>
                
                <div className="pt-2 border-t border-gray-100">
                  <h5 className="text-sm font-semibold text-gray-500 mb-1 px-3 mt-2">店家管理</h5>
                  <div>
                    <PageItem id="B-03" name="票券管理" description="管理與瀏覽所有已建立的票券列表。" onNavigate={onNavigate}/>
                    <div className="pl-8 ml-7 pt-2 border-l-2 border-gray-200">
                      <PageItem id="B-04" name="新增優惠券" description="建立新優惠券的表單頁面，從「票券管理」進入。" onNavigate={onNavigate}/>
                      <PageItem id="B-10" name="新增票券" description="建立新票券的表單頁面，從「票券管理」進入。" onNavigate={onNavigate}/>
                    </div>
                  </div>
                  <PageItem id="B-FUTURE" name="發送活動" description="尚未實作" isFuture={true} onNavigate={onNavigate}/>
                </div>

                <div className="pt-2 border-t border-gray-100">
                  <h5 className="text-sm font-semibold text-gray-500 mb-1 px-3 mt-2">商城管理</h5>
                  <div>
                    <PageItem id="B-06" name="商品管理" description="管理與瀏覽商城裡的商品列表。" onNavigate={onNavigate}/>
                    <div className="pl-8 ml-7 pt-2 border-l-2 border-gray-200">
                      <PageItem id="B-18" name="新增商品" description="建立新商品的表單頁面，從「商品管理」進入。" onNavigate={onNavigate}/>
                    </div>
                  </div>
                  <PageItem id="B-07" name="所有訂單" description="管理與瀏覽商城裡的訂單列表。" onNavigate={onNavigate}/>
                </div>

                <div className="pt-2 border-t border-gray-100">
                  <h5 className="text-sm font-semibold text-gray-500 mb-1 px-3 mt-2">平台設定</h5>
                  <PageItem id="B-02" name="基本設定" description="設定商店的基本資料，如名稱、地址、頭像等。" onNavigate={onNavigate}/>
                  <PageItem id="B-FUTURE" name="權限管理" description="尚未實作" isFuture={true} onNavigate={onNavigate}/>
                  <PageItem id="B-05" name="註冊/推薦獎勵設定 (總後台)" description="總後台專用功能，用於設定新用戶與推廣註冊的購物金發放規則。" onNavigate={onNavigate}/>
                  <PageItem id="B-FUTURE" name="LINE OA 串接" description="尚未實作" isFuture={true} onNavigate={onNavigate}/>
                </div>
                
                <div className="pt-2 border-t border-gray-100">
                  <h5 className="text-sm font-semibold text-gray-500 mb-1 px-3 mt-2">分潤管理</h5>
                  <PageItem id="B-08" name="分潤對象" description="已實作基本版面" isFuture={false} onNavigate={onNavigate}/>
                  <PageItem id="B-09" name="用戶分潤綁定" description="已實作查詢版面" isFuture={false} onNavigate={onNavigate}/>
                  <PageItem id="B-FUTURE" name="獎金紀錄" description="尚未實作" isFuture={true} onNavigate={onNavigate}/>
                  <PageItem id="B-FUTURE" name="分潤紀錄" description="尚未實作" isFuture={true} onNavigate={onNavigate}/>
                  <PageItem id="B-FUTURE" name="分潤明細" description="尚未實作" isFuture={true} onNavigate={onNavigate}/>
                </div>

                <div className="pt-2 border-t border-gray-100">
                  <h5 className="text-sm font-semibold text-gray-500 mb-1 px-3 mt-2">角色管理</h5>
                  <PageItem id="B-11" name="角色名單" description="管理與瀏覽所有建立的角色列表" isFuture={false} onNavigate={onNavigate}/>
                  <div className="pl-8 ml-7 pt-2 border-l-2 border-gray-200">
                      <PageItem id="B-12" name="角色詳情 (商家)" description="檢視該角色所包含的帳號詳細名單" isFuture={false} onNavigate={onNavigate}/>
                  </div>
                  <PageItem id="B-13" name="角色類別" description="建立空白頁面" isFuture={false} onNavigate={onNavigate}/>
                  <PageItem id="B-14" name="下架帳號名單" description="建立空白頁面" isFuture={false} onNavigate={onNavigate}/>
                  <PageItem id="B-15" name="刪除帳號名單" description="建立空白頁面" isFuture={false} onNavigate={onNavigate}/>
                </div>

                <div className="pt-2 border-t border-gray-100">
                  <h5 className="text-sm font-semibold text-gray-500 mb-1 px-3 mt-2">交易管理</h5>
                  <PageItem id="B-16" name="核銷紀錄" description="建立核銷紀錄頁面" isFuture={false} onNavigate={onNavigate}/>
                  <PageItem id="B-17" name="回饋點數說明" description="建立空白頁面" isFuture={false} onNavigate={onNavigate}/>
                </div>

                <div className="pt-2 border-t border-gray-100">
                  <h5 className="text-sm font-semibold text-gray-500 mb-1 px-3 mt-2">其他模組</h5>
                  <PageItem id="B-FUTURE" name="直播" description="尚未實作" isFuture={true} onNavigate={onNavigate}/>
                  <PageItem id="B-FUTURE" name="訊息管理" description="尚未實作" isFuture={true} onNavigate={onNavigate}/>
                  <PageItem id="B-FUTURE" name="會員管理" description="尚未實作" isFuture={true} onNavigate={onNavigate}/>
                  <PageItem id="B-FUTURE" name="財務管理" description="尚未實作" isFuture={true} onNavigate={onNavigate}/>
                  <PageItem id="B-FUTURE" name="活動" description="尚未實作" isFuture={true} onNavigate={onNavigate}/>
                  <PageItem id="B-FUTURE" name="發券機器人" description="尚未實作" isFuture={true} onNavigate={onNavigate}/>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gray-50 px-6 py-4 rounded-b-xl text-right">
          <button
            onClick={onClose}
            className="bg-indigo-600 text-white px-5 py-2 rounded-md text-sm font-medium hover:bg-indigo-700 transition-colors"
          >
            關閉
          </button>
        </div>
      </div>
    </div>
  );
};

export default DevProgressModal;