import React, { useState } from "react"
import api from "../services/api"

function Notes({ data, userId, handleDeleteClick }) {
	console.log(userId)
	const [editMode, setEditMode] = useState(false)
	const [editedTitle, setEditedTitle] = useState(data.nome)
	const [editedDescription, setEditedDescription] = useState(data.descricao)
	const [editedDeadline, setEditedDeadline] = useState(data.deadLine)

	const handleEditClick = () => {
		setEditMode(true)
	}

	const handleSaveClick = () => {
		const dadosEditados = {
			nome: editedTitle,
			descricao: editedDescription,
			deadLine: editedDeadline,
		}
		const response = api.editaTask(dadosEditados, parseInt(data.taskId))
		data = {
			data: data.taskId,
			nome: response.nome,
			descricao: response.descricao,
			deadLine: response.deadLine,
		}
		setEditMode(false)
	}

	const handleConcludeClick = () => {
		api.concluiTask(parseInt(data.taskId), userId)
	}

	return (
		<div className="task">
			{editMode ? (
				<div>
					<input
						type="text"
						value={editedTitle}
						onChange={(e) => setEditedTitle(e.target.value)}
					/>
					<textarea
						value={editedDescription}
						onChange={(e) => setEditedDescription(e.target.value)}
					/>
					<input
						type="date"
						value={editedDeadline}
						onChange={(e) => setEditedDeadline(e.target.value)}
					/>
					<button onClick={handleSaveClick}>Save</button>
				</div>
			) : (
				<>
					<h2>
						<strong>
							{data.nome} id: {data.taskId}
						</strong>
					</h2>
					<p>
						<strong>{data.descricao}</strong>
					</p>
					<p>
						<strong>concluida {JSON.stringify(data.concluida)}</strong>
					</p>
					<p>
						<strong>{JSON.stringify(data.deadLine)}</strong>
					</p>
					<p>Membros: Membro 1, Membro 2</p>
					<button onClick={handleEditClick}>Edit</button>
					<button onClick={() => handleDeleteClick(data.taskId)}>Delete</button>
					<button onClick={handleConcludeClick}>Concluir</button>
				</>
			)}
		</div>
	)
}

export default Notes
