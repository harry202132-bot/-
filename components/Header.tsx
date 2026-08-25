import React, { useState, useEffect, useRef } from 'react';
import { MenuIcon, ChevronDownIcon, QuestionMarkCircleIcon } from './icons';
import { Page } from '../App';

interface HeaderProps {
    currentPage: Page;
    setCurrentPage: (page: Page) => void;
    toggleSidebar: () => void;
}

const Breadcrumb: React.FC<{ paths: string[] }> = ({ paths }) => (
    <div className="ml-4 text-sm text-gray-500 hidden md:flex">
        <span className="font-semibold text-gray-700">22KING花花世界崇德店</span>
        {paths.map(path => (
            <React.Fragment key={path}>
                <span className="mx-2">/</span>
                <span className={paths.indexOf(path) === paths.length - 1 ? 'text-gray-800' : ''}>{path}</span>
            </React.Fragment>
        ))}
    </div>
);


const Header: React.FC<HeaderProps> = ({ currentPage, setCurrentPage, toggleSidebar }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const getBreadcrumbPaths = (): string[] => {
        switch (currentPage) {
            case 'addVoucher':
                return ['店家管理', '新增優惠券'];
            case 'ticketManagement':
                return ['店家管理', '票券管理'];
            case 'basicSettings':
                return ['平台設定', '基本設定'];
            case 'shoppingCreditSettings':
                return ['平台設定', '註冊/推薦獎勵設定'];
            case 'mallProducts':
                return ['商城管理', '商品管理'];
            case 'allOrders':
                return ['商城管理', '所有訂單'];
            case 'profitTargets':
                return ['分潤管理', '分潤對象'];
            case 'userBindingRecords':
                return ['分潤管理', '用戶分潤綁定'];
            case 'memberList':
                return ['會員管理', '會員名單'];
            case 'registrationSources':
                return ['會員管理', '註冊來源'];
            case 'memberDetail':
                return ['會員管理', '會員詳情'];
            case 'memberTags':
                return ['會員管理', '會員標籤'];
            case 'memberCategoryEdit':
                return ['會員管理', '會員類別編輯'];
            case 'suspendedAccounts':
                return ['會員管理', '停權帳號名單'];
            case 'myAccount':
            default:
                return ['帳號管理', '我的帳號'];
        }
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <header className="h-16 bg-white shadow-sm flex items-center justify-between px-6">
            <div className="flex items-center">
                <button onClick={toggleSidebar} className="text-gray-500 hover:bg-gray-100 p-1 rounded-md focus:outline-none focus:text-gray-700 transition-colors">
                    <MenuIcon className="w-6 h-6" />
                </button>
                <Breadcrumb paths={getBreadcrumbPaths()} />
            </div>
            <div className="flex items-center">
                <a href="#" className="flex items-center text-sm text-blue-600 hover:underline mr-6">
                    <QuestionMarkCircleIcon className="w-5 h-5 mr-1" />
                    操作手冊
                </a>
                <div className="relative" ref={dropdownRef}>
                    <button 
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="flex items-center focus:outline-none"
                    >
                        <img
                            className="h-9 w-9 object-contain"
                            src="https://i.imgur.com/mO3kY8P.png"
                            alt="使用者選單"
                        />
                        <span className="ml-2">
                            <ChevronDownIcon className={`w-4 h-4 text-gray-600 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                        </span>
                    </button>
                    {isDropdownOpen && (
                        <div className="absolute right-0 mt-2 w-36 bg-white rounded-md shadow-lg z-10 border border-gray-100">
                            <div className="py-1">
                                <a
                                    href="#"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setCurrentPage('myAccount');
                                        setIsDropdownOpen(false);
                                    }}
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                >
                                    我的帳號
                                </a>
                                <a
                                    href="#"
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                >
                                    切換帳號
                                </a>
                                <a
                                    href="#"
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                >
                                    登出
                                </a>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;