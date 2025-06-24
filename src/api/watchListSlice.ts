import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface WatchlistState {
  items: any[];
}

const initialState: WatchlistState = {
  items: JSON.parse(localStorage.getItem("watchlist") || "[]"),
};

const watchlistSlice = createSlice({
  name: "watchlist",
  initialState,
  reducers: {
    addToWatchlist: (state, action: PayloadAction<any>) => {
      const exists = state.items.find(item => item.id === action.payload.id);
      if (!exists) {
        state.items.push(action.payload);
        localStorage.setItem("watchlist", JSON.stringify(state.items));
      }
    },
    removeFromWatchlist: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      localStorage.setItem("watchlist", JSON.stringify(state.items));
    },
    clearWatchlist: (state) => {
      state.items = [];
      localStorage.removeItem("watchlist");
    }
  }
});

export const {
  addToWatchlist,
  removeFromWatchlist,
  clearWatchlist
} = watchlistSlice.actions;

export default watchlistSlice.reducer;
