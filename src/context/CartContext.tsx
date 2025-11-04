import React, { useState } from 'react';

type CartContextType = {
    cartItems: string[];
    addToCart: (item: string) => void;
    removeFromCart: (item: string) => void;
};

export const CartContext = React.createContext<CartContextType | null>(null);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
    const [cartItems, setCartItems] = useState<string[]>([]);
    const addToCart = (item: string) => {
        setCartItems(prev => [...prev, item]);
    };
    const removeFromCart = (item: string) => {
        setCartItems(prev => prev.filter(i => i !== item));
    };
    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
            {children}
        </CartContext.Provider>
    );
};