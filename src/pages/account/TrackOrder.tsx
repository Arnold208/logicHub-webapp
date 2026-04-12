import { useParams, Link } from 'react-router-dom';
import { useOrders, OrderStatus } from '../../context/OrderContext';
import { useAuth } from '../../hooks/useAuth';
import { Card } from '../../components/ui/Card';
import {
    IconArrowLeft,
    IconPackage,
    IconClock,
    IconCircleCheckFilled,
    IconTruck,
    IconMessageCircle,
    IconBuildingBridge,
    IconSend,
    IconUserCircle
} from '@tabler/icons-react';
import { useState } from 'react';

export const TrackOrder = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const { getOrderById, addComment } = useOrders();
    const [newMessage, setNewMessage] = useState('');
    const order = getOrderById(id || '');

    if (!order) return <div className="p-8 text-center text-gray-500 font-bold">Order not found.</div>;

    const stages: { status: OrderStatus; label: string; icon: any; description: string }[] = [
        { status: 'Received', label: 'Order Received', icon: IconPackage, description: 'Design files received and in queue for technical review.' },
        { status: 'Processing', label: 'In Review', icon: IconBuildingBridge, description: 'Engineers are optimizing your model for production.' },
        { status: 'Printing/Crafting', label: 'Production', icon: IconClock, description: 'Your items are active on the production floor.' },
        { status: 'Ready for Delivery', label: 'Quality Check', icon: IconTruck, description: 'Finished parts passed inspection and are ready for pickup/delivery.' },
        { status: 'Completed', label: 'Fulfilled', icon: IconCircleCheckFilled, description: 'The project has been successfully completed.' }
    ];

    const currentStageIndex = stages.findIndex(s => s.status === order.status);

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newMessage.trim() || !user) return;

        await addComment(order.id, user.id, newMessage, false);
        setNewMessage('');
    };

    return (
        <div className="min-h-screen bg-[#fafafa] py-12 font-sans">
            <div className="max-w-5xl mx-auto px-4 space-y-8">
                <div className="flex items-center justify-between">
                    <Link to="/orders" className="inline-flex items-center text-xs font-black uppercase tracking-widest text-gray-400 hover:text-primary transition-colors">
                        <IconArrowLeft className="h-4 w-4 mr-2" />
                        Back to Portfolio
                    </Link>
                    <div className="px-4 py-1.5 bg-white border border-gray-100 rounded-full shadow-sm">
                        <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Project Reference: </span>
                        <span className="text-[10px] font-black uppercase tracking-widest text-primary font-mono">{order.id}</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column: Timeline */}
                    <div className="lg:col-span-2 space-y-8">
                        <Card className="p-10 bg-white border-none shadow-[0_8px_30px_rgb(0,0,0,0.02)] relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -mr-32 -mt-32"></div>

                            <div className="relative z-10">
                                <h1 className="text-3xl font-black text-gray-900 tracking-tight mb-8">Production Route</h1>

                                <div className="space-y-10 relative before:absolute before:left-6 before:top-4 before:bottom-4 before:w-0.5 before:bg-gray-100">
                                    {stages.map((stage, idx) => {
                                        const isCompleted = currentStageIndex > idx;
                                        const isCurrent = currentStageIndex === idx;
                                        const isFuture = currentStageIndex < idx;

                                        return (
                                            <div key={stage.status} className="relative flex items-start gap-8 group">
                                                <div className={`relative z-10 flex items-center justify-center w-12 h-12 rounded-2xl border-2 transition-all duration-500 scale-90 ${isCompleted ? 'bg-teal-500 border-teal-500 text-white' :
                                                    isCurrent ? 'bg-white border-primary text-primary scale-110 shadow-xl shadow-primary/10' :
                                                        'bg-white border-gray-100 text-gray-300'
                                                    }`}>
                                                    <stage.icon className="h-5 w-5" />
                                                    {isCompleted && (
                                                        <div className="absolute -top-1 -right-1 bg-white rounded-full p-0.5 border border-teal-500">
                                                            <IconCircleCheckFilled className="h-3 w-3 text-teal-500" />
                                                        </div>
                                                    )}
                                                </div>

                                                <div className="flex-1 pt-1">
                                                    <div className="flex items-center gap-3">
                                                        <h3 className={`text-sm font-black uppercase tracking-widest transition-colors ${isFuture ? 'text-gray-300' : isCurrent ? 'text-primary' : 'text-gray-900'
                                                            }`}>
                                                            {stage.label}
                                                        </h3>
                                                        {isCurrent && (
                                                            <span className="px-2 py-0.5 bg-primary/10 text-primary text-[8px] font-black uppercase tracking-tight rounded-md animate-pulse">In Progress</span>
                                                        )}
                                                    </div>
                                                    <p className={`text-xs mt-2 leading-relaxed transition-colors ${isFuture ? 'text-gray-200' : 'text-gray-500'
                                                        }`}>
                                                        {stage.description}
                                                    </p>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </Card>
                    </div>

                    {/* Right Column: Communication/Chat */}
                    <div className="space-y-8">
                        <Card className="flex flex-col h-[600px] bg-white border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden">
                            {/* Chat Header */}
                            <div className="p-6 border-b border-gray-50 bg-gray-50/50 backdrop-blur-sm">
                                <div className="flex items-center gap-3">
                                    <div className="p-2.5 bg-primary/10 text-primary rounded-xl">
                                        <IconMessageCircle className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-black text-gray-900 leading-none">Team Communication</h3>
                                        <p className="text-[10px] font-bold text-gray-400 mt-1 uppercase tracking-tighter">Connected to LogicHub Ops</p>
                                    </div>
                                </div>
                            </div>

                            {/* Chat Content */}
                            <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar bg-gradient-to-b from-transparent to-gray-50/30">
                                {order.comments.length === 0 ? (
                                    <div className="h-full flex flex-col items-center justify-center text-center p-8 opacity-30">
                                        <IconMessageCircle className="h-12 w-12 mb-4" />
                                        <p className="text-[10px] font-black uppercase tracking-[0.2em]">Start a conversation</p>
                                        <p className="text-[10px] font-bold mt-2 leading-relaxed">Ask about production status or file updates.</p>
                                    </div>
                                ) : (
                                    order.comments.filter(c => !c.isAdminOnly).map((comment) => {
                                        const isMe = comment.authorId === user?.id;
                                        return (
                                            <div key={comment.id} className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
                                                <div className="flex items-center gap-2 mb-2 px-1">
                                                    {!isMe && <IconUserCircle className="h-4 w-4 text-primary opacity-50" />}
                                                    <span className="text-[9px] font-black uppercase tracking-widest text-gray-400">
                                                        {isMe ? 'You' : 'LogicHub Team'}
                                                    </span>
                                                </div>
                                                <div className={`max-w-[85%] px-5 py-4 rounded-3xl text-sm leading-relaxed shadow-sm ${isMe
                                                    ? 'bg-primary text-white shadow-lg shadow-primary/20 rounded-tr-none font-bold'
                                                    : 'bg-white border border-gray-100 text-gray-700 shadow-xl shadow-black/[0.02] rounded-tl-none font-medium'
                                                    }`}>
                                                    {comment.text}
                                                </div>
                                                <span className="text-[9px] font-black text-gray-400 mt-2 uppercase px-1 tracking-widest">
                                                    {new Date(comment.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                </span>
                                            </div>
                                        );
                                    })
                                )}
                            </div>

                            {/* Chat Input */}
                            <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-50 bg-white">
                                <div className="relative group">
                                    <input
                                        type="text"
                                        value={newMessage}
                                        onChange={(e) => setNewMessage(e.target.value)}
                                        placeholder="Type your message..."
                                        className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 pr-12 text-xs font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-gray-300"
                                    />
                                    <button
                                        type="submit"
                                        className="absolute right-2 top-2 p-1.5 bg-primary text-white rounded-lg hover:scale-105 active:scale-95 transition-all shadow-md shadow-primary/20 disabled:opacity-50"
                                        disabled={!newMessage.trim()}
                                    >
                                        <IconSend className="h-4 w-4" />
                                    </button>
                                </div>
                            </form>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
};
