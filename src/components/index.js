import React, { useState } from "react"
import api from "../services/api"

function Notes({
	data,
	userId,
	handleDeleteClick,
	handleConcludeClick,
	handleSaveClick,
}) {
	console.log(userId)
	const [editMode, setEditMode] = useState(false)
	const [editedTitle, setEditedTitle] = useState(data.nome)
	const [editedDescription, setEditedDescription] = useState(data.descricao)
	const [editedDeadline, setEditedDeadline] = useState(data.deadLine)
	const handleEditClick = () => {
		setEditMode(true)
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
					<button
						onClick={() =>
							handleSaveClick(
								data.taskId,
								editedTitle,
								editedDescription,
								editedDeadline,
								setEditMode
							)
						}
					>
						Save
					</button>
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
					<button onClick={handleEditClick}>Edit</button>
					<button onClick={() => handleDeleteClick(data.taskId)}>Delete</button>
					<button onClick={() => handleConcludeClick(data.taskId, userId)}>
						Concluir
					</button>
				</>
			)}
		</div>
	)
}

export default Notes
