import axios from "axios";
import serverConfig from "../Config";
import User from "./User";
import Auth from "./Auth";

const appServerURL = serverConfig.appServerUrl;
const CareFetch = (config) => {
    const token = User?.getToken();
    const refreshToken = User?.getRefreshToken();
    if (token != null) {
        config.headers = {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "*",
            authorization: token,
            refreshToken
        };
    }

    axios.interceptors.response.use(
        (response) => {
            return response;
        },
        function (error) {
            if (error?.response?.data == "Invalid Token") {
                Auth.logout();
            }
            if (!error?.response) {
                error.response = {
                    data: "INETRNAL SERVER ERROR",
                    status: 500,
                };
            }
            if (error?.response?.status === 401) {
                Auth.logout();
                throw error;
            }
            return Promise.reject(error);
        }
    );

    config.baseURL = appServerURL;
    return axios(config);
};
export default CareFetch;