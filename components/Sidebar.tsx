
import React, { useState } from 'react';
import {
    ChevronDownIcon, VideoCameraIcon, ChatBubbleLeftRightIcon, UserGroupIcon,
    ShoppingCartIcon, CurrencyDollarIcon, ChartBarIcon, Cog6ToothIcon, StarIcon,
    ListBulletIcon, UserCircleIcon, ArrowTopRightOnSquareIcon, NewspaperIcon,
    SitemapIcon, DocumentTextIcon, LinkIcon, PencilSquareIcon
} from './icons';
import { Page } from '../App';

interface NavItem {
    id: string;
    name: string;
    icon: React.ComponentType<{ className?: string }>;
    notificationCount?: number;
    children?: NavItem[];
}

const navItems: NavItem[] = [
    { id: 'feed', name: '動態專欄', icon: NewspaperIcon },
    { id: 'live', name: '直播', icon: VideoCameraIcon },
    { id: 'chat', name: '訊息管理', icon: ChatBubbleLeftRightIcon, notificationCount: 4 },
    {
        id: 'members',
        name: '會員管理',
        icon: UserGroupIcon,
        children: [
            { id: 'memberList', name: '會員名單', icon: ListBulletIcon },
            { id: 'registrationSources', name: '註冊來源', icon: ListBulletIcon },
            { id: 'memberTags', name: '會員標籤 (尚未實作)', icon: ListBulletIcon },
            { id: 'memberCategoryEdit', name: '會員類別編輯 (尚未實作)', icon: PencilSquareIcon },
            { id: 'suspendedAccounts', name: '停權帳號名單', icon: ListBulletIcon },
        ]
    },
    {
        id: 'account',
        name: '帳號管理',
        icon: UserGroupIcon, // Placeholder icon
        children: [
            { id: 'myAccount', name: '我的帳號', icon: () => <span className="w-5 h-5 mr-3" /> }
        ]
    },
    { 
        id: 'tickets', 
        name: '店家管理', 
        icon: ShoppingCartIcon,
        children: [
            { id: 'ticketManagement', name: '票券管理', icon: () => <span className="w-5 h-5 mr-3"/> },
            { id: 'sendEvents', name: '發送活動', icon: () => <span className="w-5 h-5 mr-3"/> },
        ]
    },
    { 
        id: 'products', 
        name: '商城管理', 
        icon: ShoppingCartIcon,
        children: [
            { id: 'mallProducts', name: '商品管理', icon: () => <span className="w-5 h-5 mr-3"/> },
            { id: 'allOrders', name: '所有訂單', icon: () => <span className="w-5 h-5 mr-3"/> },
        ]
    },
    { 
        id: 'transactions', 
        name: '交易管理', 
        icon: CurrencyDollarIcon,
        children: [
            { id: 'verificationRecords', name: '核銷紀錄', icon: DocumentTextIcon },
            { id: 'rewardPointsInfo', name: '回饋點數說明', icon: DocumentTextIcon },
        ]
    },
    { id: 'finance', name: '財務管理', icon: ChartBarIcon },
    {
        id: 'profitSharing',
        name: '分潤管理',
        icon: SitemapIcon,
        children: [
            { id: 'profitTargets', name: '分潤對象', icon: UserGroupIcon },
            { id: 'userBindingRecords', name: '用戶分潤綁定', icon: LinkIcon },
            { id: 'bonusRecords', name: '獎金紀錄', icon: CurrencyDollarIcon },
            { id: 'profitRecords', name: '分潤紀錄', icon: ListBulletIcon },
            { id: 'profitDetails', name: '分潤明細', icon: DocumentTextIcon },
        ]
    },
    {
        id: 'settings', 
        name: '平台設定', 
        icon: Cog6ToothIcon,
        children: [
             { id: 'basicSettings', name: '基本設定', icon: ListBulletIcon },
             { id: 'permissionManagement', name: '權限管理', icon: UserCircleIcon },
             { id: 'shoppingCreditSettings', name: '註冊/推薦獎勵設定 (總後台)', icon: CurrencyDollarIcon },
             { id: 'lineOA', name: 'LINE OA 串接', icon: ArrowTopRightOnSquareIcon },
        ]
    },
    {
        id: 'roleManagement',
        name: '角色管理',
        icon: UserGroupIcon,
        children: [
            { id: 'roleList', name: '角色名單', icon: UserCircleIcon },
            { id: 'roleCategories', name: '角色類別', icon: UserCircleIcon },
            { id: 'suspendedAccounts', name: '下架帳號名單', icon: UserCircleIcon },
            { id: 'deletedAccounts', name: '刪除帳號名單', icon: UserCircleIcon },
        ]
    },
    { id: 'events', name: '活動', icon: StarIcon },
    { id: 'robot', name: '發券機器人', icon: StarIcon },
];

