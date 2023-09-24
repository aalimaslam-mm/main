import axios from "axios";
import { toast } from "react-toastify";
import CareFetch from "../CareFetch";

class Auth {
    interval = ""
    async login(data) {
        try {
            let response = await axios.post("http://localhost:5503/login", data);
            if (response.status === 200) {
                toast.success("Login Successfull");
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("refreshToken", response.data.refreshToken);
                localStorage.setItem("user", JSON.stringify(response.data.user));

                this.interval = setInterval(async () => {
                    const refreshToken = localStorage.getItem("refreshToken");

                    // 2. Check if refreshToken is available.
                    if (refreshToken) {
                        // 3. Send a request to refresh the token.
                        CareFetch({
                            method: "get",
                            url: "refresh", // Make sure this URL is correctly configured.
                        })
                            .then((response) => {
                                // 4. Store the new token in localStorage.
                                localStorage.setItem("token", response.data.token);
                            })
                            .catch((error) => {
                                // 5. Handle errors gracefully.
                                console.log("Error refreshing token:", error);
                            });
                    } else {
                        console.log("No refreshToken found in localStorage");
                    }

                }, 1000 * 60 * 60); // 1 hour
                return "success"
            } else {
                console.log(response)
                toast.error("Login Failed");
                return "error";
            }
        } catch (e) {
            toast.error(e?.response)
        }
    }
    async register(data) {
        try {
            let response = await axios.post("http://localhost:5503/register", data);
            if (response.status === 200) {
                toast.success("Registration Successfull")
                return "success"
            } else {
                toast.error("Registration Failed")
            }
        } catch (e) {
            toast.error(e.response?.data)
        }
    }
    async logout() {
        clearInterval(this.interval);
        localStorage.clear();
    }
}

export default new Auth();