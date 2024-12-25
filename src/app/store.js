import { configureStore } from "@reduxjs/toolkit";
import { cryptoCoinsApi } from "../services/cryptoCoinsAPI";
import { setupListeners } from "@reduxjs/toolkit/query";
import { topCryptoNewsApi } from "../services/topCryptoNewsAPI";
import { allCryptoNewsApi } from "../services/allCryptoNewsAPI";

export const store = configureStore({
  reducer: {
    [cryptoCoinsApi.reducerPath]: cryptoCoinsApi.reducer,
    [topCryptoNewsApi.reducerPath]: topCryptoNewsApi.reducer,
    [allCryptoNewsApi.reducerPath]: allCryptoNewsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
      .concat(cryptoCoinsApi.middleware)
      .concat(topCryptoNewsApi.middleware)
      .concat(allCryptoNewsApi.middleware),
});

setupListeners(store.dispatch);
