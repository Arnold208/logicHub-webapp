import { Card } from '../../components/ui/Card';
import { IconSettings, IconBell, IconShieldCheck, IconWorld } from '@tabler/icons-react';

export const AdminSettings = () => {
    return (
        <div className="space-y-8 animate-fadeIn">
            <div>
                <h1 className="text-3xl font-black text-gray-900 tracking-tight">Platform Matrix</h1>
                <p className="text-sm text-gray-500 font-bold mt-1 uppercase tracking-widest">Global Parameters & Administrative Core</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* General Settings */}
                <Card className="p-8 bg-white border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] lg:col-span-2 space-y-8">
                    <div className="space-y-6">
                        <div className="flex items-center gap-4 text-primary">
                            <IconSettings className="h-6 w-6" />
                            <h2 className="text-xl font-black text-gray-900">General Configuration</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Platform Name</label>
                                <input type="text" defaultValue="LogicHub Production" className="w-full px-4 py-3 rounded-xl border border-gray-100 focus:outline-none focus:ring-2 focus:ring-primary/20 font-bold text-gray-700" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Support Email</label>
                                <input type="email" defaultValue="ops@logichub.com" className="w-full px-4 py-3 rounded-xl border border-gray-100 focus:outline-none focus:ring-2 focus:ring-primary/20 font-bold text-gray-700" />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6 pt-8 border-t border-gray-50">
                        <div className="flex items-center gap-4 text-sky-600">
                            <IconBell className="h-6 w-6" />
                            <h2 className="text-xl font-black text-gray-900">Notifications</h2>
                        </div>
                        <div className="space-y-4">
                            {[
                                { label: 'Order Confirmation Emails', desc: 'Send automatic emails when users place orders.', enabled: true },
                                { label: 'Production Status Alerts', desc: 'Notify admins of production delays or machine issues.', enabled: false },
                                { label: 'Inventory Reminders', desc: 'Alert when composite materials fall below 15%.', enabled: true },
                            ].map((item) => (
                                <div key={item.label} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                                    <div>
                                        <p className="text-sm font-black text-gray-900">{item.label}</p>
                                        <p className="text-xs text-gray-400 font-medium">{item.desc}</p>
                                    </div>
                                    <div className={`w-12 h-6 rounded-full p-1 cursor-pointer transition-colors ${item.enabled ? 'bg-primary' : 'bg-gray-200'}`}>
                                        <div className={`w-4 h-4 bg-white rounded-full transition-transform ${item.enabled ? 'translate-x-6' : ''}`}></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex justify-end pt-4">
                        <button className="px-8 py-3 bg-primary text-white font-black rounded-xl shadow-lg shadow-primary/30 hover:scale-105 transition-all">Save Changes</button>
                    </div>
                </Card>

                {/* Sidebar Cards */}
                <div className="space-y-8">
                    <Card className="p-6 bg-gradient-to-br from-gray-900 to-teal-950 text-white border-none shadow-[0_8px_30px_rgb(0,0,0,0.1)]">
                        <IconShieldCheck className="h-10 w-10 text-teal-400 mb-6" />
                        <h3 className="text-lg font-black tracking-tight">System Security</h3>
                        <p className="text-sm text-gray-400 mt-2 leading-relaxed">Your portal is protected with 128-bit encryption and role-based access control.</p>
                        <button className="mt-8 w-full py-3 bg-white/10 hover:bg-white/20 rounded-xl text-xs font-black uppercase tracking-widest transition-all">Security Audit</button>
                    </Card>

                    <Card className="p-6 bg-white border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 bg-sky-50 rounded-xl flex items-center justify-center text-sky-600">
                                <IconWorld className="h-6 w-6" />
                            </div>
                            <h3 className="text-lg font-black text-gray-900 leading-none">Operations</h3>
                        </div>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center text-xs">
                                <span className="text-gray-400 font-bold">Server Version</span>
                                <span className="font-mono font-black text-gray-900">v2.4.1-stable</span>
                            </div>
                            <div className="flex justify-between items-center text-xs">
                                <span className="text-gray-400 font-bold">API Status</span>
                                <span className="text-emerald-500 font-black uppercase tracking-tighter">Healthy</span>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};
