import React, { useState } from 'react';
import { BusinessLogo } from './icons';
import HelpModal from './HelpModal';

interface VerifyPhoneProps {
    onSwitchToRegister: () => void;
    onVerifySuccess: () => void;
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

const VerifyPhone: React.FC<VerifyPhoneProps> = ({ onSwitchToRegister, onVerifySuccess }) => {
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
            
            <main className="-mt-16 flex flex-col items-center justify-center px-4 z-10 relative pb-24">
                {/* Stepper */}
                <div className="flex items-start justify-center w-full max-w-xl mb-10">
                    <Step number="01" label="驗證手機號碼" active />
                    <StepConnector />
                    <Step number="02" label="填寫店家資訊" />
                    <StepConnector />
                    <Step number="03" label="恭喜完成註冊" />
                </div>

                {/* Verification Form */}
                <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8 pt-6">
                     <h2 className="text-xl font-semibold text-center text-gray-800">輸入驗證碼</h2>
                     <p className="text-sm text-gray-500 text-center mt-2 mb-6">
                        您的驗證碼已透過簡訊傳送至<br/>(+886)0975856212
                     </p>
                     <form className="space-y-4">
                        <input 
                            type="text" 
                            defaultValue="293106"
                            className="w-full px-4 py-3 text-center tracking-[0.3em] bg-white rounded-md text-lg text-gray-800 placeholder-gray-400 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                         <button
                            type="button"
                            className="w-full bg-[#3b82f6] text-white rounded-md py-2.5 font-medium hover:bg-blue-600 transition-colors"
                        >
                            重發驗證碼
                        </button>
                     </form>
                </div>
            </main>
             <footer className="fixed bottom-0 left-0 right-0 p-6 flex justify-between items-center max-w-5xl mx-auto">
                <button 
                    onClick={onSwitchToRegister}
                    className="px-8 py-2 text-sm font-medium text-orange-500 border border-orange-400 rounded-md hover:bg-orange-50 bg-white shadow-sm"
                >
                    上一步
                </button>
                <button
                    onClick={onVerifySuccess}
                    className="px-8 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 shadow-sm"
                >
                    下一步
                </button>
            </footer>
            <HelpModal isOpen={isHelpModalOpen} onClose={() => setIsHelpModalOpen(false)} />
        </div>
    );
};

export default VerifyPhone;