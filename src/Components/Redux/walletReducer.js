import { createSlice } from '@reduxjs/toolkit';

const walletSlice = createSlice({
  name: 'wallet',
  initialState: {
    walletAddress: null
  },
  reducers: {
    setWalletAddress: (state, action) => {
      state.walletAddress = action.payload;
    }
  }
});

export const { setWalletAddress } = walletSlice.actions;
export const walletReducer = walletSlice.reducer;
