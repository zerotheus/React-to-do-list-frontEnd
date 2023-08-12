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

	async enviaNovaTask(dadosDaTask, userId) {
		const endPoint = `${apiBaseUrl}/API/createTask/${userId}`
		console.log(dadosDaTask.deadLine)
		if (
			dadosDaTask.deadLine !== "" &&
			dadosDaTask.deadLine !== undefined &&
			dadosDaTask.deadLine !== null
		) {
			dadosDaTask = {
				nome: dadosDaTask.nome,
				descricao: dadosDaTask.descricao,
				deadLine: dadosDaTask.deadLine + "T23:59:59",
			}
		}
		return axios.post(endPoint, dadosDaTask)
	},

	async editaTask(dadosDaTask, taskId) {
		console.log(taskId)
		console.log(dadosDaTask)
		console.log(dadosDaTask.deadLine)
		if (
			dadosDaTask.deadLine !== "" &&
			dadosDaTask.deadLine !== undefined &&
			dadosDaTask.deadLine !== null &&
			dadosDaTask.deadLine.length !== 19
		) {
			dadosDaTask = {
				nome: dadosDaTask.nome,
				descricao: dadosDaTask.descricao,
				deadLine: dadosDaTask.deadLine + "T23:59:59",
			}
		}
		console.log(dadosDaTask)
		const endPoint = `${apiBaseUrl}/API/updateTaskById/${taskId}`
		return axios.put(endPoint, dadosDaTask)
	},

	async deletaTask(taskId) {
		console.log(taskId)
		const endPoint = `${apiBaseUrl}/API/deleteTaskById/${taskId}`
		return axios.delete(endPoint)
	},

	async concluiTask(taskId, userId) {
		console.log(taskId)
		const endPoint = `${apiBaseUrl}/API/FinishTask/${taskId}/${userId}`
		return axios.put(endPoint)
	},
}

export default authService
