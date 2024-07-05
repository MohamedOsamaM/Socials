'use client'
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import SinglePost from "../_components/SinglePost/page";
import CachedIcon from '@mui/icons-material/Cached';

export default function UpdatePosts() {
  const [isLoading, setIsLoading] = useState(true);
  const { postid } = useSelector((state: any) => state.update);
  const [post, setPost] = useState<any>(null);

  async function getSinglePost(pid: number) {
    try {
      let res = await fetch(`https://linked-posts.routemisr.com/posts/${pid}`, {
        method: 'GET',
        headers: {
          token: `${localStorage.getItem('usertoken')}`
        }
      });
      if (!res.ok) {
        throw new Error('Network response was not ok');
      }
      let data = await res.json();
      setPost(data.post);
    } catch (error) {
      console.error('Failed to fetch post:', error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (postid !== 0) {
      getSinglePost(postid);
    } else {
      window.location.href = "/UserPosts";
    }
  }, [postid]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const bodyInput = form.elements.namedItem('body') as HTMLTextAreaElement;
    const imageInput = form.elements.namedItem('image') as HTMLInputElement;

    const formData = new FormData();
    formData.append('body', bodyInput.value);
    if (imageInput.files && imageInput.files[0]) {
      formData.append('image', imageInput.files[0]);
    }

    try {
      const res = await fetch(`https://linked-posts.routemisr.com/posts/${postid}`, {
        method: 'PUT',
        headers: {
          token: `${localStorage.getItem('usertoken')}`
        },
        body: formData
      });
      if (!res.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await res.json();
      window.location.href = '/UserPosts';
    } catch (error) {
      console.error('Failed to update post:', error);
    }
  };

  if (typeof window !== 'undefined' && postid === 0) {
    window.location.href = "/UserPosts";
    return null;
  }

  return (
    <>
      {isLoading ? (
        <div className="my-10 container mx-auto">
          <div className="flex md:flex-row flex-col flex-wrap md:items-start items-center">
            <CachedIcon className="text-9xl font-black text-white mx-auto" />
          </div>
        </div>
      ) : (
        <div className='container mx-auto p-5 flex md:flex-row flex-col justify-between'>
          <div className='w-[50%] flex items-center justify-center'>
            <SinglePost postdetail={post} key={post?._id} />
          </div>
          <div className='w-[50%]'>
            <form className='flex flex-col gap-y-5' onSubmit={handleSubmit}>
              <textarea name="body" rows={15} className='p-2 rounded-lg' defaultValue={post?.body}></textarea>
              <input type="file" name='image' className='bg-white p-2 rounded-lg' />
              <button className='w-full p-2 rounded-lg bg-green-400 text-white ' type='submit'>Update</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
