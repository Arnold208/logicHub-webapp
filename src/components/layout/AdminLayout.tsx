import { ReactNode, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
    IconLayoutDashboard,
    IconShoppingCart,
    IconUsers,
    IconSettings,
    IconLogout,
    IconHome,
    IconLayersIntersect,
    IconChevronLeft,
    IconChevronRight
} from '@tabler/icons-react';
import { useAuth } from '../../hooks/useAuth';

interface AdminLayoutProps {
    children: ReactNode;
}

export const AdminLayout = ({ children }: AdminLayoutProps) => {
    const location = useLocation();
    const { user, logout } = useAuth();
    const [isCollapsed, setIsCollapsed] = useState(false);

    const handleLogout = async (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        try {
            await logout();
        } catch (err) {
            console.error('Logout error in AdminLayout:', err);
            window.location.href = '/';
        }
    };

    const getInitials = (name: string) => {
        return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) || 'AD';
    };

    const menuItems = [
        { label: 'Dashboard', icon: IconLayoutDashboard, path: '/admin' },
        { label: 'Orders', icon: IconShoppingCart, path: '/admin/orders' },
        { label: 'Customers', icon: IconUsers, path: '/admin/customers' },
        { label: 'Services', icon: IconLayersIntersect, path: '/admin/services' },
        { label: 'Settings', icon: IconSettings, path: '/admin/settings' },
    ];

    return (
        <div className="flex h-screen bg-[#fafafa] overflow-hidden font-sans">
            {/* Sidebar */}
            <aside className={`bg-white border-r border-gray-100 flex flex-col transition-all duration-500 ease-in-out relative z-30 ${isCollapsed ? 'w-20' : 'w-72'}`}>
                {/* Collapse Toggle */}
                <button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className="absolute -right-3 top-20 bg-white border border-gray-100 rounded-full p-1 shadow-md hover:scale-110 transition-all z-50 text-gray-400 hover:text-primary"
                >
                    {isCollapsed ? <IconChevronRight size={14} /> : <IconChevronLeft size={14} />}
                </button>

                <div className={`p-6 border-b border-gray-50 flex items-center transition-all ${isCollapsed ? 'justify-center' : 'space-x-3'}`}>
                    <div className="w-10 h-10 bg-primary rounded-2xl flex items-center justify-center shrink-0 shadow-lg shadow-primary/20">
                        <span className="text-white font-black text-xl">L</span>
                    </div>
                    {!isCollapsed && (
                        <span className="text-xl font-black text-gray-900 tracking-tighter">Admin<span className="text-primary italic">Ops</span></span>
                    )}
                </div>

                <nav className="flex-1 overflow-y-auto py-8 px-4 space-y-2 custom-scrollbar">
                    {menuItems.map((item) => {
                        const isActive = location.pathname === item.path;
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`flex items-center group transition-all duration-300 rounded-2xl ${isCollapsed ? 'justify-center p-3' : 'px-4 py-3 space-x-4'
                                    } ${isActive
                                        ? 'bg-primary shadow-xl shadow-primary/20 text-white'
                                        : 'text-gray-400 hover:bg-gray-50 hover:text-gray-900'
                                    }`}
                            >
                                <item.icon className={`h-5 w-5 transition-transform group-hover:scale-110 ${isActive ? 'text-white' : ''}`} />
                                {!isCollapsed && (
                                    <span className={`text-[11px] font-black uppercase tracking-[0.2em] ${isActive ? 'text-white' : ''}`}>
                                        {item.label}
                                    </span>
                                )}
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-gray-50 space-y-2">
                    <Link to="/" className={`flex items-center text-gray-400 hover:bg-gray-50 hover:text-gray-900 rounded-2xl transition-all ${isCollapsed ? 'justify-center p-3' : 'px-4 py-3 space-x-4'}`}>
                        <IconHome className="h-5 w-5" />
                        {!isCollapsed && <span className="text-[11px] font-black uppercase tracking-[0.2em]">Live Site</span>}
                    </Link>
                    <button
                        onClick={handleLogout}
                        className={`w-full flex items-center text-rose-400 hover:bg-rose-50 hover:text-rose-600 rounded-2xl transition-all ${isCollapsed ? 'justify-center p-3' : 'px-4 py-3 space-x-4'}`}
                    >
                        <IconLogout className="h-5 w-5" />
                        {!isCollapsed && <span className="text-[11px] font-black uppercase tracking-[0.2em]">Sign Out</span>}
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col overflow-hidden relative">
                <header className="h-20 bg-white/80 backdrop-blur-md border-b border-gray-100 flex items-center justify-between px-10 shrink-0 z-20">
                    <h2 className="text-xs font-black text-gray-400 uppercase tracking-[0.3em]">
                        {location.pathname.split('/').filter(Boolean).slice(-1)[0] || 'System Root'}
                    </h2>

                    <div className="flex items-center space-x-6">
                        <div className="text-right hidden sm:block">
                            <p className="text-sm font-black text-gray-900 leading-none">{user?.name || 'Administrator'}</p>
                            <p className="text-[10px] font-bold text-primary uppercase tracking-widest mt-1">Super {user?.role || 'Admin'}</p>
                        </div>
                        <div className="w-10 h-10 bg-gray-100 rounded-2xl border-2 border-white shadow-sm overflow-hidden flex items-center justify-center text-primary font-black uppercase">
                            {getInitials(user?.name || 'Admin')}
                        </div>
                    </div>
                </header>

                <div className="flex-1 overflow-y-auto p-10 custom-scrollbar relative z-10 scroll-smooth">
                    {children}
                </div>
            </main>
        </div>
    );
};
