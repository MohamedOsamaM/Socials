import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Async thunk to fetch all posts
export const getallposts = createAsyncThunk('postslice/getallposts', async () => {
    const token = localStorage.getItem('usertoken');
    const headers: HeadersInit = {
        'token': token ? token : '', // Handle null or undefined token
    };
    const response = await fetch('https://linked-posts.routemisr.com/posts', {
        method: 'GET',
        headers: headers,
    });
    const data = await response.json();
    return data;
});

// Async thunk to add a new post
export const addposts = createAsyncThunk('postslice/addposts', async (formData: FormData) => {
    const token = localStorage.getItem('usertoken');
    const headers: HeadersInit = {
        'token': token ? token : '', // Handle null or undefined token
    };
    const response = await fetch('https://linked-posts.routemisr.com/posts', {
        method: 'POST',
        headers: headers,
        body: formData,
    });
    const data = await response.json();
    return data;
});

// Redux slice definition
interface PostState {
    allposts: any[]; // Adjust this type according to your actual posts structure
    userposts: any[]; // Adjust this type according to your actual posts structure
    isloading: boolean;
    iserror: string | null; // Allow iserror to be null or string
}

const initialState: PostState = {
    allposts: [],
    userposts: [],
    isloading: false,
    iserror: null, // Initialize iserror as null
};

const postslice = createSlice({
    name: 'postslice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getallposts.pending, (state) => {
                state.isloading = true;
                state.iserror = null; // Reset error state
            })
            .addCase(getallposts.fulfilled, (state, action) => {
                state.isloading = false;
                state.allposts = action.payload.posts;
            })
            .addCase(getallposts.rejected, (state, action) => {
                state.isloading = false;
                state.iserror = action.error.message ?? 'Failed to fetch posts'; // Handle error message
            })
            .addCase(addposts.pending, (state) => {
                state.isloading = true;
                state.iserror = null; // Reset error state
            })
            .addCase(addposts.fulfilled, (state, action) => {
                state.isloading = false;
                // Optionally update state or handle success
                console.log('Post added successfully:', action.payload);
            })
            .addCase(addposts.rejected, (state, action) => {
                state.isloading = false;
                state.iserror = action.error.message ?? 'Failed to add post'; // Handle error message
            });
    },
});

export const { reducer: postreducer } = postslice;
