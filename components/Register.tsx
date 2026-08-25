import React, { useState } from 'react';
import { BusinessLogo } from './icons';
import HelpModal from './HelpModal';

interface RegisterProps {
    onSwitchToLogin: () => void;
    onRegisterSuccess: () => void;
}

const Register: React.FC<RegisterProps> = ({ onSwitchToLogin, onRegisterSuccess }) => {
    const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);

    return (
        <div 
            className="h-full w-full bg-cover bg-center font-sans"
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1542337839-5142d574ad33?q=80&w=2070&auto=format&fit=crop')" }}
        >
            <div className="h-full w-full bg-black/50 flex flex-col">
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

                <main className="flex-1 flex items-center justify-center lg:justify-around px-8">
                    <div className="hidden lg:block w-full max-w-lg text-white">
                        <h1 className="text-5xl font-bold" style={{textShadow: '0 2px 4px rgba(0,0,0,0.4)'}}>
                            共享家<span className="font-sans">Business</span>
                        </h1>
                        <p className="mt-4 text-4xl" style={{textShadow: '0 2px 4px rgba(0,0,0,0.4)'}}>
                            會員+票券 輕鬆拓展商業版圖
                        </p>
                    </div>

                    <div className="w-full max-w-sm bg-gray-200/80 backdrop-blur-sm rounded-lg shadow-2xl overflow-hidden p-8">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">註冊</h2>
                        <form className="space-y-6">
                            <div>
                                <label htmlFor="phone" className="text-sm font-medium text-gray-700 sr-only">手機號碼</label>
                                <input 
                                    type="tel" 
                                    id="phone"
                                    placeholder="手機號碼"
                                    className="w-full px-4 py-3 bg-white rounded-md text-sm text-gray-800 placeholder-gray-400 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                />
                            </div>
                            <button
                                type="button"
                                onClick={onRegisterSuccess}
                                className="w-full bg-blue-500 text-white rounded-md py-3 font-bold hover:bg-blue-600 transition-colors duration-300"
                            >
                                下一步
                            </button>
                        </form>
                         <p className="text-xs text-gray-600 mt-6">
                            點擊「下一步」繼續註冊，即表示您已閱讀並同意共享家的
                            <a href="#" className="text-blue-600 hover:underline">服務條款</a>、
                            <a href="#" className="text-blue-600 hover:underline">隱私權政策</a>與
                            <a href="#" className="text-blue-600 hover:underline">平台使用條款</a>
                        </p>
                        <div className="text-center text-sm text-gray-600 mt-6 pt-6 border-t border-gray-400/50">
                            已經有帳號了嗎？
                            <a href="#" onClick={(e) => { e.preventDefault(); onSwitchToLogin(); }} className="font-semibold text-red-500 hover:underline ml-2">登入</a>
                        </div>
                    </div>
                </main>
            </div>
            <HelpModal isOpen={isHelpModalOpen} onClose={() => setIsHelpModalOpen(false)} />
        </div>
    );
};

export default Register;