import React from 'react';
import { LifegivingsLogo } from './icons';

interface LoginProps {
    onLoginSuccess: () => void;
    onSwitchToRegister: () => void;
}

const Login: React.FC<LoginProps> = ({ onLoginSuccess, onSwitchToRegister }) => {
    return (
        <div 
            className="h-full w-full bg-cover bg-center font-sans"
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1572249336152-0575a13b06a8?q=80&w=2070&auto=format&fit=crop')" }}
        >
            <div className="h-full w-full bg-black/40 flex flex-col">
                <header className="absolute top-0 left-0 right-0 h-20 flex items-center px-10">
                    <div className="flex items-center gap-3">
                        <LifegivingsLogo className="w-10 h-10" />
                        <span className="text-white text-lg tracking-wider">共享家Lifegivings管理平台</span>
                    </div>
                </header>

                <main className="flex-1 flex items-center justify-center lg:justify-around px-8">
                    <div className="hidden lg:block w-full max-w-md text-white">
                        <h1 className="text-5xl font-bold leading-tight" style={{textShadow: '0 2px 4px rgba(0,0,0,0.4)'}}>
                            開啟人才創新思維<br/>創造全球商業新格局
                        </h1>
                    </div>

                    <div className="w-full max-w-sm bg-gray-200/80 backdrop-blur-sm rounded-lg shadow-2xl overflow-hidden">
                        <div className="flex text-center text-sm font-medium">
                            <button className="flex-1 py-3 bg-gray-200/50 text-gray-500">
                                手機掃碼
                            </button>
                            <button className="flex-1 py-3 bg-white text-blue-600 border-b-2 border-blue-500">
                                帳號密碼
                            </button>
                        </div>
                        <div className="p-8">
                            <form className="space-y-5">
                                <input 
                                    type="text" 
                                    placeholder="管理員帳號"
                                    className="w-full px-4 py-3 bg-white rounded-md text-sm text-gray-800 placeholder-gray-400 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                />
                                <input 
                                    type="password" 
                                    placeholder="請輸入密碼"
                                    className="w-full px-4 py-3 bg-white rounded-md text-sm text-gray-800 placeholder-gray-400 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                />
                                <div className="text-right">
                                    <a href="#" className="text-xs text-blue-600 hover:underline">忘記密碼?</a>
                                </div>
                                <button
                                    type="button"
                                    onClick={onLoginSuccess}
                                    className="w-full bg-blue-500 text-white rounded-md py-3 font-bold hover:bg-blue-600 transition-colors duration-300"
                                >
                                    登入
                                </button>
                                <div className="text-center text-xs text-gray-600">
                                    共享家新朋友? 
                                    <a href="#" onClick={(e) => { e.preventDefault(); onSwitchToRegister(); }} className="font-semibold text-blue-600 hover:underline ml-1">註冊</a>
                                </div>
                            </form>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Login;