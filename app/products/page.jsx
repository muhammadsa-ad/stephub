'use client'; // This makes the component a client component

import React from 'react';
import Link from 'next/link';
import products from '@/app/api/products/page';
import { useCart } from '@/app/context/cartcontext'; // Import the Cart context
import './products.css';

const ProductList = () => {
    const { addToCart } = useCart(); // Get the addToCart function

    const handleAddToCart = (product) => {
        addToCart(product); // This will now handle duplicates
    };

    return (
        <>
            <h2 className="h2" >Product List</h2>
            <div className="product-list">
                {products.map((product) => (
                    <div key={product.id} className="product-item">
                        <Link href={`/productdetails/${product.id}`} passHref>
                            <img src={product.imageUrl} alt={product.name} className="product-image" />
                            <h3 className="product-name">{product.name}</h3>
                            <p className="product-description">{product.description}</p>
                            <p className="product-price">Price: ${product.price.toFixed(2)}</p>
                        </Link>
                        <button className="product-button" onClick={() => handleAddToCart(product)}>
                            Add to Cart
                        </button>
                    </div>
                ))}
            </div>
        </>
    );
};

export default ProductList;
