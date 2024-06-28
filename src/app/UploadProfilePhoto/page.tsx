'use client'
import React, { useState } from 'react';

export default function UploadProfilePhoto() {
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const form = e.target as HTMLFormElement;
        const photoInput = form.elements.namedItem('photo') as HTMLInputElement;

        if (!photoInput.files || photoInput.files.length === 0) {
            setError("Please select a photo to upload.");
            return;
        }

        const file = photoInput.files[0];
        const formData = new FormData();
        formData.append("photo", file);

        try {
            const res = await fetch(`https://linked-posts.routemisr.com/users/upload-photo`, {
                method: 'PATCH',
                headers: {
                    token: `${localStorage.getItem('usertoken') || ''}`
                },
                body: formData
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.error || 'An error occurred while uploading the photo.');
            }

            const data = await res.json();
            if (data.message === 'success') {
                window.location.href = "/UserPosts";
            } else if (data.error) {
                setError(data.error);
            }
        } catch (error: unknown) {
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError('An unexpected error occurred.');
            }
        }
    }

    if (typeof window !== 'undefined') {
        if (localStorage.getItem('usertoken') === null) {
            window.location.href = "/sign-in";
            return null; // Ensure to return early if user is not logged in
        }
    }

    return (
        <>
            <form className='mx-auto flex flex-col gap-y-5 md:w-[25%] w-[50%] mt-10' onSubmit={handleSubmit}>
                <input name="photo" type="file" className='w-full bg-white p-3 rounded-lg shadow-lg' />
                <button type='submit' className='w-fit p-2 bg-purple-600 text-white mx-auto rounded-lg'>Upload</button>
            </form>
            {error && <div className="text-red-500 w-fit mx-auto mt-5">{error}</div>}
        </>
    )
}
