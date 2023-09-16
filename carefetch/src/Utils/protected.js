function protectRoute() {
    let token = localStorage.getItem("token")
    if (token) {
        return true
    }
}

export default protectRoute;