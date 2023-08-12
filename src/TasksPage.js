import React, { Component, useEffect, useState } from "react"
import { useNavigate, Routes, Route } from "react-router-dom"
import Notes from "./components/index"
import api from "./services/api"

let calls = 0

function TasksPage({ userId, dado, fetchUserTasks }) {
	async function fetchUserTasks(userId) {
		if (calls > 0) {
			return //por algum motivo Mesmo com o uso de useEffect nao consegui impedir a recursao de acontecer, somente dessa forma
		}
		calls++
		console.log(userId)
		try {
			const intUserId = parseInt(userId)
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

	return (
		<>
			<div>
				<h1>Olá {dado}</h1>
				<div>
					<h1>Minhas Tarefas</h1>
				</div>
				<ul>
					{allUserTasks.map((data) => (
						<Notes key={data.id} data={data} />
					))}
				</ul>
			</div>
			<form>
				<label for="nome">Nome:</label>
				<input type="text" id="nome" name="nome" required />
				<label for="descricao">Descrição:</label>
				<textarea id="descricao" name="descricao" rows="4" required></textarea>
				<label for="dataLimite">Data Limite:</label>
				<input type="date" id="dataLimite" name="dataLimite" required />
				<button type="submit">Enviar</button>
			</form>
		</>
	)
}

export default TasksPage
