import { useNavigate } from "react-router-dom";
import Auth from "../Modules/Auth";
import { toast } from "react-toastify";
import React from "react";
export default function Logout() {

    let navigate = useNavigate();
    React.useEffect(() => {
        Auth.logout();
        navigate("/login");
    }, [navigate])
    return null
}
