import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const cryptoCoinsApiHeaders = {
  "x-rapidapi-key": import.meta.env.VITE_CRYPTO_COINS_KEY,
  "x-rapidapi-host": import.meta.env.VITE_CRYPTO_COINS_HOST,
};

const baseUrl = import.meta.env.VITE_CRYPTO_COINS_BASE_URL;

export const cryptoCoinsApi = createApi({
  reducerPath: "cryptoCoinsApi",
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers) => {
      Object.entries(cryptoCoinsApiHeaders).forEach(([key, value]) => {
        headers.set(key, value);
      });
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getCryptoCoins: builder.query({
      query: (count) => `/coins?limit=${count}`,
    }),
    getCryptoCoinDetails: builder.query({
      query: (coinId) => `/coin/${coinId}`,
    }),
  }),
});

export const { useGetCryptoCoinsQuery, useGetCryptoCoinDetailsQuery } =
  cryptoCoinsApi;
