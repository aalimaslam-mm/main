import CareFetch from "../CareFetch";
import User from "../User";
class Patient {
    id = User?.getUser()?.HospitalID

    async getAllAppointments(callBack) {
        CareFetch({
            method: "GET",
            url: `patients/appointments/${this.id}`
        }).then(response => {
            callBack(response)
        }).catch(err => {
            callBack(err)
        })
    }
    async getAllPatients(callBack) {
        CareFetch({
            method: "GET",
            url: `patients/hospital/${this.id}`
        }).then(response => {
            console.log(response)
            callBack(response)
        }).catch(err => {
            callBack(err)
        })
    }
}
export default new Patient();