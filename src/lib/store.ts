import { configureStore } from "@reduxjs/toolkit";
import { postreducer } from "./postslice";
export let store = configureStore({
    reducer:{
        posts:postreducer
    }
})
export type AppDispatch = typeof store.dispatch