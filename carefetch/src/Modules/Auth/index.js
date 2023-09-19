import axios from "axios";
import { toast } from "react-toastify";

class Auth {
    async login(data) {
        try {
            let response = await axios.post("http://localhost:5503/login", data);
            if (response.status === 200) {
                toast.success("Login Successfull");
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("user", JSON.stringify(response.data.user));
                return "success"
            } else {
                console.log(response)
                toast.error("Login Failed");
                return "error";
            }
        } catch (e) {
            toast.error(e.response.data)
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
}

export default new Auth();