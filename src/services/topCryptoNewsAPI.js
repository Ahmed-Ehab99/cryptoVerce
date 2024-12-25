import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const topCryptoNewsApiHeaders = {
  "x-rapidapi-key": import.meta.env.VITE_TOP_CRYPTO_NEWS_KEY,
  "x-rapidapi-host": import.meta.env.VITE_TOP_CRYPTO_NEWS_HOST,
};

const baseUrl = import.meta.env.VITE_TOP_CRYPTO_NEWS_BASE_URL;

export const topCryptoNewsApi = createApi({
  reducerPath: "TopCryptoNewsApi",
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers) => {
      Object.entries(topCryptoNewsApiHeaders).forEach(([key, value]) => {
        headers.set(key, value);
      });
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getTopCryptoNews: builder.query({
      query: () => "/top/5",
    }),
  }),
});

export const { useGetTopCryptoNewsQuery } = topCryptoNewsApi;
