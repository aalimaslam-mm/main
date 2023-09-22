import { useNavigate } from "react-router-dom";
import Auth from "../Modules/Auth";
import { toast } from "react-toastify";
export default function Logout() {

    let navigate = useNavigate();
    Auth.logout();
    toast.success("Logged out successfully");
    navigate("/login");
    return null
}
