import React, { useState } from 'react';
import { BusinessLogo, CheckCircleIcon, LineIcon, InformationCircleIcon } from './icons';
import HelpModal from './HelpModal';

interface RegistrationCompleteProps {
    onComplete: () => void;
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

const RegistrationComplete: React.FC<RegistrationCompleteProps> = ({ onComplete }) => {
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
                    <Step number="02" label="填寫店家資訊" completed />
                    <StepConnector />
                    <Step number="03" label="恭喜完成註冊" active />
                </div>

                {/* Completion Message */}
                <div className="w-full max-w-2xl bg-white rounded-lg shadow-md p-8 text-center">
                    <CheckCircleIcon className="w-16 h-16 text-green-500 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">恭喜您！已完成店家申請</h2>
                    <p className="text-gray-600 mb-6">在進入後台之前，誠摯邀請您加入官方 LINE，開啟專屬支援服務！</p>
                    
                    <div className="text-left bg-blue-50 border border-blue-200 text-blue-800 text-sm rounded-md p-4 flex items-start gap-3 mb-6">
                        <InformationCircleIcon className="w-5 h-5 mt-0.5 shrink-0 text-blue-500" />
                        <div>
                            <strong className="font-semibold">重要提醒：</strong>
                            您的帳號密碼預設為您註冊時使用的手機號碼，建議您登入後至「我的帳號」頁面進行修改，以確保帳戶安全。
                        </div>
                    </div>

                    <div className="my-8 pt-8 border-t border-gray-200">
                        <div className="flex flex-col md:flex-row items-center justify-center gap-8 text-left">
                            <div className="flex-shrink-0">
                                <img src="https://i.imgur.com/QR48I0p.png" alt="LINE QR Code" className="w-36 h-36 rounded-lg shadow-sm" />
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-gray-800 flex items-center mb-3">
                                    <LineIcon className="w-7 h-7 mr-2"/>
                                    加入官方 LINE 的三大好處
                                </h3>
                                <ul className="space-y-2 text-gray-600 text-sm">
                                    <li className="flex items-start">
                                        <CheckCircleIcon className="w-4 h-4 text-green-500 mr-2 mt-0.5 shrink-0" />
                                        <span><strong>一對一客服支援：</strong>開店遇到問題？隨時提問，專人即時回覆。</span>
                                    </li>
                                    <li className="flex items-start">
                                        <CheckCircleIcon className="w-4 h-4 text-green-500 mr-2 mt-0.5 shrink-0" />
                                        <span><strong>最新功能教學：</strong>新功能上線，第一時間圖文教學，讓您立刻上手。</span>
                                    </li>
                                    <li className="flex items-start">
                                        <CheckCircleIcon className="w-4 h-4 text-green-500 mr-2 mt-0.5 shrink-0" />
                                        <span><strong>重要公告不漏接：</strong>系統維護、平台政策更新，重要訊息即時推播。</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <a 
                            href="https://line.me/ti/p/@your-line-id" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="w-full sm:w-auto flex items-center justify-center bg-[#00B900] text-white px-6 py-3 rounded-md font-semibold hover:bg-[#00a300] transition-colors"
                        >
                            <LineIcon className="w-5 h-5 mr-2" />
                            點此加入 LINE 好友
                        </a>
                        <button
                            onClick={onComplete}
                            className="w-full sm:w-auto bg-blue-500 text-white px-6 py-3 rounded-md font-semibold hover:bg-blue-600 transition-colors"
                        >
                            前往後台
                        </button>
                    </div>
                </div>
            </main>
            <HelpModal isOpen={isHelpModalOpen} onClose={() => setIsHelpModalOpen(false)} />
        </div>
    );
};

export default RegistrationComplete;