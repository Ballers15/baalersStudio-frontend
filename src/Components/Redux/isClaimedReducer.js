import { createSlice } from '@reduxjs/toolkit';

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

export default isClaimedPrize.reducer;