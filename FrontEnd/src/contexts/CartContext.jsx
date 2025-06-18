import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItemCount, setCartItemCount] = useState(0);

    const updateCartCount = () => {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        setCartItemCount(totalItems);
    };

    useEffect(() => {
        updateCartCount();
        // Thêm event listener để cập nhật khi có thay đổi trong localStorage
        window.addEventListener('storage', updateCartCount);
        return () => window.removeEventListener('storage', updateCartCount);
    }, []);

    const addToCart = (item) => {
        const currentCart = JSON.parse(localStorage.getItem('cart')) || [];
        const existingItemIndex = currentCart.findIndex(
            cartItem => cartItem.id === item.id && cartItem.size === item.size
        );

        if (existingItemIndex !== -1) {
            currentCart[existingItemIndex].quantity += item.quantity;
        } else {
            currentCart.push(item);
        }

        localStorage.setItem('cart', JSON.stringify(currentCart));
        updateCartCount();
    };

    return (
        <CartContext.Provider value={{ cartItemCount, updateCartCount, addToCart }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}; 