import { baseUrl } from "./constants"
import { throwIfNotOk } from "./util"

const login = (user: {email: string, password: string}): Promise<{token: string}> => fetch(baseUrl + "/login", {
		method: 'POST',
		headers: {
		"Content-Type": "application/json",
		},
		body: JSON.stringify(user)
	})
	.then(throwIfNotOk)
	.then(result => result.json())

export const AuthRequests = {
	login,
}