import axios from "axios";
import { environment } from "../../Environments/environment";
import { store } from "../../Components/Redux/store";
import { setIsClaimedFalse, setLoadingFalse, setUserData, setWalletAddressValue } from "../../Components/Redux/actions";

const logout = () => {
    store.dispatch(setUserData(null))
    store.dispatch(setWalletAddressValue(null));
    store.dispatch(setIsClaimedFalse());
    store.dispatch(setLoadingFalse());
    window.location.href = "/"; // Redirect to the homepage
  };

let baseURL = environment?.apiUrl;
export const axiosInstance = axios.create({
    baseURL
});

axiosInstance.interceptors.request.use(
    function (req) {
        let _u = store.getState().user.user
        let accountId = JSON.parse(_u||'{}')?.user?.accountId;
        let accessToken = JSON.parse(_u||'{}')?.token;
        req.headers = {
        'x-access-user':accountId,
        'x-access-token':accessToken
        }
        return req;
    },
    function (error) {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    function (res) {
		// console.log(res, "response")
        return res;
    },
    async function (error) {

        if (error.response) {
            if (error.response.status === 403 && error.response.data) {
                // alert(error?.response?.data?.message || 'error code 403 detected!!')
				// localStorage.clear(); 
                logout()
                return Promise.reject(error.response.data?.message);
            }
            if (error.response.status === 401 && error.response.data) {
                // alert(error?.response?.data?.message || 'error code 401 detected!!')
				// console.log("calling error 401")
                logout()
                return Promise.reject(error.response.data?.message);
            }
        }
		console.log(error, "rejected")

        return Promise.reject(error);
    }
);
