import CareFetch from "../CareFetch";

class Hospital {

    getAllHospitals(callBack) {
        CareFetch({
            method: "GET",
            url: `hospitals`
        }).then((response) => {
            callBack(response)
        }).catch(err => {
            callBack(err)
        })
    }

    addHospital(data, callBack) {
        CareFetch({
            method: "POST",
            url: `admin/user`,
            data: data
        }).then((response) => {
            callBack(response)
        }).catch(err => {
            callBack(err)
        })
    }

    getDataLength(callBack) {
        CareFetch({
            method: "get",
            url: '/hospitals/dataLength',
        }).then((response) => {
            callBack(response)
        }).catch(err => {
            callBack(err)
        })
    }
    getHospitalById(id, callBack) {
        CareFetch({
            method: "get",
            url: `/hospitals/${id}`,
        }).then((response) => {
            callBack(response)
        }).catch(err => {
            callBack(err)
        })
    }
    updateHospital(data, callBack) {
        CareFetch({
            method: "put",
            url: `/hospitals/${data.HospitalID}`,
            data: data
        }).then((response) => {
            callBack(response)
        }).catch(err => {
            callBack(err)
        })
    }
    deleteHospital(id, callBack) {
        CareFetch({
            method: "delete",
            url: `/hospitals/${id}`,
        }).then((response) => {
            callBack(response)
        }).catch(err => {
            callBack(err)
        })
    }
    getDoctorsByHospitalId(id, callBack) {
        CareFetch({
            method: "get",
            url: `/doctors/hospital/${id}`,
        }).then((response) => {
            callBack(response)
        }).catch(err => {
            callBack(err)
        })
    }
}

export default new Hospital();