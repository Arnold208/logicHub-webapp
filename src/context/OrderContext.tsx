import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../hooks/useAuth';

export type OrderStatus = 'Received' | 'Processing' | 'Printing/Crafting' | 'Ready for Delivery' | 'Completed' | 'Cancelled';

export interface OrderItem {
    id: string;
    service: string;
    name: string;
    description?: string;
    quantity: number;
    price: number;
    fileData?: any;
    config?: any;
    storagePath?: string;
}

export interface OrderComment {
    id: string;
    author: string;
    authorId?: string;
    text: string;
    timestamp: string;
    isAdminOnly?: boolean;
}

export interface Order {
    id: string;
    userId: string;
    customerName: string;
    customerEmail: string;
    items: OrderItem[];
    total: number;
    status: OrderStatus;
    createdAt: string;
    updatedAt: string;
    comments: OrderComment[];
    shippingAddress: any;
}

interface OrderContextType {
    orders: Order[];
    loading: boolean;
    addOrder: (orderData: any) => Promise<Order | null>;
    updateOrderStatus: (orderId: string, status: OrderStatus, commentText?: string) => Promise<void>;
    addComment: (orderId: string, authorId: string, text: string, isAdminOnly?: boolean) => Promise<void>;
    getOrderById: (id: string) => Order | undefined;
    refreshOrders: () => Promise<void>;
}

const OrderContext = createContext<OrderContextType | null>(null);

export const useOrders = () => {
    const context = useContext(OrderContext);
    if (!context) {
        throw new Error('useOrders must be used within an OrderProvider');
    }
    return context;
};

export const OrderProvider = ({ children }: { children: ReactNode }) => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const { user, loading: authLoading } = useAuth();

    const fetchOrders = async () => {
        try {
            setLoading(true);
            let query = supabase
                .from('orders')
                .select(`
                    *,
                    profiles:user_id (full_name, email),
                    order_items (*),
                    order_comments (*)
                `)
                .order('created_at', { ascending: false });

            // If not admin, only fetch own orders
            if (user && user.role !== 'admin') {
                query = query.eq('user_id', user.id);
            }

            const { data, error } = await query;

            if (error) throw error;

            const transformedOrders: Order[] = data.map((o: any) => ({
                id: o.id,
                userId: o.user_id,
                customerName: o.profiles?.full_name || 'Unknown',
                customerEmail: o.profiles?.email || 'Unknown',
                status: o.status as OrderStatus,
                total: o.total_price,
                createdAt: o.created_at,
                updatedAt: o.updated_at,
                shippingAddress: o.shipping_address,
                items: o.order_items.map((item: any) => ({
                    id: item.id,
                    service: item.service_type,
                    name: item.item_name,
                    quantity: item.quantity,
                    price: item.unit_price,
                    config: item.config,
                    storagePath: item.storage_path
                })),
                comments: o.order_comments.map((c: any) => ({
                    id: c.id,
                    author: c.author_name || (c.is_status_update ? 'Admin' : 'User'),
                    authorId: c.author_id,
                    text: c.body || c.text,
                    timestamp: c.created_at,
                    isAdminOnly: c.is_status_update
                }))
            }));

            setOrders(transformedOrders);
        } catch (err) {
            console.error('Error fetching orders:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (authLoading) return; // Wait for AuthContext to resolve the session

        fetchOrders();

        // Real-time subscription
        const subscription = supabase
            .channel('orders-channel')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'orders' }, () => fetchOrders())
            .on('postgres_changes', { event: '*', schema: 'public', table: 'order_comments' }, () => fetchOrders())
            .subscribe();

        return () => {
            supabase.removeChannel(subscription);
        };
    }, [user, authLoading]);

    const addOrder = async (orderData: any) => {
        try {
            if (!user) throw new Error('Not authenticated');

            // 1. Create order
            const { data: order, error: orderError } = await supabase
                .from('orders')
                .insert({
                    user_id: user.id,
                    total_price: orderData.total,
                    shipping_address: orderData.shippingAddress || user.default_address || {},
                    status: 'Received'
                })
                .select()
                .single();

            if (orderError) throw orderError;

            // 2. Create order items
            const itemsToInsert = orderData.items.map((item: any) => ({
                order_id: order.id,
                service_type: item.service,
                item_name: item.name,
                unit_price: item.price,
                quantity: item.quantity,
                config: item.config,
                storage_path: item.storagePath
            }));

            const { error: itemsError } = await supabase
                .from('order_items')
                .insert(itemsToInsert);

            if (itemsError) throw itemsError;

            await fetchOrders();
            return order;
        } catch (err) {
            console.error('Error adding order:', err);
            return null;
        }
    };

    const updateOrderStatus = async (orderId: string, status: OrderStatus, commentText?: string) => {
        try {
            const { error } = await supabase
                .from('orders')
                .update({ status, updated_at: new Date().toISOString() })
                .eq('id', orderId);

            if (error) throw error;

            if (commentText && user) {
                await addComment(orderId, user.id, commentText, true);
            }

            await fetchOrders();
        } catch (err) {
            console.error('Error updating order status:', err);
        }
    };

    const addComment = async (orderId: string, authorId: string, text: string, isAdminOnly: boolean = false) => {
        try {
            const { error } = await supabase
                .from('order_comments')
                .insert({
                    order_id: orderId,
                    author_id: authorId,
                    text: text,
                    is_admin_only: isAdminOnly
                });

            if (error) throw error;
            await fetchOrders();
        } catch (err) {
            console.error('Error adding comment:', err);
        }
    };

    const getOrderById = (id: string) => orders.find(o => o.id === id);

    return (
        <OrderContext.Provider value={{
            orders,
            loading,
            addOrder,
            updateOrderStatus,
            addComment,
            getOrderById,
            refreshOrders: fetchOrders
        }}>
            {children}
        </OrderContext.Provider>
    );
};
