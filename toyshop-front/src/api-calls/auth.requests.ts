import { TUser } from "../types/user.type"
import { baseUrl } from "./constants"
import { throwIfNotOk } from "./util"

const login = (user: {email: string, password: string}): Promise<TUser> => fetch(baseUrl + "/login", {
		method: 'POST',
		headers: {
		"Content-Type": "application/json",
		},
		body: JSON.stringify(user)
	})
	.then(throwIfNotOk)
	.then(result => result.json())


const signup = (newUser: {email: string, password: string}): Promise<TUser> => fetch(baseUrl + "/signup", {
		method: 'POST',
		headers: {
		"Content-Type": "application/json",
		},
		body: JSON.stringify({user: newUser})
	})
	.then(throwIfNotOk)
	.then(result => result.json())

export const AuthRequests = {
	login,
	signup
}