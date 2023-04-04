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

export default LoadingSlice.reducer;