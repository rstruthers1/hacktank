// Need to use the React-specific entry point to allow generating React hooks
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const HackEventApi = createApi({
    reducerPath: 'hackEventApi',
    baseQuery: fetchBaseQuery({ baseUrl: '' }),
    endpoints: (builder) => ({
        getHackEventById: builder.query({
            query: (id) => `/hackevent/${id}`,
            providesTags: 'hackEvent'
        }),
    }),
})

// Export hooks for usage in function components, which are
// auto-generated based on the defined endpoints
export const { useGetHackEventByIdQuery } = HackEventApi