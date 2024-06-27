import React from 'react'
import logo from "../../assets/Screenshot 2024-06-25 153522.png";
import Image from "next/image";
export default function Footer() {
    return (
        <div className='bg-gray-900 py-3 fixed bottom-0 left-0 right-0'>
            <Image
                src={logo}
                alt="logo"
                className="rounded-full h-auto w-auto mx-auto"
                style={{ width: '40px', height: 'auto' }}
            />
            <h1 className='text-white text-center text-2xl font-black'>Socials</h1>
        </div>
    )
}
