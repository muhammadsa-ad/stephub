import React from 'react';
import './footer.css';

function Footer() {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-section">
                    <h3>About Us</h3>
                    <p>We provide high-quality shoes for all your needs, from athletic performance to casual comfort. Our mission is to offer stylish, durable, and comfortable footwear for everyone.</p>
                </div>

                <div className="footer-section">
                    <h3>Quick Links</h3>
                    <ul>
                        <li><a href="/">Home</a></li>
                        <li><a href="/shop">Shop</a></li>
                        <li><a href="/contact">Contact</a></li>
                        <li><a href="/about">About</a></li>
                        <li><a href="/faq">FAQ</a></li>
                    </ul>
                </div>

                <div className="footer-section">
                    <h3>Customer Service</h3>
                    <ul>
                        <li><a href="/returns">Returns</a></li>
                        <li><a href="/shipping">Shipping Information</a></li>
                        <li><a href="/terms">Terms of Service</a></li>
                        <li><a href="/privacy">Privacy Policy</a></li>
                    </ul>
                </div>

                <div className="footer-section">
                    <h3>Contact Us</h3>
                    <p>Email: stephub@shoestore.com</p>
                    <p>Phone: +1 (800) 123-4567</p>
                    <div className="social-icons">
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"></a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"></a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"></a>
                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"></a>
                    </div>
                </div>
            </div>

            <div className="footer-bottom">
                <p>&copy; 2024 Shoe Store. All Rights Reserved.</p>
            </div>
        </footer>
    );
}

export default Footer;
