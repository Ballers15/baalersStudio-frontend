import { createSlice } from '@reduxjs/toolkit';

const LoadingInitalState = {
  isLoading: false,
};

const LoadingSlice = createSlice({
  name: 'Loading',
  initialState: LoadingInitalState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});
export const { setLoading } = LoadingSlice.actions;
export const loadingReducer = LoadingSlice.reducer;


const ClaimedInitalState = {
  isClaimed: false,
};

const isClaimedPrize = createSlice({
  name: 'claimed',
  initialState: ClaimedInitalState,
  reducers: {
    setIsClaimed: (state, action) => {
      state.isClaimed = action.payload;
    },
  },
});
export const { setIsClaimed } = isClaimedPrize.actions;
export const isClaimedReducer =  isClaimedPrize.reducer;


const userInitialState = {
  user: null,
}

const userSlice = createSlice({
  name: 'user',
  initialState: userInitialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    }
  }
});

export const {setUser} = userSlice.actions;
export const userReducer = userSlice.reducer

const WalletInitalState = {
  walletAddress: null,
};

const walletSlice = createSlice({
  name: 'wallet',
  initialState: WalletInitalState,
  reducers: {
    setWalletAddress: (state, action) => {
      state.walletAddress = action.payload;
    }
  }
});

export const { setWalletAddress } = walletSlice.actions;
export const walletReducer = walletSlice.reducer;


