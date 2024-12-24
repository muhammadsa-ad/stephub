'use client'; // This ensures the component is a client-side component

import React from 'react';
import { useParams } from 'next/navigation';
import products from '@/app/api/products/page'; // Ensure this path and data are correct
import { useCart } from '@/app/context/cartcontext'; // Import the Cart context
import './productdetails.css'; // Ensure the CSS file exists

const ProductDetails = () => {
    const { id } = useParams(); // Extract product ID from the URL
    const { addToCart } = useCart(); // Access addToCart function from context

    // Find the product with the matching ID
    const product = products.find((item) => item.id === Number(id));

    if (!product) {
        // Fallback UI for an invalid product ID
        return <p>Product not found. Please check the URL.</p>;
    }

    const handleAddToCart = () => {
        // Add product to the cart
        addToCart(product);
    };

    return (
        <div className="product-details">
            <img className="Pimg" src={product.imageUrl} alt={product.name} />
             <div className="product-info">
                <h1 className="Pname">{product.name}</h1>
                <p className="Pdescription">{product.innerdescription}</p>
                <p className="Pprice">Price: ${product.price.toFixed(2)}</p>
                <button className="add-to-cart" onClick={handleAddToCart}>
                    Add to Cart
                </button>
            </div>
        </div>
    );
};

export default ProductDetails;
