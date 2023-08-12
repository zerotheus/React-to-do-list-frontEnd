import axios from "axios"

const apiBaseUrl = "http://localhost:8080"

const authService = {
	async authenticate(nome) {
		const endPoint = `${apiBaseUrl}/API/Register`
		return axios.post(endPoint, nome)
	},

	saveLoggerData(data) {
		let parsedData = JSON.stringify(data)
		localStorage.setItem("user", parsedData)
	},

	getLoggedUser() {
		let data = localStorage.getItem("user")
		console.log(localStorage.getItem("user"))
		if (!data) return "sem nada"
		try {
			let parsedData = JSON.parse(data)
			return parsedData
		} catch (error) {
			console.log(error)
			return null
		}
	},

	async getAllUserTasks(userId) {
		const endPoint = `${apiBaseUrl}/API/GetAllTaskUnfinished/${userId}`
		return axios.get(endPoint)
	},
}

export default authService
