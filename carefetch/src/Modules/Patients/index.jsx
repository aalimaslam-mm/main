import CareFetch from "../CareFetch";
import User from "../User";
class Patient {
    id = User?.getUser()?.UserID

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
}
export default new Patient();