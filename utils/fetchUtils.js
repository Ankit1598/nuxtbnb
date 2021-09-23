export const unWrap = async (response) => {
	const json = await response.json()
	const { ok, status, statusText } = response
	return { json, ok, status, statusText }
}

export const getErrorResponse = (error) => {
	return { ok: false, status: 500, statusText: error.message, json: {} }
}
