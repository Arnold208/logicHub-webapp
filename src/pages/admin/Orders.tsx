import { useState } from 'react';
import { useOrders, OrderStatus } from '../../context/OrderContext';
import { Card } from '../../components/ui/Card';
import { Link } from 'react-router-dom';
import {
    IconSearch,
    IconFilter,
    IconDownload,
    IconEye,
    IconCalendar,
    IconLayersIntersect
} from '@tabler/icons-react';

export const Orders = () => {
    const { orders, loading } = useOrders();
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState<OrderStatus | 'All'>('All');
    const [serviceFilter, setServiceFilter] = useState<string>('All');
    const [dateFilter, setDateFilter] = useState<string>('All Time');

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-center">
                    <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-xs font-black uppercase tracking-widest text-gray-400">Loading Order Ledger...</p>
                </div>
            </div>
        );
    }

    const filteredOrders = orders.filter(order => {
        const matchesSearch =
            order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.customerEmail.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesStatus = statusFilter === 'All' || order.status === statusFilter;
        const matchesService = serviceFilter === 'All' || order.items.some(item => item.service === serviceFilter);

        const orderDate = new Date(order.createdAt);
        const now = new Date();
        let matchesDate = true;

        if (dateFilter === 'Today') {
            matchesDate = orderDate.toDateString() === now.toDateString();
        } else if (dateFilter === 'Last 7 Days') {
            const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
            matchesDate = orderDate >= sevenDaysAgo;
        } else if (dateFilter === 'This Month') {
            matchesDate = orderDate.getMonth() === now.getMonth() && orderDate.getFullYear() === now.getFullYear();
        }

        return matchesSearch && matchesStatus && matchesService && matchesDate;
    });

    const services = [
        '3D Printing', 'Woodworking', 'Laser Cutting', 'IoT/Robotics', 'Incubation', 'Hardware Dev'
    ];

    const statuses: (OrderStatus | 'All')[] = [
        'All', 'Received', 'Processing', 'Printing/Crafting', 'Ready for Delivery', 'Completed', 'Cancelled'
    ];

    const datePresets = ['All Time', 'Today', 'Last 7 Days', 'This Month'];

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-black text-gray-900 tracking-tight">Order Ledger</h1>
                    <p className="text-sm text-gray-500 font-bold mt-1 uppercase tracking-widest">Global Order Stream & Fulfillment</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-100 rounded-2xl text-[10px] font-black uppercase tracking-widest text-gray-600 shadow-sm hover:shadow-md transition-all">
                        <IconDownload className="h-4 w-4" />
                        Export Data
                    </button>
                    <button className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-primary/20 hover:scale-105 transition-all">
                        New Order
                    </button>
                </div>
            </div>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="relative flex-1 max-w-md">
                    <IconSearch className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search by Order ID, Customer Name..."
                        className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 bg-white"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className="flex items-center gap-3 overflow-x-auto pb-2 md:pb-0">
                    <div className="flex items-center space-x-2 bg-white px-3 py-2 rounded-xl border border-gray-200 group">
                        <IconCalendar className="h-4 w-4 text-gray-400 group-hover:text-primary" />
                        <select
                            className="bg-transparent text-sm font-bold text-gray-600 focus:outline-none"
                            value={dateFilter}
                            onChange={(e) => setDateFilter(e.target.value)}
                        >
                            {datePresets.map(d => <option key={d} value={d}>{d}</option>)}
                        </select>
                    </div>

                    <div className="flex items-center space-x-2 bg-white px-3 py-2 rounded-xl border border-gray-200 group">
                        <IconFilter className="h-4 w-4 text-gray-400 group-hover:text-primary" />
                        <select
                            className="bg-transparent text-sm font-bold text-gray-600 focus:outline-none"
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value as OrderStatus | 'All')}
                        >
                            {statuses.map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                    </div>

                    <div className="flex items-center space-x-2 bg-white px-3 py-2 rounded-xl border border-gray-200 group">
                        <IconCalendar className="h-4 w-4 text-gray-400 group-hover:text-primary" />
                        <select
                            className="bg-transparent text-sm font-bold text-gray-600 focus:outline-none"
                            value={dateFilter}
                            onChange={(e) => setDateFilter(e.target.value)}
                        >
                            {datePresets.map(d => <option key={d} value={d}>{d}</option>)}
                        </select>
                    </div>

                    <div className="flex items-center space-x-2 bg-white px-3 py-2 rounded-xl border border-gray-200 group">
                        <IconLayersIntersect className="h-4 w-4 text-gray-400 group-hover:text-primary" />
                        <select
                            className="bg-transparent text-sm font-bold text-gray-600 focus:outline-none"
                            value={serviceFilter}
                            onChange={(e) => setServiceFilter(e.target.value)}
                        >
                            <option value="All">All Services</option>
                            {services.map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                    </div>
                </div>
            </div>

            <Card className="border-none shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="text-xs font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100 bg-gray-50/50">
                                <th className="px-6 py-4">Order Details</th>
                                <th className="px-6 py-4">Customer</th>
                                <th className="px-6 py-4">Services</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50 bg-white">
                            {filteredOrders.length > 0 ? filteredOrders.map((order) => (
                                <tr key={order.id} className="hover:bg-gray-50/50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col">
                                            <span className="font-mono text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded w-fit mb-1">{order.id}</span>
                                            <span className="text-xs text-gray-500 font-medium">₵{order.total.toLocaleString()} · {new Date(order.createdAt).toLocaleDateString()}</span>
                                        </div>
                                    </td>
                                    <td className="py-5">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-2xl bg-gray-50 flex items-center justify-center text-xs font-black text-primary border border-gray-100 uppercase">
                                                {order.customerName.charAt(0)}
                                            </div>
                                            <div>
                                                <p className="font-black text-gray-900 text-sm uppercase tracking-tight leading-none">{order.customerName}</p>
                                                <p className="text-[10px] text-gray-500 font-bold mt-1.5 uppercase tracking-widest leading-none">{order.customerEmail}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-wrap gap-1">
                                            {Array.from(new Set(order.items.map(i => i.service))).map(s => (
                                                <span key={s} className="text-[10px] font-black uppercase tracking-tighter bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded">
                                                    {s}
                                                </span>
                                            ))}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider ${order.status === 'Completed' ? 'bg-teal-100 text-teal-700' :
                                            order.status === 'Processing' ? 'bg-blue-100 text-blue-700' :
                                                order.status === 'Cancelled' ? 'bg-red-100 text-red-700' :
                                                    'bg-amber-100 text-amber-700'
                                            }`}>
                                            {order.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end space-x-2">
                                            <Link
                                                to={`/admin/orders/${order.id}`}
                                                className="p-2 hover:bg-primary/10 text-gray-400 hover:text-primary rounded-lg transition-colors"
                                                title="View Details"
                                            >
                                                <IconEye className="h-5 w-5" />
                                            </Link>
                                            <button
                                                className="p-2 hover:bg-gray-100 text-gray-400 hover:text-gray-900 rounded-lg transition-colors"
                                                title="Download Files"
                                            >
                                                <IconDownload className="h-5 w-5" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                                        No orders found matching your criteria.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
};
