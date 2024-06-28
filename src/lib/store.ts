import { configureStore } from "@reduxjs/toolkit";
import { postreducer } from "./postslice";
import { updatereducer } from "./updatepostslice";
export let store = configureStore({
    reducer:{
        posts:postreducer,
        update:updatereducer
    }
})
export type AppDispatch = typeof store.dispatch