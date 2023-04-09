import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
  reducerPath: 'apiSlice',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://course-api.com/react-useReducer-cart-project' }),
  endpoints: (builder) => ({
    getData: builder.query({
      query: () => '/',
    }),
  }),
})

export const { useGetDataQuery } = apiSlice