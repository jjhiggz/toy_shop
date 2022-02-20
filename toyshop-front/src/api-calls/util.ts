
export const throwIfNotOk = async( response: Response ) => {
		if(!response.ok){
			const error = await response.json()
			const message = error?.error?.message || "Something went wrong"
			throw new Error(message)
		}
		return response
}