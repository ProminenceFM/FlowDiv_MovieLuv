import { configureStore } from "@reduxjs/toolkit";
import { movieApiSlice } from "./api/movieApiSlice";
import watchlistReducer from "./api/watchListSlice";



const store = configureStore({
    reducer: {
        [movieApiSlice.reducerPath]: movieApiSlice.reducer,
        watchlist: watchlistReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(movieApiSlice.middleware),
    devTools: true,
})


export type AppDispatch = typeof store.dispatch;

store.subscribe(() => {
	//console.log('State after dispatch: ', store.getState());
});

export default store;