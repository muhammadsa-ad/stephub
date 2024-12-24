'use client'; // This makes the component a client component

import React, { useState } from 'react';
import { useCart } from '@/app/context/cartcontext';
import './cart.css'; // Import the CSS file

const Cart = () => {
    const { cart, removeFromCart } = useCart();
    const [selectedItems, setSelectedItems] = useState([]);

    const handleSelectItem = (productId) => {
        setSelectedItems((prevSelected) => {
            if (prevSelected.includes(productId)) {
                return prevSelected.filter(id => id !== productId); // Deselect
            } else {
                return [...prevSelected, productId]; // Select
            }
        });
    };

    const calculateTotal = () => {
        return cart.reduce((total, item) => {
            if (selectedItems.includes(item.id)) {
                return total + item.price;
            }
            return total;
        }, 0).toFixed(2); // Format to 2 decimal places
    };

    const handleCheckout = () => {
        const total = calculateTotal();
        alert(`Proceeding to checkout with total: $${total}`);
        // Here you can implement the actual checkout logic
    };

    return (
        <div className="cart-container">
            <h1 className="cart-title">Your Cart</h1>
            {cart.length === 0 ? (
                <p className="cart-empty">Your cart is empty.</p>
            ) : (
                <div className="cart-items-container">
                    <ul className="cart-items-list">
                        {cart.map((item) => (
                            <li key={item.id} className="cart-item">
                                <input
                                    type="checkbox"
                                    className="cart-item-checkbox"
                                    checked={selectedItems.includes(item.id)} // Check if the item is selected
                                    onChange={() => handleSelectItem(item.id)} // Toggle selection
                                />
                                <span className="cart-item-name">{item.name}</span> - 
                                <span className="cart-item-price">${item.price.toFixed(2)}</span>
                                <button className="cart-item-remove" onClick={() => removeFromCart(item.id)}>Remove</button>
                            </li>
                        ))}
                    </ul>
                    <h2 className="cart-total">Total: ${calculateTotal()}</h2>
                    <button className="cart-checkout-button" onClick={handleCheckout}>Checkout</button>
                </div>
            )}
        </div>
    );
};

export default Cart;
