import { setIsClaimed } from './isClaimedReducer';
import { setLoading } from './reducer';
 

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