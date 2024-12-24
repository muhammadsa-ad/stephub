
"use client";
import React, { useEffect, useState } from "react";
import "@/app/components/dashboard/dashboard.css";
import Link from 'next/link';
import { useRouter }  from 'next/router'; 

export default function Dashboard({ setUser  }) {
    const [users, setUsers] = useState([]);
    // const router = useRouter(); 

    useEffect(() => {
        const fetchUsers = async () => {
            const response = await fetch('/api/users');
            const data = await response.json();
            setUsers(data);
        };

        fetchUsers();
    }, []);

    const handleLogout = () => {
        setUser (null); 
        localStorage.removeItem('user');
    };

    return (
        <div className="dashboard">
            <h1 className="title">User  List</h1>
            <table className="userTable">
                <thead>
                    <tr>
                        <th className="tableHeader">User  Name</th><th className="tableHeader">Email</th> {/* New column for Email */}</tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr className="tableRow" key={user._id}>
                            <td className="tableData">{user.fullName}</td><td className="tableData">{user.email}</td> {/* Display email here */}</tr>
                    ))}
                </tbody>
                
            </table>
            <button onClick={handleLogout} className="logoutButton">Logout</button> {/* Logout button */}
            {/*Home Page */}
     
        </div>
    );
}