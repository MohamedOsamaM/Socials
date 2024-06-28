'use client'
import { getallposts } from "@/lib/postslice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SinglePost from "./_components/SinglePost/page";
import CachedIcon from '@mui/icons-material/Cached';

export default function Home() {
    const dispatch = useDispatch<any>();
    const { allposts, isloading } = useSelector((state: any) => state.posts);
    useEffect(()=>{
        getuserdata();
    },[])
    useEffect(() => {
        dispatch(getallposts());
    }, [dispatch]); // Add dispatch to the dependency array
    if (typeof window !== 'undefined') {
        if (localStorage.getItem('usertoken') === null) {
            window.location.href = "/sign-in";
            return null; // Ensure to return early if user is not logged in
        }

    }
 
    const getuserdata = async()=>{
        const response = await fetch('https://linked-posts.routemisr.com/users/profile-data',{
            method:'GET',
            headers: {
                token:`${localStorage.getItem('usertoken')}`
            }
        })
        const data = await response.json();
        localStorage.setItem('username',data.user.name)
    }
    return (
        <div className="my-10 container mx-auto">
            <div className="flex md:flex-row flex-col flex-wrap md:items-start items-center">
                {isloading ? (
                    <CachedIcon className="text-9xl font-black text-white mx-auto" />
                ) : (
                    allposts?.map((post: any) => (
                        <div key={post._id} className="p-3 md:w-[25%]">
                            <SinglePost postdetail={post} />
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
