import { click } from "@testing-library/user-event/dist/click"
import React, { useState } from "react"
import api from "./services/api"
import { json } from "react-router-dom"
//import authService from "./services/api"

function TasksPage({ location }) {
	const userdata = location?.state?.userdata
	console.log(userdata)
	return (
		<div>
			<body>
				<h1>Olá {JSON.stringify(userdata, null, 2)}</h1>
			</body>
		</div>
	)
}

//export default TasksPage
