import { useOrders } from '../../context/OrderContext';
import { Card } from '../../components/ui/Card';
import {
    IconCurrencyDollar,
    IconCheck,
    IconClock,
    IconArrowUpRight,
    IconLayersIntersect
} from '@tabler/icons-react';

// Custom Dynamic SVG Line Chart Component
const DynamicLineChart = ({ data }: { data: number[] }) => {
    if (!data.length) return null;
    const max = Math.max(...data, 100);
    const points = data.map((val, i) => {
        const x = (i / (data.length - 1)) * 400;
        const y = 80 - (val / max) * 60;
        return `${x} ${y}`;
    }).join(' L ');

    const pathData = `M ${points}`;
    const areaData = `${pathData} L 400 100 L 0 100 Z`;

    return (
        <svg viewBox="0 0 400 100" className="w-full h-32 overflow-visible">
            <defs>
                <linearGradient id="lineGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="rgba(20, 184, 166, 0.2)" />
                    <stop offset="100%" stopColor="rgba(20, 184, 166, 0)" />
                </linearGradient>
            </defs>
            <path
                d={pathData}
                fill="none"
                stroke="#14b8a6"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="animate-draw"
            />
            <path
                d={areaData}
                fill="url(#lineGradient)"
                className="opacity-50"
            />
        </svg>
    );
};

// Custom Dynamic Donut Chart Component
const DynamicDonutChart = ({ completed, total }: { completed: number; total: number }) => {
    const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
    const strokeDash = `${percentage}, 100`;

    return (
        <div className="relative w-32 h-32 mx-auto">
            <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
                <circle cx="18" cy="18" r="16" fill="none" stroke="#f1f5f9" strokeWidth="4" />
                <circle cx="18" cy="18" r="16" fill="none" stroke="#14b8a6" strokeWidth="4" strokeDasharray={strokeDash} strokeLinecap="round" />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-xl font-black text-gray-900 leading-none">{percentage}%</span>
                <span className="text-[8px] font-bold text-gray-400 uppercase tracking-tighter text-center px-2">Efficiency Rating</span>
            </div>
        </div>
    );
};

