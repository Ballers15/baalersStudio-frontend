import { setLoading, setIsClaimed, setWalletAddress, setUser } from './reducer';

export const setLoadingTrue = () => (dispatch) => {
  dispatch(setLoading(true));
};

export const setLoadingFalse = () => (dispatch) => {
  dispatch(setLoading(false));
};

export const setGlobalLoading = (isLoading) => (dispatch) => {
  dispatch(setLoading(isLoading));
};

export const setIsClaimedTrue = () => (dispatch) => {
  dispatch(setIsClaimed(true));
}

export const setIsClaimedFalse = () => (dispatch) => {
  dispatch(setIsClaimed(false));
}

export const setWalletAddressValue = (data) => (dispatch) => {
  dispatch(setWalletAddress(data));
}

export const setUserData = (data) => (dispatch) => {
  dispatch(setUser(data));
}