import { createContext, useContext, useState, ReactNode } from 'react';

export interface CartItem {
    id: string;
    file: {
        name: string;
        size: number;
        data: string | ArrayBuffer | null;
    };
    mirroring: {
        mirrorX: boolean;
        mirrorY: boolean;
        mirrorZ: boolean;
    };
    config: {
        quantity: number;
        material: string;
        color: string;
        quality: string;
        supportGeneration: boolean;
        infillPercentage: number;
    };
    pricing: {
        unitPrice: number;
        subtotal: number;
        deliveryCost: number;
        total: number;
    };
}

interface CartContextType {
    items: CartItem[];
    addToCart: (item: CartItem) => void;
    removeFromCart: (id: string) => void;
    clearCart: () => void;
    cartTotal: number;
    itemCount: number;
}

const CartContext = createContext<CartContextType | null>(null);

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [items, setItems] = useState<CartItem[]>([]);

    const addToCart = (item: CartItem) => {
        setItems((prev) => [...prev, item]);
    };

    const removeFromCart = (id: string) => {
        setItems((prev) => prev.filter((item) => item.id !== id));
    };

    const clearCart = () => {
        setItems([]);
    };

    const cartTotal = items.reduce((sum, item) => sum + item.pricing.subtotal, 0);
    const itemCount = items.reduce((sum, item) => sum + item.config.quantity, 0);

    return (
        <CartContext.Provider value={{ items, addToCart, removeFromCart, clearCart, cartTotal, itemCount }}>
            {children}
        </CartContext.Provider>
    );
};
