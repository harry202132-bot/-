import React, { useState } from 'react';
import { BusinessLogo } from './icons';
import HelpModal from './HelpModal';

interface StoreInfoProps {
    onBackToVerify: () => void;
    onStoreInfoSuccess: () => void;
}

const Step: React.FC<{ number: string; label: string; active?: boolean; completed?: boolean }> = ({ number, label, active, completed }) => (
    <div className="flex flex-col items-center flex-shrink-0 text-center px-2">
        <div className={`w-12 h-12 rounded-full border-2 ${active || completed ? 'border-blue-500' : 'border-gray-300'} flex items-center justify-center text-xl font-bold ${active || completed ? 'text-blue-500' : 'text-gray-400'}`}>
            {number}
        </div>
        <p className={`mt-2 text-sm font-semibold ${active || completed ? 'text-gray-800' : 'text-gray-400'}`}>{label}</p>
        <div className={`mt-2 w-2 h-2 rounded-full ${active || completed ? 'bg-orange-400' : 'bg-transparent'}`}></div>
    </div>
);


const StepConnector: React.FC = () => (
    <div className="flex-1 h-px bg-gray-300 self-start mt-6 mx-2"></div>
);

const FormRow: React.FC<{ number: number; label: string; required?: boolean; children: React.ReactNode; }> = ({ number, label, required, children }) => (
    <div className="flex items-start">
        <div className="flex items-center mt-2 mr-4">
            <span className="w-6 h-6 rounded-full bg-gray-700 text-white flex items-center justify-center text-sm font-bold">{number}</span>
        </div>
        <div className="flex-1">
            <label className="text-sm font-medium text-gray-700">
                {label}
                {required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <div className="mt-1">
                {children}
            </div>
        </div>
    </div>
);


const StoreInfo: React.FC<StoreInfoProps> = ({ onBackToVerify, onStoreInfoSuccess }) => {
    const [accountName, setAccountName] = useState('');
    const [companyId, setCompanyId] = useState('');
    const [city, setCity] = useState('居住地');
    const [district, setDistrict] = useState('請選擇鄉鎮市區');
    const [address, setAddress] = useState('');
    const [industry, setIndustry] = useState('請選擇產業');
    const [salesperson, setSalesperson] = useState('');
    const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);

    return (
        <div className="min-h-full w-full bg-[#f0f2f5] font-sans">
            <div className="h-[240px] bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1572249336152-0575a13b06a8?q=80&w=2070&auto=format&fit=crop')" }}>
                 <div className="h-full w-full bg-black/40 flex flex-col items-center relative">
                    <header className="absolute top-0 left-0 right-0 h-20 flex items-center justify-between px-10">
                        <div className="flex items-center gap-3">
                            <BusinessLogo className="w-10 h-10" />
                            <div>
                                <span className="text-white text-lg tracking-wider font-semibold">共享家 Lifegiving</span>
                                <p className="text-white/80 text-xs">消費先領券・優惠多一點</p>
                            </div>
                        </div>
                        <button onClick={() => setIsHelpModalOpen(true)} className="text-white text-sm hover:underline">需要幫助？</button>
                    </header>
                    <h1 className="text-white text-4xl font-bold mt-28" style={{textShadow: '0 2px 4px rgba(0,0,0,0.5)'}}>店家申請</h1>
                 </div>
            </div>
            
            <main className="-mt-16 flex flex-col items-center px-4 z-10 relative pb-24">
                {/* Stepper */}
                <div className="flex items-start justify-center w-full max-w-xl mb-10">
                    <Step number="01" label="驗證手機號碼" completed />
                    <StepConnector />
                    <Step number="02" label="填寫店家資訊" active />
                    <StepConnector />
                    <Step number="03" label="恭喜完成註冊" />
                </div>

                {/* Store Info Form */}
                <div className="w-full max-w-2xl bg-white rounded-lg shadow-md p-8 pt-6">
                     <h2 className="text-xl font-semibold text-center text-gray-800 mb-8">店家資訊</h2>
                     <div className="space-y-6">
                        <FormRow number={1} label="官方帳號名稱(可更改)" required>
                            <input type="text" value={accountName} onChange={(e) => setAccountName(e.target.value)} className="w-full px-3 py-2 bg-white rounded-md text-sm border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-400" />
                        </FormRow>

                        <FormRow number={2} label="公司統一編號">
                             <input type="text" value={companyId} onChange={(e) => setCompanyId(e.target.value)} className="w-full px-3 py-2 bg-white rounded-md text-sm border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-400" />
                        </FormRow>

                        <FormRow number={3} label="店家地址" required>
                            <div className="space-y-3">
                                <div className="grid grid-cols-2 gap-3">
                                     <select value={city} onChange={(e) => setCity(e.target.value)} className="w-full px-3 py-2 bg-white rounded-md text-sm border border-gray-300 text-gray-500">
                                        <option disabled>居住地</option>
                                        <option>台北市</option>
                                        <option>台中市</option>
                                        <option>高雄市</option>
                                    </select>
                                    <select value={district} onChange={(e) => setDistrict(e.target.value)} className="w-full px-3 py-2 bg-white rounded-md text-sm border border-gray-300 text-gray-500">
                                        <option disabled>請選擇鄉鎮市區</option>
                                        <option>中區</option>
                                        <option>北區</option>
                                        <option>南區</option>
                                    </select>
                                </div>
                                <input type="text" placeholder="請輸入地址" value={address} onChange={(e) => setAddress(e.target.value)} className="w-full px-3 py-2 bg-white rounded-md text-sm border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-400" />
                                <div className="p-1 border border-gray-300 rounded-md">
                                    <div className="flex justify-between items-center text-xs text-gray-500 px-2 py-1">
                                        <span>定位</span>
                                        <span>選擇定位 <span className="text-red-500">*</span></span>
                                    </div>
                                    <img src="https://i.imgur.com/7gYQYcW.png" alt="Map placeholder" className="w-full h-40 object-cover rounded-sm" />
                                </div>
                            </div>
                        </FormRow>

                        <FormRow number={4} label="選擇產業" required>
                            <select value={industry} onChange={(e) => setIndustry(e.target.value)} className="w-full px-3 py-2 bg-white rounded-md text-sm border border-gray-300 text-gray-500">
                                <option disabled>請選擇產業</option>
                                <option>餐飲業</option>
                                <option>零售業</option>
                                <option>服務業</option>
                            </select>
                        </FormRow>

                        <FormRow number={5} label="負責業務">
                             <input type="text" placeholder="請填寫服務您的業務名稱" value={salesperson} onChange={(e) => setSalesperson(e.target.value)} className="w-full px-3 py-2 bg-white rounded-md text-sm border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-400" />
                        </FormRow>
                     </div>
                </div>
            </main>
             <footer className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-sm border-t border-gray-200">
                <div className="max-w-5xl mx-auto p-4 flex justify-between items-center">
                    <button 
                        onClick={onBackToVerify}
                        className="px-8 py-2 text-sm font-medium text-orange-500 border border-orange-400 rounded-md hover:bg-orange-50 bg-white shadow-sm"
                    >
                        上一步
                    </button>
                    <button
                        onClick={onStoreInfoSuccess}
                        className="px-8 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 shadow-sm"
                    >
                        下一步
                    </button>
                </div>
            </footer>
            <HelpModal isOpen={isHelpModalOpen} onClose={() => setIsHelpModalOpen(false)} />
        </div>
    );
};

export default StoreInfo;