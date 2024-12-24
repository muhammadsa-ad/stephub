'use client';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify'; // Import Toastify
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify styles
import "./signup.css"; // Ensure the path to the CSS file is correct

const Signup = ({ setUser }) => {
    const { register, handleSubmit, setError, formState: { errors } } = useForm();
    const [showPassword, setShowPassword] = useState(false);

    const onSubmit = async (data) => {
        data.action = 'signup'; 
        try {
            const response = await axios.post('/api/auth', data, {
                headers: { 'Content-Type': 'application/json' },
            });

            // Show success toast
            toast.success('Signup successful!', { position: 'top-right' });

            // Optional: Update user state
            if (setUser) {
                setUser(response.data); 
            }

            // Store user data in localStorage (if needed)
            localStorage.setItem('user', JSON.stringify(response.data));
        } catch (err) {
            console.error('Signup failed:', err.message);
            if (err.response) {
                setError("email", { message: err.response.data.message || 'Signup failed. Please try again.' });
            } else {
                setError("email", { message: err.message });
            }

            // Show error toast
            toast.error('Signup failed. Please try again.', { position: 'top-right'});
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="signup-container">
            <ToastContainer /> {/* Required for displaying toasts */}
            <form className="signup-form" onSubmit={handleSubmit(onSubmit)}>
                <h2>Sign Up</h2>
                <input 
                    {...register('fullName', { required: "Full Name is required" })} 
                    className="fullName-input" 
                    placeholder="Full Name" 
                    type="text" 
                />
                {errors.fullName && <p className="error-message">{errors.fullName.message}</p>}

                <input 
                    {...register('email', { 
                        required: "Email is required",
                        pattern: { value: /^[^@]+@[^@]+\.[^@]+$/, message: "Invalid email address" }
                    })} 
                    className="email-input" 
                    placeholder="Email" 
                    type="email" 
                />
                {errors.email && <p className="error-message">{errors.email.message}</p>}

                <div className="password-container">
                    <input 
                        {...register('password', { 
                            required: "Password is required", 
                            minLength: { value: 6, message: "Password must be at least 6 characters" }
                        })} 
                        className="password-input" 
                        type={showPassword ? 'text' : 'password'} 
                        placeholder="Password" 
                    />
                    <button 
                        type="button" 
                        onClick={togglePasswordVisibility} 
                        className="toggle-password"
                    >
                        {showPassword ? 'Hide' : 'Show'}
                    </button>    
                </div>
                {errors.password && <p className="error-message">{errors.password.message}</p>}
                
                <div className="tcs">
                    <input 
                        type="checkbox" 
                        {...register('terms', { required: "You must accept the terms and conditions" })} 
                    />
                    <p>I have read and acknowledged the T&Cs</p>
                </div>
                {errors.terms && <p className="error-message">{errors.terms.message}</p>}

                <button className="signupbutton" type="submit">Sign Up</button>
            </form>
        </div>
    );
};

export default Signup;
