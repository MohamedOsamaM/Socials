'use client'
import React, { useEffect, useState } from 'react'
import SinglePost from "../_components/SinglePost/page";
import CachedIcon from '@mui/icons-material/Cached';
import { useDispatch, useSelector } from 'react-redux';
import { updatepost } from '@/lib/updatepostslice';
import Link from 'next/link';

type Post = {
    _id: number;
    // Add other post properties here if needed
};

export default function UserPosts() {
    const { postid } = useSelector((state: any) => state.update);
    const dispatch = useDispatch();
    const [isloading, setIsloading] = useState(true);
    const [uposts, setUposts] = useState<Post[] | null>(null);

    const getdata = async () => {
        let res = await fetch(`https://linked-posts.routemisr.com/users/664bcf3e33da217c4af21f00/posts`, {
            method: 'GET',
            headers: {
                token: `${localStorage.getItem('usertoken')}`
            }
        });
        let data = await res.json();
        setUposts(data.posts);
        setIsloading(false);
    };

    useEffect(() => {
        getdata();
    }, []);

    const removePost = async (pId: number) => {
        let res = await fetch(`https://linked-posts.routemisr.com/posts/${pId}`, {
            method: 'DELETE',
            headers: {
                token: `${localStorage.getItem('usertoken')}`
            }
        });
        await res.json();
        window.location.href = '/UserPosts';
    };

    const updatePost = (pId: number) => {
        dispatch(updatepost(pId));
    };

    if (typeof window !== 'undefined') {
        if (localStorage.getItem('usertoken') === null) {
            window.location.href = "/sign-in";
            return null;
        }
    }

    return (
        <div className="my-10 container mx-auto">
            <div className="flex md:flex-row flex-col flex-wrap md:items-start items-center">
                {isloading ? (
                    <CachedIcon className="text-9xl font-black text-white mx-auto" />
                ) : (
                    uposts === null || uposts.length === 0 ? (
                        <div className='text-center text-3xl text-white w-full'>No Posts Found</div>
                    ) : (
                        uposts.map((post) => (
                            <div key={post._id} className="p-3 md:w-[25%]">
                                <div className='flex flex-row justify-between'>
                                    <button onClick={() => { removePost(post._id) }} className='w-fit p-2 bg-red-500 text-white rounded-lg my-3 shadow-lg'>Delete</button>
                                    <Link href='/UpdatePosts' onClick={() => { updatePost(post._id) }} className='w-fit p-2 bg-green-500 text-white rounded-lg my-3 shadow-lg'>Update</Link>
                                </div>
                                <SinglePost postdetail={post} />
                            </div>
                        ))
                    )
                )}
            </div>
        </div>
    );
}
