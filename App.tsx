
import React, { useState, useMemo } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import ExportSvgButton from './components/ExportSvgButton';
import MyAccountContent from './components/MyAccountContent';
import BasicSettingsContent from './components/BasicSettingsContent';
import TicketManagementContent from './components/TicketManagementContent';
import AddVoucherContent from './components/AddVoucherContent';
import AddGroupBuyVoucherContent from './components/AddGroupBuyVoucherContent';
import RoleListContent from './components/RoleListContent';
import RoleDetailContent from './components/RoleDetailContent';
import ShoppingCreditSettingsContent from './components/ShoppingCreditSettingsContent';
import Login from './components/Login';
import Register from './components/Register';
import VerifyPhone from './components/VerifyPhone';
import StoreInfo from './components/StoreInfo';
import RegistrationComplete from './components/RegistrationComplete';
import DevProgressButton from './components/DevProgressButton';
import DevProgressModal from './components/DevProgressModal';
import ChangeLogButton from './components/ChangeLogButton';
import ChangeLogModal from './components/ChangeLogModal';
import FlowCaptureButton from './components/FlowCaptureButton';
import FlowCaptureTool from './components/FlowCaptureTool';
import { CapturedStep } from './components/FlowCaptureTool';
import DebugLogButton from './components/DebugLogButton';
import DebugLogModal, { LogEntry } from './components/DebugLogModal';

import MallProductsContent from './components/MallProductsContent';
import AddProductContent from './components/AddProductContent';
import AllOrdersContent from './components/AllOrdersContent';
import ProfitTargetsContent from './components/ProfitTargetsContent';
import UserBindingRecordsContent from './components/UserBindingRecordsContent';
import VerificationRecordsContent from './components/VerificationRecordsContent';
import MemberListContent from './components/MemberListContent';
import MemberDetailContent from './components/MemberDetailContent';
import RegistrationSourcesContent from './components/RegistrationSourcesContent';

import RequirementsListPanel from './components/RequirementsListPanel';

