'use client'
import React, { useState } from 'react'

export default function ChangePassword() {
    const [error, setError] = useState(null);
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const password = form.elements.namedItem('password') as HTMLInputElement;
        const newPassword = form.elements.namedItem('newPassword') as HTMLInputElement;
        const res = await fetch(`https://linked-posts.routemisr.com/users/change-password`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                token: localStorage.getItem('usertoken') || ''
            },
            body: JSON.stringify({
                password: password.value,
                newPassword: newPassword.value
            })
        });
        const data = await res.json();
        console.log(data);
        if (data.error) {
            setError(data.error);
        }
        if (data.message === 'success') {
            localStorage.removeItem('usertoken');
            window.location.href = "/sign-in";
        }

    };
    if (typeof window !== 'undefined') {
        if (localStorage.getItem('usertoken') === null) {
            window.location.href = "/sign-in";
            return null; // Ensure to return early if user is not logged in
        }

    }

    return (
        <>
            <form className='md:w-[25%] w-[75%] mx-auto flex flex-col gap-y-5 mt-10 p-5 shadow-lg rounded-lg bg-purple-950' onSubmit={handleSubmit}>
                <input name='password' type="password" className='border-none outline-none rounded-lg py-1 px-3 shadow-lg' />
                <input name='newPassword' type="password" className='border-none outline-none rounded-lg py-1 px-3 shadow-lg' />
                <button type="submit" className='text-white bg-sky-500 px-3 py-1 rounded-lg w-fit mx-auto shadow-lg'>Change Password</button>
            </form>
            {error !== null ? <div className="text-red-500 w-fit mx-auto mt-5">{error}</div> : null}
        </>
    )
}
