import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(() => {
        if (typeof window !== "undefined") {
            const storedCart = sessionStorage.getItem('cart');
            return storedCart ? JSON.parse(storedCart) : [];
        }
        return [];
    });

    const [cartNotify, setCartNotify] = useState(0);

    useEffect(() => {
        if (typeof window !== "undefined") {
            sessionStorage.setItem('cart', JSON.stringify(cart));
            setCartNotify(cart.length); // Update cartNotify based on cart length
        }
    }, [cart]);

    const addToCart = (product) => {
        const exists = cart.find((item) => item.id === product.id);
        if (exists) {
            // Show error toast for duplicates only if it hasn't been shown recently
            toast.error(`${product.name} is already in your cart!`, {
                toastId: 'duplicate-product', // Unique ID for the toast
            });
            return;
        }

        setCart((prevCart) => {
            toast.success(`${product.name} has been added to your cart!`, {
                toastId: 'add-product', // Unique ID for the toast
            });
            return [...prevCart, product]; // Add product to cart
        });
    };

    const removeFromCart = (productId) => {
        setCart((prevCart) => {
            const updatedCart = prevCart.filter((item) => item.id !== productId);
            toast.success(`Product removed from your cart!`, {
                toastId: 'remove-product', // Unique ID for the toast
            });
            return updatedCart;
        });
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, cartNotify }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
};