import React from "react"

function Notes({ data }) {
	console.log(data)
	return (
		<>
			<body>
				<div class="task">
					<h2>
						<strong>{data.nome}</strong>
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
				</div>
			</body>
		</>
	)
}

export default Notes
