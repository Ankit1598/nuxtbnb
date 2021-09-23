import { getHeaders } from '../../helpers'
import fetch from 'node-fetch'
import { unWrap, getErrorResponse } from '../../../utils/fetchUtils'

export default (algoliaConfig) => {
	const headers = getHeaders(algoliaConfig)
	async function create(identity, payload) {
		try {
			return unWrap(
				await fetch(
					`https://${algoliaConfig.appId}-dsn.algolia.net/1/indexes/users/${identity.id}`,
					{
						headers,
						method: 'PUT',
						body: JSON.stringify(payload),
					}
				)
			)
		} catch (error) {
			return getErrorResponse(error)
		}
	}
	async function getById(identity) {
		try {
			return unWrap(
				await fetch(
					`https://${algoliaConfig.appId}-dsn.algolia.net/1/indexes/users/${identity.id}`,
					{
						headers,
					}
				)
			)
		} catch (error) {
			return getErrorResponse(error)
		}
	}
	async function assignHome(identity, homeId) {
		const payload = (await this.getById(identity)).json
		payload.homeId.push(homeId)
		this.create(identity, payload)
	}

	async function removeHome(identity, homeId) {
		const payload = (await this.getById(identity)).json
		const homes = payload.homeId.filter((id) => id !== homeId)
		payload.homeId = homes
		this.create(identity, payload)
	}
	async function bookHome(identityId, homeId, start, end) {
		try {
			return unWrap(
				await fetch(
					`https://${algoliaConfig.appId}-dsn.algolia.net/1/indexes/bookings/`,
					{
						headers,
						method: 'POST',
						body: JSON.stringify({
							identityId,
							homeId,
							start,
							end,
						}),
					}
				)
			)
		} catch (error) {
			return getErrorResponse(error)
		}
	}

	return {
		assignHome,
		create,
		getById,
		removeHome,
		bookHome,
	}
}