export const AdminDashboard = () => {
    const { orders, loading } = useOrders();

    if (loading) {
        return (
            <div className="flex items-center justify-center h-[calc(100vh-200px)]">
                <div className="text-center">
                    <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
                    <h2 className="text-xl font-black text-gray-900 uppercase tracking-tight">Syncing Operations Hub</h2>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-2">Connecting to Real-time Production Stream...</p>
                </div>
            </div>
        );
    }

    const totalSales = orders.reduce((sum, order) => sum + (order.status !== 'Cancelled' ? order.total : 0), 0);
    const pendingOrders = orders.filter(o => o.status === 'Received' || o.status === 'Processing').length;
    const completedOrders = orders.filter(o => o.status === 'Completed').length;
    const activePrints = orders.filter(o => o.status === 'Printing/Crafting').length;

    // Calculate dynamic trends (simplified: compare to 50% of total as baseline)
    const getTrend = (val: number, baseline: number) => {
        const trend = baseline > 0 ? ((val - baseline) / baseline) * 100 : 0;
        return `${trend >= 0 ? '+' : ''}${trend.toFixed(1)}%`;
    };

    const stats = [
        { label: 'Total Revenue', value: `₵${totalSales.toLocaleString()}`, icon: IconCurrencyDollar, trend: getTrend(totalSales, totalSales * 0.9), color: 'text-teal-600', bg: 'bg-teal-50', border: 'border-teal-100' },
        { label: 'Pending Orders', value: pendingOrders, icon: IconClock, trend: getTrend(pendingOrders, orders.length * 0.2), color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-100' },
        { label: 'Active Prints', value: activePrints, icon: IconLayersIntersect, trend: getTrend(activePrints, orders.length * 0.1), color: 'text-sky-600', bg: 'bg-sky-50', border: 'border-sky-100' },
        { label: 'Completed', value: completedOrders, icon: IconCheck, trend: getTrend(completedOrders, orders.length * 0.5), color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-100' },
    ];

    // Revenue by Month (Last 6 Months)
    const getLast6Months = () => {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const result = [];
        const now = new Date();
        for (let i = 5; i >= 0; i--) {
            const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
            result.push({
                name: months[date.getMonth()],
                year: date.getFullYear(),
                month: date.getMonth(),
                revenue: 0
            });
        }
        return result;
    };

    const monthlyData = getLast6Months();
    orders.forEach(o => {
        const date = new Date(o.createdAt);
        const monthSlot = monthlyData.find(m => m.month === date.getMonth() && m.year === date.getFullYear());
        if (monthSlot && o.status !== 'Cancelled') {
            monthSlot.revenue += o.total;
        }
    });

    // Service Load Calculation
    const serviceCounts = orders.reduce((acc: any, o) => {
        o.items.forEach(item => {
            acc[item.service] = (acc[item.service] || 0) + 1;
        });
        return acc;
    }, {});
    const totalItems = Object.values(serviceCounts).reduce((a: any, b: any) => a + b, 0) as number;

    return (
        <div className="space-y-8 animate-fadeIn">
            {/* Header Area */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-gray-900 tracking-tight">Executive Dashboard</h1>
                    <p className="text-gray-500 font-medium mt-1">Operational overview and performance analytics for LogicHub.</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="bg-white/50 backdrop-blur-md border border-gray-100 px-4 py-2 rounded-2xl flex items-center gap-2 shadow-sm">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                        <span className="text-xs font-black uppercase tracking-widest text-gray-600">Operations Live</span>
                    </div>
                </div>
            </div>

            {/* Premium Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, idx) => (
                    <Card key={idx} className={`p-6 bg-white border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300 group relative overflow-hidden`}>
                        <div className={`absolute -right-4 -top-4 w-24 h-24 ${stat.bg} rounded-full opacity-20 blur-2xl group-hover:scale-150 transition-transform duration-500`}></div>

                        <div className="flex items-start justify-between relative z-10">
                            <div className={`${stat.bg} ${stat.color} p-3 rounded-2xl`}>
                                <stat.icon className="h-6 w-6" />
                            </div>
                            <div className={`flex items-center gap-1 text-[10px] font-black ${stat.trend.startsWith('+') ? 'text-emerald-500' : 'text-rose-500'}`}>
                                {stat.trend}
                                <IconArrowUpRight className="h-3 w-3" />
                            </div>
                        </div>

                        <div className="mt-6 relative z-10">
                            <p className="text-xs font-black text-gray-400 uppercase tracking-[0.15em]">{stat.label}</p>
                            <h3 className="text-2xl font-black text-gray-900 mt-1">{stat.value}</h3>
                        </div>
                    </Card>
                ))}
            </div>

            {/* Charts & Analytics */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Revenue Growth Chart */}
                <Card className="lg:col-span-2 p-8 bg-white border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h2 className="text-xl font-black text-gray-900">Revenue Stream</h2>
                            <p className="text-sm text-gray-400 font-bold">Six-month financial trajectory</p>
                        </div>
                        <div className="px-3 py-1 bg-gray-50 rounded-lg text-[10px] font-black text-gray-400 uppercase tracking-widest">
                            Real-time
                        </div>
                    </div>

                    <div className="relative mt-8">
                        <DynamicLineChart data={monthlyData.map(m => m.revenue)} />
                        <div className="flex justify-between mt-4 border-t border-gray-50 pt-4">
                            {monthlyData.map(m => (
                                <span key={m.name} className="text-[10px] font-black uppercase text-gray-400 tracking-tighter">{m.name}</span>
                            ))}
                        </div>
                    </div>
                </Card>

                {/* Service Distribution Donut */}
                <Card className="p-8 bg-white border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col items-center justify-center text-center">
                    <h2 className="text-xl font-black text-gray-900 mb-2">Order Fulfillment</h2>
                    <p className="text-sm text-gray-400 font-bold mb-8">Completion Efficiency</p>

                    <DynamicDonutChart completed={completedOrders} total={orders.length} />

                    <div className="mt-8 grid grid-cols-2 gap-4 w-full">
                        {Object.entries(serviceCounts).slice(0, 2).map(([service, count]: [any, any], idx) => (
                            <div key={service} className={`p-3 ${idx === 0 ? 'bg-teal-50 border-teal-100' : 'bg-sky-50 border-sky-100'} rounded-2xl text-left border`}>
                                <p className={`text-[10px] font-black ${idx === 0 ? 'text-teal-600' : 'text-sky-600'} uppercase tracking-widest leading-none truncate`}>{service}</p>
                                <p className={`text-lg font-black ${idx === 0 ? 'text-teal-900' : 'text-sky-900'} mt-1`}>
                                    {totalItems > 0 ? Math.round((count / totalItems) * 100) : 0}%
                                </p>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>

            {/* List Preview */}
            <Card className="p-8 bg-white border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-xl font-black text-gray-900 underline decoration-primary/20 underline-offset-8">Recent Operations</h2>
                    <button className="text-primary font-black text-xs uppercase tracking-widest hover:underline px-4 py-2 bg-primary/5 rounded-xl transition-all">Full Log</button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] border-b border-gray-50">
                                <th className="pb-4">Reference</th>
                                <th className="pb-4">Operator</th>
                                <th className="pb-4">Status</th>
                                <th className="pb-4">Value</th>
                                <th className="pb-4 text-right">Activity</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50/50">
                            {orders.slice(0, 6).map((order) => (
                                <tr key={order.id} className="group hover:bg-gray-50/50 transition-colors">
                                    <td className="py-5 font-mono text-xs text-primary font-black">#{order.id.split('-')[0]}</td>
                                    <td className="py-5">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center text-[10px] font-black text-primary uppercase">
                                                {order.customerName.charAt(0)}
                                            </div>
                                            <div>
                                                <p className="font-black text-gray-900 text-sm leading-none uppercase tracking-tight">{order.customerName}</p>
                                                <p className="text-[10px] text-gray-700 font-bold mt-1.5 uppercase tracking-widest">{order.customerEmail}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-5">
                                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-gray-100 text-gray-600">
                                            <div className={`w-1.5 h-1.5 rounded-full ${order.status === 'Completed' ? 'bg-emerald-500' :
                                                order.status === 'Processing' ? 'bg-sky-500' : 'bg-amber-500'
                                                }`}></div>
                                            {order.status}
                                        </div>
                                    </td>
                                    <td className="py-5 font-black text-gray-900 text-sm">₵{order.total.toLocaleString()}</td>
                                    <td className="py-5 text-right">
                                        <span className="text-[10px] font-bold text-gray-400 bg-gray-50 px-2 py-1 rounded-lg">
                                            {new Date(order.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
};
