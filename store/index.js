import {configureStore} from '@reduxjs/toolkit'
import globalReducer from "./globalsSlice";

export const store = configureStore({
    reducer: {
        global: globalReducer,
    },
})