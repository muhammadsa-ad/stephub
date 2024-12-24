'use client';
import { useState, useEffect } from 'react';
import '@/app/globals.css';
import ProductList from '@/app/products/page';

export default function Home() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    return (<div><ProductList /></div>);
}
