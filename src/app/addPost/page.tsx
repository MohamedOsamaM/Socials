'use client'
import { TextareaAutosize } from '@mui/base/TextareaAutosize';
import { Input } from '@mui/base/Input';
import { useDispatch } from 'react-redux';
import { addposts } from '@/lib/postslice';

export default function AddPost() {
    let dispatch = useDispatch<any>()
    function HandleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        let bodyElement = (e.target as HTMLFormElement).elements.namedItem('body') as HTMLInputElement | null;
        let body = bodyElement?.value;

        let imageElement = (e.target as HTMLFormElement).elements.namedItem('image') as HTMLInputElement | null;
        let image = imageElement?.files?.[0];

        let formdata: FormData = new FormData();
        if (body) {
            formdata.append('body', body);
        }
        if (image) {
            formdata.append('image', image);
        }
        dispatch(addposts(formdata))
    }
    if (typeof window !== 'undefined') {
        if (localStorage.getItem('usertoken') === null) {
            window.location.href = "/sign-in"
        }
    }
    return <>
        <form onSubmit={HandleSubmit} style={{ width: '80%', margin: '10px auto' }}>
            <TextareaAutosize name='body' maxRows={15} minRows={15} className='resize-none rounded-[5px] w-full border-solid border-[1px] border-[rgba(0,0,0,0.5)] p-[5px] m-[5px]'>
            </TextareaAutosize>
            <input type='file' name='image' className='rounded-[5px] w-fit mx-auto block mb-5 border-solid border-[1px] border-[rgba(0,0,0,0.5)] m-[5px] bg-[#f1f1f1] p-[10px]'></input>
            <button className='text-white rounded-[5px] w-fit mx-auto border-none block border-[rgba(0,0,0,0.5)] m-[5px] bg-orange-500 p-[10px]' type='submit'>Add Post</button>
        </form>
    </>
}