import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseUri = 'https://expense-api-production.up.railway.app/'

export const ApiSlice = createApi({
    
    baseQuery: fetchBaseQuery({ baseUrl: baseUri }),
    endpoints: builder => ({

        // Get Categories
        getCategories: builder.query({
            query: () => `/api/categories`,
            providesTags:['categories']
        }),

        // Get Labels
        getLabels: builder.query({
            query: () => `/api/labels`,
            providesTags: ['transaction']
        }),

        // Add New Transactions
        addTransaction: builder.mutation({
           query:(initialTransaction) => ({
                url: '/api/transactions',
                method: 'POST',
                body:initialTransaction
           }),
            invalidatesTags: ['transaction']
        }),

        // delete record

        deleteTransaction: builder.mutation({
            query: recordId => ({
                url: '/api/transactions',
                method: 'DELETE',
                body: recordId
            }),
            invalidatesTags: ['transaction']
        }),
    }),
})


export default ApiSlice