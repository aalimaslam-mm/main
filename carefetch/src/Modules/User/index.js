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
}

export default new User()