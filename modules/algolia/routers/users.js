import { sendJSON } from '../../helpers'

export default (apis) => {
	const makeUserPayload = (identity) => {
		return {
			name: identity.name,
			email: identity.email,
			image: identity.image,
			homeId: [],
			reviewCount: 0,
			description: '',
			joined: new Date().toISOString(),
		}
	}

	return async function getUserRoute(req, res, next) {
		const identity = req.identity
		const userData = await apis.users.getById(identity)

		if (userData.status === 200) {
			sendJSON(userData.json, res)
			return
		}

		const payload = makeUserPayload(identity)
		apis.users.create(identity, payload)
		sendJSON(payload, res)
	}
}
