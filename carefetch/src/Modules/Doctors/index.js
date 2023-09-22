import CareFetch from "../CareFetch";

class Doctor {
    hospitalId = JSON.parse(localStorage.getItem("user"))?.HospitalID
    getAllDoctors(callBack) {
        CareFetch({
            method: "GET",
            url: `doctors/hospital/${this.hospitalId}`
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
    getAvailibility(doctorId, callBack) {
        CareFetch({
            method: "GET",
            url: `doctors-availibility/${doctorId}`
        }).then((response) => {
            callBack(response)
        }).catch(err => {
            callBack(err)
        })
    }
}

export default new Doctor();