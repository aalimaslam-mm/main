import CareFetch from "../CareFetch";

class Doctor {

    getAllDoctors(callBack) {
        CareFetch({
            method: "GET",
            url: `doctors`
        }).then((response) => {
            callBack(response)
        }).catch(err => {
            callBack(err)
        })
    }
    addDoctor(data, callBack) {
        CareFetch({
            method: "POST",
            url: `doctors`,
            data
        }).then((response) => {
            callBack(response)
        }).catch(err => {
            callBack(err)
        })
    }
}

export default new Doctor();