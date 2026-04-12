import { useParams, Link } from 'react-router-dom';
import { useOrders, OrderStatus } from '../../context/OrderContext';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { STLViewer } from '../../components/3d/STLViewer';
import { useAuth } from '../../hooks/useAuth';
import { supabase } from '../../lib/supabase';
import {
    IconArrowLeft,
    IconDownload,
    IconSend,
    IconClock,
    IconCircleCheckFilled,
    IconFile3d,
    IconMapPin
} from '@tabler/icons-react';
import { useState, useEffect } from 'react';

export const OrderDetail = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const { getOrderById, updateOrderStatus, addComment } = useOrders();
    const order = getOrderById(id || '');
    const [newComment, setNewComment] = useState('');
    const [commentIsAdminOnly, setCommentIsAdminOnly] = useState(false);
    const [fileDatas, setFileDatas] = useState<Record<string, ArrayBuffer>>({});

    useEffect(() => {
        if (order) {
            order.items.forEach(async (item) => {
                if (item.storagePath && !fileDatas[item.id]) {
                    const { data } = await supabase.storage
                        .from('stls')
                        .download(item.storagePath);

                    if (data) {
                        const buffer = await data.arrayBuffer();
                        setFileDatas(prev => ({ ...prev, [item.id]: buffer }));
                    }
                }
            });
        }
    }, [order]);

    if (!order) return <div className="p-8 text-center text-gray-500">Order not found.</div>;

    const handleUpdateStatus = async (status: OrderStatus) => {
        await updateOrderStatus(order.id, status, `Order status updated to ${status}`);
    };

    const handleAddComment = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newComment.trim() || !user) return;
        await addComment(order.id, user.id, newComment, commentIsAdminOnly);
        setNewComment('');
    };

    const handleDownload = async (path: string, fileName: string) => {
        const { data } = await supabase.storage.from('stls').download(path);
        if (data) {
            const url = window.URL.createObjectURL(data);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', fileName);
            document.body.appendChild(link);
            link.click();
            link.remove();
        }
    };

    const statuses: OrderStatus[] = [
        'Received', 'Processing', 'Printing/Crafting', 'Ready for Delivery', 'Completed'
    ];

    return (
        <div className="max-w-7xl mx-auto space-y-8">
            <Link to="/admin/orders" className="inline-flex items-center text-sm font-bold text-gray-500 hover:text-primary transition-colors">
                <IconArrowLeft className="h-4 w-4 mr-1" />
                Back to Orders
            </Link>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Left Column: Details & Items */}
                <div className="flex-1 space-y-8">
                    <Card className="p-0 overflow-hidden border-none shadow-sm">
                        <div className="bg-primary/5 p-6 border-b border-primary/10 flex justify-between items-center">
                            <div>
                                <h2 className="text-3xl font-black text-gray-900 leading-none tracking-tight">Order {order.id.split('-')[0]}</h2>
                                <p className="text-[10px] text-gray-400 font-bold mt-4 uppercase tracking-[0.2em]">{new Date(order.createdAt).toLocaleString(undefined, { dateStyle: 'long', timeStyle: 'short' })}</p>
                            </div>
                            <span className="px-5 py-2.5 bg-primary shadow-lg shadow-primary/20 rounded-2xl text-[10px] font-black text-white uppercase tracking-[0.2em]">
                                {order.status}
                            </span>
                        </div>

                        <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-12">
                            <div>
                                <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4">Customer Information</h3>
                                <div className="space-y-3">
                                    <p className="text-lg font-black text-gray-900">{order.customerName}</p>
                                    <p className="text-gray-600 font-medium">{order.customerEmail}</p>
                                    {order.shippingAddress && (
                                        <div className="pt-4 flex items-start space-x-2">
                                            <IconMapPin className="h-4 w-4 text-gray-400 mt-1" />
                                            <div>
                                                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Shipping Address</p>
                                                <p className="text-sm text-gray-600 font-medium">
                                                    {order.shippingAddress.street}, {order.shippingAddress.city}, {order.shippingAddress.state}
                                                </p>
                                                <p className="text-[10px] text-primary font-black uppercase tracking-widest mt-1">
                                                    Method: {order.shippingAddress.deliveryOption}
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="text-right md:text-left">
                                <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4">Financial Summary</h3>
                                <div className="space-y-1">
                                    <div className="flex justify-between items-center md:max-w-xs">
                                        <span className="text-gray-500 font-bold">Subtotal</span>
                                        <span className="font-bold text-gray-900">₵{order.total}</span>
                                    </div>
                                    <div className="flex justify-between items-center md:max-w-xs pt-4 border-t border-gray-100">
                                        <span className="text-gray-900 font-black">Grand Total</span>
                                        <span className="text-2xl font-black text-primary">₵{order.total}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Card>

                    <h3 className="text-xl font-bold text-gray-900 px-2">Order Items</h3>
                    <div className="space-y-4">
                        {order.items.map((item, idx) => (
                            <Card key={idx} className="p-6 border-none shadow-sm">
                                <div className="flex flex-col lg:flex-row gap-8">
                                    {/* Item Info */}
                                    <div className="flex-grow">
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <span className="text-[10px] font-black uppercase tracking-widest bg-gray-100 text-gray-600 px-2 py-0.5 rounded mb-2 inline-block">
                                                    {item.service}
                                                </span>
                                                <h4 className="text-lg font-extrabold text-gray-900 flex items-center">
                                                    {item.name}
                                                    {item.fileData && <IconFile3d className="h-5 w-5 ml-2 text-primary" />}
                                                </h4>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-sm font-bold text-gray-500">Qty: {item.quantity}</p>
                                                <p className="font-black text-gray-900">₵{item.price}</p>
                                            </div>
                                        </div>

                                        {item.config && (
                                            <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-4 pb-4 border-b border-gray-50">
                                                {Object.entries(item.config).map(([k, v]: [string, any]) => (
                                                    <div key={k}>
                                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{k}</p>
                                                        <p className="text-sm font-black text-gray-700">{v.toString()}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        )}

                                        <div className="mt-6">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="border-gray-200 text-gray-700 hover:bg-gray-50"
                                                onClick={() => item.storagePath && handleDownload(item.storagePath, item.name)}
                                                disabled={!item.storagePath}
                                            >
                                                <IconDownload className="h-4 w-4 mr-2" />
                                                Download Assets
                                            </Button>
                                        </div>
                                    </div>

                                    {/* 3D Preview */}
                                    {(item.storagePath && fileDatas[item.id]) && (
                                        <div className="w-full lg:w-48 h-48 bg-gray-50 rounded-2xl overflow-hidden border border-gray-100">
                                            <STLViewer
                                                fileData={fileDatas[item.id]}
                                                fileName={item.name}
                                                className="w-full h-full"
                                                color={item.config?.color || 'White'}
                                            />
                                        </div>
                                    )}
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>

                {/* Right Column: Workflow & Comments */}
                <div className="w-full lg:w-[400px] space-y-8">
                    {/* Status Management */}
                    <Card className="p-6 border-none shadow-sm space-y-6">
                        <h3 className="text-xl font-bold text-gray-900">Order Workflow</h3>
                        <div className="space-y-4">
                            {statuses.map((s, idx) => {
                                const isCurrent = order.status === s;
                                const isDone = statuses.indexOf(order.status) >= idx;
                                return (
                                    <button
                                        key={s}
                                        onClick={() => handleUpdateStatus(s)}
                                        className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all border-2 ${isCurrent
                                            ? 'border-primary bg-primary/5 text-primary'
                                            : isDone
                                                ? 'border-teal-500 bg-teal-50 text-teal-700'
                                                : 'border-gray-100 bg-white text-gray-400 hover:border-gray-300'
                                            }`}
                                    >
                                        <div className="flex items-center space-x-3">
                                            {isDone ? <IconCircleCheckFilled className="h-6 w-6" /> : <div className="w-6 h-6 border-2 border-current rounded-full" />}
                                            <span className="font-black text-sm uppercase tracking-wider">{s}</span>
                                        </div>
                                        {isCurrent && <IconClock className="h-5 w-5 animate-pulse" />}
                                    </button>
                                );
                            })}
                        </div>
                    </Card>

                    {/* Comments Thread */}
                    <Card className="p-6 border-none shadow-sm flex flex-col h-[600px]">
                        <h3 className="text-xl font-bold text-gray-900 mb-6 font-primary">Communication</h3>

                        <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
                            {order.comments.map(c => {
                                const isMe = c.authorId === user?.id;
                                return (
                                    <div key={c.id} className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
                                        <p className={`text-[10px] font-black uppercase tracking-widest mb-1 px-1 ${isMe ? 'text-primary' : 'text-gray-400'}`}>
                                            {isMe ? 'You' : c.author} {c.isAdminOnly && '· INTERNAL'}
                                        </p>
                                        <div className={`max-w-[85%] rounded-3xl px-5 py-4 ${isMe
                                            ? 'bg-primary text-white shadow-lg shadow-primary/20 rounded-tr-none'
                                            : 'bg-white border border-gray-100 text-gray-900 shadow-sm rounded-tl-none'
                                            }`}>
                                            <p className="text-sm font-medium leading-relaxed">{c.text}</p>
                                            <p className={`text-[9px] mt-3 font-black uppercase tracking-tight text-right ${isMe ? 'text-white/50' : 'text-gray-400'}`}>
                                                {new Date(c.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        <form onSubmit={handleAddComment} className="mt-6 pt-6 border-t border-gray-100 space-y-4">
                            <textarea
                                className="w-full bg-gray-50 border border-gray-200 rounded-2xl p-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 font-medium h-24"
                                placeholder="Type your message..."
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                            />
                            <div className="flex items-center justify-between">
                                <label className="flex items-center space-x-2 cursor-pointer group">
                                    <input
                                        type="checkbox"
                                        className="form-checkbox h-4 w-4 text-primary rounded border-gray-300 focus:ring-offset-0 focus:ring-0"
                                        checked={commentIsAdminOnly}
                                        onChange={(e) => setCommentIsAdminOnly(e.target.checked)}
                                    />
                                    <span className="text-xs font-bold text-gray-500 group-hover:text-gray-900 uppercase tracking-widest leading-none">Internal Only</span>
                                </label>
                                <button type="submit" className="px-6 py-2.5 bg-primary text-white rounded-xl text-xs font-black uppercase tracking-widest shadow-lg shadow-primary/20 hover:scale-105 transition-all flex items-center shrink-0">
                                    <IconSend className="h-4 w-4 mr-2" />
                                    Send
                                </button>
                            </div>
                        </form>
                    </Card>
                </div>
            </div>
        </div>
    );
};
