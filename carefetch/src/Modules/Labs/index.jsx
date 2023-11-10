import CareFetch from "../CareFetch";
import User from "../User";

class Labs {
    getAllLabs(callBack) {
        CareFetch({
            method: "GET",
            url: "labs/get-all"
        }).then((response) => {
            callBack(response)
        }).catch(err => {
            callBack(err)
        })
    }
    addLab(data, callBack) {
        CareFetch({
            method: "POST",
            url: "labs/add",
            data
        }).then((response) => {
            callBack(response)
        }).catch(err => {
            callBack(err)
        })
    }
    getAllAppointments(callBack) {
        let id = User.getUser().UserID;
        CareFetch({
            method: "GET",
            url: "labs/get-all-appointments/" + id
        }).then((response) => {
            callBack(response)
        }).catch(err => {
            callBack(err)
        })
    }
    deleteLab(id, callBack) {
        CareFetch({
            method: "DELETE",
            url: "labs/" + id
        }).then((response) => {
            callBack(response)
        }).catch(err => {
            callBack(err)
        })
    }
    updateLab(id, data, callBack) {
        CareFetch({
            method: "PUT",
            url: "labs/" + id,
            data
        }).then((response) => {
            callBack(response)
        }).catch(err => {
            callBack(err)
        })
    }
    getAllMedicalTests(id, callBack) {
        CareFetch({
            method: "GET",
            url: "labs/get-medical-tests/" + id
        }).then((response) => {
            callBack(response)
        }).catch(err => {
            callBack(err)
        })
    }
    addHomeCollection(data, callBack) {
        CareFetch({
            method: "POST",
            url: "labs/add-home-collection",
            data
        }).then(response => {
            callBack(response)
        }).catch(err => {
            callBack(err)
        })
    }
    addMedicalTest(id, data, callBack) {
        CareFetch({
            method: "POST",
            url: "labs/add-medical-test/" + id,
            data
        }).then(response => {
            callBack(response)
        }).catch(err => {
            callBack(err)
        })
    }
    deleteTest(id, callBack) {
        CareFetch({
            method: "DELETE",
            url: "labs/delete-test/" + id
        }).then(response => {
            callBack(response)
        }).catch(err => {
            callBack(err)
        })
    }
    updateTest(id, data, callBack) {
        CareFetch({
            method: "PUT",
            url: "labs/update-test/" + id,
            data
        }).then(response => {
            callBack(response)
        }).catch(err => {
            callBack(err)
        })
    }
    getPatients(id, callBack) {
        CareFetch({
            method: "get",
            url: "labs/get-patients/" + id
        }).then(response => {
            callBack(response)
        }).catch(err => {
            callBack(err)
        })
    }
    updateAppointments(id, data, callBack) {
        CareFetch({
            method: "PUT",
            url: "labs/update-appointments/" + id,
            data
        }).then(response => {
            callBack(response)
        }).catch(err => {
            callBack(err)
        })
    }
    getAllReports(id, callBack) {
        CareFetch({
            method: "GET",
            url: "labs/get-reports/" + id
        }).then(response => {
            callBack(response)
        }).catch(err => {
            callBack(err)
        })
    }
    addReport(data, callBack) {
        CareFetch({
            method: "POST",
            url: "labs/add-report",
            data,
            Headers: {
                "Content-Type": "multipart/form-data"
            }
        }).then(response => {
            callBack(response)
        }).catch(err => {
            callBack(err)
        })
    }
    downloadReport(id, callBack) {
        CareFetch({
            method: "GET",
            url: "labs/download-report/" + id,
            responseType: "blob"
        }).then(response => {
            callBack(response)
        }).catch(err => {
            callBack(err)
        })
    }
    deleteReport(id, callBack) {
        CareFetch({
            method: "DELETE",
            url: "labs/delete-report/" + id
        }).then(response => {
            callBack(response)
        }).catch(err => {
            callBack(err)
        })
    }
    getReportByPatientId(id, callBack) {
        CareFetch({
            method: "get",
            url: 'labs/patient/reports/' + id
        }).then((response) => {
            callBack(response)
        }).catch(err => {
            console.log(err)
        })
    }
    addBulkAppointment(miss, appointments, callBack) {
        CareFetch({
            method: "POST",
            url: "labs/add-bulk-appointment",
            data: {
                miss,
                appointments
            }
        }).then(response => {
            callBack(response)
        }).catch(err => {
            callBack(err)
        })
    }
}
export default new Labs();