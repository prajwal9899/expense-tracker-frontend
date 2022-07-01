import { configureStore } from '@reduxjs/toolkit'
import  expenseSlice  from './reducer'
import {ApiSlice} from './ApiSlice'


export const store = configureStore({
    reducer: {
        expense : expenseSlice,
        [ApiSlice.reducerPath] : ApiSlice.reducer
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(ApiSlice.middleware)
})