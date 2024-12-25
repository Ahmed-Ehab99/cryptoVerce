import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const allCryptoNewsApiHeaders = {
  "x-rapidapi-key": import.meta.env.VITE_ALL_CRYPTO_NEWS_KEY,
  "x-rapidapi-host": import.meta.env.VITE_ALL_CRYPTO_NEWS_HOST,
};

const baseUrl = import.meta.env.VITE_ALL_CRYPTO_NEWS_BASE_URL;

export const allCryptoNewsApi = createApi({
  reducerPath: "allCryptoNewsApi",
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers) => {
      Object.entries(allCryptoNewsApiHeaders).forEach(([key, value]) => {
        headers.set(key, value);
      });
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getAllCryptoNews: builder.query({
      query: () => "/articles",
    }),
  }),
});

export const { useGetAllCryptoNewsQuery } = allCryptoNewsApi;
