import React, { useState } from "react"
import { useNavigate, Routes, Route } from "react-router-dom"
import api from "./services/api"
import "./App.css"
import TasksPage from "./TasksPage"

function App() {
	const [nome, setNome] = useState("")
	const [loggedIn, setLoggedIn] = useState(false)
	const [dado, setDado] = useState("")
	const [userId, setUserId] = useState("")
	const navigate = useNavigate()

	const handleSubmit = async (e) => {
		e.preventDefault()
		const data = {
			nome: nome,
		}

		try {
			const responseApi = await api.authenticate(data)
			await api.authenticate(data)
			console.log(responseApi.status)
			console.log(responseApi.data)
			api.saveLoggerData(responseApi.data)
			setUserId(JSON.stringify(responseApi.data.userId))
			setDado(JSON.stringify(responseApi.data.nome))
			setLoggedIn(true)
			navigate("/tasks", { state: responseApi.data }) // Pass data as state
			// Pass data as state
		} catch (error) {
			console.error(error)
		}
	}

	return (
		<body>
			{!loggedIn ? (
				<>
					<h1>Pagina de Login</h1>
					<form onSubmit={handleSubmit}>
						<label htmlFor="nome">Nome: </label>
						<input
							type="text"
							id="nome"
							name="nome"
							value={nome}
							onChange={(e) => setNome(e.target.value)}
							required
						/>
						<button type="submit">Login</button>
					</form>
				</>
			) : null}
			<Routes>
				<Route path="/tasks" element={<TasksPage />} />
			</Routes>
		</body>
	)

	function TasksPage() {
		return (
			<div>
				<body>
					<h1>Olá {dado}</h1>
					<></>
				</body>
			</div>
		)
	}
}

export default App
