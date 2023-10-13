import CareFetch from "../CareFetch";
import User from "../User";

class Appointment {
    hospitalId = User?.getUser()?.HospitalID
    getAllAppointments(callback) {
        CareFetch({
            method: "get",
            url: "hospitals/appointments/" + this.hospitalId,
        })
            .then((response) => {
                callback(response);
            })
            .catch((error) => {
                callback(error);
            })
    }

    addAppointmentByHospital(data, callBack) {
        CareFetch({
            method: "post",
            url: "/appointments",
            data: data
        }).then(response => {
            callBack(response)
        }).catch(err => {
            callBack(err)
        })
    }
    updateAppointment(data, callBack) {
        CareFetch({
            method: "put",
            url: "/appointments/" + data.AppointmentID,
            data: data
        }).then(response => {
            callBack(response)
        }).catch(err => {
            callBack(err)
        })
    }
}

export default new Appointment();