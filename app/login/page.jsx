'use client'; // For Next.js 13+ (if using server components)

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify'; // Import Toastify
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify styles
import './login.css'; // Ensure the CSS file path is correct
import Dashboard from '../components/dashboard/dashboard';

const Login = () => {
    const { register, handleSubmit, setError, formState: { errors } } = useForm();
    const [showPassword, setShowPassword] = useState(false);
    const [user, setUser ] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const onSubmit = async (data) => {
        setLoading(true);
        data.action = 'login';
        try {
            const response = await axios.post('/api/auth', data, {
                headers: { 'Content-Type': 'application/json' },
            });

            // Show success toast
            toast.success('Login successful!', { position: 'top-right' });

            console.log('User logged in:', response.data); // Handle user data

            // Store the user data in localStorage (optional)
            localStorage.setItem('user', JSON.stringify(response.data));
            setUser(response.data);
        } catch (err) {
            console.error('Login failed:', err.message);

            // Show error toast
            toast.error(err.response?.data?.message || 'Login failed. Please try again.', { position: 'top-right', autoClose: 120000 });

            // Set form errors
            setError('email', {
                message: err.response?.data?.message || 'Login failed. Please try again.',
            });
        } finally {
            setLoading(false);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div>
            {!user ? (
                <>
                    <>   {/* Toast Container for showing ,toasts */}
                    <ToastContainer />
                        <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
                            <h2>Login</h2>

                            {/* Email input */}
                            <input
                                {...register('email', { required: "Email is required" })}
                                className="email-input"
                                placeholder="Email"
                                type="email"
                                required
                            />
                            {errors.email && <p className="error-message">{errors.email.message}</p>}

                            {/* Password input */}
                            <div className="password-container">
                                <input
                                    {...register('password', { required: "Password is required" })}
                                    className="password-input"
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="Password"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={togglePasswordVisibility}
                                    className="toggle-password"
                                >
                                    {showPassword ? 'Hide' : 'Show'}
                                </button>
                            </div>
                            <div className="tcs">
                                <input
                                    type="checkbox"
                                    {...register('terms')}
                                />
                                <p>I want Promotional And Marketing emails </p>
                            </div>
                            {errors.password && <p className="error-message">{errors.password.message}</p>}

                            {/* Submit Button */}
                            <button className="loginbutton" type="submit" disabled={loading}>
                                {loading ? 'Loading...' : 'Login'}
                            </button>
                        </form>
                    </>
                </>
            ) : (
                <>
                    <h2 className='welcome'>Welcome, {user.fullName}!</h2><Dashboard setUser={setUser} /> {/* fddh*/}
                </>
            )}
         


        </div>
    );
};

export default Login;
