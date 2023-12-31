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
    getAvailableDays(doctorId, callBack) {
        CareFetch({
            method: "GET",
            url: `doctors-availibility/${doctorId}`
        }).then((response) => {
            callBack(response)
        }).catch(err => {
            callBack(err)
        })
    }
    getAvailablity(data, callBack) {
        CareFetch({
            method: "POST",
            url: `doctors-availibility/check-availibility`,
            data
        }).then((response) => {
            callBack(response)
        }).catch(err => {
            callBack(err)
        })
    }

    getDoctorById(id, callBack) {
        CareFetch({
            method: "GET",
            url: `doctors/${id}`
        }).then((response) => {
            callBack(response)
        }).catch(err => {
            callBack(err)
        })
    }

    updateDoctor(id, data, callBack) {
        CareFetch({
            method: "PUT",
            url: `doctors/${id}`,
            data
        }).then((response) => {
            callBack(response)
        }).catch(err => {
            callBack(err)
        })
    }
    softDeleteDoctor(id, callBack) {
        CareFetch({
            method: "delete",
            url: "doctors/" + id,
            data: { deleteType: "soft" }
        }).then(response => {
            callBack(response)
        }).catch(err => {
            console.log(err);
        })
    }

}

export default new Doctor();