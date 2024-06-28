import { createSlice } from "@reduxjs/toolkit";

const updateslice = createSlice({
    name:'updateslice',
    initialState:{postid:0},
    reducers:{
        updatepost:(state,action)=>{
            state.postid=action.payload;
        }
    }
})

export const { reducer: updatereducer } = updateslice;
export const {updatepost} = updateslice.actions;