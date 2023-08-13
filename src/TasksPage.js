import React, { Component, useEffect, useState } from "react"
import { useNavigate, Routes, Route } from "react-router-dom"
import { ReactDOM } from "react"
import Notes from "./components/index"
import api from "./services/api"

let calls = 0

function TasksPage({ userId, dado, fetchUserTasks }) {
	const [nomeDaNovaTask, setnomeDaNovaTask] = useState("")
	const [deadLineDaNovaTask, setDeadLineDaNovaTask] = useState("")
	const [descricaoDaNovaTask, setdescricaoDaNovaTask] = useState("")

	async function fetchUserTasks(userId) {
		if (calls > 0) {
			return //por algum motivo Mesmo com o uso de useEffect nao consegui impedir a recursao de acontecer, somente dessa forma
		}
		calls++
		console.log(userId)
		try {
			const intUserId = parseInt(userId)
			if (isNaN(intUserId)) {
				return
			}
			const response = await api.getAllUserTasks(intUserId)
			setAllUserTasks(response.data)
			return response.data
		} catch (error) {
			console.error("Error fetching user tasks:", error)
			return []
		}
	}
	const [allUserTasks, setAllUserTasks] = useState([])

	useEffect(() => {
		fetchUserTasks(userId)
	}, [userId, fetchUserTasks])

	const handleSubmit = async (e) => {
		e.preventDefault()
		const data = {
			nome: nomeDaNovaTask,
			descricao: descricaoDaNovaTask,
			deadLine: deadLineDaNovaTask,
		}

		try {
			const responseApi = await api.enviaNovaTask(data, userId)
			console.log(responseApi.status)
			console.log(responseApi.data)
			setAllUserTasks([...allUserTasks, responseApi.data])
		} catch (error) {
			console.error(error)
		}
	}

	async function handleDeleteClick(taskId) {
		const response = api.deletaTask(parseInt(taskId))
		if (response) {
			setAllUserTasks(allUserTasks.filter((task) => task.taskId !== taskId))
		}
	}

	async function handleConcludeClick(taskId, userId) {
		const response = api.concluiTask(parseInt(taskId), userId)
		if (response) {
			setAllUserTasks([...allUserTasks, response.data])
			setAllUserTasks(allUserTasks.filter((task) => task.taskId !== taskId))
		}
	}

	async function handleSaveClick(
		taskId,
		editedTitle,
		editedDescription,
		editedDeadline,
		setEditMode
	) {
		let dadosEditados = {
			nome: editedTitle,
			descricao: editedDescription,
			deadLine: editedDeadline,
		}

		try {
			const response = await api.editaTask(dadosEditados, parseInt(taskId))
			if (response) {
				const updatedTasks = allUserTasks.map((task) => {
					if (task.taskId === taskId) {
						return { ...task, ...dadosEditados }
					}
					return task
				})
				setAllUserTasks(updatedTasks)
			}
		} catch (error) {
			console.error(error)
		}

		setEditMode(false)
	}

	return (
		<>
			<body>
				<div class="container">
					<div class="header">
						<h1>Olá {dado}</h1>
						<h2>Minhas Tarefas</h2>
					</div>
					<ul class="task-list">
						{Array.isArray(allUserTasks)
							? allUserTasks.map((data) => (
									<li class="task-item">
										<Notes
											data={data}
											userId={parseInt(userId)}
											handleDeleteClick={handleDeleteClick}
											handleConcludeClick={handleConcludeClick}
											handleSaveClick={handleSaveClick}
										/>
									</li>
							  ))
							: null}
					</ul>
					<div class="new-task-form">
						<h2>Criar Nova Tarefa</h2>
						<form onSubmit={handleSubmit}>
							<label for="nome">Nome:</label>
							<input
								type="text"
								id="nome"
								name="nome"
								value={nomeDaNovaTask}
								onChange={(e) => setnomeDaNovaTask(e.target.value)}
								required
							/>
							<label for="descricao">Descrição:</label>
							<textarea
								id="descricao"
								name="descricao"
								rows="3"
								value={descricaoDaNovaTask}
								onChange={(e) => setdescricaoDaNovaTask(e.target.value)}
								required
							></textarea>
							<label for="dataLimite">Data Limite:</label>
							<input
								type="date"
								id="dataLimite"
								name="dataLimite"
								value={deadLineDaNovaTask}
								onChange={(e) => setDeadLineDaNovaTask(e.target.value)}
							/>
							<button type="submit">Enviar</button>
						</form>
					</div>
				</div>
			</body>
		</>
	)
}

export default TasksPage
