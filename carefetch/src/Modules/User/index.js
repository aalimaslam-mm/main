import CareFetchAPI from "../CareFetch";
class User {
    getToken() {
        return localStorage.getItem("token");
    }
    getUser() {
        return JSON.parse(localStorage.getItem("user"));
    }
    async logout() {
        localStorage.clear();
    }
    getAllUsers(callBack) {
        CareFetchAPI({
            method: "GET",
            url: "admin/all-users",
        }).then((response) => {
            callBack({ data: response.data });
        });
    }
    getDataLength(callBack) {
        CareFetchAPI({
            method: "get",
            url: "admin/total"
        }).then(response => {
            callBack(response.data)
        })
    }
    updateUser(data, callBack) {
        CareFetchAPI({
            method: "PUT",
            url: "user",
            data
        }).then(response => {
            callBack(response.data)
        })
    }
    getUserById(id, callBack) {
        CareFetchAPI({
            method: "GET",
            url: `user/${id}`
        }).then(response => {
            callBack(response.data)
        })
    }
    changePassword(data, callBack) {
        CareFetchAPI({
            method: "PUT",
            url: "/change-password",
            data
        }).then(response => {
            callBack(response)
            console.log(response)
        }).catch(err => {
            console.log(err.response)
            callBack(err)
        })
    }
}

export default new User()