export type Page = 'myAccount' | 'basicSettings' | 'ticketManagement' | 'addVoucher' | 'addGroupBuyVoucher' | 'shoppingCreditSettings' | 'mallProducts' | 'allOrders' | 'profitTargets' | 'userBindingRecords' | 'roleList' | 'roleCategories' | 'suspendedAccounts' | 'deletedAccounts' | 'roleDetail' | 'verificationRecords' | 'rewardPointsInfo' | 'addProduct' | 'memberList' | 'memberTags' | 'memberCategoryEdit' | 'memberDetail' | 'registrationSources';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [authPage, setAuthPage] = useState<'login' | 'register' | 'verifyPhone' | 'storeInfo' | 'registrationComplete'>('login');
  const [currentPage, setCurrentPage] = useState<Page>('memberDetail');
  const [isBasicSettingsComplete, setIsBasicSettingsComplete] = useState(false);
  const [isVoucherCreationComplete, setIsVoucherCreationComplete] = useState(false);
  const [isDevModalOpen, setIsDevModalOpen] = useState(false);
  const [isChangeLogModalOpen, setIsChangeLogModalOpen] = useState(false);
  const [isCaptureModeActive, setIsCaptureModeActive] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [initialLogAction, setInitialLogAction] = useState<string | null>(null);

  // Layout & Split Screen State
  const [isReqPanelOpen, setIsReqPanelOpen] = useState(true);
  const [selectedPageId, setSelectedPageId] = useState<string>('B-23');

  // Debug Log State
  const [isDebugLogModalOpen, setIsDebugLogModalOpen] = useState(false);
  const [debugLogs, setDebugLogs] = useState<LogEntry[]>([]);

  const addDebugLog = (title: string, content: string, type: 'request' | 'response' | 'error') => {
      const now = new Date();
      const timeStr = now.toLocaleTimeString('zh-TW', { hour12: false, hour: '2-digit', minute:'2-digit', second:'2-digit' });
      const ms = now.getMilliseconds().toString().padStart(3, '0');
      
      setDebugLogs(prevLogs => [
          {
              id: Date.now(),
              timestamp: `${timeStr}.${ms}`,
              title,
              content,
              type
          },
          ...prevLogs
      ]);
  };

  const currentPageInfo = useMemo(() => {
    if (!isLoggedIn) {
      switch (authPage) {
        case 'login': return { id: 'P-01', name: '登入頁' };
        case 'register': return { id: 'P-02', name: '註冊頁' };
        case 'verifyPhone': return { id: 'P-03', name: '驗證手機號碼' };
        case 'storeInfo': return { id: 'P-04', name: '填寫店家資訊' };
        case 'registrationComplete': return { id: 'P-05', name: '恭喜完成註冊' };
        default: return { id: 'P-01', name: '登入頁' };
      }
    } else {
      switch (currentPage) {
        case 'myAccount': return { id: 'B-01', name: '我的帳號' };
        case 'basicSettings': return { id: 'B-02', name: '基本設定' };
        case 'ticketManagement': return { id: 'B-03', name: '票券管理' };
        case 'addVoucher': return { id: 'B-04', name: '新增優惠券' };
        case 'addGroupBuyVoucher': return { id: 'B-10', name: '新增票券' };
        case 'shoppingCreditSettings': return { id: 'B-05', name: '註冊/推薦獎勵設定' };
        case 'mallProducts': return { id: 'B-06', name: '商品管理' };
        case 'addProduct': return { id: 'B-18', name: '新增商品' };
        case 'allOrders': return { id: 'B-07', name: '所有訂單' };
        case 'profitTargets': return { id: 'B-08', name: '分潤對象' };
        case 'userBindingRecords': return { id: 'B-09', name: '用戶分潤綁定' };
        case 'roleList': return { id: 'B-11', name: '角色名單' };
        case 'roleDetail': return { id: 'B-12', name: '角色詳情' };
        case 'roleCategories': return { id: 'B-13', name: '角色類別' };
        case 'suspendedAccounts': return { id: 'B-14', name: '下架帳號名單' };
        case 'deletedAccounts': return { id: 'B-15', name: '刪除帳號名單' };
        case 'verificationRecords': return { id: 'B-16', name: '核銷紀錄' };
        case 'rewardPointsInfo': return { id: 'B-17', name: '回饋點數說明' };
        case 'memberList': return { id: 'B-20', name: '會員名單' };
        case 'memberTags': return { id: 'B-21', name: '會員標籤' };
        case 'memberCategoryEdit': return { id: 'B-22', name: '會員類別編輯' };
        case 'memberDetail': return { id: 'B-23', name: '會員詳情' };
        case 'registrationSources': return { id: 'B-24', name: '註冊來源' };
        default: return { id: 'B-01', name: '我的帳號' };
      }
    }
  }, [isLoggedIn, authPage, currentPage]);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  const handleSitemapNavigate = (pageId: string) => {
    setSelectedPageId(pageId);

    switch (pageId) {
      // Auth Pages
      case 'P-01':
        setIsLoggedIn(false);
        setAuthPage('login');
        break;
      case 'P-02':
        setIsLoggedIn(false);
        setAuthPage('register');
        break;
      case 'P-03':
        setIsLoggedIn(false);
        setAuthPage('verifyPhone');
        break;
      case 'P-04':
        setIsLoggedIn(false);
        setAuthPage('storeInfo');
        break;
      case 'P-05':
        setIsLoggedIn(false);
        setAuthPage('registrationComplete');
        break;
      // Backend Pages
      case 'B-01':
        setIsLoggedIn(true);
        setCurrentPage('myAccount');
        break;
      case 'B-02':
        setIsLoggedIn(true);
        setCurrentPage('basicSettings');
        break;
      case 'B-03':
        setIsLoggedIn(true);
        setCurrentPage('ticketManagement');
        break;
      case 'B-04':
        setIsLoggedIn(true);
        setCurrentPage('addVoucher');
        break;
      case 'B-10':
        setIsLoggedIn(true);
        setCurrentPage('addGroupBuyVoucher');
        break;
      case 'B-05':
        setIsLoggedIn(true);
        setCurrentPage('shoppingCreditSettings');
        break;
      case 'B-06':
        setIsLoggedIn(true);
        setCurrentPage('mallProducts');
        break;
      case 'B-18':
        setIsLoggedIn(true);
        setCurrentPage('addProduct');
        break;
      case 'B-07':
        setIsLoggedIn(true);
        setCurrentPage('allOrders');
        break;
      case 'B-08':
        setIsLoggedIn(true);
        setCurrentPage('profitTargets');
        break;
      case 'B-09':
        setIsLoggedIn(true);
        setCurrentPage('userBindingRecords');
        break;
      case 'B-11':
        setIsLoggedIn(true);
        setCurrentPage('roleList');
        break;
      case 'B-12':
        setIsLoggedIn(true);
        setCurrentPage('roleDetail');
        break;
      case 'B-13':
        setIsLoggedIn(true);
        setCurrentPage('roleCategories');
        break;
      case 'B-14':
        setIsLoggedIn(true);
        setCurrentPage('suspendedAccounts');
        break;
      case 'B-15':
        setIsLoggedIn(true);
        setCurrentPage('deletedAccounts');
        break;
      case 'B-16':
        setIsLoggedIn(true);
        setCurrentPage('verificationRecords');
        break;
      case 'B-17':
        setIsLoggedIn(true);
        setCurrentPage('rewardPointsInfo');
        break;
      case 'B-20':
        setIsLoggedIn(true);
        setCurrentPage('memberList');
        break;
      case 'B-21':
        setIsLoggedIn(true);
        setCurrentPage('memberTags');
        break;
      case 'B-22':
        setIsLoggedIn(true);
        setCurrentPage('memberCategoryEdit');
        break;
      case 'B-23':
        setIsLoggedIn(true);
        setCurrentPage('memberDetail');
        break;
      case 'B-24':
        setIsLoggedIn(true);
        setCurrentPage('registrationSources');
        break;
      default:
        return;
    }
    setIsDevModalOpen(false);
  };

  const handleCaptureComplete = (steps: CapturedStep[]) => {
    let action = '';
    
    if (steps.length === 1) {
      // Single-point analysis mode
      const step = steps[0];
      action = `使用者點擊了位於「${currentPageInfo.name}」頁面上的「${step.name}」元件 (ID: ${step.id})。請將這個互動視為一個流程的起點，分析並繪製出從點擊此元件開始的**完整使用者流程**。你的分析需要包含所有**可能的分支路徑**（例如：成功後的結果、失敗或錯誤的提示、不同選項導致的不同頁面等），以產出一份涵蓋各種情境的詳細 UI 流程圖與對應的變更紀錄。`;
    } else {
      // Multi-step flow recording mode
      const formattedSteps = steps.map((step, index) => `${index + 1}. 元件名稱: "${step.name}" (ID: ${step.id})`).join('\n');
      action = `使用者依序執行了以下操作：\n${formattedSteps}\n\n請根據這個操作流程，為我生成一份專業的需求變更紀錄與對應的 UI 流程圖。在繪製流程圖時，請不僅僅展示此單一路徑，也要主動思考並包含此流程中**所有可能存在的相關分支或替代路徑**（例如，成功 vs. 失敗、不同選項的後果等），以提供一個更完整的視圖。`;
    }

    setInitialLogAction(action);
    setIsChangeLogModalOpen(true);
    setIsCaptureModeActive(false);
  };

  const renderContent = () => {
    switch (currentPage) {
      case 'ticketManagement':
        return <TicketManagementContent setCurrentPage={setCurrentPage} />;
      case 'addVoucher':
        return <AddVoucherContent 
                  setCurrentPage={setCurrentPage} 
                  setIsVoucherCreationComplete={setIsVoucherCreationComplete}
                  isBasicSettingsComplete={isBasicSettingsComplete}
                  isVoucherCreationComplete={isVoucherCreationComplete}
                />;
      case 'addGroupBuyVoucher':
        return <AddGroupBuyVoucherContent setCurrentPage={setCurrentPage} />;
      case 'basicSettings':
        return <BasicSettingsContent 
                  setIsBasicSettingsComplete={setIsBasicSettingsComplete} 
                  setCurrentPage={setCurrentPage}
                  isVoucherCreationComplete={isVoucherCreationComplete} 
                  isBasicSettingsComplete={isBasicSettingsComplete}
                />;
      case 'shoppingCreditSettings':
        return <ShoppingCreditSettingsContent />;
      case 'mallProducts':
        return <MallProductsContent setCurrentPage={setCurrentPage} />;
      case 'addProduct':
        return <AddProductContent setCurrentPage={setCurrentPage} />;
      case 'allOrders':
        return <AllOrdersContent />;
      case 'profitTargets':
        return <ProfitTargetsContent />;
      case 'userBindingRecords':
        return <UserBindingRecordsContent />;
      case 'roleList':
        return <RoleListContent setCurrentPage={setCurrentPage} />;
      case 'roleDetail':
        return <RoleDetailContent setCurrentPage={setCurrentPage} />;
      case 'roleCategories':
        return (
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex items-center justify-center min-h-[400px]">
            <p className="text-gray-500 text-lg">角色類別頁面 (尚未實作)</p>
          </div>
        );
      case 'suspendedAccounts':
        return (
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex items-center justify-center min-h-[400px]">
            <p className="text-gray-500 text-lg">下架帳號名單 (尚未實作)</p>
          </div>
        );
      case 'deletedAccounts':
        return (
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex items-center justify-center min-h-[400px]">
            <p className="text-gray-500 text-lg">刪除帳號名單 (尚未實作)</p>
          </div>
        );
      case 'memberList':
        return <MemberListContent setCurrentPage={setCurrentPage} />;
      case 'memberTags':
        return (
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex items-center justify-center min-h-[400px]">
            <p className="text-gray-500 text-lg">會員標籤 (尚未實作)</p>
          </div>
        );
      case 'memberCategoryEdit':
        return (
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex items-center justify-center min-h-[400px]">
            <p className="text-gray-500 text-lg">會員類別編輯 (尚未實作)</p>
          </div>
        );
      case 'memberDetail':
        return <MemberDetailContent setCurrentPage={setCurrentPage} />;
      case 'registrationSources':
        return <RegistrationSourcesContent setCurrentPage={setCurrentPage} />;
      case 'verificationRecords':
        return <VerificationRecordsContent />;
      case 'rewardPointsInfo':
        return (
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex items-center justify-center min-h-[400px]">
            <p className="text-gray-500 text-lg">回饋點數說明 (尚未實作)</p>
          </div>
        );
      case 'myAccount':
      default:
        return <MyAccountContent 
                  setCurrentPage={setCurrentPage} 
                  isBasicSettingsComplete={isBasicSettingsComplete} 
                  isVoucherCreationComplete={isVoucherCreationComplete}
                />;
    }
  };

  const renderAuthContent = () => {
    switch (authPage) {
      case 'register':
        return <Register onSwitchToLogin={() => setAuthPage('login')} onRegisterSuccess={() => setAuthPage('verifyPhone')} />;
      case 'verifyPhone':
        return <VerifyPhone onSwitchToRegister={() => setAuthPage('register')} onVerifySuccess={() => setAuthPage('storeInfo')} />;
      case 'storeInfo':
        return <StoreInfo onBackToVerify={() => setAuthPage('verifyPhone')} onStoreInfoSuccess={() => setAuthPage('registrationComplete')} />;
      case 'registrationComplete':
        return <RegistrationComplete onComplete={handleLoginSuccess} />;
      case 'login':
      default:
        return <Login onLoginSuccess={handleLoginSuccess} onSwitchToRegister={() => setAuthPage('register')} />;
    }
  }

  const handleCloseChangeLog = () => {
    setIsChangeLogModalOpen(false);
    setInitialLogAction(null); // Reset action when modal closes
  }

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-slate-100 font-sans antialiased text-slate-800">
      {/* Left Panel: Requirements List */}
      <RequirementsListPanel
        isOpen={isReqPanelOpen}
        onToggle={() => setIsReqPanelOpen(!isReqPanelOpen)}
        onNavigatePage={handleSitemapNavigate}
        selectedPageId={selectedPageId}
      />

      {/* Right Stage Panel */}
      <div className="flex-1 flex flex-col h-full overflow-hidden relative">
        {/* Right Stage Main Content */}
        <div className="flex-1 overflow-hidden relative">
          {isLoggedIn ? (
            <div className="flex h-full bg-gray-100 font-sans antialiased text-gray-800 overflow-hidden">
              <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} isOpen={isSidebarOpen} />
              <div className="flex-1 flex flex-col overflow-hidden">
                <Header currentPage={currentPage} setCurrentPage={setCurrentPage} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-[#f0f2f5]">
                  <div className="container mx-auto px-6 py-8">
                    {renderContent()}
                  </div>
                </main>
              </div>
            </div>
          ) : (
            <div className="h-full overflow-y-auto bg-gray-50">
              {renderAuthContent()}
            </div>
          )}
        </div>
      </div>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 z-[90] flex items-center space-x-3">
        <ExportSvgButton />
        <FlowCaptureButton onClick={() => setIsCaptureModeActive(true)} />
        <ChangeLogButton onClick={() => setIsChangeLogModalOpen(true)} />
        <DevProgressButton 
          onClick={() => setIsDevModalOpen(true)}
          pageId={currentPageInfo.id}
          pageName={currentPageInfo.name}
        />
        <DebugLogButton onClick={() => setIsDebugLogModalOpen(true)} />
      </div>

      <DevProgressModal isOpen={isDevModalOpen} onClose={() => setIsDevModalOpen(false)} onNavigate={handleSitemapNavigate} />
      <ChangeLogModal 
        isOpen={isChangeLogModalOpen} 
        onClose={handleCloseChangeLog} 
        initialUserAction={initialLogAction}
        onAddDebugLog={addDebugLog}
      />
      <DebugLogModal 
        isOpen={isDebugLogModalOpen}
        onClose={() => setIsDebugLogModalOpen(false)}
        logs={debugLogs}
      />
      {isCaptureModeActive && (
        <FlowCaptureTool 
          onCancel={() => setIsCaptureModeActive(false)}
          onComplete={handleCaptureComplete}
        />
      )}
    </div>
  );
};

export default App;
