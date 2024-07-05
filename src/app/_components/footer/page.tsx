import React from 'react'
import logo from "../../assets/Screenshot 2024-06-25 153522.png";
import Image from "next/image";
export default function Footer() {
    return (
        <div className=' bg-gray-900 py-3 fixed bottom-0 left-0 right-0 flex flex-row justify-center items-center gap-3'>
            <Image
                src={logo}
                alt="logo"
                className='rounded-full'
                style={{ width: '30px', height: '30px' }}
            />
            <h1 className='text-white text-lg w-fit'>Socials</h1>
        </div>
    )
}