interface SidebarProps {
    currentPage: Page;
    setCurrentPage: (page: Page) => void;
    isOpen?: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ currentPage, setCurrentPage, isOpen = true }) => {
    const [openMenus, setOpenMenus] = useState<Set<string>>(new Set(['account', 'members']));

    const handleMenuClick = (item: NavItem) => {
        if (item.children) {
            const newOpenMenus = new Set(openMenus);
            if (newOpenMenus.has(item.id)) {
                newOpenMenus.delete(item.id);
            } else {
                newOpenMenus.add(item.id);
            }
            setOpenMenus(newOpenMenus);
        } else if (['myAccount', 'ticketManagement', 'basicSettings', 'shoppingCreditSettings', 'mallProducts', 'allOrders', 'profitTargets', 'userBindingRecords', 'roleList', 'roleCategories', 'suspendedAccounts', 'deletedAccounts', 'verificationRecords', 'rewardPointsInfo', 'memberList', 'registrationSources', 'memberTags', 'memberCategoryEdit'].includes(item.id)) {
             setCurrentPage(item.id as Page);
        }
    };
    
    return (
        <aside className={`bg-[#2d3748] text-gray-300 flex flex-col transition-all duration-300 ${isOpen ? 'w-60' : 'w-0 overflow-hidden'}`}>
            <div className={`h-16 flex items-center justify-between px-4 border-b border-gray-700 whitespace-nowrap min-w-[240px]`}>
                <span className="text-white text-lg font-bold">商家後台</span>
            </div>
            <nav className={`flex-1 px-2 py-4 space-y-1 min-w-[240px]`}>
                {navItems.map((item) => {
                    const isParentOfCurrent = item.children?.some(child => child.id === currentPage);
                    const isMenuOpen = openMenus.has(item.id);

                    return (
                        <div key={item.id}>
                            <a
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleMenuClick(item);
                                }}
                                className={`flex items-center justify-between px-4 py-2 text-sm rounded-md transition-colors duration-200 
                                ${isParentOfCurrent ? 'bg-gray-900/50 text-white' : 'hover:bg-gray-700 hover:text-white'}`}
                            >
                                <div className="flex items-center">
                                    <item.icon className="w-5 h-5 mr-3" />
                                    <span>{item.name}</span>
                                </div>
                                <div className="flex items-center">
                                    {item.notificationCount && (
                                        <span className="mr-2 text-xs bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center">
                                            {item.notificationCount}
                                        </span>
                                    )}
                                    {item.children && <ChevronDownIcon className={`w-4 h-4 transition-transform ${isMenuOpen ? 'rotate-180' : ''}`} />}
                                </div>
                            </a>
                            {isMenuOpen && item.children && (
                                <div className="pl-4 mt-1 space-y-1">
                                    {item.children.map(child => {
                                        const isChildActive = currentPage === child.id;
                                        return (
                                            <a
                                                key={child.id}
                                                href="#"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    handleMenuClick(child);
                                                }}
                                                className={`flex items-center px-4 py-2 text-sm rounded-md transition-colors duration-200 
                                                ${isChildActive ? 'text-blue-400' : 'text-gray-400 hover:text-white'}`}
                                            >
                                                <child.icon className={`w-5 h-5 mr-3 ${isChildActive ? 'text-blue-400' : 'text-gray-400'}`} />
                                                <span>{child.name}</span>
                                            </a>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    );
                })}
            </nav>
        </aside>
    );
};

export default Sidebar;
