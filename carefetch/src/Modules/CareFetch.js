import axios from "axios";
import serverConfig from "../Config";
import User from "./User";

const appServerURL = serverConfig.appServerUrl;
const CareFetch = (config) => {
    const token = User.getToken();
    if (token != null) {
        config.headers = {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "*",
            authorization: token,
        };
    }

    axios.interceptors.response.use(
        (response) => {
            return response;
        },
        function (error) {
            if (error.response.data == "Invalid Token") {
                User.logout();
            }
            if (!error.response) {
                error.response = {
                    data: "INETRNAL SERVER ERROR",
                    status: 500,
                };
            }
            if (error.response.status === 401) {
                User.logout();
                throw error;
            }
            return Promise.reject(error);
        }
    );

    config.baseURL = appServerURL;
    return axios(config);
};
export default CareFetch;